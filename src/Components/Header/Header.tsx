import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {  Button, Avatar } from "antd";
import useFitText from "use-fit-text";
import { UserOutlined } from "@ant-design/icons";
import { useHistory,Link } from "react-router-dom";

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
  showBack: boolean
}
// function navigate() {}
function Header(props: HeaderProps) {
  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 100 });
  let history = useHistory();
  return (
    <div className="header_main">
      <div className="header_dash">
        <div className="header_buttons">

          <div className="header_backbtn">
            {props.showBack &&
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => props.backonClick? props.backonClick(): history.goBack()}
            />}
          </div>
          <img className ="header_logo" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          <div className="header_profile">
            <Link to="/profile/">
              <Avatar icon={<UserOutlined />} />
            </Link>
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
