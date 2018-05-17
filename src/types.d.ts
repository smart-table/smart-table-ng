export const enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
    NONE = 'none'
}

export const enum FilterOperator {
    INCLUDES = 'includes',
    IS = 'is',
    IS_NOT = 'isNot',
    LOWER_THAN = 'lt',
    GREATER_THAN = 'gt',
    LOWER_THAN_OR_EQUAL = 'lte',
    GREATER_THAN_OR_EQUAL = 'gte',
    EQUALS = 'equals',
    NOT_EQUALS = 'notEquals'
}

export const enum FilterType {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    DATE = 'date'
}

export interface SortState {
    pointer?: string;
    direction?: string;
}

export interface SearchState {
    value?: string;
    scope?: string[];
}

export interface SliceState {
    page?: number;
    size?: number;
}
