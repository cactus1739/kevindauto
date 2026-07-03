<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Ho_Chi_Minh');

const REPORT_KEY_HASH = '26b09b93be09396366bba6039abe9ee6ef901e20d643bffab28adb28306ea8f0';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store, max-age=0');

$dataDirectory = dirname(__DIR__) . '/.analytics-data';
$dataFile = $dataDirectory . '/analytics.json';

function emptyAnalytics(): array
{
    return [
        'total' => 0,
        'updatedAt' => null,
        'days' => [],
        'paths' => [],
        'referrers' => [],
        'devices' => [],
        'seen' => [],
    ];
}

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function safeLabel($value, string $fallback, int $maxLength = 100): string
{
    if (!is_string($value)) return $fallback;
    $value = trim(preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? '');
    if ($value === '') return $fallback;
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength) : substr($value, 0, $maxLength);
}

function increment(array &$items, string $key): void
{
    $items[$key] = (int)($items[$key] ?? 0) + 1;
}

function authorizationToken(): string
{
    return trim($_SERVER['HTTP_X_ANALYTICS_KEY'] ?? '');
}

if (!is_dir($dataDirectory) && !mkdir($dataDirectory, 0700, true) && !is_dir($dataDirectory)) {
    respond(['error' => 'Không thể khởi tạo bộ đếm'], 500);
}

$file = fopen($dataFile, 'c+');
if ($file === false || !flock($file, LOCK_EX)) {
    respond(['error' => 'Bộ đếm đang bận'], 503);
}

$raw = stream_get_contents($file);
$analytics = $raw ? json_decode($raw, true) : null;
if (!is_array($analytics)) $analytics = emptyAnalytics();
$analytics = array_replace(emptyAnalytics(), $analytics);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['report'])) {
    $token = authorizationToken();
    if ($token === '' || !hash_equals(REPORT_KEY_HASH, hash('sha256', $token))) {
        flock($file, LOCK_UN);
        fclose($file);
        respond(['error' => 'Không có quyền truy cập'], 401);
    }

    $report = $analytics;
    unset($report['seen']);
    flock($file, LOCK_UN);
    fclose($file);
    respond($report);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $total = (int)$analytics['total'];
    flock($file, LOCK_UN);
    fclose($file);
    respond(['total' => $total]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    flock($file, LOCK_UN);
    fclose($file);
    header('Allow: GET, POST');
    respond(['error' => 'Phương thức không được hỗ trợ'], 405);
}

$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) {
    flock($file, LOCK_UN);
    fclose($file);
    respond(['error' => 'Dữ liệu không hợp lệ'], 400);
}

$visitorId = safeLabel($payload['visitorId'] ?? '', '', 128);
if (strlen($visitorId) < 12) {
    flock($file, LOCK_UN);
    fclose($file);
    respond(['error' => 'Thiếu mã khách truy cập'], 400);
}

$day = date('Y-m-d');
$seenKey = hash('sha256', $day . '|' . $visitorId);
$isNewVisit = !isset($analytics['seen'][$seenKey]);

if ($isNewVisit) {
    $path = safeLabel($payload['path'] ?? '/', '/', 140);
    $referrer = safeLabel($payload['referrer'] ?? '', 'Truy cập trực tiếp', 100);
    $device = safeLabel($payload['device'] ?? '', 'Không xác định', 40);

    $analytics['total'] = (int)$analytics['total'] + 1;
    $analytics['updatedAt'] = date(DATE_ATOM);
    $analytics['seen'][$seenKey] = time();
    increment($analytics['days'], $day);
    increment($analytics['paths'], $path);
    increment($analytics['referrers'], $referrer);
    increment($analytics['devices'], $device);

    $cutoff = time() - (35 * 86400);
    $analytics['seen'] = array_filter(
        $analytics['seen'],
        static fn($timestamp) => (int)$timestamp >= $cutoff
    );

    rewind($file);
    ftruncate($file, 0);
    fwrite($file, json_encode($analytics, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    fflush($file);
}

$total = (int)$analytics['total'];
flock($file, LOCK_UN);
fclose($file);
respond(['total' => $total, 'counted' => $isNewVisit]);
