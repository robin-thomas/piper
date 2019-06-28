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
        href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.3/css/mdb.min.css"
        rel="stylesheet"
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
      <link
        rel="stylesheet"
        href="https://widget.kyber.network/v0.7.0/widget.css"
      />
      <script
        async
        src="https://widget.kyber.network/v0.7.0/widget.js"
      ></script>
    </Head>
    <Header />
    <Extension
      name="Honey"
      iconURL="https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365"
      developer="https://www.joinhoney.com/"
      category="Shopping"
      downloads="699"
      rating={2.5}
      reviews="6788"
      network="ropsten"
      developerETH="0x63B42a7662538A1dA732488c252433313396eade"
      authorEditable={true}
      extensionSize="11110555"
      version="3.1.19252.1308"
    />
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
        margin: 0.35rem 0 !important;
      }

      .md-form {
        margin-bottom: 0px;
        margin-top: 0px;
      }
    `}</style>
  </div>
);
