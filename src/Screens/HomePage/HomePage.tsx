import React from "react";
import Header from '../../Components/Header/Header';
import {Link } from 'react-router-dom';
import {PropTypes} from '../../data';
import userEvent from "@testing-library/user-event";
import {Button} from "antd";
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
      <div style={{height:"90vh"}}>
      <div>This is Home Page</div>
      <Link to="/events"><Button>Explore Events</Button></Link>
      {props.user.isLoggedIn && <div>
        User isLoggedIn with email {props.user.email}
        </div>}
        </div>
        <div style={{display:"flex",flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",margin:"auto"}}>
          <Link to="/privacy" style={{marginRight:"15px"}}><h4>Privacy</h4></Link>
          <Link to="/about" style={{marginRight:"15px"}}><h4>About</h4></Link>
          <Link to="/termsofservice"><h4>Terms of Service</h4></Link>
        </div>
        </div>
    </>
  );
}
