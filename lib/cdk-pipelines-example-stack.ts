import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface CdkPipelinesExampleStackProps extends cdk.StackProps {
  stageName?: string;
}

export class CdkPipelinesExampleStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props: CdkPipelinesExampleStackProps) {
    super(scope, id, props);

    // Lambda function
    const handler = new NodejsFunction(this, 'LamdaHandler',{
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: (path.join(__dirname, '..', 'services', 'handler.ts')),
      environment: {
        STAGE: props.stageName!,
      }
    });

    // API Gateway
    const api = new apigw.LambdaRestApi(this, 'LambdaEndpoint',{
      handler,
      description: 'Endpoint for a simple Lambda-powered web service',
    });
    
    this.urlOutput = new cdk.CfnOutput(this, 'Url', {
      value: api.url,
    });
  }
}
