import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FeatureCarousel.css'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

const FeatureCarousel = () => {

    const CarouselItems = [
        {
            imgUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1737476934/express-gym/Leonardo_Lightning_XL_A_picture_of_a_smiling_person_in_the_mid_2_zlympz.jpg",
            alt: "A happy gymgoer",
            title: "Anytime, Anywhere",
            subtitle: "1,500+ Locations",
            content: "No matter where you are in Europe, there’s a club nearby!",
        },
        {
            imgUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1737476930/express-gym/Leonardo_Kino_XL_an_elderly_lady_doing_muscle_ups_in_a_bright_0_cepql5.jpg",
            alt: "A happy gymgoer",
            title: "Train on Your Terms",
            subtitle: "24/7 Access",
            content: "Early bird or night owl? Work out whenever it suits you!",
        },
        {
            imgUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1737476930/express-gym/Leonardo_Lightning_XL_a_normal_looking_person_doing_muscle_ups_1_hrix9o.jpg",
            alt: "A happy gymgoer",
            title: "Unbeatable Value",
            subtitle: "Just €24.99/month",
            content: "All the workouts you want, at a price you’ll love!",
        },
    ];

    const renderCarouselItems = () => {
        return CarouselItems.map((item, i)=> {
            return (
                <SwiperSlide 
                    key={item.imgUrl}
                    className="carousel_item"
                    >
                    <div className="img_ctn">
                        <div className="rectangle"></div>
                        <img 
                            src={item.imgUrl} 
                            alt={item.alt} 
                        />
                         <div className="carousel_card">
                            <h1>{item.title}</h1>
                            <h2>{item.subtitle}</h2>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })
    }
  return (
    <div className="carousel_ctn mobile">
        <Swiper 
            spaceBetween={100}
            slidesPerView={1}
            className='feature_carousel'
            onSwiper={(swiper) => console.log(swiper)}
        >
            {renderCarouselItems()}
        </Swiper>
    </div>
  )
}

export default FeatureCarousel