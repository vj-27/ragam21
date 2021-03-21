import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { useHistory } from "react-router-dom";
export default function EventsPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
      <Header
        showBack={true}
        mainText="EVENTS"
        dashimg="https://wallpaperaccess.com/full/1261637.png"
        user={props.user}
      />
      {props.catLoading ? (
        <div>Loading ...</div>
      ) : (
        <div style={{ width: "800px", maxWidth: "95vw", margin: "auto" }}>
          {props.categories.map((value) => {
            return <EventCategoryCard {...value} key={value.slug} />;
          })}
        </div>
      )}
    </>
  );
}
