// ==UserScript==
// @name          4chan Style Script
// @author        ahoka
// @version       1.2
// @run-at        document-start
// @include       http://boards.4chan.org/*
// @include       http://rs.4chan.org/*
// @include       http://sys.4chan.org/*
// @updateURL     https://github.com/ahodesuka/4chan-Style-Script/raw/master/4chanSS.user.js
// ==/UserScript==

/* 
 *  TODO LIST:
 *    - Add mascot position option (mascot specific).
 *    - Add jscolor, and trim it down a bit.
 *    - Create create theme/edit theme ui.
 *    - Create add/delete font ui.
 *    - Add some more themes.
 *    - Style sys/rs.
 *    - Rice: style checkbox with javascript.
 */

(function()
{
    var defaultConfig =
    {
        "Show Announcements":      [ true, "Toggle visibility of announcements made by staff" ],
        "Show Logo":               [ true, "Toggle visibility of board name and logo" ],
        "Replace Reply Form":      [ true, "Replaces the default reply form with 4chan x's QR form" ],
        "Custom Navigation Links": [ true, "Use specified links instead of showing all boards" ],
        "Style Scrollbars":        [ true, "Make the scroll bar match the theme" ],
        "Post Form":
        [
            1, "Change the transition for the post form",
            [
                { name: "Slide Up", value: 1 },
                { name: "Fade",     value: 2 },
                { name: "Fixed",    value: 3 }
            ]
        ],
        "Sidebar Size":
        [
            316, "Change the size of the sidebar",
            [
                { name: "Original", value: 316 },
                { name: "Smaller",  value: 270 }
            ]
        ],
        "Rice Inputs":
        [
            2, "Style certain input elements to match theme (Styling checkbox's may impede load speed)",
            [
                { name: "Disabled", value: 1 },
                { name: "File",     value: 2 },
                { name: "Checkbox", value: 3 },
                { name: "Both",     value: 4 }
            ]
        ],
        "ExHentai Source":
        [
            1, "Adds a quick link to perform a file search through ExHentai or E-Hentai",
            [
                { name: "Disabled",       value: 1 },
                { name: "exhentai.org",   value: 2 },
                { name: "g.e-hentai.org", value: 3 }
            ]
        ],
        "Backlinks Position":
        [
            1, "Change the position of 4chan x backlinks",
            [
                { name: "Default",      value: 1 },
                { name: "Bottom Right", value: 2 },
                { name: "Bottom Left",  value: 3 }
            ]
        ],
        "Pages Position":
        [
            1, "Change the location of the page links",
            [
                { name: "Slide Out",         value: 1 },
                { name: "In Navigation Bar", value: 2 },
                { name: "Fixed Vertically",  value: 3 }
            ]
        ],
        "Font":
        [
            "Calibri", "Set the default font family",
            [
                "Ubuntu",
                "Consolas",
                "Droid Sans",
                "Terminus",
                "Segoe UI",
                "Calibri",
                "Arial",
                "Lucida Grande",
                "Helvetica"
            ]
        ],
        "Font Size": [ 12, "Set the general size of text (Pixels)" ],
        "Mascots":
        [
            { img: "http://i.imgur.com/zhPlM.png", color: "6cb2ee", enabled: true },
            { img: "http://i.imgur.com/b9KmB.png", color: "886999", enabled: true },
            { img: "http://i.imgur.com/bsLY4.png", color: "c63839", enabled: true },
            { img: "http://i.imgur.com/J1i26.png", color: "ef4353", enabled: true },
            { img: "http://i.imgur.com/NaKmF.png", color: "ef4353", enabled: true },
            { img: "http://i.imgur.com/K1mLx.png", color: "ef4353", enabled: true },
            { img: "http://i.imgur.com/FKDcd.png", color: "aaaaaa", enabled: true },
            { img: "http://i.imgur.com/zu9nY.png", color: "857d92", enabled: true },
            { img: "http://i.imgur.com/haBSN.png", color: "d1dfef", enabled: true }
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
                name:        "Dark Flat",
                enabled:     false,
                replyBrder:  false,
                oLinkColor:  false,
                bgImg:       "R0lGODlhAwADAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///ywAAAAAAwADAAAICQA5cMgwsCCHgAA7",
                bgColor:     "202020",
                mainColor:   "282828",
                brderColor:  "181818",
                inputColor:  "181818",
                inputbColor: "0f0f0f",
                jlinkColor:  "ffffff",
                linkColor:   "dddddd",
                linkHColor:  "ffffff",
                nameColor:   "ffffff",
                quoteColor:  "789922",
                textColor:   "ffffff",
                sageColor:   "c97b7b",
                tripColor:   "7bb3c9",
                titleColor:  "999999"
            },
            {
                name:        "Photon",
                enabled:     true,
                replyBrder:  true,
                oLinkColor:  true,
                bgImg:       false,
                bgColor:     "eeeeee",
                mainColor:   "dddddd",
                brderColor:  "cccccc",
                inputColor:  "cccccc",
                inputbColor: "bbbbbb",
                jlinkColor:  "333333",
                linkColor:   "ff6600",
                linkHColor:  "0066ff",
                nameColor:   "004a99",
                quoteColor:  "789922",
                textColor:   "333333",
                sageColor:   "990000",
                tripColor:   "ff3300",
                titleColor:  "002244"
            }
        ]
    }, SSf, $SS, config, checkMarkDark, checkMarkLight, theme, mascot, css,
    MAX_FONT_SIZE = 16,
    MIN_FONT_SIZE = 10,
    NAMESPACE     = "4chanSS.";
    
    checkMarkDark = "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";
    checkMarkLight = "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";
    
    if (!Array.isArray)
        Array.isArray = function(arg){ return Object.prototype.toString.call(arg) == "[object Array]"; };
        
    Number.prototype.toHexStr = function()
    {
        var s = "", v;
        
        for (var i = 7; i >= 0; i--)
        {
            v = (this >>> (i * 4)) & 0xf;
            s += v.toString(16);
        }
        
        return s;
    };
    
    /* STYLE SCRIPT FRAMEWORK */
    /* More or less based off jQuery */
    SSf = window.$ = function(selector, root)
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
            if (selector == null || selector == undefined) return;
            
            if (selector.constructor === SSf) return selector;
            else if (typeof selector === "string")
            {
                var root = root || document;
                var tagCheck = /^<(\w+)([^>]*)>(.*)$/.exec(selector); // NO CLOSING TAGS FOR MAIN NODE
                
                if (root.constructor === SSf)
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
                            if ((val[0] == '"' || val[0] == "'") && val[0] == val[val.length-1])
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
            else if (Array.isArray(selector))
                this.elems = Array.prototype.slice.call(selector);
            
            return this;
        },
        
        /* DOM NODE RETRIEVAL */
        clone: function(deep)
        {
            var ret = [];
            
            this.each(function(){ ret.push(this.cloneNode(deep)); }, deep);
            
            return new SSf(ret);
        },
        elements: function()
        {
            if (!this.hasSingleEl())
                return this;
            
            this.elems = Array.prototype.slice.call(this.elems[0].elements);
            
            return this;
        },
        get: function(index)
        {
            if (index == undefined && this.elems.length == 1)
                return this.elems[0];
            else if (index == undefined && !this.hasSingleEl())
                return this.elems;
            
            return this.elems[index];
        },
        
        /* DOM MANIPULATION */
        prepend: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
                
            return this.each(function(el){ this.insertBefore(el, this.firstChild); }, el);
        },
        append: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
            
            return this.each(function(el){ this.appendChild(el); }, el);
        },
        before: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
                
            return this.each(function(el){ this.parentNode.insertBefore(el, this); }, el);
        },
        after: function(el)
        {
            if (el.constructor === SSf)
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
        wrap: function(el)
        {
            if (el.constructor !== SSf)
                el = new SSf(el);
                
            return this.each(function(el)
            {
                $(this).before(el);
                el.append(this);
            }, el);
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
        checked: function(state)
        {
            return this.each(function(state){ this.checked = state; }, state);
        },
        addClass: function(classNames)
        {
            return this.each(function(classNames)
            {
                classNames = classNames.split(" ");
                for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                    if (!$(this).hasClass(classNames[j]))
                        this.className += (this.className ? " " : "") + classNames[j];
            }, classNames);
        },
        hasClass: function(className)
        {
            if (!this.hasSingleEl())
                return this;
            
            return this.elems[0].className.indexOf(className) != -1;
        },
        removeClass: function(classNames)
        {
            return this.each(function(classNames)
            {
                classNames = classNames.split(" ");
                for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                    if ($(this).hasClass(classNames[j]))
                    {
                        var cclassNames = this.className.split(" ");
                        this.className = "";
                        
                        for (var k = 0, kMAX = cclassNames.length; k < kMAX; k++)
                            if (classNames[j] != cclassNames[k])
                                this.className += (this.className ? " " : "") + cclassNames[k];
                    }
            }, classNames);
        },
        toggleClass: function(classNames)
        {
            return this.each(function(classNames)
            {
                classNames = classNames.split(" ");
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
            if (!this.hasSingleEl())
                return this;
            
            return new SSf(this.elems[0].parentNode);
        },
        children: function(selector)
        {
            if (!this.hasSingleEl())
                return this;
            else if (selector == null)
                selector = "*";
            
            return new SSf(selector, this.elems[0]);
        },
        nextSibling: function(selector)
        {
            if (!this.hasSingleEl() ? true : this.elems[0].nextSibling == null)
                return this;
            
            if (selector != undefined)
            {
                var t, m = new SSf(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;
                    
                for (var i = s.length - 1; i >= 0; i--)
                {
                    if (s[i] == this.elems[0] && t == undefined)
                        return this;
                    else if (s[i] == this.elems[0] && t != undefined)
                        return new SSf(t);
                    else if (m.elems.indexOf(s[i]) != -1)
                        t = s[i];
                }
            }
            
            return new SSf(this.elems[0].nextSibling);
        },
        previousSibling: function(selector)
        {
            if (!this.hasSingleEl() ? true : this.elems[0].previousSibling == null)
                return this;
            
            if (selector != undefined)
            {
                var t, m = new SSf(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;
                
                for (var i = 0, MAX = s.length; i < MAX; i++)
                    if (s[i] == this.elems[0] && t == undefined)
                        return this;
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
        },
        hasSingleEl: function()
        {
            return this.elems.length == 1;
        },
        
    
        /* INPUT RICE */
        riceFile: function()
        {
            return this.each(function()
            {
                if ($(this).attr("riced")) return;
                
                var div = $("<div class=riceFile><div>BROWSE...</div><span></span>"),
                    a = $(this).nextSibling("a");
                
                $(this).attr("riced", true).riceFileBind()
                       .parent().append(div.prepend(this));
                       
                if (a.exists())
                    $(this).after(a);
            });
        },
        riceFileBind: function()
        {
            return this.each(function()
            {
                $(this).bind("change", function()
                {
                    $(this).nextSibling("span").text(this.value.substr(this.value.lastIndexOf("\\") + 1));
                });
            });
        }
    };
    /* END STYLE SCRIPT FRAMEWORK */
    
    /* STYLE SCRIPT CLASSES & METHODS */
    $SS =
    {
        incRice: false,
        init: function(reload)
        {
            config = $SS.config.load();
            config["Small Font Size"] = config["Font Size"] > 11 ? 12 : config["Font Size"];
            
            mascot = $SS.options.getMascot();
            theme  = $SS.options.getTheme();
            
            $SS.setCSS();
            
            if (reload)
            {
                $SS.insertCSS();
                $SS.DOMLoaded(true);
            }
            else
            {
                $(document).bind("DOMNodeInserted", $SS.insertCSS);
                $SS.insertCSS();
                
                if (/complete|interactive/.test(document.readyState))
                    $SS.DOMLoaded();
                else
                    $(document).bind("DOMContentLoaded", $SS.DOMLoaded);
            }
        },
        
        /* STYLING & DOM */
        setCSS: function()
        {
            css = "@import url(http://fonts.googleapis.com/css?family=Jura);*{font-family:" + config["Font"] + ",Calibri,Helvetica,sans-serif!important;font-size:" + config["Font Size"] + "px!important}body>form *{font-family:" + config["Font"] + ",Calibri,Helvetica,sans-serif!important}*:focus{outline:none!important;-moz-outline:none!important;-moz-user-focus:none!important}input:active,input:focus,select:focus,textarea:focus{box-shadow:inset " + mascot.color.hex +" 0 -1px 0,inset " + mascot.color.hex +" 0 1px 0,inset " + mascot.color.hex +" -1px 0 0,inset " + mascot.color.hex +" 1px 0 0}input::-moz-focus-inner{     border:0;    padding:0}::selection{background:" + mascot.color.hex + ";color:#fff}::-moz-selection{background:" + mascot.color.hex + ";color:#fff}::-webkit-input-placeholder{color:rgba(" + theme.textColor.rgb + ",.4)!important}:-moz-placeholder{color:rgba(" + theme.textColor.rgb + ",.4)!important}" + (config["Style Scrollbars"] ? "::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track-piece,::-webkit-scrollbar-track{background:" + theme.brderColor.hex + "}::-webkit-scrollbar-corner,::-webkit-scrollbar-resizer{background:" + theme.brderColor.hex + "}::-webkit-scrollbar-thumb{background:rgb(" + theme.brderColor.shiftRGB(32, true) + ");border:2px solid " + theme.brderColor.hex + ";border-radius:5px}::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active{background:rgb(" + theme.brderColor.shiftRGB(64, true) + ")}::-webkit-scrollbar-thumb:window-inactive{}.reply ::-webkit-scrollbar-track,.reply ::-webkit-scrollbar-track-piece{border-radius:5px}": "") + "img{border:0!important}hr{border:0!important;border-top:1px solid rgba(" + theme.brderColor.rgb + ",.9)!important;    clear:left;margin:1px 0!important}h1,h2,h3,h4,h5{margin:.4em 0!important}h3,.commentpostername,.postername,.replytitle,body>center:nth-of-type(2)>font[color=red]>b,.pages b,.filetitle{font-weight:400!important}a{text-decoration:none!important;color:" + theme.linkColor.hex + "!important;font-weight:normal!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}a:hover{color:" + theme.linkHColor.hex + "!important;text-shadow:rgba(" + theme.linkHColor.rgb + ",.2) 0 0 2px!important}a:not([href]),a[href='javascript:;']{color:" + theme.jlinkColor.hex + "!important}.commentpostername,.postername,.commentpostername a,.postername a{color:" + theme.nameColor.hex + "!important}.postertrip,.trip{color:" + theme.tripColor.hex + "!important}.unkfunc{color:" + theme.quoteColor.hex + "!important}.filetitle,.replytitle{color:" + theme.titleColor.hex + "!important}a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover{color:" + theme.sageColor.hex + "!important;text-shadow:none!important}" + ( config["Pages Position"] != 2 ? ".pages td:nth-of-type(2)," : "" ) + ".reply,td.replyhl,div.stub,option,div[id*=jsMath],#jsMath_float>*,#imgControls,#imgControls #imageType,.deletebuttons,.deletebuttons::before,.postarea,a.omittedposts:hover{background:rgba(" + theme.mainColor.rgb + ",.9)!important}body>center:nth-of-type(2)>font[color=red],#header{background:" + theme.mainColor.hex + "!important}button,input[type=checkbox],input[type=radio],input[type=button],input[type=submit],#options label,#options a,#themeoptions label,#themeoptions a,#themeoptions #toNav li label,#themeoptions #tMascot div,.pointer,a.trbtn{cursor:pointer}body,.reply,.replyhl,input,select,.omittedposts,a.omittedposts,a.omittedposts:hover,blockquote>.abbr,.deletebuttons::before,.replymode,tr,div,textarea,div.autohide>a,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,#imgControls>label::before,#qr .move::before,#stats span,body>center:nth-of-type(2)>font[color=red]::before,.pages b,#navtopr span,.pages td,input[type=submit],button,form[name=post] input[name=email]+label,form[name=post] #com_submit+label,.deletebuttons::after{color:" + theme.textColor.hex + "!important}body{background:" + theme.bgImg.get() + theme.bgColor.hex +"!important;margin:0 " + config["Sidebar Size"] + "px 0 0!important;padding:18px 0 44px!important}body::before{background:rgba(" + theme.mainColor.shiftRGB(-18) + ",.8);border-left:2px solid rgba(" + theme.mainColor.rgb + ",.9);    box-shadow:inset " + theme.brderColor.hex + " 1px 0 0," + theme.brderColor.hex + " -1px 0 0;content:'';height:100%;width:" + (config["Sidebar Size"] - 3) + "px;position:fixed;right:0;    top:-19px!important;z-index:-2}body::after{background:" + mascot.img.get() + ";    background-size:contain;content:'';height:100%;    " + (config["Post Form"] == 3 ? "margin-bottom:302px;" : "") + "position:fixed;right:0;width:" + (config["Sidebar Size"] - 4) + "px;z-index:-1}body::after,.deletebuttons{    bottom:20px!important}#qr,#jsmath_button,#jsMath_panel,#jsMath_float,#themeoptions #toWrapper,#options ul,#updater:hover,body>a[style='cursor: pointer; float: right;']+div{border:1px solid " + theme.brderColor.hex + "!important}body>center:nth-of-type(2)>font[color=red]{border-bottom:1px solid " + theme.brderColor.hex + "!important}.deletebuttons,body>center:nth-of-type(2)>font[color=red]{border-left:1px solid " + theme.brderColor.hex + "!important}.deletebuttons,.postarea,body>span[style]~#qr,#header,#fs_data td{border-top:1px solid " + theme.brderColor.hex + "!important}#jsmath_button{bottom:auto!important;left:0!important;top:1px!important;right:auto!important}#jsMath_panel{bottom:auto!important;left:1em!important;top:1.75em!important;right:auto!important}textarea,input:not([type=submit]),select,select *,#updater span,#navtop,#navtopr,#navtop a,#navtopr a,#navlinks,#updater label,#themeoptions label,#themeoptions label>span,#themeoptions #tMascot div a,.pages td:nth-of-type(2) *,.filesize span::after{font:" + config["Small Font Size"] + "px " + config["Font"] + ",Calibri,Helvetica,sans-serif!important}div.thread,body>span[style]~form[name=delform]{background:rgba(" + theme.mainColor.rgb + ",.3)}div.thread{margin:0 0 1px;padding:3px 0 0 1px!important;position:relative;border-radius:2px 0 0 2px}div.thread::after,#updater div>label::after,form[name=delform] div.op::after,#addMascot>label::after{clear:both;content:'';display:block}div.op{border:0!important;position:relative}div.op>a:first-child:not([name]):not(.reportbutton){position:absolute;right:2px;top:0}form[name=delform]{border:1px solid rgba(" + theme.brderColor.rgb + ",.9);border-right:0!important;margin:0 0 0 30px;padding:0;position:relative;border-radius:4px 0 0 4px}form[name=delform] table{margin:1px 0 0;position:relative;table-layout:fixed;width:100%}form[name=delform]>table{    margin-left:1px}form[name=delform]>table:nth-last-of-type(3){    margin-bottom:1px}body>span[style]~form[name=delform]>table{    margin-left:0}body>span[style]~form[name=delform]>table:nth-last-of-type(3){    margin-bottom:0}body>span[style]~form[name=delform]{padding:4px 0 1px 1px!important}body,td.reply,td.replyhl,div.stub,.riceFile,.logo span,body>a[style='cursor: pointer; float: right;']+div{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}" + (theme.replyBrder ? ".reply,.replyhl,.stub{border:1px solid " + theme.brderColor.hex + "!important;border-right:0!important}" : "") + ".reply,.replyhl{display:inline-block;position:relative!important}.replyhider{margin:0!important;padding:1px 0 0!important;position:absolute;right:2px;width:auto!important;z-index:1}td.reply,td.replyhl{-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}td.reply>img,td.replyhl>img{    vertical-align:middle}td.reply,td.replyhl,div.stub{padding:5px!important;width:100%;border-radius:2px 0 0 2px}td.replyhl,td.qphl{background:rgba(" + theme.linkColor.rgb + ",.2)!important;box-shadow:inset rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.3) 0 0 3px}div.stub{margin:1px 0 0!important;opacity:.75;padding-right:1px!important}div.thread.stub{margin:1px 0!important}form[name=delform]>div:nth-last-of-type(2){    margin-bottom:0!important;    padding-bottom:1px!important}#imgcontrols + div.thread.stub{    margin-top:0!important}div.stub>a,.stub>.block>a{display:block;padding:2px}.container{" + (config["Backlinks Position"] != 1 ? "bottom:2px;position:absolute;" + (config["Backlinks Position"] == 2 ? "right" : "left") + ":2px;z-index:1;" : "") + "    margin-left:2px}.container *{font-size:11px!important}" + (config["Backlinks Position"] != 1 ? ".container::before{color:rgba(" + theme.textColor.rgb + ",.4)!important;content:'REPLIES:';padding-right:3px}" : "") + ".qphl{outline:none!important}#qp{background:rgba(" + theme.mainColor.shiftRGB(-8) + ",.98)!important;border:1px solid rgba(" + theme.linkColor.rgb + ",.4)!important;margin:0 10px!important;max-width:65%;padding:5px 5px 20px;position:fixed!important;z-index:11!important;box-shadow:rgba(0,0,0,.3) 0 2px 5px;border-radius:3px}table.inline td.reply{background:rgba(0,0,0,.1)!important;border:1px solid rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.2)!important;padding:5px!important;border-radius:3px}a.linkmail[href='mailto:sage']::after{font-size:10px;content:' (SAGE)'}a.omittedposts{background:rgba(" + theme.mainColor.shiftRGB(-8) + ",.9);margin:0 10px!important;padding:2px 6px;border-radius:3px 3px 0 0}.deletebuttons{position:fixed;right:" + (config["Sidebar Size"] - 1) + "px;height:22px;width:0;overflow:hidden;white-space:nowrap;padding:1px 2px 0 16px!important;z-index:2;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deletebuttons:hover{padding-left:2px!important;width:238px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deletebuttons::before{content:'X';display:inline-block;position:absolute;left:0;top:0;width:20px;height:24px;text-align:center;padding-top:1px}.deletebuttons:hover::before{overflow:hidden;white-space:nowrap;padding:0;width:0}.deletebuttons::after{font-size:9px!important;content:'FILE ONLY';position:absolute;bottom:0;right:120px;line-height:24px}.deletebuttons *{visibility:visible!important}.deletebuttons input[type=checkbox]{margin:2px!important;position:absolute;right:103px;bottom:4px!important;top:auto!important}.deletebuttons input:not([type=checkbox]){height:20px!important;margin:0 1px 0 0!important}.deletebuttons input[type=password]{    margin-left:4px!important;width:138px}.deletebuttons:hover input[type=password]{    margin-left:0!important}" + (config["Replace Reply Form"] ? "body>span[style]~.postarea,body>span[style]~#qr #close," : "") + (!config["Show Logo"] ? ".logo," : "") + (!config["Show Announcements"] ? "body>center:nth-of-type(2)>font[color=red]," : "") +(config["Post Form"] == 3 ? "body>span[style]~#qr #autohide," : "") + "#recaptcha_logo,#recaptcha_tagline,td[align=right],td.rules,img + br,iframe,#BF_WIDGET,.bf,.yui-g,#recaptcha_table td:nth-of-type(2),#option-button,#hd,#ft,td small,#footer,.rules,center font small,body>span[style],body>br,td.reply>br,td.replyhl>br,body>hr,form[name=delform]>span[style],div.thread>br,td.postblock,.deletebuttons br,table[width='100%'],form[name=delform]>br[clear],form[name=delform]>.filesize+br,#qp>br,.logo>br,body>div[style*='center'],body>center:nth-of-type(1),form[name=delform]>center,.hidden,body>span[style]~form[name=delform]>br,body>span[style]~form[name=delform]>hr,form[name=delform] center+hr,center~form[name=delform] hr:nth-last-of-type(2),form[name=delform] hr:nth-last-of-type(1),[hidden],body>span[style]~#navlinks,#navtop,#navtopr,#navtop>a,#navtop>span,.pages{display:none!important}table,td{border:0!important;border-spacing:0!important}.replymode{background-color:transparent!important}tr{background-color:transparent!important}tr[height='73']{height:auto!important}#recaptcha_div{height:auto!important}#recaptcha_table #recaptcha_image{background-color:transparent!important;margin-left:0!important;border:0!important}.postarea .recaptcha_input_area{    margin-top:1px!important;    padding-top:1px!important}#recaptcha_image img,#qr img[src*='recaptcha/api']{height:57px!important;    margin-top:1px!important}#recaptcha_table tr td{padding:0!important}.recaptcha_input_area{padding:0!important}.recaptcha_image_cell{padding-right:2px!important}blockquote{    margin:0!important;padding:1em 12px 2em 40px!important}div.reply{border:0!important;margin:0!important;z-index:2!important}form[name=delform] .filesize+br+a[target='_blank'] img{float:left;margin:2px 20px 20px!important}form[name=delform] .filesize+br+a[target='_blank'] img+img{margin:0 0 20px!important;position:relative;z-index:8!important}img[alt=closed],img[alt=sticky]{background-image:url(http://img175.imageshack.us/img175/1497/yunoiconsbf0.png)!important;background-color:transparent!important;background-repeat:no-repeat;display:inline-block;height:0!important;margin:0 1px!important;padding-top:16px!important;margin-right:-3px!important;width:16px!important;margin-left:4px!important}img[alt=sticky]{background-position:-129px 0!important}img[alt=closed]{background-position:-112px -16px!important}.inputtext,textarea{margin:0;padding:1px 4px}input[type=file]{height:22px!important;margin:0}.inputtext:not(textarea),#qr input[form=qr_form]{height:22px!important}#qr .inputtext,#qr input[type=file],#qr input[name=recaptcha_response_field]{    margin-top:1px!important;width:" + (config["Sidebar Size"] - 11) + "px!important}#qr img[src*='recaptcha/api']{    width:" + (config["Sidebar Size"] - 13) + "px!important}#qr input[name=sub]{width:" + (config["Sidebar Size"] - 62) + "px!important;margin-right:1px!important}.postarea .inputtext,.postarea input[type=file],.postarea input[name=recaptcha_response_field],body>span[style]~#qr .inputtext,body>span[style]~#qr input[type=file],body>span[style]~#qr input[name=recaptcha_response_field],.riceFile{    margin-top:1px!important;width:100%!important}.postarea table td:last-of-type,#recaptcha_table td:first-of-type,body>span[style]~#qr{max-width:" + (config["Sidebar Size"] - 10) + "px!important}.postarea img[src*='recaptcha/api'],body>span[style]~#qr img[src*='recaptcha/api']{    width:" + (config["Sidebar Size"] - 12) + "px!important}.postarea input[name=sub],body>span[style]~#qr input[name=sub]{width:" + (config["Sidebar Size"] - 61) + "px!important;margin-right:1px!important}textarea,button,input:not([type=checkbox]):not([type=radio]),select,.riceFile,#recaptcha_image img,#qr img[src*='recaptcha/api']{border:1px solid " + theme.inputbColor.hex + "!important}textarea,button,input:not([type=checkbox]):not([type=radio]),select,.riceFile{background:rgba(" + theme.inputColor.rgb + ",.9)!important}input[type=file]::-webkit-file-upload-button{background:rgba(" + theme.inputColor.rgb + ",.9)!important;border:0!important;border-right:1px solid transparent!important;font-size:8px!important;text-transform:uppercase!important;padding:0 5px!important;width:auto!important;vertical-align:bottom;height:20px!important;color:" + theme.textColor.hex + "!important;cursor:pointer;margin:0!important;-webkit-transition:background .1s ease-in-out;-moz-transition:background .1s ease-in-out;-o-transition:background .1s ease-in-out}input[type=file]::-webkit-file-upload-button:hover{background:rgba(" + theme.inputColor.hover + ",.9)!important}button,input,select,textarea,.riceFile input~div{-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out;    -webkit-transition-property:box-shadow;    -moz-transition-property:box-shadow;    -o-transition-property:box-shadow}button:hover,input:not([type=file]):hover,select:hover,textarea:hover,.riceFile input:hover~div{background:rgba(" + theme.inputColor.hover + ",.9)!important;    -webkit-transition-property:background,box-shadow;    -moz-transition-property:background,box-shadow;    -o-transition-property:background,box-shadow}input:not([type=button]):not([type=file]):not([type=submit]):hover,select:hover,textarea:hover{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px}input:not([type=button]):not([type=file]):not([type=submit]):focus,select:focus,textarea:focus{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px, inset " + mascot.color.hex +" 0 -1px 0,inset " + mascot.color.hex +" 0 1px 0,inset " + mascot.color.hex +" -1px 0 0,inset " + mascot.color.hex +" 1px 0 0!important}textarea:focus,input[type=text]:focus,input[type=password]:focus{background:-webkit-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;background:-moz-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;background:-o-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;    -webkit-transition-property:box-shadow;    -moz-transition-property:box-shadow;    -o-transition-property:box-shadow}button,input[type=button],input[type=submit],.riceFile div{font-size:9px!important;height:22px!important;    margin-top:1px!important;padding:0!important;    text-align:center!important;text-transform:uppercase;vertical-align:top;width:50px}input[type=checkbox],input[type=radio]{    background:rgba(" + theme.inputColor.shiftRGB(20, true) + ",.9)!important;    border:1px solid rgb(" + theme.inputColor.shiftRGB(40, true) + ")!important;height:12px!important;position:relative;vertical-align:top;width:12px!important;border-radius:2px!important;    -webkit-appearance:none}input[type=radio]{    border-radius:10px!important}input[type=radio]:checked::before{    content:'●';    position:relative;    top:-6px;    left:1px;    font-size:13px!important}input[type=checkbox]:hover,input[type=radio]:hover{    background:rgba(" + theme.inputColor.shiftRGB(40, true) + ",.9)!important}input[type=checkbox]:checked,input[type=radio]:checked{background:rgba(" + theme.mainColor.shiftRGB(40, true) + ",.9)!important;box-shadow:inset rgba(0,0,0,.2) 0 1px 2px,rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.2) 0 0 2px}input[type=checkbox]:hover,input[type=radio]:hover,input[type=checkbox]:checked,input[type=radio]:checked{    border:1px solid rgb(" + theme.inputColor.shiftRGB(60, true) + ")!important}input[type=checkbox]:checked{background:" + theme.checkMark.get() + " rgba(" + theme.inputColor.hover + ",.9)!important}input[type=checkbox]:active,input[type=radio]:active{background:rgba(255,255,255,0.6)!important}td.reply input[type=checkbox],td.replyhl input[type=checkbox]{margin-left:0!important}span.filesize~input[type=checkbox]{    top:2px}input[name=recaptcha_response_field],input#recaptcha_response_field{border:0!important;height:22px!important;padding:1px 4px!important}textarea{margin:0!important}td.doubledash{padding:0;text-indent:-9999px}.logo{position:fixed;right:1px;text-align:center;bottom:50%;    -webkit-box-reflect:below 0 -webkit-linear-gradient(top,transparent,rgba(255, 255, 255, 0.8))}.logo,.logo img,.logo span{width:" + (config["Sidebar Size"] - 6) + "px!important}.logo img{    height:auto!important;margin:0!important;opacity:.5;    position:relative;    z-index:-1}.logo::after{    background-image:-moz-element(#logo);    bottom:-100%;    content:'';    left:0;    mask:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KCTxkZWZzPg0KCQk8bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJncmFkaWVudCIgeDI9IjAiIHkyPSIxIj4NCgkJCTxzdG9wIHN0b3Atb2Zmc2V0PSIwIi8+DQoJCQk8c3RvcCBzdG9wLWNvbG9yPSJ3aGl0ZSIgb2Zmc2V0PSIxIi8+DQoJCTwvbGluZWFyR3JhZGllbnQ+DQoJCTxtYXNrIGlkPSJtYXNrIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBtYXNrQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+DQoJCQk8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPg0KCQk8L21hc2s+DQoJPC9kZWZzPg0KPC9zdmc+#mask');    opacity:.6;    position:absolute;    right:0;    top:100%;    z-index:-1;    -moz-transform:scaleY(-1)}.logo span{bottom:-20px;color:#eee;    cursor:default!important;display:block;font-family:'Jura',sans-serif!important;font-size:32px!important;    height:42px;    overflow:hidden;    padding:0 5px;position:absolute;text-align:center;    text-overflow:'.';text-shadow:rgba(" + mascot.color.rgb + ",.2) 0 0 10px,rgba(0,0,0,.2) 0 0 10px,                #bbb 1px 1px,#b6b6b6 -1px 1px,#b0b0b0 1px 2px,#aaa -1px 2px,#a4a4a4 1px 3px,#9c9c9c -1px 3px,#000 0 4px 5px;    white-space:nowrap}.logo span::selection{    background:none!important}.logo span::-moz-selection{    background:none!important}.logo font[size='1']{    bottom:-20px;color:#eee;    left:0;    position:absolute;    text-shadow:rgba(" + mascot.color.rgb + ",.2) 0 0 10px,rgba(0,0,0,.2) 0 0 10px,#000 0 2px 5px;    width:100%;    z-index:1}.logo font[size='1']>a{    text-transform:none!important}div.autohide>a[title='Auto-hide dialog box']{text-decoration:underline!important}.filesize{display:block!important;margin:2px 6px!important}div.op .filesize{display:inline-block!important}td .filesize{margin:2px 18px!important}.filesize span{font-size:0!important;visibility:hidden}.filesize span::after{content:attr(title);visibility:visible}input:not([type=checkbox]):not([type=radio]),button,select,textarea{-webkit-appearance:none;-o-appearance:none}#watcher .move,#updater .move,#options .move,#stats .move{cursor:default!important}#watcher{position:fixed!important;right:0!important;left:auto!important;bottom:auto!important;width:" + (config["Sidebar Size"] - 4) + "px!important}#watcher,body>a[style='cursor: pointer; float: right;']{top:19px!important}#watcher .move,#themeoptions .move{text-decoration:none!important;padding:5px!important;line-height:10px!important}#watcher>div{max-width:100%!important}#watcher>div>a:first-child,.container::before,#themeoptions #tMascot div a{font-size:10px!important}#overlay,#overlay2{background:rgba(0,0,0,.5);position:fixed;top:0;left:0;height:100%;width:100%;text-align:center;z-index:1000}#overlay::before,#overlay2::before{content:'';display:inline-block;height:100%;vertical-align:middle}#themeoptions,#addMascot{display:inline-block;text-align:right!important;width:600px;padding:5px;vertical-align:middle}#themeoptions>div{padding:5px}a.trbtn{display:inline-block;line-height:18px;margin:0 2px;padding:2px 10px;text-align:center;width:40px;    background:-webkit-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));    background:-moz-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));    background:-o-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));border-radius:3px;box-shadow:rgba(0,0,0,.3) 0 0 2px}a.trbtn:hover{background:rgba(60,60,60,.9);    background:-webkit-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));    background:-moz-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));    background:-o-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9))}a.trbtn:active{box-shadow:inset rgba(0,0,0,.3) 0 0 2px,rgba(0,0,0,.3) 0 0 2px}a.trbtn-small{padding:2px 5px;width:30px}#themeoptions #toNav{list-style:none;margin:0;padding:0;position:absolute;top:-26px}#themeoptions #toNav li{float:left;margin:0;padding:0}#themeoptions #toNav li label{background:rgba(" + theme.mainColor.shiftRGB(-10) + ",.9);color:#888!important;display:block;    height:16px;line-height:16px;margin:0 2px;padding:5px 10px;text-align:center;width:75px;border-radius:5px 5px 0 0;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#themeoptions #toWrapper{background:rgba(0,0,0,.3);box-shadow:inset rgba(0,0,0,.3) 0 0 5px, rgba(150,150,150,.3) 0 1px 3px;border-radius:5px}#themeoptions #toWrapper,#themeoptions #toWrapper>div{    height:400px}#themeoptions #toWrapper>div{overflow:auto}#themeoptions #toWrapper>[name=toTab]:not(:checked)+div{display:none}#updater label,#themeoptions #tMain label,#themeoptions #tNavLinks>div{display:block;border-bottom:1px solid rgba(" + theme.mainColor.rgb + ",.3);border-top:1px solid rgba(0,0,0,.1);height:20px;padding:0 3px;vertical-align:top}.deletebuttons::before,#updater label,#themeoptions #tMain label span{line-height:20px!important}#themeoptions #tMain label:first-child,#updater div:first-child label{border-top:none!important}#themeoptions #tMain label:last-child,#updater div:nth-last-of-type(3) label{border-bottom:none!important}#themeoptions #tMain label:hover,#updater label:hover,#addMascot label:hover{background:rgba(" + (theme.mainColor.isLight ? "0,0,0" : "255,255,255") + ",.1)}#updater label{    font-size:11px!important}#themeoptions #tMascot{text-align:center}#themeoptions #toWrapper>div>a{position:absolute;bottom:10px;left:10px}#themeoptions #tMascot div{    background-position:center top!important;    background-size:cover!important;display:inline-block;position:relative;margin:2px;width:185px;height:257px;border-radius:10px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}#themeoptions #tMascot div:hover{background-color:rgba(" + theme.linkColor.rgb + ",.3)}#themeoptions #tMascot div.selected{background-color:rgba(" + theme.linkColor.rgb + ",.6)!important;box-shadow:inset rgba(0,0,0,.15) 0 0 15px, rgba(" + theme.linkColor.rgb + ",.6) 0 0 2px}#themeoptions #tMascot div a{position:absolute;top:0;padding:5px 8px;background:rgba(0,0,0,.3)}#themeoptions #tMascot div a:not([href]):hover{background:rgba(0,0,0,.5)}#themeoptions #tMascot div a[title=Delete]{left:0;border-radius:10px 0 10px 0}#themeoptions #tMascot div a[title=Edit]{right:0;border-radius:0 10px 0 10px}#themeoptions #tNavLinks>div{height:24px;padding-top:1px}#themeoptions #tNavLinks label{margin:0 5px;position:relative;top:1px}#themeoptions #tNavLinks label:first-child{float:left}#themeoptions #tNavLinks label:first-child>input[type=text]{width:130px}#themeoptions #tNavLinks label>input[type=text]{width:180px}#themeoptions label>span{float:left}#themeoptions label>input[type=checkbox]{margin:4px 2px 0!important;vertical-align:bottom!important}#themeoptions label>select,#themeoptions label>input[type=text]{width:125px}#themeoptions input[type=text],#themeoptions select{height:20px;margin:0!important;padding:1px 3px!important}#themeoptions select{    padding:1px 0!important}#themeoptions textarea{background:transparent!important;border:0!important;height:100%!important;width:100%!important;resize:none}#addMascot{width:350px!important;height:75px!important}#addMascot>div{padding:5px}#addMascot>label{display:block}#addMascot>label>span{float:left;line-height:22px;padding-left:5px}#addMascot>label>input,#addMascot>label>textarea{width:200px}#addMascot>label>textarea{height:18px;line-height:18px;overflow:hidden;resize:none}#themeoptions,#options.dialog,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,#addMascot{background:rgba(" + theme.mainColor.rgb + ",.98)!important;text-align:center}#options .dialog,#options.dialog,#themeoptions,#addMascot{margin:0 auto!important;text-align:left;box-shadow:rgba(0,0,0,.6) 0 0 10px;border-radius:5px}#options hr{margin:3px 0!important}#options button{width:auto!important}#options ul{padding:2px 5px!important;border-radius:5px;box-shadow:inset rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.3) 0 0 5px}#imgControls{height:18px;position:fixed!important;right:0;top:0;width:" + (config["Sidebar Size"] - 135) + "px!important;padding-right:131px!important;z-index:6}#imgControls #imageType{border:0!important;float:left;line-height:16px!important;    margin:0!important;max-height:20px!important;max-width:85px}#imgControls>label{float:right;height:18px!important}#imgControls>label::before{content:'EXPAND';font-size:9px!important}.deletebuttons::before,.postarea form[name=post]::before,#qr .move::before,.logo font[size='1'],a.trbtn{font-size:10px!important;text-transform:uppercase}#imgControls label,form[name=post] #com_submit+label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,form[name=post] input[name=email]+label,#watcher .move,#updater span,#updater .move,#stats .move,body>a[style='cursor: pointer; float: right;']{font-size:9px!important;line-height:16px;text-transform:uppercase}.postarea table,.postarea table td{padding:0!important;border-spacing:0!important;border-collapse:collapse!important}.postarea,body>span[style]~#qr{right:0!important;top:auto!important;left:auto!important;padding:3px;    " + (config["Post Form"] == 1 ? "bottom:-280px!important;-webkit-transition:bottom .2s ease-in-out 1s;-moz-transition:bottom .2s ease-in-out 1s;-o-transition:bottom .2s ease-in-out 1s;" :    (config["Post Form"] == 2 ? "    bottom:21px!important;    opacity:.35;-webkit-transition:opacity .2s ease-in-out 1s;-moz-transition:opacity .2s ease-in-out 1s;-o-transition:opacity .2s ease-in-out 1s;" : "    bottom:21px!important;")) + "}.postarea,#qr{position:fixed!important;z-index:2!important;margin:0!important}.postarea:hover,body>span[style]~#qr:hover{    " + (config["Post Form"] == 1 ? "-webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;" :    (config["Post Form"] == 2 ? "    opacity:1;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out;" : "")) + "}.postarea:hover,body>span[style]~#qr:hover{bottom:21px!important}.postarea form[name=post]{    margin:0!important}.postarea form[name=post]::before{display:block;height:18px!important;text-align:center;content:'NEW THREAD'}body>span[style]~.postarea form[name=post]::before{display:block;height:18px;padding-top:1px;text-align:center;content:'QUICK REPLY'}form[name=post] #com_submit+label{position:absolute;top:48px;right:8px}form[name=post] input[name=email]+label{position:absolute;right:6px;top:3px}.postarea textarea,#qr textarea{height:100px!important;resize:none}.postarea textarea:focus,body>span[style]~#qr textarea:focus{    float:right;    position:relative;width:" + (config["Sidebar Size"] + 150) + "px!important;    z-index:1;    -webkit-transition-property:box-shadow,width;    -moz-transition-property:box-shadow,width;    -o-transition-property:box-shadow,width}#qr{height:auto!important;width:" + (config["Sidebar Size"] - 5) + "px!important;z-index:9!important}#qr .move{cursor:move!important;padding:3px!important}body>span[style]~#qr{border:0!important;    overflow:visible!important;z-index:1!important}body>span[style]~#qr div.move{cursor:default!important;padding:0!important}#qr #autohide{right:24px;top:3px}body>span[style]~#qr #autohide{right:0;top:0}#qr #autohide:checked~.autohide{height:0!important;overflow:hidden!important;padding:0!important}#qr:not(:hover) #autohide:checked~div.move>input{display:none}#qr div.move>input{display:inline-block;margin-top:3px!important}body>span[style]~#qr #autohide:checked~div.move>input{display:inline}body>span[style]~#qr .autohide,body>span[style]~#qr #autohide:checked~.autohide,#qr .autohide,#qr:hover #autohide:checked~.autohide{height:auto!important;overflow:visible!important}#qr .autohide,#qr:hover #autohide:checked~.autohide{padding:3px!important}body>span[style]~#qr .autohide,body>span[style]~#qr #autohide:checked~.autohide{padding:0!important}#qr #files>div,#qr .autohide>div,#qr .autohide>form>div{position:relative}#qr input[name=upfile]+a,#qr #captchas,#qr #attach,#qr #close{    font-size:9px!important;line-height:20px;position:absolute;right:6px;top:2px;    z-index:2}#qr input[name=upfile]+a::before,#qr #close::before{content:'[';padding-right:2px}#qr input[name=upfile]+a::after,#qr #close::after{content:']';padding-left:2px}#qr #close{    top:1px}#qr div.move{height:18px!important;line-height:16px;text-align:center!important}#qr div.move::before{content:'QUICK REPLY';display:block;margin:0 auto;width:75%}#qr #com_submit+label{bottom:auto!important;top:3px;right:56px}#updater{    border-left:1px solid " + theme.brderColor.hex + "!important;position:fixed!important;bottom:auto!important;left:auto!important;right:47px!important;top:0!important;line-height:18px;padding:0 3px;z-index:9!important;width:78px;text-align:left!important}#updater:hover{border-top:none!important;border-right:none!important;right:0!important;padding-bottom:3px;width:125px!important}#updater input{float:right}#updater input:not([type=checkbox]){margin:1px!important}#updater input[type=text]{height:19px!important;width:40px!important}#updater:not(:hover){background:transparent!important}#stats{height:18px;bottom:auto!important;left:auto!important;right:3px!important;top:0!important;z-index:8!important;padding-right:3px;text-align:right}#stats span{font-size:9px!important}#navlinks{top:0!important;height:20px;line-height:16px;z-index:6!important}#iHover{padding-bottom:19px;z-index:8!important}body>center:nth-of-type(2){position:relative}body>center:nth-of-type(2)>font[color=red]{color:#f66!important;    max-height:18px;    overflow:hidden;    padding:0 10px;position:absolute;max-width:100px;top:-18px;right:0;z-index:10;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}body>center:nth-of-type(2)>font[color=red]::before{content:'ANNOUNCEMENT';display:block;font-size:10px!important;line-height:18px;    margin-left:-10px;    text-indent:10px!important}body>center:nth-of-type(2)>font[color=red]:hover{    max-height:400px;    max-width:400px;    border-radius:0 0 0 3px}body>center:nth-of-type(2)>font[color=red]>b{display:block;width:100%;padding:5px;    white-space:nowrap}#header{bottom:0!important;left:0!important;line-height:20px!important;height:20px!important;padding:0!important;position:fixed!important;text-align:center;top:auto!important;width:100%!important;z-index:9!important}#navtop,#navtopr{float:none!important;    height:18px}#navtop a{text-shadow:rgba(0,0,0,.2) 0 0 3px}#navtop>div{    line-height:20px}#navtopr{position:absolute;right:5px!important;top:2px}" + (!config["Custom Navigation Links"] ? "#navtop{    bottom:0;    display:inline-block!important;    height:20px;    padding:3px 6px 6px;    position:relative;    width:500px;    -webkit-transition:all .1s ease-in-out;    -moz-transition:all .1s ease-in-out;    -o-transition:all .1s ease-in-out}#navtop::before{    color:" + theme.jlinkColor.hex + ";    content:'Navigation';    display:block;    font-size:" + config["Small Font Size"] + "px}#navtop:hover{    background:rgb(" + theme.mainColor.rgb + ");    bottom:48px;    height:64px;    border-radius:3px;    box-shadow:rgba(0,0,0,.2) 0 0 5px}#navtop>a{    padding:2px!important}#navtop>a,#navtop>span{    display:inline!important;    line-height:18px}" : "") + ".pages{margin:0!important;position:fixed!important;    visibility:hidden;width:auto!important;    " + ( config["Pages Position"] == 1 ? "    height:19px!important;bottom:22px!important;left:-350px;    right:auto!important;    top:auto!important;z-index:9;    -webkit-transition:left .1s ease-in-out 1s;    -moz-transition:left .1s ease-in-out 1s;    -o-transition:left .1s ease-in-out 1s;" :     (config["Pages Position"] == 2 ? "    background:transparent!important;    height:20px!important;    border:0!important;    bottom:0!important;    left:0!important;    z-index:9!important;" :    "    bottom:18px!important;    height:24px!important;    left:3px!important;    z-index:2;    -webkit-transform:rotate(-90deg);    -webkit-transform-origin:top left;    -moz-transform:rotate(-90deg);    -moz-transform-origin:top left;    -o-transform:rotate(-90deg);    -o-transform-origin:top left;")) + "}.pages *{font-size:" + config["Font Size"] + "px!important;    visibility:visible}.pages td{font-size:9px!important;text-transform:uppercase;    " + ( config["Pages Position"] != 2 ? "padding:0 2px!important;" : "padding:0!important;") + "text-align:center}.pages td:nth-of-type(2){    " + ( config["Pages Position"] != 2 ? "border-radius:3px;" : "") + "padding:0 5px!important}.pages b{font-weight:700!important}.pages a:not(:last-child),.pages b:not(:last-child){margin:0 2px}.pages input[type=submit]{    " + (config["Pages Position"] != 2 ? "border-radius:3px;" : "") + "    margin:0!important;padding:0 10px!important;width:auto!important;    " + (config["Pages Position"] != 3 ? "height:20px!important;" : "height:24px!important;") + "}" + (config["Pages Position"] == 1 ? ".pages:hover{left:0!important}.pages td:nth-of-type(2),.pages input[type=submit]{    border:1px solid " + theme.brderColor.hex + "!important}" : (config["Pages Position"] == 2 ? ".pages input[type=submit],.pages input[type=submit]:hover{    border:0!important}" : ".pages td:nth-of-type(2){    border:1px solid " + theme.brderColor.hex + "!important}")) + "form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),.pages td:nth-of-type(2),img[alt='closed'],[alt='sticky'],.deletebuttons,#navtop,#navtopr,#qr>div.move,#imgControls>label{font-size:0!important;color:transparent!important}body>a[style='cursor: pointer; float: right;']{position:fixed;right:5px;z-index:4}body>a[style='cursor: pointer; float: right;']+div{    height:100%;    margin:0 auto;    width:96%!important}body>a[style='cursor: pointer; float: right;']+div>table{height:100%!important;padding-bottom:20px}body>a[style='cursor: pointer; float: right;']+div>table td{    border-left:1px solid " + theme.brderColor.hex + "!important}body>a[style='cursor: pointer; float: right;']+div>table td:first-child{    border-left:0!important;    width:200px!important}body>a[style='cursor: pointer; float: right;']+div>table input[type=button]{    width:100px!important}body>a[style='cursor: pointer; float: right;']+div>table table td{    border:0!important}body>a[style='cursor: pointer; float: right;']+div>table textarea{    resize:vertical!important}body>a[style='cursor: pointer; float: right;']+div>table table,body>a[style='cursor: pointer; float: right;']+div>table textarea,body>a[style='cursor: pointer; float: right;']+div>table #fs_search{    width:100%!important}#fs_data tr:first-child td{    border-top:0!important}.riceFile{    height:22px;    line-height:22px;    overflow:hidden;    position:relative}.riceFile input[type=file]{    cursor:pointer!important;    position:absolute;    top:0;    right:0;    z-index:1;    opacity:0;    -webkit-transform:translateX(-1300px) scale(10);    -moz-transform:translateX(-1300px) scale(10);    -o-transform:translateX(-1300px) scale(10)}#qr .riceFile input[type=file]{    -webkit-transform:translateX(-400px) scale(10);    -moz-transform:translateX(-400px) scale(10);    -o-transform:translateX(-400px) scale(10)}#qr input[name=upfile]+a{    top:0}.riceFile div{    display:inline-block;    margin:0!important;    padding:0 10px!important}.riceFile span{    display:inline-block;    max-width:223px;    overflow:hidden;    padding:0 5px!important;    white-space:nowrap;    text-overflow:ellipsis}ul#Alerts,ul#Alerts a:hover{    color:#222!important}";
        },
        insertCSS: function()
        {
            if ($(document.head).exists())
                $(document).unbind("DOMNodeInserted", $SS.insertCSS);
            else return;
            
            if ($("#ch4SS").exists())
                $("#ch4SS").text(css);
            else
                $(document.head).append($("<style type='text/css' id=ch4SS>" + css));
        },
        DOMLoaded: function(reload)
        {
            // ensure reload is a boolean
            reload = reload === true;
            
            // Hopefully this will allow 4chan x to load first
            setTimeout(function()
            {
                if (!reload)
                {
                    $SS.options.init();
                    
                    $(".logo>img").attr("id", "logo");
                    
                    $("form[name=post]:not(#qr_form)").elements().each(function()
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
                
                    // Truncuate Previous to Prev or remove if on first page
                    var prev;
                    if ((prev = $(".pages td input[value='Previous']")).exists())
                        prev.val("Prev");
                    else if ((prev = $(".pages td:first-child")).exists())
                        prev.text("").attr("style", "padding:0 2px 0 0!important");
                }
                
                if (reload && $("#navtop>div").exists())
                    $("#navtop>div").remove();
                
                var ann, pages, qr,
                    postLoadCSS = "#navtop,#navtopr{display:inline-block!important}.pages{display:table!important}";

                if (config["Custom Navigation Links"])
                    $SS.buildCustomNav();
                    
                if ((pages = $(".pages")).exists())
                {
                    // Set left offset for slide out pages
                    if (config["Pages Position"] == 1)
                    {
                        var pages = $(".pages");
                        
                        if (pages.exists())
                        {
                            pages.attr("style", "display:table!important");
                            setTimeout(function(){ pages.attr("style", "left:" + ($(".pages td:last-child").get().offsetWidth - pages.get().offsetWidth) + "px"); }, 10);
                        }
                    }
                    else if (reload)
                        pages.attr("style", "");
                }
                
                // Add ExHentai source link
                if (config["ExHentai Source"] != 1)
                {
                    postLoadCSS += ".exSource{display:inline-block;height:16px;position:relative}\
                                    .exFound{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important}\
                                    .exFound:hover{background:rgba(" + theme.mainColor.shiftRGB(-4) + ",.9)!important;border-radius:3px 3px 0 0}\
                                    .exFound:hover>.exPopup{display:block!important}\
                                    .exPopup{background:rgba(" + theme.mainColor.shiftRGB(-4) + ",.9)!important;display:none;left:0;padding:5px;position:absolute!important;\
                                    top:16px;white-space:nowrap;z-index:8!important;box-shadow:rgba(0,0,0,.3) 0 2px 2px;border-radius:0 3px 3px 3px}\
                                    .exPopup a{display:block}";
                    
                    config["ExType"] = config["ExHentai Source"] == 2 ? "exhentai" : "g.e-hentai";
                    
                    if (!reload || !$(".exSource").exists())
                    {
                        $SS.exsauce.addLinks(document);
                        $(document).bind("DOMNodeInserted", $SS.addLinksHandler);
                    }
                }
                else if (reload)
                {
                    $(".exSource").remove();
                    $(document).unbind("DOMNodeInserted", $SS.addLinksHandler);
                }
                
                if ((!reload || !$(".riceFile").exists()) && config["Rice Inputs"] != 1)
                {
                    if (config["Rice Inputs"] == 2)
                        $("input[type=file]").riceFile();
                    //else if (config["Rice Inputs"] == 3)
                    //  $("input[type=checkbox]").riceCheck();
                    else if (config["Rice Inputs"] == 4)
                    {
                        $("input[type=file]").riceFile();
                    //  $("input[type=checkbox]").riceCheck();
                    }
                    
                    $(document).bind("DOMNodeInserted", $SS.addRiceHandler);
                }
                else if (reload && config["Rice Inputs"] == 1)
                {
                    // TODO: unrice? is it even worth it?
                    $(document).unbind("DOMNodeInserted", $SS.addRiceHandler);
                }
                
                if (reload)
                {
                    $("#ch4SSPost").text(postLoadCSS);
                    
                    if (config["Post Form"] != 1)
                    {
                        if ((qr = $("body>span[style]~#qr")).exists())
                            qr.attr("style", "")
                              .unbind("mouseover", $SS.qrMouseOver)
                              .unbind("mouseout", $SS.qrMouseOut);
                    }
                    
                    $SS.fixQRhide();
                }
                else
                {
                    $(document.head).append($("<style type='text/css' id=ch4SSPost>" + postLoadCSS));
                    
                    // Change some of 4chan x quick reply events
                    if ((qr = $("body>span[style]~#qr")).exists())
                    {
                        // Clone to remove event listeners and delete text
                        var move  = qr.children("div.move"),
                            moveC = move.clone(true);
                        
                        move.remove();
                        qr.children("#autohide").after(moveC);
                        
                        var autohide = qr.children("#autohide"),
                            fixQuote = function(x){ $("a.quotejs", x).bind("click", $SS.fixQRhide); };
                        
                        // Fix posiiton when autohide unchecked
                        autohide.bind("change", $SS.fixQRhide);
                        fixQuote(document);
                        $SS.fixQRhide();

                        $(document).bind("DOMNodeInserted", function(e)
                        {
                            if (e.target.nodeName == "TABLE")
                                fixQuote(e.target);
                        });
                        
                        if (config["Post Form"] == 1)
                        {
                            qr.bind("mouseover", $SS.qrMouseOver)
                              .bind("mouseout", $SS.qrMouseOut);
                        }
                    }
                }
            }, 10);
        },
        fixQRhide: function()
        {
            var qr = $("body>span[style]~#qr"),
                autohide = qr.children("#autohide");
            if (!autohide.val())
            {
                if (config["Post Form"] == 1)
                    autohide.parent().attr("style", "bottom:21px!important;-webkit-transition:bottom .1s;-moz-transition:bottom .1s;-o-transition:bottom .1s");
                else if (config["Post Form"] == 2)
                    autohide.parent().attr("style", "opacity:1!important;-webkit-transition:opacity .1s;-moz-transition:opacity .1s;-o-transition:opacity .1s");
            }
            else
                autohide.parent().attr("style", "");
        },
        addLinksHandler: function(e)
        {
            if (e.target.nodeName == "TABLE")
                $SS.exsauce.addLinks(e.target);
        },
        addRiceHandler: function(e)
        {
            //if ((config["Rice Inputs"] == 3 || config["Rice Inputs"] == 4) && e.target.nodeName == "TABLE" && e.target.className != "riceCheck")
            //   $("input[type=checkbox]", e.target).riceCheck();
            if ((config["Rice Inputs"] == 2 || config["Rice Inputs"] == 4) && e.target.nodeName == "DIV" && 
                (e.target.className != "riceFile" || $SS.incRice))
            {
                $SS.incRice = false;
                
                // Deal with nesting riceFile
                if (e.target.className == "riceFile")
                {
                    $(e.target).parent().before(e.target).remove();
                    $(e.target).children("a").remove(); // remove the remove button
                }
                else
                    $("input[type=file]", e.target).riceFile();
            }
            if (e.target.nodeName == "INPUT" && e.target.name == "upfile")
            {
                $(e.target).riceFileBind().nextSibling("span").text(e.target.value.substr(e.target.value.lastIndexOf("\\") + 1));
                $SS.incRice = true;
            }
        },
        qrMouseOver: function()
        {
            if ($("#autohide", this).val())
                $(this).attr("style", "");
        },
        qrMouseOut: function()
        {
            if ($("#autohide", this).val())
                $(this).attr("style", "bottom:" + -(this.offsetHeight - 43) + "px!important");
        },
        
        /* CONFIG */
        config:
        {
            hasGM: typeof GM_deleteValue !== "undefined",
            get: function(name)
            {
                var val, key = NAMESPACE + name;
                
                if (this.hasGM)
                    val = GM_getValue(key);
                else
                    val = localStorage.getItem(key);
                    
                if (val != null)
                {
                    val = JSON.parse(val);

                    if (!isNaN(val) && typeof val === "string")
                        return parseInt(val);
                    
                    return val;
                }
                    
                return defaultConfig[name];
            },
            set: function(name, val)
            {
                name = NAMESPACE + name;
                val = JSON.stringify(val);
                
                if (this.hasGM)
                    return GM_setValue(name, val);
                    
                return localStorage.setItem(name, val);
            },
            load: function()
            {
                function parseVal(val)
                {
                    return (Array.isArray(val) && typeof val[0] !== "object") ? val[0] : val;
                };
                
                var ret = {};
                
                for (var key in defaultConfig)
                    ret[key] = parseVal(this.get(key));
                    
                return ret;
            }
        },
        
        /* OPTIONS */
        options:
        {
            saveAndClose: true,
            init: function()
            {
                var a = $("<a>SS").bind("click", $SS.options.show);
                return $("#navtopr").append($("<span>&nbsp;/&nbsp;")).append(a);
            },
            show: function()
            {
                if ($("#overlay").exists())
                    return $("#overlay").remove();
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
                        if (!defaultConfig.hasOwnProperty(key)) continue;
                        else if (key == "Style Scrollbars" && !/AppleWebKit/.test(navigator.userAgent)) continue;
                        
                        val = config[key];
                        des = defaultConfig[key][1];
                        
                        if (Array.isArray(defaultConfig[key][2]))
                        {
                            var opts = key == "Font" ? config["Fonts"] || defaultConfig[key][2] : defaultConfig[key][2];
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><select name='" + key + "'>";
                            
                            for (var i = 0, MAX = opts.length; i < MAX; i++)
                            {
                                var name, value;
                                
                                if (typeof opts[i] === "object")
                                {
                                    name  = opts[i].name;
                                    value = opts[i].value;
                                }
                                else
                                    name = value = opts[i];
                                
                                optionsHTML += "<option" + (key == "Font" ? " style='font-family:" + value + "!important'" : "") + " value='" + value + "'" + (value == val ? " selected" : "") + ">" + name + "</option>";
                            }
                            
                            optionsHTML += "</select></label>";
                        }
                        else if (key == "Font Size")
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><input type=text name='Font Size' value=" + config["Font Size"] + "px></label>";
                        else if (key == "Mascots")
                        {
                            var mascots = config["Mascots"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbMascots hidden><div id=tMascot><a class=trbtn name=addMascot>add</a>";
                            
                            for (var i = 0, MAX = mascots.length, tMascot; i < MAX; i++)
                            {
                                tMascot = new $SS.Mascot(mascots[i].img, mascots[i].color, mascots[i].enabled);
                                optionsHTML += "<div id=mascot" + i + (tMascot.enabled ? " class=selected" : "") + " style='background:" + tMascot.img.get() + "'>\
                                <a title=Delete>X</a><a title=Edit>E</a></div>";
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
                        else if (key != "Fonts" && key != "Themes") // make Themes tab, and font add/remove div
                            optionsHTML += "<label title='" + des + "'><span>" + key + "</span><input" + (val ? " checked" : "") + " name='" + key + "' type=checkbox></label>";
                    }
                    
                    optionsHTML += "</div><div><a class=trbtn name=save title='Hold any modifier to prevent window from closing'>save</a><a class=trbtn name=cancel>cancel</a></div>";
                    tOptions.html(optionsHTML);
                    overlay.append(tOptions);
                    
                    $("input[name='Font Size']", tOptions).bind("keydown", function(e)
                    {
                        var val = parseInt($(this).val());
                        
                        if (e.keyCode == 38 && val < MAX_FONT_SIZE)
                            $(this).val(++val + "px");
                        else if (e.keyCode == 40 && val > MIN_FONT_SIZE)
                            $(this).val(--val + "px");
                    });
                    
                    $("#toNav li label", tOptions).bind("click", function(e)
                    {
                        if ($(this).hasClass("selected")) return;
                        
                        $("#toNav li label.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                    
                    $("#tMascot div", tOptions).each(function(){ $SS.options.bindMascotInputs(this); });
                    
                    var bindLinkButtons = function(el)
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
                    };
                    
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
                    
                    $(document).bind("keydown", $SS.options.keydown)
                               .bind("keyup", $SS.options.keyup);
                    
                    return $(document.body).append(overlay);
                }
            },
            keydown: function(e)
            {
                if (e.keyCode >= 16 && e.keyCode <= 18)
                    $SS.options.saveAndClose = false;
            },
            keyup: function(e)
            {
                $SS.options.saveAndClose = true;
            },
            save: function()
            {
                var div, themes = [], mascots = [], links = [];
                div = $("#themeoptions");
                
                // Save main
                $("#themeoptions input:not([name=toTab]), #themeoptions select").each(function()
                {
                    $SS.config.set($(this).attr("name"),
                        $(this).attr("name") == "Font Size" ? Math.max(Math.min(parseInt($(this).val()), MAX_FONT_SIZE), MIN_FONT_SIZE) : $(this).val());
                });
                
                // Save Mascots
                $("#themeoptions #tMascot div").each(function(index)
                {
                    config["Mascots"][index].enabled = $(this).hasClass("selected");
                    mascots.push(config["Mascots"][index]);
                });
                
                $SS.config.set("Mascots", mascots);
                
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
                    
                    if (nLink.text != "" && nLink.link != "")
                        links.push(nLink);
                });
                
                $SS.config.set("Nav Links", links);
                
                if ($SS.options.saveAndClose)
                {
                    div.parent().remove();
                    $(document).unbind("keydown", $SS.options.keydown)
                               .unbind("keyup", $SS.options.keydown);
                }
                
                return $SS.init(true);
            },
            showMascot: function(mIndex) // TODO: Fix base64 input element- why cant chrome hold all these chars- why is firefox and opera so slow
            {
                var div, overly;
                
                if (typeof mIndex === "number")
                    var bEdit = true, mEdit = config["Mascots"][mIndex];
                
                div = $("<div id=addMascot>").html("<label><span title='URL or base64'>Background:</span><textarea name=customIMG>" + (bEdit ? mEdit.img : "") + "</textarea></label>\
                        <label title='i.e. #FF6999'><span>Link Color (Hex.):</span><input type=text name=customColor value='#" + (bEdit ? mEdit.color : "") + "'></label>\
                        <div><a class=trbtn name=" + (bEdit ? "edit" : "add") + ">" + (bEdit ? "edit" : "add") + "</a><a class=trbtn name=cancel>cancel</a></div></div>");
                
                overlay = $("<div id=overlay2>").append(div);
                
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
                    
                    nMascot = new $SS.Mascot(cIMG, cColor, true);
                    $("#mascot" + mIndex).attr("style", "background:" + nMascot.img.get());
                }
                else
                {
                    nMascot = new $SS.Mascot(cIMG, cColor, true);
                    config["Mascots"].push({ img: cIMG, color: cColor, enabled: true });
                    
                    div = $("<div id=mascot" + (config["Mascots"].length - 1) + " class=selected style='background:" + nMascot.img.get() + "'><a title=Delete>X</a><a title=Edit>E</a>");
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
                        return new $SS.Theme(themes[i], mascot.color.hex);
            }
        },
        
        /* Thanks to hurfdurf
         * http://pastebin.com/TTDJNH7c 
         * Modified by ahoka
         **/
        /* EXHENTAI SOURCE */
        exsauce:
        {
            addLinks: function(x)
            {
                var targets = $("img[md5]", x);
                
                targets.each(function()
                {
                    var node = $(this).parent().previousSibling(".filesize");
                    
                    if (!$(".exSource", node).exists())
                    {
                        var a = $("<a class=exSource href='" + $(this).parent().attr("href") + "'>" + config["ExType"]).bind("click", $SS.exsauce.fetchImage);
                        node.append(document.createTextNode(" ")).append(a);
                    }
                });
            },
            fetchImage: function(e)
            {
                if (e.which != 1) return;
                e.preventDefault();
                
                var a = $(e.target);
                a.text("loading");
                
                GM_xmlhttpRequest(
                {
                    method: "GET",
                    url: a.attr("href"),
                    overrideMimeType : "text/plain; charset=x-user-defined",
                    headers: { "Content-Type": "image/jpeg" },
                    onload: function(x) { $SS.exsauce.checkTitles(a, x.responseText); }
                });
            },
            checkTitles: function(anchor, data)
            {
                var hash = $SS.exsauce.sha1Hash($SS.exsauce.data_string(data));
                
                anchor.html("checking")
                      .attr("href", "http://" + config["ExType"] + ".org/?f_shash=" + hash + "&fs_similar=1&fs_exp=1")
                      .unbind("click", $SS.exsauce.fetchImage);
                      
                // Opera fix: http://userscripts.org/scripts/show/88932 + http://www.megaupload.com/?d=Q8SESDSQ
                // Chrome: requires tampermonkey
                GM_xmlhttpRequest(
                {
                    method: "GET",
                    url: anchor.attr("href"),
                    onload: function(x)
                    {
                        var temp = $("<div>").html(x.responseText);
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
            },

            /* SHA1 HASING */
            data_string: function(data)
            {
                var ret = "";
                for (var i = 0, MAX = data.length; i < MAX; i++)
                    ret += String.fromCharCode(data[i].charCodeAt(0) & 0xff);
                    
                return ret;
            },

            sha1Hash: function(msg)
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
                        W[t] = $SS.exsauce.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
                        
                    a = H0; b = H1; c = H2; d = H3; e = H4;
                    for (var t = 0; t < 80; t++)
                    {
                        var s = Math.floor(t/20);
                        var T = ($SS.exsauce.ROTL(a,5) + $SS.exsauce.f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
                        e = d;
                        d = c;
                        c = $SS.exsauce.ROTL(b, 30);
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
            },

            f: function(s, x, y, z)
            {
                switch (s)
                {
                    case 0: return (x & y) ^ (~x & z);
                    case 1: return x ^ y ^ z;
                    case 2: return (x & y) ^ (x & z) ^ (y & z);
                    case 3: return x ^ y ^ z;
                }
            },

            ROTL: function(x, n)
            {
                return (x<<n) | (x>>>(32-n));
            }
        },
        
        /* STRUCTS */
        Color: function(hex, incHover)
        {
            this.hex = "#" + hex;
            this.private_rgb = $SS.RGBFromHex(hex);
            this.rgb = this.private_rgb.join(",");
            this.isLight = $SS.isLight(this.private_rgb);
            this.shiftRGB = function(shift, smart)
            {
                var rgb = this.private_rgb.slice(0);
                    
                shift = smart ?
                    (this.isLight ? (shift < 0 ? shift : -shift) : Math.abs(shift)) : shift;
                
                rgb[0] = Math.min(Math.max(rgb[0] + shift, 0), 255);
                rgb[1] = Math.min(Math.max(rgb[1] + shift, 0), 255);
                rgb[2] = Math.min(Math.max(rgb[2] + shift, 0), 255);
                
                return rgb.join(",");
            };
            
            if (incHover)
                this.hover = this.shiftRGB(16, true);
        },
        Image: function(img, RPA)
        {
            this.img = img;
            this.RPA = RPA;
            this.get = function(bImg)
            {
                if (!this.img) return "";
                else if (bImg) return ($SS.validBase64(this.img) ? "data:image/png;base64," : "") + this.img;
                
                var ret = "url(";
                if ($SS.validBase64(this.img))
                    ret += "data:image/png;base64," + this.img + ")";
                else 
                    ret += this.img + ")";
                
                return ret + (this.RPA != undefined ? " " + this.RPA : "");
            };
        },
        Mascot: function(img, hex, enabled)
        {
            this.img = new $SS.Image(img, "no-repeat bottom center");
            this.color = new $SS.Color(hex);
            this.enabled = enabled;
        },
        Theme: function(theme, mascotColor)
        {
            this.replyBrder  = theme.replyBrder;
            this.bgImg       = new $SS.Image(theme.bgImg, "repeat top left fixed");
            this.bgColor     = new $SS.Color(theme.bgColor);
            this.mainColor   = new $SS.Color(theme.mainColor);
            this.brderColor  = new $SS.Color(theme.brderColor);
            this.inputColor  = new $SS.Color(theme.inputColor, true);
            this.inputbColor = new $SS.Color(theme.inputbColor);
            this.jlinkColor  = new $SS.Color(theme.jlinkColor);
            this.linkColor   = new $SS.Color(theme.oLinkColor ? theme.linkColor : mascotColor.substr(1));
            this.linkHColor  = new $SS.Color(theme.linkHColor);
            this.nameColor   = new $SS.Color(theme.nameColor);
            this.quoteColor  = new $SS.Color(theme.quoteColor);
            this.sageColor   = new $SS.Color(theme.sageColor);
            this.textColor   = new $SS.Color(theme.textColor);
            this.titleColor  = new $SS.Color(theme.titleColor);
            this.tripColor   = new $SS.Color(theme.tripColor);
            this.checkMark   = new $SS.Image(this.inputColor.isLight ? checkMarkDark : checkMarkLight, "no-repeat center center");
        },
        
        /* HELPER METHODS */
        RGBFromHex: function(hex)
        {
            var rgb = [];
            hex = parseInt(hex, 16);
                
            rgb[0] = (hex >> 16) & 0xFF;
            rgb[1] = (hex >> 8) & 0xFF;
            rgb[2] = hex & 0xFF;
            
            return rgb;
        },
        isLight: function(rgb)
        {
            return rgb[0] + rgb[1] + rgb[2] >= 400;
        },
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
        },
        buildCustomNav: function()
        {
            var links = config["Nav Links"], a = [];
            
            for (var i = 0, MAX = links.length; i < MAX; i++)
                a.push("<a href='" + links[i].link + "'>" + links[i].text + "</a>");
                
            $("#navtop").append($("<div>").html(a.join(" - ")));
        }
    };
    /* END STYLE SCRIPT CLASSES */

    $SS.init();
})();