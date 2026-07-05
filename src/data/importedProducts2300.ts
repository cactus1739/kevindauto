import type { Accent, Category, Product } from './products'

const accents: Record<Category, Accent> = {
  nam: 'cyan',
  nu: 'brand',
  giadinh: 'gold',
  treem: 'brand',
  caotuoi: 'violet',
  thethao: 'cyan',
  dongvat: 'brand',
  xe: 'gold',
  phukien: 'violet',
  duongpho: 'cyan',
  movie: 'violet',
  famous: 'gold',
}

const preOrderCodes = new Set([2311, 2312, 2328, 2334, 2337, 2338, 2341, 2350, 2351])
const omittedCodes = new Set([2451, 2484, 2485, 2486, 2487, 2488])

const femaleCodes = new Set([
  2304, 2314, 2315, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2330, 2331, 2332, 2333,
  2335, 2336, 2338, 2342, 2344, 2345, 2346, 2348, 2349, 2351, 2373, 2374, 2375, 2376, 2377,
  2394, 2395, 2396, 2399, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2426, 2427, 2428, 2429,
  2430, 2432, 2433, 2434, 2437, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2448, 2449,
  2473, 2489, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2506, 2512, 2518, 2519, 2522, 2526,
  2531, 2540, 2542, 2543, 2544, 2545, 2547, 2550, 2552, 2553, 2560, 2561, 2562, 2564, 2566,
  2568, 2569, 2572, 2573, 2577, 2581, 2584, 2587, 2589, 2594, 2595, 2596, 2598, 2599,
])

const animalCodes = new Set([
  2300, 2301, 2302, 2303, 2305, 2308, 2313, 2316, 2352, 2353, 2354, 2355, 2356, 2357, 2358,
  2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2379,
  2380, 2381, 2382, 2383, 2384, 2386, 2391, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407,
  2408, 2409, 2410, 2411, 2412, 2421, 2422, 2436, 2452, 2453, 2454, 2455, 2456, 2457, 2458,
  2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2474,
  2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2490, 2491, 2492, 2516, 2523, 2524,
  2530, 2534, 2536, 2537, 2539, 2546, 2588, 2590, 2591,
])

const vehicleCodes = new Set([2385, 2438, 2450, 2495, 2515, 2525, 2532])
const accessoryCodes = new Set([2306, 2420, 2496, 2497])
const childCodes = new Set([2387, 2388, 2389, 2390])
const seniorCodes = new Set([2397, 2398, 2510, 2511, 2556, 2557, 2559, 2593])
const sportCodes = new Set([2454, 2456, 2463, 2471, 2475, 2483, 2516, 2533, 2554, 2567, 2571, 2585, 2587])

const specialNames: Record<number, string> = {
  2300: 'Doraemon ngồi suy tư',
  2301: 'Doraemon chạy vui nhộn',
  2302: 'Doraemon há miệng ngạc nhiên',
  2303: 'Doraemon đứng tạo dáng',
  2304: 'Nữ chiến binh cánh rồng',
  2305: 'Tôm hùm đỏ trưng bày',
  2306: 'Chậu cây bàn tay nghệ thuật',
  2308: 'Cua biển giương càng',
  2352: 'Cá sấu nằm quan sát',
  2355: 'Khỉ đột ngồi',
  2356: 'Bò rừng đứng',
  2361: 'Mèo đứng trên bệ',
  2371: 'Cú mèo tròn',
  2372: 'Hà mã con',
  2378: 'Người Dơi áo choàng',
  2385: 'Xe van cổ điển',
  2391: 'Voi thần fantasy',
  2400: 'Tượng chiến binh cưỡi sóng',
  2405: 'Lân chibi chiêu tài',
  2407: 'Tượng võ tướng ngồi',
  2408: 'Chim đại bàng chiến binh',
  2420: 'Ghế bành hiện đại',
  2421: 'Heo chibi có cánh',
  2438: 'Xe tay ga cổ điển',
  2450: 'Xe máy thể thao',
  2460: 'Son Goku nhí',
  2461: 'Chiến binh Saiyan tóc dựng',
  2469: 'Pháp sư chibi đội mũ',
  2475: 'Chiến binh bung dù',
  2490: 'Khủng long bạo chúa',
  2491: 'Khủng long T-Rex',
  2492: 'Khủng long ba sừng',
  2495: 'Kỵ sĩ cưỡi ngựa',
  2515: 'Tay đua mô tô anime',
  2523: 'Ông già Noel chibi',
  2524: 'Shin cậu bé bút chì',
  2525: 'Người lái xe tay ga',
  2530: 'Ông già Noel bên quà tặng',
  2532: 'Tay đua xe máy tương lai',
  2534: 'Chân dung Mr. Bean',
  2537: 'Rồng con chibi',
  2539: 'Chim cánh cụt đeo kính',
  2546: 'Mèo đen bên cọc tiêu',
  2588: 'Chiến binh robot giáp nặng',
  2591: 'Nhân vật chibi đội mũ',
  2593: 'Quý ông lớn tuổi ngồi sofa',
}

