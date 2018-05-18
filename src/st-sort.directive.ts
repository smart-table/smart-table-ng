import {Directive, Input, HostBinding, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {sort} from 'smart-table-core';
import {SortDirection, SortDirective} from './types';
import {Subscription, fromEvent} from 'rxjs/index';
import {debounceTime} from 'rxjs/operators';

@Directive({
    selector: '[stSort]',
    exportAs: 'stSort'
})
export class StSortDirective<T> implements OnInit, OnDestroy {
    private _directive: SortDirective;
    private _clickSubscription: Subscription;

    currentSortDirection: SortDirection = SortDirection.NONE;

    constructor(private table: SmartTable<T>, private _el: ElementRef) {
    }

    @Input('stSort') pointer: string;

    @Input('stSortCycle') cycle: boolean | string = false;

    @Input('stDebounceTime') delay = 100;

    @HostBinding('class.st-sort-asc') get isAsc() {
        return this.currentSortDirection === SortDirection.ASC;
    }

    @HostBinding('class.st-sort-desc') get isDesc() {
        return this.currentSortDirection === SortDirection.DESC;
    }

    toggle(): void {
        return this._directive.toggle();
    }

    ngOnInit() {
        this._directive = sort({
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true'
        });
        this._directive.onSortToggle(({direction, pointer}) => {
            this.currentSortDirection = pointer === this.pointer ? <SortDirection>direction : SortDirection.NONE;
        });
        this._clickSubscription = fromEvent(this._el.nativeElement, 'click')
            .pipe(debounceTime(this.delay))
            .subscribe(() => this.toggle());
    }

    ngOnDestroy() {
        this._directive.off();
        this._clickSubscription.unsubscribe();
    }
}
