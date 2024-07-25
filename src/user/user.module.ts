import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { AuthModule } from "../auth/auth.module";
import { UserIdCheckMiddleware } from "../middlewares/user-id-check.middleware";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, TypeOrmModule]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }

}