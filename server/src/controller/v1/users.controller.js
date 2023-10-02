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


const getUserIdController =  async(req, res)=>{
    try{
        let db = await conx();
        let user = db.collection("user");
        let result = await user.find({id:parseInt(req.params.id)}).toArray();

        if(Object.keys(result).length == 0){
            res.status(200).send({ status: "success", messsage:`No se encontraron registros en el sistema.`})
        }else{
            res.status(200).send(result)
        }
    }catch(error){
        res.status(500).send({message:error})
    }
}

const getUserLogoutController = async(req, res)=>{
    try{
        let db = await conx();
        let user = db.collection("user");
        let result = await user.find({id:parseInt(req.user.id)}).toArray();

        if(Object.keys(result).length == 0){
            res.status(200).send({ status: "success", messsage:`No se encontraron registros en el sistema.`})
        }else{
            res.status(200).send(result[0])
        }
    }catch(error){
        res.status(500).send({message:error})
    }
}

const postCourseRegistrationController = async(req, res)=>{
    try{
        console.log("Llegue aca!!");
        let db = await conx();
        let user = db.collection("courseRegistration");
        console.log(req.body)
        await user.insert(req.body)
        console.log(result);
        res.status.send({message:'Registro ingresado con exito'})
    }catch(error){
        res.status(500).send({message:error})
    }
}


export {
    getUsersController,
    getUserIdController,
    getUserLogoutController,
    postCourseRegistrationController
}