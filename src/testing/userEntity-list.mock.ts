import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";

export const userEntityList: UserEntity [] = [
    {
        birthAt: new Date('2000-01-01'),
        email: 'test@gmail.com',
        name: 'Nani',
        password: '$2b$10$hzENE0f8yuHaoWdhLsknaeYlAS63RAIGATCQaULCVt3nKgYJDa3b6',
        role: Role.User
    },
    {
        birthAt: new Date('2000-01-01'),
        email: 'test2@gmail.com',
        name: 'loolo',
        password: '$2b$10$hzENE0f8yuHaoWdhLsknaeYlAS63RAIGATCQaULCVt3nKgYJDa3b6',
        role: Role.User
    },
    {
        birthAt: new Date('2000-01-01'),
        email: 'test3@gmail.com',
        name: 'Tuti',
        password: '$2b$10$hzENE0f8yuHaoWdhLsknaeYlAS63RAIGATCQaULCVt3nKgYJDa3b6',
        role: Role.User
    }
    
]