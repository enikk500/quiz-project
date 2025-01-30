import requests
import telebot
import sqlite3
import json
from telebot import types

bot = telebot.TeleBot('8046082557:AAENMuSYJvX5916q0-zZwhhQbrwYWUYJJ7E')


@bot.message_handler(commands=['start'])
def start(message):
  markup = types.ReplyKeyboardMarkup()
  button1 = types.KeyboardButton('Посмотреть опросы')
  markup.row(button1)
  button2 = types.KeyboardButton('Войти')
  markup.row(button2)
  bot.send_message(message.chat.id,f'Привет, {message.from_user.first_name} {message.from_user.last_name}', reply_markup=markup)
  bot.register_next_step_handler(message, on_click)

@bot.message_handler(content_types=["text"])
def on_click(message):
    if message.text == 'Посмотреть опросы':
        try:
            response = requests.get('http://localhost:8080/explore')
            response.raise_for_status()
            data = response.json() 
            if isinstance(data, list) and data:
                str = "\n".join(f"- {item['name']}" for item in data if 'name' in item)
                bot.reply_to(message, f'Вот такие опросы сейчас есть:\n{str}')
            else:
                bot.reply_to(message, 'Опросов пока нет.')
        except requests.RequestException as e:
            bot.reply_to(message, f'Ошибка при получении данных: {e}')

# @bot.message_handler(content_types=["text"])
# def quiz(message):
#   if message.text == '3':
#     try:
#       response = requests.get('http://localhost:8080/explore')
#       response.raise_for_status()
#       data = response.json()
#       if isinstance(data, list) and data:
#         str = "\n".join(f"- {item['name']}")
#           if str == 
bot.polling(non_stop=True)