import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

declare module 'next' {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
