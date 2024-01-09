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

        const refreshToken = this.jwtService.sign(
            { email: payload.email },
            { secret: 'refresh', expiresIn: '60s' }
        );

        return { token: acessToken, refresh_token: refreshToken };
    }

    async reautenticar(body: any) {
        const payload: Professor = await this.verificarRefreshToken(body);
        return this.gerarToken(payload);
    }

    private async verificarRefreshToken(body: any): Promise<Professor> {
        const refreshToken = body.refresh_token;

        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const email = this.jwtService.decode(refreshToken)['email'];
        const user = await this.profService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        try {
            this.jwtService.verify(refreshToken, { secret: 'refresh' });
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}