import {SmartTableCore, NgSmartTable, StEvents} from './common-types';
import {TableState} from './table-state';
import {table as stTable} from 'smart-table-core';
import {Subscription} from 'rxjs/internal/Subscription';
import {ObservableInput, of as observableOf, from as observableFrom} from 'rxjs/index';

export const from = <T>(data: ObservableInput<T[]>, tableState = new TableState(), ...extensions: (<U>(input: {
    table: SmartTableCore<T>;
    data: T[];
    tableState: TableState;
}) => U)[]): SmartTableCore<T> & NgSmartTable<T> => {
    const dataArray: T[] = [];
    const table = stTable({data: dataArray, tableState}, ...extensions);
    let source = observableFrom(data);
    let subscription: Subscription;

    return Object.assign(table, {
        init() {
            table.dispatch(StEvents.EXEC_CHANGED, {working: true});
            subscription = source
                .subscribe((items: T[]) => {
                    dataArray.splice(0, 0, ...items);
                    table.exec();
                });
        },
        use(newData: T[]) {
            subscription.unsubscribe();
            source = observableOf(newData);
            table.dispatch(StEvents.EXEC_CHANGED, {working: true});
            subscription = source
                .subscribe((values: T[]) => {
                    dataArray.splice(0, 0, ...values);
                    table.exec();
                });
        },
        ngOnDestroy() {
            subscription.unsubscribe();
        }
    });
};

export const of = <T>(data: T[], tableState = new TableState(), ...extensions: (<U>(input: {
    table: SmartTableCore<T>;
    data: T[];
    tableState: TableState;
}) => U)[]): SmartTableCore<T> & NgSmartTable<T> => from(observableOf(data), tableState, ...extensions);
