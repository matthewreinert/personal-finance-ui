import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '../account.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ACCOUNTS } from '../mock-accounts';
import { FormsModule } from '@angular/forms';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;
  let getAccountSpy: any;

  beforeEach(() => {

    const accountService = jasmine.createSpyObj('AccountService', ['getAccount', 'updateAccount']);
    getAccountSpy = accountService.getAccount.and.returnValue(of(ACCOUNTS.pop));

    TestBed.configureTestingModule({
      declarations: [AccountDetailComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: AccountService, useValue: accountService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '42'
              })
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getAccountSpy.calls.any()).withContext('getAccount called').toBe(true);
  });
});
