import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class FotoExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof BadRequestException) {
            response.status(400).send({
                message: 'Validation fails',
                status: 400,
                error: 'Bad Request',
                cause: 'ValidationError',
                errors: { foto: ['deve ser um arquivo de imagem válido'] },
            });
        } else if (exception instanceof UnauthorizedException) {
            response.status(401).send({
                message: 'Token Inválido',
                status: 401,
                error: 'Unauthorized',
                cause: 'InvalidTokenError',
            });
        } else {
            response.status(exception.getStatus()).send({ message: exception.message });
        }
    }
}