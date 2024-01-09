import { Controller } from '@nestjs/common';
import { TokenInvalidoService } from './token-invalido.service';

@Controller('token-invalido')
export class TokenInvalidoController {
  constructor(private readonly tokenInvalidoService: TokenInvalidoService) {}
}
