declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_API_KEY: string
    NEXT_PUBLIC_INGEST_WORKFLOW: string
    NEXT_PUBLIC_INGEST_INPUT: string
    NEXT_PUBLIC_INGEST_OUTPUT: string
    NEXT_PUBLIC_QUERY_WORKFLOW: string
    NEXT_PUBLIC_QUERY_INPUT: string
    NEXT_PUBLIC_QUERY_OUTPUT: string
  }
}
