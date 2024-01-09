import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Professor } from "src/professores/entities/professor.entity";

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): Professor => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);