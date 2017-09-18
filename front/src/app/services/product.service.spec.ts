import {TestBed, inject} from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import {ProductService} from './product.service';

describe('ProductService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                HttpService,
                Http,
                ProductService
            ],
        });
    });

    it('should ...', inject([ProductService], (service: ProductService) => {
        expect(service).toBeTruthy();
    }));
});
