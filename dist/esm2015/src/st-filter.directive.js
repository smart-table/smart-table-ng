/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { filter } from 'smart-table-core';
import { fromEvent } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
/**
 * @template T
 */
export class StFilterDirective {
    /**
     * @param {?} table
     * @param {?} _el
     */
    constructor(table, _el) {
        this.table = table;
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
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
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
function StFilterDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StFilterDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StFilterDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    StFilterDirective.propDecorators;
    /** @type {?} */
    StFilterDirective.prototype._directive;
    /** @type {?} */
    StFilterDirective.prototype._inputSubscription;
    /** @type {?} */
    StFilterDirective.prototype.pointer;
    /** @type {?} */
    StFilterDirective.prototype.operator;
    /** @type {?} */
    StFilterDirective.prototype.type;
    /** @type {?} */
    StFilterDirective.prototype.delay;
    /** @type {?} */
    StFilterDirective.prototype.table;
    /** @type {?} */
    StFilterDirective.prototype._el;
}
//# sourceMappingURL=st-filter.directive.js.map