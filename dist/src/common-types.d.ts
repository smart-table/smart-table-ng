import { TableState } from './table-state';
import { OnDestroy } from '@angular/core';
export declare const enum SortDirection {
    ASC = "asc",
    DESC = "desc",
    NONE = "none",
}
export declare const enum FilterOperator {
    INCLUDES = "includes",
    IS = "is",
    IS_NOT = "isNot",
    LOWER_THAN = "lt",
    GREATER_THAN = "gt",
    LOWER_THAN_OR_EQUAL = "lte",
    GREATER_THAN_OR_EQUAL = "gte",
    EQUALS = "equals",
    NOT_EQUALS = "notEquals",
}
export declare const enum StEvents {
    TOGGLE_SORT = "TOGGLE_SORT",
    DISPLAY_CHANGED = "DISPLAY_CHANGED",
    PAGE_CHANGED = "CHANGE_PAGE",
    EXEC_CHANGED = "EXEC_CHANGED",
    FILTER_CHANGED = "FILTER_CHANGED",
    SUMMARY_CHANGED = "SUMMARY_CHANGED",
    SEARCH_CHANGED = "SEARCH_CHANGED",
    EXEC_ERROR = "EXEC_ERROR",
}
export declare const enum FilterType {
    BOOLEAN = "boolean",
    NUMBER = "number",
    STRING = "string",
    DATE = "date",
}
export interface SortState {
    pointer?: string;
    direction?: string;
}
export interface SliceState {
    page?: number;
    size?: number;
}
export interface ExecState {
    working: boolean;
}
export interface SearchState {
    value?: string;
    scope?: string[];
}
export interface DisplayedItem<T> {
    value: T;
    index: number;
}
export interface SmartTableEventEmitter {
    on: (event: string, ...listeners: Function[]) => SmartTableEventEmitter;
    off: (event: string, ...listeners: Function[]) => SmartTableEventEmitter;
    dispatch: (event: string, ...args: any[]) => SmartTableEventEmitter;
}
export interface ProcessInput {
    processingDelay?: number;
}
export interface SmartTableCore<T> extends SmartTableEventEmitter {
    sort: (newState: SortState) => void;
    filter: (filterClause: any) => void;
    search: (newState: SearchState) => void;
    slice: (newState: SliceState) => void;
    onDisplayChange: (handler: Function) => void;
    getTableState: () => TableState;
    getMatchingItems: () => T[];
    eval: (state?: TableState) => Promise<T[]>;
    exec: (processInput?: ProcessInput) => void;
}
export interface NgSmartTable<T> extends OnDestroy {
    init: () => void;
    use: (data: T[]) => void;
}
