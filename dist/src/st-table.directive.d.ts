import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { SortConfiguration, DisplayedItem, FilterConfiguration, SliceConfiguration, WorkingIndicator } from 'smart-table-core';
export declare class StTableDirective<T> implements OnInit, OnDestroy {
    private table;
    items: DisplayedItem<T>[];
    busy: boolean;
    private displayHandler;
    private sortHandler;
    private filterHandler;
    private sliceHandler;
    private execHandler;
    display: EventEmitter<DisplayedItem<T>[]>;
    sort: EventEmitter<SortConfiguration>;
    filter: EventEmitter<FilterConfiguration>;
    slice: EventEmitter<SliceConfiguration>;
    exec: EventEmitter<WorkingIndicator>;
    constructor(table: SmartTable<T>);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
