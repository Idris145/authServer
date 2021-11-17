const jwt = require('../Middleware/jwt')
const tokenModel = require('./token.model');

exports.Login = function (req, res) {
    try {
        const user = { name: req.body.name, email: req.body.email, role: req.body.role };
        const accessToken = jwt.generateAccessToken(user);
        const refreshToken = jwt.generateRefreshToken(user);
        var token = new tokenModel({ name: req.body.name, email: req.body.email, role: req.body.role, token: refreshToken });
        token.save((err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }
        });
    } catch (err) {
        res.status(500).send({ message: "could not process request", status: "fail" });
    }
}

exports.Logout = function (req, res) {
    try {
        tokenModel.findOneAndDelete({ token: req.body.token }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.status(500).send({ message: "could not process request", status: "fail" });
    }
}

exports.LogoutFromAllDevices = function (req, res) {
    try {
        tokenModel.deleteMany({ email: req.body.email }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.status(500).send({ message: "could not process request", status: "fail" });
    }
}

exports.Refresh = function (req, res) {
    try {
        const refreshToken = req.body.token;
        if(refreshToken == null) return res.sendStatus(401);
        tokenModel.findOne({ token: refreshToken }, (err, data) => {
            if (err) {
                res.send(err);
            }
            if (data == null) return res.sendStatus(403);
            const user = { name: data.name, email: data.email, role: data.role };
            const accessToken = jwt.generateAccessToken(user);
            res.json({
                accessToken: accessToken
            });
        });
    
    } catch (err) {
        res.status(500).send({ message: "could not process request", status: "fail" });
    }
}

exports.AccessDatabase = function (req, res) {
    try {

            res.send("you are in!!");
        
    } catch (err) {
        res.status(500).send({ message: "could not process request", status: "fail" });
    }
}