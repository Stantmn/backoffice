import {TestBed, inject} from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import {UserService} from './user.service';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                HttpService,
                Http,
                UserService
            ],
        });
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
