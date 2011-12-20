# Compresses CSS and updates main script.
import re
f = open("style.css")
css = f.read()

pattern = re.compile("(\t|\r|\n)")
css = pattern.sub("", css)

pattern = re.compile(";}")
css = pattern.sub("}", css)

f = open("4chanSS.user.js")
script = f.read()

pattern = re.compile("css = \".*\";")
script = pattern.sub("css = \"" + css + "\";", script)

f = open("4chanSS.user.js", "w")
f.write(script)
f.close()