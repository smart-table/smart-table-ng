/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StSortDirective } from './st-sort.directive';
import { StFilterDirective } from './st-filter.directive';
import { StSearchDirective } from './st-search.directive';
import { StPaginationDirective } from './st-pagination.directive';
import { StTableDirective } from './st-table.directive';
import { TableState } from './table-state';
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
        { type: NgModule, args: [{
                    declarations: [
                        StSortDirective,
                        StFilterDirective,
                        StSearchDirective,
                        StPaginationDirective,
                        StTableDirective
                    ],
                    imports: [
                        CommonModule
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
export { SmartTableModule };
function SmartTableModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SmartTableModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SmartTableModule.ctorParameters;
}
//# sourceMappingURL=smart-table.module.js.map