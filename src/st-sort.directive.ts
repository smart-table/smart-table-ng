import {Directive, Input, HostBinding, HostListener, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {sort} from 'smart-table-core';
import {SortDirection, SortState} from './common-types';
import {Subscription} from 'rxjs/index';

@Directive({
    selector: '[stSort]',
    exportAs: 'stSort'
})
export class StSortDirective<T> implements OnInit, OnDestroy {
    private _directive: any;
    private _clickSubscription: Subscription;

    currentSortDirection: SortDirection = SortDirection.NONE;

    constructor(private table: SmartTable<T>) {
    }

    @Input('stSort') pointer: string;

    @Input('stSortCycle') cycle: boolean | string = false;

    @HostBinding('class.st-sort-asc') get isAsc() {
        return this.currentSortDirection === SortDirection.ASC;
    }

    @HostBinding('class.st-sort-desc') get isDesc() {
        return this.currentSortDirection === SortDirection.DESC;
    }

    @HostListener('click') toggle(): void {
        this._directive.toggle();
    }

    ngOnInit() {
        this._directive = sort({
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true'
        });
        this._directive.onSortToggle(({direction, pointer}: SortState) => {
            this.currentSortDirection = pointer === this.pointer ? <SortDirection>direction : SortDirection.NONE;
        });
    }

    ngOnDestroy() {
        this._directive.off();
    }
}
