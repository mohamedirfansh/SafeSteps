import requests
from config import apiToken, chatId

def sendMsg():
    api_token = apiToken
    chat_id = chatId
    text = 'Fall detected for your care patient! Please check on them immediately.'

    url = f'https://api.telegram.org/bot{api_token}/sendMessage'
    params = {'chat_id': chat_id, 'text': text}

    response = requests.post(url, data=params)
    print(response.json())

if __name__ == '__main__':
    sendMsg()