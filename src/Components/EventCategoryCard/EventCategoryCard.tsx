import React from "react";
import { Card } from "antd";
import {Link} from 'react-router-dom';

interface MyProp{
        id: number,
        name: string,
        slug: string,
        published_at: string,
        created_at:string ,
        updated_at:string ,
        bgImage: null,
    events:{
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
    }[],

}

function EventCategoryCard(props:MyProp) {
  return (
    <Link to={"category/"+props.slug}>
    <div className="catCard_mainWrapper">
      <a>
        <Card
          className="catcard"
          style={{
            backgroundImage: `url("${props.bgImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          bodyStyle={{
            backgroundColor: "rgba(255,255,255,0.7)",
            height: "100%"
          }}
          hoverable={true}
        >
          <div className="categorytext">
            <h1>
              <b>{props.name}</b>
            </h1>
          </div>
        </Card>
      </a>
    </div>
    </Link>
  );
}

export default EventCategoryCard;
