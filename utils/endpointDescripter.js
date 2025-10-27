const names_map = new Map();
const description_map = new Map();
const inputs_map = new Map();

//user registration
names_map.set("/api/auth/register", "Create New User Account");
description_map.set("/api/auth/register", "Creates a new user in the database");
inputs_map.set("/api/auth/register", [
  { fieldName: "fullNames", typeOfInput: "string" },
  { fieldName: "surname", typeOfInput: "string" },
  { fieldName: "email", typeOfInput: "string" },
  { fieldName: "password", typeOfInput: "string" },
]);

//registration otp verifictaion
names_map.set("/api/auth/register/verify", "OTP Verification");
description_map.set(
  "/api/auth/register/verify",
  "verifies if the user entered otp is correct"
);
inputs_map.set("/api/auth/register/verify", [
  { fieldName: "otp", typeOfInput: "string" },
]);

// user login
names_map.set("/api/auth/login", "User Account Login");
description_map.set("/api/auth/login", "user login into thier account");
inputs_map.set("/api/auth/login", [
  { fieldName: "email", typeOfInput: "string" },
  { fieldName: "password", typeOfInput: "string" },
]);

//login otp verifictaion
names_map.set("/api/auth/login/verify", "Login OTP Verification");
description_map.set(
  "/api/auth/login/verify",
  "verifies the otp the user entered during login"
);
inputs_map.set("/api/auth/login/verify", [
  { fieldName: "otp", typeOfInput: "string" },
]);

//resume json creation
names_map.set("/api/ai/resume/create", " AI Resume JSON Creator");
description_map.set(
  "/api/ai/resume/create",
  "converts the resume the user uplaoded into a json file "
);
inputs_map.set("/api/ai/resume/create", [
  { fieldName: "resume", typeOfInput: "application/pdf" },
]);

//resume analysis
names_map.set("/api/ai/resume/analysis", " AI Resume Analysis");
description_map.set(
  "/api/ai/resume/analysis",
  "the user enters their job description it will return a detailed analysis on the job and user resume match "
);
inputs_map.set("/api/ai/resume/analysis", [
  { fieldName: "job_description", typeOfInput: "string" },
]);

//resume tailored
names_map.set("/api/ai/resume/tailored", " AI Tailored Resume");
description_map.set(
  "/api/ai/resume/tailored",
  "the user enters their job description it will send a new resume that is tailored for that job description  "
);
inputs_map.set("/api/ai/resume/tailored", [
  { fieldName: "job_description", typeOfInput: "string" },
]);

exports.getEndpointName = (url) => {
  return names_map.get(url);
};

exports.getEndpointDescription = (url) => {
  return description_map.get(url);
};
exports.getEndpointInputs = (url) => {
  return inputs_map.get(url);
};
