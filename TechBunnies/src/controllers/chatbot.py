import sys
import io
import random
import string
import warnings
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')

comment = sys.argv[1]
import nltk
from nltk.stem import WordNetLemmatizer
nltk.download('popular', quiet=True)  # For downloading packages

# Uncomment the following only the first time
# nltk.download('punkt')  # First-time use only
# nltk.download('wordnet')  # First-time use only

# Data structure to store description-lawyer pairs
description_lawyer_pairs = {
    "Personal Injury Lawyer": "A personal injury lawyer specializes in cases where individuals have been physically or psychologically harmed due to the negligence or intentional actions of others. They help clients seek compensation for injuries resulting from accidents such as car crashes, slip and falls, medical malpractice, and workplace incidents.",
    "Criminal Defense Lawyer": "Criminal defense lawyers defend individuals facing criminal charges. They ensure that their clients' constitutional rights are protected throughout the legal process. Defense lawyers investigate cases, build legal strategies, negotiate plea bargains, and represent clients in trials.",
    "Estate Planning Lawyer": "Estate planning lawyers assist individuals in planning for the distribution of their assets and property after their death. They create legally binding documents such as wills and trusts to ensure that the deceased's wishes are carried out. These lawyers also provide guidance on minimizing estate taxes and avoiding probate, helping clients protect their legacies.",
    "Employment Lawyer": "Employment lawyers specialize in labor and employment law. They represent both employees and employers in various workplace-related disputes. These disputes can include cases of workplace discrimination, wrongful termination, wage disputes, and compliance with labor laws.",
    "Real Estate Lawyer": "Real estate lawyers handle legal matters related to property transactions. They assist clients in buying, selling, leasing, or developing real estate. These lawyers review contracts, negotiate terms, conduct title searches, and ensure that all legal requirements are met during property transactions.",
    "Intellectual Property Lawyer": "Intellectual property lawyers protect the intellectual property rights of individuals and businesses. They work with patents, trademarks, copyrights, and trade secrets. These lawyers help clients secure their intellectual property through registration and provide legal recourse if someone infringes upon those rights.",
    "Bankruptcy Lawyer": "Bankruptcy lawyers specialize in cases where individuals or businesses are facing overwhelming debt and financial insolvency. They guide clients through the bankruptcy process, whether it's Chapter 7 (liquidation) or Chapter 13 (restructuring). Bankruptcy lawyers help clients eliminate or manage debt while adhering to bankruptcy laws.",
    "Family Lawyer": "Family lawyers handle legal matters related to family relationships and domestic issues. Their cases can include divorce, child custody and visitation, adoption, spousal support, and domestic violence cases. Family lawyers work to protect the rights and interests of their clients during emotionally challenging situations.",
    "Tax Lawyer": "Tax lawyers assist clients with complex tax issues. They provide guidance on tax planning, tax compliance, and resolving disputes with tax authorities. These lawyers help individuals and businesses navigate the intricacies of tax law to minimize tax liabilities and ensure legal tax practices.",
    "Environmental Lawyer": "Environmental lawyers focus legal matters related to environmental protection, conservation, and sustainability. They may handle cases involving pollution, land use, natural resource management, and compliance with environmental regulations. These lawyers work to protect the environment and address legal issues related to environmental harm.",
    "Immigration Lawyer": "Immigration lawyers help individuals and families navigate immigration law. They assist with visa applications, green card petitions, citizenship applications, deportation defense, and asylum cases. Immigration lawyers play a crucial role in helping people achieve legal immigration status.",
    "Business Lawyer": "Business lawyers provide legal counsel to businesses on a wide range of issues. They draft and review contracts, advise on corporate governance, handle mergers and acquisitions, and protect intellectual property. These lawyers help businesses operate within the boundaries of the law and minimize legal risks."
}

# Preprocessing
lemmer = WordNetLemmatizer()
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Generating response
def find_lawyer(user_response):
    user_response = user_response.lower()
    matching_lawyers = {}

    for description, lawyer in description_lawyer_pairs.items():
        # Tokenize hoga idhar
        desc_tokens = set(nltk.word_tokenize(description.lower()))
        user_tokens = set(nltk.word_tokenize(user_response))
        
        # checks partia;l words too
        if any(user_token in desc_token for user_token in user_tokens for desc_token in desc_tokens):
            matching_lawyers[lawyer] = matching_lawyers.get(lawyer, []) + [description]

    if matching_lawyers:
        return matching_lawyers
    else:
        return "I couldn't find a suitable lawyer for your request."

print("Thanks for using our service. We are here to help you find a suitable lawyer.")



matching_lawyers = find_lawyer(comment)

if isinstance(matching_lawyers, str):
    print(matching_lawyers)
else:
    categories = list(matching_lawyers.keys())
    print(f"These are the suitable lawyers for your query: {', '.join(categories)}")
    for category, descriptions in matching_lawyers.items():
        print(f"{category}: {', '.join(descriptions)}")
