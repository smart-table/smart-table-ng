import {TableState} from './table-state';
import {SmartTable} from './smart-table.service';
import {
    smartTable as stTable,
    SmartTableEvents as StEvents,
    SmartTableExtension,
    SmartTable as ISmartTable
} from 'smart-table-core';
import {Subscription} from 'rxjs/internal/Subscription';
import {ObservableInput, of as observableOf, from as observableFrom} from 'rxjs/index';

export const from = <T>(data: ObservableInput<T[]>,
                        tableState = new TableState(),
                        ...extensions: SmartTableExtension<T>[]): SmartTable<T> => {
    const dataArray: T[] = [];
    const table: ISmartTable<T> = stTable({data: dataArray, tableState}, ...extensions);
    let source = observableFrom(data);
    let subscription: Subscription;

    return <SmartTable<T>>Object.assign(table, {
        init() {
            if (subscription) {
                subscription.unsubscribe();
            }
            table.dispatch(StEvents.EXEC_CHANGED, {working: true});
            subscription = source
                .subscribe((items: T[]) => {
                    dataArray.splice(0, dataArray.length, ...items);
                    table.exec();
                });
        },
        use(newData: T[], newTableState?: TableState) {
            subscription.unsubscribe();
            if (newTableState) {
                Object.assign(tableState, newTableState);
            }
            source = observableOf(newData);
            table.dispatch(StEvents.EXEC_CHANGED, {working: true});
            subscription = source
                .subscribe((values: T[]) => {
                    dataArray.splice(0, dataArray.length, ...values);
                    table.exec();
                });
        },
        ngOnDestroy() {
            subscription.unsubscribe();
        }
    });
};

export const of = <T>(data: T[], tableState = new TableState(), ...extensions: SmartTableExtension<T>[]): SmartTable<T> =>
    from(observableOf(data), tableState, ...extensions);
