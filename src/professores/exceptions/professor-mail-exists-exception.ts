import { BadRequestException } from "@nestjs/common";

export class ProfessorMailExistsException extends BadRequestException {
    constructor() {
        super({
            message: 'Validation fails',
            status: 400,
            error: 'Bad Request',
            cause: 'ValidationError',
            errors: { email: ['já utilizado'] },
        });
    }
}