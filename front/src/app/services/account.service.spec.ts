import { TestBed, inject } from '@angular/core/testing';
import {HttpModule, Http} from '@angular/http';
import {HttpService} from "./http.service";

import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpModule,
        ],
        providers: [
            HttpService,
            Http,
            AccountService
        ],
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
