# Compresses CSS and updates main script.
import re
f = open("style.css")
css = f.read()

# Strip Comments
pattern = re.compile("/\*[^\*]+\*/")
css = pattern.sub("", css)

# Make it all one line
pattern = re.compile("(\t|\r|\n|\s{4})")
css = pattern.sub("", css)

# Remove unneeded semicolon
pattern = re.compile(";}")
css = pattern.sub("}", css)

f = open("4chanSS.user.js")
script = f.read()

pattern = re.compile("css = \".*\";")
script = pattern.sub("css = \"" + css + "\";", script)

f = open("4chanSS.user.js", "w")
f.write(script)
f.close()