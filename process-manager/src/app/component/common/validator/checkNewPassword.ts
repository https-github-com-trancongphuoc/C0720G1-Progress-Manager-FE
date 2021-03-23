import {AbstractControl, FormControl} from '@angular/forms';

export function checkPassword(control: AbstractControl) {

  const newPassword = control.value.newPassword;
  const repeatPassword = control.value.repeatPassword;

  if (newPassword !== repeatPassword) {
    return {checkNewPasswordError : true};
  }

  return null;

}
