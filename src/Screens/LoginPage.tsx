import { Col, Row, Typography } from "antd";
import glogo from "../assets/btn_google_signin_dark_normal_web.png";
import { backendURI } from "../data";
export default function LoginPage() {
  return (
    <Col style={{ width: "100%", height: "100vh" }}>
        <Row>
        <Typography.Title style={{margin:"auto", marginTop:"200px"}}>Login</Typography.Title></Row>
     <Row align="middle" style={{margin:"auto"}}> 
      <a href={backendURI + "connect/google"} id="Header_login" style={{ margin: "auto",marginTop:"30px"}}>
        <img
          src={glogo}
          style={{
            display: "block",
            width: "160px",
           
          }}
        />
      </a>
      </Row>
    </Col>
  );
}
