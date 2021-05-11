import { FormControl } from "@angular/forms";

export class NumberValidator {
  static isValid(control: FormControl): any {
    const convertedValue = Number(control.value);
    return convertedValue ? null : { 'not a number': true }
  }
}