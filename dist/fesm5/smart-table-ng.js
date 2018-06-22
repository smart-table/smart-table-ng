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
var SmartTable = /** @class */ (function () {
    function SmartTable() {
    }
    SmartTable.decorators = [
        { type: Injectable }
    ];
    return SmartTable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var StSortDirective = /** @class */ (function () {
    function StSortDirective(table$$1, _el) {
        this.table = table$$1;
        this._el = _el;
        this.currentSortDirection = "none" /* NONE */;
        this.delay = 0;
        this.cycle = false;
    }
    Object.defineProperty(StSortDirective.prototype, "isAsc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentSortDirection === "asc" /* ASC */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StSortDirective.prototype, "isDesc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentSortDirection === "desc" /* DESC */;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StSortDirective.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this._directive.toggle();
    };
    /**
     * @return {?}
     */
    StSortDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._directive = sort({
            table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true',
            debounceTime: this.delay
        });
        this._directive.onSortToggle(function (_a) {
            var direction = _a.direction, pointer = _a.pointer;
            _this.currentSortDirection = pointer === _this.pointer ? /** @type {?} */ (direction) : "none" /* NONE */;
        });
        var /** @type {?} */ initState = this._directive.state();
        this.currentSortDirection = initState.pointer === this.pointer ? (initState.direction || "asc" /* ASC */) : "none" /* NONE */;
    };
    /**
     * @return {?}
     */
    StSortDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._directive.off();
    };
    StSortDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stSort]',
                    exportAs: 'stSort'
                },] }
    ];
    /** @nocollapse */
    StSortDirective.ctorParameters = function () { return [
        { type: SmartTable, },
        { type: ElementRef, },
    ]; };
    StSortDirective.propDecorators = {
        "delay": [{ type: Input, args: ['stDebounceTime',] },],
        "pointer": [{ type: Input, args: ['stSort',] },],
        "cycle": [{ type: Input, args: ['stSortCycle',] },],
        "isAsc": [{ type: HostBinding, args: ['class.st-sort-asc',] },],
        "isDesc": [{ type: HostBinding, args: ['class.st-sort-desc',] },],
        "toggle": [{ type: HostListener, args: ['click',] },],
    };
    return StSortDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var StFilterDirective = /** @class */ (function () {
    function StFilterDirective(table$$1, _el) {
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
    StFilterDirective.prototype.filter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._directive.filter(value);
    };
    /**
     * @return {?}
     */
    StFilterDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._directive = filter({
            pointer: this.pointer,
            table: this.table,
            operator: this.operator,
            type: this.type
        });
        // fix for Edge https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
        var /** @type {?} */ event = this._el.nativeElement.tagName === 'SELECT' ? 'change' : 'input';
        this._inputSubscription = fromEvent(this._el.nativeElement, event)
            .pipe(map(function ($event) { return (/** @type {?} */ ($event.target)).value; }), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(function (v) { return _this.filter(v); });
        var /** @type {?} */ state = this._directive.state();
        if (Array.isArray(state[this.pointer])) {
            this._el.nativeElement.value = state[this.pointer][0].value;
        }
    };
    /**
     * @return {?}
     */
    StFilterDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    };
    StFilterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stFilter]',
                    exportAs: 'stFilter'
                },] }
    ];
    /** @nocollapse */
    StFilterDirective.ctorParameters = function () { return [
        { type: SmartTable, },
        { type: ElementRef, },
    ]; };
    StFilterDirective.propDecorators = {
        "pointer": [{ type: Input, args: ['stFilter',] },],
        "operator": [{ type: Input, args: ['stFilterOperator',] },],
        "type": [{ type: Input, args: ['stFilterType',] },],
        "delay": [{ type: Input, args: ['stDebounceTime',] },],
    };
    return StFilterDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var StSearchDirective = /** @class */ (function () {
    function StSearchDirective(table$$1, _el) {
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
    StSearchDirective.prototype.search = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._directive.search(value, {
            flags: this.flags,
            escape: this.escape === 'true' || this.escape === true
        });
    };
    /**
     * @return {?}
     */
    StSearchDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ scope = Array.isArray(this.scope) ? this.scope :
            this.scope.split(',').map(function (p) { return p.trim(); });
        this._directive = search({ scope: scope, table: this.table });
        var value = this._directive.state().value;
        this._el.nativeElement.value = value || '';
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(map(function ($event) { return (/** @type {?} */ ($event.target)).value; }), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(function (v) { return _this.search(v); });
    };
    /**
     * @return {?}
     */
    StSearchDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    };
    StSearchDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stSearch]',
                    exportAs: 'stSearch'
                },] }
    ];
    /** @nocollapse */
    StSearchDirective.ctorParameters = function () { return [
        { type: SmartTable, },
        { type: ElementRef, },
    ]; };
    StSearchDirective.propDecorators = {
        "scope": [{ type: Input, args: ['stSearch',] },],
        "delay": [{ type: Input, args: ['stDebounceTime',] },],
        "flags": [{ type: Input, args: ['stSearchFlags',] },],
        "escape": [{ type: Input, args: ['stSearchEscape',] },],
    };
    return StSearchDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
