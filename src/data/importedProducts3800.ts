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
  cartoon: 'brand',
}

function product(code: number): Product {
  const category: Category = 'nam'
  const series = 'Nhan vat & Diorama'
  const name = `Mo hinh nhan vat ${code}`

  return {
    id: `sp-${code}`,
    code: `${code}`,
    name,
    category,
    series,
    price: 30000,
    material: 'Resin 3D cao cap',
    rating: 5,
    reviews: 20 + (code % 30),
    badge: 'Mới',
    inStock: true,
    accent: accents[category],
    image: `./products/sp-${code}.webp`,
    tags: [category, series.toLocaleLowerCase('vi'), `${code}`],
    description: `Mo hinh nhan vat ma ${code} voi tao hinh ro net, phu hop trung bay va dung diorama.`,
    highlights: ['Tao hinh ro net', 'Toi uu cho in resin 3D', 'Phu hop trung bay va dung diorama'],
  }
}

const omittedCodes = new Set([3871])

function range(start: number, end: number): Product[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
    .filter((code) => !omittedCodes.has(code))
    .map(product)
}

export const batch3800Products = range(3800, 3899)
export const batch3900Products = range(3900, 3999)
