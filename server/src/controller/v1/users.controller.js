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
        let result = await user.find({id:req.params.id}).toArray();

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
        let result = await user.find({id:req.user.id}).toArray();

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
        let db = await conx();
        let user = db.collection("courseRegistration");
        await user.insertOne(req.body)
        res.status(200).send({message:'Registro ingresado con exito'})
    }catch(error){
        console.log({message:error.message});
        res.status(500).send({message:error.message})
    }
}

const getCourseRegistrationController = async(req, res)=>{
    try{
        let db = await conx();
        let result2 = db.collection("courseRegistration");
        let result = await result2.find({userId:req.params.userId}).toArray();

        if(Object.keys(result).length > 0){
            res.status(200).send({ status: "success", message:result})
        }else{
            res.status(200).send({ status: "success", messsage:false})
        }
    }catch(error){
        res.status(500).send({message:error})
    }
}

const getValidationRegistredController = async(req,res)=>{
    try{
        let db = await conx();
        let result2 = db.collection("courseRegistration");
        let result = await result2.find({userId:req.body.userId, course:req.body.course}).toArray();

        if(Object.keys(result).length > 0){
            res.status(200).send({data:result})
        }else{
            res.status(200).send({data:"null"})
        }
    }catch(error){
        res.status(500).send({message:error})
    }
}

const getRequestCoursesController = async(req, res)=>{
    try{
        let db = await conx();
        let result2 = db.collection("courseRegistration");
        let result = await result2.find().toArray();

        if(Object.keys(result).length > 0){
            res.status(200).send({ status: "success", message:result})
        }else{
            res.status(200).send({ status: "success", messsage:false})
        }
    }catch(error){
        res.status(500).send({message:error})
    }
}

const postCommentController = async(req, res)=>{
    try{
        let db = await conx();
        let user = db.collection("classComments");
        await user.insertOne(req.body)
        res.status(200).send({message:'Comment entered successfully'})
    }catch(error){
        console.log({message:error.message});
        res.status(500).send({message:error.message})
    }
}

export {
    getUsersController,
    getUserIdController,
    getUserLogoutController,
    postCourseRegistrationController,
    getCourseRegistrationController,
    getValidationRegistredController,
    getRequestCoursesController,
    postCommentController
}