import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
@Directive({
    selector: '[ngInit]'
})
export class NgInit {
    @Input() values: any = {};

    @Input() ngInit;
    ngOnInit() {
        if (this.ngInit) { this.ngInit(); }
    }
}