import {Injectable} from "@angular/core";
import {Product} from "../Product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, find, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = '/api/products/products.json'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.productUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error ocourred: ${err.error.message}`
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message()}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
