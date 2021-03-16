import React from "react";
import { Card } from "antd";
import {Link} from 'react-router-dom';
import userEvents from '../../data1.js';
const eventDetails = {
  eventName: "EventName",
  eventDescription:
    "Event description Event description Event description Event description Event description Event description Event description ",
  eventTime: "5.30pm to 6.50pm"
};

const reg = {
  isRegistered: true
};
interface EventProps{
        id: number;
        name: string
        submissionDate: string;
        description: string;
        isTeamEvent: boolean;
        Rules: string;
        category: number;
        result: string;
        regStartDate: string;
        regEndDate: string;
        minTeamSize: number;
        slug: string,
        isSubmissionEvent: boolean,
        published_at: string,
        created_at: string,
        updated_at: string,
        contacts:{
            id: number,
            name: string,
            phoneNumber:string 
        }[]
        coverImage: null;
}
function EventCard(props:EventProps) {

  let RegEvents: number[] = [];
  var i;
  function RegEventsID(){
  for (i = 0; i < userEvents.length; i++) {
      RegEvents.push(userEvents[i].id);
    console.log(userEvents[i].id)
    } 
  };

  RegEventsID();
  return (
    <div className="eventCard_mainWrapper">
      <Link to={"/event/"+props.slug}>
        <Card
          className="evcard"
          title={props.name}
          extra={
            RegEvents.includes(props.id)? (
              <h3>
                <i>Registered</i>
              </h3>
            ) : (
              ""
            )
          }
          style={{
            
            backgroundImage: `url("${props.coverImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "15px"
            
          }}
          bodyStyle={{ backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "0 0 15px 15px" }}
          headStyle={{
            backgroundColor: "rgba(255,255,255,0.7)",
            fontSize: "200%",
            borderRadius: "15px 15px 0 0"
          }}
          hoverable={true}
        >
          <h3>{props.description}</h3>
          <h2>
            <b> Date: {props.regStartDate}</b>
          </h2>
          <h2>
            <b> Time: {props.regEndDate}</b>
          </h2>
        </Card>
        </Link>
    </div>
  );
}

export default EventCard;
