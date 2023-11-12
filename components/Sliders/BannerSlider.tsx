import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
interface Slider {
    id: number,
    product_name: string,
    price: number,
    photo_url: string
}

interface SliderProps {
    slider: Slider[]
}

const BannerSlider: React.FC<SliderProps> = ({ slider }) => {
    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
            >
                {slider && slider.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div style={{ backgroundImage: `url(${item.photo_url})` }} className={`w-full bg-cover bg-center h-96`}>
                            <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                                <div className="text-center">
                                    <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">{item.product_name} <br /> <span className="">{item.price} ₼</span></h1>
                                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Start project</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    )
}

export default BannerSlider