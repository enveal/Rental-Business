module.exports = app => {
    const account = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", account.create);
  
    // Retrieve all account
    router.get("/", account.findAll);
  
    // Retrieve all published account
    router.get("/published", account.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", account.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", account.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", account.delete);
  
    // Create a new Tutorial
    router.delete("/", account.deleteAll);

    //transation
    router.post("/v1/createTransation", account.createTransaction)

    router.get("/v1/allTransations", account.findAllTransaction)
    // router.get("/v1/findData", account.findData)
    router.post("/v1/createItem",account.createItem)

    router.get("/v1/item/:itemId",account.getItems)

    app.use('/api/account', router);
  };