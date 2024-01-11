import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class ProfessorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof UnauthorizedException) {
            response.status(401).send({
                message: 'Token Inválido',
                status: 401,
                error: 'Unauthorized',
                cause: 'InvalidTokenError',
            });
        } else {
            response.status(exception.getStatus()).send({
                message: exception.message,
                status: exception.getStatus(),
            })
        }
    }
}