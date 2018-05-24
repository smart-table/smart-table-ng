/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { slice } from 'smart-table-core';
/**
 * @record
 */
function SummaryOutput() { }
function SummaryOutput_tsickle_Closure_declarations() {
    /** @type {?} */
    SummaryOutput.prototype.page;
    /** @type {?} */
    SummaryOutput.prototype.size;
    /** @type {?} */
    SummaryOutput.prototype.filteredCount;
}
/**
 * @template T
 */
export class StPaginationDirective {
    /**
     * @param {?} table
     */
    constructor(table) {
        this.table = table;
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
function StPaginationDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StPaginationDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StPaginationDirective.ctorParameters;
    /** @type {?} */
    StPaginationDirective.prototype._directive;
    /** @type {?} */
    StPaginationDirective.prototype.page;
    /** @type {?} */
    StPaginationDirective.prototype.size;
    /** @type {?} */
    StPaginationDirective.prototype.length;
    /** @type {?} */
    StPaginationDirective.prototype.table;
}
//# sourceMappingURL=st-pagination.directive.js.map