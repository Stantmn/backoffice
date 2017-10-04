import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Order} from '../classes/order';
import {OrdersList} from "../classes/orders-list";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

    constructor(private http: HttpService) {
    }

    getOrders(tableParams: any): Observable<OrdersList> {
        return this.http.get(Settings.API_ENDPOINT + '/order/', {params: tableParams})
            .map((res) => {
                let ordersList = new OrdersList;
                ordersList.orders = res.json().data;
                ordersList.count = res.json().count;
                return ordersList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getOrder(id: number): Observable<Order> {
        return this.http.get(Settings.API_ENDPOINT + '/order/' + id)
            .map((res) => {
                let order: Order;
                order = res.json().data;
                return order;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteOrder(orderId: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/order/' + orderId)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updateOrder(order: Order) {
        return this.http.put(Settings.API_ENDPOINT + '/order/', order)
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
