import {table as stTable} from 'smart-table-core';
import {SearchState, SliceState, SortState} from './types';
import {TableState} from './table-state';
import {Injectable} from '@angular/core';
import {Observable, of, from} from 'rxjs/index';
import {first} from 'rxjs/operators';
import {OnDestroy} from '@angular/core';

interface SmartTableDataSource<T> {
    fetch: () => Observable<T[]>;
}

@Injectable()
export class SmartTable<T> implements OnDestroy {
    private _directive;
    private _data: T[];

    static fromArray<U>(data: U[], factory = stTable): SmartTable<U> {
        return new SmartTable({
            fetch() {
                return of(data);
            }
        }, factory);
    }

    static fromPromise<U>(data: Promise<U[]>, factory = stTable): SmartTable<U> {
        return new SmartTable({
            fetch() {
                return from(data);
            }
        }, factory);
    }

    static fromObservable<U>(data: Observable<U[]>, factory = stTable): SmartTable<U> {
        return new SmartTable({
            fetch() {
                return data;
            }
        }, factory);
    }

    private constructor(private source: SmartTableDataSource<T>, factory: Function) {
        const dataArray: T[] = [];
        this._data = dataArray;
        this._directive = factory({data: dataArray, tableState: new TableState()});
    }

    init(): void {
        this._directive.dispatch('EXEC_CHANGED', {working: true});
        const subscription = this.source
            .fetch()
            .pipe(
                first()
            )
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
