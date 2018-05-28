/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, HostBinding, HostListener } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { sort } from 'smart-table-core';
/**
 * @template T
 */
export class StSortDirective {
    /**
     * @param {?} table
     */
    constructor(table) {
        this.table = table;
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
];
StSortDirective.propDecorators = {
    "pointer": [{ type: Input, args: ['stSort',] },],
    "cycle": [{ type: Input, args: ['stSortCycle',] },],
    "isAsc": [{ type: HostBinding, args: ['class.st-sort-asc',] },],
    "isDesc": [{ type: HostBinding, args: ['class.st-sort-desc',] },],
    "toggle": [{ type: HostListener, args: ['click',] },],
};
function StSortDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StSortDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StSortDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    StSortDirective.propDecorators;
    /** @type {?} */
    StSortDirective.prototype._directive;
    /** @type {?} */
    StSortDirective.prototype.currentSortDirection;
    /** @type {?} */
    StSortDirective.prototype.pointer;
    /** @type {?} */
    StSortDirective.prototype.cycle;
    /** @type {?} */
    StSortDirective.prototype.table;
}
//# sourceMappingURL=st-sort.directive.js.map