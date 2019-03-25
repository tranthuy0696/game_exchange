import {Observable, of} from "rxjs";

export class ServiceUtil {

  public static handleErrorObservable(res: Response) {
    let err: any = res.json();
    let mess = err ? `[${err.code}] ${err.message}` : 'GameExchange service is not running or something went wrong.';
    console.error(mess);
    return Observable.create(mess);
  }

  public static handleErrorPromise(res: Response) {
    let err: any = res.json();
    let mess = err ? `[${err.code}] ${err.message}` : 'GameExchange service is not running or something went wrong.';
    console.error(mess);
    return Promise.reject(mess);
  }

  public static handleError<T> (operation = 'GameExchange', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      let mess = error ? `[${error.code}] ${error.message}` : 'Service is not running or something went wrong.';
      console.log(`${operation} failed: ${mess}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
