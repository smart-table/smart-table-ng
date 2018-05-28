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
var StSortDirective = /** @class */ (function () {
    function StSortDirective(table) {
        this.table = table;
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
        this._directive = sort({
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
        { type: Directive, args: [{
                    selector: '[stSort]',
                    exportAs: 'stSort'
                },] }
    ];
    /** @nocollapse */
    StSortDirective.ctorParameters = function () { return [
        { type: SmartTable, },
    ]; };
    StSortDirective.propDecorators = {
        "pointer": [{ type: Input, args: ['stSort',] },],
        "cycle": [{ type: Input, args: ['stSortCycle',] },],
        "isAsc": [{ type: HostBinding, args: ['class.st-sort-asc',] },],
        "isDesc": [{ type: HostBinding, args: ['class.st-sort-desc',] },],
        "toggle": [{ type: HostListener, args: ['click',] },],
    };
    return StSortDirective;
}());
export { StSortDirective };
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