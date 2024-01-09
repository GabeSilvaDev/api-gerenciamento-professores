import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

export function Match(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        })
    }
}

@ValidatorConstraint({ name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        const [ralatedPropertyName] = validationArguments.constraints;
        const relatedValue = (validationArguments.object as any)[ralatedPropertyName];
        return value === relatedValue;
    }
    defaultMessage?(): string {
        return 'Senhas não conferem';
    }
}