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
export class SmartTable {
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
    static of(data = [], tableState = new TableState(), factory = stTable) {
        return new SmartTable(of(data), tableState, factory);
    }
    /**
     * @template U
     * @param {?} data
     * @param {?=} tableState
     * @param {?=} factory
     * @return {?}
     */
    static from(data, tableState = new TableState(), factory = stTable) {
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