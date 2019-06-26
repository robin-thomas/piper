import Head from "next/head";

import { Container } from "react-bootstrap";

import Header from "../components/Header";
import Extension from "../components/Extension";

export default () => (
  <div>
    <Head>
      <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
      <title>Piper | Decentralized Chromium web store</title>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Head>
    <Header />
    <Extension />
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        font-family: "Roboto", sans-serif;
      }

      button {
        font: 500 14px "Roboto", sans-serif !important;
        letter-spacing: 0.25px !important;
        padding: 8px 24px !important;
      }
    `}</style>
  </div>
);
