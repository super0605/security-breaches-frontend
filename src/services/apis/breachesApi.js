import API from "./baseApi";

const api = new API();
const prefix = "/breaches";

const fetchBreaches = ({ email }) => {
  return api
    .callApi({
      url: `${prefix}/${email}`,
      method: "get",
    })
    .then((result) => result.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchBreaches,
};
