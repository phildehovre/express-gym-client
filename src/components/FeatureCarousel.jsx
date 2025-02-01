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
                        <svg className='glowing-shape' xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="nnneon-grad"><stop stop-color="rgb(37, 230, 204)" stop-opacity="1" offset="0%"></stop><stop stop-color="rgb(37, 230, 204)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="nnneon-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
	                        <feGaussianBlur stdDeviation="17 8" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><filter id="nnneon-filter2" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
	                        <feGaussianBlur stdDeviation="45 17" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g stroke-width="21.5" stroke="url(#nnneon-grad)" fill="none"><rect width="412" height="412" x="194" y="194" filter="url(#nnneon-filter)" rx="0" ry="0"></rect><rect width="412" height="412" x="206" y="194" filter="url(#nnneon-filter2)" opacity="0.25" rx="0" ry="0"></rect><rect width="412" height="412" x="182" y="194" filter="url(#nnneon-filter2)" opacity="0.25" rx="0" ry="0"></rect><rect width="412" height="412" x="194" y="194" rx="0" ry="0"></rect></g></svg>
                        <div className="img_ctn">

                    <img 
                        src={item.imgUrl} 
                        alt={item.alt} 
                    />
                        </div>
                    <div className="carousel_card">
                        <h1>{item.title}</h1>
                        <h2>{item.subtitle}</h2>
                        <p>{item.content}</p>
                    </div>
                </SwiperSlide>
            )
        })
    }
  return (
    <div className="carousel_ctn">
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