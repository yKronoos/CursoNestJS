import { JwtService } from "@nestjs/jwt";
import { accessToken } from "./accessToken.mock";
import { jwtPayload } from "./jwtPayload.mock";

export const jwtServiceMock = {
    provide: JwtService,
    useValue:  {
        sign: jest.fn().mockReturnValue(accessToken),
        verify: jest.fn().mockReturnValue(jwtPayload),
    }
}