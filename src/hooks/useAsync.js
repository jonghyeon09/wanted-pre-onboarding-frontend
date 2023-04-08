import React from "react";
import axios from "axios";

const useAsync = ({ method = "get", url, data }) => {
  axios({
    method,
    url,
    data,
  });
  return <div>useAsync</div>;
};

export default useAsync;
