import {Injectable} from '@angular/core';
import {TableState as ITableState} from 'smart-table-core';

@Injectable()
export class TableState implements ITableState {
    filter = {};
    search = {};
    slice = {};
    sort = {};
}
