import {Directive, Input, HostBinding, HostListener, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {sortDirective as sort, SortDirection, SortConfiguration} from 'smart-table-core';


@Directive({
    selector: '[stSort]',
    exportAs: 'stSort'
})
export class StSortDirective<T> implements OnInit, OnDestroy {
    private _directive: any;

    currentSortDirection: SortDirection = SortDirection.NONE;

    constructor(private table: SmartTable<T>, private _el: ElementRef) {
    }

    @Input('stDebounceTime') delay = 0;

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
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true',
            debounceTime: this.delay
        });
        this._directive.onSortToggle(({direction, pointer}: SortConfiguration) => {
            this.currentSortDirection = pointer === this.pointer ? <SortDirection>direction : SortDirection.NONE;
        });
        const initState = this._directive.state();
        this.currentSortDirection = initState.pointer === this.pointer ? (initState.direction || SortDirection.ASC) : SortDirection.NONE;
    }

    ngOnDestroy() {
        this._directive.off();
    }
}
