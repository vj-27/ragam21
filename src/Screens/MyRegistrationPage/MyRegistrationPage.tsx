import React, { useState } from "react";
import userEvents from "../../data1";
import { Upload, Button, message } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

var i = 0;
var j = 0;
function MyRegistationPage() {
//   const [fileList, setFilelist] = useState<any[]>();
//   const [uploading, setUploading] = useState(false);
//   function handleUpload() {
//     const formData = new FormData();

//     setFilelist(() => {
//       if (fileList && formData)
//         fileList.forEach((file) => {
//           formData.append("files[]", file);
//         });

//       return fileList;
//     });

//     setUploading(true);
//   }

  return (
    <div>
      <div className="status">
        <p className="bold">Registration Staus: </p>
        <p>{userEvents[i]["status"]} </p>
      </div>
      <div className="announcement">
        <h6>Announcement</h6>
        <p>{userEvents[i]["announcement"]}</p>
      </div>
      <div className="team">
        <h6>Team Details</h6>
        <h5>Leader</h5>
        <p className="teammembers">{userEvents[i]["team"]["leader"]}</p>
        <h5>Members</h5>
        {userEvents[i]["team"]["members"].map((name) => (
          <p className="teammembers">{name}</p>
        ))}
        <Button className="button" icon={<EditOutlined />} />
      </div>
      {/* need to do it later!!
       <div className="submission">
        <h6>Submission</h6>
        <Upload action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76' onChange= {handleChange} multiple= {true}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList === []}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div> */}
    </div>
  );
}

export default MyRegistationPage;
