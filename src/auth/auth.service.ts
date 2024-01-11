import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfessoresService } from 'src/professores/professores.service';
import * as bcrypt from "bcrypt"
import { Professor } from 'src/professores/entities/professor.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenInvalidoService } from 'src/token-invalido/token-invalido.service';
import { RefreshTokenDto } from './dto/refresh-token-dto';

@Injectable()
export class AuthService {
    constructor(
        private profService: ProfessoresService,
        private jwtService: JwtService,
        private token: TokenInvalidoService
    ) {

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
            { secret: process.env.SECRET, expiresIn: '120s' }
        );

        const refreshToken = this.jwtService.sign(
            { email: payload.email },
            { secret: process.env.REFRESH, expiresIn: '240s' }
        );

        return { token: acessToken, refresh_token: refreshToken };
    }

    async reautenticar(body: RefreshTokenDto) {
        const payload: Professor = await this.verificarRefreshToken(body);
        return this.gerarToken(payload);
    }

    private async verificarRefreshToken(body: RefreshTokenDto): Promise<Professor> {
        const refreshToken = body.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        const email = this.jwtService.decode(refreshToken)['email'];
        const user = await this.profService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        try {
            const token = await this.token.findOne(refreshToken);
            if (!token) {
                this.jwtService.verify(refreshToken, { secret: process.env.REFRESH });
                await this.token.create(refreshToken);
                return user;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async logout(refreshToken: RefreshTokenDto, bearerToken: string) {
        const bearerTokenExists = await this.token.findOne(bearerToken);
        if (bearerTokenExists) {
            throw new UnauthorizedException();
        } else {
            const tokenExist = await this.token.findOne(refreshToken.refreshToken);
            if (!tokenExist) {
                await this.token.create(refreshToken.refreshToken);
            }
            await this.token.create(bearerToken);
            throw new HttpException('Reset Content', HttpStatus.RESET_CONTENT)
        }
    }
}