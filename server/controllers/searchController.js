const swag = require("../models/swag");

const search = (req, res) => {
  if (req.query.category) {
    let filteredSwag = swag.filter(
      item => item.category === req.query.category
    );
    if (filteredSwag.length === 0) {
      res.status(200).json(swag);
    } else {
      res.status(200).json(filteredSwag);
    }
  }
};

module.exports = {
  search
};
