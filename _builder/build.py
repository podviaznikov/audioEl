# JSBuilder example

# project name (from the root folder)
copyright = '(c) 2011 Enginimation Studio (http://enginimation.com). May be freely distributed under the MIT license.'
max_js = 'app.js'
min_js = 'app.min.js'

# file list (from the root/public folder)
files = [
    "/src/audioEl.js"
]

# execute the task
import JSBuilder
JSBuilder.compile(
    copyright,
    max_js,
    min_js,
    files
)

# let me read the result ...
import time
time.sleep(2)