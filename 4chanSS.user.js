// ==UserScript==
// @name          4chan Style Script
// @author        ahoka
// @version       1.2
// @run-at        document-start
// @include       http://*.4chan.org/*
// @match         http://*.4chan.org/*
// @updateURL     https://github.com/ahodesuka/4chan-Style-Script/raw/master/4chanSS.user.js
// ==/UserScript==
(function(){
    var defaultConfig =
    {
        "Show Announcements": [ true, "Toggle visibility of announcements made by staff" ],
        "Show Logo":          [ true, "Toggle visibility of board name and logo" ],
        "Replace Reply Form": [ true, "Replaces the default reply form with 4chan x's QR form" ],
        "Pages Location":
        [
            1, "Change the location of the page links",
            [
                { name: "Bottom Left Slide Out", value: 1 },
                { name: "In Navigation Bar",     value: 2 },
                { name: "Fixed Vertically",      value: 3 }
            ]
        ],
        "Custom Navigation Links": [ true, "Use specified links instead of showing all boards" ],
        "Style Scrollbars":        [ true, "Make the scroll bar match the theme (Chrome Only)" ],
        "ExHentai Source":         [ false, "Adds a quick link to perform a file search through ExHentai (You must be logged into exhentai for it to work)" ],
        "Font":                    [ "Calibri", "Set the default font family" ],
        "Font Size":               [ 12, "Set the general size of text (Pixels)" ],
        "Fonts":                   [ [ "Ubuntu", "Consolas", "Droid Sans", "Terminus", "Segoe UI", "Calibri", "Arial", "Lucida Grande", "Helvetica" ] ],
        "Mascots":
        [
            { img: "http://img88.imageshack.us/img88/2449/eriobg.png",        color: "6cb2ee", enabled: true },
            { img: "http://img848.imageshack.us/img848/3976/fatebg.png",      color: "e1d550", enabled: true },
            { img: "http://img823.imageshack.us/img823/9940/kurimubg.png",    color: "ce717d", enabled: true },
            { img: "http://img217.imageshack.us/img217/2928/homubg.png",      color: "886999", enabled: true },
            { img: "http://img525.imageshack.us/img525/9757/horobg.png",      color: "a46e41", enabled: true },
            { img: "http://img225.imageshack.us/img225/6970/patchoulibg.png", color: "8b58c0", enabled: true },
            { img: "http://img821.imageshack.us/img821/1281/shanabg.png",     color: "ef4353", enabled: true },
            { img: "http://img94.imageshack.us/img94/629/shikibg.png",        color: "aaaaaa", enabled: true },
            { img: "http://img834.imageshack.us/img834/1904/tessabg.png",     color: "857d92", enabled: true },
            { img: "http://img16.imageshack.us/img16/3190/yinbg.png",         color: "d1dfef", enabled: true }
        ],
        "Nav Links":
        [
            { text: "anime & manga", link: "http://boards.4chan.org/a/"  },
            { text: "anime/cute",    link: "http://boards.4chan.org/c/"  },
            { text: "technology",    link: "http://boards.4chan.org/g/"  },
            { text: "video games",   link: "http://boards.4chan.org/v/"  },
            { text: "otaku culture", link: "http://boards.4chan.org/jp/" }
        ],
        "Themes":
        [
            {
                name: "Dark Flat",
                enabled: true,
                bgImg: "R0lGODlhAwADAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///ywAAAAAAwADAAAICQA5cMgwsCCHgAA7",
                bgColor:     "202020",
                mainColor:   "282828",
                borderColor: "161616",
                linkColor:   "ffffff",
                nameColor:   "ffffff",
                quoteColor:  "789922",
                textColor:   "ffffff",
                sageColor:   "c97b7b",
                tripColor:   "7bb3c9",
                titleColor:  "999999"
            }
        ]
    }, SSf, $SS, config, postTabText, checkMark, theme, mascot, css;
    
    postTabText = /^.*\/res\/.*$/i.test(window.location.href) ? "NEW REPLY" : "NEW THREAD";
    checkMark   = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABwSURBVHjalI+rDYBAEEQfSCwnETiqwtEIBdAHjgIoAIE4hUBBDeT8YC5swkcw6+ZlsjOJeFfKl8QtUzEIPYBjIRioo50zIXYDgR7I8AixGjgQHSNCeEoDLYo3kUcvPm8QYsZdTa9WLRuFTUh+Lz8HABdVPTT1adyuAAAAAElFTkSuQmCC";
    // TODO: Change this ugly ass checkmark.
    
    if (!Array.isArray)
        Array.isArray = function(arg){ return Object.prototype.toString.call(arg) == "[object Array]"; };
    
    /* STYLE SCRIPT FRAMEWORK */
    /* More or less based off jQuery */
    (function()
    {
        var SSf = window.$ = function(selector, root)
        {
            return this instanceof SSf ?
                this.init(selector, root) : new SSf(selector, root);
        };
        
        SSf.prototype = 
        {
            constructor: SSf,
            elems: [],
            length: function(){ return this.elems.length; },
            
            /* CONSTRUCTOR */
            init: function(selector, root)
            {
                if (typeof selector === "string")
                {
                    var root = root || document;
                    var tagCheck = /^<(\w+)([^>]*)>(.*)$/.exec(selector); // NO CLOSING TAGS FOR MAIN NODE
                    
                    if (root.constructor == SSf)
                        root = root.get();
                        
                    if (tagCheck)
                    {
                        var tag = root.createElement(tagCheck[1]);
                        
                        if (tagCheck[2])
                        {
                            var attribs, atRegEx = /(\w+)=((?:"(?:[^"]+)"|'(?:[^']+)'|(?:\w+)))/g;
                            while ((attribs = atRegEx.exec(tagCheck[2])) != null)
                            {
                                var val = attribs[2];
                                if ((val[0] == '"' || val[0] == '\'') && val[0] == val[val.length-1])
                                    val = val.substr(1, val.length-2)
                                
                                tag.setAttribute(attribs[1], val);
                            }
                        }
                            
                        tag.innerHTML = tagCheck[3];
                        
                        this.elems = [ tag ];
                    }
                    else
                    {
                        var results = root.querySelectorAll(selector);
                        this.elems = Array.prototype.slice.call(results);
                    }
                }
                else if (selector.nodeType)
                    this.elems = [ selector ];
                else if (selector.constructor == SSf) return selector; // if this becomes a problem add a clone method
                
                return this;
            },
            
            /* DOM NODE RETRIEVAL */
            elements: function()
            {
                if (this.elems > 1)
                    return false;
                    
                this.elems = Array.prototype.slice.call(this.elems[0].elements);
                
                return this;
            },
            get: function(index)
            {
                if (index == undefined && this.elems.length == 1)
                    return this.elems[0];
                else if (index == undefined && this.elems.length > 1)
                    return this.elems;
                
                return this.elems[index];
            },
            
            /* DOM MANIPULATION */
            prepend: function(el)
            {
                if (el.constructor == SSf)
                    el = el.get();
                    
                return this.each(function(el){ this.insertBefore(el, this.firstChild); }, el);
            },
            append: function(el)
            {
                if (el.constructor == SSf)
                    el = el.get();
                
                return this.each(function(el){ this.appendChild(el); }, el);
            },
            before: function(el)
            {
                if (el.constructor == SSf)
                    el = el.get();
                    
                return this.each(function(el){ this.parentNode.insertBefore(el, this); }, el);
            },
            after: function(el)
            {
                if (el.constructor == SSf)
                    el = el.get();
                    
                return this.each(function(el)
                {
                    if (this.nextSibling != null)
                        this.parentNode.insertBefore(el, this.nextSibling);
                    else if (this.parentNode != null)
                        this.parentNode.appendChild(el);
                }, el);
            },
            html: function(html)
            {
                if (html == undefined)
                    return this.elems[0].innerHTML;
                    
                return this.each(function(html){ this.innerHTML = html; }, html);
            },
            text: function(text)
            {
                if (text == undefined)
                    return this.elems[0].textContent;
                
                return this.each(function(text){ this.textContent = text; }, text);
            },
            appendText: function(text)
            {
                return this.each(function(text){ this.textContent += text; }, text);
            },
            
            attr: function(name, val)
            {
                if (val == undefined)
                    return this.elems[0].getAttribute(name);
                        
                return this.each(function(name, val){ this.setAttribute(name, val); }, [ name, val ]);
            },
            val: function(val)
            {
                if (val == undefined)
                {
                    var el = this.elems[0];
                    switch(el.type)
                    {
                        case "checkbox":
                        case "radio":
                            return el.checked;
                        default:
                            return el.value;
                    }
                }
                
                return this.each(function(val){ this.value = val; }, val);
            },
            addClass: function(classNames)
            {
                return this.each(function(classNames)
                {
                    classNames = classNames.split(' ');
                    for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                        if (!$(this).hasClass(classNames[j]))
                            this.className += (this.className ? " " : "") + classNames[j];
                }, classNames);
            },
            hasClass: function(className)
            {
                if (this.elems.length > 1)
                    return false;
                
                return this.elems[0].className.indexOf(className) != -1;
            },
            removeClass: function(classNames)
            {
                return this.each(function(classNames)
                {
                    classNames = classNames.split(' ');
                    for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                        if ($(this).hasClass(classNames[j]))
                        {
                            var cclassNames = this.className.split(' ');
                            this.className = "";
                            
                            for (var k = 0, kMAX = cclassNames.length; k < kMAX; k++)
                                if (classNames[k] != classNames[j])
                                    this.className += (this.className ? " " : "") + classNames[k];
                        }
                }, classNames);
            },
            toggleClass: function(classNames)
            {
                return this.each(function(classNames)
                {
                    classNames = classNames.split(' ');
                    for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                        if (!$(this).hasClass(classNames[j]))
                            $(this).addClass(classNames[j]);
                        else
                            $(this).removeClass(classNames[j]);
                }, classNames);
            },
            remove: function()
            {
                return this.each(function(){ this.parentNode.removeChild(this); });
            },
            
            /* DOM TRAVERSING */
            parent: function()
            {
                if (this.elems.length > 1)
                    return false;
                
                return new SSf(this.elems[0].parentNode);
            },
            children: function(selector)
            {
                if (this.elems.length > 1)
                    return false;
                else if (selector == null)
                    selector = "*";
                
                return new SSf(selector, this.elems[0]);
            },
            nextSibling: function(selector)
            {
                if (this.elems.length > 1 ? true : this.elems[0].nextSibling == null)
                    return false;
                
                if (selector != undefined)
                {
                    var t, m = new SSf(selector, this.elems[0].parentNode),
                        s = this.elems[0].parentNode.childNodes;
                    
                    for (var i = s.length - 1; i > 0; i--)
                        if (s[i] == this.elems[0] && t == undefined)
                            return false;
                        else if (s[i] == this.elems[0] && t != undefined)
                            return new SSf(t);
                        else if (m.elems.indexOf(s[i]) != -1)
                            t = s[i];
                }
                return new SSf(this.elems[0].nextSibling);
            },
            previousSibling: function(selector)
            {
                if (this.elems.length > 1 ? true : this.elems[0].previousSibling == null)
                    return false;
                
                if (selector != undefined)
                {
                    var t, m = new SSf(selector, this.elems[0].parentNode),
                        s = this.elems[0].parentNode.childNodes;
                    
                    for (var i = 0, MAX = s.length; i < MAX; i++)
                        if (s[i] == this.elems[0] && t == undefined)
                            return false;
                        else if (s[i] == this.elems[0] && t != undefined)
                            return new SSf(t);
                        else if (m.elems.indexOf(s[i]) != -1)
                            t = s[i];
                }
                
                return new SSf(this.elems[0].previousSibling);
            },
            
            /* EVENT METHODS */
            bind: function(type, listener)
            {
                return this.each(function(type, listener){ this.addEventListener(type, listener, false); }, [ type, listener ]);
            },
            unbind: function(type, listener)
            {
                return this.each(function(type, listener){ this.removeEventListener(type, listener, false); }, [ type, listener ]);
            },
            
            /* HELPER METHODS */
            each: function(func, args)
            {
                if (args != null && !Array.isArray(args))
                    args = [ args ];
                
                for (var i = 0, MAX = this.elems.length; i < MAX; i++)
                    func.apply(this.elems[i], args || [ i ]);
                    
                return this;
            },
            exists: function()
            {
                return this.elems.length > 0;
            }
        };
    })();
    /* END STYLE SCRIPT FRAMEWORK */
    
    /* STYLE SCRIPT CLASSES & METHODS */
    $SS =
    {
        init: function()
        {
            var a = $("<a>SS</a>").bind("click", $SS.options.show);
            return $("#navtopr").append(a);
        },
        
        /* OPTIONS */
        options:
        {
            show: function()
            {
                if ($("#overlay").exists())
                    return $SS.options.close();
                else
                {
                    var key, val, des,
                        overlay = $("<div id=overlay>"),
                        tOptions = $("<div id=themeoptions class=reply>"),
                        optionsHTML = "<ul id=toNav>\
                    <li><label class=selected for=tcbMain>Main</label></li>\
                    <li><label for=tcbMascots>Mascots</label></li>\
                    <li><label for=tcbNavLinks>Nav Links</label></li>\
                    </ul><div id=toWrapper><input type=radio name=toTab id=tcbMain hidden checked><div id=tMain>";
                    
                    for (key in config)
                    {
                        if (key == "Fonts") continue;
                        val = config[key];
                        des = defaultConfig[key][1];
                        
                        if (key == "Font")
                        {
                            var fonts = config["Fonts"][0];
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><select name=Font>";
                            
                            for (var i = 0, MAX = fonts.length; i < MAX; i++)
                                 optionsHTML += "<option value='" + fonts[i] + "'" + (fonts[i] == config["Font"] ? " selected" : "") + ">" + fonts[i] + "</option>";
                            
                            optionsHTML += "</select></label>";
                        }
                        else if (key == "Font Size")
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><input type=text name='Font Size' value=" + config["Font Size"] + "px></label>";
                        else if (key != "Nav Links" && key != "Mascots" && key != "Themes")
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><input" + (val ? " checked" : "") + " name='" + key + "' type=checkbox></label>";
                        else if (key == "Mascots")
                        {
                            var mascots = config["Mascots"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbMascots hidden><div id=tMascot><a class=trbtn name=addMascot>add</a>";
                            
                            for (var i = 0, MAX = mascots.length, tMascot; i < MAX; i++)
                            {
                                tMascot = new $SS.Mascot(mascots[i].img, mascots[i].color, mascots[i].enabled);
                                optionsHTML += "<div id=mascot" + i + (tMascot.enabled ? " class=selected" : "") + ">\
                                <a title=Delete>X</a><a title=Edit>E</a>\
                                <img src='" + tMascot.img.get() + "'></div>";
                            }
                        }
                        else if (key == "Nav Links")
                        {
                            var links = config["Nav Links"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbNavLinks hidden><div id=tNavLinks><a class=trbtn name=addLink>add</a>";
                            
                            for (var i = 0, MAX = links.length; i < MAX; i++)
                                optionsHTML += "<div><label>Text: <input type=text value='" + links[i].text + "'></label>" +
                                                    "<label>Link: <input type=text value='" + links[i].link + "'></label>" +
                                                    "<a class='trbtn trbtn-small' name=upLink>up</a><a class='trbtn trbtn-small' name=downLink>down</a><a class=trbtn name=delLink>remove</a></div>";
                            
                            optionsHTML += "</div>";
                        }
                    }
                    
                    optionsHTML += "</div><div><a class=trbtn name=save>save</a><a class=trbtn name=cancel>cancel</a></div>";
                    tOptions.html(optionsHTML);
                    overlay.append(tOptions);
                    
                    $("#toNav li label", tOptions).bind("click", function(e)
                    {
                        if ($(this).hasClass("selected")) return;
                        
                        $("#toNav li label.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                    
                    $("#tMascot div", tOptions).each(function(){ $SS.options.bindMascotInputs(this); });
                    
                    function bindLinkButtons(el)
                    {
                        $("a[name=upLink]", el).bind("click", function()
                        {
                            var p = $(this).parent(), n;
                            if ((n = p.previousSibling()))
                                n.before(p);
                        });
                        $("a[name=downLink]", el).bind("click", function()
                        {
                            var p = $(this).parent(), n;
                            if ((n = p.nextSibling()))
                                n.after(p);
                        });
                        $("a[name=delLink]", el).bind("click", function(){ $(this).parent().remove(); });
                    }
                    
                    $("a[name=addMascot]", tOptions).bind("click", $SS.options.showMascot);
                    $("a[name=addLink]", tOptions).bind("click", function()
                    {
                        var el = $("<div><label>Text: <input type=text></label><label>Link: <input type=text value='http://boards.4chan.org/'></label>" +
                                    "<a class='trbtn trbtn-small' name=upLink>up</a><a class='trbtn trbtn-small' name=downLink>down</a><a class=trbtn name=delLink>remove</a>");
                        bindLinkButtons(el);
                        $("#tNavLinks").append(el);
                    });
                    bindLinkButtons(tOptions);
                    $("a[name=save]", tOptions).bind("click", $SS.options.save);
                    $("a[name=cancel]",tOptions).bind("click", function(){ $("#overlay").remove(); });
                    
                    return $(document.body).append(overlay);
                }
            },
            save: function()
            {
                var div, themes = [], mascots = [], links = [];
                div = $("#themeoptions");
                
                // Save main
                $("#themeoptions input:not([name=toTab]), #themeoptions select").each(function()
                {
                    $SS.options.config.set($(this).attr("name"),
                        $(this).attr("name") == "Font Size" ? Math.max(Math.min(parseInt($(this).val()), 16), 10) : $(this).val());
                });
                
                // Save Mascots
                $("#themeoptions #tMascot div").each(function(index)
                {
                    config["Mascots"][index].enabled = $(this).hasClass("selected");
                    mascots.push(config["Mascots"][index]);
                });
                
                $SS.options.config.set("Mascots", mascots);
                
                // Save nav links
                $("#themeoptions #tNavLinks div").each(function()
                {
                    var nLink = {};
                    
                    $(this).children("input").each(function(index)
                    {
                        if (index == 0)
                            nLink.text = $(this).val();
                        else if (index == 1)
                            nLink.link = $(this).val();
                    });
                    
                    links.push(nLink);
                });
                
                $SS.options.config.set("Nav Links", links);
                
                return window.location.reload(true); // TENTATIVE TODO: Just update theme instead of reloading page.
            },
            showMascot: function(mIndex) // TODO: Fix base64 input element- why cant chrome hold all these chars- why is firefox and opera so slow
            {
                var div, overly;
                
                if (typeof mIndex === "number")
                    var bEdit = true, mEdit = config["Mascots"][mIndex];
                
                div = $("<div id=addMascot>");
                div.html("<label><span title='URL or base64'>Background:</span><textarea name=customIMG>" + (bEdit ? mEdit.img : "") + "</textarea></label>\
                        <label title='i.e. #FF6999'><span>Link Color (Hex.):</span><input type=text name=customColor value='#" + (bEdit ? mEdit.color : "") + "'></label>\
                        <div><a class=trbtn name=" + (bEdit ? "edit" : "add") + ">" + (bEdit ? "edit" : "add") + "</a><a class=trbtn name=cancel>cancel</a></div></div>");
                
                overlay = $("<div id=overlay2>");
                overlay.append(div);
                
                if (bEdit)
                    $("a[name=edit]", div).bind("click", function(){ $SS.options.addMascot(mIndex); });
                else
                    $("a[name=add]", div).bind("click", $SS.options.addMascot);
                
                $("a[name=cancel]", div).bind("click", function(){ $("#overlay2").remove(); });
                
                return $(document.body).append(overlay);
            },
            addMascot: function(mIndex)
            {
                var overlay, nMascot, div, cIMG, cColor;
                overlay = $("#overlay2");
                cIMG = decodeURIComponent($("textarea[name=customIMG]", overlay).val());
                cColor = $("input[name=customColor]", overlay).val();
                
                if (!/^https?:\/\/.+/.test(cIMG) && !$SS.validBase64(cIMG))
                {
                    alert("Invalid bg image URL/base64.");
                    return;
                }
                else if (!$SS.validHexColor(cColor))
                {
                    alert("Invalid link color! Hexadecimal values only (6 characters).");
                    return;
                }
                
                if (cColor[0] == "#")
                    cColor = cColor.substr(1);
                                
                cIMG = $SS.cleanBase64(cIMG);
                
                if (typeof mIndex === "number")
                {
                    config["Mascots"][mIndex].img = cIMG;
                    config["Mascots"][mIndex].color = cColor;
                }
                else
                {
                    nMascot = new $SS.Mascot(cIMG, cColor, true);
                    config["Mascots"].push({ img: cIMG, color: cColor, enabled: true });
                    
                    div = $("<div id=mascot" + (config["Mascots"].length - 1) + " class=selected><a title=Delete>X</a><a title=Edit>E</a><img src='" + nMascot.img.get() + "'>");
                    $SS.options.bindMascotInputs(div);
                    
                    $("#tMascot").append(div);
                }
                
                return overlay.remove();
            },
            deleteMascot: function(mIndex)
            {
                if (typeof mIndex !== "number")
                    return;
                else if (confirm("Are you sure?"))
                {
                    config["Mascots"].splice(mIndex, 1);
                    $("#mascot" + mIndex).remove();
                    
                    var mascot = $("#overlay #tMascot div").each(function(index){ $(this).attr("id", "mascot" + index); });
                }
            },
            getMascot: function()
            {
                var mascots = config["Mascots"], eMascot = [], rand, m;
                
                for (var i = 0, MAX = mascots.length; i < MAX; i++)
                    if (mascots[i].enabled)
                        eMascot.push(mascots[i]);
                
                if (eMascot.length == 0)
                {
                    rnd = Math.round(Math.random() * (mascots.length - 1));
                    m = mascots[rnd];
                }
                else
                {
                    rnd = Math.round(Math.random() * (eMascot.length - 1));
                    m = eMascot[rnd];
                }
                
                return new $SS.Mascot(m.img, m.color, true);
            },
            bindMascotInputs: function(div)
            {
                $(div).bind("click", function(){ $(this).toggleClass("selected"); });
                
                $("a[title=Delete]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.deleteMascot(parseInt(e.target.parentNode.id.substr(6)));
                });
                $("a[title=Edit]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.showMascot(parseInt(e.target.parentNode.id.substr(6)));
                });
            },
            getTheme: function()
            {
                var themes = config["Themes"];
                
                for (var i = 0, MAX = themes.length; i < MAX; i++)
                    if (themes[i].enabled == true)
                        return new $SS.Theme(themes[i]);
            },
            config:
            {
                hasGM: typeof GM_deleteValue !== "undefined",
                get: function(name, namespace)
                {
                    namespace = namespace == null ? "4chanSS." : namespace;
                    var val, key = namespace + name;
                    
                    if (this.hasGM && (val = GM_getValue(key)) != null)
                            return JSON.parse(val);
                    else if ((val = localStorage.getItem(key)) != null)
                        return JSON.parse(val);
                        
                    return defaultConfig[name];
                },
                set: function(name, val)
                {
                    name = "4chanSS." + name;
                    val = JSON.stringify(val);
                    
                    if (this.hasGM)
                        return GM_setValue(name, val);
                        
                    return localStorage.setItem(name, val);
                }
            },
            loadConf: function()
            {
                function parseVal(val)
                {
                    return (Array.isArray(val) && typeof val[0] !== "object") ? val[0] : val;
                };
                
                config = {};
                
                for (var key in defaultConfig)
                    config[key] = parseVal(this.config.get(key));
            }
        },
        
        Color: function(hex)
        {
            this.hex = "#" + hex;
            
            this.rgb = function(offset)
            {
                var rgb = [], hex;
                hex = parseInt(this.hex.substr(1), 16);
                offset = offset == null || typeof offset !== "number" ? 0 : offset;
                    
                rgb[0] = Math.min(Math.max((hex >> 16) & 0xFF + offset, 0), 255);
                rgb[1] = Math.min(Math.max((hex >> 8) & 0xFF + offset, 0), 255);
                rgb[2] = Math.min(Math.max(hex & 0xFF + offset, 0), 255);
                
                return rgb.join(",");
            };
        },
        
        Image: function(img)
        {
            this.img = img;
            this.get = function()
            {
                if ($SS.validBase64(this.img))
                    return "data:image/png;base64," + this.img;
                    
                return this.img;
            };
        },
        
        Mascot: function(img, hex, enabled)
        {
            this.img = new $SS.Image(img);
            this.color = new $SS.Color(hex);
            this.enabled = enabled;
        },
        
        Theme: function(theme)
        {
            this.bgImg = new $SS.Image(theme.bgImg);
            this.nameColor  = "#" + theme.nameColor;
            this.quoteColor = "#" + theme.quoteColor;
            this.sageColor  = "#" + theme.sageColor;
            this.textColor  = "#" + theme.textColor;
            this.titleColor = "#" + theme.titleColor;
            this.tripColor  = "#" + theme.tripColor;
        },
        
        /* HELPER METHODS */
        cleanBase64: function(b64)
        {
            return b64.replace(/^(data:image\/(?:gif|jpe?p|png);base64,)(\r\n|\r|\n)/gmi, "");
        },
        validBase64: function(b64)
        {
            // base64 regex thanks to njzk2;
            // http://stackoverflow.com/questions/475074/regex-to-parse-or-validate-base64-data/5885097#5885097
            return /^(?:data:image\/(?:gif|jpe?p|png);base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/i.test(b64);
        },
        validHexColor: function(c)
        {
            return /^#?[A-F0-9]{6}$/i.test(c);
        }
    };
    /* END STYLE SCRIPT CLASSES */
    
    function buildCustomNav()
    {
        var links = config["Nav Links"], a = [];
        
        for (var i = 0, MAX = links.length; i < MAX; i++)
            a.push("<a href='" + links[i].link + "'>" + links[i].text + "</a>");
            
        $("#navtop").html(a.join(" - "));
    }

    $SS.options.loadConf();
    mascot = $SS.options.getMascot();
    theme = $SS.options.getTheme();
    
    /* STYLING */
    css = // TODO: Consolidate css, prepare for color customization.
    "*{font-family:" + config["Font"] + ",Calibri,Helvetica,sans-serif!important;font-size:" + config["Font Size"] + "px!important}\
    body>form *{font-family:" + config["Font"] + ",Calibri,Helvetica,sans-serif!important}\
    *:focus{outline:none!important}\
    input:focus,select:focus,textarea:focus{box-shadow:inset " + mascot.color.hex +" 0 -1px 0,inset " + mascot.color.hex +" 0 1px 0,inset " + mascot.color.hex +" -1px 0 0,inset " + mascot.color.hex +" 1px 0 0}\
    ::selection{background:" + mascot.color.hex + ";color:#fff}\
    ::-moz-selection{background:" + mascot.color.hex + ";color:#fff}\
    *::-webkit-input-placeholder{color:#999!important}\
    *:-moz-placeholder{color:#999!important}\
    " + (config["Style Scrollbars"] ? "::-webkit-scrollbar{width:8px;height:8px}\
    ::-webkit-scrollbar-track-piece,::-webkit-scrollbar-track{background:#161616;box-shadow:inset rgba(0,0,0,.3) 0 0 6px,rgba(150,150,150,.1) 0 0 2px}\
    ::-webkit-scrollbar-corner,::-webkit-scrollbar-resizer{background:#161616}\
    ::-webkit-scrollbar-thumb{background:#333;border:2px solid #161616;border-radius:5px}\
    ::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active{background:#444}\
    ::-webkit-scrollbar-thumb:window-inactive{#222}\
    .reply *::-webkit-scrollbar-track,.reply *::-webkit-scrollbar-track-piece{border-radius:5px}": "") + "\
    img{border:none!important}\
    hr{border:none!important;border-top:1px solid rgba(36,36,36,.9)!important;margin:1px 0!important;box-shadow:rgba(0,0,0,.6) 0 0 3px}\
    h1,h2,h3,h4,h5{margin:.4em 0!important}\
    h3,.commentpostername,.postername,.replytitle,body>center:nth-of-type(2)>font[color=red]>b,.pages b,.filetitle{font-weight:400!important}\
    a{text-decoration:none!important;color:" + mascot.color.hex + "!important;font-weight:normal!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    a:not([href]){-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    a:hover{color:#eee!important}\
    a:not([href]),a[href='javascript:;']{color:#fff!important}\
    .commentpostername,.postername,.commentpostername a,.postername a{color:" + theme.nameColor + "!important}\
    .postertrip,.trip{color:" + theme.tripColor + "!important}\
    .unkfunc{color:" + theme.quoteColor + "!important}\
    .filetitle,.replytitle{color:" + theme.titleColor + "!important}\
    a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover{color:" + theme.sageColor + "!important}\
    .reply,td.replyhl,div.stub,option,div[id*=jsMath],#jsMath_float>*,.logo,a.trbtn,#thread_filter:hover>div,#imgControls,\
    .pages,#imgControls #imageType,body>center:nth-of-type(2)>font[color=red],.deletebuttons,.deletebuttons:before,\
    .postarea,#qr,#post,a.omittedposts:hover{background:rgba(40,40,40,.9)!important}\
    #options label,#options a,#themeoptions label,#themeoptions a,.pointer,a.trbtn,#themeoptions #toNav li label,#themeoptions #tMascot div,\
    input[type=checkbox],input[type=radio],input[type=submit],button{cursor:pointer}\
    body{color:" + theme.textColor + "!important;background:url(data:image/gif;base64," + theme.bgImg.get() + ") #202020!important;border-right:1px solid #161616;margin:0 315px 0 0!important;padding:0!important}\
    body:before{border-left:1px solid #161616;content:'';height:100%;width:312px;position:fixed;right:0;bottom:18px;z-index:-1}\
    body:after{background:url("+ mascot.img.get() + ") no-repeat center bottom rgba(22,22,22,.8);content:'';height:100%;width:313px;\
    border-left:2px solid rgba(40,40,40,.9);position:fixed;right:0;bottom:18px;z-index:-2}\
    #jsmath_button,#jsMath_panel,#jsMath_float{border:1px solid #161616!important}\
    #jsmath_button{bottom:auto!important;left:0!important;top:1px!important;right:auto!important}\
    #jsMath_panel{bottom:auto!important;left:1em!important;top:1.75em!important;right:auto!important}\
    textarea,input:not([type=submit]),select,#updater span{font:" + config["Font Size"] + "px " + config["Font"] + ",Calibri,Helvetica,sans-serif!important}\
    div.thread{background:rgba(40,40,40,.3);margin:0 0 1px;padding:3px 0 0!important;position:relative;border-radius:3px 0 0 3px}\
    div.thread:after,#updater div>label:after,form[name=delform] div.op:after,#addMascot>label:after{clear:both;color:transparent!important;content:'.';display:block;font-size:0!important}\
    div.op{border:none!important;position:relative}\
    div.op>a:first-child:not([name]):not(.reportbutton){position:absolute;right:2px;top:0}\
    form[name=delform]{border-left:2px solid rgba(40,40,40,.9);border-bottom:2px solid rgba(40,40,40,.9);margin:" + (config["Show Announcements"] ? "19px" : "0") + " 0 42px 10px;padding-left:1px;position:relative;border-radius:0 0 0 6px}\
    form[name=delform] table{border-spacing:0;margin:1px 0 0;position:relative;table-layout:fixed;width:100%}\
    body>span[style]~form[name=delform]{padding-bottom:1px}\
    body>span[style]~form[name=delform] div.op{padding-top:2px}\
    .reply,.replyhl{display:inline-block;position:relative!important;color:#fff!important}\
    .replyhider{margin:0!important;padding:1px 0 0!important;position:absolute;right:2px;width:auto!important;z-index:1}\
    td.reply,td.replyhl,div.stub{padding:5px!important;width:100%;border-radius:3px 0 0 3px;\
    -webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}\
    td.replyhl,td.qphl{background:rgba(" + mascot.color.rgb() + ",.1)!important;box-shadow:inset rgba(150,150,150,.3) 0 0 6px}\
    td.replyhl a:hover,td.reply a:hover{color:#fff!important}\
    div.stub{margin:1px 0 0!important;opacity:.75;padding-right:1px!important}\
    div.thread.stub{margin:1px 0!important}\
    div.stub>a,.stub>.block>a{display:block;padding:2px}\
    .container{position:absolute;bottom:2px;right:2px;z-index:1}\
    .container *{font-size:11px!important}\
    .container:before{color:#666;content:'REPLIES:';padding-right:3px}\
    .qphl{outline:none!important}\
    #qp{background:rgba(36,36,36,.98)!important;border:1px solid rgba(" + mascot.color.rgb() + ",.4)!important;margin:0 10px!important;max-width:65%;padding:5px;position:fixed!important;z-index:11!important;box-shadow:rgba(0,0,0,.3) 0 2px 5px;border-radius:3px}\
    table.inline td.reply{background:rgba(0,0,0,.1)!important;border:1px solid rgba(255,255,255,.5);border-radius:3px;padding:5px!important;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}\
    a.linkmail[href='mailto:sage']:after{font-size:10px;content:' (SAGE)'}\
    .omittedposts{color:#fff;}\
    a.omittedposts{background:rgba(36,36,36,.9);color:#aaa!important;margin:0 10px!important;padding:2px 6px;border-radius:3px 3px 0 0}\
    a.omittedposts:hover{color:#fff!important}\
    .deletebuttons{border-left:1px solid #161616!important;border-top:1px solid #161616!important;position:fixed;bottom:18px;right:315px;\
    height:22px;width:0px;overflow:hidden;white-space:nowrap;padding:1px 2px 0 16px!important;z-index:2;\
    -webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}\
    .deletebuttons:hover{padding-left:2px!important;width:186px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}\
    .deletebuttons:before{content:'X';color:#fff;display:inline-block;position:absolute;left:0;top:0;width:20px;height:24px;text-align:center;padding-top:1px;line-height:20px}\
    .deletebuttons:hover:before{overflow:hidden;white-space:nowrap;padding:0;width:0}\
    .deletebuttons:after{font-size:9px!important;color:#ccc!important;content:'FILE ONLY';position:absolute;bottom:0;right:68px;line-height:22px}\
    .deletebuttons *{visibility:visible!important}\
    .deletebuttons input[type=checkbox]{position:absolute;right:50px;bottom:3px!important;top:auto!important}\
    .deletebuttons .inputtext{width:138px}\
    .deletebuttons input:not([type=checkbox]){height:20px!important;margin:0!important}\
    " + (!config["Show Logo"] ? ".logo," : "") + (config["Replace Reply Form"] ? "body>table~.postarea," : "") + "#recaptcha_logo,#recaptcha_tagline,td[align=right],td.rules,img + br,iframe,#BF_WIDGET,.bf,\
    .yui-g,#filter-button,#recaptcha_table td:nth-of-type(2),#option-button,#hd,#ft,td small,#footer,.rules,center font small,body>span[style],body>br,td.reply>br,td.replyhl>br,body>hr,\
    form[name=delform]>span[style],div.thread>br,td.postblock,.deletebuttons input[type=button],.deletebuttons br,table[width='100%'],form[name=delform]>br[clear],#qp>br,\
    .logo>br,body>div[style*='center'],body>center:nth-of-type(1),form[name=delform]>center,.hidden,body>span[style]~form[name=delform]>br,body>span[style]~form[name=delform]>hr,\
    form[name=delform] center+hr,center~form[name=delform] hr:nth-last-of-type(2),form[name=delform] hr:nth-last-of-type(1),body>span[style]~#thread_filter>div:first-child>span:first-child,#thread_filter br,[hidden],\
    body>span[style]~#navlinks,#navtop,#navtopr{display:none!important}\
    table,td{border:none!important;color:#ccc!important}\
    .replymode{background-color:transparent!important;color:#fff!important}\
    th{background-color:#000!important;opacity:0!important}\
    tr{background-color:transparent!important;color:#fff!important}\
    tr[height='73']{height:auto!important}\
    #recaptcha_div{height:auto!important}\
    #recaptcha_table #recaptcha_image{background-color:transparent!important;margin-left:0!important;border:none!important}\
    #recaptcha_image img,#qr img[src*='recaptcha/api']{width:305px!important}\
    #recaptcha_table tr td{padding:0!important}\
    .recaptcha_input_area{padding:0!important}\
    .recaptcha_image_cell{padding-right:2px!important}\
    div{color:#fff!important}\
    blockquote{margin:1em 12px 2em 40px!important}\
    blockquote a{color:#999!important}\
    blockquote>.abbr{color:#fff!important}\
    div.reply{border:none!important;margin:0!important;z-index:2!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img{float:left;margin:2px 20px 12px!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img+img{margin:0 0 20px!important;position:relative;z-index:8!important}\
    img[alt='closed'],[alt='sticky']\
    {background-image:url(http://img175.imageshack.us/img175/1497/yunoiconsbf0.png)!important;background-color:transparent!important;background-repeat:no-repeat;display:inline-block;\
    height:0!important;margin:0 1px!important;padding-top:16px!important;margin-right:-3px!important;width:16px!important;margin-left:4px!important}\
    [alt='sticky']{background-position:-129px 0!important}\
    [alt='closed']{background-position:-112px -16px!important}\
    .inputtext,textarea{margin:0;padding:1px 4px;outline:none}\
    input[type=file]{width:305px;margin:0}\
    .inputtext:not(textarea),#qr input[form=qr_form],#post #foo input{height:22px!important}\
    form[name=post] .inputtext:not(textarea),#qr>.move>.inputtext,#qr input[name=pwd]{width:305px!important}\
    form[name=post] input[type=text][name=sub]{width:254px!important;margin-right:1px!important}\
    textarea,button,input:not([type=checkbox]),input[type=file]>input[type=button],select\
    {background:rgba(22,22,22,0.9)!important;border:none!important;border-bottom:1px solid #101010!important;border-top:1px solid #262626!important}\
    input[type=file]::-webkit-file-upload-button\
    {background:rgba(22,22,22,0.9)!important;border:none!important;border-right:1px solid #262626!important;font-size:8px!important;text-transform:uppercase!important;\
    padding:0 5px!important;width:auto!important;vertical-align:bottom;height:22px!important;color:#ddd!important;cursor:pointer;margin:0!important;\
    -webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    input[type=file]::-webkit-file-upload-button:hover{background:rgba(33,33,33,0.9)!important}\
    textarea:hover,button:hover,input:not([type=file]):hover,input[type=file]>input[type=button]:hover{background:rgba(33,33,33,0.9)!important}\
    input,select{color:#fff!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    input[type=submit],button{width:50px;height:22px!important;color:#ddd!important;vertical-align:top;padding:0!important;font-size:9px!important;text-transform:uppercase}\
    input[type=checkbox],input[type=radio]{position:relative;top:2px!important;margin:2px!important;vertical-align:top;border:1px solid #444!important;background:rgba(22,22,22,0.9)!important;\
    width:12px!important;height:12px!important;border-radius:3px!important}\
    input[type=checkbox]:checked{border:1px solid #1f1f1f!important;background:url(data:image/png;base64," + checkMark + ") center no-repeat rgba(180,180,180,0.6)!important;box-shadow:#eee 0 0 2px}\
    input[type=radio]:checked{border:1px solid #1f1f1f!important;background:rgba(180,180,180,0.6)!important;box-shadow:#eee 0 0 2px}\
    input[type=checkbox]:active,input[type=radio]:active{background:rgba(255,255,255,0.6)!important}\
    td.reply input[type=checkbox],td.replyhl input[type=checkbox],#themeoptions input[type=checkbox],#options input[type=checkbox]{top:0!important}\
    td.reply input[type=checkbox],td.replyhl input[type=checkbox]{margin:0!important}\
    input[name=recaptcha_response_field],input#recaptcha_response_field{border:none!important;height:22px!important;padding:1px 4px!important;width:305px!important;border-bottom:1px solid #101010!important;border-top:1px solid #262626!important}\
    select{box-sizing:content-box;-moz-box-sizing:content-box;-o-box-sizing:content-box}\
    select:hover{background:rgba(50,50,50,1);}\
    textarea{color:#fff;margin:0!important}\
    .postarea textarea,#qr textarea,#post textarea{width:305px!important;height:125px!important;resize:none}\
    td.doubledash{padding:0;text-indent:-9999px}\
    .logo{position:fixed;right:0;top:19px;text-align:center;padding:2px 6px;width:300px!important;z-index:3}\
    .logo img{margin:0!important;opacity:0.4;border:1px solid #161616!important}\
    .logo span{color:#eee;text-shadow:rgba(0,0,0,.4) 2px 0 4px,rgba(0,0,0,.4) -2px 0 4px,rgba(0,0,0,.4) 0 -2px 4px,rgba(0,0,0,.4) 0 2px 4px;\
    display:block;font-size:20px!important;text-align:center;width:300px;position:absolute;font-family:Trebuchet MS,sans-serif!important;bottom:-12px}\
    .logo font[size='1']{text-shadow:#000 0 0 3px;color:#ccc;position:absolute;bottom:8px;left:7px;text-align:center;width:300px}\
    .logo font[size='1']>a{padding:0 2px;text-transform:none!important}\
    div.autohide>a[title='Auto-hide dialog box']{color:#fff!important;text-decoration:underline!important}#captchas{padding:0 3px}\
    .postarea table, .postarea table td{padding:0!important;border-spacing:0px!important;border-collapse:collapse!important}\
    .postarea,#qr,#post{width:306px;height:347px;position:fixed!important;z-index:1!important;margin:0!important;padding:3px;right:0;bottom:-312px;top:auto!important;left:auto!important;\
    -webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;border-top:1px solid #161616!important}\
    .postarea:hover{bottom:7px;-webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out}\
    .postarea form[name=post]:before{display:block;height:18px;padding-top:1px;text-align:center;content:'" + postTabText + "'}\
    form[name=post] #com_submit+label{position:absolute;color:#ccc!important;top:2px;right:56px;vertical-align:bottom}\
    .postarea #com_submit+label{position:absolute;color:#ccc!important;top:auto!important;bottom:17px;right:8px!important;vertical-align:bottom}\
    form[name=post] input[name=email]+label{position:absolute;color:#ccc!important;right:6px;top:1px;vertical-align:bottom;z-index:1}\
    .filesize{display:block!important;margin:2px 6px!important}\
    div.op .filesize{display:inline-block!important}\
    td .filesize{margin:2px 18px!important}\
    .filesize span{font-size:0!important;visibility:hidden}\
    .filesize span:after{content:attr(title);font-size:12px;visibility:visible}\
    .postarea input[type=password]{width:150px}\
    #imageType,input:not([type=checkbox]),input:not([type=radio]),input[type=file]>input[type=button],input[type=submit],button,select,textarea\
    {-webkit-appearance:none;-o-appearance:none;}\
    #watcher .move,#updater .move,#options .move,#stats .move,#filter>div:first-child,#thread_filter>div:first-child,#qr .move,#post .move{cursor:default!important}\
    #watcher{position:fixed!important;top:" + (config["Show Logo"] ? 126 : 19) + "px!important;right:0!important;left:auto!important;bottom:auto!important;width:312px!important}\
    #watcher .move,#themeoptions .move{text-decoration:none!important;padding:5px!important;line-height:10px!important}\
    #watcher>div{max-width:100%!important}\
    #watcher>div>a:first-child,.container:before{font-size:10px!important}\
    #overlay,#overlay2{background:rgba(0,0,0,.5);position:fixed;top:0;left:0;height:100%;width:100%;text-align:center;z-index:1000}\
    #overlay:before,#overlay2:before{content:'';display:inline-block;height:100%;vertical-align:middle}\
    #themeoptions,#addMascot{display:inline-block;text-align:right!important;width:600px;padding:5px;vertical-align:middle}\
    #themeoptions>div{padding:5px}\
    a.trbtn{display:inline-block;line-height:18px;margin:0 2px;padding:2px 10px;text-align:center;width:40px;\
    background:-webkit-linear-gradient(top,rgba(60,60,60,.9),rgba(40,40,40,.9))!important;background:-moz-linear-gradient(top,rgba(60,60,60,.9),rgba(40,40,40,.9))!important;\
    background:-o-linear-gradient(top,rgba(60,60,60,.9),rgba(40,40,40,.9))!important;border-radius:3px;box-shadow:rgba(0,0,0,.3) 0 0 2px}\
    a.trbtn:hover{background:rgba(60,60,60,.9);background:-webkit-linear-gradient(top,rgba(80,80,80,.9),rgba(60,60,60,.3));\
    background:-moz-linear-gradient(top,rgba(80,80,80,.9),rgba(60,60,60,.3));background:-o-linear-gradient(top,rgba(80,80,80,.9),rgba(60,60,60,.3))}\
    a.trbtn:active{box-shadow:inset rgba(0,0,0,.3) 0 0 3px, rgba(0,0,0,.3) 0 0 2px}\
    a.trbtn-small{padding:2px 5px;width:30px}\
    #themeoptions #toNav{list-style:none;margin:0;padding:0;position:absolute;top:-26px}\
    #themeoptions #toNav li{float:left;margin:0;padding:0}\
    #themeoptions #toNav li label{background:rgba(30,30,30,.9);color:#888!important;display:block;line-height:16px;\
    margin:0 2px;padding:5px 10px;text-align:center;width:75px;border-radius:5px 5px 0 0;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    #themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover{color:#fff!important}\
    #themeoptions #toWrapper{background:rgba(0,0,0,.3);border:1px solid #161616;height:300px;box-shadow:inset rgba(0,0,0,.3) 0 0 5px, rgba(150,150,150,.3) 0 1px 3px;border-radius:5px}\
    #themeoptions #toWrapper>div{height:300px;overflow:auto}\
    #themeoptions #toWrapper>[name=toTab]:not(:checked)+div{display:none}\
    #themeoptions #tMain label,#themeoptions #tNavLinks>div,#updater label{display:block;border-bottom:1px solid rgba(40,40,40,.3);border-top:1px solid rgba(0,0,0,.1);height:20px;padding:0 3px;vertical-align:top}\
    #themeoptions #tMain label:first-child,#updater div:first-child label{border-top:none!important}\
    #themeoptions #tMain label:last-child,#updater div:nth-last-of-type(3) label{border-bottom:none!important}\
    #themeoptions #tMain label:hover,#updater label:hover,#addMascot label:hover{background:rgba(33,33,33,.6)}\
    #themeoptions #tMascot{text-align:center}\
    #themeoptions #toWrapper>div>a{position:absolute;bottom:10px;left:10px}\
    #themeoptions #tMascot div{display:inline-block;position:relative;margin:2px;\
    border-radius:10px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}\
    #themeoptions #tMascot div.selected{background:rgba(" + mascot.color.rgb() + ",.6);box-shadow:inset rgba(0,0,0,.4) 0 0 15px, rgba(" + mascot.color.rgb() + ",.6) 0 0 2px}\
    #themeoptions #tMascot div img{max-width:185px;max-height:257px;border-radius:10px}\
    #themeoptions #tMascot div a{position:absolute;top:0;padding:5px 8px;background:rgba(0,0,0,.3)}\
    #themeoptions #tMascot div a:not([href]):hover{background:rgba(0,0,0,.5)}\
    #themeoptions #tMascot div a[title=Delete]{left:0;border-radius:10px 0 10px 0}\
    #themeoptions #tMascot div a[title=Edit]{right:0;border-radius:0 10px 0 10px}\
    #themeoptions #tNavLinks>div{height:24px;padding-top:1px}\
    #themeoptions #tNavLinks label{margin:0 5px;position:relative;top:1px}\
    #themeoptions #tNavLinks label:first-child{float:left}\
    #themeoptions #tNavLinks label:first-child>input[type=text]{width:130px}\
    #themeoptions #tNavLinks label>input[type=text]{height:19px!important;width:180px}\
    #themeoptions label>span{float:left;font-size:12px!important;line-height:18px}\
    #themeoptions label>input[type=checkbox]{margin:4px 2px 0!important;vertical-align:bottom!important}\
    #themeoptions label>select,#themeoptions label>input[type=text]{height:16px!important;margin:1px 0!important;width:100px}\
    #themeoptions input[type=text]{height:18px;margin:1px 0 0!important;padding:1px 3px!important}\
    #themeoptions textarea{background:transparent!important;border:none!important;height:100%!important;width:100%!important;resize:none}\
    #addMascot{width:350px!important;height:75px!important}\
    #addMascot>div{padding:5px}\
    #addMascot>label{display:block}\
    #addMascot>label>span{float:left;line-height:22px;padding-left:5px}\
    #addMascot>label>input,#addMascot>label>textarea{width:200px}\
    #addMascot>label>textarea{height:18px;line-height:18px;overflow:hidden;resize:none}\
    #themeoptions,#options.dialog,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,#addMascot{background:rgba(40,40,40,.98)!important;text-align:center}\
    #options .dialog,#options.dialog,#themeoptions,#addMascot{margin:0 auto!important;text-align:left;box-shadow:rgba(0,0,0,.6) 0 0 10px;border-radius:5px}\
    #options hr{margin:3px 0!important}\
    #options button{width:auto!important}\
    #options ul{border:1px solid #161616;padding:2px 5px!important;border-radius:5px;box-shadow:inset #444 0 0 5px}\
    #options ul li{height:0;opacity:0;overflow:hidden;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    #options ul:hover li{height:auto;min-height:20px;max-height:48px;opacity:1}\
    #thread_filter{background:transparent!important;position:fixed!important;top:0!important;right:0!important;left:auto!important;bottom:auto!important;width:312px;z-index:8!important}\
    body>span[style]~#thread_filter:hover{padding-top:20px!important}\
    #thread_filter.autohide:not(:hover){width:115px}\
    #thread_filter input{height:22px;margin:2px 1px;padding:1px 4px;width:230px}\
    #thread_filter textarea{width:305px}\
    #thread_filter>.autohide>span{float:left;line-height:24px;margin-left:2px}\
    #thread_filter>div:first-child{padding:0!important}\
    #thread_filter>div:first-child>span{padding:1px 5px!important}\
    #thread_filter>div:first-child>span.autohide{border-top:1px solid #161616}\
    body>span[style]~#thread_filter>div:first-child{height:16px!important;padding:2px 5px!important}\
    body>span[style]~#thread_filter>div:first-child>span{padding:0!important}\
    body>span[style]~#thread_filter>div:first-child>span.autohide{border:none!important}\
    #thread_filter>div:not(:first-child):not(:last-child){padding:0 3px!important}\
    #imgControls{height:18px;position:fixed!important;right:0;top:0;width:140px!important;padding-right:172px!important;z-index:6}\
    #imgControls #imageType{border:none!important;float:left;font-size:12px!important;max-height:16px!important;max-width:85px;line-height:14px!important}\
    #imgControls>label{border-right:1px solid #161616;float:right;height:18px!important}\
    #imgControls>label:before{color:#fff!important;content:'EXPAND';font-size:9px!important}\
    .deletebuttons:before,.postarea form[name=post]:before,#qr .move:before,#post .move:before,.logo font[size='1'],a.trbtn{font-size:10px!important;text-transform:uppercase}\
    #thread_filter>div:first-child>span,#imgControls label,form[name=post] #com_submit+label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,#post input[name=upfile]+a,#post #captchas,#post #attach,\
    #qr #close,#post a.close,form[name=post] input[name=email]+label,#watcher .move,#themeoptions .move,#updater span,body>a[style='cursor: pointer; float: right;']\
    {text-transform:uppercase;font-size:9px!important;line-height:18px}\
    #qr{bottom:-5px!important;height:auto!important}\
    #qr #autohide{position:absolute;right:24px!important;top:4px!important}\
    #qr .autohide>form>div>label{line-height:20px;margin-left:5px}\
    #qr>#autohide:not(:checked)~.autohide,#qr:hover>#autohide:checked~.autohide{height:auto!important;overflow:visible!important;padding-bottom:25px!important}\
    #qr #files>div,#qr .autohide>div,#qr .autohide>form>div{position:relative}\
    #qr input[name=upfile]+a,#qr #captchas,#qr #attach{position:absolute;right:6px;top:1px}\
    #qr input[name=upfile]+a:before,#qr>#close:before,#post>a.close:before{content:'[';padding-right:2px}\
    #qr input[name=upfile]+a:after,#qr>#close:after,#post>a.close:after{content:']';padding-left:2px}\
    #qr>div.move{text-align:center!important;line-height:16px}\
    #qr .move:before{color:#fff;content:'QUICK REPLY';width:306px}\
    #qr #close,#post>a.close{position:absolute;right:6px;top:1px}\
    #post{bottom:-5px!important;height:auto!important;padding-bottom:26px!important}\
    #post #pstats{color:#fff!important;line-height:18px}\
    #post .autohide{position:relative}\
    #post .autohide #items+div>label{line-height:22px}\
    #post #autohide{position:absolute;right:28px;top:3px!important}\
    #post #foo{margin-left:20px}\
    #post #foo input{float:left;margin:0!important;margin-left:1px!important;padding:2px;width:94px!important}\
    #post #reholder{position:static!important}\
    #post #reholder #charcount{bottom:26px;right:5px!important;top:auto!important}\
    #post #reholder #fileSpan{left:2px!important;right:auto!important}\
    #post #captchaImg{width:305px}\
    #post #items a.close{background: rgba(20,20,20,.9);margin:1px;padding:0 4px;position:absolute;left:0;top:0;border-radius:2px}\
    #post #items a.close:hover{color:#f00!important}\
    #post #items>div,#post .autohide>div,#post .autohide>form>div{position:relative}\
    #updater{position:fixed!important;bottom:auto!important;left:auto!important;right:88px!important;top:0!important;line-height:18px;padding:0 3px;z-index:9!important;width:78px;text-align:left!important}\
    #updater:hover{border:1px solid #161616!important;border-top:none!important;border-right:none!important;right:0!important;padding-bottom:3px;width:166px!important}\
    #updater .move{line-height:18px!important}\
    #updater input{float:right}\
    #updater input:not([type=checkbox]){margin:1px!important}\
    #updater input[type=text]{height:19px!important;width:50px!important}\
    #updater:not(:hover){background:transparent!important}\
    #stats{height:18px;bottom:auto!important;left:auto!important;right:0!important;top:0!important;z-index:8!important;padding-right:3px;text-align:right}\
    #stats .move{line-height:18px}\
    #stats span{color:#fff!important;font-size:9px!important;margin:0 2px}\
    #stats #postcount:before{font-size:9px!important;content:'POSTS: ';}\
    #stats #imagecount:before{font-size:9px!important;content:'IMAGES: ';}\
    #navlinks{font-size:12px!important;top:0!important;height:20px;line-height:16px;z-index:6!important}\
    #iHover{padding-bottom:19px;z-index:8!important}\
    body>center:nth-of-type(2){position:relative}\
    body>center:nth-of-type(2)>font[color=red]{color:#f66!important;position:absolute;width:100%;top:-150px;left:0;z-index:11;\
    -webkit-transition:top .1s ease-in-out;-moz-transition:top .1s ease-in-out;-o-transition:top .1s ease-in-out}\
    body>center:nth-of-type(2)>font[color=red]:hover{top:-18px!important}\
    body>center:nth-of-type(2)>font[color=red]:after{color:#fff!important;content:'ANNOUNCEMENT';display:block;line-height:18px;font-size:10px!important}\
    body>center:nth-of-type(2)>font[color=red]>b{display:block;overflow:auto;width:100%;padding:5px}\
    #header{left:0!important;height:18px!important;width:100%!important;padding:0!important;position:fixed!important;top:auto!important;bottom:0!important;z-index:9!important;\
    border-top:1px solid #161616!important;background:rgb(40,40,40)!important;text-align:center;line-height:18px}\
    #navtop,#navtopr{float:none!important}\
    #navtop{padding:1px 0;color:#aaa!important}\
    #navtop a{text-shadow:rgba(0,0,0,.3) 0 0 5px}\
    #navtopr{position:absolute;right:5px!important;top:0;font-size:0!important;color:transparent!important}\
    #navtopr>a:not(:first-child):last-child:before{content:'/';padding:0 2px}\
    .pages{border-top:1px solid #161616!important;border-right:1px solid #161616!important;margin:0!important;padding-top:1px;width:auto!important;height:24px;\
    position:fixed!important;bottom:18px;left:-370px!important;z-index:2;-webkit-transition:left .1s ease-in-out 1s;-moz-transition:left .1s ease-in-out 1s;-o-transition:left .1s ease-in-out 1s}\
    .pages:hover{left:0!important;-webkit-transition:left .1s ease-in-out 1s;-moz-transition:left .1s ease-in-out 1s;-o-transition:left .1s ease-in-out 1s}\
    .pages *{font-size:" + config["Font Size"] + "px!important}\
    .pages td{font-size:9px!important;text-transform:uppercase;padding:0!important;min-width:40px;text-align:center}\
    .pages td:nth-of-type(2){padding:0 5px!important}\
    .pages span{color:#aaa!important}\
    .pages b{color:#fff!important}\
    .pages a:not(:last-child),.pages b:not(:last-child){margin:0 2px}\
    .pages input{background:rgba(33,33,33,.9)!important;border:none!important;height:22px!important;width:auto!important;padding:0 10px!important;position:relative;top:-1px}\
    .pages input:hover{background:rgba(36,36,36,.9)!important;box-shadow:inset rgba(0,0,0,0.35) 0 0 5px}\
    form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),#qr>div.move,#imgControls>label,.pages td:nth-of-type(2),img[alt='closed'],[alt='sticky'],\
    #stats .move,.deletebuttons{font-size:0px!important;color:transparent!important}\
    body>a[style='cursor: pointer; float: right;']{position:fixed;right:5px;top:" + (config["Show Logo"] ? 126 : 19) + "px;z-index:4}\
    body>a[style='cursor: pointer; float: right;']+div>table{height:100%!important;padding-bottom:20px}\
    body>a[style='cursor: pointer; float: right;']+div>table table{width:100%}";
    
    if (!config["Show Announcements"])
        css += "body>center:nth-of-type(2)>font[color=red]{display:none!important}";
        
    if (config["Pages Location"] == 2)
        css += ".pages{background:transparent!important;height:18px!important;margin:0!important;border:none!important;bottom:0!important;left:0!important;z-index:9!important}\
                .pages input{height:18px!important;top:0!important}";

    var insertStyle = function(e)
    {
        if ($(document.head).exists())
            $(document).unbind("DOMNodeInserted", insertStyle);
        else
            return;
            
        $(document.head).append($("<style type='text/css' id=ch4SS>" + css));
    };
    $(document).bind("DOMNodeInserted", insertStyle);
    /* END STYLING */
    
    /* DOM MANIPULATION */
    if (document.body) // opera - with .user.js extension
        DOMLoaded();
    else
        $(document).bind("DOMContentLoaded", DOMLoaded);
    
    function DOMLoaded()
    {
        // Add options link
        $SS.init();
        
        var postLoadCSS = "#navtop,#navtopr{display:inline!important}";
            
        if (config["Custom Navigation Links"])
            buildCustomNav();
        else
        {
            var bTitle = $(".logo span").text();
            
            postLoadCSS += "#navtop{bottom:3px;color:transparent!important;display:inline-block!important;font-size:0!important;height:18px;padding:3px 6px 6px;position:relative;width:500px;\
                            -webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
                            #navtop:before{color:" + mascot.color.hex + ";content:'" + bTitle + "';display:block;font-size:" + config["Font Size"] + "px}\
                            #navtop:hover{background:rgb(42,42,42);bottom:48px;height:64px;border-radius:3px;box-shadow:rgba(0,0,0,.2) 0 0 5px}\
                            #navtop a{padding:2px!important}";
        }
        
        var ann = $("body>center:nth-of-type(2)>font[color=red]");
        
        if (config["Show Announcements"] && ann.exists())
            postLoadCSS += "body>center:nth-of-type(2)>font[color=red]{top:" + (-ann.get().scrollHeight - 1) + "px!important}";
        else
            postLoadCSS += "form[name=delform]{margin-top:0!important;padding-top:2px}";
        
        $("form[name=post]").elements().each(function()
        {
            switch ($(this).attr("name"))
            {
                case "name":
                    $(this).attr("placeholder", "Name");
                    break;
                case "email":
                    $(this).attr("placeholder", "E-mail");
                    break;
                case "sub":
                    $(this).attr("placeholder", "Subject");
                    break;
                case "com":
                    $(this).attr("placeholder", "Comment");
                    break;
                case "recaptcha_response_field":
                    $(this).attr("placeholder", "Verification");
                    break;
                case "pwd":
                    $(this).attr("placeholder", "Password");
                    break;
            }
        });
        
        // Truncuate Previous to Prev
        var prev;
        if ((prev = $(".pages td input[value='Previous']")).exists())
            prev.val("Prev");
        else if ((prev = $(".pages td:first-child")).exists())
            prev.text("Prev");
        
        // Slide out pages
        if (config["Pages Location"] == 1)
        {
            var pages = $(".pages");
            
            if (pages.exists())
            {
                var leftOffset = $(".pages td:last-child").get().scrollWidth - pages.get().offsetWidth;
                postLoadCSS += ".pages{left:" + leftOffset + "px!important}";
            }
        }
        
        // Add ExHentai source link
        if (config["ExHentai Source"])
        {
            postLoadCSS += ".exSource{position:relative}\
                            .exSource.exFound{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important}\
                            .exSource.exFound:hover{background:rgba(36,36,36,.9)!important;border-radius:3px 3px 0 0;-o-border-radius:3px 3px 0 0}\
                            .exSource:hover>.exPopup{display:block!important}\
                            .exPopup{background:rgba(36,36,36,.9)!important;display:none;left:0;padding:5px;position:absolute!important;white-space:nowrap;z-index:8!important;\
                            box-shadow:rgba(0,0,0,.3) 0 2px 5px;-moz-box-shadow:rgba(0,0,0,.3) 0 2px 5px;border-radius:0 3px 3px 3px;-o-border-radius:0 3px 3px 3px}\
                            .exPopup a{display:block}";
            
            addLinks(document);
            $(document).bind("DOMNodeInserted", function(e)
            {
                if (e.target.nodeName == "TABLE")
                    addLinks(e.target);
            });
        }
        
        $("#ch4SS").appendText(postLoadCSS);
    }
    /* END DOM MANIPULATION */
    
    /* Thanks to hurfdurf
     * http://pastebin.com/TTDJNH7c */
    /* EXHENTAI SOURCE */
    function addLinks(x)
    {
        var targets = $("img[md5]:not([exSourceAdded])", x);
        targets.each(function()
        {
            var node = $(this).parent().previousSibling(".filesize");
            if (!$("a.exSource", node).exists())
            {
                var a = $("<a class=exSource href='" + this.parentNode.href + "'>exhentai");
                a.bind("click", fetchImage);
                
                // try to insert this link after 4chan x's source links
                setTimeout(function(){ node.append(document.createTextNode(" ")).append(a); }, 1);
                $(this).attr("exSourceAdded", "true");
            }
        });
    }

    function fetchImage(e)
    {
        if (e.which != 1) return;
        e.preventDefault();
        
        var a = e.target;
        a.textContent = "loading";
        
        GM_xmlhttpRequest(
        {
            method: "GET",
            url: a.href,
            data: a,
            overrideMimeType : "text/plain; charset=x-user-defined",
            headers: { "Content-Type": "image/jpeg" },
            onload: function(x) { checkTitles(a, x.responseText); }
        });
    }

    function checkTitles(anchor, data)
    {
        var hash = sha1Hash(data_string(data));
        anchor = $(anchor);
        
        anchor.html("checking")
              .attr("href", "http://exhentai.org/?f_shash=" + hash + "&fs_similar=1&fs_exp=1")
              .unbind("click", fetchImage);
        
        GM_xmlhttpRequest(
        {
            method: "GET",
            url: anchor.attr("href"),
            data: anchor,
            onload: function(x)
            {
                var temp = $("<div>");                
                temp.html(x.responseText);
                var results = $("div.it3 > a:not([rel='nofollow']), div.itd2 > a:not([rel='nofollow'])", temp);
                var MAX = results.length();
                
                anchor.html("found: " + MAX).attr("target", "_blank");
                
                if (MAX > 0)
                {
                    var div = $("<div class=exPopup id=ex" + hash + ">");
                    anchor.addClass("exFound").append(div);
                    
                    for (var i = 0; i < MAX; i++)
                    {
                        var ret = results.get(i);
                        var a = $("<a href='" + ret.href + "' target=_blank>" + ret.innerHTML);
                        div.append(a);
                    }
                }
            }
        });
    }

    /* SHA1 HASING */
    function data_string(data)
    {
        var data_string = "";
        for (var i = 0, MAX = data.length; i < MAX; i++)
            data_string += String.fromCharCode(data[i].charCodeAt(0) & 0xff);
            
        return data_string;
    }

    function sha1Hash(msg)
    {
        var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
        msg += String.fromCharCode(0x80);
        var l = msg.length/4 + 2;
        var N = Math.ceil(l/16);
        var M = new Array(N);
        for (var i = 0; i < N; i++)
        {
            M[i] = new Array(16);
            for (var j = 0; j < 16; j++)
                M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                          (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        }
        
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

        var H0 = 0x67452301;
        var H1 = 0xefcdab89;
        var H2 = 0x98badcfe;
        var H3 = 0x10325476;
        var H4 = 0xc3d2e1f0;

        var W = new Array(80); var a, b, c, d, e;
        for (var i = 0; i < N; i++)
        {
            for (var t = 0; t < 16; t++)
                W[t] = M[i][t];
                
            for (var t = 16; t < 80; t++)
                W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
                
            a = H0; b = H1; c = H2; d = H3; e = H4;
            for (var t = 0; t < 80; t++)
            {
                var s = Math.floor(t/20);
                var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
                e = d;
                d = c;
                c = ROTL(b, 30);
                b = a;
                a = T;
            }
            
            H0 = (H0+a) & 0xffffffff;
            H1 = (H1+b) & 0xffffffff;
            H2 = (H2+c) & 0xffffffff;
            H3 = (H3+d) & 0xffffffff;
            H4 = (H4+e) & 0xffffffff;
        }
        
        return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
    }

    function f(s, x, y, z)
    {
        switch (s)
        {
            case 0: return (x & y) ^ (~x & z);
            case 1: return x ^ y ^ z;
            case 2: return (x & y) ^ (x & z) ^ (y & z);
            case 3: return x ^ y ^ z;
        }
    }

    function ROTL(x, n)
    {
        return (x<<n) | (x>>>(32-n));
    }

    Number.prototype.toHexStr = function()
    {
        var s = "", v;
        
        for (var i = 7; i >= 0; i--)
        {
            v = (this >>> (i*4)) & 0xf;
            s += v.toString(16);
        }
        
        return s;
    }
    /* END SHA1 HASHING */
    /* END EXHENTAI SOURCE */
})();