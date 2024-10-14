"use client";

import * as React from 'react';
import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {ScanProgress, ScanResult} from "src/types/services/api";
import Terminal from "src/components/terminal";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from 'src/components/ui/select';
import useUID from "src/hooks/useUID";
import {useToast} from "src/hooks/useToast";

export function SqlScanner({clientId}: {clientId: string}) {
    const [scanning, setScanning] = useState<boolean>(false);
    const {error: showError} = useToast()

    const ioRef = useRef<Socket | null>(null);
    const isMounted = useRef<boolean>(false);
    const [content, setContent] = React.useState< {
        request: string;
        response: string;
    }[]>([]);
    const [method, setMethod] = React.useState("get");
    const [genUID] = useUID();
    const [url, setUrl] = React.useState<string>('');
    const [headers, setHeaders] = React.useState<string>('');
    const [params, setParams] = React.useState<string>('');
    const [body, setBody] = React.useState<string>('');
    const [path, setPath] = React.useState<string>('');


    const appendContent = (data: {
        request: string;
        response: string;
    }) => {
        setContent((prev) => [...prev, data]);
    }

    const startScan = () => {
        if (ioRef.current) {
            console.log('start scan');
            console.log(ioRef.current)
            ioRef.current.emit('start_sql_injection_scan', JSON.stringify({
                url,
                method,
                headers,
                params,
                body,
                path
            }));
            // ioRef.current.on('start_sql_injection_scan', (data: {
            //     request: string;
            //     response: string;
            // }) => {
            //     appendContent(data);
            // });
        }
    }

    const fillExample = () => {
        setUrl('https://kenh14.vn/tim-kiem.chn');
        setMethod('get');
        setParams('keyword: đất đai')
    }

    useEffect(() => {
        // if (isMounted.current) {
            ioRef.current = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
                transports: ["websocket"], // use websocket only
                addTrailingSlash: false, // remove trailing slash
                path: '/socket/feature/sql-injection',
            });

            ioRef.current.on('connect', () => {
                console.log('socket connected');
            });

            ioRef.current.on('disconnect', () => {
                console.log('socket disconnected');
            });
            ioRef.current.on('connect_error', (error) => {
                showError('Lỗi kết nối Socket.IO, vui lòng refresh lại trang');
                console.error('Lỗi kết nối Socket.IO:', error);
            });
            ioRef.current.on('complete', (data: ScanResult['result']) => {

                // setScanCompleteResult({
                //     result: data
                // });
                console.log('complete', data);
            });
            ioRef.current.on('progress', (progress) => {
                appendContent(progress);
                console.log('progress:', progress);
            });
        // }
        isMounted.current = true;

        return () => {
            if (ioRef.current) {
                ioRef.current.disconnect();
            }
        }
    }, []);

    return (
        <div className={"w-full h-full flex flex-col justify-center gap-10 pb-24"}>
            <div className={'w-full flex flex-col items-center gap-5'}>
                 <span className="flex flex-col gap-2 w-full max-w-xl">
                    <p className={"text-3xl font-semibold"}>Quét lỗ hổng SQL Injection</p>
                     {/*<p className={"text-lg text-zinc-400"}>*/}
                     {/*    Xem quá trình phân tích và kết quả của bạn*/}
                     {/*</p>*/}
                </span>
                <div>
                    <Button onClick={fillExample}  className={"w-full max-w-lg border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors py-5"}>Sử dụng ví dụ</Button>
                </div>
                <div className={"max-w-xl w-full"}>
                    <Input
                        value={url}
                        onChange={(text) => {
                            setUrl(text.target.value)
                        }}
                        className={"border-zinc-700 bg-zinc-900"} type="text"
                           placeholder="Url: https://google.com/"/>
                    <div className={"text-lg py-3"}>
                        Tham số tùy chỉnh
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <div>
                            <span className={"text-xs"}>Method:</span>
                            <Select defaultValue="get" value={method} onValueChange={(v) => {
                                setMethod(v);
                                console.log(v)
                            }}>
                                <SelectTrigger className="w-[180px] border-zinc-700">
                                    <SelectValue placeholder="Chọn phương thức"/>
                                </SelectTrigger>
                                <SelectContent className={"bg-zinc-900 border-zinc-700"}>
                                    {/*<SelectGroup>*/}
                                    {/*    <SelectLabel>Phương thức</SelectLabel>*/}
                                    <SelectItem value="get">GET</SelectItem>
                                    <SelectItem value="post">POST</SelectItem>
                                    <SelectItem value="update">UPDATE</SelectItem>
                                    <SelectItem value="put">PUT</SelectItem>
                                    <SelectItem value="options">OPTIONS</SelectItem>
                                    {/*</SelectGroup>*/}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Headers:</span>
                                <Input
                                    value={headers}
                                    onChange={(text) => {
                                        setHeaders(text.target.value)
                                    }}
                                    className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="Authorization: Bearer <token>, ..."/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'Authorization: Bearer <token>'}, {'Content-type: application/*'}
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Params:</span>
                                <Input
                                    value={params}
                                    onChange={(text) => {
                                        setParams(text.target.value)
                                    }}
                                    className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="query: 2024, page: 1..."/>
                            </div>
                            <div className={"text-xs text-zinc-500"}>
                                (tùy chọn) ví dụ: {'query: 2024'}, {'page: 1'}
                                {' -> query=2024&page=1'}
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Body:</span>
                                <Input
                                    value={body}
                                    onChange={(text) => {
                                        setBody(text.target.value)
                                    }}
                                    className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="password: 123, username: admin"/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'password: 123, username: admin'}
                                hay được dùng cho đăng nhập và các tác vụ cập nhật dữ liệu, tạo mới, xóa
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Đường dẫn:</span>
                                <Input
                                    value={path}
                                    onChange={(text) => {
                                        setPath(text.target.value)
                                    }}
                                    className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="/api/v1/login"/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'/api/v1/login'}, {'/api/v1/user'}
                                {' -> https://google.com/api/v1/login'}
                            </div>
                        </div>
                    </div>
                    <div className={"my-5"}>
                        <Button
                            onClick={startScan}
                            className={"w-full max-w-lg border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-colors py-5"}>Quét</Button>
                    </div>
                </div>
                <div className={"w-full max-w-xl"}>
                    <div
                        className="flex flex-col h-fit w-full max-w-2xl bg-[#1e1e1e] rounded-lg overflow-hidden font-mono text-white">
                        <div className="flex-1 overflow-auto p-4">
                            <div className="space-y-2 w-fit">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#9cdcfe] text-sm">user@terminal</span>
                                    <span className="text-[#ce9178] text-sm">~</span>
                                    <span className="animate-blink text-[#d4d4d4] text-sm"></span>
                                </div>
                                {content.slice(content.length - 5, content.length - 1).map(({request, response}, index) => (
                                    <>
                                        <div key={genUID()} className="items-center gap-2">
                                            <span className="text-[#9cdcfe] text-xs">$</span>
                                            <span className="text-[#ce9178] text-xs mx-1">~</span>
                                            {/*<span className="animate-blink text-[#d4d4d4]">_</span>*/}
                                            <span className={"text-xs"}>{request}</span>
                                        </div>
                                        <div key={genUID()} className="items-center gap-2">
                                            <span className="text-[#9cdcfe] text-xs">$</span>
                                            <span className="text-[#ce9178] text-xs mx-1">~</span>
                                            {/*<span className="animate-blink text-[#d4d4d4]">_</span>*/}
                                            <span className={"text-xs"}>{response}</span>
                                        </div>
                                    </>
                                ))}
                                <div className="items-center gap-2">
                                    <span className="text-[#9cdcfe] text-xs">$</span>
                                    <span className="text-[#ce9178] text-xs mx-1">~</span>
                                    {/*<span className="animate-blink text-[#d4d4d4]">_</span>*/}
                                    <span className={"text-xs"}>_</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};