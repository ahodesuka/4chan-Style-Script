// ==UserScript==
// @name          4chan Dark Flat
// @author        ahoka
// @version       1.0
// @run-at        document-start
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// @exclude       http://images.4chan.org/*
// @exclude       https://images.4chan.org/*
// @updateURL     https://github.com/ahoka-/4chan-Dark-Flat/raw/master/4chan-Dark-Flat.user.js
// ==/UserScript==
(function(){
    var config = {
        'Show Announcements': true,
        'Show Logo': true,
        'Auto noko': true,
        'Pages in nav': false,
        'Custom nav links': true,
        'Font': "Calibri",
        'Font Size': 12,
        'Theme': "Random",
        'Custom Theme': JSON.stringify({ name: "Custom", bg: "", linkColor: "" }),
        '_4chlinks':
'<a href="http://boards.4chan.org/a/">anime &amp; manga</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/c/">anime/cute</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/g/">technology</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/v/">video games</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/jp/">japan</a>'
    };
    
    // @copyright      2009, 2010 James Campos
    // @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
    if (typeof GM_deleteValue === "undefined")
    {
        GM_addStyle = function(css)
        {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        GM_deleteValue = function(name)
        {
            localStorage.removeItem(name);
        }

        GM_getValue = function(name, defaultValue)
        {
            var value = localStorage.getItem(name);
            if (!value)
                return defaultValue;
                
            var type = value[0];
            value = value.substring(1);
            
            switch (type)
            {
                case 'b':
                    return value == 'true';
                case 'n':
                    return Number(value);
                default:
                    return value;
            }
        }

        GM_setValue = function(name, value)
        {
            value = (typeof value)[0] + value;
            localStorage.setItem(name, value);
        }
    }
    /* END LICENSE */
    
    var getValue = function(name)
    {        
        return GM_getValue(name, config[name]);
    };
    
    var __hasProp = Object.prototype.hasOwnProperty;
    var postTabText = (window.location.href.match(/.*\/res\/.*/i)) ? "NEW REPLY" : "NEW THREAD";
    var bgPattern = "R0lGODlhAwADAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///ywAAAAAAwADAAAICQA5cMgwsCCHgAA7",
        checkMark = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABwSURBVHjalI+rDYBAEEQfSCwnETiqwtEIBdAHjgIoAIE4hUBBDeT8YC5swkcw6+ZlsjOJeFfKl8QtUzEIPYBjIRioo50zIXYDgR7I8AixGjgQHSNCeEoDLYo3kUcvPm8QYsZdTa9WLRuFTUh+Lz8HABdVPTT1adyuAAAAAElFTkSuQmCC";
        
    var themes = [];
    themes[0] = { name: "Erio", bg: "http://img88.imageshack.us/img88/2449/eriobg.png", linkColor: "#6cb2ee" };
    themes[1] = { name: "Fate", bg: "http://img848.imageshack.us/img848/3976/fatebg.png", linkColor: "#e1d550" };
    themes[2] = { name: "Kurimu", bg: "http://img823.imageshack.us/img823/9940/kurimubg.png", linkColor: "#ce717d" };
    themes[3] = { name: "ほむほむ", bg: "http://img217.imageshack.us/img217/2928/homubg.png", linkColor: "#886999" };
    themes[4] = { name: "Horo", bg: "http://img525.imageshack.us/img525/9757/horobg.png", linkColor: "#a46e41" };
    themes[5] = { name: "Marisa", bg: "http://img252.imageshack.us/img252/8995/marisabg.png", linkColor: "#e1cb9c" };
    themes[6] = { name: "Shana", bg: "http://img821.imageshack.us/img821/1281/shanabg.png", linkColor: "#ef4353" };
    themes[7] = { name: "Shiki", bg: "http://img94.imageshack.us/img94/629/shikibg.png", linkColor: "#aaa" };
    themes[8] = { name: "Tessa", bg: "http://img834.imageshack.us/img834/1904/tessabg.png", linkColor: "#857d92" };
    themes[9] = { name: "Yin", bg: "http://img16.imageshack.us/img16/3190/yinbg.png", linkColor: "#d1dfef" };
    themes[10] = JSON.parse(getValue("Custom Theme"));
    themes[11] = { name: "Random" };
    
    var uTheme = getValue("Theme"), ctClear = false;
    
    var fonts = new Array('Ubuntu', 'Droid Sans', 'Terminus', 'Segoe UI', 'Calibri', 'Lucida Grande', 'Helvetica');
    var fontSizes = [];
    fontSizes[0] = { name: "Small", size: 11 };
    fontSizes[1] = { name: "Normal", size: 12 };
    fontSizes[2] = { name: "Large", size: 14 };
    fontSizes[3] = { name: "Larger", size: 16 };
    
    /* Thanks to aeosynth */
    /* LICENSE
     *
     * Copyright (c) 2009-2011 James Campos <james.r.campos@gmail.com>
     *
     * Permission is hereby granted, free of charge, to any person
     * obtaining a copy of this software and associated documentation
     * files (the "Software"), to deal in the Software without
     * restriction, including without limitation the rights to use,
     * copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following
     * conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     */
    function addStyle()
    {
        document.removeEventListener('DOMNodeInserted', addStyle, false);
        var node = document.childNodes[0];
        
        if (!node) // firefox
        {
            document.addEventListener('DOMNodeInserted', addStyle, false);
            return;
        }
            
        var style = document.createElement('style');
        style.textContent = css;
        node.appendChild(style);
    }
    var $ = function(selector, root)
    {
        root = root || document.body;
        return root.querySelector(selector);
    };
    var $$ = function(selector, root)
    {
        var _a, _b, _c, _d, node, result;
        
        root = root || document.body;
        result = root.querySelectorAll(selector);
        _a = []; _c = result;
        
        for (_b = 0, _d = _c.length; _b < _d; _b++)
        {
            node = _c[_b];
            _a.push(node);
        }
        
        return _a;
    };
    var inBefore = function(root, el)
    {
        return root.parentNode.insertBefore(el, root);
    };
    var tag = function(el)
    {
        return document.createElement(el);
    };
    var remove = function(el)
    {
        return el.parentNode.removeChild(el);
    };
    /* END LICENSE */
    
    /* OPTIONS */
    var options = function()
    {
        var _c, _d, checked, div, hiddenNum, option;
        if ((div = $('#themeoptions')))
            return remove(div);
        else
        {
            div = tag('div');
            div.id = 'themeoptions';
            div.className = 'reply';
            var html = '<div class="move">Theme Options</div><div>';
            _d = config;
            for (option in _d)
            {
                if (!__hasProp.call(_d, option)) continue;
                _c = _d[option];
                checked = getValue(option) ? "checked" : "";
                
                if (option == 'Custom Theme')
                    continue;
                else if (option == 'Theme')
                {
                    html += '<label><span>' + option + '</span><select name="Theme">';
                    
                    for (var i = 0, MAX = themes.length; i < MAX; i++)
                    {
                        if (themes[i].name == "Custom")
                            html += '<option disabled="disabled">---</option>';
                        
                         html += '<option value="' + themes[i].name + '"' + (themes[i].name == getValue(option) ? ' selected="selected"' : '') +'>' + themes[i].name + '</option>';
                    }
                    
                    html += '</select></label>\
                    <div id="customTheme"' + (uTheme != "Custom" ? ' class="hidden"' : '') + '><label><span>BG URL</span>\
                    <input type="text" name="customBG" value="' + themes[themes.length-2].bg + '" /></label>\
                    <label><span title="i.e. #FF6999">Link Color (Hex.)</span>\
                    <input type="text" name="customLColor" value="' + themes[themes.length-2].linkColor + '" /></label>\
                    <input type="button" name="clearCustom" value="Clear Custom Theme" /></div>';
                }
                else if (option == 'Font')
                {
                    html += '<label><span>' + option + '</span><select name="Font">';
                    
                    for (var i = 0, MAX = fonts.length; i < MAX; i++)
                         html += '<option value="' + fonts[i] + '"' + (fonts[i] == getValue(option) ? ' selected="selected"' : '') +'>' + fonts[i] + '</option>';
                    
                    html += '</select></label>';
                }
                else if (option == 'Font Size')
                {
                    html += '<label><span>' + option + '</span><select name="Font Size">';
                    
                    for (var i = 0, MAX = fontSizes.length; i < MAX; i++)
                         html += '<option value="' + fontSizes[i].size + '"' + (fontSizes[i].size == getValue(option) ? ' selected="selected"' : '') +'>' + fontSizes[i].name + '</option>';
                    
                    html += '</select></label>';
                }
                else if (option != '_4chlinks')
                    html += "<label><span>" + option + "</span><input " + checked + ' name="' + option + '" type="checkbox"></label>';
                else
                    html += '<textarea name="_4chlinks">' + getValue('_4chlinks') + "</textarea>";
            }
            
            html += '<div style="float:right;"><a name="save">save</a> <a name="cancel">cancel</a></div></div>';
            div.innerHTML = html;
            $('select[name="Theme"]', div).addEventListener('change', toggleCustom, true);
            $('input[name="clearCustom"]', div).addEventListener('click', clearCustom, true);
            $('a[name="save"]', div).addEventListener('click', optionsSave, true);
            $('a[name="cancel"]',div).addEventListener('click', close, true);
            
            return document.body.appendChild(div);
        }
    };
    var optionsSave = function()
    {
        var _4chlinks, _c, _d, _e, div, input, inputs;
        div = this.parentNode.parentNode;
        _d = $$('input, select', div);
        
        for (_c = 0, MAX = _d.length; _c < MAX; _c++)
        {
            input = _d[_c];
            if (input.type == "select-one")
            {
                if (input.name == "Theme")
                {
                    if (ctClear)
                    {
                        GM_setValue("Custom Theme", JSON.stringify({ name: "Custom", bg: "", linkColor: "" }));
                        GM_setValue(input.name, input.value);
                    }
                    else if (input.value == "Custom")
                    {
                        var cBG = $("input[name='customBG']").value;
                        var cLColor = $("input[name='customLColor']").value;
                        
                        if (!cBG.match(/^http:\/\/.+$/i))
                        {
                            alert("Invalid bg image URL.");
                            return;
                        }
                        else if (!cLColor.match(/^#[A-Fa-f0-9]{3,6}$/))
                        {
                            alert("Invalid link color! Hexadecimal values only.");
                            return;
                        }
                        
                        GM_setValue("Custom Theme", JSON.stringify({ name: "Custom", bg: cBG, linkColor: cLColor }));
                        GM_setValue(input.name, input.value);
                    }
                    else
                        GM_setValue(input.name, input.value);
                }
                else
                    GM_setValue(input.name, input.value);
            }
            else if (input.type == "checkbox")
                GM_setValue(input.name, input.checked);
        }
        
        _4chlinks = $('textarea[name="_4chlinks"]');
        GM_setValue("_4chlinks", _4chlinks.value);
        
        return setTimeout('window.location.reload(true);', 1);
    };
    var close = function()
    {
        var div;
        div = this.parentNode.parentNode.parentNode;
        return remove(div);
    };
    
    
    function toggleCustom()
    {
        var sVal = $('select[name="Theme"]').value;
        var cTheme = $("#customTheme");
        
        if (sVal == "Custom" && cTheme.className == "hidden")
            cTheme.className = "";
        else
            cTheme.className = "hidden";
    }
    
    function clearCustom()
    {
        $('select[name="Theme"]').value = "Random";
        $("input[name='customBG']").value = "";
        $("input[name='customLColor']").value = "";
        
        ctClear = true;        
        toggleCustom();
    }
    /* END OPTIONS */
    
    var bg, linkColor;
    if (uTheme == "Random")
    {
        var i = Math.round(Math.random() * (themes.length - 3));
        bg = themes[i].bg;
        linkColor = themes[i].linkColor;
    }
    else
    {
        for (var i = 0, MAX = themes.length; i < MAX; i++)
            if (uTheme == themes[i].name)
            {
                bg = themes[i].bg;
                linkColor = themes[i].linkColor;
                break;
            }
    }
    
    /* STYLING */
    var css =
    "body,*{font-family:" + getValue("Font") + ",Calibri,Helvetica,sans-serif!important;font-size:" + getValue("Font Size") + "px!important}\
    .deletebuttons::after,input[type=submit],#thread_filter>div:first-child>span,#imgControls label,form[name=post] #com_submit+label,#qr input[name=upfile]+a,\
    #qr #captchas,#qr #attach,#qr #close,form[name=post] input[name=email]+label,#watcher .move,#themeoptions .move,.deletebuttons::before,.postarea form[name=post]::before,#qr .move::before,\
    .container::before,.container *,.logo font[size='1'],.pages *,#navlinks,#navlinks a{font-family:Calibri,Helvetica,sans-serif!important}\
    *:focus{outline:none}\
    ::selection{background:" + linkColor + ";color:#fff}\
    ::-moz-selection{background:" + linkColor + ";color:#fff}\
    img{border:none!important}\
    hr{border:none!important;clear:left;height:0}\
    a{text-decoration:none!important;color:" + linkColor + "!important;font-weight:normal!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    a:hover{color:#eee!important}\
    a:not([href]){color:#fff!important}\
    .postertrip{color:#a7dce7!important}\
    body{color:#fff!important;background:url(data:image/png;base64," + bgPattern + ") #202020!important;border-right:1px solid #161616;margin:0 315px 40px 5px!important;padding:0!important}\
    body::after{background:url(" + bg + ") no-repeat center bottom rgba(22,22,22,.8);content:'';height:100%;width:313px;\
    border-left:2px solid rgba(40,40,40,.9);position:fixed;right:0;bottom:18px;z-index:-1}\
    textarea,input:not([type=submit]),select{font:" + (getValue("Font Size") > 11 ? 12 : 11) + "px " + getValue("Font") + ",Calibri,Helvetica,sans-serif!important}\
    div.thread{background:rgba(40,40,40,.3);margin:0 0 1px;padding:1px 0 1px 1px;position:relative;border-radius:3px 0 0 3px;-moz-border-radius:3px 0 0 3px}\
    div.thread::after{clear:left;content:' ';display:block}\
    div.op{border:none!important}\
    div.op>a:not([href]){margin-left:2px}\
    span.plus{color:#fff!important}\
    form[name=delform]{margin:19px 0 0}\
    form[name=delform] table{border-spacing:0;margin:0 0 1px;overflow:hidden;position:relative}\
    body>span[style]~form[name=delform]{margin-bottom:42px!important}\
    .reply,.replyhl{display:inline-block;position:relative!important;color:#fff!important}\
    .replyhider>a{position:absolute;right:2px;z-index:1}\
    td.replyhl a:hover,td.reply a:hover{color:#fff!important}\
    td.reply,td.replyhl,.stub{padding:2px;width:100%;background:rgba(40,40,40,0.9)!important;border-radius:3px 0 0 3px;-moz-border-radius:3px 0 0 3px}\
    td.replyhl{background:rgba(40,40,40,.3)!important;-moz-box-shadow:inset rgba(0,0,0,0.35) 0 0 15px;box-shadow:inset rgba(0,0,0,0.35) 0 0 15px}\
    .stub{margin:0 0 1px;padding:2px 0 2px 1px}\
    .stub>a,.stub>.block>a{display:block}\
    .container{position:absolute;bottom:2px;right:2px;z-index:1}\
    .container *{font-size:11px!important}\
    .container::before{color:#666;content:'REPLIES:';padding-right:3px}\
    .qphl{border-left:3px solid " + linkColor + "!important;outline:none!important}\
    #qp{background:rgba(36,36,36,.9)!important;padding:5px;position:fixed!important;z-index:9!important;margin:0 10px!important;box-shadow:rgba(0,0,0,.3) 0 2px 5px;-moz-box-shadow:rgba(0,0,0,.3) 0 2px 5px;border-radius:3px;-moz-border-radius:3px}\
    .inline td.reply{background:rgba(0,0,0,.1)!important;border:1px solid rgba(255,255,255,.5);border-radius:3px;-moz-border-radius:3px;padding:5px!important}\
    a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover{color:#f66!important}\
    .commentpostername a.linkmail[href='mailto:sage']:after{font-size:10px;content:' (SAGE)'}\
    .omittedposts{margin-left:4px!important;color:#888!important;text-decoration:none!important;margin-top:-18px;display:inline-block;padding-bottom:4px}\
    .replytitle {color:#999!important}\
    .deletebuttons{background:rgba(40,40,40,0.9)!important;border-left:1px solid #161616!important;border-top:1px solid #161616!important;position:fixed;bottom:18px;right:315px;\
    height:22px;color:transparent!important;font-size:0!important;width:16px;overflow:hidden;white-space:nowrap;padding:1px 2px 0!important;z-index:2;\
    -webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}\
    .deletebuttons:hover{width:186px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}\
    .deletebuttons::before{display:inline-block;width:17px;padding:1px 1px 0 0;text-align:center;content:'X';color:#fff}\
    .deletebuttons:hover::before{overflow:hidden;white-space:nowrap;padding:0;width:0}\
    .deletebuttons::after{font-size:9px!important;color:#ccc!important;content:'FILE ONLY';position:absolute;bottom:0;right:52px;line-height:22px}\
    .deletebuttons *{visibility:visible!important}\
    .deletebuttons input[type=checkbox]{position:absolute;right:88px;bottom:3px!important;top:auto!important}\
    .deletebuttons .inputtext{width:138px}\
    .deletebuttons input:not([type=checkbox]){height:20px!important;margin:0!important}\
    .filetitle{color:#aaa!important}\
    #recaptcha_logo" + (!getValue("Show Logo") ? ",.logo" : "") + ",#recaptcha_tagline,td[align=right],td.rules,img + br,iframe,#BF_WIDGET,.bf,.yui-g,#filter-button,\
    #recaptcha_table td:nth-of-type(2),#option-button,#hd,#ft,td small,#footer,.rules,center font small,body>span[style],body>br,form[name=delform]>br[clear],\
    form[name=delform]>span[style],div.thread>br,td.postblock,.deletebuttons input[type=button],.deletebuttons br,#stats,table[width='100%'],#autohide,\
    .logo>br,body>div[style*='center'],body>center:nth-of-type(1),form[name=delform]>center,.hidden,body>span[style]~form[name=delform]>br,form[name=delform]>hr\
    {display:none!important}\
    table,td{border:none!important;color:#ccc!important}\
    .replymode{background-color:transparent!important;color:#fff!important}\
    th{background-color:#000!important;opacity:0!important}\
    tr{background-color:transparent!important;color:#fff!important}\
    tr[height='73']{height:auto!important}\
    .recaptchatable #recaptcha_image{background-color:transparent!important;margin-left:0!important;border:none!important}\
    #recaptcha_image img,#qr img[src*='recaptcha/api']{width:305px!important}\
    #recaptcha_table tr td{padding:0!important}\
    .recaptcha_input_area{padding:0!important}\
    .recaptcha_image_cell{padding-right:2px!important}\
    div{color:#fff!important}\
    .commentpostername,.postername,.commentpostername a,.postername a{color:#fff!important}\
    .commentpostername,.postername{font-weight:400!important}\
    blockquote{margin:12px 10px 18px 40px!important}\
    div.op blockquote,form[name=delform]>blockquote{margin-bottom:2em!important}\
    blockquote>.abbr{color:#fff!important}\
    div.reply{background:rgba(40,40,40,.9)!important;border:none!important;margin:0!important;z-index:2!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img{float:left;margin:0 20px 20px!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img+img{margin:0 0 20px!important}\
    img[alt='closed'],[alt='sticky']\
    {background-image:url('http://img175.imageshack.us/img175/1497/yunoiconsbf0.png')!important;background-color:transparent!important;background-repeat:no-repeat;display:inline-block;\
    height:0!important;margin:0 1px!important;padding-top:16px!important;margin-right:-3px!important;width:16px!important;margin-left:4px!important;font-size:0!important;color:transparent!important}\
    [alt='sticky']{background-position:-129px 0!important}\
    [alt='closed']{background-position:-112px -16px!important}\
    .inputtext,textarea{margin:0;padding:1px 4px;outline:none}\
    input[type=file]{width:305px;margin:0}\
    .inputtext:not(textarea){height:22px!important}\
    form[name=post] .inputtext:not(textarea),#qr>.move>.inputtext,#qr input[name=pwd]{width:305px!important}\
    form[name=post] input[type=text][name=sub]{width:254px!important;margin-right:1px!important}\
    textarea,input:not([type=checkbox]),input[type=file]>input[type=button]\
    {background:rgba(22,22,22,0.9)!important;border:none!important;border-bottom:1px solid #101010!important;border-top:1px solid #262626!important}\
    input[type=file]::-webkit-file-upload-button\
    {background:rgba(22,22,22,0.9)!important;border:none!important;border-right:1px solid #262626!important;font-size:8px!important;text-transform:uppercase!important;\
    padding:0 5px!important;width:auto!important;vertical-align:bottom;height:22px!important;color:#ddd!important;cursor:pointer;margin:0!important;\
    -webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    input[type=file]::-webkit-file-upload-button:hover{background:rgba(33,33,33,0.9)!important}\
    textarea:hover,input:not([type=file]):hover,input[type=file]>input[type=button]:hover{background:rgba(33,33,33,0.9)!important}\
    input,select{color:#fff!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}\
    input[type=submit]{width:50px;height:22px!important;color:#ddd!important;cursor:pointer;vertical-align:top;padding:0!important;font-size:9px!important;text-transform:uppercase}\
    input[type=checkbox]{position:relative;top:2px!important;margin:2px!important;vertical-align:top;border:1px solid #444!important;background:rgba(22,22,22,0.9)!important;\
    width:12px!important;height:12px!important;cursor:pointer!important;border-radius:3px!important;-moz-border-radius:3px!important}\
    input[type=checkbox]:checked{border:1px solid #1f1f1f!important;background:url(data:image/png;base64," + checkMark + ") center no-repeat rgba(180,180,180,0.6)!important;-moz-box-shadow:#eee 0 0 2px;box-shadow:#eee 0 0 2px}\
    input[type=checkbox]:active{background:rgba(255,255,255,0.6)!important}\
    td.reply input[type=checkbox],#autohide,#themeoptions input[type=checkbox],#options input[type=checkbox]{top:0!important}\
    input[name=recaptcha_response_field]{height:22px!important;padding:1px 4px!important;width:305px!important}\
    select{background:rgba(40,40,40,.9);border:1px solid #161616}\
    select:hover{background:rgba(50,50,50,1);}\
    textarea{color:#fff;margin:0!important}\
    .postarea textarea{width:305px!important;height:125px!important;resize:none}\
    .unkfunc a,.unkfunc a:hover{color:#999!important}\
    td.doubledash{padding:0;text-indent:-9999px}\
    .logo{background:rgba(40,40,40,.9);position:fixed;right:0;top:19px;text-align:center;padding:2px 6px;width:300px!important}\
    .logo img{margin:0!important;opacity:0.4;border:1px solid #161616!important}\
    .logo span{color:#eee;text-shadow:#000 0 0 10px;display:block;font-size:20px!important;text-align:center;width:300px;position:absolute;font-family:Trebuchet MS,sans-serif!important;bottom:-12px;z-index:3}\
    .logo font[size='1']{text-shadow:#000 0 0 5px;color:#ccc;position:absolute;bottom:8px;left:7px;text-align:center;width:300px}\
    .logo font[size='1']>a{padding:0 2px;text-transform:none!important}\
    div.autohide>a[title='Auto-hide dialog box']{color:#fff!important;text-decoration:underline!important}#captchas{padding:0 3px}#overlay{z-index:1000}\
    .postarea table{padding:0!important;border-spacing:0px!important;border-collapse:collapse!important}\
    .postarea,#qr{width:306px;height:347px;position:fixed!important;z-index:1!important;margin:0!important;padding:3px;right:0;bottom:-311px;top:auto!important;left:auto!important;\
    -webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;background:rgba(40,40,40,0.9);border-top:1px solid #161616!important}\
    .postarea:hover{bottom:7px;-webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out}\
    .postarea form[name=post]::before,#qr .move::before{display:block;height:18px;padding-top:1px;text-align:center;content:'" + postTabText + "'}\
    form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),#qr>div.move{font-size:0!important;color:transparent!important}\
    form[name=post] #com_submit+label{position:absolute;color:#ccc!important;top:auto;right:55px;vertical-align:bottom}\
    .postarea #com_submit+label{position:absolute;color:#ccc!important;top:auto;bottom:17px;right:8px!important;vertical-align:bottom}\
    form[name=post] input[name=email]+label{position:absolute;color:#ccc!important;top:173px;right:6px;vertical-align:bottom;z-index:1}\
    .filesize{margin-left:4px!important}\
    .filesize span{font-size:0!important;visibility:hidden}\
    .filesize span::after{content:attr(title);font-size:12px;visibility:visible}\
    .postarea input[type=password]{width:150px}\
    #imageType,input:not([type=checkbox]),input:not([type=radio]),input[type=file]>input[type=button],input[type=submit],select,textarea\
    {-webkit-appearance:none;-o-appearance:none;}\
    #options label,#options a,#themeoptions label,#themeoptions a,.pointer{cursor: pointer}\
    #watcher .move,#updater .move,#options .move,#stats .move,#filter>div:first-child,#thread_filter>div:first-child,#qr .move{cursor:default!important}\
    #watcher{position:fixed!important;top:" + (getValue("Show Logo") ? 126 : 19) + "px!important;right:0!important;left:auto!important;bottom:auto!important;width:312px!important}\
    #watcher .move,#themeoptions .move{text-decoration:none!important;padding:5px!important;line-height:10px!important}\
    #watcher>div>a:first-child,.container::before{font-size:10px!important}\
    #themeoptions{background:#262626!important;border-top:1px solid #161616!important;position:fixed!important;top:" + (getValue("Show Logo") ? 146 : 39) + "px;right:0;text-align:right;width:312px;padding-bottom:5px;z-index:5!important}\
    #themeoptions>div{padding:5px}\
    #themeoptions .move{text-align:left}\
    #themeoptions label{display:block;border-bottom:1px solid #333;height:20px;padding:0 3px;vertical-align:top}\
    #themeoptions label:hover{background:#222}\
    #themeoptions label>span{padding:0 3px;float:left;font-size:12px!important;line-height:18px}\
    #themeoptions label>input[type=checkbox]{margin:4px 2px 0!important;vertical-align:bottom!important}\
    #themeoptions label>select{height:18px!important;margin:1px 0!important}\
    #themeoptions input[type=text]{height:18px;margin-top:1px 0 0!important;padding:1px 3px!important}\
    #themeoptions textarea{height:100px;width:305px!important}\
    #options{text-align:center}\
    #options .dialog{margin:0 auto!important;text-align:left;box-shadow:rgba(0,0,0,.6) 0 0 10px;-moz-box-shadow:rgba(0,0,0,.6) 0 0 10px}\
    #thread_filter{position:fixed!important;width:312px;z-index:6!important}\
    #thread_filter input{height:22px;margin:2px 1px;padding:1px 4px;width:230px}\
    #thread_filter textarea{width:305px}\
    #thread_filter>.autohide>span{float:left;line-height:24px;margin-left:2px}\
    #thread_filter>div:first-child{padding:2px 5px!important}\
    #thread_filter>div:not(:first-child):not(:last-child){padding:0 3px!important}\
    #thread_filter>div:first-child>span:first-child{display:inline-block;line-height:14px!important;margin:1px 0 -1px;width:130px}\
    #thread_filter>div:first-child>.autohide{margin:2px -5px 0;padding:0 5px;border-top:1px solid #161616}\
    #imgControls{background:rgba(40,40,40,.9);height:18px;position:fixed!important;right:139px;top:0;width:172px!important;z-index:7;border-right:1px solid #161616}\
    #imgControls select{border:none;background:rgba(40,40,40,.9)}\
    #imgControls>label{float:right}\
    .deletebuttons::before,.postarea form[name=post]::before,#qr .move::before,.logo font[size='1']{font-size:10px!important;text-transform:uppercase}\
    #thread_filter>div:first-child>span,#imgControls label,form[name=post] #com_submit+label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,\
    #qr #close,form[name=post] input[name=email]+label,#watcher .move,#themeoptions .move{text-transform:uppercase;font-size:9px!important;line-height:20px}\
    #qr{bottom:0!important;height:auto!important;padding-bottom:21px}\
    #qr #files>div,#qr .autohide>div,#qr .autohide>form>div{position:relative}\
    #qr input[name=upfile]+a,#qr #captchas,#qr #attach{position:absolute;right:6px;top:1px}\
    #qr input[name=upfile]+a::before,#qr #close::before{content:'[';padding-right:2px}\
    #qr input[name=upfile]+a::after,#qr #close::after{content:']';padding-left:2px}\
    #qr .move::before{color:#fff;content:'QUICK REPLY';width:306px}\
    #qr #close{position:absolute;right:6px;top:1px}\
    #updater{position:fixed!important;bottom:0;left:0!important;right:auto!important;top:auto!important;padding:1px 3px;z-index:3!important}\
    #updater input:not([type=checkbox]){margin:1px!important}\
    #updater input[type=text]{width:50px!important}\
    #updater:not(:hover){background:transparent!important;line-height:14px}\
    #updater:hover{border-right:1px solid #161616!important;border-top:1px solid #161616!important}\
    #navlinks{font-size:16px!important;top:" + (getValue("Show Logo") ? 126 : 19) + "px!important;height:20px;line-height:16px;z-index:3!important}\
    #iHover{padding-bottom:19px;z-index:9!important}\
    body>center:nth-of-type(2){position:relative}\
    body>center:nth-of-type(2)>font[color=red]{background:rgba(40,40,40,.9);color:#f66!important;position:absolute;width:100%;top:-94px;left:0;height:93px;z-index:9;\
    margin-left:-5px;padding-right:5px;-webkit-transition:top .1s ease-in-out;-moz-transition:top .1s ease-in-out;-o-transition:top .1s ease-in-out}\
    body>center:nth-of-type(2)>font[color=red]:hover{top:-24px}\
    body>center:nth-of-type(2)>font[color=red]::after{color:#fff!important;content:'ANNOUNCEMENT';display:block;line-height:18px;font-size:10px!important}\
    body>center:nth-of-type(2)>font[color=red]>b{display:block;overflow:auto;width:100%;height:75px}\
    #header{left:0!important;height:18px!important;width:100%!important;padding:0!important;position:fixed!important;top:auto!important;bottom:0!important;z-index:3!important;\
    border-top:1px solid #161616!important;background:rgb(40,40,40)!important;text-align:center;line-height:18px}\
    #navtop,#navtopr{float:none!important;display:inline}\
    #navtop{padding:1px 0;color:#aaa!important;display:none}\
    #navtop a{text-shadow:rgba(0,0,0,.3) 0 0 5px}\
    #navtopr{float:right!important;line-height:18px;margin-right:5px;font-size:0;color:transparent}\
    #navtopr>a:last-child::before{content:'/';padding:0 2px}\
    .pages{background:rgba(40,40,40,.9)!important;border-top:1px solid #161616!important;border-right:1px solid #161616!important;margin:0!important;padding-top:1px;width:auto!important;height:22px;\
    position:fixed!important;bottom:18px;left:-271px;z-index:2;-webkit-transition:left .1s ease-in-out 1s;-moz-transition:left .1s ease-in-out 1s;-o-transition:left .1s ease-in-out 1s}\
    .pages:hover{left:0;-webkit-transition:left .1s ease-in-out 1s;-moz-transition:left .1s ease-in-out 1s;-o-transition:left .1s ease-in-out 1s}\
    .pages *{font-size:12px!important}\
    .pages td{font-size:9px!important;text-transform:uppercase;padding:0 5px!important;min-width:29px;text-align:center}\
    .pages td:nth-of-type(2){color:transparent!important;font-size:0!important}\
    .pages span{color:#aaa!important}\
    .pages b{color:#fff!important}\
    .pages a{font-weight:bold!important;text-decoration:none!important}\
    .pages a:not(:last-child),.pages b:not(:last-child){margin:0 2px}\
    .pages input{background:rgba(33,33,33,.9)!important;border:none!important;height:22px!important;width:auto!important;padding:0 5px!important;position:relative;top:-1px}\
    .pages input:hover{background:rgba(36,36,36,.9)!important;-moz-box-shadow:inset rgba(0,0,0,0.35) 0 0 5px;box-shadow:inset rgba(0,0,0,0.35) 0 0 5px}\
    *::-webkit-input-placeholder{color:#999!important}\
    *:-moz-placeholder{color:#999!important}\
    @-moz-document url-prefix(){\
        form[name=delform] table{width:100%}\
        .container{right:6px}\
    }";
    
    if (!getValue("Show Announcements"))
        css += "body>center:nth-of-type(2)>font[color=red]{display:none!important}";
        
    if (getValue("Pages in nav"))
        css += ".pages{background:transparent!important;height:18px!important;border:none!important;bottom:0!important;left:0!important}.pages input{height:18px!important}";

    addStyle();
    /* END STYLING */
    
    /* DOM MANIPULATION */
    document.addEventListener("DOMContentLoaded", DOMLoaded, false);
    
    function DOMLoaded()
    {
        var nTop = $("#navtop");
        if (getValue("Custom nav links"))
            nTop.innerHTML = getValue('_4chlinks');
            
        nTop.setAttribute("style", "display:inline!important");
            
        // Add theme options link
        var a = tag("a");
        a.textContent = "Theme";
        a.addEventListener('click', options, true);
        inBefore($('#navtopr a').nextSibling, a);
        
        // Add placeholders to postarea form
        var elem = document.getElementsByName('post')[0].elements;
        for(var i = 0, MAX = elem.length; i < MAX; i++)
            switch (elem[i].name)
            {
                case "name":
                    elem[i].setAttribute("placeholder", "Name");
                    break;
                case "email":
                    elem[i].setAttribute("placeholder", "E-mail");
                    if (getValue('Auto noko'))
                        elem[i].value = "noko";
                    break;
                case "sub":
                    elem[i].setAttribute("placeholder", "Subject");
                    break;
                case "com":
                    elem[i].setAttribute("placeholder", "Comment");
                    break;
                case "recaptcha_response_field":
                    elem[i].setAttribute("placeholder", "Verification");
                    break;
                case "pwd":
                    elem[i].setAttribute("placeholder", "Password");
                    break;
            }
        
        // Truncuate Previous to Prev
        var prev;
        if (typeof (prev = $(".pages td input[value='Previous']")) !== "undefined" && prev !== null)
            prev.value = "Prev";
        else if (typeof (prev = $(".pages td:first-child")) !== "undefined" && prev !== null)
            prev.textContent = "Prev";
    }
    /* END DOM MANIPULATION */
})();