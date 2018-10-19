import { TableState } from './table-state';
import { SmartTable } from './smart-table.service';
import { SmartTableExtension } from 'smart-table-core';
import { ObservableInput } from 'rxjs/index';
export declare const from: <T>(data: ObservableInput<T[]>, tableState?: TableState, ...extensions: SmartTableExtension<T>[]) => SmartTable<T>;
export declare const of: <T>(data: T[], tableState?: TableState, ...extensions: SmartTableExtension<T>[]) => SmartTable<T>;
