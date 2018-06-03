#!/bin/bash
find ./assets/post-images -type f -not -name 'schelbert-froschmaultreicheln.jpg' -not -name 'steiner-innenschweiz.jpg' -delete
find ./public/app/assets/profiles -type f -not -name 'notFound.html' -not -name 'template.html' \
-not -name '5aa0481e876d9d39d439785c.html' -not -name '5aa0481e876d9d39d439785f.html' \
-not -name '5aa0481e876d9d39d439786b.html' -not -name '5aa0481e876d9d39d439786e.html' \
-not -name '5aa0481e876d9d39d439787a.html' -not -name '5aa0481e876d9d39d4397859.html' \
-not -name '5aa0481e876d9d39d4397862.html' -not -name '5aa0481e876d9d39d4397865.html' \
-not -name '5aa0481e876d9d39d4397868.html' -not -name '5aa0481e876d9d39d4397871.html' \
-not -name '5aa0481e876d9d39d4397874.html' -not -name '5aa0481e876d9d39d4397877.html' \
-not -name '5acc851fc8bc262214c01ee5.html' -delete
rm -f ./deserializationBug.txt ./rceInjection.txt