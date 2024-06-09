const baseUrl = getBaseUrl();
const baseUrlForUser = baseUrl + "/user";
const baseUrlForContact = baseUrl + "/contact";
const baseUrlForAuth = baseUrl + "/auth";
const LOGIN = (token = "", payload = "", params) => {
  const query = "";
  if (params) {
    const queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  const url = baseUrlForAuth + "/" + query;
  const method = "POST";
  const type = "";
  return { url, method, payload, token, type };
};
const SIGNUP = (token = "", payload = "", params ) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForUser + "/" + query;
  let method = "POST";
  let type = "";
  return { url, method, payload, token, type };
};
const GET_ALL_USER = (token = "", payload = "", params ) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForUser + "/" + query;
  let method = "GET";
  let type = "";
  return { url, method, payload, token, type };
};
const GET_MY_CONTACTS = (token = "", payload = "", params ) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForContact + "/" + query;
  let method = "GET";
  let type = "";
  return { url, method, payload, token, type };
};
const DELETE_MY_CONTACT = (token = "", payload = "",id, params) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForContact + "/" + id + query;
  let method = "DELETE";
  let type = "";
  return { url, method, payload, token, type };
};
const ADD_CONTACT = (token = "", payload = "", params) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForContact + "/" + query;
  let method = "POST";
  let type = "";
  return { url, method, payload, token, type };
};
const EDIT_CONTACT = (token = "", payload = "",id, params) => {
  let query = "";
  if (params) {
    let queryParams = new URLSearchParams(params);
    query = "?" + queryParams.toString();
  }
  let url = baseUrlForContact + "/" + id + query;
  let method = "PUT";
  let type = "";
  return { url, method, payload, token, type };
};