function categoryFor(code: number): Category {
  if (vehicleCodes.has(code)) return 'xe'
  if (accessoryCodes.has(code)) return 'phukien'
  if (childCodes.has(code)) return 'treem'
  if (seniorCodes.has(code)) return 'caotuoi'
  if (sportCodes.has(code)) return 'thethao'
  if (animalCodes.has(code)) return 'dongvat'
  if (femaleCodes.has(code)) return 'nu'
  return 'nam'
}

function seriesFor(code: number, category: Category): string {
  if (code >= 2352 && code <= 2372) return 'Động vật hoang dã'
  if ((code >= 2378 && code <= 2412) || (code >= 2452 && code <= 2483)) return 'Fantasy & Chibi'
  if (code >= 2490 && code <= 2492) return 'Khủng long'
  if (category === 'xe') return 'Phương tiện'
  if (category === 'phukien') return 'Phụ kiện Diorama'
  if (category === 'dongvat') return 'Động vật & Chibi'
  if (category === 'thethao') return 'Thể thao'
  return 'Đời thường'
}

const defaultNames: Record<Category, string> = {
  nam: 'Nhân vật nam tạo dáng',
  nu: 'Nhân vật nữ tạo dáng',
  giadinh: 'Cặp đôi đời thường',
  treem: 'Nhân vật trẻ em',
  caotuoi: 'Nhân vật lớn tuổi',
  thethao: 'Nhân vật thể thao',
  dongvat: 'Động vật và nhân vật chibi',
  xe: 'Phương tiện diorama',
  phukien: 'Phụ kiện diorama',
  duongpho: 'Nhân vật đường phố',
  movie: 'Nhân vật phim ảnh & manga',
  famous: 'Nhân vật nổi tiếng',
}

function product(code: number): Product {
  const category = categoryFor(code)
  const series = seriesFor(code, category)
  const name = specialNames[code] ?? `${defaultNames[category]} ${code}`
  const preOrder = preOrderCodes.has(code)
  return {
    id: `sp-${code}`,
    code: `${code}`,
    name,
    category,
    series,
    price: 30000,
    material: 'Resin 3D cao cấp',
    rating: 5,
    reviews: 20 + (code % 30),
    badge: preOrder ? 'Pre-order' : 'Mới',
    inStock: !preOrder,
    accent: accents[category],
    image: `./products/sp-${code}.webp`,
    tags: [category, series.toLocaleLowerCase('vi'), name.toLocaleLowerCase('vi'), `${code}`],
    description: `Mô hình ${name.toLocaleLowerCase('vi')} với tạo hình rõ nét, phù hợp trưng bày và dựng diorama chủ đề ${series.toLocaleLowerCase('vi')}.`,
    highlights: ['Tạo hình rõ nét', 'Tối ưu cho in resin 3D', 'Phù hợp trưng bày và dựng diorama'],
  }
}

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
    .filter((code) => !omittedCodes.has(code))
    .map(product)
}

export const batch2300Products = range(2300, 2399)
export const batch2400Products = range(2400, 2499)
export const batch2500Products = range(2500, 2599)
