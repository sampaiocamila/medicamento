
import { of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class ControlBuilder {

  static HIDE_REQUIRED = '_hideRequired';
  static FLOAT_LABEL = '_floatLabel';
  static PLACEHOLDER_LABEL = '_placeholder';
  name: string;
  value: any;
  validators: ValidatorFn[];
  disabled: boolean;
  hideRequired: boolean;
  displayed: string;
  placeholder: string;
  favorite;
  // placeholderLabel: string;

  static _filter(list: any[], _filterValue: string, ...options: string[]): any[] {
    let result = [];
    if (list && options) {
      if (_filterValue && _filterValue !== '') {
        const filterValue = _filterValue.toLowerCase().trim();
        result = list.filter((_value) => {
          let ret = false;
          options.forEach(option => {
            let optionValue1 = _value[option];
            const dot = option.indexOf('.');
            if (dot >= 0) {
              const _objf: any = _value[option.slice(0, dot)];
              optionValue1 = _objf[option.slice(dot + 1, option.length)];
            }
            if (optionValue1) {
              const optionValue2 = optionValue1.toString().toLowerCase();
              ret = ret || optionValue2.indexOf(filterValue) === 0;
            }
          });

          return ret;
        });
      } else {
        result = list;
      }
    }
    return result;
  }

  static _formBuilderByGroup(_value: FormGroup, cb: ControlBuilder[]): ControlBuilder[] {
    // tslint:disable-next-line:prefer-const
    let _controlsBuilder: ControlBuilder[] = cb;
    _controlsBuilder.forEach(c => {
      c.value = _value.controls[c.name].value;
    });
    return _controlsBuilder;
  }

  static _formBuilderValidators(_fb: FormGroup, controls: ControlBuilder[]) {
    if (controls) {
      //     Object.keys(_fb.controls).forEach((k: string, v) => {
      //         if (_fb.controls.hasOwnProperty(k) && !k.startsWith('_')) {
      //             const VALIDATORS = _fb.controls[k]getValidators();
      //             const CONTROL: any = { name: k, validators: VALIDATORS };
      //             controls.push(CONTROL);
      //             return null;
      //         }
      //     });
      // }
      controls.forEach(control => {

        _fb.controls[control.name].clearValidators();
        control.validators.forEach(v => {
          if (!(_fb.controls[`${control.name}${this.HIDE_REQUIRED}`].value && v === Validators.required)) {
            _fb.controls[control.name].setValidators(v);
          }
        });
        _fb.controls[control.name].updateValueAndValidity();
      });
    }
  }

  static _formBuilderDisable(_fb: FormGroup, controls: ControlBuilder[]) {
    if (controls) {
      controls.forEach(control => {
        _fb.controls[control.name].disable();
      });
      return _fb;
    }
  }

  static _formBuilderRestart(_fb: FormGroup, controls: ControlBuilder[]) {

    if (controls) {
      controls.forEach(control => {
        _fb.controls[control.name].setValidators(control.validators);
        _fb.controls[control.name].setValue(control.value);
        _fb.controls[control.name].updateValueAndValidity();
      });
    }

  }

  static _formBuilderClear(_fb: FormGroup, controls: ControlBuilder[], excecao_controls: string[] = []) {
    if (controls) {
      const _controls = controls.filter(value => {
        let res = false;
        excecao_controls.forEach(n => {
          const res1 = value.name === n;
          res = res || res1;
        });
        return !res;
      });

      _controls.forEach(control => {
        _fb.controls[control.name].setValue('');
        _fb.controls[control.name].updateValueAndValidity();
      });
    }
  }

  static unvalidateFormControlFields(formGroup: FormGroup, control_name) {
    timer(10).subscribe(() => {
      const control = formGroup.get(control_name);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: false });
        control.setErrors(null);
      } else if (control instanceof FormGroup) {
        this.unvalidateFormControlFields(control, control_name);
      }
    });
  }

  static unvalidateAllFormFields(formGroup: FormGroup) {
    timer(10).subscribe(() => {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: false });
          control.setErrors(null);
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    });
  }

  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  static _formBuilder(controlsBuilder: ControlBuilder[]): FormGroup {

    // tslint:disable-next-line:prefer-const
    let fb: FormGroup = new FormGroup({});
    if (controlsBuilder) {
      // fb.addControl(ControlBuilder.HIDE_REQUIRED, new FormControl(false));
      // fb.addControl(ControlBuilder.PLACEHOLDER_LABEL, new FormControl('Titulo'));
      // fb.addControl(ControlBuilder.DISABLED, new FormControl(false));
      fb.addControl(ControlBuilder.FLOAT_LABEL, new FormControl('always'));

      controlsBuilder.forEach(c => {
        fb.addControl(c.name, new FormControl(c.value, c.validators));
        fb.addControl(`${c.name}${this.HIDE_REQUIRED}`, new FormControl(c.hideRequired));
        // fb.addControl(`${c.name}${this.PLACEHOLDER_LABEL}`, new FormControl(c.placeholderLabel));
        if (c.disabled) {
          fb.controls[c.name].disable();
        }
        if (c.displayed) {
          fb.addControl(`${c.name}_label`, new FormControl(c.displayed));
        }
        if (c.placeholder) {
          fb.addControl(`${c.name}_placeholder`, new FormControl(c.placeholder));
        }
      });

      ControlBuilder._formBuilderValidators(fb, controlsBuilder);

    }
    return fb;
  }

  // static _eventNumber(e) {
  //     const keyCode = (e.keyCode ? e.keyCode : e.which);
  //     if (!(keyCode > 47 && keyCode < 58)) {
  //         e.preventDefault();
  //     }
  // }
}

// export class FormGroup extends FormGroup {

//     controls: { [key: string]: AbstractControlBuilder; };

//     constructor(controls: {
//         [key: string]: AbstractControlBuilder;
//     }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
//      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
//         super(controls, validatorOrOpts, asyncValidator);
//     }

// }

// export interface AbstractControlBuilder extends AbstractControl {
//     hideRequired: boolean | null;
// }
