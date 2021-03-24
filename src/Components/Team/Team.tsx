import { RegEventDetail, backendURI } from "../../data";
import React, { useEffect, useState } from "react";
import { Row, Modal, Col, Table, Input, Button, message, Alert } from "antd";
import { name } from "dayjs/locale/*";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
interface TeamProps {
  minTeamSize: number;
  maxTeamSize: number;
  userEvent: RegEventDetail;
  isSubmissionEvent: boolean;
  regEndDate: string;
  setUserEvent: React.Dispatch<
    React.SetStateAction<RegEventDetail | undefined>
  >;
  token: string;
  uId: number;
  getUserEvents: () => void;
}
function getUser(
  val: RegExpMatchArray | null,
  ragamId: string,
  token: string
) { }
function showMessage(
  localTeamx: RegEventDetail["teamMembers"],
  minTeamSize: number,
  maxTeamSize: number
) {
  let cval = localTeamx.length;
  if (cval > maxTeamSize)
    return (
      "Your team has " + cval + " members. maximum limit is " + maxTeamSize
    );
  else if (cval < minTeamSize)
    return (
      "Your team has " + cval + " members. minimum limit is " + minTeamSize
    );
  else return " ";
}
function isNotin(localTeamx: RegEventDetail["teamMembers"], nRId: string) {
  for (let i in localTeamx) {
    if (localTeamx[i].ragamID == nRId) return false;
  }
  return true;
}
function noMinus1(
  localTeamx: {
    id: number;
    email: string;
    name: null | string;
    phoneNumber: null;
    created_at: string;
    updated_at: string;
    ragamID: string;
    collegeName: null | string;
    gender: null;
  }[]
) {
  for (let idx in localTeamx) if (localTeamx[idx].id == -1) return false;

  return true;
}
export default function Team(props: TeamProps) {
  const history = useHistory();
  const [nUser, setNUser] = useState(-2);
  const [nUserObj, setNUserObj] = useState({
    id: -1,
    name: "",
    collegeName: "",
    ragamID: "",
  });

  const [addStatus, setAddStatus] = useState({
    type: 1,
    value: "Enter a valid ragamId",
  });

  const re = /^[a-zA-Z]{6}$/;
  function removeTeamMate(valId: string) {
    let myLocalTeam = [];
    for (let i in props.userEvent.teamMembers) {
      if (props.userEvent.teamMembers[i].ragamID != valId) {
        myLocalTeam.push(props.userEvent.teamMembers[i]);
      }
    }
    fetch(backendURI + "user-event-details/" + props.userEvent.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(
        props.isSubmissionEvent
          ? {
              teamMembers: myLocalTeam,
              submissions: props.userEvent.submissions,
            }
          : { teamMembers: myLocalTeam }
      ),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //verify the result
          console.log(result);
          if (result.statusCode) {
            message.error(result.message);
          } else {
            props.setUserEvent(result);
            message.success("teammate removed successfully!!");
          }
          console.log(result);
        },
        (error) => {
          console.log(error);
          message.error(" Please try again");
        }
      );
  }

  function removeTeamMateConfirm(val: { id: string; name: string }) {
    Modal.confirm({
      title: "Remove Teammate ",
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          {"Are you sure you want to Remove " + val.name + " from you team?"}
        </p>
      ),
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => {
        removeTeamMate(val.id);
      },
    });
  }
  return (
    <div>
      {props.userEvent.teamMembers &&
        showMessage(
          props.userEvent.teamMembers,
          props.minTeamSize,
          props.maxTeamSize
        )}
      <h3 style={{ fontWeight: "bold" }}>Team Members</h3>
      {props.userEvent.teamMembers.map((val) => {
        if (val.id === props.uId)
          return (
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {val.name + " (" + val.ragamID + ") (You)"}
            </div>
          );
      })}
      <div style={{ width: "250px", marginTop: "10px" }} id="myreg_teammates">
        {props.userEvent.teamMembers.map((val) => {
          if (val.id != props.uId)
            return (
              <Row style={{ marginTop: "10px" }} key={val.id}>
                <Col
                  span={20}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <h4 style={{ margin: 0 }}>
                    {val.name + " (" + val.ragamID + ")"}
                  </h4>
                </Col>
                <Col span={4}>
                  {dayjs(props.regEndDate).diff(dayjs()) > 0 && <Button
                    danger
                    id={"MyReg_removefromteam" + val.id}
                    data-test-id='del-btn'
                    type="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      if (dayjs(props.regEndDate).diff(dayjs()) < 0)
                        message.error(
                          "Cannot Edit Team as Registration has ended!"
                        );
                      else
                        removeTeamMateConfirm({
                          id: val.ragamID,
                          name: val.name ? val.name : "UnNamed user",
                        });
                    }}
                  >
                    -
                  </Button>}
                </Col>
              </Row>
            );
        })}
      </div>
      {nUser == -1 && (
        <div style={{ marginTop: "15px" }}>
          <Input
            data-test-id='add-member-inp'
            placeholder="RAGAM ID of teammate"
            onChange={(e) => {
              const nRagamId = e.target.value;
              const myRagamId = nRagamId.toUpperCase();

              if (!myRagamId.match(re))
                setAddStatus({ type: 1, value: "Enter a Valid RagamID" });
              else if (!isNotin(props.userEvent.teamMembers, myRagamId)) {
                setAddStatus({
                  type: 1,
                  value: "User is already present your the Team..",
                });
              } else {
                setAddStatus({ type: 2, value: "Loading..." });
                fetch(backendURI + "users/" + myRagamId, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                  },
                })
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      //verify the result
                      if(result.statusCode){
                        message.error(result.message, 5);
                      }
                       else if (result.message == "Invalid ID") {
                        setAddStatus({
                          type: 1,
                          value: "No user found with RagamId " + myRagamId,
                        });
                      } else {
                        setAddStatus({
                          type: 3,
                          value: "user found with name  " + result.name,
                        });
                        setNUserObj({
                          id: result.id,
                          name: result.name,
                          ragamID: myRagamId,
                          collegeName: result.collegeName,
                        });
                      }
                    },
                    (error) => {
                      console.log(error);
                      message.error(" Please try again");
                    }
                  );
              }
            }}
          />

          <Alert
            style={{ marginTop: "15px", marginBottom: "15px" }}
            message={addStatus.value}
            showIcon

            type={
              addStatus.type == 1
                ? "error"
                : addStatus.type == 2
                ? "info"
                : "success"
            }
          />

          {nUserObj.id != -1 && (
            <Button
              id="myreg_addteammate"
              style={{ marginRight: "15px" }}
              onClick={() => {

                if (dayjs(props.regEndDate).diff(dayjs()) < 0) {
                  setAddStatus({
                    type: 1,
                    value: "Cannot Edit Team as Registration has ended!",
                  });
                  return;
                }
                console.log(props.userEvent.submissions);
                setAddStatus({ type: 2, value: "Submitting..." });
                const myCteam = props.userEvent.teamMembers;
                let myTeam = [...myCteam];
                myTeam.push(nUserObj);
                fetch(backendURI + "user-event-details/" + props.userEvent.id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                  },
                  body: JSON.stringify(
                    props.isSubmissionEvent
                      ? {
                          teamMembers: myTeam,
                          submissions: props.userEvent.submissions,
                        }
                      : { teamMembers: myTeam }
                  ),
                })
                  .then((res) => res.json())
                  .then(
                    (result) => {
                      //verify the result
                      console.log(result);
                      if(result.statusCode){
                        message.error(result.message, 5);
                      }
                       else if (result.statusCode == 400) {
                        setAddStatus({
                          type: 1,
                          value:
                            "User " +
                            nUserObj.ragamID +
                            " is already Registered for this event in another team",
                        });
                      } else {
                        console.log(result);
                        props.setUserEvent(result);
                        setNUserObj({
                          id: -1,
                          name: "",
                          ragamID: "",
                          collegeName: "",
                        });
                        setNUser(-2);
                        message.success("Added teammates successfully!!");
                      }
                      console.log(result);
                    },
                    (error) => {
                      console.log(error);
                      message.error(" Please try again");
                    }
                  );
              }}
            >
              {" "}
              ADD{" "}
            </Button>
          )}
          <Button
            id="myreg_cancel"
            onClick={() => {
              setNUserObj({
                id: -1,
                name: "",
                ragamID: "",
                collegeName: "",
              });
              setAddStatus({ type: 1, value: "Please Enter a Valid RagamId" });
              setNUser(-2);
            }}
          >
            Cancel
          </Button>
        </div>
      )}


      {props.userEvent.teamMembers.length < props.maxTeamSize &&
        nUser == -2 &&
        dayjs(props.regEndDate).diff(dayjs()) > 0 && (
          <Button
            id="myreg_addmember"
            style={{
              marginTop: "15px",
            }}
            onClick={() => {
              if (dayjs(props.regEndDate).diff(dayjs()) < 0) {
                message.error(
                  "Cannot Edit team as registration has ended!!",
                  5
                );
                return;
              }
              //this is not needed but just making sure!!
              setNUserObj({ id: -1, name: "", ragamID: "", collegeName: "" });
              setAddStatus({ type: 1, value: "Enter a valid ragamId" });
              setNUser(-1);
            }}
          >
            Add Member
          </Button>
        )}
        
        {dayjs(props.regEndDate).diff(dayjs()) > 0 && <Alert
            style={{ marginTop: "15px", marginBottom: "15px" }}
            message="You Won't be able to Edit the Team After registration Ends."
            showIcon
            type="info"
          />}
    </div>
  );
}