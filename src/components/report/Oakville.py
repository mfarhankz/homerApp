from pymongo import MongoClient
from pymongo.server_api import ServerApi
import logging
import re
from collections import Counter

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def analyze_numeric_regions():
    # MongoDB connection
    uri = "mongodb+srv://admin:LyWjFL7pi8B1dqkt@homerai-dev.skzxg.mongodb.net/?retryWrites=true&w=majority&appName=homerai-dev"
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["homer-ai-dev"]
    collection = db["ListingsCleaned"]
    
    try:
        # Find all listings where CityRegion starts with a number
        pipeline = [
            {
                "$match": {
                    "CityRegion": {
                        "$regex": "^[0-9]",  # Matches strings that start with a number
                    }
                }
            },
            {
                "$group": {
                    "_id": "$CityRegion",
                    "count": {"$sum": 1}
                }
            },
            {"$sort": {"_id": 1}}  # Sort alphabetically by CityRegion
        ]
        
        results = list(collection.aggregate(pipeline))
        
        # Log the results
        total_listings = sum(result['count'] for result in results)
        logger.info(f"\nFound {len(results)} CityRegions starting with numbers, with {total_listings} total listings:")
        logger.info("-" * 50)
        
        # Display results
        for result in results:
            region = result['_id'] if result['_id'] is not None else 'No Region Specified'
            count = result['count']
            percentage = (count / total_listings) * 100
            logger.info(f"{region:<40} {count:>5} listings ({percentage:>6.2f}%)")
            
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    finally:
        client.close()
        logger.info("\nDatabase connection closed")

if __name__ == "__main__":
    analyze_numeric_regions()