#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelinesExampleStack } from '../lib/cdk-pipelines-example-stack';

const app = new cdk.App();
new CdkPipelinesExampleStack(app, 'CdkPipelinesExampleStack', {
    env: { account: process.env.CDK_ACCOUNT, region: process.env.CDK_REGION }
});