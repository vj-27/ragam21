import React, { useEffect, useState, useCallback } from "react";
import Header from "../../Components/Header/Header";
import {
  Upload,
  message,
  Button,
  Form,
  Card,
  Modal,
  UploadProps,
  Divider,
} from "antd";
import useFitText from "use-fit-text";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams, useHistory } from "react-router-dom";
import Team from "../../Components/Team/Team";
import axios from "axios";
import {
  EventDetailsType,
  PropTypes,
  RegEventDetail,
  backendURI,
} from "../../data";
import Footer from "../../Components/Footer/Footer";
import {
  UploadOutlined,
  InboxOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import Loading from "../../Components/Loading/Loading";
interface ParamTypes {
  eId: string;
}
interface MyRegProps extends PropTypes {
  getUserEvents: () => void;
}

function getString(stats: string) {
  if (stats == "participating") return "Registered";
  if (stats == "knocked_out") return "Entry  Knocked Out";
  if (stats == "position_1") return "First Prize Entry";
  if (stats == "position_2") return "Runner Up";
  if (stats == "position_3") return "Second Runner Up";
  if (stats == "consolation") return "Consolation Prize";
  return "";
}
function getDefaultfileList(listArr: RegEventDetail["submissions"]) {
  let myArr: UploadFile<any>[] = [];
  if (listArr)
    for (let i in listArr) {
      myArr.push({
        uid: listArr[i].id.toString(),
        name: listArr[i].name,
        url: backendURI.slice(0, -1) + listArr[i].url,
        size: listArr[i].size,
        type: listArr[i].mime,
      });
    }
  return myArr;
}
export default function MyRegistationPage(props: MyRegProps) {
  let { eId } = useParams<ParamTypes>();
  dayjs.extend(relativeTime);
  type SizeType = Parameters<typeof Form>[0]["size"];
  const [userEvent, setUserEvent] = useState<RegEventDetail>();
  const [eventDetails, setEventDetails] = useState<EventDetailsType>();
  const [loading, setLoading] = useState(true);
  const [ValidEId, setVaildEid] = useState({
    isValid: false,
    eventId: 0,
    catId: 0,
    inCatId: 0,
    userEventId: -1,
  });
  const [visibleModal, setVisibleModal] = useState(false);
  const [removePromise, setRemovePromise] = useState<any>();
  const [fileX, setfileX] = useState<UploadFile>();
  const [filelistX, setfilelistX] = useState<UploadFile[]>([]);
  function handleRemove(file: UploadFile) {
    setVisibleModal(true);
    setfileX(file);

    return new Promise<boolean>((resolve, reject) => {
      setRemovePromise({ resolve, reject });
    });
  }

  function unregisterfromEvent() {
    if (!userEvent) return;
    let myLocalTeam = [];
    if (dayjs(eventDetails?.regEndDate).diff(dayjs()) < 0) {
      message.error("Cannot unregister as registration has closed.");
      setVisibleModal(false);
      return;
    }
    for (let xi in userEvent.teamMembers) {
      if (userEvent.teamMembers[xi].id != props.user.id)
        myLocalTeam.push(userEvent.teamMembers[xi]);
    }
    if (myLocalTeam.length > 0) {
      fetch(backendURI + "user-event-details/" + userEvent.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.user.token,
        },
        body: JSON.stringify({
          teamMembers: myLocalTeam,
          submissions: userEvent.submissions,
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
              props.getUserEvents();
              message.success("Unregistered successfully");
              history.goBack();
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
            message.error("Some error occured. Please try again");
          }
        );
    } else {
      fetch(backendURI + "user-event-details/" + userEvent.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.user.token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            //verify the result
            console.log(result);
            if (result.statuscode) {
              message.error(result.message);
            } else {
              props.getUserEvents();
              message.success("Unregistered successfully");
              history.goBack();
            }
            console.log(result);
          },
          (error) => {
            console.log(error);
            message.error("Some error occurred. Please try again");
          }
        );
    }
  }
  // Modal
  const handleOkModalRemove = useCallback(() => {
    if (!userEvent || !fileX || !eventDetails) return; //shoud=ld never happer!!
    if (dayjs(eventDetails.submissionEndDate).diff(dayjs()) < -15 * 60 * 1000) {
      message.error("Submission time has ended.");
      removePromise.resolve(false);
      setVisibleModal(false);
      return;
    } else if (
      dayjs(eventDetails.submissionEndDate).diff(dayjs()) > -15 * 60 * 1000 &&
      dayjs(eventDetails.submissionEndDate).diff(dayjs()) < 0
    ) {
      //message.warning("Submission marked as Late!!",6);
      console.log("HEREERERRERERR");
    }
    let mySubs: RegEventDetail["submissions"] = [];

    for (let i in userEvent.submissions) {
      if (userEvent.submissions[i].id != parseInt(fileX.uid, 10)) {
        mySubs.push(userEvent.submissions[i]);
      }
    }
    //show loading here !!!!!!!!!!!
    setVisibleModal(false);
    fetch(backendURI + "user-event-details/" + userEvent.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.user.token,
      },
      body: JSON.stringify({
        submissions: mySubs,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //verify the result
          console.log(result);
          if (result.statuscode) {
            message.error(result.message);

            setVisibleModal(false);
          } else {
            message.success("file " + fileX.name + " removed successfully.");
            const myUserEvent = { ...userEvent, submissions: mySubs };
            setUserEvent(myUserEvent);
            setfilelistX(getDefaultfileList(mySubs));
            setVisibleModal(false);
            if (removePromise && removePromise.resolve) {
              removePromise.resolve(true);
            }
          }
          console.log(result);
        },
        (error) => {
          console.log(error);
          message.error("Some error occurred. Please try again");
        }
      );
  }, [removePromise]);
  const handleCancelModalRemove = useCallback(() => {
    if (removePromise && removePromise.resolve) {
      removePromise.resolve(false);
    }
    setVisibleModal(false);
  }, [removePromise]);

  const [fileList, setFileList] = useState<any[]>([]);
  function handleChange(info: any) {
    if (!eventDetails) return;
    if (dayjs(eventDetails.submissionEndDate).diff(dayjs()) < 0) {
      return;
    }
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`File ${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`File ${info.file.name}  upload failed.`);
    }
  }
  const uploadImage = async (options: any) => {
    if (!userEvent || !eventDetails) return;
    const { onSuccess, onError, file, onProgress } = options;
    if (dayjs(eventDetails.submissionEndDate).diff(dayjs()) < -15 * 60 * 1000) {
      message.error("Submission time has ended.");
      onError("Submission time has ended");
      return;
    } else if (
      dayjs(eventDetails.submissionEndDate).diff(dayjs()) > -15 * 60 * 1000 &&
      dayjs(eventDetails.submissionEndDate).diff(dayjs()) < 0
    ) {
      message.warning("Submission marked as late", 6);
    }

    const fmData = new FormData();
    const config = {
      headers: {
        Authorization: "Bearer " + props.user.token,
      },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);

        onProgress({ percent: percent });
      },
    };
    fmData.append("refId", userEvent.id.toString());
    fmData.append("files", file);
    const myFileList = [...filelistX];
    myFileList.push({
      uid: file.uid,
      size: file.size,
      percent: 0,
      status: "uploading",
      name: file.name,
      type: file.type,
    });
    setfilelistX(myFileList);
    console.log(file);
    try {
      const res = await axios.post(backendURI + "upload", fmData, config);
      onSuccess("Ok");
      console.log("server res: ", res);
      const myUserEvent = { ...userEvent };
      myUserEvent.submissions.push(res.data[0]);
      setUserEvent(myUserEvent);
      setfilelistX(getDefaultfileList(myUserEvent.submissions));
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  function getUserEvent(userEventId: number) {
    console.log("fetching userEventDetail" + userEventId);
    fetch(backendURI + "user-event-details/" + userEventId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.user.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.statusCode) {
            message.error(result.message, 5);
          } else {
            //verify the result
            setLoading(false);
            setUserEvent(result);
            setfilelistX(getDefaultfileList(result.submissions));
            console.log(result);
          }
        },
        (error) => {
          console.log(error);
          message.error("Some error occurred. Please try again");
        }
      );
  }
  useEffect(() => {
    console.log("I am useEffect");
    let myValidEvent = {
      isValid: false,
      eventId: 0,
      catId: 0,
      inCatId: 0,
      userEventId: -1,
    };
    for (let i = 0; i < props.categories.length; i++) {
      for (let j = 0; j < props.categories[i].events.length; j++) {
        if (props.categories[i].events[j].slug == eId) {
          const myObj = {
            isValid: true,
            eventId: props.categories[i].events[j].id,
            catId: i,
            inCatId: j,
            userEventId: -1,
          };
          myValidEvent = myObj;
          break;
        }
      }
    }
    if (myValidEvent.isValid) {
      for (let i in props.userDetails.eventDetails) {
        if (props.userDetails.eventDetails[i].event == myValidEvent.eventId) {
          myValidEvent.userEventId = props.userDetails.eventDetails[i].id;
        }
      }
    }
    setVaildEid(myValidEvent);
    if (myValidEvent.userEventId == -1) setLoading(false);
    else {
      console.log("UseEffect Else");
      setEventDetails(
        props.categories[myValidEvent.catId].events[myValidEvent.inCatId]
      );
      getUserEvent(myValidEvent.userEventId);
    }
  }, [props.categories, props.userDetails]);
  function unregisterConfirm() {
    Modal.confirm({
      title: "Are you sure you want to unregister?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          {" "}
          if your team has more than one member, they will still be registered.
          and they can add you to the team later. Otherwise you will lose your
          submissions
        </p>
      ),
      okText: "OK",
      cancelText: "Cancel",
      onOk: unregisterfromEvent,
    });
  }

  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 100 });
  const history = useHistory();
  return (
    <div>
      <Loading loading={loading || props.catLoading} />
      <Header
        mainText={eventDetails ? eventDetails.name : "Loading..."}
        showBack={true}
        dashimg={backendURI.slice(0, -1) + eventDetails?.coverImage?.url}
        user={props.user}
      />
      {loading ? (
        <div>Loading..</div>
      ) : ValidEId.userEventId == -1 ? (
        <div> Please Make sure that you are registered for this event </div>
      ) : (
        userEvent && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>
                {userEvent.status == "participating" ||
                userEvent.status == "knocked_out"
                  ? "Status: "
                  : "Result: "}{" "}
                <b>{getString(userEvent.status)}</b>{" "}
              </h3>

              {(eventDetails?.metaTitles?.length ||
                eventDetails?.isTeamEvent) && (
                <Card
                  id="myreg_meta_teammates_card"
                  style={{
                    width: "800px",
                    maxWidth: "95%",
                    margin: "auto",
                    marginTop: "25px",
                  }}
                >
                  {eventDetails?.metaTitles?.map((val, index) => {
                    return (
                      <div key={val}>
                        <br />
                        <h3 style={{ fontWeight: "bold" }}> {val} </h3>

                        {userEvent.metaValues && userEvent.metaValues[index] ? (
                          userEvent.metaValues[index].startsWith("http") ? (
                            <a href={userEvent.metaValues[index]}>
                              <h4>
                                <u>{userEvent.metaValues[index]}</u>
                              </h4>
                            </a>
                          ) : (
                            <h4>{userEvent.metaValues[index]}</h4>
                          )
                        ) : (
                          <h4>Not Available </h4>
                        )}
                      </div>
                    );
                  })}
                  <Divider />
                  {eventDetails?.isTeamEvent && (
                    <Team
                      minTeamSize={eventDetails.minTeamSize}
                      maxTeamSize={eventDetails.maxTeamSize}
                      isSubmissionEvent={eventDetails.isSubmissionEvent}
                      regEndDate={eventDetails.regEndDate}
                      token={props.user.token}
                      userEvent={userEvent}
                      setUserEvent={setUserEvent}
                      uId={props.user.id}
                      getUserEvents={props.getUserEvents}
                    />
                  )}
                </Card>
              )}
              {eventDetails?.isSubmissionEvent && (
                <Card
                  id="myreg_submissioncard"
                  style={{
                    width: "800px",
                    maxWidth: "95%",
                    margin: "auto",
                    marginTop: "25px",
                  }}
                >
                  {eventDetails &&
                  dayjs(eventDetails.submissionStartDate).diff(dayjs()) > 0 ? (
                    <div>
                      {"Submissions open on: " +
                        dayjs(eventDetails.submissionStartDate).format(
                          "DD MMMM hh:mm a"
                        )}
                    </div>
                  ) : dayjs(eventDetails.submissionEndDate).diff(dayjs()) <
                    0 ? (
                    <div>Submissions closed</div>
                  ) : (
                    <div>
                      {"Submissions close on: " +
                        dayjs(eventDetails.submissionEndDate).format(
                          "DD MMMM hh:mm a"
                        )}
                    </div>
                  )}

                  {eventDetails?.isSubmissionEvent &&
                    dayjs(eventDetails.submissionStartDate).diff(dayjs()) <
                      0 && (
                      <div>
                        <Modal
                          title="Delete file"
                          visible={visibleModal}
                          onOk={handleOkModalRemove}
                          onCancel={handleCancelModalRemove}
                        >
                          <p>Are you sure you want to remove this file? </p>
                        </Modal>
                        <Upload.Dragger
                          id="myreg_upload_component"
                          style={{ marginTop: "15px" }}
                          customRequest={uploadImage}
                          onChange={handleChange}
                          listType="picture"
                          className="upload-list-inline"
                          progress={{ showInfo: true }}
                          defaultFileList={getDefaultfileList(
                            userEvent.submissions
                          )}
                          fileList={filelistX}
                          onRemove={(file: UploadFile) => handleRemove(file)}
                          multiple={true}
                          beforeUpload={(file, filelst) => {
                            let sz = file.size;
                            sz = sz / 1000000;
                            if (sz <= eventDetails.maxFileSize) return true;
                            else {
                              message.error(
                                "File size exceeds the limit of " +
                                  eventDetails.maxFileSize +
                                  "MB,"
                              );
                              return false;
                            }
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Click / Drag and Drop to Upload
                          </p>
                        </Upload.Dragger>
                      </div>
                    )}
                </Card>
              )}
              {eventDetails && (
                <Button
                  id="myreg_unregister"
                  danger
                  type="primary"
                  style={{ marginTop: "15px" }}
                  onClick={() => {
                    unregisterConfirm();
                  }}
                >
                  Unregister from Event
                </Button>
              )}
            </div>
          </>
        )
      )}
      <Footer />
    </div>
  );
}
