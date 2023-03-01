import firebase_admin, os, time, random, json, serial
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore 
from dotenv import load_dotenv

load_dotenv()           # load environment variables

certificate_path = os.getenv('CERT_PATH')
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
        firestoreDB = firestore.client()
        self.db_ref = firestoreDB.collection('Users')

    # fall_detected: boolean; to differentiate true positive and false positive
    # time which fall is detected: string value
    def write_to_realtime_db(self, fall_detected, time):
        device_id = "yyy"
        data = self.db_ref.where('DeviceID', '==', device_id).stream()
        # for tmp in data:
        #     print(tmp)
        #     user_id = tmp.get('UserID')
        # print("Debug")
        entry_ref = self.ref.child("QtC8bjpq2EUreDk27XNnBTTdUvg1")
        device_ref = entry_ref.child(device_id)
        fall_id = ''.join([random.choice(allCharacters) for i in range(20)])
        fall_ref = device_ref.child(fall_id)
        fall_ref.child("Time").set(time)
        fall_ref.child("isFall").set(fall_detected)
        
# for debugging purposes
if __name__ == "__main__":
    test = DB_connection()
    ser = serial.Serial('COM4', 9600) # replace 'COM3' with the name of your serial port

    counter = 0
    while True:
        if ser.in_waiting > 0:
            print("--------------------")
            gesture_data = ser.readline().decode('utf-8').strip()
            gesture_data_json_object = json.loads(gesture_data)
            max_gesture_key = max(gesture_data_json_object, key=gesture_data_json_object.get)
            # Find maximum value
            max_gesture_value = gesture_data_json_object[max_gesture_key]
            
            print(gesture_data_json_object)
            print("Identified Gesture: " + max_gesture_key + " with value: " + max_gesture_value)
            print("--------------------")
        
            test.write_to_realtime_db(True, time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
            counter += 1
        
        if counter > 10:
            break