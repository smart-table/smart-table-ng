import {SmartTable} from '../src/smart-table.service';
import {StSearchDirective} from '../src/st-search.directive';
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {of} from '../src/factories';

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

describe('StSearchDirective', () => {
    let stInstance: SmartTable<User>;
    let spy: any;

    const createComponent = (html = `<input stSearch="name, email"  />`) => {
        const module = TestBed.configureTestingModule({
            declarations: [StSearchDirective, StTableHostComponent],
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
        stInstance = of<User>([]);
        spy = spyOn(stInstance, 'search').and.callThrough();
    });

    it('should delegate search to smart table service', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'foo';
        el.dispatchEvent(new KeyboardEvent('input'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                scope: ['name', 'email'],
                value: 'foo',
                flags: 'i',
                escape: false
            }]);
            done();
        }, 330);
    });

    it('should debounce and limit call to service', done => {
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
                scope: ['name', 'email'],
                value: 'foo bar',
                escape: false,
                flags: 'i'
            }]);
            done();
        }, 480);
    });

    it('should init with the initial table state', done => {
        stInstance = of<User>([], {
            sort: {},
            filter: {},
            search: {value: 'foo', scope: ['name']},
            slice: {}
        });
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('input');
        setTimeout(() => {
            fixture.detectChanges();
            expect(el.value).toEqual('foo');
            done();
        }, 30);
    });

    it('should forward extra parameters', done => {
        const fixture = createComponent(`<input stSearch="name, email"  stSearchEscape="true" stSearchFlags="" />`);
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'foo';
        el.dispatchEvent(new KeyboardEvent('input'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            const calls = spy.calls.mostRecent().args;
            console.log(calls);
            expect(calls).toEqual([{
                scope: ['name', 'email'],
                value: 'foo',
                flags: '',
                escape: true
            }]);
            done();
        }, 330);
    });

});
