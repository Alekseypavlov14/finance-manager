import { TEXT_SHORTENER_MIN_LENGTH } from '@/shared/constants'
import { useState } from 'react'

export type UseShortedTextResult = [string, boolean, boolean, () => void]

export function useShortedText(text: string, initiallyOpened: boolean = false): UseShortedTextResult {
  const [isOpened, setOpened] = useState(initiallyOpened)
  
  const isSmall = text.length <= TEXT_SHORTENER_MIN_LENGTH

  const formattedText = isSmall 
    ? text 
    : isOpened 
      ? text 
      : getShortedText(text)

  function toggleOpened() {
    setOpened(isOpened => !isOpened)
  }

  return [formattedText, isSmall, isOpened, toggleOpened]
}

function getShortedText(text: string) {
  return text.slice(0, TEXT_SHORTENER_MIN_LENGTH)
}
