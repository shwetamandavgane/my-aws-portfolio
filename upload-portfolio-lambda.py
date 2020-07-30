import json
import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes


def lambda_handler(event, context):

    s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))
    sns = boto3.resource('sns')

    try:
        topic = sns.Topic('arn:aws:sns:us-east-1:400010474826:PortfolioDeployment')
        portfolio_bucket = s3.Bucket('portfolio.shwetamandavgane.net')
        build_bucket = s3.Bucket('springboot-codepipelines3bucket')

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuilds',portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj,nm,ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        topic.publish(Subject="Portfolio Deployment Successful",Message="Portfolio was deployed successfully")
    except:
        topic.publish(Subject="Portfolio Deployment Failed",Message="Portfolio updated deployment failed ")
        raise

    return "Files uploaded"
