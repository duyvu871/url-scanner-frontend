import React, {useEffect} from 'react';
import {useAtom} from "jotai/index";
import {clientStatusAtom, dnsInfoAtom, headerCheckAtom} from "src/states/target-page";
import {useScore} from "src/hooks/useScore";
import {headerStatusScore} from "src/utils/header-score";
import {cn} from "src/utils/tailwind";
import Link from "next/link";
import useUID from "src/hooks/useUID";
import {scoreLabel} from "src/global/contants/score-label";

const scoreLabelStyle = {
    "F": {
        color: "text-red-500",
        bg: "bg-red-500"
    },
    "D": {
        color: "text-yellow-500",
        bg: "bg-yellow-500"
    },
    "C": {
        color: "text-yellow-300",
        bg: "bg-yellow-300"
    },
    "B": {
        color: "text-green-500",
        bg: "bg-green-500"
    },
    "A": {
        color: "text-green-300",
        bg: "bg-green-300"
    }
}

const familyLabel = {
    4: "IPv4",
    6: "IPv6"
}

type ScoreLabel = keyof typeof scoreLabelStyle;

function Report() {
    const [headerCheck] = useAtom(headerCheckAtom);
    const [clientStatus] = useAtom(clientStatusAtom);
    const [dnsInfo] = useAtom(dnsInfoAtom);

    const [label, setLabel] = React.useState<ScoreLabel>("A");
    const [score, setScore] = React.useState(0);

    const [genID] = useUID();
    const {getScore} = useScore({
        "F": [0, 0.5],
        "D": [0.6, 1.2],
        "C": [1.3, 3.4],
        "B": [3.5, 8.9],
        "A": [9, 10]
    });
    useEffect(() => {
        if (headerCheck) {
            const scores = Object.values(headerCheck.responseResults).map(value => headerStatusScore[value.status] || 0);
            const {label, score} = getScore(scores);
            console.log(scores, label, score);
            setLabel(label);
            setScore(score);
        }
    }, [headerCheck]);
    return (
        <div className={"flex flex-col bg-zinc-950 rounded-xl border border-zinc-700 overflow-hidden"}>
            <div className={cn("flex flex-col gap-2 w-full px-4 py-4 border-b border-zinc-700", scoreLabelStyle[label].bg)}>
                <div className={"w-full font-semibold text-md uppercase"}>Báo cáo bảo mật</div>
            </div>
            <div className={"w-full flex flex-col sm:flex-row justify-start gap-5 p-5"}>
                <div className={"flex sm:flex-col gap-5"}>
                    <div className={cn("w-20 h-20 aspect-square md:w-32 md:h-32 rounded-lg flex justify-center items-center", scoreLabelStyle[label].bg )}>
                        <span className={"text-6xl md:text-9xl font-semibold"}>{label}</span>
                    </div>
                    <div className={cn("flex flex-col justify-center items-start", scoreLabelStyle[label].color )}>
                        <span className={"text-xl md:text-2xl font-bold"}>{scoreLabel[label].label}</span>
                    </div>
                </div>

                <div className={"flex flex-col gap-2"}>
                    <table className={"w-full h-full p-0 border-spacing-0 table-fixed"}>
                        <colgroup>
                            <col className={"w-[30%]"}/>
                            <col className={"w-[70%]"}/>
                        </colgroup>
                        <tbody className={"w-full align-baseline"}>
                        <tr
                            className={"border-b dark:border-zinc-800 border-zinc-200 align-baseline text-left"}>
                            <th className={"text-xs md:text-sm py-3 px-2 md:pl-6 text-wrap hyphens-auto align-middle"}>Trang:</th>
                            <td className={"text-xs md:text-sm py-3 px-2 break-words hyphens-auto text-zinc-200"}>
                                <Link href={clientStatus?.url || ""} passHref
                                      className={"text-xs md:text-medium text-blue-500 hover:underline"}>{clientStatus?.url}</Link>
                            </td>
                        </tr>
                        <tr
                            className={"border-b dark:border-zinc-800 border-zinc-200 align-baseline text-left"}>
                            <th className={"text-xs md:text-sm py-3 px-2 md:pl-6 text-wrap hyphens-auto align-middle"}>
                                Địa chỉ IP:{dnsInfo && `[${familyLabel[dnsInfo.family as 4 | 6]}]`}
                            </th>
                            <td className={"text-xs md:text-sm py-3 px-2 break-words hyphens-auto text-zinc-200"}>
                                <Link href={clientStatus?.url || ""} passHref
                                      className={"text-xs md:text-medium text-blue-500 hover:underline"}>{dnsInfo?.address}</Link>
                            </td>
                        </tr>
                        <tr
                            className={"border-b dark:border-zinc-800 border-zinc-200 align-baseline text-left"}>
                            <th className={"text-xs md:text-sm py-3 px-2 md:pl-6 text-wrap hyphens-auto align-middle"}>
                                Thời gian tạo:
                            </th>
                            <td className={"text-xs md:text-sm py-3 px-2 break-words hyphens-auto text-zinc-200"}>
                                <span className={"text-xs md:text-medium text-blue-500 hover:underline"}>
                                    {clientStatus?.timestamp && new Date(clientStatus.timestamp).toLocaleString()}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <span
                        className={"text-[10px] md:text-xs text-zinc-600 dark:text-zinc-300"}>{scoreLabel[label].message}</span>

                </div>
            </div>
        </div>
    );
}

export default Report;