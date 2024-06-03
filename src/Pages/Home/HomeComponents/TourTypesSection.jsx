import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import './styles.css'
import { Link } from "react-router-dom";

const TourTypesSection = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: tourTypes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tourTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tourTypes");
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
    return <div>Error fetching packages data</div>;
  }
  return (
    <div>
      <h1 className="font-extrabold text-center capitalize text-4xl text-white">
        find your desired package from various types.
      </h1>
      <div className="py-8 mt-5">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={1}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          customTransition="all 1s linear"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={2}
          swipeable
          transitionDuration={5000}
        >
          {tourTypes.map((type) => (
            <Link
              to={`//tourType/${type?.name}`}
              key={type._id}
              className="w-[150px] h-[150px] mx-auto bg-transparent hover:bg-primary hover:border-primary  rounded-full flex items-center justify-center text-center text-white  border-2 cursor-pointer typeParent"
            >
              <div className="wrapper ">
                <img src={type?.icon} alt="" className="w-2/5 mx-auto invert typeIcon" />
                <h1 className="text-xl uppercase font-bold typeText">{type?.name}</h1>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TourTypesSection;
