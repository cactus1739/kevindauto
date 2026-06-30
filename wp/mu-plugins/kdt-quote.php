<?php
/**
 * Plugin Name: KDT - Nhận báo giá từ website
 * Description: Endpoint công khai POST /wp-json/kdt/v1/quote — tạo đơn nháp WooCommerce + email cho shop.
 * Author: kevindauto
 * Version: 1.0.1
 */
if (!defined('ABSPATH')) exit;

// Cho phép website tĩnh kevindauto.com gọi REST sang (CORS)
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($served) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return $served;
  });
}, 15);

add_action('rest_api_init', function () {
  register_rest_route('kdt/v1', '/quote', [
    'methods'             => 'POST',
    'permission_callback' => '__return_true',
    'callback'            => 'kdt_handle_quote',
  ]);
});

function kdt_handle_quote(WP_REST_Request $req) {
  header('Access-Control-Allow-Origin: *');

  $p = json_decode($req->get_body(), true);
  if (!is_array($p)) $p = $req->get_json_params() ?: [];

  // Honeypot chống bot: form thật luôn để trống ô này
  if (!empty($p['website'])) return new WP_REST_Response(['ok' => true], 200);

  $name  = sanitize_text_field($p['name'] ?? '');
  $phone = sanitize_text_field($p['phone'] ?? '');
  $note  = sanitize_textarea_field($p['note'] ?? '');
  $items = (isset($p['items']) && is_array($p['items'])) ? $p['items'] : [];

  if ($name === '' || $phone === '' || count($items) === 0) {
    return new WP_REST_Response(['ok' => false, 'error' => 'Vui lòng nhập tên, số điện thoại và ít nhất 1 sản phẩm.'], 400);
  }

  // Chống spam: tối đa 8 lần / giờ / IP
  $ip  = $_SERVER['REMOTE_ADDR'] ?? '0';
  $key = 'kdt_quote_' . md5($ip);
  $cnt = (int) get_transient($key);
  if ($cnt >= 8) return new WP_REST_Response(['ok' => false, 'error' => 'Bạn gửi quá nhiều lần, vui lòng thử lại sau.'], 429);
  set_transient($key, $cnt + 1, HOUR_IN_SECONDS);

  if (!function_exists('wc_create_order')) {
    return new WP_REST_Response(['ok' => false, 'error' => 'Cửa hàng chưa sẵn sàng.'], 500);
  }

  $order = wc_create_order();
  $lines = [];
  foreach ($items as $it) {
    $sku = sanitize_text_field($it['code'] ?? ($it['sku'] ?? ''));
    $qty = max(1, intval($it['qty'] ?? 1));
    if ($sku === '') continue;
    $pid  = wc_get_product_id_by_sku($sku);
    $prod = $pid ? wc_get_product($pid) : null;
    if ($prod) {
      $order->add_product($prod, $qty);
      $lines[] = "[$sku] " . $prod->get_name() . " x$qty";
    } else {
      $lines[] = "[$sku] (không khớp sản phẩm) x$qty";
    }
  }

  $order->set_address(['first_name' => $name, 'phone' => $phone], 'billing');
  if ($note !== '') $order->set_customer_note($note);
  $order->add_order_note("Báo giá gửi từ website kevindauto.com\nKhách: $name | SĐT: $phone" . ($note ? "\nGhi chú: $note" : ''));
  $order->calculate_totals();
  $order->update_status('on-hold', 'Báo giá mới từ website', true);
  $order->save();

  // Email báo cho shop
  $to   = get_option('admin_email');
  $link = admin_url('post.php?post=' . $order->get_id() . '&action=edit');
  $body = "Có báo giá mới từ website kevindauto.com\n\n"
        . "Khách hàng: $name\nSố điện thoại: $phone\n" . ($note ? "Ghi chú: $note\n" : '')
        . "\nDanh sách:\n - " . implode("\n - ", $lines)
        . "\n\nXem / chốt đơn: $link";
  wp_mail($to, "[Báo giá mới] $name — $phone", $body);

  return new WP_REST_Response(['ok' => true, 'order' => $order->get_id()], 200);
}
