import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {User} from '../classes/user';
import {UsersList} from '../classes/users-list';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private http: HttpService) {
    }

    getUsers(tableParams: any): Observable<UsersList> {
        return this.http.get(Settings.API_ENDPOINT + '/user/', {params: tableParams})
            .map((res) => {
                let usersList = new UsersList;
                usersList.users = res.json().data;
                usersList.count = res.json().count;
                return usersList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getUser(id: number): Observable<User> {
        return this.http.get(Settings.API_ENDPOINT + '/user/' + id)
            .map((res) => {
                let user: User;
                user = res.json().data;
                return user;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(Settings.API_ENDPOINT + '/user/' + id)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    addUser(user: User) {
        return this.http.post(Settings.API_ENDPOINT + '/user/', user)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updateUser(user: User) {
        return this.http.put(Settings.API_ENDPOINT + '/user/', user)
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
