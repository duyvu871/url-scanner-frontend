import React, {useEffect, useLayoutEffect} from 'react';
import {useAtom} from "jotai/index";
import {clientStatusAtom, screenshotAtom} from "src/states/target-page";
import Image from "next/image";
import Link from "next/link";
import RotateLoader from "src/components/Loader/spinner";
import {MdOutlineFileDownload} from "react-icons/md";

function Screenshot() {
    const [screenshot ,] = useAtom(screenshotAtom);
    const [clientStatus,] = useAtom(clientStatusAtom);
    const [image, setImage] = React.useState<string | null>(null);
    const [isPreventDownload, setIsPreventDownload] = React.useState<boolean>(false);
    const resolveScreenshotPath = (path: string) => {
        return `/${path}`//`/api/image-proxy?url=${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
    }

    const downloadScreenshot = () => {
        if (!image) return;
        if (isPreventDownload) return;
        const a = document.createElement('a');
        a.href = image || '';
        a.download = 'screenshot.png';
        a.click();
        setIsPreventDownload(true);
        setTimeout(() => {
            setIsPreventDownload(false);
        }, 2000);
    }

    useLayoutEffect(() => {
        screenshot?.path && setImage(resolveScreenshotPath(screenshot.path));
    }, [screenshot]);

    return (
        <div className={"flex flex-col bg-zinc-950 rounded-xl border border-zinc-700 overflow-hidden"}>
            <div className={"flex justify-between px-4 py-4 w-full border-b border-zinc-700"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"w-full font-semibold uppercase"}>Ảnh xem trước của trang web</div>
                    <div className={"flex justify-start items-center gap-2"}>
                        <span className={"text-sm text-zinc-600 dark:text-zinc-200"}>Trang web: </span>
                        <Link href={clientStatus?.url || '/'} passHref>
                            <span className={"text-xs text-blue-400 underline"}>{clientStatus?.url}</span>
                        </Link>
                    </div>
                </div>
                <div className={""}>
                    <div onClick={downloadScreenshot} className={"w-12 h-12 transition-colors cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex justify-center items-center bg-zinc-100 dark:bg-zinc-950 rounded-lg"}>
                        <MdOutlineFileDownload className={"text-zinc-700 dark:text-zinc-100 text-2xl"} />
                    </div>
                </div>
            </div>
            <div className={""}>
                {!screenshot?.path && <RotateLoader/>}
                {image && (
                    <Image unoptimized loading={'lazy'} width={1200} height={1400} src={image} alt={"Screenshot"}/>)}
            </div>
        </div>
    );
}

export default Screenshot;