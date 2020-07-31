import json
import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):

    s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))
    sns = boto3.resource('sns')

    location = {
        "bucketName":'springboot-codepipelines3bucket',
        "objectKey": 'portfoliobuilds'
    }

    try:
        job = event.get("CodePipeline.job")

        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "portfoliobuilds" :
                    location = artifact["location"]["s3Location"]

        print "Building portfolio from " + str(location)
        topic = sns.Topic('arn:aws:sns:us-east-1:400010474826:PortfolioDeployment')
        portfolio_bucket = s3.Bucket('portfolio.shwetamandavgane.net')
        build_bucket = s3.Bucket(location["bucketName"])

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location["objectKey"],portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj,nm,ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        topic.publish(Subject="Portfolio Deployment Successful",Message="Portfolio was deployed successfully")
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject="Portfolio Deployment Failed",Message="Portfolio updated deployment failed ")
        raise

    return "Files uploaded"
