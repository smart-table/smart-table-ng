import { SearchState, SliceState, SortState } from './commont-types';
import { TableState } from './table-state';
import { ObservableInput } from 'rxjs/index';
import { OnDestroy } from '@angular/core';
export declare class SmartTable<T> implements OnDestroy {
    private _source;
    private _directive;
    private _subscription;
    private _data;
    static of<U>(data?: U[], tableState?: TableState, factory?: any): SmartTable<U>;
    static from<U>(data: ObservableInput<U[]>, tableState?: TableState, factory?: any): SmartTable<U>;
    private constructor();
    init(): void;
    use(data: T[]): void;
    sort(newState: SortState): void;
    filter(newState: Object): void;
    search(newState: SearchState): void;
    slice(newState: SliceState): void;
    on(event: string, ...listeners: Function[]): SmartTable<T>;
    off(event?: string, ...listeners: Function[]): SmartTable<T>;
    onDisplayChange(handler: Function): void;
    getTableState(): TableState;
    getMatchingItems(): T[];
    ngOnDestroy(): void;
}
