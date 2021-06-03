import React, { useEffect, useState } from "react";
import "./App.less";
import EventDetails from "./Components/EventDetails/EventDetails";
import EventListPage from "./Screens/EventsListPage/EventListPage";
import MyRegistationPage from "./Screens/MyRegistrationPage/MyRegistrationPage";
import ProfilePage from "./Screens/ProfilePage/ProfilePage";
import HomePage from "./Screens/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EventsPage from "./Screens/EventsPage/EventsPage";
import GoogleAuthCallback from "./Screens/GoogleAuthCallback";
import RedirectPage from "./Screens/RedirectPage";
import { backendURI, Cats, onLogout } from "./data";
import dayjs from "dayjs";
import EditProfile from "./Screens/ProfilePage/EditProfile";
import Certificates from "./Screens/Certificates/Certificates";
import { message } from "antd";
import PrivacyPage from "./Screens/PrivacyAbout/Privacy";
import AboutPage from "./Screens/PrivacyAbout/About";
import LoginPage from "./Screens/LoginPage";
import TermsPage from "./Screens/PrivacyAbout/ToS";
import ContactsPage from "./Screens/PrivacyAbout/Contacts";
function App() {
  const [categories, setCategories] = useState<Cats[]>([]);
  const [catLoading, setCatloading] = useState(true);
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: "",
    email: "",
    id: 0,
    name: "",
    phoneNumber: "",
  });
  const [userDetails, setuserDetails] = useState({
    id: 0,
    email: "",
    name: "",
    phoneNumber: "",
    created_at: "",
    updated_at: "",
    ragamID: "",
    collegeName: "",
    referralCode: "",
    gender: "",
    eventDetails: Array<{
      id: 0;
      event: 0;
      status: "";
      published_at: "";
      created_at: "";
      updated_at: "";
    }>(),
  });
  function setUserDetailsonLogout() {
    setuserDetails({
      id: 0,
      email: "",
      name: "",
      phoneNumber: "",
      created_at: "",
      updated_at: "",
      ragamID: "",
      referralCode: "",
      collegeName: "",
      gender: "",
      eventDetails: [],
    });
  }
  useEffect(() => {
    const myObj = localStorage.getItem("user");
    if (myObj) {
      const myRealObj = JSON.parse(myObj);
      setUser(myRealObj);
    }

    fetch(backendURI + "categories")
      .then((response) => {
        if (response.ok) return response.json();
        else message.error("Some error Occurred. Please try again later.");
      })
      .then((json) => {
        for (let i in json)
          for (let j in json[i].events) {
            const date = dayjs(json[i].events[j].regStartDate);
            const mdate = dayjs();
            const edate = dayjs(json[i].events[j].regEndDate);
            json[i].events[j].isRegOpen =
              date.diff(mdate) < 0 && edate.diff(mdate) > 0;
          }
        console.log(json);
        setCategories(json);
        setCatloading(false);
      });
  }, []);

  function getUserEvents() {
    console.log("got Profie");
    setCatloading(true);
    if (user.isLoggedIn)
      fetch(backendURI + "users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
        //handle 401 here
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.statusCode == 401) {
            onLogout({
              categories: categories,
              catLoading: catLoading,
              userDetails: userDetails,
              user: user,
              setUser: setUser,
            });
            message.error("Session Expired! Please Login again.", 5);
          } else if (result.statusCode) {
            message.error(result.message, 5);
          } else {
            console.log(user.token);
            setuserDetails(result);
            setCatloading(false);
          }
        });
  }
  useEffect(() => {
    if (user.isLoggedIn) getUserEvents();
  }, [user.isLoggedIn]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/auth/callback">
            <GoogleAuthCallback
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/redirect">
            <RedirectPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/events">
            <EventsPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/profile">
            <ProfilePage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/category/:cId">
            <EventListPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/privacy">
            <PrivacyPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/about">
            <AboutPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/contacts">
            <ContactsPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/termsofservice">
            <TermsPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/event/:eId">
            <EventDetails
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              getUserEvents={getUserEvents}
              setUser={setUser}
            />
          </Route>
          <Route path="/myreg/:eId">
            <MyRegistationPage
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              getUserEvents={getUserEvents}
              setUser={setUser}
            />
          </Route>
          <Route path="/editprofile/:eId">
            <EditProfile
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              getUserEvents={getUserEvents}
              setUser={setUser}
              setUserDetails={setuserDetails}
            />
          </Route>
          <Route path="/editprofile">
            <EditProfile
              categories={categories}
              catLoading={catLoading}
              userDetails={userDetails}
              user={user}
              getUserEvents={getUserEvents}
              setUser={setUser}
              setUserDetails={setuserDetails}
            />
          </Route>
          <Route path="/certificates">
            <Certificates/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
