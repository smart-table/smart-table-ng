import { SmartTableCore, NgSmartTable, ProcessInput, SmartTableEventEmitter, SearchState, SliceState, SortState } from './common-types';
import { TableState } from './table-state';
export declare abstract class SmartTable<T> implements SmartTableCore<T>, NgSmartTable<T> {
    dispatch: (event: string, ...args: any[]) => SmartTableEventEmitter;
    eval: (state?: TableState) => Promise<T[]>;
    exec: (processInput?: ProcessInput) => void;
    filter: (filterClause: any) => void;
    getMatchingItems: () => T[];
    getTableState: () => TableState;
    init: () => void;
    off: (event: string, ...listeners: Function[]) => SmartTableEventEmitter;
    on: (event: string, ...listeners: Function[]) => SmartTableEventEmitter;
    onDisplayChange: (handler: Function) => void;
    search: (newState: SearchState) => void;
    slice: (newState: SliceState) => void;
    sort: (newState: SortState) => void;
    use: (data: T[]) => void;
    ngOnDestroy: () => void;
}
