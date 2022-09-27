import React from 'react';
import Slider from 'react-slick';

const settings = {
    arrows : false,
    dots : false,
    infinite : true,
    speed: 500,
    slidesToShow : 1,
    slidesToScroll : 1
}

const generateSlide = (slides) => (
    slides ?
        <Slider {...settings}>
            {slides.map(slide => (
                <div key = {slide.id}>
                    <div
                        className="item_slider"
                        style = {{
                            background : `url(/images/covers/${slide.cover}) no-repeat`
                        }}
                    >
                    <div className="caption">
                        <h4>{slide.topic}</h4>
                        <p>{slide.title}</p>
                    </div>

                    </div>
                </div>
            ))}

        </Slider>
    :null
)

const SliderWidget = (props) => {
    return(
        <>
            {generateSlide(props.slides)}
        </>
    )
}

export default SliderWidget;