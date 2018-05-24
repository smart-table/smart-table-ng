/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class TableState {
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
function TableState_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TableState.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TableState.ctorParameters;
    /** @type {?} */
    TableState.prototype.filter;
    /** @type {?} */
    TableState.prototype.search;
    /** @type {?} */
    TableState.prototype.slice;
    /** @type {?} */
    TableState.prototype.sort;
}
//# sourceMappingURL=table-state.js.map