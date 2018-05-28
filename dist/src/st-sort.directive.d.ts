import { OnInit, OnDestroy } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { SortDirection } from './common-types';
export declare class StSortDirective<T> implements OnInit, OnDestroy {
    private table;
    private _directive;
    currentSortDirection: SortDirection;
    constructor(table: SmartTable<T>);
    pointer: string;
    cycle: boolean | string;
    readonly isAsc: boolean;
    readonly isDesc: boolean;
    toggle(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
