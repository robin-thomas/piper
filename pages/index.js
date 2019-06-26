import Head from "next/head";

import Header from "../components/Header";

export default () => (
  <div>
    <Head>
      <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
      <title>Piper | Decentralized Chromium Web Store</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    </Head>
    <Header />
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
);
