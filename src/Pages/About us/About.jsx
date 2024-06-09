import React from "react";
import PageHeader from "../../Components/Shared/PageHeader";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "John Doe",
    position: "CEO",
    imageUrl: "https://via.placeholder.com/150",
    description:
      "John has over 20 years of experience in the travel industry. His vision and leadership drive Bengal Trails to new heights.",
  },
  {
    name: "Jane Smith",
    position: "CTO",
    imageUrl: "https://via.placeholder.com/150",
    description:
      "Jane is a tech enthusiast who ensures that our platform is user-friendly and up-to-date with the latest technology.",
  },
  {
    name: "Samuel Green",
    position: "Lead Developer",
    imageUrl: "https://via.placeholder.com/150",
    description:
      "Samuel leads our development team with a focus on creating seamless user experiences and innovative features.",
  },
  // Add more team members as needed
];

const About = () => {
  return (
    <div className="">
      <PageHeader pageTitle={"About Us"} breadCrumbs={"about"} />
      <div className="container mx-auto p-6">
        <section className="text-center mb-12">
          <img
            src="https://i.ibb.co/3WDShF4/Blue-Yellow-Simple-Tour-And-Travel-Logo.png"
            alt=""
            className="w-1/6 mx-auto rounded-md shadow-md shadow-black"
          />
          <div className="flex gap-4 items-center justify-center text-2xl my-4">
            <Link className="p-2 bg-primary rounded text-white">
              <FaFacebookF></FaFacebookF>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaTwitter></FaTwitter>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaInstagram></FaInstagram>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaYoutube></FaYoutube>
            </Link>
          </div>
          <p className="text-gray-600 mb-8">
            At Bengal Trails, we are passionate about showcasing the beauty and
            hospitality of Bangladesh. Our dedicated team works tirelessly to
            provide you with exceptional travel experiences that allow you to
            immerse yourself in the local culture, cuisine, and adventures.
          </p>
          <video className="w-full h-64 md:h-96 mb-8" controls>
            <source
              src="https://www.youtube.com/watch?v=IxF55qB4CuQ&t=4s"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-gray-700 text-center">
            Our mission is to be the leading travel guide for exploring
            Bangladesh. We aim to provide comprehensive and reliable information
            that helps travelers discover the rich cultural heritage, stunning
            landscapes, and diverse activities that Bangladesh has to offer.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-700 mx-auto max-w-xl">
            <li>
              Integrity: We believe in honest and transparent communication with
              our users.
            </li>
            <li>
              Excellence: We strive to provide the highest quality content and
              user experience.
            </li>
            <li>
              Respect: We respect and celebrate the diversity of Bangladesh's
              culture and people.
            </li>
            <li>
              Innovation: We continuously seek new ways to enhance our platform
              and services.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Join Our Team
          </h2>
          <p className="text-gray-700 text-center mb-4">
            We're always looking for passionate individuals to join our team. If
            you love travel and want to make a difference, reach out to us at{" "}
            <a href="mailto:careers@bengaltrails.com" className="text-primary">
              careers@bengaltrails.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
