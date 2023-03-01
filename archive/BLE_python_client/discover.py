import asyncio
from bleak import BleakScanner

async def main():
    devices = await BleakScanner.discover()
    for d in devices:
        print(d)

    # outpt = await BleakScanner.find_device_by_name("Nano 33 BLE Sense")
    # BleakScanner.
    # print(outpt)

asyncio.run(main())