import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrimsaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrimsaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UserModule{

}