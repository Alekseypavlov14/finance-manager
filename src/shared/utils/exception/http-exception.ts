export class HTTPException extends Error {
  constructor(readonly code: number) {
    super()
  }
}
