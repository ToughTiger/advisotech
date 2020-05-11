const { Connector } = require("../util/database");
const Sequelize = require("sequelize");
const { validateConnector } = require("../middleware/authentication");
const $ = Sequelize.Op;

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

exports.verifyMobile = (req, res, next) => {
  const { name, mobile, channel } = req.body;
  if (mobile) {
    client.verify
      .services(process.env.ACCOUNT_SECURITY_API_KEY)
      .verifications.create({
        to: `+91${req.body.mobile}`,
        channel,
      })
      .then((verification) => {
        if (verification.status === "pending")
          return res.status(200).json({
            data: {
              message: `Verification code sent to ${mobile}`,
              mobile,
              name,
            },
          });
      })
      .catch((err) => console.log(err));
  }
};

exports.verifyCode = (req, res, next) => {
  const { code, mobile } = req.body;
  if (code) {
    console.log(code);
    client.verify
      .services(process.env.ACCOUNT_SECURITY_API_KEY)
      .verificationChecks.create({
        code,
        to: `+91${mobile}`,
      })
      .then((data) => {
        console.log(data);
        if (data.status === "approved") {
          console.log(data.status);
          return res.status(200).json({
            message: "Mobile number Verified",
          });
        } else {
          return res.status(400).json({
            message: "Please enter valid code",
            data,
          });
        }
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(400).json({
      message: "Please enter code",
    });
  }
};

exports.postConnector = async (req, res, next) => {
  try {
    const { error } = validateConnector(req.body);

    if (error) return res.json({ message: error.details[0].message });

    const existingConnector = await Connector.findOne({
      where: { email: req.body.email },
    });
    if (existingConnector) return res.json({ message: "Connector exists." });

    const connector = await Connector.create({
      name: req.body.name,
      mobile: req.body.mobile,
      city: req.body.city,
      email: req.body.email,
      pin: req.body.pin,
    });
    if (!connector) return res.json({ message: " Connector creation failed" });

    return res.status(200).json({ success: "Request Submitted Successfully" });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

exports.getConnector = async (req, res, next) => {
  try {
    const Connector = await Connector.findAll();
    res.status(200).json({ Connector: Connector });
  } catch (ex) {
    next(ex);
  }
};

exports.getConnectorByUserId = async (req, res, next) => {
  try {
    const Connector = await Connector.findAll({
      where: {
        smCode: req.params.id,
      },
    });

    return res.status(200).json({ Connector });
  } catch (ex) {
    console.log(ex.message);
    next(ex.message);
  }
};

exports.getConnectorById = async (req, res, next) => {
  try {
    const Connector = await Connector.findOne({ where: { id: req.params.id } });
    res.status(200).json({ Connector });
  } catch (ex) {
    next(ex);
  }
};

exports.updateConnectorById = async (req, res, next) => {
  try {
    updatedConnector = await Connector.update(
      {
        calltype: req.body.calltype,
        location: req.body.location,
        feedback: req.body.feedback,
      },
      { where: { id: req.params.id } }
    );
    return res
      .status(200)
      .json({ message: "Connector updated successfully!!" });
  } catch (ex) {
    next(ex);
  }
};
exports.deleteConnectorById = async (req, res, next) => {
  try {
    const deletedConnector = await Connector.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res
      .status(200)
      .json({ message: "Connector Deleted!!", deletedConnector });
  } catch (ex) {
    next(ex);
  }
};

exports.getConnectorBetweenDates = async (req, res, next) => {
  try {
    let lastDate = req.body.lastDate;
    let now = req.body.currentDate;
    const Connector = await Connector.findAll({
      where: {
        meeting: {
          [$.between]: [now, lastDate],
        },
      },
    });
    if (!Connector)
      return res
        .status(400)
        .json({ message: "No Connector found between mentioned Dates!!" });
    return res.status(200).json({ Connector });
  } catch (ex) {
    next(ex);
  }
};
