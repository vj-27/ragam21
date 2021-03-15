import React from "react";
import Header from '../../Components/Header/Header';
import {Link } from 'react-router-dom';
import {PropTypes} from '../../data';
import userEvent from "@testing-library/user-event";
export default function HomePage(props:PropTypes) {
  return (
    <>
      <Header
        mainText="Home"
        backonClick={() => console.log("back clicked @ Home")}
        showBack = {false}
        dashimg="https://wallpaperaccess.com/full/1261637.png"
        user={props.user}
      />
      <div>This is Home Page</div>
      <Link to="/events">Go tp Events</Link>
      {props.user.isLoggedIn && <div>
        User isLoggedIn with email {props.user.email}
        </div>}
    </>
  );
}
