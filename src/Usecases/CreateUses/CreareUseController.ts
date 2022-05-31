import { CreateUseCase } from "./CreateUseCase";
import {Request,Response}from 'express'
export class CreateUserController{
    constructor(
        private createUseCase:CreateUseCase,
    ){}

    async handle(req:Request, res:Response):Promise<Response>{
        const {name, email,password}= req.body;

        try{
            await this.createUseCase.execute(
                {
                    name,
                    email,
                    password
                })
          throw res.status(201).send();

        }catch(err){
            throw res.status(400).json({
                message: "Ocorreu um erro"
            })
        }
    }
}