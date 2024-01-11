import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
    @Expose({ name: 'refresh_token' })
    @IsNotEmpty({ message: 'é obrigatório '})
    refreshToken: string;
}