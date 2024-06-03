import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/Shared/PageHeader";
import BlogHeader from "../../Components/Shared/BlogHeader";
import { Gallery } from "react-grid-gallery";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
const SingleBlogPage = () => {
  const { id } = useParams(); // Destructure the id from useParams
  const axiosSecure = useAxiosSecure();
  const {
    data: story = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["story", id], // Include id in queryKey for caching
    queryFn: async () => {
      const res = await axiosSecure.get(`/story/${id}`);
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
    return <div>Error fetching story data</div>;
  }

  // Ensure story.author exists before destructuring its properties
  const author = story.author || {};
  const { name, image } = author;
  const commentNum = story.comments.length;

  // Map images for the Gallery component
  const images = story.images.map((img) => ({
    src: img,
    width: 320,
    height: 174,
    caption: "Image Caption Here", // Adjust caption as needed
  }));
  const shareUrl = "http://facebook.com";
  const title = "Facebook";
  return (
    <div className="">
      <BlogHeader
        blogTitle={story.title}
        bgImg={story.featureImage}
        author={name} // Use author name
        authorImg={image} // Use author image
        date={story.date}
        comments={commentNum}
      />
      <div className="flex items-start gap-2 container mx-auto pt-8">
        <div className="basis-2/3">
          <div className=" ">
            <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
            <div className="prose text-[16px] max-w-none">{story.content}</div>
            <div className="">
              <img
                src={story.featureImage}
                alt={story.title}
                className="my-4 w-3/5"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Comments</h2>
              {story.comments && story.comments.length > 0 ? (
                story.comments.map((comment) => (
                  <div key={comment.date} className="mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.userImage}
                        alt="user"
                        className="w-12"
                      />
                      <p className="font-semibold">{comment.user}</p>
                    </div>
                    <p>{comment.comment}</p>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
            <div className="share rounded bg-primary my-4 p-5 ">
              <div className="flex justify-between items-center">
                <div className="social flex gap-4 items-center justify-center text-2xl ">
                  <h1 className="text-xl font-bold text-white capitalize">follow us on</h1>
                  <Link className="p-2 bg-white rounded text-black hover:bg-neutralop hover:text-primary">
                    <FaFacebookF></FaFacebookF>
                  </Link>
                  <Link className="p-2 bg-white rounded text-black hover:bg-neutralop hover:text-primary">
                    <FaTwitter></FaTwitter>
                  </Link>
                  <Link className="p-2 bg-white rounded text-black hover:bg-neutralop hover:text-primary">
                    <FaInstagram></FaInstagram>
                  </Link>
                  <Link className="p-2 bg-white rounded text-black hover:bg-neutralop hover:text-primary">
                    <FaYoutube></FaYoutube>
                  </Link>
                </div>
                <div className="divider lg:divider-horizontal divider-warning"></div>
                <div className="social">
                  <div className="share flex items-center justify-center gap-2">
                    <h1 className="font-bold capitalize flex text-white text-xl">share the post:</h1>
                    <FacebookShareButton
                      url={shareUrl}
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <div>
                      <FacebookShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                      >
                        {(count) => count}
                      </FacebookShareCount>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/3">
          <h1 className="capitalize font-bold text-xl">
            more photos from the gallery
          </h1>
          <Gallery images={images} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
