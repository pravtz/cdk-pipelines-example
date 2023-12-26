import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CdkPipelinesExampleStack} from './cdk-pipelines-example-stack'

export class CdkPipelinesExampleStage extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const service = new CdkPipelinesExampleStack(this, 'WebService');
    
    this.urlOutput = service.urlOutput;
  }
}