import *  as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path: path.resolve(__dirname, '.env')});

export type GetConfigType= {
    CDK_DEFAULT_ACCOUNT: string,
    CDK_DEFAULT_REGION: string,
}

export const getConfig = (): GetConfigType => {
    return {
        CDK_DEFAULT_ACCOUNT: process.env.CDK_DEFAULT_ACCOUNT || '',
        CDK_DEFAULT_REGION: process.env.CDK_DEFAULT_REGION || 'us-east-1'
    }
}