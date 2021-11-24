const crypto = require("crypto");
const mailAgent = require("../servicesInit/sgMail");
const { fromMail } = require("../../env");
const VerificatioCode = require("../../models/verificationCode");

const generateCode = (username) => {
  const code = crypto.randomBytes(20).toString("hex");

  const codeToDB = new VerificatioCode({ username, code });
  codeToDB.save();

  return code;
};

const isValidCode = async (username, code) => {
  code = await VerificatioCode.findOne({ username: username, code: code });
  return code;
};

const deleteCode = (code) => VerificatioCode.findOneAndDelete({ code }).then();

const sendVerificationCode = async (username, email, code) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: fromMail, // Change to your verified sender
    subject: "Verify Your Email",
    text: `Hey ${username}, please go to <Server URL>/api/verify/${code} to verify your account`,
  };
  await mailAgent.send(msg);
  console.log(`Message sent successfully to ${email}`);
};

module.exports = {
  generateCode,
  sendVerificationCode,
  isValidCode,
  deleteCode,
};
