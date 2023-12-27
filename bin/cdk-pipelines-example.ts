#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelinesExamplePipelineStack } from '../lib/cdk-pipelines-example-pipeline-stack';
import { getConfig } from '../config';


const config = getConfig();

const env: cdk.Environment = {
    account: config.CDK_DEFAULT_ACCOUNT,
    region: config.CDK_DEFAULT_REGION
}

const app = new cdk.App();
new CdkPipelinesExamplePipelineStack(app, 'CdkPipelinesExampleStack', {
    env
});

app.synth();