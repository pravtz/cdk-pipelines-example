import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkPipelinesExampleStack extends cdk.Stack {
  public readonly urlOutput: cdk.CfnOutput;


  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const handler = new lambda.Function(this, 'LamdaHandler',{
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
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
