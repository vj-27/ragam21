import React from 'react';
import HeaderProfile from '../../Components/Header/HeaderProfile';
import {UserProfile,EventById} from '../../data';
import { Typography } from 'antd';

import useFitText from "use-fit-text";
import EventCard from '../../Components/EventCard/EventCard';
export default function ProfilePage(){
    const {fontSize,ref}=useFitText({maxFontSize:200,minFontSize:80})
    const eventList=[];


    return(<div>
        <div>
            <HeaderProfile showBack={true}/>
        </div>
        
        <div className="center-text">
            <div ref={ref} style={{ fontSize }}>Name:{UserProfile['name']}</div>
            <div ref={ref} style={{ fontSize }}>College:{UserProfile['college']}</div>
            <div ref={ref} style={{ fontSize }}>Number:{UserProfile['phone']}</div>
            <br/>
            <br/>
            <div ref={ref} style={{fontSize}} ><u>registered Events</u></div>
            <EventCard {...EventById}/>
        </div>
    </div>)
}