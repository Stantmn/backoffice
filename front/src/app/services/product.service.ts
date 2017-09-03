import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Product} from '../classes/product';
import {ProductsList} from "../classes/products-list";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

    constructor(private http: HttpService) {
    }

    getProducts(tableParams: any): Observable<ProductsList> {
        return this.http.get(Settings.API_ENDPOINT + '/product/', {params: tableParams})
            .map((res) => {
                let productsList = new ProductsList;
                productsList.products = res.json().data;
                productsList.count = res.json().count;
                return productsList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get(Settings.API_ENDPOINT + '/product/' + id)
            .map((res) => {
                let product: Product;
                product = res.json().data;
                return product;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteProduct(id: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/product/' + id)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    addProduct(product: Product) {
        return this.http.post(Settings.API_ENDPOINT + '/product/', product)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updateProduct(product: Product) {
        return this.http.put(Settings.API_ENDPOINT + '/product/', product)
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
