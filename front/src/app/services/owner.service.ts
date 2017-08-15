import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Owner} from '../classes/owner';
import {OwnersList} from "../classes/owners-list";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OwnerService {

    constructor(private http: HttpService) {
    }

    getOwners(tableParams: any): Observable<OwnersList> {
        return this.http.get(Settings.API_ENDPOINT + '/owner/', {params: tableParams})
            .map((res) => {
                let ownersList = new OwnersList;
                ownersList.owners = res.json().data;
                ownersList.count = res.json().count;
                return ownersList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getOwner(id: number): Observable<Owner> {
        return this.http.get(Settings.API_ENDPOINT + '/owner/' + id)
            .map((res) => {
                let owner: Owner;
                owner = res.json().data;
                return owner;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteOwner(id: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/owner/' + id)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    addOwner(owner: Owner) {
        return this.http.post(Settings.API_ENDPOINT + '/owner/', owner)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updateOwner(owner: Owner) {
        return this.http.put(Settings.API_ENDPOINT + '/owner/', owner)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

}
