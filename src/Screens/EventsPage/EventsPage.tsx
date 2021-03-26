import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading";
import defImg from "../../assets/header_default.jpg";
export default function EventsPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
    <Loading loading={props.catLoading} />
      <Header
        showBack={true}
        mainText="EVENTS"
        dashimg={defImg}
        user={props.user}
      />
      {props.catLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
        <div style={{ width: "800px", maxWidth: "95vw", margin: "auto" }}>
          <EventCategoryCard slug="all-events" name={null} bgImage={null}/>
          {props.categories.map((value) => {
            return <EventCategoryCard {...value} key={value.slug} />;
          })}
        </div>
        <Footer/>
        </>
      )}
    </>
  );
}
