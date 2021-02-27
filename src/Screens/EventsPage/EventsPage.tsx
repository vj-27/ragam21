import React from 'react';
import Header from '../../Components/Header/Header';
import {EventCategories} from '../../data';
import EventCategoryCard from '../../Components/EventCategoryCard/EventCategoryCard';
import {useHistory} from  'react-router-dom';
export default function EventsPage() {
    return(
        <>
        <Header showBack={true} mainText="EVENTS" />
        {
            EventCategories.map((value)=>{
                return <EventCategoryCard {...value} />
            })
        }
        </>
    )
}