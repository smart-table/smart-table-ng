/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Output, EventEmitter } from '@angular/core';
import { SmartTable } from './smart-table.service';
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
export class StTableDirective {
    /**
     * @param {?} table
     */
    constructor(table) {
        this.table = table;
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
function StTableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StTableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StTableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    StTableDirective.propDecorators;
    /** @type {?} */
    StTableDirective.prototype.items;
    /** @type {?} */
    StTableDirective.prototype.busy;
    /** @type {?} */
    StTableDirective.prototype.displayHandler;
    /** @type {?} */
    StTableDirective.prototype.sortHandler;
    /** @type {?} */
    StTableDirective.prototype.filterHandler;
    /** @type {?} */
    StTableDirective.prototype.sliceHandler;
    /** @type {?} */
    StTableDirective.prototype.execHandler;
    /** @type {?} */
    StTableDirective.prototype.display;
    /** @type {?} */
    StTableDirective.prototype.sort;
    /** @type {?} */
    StTableDirective.prototype.filter;
    /** @type {?} */
    StTableDirective.prototype.slice;
    /** @type {?} */
    StTableDirective.prototype.exec;
    /** @type {?} */
    StTableDirective.prototype.table;
}
//# sourceMappingURL=st-table.directive.js.map