import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Response } from 'express';
import { ProfessorMailExistsException } from "src/professores/exceptions/professor-mail-exists-exception";

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const validationErrors = exception.getResponse()['message'] as Array<ValidationError>;

        if (exception instanceof ProfessorMailExistsException) {
            response.status(400).send({
                message: 'Validation fails',
                status: 400,
                error: 'Bad Request',
                cause: 'ValidationError',
                errors: { email: ['já utilizado'] },
            });
        } else if (exception instanceof UnauthorizedException) {
            response.status(401).send({
                message: 'Credenciais inválidas',
                status: 401,
                error: 'Unauthorized',
                cause: 'InvalidCredentialsError',
            });
        } else {
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
    }

    private camelToSnake(key: string) {
        return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}