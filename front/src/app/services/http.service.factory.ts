import {RequestOptions, XHRBackend} from '@angular/http';
import {HttpService} from './http.service';

function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
}
export {httpServiceFactory};