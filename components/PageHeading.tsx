import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
}

export default function PageHeading({ title, children }: Props) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="items-start space-y-2 pb-6 pt-4 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="items-start space-y-2">{children}</div>
    </div>
  )
}
