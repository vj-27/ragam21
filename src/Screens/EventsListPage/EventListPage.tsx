import React from 'react';
import { Input,Switch } from 'antd';
import EventCard from '../../Components/EventCard/EventCard';
import Header from '../../Components/Header/Header';
import {useParams} from 'react-router-dom';
import {EventsInCategory} from '../../data';
interface EventListProps{
    children: React.ReactNode[]
}
function EventList(props: EventListProps){
    return(
    <div>
        <div className='center-align' > 
            <div style={{ borderRadius:'10px'}}>
            <Input.Search/>
            </div>  
            <div >
            <Switch
                checkedChildren='✔'
            />
            </div>         
        </div>
        {props.children}
    </div>

    );
}
interface ParamTypes {
    cId: string
  }
export default function EventListPage(){
    let { cId } = useParams<ParamTypes>();

    return(
        <>
        <Header showBack={true} mainText={"InsideCategory "+ cId}/>
        <EventList>
            {EventsInCategory.map((value)=>{
                return <EventCard {...value}/>
            })}
        </EventList>
        </>
    )
}
