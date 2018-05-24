/**
 * @license smart-table-ng
 * MIT license
 */

import { Injectable, Directive, Input, HostBinding, HostListener, ElementRef, Output, EventEmitter, NgModule } from '@angular/core';
import { table, sort, filter, search, slice } from 'smart-table-core';
import { from, Observable, of, fromEvent } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TableState {
    constructor() {
        this.filter = {};
        this.search = {};
        this.slice = { page: 1, size: 20 };
        this.sort = {};
    }
}
TableState.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class SmartTable {
    /**
     * @param {?} _source
     * @param {?} tableState
     * @param {?} factory
     */
    constructor(_source, tableState, factory) {
        this._source = _source;
        const /** @type {?} */ dataArray = [];
        this._data = dataArray;
        this._directive = factory({ data: dataArray, tableState });
    }
    /**
     * @template U
     * @param {?=} data
     * @param {?=} tableState
     * @param {?=} factory
     * @return {?}
     */
    static of(data = [], tableState = new TableState(), factory = table) {
        return new SmartTable(of(data), tableState, factory);
    }
    /**
     * @template U
     * @param {?} data
     * @param {?=} tableState
     * @param {?=} factory
     * @return {?}
     */
    static from(data, tableState = new TableState(), factory = table) {
        return new SmartTable(from(data), tableState, factory);
    }
    /**
     * @return {?}
     */
    init() {
        this._directive.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
        this._subscription = this._source
            .subscribe((data) => {
            this._data.splice(0, 0, ...data);
            this._directive.exec();
        });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    use(data) {
        this._subscription.unsubscribe();
        this._source = of(data);
        this._directive.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
        this._subscription = this._source
            .subscribe((values) => {
            this._data.splice(0, 0, ...values);
            this._directive.exec();
        });
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    sort(newState) {
        return this._directive.sort(newState);
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    filter(newState) {
        return this._directive.filter(newState);
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    search(newState) {
        return this._directive.search(newState);
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    slice(newState) {
        return this._directive.slice(newState);
    }
    /**
     * @param {?} event
     * @param {...?} listeners
     * @return {?}
     */
    on(event, ...listeners) {
        this._directive.on(event, ...listeners);
        return this;
    }
    /**
     * @param {?=} event
     * @param {...?} listeners
     * @return {?}
     */
    off(event, ...listeners) {
        this._directive.off(event, ...listeners);
        return this;
    }
    /**
     * @param {?} handler
     * @return {?}
     */
    onDisplayChange(handler) {
        return this._directive.onDisplayChange(handler);
    }
    /**
     * @return {?}
     */
    getTableState() {
        return this._directive.getTableState();
    }
    /**
     * @return {?}
     */
    getMatchingItems() {
        return this._directive.getMatchingItems();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._directive.off();
    }
}
SmartTable.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SmartTable.ctorParameters = () => [
    { type: Observable, },
    { type: TableState, },
    { type: Function, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class StSortDirective {
    /**
     * @param {?} table
     * @param {?} _el
     */
    constructor(table$$1, _el) {
        this.table = table$$1;
        this._el = _el;
        this.currentSortDirection = "none" /* NONE */;
        this.cycle = false;
    }
    /**
     * @return {?}
     */
    get isAsc() {
        return this.currentSortDirection === "asc" /* ASC */;
    }
    /**
     * @return {?}
     */
    get isDesc() {
        return this.currentSortDirection === "desc" /* DESC */;
    }
    /**
     * @return {?}
     */
    toggle() {
        this._directive.toggle();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._directive = sort({
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true'
        });
        this._directive.onSortToggle(({ direction, pointer }) => {
            this.currentSortDirection = pointer === this.pointer ? /** @type {?} */ (direction) : "none" /* NONE */;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._directive.off();
    }
}
StSortDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stSort]',
                exportAs: 'stSort'
            },] }
];
/** @nocollapse */
StSortDirective.ctorParameters = () => [
    { type: SmartTable, },
    { type: ElementRef, },
];
StSortDirective.propDecorators = {
    "pointer": [{ type: Input, args: ['stSort',] },],
    "cycle": [{ type: Input, args: ['stSortCycle',] },],
    "isAsc": [{ type: HostBinding, args: ['class.st-sort-asc',] },],
    "isDesc": [{ type: HostBinding, args: ['class.st-sort-desc',] },],
    "toggle": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class StFilterDirective {
    /**
     * @param {?} table
     * @param {?} _el
     */
    constructor(table$$1, _el) {
        this.table = table$$1;
        this._el = _el;
        this.operator = "includes" /* INCLUDES */;
        this.type = "string" /* STRING */;
        this.delay = 300;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    filter(value) {
        return this._directive.filter(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._directive = filter({
            pointer: this.pointer,
            table: this.table,
            operator: this.operator,
            type: this.type
        });
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(map(($event) => (/** @type {?} */ ($event.target)).value), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(v => this.filter(v));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    }
}
StFilterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stFilter]',
                exportAs: 'stFilter'
            },] }
];
/** @nocollapse */
StFilterDirective.ctorParameters = () => [
    { type: SmartTable, },
    { type: ElementRef, },
];
StFilterDirective.propDecorators = {
    "pointer": [{ type: Input, args: ['stFilter',] },],
    "operator": [{ type: Input, args: ['stFilterOperator',] },],
    "type": [{ type: Input, args: ['stFilterType',] },],
    "delay": [{ type: Input, args: ['stDebounceTime',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class StSearchDirective {
    /**
     * @param {?} table
     * @param {?} _el
     */
    constructor(table$$1, _el) {
        this.table = table$$1;
        this._el = _el;
        this.delay = 300;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    search(value) {
        return this._directive.search(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ scope = Array.isArray(this.scope) ? this.scope : this.scope.split(',').map(p => p.trim());
        this._directive = search({ scope, table: this.table });
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(map(($event) => (/** @type {?} */ ($event.target)).value), debounceTime(this.delay), distinctUntilChanged())
            .subscribe((v) => this.search(v));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    }
}
StSearchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stSearch]',
                exportAs: 'stSearch'
            },] }
];
/** @nocollapse */
StSearchDirective.ctorParameters = () => [
    { type: SmartTable, },
    { type: ElementRef, },
];
StSearchDirective.propDecorators = {
    "scope": [{ type: Input, args: ['stSearch',] },],
    "delay": [{ type: Input, args: ['stDebounceTime',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class StPaginationDirective {
    /**
     * @param {?} table
     */
    constructor(table$$1) {
        this.table = table$$1;
        this.page = 1;
        this.size = 20;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._directive = slice({ table: this.table });
        this._directive.onSummaryChange(({ page, size, filteredCount }) => {
            this.page = page;
            this.size = size;
            this.length = filteredCount;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._directive.off();
    }
    /**
     * @return {?}
     */
    get lowerBoundIndex() {
        return (this.page - 1) * this.size;
    }
    /**
     * @return {?}
     */
    get higherBoundIndex() {
        return Math.min(this.page * this.size - 1, this.length - 1);
    }
    /**
     * @param {?} p
     * @return {?}
     */
    selectPage(p) {
        return this._directive.selectPage(+(p));
    }
    /**
     * @return {?}
     */
    selectNextPage() {
        return this._directive.selectNextPage();
    }
    /**
     * @return {?}
     */
    selectPreviousPage() {
        return this._directive.selectPreviousPage();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    changePageSize(size) {
        // Force number cast;
        return this._directive.changePageSize(+(size));
    }
    /**
     * @return {?}
     */
    isPreviousPageEnabled() {
        return this._directive.isPreviousPageEnabled();
    }
    /**
     * @return {?}
     */
    isNextPageEnabled() {
        return this._directive.isNextPageEnabled();
    }
}
StPaginationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stPagination]',
                exportAs: 'stPagination'
            },] }
];
/** @nocollapse */
StPaginationDirective.ctorParameters = () => [
    { type: SmartTable, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function handleSortChange(state) {
    this.sort.emit(state);
}
/**
 * @template T
 * @this {?}
 * @param {?} items
 * @return {?}
 */
function handleDisplayChange(items) {
    this.items = items;
    this.display.emit(items);
}
/**
 * @template T
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function handleFilterChange(state) {
    this.filter.emit(state);
}
/**
 * @template T
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function handleSliceChange(state) {
    this.slice.emit(state);
}
/**
 * @template T
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function handleExecChange(state) {
    this.exec.emit(state);
}
/**
 * @template T
 */
class StTableDirective {
    /**
     * @param {?} table
     */
    constructor(table$$1) {
        this.table = table$$1;
        this.items = [];
        this.display = new EventEmitter();
        this.sort = new EventEmitter();
        this.filter = new EventEmitter();
        this.slice = new EventEmitter();
        this.exec = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.displayHandler = handleDisplayChange.bind(this);
        this.sortHandler = handleSortChange.bind(this);
        this.filterHandler = handleFilterChange.bind(this);
        this.sliceHandler = handleSliceChange.bind(this);
        this.execHandler = handleExecChange.bind(this);
        this.table.onDisplayChange(this.displayHandler);
        this.table.on("TOGGLE_SORT" /* TOGGLE_SORT */, this.sortHandler);
        this.table.on("FILTER_CHANGED" /* FILTER_CHANGED */, this.filterHandler);
        this.table.on("CHANGE_PAGE" /* PAGE_CHANGED */, this.sliceHandler);
        this.table.on("EXEC_CHANGED" /* EXEC_CHANGED */, this.execHandler);
        this.table.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.table.off("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, this.displayHandler);
        this.table.off("TOGGLE_SORT" /* TOGGLE_SORT */, this.sortHandler);
        this.table.off("FILTER_CHANGED" /* FILTER_CHANGED */, this.filterHandler);
        this.table.off("CHANGE_PAGE" /* PAGE_CHANGED */, this.sliceHandler);
        this.table.off("EXEC_CHANGED" /* EXEC_CHANGED */, this.execHandler);
    }
}
StTableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stTable]',
                exportAs: 'stTable'
            },] }
];
/** @nocollapse */
StTableDirective.ctorParameters = () => [
    { type: SmartTable, },
];
StTableDirective.propDecorators = {
    "display": [{ type: Output },],
    "sort": [{ type: Output },],
    "filter": [{ type: Output },],
    "slice": [{ type: Output },],
    "exec": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SmartTableModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: SmartTableModule, providers: [TableState] };
    }
}
SmartTableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    StSortDirective,
                    StFilterDirective,
                    StSearchDirective,
                    StPaginationDirective,
                    StTableDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    StPaginationDirective,
                    StSortDirective,
                    StFilterDirective,
                    StSearchDirective,
                    StTableDirective
                ],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { SmartTableModule, SmartTable, StFilterDirective, StPaginationDirective, StSearchDirective, StSortDirective, StTableDirective, TableState };
//# sourceMappingURL=smart-table-ng.js.map
