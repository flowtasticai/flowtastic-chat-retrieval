import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full bg-gray-100" lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body className="h-full bg-white dark:bg-gray-900 dark:text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
