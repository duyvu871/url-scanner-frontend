import React from 'react';
import {useAtom} from "jotai/index";
import {clientStatusAtom, screenshotAtom} from "src/states/target-page";
import Image from "next/image";
import Link from "next/link";
import RotateLoader from "src/components/Loader/spinner";

function Screenshot() {
    const [screenshot ,] = useAtom(screenshotAtom);
    const [clientStatus,] = useAtom(clientStatusAtom);

    const resolveScreenshotPath = (path: string) => {
        return `/api/image-proxy?url=${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
    }

    return (
        <div className={"flex flex-col bg-zinc-950 rounded-xl border border-zinc-700 overflow-hidden"}>
            <div className={"flex flex-col gap-2 w-full px-4 py-4 border-b border-zinc-700"}>
                <div className={"w-full font-semibold uppercase"}>Page screenshot
                </div>
                <div>
                    <Link href={clientStatus?.url || '/'} passHref>
                        <span className={"text-xs text-blue-400 underline"}>{clientStatus?.url}</span>
                    </Link>
                </div>
            </div>
            <div className={""}>
                {!screenshot?.path && <RotateLoader />}
                {screenshot?.path && (<Image unoptimized loading={'lazy'} width={1200} height={1400} src={resolveScreenshotPath(screenshot.path)} alt={"Screenshot"}/>)}
            </div>
        </div>
    );
}

export default Screenshot;