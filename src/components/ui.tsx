/**
 * Card and Input – themed to match @fanvue/ui design tokens.
 * Button comes from @fanvue/ui.
 */

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export function Card({
  className = '',
  style,
  children,
  ...rest
}: { children?: ReactNode; className?: string } & ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-background-inverse-solid-light)] bg-[var(--color-background-150)] shadow-sm ${className}`}
      style={{ ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Input({
  className = '',
  style,
  ...rest
}: ComponentPropsWithoutRef<'input'> & { className?: string }) {
  return (
    <input
      className={`rounded-lg border border-[var(--color-background-inverse-solid-light)] bg-[var(--color-background-150)] px-3 py-2 text-sm text-[var(--color-body-100)] placeholder-[var(--color-body-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-1 ${className}`}
      style={{ ...style }}
      {...rest}
    />
  )
}
