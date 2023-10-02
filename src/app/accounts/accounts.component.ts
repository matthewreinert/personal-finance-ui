import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  accounts: Account[] = [];
  selectedAccount?: Account;

  onSelect(account: Account): void {
    this.selectedAccount = account;
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }
}
