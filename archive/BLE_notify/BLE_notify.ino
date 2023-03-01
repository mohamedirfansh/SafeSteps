#include <ArduinoBLE.h>
#include <string.h>

BLEService ledService("180B"); // BLE LED Service

BLECharacteristic stringCharacteristic( "2A58", BLERead | BLENotify, "test1");

void setup() {
  Serial.begin(9600);
  while (!Serial);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW); 

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting Bluetooth® Low Energy failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("Darryl Nano 33 BLE Sense");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(stringCharacteristic);

  // add service
  BLE.addService(ledService);

  // set the initial value for the characteristic:
  stringCharacteristic.writeValue("ok");

  // start advertising
  BLE.advertise();

  Serial.println("BLE Sending Data");
}

void loop() {

  String data = "fall";
  byte messageBytes[data.length()+1]; 
  data.getBytes(messageBytes, data.length()+1);
  // listen for Bluetooth® Low Energy peripherals to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());
    digitalWrite(LED_BUILTIN, HIGH);

    // while the central is still connected to peripheral:
    while (central.connected()) {
      stringCharacteristic.writeValue(messageBytes, data.length()+1);
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
    digitalWrite(LED_BUILTIN, LOW);
  }
  }
