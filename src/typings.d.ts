declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_API_KEY: string
    NEXT_PUBLIC_INGEST_WORKFLOW: string
    NEXT_PUBLIC_QUERY_WORKFLOW: string
    NEXT_PUBLIC_QUERY_WITH_MEMORY: 'true' | 'false'
  }
}
