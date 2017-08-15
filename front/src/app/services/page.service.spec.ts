import {TestBed, inject} from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import {PageService} from './page.service';

describe('PageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                HttpService,
                Http,
                PageService
            ],
        });
    });

    it('should ...', inject([PageService], (service: PageService) => {
        expect(service).toBeTruthy();
    }));
});
