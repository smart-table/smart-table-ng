import { OnInit, OnDestroy } from '@angular/core';
import { SmartTable } from './smart-table.service';
export declare class StPaginationDirective<T> implements OnInit, OnDestroy {
    private table;
    private _directive;
    page: number;
    size: number;
    length: number;
    constructor(table: SmartTable<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly lowerBoundIndex: number;
    readonly higherBoundIndex: number;
    selectPage(p: number): void;
    selectNextPage(): void;
    selectPreviousPage(): void;
    changePageSize(size: number): void;
    isPreviousPageEnabled(): boolean;
    isNextPageEnabled(): boolean;
}