var StPaginationDirective = /** @class */ (function () {
    function StPaginationDirective(table$$1) {
        this.table = table$$1;
        this.page = 1;
        this.size = 20;
    }
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._directive = slice({ table: this.table });
        this._directive.onSummaryChange(function (_a) {
            var page = _a.page, size = _a.size, filteredCount = _a.filteredCount;
            _this.page = page;
            _this.size = size;
            _this.length = filteredCount;
        });
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._directive.off();
    };
    Object.defineProperty(StPaginationDirective.prototype, "lowerBoundIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.page - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StPaginationDirective.prototype, "higherBoundIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.min(this.page * this.size - 1, this.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} p
     * @return {?}
     */
    StPaginationDirective.prototype.selectPage = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        return this._directive.selectPage(+(p));
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.selectNextPage = /**
     * @return {?}
     */
    function () {
        return this._directive.selectNextPage();
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.selectPreviousPage = /**
     * @return {?}
     */
    function () {
        return this._directive.selectPreviousPage();
    };
    /**
     * @param {?} size
     * @return {?}
     */
    StPaginationDirective.prototype.changePageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        // Force number cast;
        return this._directive.changePageSize(+(size));
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.isPreviousPageEnabled = /**
     * @return {?}
     */
    function () {
        return this._directive.isPreviousPageEnabled();
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.isNextPageEnabled = /**
     * @return {?}
     */
    function () {
        return this._directive.isNextPageEnabled();
    };
    StPaginationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stPagination]',
                    exportAs: 'stPagination'
                },] }
    ];
    /** @nocollapse */
    StPaginationDirective.ctorParameters = function () { return [
        { type: SmartTable, },
    ]; };
    return StPaginationDirective;
}());

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
var StTableDirective = /** @class */ (function () {
    function StTableDirective(table$$1) {
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
    StTableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    StTableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.table.off("DISPLAY_CHANGED" /* DISPLAY_CHANGED */, this.displayHandler);
        this.table.off("TOGGLE_SORT" /* TOGGLE_SORT */, this.sortHandler);
        this.table.off("FILTER_CHANGED" /* FILTER_CHANGED */, this.filterHandler);
        this.table.off("CHANGE_PAGE" /* PAGE_CHANGED */, this.sliceHandler);
        this.table.off("EXEC_CHANGED" /* EXEC_CHANGED */, this.execHandler);
    };
    StTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stTable]',
                    exportAs: 'stTable'
                },] }
    ];
    /** @nocollapse */
    StTableDirective.ctorParameters = function () { return [
        { type: SmartTable, },
    ]; };
    StTableDirective.propDecorators = {
        "display": [{ type: Output },],
        "sort": [{ type: Output },],
        "filter": [{ type: Output },],
        "slice": [{ type: Output },],
        "exec": [{ type: Output },],
    };
    return StTableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TableState = /** @class */ (function () {
    function TableState() {
        this.filter = {};
        this.search = {};
        this.slice = { page: 1, size: 20 };
        this.sort = {};
    }
    TableState.decorators = [
        { type: Injectable }
    ];
    return TableState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SmartTableModule = /** @class */ (function () {
    function SmartTableModule() {
    }
    /**
     * @return {?}
     */
    SmartTableModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: SmartTableModule, providers: [TableState] };
    };
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
    return SmartTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ from$1 = function (data, tableState) {
    if (tableState === void 0) { tableState = new TableState(); }
    var extensions = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extensions[_i - 2] = arguments[_i];
    }
    var /** @type {?} */ dataArray = [];
    var /** @type {?} */ table$$1 = table.apply(void 0, [{ data: dataArray, tableState: tableState }].concat(extensions));
    var /** @type {?} */ source = from(data);
    var /** @type {?} */ subscription;
    return Object.assign(table$$1, {
        init: /**
         * @return {?}
         */
        function () {
            if (subscription) {
                subscription.unsubscribe();
            }
            table$$1.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe(function (items) {
                dataArray.splice.apply(dataArray, [0, dataArray.length].concat(items));
                table$$1.exec();
            });
        },
        use: /**
         * @param {?} newData
         * @return {?}
         */
        function (newData) {
            subscription.unsubscribe();
            source = of(newData);
            table$$1.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe(function (values) {
                dataArray.splice.apply(dataArray, [0, dataArray.length].concat(values));
                table$$1.exec();
            });
        },
        ngOnDestroy: /**
         * @return {?}
         */
        function () {
            subscription.unsubscribe();
        }
    });
};
var /** @type {?} */ of$1 = function (data, tableState) {
    if (tableState === void 0) { tableState = new TableState(); }
    var extensions = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extensions[_i - 2] = arguments[_i];
    }
    return from$1.apply(void 0, [of(data), tableState].concat(extensions));
};

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
