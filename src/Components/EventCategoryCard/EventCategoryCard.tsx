import React from "react";
import { Card } from "antd";
import {Link} from 'react-router-dom';
import {backendURI, Cats} from '../../data';

function EventCategoryCard(props:Cats) {
  return (
    <Link to={"category/"+props.slug} id={"EventCategoryCard_"+props.slug}>
    <div className="catCard_mainWrapper">
      
        <Card
          className="catcard"
          style={{
            backgroundImage: `url("${backendURI.slice(0, -1) + props.bgImage?.url}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            height:"150px"
          }}
          bodyStyle={{
            backgroundColor: "rgba(0,0,0,0.55)",
            height: "100%",
            borderRadius: "15px 15px 15px 15px" 
          }}
          
          hoverable={true}
        >
          <div className="categorytext">
            <h1 style={{color:"#ffffff",margin:0}}>
              <b>{props.name}</b>
            </h1>
          </div>
        </Card>
      
    </div>
    </Link>
  );
}

export default EventCategoryCard;
