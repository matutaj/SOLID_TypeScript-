import { User } from '../../model/user';
import { IMailProvider } from '../../providers/IMailProvider';
import {IUsersRepository} from '../../Repository/IUsersReprository'
import { ICreateUserRepositoryDTO } from './CreateUseDTO';

export class CreateUseCase{
    constructor(private userRepository:IUsersRepository,
        private mailProvide:IMailProvider,
        ){}

    async execute(data:ICreateUserRepositoryDTO){

        const userAlreayExists = await this.userRepository.findByEmail(data.email);
        
        if(userAlreayExists){
            throw new Error("User exist");
        }
        const user = new User(data);

        await this.userRepository.save(user);

        this.mailProvide.sendMail({
            to:{
                name:data.name,
                email:data.email,
            },
            from:{
                name:'Matuta Jorge',
                email:'matuta2080@gmail.com'
            },
            subject:'Bem-Vindo ao Mundo de Programação',
            body:'Desfrute o Máximo deste mundo!'
        })
    }
}