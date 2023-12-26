import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class CdkPipelinesExamplePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const sourceArtifact = new codepipeline.Artifact();
    const buildArtifact = new codepipeline.Artifact();

   const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
        pipelineName: 'MyServicePipeline',

        
    });

    // add souurce stage
    pipeline.addStage({
        stageName: 'Source',
        actions: [
            new codepipeline_actions.GitHubSourceAction({
                actionName: 'GitHub',
                output: sourceArtifact,
                oauthToken: cdk.SecretValue.secretsManager('github-token'),
                owner: 'pravtz',
                repo: 'cdk-pipelines-example',
                branch: 'main',
                trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
            }),
        ],
    });

    // add build stage
    pipeline.addStage({
        stageName: 'Build',
        actions: [
            new codepipeline_actions.CodeBuildAction({
                actionName: 'CodeBuild',
                input: sourceArtifact,
                outputs: [buildArtifact],

                project: new codebuild.PipelineProject(this, 'MyProject', {
                    buildSpec: codebuild.BuildSpec.fromObject({
                        version: '0.2',
                        phases: {
                            install: {
                                commands: 'npm install',
                            },
                            build: {
                                commands: 'npm run build',
                            },
                        },
                        artifacts: {
                            'base-directory': 'cdk.out',
                            files: [
                                'CdkPipelinesExampleStack.template.json',
                            ],
                        },
                    }),
                }),

            }),
        ],
    });

    // add deploy stage
    pipeline.addStage({
        stageName: 'Deploy',
        actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
                actionName: 'CFN_Deploy',
                templatePath: buildArtifact.atPath('CdkPipelinesExampleStack.template.json'),
                stackName: 'MyStack',
                adminPermissions: true,
            }),
        ],
    });
  }
}