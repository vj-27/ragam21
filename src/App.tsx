import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import EventCard from './Components/EventCard/EventCard';
import EventCategoryCard from './Components/EventCategoryCard/EventCategoryCard';
import EventDetails from './Components/EventDetails/EventDetails';
import "antd/dist/antd.css";
import EventListPage from './Screens/EventsListPage/EventListPage';
import MyRegistationPage from './Screens/MyRegistrationPage/MyRegistrationPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';
import HomePage from './Screens/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EventsPage from './Screens/EventsPage/EventsPage';
import GoogleAuthCallback from './Screens/GoogleAuthCallback';
import { OmitProps } from 'antd/lib/transfer/ListBody';
function App() {
  const [headerTitle, setHeaderTitle] = React.useState('Home');

  const [user, setUser] = useState({
    isLoggedIn: false,
    token: "",
    email: "",
    id: 0,
    name: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const myObj = localStorage.getItem("user");
    if (myObj) {
      const myRealObj = JSON.parse(myObj);
      setUser(myRealObj);
    }


  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} setUser={setUser}/>
          </Route>
          <Route path="/auth/callback">
            <GoogleAuthCallback user={user} setUser={setUser} />
          </Route>
          <Route path="/events">
            <EventsPage user={user} setUser={setUser} />
          </Route>
          <Route path="/profile">
            <ProfilePage user={user} setUser={setUser} />
          </Route>
          <Route path="/category/:cId">
            <EventListPage user={user} setUser={setUser} />
          </Route>
          <Route path="/event/:eId">
            <EventDetails user={user} setUser={setUser} />
          </Route>
          <Route path="/myreg/:eId">
            <MyRegistationPage user={user} setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
