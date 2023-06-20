import { FC, ReactNode } from 'react'

export const Layout: FC<{ children?: ReactNode; footer?: ReactNode }> = ({
  children,
  footer,
}) => {
  return (
    <div className="relative h-full mx-auto max-w-4xl sm:p-6 lg:p-8 bg-white border-gray-200 dark:bg-gray-800">
      {children}
      {footer && (
        <div className="absolute bottom-4 left-4 right-4 bottom-0 sm:left-6 lg:left-8 sm:right-6 lg:right-8 z-50 ">
          {footer}
        </div>
      )}
    </div>
  )
}
