import React, { Fragment } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import "../style.css";
import brand2 from'../../../images/brands/2.jpg';
import brand3 from'../../../images/brands/3.jpg';
import brand4 from'../../../images/brands/4.jpg';
import brand5 from'../../../images/brands/5.jpg';
import brand6 from'../../../images/brands/6.jpg';
import brand7 from'../../../images/brands/7.jpg';
import brand8 from'../../../images/brands/8.jpg';
import brand9 from'../../../images/brands/9.jpg';
import brand10 from'../../../images/brands/10.jpg';

SwiperCore.use([Navigation,Pagination]);

export default () => {
  return (
	<Fragment>
	<div className="BrandsTitle d-none d-lg-block">Our brands</div>
	<div className="BrandsWrapper d-none d-lg-block">
     <div className="row BrandsRow">
	 <Swiper
      slidesPerView={6}
	  pagination={{ clickable: true }}
    >
		{/* <SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img src={brand1} /></div></SwiperSlide> */}
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand2} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand3} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand4} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand5} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand6} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand7} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand8} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand9} /></div></SwiperSlide>
		<SwiperSlide><div className="shadow-sm card-banner SliderBrand"><img alt='' src={brand10} /></div></SwiperSlide>
		</Swiper>
      </div>
    </div>
	</Fragment>
  );
};
