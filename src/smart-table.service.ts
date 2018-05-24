import {table as stTable} from 'smart-table-core';
import {SearchState, SliceState, SortState, StEvents} from './commont-types';
import {TableState} from './table-state';
import {Injectable} from '@angular/core';
import {from, Subscription, Observable, ObservableInput, of} from 'rxjs/index';
import {OnDestroy} from '@angular/core';

@Injectable()
export class SmartTable<T> implements OnDestroy {
    private _directive: any;
    private _subscription: Subscription;
    private _data: T[];

    static of<U>(data: U[] = [], tableState = new TableState(), factory = stTable) {
        return new SmartTable<U>(of(data), tableState, factory);
    }

    static from<U>(data: ObservableInput<U[]>, tableState = new TableState(), factory = stTable) {
        return new SmartTable<U>(from(data), tableState, factory);
    }

    private constructor(private _source: Observable<T[]>, tableState: TableState, factory: Function) {
        const dataArray: T[] = [];
        this._data = dataArray;
        this._directive = factory({data: dataArray, tableState});
    }

    init(): void {
        this._directive.dispatch(StEvents.EXEC_CHANGED, {working: true});
        this._subscription = this._source
            .subscribe((data: T[]) => {
                this._data.splice(0, 0, ...data);
                this._directive.exec();
            });
    }

    use(data: T[]) {
        this._subscription.unsubscribe();
        this._source = of(data);
        this._directive.dispatch(StEvents.EXEC_CHANGED, {working: true});
        this._subscription = this._source
            .subscribe((values: T[]) => {
                this._data.splice(0, 0, ...values);
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

    getMatchingItems(): T[] {
        return this._directive.getMatchingItems();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._directive.off();
    }
}
