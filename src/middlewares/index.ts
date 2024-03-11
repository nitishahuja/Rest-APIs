import express from 'express';
import {get, merge} from 'lodash';

import { getUsersBySessionToken } from '../db/users';

export const isOwner = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try{
        const {id} = request.params;
        const currentUser = get(request, 'identity._id') as string;

        if(!currentUser){
            return response.sendStatus(400);
        }

        if(currentUser.toString() !== id){
            return response.sendStatus(403);
        }

        return next();

    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}

export const isAuthenticated = async(request: express.Request, response: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = request.cookies.sessionToken;
        if(!sessionToken){
            return response.sendStatus(403);
        }

        const user = await getUsersBySessionToken(sessionToken);
        if(!user){
            return response.sendStatus(403);
        }

        merge(request, {identity: user});

        return next();
    }catch(error){
        console.log(error);
        return response.sendStatus(400);
    }
}