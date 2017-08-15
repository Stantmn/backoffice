import {TestBed, inject} from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import {FileService} from './file.service';

describe('FileService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                HttpService,
                Http,
                FileService
            ],
        });
    });

    it('should be created', inject([FileService], (service: FileService) => {
        expect(service).toBeTruthy();
    }));
});
