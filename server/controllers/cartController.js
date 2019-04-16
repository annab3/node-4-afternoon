const swag = require("../models/swag");

const add = (req, res) => {
  if (req.params.id) {
    for (let i = 0; i < req.session.user.cart.length; i++) {
      if (req.session.user.cart[i].id === +req.params.id) {
        res.status(200).json(req.session.user);
        return;
      }
    }
    for (let j = 0; j < swag.length; j++) {
      if (swag[j].id === +req.params.id) {
        req.session.user.cart.push(swag[j]);
        req.session.user.total += swag[j].price;
        res.status(200).json(req.session.user);
        return;
      }
    }
    res.status(403).json({ error: "can not add to cart" });
    return;
  }
  res.status(403).json({ error: "item id not found" });
};

const remove = (req, res) => {
  if (req.params.id) {
    for (let i = 0; i < req.session.user.cart.length; i++) {
      if (req.session.user.cart[i].id === +req.params.id) {
        req.session.user.total -= req.session.user.cart[i].price;
        req.session.user.cart.splice(i, 1);
        res.status(200).json(req.session.user);
        return;
      }
    }
    res.status(403).json({ error: "item not found" });
  }
  res.status(403).json({ error: "item not found" });
};

const checkout = (req, res) => {
  req.session.user.cart = [];
  req.session.user.total = 0;
  res.status(200).json(req.session.user);
};

module.exports = {
  add,
  remove,
  checkout
};
