import pyttsx3
import time
import os
import pyaudio
import wave
import keyboard


def normalize(address, which_address):
    dict_for_numbers = {'один': 1, 'два': 2, 'три': 3, \
                        'четыре': 4, 'пять': 5, 'шесть': 6, 'семь': 7, \
                        'восемь': 8, 'девять': 9, 'десять': 10, 'одиннадцать': 11, 'одинадцать': 11, \
                        'двенадцать': 12, 'тринадцать': 13, 'четырнадцать': 14, 'пятнадцать': 15, \
                        'шестнадцать': 16, 'семнадцать': 17, 'восемнадцать': 18, 'девянадцать': 19, \
                        'двадцать': 20, 'тридцать': 30, 'сорок': 40, 'пятьдесят': 50, 'шестьдесят': 60, \
                        'семьдесят': 70, 'восемьдесят': 80, 'девяносто': 90, 'сто': 100, \
                        'двести': 200, 'триста': 300, 'четыреста': 400, 'пятьсот': 500, 'шестьсот': 600, 'семьсот': 700, \
                        'восемьсот': 800, 'девятьсот': 900, 'тысяча': 1000}

    address_number = address.split()
    number = 0
    f = open(which_address, 'w')
    for word in address_number:
        if word in dict_for_numbers:
            number += dict_for_numbers[word]
        else:
            if number != 0:
                f.write(str(number))
                f.write(" ")
                f.write(word)
                f.write(" ")
                number = 0
            else:
                f.write(word)
                f.write(" ")
                number = 0
    if number != 0:
        print(number)

    f.write('\n')
    f.close()

def record_mic(seconds):
    CHUNK = 512
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 8000
    RECORD_SECONDS = seconds
    WAVE_OUTPUT_FILENAME = "output.wav"
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)
    print("* recording")
    frames = []
    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)
    print("* done recording")
    stream.stop_stream()
    stream.close()
    p.terminate()
    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()


def say_sentence(what_to_say):
    tts = pyttsx3.init()
    tts.setProperty('voice', 'ru')
    tts.say(what_to_say)
    tts.runAndWait()


def speech_recognition(which_address):
    path_to_file = '/home/ilya/Загрузки/kaldi-ru-0.6/output.txt'
    order = ''
    with open(path_to_file) as file:
        flag = 0
        for line in file:
            if line.find('decoder-test') != -1:
                flag += 1
                if flag == 2:
                    order = line.replace('decoder-test', '').strip()
                    break

    normalize(order, which_address)


if __name__ == "__main__":
    #address A
    say_sentence('Здраствуйте, вас приветствует голосовой помощник Войс Такси')
    say_sentence('Назовите адрес, по которому к вам должен подъехать водитель')
    record_mic(5)
    os.system('cd /home/ilya/Рабочий\ стол/ && sh script.sh')
    addressA = 'addressA.txt'
    speech_recognition(addressA)
    os.system('cd /home/ilya/Загрузки/kaldi-ru-0.6/ && rm output.txt')


    #addressB
    say_sentence('Назовите адрес, по которому вы хотите поехать')
    record_mic(5)
    os.system('cd /home/ilya/Рабочий\ стол/ && sh script.sh')
    addressB = 'addressB.txt'
    speech_recognition(addressB)
    os.system('cd /home/ilya/Загрузки/kaldi-ru-0.6/ && rm output.txt')


    #comment
    #say_sentence('Хотите ли вы оставить комментарий к заказу? Если да, то нажмите клавишу пробел, если нет, ничего не нажимайте')
    #keyboard.
    say_sentence('Скажите ваш комментарий к заказу')
    record_mic(10)
    os.system('cd /home/ilya/Рабочий\ стол/ && sh script.sh')
    comment = 'comment.txt'
    speech_recognition(comment)
    os.system('cd /home/ilya/Загрузки/kaldi-ru-0.6/ && rm output.txt')

    #вставка в браузер
    os.system('cd /home/ilya/Загрузки/pup/ && node taxi.js')