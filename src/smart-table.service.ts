import {Injectable, OnDestroy} from '@angular/core';
import {
    SmartTable as ISmartTable, DisplayedItem, ProcessingOptions, FilterConfiguration, DisplayChangeCallback,
    SearchConfiguration,
    SliceConfiguration,
    SortConfiguration,
    TableState
} from 'smart-table-core';

@Injectable()
export abstract class SmartTable<T> implements ISmartTable<T>, OnDestroy {
    dispatch: (event: string, ...args: any[]) => ISmartTable<T>;
    eval: (state?: TableState) => Promise<DisplayedItem<T>[]>;
    exec: (processInput?: ProcessingOptions) => void;
    filter: (filterClause: FilterConfiguration) => void;
    getMatchingItems: () => T[];
    getTableState: () => TableState;
    init: () => void;
    off: (event: string, ...listeners: Function[]) => ISmartTable<T>;
    on: (event: string, ...listeners: Function[]) => ISmartTable<T>;
    onDisplayChange: (callback: DisplayChangeCallback<T>) => void;
    search: (searchState: SearchConfiguration) => void;
    slice: (sliceState: SliceConfiguration) => void;
    sort: (sortState: SortConfiguration) => void;
    use: (data: T[], newTableState ?: TableState) => void;
    ngOnDestroy: () => void;
    filteredCount: number;
    length: number;
}
