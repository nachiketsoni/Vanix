const FORM_HANDLER = async (Form, FormInputs, Btn, API_OPTIONS , REDIRECT,id, newToken ) => {
  Form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // disable the Btn
    Btn.disabled = true;
    const btnDefaultVal = Btn.value;
    Btn.value = "Loading...";
    Toast.fire({
      icon: "warning",
      title: "Loading...",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      timer: undefined,
    });
    let payload = {};
    FormInputs.forEach((input) =>
      input.name && input.value ? (payload[input.name] = input.value) : ""
    );
    const options = API_OPTIONS(getCookie(), payload,id, (params = ""));
    const result = await API_Call({ ...options });
    if (result.code == 200) {
        if (newToken) setCookie("token", result.data.token, COOKIE_EXPIRE());
      Toast.fire({
        icon: "success",
        title: result.code + ":" + btnDefaultVal + " Successfully",
      });
      Btn.value = "Success ✅";

      setTimeout(() => {
        Btn.disabled = false;
        Btn.value = btnDefaultVal;
      }, 1000);

      // redirect to Homepage
      if (REDIRECT) window.location.href = REDIRECT;
    } else {
      console.error(result.errorMessage);
      Toast.fire({
        icon: "error",
        title: result.code+ ":"+ result.errorMessage,
      });
      Btn.value = "Error ❌";
      setTimeout(() => {
        Btn.disabled = false;
        Btn.value = btnDefaultVal;
      }, 1000);
    }
  });
};
