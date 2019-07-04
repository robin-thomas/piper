import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import EmptyRow from "../utils/EmptyRow";

const ExtensionImageSlider = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true
  };

  return (
    <div>
      <EmptyRow />
      {props.images !== undefined ? (
        <Slider {...settings}>
          {props.images.map((imageUrl, index) => (
            <div key={imageUrl}>
              <img src={imageUrl} style={{ width: "60%", margin: "auto" }} />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

export default ExtensionImageSlider;
