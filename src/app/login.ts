export interface LoginStartResponse {
  flowId: string,
  assertionRequest: AssertionRequest
}
export interface LoginFinishRequest {
  flowId: string;
  credential: {
    id: string;
    rawId: string;
    type: string;
    response: {
      authenticatorData: string;
      clientDataJSON: string;
      signature: string;
    };
    clientExtensionResults: {};
  };
}

export interface AssertionRequest {
  publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions,
  username: string,
  userHandle: string
}

export interface LoginFinishResponse {
  success: boolean,
  credentialResponse: PublicKeyCredential,
  credential: any,
  username: string,
  signatureCounterValid: boolean,

}
