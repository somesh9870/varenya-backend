// phone number validation regex-------------------------------------------------------------------------------------
export const phoneNumRegex = (mobileNumber) => {
  const pattern = /^[6789]\d{9}$/;
  return pattern.test(mobileNumber);
};
// email regex--------------------------------------------------------------------------------------------------
export const emailRegex = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

//  name regex--------------------------------------------------------------------------------------------------
export const nameRegex = (name) => {
  const pattern = /^[a-zA-Z0-9_ ]{3,50}$/;
  return pattern.test(name);
};

export const passwordRegex = (password) => {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
  return pattern.test(password);
};
