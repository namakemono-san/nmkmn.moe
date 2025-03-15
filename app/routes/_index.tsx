import React from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Accounts from "~/components/core/Accounts";
import Friends from "~/components/core/Friends";

interface SectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  className = "",
  children,
}) => (
  <div className={className}>
    <div className="text-white text-lg font-bold bg-theme bg-opacity-50 py-1 px-4 rounded-xl backdrop-blur-sm">
      {title}
    </div>
    <div className="mt-2 mb-4">{children}</div>
  </div>
);

const Index: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed blur-xl brightness-50 backdrop-blur-xl top-0 left-0 w-full h-full z-0">
        <Swiper
          loop={true}
          spaceBetween={0}
          centeredSlides={true}
          speed={2000}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          effect={"fade"}
          modules={[Autoplay, EffectFade]}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="/images/bg_1.png"
                className="w-full h-full object-cover"
                alt="bg-1"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="/images/bg_2.png"
                className="w-full h-full object-cover"
                alt="bg-2"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="/images/bg_3.png"
                className="w-full h-full object-cover"
                alt="bg-3"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="/images/bg_4.png"
                className="w-full h-full object-cover"
                alt="bg-4"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="relative z-10 flex flex-col left-0 top-0 right-0 min-h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 m-2 md:m-8 flex-grow relative">
          <Section title="Accounts" className="w-full md:w-[40%]">
            <Accounts />
          </Section>

          <Section title="Friends" className="w-full md:w-[40%]">
            <Friends />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Index;
