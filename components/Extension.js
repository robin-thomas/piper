import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

const Extension = props => (
  <Container>
    <ExtensionHeader
      name="Honey"
      iconURI="https://lh3.googleusercontent.com/RAJJ1tQvIm8nT90qSd8eiU7SoWJifeTsPFPDUeCzcLiTDKcpFXhlsvoJCFIP4ZE61DckltS-=w128-h128-e365"
      author="https://www.joinhoney.com/"
      category="Shopping"
      downloads="699"
      rating={2.5}
      reviews="6788"
    />
    <ExtensionImageSlider
      images={[
        "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
        "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
      ]}
    />
  </Container>
);

export default Extension;
