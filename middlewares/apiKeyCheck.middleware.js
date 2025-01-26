const apiKeyCheck = (req, res, next) => {
    const apiKey = req.headers['api-key']
    if(!apiKey){
        return res.status(403).json({"message": "unauthorized"})
    }
    next()
}

export {apiKeyCheck}