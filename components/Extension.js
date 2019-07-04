import { Container } from "react-bootstrap";

import ExtensionHeader from "./extension/ExtensionHeader";
import ExtensionDetails from "./extension/ExtensionDetails";
import ExtensionImageSlider from "./extension/ExtensionImageSlider";

const Extension = () => (
  <Container>
    <ExtensionHeader />
    <ExtensionImageSlider
      images={[
        "https://lh3.googleusercontent.com/YemW9Jy9G0HvL3XcdvR5UcFbULGXS1n4QTf2BjROzdXvqjPnycrZeMVy59kkh-3NpQkljlPyiA=w640-h400-e365",
        "https://lh3.googleusercontent.com/AREyFzev3wVPpGJf0edj0HBFGRD7lj_XVw35c1jZ0JdPATsjrx0XXKaibJMAchPJJzdueJIYHA=w640-h400-e365"
      ]}
    />
    <ExtensionDetails />
  </Container>
);

export default Extension;
