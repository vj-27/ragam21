import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { useHistory } from "react-router-dom";
import { Card, Typography } from "antd";
export default function PrivacyPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
      <Header
        showBack={true}
        mainText="Privacy"
        dashimg="https://wallpaperaccess.com/full/1261637.png"
        user={props.user}
      />
      <Card style={{ width: "700px", maxWidth: "95vw", margin: "auto" }}>
        <h3>What we collect</h3>
        <ul>
          <li>Your name </li>
          <li>Name of the college </li>
          <li> Phone number</li>
          <li> Gender</li>
          <li> List of events you are registered for</li>
          <li> Submissions you upload for each event</li>
        </ul>

        <h3>Data retention policy</h3>
        <ul>
          <li>
            {" "}
            For the events you have participated, we will generate a
            participation certificate containing your name, college name and
            your result for that event. This certificate will be perpetually
            stored in our certificate server. You may unregister before the
            registration closes to avoid this.
          </li>
          <li>
            {" "}
            The submissions you upload will be kept till July 2021. You may also
            delete the submissions before the submissions closing deadline
          </li>
        </ul>
        <h3>Data sharing policy</h3>
        <ul>
          <li>
            {" "}
            Your name, college name, mobile number and gender will be shared to
            next year’s Ragam team.
          </li>
          <li>
            {" "}
            Your submissions will be shared to the judges of corresponding
            events.
          </li>
        </ul>
      </Card>
    </>
  );
}
