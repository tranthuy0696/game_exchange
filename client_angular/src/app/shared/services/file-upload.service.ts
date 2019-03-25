import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileUploadService {
    public API_URL = environment.apiURL;
    constructor(private http: HttpClient) { }

    // upload file
    uploadFile(file: File): Observable<any> {
        let header = new HttpHeaders();
        header = header.append('Authorization', localStorage.getItem('token'));
        const uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.API_URL + 'file/upload', uploadData, {
            headers: header
        });
    }

}