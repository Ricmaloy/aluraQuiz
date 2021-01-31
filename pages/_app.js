import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @keyframes SaberShadow {
    0% {
        box-shadow: 1px 0px 20px 0px #f00;
    }
    50% {
        box-shadow: 1px 0px 20px 5px #f00;
    }
    100% {
      box-shadow: 1px 0px 20px 0px #f00;
    }
  }

  @keyframes SaberLoad {
    0% {
        width: 0%
    }
    100% {
      width: 80%
    }
  }

  @keyframes counter {
  1% {
    content: '0';
  }
  10% {
    content: '10';
  }
  20% {
    content: '20';
  }
  30% {
    content: '30';
  }
  40% {
    content: '40';
  }
  50% {
    content: '50';
  }
  60% {
    content: '60';
  }
  70% {
    content: '70';
  }
  80% {
    content: '80';
  }
  90% {
    content: '90';
  }
  100% {
    content: '100';
  }
}
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>How much you know about Star Wars ?</title>
        <link rel="shortcut icon" href={db.ico} type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <meta property="og:image" content={db.bg} />
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content={db.description} />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
