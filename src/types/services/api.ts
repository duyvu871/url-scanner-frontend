export type GetHeadersResponse = {
    headers: {
        responseStatusLine: string,
        requestHeaders: string[],
        responseHeaders: any[]
    }
}

export type ResponseHeaders = "checkHSTS"| "checkXFrameOptions"| "checkXContentTypeOptions"| "checkCSP"| "checkReferrerPolicy"| "checkXXSSProtection"| "checkSecureCookies";

export type HeaderSecureCheck = {
    responseResults: {
        [key in ResponseHeaders]: {
            status: "missing"|"secure"|"insecure"|"present"|"error",
            message: string
            header: string | null
        }
    }
}

export type GetDNSInfoResponse = {
    family: number,
    address: string,
}