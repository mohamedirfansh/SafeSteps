import serial


ser = serial.Serial('COM4', 9600) # replace 'COM3' with the name of your serial port

while True:
    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8').strip()
        print(data)