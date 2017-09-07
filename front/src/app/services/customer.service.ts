import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Customer} from '../classes/customer';
import {CustomersList} from "../classes/customers-list";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {

    constructor(private http: HttpService) {
    }

    getCustomers(tableParams: any): Observable<CustomersList> {
        return this.http.get(Settings.API_ENDPOINT + '/customer/', {params: tableParams})
            .map((res) => {
                let customersList = new CustomersList;
                customersList.customers = res.json().data;
                customersList.count = res.json().count;
                return customersList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get(Settings.API_ENDPOINT + '/customer/' + id)
            .map((res) => {
                let customer: Customer;
                customer = res.json().data;
                return customer;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteCustomer(id: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/customer/' + id)
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    addCustomer(customer: Customer) {
        return this.http.post(Settings.API_ENDPOINT + '/customer/', customer)
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updateCustomer(customer: Customer) {
        return this.http.put(Settings.API_ENDPOINT + '/customer/', customer)
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
