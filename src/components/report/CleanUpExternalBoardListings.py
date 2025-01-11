from pymongo import MongoClient
from pymongo.server_api import ServerApi
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def remove_numeric_regions():
    # MongoDB connection
    uri = "mongodb+srv://admin:LyWjFL7pi8B1dqkt@homerai-dev.skzxg.mongodb.net/?retryWrites=true&w=majority&appName=homerai-dev"
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["homer-ai-dev"]
    collection = db["ListingsCleaned"]
    
    try:
        # First, let's count how many documents we'll be removing
        count_query = {
            "CityRegion": {
                "$regex": "^[0-9]"  # Matches strings that start with a number
            }
        }
        
        count_to_remove = collection.count_documents(count_query)
        logger.info(f"Found {count_to_remove} documents to remove")
        
        # Get a sample of documents that will be removed (for verification)
        sample_docs = list(collection.find(count_query).limit(5))
        logger.info("\nSample of documents to be removed:")
        for doc in sample_docs:
            logger.info(f"ID: {doc.get('_id')}, CityRegion: {doc.get('CityRegion')}")
        
        # Ask for confirmation
        confirmation = input("\nDo you want to proceed with removal? (yes/no): ")
        
        if confirmation.lower() == 'yes':
            # Perform the deletion
            result = collection.delete_many(count_query)
            logger.info(f"\nSuccessfully removed {result.deleted_count} documents")
        else:
            logger.info("\nOperation cancelled")
            
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    finally:
        client.close()
        logger.info("\nDatabase connection closed")

if __name__ == "__main__":
    remove_numeric_regions()