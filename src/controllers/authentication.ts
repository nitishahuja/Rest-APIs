import express from "express";
import { getUsersByEmail, createUser } from "db/users";
import { authentication, random } from "helpers";

export const register = async(request: express.Request, response: express.Response) =>{
    try{
        const {email, password, username } = request.body;
        if(!email||!password||!username){
            return response.sendStatus(400)
        }

        const existingUser = await getUsersByEmail(email);
        if(existingUser){
            return response.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password : authentication(salt,password)
            }
        })

        return response.sendStatus(200).json(user).end();
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

