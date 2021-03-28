import { PropTypes, onLogout, backendURI } from "../../data";
import { Button, Input, message, Table,Select } from "antd";
import Header from "../../Components/Header/Header";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";

import defImg from "../../assets/header_default.jpg";
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
      referralCode: string;
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
  const [referralCode, setreferralCode] = useState(props.userDetails.referralCode);
  const [gender,setGender] = useState(props.userDetails.gender);
  useEffect(()=>{
    setName(props.userDetails.name);
    setCollege(props.userDetails.collegeName);
    setPhoneNumber(props.userDetails.phoneNumber);
    setreferralCode(props.userDetails.referralCode);
    setGender(props.userDetails.gender);
  },[props.userDetails])
  const [msg, setMsg] = useState("");
  const re = /^[0-9]{10}$/;

  return (
    <>
      <div>
        <Header
          showBack={true}
          mainText="Edit User Profile"
          dashimg={defImg}
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
                      data-test-id='name-inp'
                      defaultValue={props.userDetails.name}
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  ),
                },
                {
                  left: "Gender",
                  right: (
                    <Select size="large" defaultValue={props.userDetails.gender?props.userDetails.gender:"prefer_not_to_say"} onChange={(e)=>{
                      setGender(e);
                      console.log(e);
                    }}>
                      <Select.Option value="prefer_not_to_say">Prefer not to say</Select.Option>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>

                      </Select>
                  ),
                },
                {
                  left: "College",
                  right: (
                    <Input
                      data-test-id='college-inp'
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
                      data-test-id='phone-inp'
                      defaultValue={props.userDetails.phoneNumber}
                      placeholder="10 digit Phone"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  ),
                },
                {
                  left: "Referral Code",
                  right: (
                    <Input
                      data-test-id='ref-inp'
                      defaultValue={props.userDetails.referralCode}
                      placeholder="Optional"
                      onChange={(e) => {
                        setreferralCode(e.target.value);
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
                if (!name) message.error("Enter a valid name",5);
                else if (!college) message.error("Enter a valid college name",5);
                else if (!phoneNumber || !phoneNumber.match(re))
                  message.error("Enter a valid 10 digit phone number",5);
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
                      gender: gender,
                      referralCode: referralCode
                    }),
                  })
                    .then((res) => res.json())
                    .then(
                      (result) => {
                        //verify the result
                        console.log(result);
                        if (result.statuscode) {
                          message.error(result.message);
                        } else {
                          console.log(result);
                          message.success("Profile updated successfully",5)
                          props.setUserDetails(result);
                          if (eId) history.push("/event/" + eId);
                          else history.push("/profile");
                        }
                        console.log(result);
                      },
                      (error) => {
                        console.log(error);
                        message.error(" Some error occurred. Please try again later");
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
        <div>You are not logged in</div>
      )}
    </>
  );
}
