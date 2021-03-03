import React, { useState } from "react";
import Header from '../../Components/Header/Header';
import UserEvents from "../../data1";
import { Upload, Button, message, Form ,Input } from "antd";
import useFitText from "use-fit-text";
import { EditOutlined, UploadOutlined ,CloseOutlined,PlusOutlined,MinusOutlined } from "@ant-design/icons";
import {useParams,Link} from 'react-router-dom';
interface ParamTypes {
  eId: string
}


var j = 0;
export default function MyRegistationPage() {
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
  let { eId } = useParams<ParamTypes>();
  type SizeType = Parameters<typeof Form>[0]['size'];
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  var i;
  for(i=0;i<UserEvents.length;i++){
    if(eId.localeCompare(UserEvents[i]["name"])==0)
      break;
  }
  const { fontSize, ref } = useFitText({ maxFontSize: 500, minFontSize: 100 });
  console.log(fontSize);
  const [ isEdit,setisEdit ]=useState(false);
  var [leader ,setLeader]=useState(UserEvents[i]["team"]["leader"]);
  
  return (
    <div>
    <Header mainText={"Event "+ eId} showBack={true}/>
      <div className="myreg-status"  ref={ref} style={{ fontSize }}>
        <p className="myreg-bold" >Registration Status: </p>
        <p>{UserEvents[i]["status"]} </p>
      </div>
      <div className="announcement" ref={ref} style={{ fontSize }}>
        <h6>Announcement</h6>
        <p>{UserEvents[i]["announcement"]}</p>
      </div>
      {!isEdit?<div className="team" ref={ref} style={{ fontSize }}>
        <h6>Team Details</h6>
        <h5>Leader</h5>
        <p className="teammembers">{UserEvents[i]["team"]["leader"]}</p>
        <h5>Members</h5>
        {UserEvents[i]["team"]["members"].map((name) => (
          <p className="teammembers">{name}</p>
        ))}
        <Button className="button" onClick={()=>setisEdit(true)} icon={<EditOutlined />} />
      </div>:
        <div className="team" ref={ref} style={{ fontSize }}>
          <Button shape='circle' onClick={()=>setisEdit(false)} icon={<CloseOutlined />} />
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
          >
            <Form.Item label="Leader">
              <Input value={ leader } onChange={(e)=>setLeader(e.target.value)} />
            </Form.Item>
          </Form>
        </div>
      }
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


