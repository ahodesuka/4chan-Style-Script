// ==UserScript==
// @name          4chan Style Script
// @author        ahoka
// @description   Customize 4chan to your liking right on the page itself.
// @namespace     ahodesuka.github.com
// @version       2.1.1
// @run-at        document-start
// @include       http*://boards.4chan.org/*
// @include       http*://rs.4chan.org/*
// @include       http*://sys.4chan.org/*
// @updateURL     https://github.com/ahodesuka/4chan-Style-Script/raw/stable/4chanSS.user.js
// ==/UserScript==

(function()
{
    var defaultConfig =
    {
        "Show Board Name":          [ true,  "Toggle visibility of the board name" ],
        "Show Text Board":          [ true,  "Toggle visibility of the text board link" ],
        "Show Logo":                [ true,  "Toggle visibility of the logo", null, true ],
        "Show Logo Reflection":     [ true,  "Toggle visibility of the logo reflection", "Show Logo", true, true ],
        "Auto Hide Thread Watcher": [ true,  "Hides watched threads unless the mouse is over the watcher" ],
        "Slim Replies":             [ true,  "Reduces the size of replies" ],
        "Emoji Icons":              [ false, "Show icons for different e-mails" ],
        "Pony Icons":               [ false, "Shows pony icons for different e-mails" ],
        "Smart Tripcode Hider":     [ false, "Hides the name field if the value contains a tripcode" ],
        "Expanding Form Inputs":    [ true,  "Makes certain form elements expand on focus" ],
        "Custom Navigation Links":  [ true,  "Use specified links instead of showing all boards" ],
        "Style Scrollbars":         [ true,  "Make the scroll bar match the theme" ],
        "Sage Identification":
        [
            2, "Adds identification to posts that do not bump threads.",
            [
                { name: "None", value: 1 },
                { name: "Text", value: 2 },
                { name: "Icon", value: 3 }
            ]
        ],
        "Side Margin":
        [
            5, "Change the size of the margin opposite of the sidebar",
            [
                { name: "Large",    value: 65 },
                { name: "Medium",   value: 25 },
                { name: "Small",    value: 5  },
                { name: "None",     value: 1  }
            ]
        ],
        "Layout":
        [
            1, "Change the layout of the main content",
            [
                { name: "Fit Width",   value: 1 },
                { name: "Fit Content", value: 2 },
                { name: "Centered",    value: 3 }
            ], true
        ],
        "Thread Separators":
        [
            true,
            "Show the lines between different threads",
            "Layout",
            2,
            true
        ],
        "Navigation Bar Position":
        [
            2, "Sets the position of the navigation bar",
            [
                { name: "Top",    value: 1 },
                { name: "Bottom", value: 2 }
            ]
        ],
        "Board Name Position":
        [
            1, "Change the position of the board name/text board link",
            [
                { name: "Top",      value: 1 },
                { name: "Above QR", value: 2 }
            ]
        ],
        "Post Form":
        [
            2, "Change the transition for the post form",
            [
                { name: "Slide Up",  value: 1 },
                /*{ name: "Slide Out", value: 5 },*/// TODO
                { name: "Fade",      value: 2 },
                { name: "Fixed",     value: 3 },
                { name: "Float",     value: 4 }
            ]
        ],
        "Sidebar Position":
        [
            1, "Change the position of the sidebar",
            [
                { name: "Right",    value: 1 },
                { name: "Left",     value: 2 },
                { name: "Disabled", value: 3 }
            ], true
        ],
        "Reserve Edge":
        [
            true,
            "Reserve the edge where the sidebar would be",
            "Sidebar Position",
            3,
            true
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
                { name: "Drop Down",      value: 1 },
                { name: "Fixed",          value: 2 },
                { name: "Fixed Vertical", value: 3 },
                { name: "Hidden",         value: 4 }
            ]
        ],
        "Font":
        [
            "sans-serif", "Set the default font family",
            [
                { name: "Default",       value: "sans-serif"    },
                { name: "Monospace",     value: "monospace"     },
                { name: "Ubuntu",        value: "Ubuntu"        },
                { name: "Consolas",      value: "Consolas"      },
                { name: "Droid Sans",    value: "Droid Sans"    },
                { name: "Segoe UI",      value: "Segoe UI"      },
                { name: "Calibri",       value: "Calibri"       },
                { name: "Arial",         value: "Arial"         },
                { name: "Lucida Grande", value: "Lucida Grande" },
                { name: "Helvetica",     value: "Helvetica"     }
            ]
        ],
        "Font Size": [ 12, "Set the general size of text (Pixels)" ],
        "Bitmap Font": [ false, "Check this if you are using a bitmap font" ],
        "Nav Links":
        [
            { text: "anime & manga", link: "boards.4chan.org/a/"  },
            { text: "anime/cute",    link: "boards.4chan.org/c/"  },
            { text: "technology",    link: "boards.4chan.org/g/"  },
            { text: "video games",   link: "boards.4chan.org/v/"  },
            { text: "otaku culture", link: "boards.4chan.org/jp/" }
        ],
        "Nav Link Delimiter":
        [
            "&nbsp;-&nbsp;", "Sets the character which will separate navigation links"
        ],
        "Themes"          : [],
        "Hidden Themes"   : [],
        "Selected Theme"  : 0,
        "Selected Mascots": 0,
        "Mascots"         : [],
        "Hidden Mascots"  : []
    },
    MAX_FONT_SIZE = 16,
    MIN_FONT_SIZE = 10,
    NAMESPACE     = "4chanSS.",
    VERSION       = "2.1.1",
    inputImages   = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAP9JREFUOMvV0CFLQ2EYxfHfrtdiURgbmCxOmFPBJgZZ0CQD0Q+goFkwabWIyWIWFgwmy7Qp7DPI3GD7ACZlYLNcy31ljG0aDHrSy3N43nOef6ZULBiifczEQ8wV7OAtGmBO4wgfOI2whsXUnMAJ8rhCJ8IxDpHDHpZwixqM5XPZBBtYxioauEgjRLjBI2bRxTneQ6EYCS4xiTu89DbONJrtP88hwnV64hm28YRqyPsFDkmSGKUYFubnsqignM7rqDWa7dcAqoLdnsXwrgZQ5QG/l8MVIxX1ZPar/lUyUOsv+aMzv+0Qw3OrM4VNrKfzB9yXioVu6LDVx+EA4/+Gwycw/Uz36O07WwAAAABJRU5ErkJggg==",
    defaultIcons  = "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",
    fontListSWF   = "http://ahodesuka.github.com/FontList.swf",
    themeInputs   =
    [
        { dName: "Body Background",  name: "bgColor",     property: "background-color" },
        { dName: "Reply Background", name: "mainColor",   property: "background-color" },
        { dName: "Reply Border",     name: "brderColor",  property: "border-color"     },
        { dName: "Input Background", name: "inputColor",  property: "background-color" },
        { dName: "Input Border",     name: "inputbColor", property: "border-color"     },
        { dName: "Backlinks",        name: "blinkColor",  property: "color"            },
        { dName: "4chan x Links",    name: "jlinkColor",  property: "color"            },
        { dName: "Links",            name: "linkColor",   property: "color"            },
        { dName: "Links Hovered",    name: "linkHColor",  property: "color"            },
        { dName: "Names",            name: "nameColor",   property: "color"            },
        { dName: "Quote",            name: "quoteColor",  property: "color"            },
        { dName: "Text",             name: "textColor",   property: "color"            },
        { dName: "Sage",             name: "sageColor",   property: "color"            },
        { dName: "Tripcodes",        name: "tripColor",   property: "color"            },
        { dName: "Titles",           name: "titleColor",  property: "color"            }
    ],
    $lib, $SS;

    if (!Array.isArray)
        Array.isArray = function(arg){ return Object.prototype.toString.call(arg) === "[object Array]"; };

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

    /* STYLE SCRIPT LIBRARY */
    /* More or less based off jQuery */
    $lib = window.$ = function(selector, root)
    {
        return this instanceof $lib ?
            this.init(selector, root) : new $lib(selector, root);
    };

    $lib.prototype =
    {
        constructor: $lib,
        elems: [],
        length: function(){ return this.elems.length; },

        /* CONSTRUCTOR */
        init: function(selector, root)
        {
            if (selector == null || selector == undefined) return this;

            if (selector.constructor === $lib) return selector;
            else if (typeof selector === "string")
            {
                var root = root || document;
                var tagCheck = /^<(\w+)([^>]*)>(.*)$/.exec(selector); // NO CLOSING TAGS FOR MAIN NODE

                if (root.constructor === $lib)
                    root = root.get();

                if (tagCheck)
                {
                    var tag = document.createElement(tagCheck[1]);

                    if (tagCheck[2])
                    {
                        var attribs, atRegEx = /(\w+)=((?:"(?:[^"]+)"|'(?:[^']+)'|(?:\w+)))/g;
                        while ((attribs = atRegEx.exec(tagCheck[2])) != null)
                        {
                            var val = attribs[2];
                            if ((val[0] == '"' || val[0] === "'") && val[0] == val[val.length-1])
                                val = val.substr(1, val.length-2)

                            tag.setAttribute(attribs[1], val);
                        }
                    }

                    tag.innerHTML = tagCheck[3];

                    this.elems = [ tag ];
                }
                else if (/^#[\w-]+$/.test(selector) && root == document)
                {
                    var el;

                    if ((el = document.getElementById(selector.substr(1))) != null)
                        this.elems = [ el ];
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
        clone: function()
        {
            var ret = [];

            this.each(function(){ ret.push(this.cloneNode(true)); });

            return new $lib(ret);
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
            if (index == undefined && this.elems.length === 1)
                return this.elems[0];
            else if (index == undefined && !this.hasSingleEl())
                return this.elems;

            return this.elems[index];
        },

        /* DOM MANIPULATION */
        prepend: function(el)
        {
            if (el.constructor === $lib)
                el = el.get();

            return this.each(function(){ this.insertBefore(el, this.firstChild); });
        },
        append: function(el)
        {
            if (el.constructor === $lib)
                el = el.get();

            return this.each(function(){ this.appendChild(el); });
        },
        before: function(el)
        {
            if (el.constructor === $lib)
                el = el.get();

            return this.each(function(){ this.parentNode.insertBefore(el, this); });
        },
        after: function(el)
        {
            if (el.constructor === $lib)
                el = el.get();

            return this.each(function()
            {
                if (this.nextSibling != null)
                    this.parentNode.insertBefore(el, this.nextSibling);
                else if (this.parentNode != null)
                    this.parentNode.appendChild(el);
            });
        },
        replace: function(el)
        {
            return this.each(function()
            {
                $(this).before(el).remove();
            });
        },
        html: function(html)
        {
            if (html == undefined)
                return this.elems[0].innerHTML;

            return this.each(function(){ this.innerHTML = html; });
        },
        text: function(text)
        {
            if (text == undefined)
                return this.elems[0].textContent;

            return this.each(function(){ this.textContent = text; });
        },
        appendText: function(text)
        {
            return this.each(function(){ this.textContent += text; });
        },
        attr: function(name, val)
        {
            if (val == undefined)
                if (!this.hasSingleEl())
                    return this;
                else
                    return this.elems[0].getAttribute(name);
            else if (val === "")
                return this.each(function(){ this.removeAttribute(name); });

            return this.each(function(){ this.setAttribute(name, val); });
        },
        disabled: function(bDisabled)
        {
            if (bDisabled == undefined)
                return this.elems[0].disabled;

            return this.each(function(){ this.disabled = bDisabled; });
        },
        toggle: function(bHidden)
        {
            return this.each(function()
            {
                var $this = $(this);

                if (bHidden == undefined)
                    bHidden = !($this.attr("disabled") === "true");

                $this.attr("hidden", bHidden || "");
            });
        },
        hide: function()
        {
            return this.each(function(){ $(this).toggle(true); });
        },
        show: function()
        {
            return this.each(function(){ $(this).toggle(false); });
        },
        val: function(val)
        {
            if (val == undefined)
            {
                var el = this.elems[0];

                if (el == undefined)
                    return false;

                switch(el.type)
                {
                    case "checkbox":
                    case "radio":
                        return el.checked == true;
                    default:
                        if (!isNaN(el.value) && typeof el.value === "string")
                            return parseInt(el.value);
                        return el.value;
                }
            }

            return this.each(function()
            {
                switch(this.type)
                {
                    case "checkbox":
                    case "radio":
                        this.checked = val;
                        break;
                    default:
                        this.value = val;
                        break;
                }
            });
        },
        checked: function(state)
        {
            return this.each(function(){ this.checked = state; });
        },
        addClass: function(classNames)
        {
            return this.each(function()
            {
                classNames = classNames.split(" ");
                for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                    if (!$(this).hasClass(classNames[j]))
                        this.className += (this.className ? " " : "") + classNames[j];
            });
        },
        hasClass: function(className)
        {
            if (!this.hasSingleEl() || this.elems[0].className == undefined)
                return false;

            var regx = new RegExp("\\b" + className + "\\b");

            return regx.test(this.elems[0].className);
        },
        removeClass: function(classNames)
        {
            return this.each(function()
            {
                classNames = classNames.split(" ");
                for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                    if ($(this).hasClass(classNames[j]))
                    {
                        var cclassNames = this.className.split(" ");
                        this.className = "";

                        for (var k = 0, kMAX = cclassNames.length; k < kMAX; k++)
                            if (classNames[j] !== cclassNames[k])
                                this.className += (this.className ? " " : "") + cclassNames[k];
                    }
            });
        },
        toggleClass: function(classNames)
        {
            return this.each(function()
            {
                classNames = classNames.split(" ");
                for (var j = 0, jMAX = classNames.length; j < jMAX; j++)
                    if (!$(this).hasClass(classNames[j]))
                        $(this).addClass(classNames[j]);
                    else
                        $(this).removeClass(classNames[j]);
            });
        },
        remove: function()
        {
            return this.each(function(){ this.parentNode.removeChild(this); });
        },

        /* DOM TRAVERSING */
        parent: function()
        {
            if (!this.hasSingleEl()) return this;

            return new $lib(this.elems[0].parentNode);
        },
        children: function(selector)
        {
            if (!this.hasSingleEl())
                return this;
            else if (selector == null)
                selector = "*";

            return new $lib(selector, this.elems[0]);
        },
        nextSibling: function(selector)
        {
            if (!this.hasSingleEl() ? true : this.elems[0].nextSibling == null)
                return new $lib(null);

            if (selector != undefined)
            {
                var t, m = new $lib(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;

                for (var i = s.length - 1; i >= 0; i--)
                {
                    if (s[i] === this.elems[0] && t == undefined)
                        return new $lib(null);
                    else if (s[i] === this.elems[0] && t != undefined)
                        return new $lib(t);
                    else if (m.elems.indexOf(s[i]) !== -1)
                        t = s[i];
                }
            }

            return new $lib(this.elems[0].nextSibling);
        },
        previousSibling: function(selector)
        {
            if (!this.hasSingleEl() ? true : this.elems[0].previousSibling == null)
                return new $lib(null);

            if (selector != undefined)
            {
                var t, m = new $lib(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;

                for (var i = 0, MAX = s.length; i < MAX; i++)
                {
                    if (s[i] === this.elems[0] && t == undefined)
                        return new $lib(null);
                    else if (s[i] === this.elems[0] && t != undefined)
                        return new $lib(t);
                    else if (m.elems.indexOf(s[i]) !== -1)
                        t = s[i];
                }
            }

            return new $lib(this.elems[0].previousSibling);
        },

        /* EVENT METHODS */
        bind: function(type, listener)
        {
            return this.each(function(){ this.addEventListener(type, listener, false); });
        },
        unbind: function(type, listener)
        {
            return this.each(function(){ this.removeEventListener(type, listener, false); });
        },
        fire: function(evnt)
        {
            var ev = document.createEvent("HTMLEvents");

            return this.each(function()
            {
                ev.initEvent(evnt, true, true);
                this.dispatchEvent(ev);
            });
        },
        blur: function()
        {
            return this.each(function(){ this.blur(); });
        },
        click: function()
        {
            return this.each(function(){ this.click(); });
        },
        scrollIntoView: function(alignWithTop)
        {
            return this.each(function(){ this.scrollIntoView(alignWithTop); });
        },

        /* HELPER METHODS */
        delay: function(func, time)
        {
            return this.each(function()
            {
                var $this = this;
                setTimeout(function()
                {
                    func.call($this);
                }, time);
            });
        },
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
            return this.elems.length === 1;
        },

        /* INPUT RICE */
        riceFile: function()
        {
            return this.each(function()
            {
                if ($(this).attr("riced")) return;

                var div = $("<div class=riceFile><div>BROWSE...</div><span></span>");
                $(this).attr("riced", true)
                       .bind("change", function(){ $(this).nextSibling("span").text($("#qr.dump").exists() ? "" : this.files[0].name); })
                       .bind("focus", function(){ $(this).nextSibling("div").addClass("focus"); })
                       .bind("blur", function(){ $(this).nextSibling("div").removeClass("focus"); })
                       .parent().prepend(div.prepend(this));
            });
        },
        riceCheck: function()
        {
            return this.each(function()
            {
                var click =  function(e){ e.preventDefault(); this.previousSibling.click(); };
                if (this.isRiced) return;
                else if (this.nextSibling != undefined && this.nextSibling.className === "riceCheck")
                    return $(this.nextSibling).bind("click", click);

                var div = $("<div class=riceCheck>").bind("click", click);
                $(this).hide().after(div);

                return this.isRiced = true;
            });
        },
        jsColor: function()
        {
            return this.each(function()
            {
                this.color = new $SS.jscolor.color(this);
            });
        }
    };
    /* END STYLE SCRIPT LIBRARY */

    /* STYLE SCRIPT CLASSES & METHODS */
    $SS =
    {
        browser: { },
        init: function(reload)
        {
            if (!reload)
            {
                if (/^about:neterror/.test(document.documentURI)) return;

                var m_VERSION;
                $SS.browser.webkit = /AppleWebKit/.test(navigator.userAgent);
                $SS.browser.gecko  = /Gecko\//.test(navigator.userAgent);
                $SS.browser.opera  = /Opera/.test(navigator.userAgent);
                $SS.location       = $SS.getLocation();

                // correct selected theme/mascot after updating
                // and the number defaults has changed.
                if ((m_VERSION = $SS.Config.get("VERSION")) !== VERSION)
                {
                    if (/^1\.[0-6].*/.test(m_VERSION))
                    {
                        /* fix old nav links that had hard coded protocols */
                        var links = $SS.Config.get("Nav Links");

                        for (var i = 0, MAX = links.length; i < MAX; i++)
                            if (/^https?:\/\/.*/.test(links[i].link))
                                links[i].link = links[i].link.replace(/^https?:\/\//, "");

                        $SS.Config.set("Nav Links", links);

                        /* temporary fix for webkit ninjakit/tampermonkey */
                        if ($SS.browser.webkit && $SS.Config.hasGM)
                        {
                            $SS.Config.hasGM = false;
                            $SS.Config.init();
                            $SS.Config.hasGM = true;

                            for (key in defaultConfig)
                                if ($SS.conf[key] !== defaultConfig[key] && $SS.conf[key] != undefined)
                                    $SS.Config.set(key, $SS.conf[key]);
                        }
                    }

                    var ntMascots = $SS.Mascots.defaults.length, // new total
                        ntThemes  = $SS.Themes.defaults.length,
                        otMascots = $SS.Config.get("Total Mascots"), // old total
                        otThemes  = $SS.Config.get("Total Themes"),
                        sMascots  = $SS.Config.get("Selected Mascots"),
                        sTheme    = $SS.Config.get("Selected Theme");

                    if (otMascots !== ntMascots && otMascots != undefined)
                    {
                        var mDiff = ntMascots - otMascots;
                        sMascots.reverse();

                        for (var i = 0, MAX = sMascots.length; i < MAX; i++)
                            if (sMascots[i] < otMascots) break;
                            else sMascots[i] += mDiff;

                        $SS.Config.set("Selected Mascots", sMascots);
                    }

                    if (otThemes !== ntThemes && otThemes != undefined && sTheme >= otThemes)
                    {
                        sTheme += ntThemes - otThemes;
                        $SS.Config.set("Selected Theme", sTheme);
                    }

                    $SS.Config.set("VERSION", VERSION);
                    $SS.Config.set("Total Mascots", ntMascots);
                    $SS.Config.set("Total Themes", ntThemes);
                }
            }

            $SS.Config.init();
            $SS.Themes.init();
            $SS.Mascots.init();

            if (reload)
            {
                $SS.insertCSS();
                $SS.DOMLoaded(true);
            }
            else
            {
                if (!$(document.head).exists())
                    $(document).bind("DOMNodeInserted", $SS.insertCSS);
                else
                    $SS.insertCSS();

                if (/complete|interactive/.test(document.readyState))
                    $SS.DOMLoaded();
                else
                    $(document).bind("DOMContentLoaded", $SS.DOMLoaded);
            }
        },

        /* STYLING & DOM */
        insertCSS: function()
        {
            var css;

            if ($(document.head).exists())
                $(document).unbind("DOMNodeInserted", $SS.insertCSS);
            else return;

            $SS.bHideSidebar = ($SS.conf["Sidebar Position"] === 3 ||
                                $SS.location.sub !== "boards" ||
                                $SS.location.board === "f" ||
                                document.title === "Website is currently unreachable");

            css = "@import url("+location.protocol+"//fonts.googleapis.com/css?family=PT+Sans+Narrow);*{font-family:"+$SS.formatFont($SS.conf["Font"])+"!important;font-size:"+$SS.conf["Font Size"]+"px!important}*:focus{outline:none!important;-moz-outline:none!important;-moz-user-focus:none!important}[draggable]{-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none}input:not([disabled]):active,input:focus,select:focus,textarea:focus{outline:1px solid "+$SS.theme.linkColor.hex+"!important;outline-offset:-2px!important}input::-moz-focus-inner{border:0;padding:0}::selection{background:"+$SS.theme.linkColor.hex+";color:#"+($SS.theme.linkColor.isLight?"000":"fff") +"!important}::-moz-selection{background:"+$SS.theme.linkColor.hex+";color:#"+($SS.theme.linkColor.isLight?"000":"fff") +"!important}img,.replyContainer div.highlight{border:0!important}hr{border:0!important;border-top:1px solid rgba("+$SS.theme.brderColor.rgb+",.9)!important;clear:left;margin:.3em 0!important}h1,h2,h3,h4,h5{margin:.4em 0!important}b,h3,.postInfo .name,.postInfo .subject{font-weight:400!important}a:not(.hide_thread_button),a.replylink{text-decoration:none!important;color:"+$SS.theme.linkColor.hex+"!important;font-weight:normal!important;-webkit-transition:all .1s;-moz-transition:all .1s;-o-transition:all .1s}a:hover,div.post div.postInfo span.postNum a:hover{color:"+$SS.theme.linkHColor.hex+"!important;text-shadow:rgba("+$SS.theme.linkHColor.rgb+",.2) 0 0 2px!important}.spoiler a{-webkit-transition:none;-moz-transition:none;-o-transition:none}a:not([href]),a[href='javascript:;']{color:"+$SS.theme.jlinkColor.hex+"!important}.postInfo .name,.postInfo .name a{color:"+$SS.theme.nameColor.hex+"!important}.postertrip,.trip{color:"+$SS.theme.tripColor.hex+"!important}.postMessage .quote{color:"+$SS.theme.quoteColor.hex+"!important}.postMessage .quote a,.quotelink{color:"+$SS.theme.linkHColor.hex+"!important}a.forwardlink{color:"+$SS.theme.linkColor.hex+"!important;text-decoration:underline!important}.spoiler:not(:hover),.spoiler:not(:hover) .quote,.spoiler:not(:hover) a{color:#000!important}.postInfo .subject,.replytitle{color:"+$SS.theme.titleColor.hex+"!important}a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover,#qr .warning,span[style='color:#F00000'],span[style='color:#FF0000;font-weight:normal']{color:"+$SS.theme.sageColor.hex+"!important;text-shadow:none!important}.reply,.hidden_thread,.stub>a,option,div[id*=jsMath],#imgControls,#imgControls .preload,#jsMath_float>*,#watcher>div,.deleteform,a.summary{background:rgba("+$SS.theme.mainColor.rgb+",.9)!important}.globalMessage,#boardNavDesktop{background:"+$SS.theme.mainColor.hex+"!important}a,button,input[type=checkbox],input[type=radio],input[type=button],input[type=submit],#themeoptions #tMascot div,#themeoptions #tThemes>div,.pointer,.riceCheck,.trbtn{cursor:pointer}body,form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),img[alt=Closed],img[alt=Sticky],body>span[style],.navLinks,body>a[style='cursor: pointer; float: right;'],.deleteform,#boardNavDesktop,#boardNavDesktop>a,#boardNavDesktop>span:not(#navtopr)>a,#imageType+label,#qr>form #spoilerLabel,.preview>label,.close,.remove,.report_button,.hide_reply_button:not(.stub)>a,.hidden_thread>span,.stub>a>span{color:transparent!important;font-size:0!important}body>a[style='cursor: pointer; float: right;'],button,form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input[type=button],input[type=submit],#imgControls label,#qr>.move,#qr>form #spoilerLabel::after,#stats .move,#themeoptions #tThemes>div p a,#updater span,#updater .move,#watcher .move,.deleteform::before,.boardBanner .boardSubtitle,.preview>label::after,.riceFile div,.trbtn{text-transform:uppercase}#qr>form>div:first-child .field:not(#dump):focus+span,input:not([type=submit]),select,select *,textarea,#navlinks,#themeoptions label,#themeoptions label>span,#themeoptions #tMascot div a,#updater label,#updater span,.container *{font:"+$SS.conf["Small Font Size"]+"px "+$SS.formatFont($SS.conf["Font"])+"!important}body>a[style='cursor: pointer; float: right;'],#qr>form #spoilerLabel::after,button,form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input[type=button],input[type=submit],#imgControls label,#stats .move,#updater span,#updater .move,#watcher .move,#stats span,.deleteform::after,.preview>label::after,.riceFile div{font-size:"+($SS.conf["Bitmap Font"]?$SS.conf["Font Size"]:9)+"px!important}.globalMessage::before,#qr>.move,#themeoptions #tMascot div a,#themeoptions #tThemes>div p a,#watcher>div>a:first-child,.useremail[href='mailto:sage'] .name::after,.container::before,.deleteform::before,.riceFile span,.trbtn{font-size:"+($SS.conf["Bitmap Font"]?$SS.conf["Font Size"]:10)+"px!important}"+(!$SS.conf["Show Board Name"]?".boardBanner .boardTitle,":"") +(!$SS.conf["Show Text Board"]?".boardBanner .boardSubtitle,":"") +($SS.conf["Post Form"]!==4?"#qr>.move .close,":"") +($SS.conf["Post Form"]===3?"#qr>.move #autohide,#qr>.move .riceCheck,":"") +($SS.conf["Layout"]===2 && !$SS.conf["Thread Separators"]?".board>hr,":"") +($SS.conf["Pages Position"]===4?".pages,":"" ) +($SS.conf["Custom Navigation Links"]?"#boardNavDesktop>select,":"")+"[hidden],.hidden,body>hr,body>form[name=post],.navLinksBot,a[href='#bottom'],.stylechanger,#absbot,#boardNavDesktopFoot,.pagelist,.pages~div,.postingMode,.sideArrows:not(.hide_reply_button),#delform>hr,body>.closed>br,.board>hr:last-child,div[style^='text-align: center'],#imageExpand,.hidden_thread+div.opContainer,.stub+div+div.post{display:none!important}a.summary,a.summary:hover,blockquote>.abbr,.globalMessage::before,.globalMessage>b,button,div,div.autohide>a,form[name=delform],form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input:not(.jsColor),select,textarea,tr,#qr>.move,#qr>form #spoilerLabel::after,#navtopr,#stats span,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,.deleteform::before,.deleteform::after,.summary,.preview>label::after,.reply,.replymode{color:"+$SS.theme.textColor.hex+"!important}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:rgba("+$SS.theme.textColor.rgb+",.4)!important}input:-moz-placeholder,textarea:-moz-placeholder{color:rgba("+$SS.theme.textColor.rgb+",.4)!important}body{background:"+$SS.theme.bgImg.get()+$SS.theme.bgColor.hex +"!important;margin:"+((!$SS.bHideSidebar  && $SS.conf["Sidebar Position"]===1) || ($SS.conf["Sidebar Position"]===3 && $SS.conf["Reserve Edge"])?"0 263px 0 0":(!$SS.bHideSidebar?"0 0 0 265px":"0 0 0"))+"!important;margin-bottom:"+($SS.conf["Navigation Bar Position"]===1?23:43)+"px!important;padding:0!important}"+(!$SS.bHideSidebar?"body::before{background:rgba("+$SS.theme.mainColor.shiftRGB(-18)+",.8);border-"+$SS.conf["Sidebar Position oString"]+":2px solid rgba("+$SS.theme.mainColor.rgb+",.9);box-shadow:"+($SS.conf["Sidebar Position"]!==2?"inset ":"")+$SS.theme.brderColor.hex+" 1px 0 0,"+($SS.conf["Sidebar Position"]===2?"inset ":"")+$SS.theme.brderColor.hex+" -1px 0 0;content:'';height:100%;width:262px;position:fixed;top:"+($SS.conf["Navigation Bar Position"]===1?0:-19)+"px!important;z-index:1}body::after{"+($SS.mascot.overflow?"content:"+$SS.mascot.img.get()+";" :"background:"+$SS.mascot.img.get()+";content:'';height:100%;width:261px;"+(!$SS.mascot.small?"background-size:contain;":""))+"bottom:"+($SS.conf["Navigation Bar Position"]===1?0:21)+"px!important;margin-bottom:"+$SS.mascot.offset+"px;position:fixed;z-index:2;"+($SS.conf["Sidebar Position"]===2 && $SS.mascot.flip?"-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-o-transform:scaleX(-1);":"")+"}":"")+"body::after,body::before,.globalMessage,#imgControls,"+($SS.conf["Post Form"]!==4?"#qr," :"")+"#updater,#watcher{"+$SS.conf["Sidebar Position String"]+":0!important;"+$SS.conf["Sidebar Position oString"]+":auto!important}"+($SS.conf["Layout"]===2?".op,":"")+"#jsmath_button,#jsMath_panel,#jsMath_float,#options ul,#qr,#themeoptions #toWrapper,body>a[style='cursor: pointer; float: right;']+div,.reply,.hidden_thread,.stub>a{border:1px solid "+$SS.theme.brderColor.hex+"!important}.globalMessage,"+($SS.conf["Navigation Bar Position"]===1?"#boardNavDesktop,":"")+"#imgControls{border-bottom:1px solid "+$SS.theme.brderColor.hex+"!important}"+($SS.conf["Sidebar Position"]===3?"#imgControls,":"")+".deleteform,.globalMessage{border-"+$SS.conf["Sidebar Position oString"]+":1px solid "+$SS.theme.brderColor.hex+"!important}"+($SS.conf["Sidebar Position"]===3?".globalMessage,":"")+"#updater{border-right:1px solid "+$SS.theme.brderColor.hex+"!important}#delform{margin-top:18px!important}.closed~#delform{margin-top:0!important}.deleteform,"+($SS.conf["Navigation Bar Position"]!==1?"#boardNavDesktop,":"")+"#fs_data td{border-top:1px solid "+$SS.theme.brderColor.hex+"!important}#jsmath_button{bottom:auto!important;left:0!important;top:1px!important;right:auto!important}#jsMath_panel{bottom:auto!important;left:1em!important;top:1.75em!important;right:auto!important}"+($SS.conf["Layout"]!==2?".thread:not(.stub),body>span[style]~form[name=delform]":".op")+"{background:rgba("+$SS.theme.mainColor.rgb+",.5)}.thread{clear:both;margin:1px"+($SS.conf["Layout"]===1?($SS.conf["Sidebar Position"]!==2?" 0 1px 1px":" 1px 1px 0"):($SS.conf["Layout"]===2?" 0 1px":""))+"!important;overflow:visible!important;padding:0!important;"+($SS.conf["Layout"]!==3?"padding-"+$SS.conf["Sidebar Position String"]+":2px!important;":"")+"position:relative;border-radius:"+($SS.conf["Layout"]!==3?($SS.conf["Sidebar Position"]!==2?"2px 0 0 2px":"0 2px 2px 0"):"2px")+"}form[name=delform] .op::after,#addMascot>label::after,#qr>form>div::after,#updater div>label::after,.thread::after,.reply::after{clear:both;content:'';display:block}.op{border:0!important;position:relative;"+($SS.conf["Layout"]===2?"border-radius:"+($SS.conf["Layout"]!==3?($SS.conf["Sidebar Position"]!==2?"2px 0 0 2px":"0 2px 2px 0"):"2px")+";":"")+"}.hide_thread_button:not(.hidden_thread)>span{"+($SS.conf["Layout"]!==2?"position:absolute;right:0;top:0;":"position:relative;top:1px;")+"}"+($SS.conf["Layout"]!==2?".thread>.hide_thread_button:not(.hidden_thread)>span{right:2px!important}":"")+"form[name=delform]{"+($SS.conf["Layout"]!==2?"border:1px solid rgba("+$SS.theme.brderColor.rgb+",.9);"+($SS.conf["Layout"]===1?"border-"+$SS.conf["Sidebar Position String"]+":0!important;":""):"")+"margin:"+($SS.conf["Layout"]!==3 ?($SS.conf["Sidebar Position"]!==2?"0 0 0 "+$SS.conf["Side Margin"]+"px" :"0 "+$SS.conf["Side Margin"]+"px 0 0") :"0 "+(Math.min($SS.conf["Side Margin"], 40) / 2 * ($SS.conf["Side Margin"] < 10?3:1))+"% 0")+";padding:0!important;position:relative;border-radius:"+($SS.conf["Layout"]!==3?($SS.conf["Sidebar Position"]!==2?"4px 0 0 4px":"0 4px 4px 0"):"4px")+"}.thread>div>.post{"+($SS.conf["Layout"]!==2?"width:100%;":"")+"overflow:visible}.thread:last-child>.postContainer:last-child>.reply{margin-bottom:1px!important}body,body>a[style='cursor: pointer; float: right;']+div,input,select,textarea,.replyContainer>.reply,.hidden_thread,.stub>a,.thread.stub,.riceFile,.riceCheck,.boardBanner .boardTitle,#qr,#qr>form>.captcha>img,#themeoptions #tMascot div,#themeoptions #tThemes .reply,#themeoptions #tNavLinks .navlink .handle{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.sideArrows{margin-left:0!important;margin-right:0!important}"+($SS.conf["Layout"]===2?".op,":"")+".reply,.hidden_thread,.stub>a{"+($SS.conf["Layout"]!==3 && !($SS.conf["Sidebar Position"]!==2 && $SS.conf["Layout"]===2)? "border-"+$SS.conf["Sidebar Position String"]+":0!important;":"")+"}.postContainer,.replyContainer{margin:1px 0 0!important;position:relative}.replyContainer>.replyContainer{border-left:1px solid "+$SS.theme.brderColor.hex+"!important;margin-left:5px!important}div.post{margin:2px 0!important}"+($SS.conf["Layout"]!==2?"hr{margin:0!important}div.post:not(#qp):not([hidden]){margin:0!important;width:100%}":"" )+".favicon{vertical-align:middle}.identifyIcon{margin:0!important;vertical-align:top}.report_button{background-position:0 -16px;vertical-align:top!important;"+($SS.conf["Layout"]!==2?"position:absolute;right:12px;top:0;":"")+"}.inline .report_button,#qp .report_button{position:static!important;vertical-align:middle!important}.replyContainer>.reply input[type=checkbox],.replyContainer>.reply .riceCheck,.container,.hide_thread_button>span,.hide_reply_button,.report_button{z-index:3!important}.inline{background:none!important;border:0!important;overflow:visible}.inline>div.post.reply{background:rgba("+$SS.theme.mainColor.shiftRGB(-16)+",.1)!important;border:1px solid rgba("+$SS.theme.brderColor.rgb+",.4)!important;padding:5px!important;border-radius:3px!important;box-shadow:rgba(0,0,0,.1) 0 5px 10px;overflow:visible!important;position:relative;z-index:10!important;width:auto!important}"+($SS.conf["Layout"]!==2?".hide_reply_button:not(.stub){position:absolute;right:0;top:0;z-index:3}":"")+".hide_reply_button:not(.stub)>a,.hide_thread_button>span{background-position:-80px 0}.hidden_thread>span,.stub>a>span{background-position:-80px -16px;vertical-align:middle!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}.close,.remove{background-position:-16px -16px!important}.remove,#boardNavDesktop>a{padding:0!important}.close,.remove,.report_button,.hide_reply_button:not(.stub)>a,.hide_thread_button>span,.hidden_thread>span,.stub>a>span{margin:0!important;opacity:.5;text-indent:-9999px!important}.close:hover,.remove:hover,.report_button:hover,.hide_reply_button:not(.stub)>a:hover,.hide_thread_button>span:hover,.hidden_thread:hover>span,.stub>a:hover>span{opacity:.75}.replyContainer>.reply>img{vertical-align:middle}.replyContainer>.reply>span{line-height:16px!important}.replyContainer>.reply,.stub,.hidden_thread,.stub>a{padding:5px!important;"+($SS.conf["Layout"]!==2?"width:100%;":($SS.conf["Sidebar Position"]!==2?"margin-right:1px!important;":""))+"border-radius:"+($SS.conf["Layout"]!==3 && !($SS.conf["Sidebar Position"]!==2 && $SS.conf["Layout"]===2) ?($SS.conf["Sidebar Position"]!==2?"2px 0 0 2px":"0 2px 2px 0"):"2px")+"}.replyContainer>.reply{padding-top:2px!important}.replyContainer div.highlight,.highlightPost,.qphl{background:rgba("+$SS.theme.mainColor.shiftRGB(16, true)+",.9)!important}.filter_highlight{box-shadow:-5px 0 rgba(255,0,0,.5)!important}.stub{margin:1px 0 0!important;padding:0!important}.thread.stub{margin:1px 0px!important;padding:0 "+($SS.conf["Sidebar Position"]!==2?"0 0 1px":"1px 0 0")+"!important}.hidden_thread,.stub>a{display:"+($SS.conf["Layout"]===2?"inline-":"")+"block;padding:7px}.container{"+($SS.conf["Backlinks Position"]!==1?"bottom:2px;position:absolute;"+($SS.conf["Backlinks Position"]===2?"right":"left")+":2px;z-index:1;":"")+"margin-left:2px}"+($SS.conf["Backlinks Position"]!==1?".container::before{color:rgba("+$SS.theme.textColor.rgb+",.4)!important;content:'REPLIES:';padding-right:2px}":"")+".container>a{color:"+$SS.theme.blinkColor.hex+"!important}input[type=checkbox]:active,input[type=checkbox]:focus,.qphl{outline:none!important}#qp{background:rgb("+$SS.theme.mainColor.shiftRGB(-8)+")!important;border:1px solid rgba("+$SS.theme.linkColor.rgb+",.4)!important;margin:0 10px!important;max-width:65%;padding:5px;position:fixed!important;z-index:11!important;border-radius:3px}#qp .reply{width:auto!important}a.summary{display:inline-block;line-height:16px;margin:-4px 10px 0!important;padding:0 6px;border-radius:3px}.deleteform{;bottom:"+($SS.conf["Navigation Bar Position"]===1?0:20)+"px!important;height:22px;overflow:hidden;padding:1px 2px 0 18px!important;position:fixed;"+($SS.conf["Sidebar Position"]===3?"right:"+($SS.conf["Post Form"]===4?0:262) +"px;" :$SS.conf["Sidebar Position String"]+":264px;")+"width:0;white-space:nowrap;z-index:"+($SS.conf["Sidebar Position"]===3?11:5)+"!important;"+($SS.conf["Layout"]!==1?"border-radius:"+($SS.conf["Sidebar Position"]!==2?"3px 0 0 0":"0 3px 0 0"):"")+";-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deleteform:hover{"+($SS.conf["Sidebar Position"]!==2?"padding-left:2px!important;"+($SS.conf["Sidebar Position"]===3?"padding-right:4px!important;":"") :"padding-left:0!important;padding-right:3px!important;")+"width:238px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deleteform::before{content:'X';display:inline-block;position:absolute;left:0;top:0;width:20px;height:24px;text-align:center;padding-top:1px}.deleteform:hover::before{overflow:hidden;white-space:nowrap;padding:0;width:0}.deleteform::after{content:'FILE ONLY';position:absolute;bottom:0;right:"+($SS.conf["Sidebar Position"]!==2?120:122)+"px;line-height:24px}.deleteform *{visibility:visible!important}.deleteform input[type=checkbox],.deleteform .riceCheck{margin:2px!important;position:absolute;right:105px;bottom:4px!important;top:auto!important}.deleteform input:not([type=checkbox]){height:20px!important;margin:0 1px 0 0!important}.deleteform input[type=password]{margin-left:4px!important;width:138px!important}.deleteform:hover input[type=password]{margin-left:0!important}table,td:not(.hide_reply_button):not(.deleteform){border:0!important;border-spacing:0!important;table-layout:fixed!important}blockquote{margin:0!important;padding:"+($SS.conf["Slim Replies"]?($SS.conf["Backlinks Position"]!==1?8:4)+"px 16px":"12px 12px 24px 40px")+"!important}blockquote>div[style]{border-color:"+$SS.theme.sageColor.hex+"!important}.fileInfo{padding-left:3px!important}.fileThumb>img+img{background-color:rgba("+$SS.theme.mainColor.rgb+",.01)!important;position:relative;z-index:10}img[alt=Closed],img[alt=Sticky],a[href='.././'],body>a[style='cursor: pointer; float: right;'],#imageType+label,.close,.remove,.report_button,.hide_reply_button:not(.stub)>a,.hide_thread_button>span,.hidden_thread>span,.stub>a>span{background-image:"+$SS.theme.icons.get()+"!important;background-color:transparent!important;background-repeat:no-repeat;display:inline-block;height:0!important;padding-top:16px!important;vertical-align:bottom;width:16px!important}img[alt=Closed]{background-position:0 0!important}img[alt=Sticky]{background-position:-16px 0!important}textarea,button,input:not([type=checkbox]):not([type=radio]),select,#qr>form>.captcha>img,.riceFile{border:1px solid "+$SS.theme.inputbColor.hex+"!important}button,input[type=button],input[type=file],input[type=password],input[type=submit],input[type=text]:not(.jsColor),input#fs_search,input.field,select,textarea,.riceFile,#options input{background:rgba("+$SS.theme.inputColor.rgb+",.9)!important}button,input:not(.jsColor),textarea,.riceFile input~div{-webkit-transition:background .2s,box-shadow .2s;-moz-transition:background .2s,box-shadow .2s;-o-transition:background .2s,box-shadow .2s}button:hover,input[type=button]:hover,input[type=password]:hover,input[type=submit]:hover,input[type=text]:not(.jsColor):not([disabled]):hover,input#fs_search:hover,input.field:hover,select:hover,textarea:hover,#options input:hover,.riceFile input:hover+div,.riceFile input:focus+div,.riceFile div.focus{background:rgba("+$SS.theme.inputColor.hover+",.9)!important}input[type=password]:hover,input[type=text]:not([disabled]):hover,input#fs_search:hover,input.field:hover,select:hover,textarea:hover,#options input:not[type=checkbox]:hover{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px}input[type=password]:focus,input[type=text]:focus,input#fs_search:focus,input.field:focus,select:focus,textarea:focus,#options input:focus{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px}textarea:focus,input[type=text]:not(.jsColor):not([disabled]):focus,input[type=password]:focus,input#fs_search:focus,input.field:focus,#options input:focus{background:rgba("+$SS.theme.inputColor.hover+",.9)!important}button,input[type=button],input[type=submit],.riceFile div{height:22px!important;margin-top:1px!important;padding:0!important;text-align:center!important;vertical-align:top;width:50px}input[type=checkbox],input[type=radio],.riceCheck{background:rgba("+$SS.theme.inputColor.rgb+",.9)!important;border:1px solid rgb("+$SS.theme.inputbColor.rgb+")!important;display:inline-block;height:12px!important;margin:3px;position:relative;vertical-align:top;width:12px!important;border-radius:2px!important;-webkit-appearance:none;-webkit-transition:background .1s;-moz-transition:background .1s;-o-transition:background .1s}input[type=radio]{border-radius:10px!important}input[type=checkbox],.riceCheck{box-shadow:rgba("+$SS.theme.mainColor.shiftRGB(32)+",.3) 0 1px}input[type=checkbox]:hover,input[type=radio]:hover,.riceCheck:hover{background:rgba("+$SS.theme.inputColor.hover+",.9)!important}input[type=checkbox]:checked,input[type=checkbox]:checked+.riceCheck{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px,rgba("+($SS.theme.mainColor.isLight?"255,255,255":"100,100,100") +",.6) 0 1px}input[type=radio]:checked{background:rgba("+$SS.theme.inputColor.shiftRGB(40, true)+",.9)!important;box-shadow:inset rgba("+$SS.theme.inputColor.shiftRGB(100, true)+",.2) 0 0 1px!important}input[type=checkbox]::before,input[type=radio]::before,input[type=checkbox]+.riceCheck::before{content:'';display:block;height:8px;margin:1px;opacity:0;width:8px;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out}input[type=checkbox]:checked::before,input[type=radio]:checked::before,input[type=checkbox]:checked+.riceCheck::before{opacity:1}input[type=checkbox]:checked::before,input[type=checkbox]:checked+.riceCheck::before{background:"+$SS.theme.checkMark.get()+"!important}input[type=radio]:checked::before{background:"+$SS.theme.radioCheck.get()+" transparent!important}input[type=checkbox]:active,input[type=radio]:active,.riceCheck:active{background:rgba("+$SS.theme.inputColor.shiftRGB(40, true)+",.9)!important;box-shadow:inset rgba("+$SS.theme.inputColor.shiftRGB(100, true)+",.4) 0 0 3px,rgba("+$SS.theme.mainColor.shiftRGB(64)+",.6) 0 1px!important}.replyContainer>.reply input[type=checkbox],.replyContainer>.reply .riceCheck,{margin-left:0!important;position:relative}span.filesize~input[type=checkbox],span.filesize~.riceCheck{top:2px}textarea,.navLinks{margin:0!important}td.doubledash{padding:0;text-indent:-9999px}.boardBanner{height:100%;position:fixed;"+$SS.conf["Sidebar Position String"]+":1px;text-align:center;top:20px}.boardBanner,.boardBanner img,.boardBanner .boardTitle{width:"+($SS.conf["Sidebar Position"]===3?261:259)+"px!important}.boardBanner img{height:auto!important;margin:0!important;opacity:.5;position:relative;z-index:1}.boardBanner #bBanner{height:86.3333px;position:fixed}"+($SS.conf["Show Logo Reflection"]?".boardBanner #bBanner::after{background-image:-moz-element(#banner);bottom:-100%;content:'';left:0;mask:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KCTxkZWZzPg0KCQk8bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJncmFkaWVudCIgeDI9IjAiIHkyPSIxIj4NCgkJCTxzdG9wIHN0b3Atb2Zmc2V0PSIwIi8+DQoJCQk8c3RvcCBzdG9wLWNvbG9yPSJ3aGl0ZSIgb2Zmc2V0PSIxIi8+DQoJCTwvbGluZWFyR3JhZGllbnQ+DQoJCTxtYXNrIGlkPSJtYXNrIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBtYXNrQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+DQoJCQk8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPg0KCQk8L21hc2s+DQoJPC9kZWZzPg0KPC9zdmc+#mask');opacity:.6;position:absolute;right:0;top:100%;z-index:1;-moz-transform:scaleY(-1)}.boardBanner img{-webkit-box-reflect:below 0 -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(.1,transparent),to(rgba(255,255,255,.5)))}":"")+".boardBanner .boardTitle{"+($SS.conf["Board Name Position"] == 1?"top:64px;":"bottom:"+($SS.conf["Post Form"]!==1?342:82)+"px;")+"cursor:default!important;display:block;font-family:'PT Sans Narrow',sans-serif!important;font-size:28px!important;font-weight:700!important;height:36px;letter-spacing:-1px;padding:0 10px;position:absolute;text-align:center;text-shadow:"+$SS.theme.mainColor.hex+" -1px -1px,"+$SS.theme.mainColor.hex+" 1px -1px,"+$SS.theme.mainColor.hex+" -1px 1px,"+$SS.theme.mainColor.hex+" 1px 1px,rgba(0,0,0,.6) 0 2px 4px,rgba(0,0,0,.6) 0 0 10px;z-index:3}.boardBanner .boardTitle::selection{background:transparent!important}.boardBanner .boardTitle::-moz-selection{background:transparent!important}.boardBanner .boardSubtitle{"+($SS.conf["Board Name Position"] == 1?"top:98px;":"bottom:"+($SS.conf["Post Form"]!==1?332:72)+"px;")+"left:0;position:absolute;text-shadow:"+$SS.theme.mainColor.hex+" -1px -1px,"+$SS.theme.mainColor.hex+" 1px -1px,"+$SS.theme.mainColor.hex+" -1px 1px,"+$SS.theme.mainColor.hex+" 1px 1px,rgba(0,0,0,.2) 0 0 10px,#000 0 1px 5px,#000 0 -1px 5px;width:100%;z-index:3}.boardBanner .boardSubtitle>a{text-transform:none!important;text-shadow:"+$SS.theme.mainColor.hex+" -1px -1px,"+$SS.theme.mainColor.hex+" 1px -1px,"+$SS.theme.mainColor.hex+" -1px 1px,"+$SS.theme.mainColor.hex+" 1px 1px,rgba(0,0,0,.2) 0 0 10px,#000 0 1px 5px,#000 0 -1px 5px!important}div.autohide>a[title='Auto-hide dialog box']{text-decoration:underline!important}.op,.thread.hidden{display:block!important}.op .filesize{display:inline-block!important;margin:2px "+($SS.conf["Layout"]!==2?6:0)+"px!important}body>span[style]~form .op .filesize{padding-left:6px!important}.inline .filesize{margin:2px 0!important}.filesize span:not([class]){font-size:0!important;visibility:hidden}.filesize span:not([class])::after{content:attr(title);visibility:visible}input:not([type=checkbox]):not([type=radio]),button,select,textarea{-webkit-appearance:none;-o-appearance:none}#options .move,"+($SS.conf["Post Form"]!==4?"#qr>.move,":"")+"#stats .move,#updater .move,#watcher .move{cursor:default!important}#watcher{background:none!important;bottom:auto!important;border:0!important;padding-top:0!important;position:fixed!important;max-width:"+($SS.conf["Auto Hide Thread Watcher"]?200:261)+"px!important;min-width:"+($SS.conf["Auto Hide Thread Watcher"]?0:261)+"px!important;text-align:"+$SS.conf["Sidebar Position String"]+";z-index:4!important;-webkit-transition:max-width .1s .1s,min-width .1s .1s;-moz-transition:max-width .1s .1s,min-width .1s .1s;-o-transition:max-width .1s .1s,min-width .1s .1s}"+($SS.conf["Auto Hide Thread Watcher"]?"#watcher:hover{padding-bottom:16px;max-width:261px!important;min-width:261px!important;-webkit-transition:none;-moz-transition:none;-o-transition:none}":"")+"#watcher .move,#imgControls .preload{display:inline-block;margin:0 5px;padding:2px 5px!important;text-align:center;text-decoration:none!important;border-radius:0 0 3px 3px}#watcher>div:not(.move){line-height:15px;margin:0 5px;"+($SS.conf["Auto Hide Thread Watcher"]?"max-height:0px;max-width:0!important;":"max-width:241px!important;")+"padding:0 5px!important;text-align:left!important;-webkit-transition:max-height .1s,max-width .1s .1s,padding .1s;-moz-transition:max-height .1s,max-width .1s .1s,padding .1s;-o-transition:max-height .1s,max-width .1s .1s,padding .1s}#watcher"+($SS.conf["Auto Hide Thread Watcher"]?":hover":"")+">div:not(.move):nth-of-type(2){margin-top:3px;padding-top:5px!important;border-top-left-radius:3px;border-top-right-radius:3px}#watcher"+($SS.conf["Auto Hide Thread Watcher"]?":hover":"")+">div:not(.move):last-child{padding-bottom:5px!important;border-bottom-left-radius:3px;border-bottom-right-radius:3px}#watcher"+($SS.conf["Auto Hide Thread Watcher"]?":hover":"")+">div:not(.move){max-height:16px;max-width:241px!important;padding:1px 5px!important;-webkit-transition:max-height .1s,max-width 0s,padding .1s;-moz-transition:max-height .1s,max-width 0s,padding .1s;-o-transition:max-height .1s,max-width 0s,padding .1s}#watcher,body>a[style='cursor: pointer; float: right;']{top:19px!important}#overlay,#overlay2{background:rgba(0,0,0,.5);position:fixed;top:0;left:0;height:100%;width:100%;text-align:center;z-index:999!important}#overlay::before,#overlay2::before{content:'';display:inline-block;height:100%;vertical-align:middle}#addMascot,#addTheme,#themeoptions{border:0!important;display:inline-block;position:relative;text-align:right!important;width:600px;padding:5px;vertical-align:middle}#themeoptions>div{padding:5px}.trbtn{color:"+$SS.theme.jlinkColor.hex+";display:inline-block;line-height:18px;margin:0 2px;min-width:40px;padding:2px 10px;text-align:center;background:-webkit-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(20)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9));background:-moz-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(20)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9));background:-o-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(20)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9));border-radius:3px;box-shadow:rgba(0,0,0,.3) 0 0 2px}.trbtn:hover,#selectImage>input[type=file]:hover+.trbtn{background:rgba(60,60,60,.9);background:-webkit-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(40)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9));background:-moz-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(40)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9));background:-o-linear-gradient(top,rgba("+$SS.theme.mainColor.shiftRGB(40)+",.9),rgba("+$SS.theme.mainColor.rgb+",.9))}.trbtn:active,#selectImage>input[type=file]:active+.trbtn{box-shadow:inset rgba(0,0,0,.3) 0 0 2px,rgba(0,0,0,.3) 0 0 2px}.trbtn-small{padding:2px 5px;min-width:30px}#themeoptions #toNav{list-style:none;margin:0;padding:0;position:absolute;top:-26px}#themeoptions #toNav li{float:left;margin:0;padding:0}#themeoptions #toNav li label{background:rgba("+$SS.theme.mainColor.shiftRGB(-10)+",.9);color:#888!important;display:block;height:16px;margin:0 2px;padding:5px 10px;text-align:center;width:75px;border-radius:5px 5px 0 0;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#SSVersion{opacity:.5;padding-right:5px}#themeoptions #toWrapper{background:rgb("+$SS.theme.mainColor.shiftRGB(-12)+");box-shadow:inset rgba(0,0,0,.3) 0 0 5px,rgba("+$SS.theme.mainColor.shiftRGB(32)+",.6) 0 1px 3px;border-radius:5px}#themeoptions #toWrapper,#themeoptions #toWrapper>div{height:400px}#themeoptions #toWrapper>div{overflow:auto}#themeoptions #toWrapper>[name=toTab]:not(:checked)+div{display:none}#updater label,#themeoptions #tMain .mOption,#themeoptions #tNavLinks .navlink{display:block;border-bottom:1px solid rgba("+$SS.theme.mainColor.rgb+",.3);border-top:1px solid rgba(0,0,0,.1);height:20px;padding:0 3px;vertical-align:top}.deleteform::before,#themeoptions #tMain .mOption span{float:left;line-height:20px!important}#themeoptions #tMain .mOption:first-child,#updater div:first-child label{border-top:0!important}#themeoptions #tMain .mOption:last-child,#updater div:nth-last-of-type(3) label{border-bottom:0!important}#themeoptions #tMain select[name=Font] option{max-width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#themeoptions #tMain .subOption::before{border-bottom:1px solid rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);content:'';display:inline-block;float:left;margin-right:2px;height:50%;width:6px}#themeoptions #tMain .subOption{margin-left:16px}#themeoptions #tThemes>div{opacity:.5;-webkit-transition:all .1s;-moz-transition:all .1s;-o-transition:all .1s}#themeoptions #tThemes>div:hover,#themeoptions #tThemes>div.selected{opacity:1}#themeoptions #tThemes .reply{margin:2px 0!important;padding:2px!important;position:relative;text-align:left;width:100%;border-radius:2px!important}#themeoptions #tThemes>div p{bottom:4px;right:2px;margin:0;opacity:0;position:absolute;z-index:3}#themeoptions #tThemes>div:hover p{opacity:1}#themeoptions #tThemes>div p a{display:inline-block;margin:0 2px;padding:2px 5px;text-align:center;width:50px;border-radius:3px}#themeoptions #tThemes>div h3{bottom:0;font-size:32px!important;margin:0!important;opacity:0;position:absolute;right:300px;-webkit-transition:all .3s;-moz-transition:all .3s;-o-transition:all .3s}#themeoptions #tThemes>div.selected h3{opacity:1;right:3px;z-index:1}#themeoptions #tMascot{text-align:center}#themeoptions #toWrapper>div>p{bottom:10px;left:10px;position:absolute}#themeoptions #toWrapper>div>p{margin:0}#themeoptions #tMascot div{background-position:center top!important;background-repeat:no-repeat!important;background-size:cover!important;display:inline-block;height:257px;margin:2px;opacity:.75;position:relative;width:185px;border-radius:10px;-webkit-transition:all .1s;-moz-transition:all .1s;-o-transition:all .1s}#themeoptions #tMascot div:hover{opacity:1}#themeoptions #tMascot div.selected{background-color:rgba("+$SS.theme.linkColor.rgb+",.6)!important;opacity:1;box-shadow:inset rgba(0,0,0,.15) 0 0 15px, rgba("+$SS.theme.linkColor.rgb+",.6) 0 0 2px}#themeoptions #tMascot div a{position:absolute;top:0;padding:5px 8px;background:rgba(0,0,0,.3)}#themeoptions #tMascot div a:not([href]):hover{background:rgba(0,0,0,.5)}#themeoptions #tMascot div a[title=Delete],#themeoptions #tMascot div a[title=Hide]{left:0;border-radius:10px 0 10px 0}#themeoptions #tMascot div a[title=Edit]{right:0;border-radius:0 10px 0 10px}#themeoptions #tNavLinks .navlink>*:not(.handle){position:relative;z-index:1}#themeoptions #tNavLinks .navlink{height:24px;padding-top:1px;position:relative;-webkit-transition:all .2s;-moz-transition:all .2s;-o-transition:all .2s}#themeoptions #tNavLinks .moving{opacity:.5;-webkit-transform:scale(.95);-moz-transform:scale(.95);-0-transform:scale(.95)}#themeoptions #tNavLinks .over:not(.moving){border-top:4px double "+$SS.theme.brderColor.hex+"}#themeoptions #tNavLinks .moving~.over{border-bottom:4px double "+$SS.theme.brderColor.hex+";border-top:1px solid rgba(0,0,0,.1)}#themeoptions #tNavLinks .navlink .handle{border-left:16px solid rgb("+$SS.theme.brderColor.shiftRGB(8, true)+");cursor:move;height:26px;left:0;position:absolute;top:0;width:100%;z-index:0}#themeoptions #tNavLinks label{margin:0 5px;position:relative;top:1px}#themeoptions #tNavLinks label:first-child{float:left;margin-left:18px}#themeoptions #tNavLinks label:first-child>input[type=text]{width:130px}#themeoptions #tNavLinks label>input[type=text]{width:180px}#themeoptions label>input[type=checkbox],#themeoptions label>.riceCheck{margin:4px 2px 0!important;vertical-align:bottom!important}#themeoptions span>select,#themeoptions span>input[type=text]{width:125px}#themeoptions input[type=text],#themeoptions select{height:20px;margin:0!important;padding:1px 3px!important}#themeoptions select{padding:1px 1px 1px 0!important}#themeoptions textarea{background:transparent!important;border:0!important;height:100%!important;width:100%!important;resize:none}#addMascot{width:350px!important}#addMascot>div{padding:5px}#addMascot>label{display:block}#addMascot>label>span,#addTheme>label>span{float:left;line-height:22px;padding-left:5px}#addMascot>label>input[type=text],#addMascot>label>select,#addMascot>label>textarea{margin-top:1px!important;width:200px}#addMascot select[name=mPosition],#addMascot input[name=mOffset][type=text]{width:80px}#addMascot>label>textarea{height:20px;line-height:20px;overflow:hidden;resize:none}#addMascot>label>input[type=checkbox],#addMascot>label>.riceCheck{margin-top:5px}#selectImage{float:left;height:24px!important;margin-top:-2px;padding-top:2px}a[name=clearIMG]{display:none;float:left;opacity:0;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}input[name=customIMGB64]+a[name=clearIMG]{display:inline-block;opacity:1}#addTheme{text-align:left!important;width:500px!important}#addTheme>label{display:inline-block;text-align:right;width:50%}#addTheme>label#customCSS{width:100%}#addTheme>label#customCSS>textarea{height:100px;resize:vertical;width:100%}#addTheme>label>input[type=text],#addTheme>label>select{width:100px}#addTheme>div{margin-top:.6em;text-align:right}#themeoptions,#options.dialog,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,#addMascot,#addTheme{background:rgba("+$SS.theme.mainColor.rgb+",.98)!important;text-align:center}#options.dialog,#themeoptions,#addMascot,#addTheme{margin:0 auto!important;text-align:left;box-shadow:rgba(0,0,0,.6) 0 0 10px;border-radius:5px}#options{width:600px!important}#options hr{margin:3px 0!important}#options button{vertical-align:baseline!important;width:auto!important}#options input{width:150px}#options ul{margin-right:5px;padding:2px 5px!important;border-radius:5px;box-shadow:inset rgba("+($SS.theme.mainColor.isLight?"255,255,255":"155,155,155")+",.3) 0 0 5px}#imgControls{height:18px;position:fixed!important;top:0;width:"+($SS.conf["Sidebar Position"]===3 && $SS.conf["Reserve Edge"]?114:115)+"px!important;padding-"+$SS.conf["Sidebar Position String"]+":147px!important;z-index:6}#imgControls #imageType,#boardNavDesktop>select{background:none!important;border:0!important;line-height:16px!important;margin:0!important;height:18px!important;padding:0 1px 1px 0;width:77px!important}#boardNavDesktop>select{padding:0 4px!important;width:auto!important}#imageType+label{background-position:-48px -16px;content:'';float:right;margin:1px;overflow:hidden}#imageType+label.imgExpanded{background-position:-48px 0}#imgControls .preload{bottom:-20px;height:15px;"+$SS.conf["Sidebar Position oString"]+":24px;padding:1px 5px 3px!important;position:absolute}body>a[style='cursor: pointer; float: right;'],form[name=post] input[name=email]+label,form[name=post] #com_submit+label,#qr>form #spoilerLabel::after,#imgControls label,#navlinks,#stats .move,#themeoptions #toNav li label,#updater span,#updater .move,#watcher .move,.preview>label::after{line-height:16px}#updater{"+($SS.conf["Sidebar Position"]!==2?"text-align:right!important;left:auto!important;right:0!important;":"text-align:left!important;left:0!important;right:auto!important;")+"border-top:0!important;border-"+$SS.conf["Sidebar Position String"]+":0!important;border-"+$SS.conf["Sidebar Position oString"]+":1px solid "+$SS.theme.brderColor.hex+"!important;border-bottom:1px solid "+$SS.theme.brderColor.hex+"!important;position:fixed!important;bottom:auto!important;top:0!important;height:18px;line-height:18px;overflow:hidden;padding:0 3px;z-index:9!important;width:140px}#updater:hover{height:auto!important;padding-bottom:3px}#updater #count.new{background-color:transparent!important}#updater label{line-height:20px!important;text-align:left!important}#updater input,#updater .riceCheck{float:right}#updater input:not([type=checkbox]){margin:1px!important}#updater input[type=button]{margin-right:3px!important;padding:0 5px!important;width:auto!important}#updater input[type=text]{height:19px!important;width:40px!important}#updater:not(:hover){background:transparent!important}#stats{bottom:auto!important;height:18px;line-height:18px;top:0!important;z-index:8!important;"+($SS.conf["Sidebar Position"]!==2?"right:43px!important;left:auto!important;text-align:left;":"right:auto!important;left:43px!important;text-align:right;")+"width:100px}#navlinks{"+($SS.conf["Sidebar Position"]!==2?"right:5px;":"left:5px;right:auto!important;")+"top:0!important;height:20px;z-index:6!important}#ihover{padding-bottom:21px;z-index:10!important}body>center:nth-of-type(2){position:relative}*[style='color: red;']{color:"+$SS.theme.sageColor.hex+"!important}.globalMessage{max-height:18px;max-width:100px;overflow:hidden;padding:0 10px;position:absolute;"+$SS.conf["Sidebar Position String"]+":265px!important;top:"+($SS.conf["Navigation Bar Position"]===1?18:0)+"px;white-space:nowrap;z-index:10;"+($SS.conf["Layout"]!==1?"border-radius:"+($SS.conf["Sidebar Position"]!==2?"0 0 0 3px ":"0 0 3px 0"):"")+";-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.globalMessage::before{content:'ANNOUNCEMENT';display:block;line-height:18px}.globalMessage:hover{max-height:200px;max-width:600px;padding:0 10px 10px;white-space:normal;border-radius:"+($SS.conf["Sidebar Position"]!==2?"0 0 0 3px ":"0 0 3px 0")+"}body>.closed{height:18px;line-height:18px;padding:0!important}"+($SS.conf["Navigation Bar Position"]===1?"#bNavWrapper{margin-left:-265px!important;height:18px;line-height:18px;top:0!important;left:0!important;position:fixed!important;text-align:center;width:100%!important;z-index:12!important}#boardNavDesktop{height:18px!important;padding-left:265px!important}":"#boardNavDesktop{height:20px!important;line-height:20px!important;bottom:0!important;padding:0!important;top:auto!important;left:0!important;position:fixed!important;text-align:center;width:100%!important;z-index:12!important}")+"#navtop,#navtopr{float:none!important;height:18px}#navtop a{text-shadow:rgba(0,0,0,.2) 0 0 3px}#navtop>div{line-height:20px}#navtopr{position:absolute;right:5px!important;top:0}"+(!$SS.conf["Custom Navigation Links"]?"#navtop{bottom:0;display:inline-block!important;height:20px;padding:3px 6px 6px;position:relative;width:500px;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#navtop::before{color:"+$SS.theme.jlinkColor.hex+";content:'Navigation';display:block;font-size:"+$SS.conf["Small Font Size"]+"px;line-height:14px!important}#navtop:hover{background:rgb("+$SS.theme.mainColor.rgb+");bottom:48px;height:64px;line-height:0!important;border-radius:3px;box-shadow:rgba(0,0,0,.2) 0 0 5px}#navtop>a{padding:2px!important}#navtop>a,#navtop>span{display:inline!important;line-height:18px}":"")+($SS.conf["Pages Position"]!==4 ?($SS.conf["Pages Position"]===1?"select#pagesDrop{display:inline-block!important;float:left;margin-top:1px}":".mPagelist{display:block!important}.mPagelist{background:transparent!important;bottom:0!important;display:block;height:20px;left:0!important;margin:0!important;padding:0 5px;position:fixed!important;width:auto!important;z-index:12}.mPagelist .pages{display:-webkit-box!important;display:-moz-box!important;display:box!important;height:20px;padding:0!important;text-align:center;-webkit-box-align:center!important;-moz-box-align:center!important;box-align:center!important}.mPagelist .pages span{padding:2px 3px}"):"")+"body>a[style='cursor: pointer; float: right;'],body>a[style='cursor: pointer; float: right;']::before,body>a[style='cursor: pointer; float: right;']::after{background-color:rgba("+$SS.theme.mainColor.rgb+",.9)!important}body>a[style='cursor: pointer; float: right;']{background-position:-32px 0;position:fixed;"+$SS.conf["Sidebar Position String"]+":"+($SS.conf["Sidebar Position"]===3 && !$SS.conf["Reserve Edge"]?243:241)+"px;text-indent:-9999px;z-index:5}body>a[style='cursor: pointer; float: right;']::before,body>a[style='cursor: pointer; float: right;']::after{content:'';display:block;height:16px;position:absolute;top:0;width:4px}body>a[style='cursor: pointer; float: right;']::before{left:-4px;"+($SS.conf["Sidebar Position"]!==1?"border-radius:0 0 0 2px;":"")+"}body>a[style='cursor: pointer; float: right;']::after{right:-4px;"+($SS.conf["Sidebar Position"]!==2?"border-radius:0 0 2px 0;":"")+"}body>div[style='width: 100%;']+form[name=delform]{display:block!important;margin-top:43px!important;position:fixed}a[href='.././'],body>a[style='cursor: pointer; float: right;'],#imageType+label{opacity:.75;-webkit-transition:opacity .1s ease-in-out;-moz-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out}a[href='.././']:hover,body>a[style='cursor: pointer; float: right;']:hover,#imageType+label:hover,#imageType+label.imgExpanded{opacity:1}body>a[style='cursor: pointer; float: right;']+div{border-left:0!important;border-right:0!important;height:100%;margin:0 auto;width:100%!important}body>a[style='cursor: pointer; float: right;']+div>table{height:100%!important;padding-bottom:20px}body>a[style='cursor: pointer; float: right;']+div>table td{border-left:1px solid "+$SS.theme.brderColor.hex+"!important}body>a[style='cursor: pointer; float: right;']+div>table td:first-child{border-left:0!important}body>a[style='cursor: pointer; float: right;']+div>table input[type=button]{width:100px!important}body>a[style='cursor: pointer; float: right;']+div>table table td{border:0!important}body>a[style='cursor: pointer; float: right;']+div>table textarea{resize:vertical!important}body>a[style='cursor: pointer; float: right;']+div>table table,body>a[style='cursor: pointer; float: right;']+div>table textarea,body>a[style='cursor: pointer; float: right;']+div>table #fs_search{width:100%!important}#fs_data tr:first-child td{border-top:0!important}.riceFile,#selectImage{height:22px;line-height:22px;overflow:hidden;position:relative}.riceFile input[type=file],#selectImage input[type=file]{cursor:pointer!important;position:absolute;top:0;left:0;z-index:1;opacity:0;width:auto!important;-webkit-transform:scale(20) translateX(-30%);-moz-transform:scale(20) translateX(-30%);-o-transform:scale(20) translateX(-30%)}.riceFile div{display:inline-block;line-height:20px!important;margin:0!important;padding:0 10px!important}.riceFile span{display:inline-block;max-width:173px;overflow:hidden;padding:0 5px!important;text-overflow:ellipsis;white-space:nowrap}ul#Alerts,ul#Alerts a:hover{color:#222!important}a[href='.././']{background-position:-64px 0;position:fixed!important;text-indent:-9999px;top:2px;"+$SS.conf["Sidebar Position String"]+":"+(($SS.conf["Sidebar Position"]===3 && $SS.conf["Reserve Edge"]?263:265) - ($SS.conf["Sidebar Position"]!==2?99:38))+"px!important;z-index:8}.exSource{display:inline-block;height:16px;position:relative}.exFound{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important}.exFound:hover{background:rgba("+$SS.theme.mainColor.shiftRGB(-4)+",.9)!important;border-radius:3px 3px 0 0}.exFound:hover>.exPopup{display:block!important}.exPopup{background:rgba("+$SS.theme.mainColor.shiftRGB(-4)+",.9)!important;display:none;left:0;padding:5px;position:absolute!important;top:16px;white-space:nowrap;z-index:11!important;box-shadow:rgba(0,0,0,.3) 0 2px 2px;border-radius:0 3px 3px 3px}.exPopup a{display:block}#boardLinks>a.selectedBoard{text-decoration:underline!important}#qr{height:auto!important;margin:0 0 "+($SS.conf["Navigation Bar Position"]===1?0:21)+"px!important;padding:0 3px 3px!important;position:fixed!important;"+($SS.conf["Post Form"]!==4?"border:0!important;bottom:0!important;border-top:1px solid "+$SS.theme.brderColor.hex+"!important;top:auto!important;overflow:visible!important;"+($SS.conf["Sidebar Position"]===3?"border-left:1px solid "+$SS.theme.brderColor.hex+"!important;z-index:11!important;width:262px!important;":"max-width:261px!important;min-width:261px!important;z-index:5!important;width:261px!important;")+"}#qr.autohide{"+($SS.conf["Post Form"]===1?"bottom:-241px!important;-webkit-transition:bottom .2s ease-in-out 1s;-moz-transition:bottom .2s ease-in-out 1s;-o-transition:bottom .2s ease-in-out 1s;" :($SS.conf["Post Form"]===2?"opacity:.2;-webkit-transition:opacity .2s ease-in-out 1s;-moz-transition:opacity .2s ease-in-out 1s;-o-transition:opacity .2s ease-in-out 1s;":""))+"}"+($SS.conf["Post Form"]===1?"#qr.autohide.dump:not(.focus):not(:hover){bottom:-341px!important}":"")+"#qr:hover,#qr.focus{bottom:0!important;z-index:11!important;"+($SS.conf["Post Form"]===1?"-webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;" :($SS.conf["Post Form"]===2?"opacity:1!important;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out;":""))+"}#qr.autohide>form{display:block!important}":"margin-bottom:19px!important;width:263px!important;z-index:11!important}#qr .move{margin-bottom:1px!important}#qr.autohide:not(:hover):not(.focus){padding:0 3px!important}#qr.focus>form{display:block!important}")+"#qr>form>.captcha>img{height:48px!important;max-width:300px;width:100%}#qr textarea{min-height:120px;position:relative;"+$SS.conf["Sidebar Position String"]+":0;resize:none;width:255px;z-index:1;-webkit-transition:background .2s,box-shadow .2s,width .2s ease-in-out,"+$SS.conf["Sidebar Position String"]+" .2s ease-in-out!important;-moz-transition:background .2s,box-shadow .2s,width .2s ease-in-out,"+$SS.conf["Sidebar Position String"]+" .2s ease-in-out!important;-o-transition:background .2s,box-shadow .2s,width .2s ease-in-out,"+$SS.conf["Sidebar Position String"]+" .2s ease-in-out!important}#qr>.move{height:22px!important;line-height:18px!important;min-width:0!important;padding:2px 0 0 3px!important;text-align:left!important}span[style]~#qr>.move{text-align:center!important}span[style]~#qr>.move #autohide,span[style]~#qr>.move .riceCheck{position:absolute;"+($SS.conf["Post Form"]===4?"left":"right")+":3px;top:2px}#qr>.move *{text-transform:none}#qr>.move select{height:19px!important}#qr>form>div{position:relative}#qr>form>div:first-child #dump,#qr>form>.captcha>img,#qr>form input[type=submit],#qr>form input[type=file],#qr>form .riceFile{margin-top:0!important}#qr>form .riceFile,#qr>form input[type=file]{float:right;width:100%}#qr>form>div:first-child{position:relative}#qr>form>div:first-child #dump{float:left;height:22px!important;width:24px!important}#qr>form>div:first-child .field:not(#dump){float:left;height:22px;margin-left:1px!important;padding:3px 4px!important;width:76px!important}#qr>form>div:first-child .field:not(#dump)+span{color:rgba("+$SS.theme.textColor.rgb+",0)!important;font-size:0!important;position:absolute;right:265px;top:4px;white-space:nowrap;z-index:-1}#qr>form>div:first-child .field[name=sub]{margin-right:0!important}#qr>form>div:first-child+div,#qr>form>div#replies+div,#qr>form>.captcha{clear:both}#qr>form .field,#qr>form>.captcha{margin-bottom:1px!important}#qr>form>.captcha{background:none!important;outline:none!important}#qr>form>.captcha+div{float:left;margin-right:1px;position:relative;z-index:1}#qr>form>.captcha+div input{height:22px;width:189px!important}#qr>form input[type=submit]{width:65px!important}#qr>form input[type=file]+input[type=submit]{position:absolute;right:0;top:0}#qr>form #spoilerLabel{bottom:4px;position:absolute;right:8px;z-index:2}#qr>form #spoilerLabel::after,.preview>label::after{content:'SPOILER'}.preview>label{background:rgba(0,0,0,.75)!important;color:#fff!important}#addReply{font-size:3.5em!important}#qr .warning{overflow:hidden;padding:0 2px;text-align:center;text-overflow:ellipsis;white-space:nowrap}input[name=name].tripping:not(:hover):not(:focus){color:transparent!important}.useremail"+($SS.conf["Sage Identification"]===2?":not([href='mailto:sage'])":"")+" .name::after{vertical-align:middle}form[name=delform][action$='/f/up.php']{border:1px solid "+$SS.theme.brderColor.hex+"!important;margin:0 5%!important;border-radius:3px!important}form[name=delform][action$='/f/up.php']>center{background:rgba("+$SS.theme.mainColor.rgb+", .9)!important;display:block!important;border-radius:3px!important}form[name=delform][action$='/f/up.php']>center>table{width:100%!important}form[name=delform][action$='/f/up.php'] tr{display:table-row!important}"+($SS.conf["Pages Position"]===3?".pages{bottom:auto!important;left:auto!important;margin:0!important;opacity:.75;padding:0!important;position:fixed;right:"+($SS.conf["Layout"]===3 ?(Math.min($SS.conf["Side Margin"], 40) / 2 * ($SS.conf["Side Margin"] < 10?3:1))+"%":"263px")+"!important;top:47%;width:auto!important;z-index:6!important;-webkit-transform:rotate(90deg);-webkit-transform-origin:bottom right;-moz-transform:rotate(90deg);-moz-transform-origin:bottom right;-o-transform:rotate(90deg);-o-transform-origin:bottom right}":"") +($SS.conf["Expanding Form Inputs"]?"#qr input:focus::-webkit-input-placeholder,#qr textarea:focus::-webkit-input-placeholder{color:transparent!important}#qr>form>div:first-child .field:not(#dump):focus{background:rgba("+$SS.theme.inputColor.hover+",.98)!important;left:24px!important;position:absolute;width:230px!important}#qr>form>div:first-child .field:not(#dump):focus+span{color:rgba("+$SS.theme.textColor.rgb+",.4)!important;right:6px;z-index:3;-webkit-transition:right .3s ease-in-out,color .3s ease-in-out;-moz-transition:right .3s ease-in-out,color .3s ease-in-out;-o-transition:right .3s ease-in-out,color .3s ease-in-out}#qr textarea:focus,#qr>form>div:first-child .field:not(#dump):focus{-webkit-transition:box-shadow .2s,width .2s ease-in-out!important;-moz-transition:box-shadow .2s,width .2s ease-in-out!important;-o-transition:box-shadow .2s,width .2s ease-in-out!important}#qr #replies+div{height:121px!important}#qr textarea{position:absolute}#qr textarea:focus{width:415px!important}":"") +(!$SS.conf["Show Logo"]?".boardBanner{top:-20px}.boardBanner img{visibility:hidden}":"") +($SS.conf["Style Scrollbars"]?"::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track-piece,::-webkit-scrollbar-track{background:"+$SS.theme.brderColor.hex+"}::-webkit-scrollbar-corner,::-webkit-scrollbar-resizer{background:"+$SS.theme.brderColor.hex+"}::-webkit-scrollbar-thumb{background:rgb("+$SS.theme.brderColor.shiftRGB(32, true)+");border:2px solid "+$SS.theme.brderColor.hex+";border-radius:5px}::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active{background:rgb("+$SS.theme.brderColor.shiftRGB(64, true)+")}.reply ::-webkit-scrollbar-track,.reply ::-webkit-scrollbar-track-piece{border-radius:5px}": "") +($SS.conf["Sage Identification"]!==1?".useremail[href*='sage'] .name::after,.useremail[href*='Sage'] .name::after,.useremail[href*='SAGE'] .name::after{color:"+$SS.theme.sageColor.hex+"!important;content:"+($SS.conf["Sage Identification"]===2?"' (SAGE)'":"url('data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdFJREFUOE+l0t0rQ3EYwPHz+52bTf4C76XslithbJzNy2xe5p15mR21jAnzknYhbigitUJ5f7sglPdCIkRJRHHhUi60e7t6POcoh23ecvE5p07P8/39Lg4DAMx/+Hz4K/HB1rNv7KgRNaOWH7Syad8FZDikQb1oEe2iPW9fBcLRSFR/5GXJhvHZdsS/OM7qoOW8HjouG6D7zgE9D22AM/v+AuEBDvlKxrz20brHg3nTLKreqgT7UQ04r+zQedsI3fcOwFnpBtRKBTK2lh3lJtSPFWsmKF0phZLlYnzn43I1tF/Y3rVeWD04uywFeAzUUG2oM+SqaKkAjAtGyJzU4VsHtoMqDFg+4KFiM8+N831SoIoK+pNcSrd+Ug9qlxrSxziwbJuA3/lMiCi6Iq+pmWqlQBkVrHIjKZ6EwQSIH4gVr+6tcr0Y9NOaJ5wdoyYqlwKFVHCYOKQEhTMKsmYyIWfO8C533iAGtKOqJ3m5bI0W0Qgk/Ug0hwqOFU4FcMPJYiB7Vi8uGqYyPJxL5Q6zh9zgzDjNxWXhwI8BoiKBRENO/ThB62iQpJI0oiNy8TCfQBxpQj1ESYJIMmH80iAdebutd4CJZnaYGCYYI76Lvwn8xyvFCs5Nsc8yoQAAAABJRU5ErkJggg==')")+"}":"") +($SS.conf["Emoji Icons"]?".useremail[href*='neko'] .name::after,.useremail[href*='Neko'] .name::after,.useremail[href*='NEKO'] .name::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAMAAAAIRmf1AAACoFBMVEUAAABnUFZoUVddU1T6+PvFwLzn4eFXVlT/+vZpZGCgm5dKU1Cfnpz//flbWljr5uLp5OCalpNZWFb//f3r6+n28ff9+PRaVVH59Pr//vr38vj57/Dp7eyjn5zq8O5aVVJbYV9nVFhjUFRiWFlZVlFgZGOboJzm5uZhamfz9/bt8fDw6+drb26bl5j/8/lkX1z06uldWFS5r61UT0tfWlbDwr3Ew76moqNRTU7Mx8P75OpeY19pWl1XW1qzr6x5eHaLiojv7+1UT0xIU0uzqadVS0nV0MxkZGT5+PPk497///ra29Xq5eFtY2H28e2hnJignJlUUE1dXV2vrqxkY2FkYF/m3d5vZmfDuruhl5aZlJHx8O75+PZWVVP29vT/9fTj3trv6ubh5eRdXFqTkpBOTUtqZmX88/RMQ0T78vPEvr7HwcHDwsDq6ef///3Gx8H++fXEv7tZWVedmZZXXVudnJp0c3FZU1f79fnb1dlXUVVjXWFrZmy8t7359/qLj455e3q4s69vamZjX1zy4+avpaReWFz/+f1NR0vu6Ozp4+f48/lnYmi8ur3Iw7/69fHz7+xbV1SZmJZVUk1ZV1zq5ez++f/c196uqbDn4uj9+P7z7vRVVVXt6ORiXl/OycXHw8CPi4ihoJ5aWF3/+v/k3+axrLOsp67LzMZYU1m2sq9dWF5WUU1WUk/Au7eYlJGqpqObmphYVV749f7p5Or38fPu6OpiXFz38fH79vLz7urv6+hhYF5cWWKal6D//f/Z09Xg29exraqbl5RqaW6kpKTq5uPv7Of/+PDj29D//vP18Ozs5+OloJymoZ1ZVVJZWVlkYF2hnpmblIyspJmVjYKQi4enop5STUlRTUpcWUhqY1BgWT9ZUjhcV1NiXVkkhke3AAAABHRSTlMA5vjapJ+a9wAAAP9JREFUGBk9wA1EAwEAhuHv3dTQAkLiUlJFJWF0QDLFYDRXIMkomBgxNIYxhOk4wwCqQhQjxgxSGIsALFA5BiYbMZHajz1oJlx51sBJpf6Gd3zONcrqm/r1W8ByK0r+XV1LXyOLLnjW6hMGpu0u1IzPSdO17DgrGC6AadrVodGcDQYbhguP6wAvAaC0BRZQalkUQ8UQDz5tAof0XbejOFcV5xiUoCfjj3O/nf0ZbqAMPYmzU18KSDaRQ08qnfw+B2JNdAEQt2O5vctUGjhoIBU4ygPsj2Vh5zYopDK73hsirdkPTwGCbSHpiYFwYVVC/17pCFSBeUmoqwYQuZtWxx+BVEz0LeVKIQAAAABJRU5ErkJggg==')}.useremail[href*='sega'] .name::after,.useremail[href*='Sega'] .name::after,.useremail[href*='SEGA'] .name::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAALBAMAAAD2A3K8AAAAMFBMVEUAAACMjpOChImytLmdnqMrKzDIyM55dnkODQ94foQ7PkXm5Olsb3VUUVVhZmw8Sl6klHLxAAAAAXRSTlMAQObYZgAAANFJREFUGJVjYIACRiUlJUUGDHBk4syTkxQwhO3/rQ/4ZYsuymi3YEFUqAhC4LCJZJGIi1uimKKjk3KysbOxsaMnAwNLyqoopaXhttf2it1anrJqke1pr1DlBAZhicLnM5YXZ4RWlIYoezx0zrjYqG6czCDsYRzxIko6Q/qFaKy0690Ij0MxN8K2MIhJXF+hsfxJxuwdpYGVaUU3Mm5bqgKFOZOFit3Vp23J3pgsqLxFUXpLtlD5bgcGBs45794dn6mkOVFQUOjNmXPPz8ysOcAAANw6SHLtrqolAAAAAElFTkSuQmCC')}.useremail[href*='Sakamoto'] .name::after,.useremail[href*='sakamoto'] .name::after,.useremail[href*='SAKAMOTO'] .name::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAxVJREFUOE+Nk19IU1EYwK+GQQTVQ39egh6ibKlzw91z7rn3bvfOmddNszl1bjKXc5rJJGmBUr7Yg9qTD0IalFgRBEYg6EDQQB+GovQyQgiaUZsoLcgHMcr069w7MgcGXfi453zn+37fv3MYZt/n99e76tzVj4JN/hP79fvXnV3hnNabwUBjoOHcgTYOu/JQspgTzsqKgn9BfD4vkWTzur287PqLVy+zM+yePB7KsRXLywTjnSpnZctBkPCdW8ccDuU55vBO8RXbkC/oP5ph19V5+7LIky0OY1BKbZEbLcFSt7u6pN7jLmltCVrr3DV5jY3+KovFEsccB1KJNVpefe10BqS2tqqO4/AuphBB4L/LkrRqNgtJs1lMypLls1kU38mytMLz/E8VIlutqVqX6/weZG52OttRXjbE0cP/FYLRlpVjDXuQ/r77x2XZPKkCHA4HBAIBkCQpAygIAvh8Pu2MZgO0Lz+QSa/sQfwN9RfpVN66XC6Ynp6GhYUFGBwczAC1t7fD0tISxONx6O7upgHILmsqvLcHodOggfiV/v5+SCaT4HQ6IRaLgdfr1bIRRREmJyfBZrNBNBqF+fl5sNsdgE2GiAbp6bmbdbXC7qWQbxMTE7C2tgY6nQ5SqRSEw2ENopaoZpCXlwdTU1NaoECgCbgiU6y8QH+ECYWaTymK7TWdys7MzIwGaWtrg42NDejo6AB1WjU1NZo+FArB2NgYrK6uQrAlCASxn2z6wkuMp87VIAhkE2MEAwMDkEgkYHx8HBYXF0HtkQpRy1BLiEQisLy8rPVNKSsFjEzrXH4+z1hlS4xDhKadNu7t7YPR0VHweDzAEVWfHru6HxkZgeHhYVAURYNjkylVWKArZjjMzqmdVi+QCsLUkQiEjvDvncEkvU7/qQ0Vgukeo48Go87IiCJnZNmipxiz7wXEbVDnbUxQOgM12h9n6qTq6NvapRdtkwaP0XK8RmPuYSbxYfaQ/sJJhjfknuFRURUi7AMOozcCwl94hLZp5F+EioDQVwqYI6jomZU1NFtM+rOSxZjVazcyvwHr/p/Kws1jegAAAABJRU5ErkJggg==')}.useremail[href*='baka'] .name::after,.useremail[href*='Baka'] .name::after,.useremail[href*='BAKA'] .name::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA0pJREFUOE91k3tI01EUx39JOpA0H4jNx0pbD3XTalISWf8YFlEgldqDsBLLyqjEKBCiLLWiggh6/KEV1WZ7OaelLZvDdDafNW1JFraWe/32+01FrUZ9uy4ylLpw4Z5z7/nc77n3HIqaMRIjZJyEcNX+uFCFeGmI/GZciEIsCFJUTvoAzDz+1y7K76MSwhX5hXl6z+WSbrzU2KB8YEGDwgrTaxZ3b7xHcaHhR3xw7Z5/UviB1ReP5XSg3+TAqYJOxMzWISFIC0GQDomhTVA9skCnsaAwp/vnMq66dBokNuBR9uFd7T9Z1zCunjci0qcRJUVdoJ3DYOhRnC/qBZ+jQbfeCc+37yjY2UEg0iwvJE0k9l8Z+8xqHmTgot0QLdQgTaQFQ2AsOzlHvOu1S5pwOLsHHo8HjHMCq2MazNvTlByKHyrJLDvdR25jMWRxYx5HjeMH2r1BDOOeguRua4OI14jx8a8YH5tA+al3EHKlW6mYOapb2oZBOOwMbEMseAE12L+jjUh3w+VipyAZ65oxn1NP/GMYGR6Ftn4Qsf7qa9S82Y/l/X122G0uL2TbxmZEz1WhXW8mUol8moXu+SCi/OoQ6VsDh3UUwyQ1k9GOaI5MTkX4yWTGHutvgI1F28sviAlRgxeoRm62HvsyW8En9pZ1TYgi6TntoyQtFm86rVgUoJZRvDnKMmXVAGxWmkAYOBwudBqGcHCvHulrGpGT2Uy+z4yT+QYsCXtCUpp8GxbKhx8gDK0ro+KjJGvzdjfDZnN6VdisLD5/JjArQ2zW66PJOj2lEZtStaBphkwah7K6kMJ/GEulp1bMWhAmMbTozOQRaWRtfoZVgjo4iRra4SYgGi26TwjxVeDKhR7Y7U606ixICq9tr7hd7+OthRWL7yUnJ1WPmXotqLhpRICPHCePtuFV6xdUPTAhcWEtRHEqfHpPyto4hPXLXnzflSEJnFaN3OCKDcsFsrEntR9RUmxARLAUgT5iBPuJsXWDBj0dZjRU9yNV+PTbpjTp9OA/pOSk24nRkXf1J462oPxcJ65f6ULlHSMulepRerYDgvj7A0cKpNz/tyTZqbzXO4t0ZZGQJ34RH11lFHIlA8LIqreCCMUZRY3cd2bwL/5/RmjNSXqtAAAAAElFTkSuQmCC')}.useremail[href*='PONYO'] .name::after,.useremail[href*='ponyo'] .name::after,.useremail[href*='Ponyo'] .name::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAuNJREFUOE+Nk3tI01EUx39BTytConQTt1am07m5abi5KT5S8z2dj1yOEMUC7aUgIoimlmUEWX9kBZGWaamEmE6U1BI1XNPNGTrnHs33IwuSXrL4NgcJ0mNdOHDh3PPhnPP9XoKwcroJYvMQiRSicHCQKCgUyZC9/T5rNet5KUFs0zCZbZMsFmZ9fTEjEEBDp4/KSSSb/4JoGIyWaTYbiykpWEhOxhSHAzWD0aqkUGhWAcVkW58xlvuPhfh4zItEmOHxYDR3MhcdDaNAsKJydAz5IySKRNjEUmy88vjOVaU8F0iPCqCNjEBHkC/UYaGYFwqxmJoKLYOhkxPElg0QsbNtTlmox9yjRD9UCbnoOR+J/lwRWtOCcdXfDc2BPpg0d7CQlIQZPh9KKlVkAQjJ2x2zmOSsQu7hpzUJfBhLjsNQmADjxcT10Bcl4rE4EHc5LjBEhEPn7f1WTqXSLQB/s1Tp7vslsoIkyPPiMJAbi86McBguiaHKjoEqR4jJy2K0nAxApzMN5iUGrclrKVaz2fUvuF4tRbxDKA90w5VjTFyLZKHpTBSq4/1QnxGB2qxoVIZx0JopRCPHFSNOThfWZzfrXDcZEowH4iA05ATg68hDtBaL0HAuCm3lJ9Bfcx2fFNUoi/DCjRgfNHHd1wCZA2TyXjNkE6F0cBDpPFiojeNi8EkJdFoN3vXch0nbBJOhDd907dANv8JITxNqziag3ZsJbUDAwLin50Q9QWwl1qSYoNOVvUcOoqOqAAa9Fu9H2/F9+B5WZLcwOyxFX18flLI+VASyMGVeoJHD+Tzq5BS1PoaKRrNT8127P74swsq4FCa9FKvqBqwaOiz3hdEuLKueYSyECT2LNW0eIfo3E/WmEbvnG1MUJnWdpWhDGDvxQXZHo+RR0uW2tnv+auPX+TvtJm7zKpaen/4y2yjBUlcxlvtvmvT16ZWDpQeoVv3/60F/NrHjTf4ugazIXtJ8ivjnz/sJ+yGQRjcqUdIAAAAASUVORK5CYII=')}.useremail[href*='RABITE'] .name::after,.useremail[href*='rabite'] .name::after,.useremail[href*='Rabite'] .name::after{content:url('data:image/png;base64,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')}":"") +($SS.conf["Pony Icons"]?".useremail[href*='PINKIE'] .name::after,.useremail[href*='pinkie'] .name::after,.useremail[href*='Pinkie'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA3dJREFUGBlNwUtoXFUcB+Df/zzuY553pp2MmUwSk5TGpnamiokWRdNCSkCrUChKCnVZQUEUdy5sQZC6cyd2VWgoutCFXWTjIyp1UdqmEDBRsSZNmkmaZF6Zx32ccyzowu8j/M883pH5A9kBYfNkFOpu0OiulyqXmnhkDmdYHYJexzX1Ef51EQDhP9fxpjU0PDCd7IldYIxGVag3/KZ/ZX1p8/P0k/0U47qs291M2NS3f6ncuLeFeQ3A8KuYoNPoY/3e2Ej6scSnqUJ8gksmhC2y3OJHpSUHU0/3HU+WCuddyV6VSpVyYv/aUuPefWAP4iDG8AhJWyYYo972tg8DQ1wyWHGZSfcmZmQ+YeKTw1bQ70H8uJw3xtDp6NzG15VLf/DLWMBZHGPkwuWGyq7njLoZyzAiCtqRIddioifBxYBHIpeE0oaw0yoG7WA755dvi8Xih66BOSZj4rwds45bSQkuOeOCQYWG2PjjcEq94JwjQgQ+kCW+tBl3H7Ym4jnbE/nDmamwqz9mnEaYoBgiZaJIGW5zEIHEPheykMD2w12ztPIXCrZHec+GdOVAUI8ygjvifeHQESiNoKtMlIoRxSV0owMjAeY5+P3BKrbTDq3n02B/7yDTDkBANSXiewKgjFbahEwQe34IiVIfRNqCv1qDanQR9Di4+tU16N409o2WMXnyJeNWb9PO4s6WroZawOiSiozCoR7lPFUQezICCzXF+pPGYRna6/rotNqY/eJLUzh4mM5dP4Va0YXV45x0O9F9FhkN5auq4eznaq3WmP1pDkuibW5uraNaqyNh23ihPA6v7wAVS+PwXAGkbYiUnU3kYm8JzvgGpJGdG6vzm15+ce6H79/9bnnBhCxG702dwnTaw4nyM/jsiTHsHx+DEyjKWnGEUpBOyjTTgbpsNHyLojPe7PK3qci58NvNu0Gl0YA8NIxWp4MkdzCdK2Ci6iNYXIV6UEfUDBC2Q/A3WqVbUUfVucWftYhP9fLiFf7yRPGVmZmhE88dJVmpGRMqRH4E3emSbnQR3lkzaqNB3br/J39tb1ibJglGfJDZbMReb37Td/bFhcnB/iNppXNUbZEKFGBJ6FBT+9cVo5c3yd/trDV3OxdFDDHFOV8IffVJtNNOC+J3xtYqATWw0Mm6RIJ9YAy9rdtt07q1ZtjdVXCYFRBG4Bv8A+lliGhzN164AAAAAElFTkSuQmCC')}.useremail[href*='APPLEJACK'] .name::after,.useremail[href*='Applejack'] .name::after,.useremail[href*='applejack'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAv9JREFUOE9dkmtIU2EYx88Roi9FfahkfQmS6kNGEBRlZWSY5tylTKepqR8MHYGl2R1POm2u5bCVlzbog2Ze591pzZPZxUskDZLMMLSWzcIca3MXt7N/55woqhf+PC8Pz+99n+fPQxAEQf6vhINb1nG5/ISdobWXo+9eSd4tyM7OJimKImmaJhsaGjjmX/DGqfDQmkvRg1x+9YrlZPd18fdupXiu6mxkOAcqlUqyuLiYB/+cayfD1rKFH0w3pYEHV4/omhTCyieVcYEB7TEYSyX21Mita/6u/91qUBMV00JrjmKwMg4zI2fgnlfD90PLx+nhMyinIrb91SFBFqaHBevPHb7G/fS06jhs0wXwO8rBOLXws2Kct/k4//HKRE+jZD0Pl2buD2FnmOlVSUFrpJg15/JFgcWKP0Bg8Q6fs1sVs+11wmAebKaEuiG1CC81Yozci+cL4KoC3JUIuCp4+R23+Ee4Dr5bisZmJi7fJzpLRJZPOin8vSlwdSXDO54Hz+vT8LzLh3uuCIuzBfDa1DzMPcrJMVfkIHpVEu94uYgH/aaTvOxdJzDZkI76smhY2mVwDmfg8zM5RukcvH8pbx96mLiPMBTG0nSpGK7mePg6k+DsSUZbSQwem02oba3DRsFKzNQfx9sHSdi1dzve5Ow4xM+ozorY1K2U2MY0IrhbEuB7lIqB6gxY7B9R3XoHAoEAivN74O5LAaXNwvNLe9PlcjlJACANRaIRztFh1iRvfRyYx5kIOCwY+GCE9GIUOjrzwZjS4H16FV80UT1WqzWIWFhYIBsLhDf7y46Ck1UvATNKgXlxHgHbJDyub2DGVPC2s+bVyGDTx74ym80kwe2fKvNASN8NySK3NeayWNagNPj7WaP62Uhn8HdPkwyWW3IoEjdv0Ol0JGE0GvmV0+dFpj9SS5kOKuahr01Wwbb2lXV6aakjkfF1p8DXlwHnaB5yTm1bbzAYfs34e/+0pyNic+N2ruIWmQWXcdE1dUEGd9UYq6kle1mXqVW6imWIn290AGVZutJTAAAAAElFTkSuQmCC')}.useremail[href*='FLUTTERSHY'] .name::after,.useremail[href*='fluttershy'] .name::after,.useremail[href*='Fluttershy'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA2xJREFUOE9dU91PWmcYP2uybDfrxdIlu9vN/oglverWNN3Fmu1iN7vY2q4utnE2Nu26ukyrUUGwExGpn3xY+TyACjrskFrcEYoWnCAM4YAgcJjROkFA1q789nJczNaTPHnfk+f5/d7n4/dQ1Cvf3Ut3Xp//Qnze36gYCt56kIgJpyqRFvrvcIvxMNxhSa9eV993XJK/+yqO/zdf7j7tbRz1RdstLzOKReRoLxJSOzb7HyKtdCEumgErmEbwO03U2aR8738kzq8ln8e6bXlWYMWmZA6Z8SUk5U5ytyPeY0Oy1w5O50FO+wQ5jbtG4lK19L5BGehzb9sE19+JtFt2c8ZlJPvmwAqtSA06EWs3g+2aQnacwdbwAmLknuiZxaZ4FiTD6tLFvi+pBeenb/3mvvo4Yu3D5v1ZsP1axHpUiAo0iPyg41/dGiNgiQI5PXmdXkai92dkVItYbZ6YpVZWLrrKFSOynBip9W6U/7LwViqZ8SykRWpcR8BqJNlmJCZp1LLMkIxSAw6s39WHqUCo/mDnWTdKhwRUMaNMzvLh5NFZsaBIbD+rJ34jgsxtcLQH3IQbKakDoVZDmnpk+irA/fEjCkXlv+AawX+MEJQJcaFEY8bWAJdMgYxyESn5PILNumUqJNVVA4EG7OXlx8Bf3T2QyRuh0X2P5ad9pCQTcjtqDI3UwTMuReIeaaKagb9u6B6VVi9Wg1YRUhkhH1g6NKFf3gD/2gAYz08YVd5AdltDfDS2d2QIrH6DcNcwUjLHc+aC8AMqLrW/4EwesBoligUTCgc05h52IH9gwu6+ERwBb+9pkc0IwLJNWHPXIyrUIdysW2POd52gopIZjtOSpgzOI2NToVAmwD0D9osmvvZSxcCXtr5wA08627Ah0yHZ74D3ysBNXokR8XQ8q2SQM3gQbZtAPm1AiZRyNIUawZGFl5qIRqbBdk4Sndjy1iviIymzIquXldirWRXDzzdOZr63q8J66OqOf+2yL8be+nMr3fry91A9NlRjvKT9tx88Pt6Djdaps0RZxQRZmCzpbHrMBV9b5/YM/dn7tSCT/cNTvpauFdasR5xkkCaS9n07Kj0mIKm+GbujP5OQ/vI8Ofyomhx0sOmxhU9W6wYp5uOO12qB3guik2TuI2QPXmwpXLGnjSMf3RRdO1Hz/QNneMt7Iqmg5QAAAABJRU5ErkJggg==')}.useremail[href*='TWILIGHT'] .name::after,.useremail[href*='twilight'] .name::after,.useremail[href*='Twilight'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA6lJREFUOE+VlF9Mk1cYxj+Kc3+yXWimFxuk2zTIn4bQFkppF0hDNmBpBtgKixhhQZAhbSkFBp1uZWg3ZLRMxFKE0qKtrMy2E2ztn2+1tLQgbuJiorvQ7c5pgplZNjfmePZ9nwtZMm52kufqvOeX5zznfQ9B/M9l/8CXPP2R/6ajy+u0amZeoI8D2PpfTLqMlZQpT9vE2fPOc9l73302q7rs6Sz5K6zM3ZuJzD2EVf1VytejC4hNXoWj2/vlF71+FgVKIsZVHrbnEzLoPkYOqqtPNm7j1l1J4R9Y4wgVkOR3Qcvrg+uNXmTnt9zfmdcUFRd1XqQhC+eWMXP8MiwKdyUDOqMLEG49qYtYlhA+vQi7zocGmQHFYi2UnM9wq/RzNEsOQyDWMBIWtjNurjivw2ucg+toyM+A6LWZU72vvsqwFjwVZwrmrEvoq7DBLDDiltQAobidgeRRUipMTA0t32AU3hNzD7zGSANBZMi2UFe5nyZohrREB9dxEnMTS+jgnUBYMghv2afrbhhHb3aAnFxkQMHhOALDid8p0EHiKU6VklvQil0UiJakqBsf77dCmTmASPEAhoqPIEN4CGmCJvAkauzKfw/5pRr4J+JUTtfo693zGSM7iBdzan10sE9gh5AragNXoEKtvB+93ZMY0TthGraB92oJVlYewDTgQJ96DKTtiStXb8jvNoafIV7i19+lndC2X+bXPyqXffj4kmV+PYexY1aQMwnkv1YGWUUljryvQ0/dqfV9+Vs9zVTYLILKZ5UGsXMbb2/llJaWCN8OnzNMrxda9JNYjt+ENL0RrQol0nekQVtlRHA8gsWpZQhEmrviws5yIpXfcG87t+52UpY8NZXN3lIjPRiOReZxfugCA7s4EsCN727ArHChQiKDYGchRrumELbFEbQmkFvQ+ofg9TYX8Xx2zfnkLDmHbgM2m00M1tortQf06FC2Y2HqGgMjvSR+WfkVplYPzCoX3EOziDmuwjMSRk6BajVP1PYT/fzb/j0nZ7tmN+n3mUlpUTmCo1EGFHJE8NvDR/g+egd0fj5LDN6xKHo6bOAL1D/niTTRDUd2rMW13VBj/zFu/5YZBaYBp69j0blMPfs8zhj9KCjspPNZ+6fjd28IGld4MgIn5x/HJr9ByJRYDz5oS2B6KIT9Nf3IEaj+pCBrXFELOTERZm0Ichy+lHy2czZlpv+y80JfmILFVwPDsTvmo26SJ1I9zBU1/UVBfqAk35ujpb+RpL8BJjxIUjyXvSgAAAAASUVORK5CYII=')}.useremail[href*='RAINBOW'] .name::after,.useremail[href*='Rainbow'] .name::after,.useremail[href*='rainbow'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA3tJREFUGBk9wV9MG3UAB/Dv7+531971aKGMlr+OwjoGBUZwRDrRBJwj0bHEmeiS6Xwyxn8x8UVNzHAPPvliFhMzsy0m8uDD5h/QZWoUNxYMBoZbZCBjZTBoKRwtLde7cv9+bg/6+ZDnzk6C44lw6f6whdOnETpzla+0803RMD3ZGSH95V62lzGQtMH9M7MhfpPUyIX5HE1uvNXDaCQgtykB70cR/4unrn3aqzYkZt7v18ZfezyTkfy0HlJ7FMWKEBJFpYMSVq7bngMlGvvc/OTiLzRYLp8K1waObaS16MDIRfupG9c6SuwCsSt2kJ+/B+3HMdC6MBofa0N1a2sVJTWj02mh4BFCCpV84jN4oHyX3KYEJAi2BWYR2CkPmMlBiOgwE0mYiymo1Qu0Mx4/8VLVnrtnF4VxfuCN9z5mDBA9FJt7mzDe3oXkjou69CqoxkA4gC9xQAggankMa7uTm3m32SLKD+Sz6XXGGCDJAv6j7di4MzqBo199Adk2EIqkQGQHDy3Ij2Q+bHr9g3UxyFHLdFyvJHAg+J/ipYgdjuMyzwELCfRsTWG/NQEwhqCVC0YLy/qKGJzmD77w9pHSoFyjbWWxtjAH5jIIHi8EKkCpq8JteCD2H0F2u4BwZhE+x8BEWbt6i6df8kr/s0+H/HKMc1yo02MYaG9APjGLxJ+T2NxYRV7fxu66GqjwYyrn2AG7YFGw4FygeYiXjva/KoipxoaKGPY1N+PJfRHEauvQaIj47vsLSN67i87ew6hOLGFeTS38FO45XhR8lQlffS0tmGViwbmCdKEb3tJSGLYLieMwMfQr1tZSqOzqheCVkDWIk7i/vvJ7WdVVxd96XWBU4kzb55qOiZvqJazmCxhLGzBFiqbnuzD71xyij8bxEN/XzXccf7PyxJ6+lkxuwknnftP4vorBd9O1mXBAnsbfaQW6VQadcWC7gmiIH0JlrBWuw+DYgFyiSGqu+O2NjZllPMBJRUevuH4Ipu1DyOefrS6RzmQN211iFGUtzSAcD8dh2Ll8cyStai8vra/8MQhgEADvjx/bX78c6rgT1ddl722/btSelEz69eaWoZqms1kwrGVt27xV1I1zgdWfRw6Ww8lmswQAo6QR2dnM6JC6HT3PEfvctjSsnx+3J1uob6qt6gAtSgEu4BbdV2KO80T3O0QQBFiWRQRBwL/txI3OlzkSKwAAAABJRU5ErkJggg==')}.useremail[href*='RARITY'] .name::after,.useremail[href*='Rarity'] .name::after,.useremail[href*='rarity'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAABBFJREFUGBltwV1sU1UAB/D/+bi3t+3tx9plWzemsrFsohsRkIqokRCNEDRBMZFI1Ac1wfhCMIYH3018UXjwQUOMLDEaEgIGiMqEbMAMH5MNJXQwunR00rXrtna9t7f3nHuPI+HBB38/gv+xrX0vjben+sxI665AKPaCV3dCwq6WjESbK4VtUWBSWMsjTnHuxvjUL/YkJvEAwX8cvHCQXPssq7Wz9CdmomM/KEtQjaOWvwsz1UVACKimgTJd+aLRENby+cpM5oAYuzV5DMcUw0PfXb5MtsU3D/SsXnd4rhj+gGpaRCmPOvNFEky2ERYIEBYIklgyQNJbm0ml0tCEb3QHIk076ro4VylMlxhWKKXglstdqZbW3zpXN2+aypQ0XWcktcpAPGlA8RA8j6J3IIJX93TBCBGMXSjCkz4I1+JcC64N+YHjBCt+GB6mz3T1fGuGw+9SStlsvohEMo5AgENBoVioIDc1j4GNnRCuix8PXcLsZBU+CFgkDko1t5K9tZsdOXKEONP1rr51PV/4vhfmnBGuURgBHYQQUEoRDGpIrYrD9z1MDN3B7OgcuOvCqy2hUS7Ap5Qoyn22cH1BS8b6P9+wtW+L73t0OnsX165eRak0D9t1UbdtxONxMMYghICCwvSV+0oKj3i+B9/zIGtLSoFR3tmS7vZY8g0ARNd12LaNYrmKE0OjyM3MIL1lEz7dvx8xDhiGgfY1Lb7SpVCW0hljhGsaPE9C1JYYNczUdkca0cWyTSilME0T/QP9+OidN7Esgrg/18Dx06fg+T5uZzI4dfqMupo9X9Y4ByEUjDEE9KDyhTzLiaY95zoNWsgvobU9CqUUhs6chHAbWJ66iKad74FYeTSEi7O/D+HSxDRMHsroutEmhAQB9WtOdURBfUl9x+lWUqrcnSUQShCJmMjn8xgcHERDSISbWjHQ1wvpugiHQirVsbrW0zlwBgpKAmrBk79WPWdfzVq+xzZ1vnSAmfGmhZJDHl+fRDQWwdPpNEav/Y2elz/G+7tfRFKrIxprQkv7o0h2PPZn7o+bX8ka3l6UwgDjaxJGeK8ZMjPs+e7t+1Qw1CykT/Sght4n2xCLxbDztV14Ym0vNjyiwwgYoIwjGgmhIxmOr1rfPHjl55vj9mJ5syZFKBqO+JZlnaScs/mo70FJicyNCqrVOqSUCGoK/R06POlBN4JwGo5quG6t4TZOSyFul3KzRz2m+l0hXskXZtKlpcIJbtm18eZE65b6chWV+TqymTKeSneOAni27jhQK4Rwi75Sl8u2dTiX+2tkz47XBVZsaPtwPnW9cK7qB9UIflLcsmtHXde9ZWrs64XZ7MWJYe+tdRs7/uGcg3OOByybJKbv5VR2anbx+9uHFB4aG/tGAVB46F/TpfuzvetXvwAAAABJRU5ErkJggg==')}.useremail[href*='SPIKE'] .name::after,.useremail[href*='Spike'] .name::after,.useremail[href*='spike'] .name::after{content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAsFJREFUOE+Fk1tM0nEUx/9QPtCD7z30nE9sbbVeXJJR6j8DkVsIhg6HTqSXnBHSMMEbEy+AgPwVQpcgNy+kKLc/lCgF09Wquaab67kHX1pulif+mHRdne3sd3Z2Pt/fOee3H4J8N/ow2lrj4H64OljRfEXBIZ/k/3lWquXIrQl2ROAVA98jOro2XKUtvV9Dpj/iFV/ppwvLVfzThEBZGRWh0S4hmFx+rId2ysmMSU6WAAUeMfDcdYe0gUrGdUOl7rZXBDRdRQtRp1PeIRlVctIzk+lHR6itJnwC1nkbgOXgZlhO3h6RY9rZKYT7W9NUKpUklUqRKjPDQADEjYTz3SLgzQjzMWua/5E5xLpQrqOX/jEzamTc4LqEX/KQRwRMBwfEDgnUOyXAdgk+1zr5e0w7J/vA15OfN28PW5SnZlRuVT3WeMia5oHW1AthawSS40mIjcWhW98HfF89Ifa6qb+hqAA6FA5xzIp/dVncYDc/hkQOiI/jBcctCegwdRJgsERWcszpZTrKU/3S7s+Ff4vn9UG4aWbGyofoaB60d05dDJuiR/8DcXMCpLY24GPsrlRWcxZxKmaqF0aCsDy8ArgtAVFL/Jc2C4LWBEwFNLCUbt9PZrpEiEk2VjbmMYIdm4TQ6Cq4RmYB02CwZAlB2ByBkHEVYhYcEmEreNZl4F+/C8F0+0vE2x1IL3qDsDgZhKg5Bt7ULAgHa+HVzlt4v7MHMQyHpM8LrlQzuNdaIfJCub+R0Z5DfNrAxsJAEHJbhXhue5nQJmS3t2D73S6suVK5XBKiYQMs4B3xSEbZ83xTc3ljq5eMmNts5/3d82/8jicQDc0Cbo8BjiVyQsez4rYkeNRzfqfadUYgEJBRFCVRKBQS0tTUSM7BxaauUelyenwunnZ+SnhXDkKG0EGgb+5g4p5dpa5TFEkk1bmfQSu8/TfTXs+Z8UbptgAAAABJRU5ErkJggg==')}":"") +($SS.location.sub==="sys"?"body{margin:0!important;padding:0!important}body>form[method='POST']{background:rgba("+$SS.theme.mainColor.rgb+",.9);margin:5px auto;max-width:625px!important;padding:5px;border-radius:5px}body>form[action='']>table{display:table!important}body>form[action='']>table fieldset{text-align:left!important}body>form[action=''],body>form[action='']>table fieldset,body>form[action='']>table #recaptcha_response_field{border:1px solid "+$SS.theme.brderColor.hex+"!important}body>form[action='']>table,body>form[action='']>table td[width]+td{text-align:center}body>form[action='']~.rules{display:block!important;margin:0 auto}body>form[action='']>table td[width='240px']{display:none!important}":"")+$SS.theme.customCSS+"";

            if ($("#ch4SS").exists())
                $("#ch4SS").text(css);
            else
                $(document.head).append($("<style type='text/css' id=ch4SS>").text(css));
        },
        DOMLoaded: function(reload)
        {
            if ($SS.location.sub === "sys") // fix for firefux (maybe opera?) on report popups that have setTimeout.
                document.head.innerHTML = document.head.innerHTML;

            var div;
            reload = reload === true;

            $(document).bind("QRDialogCreation", $SS.QRDialogCreationHandler);

            if ($SS.conf["ExHentai Source"] !== 1)
                $SS.exsauce.init();
            else if (reload)
                $(".exSource").remove();

            if ($SS.conf["Custom Navigation Links"])
                $SS.buildCustomNav();
            else if (reload && (div = $("#boardLinks")).exists())
                div.remove();

            if (!reload)
            {
                $SS.options.init();

                var select = $("#boardSelectMobile").attr("id", "bSelectSS");

                $("option[value=fa]", select).before($("<option value=f>/f/ - Flash"));
                $("option[value=" + $SS.location.board + "]", select).attr("selected", "true");
                div = $("#boardNavDesktop").prepend(select.bind("change", $SS.ChangeBoard));
                $(document.body).prepend($("<div id=bNavWrapper>").append(div));

                div = $("<div id=bBanner>").append($(".boardBanner>img").attr("id", "banner"));
                $(".boardBanner").prepend(div);

                if (!$SS.browser.webkit)
                    $("input[type=checkbox]:not(#imageExpand)").riceCheck();

                if ((div = $("#imageType+label")).exists())
                    div.bind("change", function()
                    {
                        $(this).toggleClass("imgExpanded");
                    });

                if (!$SS.QRhandled && (div = $("#qr")).exists())
                    $SS.QRDialogCreationHandler({ target: div });

                $(document).bind("DOMNodeInserted", $SS.nodeInsertedHandler);

                if ($SS.location.board === "f")
                    $(".postarea input[type=file]").riceFile();
            }
            else
            {
                if (!$SS.conf["Smart Tripcode Hider"])
                    $("input[name=name]").each(function()
                    {
                        $(this).unbind("blur", $SS.tripCheck)
                               .removeClass("tripping");
                    });
            }

            if ($SS.conf["Pages Position"] === 1)
                $SS.buildPagesDropdown();
            else
                $("#pagesDrop").remove();
        },
        ChangeBoard: function(e)
        {
            location.href = location.href.replace(/(\.org\/).+\/.*$/, "$1" + e.target.value + "/");
        },
        nodeInsertedHandler: function(e)
        {
            if ($(e.target).hasClass("replyContainer"))
            {
                if ($SS.conf["ExHentai Source"] !== 1)
                    $SS.exsauce.addLinks(e.target);

                if (!$SS.browser.webkit)
                    $("input[type=checkbox]", e.target).riceCheck();
            }
            else if (e.target.className === "preview")
                $(".riceFile>span", $("#qr")).text("");
            else if (e.target.nodeName === "DIV" && !$SS.browser.webkit)
                $("input[type=checkbox]", e.target).riceCheck();
        },
        QRDialogCreationHandler: function(e)
        {
            var qr = e.target;

            $("input[type=file]").riceFile();

            if ($SS.conf["Post Form"] !== 4)
                $(".move", qr).bind("click", function(){ $("form :focus", qr).blur(); });

            if ($SS.conf["Expanding Form Inputs"])
                $("#dump~input", qr).each(function(){ $(this).after($("<span>" + $(this).attr("placeholder"))); });

            $("input,textarea,select", qr).bind("focus", function(){ $("#qr").addClass("focus"); })
                                          .bind("blur", function(){ $("#qr").removeClass("focus"); });

            if ($SS.conf["Smart Tripcode Hider"])
                $("input[name=name]").each(function()
                {
                    $(this).bind("blur", $SS.tripCheck);
                    $SS.tripCheck(this);
                });

            $SS.QRhandled = true;
        },
        tripCheck: function(e)
        {
            var $this = this.nodeName ? $(this) : $(e),
                check = /^.*##?.+/.test($this.val());

            if (check && !$this.hasClass("tripping"))
                $this.addClass("tripping");
            else if (!check && $this.hasClass("tripping"))
                $this.removeClass("tripping");
        },

        /* CONFIG */
        Config:
        {
            hasGM: typeof GM_deleteValue !== "undefined",
            init: function()
            {
                $SS.conf = [];

                for (var key in defaultConfig)
                    $SS.conf[key] = this.parseVal(key, this.get(key));

                $SS.conf["Small Font Size"]          = $SS.conf["Font Size"] > 11 && !$SS.conf["Bitmap Font"] ? 12 : $SS.conf["Font Size"];
                $SS.conf["Sidebar Position String"]  = $SS.conf["Sidebar Position"] !== 2 ? "right" : "left";
                $SS.conf["Sidebar Position oString"] = $SS.conf["Sidebar Position"] !== 2 ? "left" : "right";
            },
            parseVal: function(key, val)
            {
                if (/^(Selected|Hidden)+\s(Mascots|Themes?)+$/.test(key))
                {
                     if (key === "Selected Theme")
                        return parseInt(val);
                    else if (key === "Selected Mascots" && val === 0)
                        return 0;

                    for (var i = 0, MAX = val.length, ret = []; i < MAX; i++)
                        ret[i] = parseInt(val[i]);

                    return ret;
                }

                return (Array.isArray(val) && typeof val[0] !== "object") ? val[0] : val;
            },
            get: function(name)
            {
                var val = this.hasGM ?
                            GM_getValue(NAMESPACE + name) :
                            localStorage.getItem(NAMESPACE + name);

                if (val != undefined)
                    return JSON.parse(val);

                return defaultConfig[name];
            },
            set: function(name, val)
            {
                name = NAMESPACE + name;

                if (typeof val !== "number")
                    val = JSON.stringify(val);

                return this.hasGM ?
                        GM_setValue(name, val) :
                        localStorage.setItem(name, val);
            }
        },

        /* OPTIONS */
        options:
        {
            saveAndClose  : true,
            deletedThemes : [],
            deletedMascots: [],
            init: function()
            {
                var a = $("<a>SS").bind("click", $SS.options.show);
                return $("#navtopr>a:last-child").replace(a);
            },
            show: function()
            {
                if ($("#overlay").exists())
                    $SS.options.close();
                else
                {
                    var overlay     = $("<div id=overlay>"),
                        tOptions    = $("<div id=themeoptions class=reply>"),
                        optionsHTML = "<ul id=toNav>\
                        <li><label class=selected for=tcbMain>Main</label></li>\
                        <li><label for=tcbThemes>Themes</label></li>\
                        <li><label for=tcbMascots>Mascots</label></li>\
                        <li><label for=tcbNavLinks>Nav Links</label></li>\
                        </ul><div id=toWrapper><input type=radio name=toTab id=tcbMain hidden checked><div id=tMain>\
                        <p><a class=trbtn name=loadSysFonts title='Reqiures flash'>" + ($SS.fontList ? "System Fonts Loaded!" : "Load System Fonts") + "</a></p>",
                        bindNavLinks = function(el)
                        {
                            $(".handle", el).bind("dragstart", function(e)
                            {
                                $(this.parentNode).addClass("moving");
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData("text/plain", this.parentNode.id);
                            })
                            .bind("dragend", function(e){ $(this.parentNode).delay(function(){ $(this).removeClass("moving"); }, 1); })
                            .bind("dragenter", function(e){ $(this.parentNode).addClass("over"); })
                            .bind("dragleave", function(e){ $(this.parentNode).removeClass("over"); });
                            $(el).bind("drop", function(e)
                            {
                                var node = $("#tNavLinks>#" + e.dataTransfer.getData("text/plain"));

                                if (e.dataTransfer.getData("text/plain") !== this.id)
                                {

                                    if ($(this).nextSibling(node).exists())
                                        $(this).before(node);
                                    else
                                        $(this).after(node);
                                }

                                $(this).removeClass("over");
                                e.preventDefault();
                            })
                            .bind("dragover", function(e)
                            {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = "move";
                            });
                            $("a[name=delLink]", el).bind("click", function(){ $(this).parent().remove(); });
                        },
                        key, val, des;

                    for (key in defaultConfig)
                    {
                        if ((key === "Style Scrollbars" && !$SS.browser.webkit) ||
                            key === "Nav Link Delimiter" ||
                            /^(Selected|Hidden)+\s(Mascots|Themes?)+$/.test(key))
                            continue;

                        val = $SS.conf[key];
                        des = defaultConfig[key][1];

                        if (defaultConfig[key][4] === true) // sub-option
                        {
                            var pVal = $SS.conf[defaultConfig[key][2]];
                                id   = defaultConfig[key][2].replace(" ", "_") + defaultConfig[key][3];
                            optionsHTML += "<label class='mOption subOption' id=" + id + " title=\"" + des + "\"" + (pVal != defaultConfig[key][3] ? "hidden" : "") + "><span>" + key + "</span><input" + (val ? " checked" : "") + " name='" + key + "' type=checkbox></label>";
                        }
                        else if (Array.isArray(defaultConfig[key][2])) // select
                        {
                            var opts = key === "Font" ? $SS.fontList || defaultConfig[key][2] : defaultConfig[key][2],
                                cFonts = [];
                            optionsHTML += "<span class=mOption title=\"" + des + "\"><span>" + key + "</span><select name='" + key + "'" + (defaultConfig[key][3] === true ? " hasSub" : "")  + ">";

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

                                if (key === "Font") cFonts.push(value);

                                optionsHTML += "<option" + (key === "Font" ? " style=\"font-family:" + $SS.formatFont(value) + "!important\"" : "") + " value='" + value + "'" + (value == val ? " selected" : "") + ">" + name + "</option>";
                            }

                            if (key === "Font" && cFonts.indexOf($SS.conf["Font"]) == -1)
                               optionsHTML += "<option style=\"font-family:" + $SS.formatFont($SS.conf["Font"]) + "!important\" value='" + $SS.conf["Font"] + "' selected>" + $SS.conf["Font"] + "</option>";

                            optionsHTML += "</select></span>";
                        }
                        else if (key === "Font Size")
                        {
                            optionsHTML += "<span class=mOption title=\"" + des + "\"><span>" + key + "</span><input type=text name='Font Size' value=" + $SS.conf["Font Size"] + "px></span>";
                        }
                        else if (key === "Themes")
                        {
                            optionsHTML += "</div><input type=radio name=toTab id=tcbThemes hidden><div id=tThemes>";
                        }
                        else if (key === "Mascots")
                        {
                            optionsHTML += "</div><input type=radio name=toTab id=tcbMascots hidden><div id=tMascot>";
                        }
                        else if (key === "Nav Links")
                        {
                            var links = $SS.conf["Nav Links"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbNavLinks hidden><div id=tNavLinks>\
                                            <p><a class=trbtn name=addLink>add</a>\
                                            <label>Delimiter: \
                                            <input type=text name='Nav Link Delimiter' value='" + $SS.conf["Nav Link Delimiter"] + "' style='width:40px' title='" + defaultConfig["Nav Link Delimiter"][1] + "'></p>";

                            for (var i = 0, MAX = links.length; i < MAX; i++)
                                optionsHTML += "<div id=navlink" + i + " class=navlink><label>Text: <input type=text value='" + links[i].text + "'></label>" +
                                                    "<label>Link: <input type=text value='" + links[i].link + "'></label><a class=trbtn name=delLink>remove</a><div class=handle draggable=true></div></div>";
                        }
                        else // checkbox
                            optionsHTML += "<label class=mOption title=\"" + des + "\"><span>" + key + "</span><input" + (val ? " checked" : "") + " name='" + key + "' " + (defaultConfig[key][3] === true ? " hasSub" : "")  + " type=checkbox></label>";
                    }

                    optionsHTML += "</div></div><div><span id=SSVersion>4chan SS v" + VERSION + "</span><a class=trbtn name=save title='Hold any modifier to prevent window from closing'>save</a><a class=trbtn name=cancel>cancel</a></div>";
                    tOptions.html(optionsHTML);
                    overlay.append(tOptions);


                    // options window
                    $("#toNav li label", tOptions).bind("click", function(e)
                    {
                        if ($(this).hasClass("selected")) return;

                        $("#toNav li label.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                    $("[hasSub]", tOptions).bind("change", function()
                    {
                        var id  = this.name.replace(" ", "_") + $(this).val(),
                            sub = $("#" + id);

                        if (sub.exists())
                            sub.show();
                        else
                            $("[id*='" + this.name.replace(" ", "_") + "']").hide();
                    });
                    $("a[name=save]", tOptions).bind("click", $SS.options.save);
                    $("a[name=cancel]",tOptions).bind("click", $SS.options.close);
                    $(document).bind("keydown", $SS.options.keydown)
                               .bind("keyup",   $SS.options.keyup);

                    // main tab
                    $("input[name='Font Size']", tOptions).bind("keydown", function(e)
                    {
                        var val    = parseInt($(this).val()),
                            bitmap = $(this).parent().nextSibling().children("input[name='Bitmap Font']").val();

                        if (e.keyCode === 38 && (val < MAX_FONT_SIZE || bitmap))
                            $(this).val(++val + "px");
                        else if (e.keyCode === 40 && (val > MIN_FONT_SIZE || bitmap))
                            $(this).val(--val + "px");
                    });
                    if (!$SS.fontList)
                        $("a[name=loadSysFonts]", tOptions).bind("click", $SS.options.loadSystemFonts);

                    // themes tab
                    $SS.options.createThemesTab(tOptions);

                    // mascots tab
                    $SS.options.createMascotsTab(tOptions);

                    // nav links tab
                    $("a[name=addLink]", tOptions).bind("click", function()
                    {
                        var el = $("<div id=navlink" + $("#tNavLinks>.navlink").length() + " class=navlink>")
                                .html("<label>Text: <input type=text></label>" +
                                      "<label>Link: <input type=text value='boards.4chan.org/'></label><a class=trbtn name=delLink>remove</a><div class=handle draggable=true></div>");
                        bindNavLinks(el);
                        $("#tNavLinks").append(el);
                    });
                    $("#tNavLinks .navlink", tOptions).each(function(){ bindNavLinks(this); });

                    return $(document.body).attr("style", "overflow:hidden;").append(overlay);
                }
            },
            createThemesTab: function(tOptions)
            {
                var themes = $("#tThemes", tOptions).html(""),
                    p      = $("<p>");

                p.append($("<a class=trbtn name=addTheme>add", tOptions).bind("click", $SS.options.showTheme));
                p.append($("<a class=trbtn name=restoreThemes title='Restore hidden default themes'>restore", tOptions)
                    .bind("click", function()
                    {
                        $SS.conf["Hidden Themes"] = [];
                        $SS.options.createThemesTab(tOptions);
                    })
                );

                if ($SS.conf["Hidden Themes"].length === 0)
                    $("a[name=restoreThemes]", p).hide();

                themes.append(p);

                for (var i = 0, MAX = $SS.conf["Themes"].length, tTheme; i < MAX; i++)
                {
                    if ($SS.conf["Hidden Themes"].indexOf(i) !== -1)
                        continue;

                    tTheme = new $SS.Theme(i);
                    themes.append(tTheme.preview());
                }
            },
            createMascotsTab: function(tOptions)
            {
                var mascots = $("#tMascot", tOptions).html(""),
                    p       = $("<p>");

                p.append($("<a class=trbtn name=addMascot>add", tOptions).bind("click", $SS.options.showMascot));
                p.append($("<a class=trbtn name=restoreMascots title='Restore hidden default mascots'>restore", tOptions)
                    .bind("click", function()
                    {
                        $SS.conf["Hidden Mascots"] = [];
                        $SS.options.createMascotsTab(tOptions);
                    })
                );

                if ($SS.conf["Hidden Mascots"].length === 0)
                    $("a[name=restoreMascots]", p).hide();

                p.append($("<a class=trbtn name=selectAll>select all", tOptions)
                    .bind("click", function(){ $("#tMascot>div").each(function(){ $(this).addClass("selected") }); }));
                p.append($("<a class=trbtn name=selectNone>select none", tOptions)
                    .bind("click", function(){ $("#tMascot>div").each(function(){ $(this).removeClass("selected") }); }));

                mascots.append(p);

                for (var i = 0, MAX = $SS.conf["Mascots"].length, tMascot; i < MAX; i++)
                {
                    if ($SS.conf["Hidden Mascots"].indexOf(i) !== -1)
                        continue;

                    tMascot = new $SS.Mascot(i);
                    mascots.append(tMascot.preview());
                }
            },
            close: function()
            {
                $(document.body).attr("style", "");
                $(document).unbind("keydown", $SS.options.keydown)
                           .unbind("keyup", $SS.options.keydown);

                return $("#overlay").remove();
            },
            keydown: function(e)
            {
                if (e.keyCode >= 16 && e.keyCode <= 18)
                {
                    $SS.options.saveAndClose = false;
                    $("a[name=save]").text("apply");
                }
            },
            keyup: function(e)
            {
                if (!$SS.options.saveAndClose)
                {
                    $SS.options.saveAndClose = true;
                    $("a[name=save]").text("save");
                }
            },
            loadSystemFonts: function(evt)
            {
                var loadFontBTN = $(evt.target),
                    getFontMessage;
                $(document.head).append($('<script type="text/javascript">\
                function populateFontList(fontArr)\
                {\
                    var fontList = [];\
                    for (var key in fontArr)\
                        fontList.push(fontArr[key]);\
                    window.postMessage(fontList, "*");\
                }'));
                window.addEventListener("message", getFontMessage = function(e)
                {
                    $SS.fontList = e.data;
                    var fontSelect = $("<select name=Font>");

                    for (var i = 0, MAX = $SS.fontList.length; i < MAX; i++)
                    {
                        var name, value;
                            name = value = $SS.fontList[i];

                        fontSelect.append($("<option" + " style=\"font-family:" + $SS.formatFont(value) + "!important\"" + " value='" + value + "'" + (value == $SS.conf["Font"] ? " selected=true" : "") + ">" + name));
                    }

                    $("select[name=Font]").before(fontSelect).remove();

                    $("#fontListSWF").remove();
                    window.removeEventListener("message", getFontMessage);
                    loadFontBTN.text("System Fonts Loaded!").unbind("click", $SS.options.loadSystemFonts);
                }, false);

                $(document.body).append($("<div id=fontListSWF hidden><object type='application/x-shockwave-flash' data='" + fontListSWF + "'><param name=allowScriptAccess value=always></object>"));
                return loadFontBTN.text("Loading...");
            },
            save: function()
            {
                var div             = $("#themeoptions"),
                    themes          = [],
                    mascots         = [],
                    links           = [],
                    selectedMascots = [],
                    selectedTheme;

                // Save main
                $("#themeoptions input[name]:not([name=toTab]), #themeoptions select").each(function()
                {
                    var name = $(this).attr("name"),
                        val  = $(this).val();

                    if (name === "Font Size")
                    {
                        val = parseInt(val);

                        if (!$("input[name='Bitmap Font']", div).val())
                            val = Math.max(Math.min(val, MAX_FONT_SIZE), MIN_FONT_SIZE);
                    }
                    else if (name === "Nav Link Delimiter")
                        val = val.replace(/\s/g, "&nbsp;");

                    $SS.Config.set($(this).attr("name"), val);
                });

                // Save Themes
                $("#themeoptions #tThemes>div").each(function()
                {
                    var index = parseInt(this.id.substr(5));
                    if (!$SS.conf["Themes"][index].default)
                        themes.push($SS.conf["Themes"][index]);
                });

                selectedTheme = (selectedTheme = $("#themeoptions #tThemes>div.selected")).exists() ?
                    parseInt(selectedTheme.attr("id").substr(5)) : 0;

                $SS.Config.set("Themes", themes);
                $SS.Config.set("Selected Theme", selectedTheme);
                $SS.Config.set("Hidden Themes", $SS.conf["Hidden Themes"]);

                // Save Mascots
                $("#themeoptions #tMascot div").each(function(index)
                {
                    var index = parseInt(this.id.substr(6));
                    if ($(this).hasClass("selected"))
                        selectedMascots.push(index);

                    if (!$SS.conf["Mascots"][index].default)
                        mascots.push($SS.conf["Mascots"][index]);
                });

                $SS.Config.set("Mascots", mascots);
                $SS.Config.set("Selected Mascots", selectedMascots);
                $SS.Config.set("Hidden Mascots", $SS.conf["Hidden Mascots"]);

                // Save nav links
                $("#themeoptions #tNavLinks>.navlink").each(function()
                {
                    var nLink = {};

                    $(this).children("input").each(function(index)
                    {
                        if (index === 0)
                            nLink.text = $(this).val();
                        else if (index === 1)
                            nLink.link = $(this).val();
                    });

                    if (nLink.text !== "" && nLink.link !== "")
                        links.push(nLink);
                });

                $SS.Config.set("Nav Links", links);

                if ($SS.options.saveAndClose)
                    $SS.options.close();

                return $SS.init(true);
            },
            showTheme: function(tIndex)
            {
                var div, overly;

                if (typeof tIndex === "number")
                {
                    var bEdit  = true,
                        tEdit  = $SS.conf["Themes"][tIndex],
                        RPA, themeR, themePY, themePX, themeA;

                    if (tEdit.bgImg && tEdit.bgRPA)
                    {
                        RPA     = tEdit.bgRPA.split(" ");
                        themeR  = RPA[0];
                        themePY = RPA[1];
                        themePX = RPA[2];
                        themeA  = RPA[3];
                    }
                }

                div = $("<div id=addTheme>");

                var innerHTML = "<label>\
                <span>Theme Name:</span><input type=text name=name value='" + (bEdit ? tEdit.name : "") + "'>\
                </label><label>\
                <span>BG Image:</span><input type=text name=bgImg value='" + (bEdit ? ($SS.validImageURL(tEdit.bgImg) ? tEdit.bgImg + "'" :
                ($SS.validBase64(tEdit.bgImg) ? "[Base 64 Encoded Image]' disabled=true" : "'")) : "'") + "></label><label>\
                <span>BG Repeat:</span><select name=bgR>\
                <option" + (bEdit && themeR === "no-repeat" ? " selected" : "") + ">no-repeat</option>\
                <option" + (bEdit && themeR === "repeat" ? " selected" : "") + ">repeat</option>\
                <option" + (bEdit && themeR === "repeat-x" ? " selected" : "") + ">repeat-x</option>\
                <option" + (bEdit && themeR === "repeat-y" ? " selected" : "") + ">repeat-y</option>\
                </select></label><label>\
                <span>BG Attachment:</span><select name=bgA>\
                <option" + (bEdit && themeA === "fixed" ? " selected" : "") + ">fixed</option>\
                <option" + (bEdit && themeA === "scroll" ? " selected" : "") + ">scroll</option>\
                </select></label><label>\
                <span>BG Position-X:</span><select name=bgPX>\
                <option" + (bEdit && themePX === "left" ? " selected" : "") + ">left</option>\
                <option" + (bEdit && themePX === "center" ? " selected" : "") + ">center</option>\
                <option" + (bEdit && themePX === "right" ? " selected" : "") + ">right</option>\
                </select></label><label>\
                <span>BG Position-Y:</span><select name=bgPY>\
                <option" + (bEdit && themePY === "top" ? " selected" : "") + ">top</option>\
                <option" + (bEdit && themePY === "center" ? " selected" : "") + ">center</option>\
                <option" + (bEdit && themePY === "bottom" ? " selected" : "") + ">bottom</option>\
                </select></label>";

                for (var i = 0, MAX = themeInputs.length; i < MAX; i++)
                    innerHTML += "<label><span>" + themeInputs[i].dName + ":</span>\
                    <input type=text class=jsColor name=" + themeInputs[i].name + " value=" + (bEdit ? tEdit[themeInputs[i].name] : "") + "></label>";

                innerHTML += "<label id=customCSS><span>Custom CSS:</span><textarea name=customCSS>" + (bEdit ? tEdit.customCSS || "" : "") + "</textarea>\
                </label><div><div id=selectImage><input type=file riced=true accept='image/GIF,image/JPEG,image/PNG'>\
                <span class=trbtn>Select Image</span></div>\
                " + (bEdit && $SS.validBase64(tEdit.bgImg) ? "<input type=hidden name=customIMGB64 value='" + tEdit.bgImg + "'>" : "") + "\
                <a class=trbtn name=clearIMG>Clear Image</a>\
                <a class=trbtn name=" + (bEdit ? "edit" : "add") + ">" + (bEdit ? "edit" : "add") + "</a><a class=trbtn name=cancel>cancel</a></div>";

                div.html(innerHTML);
                $(".jsColor", div).jsColor();

                overlay = $("<div id=overlay2>").append(div);

                $("#selectImage>input[type=file]", div).bind("change", $SS.options.SelectImage);
                $("a[name=clearIMG]", div).bind("click", $SS.options.ClearImage);

                if (bEdit)
                    $("a[name=edit]", div).bind("click", function(){ $SS.options.addTheme(tIndex); });
                else
                    $("a[name=add]", div).bind("click", $SS.options.addTheme);

                $("a[name=cancel]", div).bind("click", function(){ $("#overlay2").remove(); });

                if (bEdit)
                    $("input,textarea,select", div).bind("change", tEdit.mHandler = function()
                    {
                        tEdit.modified = true;
                        $("input,textarea,select", $("#addTheme")).unbind("change", tEdit.mHandler);
                    });

                return $(document.body).append(overlay);
            },
            addTheme: function(tIndex)
            {
                var overlay = $("#overlay2"),
                    tTheme  = { },
                    makeRPA = function()
                    {
                        var RPA = [];

                        RPA.push($("select[name=bgR]",  overlay).val());
                        RPA.push($("select[name=bgPY]", overlay).val());
                        RPA.push($("select[name=bgPX]", overlay).val());
                        RPA.push($("select[name=bgA]",  overlay).val());

                        return RPA.join(" ");
                    },
                    bEdit = typeof tIndex === "number",
                    tEdit = bEdit ? $SS.conf["Themes"][tIndex] : null,
                    error = false,
                    div;

                if (bEdit && !tEdit.modified)
                    return overlay.remove();

                $("input[type=text],textarea", overlay).each(function()
                {
                    var val;

                    if (this.name === "bgImg")
                    {
                        var b64 = $("input[name=customIMGB64]", overlay);
                        val     = b64.exists() ? decodeURIComponent(b64.val()) : this.value;

                        if (val !== "" && !$SS.validImageURL(val) && !$SS.validBase64(val))
                        {
                            error = true;
                            return alert("Invalid image URL/base64.");
                        }

                        val = $SS.cleanBase64(val);
                    }
                    else if (this.name === "name")
                    {
                        val = this.value;

                        if (bEdit && tEdit.default && tEdit.name === val)
                            val += " [Modded]"
                    }
                    else
                        val = this.value;

                    if (val !== "")
                        tTheme[this.name] = val;
                });

                if (error) return;

                if (tTheme.bgImg)
                    tTheme.bgRPA = makeRPA();

                if (bEdit && !tEdit.default)
                {
                    $SS.conf["Themes"][tIndex] = tTheme;
                    tTheme = new $SS.Theme(tIndex);
                    div    = $("#theme" + tIndex, $("#overlay"));

                    div.replace(tTheme.preview());
                }
                else
                {
                    tTheme.author = "You";
                    tIndex        = $SS.conf["Themes"].push(tTheme);
                    tTheme        = new $SS.Theme(--tIndex);
                    div           = tTheme.preview();

                    $("#overlay #tThemes").append(div);
                }

                div.fire("click").scrollIntoView(true);

                return overlay.remove();
            },
            deleteTheme: function(tIndex)
            {
                if (confirm("Are you sure?"))
                {
                    if ($SS.conf["Themes"][tIndex].default &&
                        $SS.conf["Hidden Themes"].push(tIndex) === 1)
                        $("#tThemes a[name=restoreThemes]").show();
                    else
                        $SS.options.deletedThemes.push(tIndex);

                    return $("#theme" + tIndex).remove();
                }
            },
            showMascot: function(mIndex)
            {
                var div, overly;

                if (typeof mIndex === "number")
                    var bEdit = true,
                        mEdit = $SS.conf["Mascots"][mIndex];

                div = $("<div id=addMascot>").html("<label><span>Image:</span><input type=text name=customIMG value='" + (bEdit ? ($SS.validImageURL(mEdit.img) ? mEdit.img + "'" : "[Base 64 Encoded Image]' disabled=true") : "'") + "></label>\
                        <label title='Auto goes according to the post forms position' for=null><span>Alignment/Offset:</span>\
                        <select name=mPosition>\
                            <option" + ((bEdit && !mEdit.position) || !bEdit ? " selected" : "") + ">Auto</option>\
                            <option" + (bEdit && mEdit.position === "top" ? " selected" : "") + ">Top</option>\
                            <option" + (bEdit && mEdit.position === "center" ? " selected" : "") + ">Center</option>\
                            <option" + (bEdit && mEdit.position === "bottom" ? " selected" : "") + ">Bottom</option>\
                        </select>\
                        <input type=text name=mOffset value='" + (bEdit && mEdit.position ? mEdit.offset + "px" : "") + "'></label>\
                        <label title='Prevent streching with smaller images (Width < 313px)'><span>Prevent stretching:</span><input type=checkbox name=mSmall" + (bEdit && mEdit.small ? " checked" : "") + "></label>\
                        <label title='Horizontally flip the mascot when sidebar is on the left'><span>Flip with sidebar:</span><input type=checkbox name=mFlip" + (!bEdit || (bEdit && (mEdit.flip || mEdit.flip == undefined)) ? " checked" : "") + "></label>\
                        <label title='Allows the mascot to be shown outside the sidebar, forces auto offset and ignores `Prevent stretching` option'><span>Allow overflow:</span><input type=checkbox name=mOverflow" + (bEdit && mEdit.overflow ? " checked" : "") + "></label>\
                        <label title='List of boards to display this mascot on, seperated by commas. Example: a,c,g,v,jp'><span>Boards:</span><input type=text name=mBoards value='" + (bEdit && mEdit.boards ? mEdit.boards : "") + "'></label>\
                        <div>\
                        <div id=selectImage><input type=file riced=true accept='image/GIF,image/JPEG,image/PNG'>\
                        <span class=trbtn>Select Image</span></div>\
                        " + (bEdit && $SS.validBase64(mEdit.img) ? "<input type=hidden name=customIMGB64 value='" + mEdit.img + "'>" : "") + "\
                        <a class=trbtn name=clearIMG>Clear Image</a>\
                        <a class=trbtn name=" + (bEdit ? "edit" : "add") + ">" + (bEdit ? "edit" : "add") + "</a><a class=trbtn name=cancel>cancel</a></div></div>");

                overlay = $("<div id=overlay2>").append(div);

                $("#selectImage>input[type=file]", div).bind("change", $SS.options.SelectImage);
                $("a[name=clearIMG]", div).bind("click", $SS.options.ClearImage);

                if (bEdit)
                    $("a[name=edit]", div).bind("click", function(){ $SS.options.addMascot(mIndex); });
                else
                    $("a[name=add]", div).bind("click", $SS.options.addMascot);

                $("a[name=cancel]", div).bind("click", function(){ $("#overlay2").remove(); });

                return $(document.body).append(overlay);
            },
            addMascot: function(mIndex)
            {
                var overlay = $("#overlay2"),
                    bSetPos, cIMG, cPosition, cOffset, cSmall, cFlip, tMascot;

                cIMG      = decodeURIComponent($("input[name=customIMGB64]", overlay).val() || $("input[name=customIMG]", overlay).val());
                cPosition = $("select[name=mPosition]", overlay).val().toLowerCase();
                cOffset   = parseInt($("input[name=mOffset]", overlay).val()) || 0;
                cSmall    = $("input[name=mSmall]", overlay).val();
                cFlip     = $("input[name=mFlip]", overlay).val();
                cOverflow = $("input[name=mOverflow]", overlay).val();
                cBoards   = $("input[name=mBoards]", overlay).val();
                bSetPos   = cPosition !== "auto";

                if (!$SS.validImageURL(cIMG) && !$SS.validBase64(cIMG))
                    return alert("Invalid image URL/base64.");

                cIMG = $SS.cleanBase64(cIMG);

                if (typeof mIndex === "number")
                {
                    $SS.conf["Mascots"][mIndex].img      = cIMG;
                    $SS.conf["Mascots"][mIndex].small    = cSmall;
                    $SS.conf["Mascots"][mIndex].flip     = cFlip;
                    $SS.conf["Mascots"][mIndex].overflow = cOverflow;

                    if (cBoards !== "")
                        $SS.conf["Mascots"][mIndex].boards   = cBoards;
                    else
                        delete $SS.conf["Mascots"][mIndex].boards;

                    if (bSetPos)
                    {
                        $SS.conf["Mascots"][mIndex].position = cPosition;
                        $SS.conf["Mascots"][mIndex].offset   = cOffset;
                    }
                    else
                    {
                        delete $SS.conf["Mascots"][mIndex].position;
                        delete $SS.conf["Mascots"][mIndex].offset;
                    }

                    tMascot = new $SS.Image(cIMG);
                    $("#mascot" + mIndex).attr("style", "background:" + tMascot.get());
                }
                else
                {
                    var tMascot = { img: cIMG, small: cSmall, flip: cFlip, overflow: cOverflow, boards: (cBoards === "" ? undefined : cBoards) };

                    if (bSetPos)
                    {
                        tMascot.position = cPosition;
                        tMascot.offset   = cOffset;
                    }

                    mIndex  = $SS.conf["Mascots"].push(tMascot);
                    tMascot = new $SS.Mascot(--mIndex).preview();
                    $("#tMascot").append(tMascot);
                    tMascot.fire("click").scrollIntoView(true);
                }

                return overlay.remove();
            },
            deleteMascot: function(mIndex)
            {
                if (confirm("Are you sure?"))
                {
                    if ($SS.conf["Mascots"][mIndex].default &&
                        $SS.conf["Hidden Mascots"].push(mIndex) === 1)
                        $("#tMascot a[name=restoreMascots]").show();
                    else
                        $SS.options.deletedMascots.push(mIndex);

                    return $("#mascot" + mIndex).remove();
                }
            },
            SelectImage: function()
            {
                var div      = $("#overlay2"),
                    parent   = $(this).parent(),
                    image    = this.files[0],
                    fileName = image.name.substr(image.name.lastIndexOf("\\") + 1),
                    reader   = new FileReader(),
                    b64, val, input;

                reader.onload = (function(tImage)
                {
                    return function(evt)
                    {
                        val = $SS.cleanBase64(evt.target.result);

                        if (!(b64 = $("input[name=customIMGB64]", div)).exists())
                        {
                            b64 = $("<input type=hidden name=customIMGB64>").val(val);
                            parent.after(b64);
                        }
                        else
                            b64.val(val);

                        if ((input = $("input[name=bgImg]", div)).exists())
                            input.val(fileName).disabled(true);
                        else
                            $("input[name=customIMG]", div).val(fileName).disabled(true);
                    }
                })(image);

                reader.readAsDataURL(image);
            },
            ClearImage: function()
            {
                var div = $("#overlay2"), input;

                $("input[name=customIMGB64]").remove();

                if ((input = $("input[name=bgImg]", div)).exists())
                    return input.val("").disabled(false);

                return $("input[name=customIMG]", div).val("").disabled(false);
            }
        },

        /* THEMES */
        Themes:
        {
            defaults:
            [
                {
                    name:        "Dark Flat",
                    "default":   true,
                    bgImg:       "R0lGODlhAwADAIAAAB0dHRkZGSH5BADoAwAALAAAAAADAAMAAAIDDG5YADs=",
                    bgRPA:       "repeat top left fixed",
                    bgColor:     "202020",
                    mainColor:   "232425",
                    brderColor:  "292a2b",
                    inputColor:  "18191a",
                    inputbColor: "121314",
                    blinkColor:  "6f99b4",
                    jlinkColor:  "ac9bb0",
                    linkColor:   "ac9bb0",
                    linkHColor:  "6f99b4",
                    nameColor:   "a8c6d9",
                    quoteColor:  "b3c45e",
                    textColor:   "dddddd",
                    sageColor:   "c99090",
                    tripColor:   "d4c095",
                    titleColor:  "9390c9",
                    customCSS:   ".reply{border:0!important}"
                },
                {
                    name:        "Photon",
                    "default":   true,
                    bgImg:       false,
                    bgColor:     "eeeeee",
                    mainColor:   "dddddd",
                    brderColor:  "cccccc",
                    inputColor:  "cccccc",
                    inputbColor: "bbbbbb",
                    blinkColor:  "0066ff",
                    jlinkColor:  "333333",
                    linkColor:   "ff6600",
                    linkHColor:  "0066ff",
                    nameColor:   "004a99",
                    quoteColor:  "789922",
                    textColor:   "333333",
                    sageColor:   "990000",
                    tripColor:   "ff3300",
                    titleColor:  "002244"
                },
                {
                    name:        "Tomorrow Night", // Originally by Chris Kempson @ https://github.com/ChrisKempson/Tomorrow-Theme
                    author:      "Chris Kempson",
                    "default":   true,
                    bgImg:       false,
                    bgColor:     "1d1f21",
                    mainColor:   "282a2e",
                    brderColor:  "373b41",
                    inputColor:  "282a2e",
                    inputbColor: "1d1f21",
                    blinkColor:  "cc6666",
                    jlinkColor:  "81a2be",
                    linkColor:   "81a2be",
                    linkHColor:  "cc6666",
                    nameColor:   "81a2be",
                    quoteColor:  "b5bd68",
                    textColor:   "c5c8c6",
                    sageColor:   "cc6666",
                    tripColor:   "8abeb7",
                    titleColor:  "b294bb"
                },
                {
                    name:        "Yotsuba",
                    "default":   true,
                    bgImg:       "http://static.4chan.org/image/fade.png",
                    bgRPA:       "repeat-x top center fixed",
                    bgColor:     "ffffee",
                    mainColor:   "f0e0d6",
                    brderColor:  "d9bFb7",
                    inputColor:  "ffffff",
                    inputbColor: "aaaaaa",
                    blinkColor:  "dd0000",
                    jlinkColor:  "800000",
                    linkColor:   "0000ee",
                    linkHColor:  "dd0000",
                    nameColor:   "117743",
                    quoteColor:  "789922",
                    textColor:   "800000",
                    sageColor:   "cc1111",
                    tripColor:   "228854",
                    titleColor:  "cc1105",
                    customCSS:   'new String("#delform,.reply,.hidden_thread,.stub{border-radius:0!important}\n.reply,.hidden_thread,.stub{border-left:0!important;border-top:0!important;"+($SS.conf["Layout"]==1?"border-right:0!important":"")+"}")'
                },
                {
                    name:        "Yotsuba B",
                    "default":   true,
                    bgImg:       "http://static.4chan.org/image/fade-blue.png",
                    bgRPA:       "repeat-x top center fixed",
                    bgColor:     "eef2ff",
                    mainColor:   "d6daf0",
                    brderColor:  "b7c5d9",
                    inputColor:  "ffffff",
                    inputbColor: "aaaaaa",
                    blinkColor:  "dd0000",
                    jlinkColor:  "34345C",
                    linkColor:   "34345C",
                    linkHColor:  "dd0000",
                    nameColor:   "117743",
                    quoteColor:  "789922",
                    textColor:   "000000",
                    sageColor:   "990000",
                    tripColor:   "228854",
                    titleColor:  "0f0c5d",
                    customCSS:   'new String("#delform,.reply,.hidden_thread,.stub{border-radius:0!important}\n.reply,.hidden_thread,.stub{border-left:0!important;border-top:0!important;"+($SS.conf["Layout"]==1?"border-right:0!important":"")+"}")'
                },
                {
                    name:        "安心院なじみ",
                    "default":   true,
                    bgImg:       "http://i.imgur.com/RewHm.png",
                    bgRPA:       "no-repeat right bottom fixed",
                    bgColor:     "ffffff",
                    mainColor:   "efefef",
                    brderColor:  "d6d6d6",
                    inputColor:  "cccccc",
                    inputbColor: "bbbbbb",
                    blinkColor:  "f5871f",
                    jlinkColor:  "bf8040",
                    linkColor:   "bf8040",
                    linkHColor:  "bf8040",
                    nameColor:   "2b80c2",
                    quoteColor:  "718c00",
                    textColor:   "4d4d4c",
                    sageColor:   "c82829",
                    tripColor:   "3e999f",
                    titleColor:  "4d4d4d"
                },
                {
                    name:        "Midnight Caek",
                    author:      "zixaphir",
                    "default":   true,
                    bgImg:       false,
                    bgColor:     "101010",
                    mainColor:   "1c1c1c",
                    brderColor:  "1c1c1c",
                    inputColor:  "1c1c1c",
                    inputbColor: "101010",
                    blinkColor:  "47475b",
                    jlinkColor:  "57577b",
                    linkColor:   "57577b",
                    linkHColor:  "47475b",
                    nameColor:   "7c2d2d",
                    quoteColor:  "71793e",
                    textColor:   "909090",
                    sageColor:   "7c2d2d",
                    tripColor:   "3e7157",
                    titleColor:  "aaaaaa"
                },
                {
                    name:        "Solarized", // http://ethanschoonover.com/solarized
                    author:      "Ethan Schoonover",
                    "default":   true,
                    bgImg:       false,
                    bgColor:     "073642",
                    mainColor:   "032b36",
                    brderColor:  "133942",
                    inputColor:  "073642",
                    inputbColor: "0d272e",
                    blinkColor:  "4f5f8f",
                    jlinkColor:  "696fc0",
                    linkColor:   "696bba",
                    linkHColor:  "d33682",
                    nameColor:   "586e75",
                    quoteColor:  "859900",
                    textColor:   "93a1a1",
                    sageColor:   "cc6666",
                    tripColor:   "2aa198",
                    titleColor:  "bec2c4",
                    customCSS:   ".reply{border:0!important}"
                },
                {
                    name:        "4chan Rewired", // Originally by !K.WeEabo0o @ http://userstyles.org/styles/57787/4chan-rewired
                    author:      "!K.WeEabo0o",
                    "default":   true,
                    bgImg:       "http://oi39.tinypic.com/2h51rb4.jpg",
                    bgRPA:       "no-repeat bottom right fixed",
                    bgColor:     "f4f4f4",
                    mainColor:   "efefef",
                    brderColor:  "d4d4d4",
                    inputColor:  "e4e4e4",
                    inputbColor: "cccccc",
                    blinkColor:  "bf7f3f",
                    jlinkColor:  "bf7f3f",
                    linkColor:   "bf7f3f",
                    linkHColor:  "d33682",
                    nameColor:   "4c4c4c",
                    quoteColor:  "6b7a1e",
                    textColor:   "4c4c4c",
                    sageColor:   "cc6666",
                    tripColor:   "bf7f3f",
                    titleColor:  "4c4c4c",
                    customCSS:   'new String(($SS.conf["Layout"]===2?".opContainer{display:block!important;border:1px solid "+this.brderColor.hex+"!important;"+($SS.conf["Sidebar Position"]===3?"margin-left:-"+($SS.conf["Side Margin"]+2)+"px!important;padding-left:"+($SS.conf["Side Margin"]+2)+"px!important}.opContainer,":"}"):"")+".post.reply{background:-webkit-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;background:-moz-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;background:-o-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;box-shadow:0 2px 5px rgba(0,0,0,.05)!important}.reply.highlight,.qphl{border-color:rgba("+this.linkHColor.rgb+",.6)!important}")'
                },
                {
                    name:        "violaceous",
                    author:      "!MaSoOdDwDw",
                    "default":   true,
                    bgImg:       false,
                    bgColor:     "121314",
                    mainColor:   "1b1b1b",
                    brderColor:  "292a2b",
                    inputColor:  "18191a",
                    inputbColor: "121314",
                    blinkColor:  "db95e5",
                    jlinkColor:  "db95e5",
                    linkColor:   "2a7fa0",
                    linkHColor:  "3090b5",
                    nameColor:   "a497b0",
                    quoteColor:  "00ab3f",
                    textColor:   "dddddd",
                    sageColor:   "4f4f4f",
                    tripColor:   "bd2b83",
                    titleColor:  "06989a",
                    customCSS:   ".reply{border:0!important}"
                }
            ],

            init: function()
            {
                $SS.conf["Themes"] = Array.isArray($SS.conf["Themes"]) ?
                    this.defaults.concat($SS.conf["Themes"]) : this.defaults.slice(0);

                var tIndex = $SS.conf["Themes"][$SS.conf["Selected Theme"]] ?
                    $SS.conf["Selected Theme"] : 0;

                $SS.theme = new $SS.Theme(tIndex); // Set the active theme.
            }
        },

        /* MASCOTS */
        Mascots:
        {
            defaults:
            [
                { img: "http://i.imgur.com/DL5uR.png", overflow: true,                                          "default":   true }, // asuka
                { img: "http://i.imgur.com/zhPlM.png",                                                          "default":   true }, // erio
                { img: "http://i.imgur.com/b9KmB.png",                                                          "default":   true }, // homu
                { img: "http://i.imgur.com/bsLY4.png", offset: 0, position: "center",                           "default":   true }, // horo
                { img: "http://i.imgur.com/uO5qZ.png",                                                          "default":   true }, // kuroko
                { img: "http://i.imgur.com/Ht6dr.png", offset: -90, position: "center", small: true,            "default":   true }, // kuroneko
                { img: "http://i.imgur.com/56oEl.png",                                                          "default":   true }, // inori
                { img: "http://i.imgur.com/ridLc.png", overflow: true,                                          "default":   true }, // kimi
                { img: "http://i.imgur.com/AfjG9.png", offset: 0, position: "center", flip: false, small: true, "default":   true }, // lain
                { img: "http://i.imgur.com/WUIMw.png",                                                          "default":   true }, // luka
                { img: "http://i.imgur.com/J1i26.png", offset: -90, position: "center",                         "default":   true }, // madotsuki
                { img: "http://i.imgur.com/53yAK.png", overflow: true,                                          "default":   true }, // ムゥ～りさ
                { img: "http://i.imgur.com/H1pgZ.png", offset: 0, position: "center", flip: false, small: true, "default":   true }, // miku
                { img: "http://i.imgur.com/MdE9K.png", flip: false, overflow: true,                             "default":   true }, // mio
                { img: "http://i.imgur.com/NaKmF.png", offset: 0, position: "center",                           "default":   true }, // mokou
                { img: "http://i.imgur.com/WWozC.png", overflow: true,                                          "default":   true }, // ran
                { img: "http://i.imgur.com/K1mLx.png", flip: false, samll: true,                                "default":   true }, // shana
                { img: "http://i.imgur.com/FKDcd.png",                                                          "default":   true }, // shiki
                { img: "http://i.imgur.com/zu9nY.png",                                                          "default":   true }, // tessa
                { img: "http://i.imgur.com/haBSN.png",                                                          "default":   true }, // yin
                { img: "http://i.imgur.com/xwPrX.png",                                                          "default":   true }, // yozora
                { img: "http://i.imgur.com/c8Lal.png",                                                          "default":   true }  // yuzuki
            ],

            init: function()
            {
                $SS.conf["Mascots"] = Array.isArray($SS.conf["Mascots"]) ?
                    this.defaults.concat($SS.conf["Mascots"]) : this.defaults.slice(0);

                var eMascot = [],
                    mIndex;

                if ($SS.conf["Selected Mascots"] === 0)
                {
                    eMascot = $SS.conf["Mascots"];
                    mIndex  = Math.floor(Math.random() * eMascot.length);
                }
                else
                {
                    for (var i = 0, MAX = $SS.conf["Selected Mascots"].length, j; i < MAX; i++)
                    {
                        j = $SS.conf["Selected Mascots"][i];
                        if ($SS.conf["Mascots"][j].boards != undefined &&
                            $SS.conf["Mascots"][j].boards.split(",").indexOf($SS.location.board) == -1)
                            continue;

                        eMascot.push(j);
                    }

                    if (eMascot.length === 0)
                        return $SS.mascot = new $SS.Mascot(-1);
                    else
                        mIndex = $SS.conf["Selected Mascots"][Math.floor(Math.random() * eMascot.length)];
                }

                $SS.mascot = new $SS.Mascot(mIndex); // Set the active mascot.
            }
        },

        /* Thanks to hurfdurf
         * http://pastebin.com/TTDJNH7c
         * Modified by ahoka
         * To display links to matched doujins/galleries.
         **/
        /* EXHENTAI SOURCE */
        exsauce:
        {
            init: function()
            {
                this.extype = $SS.conf["ExHentai Source"] === 2 ? "exhentai" : "g.e-hentai";
                $SS.exsauce.addLinks(document);
            },
            addLinks: function(x)
            {
                setTimeout(function()
                {
                    $("a.fileThumb", x).each(function()
                    {
                        var node = $(this).previousSibling(".fileInfo");

                        if (!$(".exSource", node).exists())
                        {
                            var a = $("<a class=exSource href='" + location.protocol + $(this).attr("href") + "'>" + $SS.exsauce.extype).bind("click", $SS.exsauce.fetchImage);
                            node.append(document.createTextNode(" ")).append(a);
                        }
                    });
                }, 10);
            },
            fetchImage: function(e)
            {
                if (e.which !== 1) return;
                e.preventDefault();

                var a = $(e.target);
                a.text("loading");

                GM_xmlhttpRequest(
                {
                    method: "GET",
                    url: a.attr("href"),
                    overrideMimeType: "text/plain; charset=x-user-defined",
                    headers: { "Content-Type": "image/jpeg" },
                    onload: function(x) { $SS.exsauce.checkTitles(a, x.responseText); }
                });
            },
            checkTitles: function(anchor, data)
            {
                var hash = $SS.exsauce.sha1Hash($SS.exsauce.data_string(data));

                anchor.html("checking")
                      .attr("href", "http://" + this.extype + ".org/?f_shash=" + hash + "&fs_similar=1&fs_exp=1")
                      .unbind("click", $SS.exsauce.fetchImage);

                GM_xmlhttpRequest(
                {
                    method: "GET",
                    url: anchor.attr("href"),
                    onload: function(x)
                    {
                        var temp    = $("<div>").html(x.responseText),
                            results = $("div.it3>a:not([rel='nofollow']),div.itd2>a:not([rel='nofollow'])", temp),
                            MAX     = results.length();

                        anchor.html("found: " + MAX).attr("target", "_blank");

                        if (MAX > 0)
                        {
                            var div = $("<div class=exPopup id=ex" + hash + ">");
                            anchor.addClass("exFound").append(div);

                            for (var i = 0; i < MAX; i++)
                            {
                                var ret = results.get(i),
                                    a   = $("<a href='" + ret.href + "' target=_blank>" + ret.innerHTML);
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

        /**
         * jscolor, JavaScript Color Picker
         *
         * @version 1.3.11
         * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
         * @author  Jan Odvarko, http://odvarko.cz
         * @created 2008-06-15
         * @updated 2011-11-07
         * @link    http://jscolor.com
         */
        jscolor:
        {
            getElementPos: function(e)
            {
                var e1=e, e2=e;
                var x=0, y=0;

                if (e1.offsetParent)
                    do
                    {
                        x += e1.offsetLeft;
                        y += e1.offsetTop;
                    }
                    while(e1 = e1.offsetParent);

                while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== "BODY")
                {
                    x -= e2.scrollLeft;
                    y -= e2.scrollTop;
                }

                return [x, y];
            },
            getElementSize: function(e)
            {
                return [e.offsetWidth, e.offsetHeight];
            },
            getRelMousePos: function(e)
            {
                var x = 0, y = 0;

                if (!e)
                    e = window.event;

                if (typeof e.offsetX === "number")
                {
                    x = e.offsetX;
                    y = e.offsetY;
                }
                else if (typeof e.layerX === "number")
                {
                    x = e.layerX;
                    y = e.layerY;
                }

                return { x: x, y: y };
            },
            getViewPos: function()
            {
                if (typeof window.pageYOffset === "number")
                    return [window.pageXOffset, window.pageYOffset];
                else if (document.body && (document.body.scrollLeft || document.body.scrollTop))
                    return [document.body.scrollLeft, document.body.scrollTop];
                else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop))
                    return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
                else
                    return [0, 0];
            },
            getViewSize: function()
            {
                if (typeof window.innerWidth === "number")
                    return [window.innerWidth, window.innerHeight];
                else if (document.body && (document.body.clientWidth || document.body.clientHeight))
                    return [document.body.clientWidth, document.body.clientHeight];
                else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
                    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
                else
                    return [0, 0];
            },

            // TODO: remove this array.
            images:
            {
                pad: [ 181, 101 ],
                sld: [ 16, 101 ],
                cross: [ 15, 15 ],
                arrow: [ 7, 11 ]
            },

            color: function(target)
            {

                this.required = true; // refuse empty values?
                this.adjust = true; // adjust value to uniform notation?
                this.hash = false; // prefix color with # symbol?
                this.caps = false; // uppercase?
                this.slider = true; // show the value/saturation slider?
                this.valueElement = target; // value holder
                this.styleElement = target; // where to reflect current color
                this.onImmediateChange = null; // onchange callback (can be either string or function)
                this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
                this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

                this.pickerSmartPosition = true; // automatically adjust picker position when necessary
                this.pickerFace = 10; // px
                this.pickerFaceColor = "ThreeDFace"; // CSS color
                this.pickerBorder = 1; // px
                this.pickerBorderColor = "ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight"; // CSS color
                this.pickerInset = 1; // px
                this.pickerInsetColor = "ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow"; // CSS color
                this.pickerZIndex = 10000;

                this.hidePicker = function()
                {
                    if (isPickerOwner())
                        removePicker();
                };
                this.showPicker = function()
                {
                    if (!isPickerOwner())
                    {
                        var tp = $SS.jscolor.getElementPos(target); // target pos
                        var ts = $SS.jscolor.getElementSize(target); // target size
                        var ps = getPickerDims(this); // picker size
                        var a=0, b=1, c=1;
                        var l = (ts[1]+ps[1])/2;

                        var pp =
                        [
                            tp[0],
                            tp[1]+ts[1]
                        ];

                        drawPicker(pp[0], pp[1]);
                    }
                };
                this.importColor = function()
                {
                    if (!valueElement)
                    {
                        this.exportColor();
                    }
                    else
                    {
                        if (!this.adjust)
                        {
                            if (!this.fromString(valueElement.value, leaveValue))
                            {
                                styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                                styleElement.style.color = styleElement.jscStyle.color;
                                this.exportColor(leaveValue | leaveStyle);
                            }
                        }
                        else if (!this.required && /^\s*$/.test(valueElement.value))
                        {
                            valueElement.value = "";
                            styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
                            styleElement.style.color = styleElement.jscStyle.color;
                            this.exportColor(leaveValue | leaveStyle);

                        }
                        else if (!this.fromString(valueElement.value))
                            this.exportColor();
                    }
                };
                this.exportColor = function(flags)
                {
                    if (!(flags & leaveValue) && valueElement)
                    {
                        var value = this.toString();

                        if (value[0] === "#")
                            value = value.substr(1);

                        valueElement.value = value;
                    }

                    if (!(flags & leaveStyle) && styleElement)
                    {
                        styleElement.style.backgroundColor = "#"+this.toString();
                        styleElement.style.color =
                            0.213 * this.rgb[0] +
                            0.715 * this.rgb[1] +
                            0.072 * this.rgb[2]
                            < 0.5 ? "#FFF": "#000";
                    }

                    if (!(flags & leavePad) && isPickerOwner())
                        redrawPad();

                    if (!(flags & leaveSld) && isPickerOwner())
                        redrawSld();
                };
                this.fromHSV = function(h, s, v, flags)
                {
                    h<0 && (h=0) || h>6 && (h=6);
                    s<0 && (s=0) || s>1 && (s=1);
                    v<0 && (v=0) || v>1 && (v=1);

                    this.rgb = HSV_RGB(
                        h===null ? this.hsv[0]: (this.hsv[0]=h),
                        s===null ? this.hsv[1]: (this.hsv[1]=s),
                        v===null ? this.hsv[2]: (this.hsv[2]=v)
                    );

                    this.exportColor(flags);
                };
                this.fromRGB = function(r, g, b, flags)
                {
                    r<0 && (r=0) || r>1 && (r=1);
                    g<0 && (g=0) || g>1 && (g=1);
                    b<0 && (b=0) || b>1 && (b=1);

                    var hsv = RGB_HSV(
                        r===null ? this.rgb[0]: (this.rgb[0]=r),
                        g===null ? this.rgb[1]: (this.rgb[1]=g),
                        b===null ? this.rgb[2]: (this.rgb[2]=b)
                    );

                    if(hsv[0] !== null)
                        this.hsv[0] = hsv[0];

                    if(hsv[2] !== 0)
                        this.hsv[1] = hsv[1];

                    this.hsv[2] = hsv[2];
                    this.exportColor(flags);
                };
                this.fromString = function(hex, flags)
                {
                    var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);

                    if (!m) return false;
                    else
                    {
                        if (m[1].length === 6)
                            this.fromRGB(
                                parseInt(m[1].substr(0,2),16) / 255,
                                parseInt(m[1].substr(2,2),16) / 255,
                                parseInt(m[1].substr(4,2),16) / 255,
                                flags);
                        else
                            this.fromRGB(
                                parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
                                parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
                                parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
                                flags);

                        return true;
                    }
                };
                this.toString = function()
                {
                    return (
                        (0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
                        (0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
                        (0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
                    );
                };

                function RGB_HSV(r, g, b)
				{
                    var n = Math.min(Math.min(r,g),b);
                    var v = Math.max(Math.max(r,g),b);
                    var m = v - n;
                    if (m === 0) { return [ null, 0, v ]; }
                    var h = r===n ? 3+(b-g)/m: (g===n ? 5+(r-b)/m: 1+(g-r)/m);
                    return [ h===6?0:h, m/v, v ];
                }

                function HSV_RGB(h, s, v)
				{
                    if (h === null) { return [ v, v, v ]; }
                    var i = Math.floor(h);
                    var f = i%2 ? h-i: 1-(h-i);
                    var m = v * (1 - s);
                    var n = v * (1 - s*f);
                    switch(i) {
                        case 6:
                        case 0: return [v,n,m];
                        case 1: return [n,v,m];
                        case 2: return [m,v,n];
                        case 3: return [m,n,v];
                        case 4: return [n,m,v];
                        case 5: return [v,m,n];
                    }
                }

                function removePicker()
				{
                    delete $SS.jscolor.picker.owner;
                    window.removeEventListener("resize", removePicker, false);
                    target.blur();
                    document.getElementsByTagName("body")[0].removeChild($SS.jscolor.picker.boxB);
                }

                function drawPicker(x, y)
				{
                    if (!$SS.jscolor.picker)
                    {
                        $SS.jscolor.picker =
                        {
                            box: document.createElement("div"),
                            boxB: document.createElement("div"),
                            pad: document.createElement("div"),
                            padB: document.createElement("div"),
                            padM: document.createElement("div"),
                            sld: document.createElement("div"),
                            sldB: document.createElement("div"),
                            sldM: document.createElement("div"),
                        };

                        for(var i=0,segSize=4; i<$SS.jscolor.images.sld[1]; i+=segSize)
                        {
                            var seg = document.createElement("div");
                            seg.style.height = segSize+"px";
                            seg.style.fontSize = "1px";
                            seg.style.lineHeight = "0";
                            $SS.jscolor.picker.sld.appendChild(seg);
                        }

                        $SS.jscolor.picker.sldB.appendChild($SS.jscolor.picker.sld);
                        $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.sldB);
                        $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.sldM);
                        $SS.jscolor.picker.padB.appendChild($SS.jscolor.picker.pad);
                        $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.padB);
                        $SS.jscolor.picker.box.appendChild($SS.jscolor.picker.padM);
                        $SS.jscolor.picker.boxB.appendChild($SS.jscolor.picker.box);
                    }

                    var p = $SS.jscolor.picker;

                    // controls interaction
                    window.addEventListener("resize", removePicker, false);
                    p.box.onmouseup = p.box.onmouseout = function() { target.focus(); };
                    p.box.onmousedown = function() { abortBlur=true; };
                    p.box.onmousemove = function(e)
                    {
                        if (holdPad || holdSld)
                        {
                            holdPad && setPad(e);
                            holdSld && setSld(e);

                            if (document.selection)
                                document.selection.empty();
                            else if (window.getSelection)
                                window.getSelection().removeAllRanges();

                            dispatchImmediateChange();
                        }
                    };
                    p.padM.onmouseup =
                    p.padM.onmouseout = function() { if (holdPad) { holdPad=false; $(valueElement).fire("change"); } };
                    p.padM.onmousedown = function(e)
                    {
                        holdPad=true;
                        setPad(e);
                        dispatchImmediateChange();
                    };
                    p.sldM.onmouseup =
                    p.sldM.onmouseout = function() { if (holdSld) { holdSld=false; $(valueElement).fire("change"); } };
                    p.sldM.onmousedown = function(e)
                    {
                        holdSld=true;
                        setSld(e);
                        dispatchImmediateChange();
                    };

                    // picker
                    var dims = getPickerDims(THIS);
                    p.box.style.width = dims[0] + "px";
                    p.box.style.height = dims[1] + "px";

                    /** MOVE TO CSS **/
                    // picker border
                    p.boxB.style.position = "fixed";
                    p.boxB.style.clear = "both";
                    p.boxB.style.left = x+"px";
                    p.boxB.style.top = y+"px";
                    p.boxB.style.zIndex = THIS.pickerZIndex;
                    p.boxB.style.border = THIS.pickerBorder+"px solid";
                    p.boxB.style.borderColor = THIS.pickerBorderColor;
                    p.boxB.style.background = THIS.pickerFaceColor;

                    // pad image
                    p.pad.style.width = $SS.jscolor.images.pad[0]+"px";
                    p.pad.style.height = $SS.jscolor.images.pad[1]+"px";

                    // pad border
                    p.padB.style.position = "absolute";
                    p.padB.style.left = THIS.pickerFace+"px";
                    p.padB.style.top = THIS.pickerFace+"px";
                    p.padB.style.border = THIS.pickerInset+"px solid";
                    p.padB.style.borderColor = THIS.pickerInsetColor;

                    // pad mouse area
                    p.padM.style.position = "absolute";
                    p.padM.style.left = "0";
                    p.padM.style.top = "0";
                    p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + $SS.jscolor.images.pad[0] + $SS.jscolor.images.arrow[0] + "px";
                    p.padM.style.height = p.box.style.height;
                    p.padM.style.cursor = "crosshair";

                    // slider image
                    p.sld.style.overflow = "hidden";
                    p.sld.style.width = $SS.jscolor.images.sld[0]+"px";
                    p.sld.style.height = $SS.jscolor.images.sld[1]+"px";

                    // slider border
                    p.sldB.style.display = THIS.slider ? "block" : "none";
                    p.sldB.style.position = "absolute";
                    p.sldB.style.right = THIS.pickerFace+"px";
                    p.sldB.style.top = THIS.pickerFace+"px";
                    p.sldB.style.border = THIS.pickerInset+"px solid";
                    p.sldB.style.borderColor = THIS.pickerInsetColor;

                    // slider mouse area
                    p.sldM.style.display = THIS.slider ? "block" : "none";
                    p.sldM.style.position = "absolute";
                    p.sldM.style.right = "0";
                    p.sldM.style.top = "0";
                    p.sldM.style.width = $SS.jscolor.images.sld[0] + $SS.jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + "px";
                    p.sldM.style.height = p.box.style.height;
                    try {
                        p.sldM.style.cursor = "pointer";
                    } catch(eOldIE) {
                        p.sldM.style.cursor = "hand";
                    }

                    // load images in optimal order
                    p.padM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=')";
                    p.padM.style.backgroundRepeat = "no-repeat";
                    p.sldM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7')";
                    p.sldM.style.backgroundRepeat = "no-repeat";
                    p.pad.style.backgroundImage = "url('data:image/jpeg;base64,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')";
                    p.pad.style.backgroundRepeat = "no-repeat";
                    p.pad.style.backgroundPosition = "0 0";
                    /** UNTIL HERE **/

                    // place pointers
                    redrawPad();
                    redrawSld();

                    $SS.jscolor.picker.owner = THIS;
                    document.getElementsByTagName("body")[0].appendChild(p.boxB);
                }

                function getPickerDims(o)
				{
                    var dims =
                    [
                        2*o.pickerInset + 2*o.pickerFace + $SS.jscolor.images.pad[0] +
                            (o.slider ? 2*o.pickerInset + 2*$SS.jscolor.images.arrow[0] + $SS.jscolor.images.sld[0]: 0),
                            2*o.pickerInset + 2*o.pickerFace + $SS.jscolor.images.pad[1]
                    ];

                    return dims;
                }

                function redrawPad()
				{
                    // redraw the pad pointer
                    var yComponent = 1;
                    var x = Math.round((THIS.hsv[0]/6) * ($SS.jscolor.images.pad[0]-1));
                    var y = Math.round((1-THIS.hsv[yComponent]) * ($SS.jscolor.images.pad[1]-1));
                    $SS.jscolor.picker.padM.style.backgroundPosition =
                        (THIS.pickerFace+THIS.pickerInset+x - Math.floor($SS.jscolor.images.cross[0]/2)) + "px " +
                        (THIS.pickerFace+THIS.pickerInset+y - Math.floor($SS.jscolor.images.cross[1]/2)) + "px";

                    // redraw the slider image
                    var seg = $SS.jscolor.picker.sld.childNodes;

                    var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
                    for(var i=0; i<seg.length; i+=1)
                        seg[i].style.backgroundColor = "rgb("+
                            (rgb[0]*(1-i/seg.length)*100)+"%,"+
                            (rgb[1]*(1-i/seg.length)*100)+"%,"+
                            (rgb[2]*(1-i/seg.length)*100)+"%)";
                }

                function redrawSld()
				{
                    // redraw the slider pointer
                    var yComponent = 2;
                    var y = Math.round((1-THIS.hsv[yComponent]) * ($SS.jscolor.images.sld[1]-1));
                    $SS.jscolor.picker.sldM.style.backgroundPosition =
                        "0 " + (THIS.pickerFace+THIS.pickerInset+y - Math.floor($SS.jscolor.images.arrow[1]/2)) + "px";
                }

                function isPickerOwner()
				{
                    return $SS.jscolor.picker && $SS.jscolor.picker.owner === THIS;
                }

                function blurTarget()
				{
                    if (valueElement === target)
                        THIS.importColor();

                    THIS.hidePicker();
                }

                function blurValue()
				{
                    if (valueElement !== target)
                        THIS.importColor();
                }

                function setPad(e)
				{
                    var mpos = $SS.jscolor.getRelMousePos(e);
                    var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
                    var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
                    THIS.fromHSV(x*(6/($SS.jscolor.images.pad[0]-1)), 1 - y/($SS.jscolor.images.pad[1]-1), null, leaveSld);
                }

                function setSld(e)
				{
                    var mpos = $SS.jscolor.getRelMousePos(e);
                    var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
                    THIS.fromHSV(null, null, 1 - y/($SS.jscolor.images.sld[1]-1), leavePad);
                }

                function dispatchImmediateChange()
				{
                    if (THIS.onImmediateChange)
                        if (typeof THIS.onImmediateChange === "string")
                            eval(THIS.onImmediateChange);
                        else
                            THIS.onImmediateChange(THIS);
                }

                var THIS = this;
                var abortBlur = false;
                var valueElement = this.valueElement,
                    styleElement = this.styleElement;
                var holdPad = false,
                    holdSld = false;
                var leaveValue = 1<<0,
                    leaveStyle = 1<<1,
                    leavePad = 1<<2,
                    leaveSld = 1<<3;

                // target
                $(target).bind("focus", THIS.showPicker)
                         .bind("blur", function()
                {
                    if (!abortBlur)
                        window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
                    else
                        abortBlur = false;
                });

                // valueElement
                if (valueElement) {
                    var updateField = function() {
                        THIS.fromString(valueElement.value, leaveValue);
                        dispatchImmediateChange();
                    };
                    $(valueElement).bind("keyup", updateField)
                                   .bind("input", updateField)
                                   .bind("blur", blurValue)
                                   .attr("autocomplete", "off");
                }

                // styleElement
                if (styleElement) {
                    styleElement.jscStyle =
                    {
                        backgroundColor: styleElement.style.backgroundColor,
                        color: styleElement.style.color
                    };
                }

                this.importColor();
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
            this.get = function()
            {
                if (!this.img) return "none ";

                var ret = "url('";
                if ($SS.validBase64(this.img))
                    ret += "data:image/" + $SS.typeofBase64(this.img) + ";base64," + this.img;
                else
                    ret += this.img;

                return ret + "')" + (this.RPA != undefined ? " " + this.RPA : "");
            };
        },
        Mascot: function(index)
        {
            if (index == -1) // no mascot
            {
                this.img    = new $SS.Image(null);
                this.hidden = true;
                return;
            }
            else
                var mascot = $SS.conf["Mascots"][index];

            this.index    = index;
            this.default  = mascot.default;
            this.position = mascot.position || "bottom";
            this.overflow = mascot.overflow;
            this.img      = new $SS.Image(mascot.img, this.overflow ? "" : "no-repeat " + this.position + " center");
            this.small    = mascot.small;
            this.flip     = mascot.flip == undefined ? true : mascot.flip;
            this.bOffset  = typeof mascot.offset === "number";
            this.offset   = this.bOffset && !this.overflow ? mascot.offset : ($SS.conf["Post Form"] !== 1 ? 263 : 22);
            this.boards   = mascot.boards;
            this.enabled  = $SS.conf["Selected Mascots"] === 0 || $SS.conf["Selected Mascots"].indexOf(index) !== -1;

            this.preview  = function()
            {
                var dText = this.default ? "Hide" : "Delete",
                    div   = $("<div id=mascot" + this.index + (this.enabled ? " class=selected" : "") + " style=\"background:" + this.img.get() + "\">")
                           .html("<a title=" + dText + ">X</a><a title=Edit>E</a>");

                $(div).bind("click", function(){ $(this).toggleClass("selected"); });

                $("a[title=" + dText + "]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.deleteMascot(index);
                });
                $("a[title=Edit]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.showMascot(index);
                });

                return div;
            }
        },
        Theme: function(index)
        {
            var theme;

            if ((theme = $SS.conf["Themes"][index]) == undefined)
            {
                this.hidden = true;
                return;
            }

            this.index       = index;
            this.name        = theme.name;
            this.author      = theme.author || "ahodesuka";
            this.default     = theme.default;
            this.replyBrder  = theme.replyBrder;
            this.bgImg       = new $SS.Image(theme.bgImg, theme.bgRPA);
            this.bgColor     = new $SS.Color(theme.bgColor);
            this.mainColor   = new $SS.Color(theme.mainColor);
            this.brderColor  = new $SS.Color(theme.brderColor);
            this.inputColor  = new $SS.Color(theme.inputColor, true);
            this.inputbColor = new $SS.Color(theme.inputbColor);
            this.blinkColor  = new $SS.Color(theme.blinkColor);
            this.jlinkColor  = new $SS.Color(theme.jlinkColor);
            this.linkColor   = new $SS.Color(theme.linkColor);
            this.linkHColor  = new $SS.Color(theme.linkHColor);
            this.nameColor   = new $SS.Color(theme.nameColor);
            this.quoteColor  = new $SS.Color(theme.quoteColor);
            this.sageColor   = new $SS.Color(theme.sageColor);
            this.textColor   = new $SS.Color(theme.textColor);
            this.titleColor  = new $SS.Color(theme.titleColor);
            this.tripColor   = new $SS.Color(theme.tripColor);
            this.checkMark   = new $SS.Image(inputImages, "no-repeat center " + (this.inputColor.isLight ? 0 : -8) + "px");
            this.radioCheck  = new $SS.Image(inputImages, "no-repeat center " + (this.inputColor.isLight ? -16 : -24) + "px");
            this.icons       = new $SS.Image(theme.icons || defaultIcons);

            if (theme.customCSS)
            {
                if (theme.customCSS.substr(0, 10) === "new String")
                    try
                    {
                        this.customCSS = eval($SS.trimLineBreaks(theme.customCSS));
                    }
                    catch (e)
                    {
                        alert("Error evaluating theme.customCSS!\n" + e.message);
                        this.customCSS = theme.customCSS;
                    }
                else
                    this.customCSS = theme.customCSS;
            }
            else
                this.customCSS = "";

            this.preview = function()
            {
                var dText = this.default ? "Hide" : "Delete",
                    div   = $("<div id=theme" + this.index + ($SS.conf["Selected Theme"] == this.index ? " class=selected>" : ">")).html("<div class=reply\
                        style='background-color:" + this.mainColor.hex + "!important;border:1px solid " + this.brderColor.hex + "!important;color:" + this.textColor.hex + "!important'>\
                        <div class=riceCheck style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;box-shadow:rgba(" + this.mainColor.shiftRGB(64) + ",.3) 0 1px;'></div>\
                        <span style='color:" + this.titleColor.hex + "!important'>" + this.name + "</span> \
                        <span style='color:" + this.nameColor.hex + "!important'>" + this.author + "</span>\
                        <span style='color:" + this.sageColor.hex + "!important'> (SAGE)</span>\
                        <span style='color:" + this.tripColor.hex + "!important'>!.pC/AHOKAg</span>\
                        <time> 20XX.01.01 12:00 </time>\
                        <a href='javascript:;' style='color:" + this.linkColor.hex + "!important' \
                        onmouseover='this.setAttribute(\"style\",\"color:" + this.linkHColor.hex + "!important\")' \
                        onmouseout='this.setAttribute(\"style\",\"color:" + this.linkColor.hex + "!important\")'>No.22772469</a>\
                        <br><blockquote>Post content is right here.</blockquote>\
                        <p><a title=Edit style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>Edit</a>\
                        <a title=" + dText + " style='background-color:" + this.inputColor.hex + "!important;border:1px solid " + this.inputbColor.hex + "!important;color:" + this.textColor.hex + "!important'>" + dText + "</a></p>\
                        <h3>SELECTED</h3>\
                    </div>");

                $(div).bind("click", function()
                {
                    var $this = $(this);

                    if ($this.hasClass("selected")) return;

                    $this.parent().children(".selected").removeClass("selected");
                    $this.addClass("selected");
                });

                $("a[title=Edit]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.showTheme(index);
                });
                $("a[title=" + dText + "]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.deleteTheme(index);
                });

                return div;
            }
        },

        /* HELPER METHODS */
        formatFont: function(font)
        {
            if (font === "sans-serif" || font === "monospace")
                return font;

            return "'" + font + "'";
        },
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
        trimLineBreaks: function(str)
        {
            return str.replace(/(\r\n|\r|\n)/gm, "");
        },
        cleanBase64: function(b64)
        {
            return b64.replace(/^(data:image\/(?:gif|jpe?g|png);base64,)(\r\n|\r|\n)?/gmi, "");
        },
        typeofBase64: function(b64)
        {
            switch (b64.substr(0, 8))
            {
                case "PD94bWwg":
                    return "svg+xml";
                case "R0lGODlh":
                    return "gif";
                case "/9j/4AAQ":
                case "/9j/4QAY":
                    return "jpeg";
                case "iVBORw0K":
                default:
                    return "png";
            }
        },
        validBase64: function(b64)
        {
            return /^(?:data:image\/(?:gif|jpe?g|png);base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/i.test(b64);
        },
        validImageURL: function(img)
        {
            return /^https?:\/\/.+$/i.test(img);
        },
        getLocation: function(url)
        {
            var obj;

            if (typeof url === "string")
            {
                obj = document.createElement("a");
                obj.href = location.protocol + "//" + url;
            }
            else
                obj = window.location;

            var pathname = obj.pathname.substr(1).split("/");

            return {
                sub  : obj.hostname.split(".")[0],
                board: pathname[0],
                reply: pathname[1] === "res"
            };
        },
        buildCustomNav: function()
        {
            var links = $SS.conf["Nav Links"],
                a = [], div;

            for (var i = 0, MAX = links.length; i < MAX; i++)
                a.push("<a href='" + window.location.protocol + "//" + links[i].link + "'" +
                    ($SS.location.board == $SS.getLocation(links[i].link).board ? " class=selectedBoard" : "") + ">" + links[i].text + "</a>");

            if ((div = $("#boardLinks")).exists())
                return div.html(a.join($SS.conf["Nav Link Delimiter"]));

            if ((div = $("#pagesDrop")).exists())
                return div.after($("<div id=boardLinks>").html(a.join($SS.conf["Nav Link Delimiter"])));

            return $("#boardNavDesktop").prepend($("<div id=boardLinks>").html(a.join($SS.conf["Nav Link Delimiter"])));
        },
        buildPagesDropdown: function()
        {
            if ($("#pagesDrop").exists()) return;

            var pages  = $(".pagelist .pages>*"),
                cpage  = $(".pagelist .pages>strong").text(),
                select = $("<select id=pagesDrop>");

            if (pages.length() == 0) return;

            pages.each(function() { select.append($("<option value=" + this.textContent +
                (cpage == this.textContent ? " selected=true" : "") + ">Page " + this.textContent)); });
            select.bind("change", function(){ location.href = location.href.replace(/(\.org\/[^\/]+)\/?.*$/, "$1/" + this.value); });

            return $("#boardNavDesktop").prepend(select);
        }
    };
    /* END STYLE SCRIPT CLASSES */

    $SS.init();
})();
