import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {GameExchangeConstants} from "../../utils/game-exchange.constants";
import {ServiceUtil} from "../../utils/service.util";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {LoginRespone} from "../../payload/login.payload";

@Injectable()
export class AuthService {

  // Header
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  login (user: User): Observable<LoginRespone> {
    const params = `username=${user.username}&password=${user.password}`;
    return this.http.post<any>(`${environment.apiURL}/login?${params}`, null,{headers: this.headers})
      .pipe(
      tap((res => {
        if(res && res.token) {
          this.headers.append('X-AUTH-TOKEN', res.token);
          localStorage.setItem(GameExchangeConstants.USER_STORAGE, JSON.stringify(res));
        }
      })),
      catchError(ServiceUtil.handleError<any>('Login'))
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem(GameExchangeConstants.USER_STORAGE);
    return this.http
      .post(`${environment.apiURL}/logout`, this.generateHeaderWithToken())
      .pipe(
        tap((res => {
          if(res) {
            localStorage.removeItem(GameExchangeConstants.USER_STORAGE);
            window.location.reload();
          }
        })),
        catchError(ServiceUtil.handleError<any>('Login'))
      );
  }

  public generateHeaderWithToken(): Object {
    return {headers: this.headers};
  }
}
