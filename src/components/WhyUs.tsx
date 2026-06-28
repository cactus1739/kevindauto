import { BadgeCheck, PackageCheck, Headphones, RefreshCw, Gem, Truck } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const features = [
  {
    icon: BadgeCheck,
    title: 'Chính hãng 100%',
    desc: 'Mô hình resin in 3D độ phân giải cao, tuyển chọn kỹ từng mẫu. Cam kết hoàn tiền nếu sai mô tả.',
    color: 'text-cyan2-400',
    bg: 'bg-cyan2-400/15',
  },
  {
    icon: Gem,
    title: 'Tuyển chọn từng món',
    desc: 'Mỗi sản phẩm được kiểm tra nước sơn, khớp, hộp box trước khi lên kệ và trước khi giao.',
    color: 'text-brand-300',
    bg: 'bg-brand-500/15',
  },
  {
    icon: PackageCheck,
    title: 'Đóng gói chống sốc',
    desc: 'Xốp khí, góc bảo vệ, thùng carton 5 lớp. Mô hình đến tay nguyên vẹn như trên kệ.',
    color: 'text-gold-400',
    bg: 'bg-gold-400/15',
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả 7 ngày',
    desc: 'Lỗi nhà sản xuất đổi mới 1-1. Cho kiểm tra hàng trước khi thanh toán (COD toàn quốc).',
    color: 'text-violet2-400',
    bg: 'bg-violet2-500/15',
  },
  {
    icon: Headphones,
    title: 'Tư vấn tận tâm',
    desc: 'Đội ngũ mê mô hình thật sự, tư vấn dòng phù hợp ngân sách và “gu” của bạn qua Zalo.',
    color: 'text-cyan2-400',
    bg: 'bg-cyan2-400/15',
  },
  {
    icon: Truck,
    title: 'Giao nhanh toàn quốc',
    desc: 'Nội thành 2-4h, toàn quốc 1-3 ngày. Freeship cho đơn từ 2 triệu.',
    color: 'text-brand-300',
    bg: 'bg-brand-500/15',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Vì sao chọn chúng tôi"
          title={<>Mua mô hình, yên tâm tuyệt đối</>}
          description="Không chỉ bán hàng — KEVIN ĐẦU TO đồng hành cùng bạn trong cả hành trình sưu tầm."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className={`inline-grid h-12 w-12 place-items-center rounded-2xl ${f.bg}`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
