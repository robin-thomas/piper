import Link from "next/link";

import { Card, Row } from "react-bootstrap";

import EmptyRow from "../utils/EmptyRow";
import ExtensionRating from "../extension/header/ExtensionRating";

const ExtensionList = ({ name, rating, iconURL, hash }) => {
  const choices = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark"
  ];
  const choice = choices[hash.charCodeAt(hash.length - 1) % choices.length];

  const getExtensionIcon = iconURL => {
    try {
      new URL(iconURL);
      return iconURL;
    } catch (err) {
      return `https://ipfs.infura.io/ipfs/${iconURL}`;
    }
  };

  return (
    <div>
      <Link href={`/extensions?hash=${hash}`} as={`/extensions/${hash}`}>
        <a className="content-extension-listing-rating">
          <Card bg={choice} text="white" style={{ padding: "10px" }}>
            <Card.Img variant="top" src={getExtensionIcon(iconURL)} />
          </Card>
          <EmptyRow cls="content-extension-listing-name-margin" />
          <span className="content-extension-listing-name">
            {name !== null && name.length > 20
              ? `${name.substring(0, 20)}...`
              : name}
          </span>
          <Row>
            <ExtensionRating rating={rating} />
          </Row>
        </a>
      </Link>
      <style jsx global>{`
        .content-extension-listing-name {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          color: #3c4043;
          word-break: break-word;
        }

        .content-extension-listing-name-margin {
          margin-top: -11px;
        }

        .content-extension-listing-rating {
          letter-spacing: 0.01785714em;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25rem;
          color: #5f6368;
          font-weight: normal;
        }

        .content-extension-listing-rating:hover {
          color: #5f6368;
        }
      `}</style>
    </div>
  );
};

export default ExtensionList;
