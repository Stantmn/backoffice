import { TestBed, inject } from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpModule,
        ],
        providers: [
            HttpService,
            Http,
            OwnerService
        ],
    });
  });

  it('should be created', inject([OwnerService], (service: OwnerService) => {
    expect(service).toBeTruthy();
  }));
});
