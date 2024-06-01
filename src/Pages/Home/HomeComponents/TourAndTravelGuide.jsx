import React from "react";
import { Link } from "react-router-dom";

import { FaChalkboardUser, FaPaperPlane } from "react-icons/fa6";
import { RiTimelineView } from "react-icons/ri";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TabOverView from "./TabOverView";
import TabPackages from "./TabPackages";
import TourGuides from "./TourGuides";

const TourAndTravelGuide = () => {
  return (
    <div className="text-center">
      <Tabs>
        <TabList>
          <Tab>
            <div className="flex items-center gap-2 font-bold text-[17px]">
              <RiTimelineView />
              Overview
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center font-bold text-[17px] gap-2">
              <FaPaperPlane />
              Our Packages
            </div>
          </Tab>
          <Tab>
            <div className="flex  items-center font-bold text-[17px] gap-2">
              <FaChalkboardUser />
              Meet Our Tour Guides
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <TabOverView></TabOverView>
        </TabPanel>
        <TabPanel>
          <TabPackages></TabPackages>
        </TabPanel>
        <TabPanel>
          <TourGuides></TourGuides>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourAndTravelGuide;
