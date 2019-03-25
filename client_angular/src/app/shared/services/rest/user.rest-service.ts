import {Injectable} from "@angular/core";
import {AuthService} from "./auth.rest-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ServiceUtil} from "../../utils/service.util";

@Injectable()
export class UserRestService {

  apiURL = `${environment.apiURL}/user`;

  constructor(private http: HttpClient,
              private authService: AuthService ){

  }

  getUserInfo(){
    return this.http.get(`${this.apiURL}/info`, this.authService.generateHeaderWithToken());
  }

  getUserDetailInfo(username: string) {
    return this.http.get(`${this.apiURL}/detailedInfo/${username}`);
  }

  isAdminOrEdit() {
    return this.http.get(`${this.apiURL}/authorization`)
  }

  createUser(user: User): Observable<any> {
    const strData = JSON.stringify(user);
    return this.http.post(`${this.apiURL}/create`, strData, this.authService.generateHeaderWithToken())
      .pipe(
        tap((res => {
          console.log("CREATE USER: " + res)
        })),
        catchError(err => ServiceUtil.handleErrorObservable(err))
      );
  };

  deleteUser(username: string): Observable<any> {
    const url = `${this.apiURL}/delete/${username}`;
    return this.http.delete(url, this.authService.generateHeaderWithToken())
      .pipe(
        tap((res => {
          console.log('DELETE USER: ' + res);
        })),
        catchError(err => ServiceUtil.handleErrorObservable(err))
      );
  };


}
