import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SmartTable } from './smart-table.service';
export declare class StSearchDirective<T> implements OnInit, OnDestroy {
    private table;
    private _el;
    private _directive;
    private _inputSubscription;
    constructor(table: SmartTable<T>, _el: ElementRef);
    scope: string | string[];
    delay: number;
    search(value: string): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
