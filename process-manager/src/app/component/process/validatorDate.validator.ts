import {AbstractControl} from '@angular/forms';

export function DateSearchValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let fromDate = control.get('startDate');
  let toDate = control.get('endDate');
  if (fromDate.value > toDate.value) {
    return {
      dateSearchValid: true
    };
  }
  return {};
}

export function DateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  let  date = control.value;
  let current = new Date();
  if (new Date(date) < current) {
    return {
      dateValid: true
    };
  }
  return null;
}

