import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const TourGuides = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: guides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guides");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching guides data</div>;
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
        className="mySwiper wrapSlide"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {guides.map((guide) => (
          <SwiperSlide key={guide._id}>
            <Link to={`/guide/${guide._id}`} className="py-12">
              <div className="card cursor-pointer rounded-none h-[300px] md:h-[220px] px-0 bg-secondary text-white guideCard relative">
                <div className="rounded-full w-4/6 mx-auto">
                  <img
                    src={guide.imageUrl}
                    alt={guide.guideName}
                    className="guideImage"
                  />
                </div>
                <h1 className="text-center font-bold mt-4">{guide.guideName}</h1>
                <div className="bg-black opacity-70 flex items-center justify-center guideOverlay hidden min-w-full min-h-full absolute top-0">
                  <h1 className="capitalize font-bold text-white">
                    see details
                  </h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TourGuides;
