import { Api } from '@flowtastic/api-client'

export const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  securityWorker(securityData: string | null) {
    return {
      headers: {
        Authorization: `Bearer ${securityData}`,
      },
    }
  },
})

api.setSecurityData(process.env.NEXT_PUBLIC_API_KEY)
