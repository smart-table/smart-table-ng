import {SmartTable} from '../src/smart-table.service';
import {SortDirection} from '../src/types';

describe('Smart table service', () => {

    describe('proxy to directive', () => {
        let spy: SmartTable<any>;
        let instance: SmartTable<any>;

        beforeEach(() => {
            spy = jasmine.createSpyObj('SmartTable', ['sort', 'filter', 'search', 'slice', 'on', 'off', 'getTableState']);
            instance = SmartTable.of([], () => spy);
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
    });
});