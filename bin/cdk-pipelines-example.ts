#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelinesExamplePipelineStack } from '../lib/cdk-pipelines-example-pipeline-stack';

const app = new cdk.App();
new CdkPipelinesExamplePipelineStack(app, 'CdkPipelinesExampleStack', {
    env: { account: process.env.CDK_ACCOUNT, region: process.env.CDK_REGION }
});

app.synth();