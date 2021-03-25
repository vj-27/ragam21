import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { useHistory } from "react-router-dom";
import { Card, Typography } from "antd";
import defImg from "../../assets/header_default.jpg";
export default function TermsPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
      <Header
        showBack={true}
        mainText="Terms of Service"
        dashimg={defImg}
        user={props.user}
      />
      <Card style={{ width: "700px", maxWidth: "95vw", margin: "auto" }}>
        <Typography.Paragraph>
          By using this app, the participants agree that they have carefully
          read and agree to the general Ragam guidelines and event rules and
          guidelines for the events you are participating.
        </Typography.Paragraph>
        <Typography.Paragraph>
          In case of any dispute regarding any aspect of Ragam, the decision
          made by the Ragam team will be final.
        </Typography.Paragraph>
        <Typography.Paragraph>
          All the services provided through this app are provided on a best
          effort basis. We will not be held responsible for any losses you
          encounter by the use of this app, including but not limited to loss of
          participation, loss of submission files etc.
        </Typography.Paragraph>
        <Typography.Paragraph>
          We will be committed to working towards the best interests of the
          participants and making your experience a smooth one.
        </Typography.Paragraph>{" "}
      </Card>
    </>
  );
}
