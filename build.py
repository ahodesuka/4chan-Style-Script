'''
' 4chan Style Script
'  - ahoka
' build.py - simple script to update the version and
' insert the style.css into the javascript file.
'''
import re
import sys

argc = len(sys.argv)

VERSION     = sys.argv[1] if argc > 1 else "0.0.1-DEV"
INPUT_FILE  = "4chanSS.user.js"
OUTPUT_FILE = sys.argv[2].decode("string_escape") if argc > 2 else "4chanSS.user.js"

f   = open("style.css")
css = f.read()

# Strip Comments
css    = re.sub("/\*[^\*]+\*/", "", css)
# Make it all one line
css    = re.sub("(\t|\r|\n|\s{4})", "", css)
# Remove unneeded semicolon
css    = re.sub(";}", "}", css)

f      = open(INPUT_FILE)
script = f.read()

# Update CSS
script  = re.sub("(?<=css = \")(.+)(?=\";)", css, script)
# Update Version
script  = re.sub("(?<=// @version       )(\d+\.+\d+\.+\d+(-DEV)?)", VERSION, script)
script  = re.sub("(?<=VERSION       = \")(\d+\.+\d+\.+\d+(-DEV)?)(?=\",)", VERSION, script)

f = open(OUTPUT_FILE, "w")
f.write(script)
f.close()