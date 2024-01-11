import { Body, Controller, Post, Request, UseFilters, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfessorAuthRequestDto } from './dto/auth-request-dto';
import { ValidationExceptionFilter } from 'src/common/validation-exception.filter';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationRefreshTokenFilter } from './exceptions/validation-refresh-token.filter';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  @UseFilters(ValidationExceptionFilter)
  async login(@Body() profDto: ProfessorAuthRequestDto) {
    return this.authService.validateUser(profDto.email, profDto.password);
  }

  @HttpCode(200)
  @Post('refresh')
  @UseFilters(ValidationRefreshTokenFilter)
  async reautenticar(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.reautenticar(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(ValidationRefreshTokenFilter)
  async logout(
    @Body() refreshToken: RefreshTokenDto,
    @Request() req: Request,
  ) {
    const bearerToken = req.headers['authorization'].replace('Bearer ', '');
    return await this.authService.logout(refreshToken, bearerToken);
  }
}
