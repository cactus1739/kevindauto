import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import StarRating from './StarRating'

const reviews = [
  {
    name: 'Minh Tuấn',
    role: 'Gunpla builder',
    text: 'Mua con PG RX-78 ở đây, khung trong chi tiết khỏi chê, decal đủ. Shop tư vấn nhiệt tình từ A-Z. Quá ưng!',
    accent: 'brand',
    initials: 'MT',
  },
  {
    name: 'Thuỳ Linh',
    role: 'Fan One Piece',
    text: 'Tượng Luffy Gear 5 đẹp xuất sắc, sơn phủ sắc nét. Đóng gói chống sốc cực kỹ, ship nhanh trong ngày.',
    accent: 'cyan',
    initials: 'TL',
  },
  {
    name: 'Quốc Bảo',
    role: 'Dân chơi die-cast',
    text: 'Ferrari F40 1/18 mở cửa capo mượt, chi tiết nội thất ngon. Giá tốt hơn vài chỗ mình tham khảo.',
    accent: 'gold',
    initials: 'QB',
  },
  {
    name: 'Hải Đăng',
    role: 'Collector lâu năm',
    text: 'Đặt bản Limited EVA-01, có giấy chứng nhận đánh số đàng hoàng. Uy tín, sẽ còn ủng hộ dài dài.',
    accent: 'violet',
    initials: 'HĐ',
  },
  {
    name: 'Phương Anh',
    role: 'Mua tặng bạn trai',
    text: 'Không rành mô hình nhưng được shop tư vấn tận tình, chọn đúng món bạn trai thích. Cảm ơn shop nhiều!',
    accent: 'brand',
    initials: 'PA',
  },
  {
    name: 'Trọng Nghĩa',
    role: 'Fan Jujutsu Kaisen',
    text: 'Pre-order Gojo, shop cập nhật tiến độ liên tục, về đúng hẹn. Hàng đẹp hơn ảnh. 10 điểm.',
    accent: 'cyan',
    initials: 'TN',
  },
]

const avatarBg: Record<string, string> = {
  brand: 'bg-brand-500/20 text-brand-200',
  cyan: 'bg-cyan2-400/20 text-cyan2-300',
  gold: 'bg-gold-400/20 text-gold-300',
  violet: 'bg-violet2-500/20 text-violet2-400',
}

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Khách hàng nói gì"
          title={<>1.200+ dân chơi đã tin tưởng</>}
          description="Những đánh giá thật từ cộng đồng sưu tầm — động lực để chúng tôi làm tốt hơn mỗi ngày."
        />

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.06}>
              <figure className="break-inside-avoid rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <StarRating value={5} />
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-200">“{r.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold ${avatarBg[r.accent]}`}>
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{r.name}</span>
                    <span className="block text-xs text-slate-400">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
