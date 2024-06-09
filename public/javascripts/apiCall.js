const API_Call = async ({url, method, payload = "", token = "", type = ""}) => {
  const contentType =
    type == "formData"
      ? "multipart/form-data"
      : "application/x-www-form-urlencoded";
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
    data: payload,
  };
  let response = { status: 500, errorMessage: "Failed" };
  try {
      response = await axios.request(config);
      response = response.data;
  } catch (error) {
    response = {
      code: error.response.data.code || error.status || 500,
      error: error.response.data.error || error,
      errorMessage: error.response.data.errorMessage || error.message || "Failed",
      errorFields: error.response.data.errorFields || {},
      success:false
    };
  }
  return response;
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie() {
  var nameEQ = "token" + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie() {
  document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}