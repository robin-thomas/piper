import Link from "next/link";

import { useContext } from "react";

import { MDBInput } from "mdbreact";
import { Row, Col } from "react-bootstrap";

import { DataContext } from "./DataProvider";

const TextInput = props => {
  const ctx = useContext(DataContext);

  return (
    <Row>
      <Col className={props.class ? props.class : null}>
        {ctx.editable === true ? (
          <MDBInput
            type="text"
            value={props.value ? props.value : ""}
            hint={props.hint}
            onChange={props.onChange}
            disabled={ctx.textDisabled}
            size={props.size ? props.size : "lg"}
          />
        ) : props.link ? (
          <Link href={props.value}>
            <a target="_blank">{props.value}</a>
          </Link>
        ) : props.formatter ? (
          props.formatter(props.value)
        ) : (
          props.value
        )}
      </Col>
      <style jsx global>{`
        .extension-header-name {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 2.25rem;
          color: #202124;
          text-transform: capitalize;
        }
      `}</style>
    </Row>
  );
};

export default TextInput;
