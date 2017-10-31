#!/bin/bash

# Convert image from *.png to *.ico
image="../public/favicon"
ffmpeg -i ${image}.png -s 256x256 ${image}.ico
