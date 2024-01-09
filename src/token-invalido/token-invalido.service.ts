import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenInvalido } from './entities/token-invalido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenInvalidoService {
    constructor(@InjectRepository(TokenInvalido)
    private token: Repository<TokenInvalido>,
    ) { }

    async create(TokenInvalido: string) {
        return await this.token.save({ token: TokenInvalido });
    }

    async findOne(TokenInvalido: string) {
        return await this.token.findOneBy({ token: TokenInvalido })
    }
}
