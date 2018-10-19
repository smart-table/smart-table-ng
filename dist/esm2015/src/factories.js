/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { TableState } from './table-state';
import { smartTable as stTable } from 'smart-table-core';
import { of as observableOf, from as observableFrom } from 'rxjs/index';
export const /** @type {?} */ from = (data, tableState = new TableState(), ...extensions) => {
    const /** @type {?} */ dataArray = [];
    const /** @type {?} */ table = stTable({ data: dataArray, tableState }, ...extensions);
    let /** @type {?} */ source = observableFrom(data);
    let /** @type {?} */ subscription;
    return /** @type {?} */ (Object.assign(table, {
        /**
         * @return {?}
         */
        init() {
            if (subscription) {
                subscription.unsubscribe();
            }
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((items) => {
                dataArray.splice(0, dataArray.length, ...items);
                table.exec();
            });
        },
        /**
         * @param {?} newData
         * @param {?=} newTableState
         * @return {?}
         */
        use(newData, newTableState) {
            subscription.unsubscribe();
            if (newTableState) {
                Object.assign(tableState, newTableState);
            }
            source = observableOf(newData);
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((values) => {
                dataArray.splice(0, dataArray.length, ...values);
                table.exec();
            });
        },
        /**
         * @return {?}
         */
        ngOnDestroy() {
            subscription.unsubscribe();
        }
    }));
};
export const /** @type {?} */ of = (data, tableState = new TableState(), ...extensions) => from(observableOf(data), tableState, ...extensions);
//# sourceMappingURL=factories.js.map