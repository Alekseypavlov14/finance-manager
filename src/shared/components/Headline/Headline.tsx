import { mapLevelToHeadlineClassName } from './constants'
import { HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Headline.module.css'

export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  level?: HeadlineLevel
  center?: boolean
}

export function Headline({ 
  level = 1,
  center, 
  className,
  ...props
}: HeadlineProps) {
  const classNames = clsx(mapLevelToHeadlineClassName[level], center && styles.Center, className)
  
  const headlineProps = {
    className: classNames,
    ...props,
  }

  if (level === 2) return <h2 {...headlineProps} />
  if (level === 3) return <h3 {...headlineProps} />
  if (level === 4) return <h4 {...headlineProps} />
  if (level === 5) return <h5 {...headlineProps} />
  if (level === 6) return <h6 {...headlineProps} />

  return <h1 {...headlineProps} />
}