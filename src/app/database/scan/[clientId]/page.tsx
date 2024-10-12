// @flow
import * as React from 'react';
import {DatabaseScanPage} from "src/containers/database-scan-page";

type Props = {
    params: {
        clientId: string;
    };
};

export function Page(props: Props) {
    return (
       <DatabaseScanPage clientId={props.params.clientId} />
    );
};