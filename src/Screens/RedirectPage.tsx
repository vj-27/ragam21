import { message } from "antd";
import React, { useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { backendURI, PropTypes } from "../data";

const RedirectPage = (props: PropTypes) => {
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  React.useEffect(() => {
    if (!location) {
      return;
    }
    console.log(location.search);
    if (formRef.current && props.user.token) {
      formRef.current.submit();
    }
  }, [location, formRef, props.user]);
  return (
    <div>
      <form
        method="POST"
        action={new URLSearchParams(location.search).get("url") || undefined}
        ref={formRef}
      >
        <input type="hidden" name="token" value={props.user.token} />
      </form>
      <h4>Redirecting to :{new URLSearchParams(location.search).get("url")}</h4>
    </div>
  );
};
export default RedirectPage;
