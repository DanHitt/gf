var express = require("express");
var storeRouter = express.Router();
var Store = require("../models/store");
var Session = require("../models/session")

storeRouter.route("/")
    .get(function (req, res) {
        Store.find({}, function (err, stores) {
            if (err) res.status(500).send(err);
            else res.send(stores);
        });
    })
    .put(function (req, res) {
        Store.find({_id : req.body._id}, function (err, store){
            if (err) res.status(500).send(err);
            else {
                store.name = req.body.name || store.name;
                store.phone = req.body.phone || store.phone;
                store.website = req.body.website || store.website;
                store.streetAddy = req.body.streetAddy || store.streetAddy;
                store.city = req.body.city || store.city;
                store.state = req.body.state || store.state;
                store.zip = req.body.zip || store.zip;
                store.gamingTables = req.body.gamingTables || store.gamingTables;
                store.description = req.body.description || store.description;

                store.save(function (err, store) {
                    if (err) {
                        res.status(400).send({
                            success: false,
                            message: "There has been a glitch in the Matrix.  Not updated."
                        })
                    }
                    res.send({
                        success: true,
                        message: "Neo, don't *think* you changed the record, *know* you did."
                    });
                });
            }
        })
    })



    .post(function (req, res) {
        var newStore = new Store(req.body);
        newStore.user = req.user._id;

        newStore.save(function (err, store) {
            if (err) res.status(500).send(err);
            else res.status(201).send(store);
        });
    });


storeRouter.route("/getStoreByName/:storeName")
    .get(function (req, res) {
        Store.findOne({
            name: req.params.storeName
        }, function (err, store) {
            if (err) res.status(500).send(err)
            else res.status(201).send(store)
        })
    })

storeRouter.route("/:state")
    .get(function (req, res) {
        Store.find({
            state: req.params.state
        }).
        populate('_sessions').
        exec(function (err, stores) {
            if (err) res.status(500).send(err)
            else {
                res.status(201).send(stores);
            }
        })


        //        Store.find({
        //            state: req.params.state
        //        }, function (err, store) {
        //            if (err) res.status(500).send(err);
        //            else res.send(store);
        //        });
    })
    //    .put(function (req, res) {
    //        Store.findOneAndUpdate({
    //            _id: req.params.storeId,
    //            user: req.user._id
    //        }, req.body, {
    //            new: true
    //        }, function (err, store) {
    //            if (err) res.status(500).send(err);
    //            else res.send(store);
    //        });
    //    })
    //    .delete(function (req, res) {
    //        Store.findOneAndRemove({
    //            _id: req.params.storeId,
    //            user: req.user._id
    //        }, function (err, store) {
    //            if (err) res.status(500).send(err);
    //            else res.send(store);
    //        });
    //    });

module.exports = storeRouter;
