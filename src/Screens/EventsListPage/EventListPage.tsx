import React from 'react';
import { Input,Switch } from 'antd';
import EventCard from '../../Components/EventCard/EventCard';
import Header from '../../Components/Header/Header';
import {useParams} from 'react-router-dom';
import {EventsInCategory} from '../../data';
import userEvents from '../../data1.js';
import {useState} from 'react';
interface EventListProps{
    children: React.ReactNode[]
};


interface ParamTypes {
    cId: string
  }
export default function EventListPage(){

    let { cId } = useParams<ParamTypes>();
    
    const [SearchTerm, setSearchTerm] = useState('');
    const [Toggle, setToggle] = useState(false);
    const Toggler=()=>{
        Toggle?setToggle(false):setToggle(true);
    }

    let RegEvents: number[] = [];
    var i;
    function RegEventsID(){
    for (i = 0; i < userEvents.length; i++) {
        RegEvents.push(userEvents[i].id);
      console.log(userEvents[i].id)
      } 
    };
    RegEventsID();

    return(
        <>
        
        <Header showBack={true} mainText={"InsideCategory "+ cId}/>
        <div>
            <div className='center-align' > 
                <div style={{ borderRadius:'10px'}}>
                <Input.Search placeholder="SEARCH...." onChange={event =>{setSearchTerm(event.target.value)}} />
                </div>  
                <div >
                <Switch
                    checkedChildren='Not Registered' unCheckedChildren='All'
                    onClick={Toggler}
                />
                </div>         
            </div>
            {EventsInCategory.filter(val =>{
                if (SearchTerm=='' && !Toggle) {
                    return val
                }
                else if(SearchTerm=='' && Toggle){
                    if (!RegEvents.includes(val.id)){
                        return val
                    }
                }
                else if(val.name.toLowerCase().includes(SearchTerm.toLowerCase()) && Toggle){
                    if (!RegEvents.includes(val.id)){
                        return val
                    }
                }
                else if(val.name.toLowerCase().includes(SearchTerm.toLowerCase())){
                    return val
                }
            }).map((value)=>{
                return <EventCard {...value}/>
            })}
        </div>
        </>
    )
}
