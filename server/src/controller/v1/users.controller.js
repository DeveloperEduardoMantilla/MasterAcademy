import {conx} from "../../config/atlas.js";


const getUsersController=async(req,res)=>{
    try {
        let db = await conx();
        let user = db.collection("user");
        let result = await user.find().toArray();
        return res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({message:error.stack});
    }
}

export {
    getUsersController
}