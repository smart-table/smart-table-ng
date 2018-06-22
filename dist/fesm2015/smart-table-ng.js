/**
 * @license smart-table-ng
 * MIT license
 */

import { Injectable, Directive, Input, HostBinding, HostListener, ElementRef, Output, EventEmitter, NgModule } from '@angular/core';
import { sort, filter, search, slice, table } from 'smart-table-core';
import { fromEvent, of, from } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class SmartTable {
}
SmartTable.decorators = [
    { type: Injectable }
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
        this.delay = 0;
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
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true',
            debounceTime: this.delay
        });
        this._directive.onSortToggle(({ direction, pointer }) => {
            this.currentSortDirection = pointer === this.pointer ? /** @type {?} */ (direction) : "none" /* NONE */;
        });
        const /** @type {?} */ initState = this._directive.state();
        this.currentSortDirection = initState.pointer === this.pointer ? (initState.direction || "asc" /* ASC */) : "none" /* NONE */;
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
    "delay": [{ type: Input, args: ['stDebounceTime',] },],
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
        // fix for Edge https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
        const /** @type {?} */ event = this._el.nativeElement.tagName === 'SELECT' ? 'change' : 'input';
        this._inputSubscription = fromEvent(this._el.nativeElement, event)
            .pipe(map(($event) => (/** @type {?} */ ($event.target)).value), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(v => this.filter(v));
        const /** @type {?} */ state = this._directive.state();
        if (Array.isArray(state[this.pointer])) {
            this._el.nativeElement.value = state[this.pointer][0].value;
        }
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
        this.flags = 'i';
        this.escape = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    search(value) {
        return this._directive.search(value, {
            flags: this.flags,
            escape: this.escape === 'true' || this.escape === true
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ scope = Array.isArray(this.scope) ? this.scope :
            this.scope.split(',').map(p => p.trim());
        this._directive = search({ scope, table: this.table });
        const { value } = this._directive.state();
        this._el.nativeElement.value = value || '';
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(map(($event) => (/** @type {?} */ ($event.target)).value), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(v => this.search(v));
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
    "flags": [{ type: Input, args: ['stSearchFlags',] },],
    "escape": [{ type: Input, args: ['stSearchEscape',] },],
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
    this.busy = state.working;
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
        this.busy = false;
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
const /** @type {?} */ from$1 = (data, tableState = new TableState(), ...extensions) => {
    const /** @type {?} */ dataArray = [];
    const /** @type {?} */ table$$1 = table({ data: dataArray, tableState }, ...extensions);
    let /** @type {?} */ source = from(data);
    let /** @type {?} */ subscription;
    return Object.assign(table$$1, {
        /**
         * @return {?}
         */
        init() {
            if (subscription) {
                subscription.unsubscribe();
            }
            table$$1.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((items) => {
                dataArray.splice(0, dataArray.length, ...items);
                table$$1.exec();
            });
        },
        /**
         * @param {?} newData
         * @return {?}
         */
        use(newData) {
            subscription.unsubscribe();
            source = of(newData);
            table$$1.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((values) => {
                dataArray.splice(0, dataArray.length, ...values);
                table$$1.exec();
            });
        },
        /**
         * @return {?}
         */
        ngOnDestroy() {
            subscription.unsubscribe();
        }
    });
};
const /** @type {?} */ of$1 = (data, tableState = new TableState(), ...extensions) => from$1(of(data), tableState, ...extensions);

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

export { SmartTableModule, SmartTable, StFilterDirective, StPaginationDirective, StSearchDirective, StSortDirective, StTableDirective, TableState, from$1 as from, of$1 as of };
//# sourceMappingURL=smart-table-ng.js.map
