import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { EventCategories, PropTypes } from "../../data";
import EventCategoryCard from "../../Components/EventCategoryCard/EventCategoryCard";
import { useHistory } from "react-router-dom";
import { Card, Divider, Table, Typography } from "antd";
import defImg from "../../assets/header_default.jpg";
import Footer from "../../Components/Footer/Footer";
export default function PrivacyPage(props: PropTypes) {
  //we are not handling error.. if its error, it will show loading..
  return (
    <>
      <Header
        showBack={true}
        mainText="Contacts"
        dashimg={defImg}
        user={props.user}
      />
      <Card style={{ width: "700px", maxWidth: "95vw", margin: "auto" }}>
        <div style={{ maxWidth: "400px", margin: "auto" }}>
          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
            Ragam Convenor
          </h3>
          <Table
            showHeader={false}
            className="center-align"
            columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
            dataSource={[{ left: "Jishnu J S", right: "8547275462" }]}
            pagination={false}
          />

          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>Treasurers</h3>
          <Table
            showHeader={false}
            className="center-align"
            columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
            dataSource={[
              { left: "Anfas Ahammed", right: "8848730114" },
              { left: "Kavya N", right: "9400773302" },
              { left: "Viswajit", right: "9048397023" },
            ]}
            pagination={false}
          />
          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
            Event Coordinators
          </h3>
          <Table
            showHeader={false}
            className="center-align"
            columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
            dataSource={[
              { left: "Shahana P V", right: "8078069269" },
              { left: "Nicholas", right: "8089502976" },
              { left: "Agney Ranjith", right: "8281843984" },
            ]}
            pagination={false}
          />
          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
            Public relation committee
          </h3>
          <Table
            showHeader={false}
            className="center-align"
            columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
            dataSource={[
              { left: "Sreenath Ravi", right: "8078432840" },
              { left: "Muqthar", right: "8129381635" },
              { left: "Ameesha", right: "8139083258" },
              { left: "Ashna Appukkuttan", right: "7356357242" },
              { left: "Afeefa parveen", right: "9446321428" },
            ]}
            pagination={false}
          />
          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
            Marketing heads
          </h3>
          <Table
            showHeader={false}
            className="center-align"
            columns={[{ dataIndex: "left" }, { dataIndex: "right" }]}
            dataSource={[
              { left: "Nevin roy ", right: "7559082212" },
              { left: "Ajay K ", right: "9567065952" },
            ]}
            pagination={false}
          />
        </div>
      </Card>
      <Footer />
    </>
  );
}
