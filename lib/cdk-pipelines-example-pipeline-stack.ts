import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipelineSource, ShellStep, CodePipeline } from 'aws-cdk-lib/pipelines';
import { CdkPipelinesExampleStage } from './cdk-pipelines-example-stage';


export class CdkPipelinesExamplePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Pipeline
    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'MyPipeline',
        synth: new ShellStep('Synth', {
            input: CodePipelineSource.gitHub('pravtz/cdk-pipelines-example', 'master'),
            commands: ['npm ci', 'npx cdk synth'],
            primaryOutputDirectory: 'cdk.out',

        })
    })
    const testStege = pipeline.addStage(new CdkPipelinesExampleStage(this, 'TestStage', {
      stageName: 'Test',
    }))
  }
}