import Layout from '@/common/layout/Layout';
import '@/styles/globals.css'
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import { ApolloProvider } from "@apollo/client";
import client from "@/common/fetch/apollo-client";
import { UserContextProvider } from '@/common/UserContext';
import { CategoryContextProvider } from '@/common/Contexts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// This way, Per-page layouts are achieved
// TODO wrap in <ThemeProvider attribute="class"></ThemeProvider> to enable dark mode
function getDefaultLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <meta name="description" content="Eshop" />
        <link rel="icon" href="/favicon.ico" />{/** TODO change favicon */}
      </Head>
      <ApolloProvider client={client}>
        <UserContextProvider apolloClient={client}>
          <CategoryContextProvider apolloClient={client}>
            <Layout>
              {page}
            </Layout>
          </CategoryContextProvider>
        </UserContextProvider>
      </ApolloProvider>
    </>
  )
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  // Either page has special layout defined, or use the default one
  let getLayout = Component.getLayout || getDefaultLayout;
  return getLayout(<Component {...pageProps} />)
}
