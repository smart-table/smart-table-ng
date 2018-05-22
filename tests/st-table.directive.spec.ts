import {SmartTable} from '../src/smart-table.service';
import {StTableDirective} from '../src/st-table.directive';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({})
class StTableHostComponent {

    args: any;

    constructor() {

    }

    handleEvent($event: any) {
        this.args = $event;
    }


}

interface User {
    name: string;
    age: number;
    email: string;
}

const fixtureData: User[] = [
    {name: 'Bob', age: 30, email: 'foo@bar.com'},
    {name: 'Albert', age: 40, email: 'woo@example.com'},
    {name: 'Raymond', age: 35, email: 'nooo@bexample.com'}
];


describe('StTable directive', () => {
    let stInstance: SmartTable<User>;

    const createComponent = (template = `<ul stTable #list="stTable">
  <li *ngFor="let item of list.items">{{ item.value.name }}</li>
</ul>`) => {
        const module = TestBed.configureTestingModule({
            declarations: [StTableHostComponent, StTableDirective],
            providers: [{
                provide: SmartTable, useValue: stInstance
            }]
        });
        TestBed.overrideComponent(StTableHostComponent, {
            set: {
                template
            }
        });
        const fixture = module.createComponent(StTableHostComponent);
        fixture.detectChanges();
        return fixture;
    };

    beforeEach(() => {
        stInstance = SmartTable.of(fixtureData);
    });


    it('should have rendered the items', done => {
        const fixture = createComponent();
        setTimeout(() => {
            fixture.detectChanges();
            const el: HTMLElement = fixture.nativeElement;
            const items = Array.from(el.querySelectorAll('li'));
            expect(items.length).toBe(3);
            expect(items.map(i => i.textContent.trim()))
                .toEqual([
                    'Bob',
                    'Albert',
                    'Raymond'
                ]);
            done();
        }, 25);
    });

    it('should re render the items when service emit display change event', done => {
        const fixture = createComponent();
        stInstance.sort({pointer: 'name'});

        setTimeout(() => {
            fixture.detectChanges();
            const el: HTMLElement = fixture.nativeElement;
            const items = Array.from(el.querySelectorAll('li'));
            expect(items.length).toBe(3);
            expect(items.map(i => i.textContent.trim()))
                .toEqual([
                    'Albert',
                    'Bob',
                    'Raymond'
                ]);
            done();
        }, 45);
    });

    it('should emit display event', done => {
        const fixture = createComponent(`<ul stTable (display)="handleEvent($event)"></ul>`);
        stInstance.sort({pointer: 'name'});
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.args).toEqual([
                {index: 1, value: {name: 'Albert', age: 40, email: 'woo@example.com'}},
                {index: 0, value: {name: 'Bob', age: 30, email: 'foo@bar.com'}},
                {index: 2, value: {name: 'Raymond', age: 35, email: 'nooo@bexample.com'}}
            ]);

            done();
        }, 45);
    });

});
