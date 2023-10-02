import { Injectable } from '@angular/core';
import { Account } from './account';
import { ACCOUNTS } from './mock-accounts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getAccounts(): Observable<Account[]> {
    const accounts = of(ACCOUNTS);
    return accounts;
  }
}
