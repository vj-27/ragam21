import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {  Button, Avatar } from "antd";
import useFitText from "use-fit-text";
import { UserOutlined } from "@ant-design/icons";
import { useHistory,Link } from "react-router-dom";
import {backendURI} from "../../data";
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
  dashimg: string,
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
function Header(props: HeaderProps) {
  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 100 });
  let history = useHistory();
  return (
    <div className="header_main">
      <div className="header_dash" style={{backgroundImage: `url(${props.dashimg})`}}>
        <div className="header_buttons">

          <div className="header_backbtn">
            {props.showBack &&
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => props.backonClick? props.backonClick(): history.goBack()}
            />}
          </div>
          <img className ="header_logo" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="logo"/>
          <div className="header_profile">
            {props.user?.isLoggedIn?
            <Link to="/profile/">
            <Avatar icon={<UserOutlined />} />
          </Link>
            :
            <a href={backendURI+"connect/google"}>
            <Button>
              
                Login
            </Button>
            </a>
            
            }
            
          </div>
        </div>
        <div className="header_title" ref={ref} style={{ fontSize }}>
          {props.mainText}
        </div>
      </div>
    </div>
  );
}

export default Header;
