import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import '../style.css';
import bannerImg1 from '../../../images/banner/1.JPG';
import bannerImg2 from '../../../images/banner/2.JPG';
import bannerImg3 from '../../../images/banner/3.JPG';
import bannerImg4 from '../../../images/banner/4.JPG';
import bannerImg5 from '../../../images/banner/5.JPG';
import bannerImg6 from '../../../images/banner/6.JPG';
import bannerImg7 from '../../../images/banner/7.JPG';
import bannerImg8 from '../../../images/FreeDelivery.jpg';


SwiperCore.use([Navigation, Pagination, Autoplay]);

export default () => {
  return (
    <div className="BannerWrapper">
    <Swiper className="SliderWrapper"
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={true}
    >
      <SwiperSlide><img alt='' src={bannerImg7} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg2} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg3} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg4} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg5} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg6} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg1} className="SliderImg" /></SwiperSlide>
      <SwiperSlide><img alt='' src={bannerImg8} className="SliderImg" /></SwiperSlide>
    </Swiper>
    </div>
  );
};