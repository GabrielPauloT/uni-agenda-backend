import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ required: true, description: 'Nome do usuário' })
  @IsString()
  @Length(255)
  public Nome: string;

  @ApiProperty({ required: true, description: 'Email do usuário' })
  @IsString()
  @Length(255)
  @IsEmail()
  public Email: string;

  @ApiProperty({ required: true, description: 'Senha do usuário' })
  @IsString()
  @Length(255)
  public Senha: string;
}
