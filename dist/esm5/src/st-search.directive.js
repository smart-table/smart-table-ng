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
var StSearchDirective = /** @class */ (function () {
    function StSearchDirective(table, _el) {
        this.table = table;
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
    };
    return StSearchDirective;
}());
export { StSearchDirective };
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