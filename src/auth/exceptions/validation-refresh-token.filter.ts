import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Response } from 'express';

@Catch(HttpException)
export class ValidationRefreshTokenFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const validationErrors = exception.getResponse()['message'] as Array<ValidationError>;

        if (exception instanceof UnauthorizedException) {
            response.status(401).send({
                message: 'Token Inválido',
                status: 401,
                error: 'Unauthorized',
                cause: 'InvalidTokenError',
            });
        } else if (exception instanceof BadRequestException) {
            const errors = {}
            validationErrors.forEach((error) => {
                errors[this.camelToSnake(error.property)] = [Object.values(error.constraints).join(', ')];
            });

            response.status(400).send({
                message: 'Validation fails',
                status: 400,
                error: 'Bad Request',
                cause: 'ValidationError',
                errors,
            });
        } else {
            response.status(exception.getStatus()).send({ message: exception.message })
        }
    }

    private camelToSnake(key: string) {
        return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}