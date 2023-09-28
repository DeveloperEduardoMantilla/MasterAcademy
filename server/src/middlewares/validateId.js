const validateId = (req, res, next) => {
    if(!isNaN(parseInt(req.params.id))){
        next();
    }else{
        res.status(400).send({status:"Error",message:"The id parameter is not a number"})
        return
    }
    
}



export default validateId