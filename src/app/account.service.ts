import { Injectable } from '@angular/core';
import { Account } from './account';
import { ACCOUNTS } from './mock-accounts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  getAccount(id: number): Observable<Account> {
    const account = ACCOUNTS.find(a => a.id === id)!;
    return of(account);
  }

  constructor() { }

  getAccounts(): Observable<Account[]> {
    const accounts = of(ACCOUNTS);
    return accounts;
  }
}
