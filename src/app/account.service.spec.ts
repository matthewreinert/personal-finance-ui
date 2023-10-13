import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Account } from './account';
import { Accounts } from './accounts';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    accountService = TestBed.inject(AccountService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });



  describe('#getAccounts', () => {
    let expectedAccounts: Accounts;

    beforeEach(() => {
      accountService = TestBed.inject(AccountService);
      expectedAccounts = {
        accounts: [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
        ]
      } as Accounts;
    });

    it('should return expected accounts (called once)', () => {

      accountService.getAccounts().subscribe({
        next: accounts => expect(accounts).toEqual(expectedAccounts, 'should return expected accounts'),
        error: fail,
      });

      // AccountService should have made one request to GET accounts from expected URL
      const req = httpTestingController.expectOne(accountService.accountsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock accounts
      req.flush(expectedAccounts);
    });

    it('should be OK returning no accounts', () => {

      accountService.getAccounts().subscribe({
        next: accounts => expect(accounts.accounts.length).toEqual(0, 'should have empty accounts array'),
        error: fail,
      });

      const req = httpTestingController.expectOne(accountService.accountsUrl);
      req.flush({ accounts: [] }); // Respond with no accounts
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty accounts result', () => {

      accountService.getAccounts().subscribe({
        next: accounts => expect(accounts.accounts.length).toEqual(0, 'should return empty accounts array'),
        error: fail,
      });

      const req = httpTestingController.expectOne(accountService.accountsUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected accounts (called multiple times)', () => {

      accountService.getAccounts().subscribe();
      accountService.getAccounts().subscribe();
      accountService.getAccounts().subscribe({
        next: accounts => expect(accounts).toEqual(expectedAccounts, 'should return expected accounts'),
        error: fail,
      });

      const requests = httpTestingController.match(accountService.accountsUrl);
      expect(requests.length).toEqual(3, 'calls to getAccounts()');

      // Respond to each request with different mock account results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: 'bob' }]);
      requests[2].flush(expectedAccounts);
    });
  });

  describe('#updateAccount', () => {
    it('should update a account and return it', () => {

      const updateAccount: Account = { id: 1, name: 'A' };

      accountService.updateAccount(updateAccount).subscribe({
        next: data => expect(data).toEqual(updateAccount, 'should return the account'),
        error: fail,
      });

      // AccountService should have made one request to PUT account
      const req = httpTestingController.expectOne(`${accountService.accountsUrl}/1`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateAccount);

      // Expect server to return the account after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateAccount });
      req.event(expectedResponse);
    });
  });
});
