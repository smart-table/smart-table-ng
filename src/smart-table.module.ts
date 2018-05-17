import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StSortDirective} from './st-sort.directive';
import {StFilterDirective} from './st-filter.directive';
import {StSearchDirective} from './st-search.directive';
import {StWorkingDirective} from './st-working.directive';
import {StPaginationDirective} from './st-pagination.directive';
import {StTableDirective} from './st-table.directive';
import {TableState} from './table-state';

@NgModule({
    declarations: [
        StSortDirective,
        StFilterDirective,
        StSearchDirective,
        StWorkingDirective,
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
        StWorkingDirective,
        StTableDirective
    ],
    providers: []
})
export class SmartTableModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: SmartTableModule, providers: [TableState]};
    }
}
