import boto3

topic_arn = "arn:aws:sns:us-east-1:683962740979:main_sns"
def send_sns(message, subject):
    try:
        client = boto3.client("sns")
        result = client.publish(TopicArn=topic_arn, Message=message, Subject=subject)
        if result['ResponseMetadata']['HTTPStatusCode'] == 200:
            print(result)
            print("Notification send successfully..!!!")
            return True
    except Exception as e:
        print("Error occured while publish notifications and error is : ", e)
        return True 

def lambda_handler(event, context):
    print("Event collected: {}".format(event))
    for record in event['Records']:
        if record['eventName'] == 'INSERT':  # Check for specific DynamoDB event
            # Process the inserted record from DynamoDB event
            dynamodb_record = record['dynamodb']['NewImage']
            # Extract necessary data from the record
            
            # Create a message for notification
            message = "Alert EMERGENCY ALERT: Natural Calamity 🚨{} Seek immediate shelter and safety. Follow local authorities' instructions. Stay Safe.".format(dynamodb_record)
            subject = "New DynamoDB Data Added"
            
            # Send notification
            sns_result = send_sns(message, subject)
            if sns_result:
                print("Notification sent.")
                return "Success"
            else:
               return "Failed"