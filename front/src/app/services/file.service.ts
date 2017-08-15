import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Settings} from '../constants/settings';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

    constructor(private http: HttpService) {
    }

    getFiles(fileGrp: number) {
        return this.http.get(Settings.API_ENDPOINT + '/file/' + fileGrp)
            .map((res) => {
                return res.json().data;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

    deleteFile(id: number) {
        return this.http.delete(Settings.API_ENDPOINT + '/file/' + id)
    }

    uploadFiles(formData: FormData) {

        return this.http.post(Settings.API_ENDPOINT + '/file/', formData)
            .map((res) => {
                return res.json().data.groupId;
            })
            .catch(
                error => {
                    return Observable.throw(error || 'Server Error');
                }
            );
    }

}
