// this is to add the routes to the testing api for the desktop app
//DO NOT DELETE it does not affect the routes

const {
  getEndpointName,
  getEndpointDescription,
  getEndpointInputs,
} = require("../utils/endpointDescripter");
const axios = require("axios");
const { isKeyValid } = require("../utils/imAdmin");

const isAdminRequest = async (req, res, next) => {
  const authHeader = req.headers["adminkey"];
  if (!authHeader) {
    next();
  } else {
    if (!isKeyValid(authHeader)) {
      res.status(403).json({ message: "incorrect key" });
      return;
    }
    const url = req.originalUrl;
    const method = req.method;
    const requestData = {
      url: url,
      name: getEndpointName(url),
      description: getEndpointDescription(url),
      method: method,
      inputs: getEndpointInputs(url),
    };

    try {
      const result = await axios.post(
        "http://localhost:4500/api/endpoints",
        requestData
      );
      res.status(201).json({ message: result.data.message });
      return;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 400) {
          res.status(400).json({ message: err.response.data.message });
          return;
        } else if (err.status === 409) {
          res.status(409).json({ message: err.response.data.message });
          return;
        }
      }
    }
  }
};

module.exports = isAdminRequest;
