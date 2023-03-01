import asyncio
import binascii
from bleak import BleakClient

address = "EE:D4:25:BB:5B:DF"
MODEL_NBR_UUID = "00002a58-0000-1000-8000-00805f9b34fb"

heh = 0

def msg_handler(uuid, data):
    print('{}'.format(data.decode('ascii')))

async def main(address):
    global heh
    heh = 0
    async with BleakClient(address) as client:
        while True:
            model_number = await client.read_gatt_char(MODEL_NBR_UUID)
            print('{}'.format(model_number.decode('ascii')))
            # await client.start_notify(MODEL_NBR_UUID, msg_handler)


asyncio.run(main(address))