import React from "react";
import Loading from "../../Components/Loading/Loading";

const Certificates = () => {
  //const location = useLocation();
  React.useEffect(() => {
    window.location.replace("https://ragamnitc.github.io/certificates/");
  }, []);
  return (
    <div>
        <Loading loading={true} />
    </div>
  );
};
export default Certificates;
