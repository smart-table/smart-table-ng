import {SmartTable} from '../src/smart-table.service';
import {StFilterDirective} from '../src/st-filter.directive';
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

interface User {
    name: string;
    age: number;
    email: string;
}

@Component({})
class StTableHostComponent {
    constructor() {

    }
}

describe('StFilterDirective', () => {
    let stInstance: SmartTable<User>;
    let spy: any;

    const createComponent = (html = `<input stFilter="name"/>`) => {
        const module = TestBed.configureTestingModule({
            declarations: [StFilterDirective, StTableHostComponent],
            providers: [{
                provide: SmartTable, useValue: stInstance
            }]
        });
        TestBed.overrideComponent(StTableHostComponent, {
            set: {
                template: html
            }
        });
        const fixture = module.createComponent(StTableHostComponent);
        fixture.detectChanges();
        return fixture;
    };

    beforeEach(() => {
        stInstance = SmartTable.of([]);
        spy = spyOn(stInstance, 'filter').and.callThrough();
    });

    it('should delegate filter to smart table service', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'foo';
        el.dispatchEvent(new KeyboardEvent('input'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                name: [{value: 'foo', operator: 'includes', type: 'string'}]
            }]);
            done();
        }, 330);
    });

    it('should debounce and limit calls to service', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'foo';
        el.dispatchEvent(new KeyboardEvent('input'));

        setTimeout(() => {
            fixture.detectChanges();
            el.value = 'foo bar';
            el.dispatchEvent(new KeyboardEvent('input'));
        }, 150);

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                name: [{value: 'foo bar', operator: 'includes', type: 'string'}]
            }]);
            done();
        }, 480);
    });

    it('should be able to overwrite operator and type configuration', done => {
        const fixture = createComponent(`<input stFilter="age" stFilterType="number" type="number" stFilterOperator="lt" />`);
        const el = fixture.nativeElement.querySelector('input');
        el.value = 30;
        el.dispatchEvent(new KeyboardEvent('input'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                age: [{value: '30', operator: 'lt', type: 'number'}]
            }]);
            done();
        }, 330);
    });
});
