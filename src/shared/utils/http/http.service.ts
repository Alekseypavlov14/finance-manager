export class HttpService {
  private api: string

  constructor(api: string = '') {
    this.api = api
  }

  async get(route: string, headers: Record<string, string> = {}): Promise<any> {
    const response = await fetch(this.getAPIEndpoint(route), {
      method: 'GET',
      headers
    })
    return this.parseResponse(response)
  }

  async post(route: string, body: any, headers: Record<string, string> = {}): Promise<any> {
    const response = await fetch(this.getAPIEndpoint(route), {
      method: 'POST',
      headers: headers,
      body: this.getRequestBody(body)
    })
    return this.parseResponse(response)
  }

  async put(route: string, body: any, headers: Record<string, string> = {}): Promise<any> {
    const response = await fetch(this.getAPIEndpoint(route), {
      method: 'PUT',
      headers: headers,
      body: this.getRequestBody(body)
    })
    return this.parseResponse(response)
  }

  async delete(route: string, headers: Record<string, string> = {}): Promise<any> {
    const response = await fetch(this.getAPIEndpoint(route), {
      method: 'DELETE',
      headers: headers,
    })
    return this.parseResponse(response)
  }

  private parseResponse(res: Response): Promise<any> {
    return res.json()
  }

  private getAPIEndpoint(route: string): string {
    return this.api + route
  }

  private getRequestBody(body: any): string | FormData {
    return body instanceof FormData ? body : JSON.stringify(body)
  }
}

export const JSONRequestHeaders = {
  'Content-Type': 'application/json'
}

export const httpService = new HttpService()
