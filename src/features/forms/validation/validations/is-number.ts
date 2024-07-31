export function isNumber() {
  return (value: any) => typeof value === 'number' && !isNaN(value)
}
