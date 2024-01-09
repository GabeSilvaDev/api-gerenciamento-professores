import { Body, Controller, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfessorAuthRequestDto } from './dto/auth-request-dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseFilters(ValidationExceptionFilter)
  async login(@Body() profDto: ProfessorAuthRequestDto) {
    return this.authService.validateUser(profDto.email, profDto.password);
  }

  @Post('refresh')
  async reautenticar(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.reautenticar(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Body() refreshToken: RefreshTokenDto,
    @Request() req: Request,
  ) {
    const bearerToken = req.headers['authorization'].replace('Bearer ', '');
    return await this.authService.logout(refreshToken, bearerToken);
  }
}
