import {table as stTable} from 'smart-table-core';
import {SearchState, SliceState, SortState} from './types';
import {TableState} from './table-state';
import {Injectable} from '@angular/core';
import {ObservableInput, from, Observable} from 'rxjs/index';
import {OnDestroy} from '@angular/core';

@Injectable()
export class SmartTable<T> implements OnDestroy {
    private _directive;
    private _data: T[];

    //todo add default tableState and defaultFactory (the table of smart-table)
    public constructor(private source: ObservableInput<T[]>, factory: Function) {
        const dataArray: T[] = [];
        this._data = dataArray;
        this._directive = factory({data: dataArray, tableState: new TableState()});
    }

    init(): void {
        this._directive.dispatch('EXEC_CHANGED', {working: true});
        const subscription = from(this.source)
            .subscribe((data: T[]) => {
                this._data.splice(0, 0, ...data);
                this._directive.exec();
            });
    }

    sort(newState: SortState): void {
        return this._directive.sort(newState);
    }

    filter(newState: Object): void {
        return this._directive.filter(newState);
    }

    search(newState: SearchState): void {
        return this._directive.search(newState);
    }

    slice(newState: SliceState): void {
        return this._directive.slice(newState);
    }

    on(event: string, ...listeners: Function[]): SmartTable<T> {
        this._directive.on(event, ...listeners);
        return this;
    }

    off(event?: string, ...listeners: Function[]): SmartTable<T> {
        this._directive.off(event, ...listeners);
        return this;
    }

    onDisplayChange(handler: Function): void {
        return this._directive.onDisplayChange(handler);
    }

    getTableState(): TableState {
        return this._directive.getTableState();
    }

    ngOnDestroy(): void {
        return this._directive.off();
    }
}
