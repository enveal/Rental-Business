const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;
const Transaction = db.transactions
const Item = db.items

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
  exports.createTransaction = (req,res) => {
    
    const { type,isBroken,accountId,itemId} = req.body;
    let transation = {
      type,isBroken,accountId,itemId
    }
    console.log(transation,"transaction")
    Transaction.create(transation).then(data=>{
      res.send(data)
    }).catch(err=>{
      res.send(err)
    })
  }

  exports.findAllTransaction = (req,res) => {
    const {userId} = req.body;
    console.log(userId,"userId of customer")
    
    
    Account.findOne({
      attributes:[],
      include:[
        {
          model:Transaction,
          include: [{model:Item,
            attributes:["id","name","Rent","Description"]
          }
            
          ],
          attributes:["type","isBroken","createdAt"]
      
        },
      ],
      where:{id:userId}}).then(data=>{
      res.send(data)
    }).catch(error=>{
      console.log(error)
      res.send(error)
    })

  }

  exports.createItem = (req,res) => {
    const {name, Description, Rent, size} = req.body
    if ((!name) || (!Description) || (!Rent)|| (!size)) {
      res.status(400).send({
        message: "Data Error"
      });
      return;
    }
    let item = {
      name, Description, Rent, size
    }
    Item.create(item).then(data=>{
      res.send(data)
    }).catch(err=>{
      res.send(err)
    })
  }

  exports.getItems = (req,res) => {
 
    let {itemId} = req.params;
    console.log(Number(itemId),"itemId")
    let id = Number(itemId)
    
    Item.findOne({
      attributes:["id","name","Rent","Description"],
      include:[
        {
          model:Transaction,
          attributes:["type","isBroken","createdAt"],
          include:[{
            model:Account,
            attributes:["name","email","id"]

          }]
        }
      ],
      where:{id}

    }).then(data=>{
      res.send(data)
    }).catch(erorr=>{
      res.send(erorr)
    })

  }