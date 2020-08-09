import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../styles/components/slider.scss"

const SimpleSlider = comics => {
  const listComicsNew = Object.entries(comics).map(([key, value]) => {
    return (
      <div>
        <img
          className="comic-img"
          src={`${value.thumbnail.path}.${value.thumbnail.extension}`}
          alt={`${value.title}`}
        />
      </div>
    )
  })

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
        },
      },
    ],
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>{listComicsNew}</Slider>
    </div>
  )
}

export default SimpleSlider
