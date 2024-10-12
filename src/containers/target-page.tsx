"use client";
import React, {useLayoutEffect} from 'react';
import {useAtom} from "jotai";
import {
    clientIdAtom,
    clientStatusAtom,
    dnsInfoAtom,
    screenshotAtom,
    sslReportAtom,
    technologiesAtom
} from "src/states/target-page";
import axios from "src/lib/axios";
import TechnologiesList from "src/components/ScanSections/technologies-list";
import Screenshot from "src/components/ScanSections/screenshot";
import HeaderSecure from "src/components/ScanSections/header-secure";
import Report from "src/components/ScanSections/report";
import {SSLReport} from "src/components/ScanSections/check-ssl";

interface TargetPageProps {
    clientId: string;
};

function TargetPage({clientId}: TargetPageProps) {
    const [, setClient] = useAtom(clientIdAtom);
    const [, setTechnologies] = useAtom(technologiesAtom);
    const [, setScreenshot] = useAtom(screenshotAtom);
    const [, setClientStatusAtom] = useAtom(clientStatusAtom);
    const [, setDNSInfo] = useAtom(dnsInfoAtom);
    const [, setSSLReport] = useAtom(sslReportAtom);

    const [clientStatus, setClientStatus] = React.useState<{ url: string, status: string, result: any} | null>(null);

    const isMounted = React.useRef(false);

    const checkClientStatus = async (clientId: string) => {
        const response = await fetch(`/api/v1/get-scan-status/${clientId}`);
        const result = await response.json() as { url: string, status: string, result: any, timestamp: number} & { error?: string};
        if (result && !result.error) {
            setClientStatus(result);
            setClientStatusAtom(result);
        }
        return result;
    }

    useLayoutEffect(() => {
        setClient(clientId);
        if (!isMounted.current) {
            checkClientStatus(clientId).then((res) => {
                if (res.error) return;
                (async () => {
                    const sslReport = await axios.v1.getSSLInfo(clientId);
                    if (sslReport && !sslReport?.error) {
                        setSSLReport(sslReport);
                        // console.log(sslReport);
                    }
                    const dnsInfo = await axios.v1.getDNSInfo(clientId);
                    if (dnsInfo && !dnsInfo?.error) {
                        setDNSInfo(dnsInfo);
                        // console.log(dnsInfo);
                    }
                    const technologies = await axios.v1.getTechnologies(clientId);
                    if (technologies && !technologies?.error) {
                        setTechnologies(technologies);
                        // console.log(technologies);
                    }
                    const screenshot = await axios.v1.takeScreenshot(clientId);
                    const screenshotPath = screenshot?.path;
                    if (screenshotPath && !screenshot?.error) {
                        setScreenshot({path: screenshotPath});
                        // console.log(screenshotPath);
                    }
                })();
            });
        }
        isMounted.current = true;
    }, [clientId]);

    return (
        <div className={"w-full h-full flex flex-col gap-10 pb-24"}>
            <div className={'w-full flex flex-col gap-5'}>
                 <span className="flex flex-col gap-2">
                    <p className={"text-3xl font-semibold"}>Kết quả phân tích</p>
                    <p className={"text-lg text-zinc-400"}>
                        Xem quá trình phân tích và kết quả của bạn
                    </p>
                </span>
            </div>
            {clientStatus?.url ? (
                <>
                    <Report />
                    <SSLReport/>
                    <TechnologiesList/>
                    <Screenshot/>
                    <HeaderSecure/>
                </>
            ) : (
                <div>
                    <div>Không tim thấy tiến trình chạy</div>
                </div>
            )}
        </div>
    );
}

export default TargetPage;