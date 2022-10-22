import React from 'react';

import { Layout } from '../components';

import '../styles/globals.css';

import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      
    </Layout>
  )
}

export default MyApp
