const validateEmail = () => {
  const email = document.getElementById("email").value;

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    // Invalid email
    return false;
  }

  // if (!Patient.findOne({email: email})) {
  //     return false
  // }

  return true;
};
