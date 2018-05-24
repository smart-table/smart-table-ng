(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('smart-table-core'), require('rxjs/index'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('smart-table-ng', ['exports', '@angular/core', 'smart-table-core', 'rxjs/index', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['smart-table-ng'] = {}),global.ng.core,global['smart-table-core'],global.rxjs.index,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,smartTableCore,index,operators,common) { 'use strict';

    /**
     * @license smart-table-ng
     * MIT license
     */

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
            { type: core.Injectable }
        ];
        return TableState;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @template T
     */
    var SmartTable = /** @class */ (function () {
        function SmartTable(_source, tableState, factory) {
            this._source = _source;
            var /** @type {?} */ dataArray = [];
            this._data = dataArray;
            this._directive = factory({ data: dataArray, tableState: tableState });
        }
        /**
         * @template U
         * @param {?=} data
         * @param {?=} tableState
         * @param {?=} factory
         * @return {?}
         */
        SmartTable.of = /**
         * @template U
         * @param {?=} data
         * @param {?=} tableState
         * @param {?=} factory
         * @return {?}
         */
        function (data, tableState, factory) {
            if (data === void 0) { data = []; }
            if (tableState === void 0) { tableState = new TableState(); }
            if (factory === void 0) { factory = smartTableCore.table; }
            return new SmartTable(index.of(data), tableState, factory);
        };
        /**
         * @template U
         * @param {?} data
         * @param {?=} tableState
         * @param {?=} factory
         * @return {?}
         */
        SmartTable.from = /**
         * @template U
         * @param {?} data
         * @param {?=} tableState
         * @param {?=} factory
         * @return {?}
         */
        function (data, tableState, factory) {
            if (tableState === void 0) { tableState = new TableState(); }
            if (factory === void 0) { factory = smartTableCore.table; }
            return new SmartTable(index.from(data), tableState, factory);
        };
        /**
         * @return {?}
         */
        SmartTable.prototype.init = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._directive.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            this._subscription = this._source
                .subscribe(function (data) {
                (_a = _this._data).splice.apply(_a, [0, 0].concat(data));
                _this._directive.exec();
                var _a;
            });
        };
        /**
         * @param {?} data
         * @return {?}
         */
        SmartTable.prototype.use = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            var _this = this;
            this._subscription.unsubscribe();
            this._source = index.of(data);
            this._directive.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            this._subscription = this._source
                .subscribe(function (values) {
                (_a = _this._data).splice.apply(_a, [0, 0].concat(values));
                _this._directive.exec();
                var _a;
            });
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        SmartTable.prototype.sort = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            return this._directive.sort(newState);
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        SmartTable.prototype.filter = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            return this._directive.filter(newState);
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        SmartTable.prototype.search = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            return this._directive.search(newState);
        };
        /**
         * @param {?} newState
         * @return {?}
         */
        SmartTable.prototype.slice = /**
         * @param {?} newState
         * @return {?}
         */
        function (newState) {
            return this._directive.slice(newState);
        };
        /**
         * @param {?} event
         * @param {...?} listeners
         * @return {?}
         */
        SmartTable.prototype.on = /**
         * @param {?} event
         * @param {...?} listeners
         * @return {?}
         */
        function (event) {
            var listeners = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                listeners[_i - 1] = arguments[_i];
            }
            (_a = this._directive).on.apply(_a, [event].concat(listeners));
            return this;
            var _a;
        };
        /**
         * @param {?=} event
         * @param {...?} listeners
         * @return {?}
         */
        SmartTable.prototype.off = /**
         * @param {?=} event
         * @param {...?} listeners
         * @return {?}
         */
        function (event) {
            var listeners = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                listeners[_i - 1] = arguments[_i];
            }
            (_a = this._directive).off.apply(_a, [event].concat(listeners));
            return this;
            var _a;
        };
        /**
         * @param {?} handler
         * @return {?}
         */
        SmartTable.prototype.onDisplayChange = /**
         * @param {?} handler
         * @return {?}
         */
        function (handler) {
            return this._directive.onDisplayChange(handler);
        };
        /**
         * @return {?}
         */
        SmartTable.prototype.getTableState = /**
         * @return {?}
         */
        function () {
            return this._directive.getTableState();
        };
        /**
         * @return {?}
         */
        SmartTable.prototype.getMatchingItems = /**
         * @return {?}
         */
        function () {
            return this._directive.getMatchingItems();
        };
        /**
         * @return {?}
         */
        SmartTable.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._subscription.unsubscribe();
            this._directive.off();
        };
        SmartTable.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SmartTable.ctorParameters = function () { return [
            { type: index.Observable, },
            { type: TableState, },
            { type: Function, },
        ]; };
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
            this._directive = smartTableCore.sort({
                table: this.table, pointer: this.pointer, cycle: this.cycle === true || this.cycle === 'true'
            });
            this._directive.onSortToggle(function (_a) {
                var direction = _a.direction, pointer = _a.pointer;
                _this.currentSortDirection = pointer === _this.pointer ? /** @type {?} */ (direction) : "none" /* NONE */;
            });
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
            { type: core.Directive, args: [{
                        selector: '[stSort]',
                        exportAs: 'stSort'
                    },] }
        ];
        /** @nocollapse */
        StSortDirective.ctorParameters = function () { return [
            { type: SmartTable, },
            { type: core.ElementRef, },
        ]; };
        StSortDirective.propDecorators = {
            "pointer": [{ type: core.Input, args: ['stSort',] },],
            "cycle": [{ type: core.Input, args: ['stSortCycle',] },],
            "isAsc": [{ type: core.HostBinding, args: ['class.st-sort-asc',] },],
            "isDesc": [{ type: core.HostBinding, args: ['class.st-sort-desc',] },],
            "toggle": [{ type: core.HostListener, args: ['click',] },],
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
            this._directive = smartTableCore.filter({
                pointer: this.pointer,
                table: this.table,
                operator: this.operator,
                type: this.type
            });
            this._inputSubscription = index.fromEvent(this._el.nativeElement, 'input')
                .pipe(operators.map(function ($event) { return (/** @type {?} */ ($event.target)).value; }), operators.debounceTime(this.delay), operators.distinctUntilChanged())
                .subscribe(function (v) { return _this.filter(v); });
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
            { type: core.Directive, args: [{
                        selector: '[stFilter]',
                        exportAs: 'stFilter'
                    },] }
        ];
        /** @nocollapse */
        StFilterDirective.ctorParameters = function () { return [
            { type: SmartTable, },
            { type: core.ElementRef, },
        ]; };
        StFilterDirective.propDecorators = {
            "pointer": [{ type: core.Input, args: ['stFilter',] },],
            "operator": [{ type: core.Input, args: ['stFilterOperator',] },],
            "type": [{ type: core.Input, args: ['stFilterType',] },],
            "delay": [{ type: core.Input, args: ['stDebounceTime',] },],
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
            return this._directive.search(value);
        };
        /**
         * @return {?}
         */
        StSearchDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            var /** @type {?} */ scope = Array.isArray(this.scope) ? this.scope : this.scope.split(',').map(function (p) { return p.trim(); });
            this._directive = smartTableCore.search({ scope: scope, table: this.table });
            this._inputSubscription = index.fromEvent(this._el.nativeElement, 'input')
                .pipe(operators.map(function ($event) { return (/** @type {?} */ ($event.target)).value; }), operators.debounceTime(this.delay), operators.distinctUntilChanged())
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
            { type: core.Directive, args: [{
                        selector: '[stSearch]',
                        exportAs: 'stSearch'
                    },] }
        ];
        /** @nocollapse */
        StSearchDirective.ctorParameters = function () { return [
            { type: SmartTable, },
            { type: core.ElementRef, },
        ]; };
        StSearchDirective.propDecorators = {
            "scope": [{ type: core.Input, args: ['stSearch',] },],
            "delay": [{ type: core.Input, args: ['stDebounceTime',] },],
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
            this._directive = smartTableCore.slice({ table: this.table });
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
            { type: core.Directive, args: [{
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
        this.exec.emit(state);
    }
    /**
     * @template T
     */
    var StTableDirective = /** @class */ (function () {
        function StTableDirective(table$$1) {
            this.table = table$$1;
            this.items = [];
            this.display = new core.EventEmitter();
            this.sort = new core.EventEmitter();
            this.filter = new core.EventEmitter();
            this.slice = new core.EventEmitter();
            this.exec = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[stTable]',
                        exportAs: 'stTable'
                    },] }
        ];
        /** @nocollapse */
        StTableDirective.ctorParameters = function () { return [
            { type: SmartTable, },
        ]; };
        StTableDirective.propDecorators = {
            "display": [{ type: core.Output },],
            "sort": [{ type: core.Output },],
            "filter": [{ type: core.Output },],
            "slice": [{ type: core.Output },],
            "exec": [{ type: core.Output },],
        };
        return StTableDirective;
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
            { type: core.NgModule, args: [{
                        declarations: [
                            StSortDirective,
                            StFilterDirective,
                            StSearchDirective,
                            StPaginationDirective,
                            StTableDirective
                        ],
                        imports: [
                            common.CommonModule
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

    exports.SmartTableModule = SmartTableModule;
    exports.SmartTable = SmartTable;
    exports.StFilterDirective = StFilterDirective;
    exports.StPaginationDirective = StPaginationDirective;
    exports.StSearchDirective = StSearchDirective;
    exports.StSortDirective = StSortDirective;
    exports.StTableDirective = StTableDirective;
    exports.TableState = TableState;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=smart-table-ng.umd.js.map
