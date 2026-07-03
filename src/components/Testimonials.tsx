import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import StarRating from './StarRating'

const reviews = [
  {
    name: 'Lê Ngọc Hân (18 tuổi)',
    role: 'Bạn tô fig chuyên nghiệp Hà Nội',
    text: 'Phôi nhà anh Kevin thì ổn đẹp trong tầm giá, mẫu mã đa dạng. Mọi người muốn tô nét thì nên thêm lót trắng nha, siêu recommend mọi người mua phôi shop Kevin =))',
    accent: 'brand',
    initials: 'LH',
  },
  {
    name: 'Dino Bùi',
    role: 'Người sơn chuyên nghiệp Sài Gòn',
    text: 'Phôi shop làm đẹp, phôi nếu có lỗi shop bao đổi, về lót là sơn thôi. Lâu lâu còn được tặng quà thêm. Shop ship hàng hơi lâu, nhưng càng lâu càng dễ được quà ❤️',
    accent: 'cyan',
    initials: 'DB',
  },
  {
    name: 'Quốc Hào',
    role: 'Người làm Diorama chuyên nghiệp',
    text: 'Figure chi tiết, tỉ lệ khá nét. Shop xử lý phôi khá tốt, dễ ăn màu không kén, nhiều dáng và khá nhiều mẫu để chọn. Một điểm trừ là shop nói chuyện hơi cọc lóc, còn lại thì good job.',
    accent: 'gold',
    initials: 'QH',
  },
  {
    name: 'Hải Đăng',
    role: 'Collector lâu năm',
    text: 'Đặt mấy mẫu Limited, hàng tuyển kỹ, nước in mịn. Uy tín, sẽ còn ủng hộ dài dài.',
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
    name: 'Nguyễn Hiếu Minh',
    role: 'Người sơn chuyên nghiệp, vui vẻ',
    text: 'Fig rõ từng nét nhỏ, mẫu mã đa dạng, in ko bị vân. Chỉ có mỗi lần lựa hơi choáng vì nhiều model quá giờ có web thì đỡ rồi. Mong shop sớm tích xanh thêm nhiều mẫu cũ',
    accent: 'cyan',
    initials: 'NHM',
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
