"use client";

import * as React from 'react';
import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";

export function SqlScanner({clientId}: {clientId: string}) {
    return (
        <div className={"w-full h-full flex flex-col justify-center gap-10 pb-24"}>
            <div className={'w-full flex flex-col items-center gap-5'}>
                 <span className="flex flex-col gap-2 w-full max-w-xl">
                    <p className={"text-3xl font-semibold"}>Quét lỗ hổng SQL Injection</p>
                     {/*<p className={"text-lg text-zinc-400"}>*/}
                     {/*    Xem quá trình phân tích và kết quả của bạn*/}
                     {/*</p>*/}
                </span>
                <div className={"max-w-xl w-full"}>
                    <Input className={"border-zinc-700 bg-zinc-900"} type="text"
                           placeholder="Url: https://google.com/"/>
                    <div className={"text-lg py-3"}>
                        Tham số tùy chỉnh
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Headers:</span>
                                <Input className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="Authorization: Bearer <token>, ..."/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'Authorization: Bearer <token>'}, {'Content-type: application/*'}
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Params:</span>
                                <Input className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="Authorization: Bearer <token>, ..."/>
                            </div>
                            <div className={"text-xs text-zinc-500"}>
                                (tùy chọn) ví dụ: {'query: 2024'}, {'page: 1'}
                                {' -> query=2024&page=1'}
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Body:</span>
                                <Input className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="Authorization: Bearer <token>, ..."/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'password: 123, username: admin'}
                                hay được dùng cho đăng nhập và các tác vụ cập nhật dữ liệu, tạo mới, xóa
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"flex justify-center items-center w-full gap-2"}>
                                <span className={"text-xs"}>Đường dẫn:</span>
                                <Input className={"border-zinc-700 bg-zinc-900"} type="text"
                                       placeholder="Authorization: Bearer <token>, ..."/>
                            </div>
                            <div className={"text-[12px] text-zinc-500"}>
                                (tùy chọn) ví dụ: {'/api/v1/login'}, {'/api/v1/user'}
                                 {' -> https://google.com/api/v1/login'}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button className={"border-zinc-700 bg-zinc-900 py-2"}>Quét</Button>
                    </div>
                </div>
            </div>
        </div>);
};