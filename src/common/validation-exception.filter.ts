import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const validationErrors = exception.getResponse()['message'] as Array<ValidationError>;

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
    }

    private camelToSnake(key: string) {
        return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}