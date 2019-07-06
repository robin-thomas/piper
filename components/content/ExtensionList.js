import Link from "next/link";

import { Card } from "react-bootstrap";

import ExtensionRating from "../extension/header/ExtensionRating";

const ExtensionList = ({ rating, iconURL, hash }) => (
  <Link href={`/extensions?hash=${hash}`} as={`/extensions/${hash}`}>
    <a>
      <Card>
        <Card.Img variant="top" src={iconURL} />
        <Card.Body>
          <Card.Text>
            <span>{props.name}</span>
            <ExtensionRating rating={rating} />
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  </Link>
);

export default ExtensionList;
