import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {  Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { url } from "inspector";
import defImg from "../../assets/header_default.jpg";
// const avatar = {
//   avtrimage: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
// };

interface HeaderProps{
  backonClick?: ()=> void ,
  showBack: boolean
}
// function navigate() {}
function HeaderProfile(props: HeaderProps) {
  let history = useHistory();
  return (
    <div className="header_main">
      <div className="header_dash" style={{backgroundImage: `url("${defImg}")`}}>
        <div className="header_buttons">

          <div className="header_backbtn">
            {props.showBack &&
            <Button
              data-test-id='profile-back-btn'
              id="Header_profile_back"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => props.backonClick? props.backonClick(): history.goBack()}
            />}
          </div>
        </div>
        <div className="header_avatar" >
              <Avatar icon={<UserOutlined />} size={100}/>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
