import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    // <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</section>
    <section className="mx-auto max-w-full px-4 sm:px-6 lg:max-w-6xl xl:max-w-7xl xl:px-0">
      {children}
    </section>
  )
}
