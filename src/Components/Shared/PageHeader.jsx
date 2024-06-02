import React from "react";

const PageHeader = ({ pageTitle, breadCrumbs }) => {
  return (
    <div className="bg-primary pb-12 pt-32 flex items-center justify-center">
      <div className="wrapper">
        <h1 className="text-white font-bold capitalize text-4xl">
          {pageTitle}
        </h1>
        <div className="text-sm breadcrumbs ">
          <ul className="justify-center">
            <li>
              <a href={"/"} className="text-sm text-white">Home</a>
            </li>
            <li>
              <a href={`/${breadCrumbs}`} className="text-sm text-white">{breadCrumbs}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
