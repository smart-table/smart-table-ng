import {SmartTable} from '../src/smart-table.service';
import {SortDirection} from '../src/common-types';
import {TableState} from "../src/table-state";

describe('Smart table service', () => {

    describe('proxy to directive', () => {
        let spy: SmartTable<any>;
        let instance: SmartTable<any>;

        beforeEach(() => {
            spy = jasmine.createSpyObj('SmartTable', [
                'sort',
                'filter',
                'search',
                'slice', '' +
                'on',
                'off',
                'getTableState',
                'getMatchingItems'
            ]);
            instance = SmartTable.of([], new TableState(), () => spy);
        });

        it('should proxy sort method', () => {
            const input = {pointer: 'foo', direction: SortDirection.ASC};
            instance.sort(input);
            expect(spy.sort.calls.mostRecent().args).toEqual([{pointer: 'foo', direction: SortDirection.ASC}]);
        });

        it('should proxy filter method', () => {
            const input = {foo: [{operator: 'lt', value: 'blah'}]};
            instance.filter(input);
            expect(spy.filter.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy search method', () => {
            const input = {scope: ['foo', 'bar'], value: 'woot'};
            instance.search(input);
            expect(spy.search.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy to slice method', () => {
            const input = {page: 2, size: 4};
            instance.slice(input);
            expect(spy.slice.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy getTableStateMethod', () => {
            instance.getTableState();
            expect(spy.getTableState.calls.count()).toEqual(1);
        });

        it('should proxy getMatchingItems', () => {
            instance.getMatchingItems();
            expect(spy.getMatchingItems.calls.count()).toEqual(1);
        });

        it('should update data source when using use method', done => {
            let displayedItems: any[];
            const service = SmartTable.of<any>([]);
            service.onDisplayChange((items: any[]) => displayedItems = items);
            service.init();
            setTimeout(() => {
                expect(displayedItems).toEqual([]);
                service.use([{id: 1}, {id: 2}]);
            }, 30);
            setTimeout(() => {
                expect(displayedItems).toEqual([{index: 0, value: {id: 1}}, {index: 1, value: {id: 2}}]);
                done();
            }, 60);
        });
    });
});