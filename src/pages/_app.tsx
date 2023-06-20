import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import "styles/globals.css";

dayjs.extend(RelativeTime);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>flowtastic chat retrieval</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
