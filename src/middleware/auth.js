const jwt = required('jesonewbtoken')

//=============Authentication==============//

const Authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'] || req.headers['x-Api-key']
        if (!token) return res.status(400).send({ status: false, message: "token must be present" });

        let decodedtoken = jwt.verify(token, "pro@3")
        if (!decodedtoken) return res.status(400).send({ status: false, message: "token is invalid" });

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
};

//============Authorization===============//

const authorization = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'] || req.headers['x-Api-key']
        if (!token) return res.status(400).send({ status: false, message: "first login first(no token)" });

        let decodedtoken = jwt.verify(token, "pro@3")

        let userId = req.params.userId || req.body.userId || req.query.userId
        if (!userId) return res.status(400).send({ status: false, message: "please provide userId" });
        
        if (!(decodedtoken.userId == userId)) return res.status(400).send({ status: false, message: "not authorised" });
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }

};

module.export = { Authentication, authorization }