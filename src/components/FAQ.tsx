import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const faqs = [
  {
    q: 'Sản phẩm có phải hàng chính hãng không?',
    a: 'Có. Tất cả mô hình tại KEVIN ĐẦU TO đều là hàng chính hãng, nhập chính ngạch từ Bandai, Good Smile, Hot Toys... Bạn được kiểm tra hàng trước khi thanh toán và shop cam kết hoàn tiền nếu phát hiện hàng giả/hàng dựng.',
  },
  {
    q: 'Làm sao để đặt hàng?',
    a: 'Rất đơn giản: bấm nút “Đặt qua Zalo” hoặc “Messenger” ngay trên sản phẩm bạn thích. Nhân viên sẽ xác nhận mẫu, giá, phí ship và chốt đơn cho bạn trong vài phút. Bạn cũng có thể gọi trực tiếp hotline.',
  },
  {
    q: 'Phí vận chuyển và thời gian giao hàng thế nào?',
    a: 'Nội thành TP.HCM giao trong 2-4 giờ. Toàn quốc 1-3 ngày qua đơn vị vận chuyển uy tín. Freeship cho đơn từ 2.000.000₫. Tất cả đơn đều đóng gói chống sốc kỹ lưỡng.',
  },
  {
    q: 'Tôi có được kiểm tra hàng trước khi thanh toán không?',
    a: 'Có. Shop hỗ trợ COD (thanh toán khi nhận hàng) toàn quốc và cho phép kiểm tra ngoại quan sản phẩm trước khi thanh toán.',
  },
  {
    q: 'Chính sách đổi trả ra sao?',
    a: 'Đổi mới 1-1 trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất (gãy, thiếu chi tiết, lỗi nước sơn). Vui lòng quay video lúc mở hộp để được hỗ trợ nhanh nhất.',
  },
  {
    q: 'Hàng pre-order (đặt trước) hoạt động thế nào?',
    a: 'Với các mẫu pre-order, bạn đặt cọc một phần để giữ suất. Shop cập nhật tiến độ thường xuyên và giao ngay khi hàng về kho. Một số bản giới hạn số lượng rất ít nên nên đặt sớm.',
  },
]

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Hỏi đáp"
          title={<>Câu hỏi thường gặp</>}
          description="Chưa thấy câu trả lời bạn cần? Nhắn Zalo cho shop, tụi mình phản hồi cực nhanh."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <Item q={f.q} a={f.a} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
