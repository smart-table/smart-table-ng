/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var SortDirection = {
    ASC: 'asc',
    DESC: 'desc',
    NONE: 'none',
};
export { SortDirection };
/** @enum {string} */
var FilterOperator = {
    INCLUDES: 'includes',
    IS: 'is',
    IS_NOT: 'isNot',
    LOWER_THAN: 'lt',
    GREATER_THAN: 'gt',
    LOWER_THAN_OR_EQUAL: 'lte',
    GREATER_THAN_OR_EQUAL: 'gte',
    EQUALS: 'equals',
    NOT_EQUALS: 'notEquals',
};
export { FilterOperator };
/** @enum {string} */
var StEvents = {
    TOGGLE_SORT: 'TOGGLE_SORT',
    DISPLAY_CHANGED: 'DISPLAY_CHANGED',
    PAGE_CHANGED: 'CHANGE_PAGE',
    EXEC_CHANGED: 'EXEC_CHANGED',
    FILTER_CHANGED: 'FILTER_CHANGED',
    SUMMARY_CHANGED: 'SUMMARY_CHANGED',
    SEARCH_CHANGED: 'SEARCH_CHANGED',
    EXEC_ERROR: 'EXEC_ERROR',
};
export { StEvents };
/** @enum {string} */
var FilterType = {
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    STRING: 'string',
    DATE: 'date',
};
export { FilterType };
/**
 * @record
 */
export function SortState() { }
function SortState_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SortState.prototype.pointer;
    /** @type {?|undefined} */
    SortState.prototype.direction;
}
/**
 * @record
 */
export function SliceState() { }
function SliceState_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliceState.prototype.page;
    /** @type {?|undefined} */
    SliceState.prototype.size;
}
/**
 * @record
 */
export function ExecState() { }
function ExecState_tsickle_Closure_declarations() {
    /** @type {?} */
    ExecState.prototype.working;
}
/**
 * @record
 */
export function SearchState() { }
function SearchState_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SearchState.prototype.value;
    /** @type {?|undefined} */
    SearchState.prototype.scope;
}
/**
 * @record
 * @template T
 */
export function DisplayedItem() { }
function DisplayedItem_tsickle_Closure_declarations() {
    /** @type {?} */
    DisplayedItem.prototype.value;
    /** @type {?} */
    DisplayedItem.prototype.index;
}
//# sourceMappingURL=commont-types.js.map