import { Component, Input } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent {
  @Input() account?: Account;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }
  getAccount(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccount(id).subscribe(account => this.account = account);
  }

  save(): void {
    if (this.account) {
      this.accountService.updateAccount(this.account)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
