#! /bin/bash

tar -cf ./release/BlackBoard-Better-PDF.tar.gz ./dist/* ./manifest.json ./icon.png ./readme.md
zip ./release/BlackBoard-Better-PDF.zip ./dist/* ./manifest.json ./icon.png ./readme.md