import React from "react";
import { Button, Tabs, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Header from '../../Components/Header/Header';
import { useParams, Link } from 'react-router-dom';
import { EventById } from '../../data';
const { TabPane } = Tabs;
interface ParamTypes {
  eId: string
}

export default function EventDetails() {

  let { eId } = useParams<ParamTypes>();

  return (
    <>
      <Header mainText={"Event " + eId} showBack={true} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "inline-block" }}>
          {EventById.isregopen && <Button
            type="primary"
            className="buttons"
            shape="round"
            icon={<DownloadOutlined />}
          >
            Register
        </Button>}
          {EventById.isavailresult && <Button type="primary" shape="round" className="buttons">
            View Results
        </Button>
          }
          <Link to={"/myreg/" + eId} >
            <Button type="primary" shape="round" className='buttons' >
              Myregistration
        </Button>
          </Link>
        </div>
        <div style={{ minWidth: "80%" }}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="About" key="1">
              <Card className="card"> {EventById.about}</Card>
            </TabPane>
            <TabPane tab="Rules" key="2">
              <Card className="card"> {EventById.rules}</Card>
            </TabPane>
            <TabPane tab="Contact" key="3">
              <Card className="card">Contact</Card>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>);
}
