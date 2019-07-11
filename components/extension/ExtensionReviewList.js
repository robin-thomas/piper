import Link from "next/link";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBIcon
} from "mdbreact";
import { Button } from "react-bootstrap";

import Timer from "../utils/Timer";

const ExtensionReviewList = ({ rating, review, updated, reviewer }) => {
  const images = [
    "https://mdbootstrap.com/img/Photos/Others/photo1.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo2.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo3.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo4.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo5.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo6.jpg",
    "https://mdbootstrap.com/img/Photos/Others/photo7.jpg"
  ];
  const image = images[Math.floor(Math.random() * images.length)];

  return (
    <MDBCard style={{ width: "26.5rem" }}>
      <MDBCardImage className="img-fluid" src={image} waves />
      <MDBCardBody>
        <MDBCardText>{review}</MDBCardText>
        <Link href={`https://ropsten.etherscan.io/address/${reviewer}`}>
          <a target="_blank" className="extension-review-address">
            <Button variant="primary">{reviewer}</Button>
          </a>
        </Link>
      </MDBCardBody>
      <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
        <ul className="list-unstyled list-inline font-small">
          <li className="list-inline-item pr-2 white-text">
            <MDBIcon far icon="clock" />
            &nbsp;
            <Timer time={1000 * updated} />
          </li>
        </ul>
      </div>
    </MDBCard>
  );
};

export default ExtensionReviewList;
