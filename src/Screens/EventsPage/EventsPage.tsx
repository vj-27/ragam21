import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import { EventCategories, PropTypes } from '../../data';
import EventCategoryCard from '../../Components/EventCategoryCard/EventCategoryCard';
import { useHistory } from 'react-router-dom';
export default function EventsPage(props: PropTypes) {
    const [isLoading, setisLoading] = useState(true);
    const [isError, setisError] = useState(true);

    useEffect(() => {
         if(props.categories.length != 0){
            setisError(false)
            setisLoading(false)

    }
    if(isLoading&&isError)
            setisLoading(false)

        
    })


   

    
    if (!isError) {
        
        return (
            <>
                <Header showBack={true} mainText="EVENTS" dashimg="https://wallpaperaccess.com/full/1261637.png" user={props.user} />
                {
                    props.categories.map((value) => {
                        return <EventCategoryCard {...value} />
                    })
                }
            </>
        )
    }
    else {
        return (
           <div>{isLoading?"Loading...":"ERROR"}</div>
            
        )
    }


}