import serial

ser = serial.Serial('COM4', 9600) # replace 'COM3' with the name of your serial port
dataFile = open('fall_21.csv', 'w+')

dataFile.write('aX,aY,aZ,gX,gY,gZ\n')
while True:
    if ser.in_waiting > 0:
        data = ser.readline().decode('utf-8').strip()
        dataFile.write(data + '\n')
        print(data)