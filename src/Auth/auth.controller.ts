import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('Auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login' })
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto.Email, authLoginDto.Senha);
  }
}
