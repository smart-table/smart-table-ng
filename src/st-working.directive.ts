import {Directive, HostBinding, OnInit, OnDestroy} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {workingIndicator} from 'smart-table-core';

@Directive({
    selector: '[stWorking]',
    exportAs: 'stWorking'
})
export class StWorkingDirective<T> implements OnInit, OnDestroy {
    private _directive;

    @HostBinding('class.st-working') isWorking = false;

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this._directive = workingIndicator({table: this.table});
        this._directive.onExecutionChange(({working}) => {
            this.isWorking = working;
        });
    }

    ngOnDestroy() {
        this._directive.off();
    }
}
