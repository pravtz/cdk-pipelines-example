import {Stage, StageProps, CfnOutput} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CdkPipelinesExampleStack} from './cdk-pipelines-example-stack'



export class CdkPipelinesExampleStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    const service = new CdkPipelinesExampleStack(this, 'WebService',{
      stageName: props.stageName,
    } );
    
    this.urlOutput = service.urlOutput;
  }
}