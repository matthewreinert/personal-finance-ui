import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AccountService } from '../account.service';
import { ACCOUNTS } from '../mock-accounts';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getAccountsSpy: any;

  beforeEach(() => {

    const accountService = jasmine.createSpyObj('AccountService', ['getAccounts']);
    getAccountsSpy = accountService.getAccounts.and.returnValue(of(ACCOUNTS));

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AccountService, useValue: accountService }
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(getAccountsSpy.calls.any()).withContext('getAccounts called').toBe(true);
  });
});
