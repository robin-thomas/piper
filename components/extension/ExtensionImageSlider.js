import React, { Component } from "react";

import Slider from "react-slick";

import { Row, Col } from "react-bootstrap";

export default class ExtensionImageSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };

    return (
      <div>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        {this.props.images !== undefined ? (
          <Slider {...settings}>
            {this.props.images.map((imageUrl, index) => (
              <div key={imageUrl}>
                <img src={imageUrl} style={{ width: "60%", margin: "auto" }} />
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
    );
  }
}
