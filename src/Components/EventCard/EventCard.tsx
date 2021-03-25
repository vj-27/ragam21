import React from "react";
import { Row, Col, Card, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import { EventDetailsType, backendURI } from "../../data";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
interface EventCardProps extends EventDetailsType {
  isReg: boolean;
}
// extra={
//   props.isReg? (
//     <h3>
//       <i>Registered</i>
//     </h3>
//   ) : (
//     ""
//   )
// }
//

function EventCard(props: EventCardProps) {
  console.log(props.coverImage?.url);
  return (
    <div className="eventCard_mainWrapper">
      <Link to={"/event/" + props.slug} id={"EventCard_" + props.slug}>
        <Card
          className="evcard"
          style={{
            padding: 0,
            height: "194px",
            backgroundImage: `url("${
              backendURI.slice(0, -1) + props.coverImage?.url
            }")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "15px",
          }}
          bodyStyle={{
            padding: "0px",
            backgroundColor: "rgba(0,0,0,0.60)",
            borderRadius: "0 0 15px 15px",
            color: "#ffff",
          }}
          hoverable={true}
        >
          <Typography.Title
            level={3}
            style={{
              fontWeight: "bold",
              margin: "15px",
              fontFamily: "Raleway",
            }}
            ellipsis={{
              rows: 1,
              expandable: false,
            }}
          >
            {props.name}
          </Typography.Title>

          <Typography.Paragraph
            style={{
              margin: "15px",
              height: "66px",
            }}
            ellipsis={{
              rows: 3,
              expandable: false,
            }}
          >
            {props.description}
          </Typography.Paragraph>
          {/* <div style={{backgroundColor:"#fffff",height:"5px",zIndex:1000}}/> */}
          <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />

          {props.isReg ? (
            <Row style={{ margin: "15px", marginTop: 0 }}>
              {" "}
              <Col span={8}>Registered </Col>
             {props.isSubmissionEvent && <Col span={16} style={{ textAlign: "right" }}>
                {dayjs(props.submissionEndDate).diff(dayjs()) < 0
                  ? "Submissions closed"
                  : dayjs(props.submissionStartDate).diff(dayjs()) > 0
                  ? "Submission starts on: " +
                    dayjs(props.submissionStartDate).format("DD MMMM")
                  : "Submission deadline: " +
                    dayjs(props.submissionEndDate).format("DD MMMM")}{" "}
              </Col>}
            </Row>
          ) : (
            <h4 style={{ margin: "15px", marginTop: 0 }}>
              {props.isRegOpen
                ? "Registration closes on: " +
                  dayjs(props.regEndDate).format("DD MMMM")
                : dayjs(props.regStartDate).diff(dayjs()) > 0
                ? "Registration starts on: " +
                  dayjs(props.regStartDate).format("DD MMMM")
                : "Registration closed"}
            </h4>
          )}
        </Card>
      </Link>
    </div>
  );
}

export default EventCard;
