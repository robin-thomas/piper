import { Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import EmptyRow from "../utils/EmptyRow";

const ExtensionImageSlider = ({ images }) => {
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
      {images !== undefined ? (
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
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
