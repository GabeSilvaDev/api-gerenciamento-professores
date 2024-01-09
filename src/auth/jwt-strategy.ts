import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ProfessoresService } from "src/professores/professores.service";
import { JwtPayload } from "./jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService: ProfessoresService) {
        super({
            secretOrKey: 'treina',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}