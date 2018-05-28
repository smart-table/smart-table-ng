/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { TableState } from './table-state';
import { table as stTable } from 'smart-table-core';
import { of as observableOf, from as observableFrom } from 'rxjs/index';
export const /** @type {?} */ from = (data, tableState = new TableState(), ...extensions) => {
    const /** @type {?} */ dataArray = [];
    const /** @type {?} */ table = stTable({ data: dataArray, tableState }, ...extensions);
    let /** @type {?} */ source = observableFrom(data);
    let /** @type {?} */ subscription;
    return Object.assign(table, {
        /**
         * @return {?}
         */
        init() {
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((items) => {
                dataArray.splice(0, 0, ...items);
                table.exec();
            });
        },
        /**
         * @param {?} newData
         * @return {?}
         */
        use(newData) {
            subscription.unsubscribe();
            source = observableOf(newData);
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe((values) => {
                dataArray.splice(0, 0, ...values);
                table.exec();
            });
        },
        /**
         * @return {?}
         */
        ngOnDestroy() {
            subscription.unsubscribe();
        }
    });
};
export const /** @type {?} */ of = (data, tableState = new TableState(), ...extensions) => from(observableOf(data), tableState, ...extensions);
//# sourceMappingURL=factories.js.map