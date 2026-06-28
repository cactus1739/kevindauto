import Reveal from './Reveal'

interface Props {
  label: string
  title: React.ReactNode
  description?: string
  center?: boolean
}

export default function SectionHeading({ label, title, description, center = true }: Props) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="section-label">{label}</span>
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-slate-300 sm:text-lg">{description}</p>}
    </Reveal>
  )
}
