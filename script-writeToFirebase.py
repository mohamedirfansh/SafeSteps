import firebase_admin, os, time, random
from firebase_admin import credentials
from firebase_admin import db
from dotenv import load_dotenv
import serial
import json


ser = serial.Serial('COM4', 9600) # replace 'COM3' with the name of your serial port

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
        device_id = "arduino"
        entry_ref = self.ref.child(user_id)
        device_ref = entry_ref.child(device_id)
        fall_id = ''.join([random.choice(allCharacters) for i in range(20)])
        fall_ref = device_ref.child(fall_id)
        fall_ref.child("Time").set(time)
        fall_ref.child("isFall").set(fall_detected)
        
# for debugging purposes
if __name__ == "__main__":
    test = DB_connection()
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