import React from 'react';
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

function App() {
  const [headerTitle,setHeaderTitle] = React.useState('Home');
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/events">
            <EventsPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/category/:cId">
            <EventListPage/>
          </Route>
          <Route path="/event/:eId">
            <EventDetails/>
          </Route>
          <Route path="/myreg/:eId">
            <MyRegistationPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
