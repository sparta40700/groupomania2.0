module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo déjà utilisé ou invalide";
  if (err.message.includes("email"))
    errors.email = "Email déjà utilisé ou invalide";
  if (err.message.includes("password"))
    errors.password = "Mot de passe invalide";
  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "Pseudo déjà utilisé";

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")) {
      errors.email = "Email déjà utilisé";
    }
  }
  return errors;
};

module.exports.signinErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email inconnu ou invalide";
  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxsize: "" };
  if (err.message.includes("format"))
    errors.format = "Format de fichier invalide";
  if (err.message.includes("maxsize"))
    errors.maxsize = "Fichier trop volumineux";
  return errors;
};
