const axios = require("axios");
const https = require("https");

module.exports = ({
  url,
  path,
  port,
  protocol,
  authentication,
  httpHeaders,
  timeout,
  ignoreSSL,
}) => {
  return axios.create({
    url: path,
    baseURL: `${protocol}://${url}${port}`,
    headers: { ...httpHeaders, ...authentication },
    timeout,
    httpsAgent: new https.Agent({
      rejectUnauthorized: ignoreSSL,
    }),
  });
};
