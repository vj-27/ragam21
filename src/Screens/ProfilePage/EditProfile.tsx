import { PropTypes, onLogout, backendURI } from "../../data";
import { Button, Input, message, Table } from "antd";
import Header from "../../Components/Header/Header";
import React, { Dispatch, SetStateAction, useState } from "react";
import Footer from "../../Components/Footer/Footer";

import { useHistory, useParams } from "react-router-dom";
interface EditProps extends PropTypes {
  getUserEvents: () => void;
  setUserDetails: Dispatch<
    SetStateAction<{
      id: number;
      email: string;
      name: string;
      phoneNumber: string;
      created_at: string;
      updated_at: string;
      ragamID: string;
      collegeName: string;
      gender: string;
      eventDetails: {
        id: 0;
        event: 0;
        status: "";
        published_at: "";
        created_at: "";
        updated_at: "";
      }[];
    }>
  >;
}
interface ParamTypes {
  eId: string;
}
export default function EditProfile(props: EditProps) {
  let { eId } = useParams<ParamTypes>();
  const history = useHistory();
  const [name, setName] = useState(props.userDetails.name);
  const [college, setCollege] = useState(props.userDetails.collegeName);
  const [phoneNumber, setPhoneNumber] = useState(props.userDetails.phoneNumber);
  const [msg, setMsg] = useState("");
  const re = /^[0-9]{10}$/;

  return (
    <>
      <div>
        <Header
          showBack={true}
          mainText="Edit User Profile"
          dashimg="https://wallpaperaccess.com/full/1261637.png"
          user={props.user}
        />
      </div>

      {props.user.isLoggedIn ? (
        props.userDetails.ragamID == "" ? (
          <div>loading...</div>
        ) : (
          <>
          <div>
            <Table
              className="center-align"
              style={{ maxWidth: "400px" }}
              columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
              dataSource={[
                { left: "RagamId", right: props.userDetails?.ragamID },
                {
                  left: "Name",
                  right: (
                    <Input
                      defaultValue={props.userDetails.name}
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  ),
                },
                {
                  left: "College",
                  right: (
                    <Input
                      defaultValue={props.userDetails.collegeName}
                      placeholder="College Name"
                      onChange={(e) => {
                        setCollege(e.target.value);
                      }}
                    />
                  ),
                },
                {
                  left: "Phone",
                  right: (
                    <Input
                      defaultValue={props.userDetails.phoneNumber}
                      placeholder="10 digit Phone"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  ),
                },
              ]}
              size="small"
              pagination={false}
            />
            {/* <div>RagamId:{props.userDetails?.ragamID}</div>
            <Input
              defaultValue={props.userDetails.name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              defaultValue={props.userDetails.collegeName}
              placeholder="College Name"
              onChange={(e) => {
                setCollege(e.target.value);
              }}
            />
            <Input
              defaultValue={props.userDetails.phoneNumber}
              placeholder="10 digit Phone"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <div>Id:{props.userDetails?.id}</div> */}
            <br />
            <div>{msg}</div>
            <br />
          </div>
          <Button
          id="Editprofile_submitbtn"
          type="primary"
              className="center-align"
              onClick={() => {
                if (!name) message.error("Enter a valid Name",5);
                else if (!college) message.error("Enter a valid College Name",5);
                else if (!phoneNumber || !phoneNumber.match(re))
                  message.error("Enter a Valid 10 digit phone number",5);
                else {
                  fetch(backendURI + "users/" + props.userDetails.id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + props.user.token,
                    },
                    body: JSON.stringify({
                      name: name,
                      phoneNumber: phoneNumber,
                      collegeName: college,
                    }),
                  })
                    .then((res) => res.json())
                    .then(
                      (result) => {
                        //verify the result
                        console.log(result);
                        if (result.statuscode == 400) {
                          alert(result.message);
                        } else {
                          console.log(result);
                          message.success("Profile Updated Successfully",5)
                          props.setUserDetails(result);
                          if (eId) history.push("/event/" + eId);
                          else history.push("/events");
                        }
                        console.log(result);
                      },
                      (error) => {
                        console.log(error);
                        alert(" Please try again");
                      }
                    );
                }
                console.log(
                  JSON.stringify({
                    name: name,
                    collegeName: college,
                    phone: phoneNumber,
                  })
                );
              }}
            >
              Submit
            </Button>
            <Footer/>
            </>

        )
      ) : (
        <div>You are not Logged In!!</div>
      )}
    </>
  );
}
