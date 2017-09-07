import { TestBed, inject } from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                HttpService,
                Http,
                CustomerService
            ],
        });
    });

    it('should be created', inject([CustomerService], (service: CustomerService) => {
        expect(service).toBeTruthy();
    }));
});
