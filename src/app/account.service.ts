import { Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Accounts } from './accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountsUrl = '/api/accounts';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      catchError(this.handleError<Account>('addAccount'))
    );
  }

  getAccounts(): Observable<Accounts> {
    return this.http.get<Accounts>(this.accountsUrl)
      .pipe(
        catchError(this.handleError<Accounts>('getAccounts', { accounts: [] }))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    )
  }


  updateAccount(account: Account): Observable<any> {
    const url = `${this.accountsUrl}/${account.id}`;
    return this.http.put(url, account, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAccount'))
    );
  }

  deleteAccount(id: number) {
    const url = `${this.accountsUrl}/${id}`;

    return this.http.delete<Account>(url, this.httpOptions).pipe(
      catchError(this.handleError<Account>('deleteAccount'))
    );
  }

  searchAccounts(term: string): Observable<Account[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Account[]>(`${this.accountsUrl}.?name=${term}`).pipe(
      catchError(this.handleError<Account[]>('searchAccounts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
