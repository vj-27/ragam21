import React, { useEffect, useState } from "react";
import { Button, Tabs, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Header from '../../Components/Header/Header';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import { EventById, EventsInCategory, PropTypes } from '../../data';
import { backendURI } from '../../data';
const { TabPane } = Tabs;
interface ParamTypes {
  eId: string
}

export default function EventDetails(props: PropTypes) {

  let { eId } = useParams<ParamTypes>();
  const [isEventFound, setisEventFound] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isuserLoading, setisuserLoading] = useState(true);
  const [catCount, setCatCount] = useState(0);
  const [eventCount, seteventCount] = useState(0);
  const [Registerbtntext, setRegisterbtntext] = useState("Register");
  const [isregButton, setisregButton] = useState(true);
  const [isPosted, setisPosted] = useState(false);
  const [error, setError] = useState(null);
  const [currentEventid, setcurrentEventid] = useState(0)
  const [userDetails, setuserDetails] = useState({
    
      "id": 0,
      "email": "",
      "name": "",
      "phoneNumber": "",
      "created_at": "",
      "updated_at": "",
      "ragamID": "",
      "collegeName": "",
      "gender": "",
      "eventDetails":Array< {
          
        "id": 0,
        "event": 0,
        "status": "",
        "published_at": "",
        "created_at": "",
        "updated_at": ""
}
      >
  
    ()});

  

  function headerimg() {
    var k: string = "";
    EventsInCategory.filter(val => {
      var id: string;
      id = String(val.id);
      
      if (id == eId) {
        k = val.coverimg;
      }
    })

    return k;
  }



  useEffect(() => {
    for (let i = 0; i < props.categories.length; i++) {
      for (let j = 0; j < props.categories[i].events.length; j++) {
       

        if (eId.localeCompare(props.categories[i].events[j].slug) == 0) {
          setCatCount(i);
          setisEventFound(true)
          seteventCount(j)
          setisLoading(false);
          setcurrentEventid(props.categories[i].events[j].id)
          console.log("got");
          break;
        }
          setisLoading(false);
      }
    }
  },[])
  useEffect(() => {
    if(props.user.isLoggedIn && !isLoading){
      fetch(backendURI + "users/me", {method: "GET", headers:{
        Authorization : "Bearer "+props.user.token
      }})
        .then(res => res.json())
        .then(
          (result) => {
            setisuserLoading(false);
            setuserDetails(result);
            
            for (let index = 0; index < result.eventDetails.length; index++) {
              if (currentEventid==result.eventDetails[index].event) {
                setisregButton(false)
                break
              }  
              
            }
          },
          (error) => {
            setisuserLoading(false);
            setError(error);
          }
        )
    }
  console.log(userDetails)
  }, [isLoading,isPosted])

  function register(userDetails:{
    id: Number,
    "email": string,
    "name": string,
    "phoneNumber": string,
    "created_at": string,
    "updated_at": string,
    "ragamID": string,
    "collegeName": string,
    "gender": string,
    "eventDetails":Array< {
        
      "id": Number,
      "event": number,
      "status": string,
      "published_at": string,
      "created_at": string,
      "updated_at": string
}
    >}
    ){
      console.log("buttonpressed")
      setRegisterbtntext("Loading..")
    fetch(backendURI + "user-event-details", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer "+props.user.token },
      body: JSON.stringify({
        "user":{
            "id":props.user.id
        },
        "event":{
            "id":currentEventid
        }
    })
  })
  .then(res => res.json())
  .then(
    (result) => {
        setisPosted(true)
        alert("Registration successful!")
        console.log(result)
        
        
    },
    (error) => {
      console.log(error)
      alert("Registration was unsuccesful. Please try again")
    }
  )
  
}

  if (isLoading==false && isuserLoading==false) {
    if (isEventFound) {
      return (
        <>
          <Header mainText={"Event " + eId} showBack={true} dashimg={headerimg()} user={props.user} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "inline-block" }}>
              {props.user.isLoggedIn?(isregButton && <Button
                type="primary"
                className="buttons"
                shape="round"
                id="regbtn"
                icon={<DownloadOutlined />}
                onClick={() => register(userDetails)}
              >
                {Registerbtntext}
        </Button>):<a href={backendURI+"connect/google"}>
            <Button type="primary"
                className="buttons"
                shape="round">
              
                Login
            </Button>
            </a>}
              {/* {EventById.isavailresult && <Button type="primary" shape="round" className="buttons">
                View Results
        </Button>
              } */}
              <Link to={"/myreg/" + eId} >
                {!isregButton && <Button type="primary"  className='buttons' shape="round"  >
                  Myregistration
        </Button>}
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
                {props.categories[catCount].events[eventCount].result&&
                  <TabPane tab="Results" key="4">
                    <Card className="card">
                      
                      <ReactMarkdown source={props.categories[catCount].events[eventCount].result} />
                    </Card>
                  </TabPane>}
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
