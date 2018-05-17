import {Directive, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {SmartTable} from './smart-table.service';

@Directive({
    selector: '[stTable]',
    exportAs: 'stTable'
})
export class StTableDirective<T> implements AfterContentInit, OnInit, OnDestroy {
    items: T[];

    private handleChange = function (items: T[]) {
        this.items = items;
    };

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this.table.onDisplayChange(this.handleChange.bind(this));
    }

    ngAfterContentInit() {
        this.table.init();
    }

    ngOnDestroy() {
        this.table.off('DISPLAY_CHANGED', this.handleChange);
    }
}
