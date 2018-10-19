import {Directive, OnInit, OnDestroy} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {paginationDirective as slice} from 'smart-table-core';

interface SummaryOutput {
    page: number;
    size: number;
    filteredCount: number;
}

@Directive({
    selector: '[stPagination]',
    exportAs: 'stPagination'
})
export class StPaginationDirective<T> implements OnInit, OnDestroy {
    private _directive: any;

    page = 1;
    size = 20;
    length: number;

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this._directive = slice({table: this.table});
        this._directive.onSummaryChange(({page, size, filteredCount}: SummaryOutput) => {
            this.page = page;
            this.size = size;
            this.length = filteredCount;
        });
    }

    ngOnDestroy() {
        this._directive.off();
    }

    get lowerBoundIndex(): number {
        return (this.page - 1) * this.size;
    }

    get higherBoundIndex(): number {
        return Math.min(this.page * this.size - 1, this.length - 1);
    }

    selectPage(p: number): void {
        return this._directive.selectPage(+(p));
    }

    selectNextPage(): void {
        return this._directive.selectNextPage();
    }

    selectPreviousPage(): void {
        return this._directive.selectPreviousPage();
    }

    changePageSize(size: number): void {
        // Force number cast;
        return this._directive.changePageSize(+(size));
    }

    isPreviousPageEnabled(): boolean {
        return this._directive.isPreviousPageEnabled();
    }

    isNextPageEnabled(): boolean {
        return this._directive.isNextPageEnabled();
    }
}
