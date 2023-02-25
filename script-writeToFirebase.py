import firebase_admin, os, time, random
from firebase_admin import credentials
from firebase_admin import db
from dotenv import load_dotenv

load_dotenv()           # load environment variables

certificate_path = os.getenv('CERT_PATH')
user_id = os.getenv('USER_ID')
database_url = os.getenv('DATABASE_PATH')

numbers = [str(i) for i in range(10)]
alphabets = [chr(i)+chr(i).lower() for i in range(65, 91)]
allCharacters = ''.join(alphabets) + ''.join(numbers)

class DB_connection:

    def __init__(self):
        # initialize credentials
        cred = credentials.Certificate(certificate_path)
        firebase_admin.initialize_app(cred,
            {
                'databaseURL': database_url
            }
        )
        self.ref = db.reference('/')

    # fall_detected: boolean; to differentiate true positive and false positive
    # time which fall is detected: string value
    def write_to_realtime_db(self, fall_detected, time):
        device_id = "yyy"
        entry_ref = self.ref.child(user_id)
        device_ref = entry_ref.child(device_id)
        fall_id = ''.join([random.choice(allCharacters) for i in range(20)])
        fall_ref = device_ref.child(fall_id)
        fall_ref.child("Time").set(time)
        fall_ref.child("isFall").set(fall_detected)
        
# for debugging purposes
if __name__ == "__main__":
    test = DB_connection()
    test.write_to_realtime_db(True, time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))