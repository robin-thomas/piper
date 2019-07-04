import { useState, useContext } from "react";

import { Button, Spinner } from "react-bootstrap";

import { DataContext } from "./DataProvider";

const SpinnerButton = ({ text, onClick, variant }) => {
  const [disabled, setDisabled] = useState(false);

  const ctx = useContext(DataContext);

  const click = async e => {
    if (onClick) {
      e.preventDefault();
    }

    setDisabled(true);
    ctx.setTextDisabled(true);

    try {
      if (onClick) {
        await onClick();
      }
    } catch (err) {
      alert(err.message);
    }

    setDisabled(false);
    ctx.setTextDisabled(false);
  };

  return (
    <Button variant={variant} onClick={click} disabled={disabled}>
      <Spinner
        animation={`${disabled ? "border" : null}`}
        size="sm"
        role="status"
      />
      <span
        style={{
          display: `${disabled ? "none" : "inline"}`
        }}
      >
        {text}
      </span>
    </Button>
  );
};

export default SpinnerButton;
