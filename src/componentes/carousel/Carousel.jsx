// Carousel.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "https://http2.mlstatic.com/D_NQ_666280-MLA84512098490_052025-OO.webp",
    "https://http2.mlstatic.com/D_NQ_642987-MLA84810134199_052025-OO.webp",
    "https://http2.mlstatic.com/D_NQ_780668-MLA84686254648_052025-OO.webp"
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="carousel-img-container">
            <img src={img} alt={`Slide ${idx}`} className="carousel-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
