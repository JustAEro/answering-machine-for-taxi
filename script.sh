#!/bin/bash
chmod +x script.sh
cd /home/ilya/PycharmProjects/taxi_answering_machine/
mv output.wav /home/ilya/Загрузки/kaldi-ru-0.6/
cd /home/ilya/Загрузки/kaldi-ru-0.6/
rm decoder-test.wav
mv output.wav decoder-test.wav
sh decode.sh.orig decoder-test.wav 2>>output.txt

