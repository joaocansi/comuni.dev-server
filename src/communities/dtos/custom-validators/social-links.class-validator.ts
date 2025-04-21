import { registerDecorator, ValidationOptions } from 'class-validator';
import { socials } from 'src/shared/constants/socials.constant';

// This decorator checks if the array contains all required social links
// (github, twitter, instagram, discord, reddit) in the communityLinks array
export function ContainsAllSocialLinks(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'containsAllSocialLinks',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) return false;

          const names = value.map((link) => link.name);
          return socials.every((item) => names.includes(item));
        },
        defaultMessage() {
          return `communityLinks must contain all of: ${socials.join(', ')}`;
        },
      },
    });
  };
}
