import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ProfessoresService } from "src/professores/professores.service";
import { JwtPayload } from "./jwt-payload";
import { JwtService } from "@nestjs/jwt";
import { TokenInvalidoService } from "src/token-invalido/token-invalido.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService: ProfessoresService, private jwtService: JwtService, private tokenService: TokenInvalidoService) {
        super({
            secretOrKey: process.env.SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        const bearerToken = this.jwtService.sign(payload, { secret: process.env.SECRET });
        const tokenInvalido = await this.tokenService.findOne(bearerToken);
        const { email } = payload;
        const user = await this.userService.findOneByEmail(email);
        if (!user || tokenInvalido) {
            throw new UnauthorizedException();
        }
        return user;
    }
}