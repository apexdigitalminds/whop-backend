import type { Whop } from "../client.js";
export interface GetUserTokenOptions {
    headerName?: string | null | undefined;
}
type GetUserTokenInput = string | Headers | Request | null | undefined;
export declare function getUserToken(token: string, options?: GetUserTokenOptions): string;
export declare function getUserToken(tokenOrHeadersOrRequest: GetUserTokenInput, options?: GetUserTokenOptions): string | null;
export interface UserTokenPayload {
    userId: string;
    appId: string;
}
export interface VerifyUserTokenOptions<DontThrow extends boolean = false> {
    appId: string;
    publicKey?: string;
    dontThrow?: DontThrow;
    headerName?: string | null | undefined;
}
export declare function makeUserTokenVerifierFromSdk(client: Whop): <DT extends boolean = false>(tokenOrHeadersOrRequest: string | Headers | Request | null | undefined, options?: Partial<VerifyUserTokenOptions<DT>>) => Promise<DT extends true ? UserTokenPayload | null : UserTokenPayload>;
export declare function verifyUserToken<DontThrow extends boolean = false>(tokenOrHeadersOrRequest: string | Headers | Request | null | undefined, overrideOptions?: Partial<VerifyUserTokenOptions<DontThrow>>): Promise<Promise<DontThrow extends true ? UserTokenPayload | null : UserTokenPayload>>;
export {};
//# sourceMappingURL=verify-user-token.d.ts.map