const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = '43ffea19cec98caa1be960f2c76eac56983cd020c2962ce05f090953bb0147bbee2dad959bd6a658002745a8638b67c276cbe8be8c1675ae298730d3219e74c2'
const ACCESS_TOKEN_SECRET_REFRESH = '90953dad959b6eac56983cd020c296275aed6a658002745a8638b67c276cbe8be8c167243ffea19bb0147bbee2cec98caa1be960f2cce05f098730d3219e74c2'

exports.generateAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

exports.generateRefreshToken = (user) => {
    let token = jwt.sign(user, ACCESS_TOKEN_SECRET_REFRESH)
    return token
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.authenticateTokenAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        if (user.role !== 'admin') return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.authenticateTokenStaff = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        if (user.role !== 'staff' && user.role !== 'admin') return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.authenticateTokenGuest = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        if (user.role !== 'guest') return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.authenticateTokenRefresh = (req, res, next) => {
    const token = req.body.token;
    if (token == null) return res.sendStatus(401)
    if (!refreshTokens.includes(token)) { return res.sendStatus(403); }

    jwt.verify(token, ACCESS_TOKEN_SECRET_REFRESH, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


