import telebot
import webbrowser
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

def on_click(message):
  if message.text == 'Посмотреть опросы':
    bot.send_message(message.chat.id, 'Вот такие опросы сейчас есть:')
  elif message.text == 'Войти':
    bot.send_message(message.chat.id, 'Вход пока еще не доступен')


# @bot.message_handler(commands=['start' , 'hello'])
# def main(message):
#   bot.send_message(message.chat.id, f'Привет, {message.from_user.first_name} {message.from_user.last_name}')

# @bot.message_handler(commands=['help'])
# def main(message):
#   bot.send_message(message.chat.id, '<b>Help</b> <u>Information</u>', parse_mode='html')


@bot.message_handler()
def info(message):
  if message.text.lower() == 'привет':
    bot.send_message(message.chat.id, f'Привет, {message.from_user.first_name} {message.from_user.last_name}')
  elif message.text.lower() == 'id':
    bot.reply_to(message, f'ID: {message.from_user.id}')

bot.polling(non_stop=True)