import Head from "next/head";

const GlobalHead = props => (
  <div>
    <Head>
      <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
      <title>{props.title}</title>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
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
        margin-bottom: 0px !important;
        margin-top: 0px !important;
      }

      .btn {
        margin: 0.375rem 0 !important;
      }
    `}</style>
  </div>
);

export default GlobalHead;
