import { Module } from '@nestjs/common';
import { TokenInvalidoService } from './token-invalido.service';
import { TokenInvalidoController } from './token-invalido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInvalido } from './entities/token-invalido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInvalido])],
  controllers: [TokenInvalidoController],
  providers: [TokenInvalidoService],
})
export class TokenInvalidoModule {}
