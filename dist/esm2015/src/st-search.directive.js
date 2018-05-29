/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { search } from 'smart-table-core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs/index';
/**
 * @template T
 */
export class StSearchDirective {
    /**
     * @param {?} table
     * @param {?} _el
     */
    constructor(table, _el) {
        this.table = table;
        this._el = _el;
        this.delay = 300;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    search(value) {
        return this._directive.search(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ scope = Array.isArray(this.scope) ? this.scope :
            this.scope.split(',').map(p => p.trim());
        this._directive = search({ scope, table: this.table });
        const { value } = this._directive.state();
        this._el.nativeElement.value = value || '';
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(map(($event) => (/** @type {?} */ ($event.target)).value), debounceTime(this.delay), distinctUntilChanged())
            .subscribe(v => this.search(v));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    }
}
StSearchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[stSearch]',
                exportAs: 'stSearch'
            },] }
];
/** @nocollapse */
StSearchDirective.ctorParameters = () => [
    { type: SmartTable, },
    { type: ElementRef, },
];
StSearchDirective.propDecorators = {
    "scope": [{ type: Input, args: ['stSearch',] },],
    "delay": [{ type: Input, args: ['stDebounceTime',] },],
};
function StSearchDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StSearchDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StSearchDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    StSearchDirective.propDecorators;
    /** @type {?} */
    StSearchDirective.prototype._directive;
    /** @type {?} */
    StSearchDirective.prototype._inputSubscription;
    /** @type {?} */
    StSearchDirective.prototype.scope;
    /** @type {?} */
    StSearchDirective.prototype.delay;
    /** @type {?} */
    StSearchDirective.prototype.table;
    /** @type {?} */
    StSearchDirective.prototype._el;
}
//# sourceMappingURL=st-search.directive.js.map