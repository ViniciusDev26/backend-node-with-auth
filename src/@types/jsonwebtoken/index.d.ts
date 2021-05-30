declare class jsonwebtoken {}

export function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): {id: number};
