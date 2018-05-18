import {SmartTable} from '../src/smart-table.service';
import {SortDirection} from "../src/types";

describe('Smart table service', () => {

    describe('proxy to directive', () => {
        let spy;
        let instance;

        beforeEach(() => {
            spy = jasmine.createSpyObj('SmartTable', ['sort']);
            instance = SmartTable.fromArray([], () => spy);
        });

        it('should create an instance from array', () => {
            instance.sort({pointer: 'foo', direction: SortDirection.ASC});
            expect(spy.sort.calls.mostRecent().args).toEqual([{pointer: 'foo', direction: SortDirection.ASC}]);
        });
    });
});