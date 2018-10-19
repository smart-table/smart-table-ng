import {SmartTable, of, TableState} from '../dist';
import {SortDirection, FilterOperator} from 'smart-table-core';

describe('Smart table service', () => {

    describe('proxy to directive', () => {
        let spy: SmartTable<any>;
        let instance: SmartTable<any>;

        beforeEach(() => {
            spy = jasmine.createSpyObj('SmartTable', [
                'sort',
                'filter',
                'search',
                'slice',
                'on',
                'off',
                'getTableState',
                'getMatchingItems'
            ]);
            const spyExtension = () => spy;
            instance = of<any>([], new TableState(), spyExtension);
        });

        it('should proxy sort method', () => {
            const input = {pointer: 'foo', direction: SortDirection.ASC};
            instance.sort(input);
            // @ts-ignore
            expect(spy.sort.calls.mostRecent().args).toEqual([{pointer: 'foo', direction: SortDirection.ASC}]);
        });

        it('should proxy filter method', () => {
            const input = {foo: [{operator: FilterOperator.GREATER_THAN, value: 'blah'}]};
            instance.filter(input);
            // @ts-ignore
            expect(spy.filter.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy search method', () => {
            const input = {scope: ['foo', 'bar'], value: 'woot'};
            instance.search(input);
            // @ts-ignore
            expect(spy.search.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy to slice method', () => {
            const input = {page: 2, size: 4};
            instance.slice(input);
            // @ts-ignore
            expect(spy.slice.calls.mostRecent().args).toEqual([input]);
        });

        it('should proxy getTableStateMethod', () => {
            instance.getTableState();
            // @ts-ignore
            expect(spy.getTableState.calls.count()).toEqual(1);
        });

        it('should proxy getMatchingItems', () => {
            instance.getMatchingItems();
            // @ts-ignore
            expect(spy.getMatchingItems.calls.count()).toEqual(1);
        });

        it('should update data source when using use method', done => {
            let displayedItems: any[];
            const service = of<any>([]);
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

        it('should update the data source and the table state when using the use method', done => {
            let displayedItems: any[];
            const newTableState = {
                slice: {
                    page: 1,
                    size: 20
                },
                sort: {},
                filter: {},
                search: {}
            };
            const service = of<any>([], {
                filter: {}, slice: {
                    page: 4, size: 10
                }, sort: {
                    pointer: 'foo',
                    direction: 'asc'
                }, search: {}
            });
            service.onDisplayChange((items: any[]) => displayedItems = items);
            service.init();
            setTimeout(() => {
                expect(displayedItems).toEqual([]);
                service.use([], newTableState);
            }, 30);
            setTimeout(() => {
                expect(displayedItems).toEqual([]);
                expect(service.getTableState()).toEqual(newTableState);
                done();
            }, 60);
        });
    });
});
