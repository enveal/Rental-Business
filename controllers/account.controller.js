const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    console.log("Hey");
    const {name, address, email, phoneNumber, AadharCard, creditLimit } = req.body
    if ((!name) || (!email) || (!phoneNumber)|| (!AadharCard) ||(!creditLimit)) {
      res.status(400).send({
        message: "Data Error"
      });
      return;
    }
  
    // Create a Account
    const account = {
      name, address, email, phoneNumber, AadharCard, creditLimit
    };
  
    // Save Account in the database
    Account.create(account)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the account."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.name;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Account.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving accounts."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Account.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find account with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving account with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Account.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "account was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update account with id=${id}. Maybe account was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating account with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Account.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "account was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete account with id=${id}. Maybe account was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete account with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Account.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} accounts were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all accounts."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Account.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Accounts."
        });
      });
  };