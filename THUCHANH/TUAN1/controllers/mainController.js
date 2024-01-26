const mainModel = require('../models/mainModel');

const mainController = {
    getIndex: (req, res) => {
        const data = mainModel.getData();
        res.render('index', { data });
    },
};

module.exports = mainController;