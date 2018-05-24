import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { ExecState, SliceState, SortState, DisplayedItem } from './commont-types';
export declare class StTableDirective<T> implements OnInit, OnDestroy {
    private table;
    items: DisplayedItem<T>[];
    private displayHandler;
    private sortHandler;
    private filterHandler;
    private sliceHandler;
    private execHandler;
    display: EventEmitter<DisplayedItem<T>[]>;
    sort: EventEmitter<SortState>;
    filter: EventEmitter<{}>;
    slice: EventEmitter<SliceState>;
    exec: EventEmitter<ExecState>;
    constructor(table: SmartTable<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
