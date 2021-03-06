import Link from "next/link";

import { useEffect, useState } from "react";

import { DataConsumer } from "./utils/DataProvider";

import { Container, Row, Col } from "react-bootstrap";

import PiperContract from "./utils/PiperContract";

const Header = () => {
  const signIn = ctx => {
    if (ctx.email === null) {
      return;
    }

    const { portis } = PiperContract.getWeb3(true);
    if (ctx.email !== "Sign In") {
      const email = ctx.email;

      ctx.setEmail(null);
      portis.showPortis().then(() => {
        ctx.setEmail(email);
      });

      return;
    }

    ctx.setEmail(null);

    portis.onLogin((walletAddress, email) => {
      ctx.setLoggedIn(true);
      ctx.setEmail(email);
      ctx.setAddress(walletAddress);
      console.log(walletAddress);
    });
    portis.onLogout(() => {
      ctx.setLoggedIn(false);
      ctx.setEmail("Sign In");
      ctx.setAddress(null);
    });

    portis.showPortis();
  };

  return (
    <Container fluid="true">
      <Row className="header-container">
        <Col className="align-self-center">
          <Container>
            <Row>
              <Col>
                <img src={require("../static/images/chrome.svg")} />
                <Link href="../index">
                  <a className="header-home-link" title="Piper">
                    <span>Piper | chromium web store</span>
                  </a>
                </Link>
              </Col>
              <DataConsumer>
                {context => (
                  <Col
                    md="auto"
                    xs="12"
                    className="pl-0 align-self-center sign-in text-right"
                    onClick={() => signIn(context)}
                  >
                    <img
                      src={require("../static/images/settings.svg")}
                      style={{ width: "20px" }}
                    />
                    {context.email === null ? (
                      <img
                        src={require("../static/images/loading.svg")}
                        style={{ width: "20px" }}
                      />
                    ) : (
                      <span>{context.email}</span>
                    )}
                  </Col>
                )}
              </DataConsumer>
            </Row>
          </Container>
        </Col>
      </Row>
      <style jsx global>{`
        .header-container {
          background: #fff;
          height: 64px;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
          font-size: 1.375rem;
          font-weight: 400;
          line-height: 1.75rem;
          color: #5f6368;
          letter-spacing: 0px;
        }

        .header-home-link {
          text-decoration: none;
          color: #5f6368;
        }

        .header-home-link:hover {
          color: #5f6368;
        }

        .header-container img {
          width: 30px;
          margin-right: 10px;
        }

        .sign-in {
          color: #5f6368;
          cursor: pointer;
          letter-spacing: 0.01428571em;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.25rem;
        }

        .sign-in:hover {
          color: #1a73e8;
        }
      `}</style>
    </Container>
  );
};

export default Header;
