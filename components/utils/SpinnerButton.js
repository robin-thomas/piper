import Router from "next/router";

import { useState, useContext } from "react";

import _ from "lodash";
import { Button, Spinner } from "react-bootstrap";

import { DataContext, DataConsumer } from "./DataProvider";

const SpinnerButton = ({ text, onClick, variant, redirect }) => {
  const [disabled, setDisabled] = useState(false);

  const ctx = useContext(DataContext);

  const click = async e => {
    if (onClick) {
      e.preventDefault();
    }

    setDisabled(true);
    ctx.setTextDisabled(true);

    let res = null;
    try {
      if (onClick) {
        res = await onClick();
      }
    } catch (err) {
      alert(err.message);

      if (onClick) {
        setDisabled(false);
      }
      ctx.setTextDisabled(false);

      return;
    }

    if (onClick) {
      setDisabled(false);
    }
    ctx.setTextDisabled(false);

    if (!_.isEmpty(res) && res.redirect && redirect === undefined) {
      Router.push(res.redirect.href, res.redirect.as);
    }
  };

  return (
    <DataConsumer>
      {ctx => (
        <Button
          variant={variant}
          onClick={click}
          disabled={disabled || ctx.textDisabled}
        >
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
      )}
    </DataConsumer>
  );
};

export default SpinnerButton;
