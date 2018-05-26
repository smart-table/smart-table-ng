import {Injectable} from '@angular/core';
import {SortState, SliceState, SearchState} from './common-types';

@Injectable()
export class TableState {
    filter: Object = {};
    search: SearchState = {};
    slice: SliceState = {page: 1, size: 20};
    sort: SortState = {};
}
