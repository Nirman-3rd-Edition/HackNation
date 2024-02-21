import boto3
import pandas as pd
import time


# AWS credentials and region
aws_access_key_id = "AKIAUXMPV3WBEUYFNTVT"
aws_secret_access_key = "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"
region_name = "ap-south-1"


# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=region_name)

def do_scan_table():
    # Specify the table name
    table_name = "wx_data"

    # Access the DynamoDB table
    table = dynamodb.Table(table_name)

    # Perform the table scan
    response = table.scan()
    result = response['Items']

    # Continue scanning if there are more items
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        result.extend(response['Items'])

    return result

while True:
    # Perform the table scan
    response = do_scan_table()

    # Convert the response to a DataFrame
    data = pd.DataFrame(response)

    # Append data to the CSV file (mode='a' for append)
    data.to_csv("data.csv", mode='w', index=False, header=False)

    # Wait for 5 seconds before the next scan
    time.sleep(5)