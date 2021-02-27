import React from "react";
import { Card } from "antd";
import {Link} from 'react-router-dom';
const eventDetails = {
  eventCategory: "Event Category"
};
interface MyProp{
  id: string,
  title: string,
  bgImg: string
}

function EventCategoryCard(props:MyProp) {
  return (
    <Link to={"category/"+props.id}>
    <div className="catCard_mainWrapper">
      <a>
        <Card
          className="catcard"
          style={{
            backgroundImage: `url("${props.bgImg}")`,
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
              <b>{props.title}</b>
            </h1>
          </div>
        </Card>
      </a>
    </div>
    </Link>
  );
}

export default EventCategoryCard;
