const checkPasswords = (ev) => {
  ev.preventDefault;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("passwordConfirm").value;
  if (password !== confirm) {
    document.getElementById("passwordError").innerHTML =
      "Password do not match";
  }
};
