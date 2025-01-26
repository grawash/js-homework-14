const permitRandomizer = (req, res, next) => {
    const permit = (Math.random() >= 0.5)
    if(!permit){
        return res.status(403).json({"message": "unauthorized"})
    }
    next()
}

export {permitRandomizer}