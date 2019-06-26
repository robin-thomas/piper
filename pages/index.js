import Head from "next/head";

import { Container } from "react-bootstrap";

import Header from "../components/Header";
import ExtensionHeader from "../components/extension/ExtensionHeader";

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
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
    </Head>
    <Header />
    <Container>
      <ExtensionHeader
        name="Honey"
        iconURI="https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365"
      />
    </Container>
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        font-family: "Roboto", sans-serif;
      }
    `}</style>
  </div>
);
