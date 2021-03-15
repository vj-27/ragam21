import React from 'react';
import Header from '../../Components/Header/Header';
import {EventCategories,PropTypes} from '../../data';
import EventCategoryCard from '../../Components/EventCategoryCard/EventCategoryCard';
import {useHistory} from  'react-router-dom';
export default function EventsPage(props:PropTypes) {
    
    return(
        <>
        <Header showBack={true} mainText="EVENTS" dashimg="https://wallpaperaccess.com/full/1261637.png" user={props.user}/>
        {
            EventCategories.map((value)=>{
                return <EventCategoryCard {...value} />
            })
        }
        </>
    )
}