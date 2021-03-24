import React, { useEffect, useState } from "react";
import HeaderProfile from "../../Components/Header/HeaderProfile";
import { EventDetailsType, backendURI, PropTypes, onLogout } from "../../data";
import { Table, Space, Button, Card, message } from "antd";
import useFitText from "use-fit-text";
import EventCard from "../../Components/EventCard/EventCard";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
export default function ProfilePage(props: PropTypes) {
  const { fontSize, ref } = useFitText({ maxFontSize: 200, minFontSize: 80 });
  const [myEvents, setMyEvents] = useState<EventDetailsType[]>([]);
  const history = useHistory();
  useEffect(() => {
    if (props.categories && props.userDetails && props.user.isLoggedIn) {
      let myArr = [];
      for (let i in props.categories)
        for (let j in props.categories[i].events)
          for (let k in props.userDetails.eventDetails) {
            if (
              props.categories[i].events[j].id ==
              props.userDetails.eventDetails[k].event
            )
              myArr.push(props.categories[i].events[j]);
          }
      setMyEvents(myArr);
    }
  }, [props.userDetails.eventDetails, props.categories]);
  return (
    <div>
      <div>
        <HeaderProfile showBack={true} />
      </div>
      <div>
        {props.user.isLoggedIn ? (
          <div style={{ padding: "10px" }}>
            <Table
              className="center-align"
              style={{ maxWidth: "400px" }}
              columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
              dataSource={[
                { left: "RagamId", right: props.userDetails?.ragamID },
                { left: "Name", right: props.userDetails?.name },
                { left: "College", right: props.userDetails?.collegeName },
                { left: "Phone", right: props.userDetails?.phoneNumber },
              ]}
              size="small"
              pagination={false}
            />

            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="ghost"
                id="profile_logout"
                style={{ margin: "10px" }}
                onClick={() => {
                  message.success("Logged out Successfully..",2)
                  onLogout(props);
                  history.push("/");
                }}
              >
                Logout
              </Button>
              <Button
              id="profile_editprofile"
                type="primary"
                style={{ margin: "10px" }}
                onClick={() => {
                  history.push("/editprofile");
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div
              style={{ maxWidth: "200px", marginTop: "40px" }}
              className="center-align"
            >
              <h2>Registered Events</h2>
            </div>
            <div style={{width: "800px", maxWidth: "95vw", margin: "auto"}}>
            {myEvents.map((value) => {
              return (
                  <Link to={"/event/" + value.slug} id={"profile_eventcard_"+value.slug} key={value.slug}>
                    <div className="catCard_mainWrapper">
                      <Card
                        className="catcard"
                        style={{
                          backgroundImage: `url("${
                            backendURI.slice(0, -1) + value.coverImage?.url
                          }")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "15px",
                          height: "150px",
                        }}
                        bodyStyle={{
                          backgroundColor: "rgba(0,0,0,0.55)",
                          height: "100%",
                          borderRadius: "15px 15px 15px 15px",
                        }}
                        hoverable={true}
                      >
                        <div className="categorytext">
                          <h1 style={{ color: "#ffffff", margin: 0 }}>
                            <b>{value.name}</b>
                          </h1>
                        </div>
                      </Card>
                    </div>
                  </Link>
                
              );
            })}
            </div>
          </div>
        ) : (
          <div> You are not logged in!! </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
