﻿# pocket-save
mern app for managing family finances, using OCR to scan receipts and get the total of the transaction.
working demo: 
https://benayat-pocket-save.herokuapp.com/
- web-hosting is expensive, and heroku only gives you one thread to work on, so for a working demo I used ocrSpace, instead of tesseract.
- if you prefer to use your own server for the OCR, use the ocr.js file instead. I used tesseract.js and sharp to pre-process the images to work well with the ocr. 
- note: tesseract uses workers for the OCR with tesseract, so only use it if you have the necessary cpu cores in your server.
