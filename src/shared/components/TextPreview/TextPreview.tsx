import { useShortedText } from './hooks/use-shorted-text'
import styles from './TextPreview.module.css'
import clsx from 'clsx'

interface TextPreviewProps {
  text: string
  initiallyOpened?: boolean
  className?: string
  linkClassName?: string
}

export function TextPreview({ 
  text,
  initiallyOpened = false, 
  className, 
  linkClassName, 
}: TextPreviewProps) {
  const [formattedText, isSmall, isOpened, toggleOpened] = useShortedText(text, initiallyOpened)

  return (
    <div className={clsx(styles.TextPreview, className)}>
      {formattedText}

      {!isSmall ? '... ' : ''}

      {!isSmall && (
        <span 
          className={clsx(styles.TextPreviewLink, linkClassName)}
          onClick={toggleOpened}
        >
          {isOpened ? 'short' : 'more'}
        </span>
      )}
    </div>
  )
}