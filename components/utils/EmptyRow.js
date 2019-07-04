import { Row, Col } from "react-bootstrap";

const EmptyRow = props => (
  <Row className={props.cls ? props.cls : null}>
    <Col>&nbsp;</Col>
  </Row>
);

export default EmptyRow;
