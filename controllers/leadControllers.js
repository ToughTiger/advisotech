const { Lead } = require("../util/database");
const fs = require("fs");
const Sequelize = require("sequelize");
const $ = Sequelize.Op;
exports.getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.findAll();
    if (!leads) return res.status(200).json({ message: "No Lead found!!" });

    return res.status(200).json(leads);
  } catch (ex) {
    next(ex);
  }
};

exports.postLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({
      name: req.body.name,
      mobile: req.body.mobile,
      address: req.body.address,
      incomeType: req.body.incomeType,
      annualIncome: req.body.annualIncome,
      email: req.body.email,
      loanType: req.body.loanType,
      sourcedBy: req.body.sourcedBy,
      amount: req.body.amount,
    });
    return res
      .status(200)
      .json({ message: "Lead created cuccessfully!!!", lead });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
exports.getSecured = async (req, res, next) => {
  try {
    const secured = await Lead.findAll({
      where: {
        loantype: {
          [$.or]: ["Home Loan", "LAP", "LRD"],
        },
      },
    });

    if (secured) return res.status(200).json(secured);
  } catch (ex) {
    console.log(ex.message);
    next(ex);
  }
};
exports.getLeadById = async (req, res, next) => {
  try {
    const Lead = await Lead.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (!Lead) return res.status(200).json({ message: "No Lead found!!" });
    return res.status(200).json(Lead);
  } catch (ex) {
    next(ex);
  }
};

exports.getLeadDocumentById = (req, res, next) => {
  const fileTypes = ["csv", "jpg", "jpeg", "pdf", "png", "xslx"];
  return new Promise((resolve, reject) => {
    if (
      req.query.file &&
      fileTypes.indexOf(req.query.file.toLowerCase()) > -1
    ) {
      return resolve(
        `sample.${fileTypes[fileTypes.indexOf(req.query.file.toLowerCase())]}`
      );
    }
    return reject("Please select file to download");
  })
    .then((file) => {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(`./public/${file}`)) {
          return resolve(`./public/#{file}`);
        }
        return reject(`File ${file} was not found.`);
      });
    })
    .then((filePath) => {
      res.download(filePath);
    })
    .catch((ex) => {
      console.log(ex.message);
      next(ex);
    });
};

exports.updateLeadById = async (req, res, next) => {
  try {
    const updatedLead = await Lead.update(
      {
        name: req.body.name,
        email: req.body.email,
      },

      { where: { id: req.params.id } }
    );

    if (!updatedLead)
      return res.status(301).json({
        message: "Could not update Lead. Please check if inputs are proper",
      });

    return res.status(200).json({
      message: "Lead data upadted successfully!!",
    });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

exports.deleteLeadById = (req, res, next) => {
  res.send("working");
};
