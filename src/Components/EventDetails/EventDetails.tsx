import React, { useEffect, useState } from "react";
import { Button, Tabs, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Header from '../../Components/Header/Header';
import { useParams, Link } from 'react-router-dom';
import { EventById, EventsInCategory, PropTypes } from '../../data';
const { TabPane } = Tabs;
interface ParamTypes {
  eId: string
}

export default function EventDetails(props: PropTypes) {

  let { eId } = useParams<ParamTypes>();
  const [isEventFound, setisEventFound] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [catCount, setCatCount] = useState(0);
  const [eventCount, seteventCount] = useState(0);
  const [isregButton, setisregButton] = useState(true);

  

  var i;
  var j;
  function headerimg() {
    var k: string = "";
    EventsInCategory.filter(val => {
      var id: string;
      id = String(val.id);
      console.log(id);
      if (id == eId) {
        k = val.coverimg;
      }
    })

    return k;
  }



  useEffect(() => {
    for (i = 0; i < props.categories.length; i++) {
      for (j = 0; j < props.categories[i].events.length; j++) {
       

        if (eId.localeCompare(props.categories[i].events[j].slug) == 0) {
          setCatCount(i);
          setisEventFound(true)
          seteventCount(j)
          setisLoading(false);
          console.log("got");
          break;
        }
        if (isLoading)
          setisLoading(false);
      }


    }
  })

  if (isLoading == false) {
    if (isEventFound) {
      return (
        <>
          <Header mainText={"Event " + eId} showBack={true} dashimg={headerimg()} user={props.user} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "inline-block" }}>
              {EventById.isregopen && <Button
                type="primary"
                className="buttons"
                shape="round"
                icon={<DownloadOutlined />}
              >
                Register
        </Button>}
              {EventById.isavailresult && <Button type="primary" shape="round" className="buttons">
                View Results
        </Button>
              }
              <Link to={"/myreg/" + eId} >
                <Button type="primary" shape="round" className='buttons' >
                  Myregistration
        </Button>
              </Link>
            </div>
            <div style={{ minWidth: "80%" }}>
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="About" key="1">
                  <Card className="card"> {props.categories[catCount].events[eventCount].name}</Card>
                </TabPane>
                <TabPane tab="Rules" key="2">
                  <Card className="card"> {props.categories[catCount].events[eventCount].Rules}</Card>
                </TabPane>
                <TabPane tab="Contact" key="3">
                  <Card className="card">{
                    props.categories[catCount].events[eventCount].contacts.map((contact)=>{
                      return(
                        <ul>
                          <li>Name:{contact.name}</li>
                          <li >Phone Number:{contact.phoneNumber}</li>
                        </ul>
                      )
                    })
                  }</Card>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </>);
    }
    else {
      return (
        <div>Error</div>
      )
    }

  }
  else {
    return (
      <div>Loading...</div>
    )
  }

}














