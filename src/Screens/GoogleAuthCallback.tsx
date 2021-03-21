import { message } from 'antd';
import React, { useState } from 'react';
import {  useLocation, useHistory } from 'react-router-dom';
import { backendURI, PropTypes } from '../data';



const GoogleAuthCallback = (props: PropTypes) => {
  const history = useHistory();
  const [dummmyText, setdummyText] = useState("Authenticating User...");
  const location = useLocation()
  React.useEffect(() => {
    if (!location) {
      return
    }
    const { search } = location
    console.log(search)
    fetch(`${backendURI}auth/google/callback?${search}`, { method: "GET" ,})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.statusCode == 400) {
          console.log("Nah !!!")
          setdummyText("user Authentication Failed. You will be redirected to homePage")
          setTimeout(() => {
            history.push("/")
          }, 1000)
        }
        else {
          let myObj = {
            isLoggedIn: true,
            token: "",
            email: "",
            id: 0,
            name: "",
            phoneNumber: "",
          };
          myObj.token = data.jwt;
          myObj.email = data.user.email;
          myObj.id = data.user.id;
          myObj.name = data.user.name;
          myObj.phoneNumber = data.user.phoneNumber;
          //add eventDetails here..
          message.success("Logged in Successfully..")
          props.setUser(myObj);
          localStorage.setItem("user", JSON.stringify(myObj));
          const navTo = localStorage.getItem("navTo");
          if (navTo) {
            history.push(navTo);
            localStorage.removeItem("navTo");
          } else {
            history.push("/");
          }

        }
      })
  }, [location])
  return (<div>
    {dummmyText}
  </div>)
}
export default GoogleAuthCallback;
