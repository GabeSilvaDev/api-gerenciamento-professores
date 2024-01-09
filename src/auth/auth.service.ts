import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfessoresService } from 'src/professores/professores.service';
import * as bcrypt from "bcrypt"
import { Professor } from 'src/professores/entities/professor.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private profService: ProfessoresService, private jwtService: JwtService) {

    }

    async validateUser(username: string, password) {
        const user = await this.profService.findOneByEmail(username);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (await bcrypt.compare(password, user.password)) {
            return await this.gerarToken(user);
        }

        throw new UnauthorizedException();
    }

    async gerarToken(payload: Professor) {
        const acessToken = this.jwtService.sign(
            { email: payload.email },
            { secret: 'treina', expiresIn: '30s' }
        );

        return { token: acessToken };
    }
}