import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function ValidarModeloValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { 'validarModelo': { value: control.value } } : null;
    };
}

@Directive({
    selector: '[validarModelo]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ValidarModeloValidatorDirective, multi: true }]
})
export class ValidarModeloValidatorDirective implements Validator {
    @Input() validarModelo: string;

    validate(control: AbstractControl): { [key: string]: any } {
        return this.validarModelo ? ValidarModeloValidator(new RegExp(this.validarModelo, 'i'))(control)
            : null;
    }
}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/