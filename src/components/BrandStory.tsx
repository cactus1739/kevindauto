import { motion } from 'framer-motion'
import { Quote, Boxes, HandHeart, Trophy } from 'lucide-react'
import Reveal from './Reveal'

const pillars = [
  { icon: Boxes, label: 'Kho hàng tuyển', value: '5000+ mẫu' },
  { icon: HandHeart, label: 'Phục vụ tận tâm', value: '7 ngày/tuần' },
  { icon: Trophy, label: 'Cộng đồng', value: '1.2K+ thành viên' },
]

export default function BrandStory() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Hình minh hoạ */}
        <Reveal>
          <div className="relative">
            <div className="border-gradient overflow-hidden rounded-[28px] bg-gradient-to-br from-violet2-600/25 via-ink-850 to-ink-900 p-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" />
                <div className="absolute bottom-6 right-6 h-44 w-44 rounded-full bg-cyan2-400/20 blur-3xl" />
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                  <span className="font-display text-6xl font-black text-gradient">KĐT</span>
                  <p className="mt-3 max-w-xs text-sm text-slate-300">
                    Từ niềm mê figure &amp; diorama đến cửa hàng mô hình được dân sưu tầm tin tưởng.
                  </p>
                </div>
              </div>
            </div>

            {/* Card trích dẫn nổi */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="card-glass absolute -bottom-6 -right-2 hidden max-w-[230px] gap-3 rounded-2xl p-4 shadow-card sm:flex"
            >
              <Quote className="h-6 w-6 shrink-0 text-brand-400" />
              <p className="text-xs leading-relaxed text-slate-200">
                “Chất lượng đúng như mô tả, đóng gói siêu kỹ. Sẽ quay lại!”
              </p>
            </motion.div>
          </div>
        </Reveal>

        {/* Nội dung */}
        <div>
          <Reveal>
            <span className="section-label">Câu chuyện thương hiệu</span>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Đam mê mô hình, <span className="text-gradient">nâng tầm trải nghiệm</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                <span className="font-semibold text-white">KEVIN ĐẦU TO</span> bắt đầu từ chính niềm đam mê
                sưu tầm figure người và làm diorama. Chúng tôi hiểu cảm giác hồi hộp khi mở hộp, và cả nỗi lo
                khi mua phải hàng lỗi, sai mô tả.
              </p>
              <p>
                Vì vậy, mỗi sản phẩm tại đây đều được tuyển chọn, kiểm tra kỹ và đóng gói cẩn thận như thể
                chúng tôi đang mua cho chính bộ sưu tập của mình. Mục tiêu rất đơn giản: để bạn chỉ cần tận
                hưởng niềm vui sưu tầm.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {pillars.map((p) => (
                <div key={p.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p.icon className="mx-auto h-6 w-6 text-brand-300" strokeWidth={1.6} />
                  <p className="mt-2 font-display text-sm font-bold text-white">{p.value}</p>
                  <p className="text-xs text-slate-400">{p.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
