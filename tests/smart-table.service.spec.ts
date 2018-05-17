import {SmartTable} from '../src/smart-table.service';

describe('Smart table service', () => {
    it('should create an instance from array', done => {
        const instance = SmartTable.fromArray([]);
        expect(instance).toBeDefined();
        done();
    });
});
