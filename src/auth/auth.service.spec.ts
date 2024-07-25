import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/userRepository.mock"
import { jwtServiceMock } from "../testing/jwtService.mock"
import { userServiceMock } from "../testing/userService.mock"
import { mailerServiceMock } from "../testing/mailerService.mock"
import { AuthController } from "./auth.controller"
import { userEntityList } from "../testing/userEntity-list.mock"
import { accessToken } from "../testing/accessToken.mock"
import { jwtPayload } from "../testing/jwtPayload.mock"
import { resetToken } from "../testing/resetToken.moock"
import { createUserDTO } from "../testing/create-user-dto.mock"

describe('Auth Service', () => {

    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,  
                jwtServiceMock,
                userServiceMock,
                mailerServiceMock
            ],
            //controllers: [AuthController],
        }).compile()

        authService = module.get<AuthService>(AuthService)
    })

    test("Testando definicao", ()  => {
        expect(authService).toBeDefined()
    })

    describe('Token', () => {
        test("method createToken", async ()  => {
            const result = await authService.createToken(userEntityList[0])
            console.log(result)
            expect(result).toEqual({accessToken})
        })

        test("method checkToken", ()  => {
            const result = authService.checkToken(accessToken)

            expect(result).toEqual(jwtPayload)
        })

        test("method isValidToken", ()  => {
            const result = authService.isInvalidToken(accessToken)

            expect(result).toEqual(true)
        })
    })

    describe('Autenticação', () => {
        test("method login", async ()  => {
            const result = await authService.login('test@gmail.com', 'Aa@1234567')

            expect(result).toEqual({accessToken})
        })

        test("method forget",async  ()  => {
            const result = await authService.forget('test@gmail.com')

            expect(result).toEqual({sucess: true})
        })

        test("method reset",async  ()  => {
            const result = await authService.reset('Aa@1234567', resetToken)

            expect(result).toEqual({accessToken})
        })

        test("method register",async  ()  => {
            const result = await authService.register(createUserDTO)

            expect(result).toEqual({accessToken})
        })
    })
})