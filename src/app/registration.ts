export interface RegistrationStartResponse {
  flowId: string
  credentialCreationOptions: PublicKeyCredentialCreationOptions;
}

export interface RegistrationFinishRequest {
  flowId: string,
  credential: {
    id: string,
    rawId: string,
    type: string,
    response: {
      clientDataJSON: string,
      attestationObject: string
    },
    clientExtensionResults: {

    }
  }
}

export interface RegistrationFinishResponse {
  flowId: string,
  registrationComplete: boolean
}
