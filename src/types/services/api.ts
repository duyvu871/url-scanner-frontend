export type GetHeadersResponse = {
    headers: {
        responseStatusLine: string,
        requestHeaders: string[],
        responseHeaders: any[]
    }
}

export type HeaderSecureCheck = {
    results: {
        checkHSTS?: string;
        checkXFrameOptions?: string;
        checkXContentTypeOptions?: string;
        checkCSP?: string;
        checkReferrerPolicy?: string;
        checkXXSSProtection?: string;
        checkSecureCookies?: string;
    }
}