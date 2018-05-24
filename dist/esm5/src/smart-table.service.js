/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { table as stTable } from 'smart-table-core';
import { TableState } from './table-state';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs/index';
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
        if (factory === void 0) { factory = stTable; }
        return new SmartTable(of(data), tableState, factory);
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
        if (factory === void 0) { factory = stTable; }
        return new SmartTable(from(data), tableState, factory);
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
        this._source = of(data);
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SmartTable.ctorParameters = function () { return [
        { type: Observable, },
        { type: TableState, },
        { type: Function, },
    ]; };
    return SmartTable;
}());
export { SmartTable };
function SmartTable_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SmartTable.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SmartTable.ctorParameters;
    /** @type {?} */
    SmartTable.prototype._directive;
    /** @type {?} */
    SmartTable.prototype._subscription;
    /** @type {?} */
    SmartTable.prototype._data;
    /** @type {?} */
    SmartTable.prototype._source;
}
//# sourceMappingURL=smart-table.service.js.map