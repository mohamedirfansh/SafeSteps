import script_writeToFirebase, serial, json, time
from sendToTelegram import sendMsg

dbConnection = script_writeToFirebase.DB_connection()
# ser = serial.Serial('COM4', 9600) # replace 'COM3' with the name of your serial port

# while True:
#     if ser.in_waiting > 0:
#         gesture_data = ser.readline().decode('utf-8').strip()
#         gesture_data_json_object = json.loads(gesture_data)
#         max_gesture_key = max(gesture_data_json_object, key=gesture_data_json_object.get)
#         print(gesture_data_json_object)
#         print(max_gesture_key)
#         if max_gesture_key == "Fall":
#             time_fallen = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
#             dbConnection.write_to_realtime_db("Fall", time_fallen)
#             sendMsg()


time_fallen = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
print(time_fallen)
dbConnection.write_to_realtime_db("Fall", time_fallen)
sendMsg()
