import { NotFoundException } from "@nestjs/common";

export class ProfessorNotFoundException extends NotFoundException {
    constructor() {
        super({
            message: 'Professor não encontrado',
            status: 404,
            error: 'Not Found',
            cause: 'NotFoundError',
        });
    }
}