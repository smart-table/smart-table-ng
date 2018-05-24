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
