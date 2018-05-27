import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../bean/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private urlApi = 'http://localhost:8080/user'; 

 constructor( private http: HttpClient) { }

  /** GET Users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.urlApi)
      .pipe(
        tap(Useres => this.log(`fetched Users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.urlApi}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(Useres => Useres[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} User id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.urlApi}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET Users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.urlApi}/?name=${term}`).pipe(
      tap(_ => this.log(`found Useres matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUseres', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser (User: User): Observable<User> {
    return this.http.post<User>(this.urlApi, User, httpOptions).pipe(
      tap((User: User) => this.log(`added User w/ id=${User.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser (User: User | number): Observable<User> {
    const id = typeof User === 'number' ? User : User.id;
    const url = `${this.urlApi}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the User on the server */
  updateUser (User: User): Observable<any> {
    return this.http.put(this.urlApi, User, httpOptions).pipe(
      tap(_ => this.log(`updated User id=${User.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    //this.messageService.add('UserService: ' + message);
  }

}
