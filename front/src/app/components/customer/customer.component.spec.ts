import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule, Http} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from "../../services/http.service";
import {FormsModule} from '@angular/forms';
import {PageHeaderModule, ModalModule} from './../../shared';
import {ModalComponent} from "../../shared/modules/modal/modal.component";
import {CustomerComponent} from './customer.component';

describe('CustomerComponent', () => {
    let component: CustomerComponent;
    let fixture: ComponentFixture<CustomerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PageHeaderModule,
                HttpModule,
                NgbModule.forRoot(),
                ModalModule,
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                HttpService,
                Http,
                ModalComponent
            ],
            declarations: [CustomerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
