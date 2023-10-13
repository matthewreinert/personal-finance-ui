import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { AccountService } from '../account.service';
import { ACCOUNTS } from '../mock-accounts';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
  let getAccountsSpy: any;
  let addAccountSpy: any;

  beforeEach(() => {

    const accountService = jasmine.createSpyObj('AccountService', ['getAccounts', 'addAccount', 'deleteAccount']);
    getAccountsSpy = accountService.getAccounts.and.returnValue(of(ACCOUNTS));

    TestBed.configureTestingModule({
      declarations: [AccountsComponent],
      providers: [
        { provide: AccountService, useValue: accountService }
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getAccountsSpy.calls.any()).withContext('getAccounts called').toBe(true);
  });
});
