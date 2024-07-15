import { UserService } from './../user/user.service';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(
        private readonly reflector: Reflector 
    ){}

    async canActivate(context: ExecutionContext){
        
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRoles){
            return true
        }

        const {user} = context.switchToHttp().getRequest();
        
        const rolesFiltred = requiredRoles.filter(role => role === user.role)
        
        return rolesFiltred.length > 0

    }
    
}