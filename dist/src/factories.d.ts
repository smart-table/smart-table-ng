import { SmartTableCore, NgSmartTable } from './common-types';
import { TableState } from './table-state';
import { ObservableInput } from 'rxjs/index';
export declare const from: <T>(data: ObservableInput<T[]>, tableState?: TableState, ...extensions: (<U>(input: {
    table: SmartTableCore<T>;
    data: T[];
    tableState: TableState;
}) => U)[]) => SmartTableCore<T> & NgSmartTable<T>;
export declare const of: <T>(data: T[], tableState?: TableState, ...extensions: (<U>(input: {
    table: SmartTableCore<T>;
    data: T[];
    tableState: TableState;
}) => U)[]) => SmartTableCore<T> & NgSmartTable<T>;
