import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {  Button, Avatar } from "antd";
import useFitText from "use-fit-text";
import { UserOutlined } from "@ant-design/icons";
import { useHistory,Link } from "react-router-dom";
import {backendURI} from "../../data";
import logo from "../../assets/white_logo.svg";
// const avatar = {
//   avtrimage: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
// };
const eventDetails = {
  event: {
    eventName: "this is the maximum",
    eventCategory: "event category"
  }
};
interface HeaderProps{
  backonClick?: ()=> void ,
  mainText: string,
  showBack: boolean,
  dashimg: string|undefined,
  user?: {
    isLoggedIn: boolean;
    token: string;
    email: string;
    id: number;
    name: string;
    phoneNumber: string;
}
}
// function navigate() {}
function HeaderHome(props: HeaderProps) {
  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 150 });
  let history = useHistory();
  return (
    <div className="header_main">
      <div className="header_dash" style={{backgroundImage: `url(${props.dashimg})`}}>
        <div className="header_buttons">

          <div className="header_backbtn">
            {props.showBack &&
            <Button
              id="Header_Back"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => props.backonClick? props.backonClick(): history.goBack()}
            />}
          </div>
          <Link to="/" id="Header_Logo">
          <img className ="header_logo" src={logo} alt="logo"/>
          </Link>
          <div className="header_profile">
            {props.user?.isLoggedIn?
            <Link to="/profile/" id="Header_Profile">
            <Avatar icon={<UserOutlined />} />
          </Link>
            :
            <Link to="/login">
            <Button type="primary">
              
                Login
            </Button>
            </Link>
            
            }
            
          </div>
        </div>
        <div className="header_title" style={{marginBottom:"0px"}}>
          <h3><b>{props.mainText}</b></h3>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
