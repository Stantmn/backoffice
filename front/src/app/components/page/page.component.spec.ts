import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';
import {HttpService} from "../../services/http.service";
import {FormsModule} from '@angular/forms';
import {PageHeaderModule} from './../../shared';
import {TinymceModule} from 'angular2-tinymce';

import {PageComponent} from './page.component';

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PageHeaderModule,
                HttpModule,
                FormsModule,
                TinymceModule.withConfig({}),
                RouterTestingModule
            ],
            providers: [
                HttpService,
            ],
            declarations: [PageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
