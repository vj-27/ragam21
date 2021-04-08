import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import defImg from "../../assets/header_default.jpg";
export default function AboutPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
      <Header
        showBack={true}
        mainText="About"
        dashimg={defImg}
        user={props.user}
      />
      <Card style={{ width: "700px", maxWidth: "95vw", margin: "auto" }}>
        <Typography.Paragraph>
          Ever since it began as an ode to a fallen hero, Ragam has always been
          clear about the message it conveys ; to always be creative and
          persistent in all our endeavours. In these troubling times when
          uncertainty is all around us, Ragam is here once again to remind us
          that change is inevitable and that we must learn to adapt to new
          normals. Let the cultural renaissance that Ragam is, ignite an eternal
          flame within you all to strive, to seek and to not yield in the face
          of adversity.
        </Typography.Paragraph>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingTop:"20px"}}>
        <Link to="/contacts">
        <Button type="primary">
          Contacts
        </Button>
        </Link>
        <a href="https://api.ragam.live/uploads/Brochure_compressed_5a7e1c75d3.pdf">
        <Button type="primary">
          Marketing Brochure
        </Button>
        </a>
        </div>
      </Card>
    </>
  );
}
