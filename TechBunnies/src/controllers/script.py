import pymongo
import sys
from bson import ObjectId
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Replace the "with mongo URI"
client = pymongo.MongoClient('mongodb://localhost:27017')

# Replace "database_1" with the name of the database
db = client['LegalConnect-India']

# Replace "database_1" with the name of the collection
collection = db['comments']

user_id = sys.argv[1]
obj = collection.find_one({"lspId": ObjectId(user_id)})
comments = obj.get("commentText", [])

def ascify(num):
    if num==5:
        return "⭐️⭐️⭐️⭐️⭐️"
    elif num==4:
        return "⭐️⭐️⭐️⭐️"
    elif num==3:
        return "⭐️⭐️⭐️"
    elif num==2:
        return "⭐️⭐️"
    elif num==1:
        return "⭐️"

def analyze_sentiment_nltk(text):
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(text)

    sentiment = get_sentiment(sentiment_scores["compound"])

    analysis_result = {
        "sentiment": sentiment,
        "polarity": sentiment_scores["compound"]
    }

    return analysis_result

def get_sentiment(sentiment_score):
    if sentiment_score >= 0.05:
        return "Positive"
    elif sentiment_score <= -0.05:
        return "Negative"
    else:
        return "Neutral"

def generate_star_rating_nltk(sentiment_score):
    if sentiment_score >= 0.4:
        return "⭐️⭐️⭐️⭐️⭐️"
    elif sentiment_score >= 0.2:
        return "⭐️⭐️⭐️⭐️"
    elif sentiment_score >= 0.05:
        return "⭐️⭐️⭐️"
    elif sentiment_score >= -0.05:
        return "⭐️⭐️"
    else:
        return "⭐️"
    
def generate_star_rating_int(sentiment_score):
    if sentiment_score >= 0.4:
        return 5
    elif sentiment_score >= 0.2:
        return 4
    elif sentiment_score >= 0.05:
        return 3
    elif sentiment_score >= -0.05:
        return 2
    else:
        return 1
    
def runmodel(comment):

        result = analyze_sentiment_nltk(comment)
        star_rating = generate_star_rating_nltk(result["polarity"])
        star_rating_int = generate_star_rating_int(result["polarity"])

        return {
            "sentiment": result["sentiment"],
            "star_rating": star_rating,
            "star_rating_no" : star_rating_int
        }

def analyze_and_update_comments(user_id, comments):
    sentiment_analysis = obj.get("sentiment_analysis", [])
    star_ratings = obj.get("star_ratings", [])
    star_rating_int = obj.get("star_rating_int", [])

    if not comments:
        return

    # Running the model on the last added comment and storing the values returned
    last_comment = comments[-1]
    res = runmodel(last_comment)
    new_sentiment = res["sentiment"]
    new_star_rating = res["star_rating"]
    new_star_rating_int = res["star_rating_no"]

    if len(comments) > 1:
        overall_stars_int = obj.get("overall_stars_int", 0)
        overall_stars_int = (overall_stars_int + new_star_rating_int) // len(comments)
        overall_stars = ascify(overall_stars_int)
    else:
        overall_stars_int = new_star_rating_int
        overall_stars = ascify(overall_stars_int)

    # Add model results to existing lists
    sentiment_analysis.append(new_sentiment)
    star_ratings.append(new_star_rating)
    star_rating_int.append(new_star_rating_int)



    update_operation = {
        "$set": {
            "overall_stars_int": overall_stars_int,
            "overall_stars": overall_stars,
        }
    }

    update_operation_II = {
        "$push": {
            "sentiment_analysis": new_sentiment,
            "star_ratings": new_star_rating,
            "star_rating_int": new_star_rating_int
        }
    }

    # Perform the updates
    try:
    # Perform the updates
        collection.update_one({"lspId": ObjectId(user_id)}, update_operation)
        collection.update_one({"lspId": ObjectId(user_id)}, update_operation_II)
        print("Update successful")
    except Exception as e:
        print(f"Update failed: {str(e)}")


# Call the function to analyze and update comments
analyze_and_update_comments(user_id, comments)