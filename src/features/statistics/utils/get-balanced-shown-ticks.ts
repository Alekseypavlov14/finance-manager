export function getBalancedShownTicks(dataLength: number, ticksAmount: number): number[] {
  if (dataLength <= 0 || ticksAmount <= 0) {
    return new Array(dataLength).fill('')
  }

  if (ticksAmount >= dataLength) {
    return new Array(dataLength).fill(0).map((_, index) => index)
  }

  const groupSize = dataLength / ticksAmount
  const shownTicks: number[] = []

  for (let i = 0; i < ticksAmount; i++) {
    const groupStart = Math.round(groupSize * i)
    const groupEnd = Math.round(groupSize * (i + 1))

    const index = Math.round((groupStart + groupEnd - 1) / 2)
    shownTicks.push(index)
  }

  return shownTicks
}
