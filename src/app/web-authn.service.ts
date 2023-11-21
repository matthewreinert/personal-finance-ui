import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Base64 } from './base64';
import { LoginFinishRequest, LoginFinishResponse, LoginStartResponse } from './login';
import { RegistrationFinishRequest, RegistrationFinishResponse, RegistrationStartResponse } from './registration';

export interface User {
  email?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {

  webAuthnUrl = '/api/webauthn';
  flowId: string = "";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Observable<RegistrationFinishResponse> {
    const url = this.webAuthnUrl + "/register/start";
    return this.http.post<RegistrationStartResponse>(url, user, this.httpOptions).pipe(
      switchMap(async (response: RegistrationStartResponse) => {
        this.flowId = response.flowId;
        const publicKey = this.prepareCreateKeyReq(response);
        return navigator.credentials.create({ 'publicKey': publicKey });
      }),
      switchMap(result => {
        const finishRequest: RegistrationFinishRequest = this.prepareRegistrationFinishRequest(result as PublicKeyCredential);
        const url = this.webAuthnUrl + "/register/finish";
        return this.http.post<RegistrationFinishResponse>(url, finishRequest, this.httpOptions);
      })
    );
  }

  loginUser(user: User): Observable<LoginFinishResponse> {
    const url = this.webAuthnUrl + "/login/start";
    return this.http.post<LoginStartResponse>(url, user, this.httpOptions).pipe(
      switchMap(async response => {
        this.flowId = response.flowId;
        const publicKey = this.prepareGetKeyReq(response);
        return navigator.credentials.get({ publicKey })
      }),
      switchMap(result => {
        const finishRequest: LoginFinishRequest = this.prepareLoginFinishRequest(result as PublicKeyCredential);
        const url = this.webAuthnUrl + "/login/finish";
        return this.http.post<LoginFinishResponse>(url, finishRequest, this.httpOptions);
      })
    );
  }
  private prepareLoginFinishRequest(assertionResponse: PublicKeyCredential): LoginFinishRequest {
    const authenticatorAssertionResponse = assertionResponse.response as AuthenticatorAssertionResponse;
    return {
      flowId: this.flowId,
      credential: {
        id: assertionResponse.id,
        rawId: Base64.fromByteArray(assertionResponse.rawId),
        type: assertionResponse.type,
        response: {
          authenticatorData: Base64.fromByteArray(authenticatorAssertionResponse.authenticatorData),
          clientDataJSON: Base64.fromByteArray(authenticatorAssertionResponse.clientDataJSON),
          signature: Base64.fromByteArray(authenticatorAssertionResponse.signature)
          // userHandle: fromByteArray(authenticatorAssertionResponse.userHandle)
        },
        clientExtensionResults: {}
      }
    }
  }

  private prepareGetKeyReq(response: LoginStartResponse) {
    const credentials: any = [];
    response.assertionRequest.publicKeyCredentialRequestOptions.allowCredentials?.forEach(
      cred => {
        const result = {
          type: cred.type,
          id: Base64.toByteArray(cred.id)
        }
        credentials.push(result)
      }
    )
    return {
      challenge: Base64.toByteArray(response.assertionRequest.publicKeyCredentialRequestOptions.challenge),
      allowCredentials: credentials
    }
  }

  private prepareCreateKeyReq(settings: RegistrationStartResponse) {
    return {
      challenge: Base64.toByteArray(settings.credentialCreationOptions.challenge),
      rp: {
        name: settings.credentialCreationOptions.rp.name,
        id: settings.credentialCreationOptions.rp.id,
      },
      user: {
        name: settings.credentialCreationOptions.user.name,
        displayName: settings.credentialCreationOptions.user.displayName,
        id: Base64.toByteArray(settings.credentialCreationOptions.user.id)
      },
      pubKeyCredParams: settings.credentialCreationOptions.pubKeyCredParams,
      attestation: settings.credentialCreationOptions.attestation
    }
  }

  private prepareRegistrationFinishRequest(credential: PublicKeyCredential): RegistrationFinishRequest {
    const authenticatorResponse = credential.response as AuthenticatorAttestationResponse;
    return {
      flowId: this.flowId,
      credential: {
        id: credential.id,
        rawId: Base64.fromByteArray(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: Base64.fromByteArray(authenticatorResponse.clientDataJSON),
          attestationObject: Base64.fromByteArray(authenticatorResponse.attestationObject)
        },
        clientExtensionResults: {}
      }
    }
  }
}
