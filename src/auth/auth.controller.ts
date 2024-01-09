import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfessorAuthRequestDto } from './dto/auth-request-dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(ValidationExceptionFilter)
  async login(@Body() profDto: ProfessorAuthRequestDto) {
    return this.authService.validateUser(profDto.email, profDto.password);
  }
}
