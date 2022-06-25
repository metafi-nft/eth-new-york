import React, { useState } from 'react';
// import Head from 'next/head';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import createEmotionCache from '../utility/createEmotionCache';
import '../styles/globals.css';
import { darkTheme } from '../theme';
import * as storeFile from '../store'
import { useMediaQuery } from 'react-responsive'
import { WalletProvider } from '../contexts/wallet-context';

const clientSideEmotionCache = createEmotionCache();
const store = storeFile.store

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [pageLoaded,setPageLoaded] = useState(false)
  const isMobile = useMediaQuery({ maxDeviceWidth: 600 })
  
  React.useEffect(() => {
    setPageLoaded(true)
    store.dispatch({type:"SETISMOBILEVIEW",data:isMobile})
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      {pageLoaded?
      <WalletProvider>
        <Provider store={store} >
            <CssBaseline />
            <Component {...pageProps} />

        </Provider>
      </WalletProvider>

      :
      <></>
      }
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};