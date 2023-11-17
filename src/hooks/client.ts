import { Flowtastic } from '@flowtastic/api-client'

export const api = new Flowtastic({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
})
