import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { FilterOperator, FilterType } from './commont-types';
export declare class StFilterDirective<T> implements OnInit, OnDestroy {
    private table;
    private _el;
    private _directive;
    private _inputSubscription;
    constructor(table: SmartTable<T>, _el: ElementRef);
    pointer: string;
    operator: FilterOperator;
    type: FilterType;
    delay: number;
    filter(value: string): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
