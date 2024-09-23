import React from 'react';
import Link from "next/link";
import CodeBlockShell from "src/components/Hightlight/shell";
import {GetHeadersResponse, HeaderSecureCheck} from "src/types/services/api";
import {useAtom} from "jotai/index";
import {clientIdAtom} from "src/states/target-page";
import Markdown from "src/components/Markdown";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "src/components/ui/accordion";
import RotateLoader from "src/components/Loader/spinner";
import useUID from "src/hooks/useUID";

function HeaderSecure() {
    const [clientId, ] = useAtom(clientIdAtom);
    const [genID] = useUID();

    const [show, setShow] = React.useState(false);
    const [headers, setHeaders] = React.useState<GetHeadersResponse | null>(null);
    const [headerCheck, setHeaderCheck] = React.useState<HeaderSecureCheck | null>(null);
    const toggleShow = () => setShow(!show);
    const fetchHeaders = async () => {
        const response = await fetch(`/api/v1/get-headers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({clientId})
        });
        const result = await response.json() as GetHeadersResponse & { error?: string};
        if (result && !result.error) {
            setHeaders(result);
        }
    }
    const fetchHeaderCheck = async () => {
        const response = await fetch(`/api/v1/check-headers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({clientId})
        });
        const result = await response.json() as HeaderSecureCheck & { error?: string};
        if (result && !result.error) {
            setHeaderCheck(result);
        }
    }

    React.useEffect(() => {
        (async () => {
            await fetchHeaders();
            await fetchHeaderCheck();
        })();
    }, [clientId]);

    return (
        <div className={"flex flex-col bg-zinc-950 rounded-xl border border-zinc-700 overflow-hidden"}>
            <div className={"flex flex-col gap-2 w-full px-4 py-4 border-b border-zinc-700"}>
                <div className={"w-full font-semibold uppercase"}>Security Headers
                </div>
                <div>
                    <span className={"text-zinc-300 text-xs italic"}>Request/Response</span>
                </div>
            </div>
            {headers ? (
                <>
                    <div className={"border-b border-zinc-400"}>
                        <Markdown>{'```shell\n'+ (headers?.headers.responseStatusLine) + '\n```'}</Markdown>
                    </div>
                    <div>
                        <Markdown>{'```shell\n'+ (headers.headers.requestHeaders.join("\n")) + '\n```'}</Markdown>
                    </div>
                </>
            ): <RotateLoader />}
            {headerCheck ? (
                <div>
                    <Accordion type="single" collapsible className="w-full p-4">
                        {Object.keys(headerCheck?.results).map((header, index) => (
                            <AccordionItem key={genID()} value={header} className={"border-zinc-800"}>
                                <AccordionTrigger className={"capitalize font-semibold"}>{header}</AccordionTrigger>
                                <AccordionContent>
                                    {headerCheck.results[header as keyof HeaderSecureCheck['results']]}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ): <RotateLoader />}
        </div>
    );
}

export default HeaderSecure;