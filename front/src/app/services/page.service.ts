import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Page} from '../classes/page';
import {PagesList} from "../classes/pages-list";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PageService {

    constructor(private http: HttpService) {
    }

    getPages(tableParams: any): Observable<PagesList> {
        return this.http.get(Settings.API_ENDPOINT + '/page/', {params: tableParams})
            .map((res) => {
                let pagesList = new PagesList;
                pagesList.pages = res.json().data;
                pagesList.count = res.json().count;
                return pagesList;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    getPage(id: number): Observable<Page> {
        return this.http.get(Settings.API_ENDPOINT + '/page/' + id)
            .map((res) => {
                let page: Page;
                page = res.json().data;
                return page;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deletePage(id: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/page/' + id)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    addPage(page: Page) {
        return this.http.post(Settings.API_ENDPOINT + '/page/', page)
            .map((res) => {
                return res.json();
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    updatePage(page: Page) {
        return this.http.put(Settings.API_ENDPOINT + '/page/', page)
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
