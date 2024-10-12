import * as React from 'react';

type Props = {
    clientId: string;
};

export function DatabaseScanPage(props: Props) {
    return (
        <div className={"w-full h-full flex flex-col gap-10 pb-24"}>
            <div className={'w-full flex flex-col gap-5'}>
                 <span className="flex flex-col gap-2">
                    <p className={"text-3xl font-semibold"}>Quét lỗ hổng bảo mật injection</p>
                    <p className={"text-xl text-zinc-400"}>
                       Nhập thông số và xem kết quả dưới đây
                    </p>
                </span>
            </div>
        </div>
    );
};