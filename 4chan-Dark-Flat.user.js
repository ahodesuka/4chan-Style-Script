// ==UserScript==
// @name          4chan Dark Flat
// @author        ahoka
// @version       1.0
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// ==/UserScript==
(function(){
    var __hasProp = Object.prototype.hasOwnProperty;
    var config = {
        'Show Announcements': true,
        'Show Logo': true,
        'Auto noko': true,
        'Pages in nav': true,
        'Custom nav links': true,
        'Theme': "Random",
        '_4chlinks':
'<a href="http://boards.4chan.org/a/">anime &amp; manga</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/c/">anime/cute</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/g/">technology</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/v/">video games</a>&nbsp;-&nbsp;\n\
<a href="http://boards.4chan.org/jp/">japan</a>'
    };
    
    var postTabText = (window.location.href.match(/.*\/res\/.*/i)) ? "NEW REPLY" : "NEW THREAD";
    var bgPattern = "R0lGODlhAwADAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///ywAAAAAAwADAAAICQA5cMgwsCCHgAA7";
    
    var themes = [];
    themes[0] = { name: "Erio", bg: "http://img88.imageshack.us/img88/2449/eriobg.png", linkColor: "#6cb2ee" };
    themes[1] = { name: "Fate", bg: "http://img848.imageshack.us/img848/3976/fatebg.png", linkColor: "#e1d550" };
    themes[2] = { name: "Kurimu", bg: "http://img823.imageshack.us/img823/9940/kurimubg.png", linkColor: "#ce717d" };
    themes[3] = { name: "????", bg: "http://img217.imageshack.us/img217/2928/homubg.png", linkColor: "#886999" };
    themes[4] = { name: "Horo", bg: "http://img525.imageshack.us/img525/9757/horobg.png", linkColor: "#a46e41" };
    themes[5] = { name: "Marisa", bg: "http://img252.imageshack.us/img252/8995/marisabg.png", linkColor: "#e1cb9c" };
    themes[6] = { name: "Shana", bg: "http://img821.imageshack.us/img821/1281/shanabg.png", linkColor: "#ef4353" };
    themes[7] = { name: "Shiki", bg: "http://img94.imageshack.us/img94/629/shikibg.png", linkColor: "#aaa" };
    themes[8] = { name: "Tessa", bg: "http://img834.imageshack.us/img834/1904/tessabg.png", linkColor: "#857d92" };
    themes[9] = { name: "Yin", bg: "http://img16.imageshack.us/img16/3190/yinbg.png", linkColor: "#d1dfef" };
    themes[10] = { name: "Random" };
    themes[11] = { name: "Custom" };
    
    var getValue = function(name)
    {        
        return GM_getValue(name, config[name]);
    };
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
        
        for(_b = 0, _d = _c.length; _b < _d; _b++)
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
    var options = function()
    {
        var _c, _d, checked, div, hiddenNum, option;
        if((div = $('#themeoptions')))
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
                
                if (option == 'Theme')
                {
                    html += '<label><span>' + option + '</span><select name="Theme">';
                    
                    for (var i = 0; i < themes.length; i++)
                    {
                        if (themes[i].name == "Random")
                            html += '<option disabled="disabled">---</option>';
                        
                         html += '<option value="' + themes[i].name + '"' + (themes[i].name == getValue(option) ? ' selected="selected"' : '') +'>' + themes[i].name + '</option>';
                    }
                    
                    html += '</select></label>';
                }
                else if (option != '_4chlinks')
                    html += "<label><span>" + option + "</span><input " + checked + ' name="' + option + '" type="checkbox"></label>';
                else
                    html += '<textarea name="_4chlinks">' + getValue('_4chlinks') + "</textarea>";
                
                html += "<br>";
            }
            
            html += '<div style="float:right;"><a name="save">save</a> <a name="cancel">cancel</a></div></div>';
            div.innerHTML = html;
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
        
        for (_c = 0; _c < _d.length; _c++)
        {
            input = _d[_c];
            if (input.name == "Theme")
                GM_setValue(input.name, input.value);
            else
                GM_setValue(input.name, input.checked);
        }
        
        _4chlinks = $('textarea[name="_4chlinks"]');
        GM_setValue("_4chlinks", _4chlinks.value);
        
        return setTimeout('window.location.reload(true);', 50);
    };
    var close = function()
    {
        var div;
        div = this.parentNode.parentNode.parentNode;
        return remove(div);
    };
    
    var uTheme = getValue("Theme");
    var bg, linkColor;
    if (uTheme == "Random")
    {
        var i = Math.max(Math.min(Math.round(Math.random() * themes.length - 3), themes.length - 3), 0);
        bg = themes[i].bg;
        linkColor = themes[i].linkColor;
    }
    else if (uTheme == "Custom")
    {
    }
    else
    {
        for (var i = 0; i < themes.length; i++)
            if (uTheme == themes[i].name)
            {
                bg = themes[i].bg;
                linkColor = themes[i].linkColor;
                break;
            }
    }
    
    var css =
    "@font-face{font-family:'AnonymousPro';font-style:normal;font-weight:normal;src:local('AnonymousPro'),url('http://themes.googleusercontent.com/static/fonts/anonymouspro/v1/Zhfjj_gat3waL4JSju74E1tUcs43uvLUMv3hfHgzs3w.woff') format('woff')}\
    *{font-family:Calibri,sans-serif;font-size:11px!important}\
    *:focus{outline:none}\
    img{border:0!important}\
    hr{border:0!important;clear:left;height:0}\
    a{text-decoration:none!important;color:" + linkColor + "!important;font-weight:normal!important;-webkit-transition:all 100ms ease-in-out;-moz-transition:all 100ms ease-in-out;-o-transition:all 100ms ease-in-out}\
    a:hover{color:#eee!important}\
    a:not([href]){color:#fff!important;text-decoration:none!important;font-weight:bold!important}\
    .postertrip{color:#a7dce7!important}\
    body{color:#fff!important;background:url(data:image/png;base64," + bgPattern + ") #202020;font-size:12px;margin:0!important;padding:0 316px 37px 5px!important}\
    body::after{background:url(" + bg + ") no-repeat center bottom rgba(22,22,22,.8);content:'';height:100%;width:313px;\
    border-left:2px solid rgba(40,40,40,.9);position:fixed;right:0;bottom:18px;z-index:-1}\
    textarea,input:not([type=submit]),select{font:11px 'Anonymous Pro',arial,sans-serif!important}\
    div.thread{clear:left;margin:3px 0 0;position:relative}\
    div.op{background:rgba(40,40,40,.3);margin:-4px 0 1px -10px;padding:4px 0 1px 10px}\
    #navtopr>a:not(:empty)::after{content:'/';padding:0 2px 0 3px}\
    span.plus{color:#fff!important}\
    form[name=delform]{margin:23px 0 0}\
    body>span[style]~form[name=delform]{margin-bottom:-13px}\
    form[name=delform] table{border-spacing:0;margin:0 0 1px;position:relative}\
    .reply{position:relative;color:#fff!important}\
    .replyhider{position:absolute;right:2px;z-index:999}\
    td.replyhl a:hover,td.reply a:hover{color:#fff!important}\
    td.reply,td.replyhl{padding:2px;width:100%;background:rgba(40,40,40,0.9)!important;border-radius:3px 0 0 3px;-moz-border-radius:3px 0 0 3px}\
    td.replyhl{background:rgba(40,40,40,.3)!important;-moz-box-shadow:inset rgba(0,0,0,0.35) 0 0 15px;box-shadow:inset rgba(0,0,0,0.35) 0 0 15px}\
    .inline td.reply{background:rgba(0,0,0,.1)!important;border:1px solid rgba(255,255,255,.5);border-radius:3px;-moz-border-radius:3px;padding:5px}\
    #header{left:0!important;height:18px!important;width:100%!important;padding:0!important;position:fixed!important;top:auto!important;bottom:0!important;z-index:2!important;\
    border-top:1px solid #1c1c1c!important;background:rgb(40,40,40)!important;text-align:center;}\
    a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover{color:#f66!important;font-weight:700!important}\
    .commentpostername a.linkmail[href='mailto:sage']:after{content:' (SAGE)'}\
    .omittedposts{margin-left:4px!important;color:#888!important;font-weight:700!important;text-decoration:none!important;margin-top:-18px;display:inline-block;padding-bottom:4px}\
    .replytitle {color:#999!important}\
    .deletebuttons{background:rgba(40,40,40,0.9)!important;border-left:1px solid #1c1c1c!important;border-top:1px solid #1c1c1c!important;position:fixed;bottom:18px;right:316px;\
    height:22px;color:transparent!important;font-size:0!important;width:16px;overflow:hidden;white-space:nowrap;padding:1px 2px 0!important;\
    -webkit-transition:all .2s linear;-moz-transition:all .2s linear;-o-transition:all .2s linear}\
    .deletebuttons:hover{width:186px;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-o-transition:all .2s linear}\
    .deletebuttons::before{display:inline-block;width:17px;padding:1px 1px 0 0;font-size:10px!important;text-align:center;content:'X';color:#fff}\
    .deletebuttons:hover::before{overflow:hidden;white-space:nowrap;padding:0;width:0}\
    .deletebuttons *{visibility:visible!important}\
    .deletebuttons input[type=checkbox]{position:absolute;right:92px;bottom:3px!important;top:auto!important}\
    .deletebuttons::after{visibility:visible!important;position:absolute;right:54px;bottom:6px;font-size:9px!important;color:#ccc!important;content:'FILE ONLY'}\
    .deletebuttons .inputtext{width:138px}\
    .pages{background:transparent;color:#fff!important;margin-top:-4px!important}\
    .filetitle{color:#aaa!important}\
    #recaptcha_logo" + (!getValue("Show Logo") ? ",.logo" : "") + ",#recaptcha_tagline,td[align=right],td.rules,img + br,iframe,#BF_WIDGET,.bf,.yui-g,#filter-button,\
    #recaptcha_table td:nth-of-type(2),#option-button,#hd,#ft,td small,#footer,.rules,center font small,body>span[style],body>br,form[name=delform]>br[clear],\
    form[name=delform]>span[style],div.thread>br,td.postblock,.deletebuttons input[type=button],.deletebuttons br,#stats,table[width='100%'],#autohide\
    {display:none!important}\
    table,td{border:0!important;color:#ccc!important}\
    .replymode{background-color:transparent!important;color:#fff!important}\
    th{background-color:#000!important;opacity:0!important}\
    tr{background-color:transparent!important;color:#fff!important}\
    tr[height='73']{height:auto!important}\
    .recaptchatable #recaptcha_image{background-color:transparent!important;margin-left:0!important;border:0!important}\
    #recaptcha_image img,#qr img[src*='recaptcha/api']{width:305px!important}\
    #recaptcha_table tr td{padding:0!important}\
    .recaptcha_input_area{padding:0!important}\
    .recaptcha_image_cell{padding-right:2px!important}\
    div{color:#fff!important}\
    .commentpostername,.postername,.commentpostername a,.postername a{color:#fff!important}\
    .commentpostername a,.postername a{font-weight:700!important}\
    blockquote{margin-right:5px!important}\
    div.op blockquote,form[name=delform]>blockquote{margin-bottom:2em!important}\
    #navtopr,#navbotr{float:none!important;display:inline!important}\
    div.reply{background:rgba(40,40,40,.9)!important;border:0!important;margin:0!important;z-index:2!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img{float:left;margin:0 20px 20px!important}\
    form[name=delform] .filesize+br+a[target='_blank'] img+img{margin:0 0 20px!important;position:relative;z-index:9}\
    .hidethread,.unhidethread,.watchthread,.expandthread,.quickreply,.hidewatchedthreads,.refreshwatchedthreads,.restorewatchedthreads,.restorewatchedthreadsimg,\
    img[src^='chrome://4chan/skin/buttons/'],img[alt='Locked'],img[alt='closed']\
    {background-image:url('http://img175.imageshack.us/img175/1497/yunoiconsbf0.png')!important}\
    img[src^='chrome://4chan/skin/buttons/'],img[alt='Locked'],img[alt='closed']\
    {height:0!important;margin:0 1px!important;padding-top:16px!important;margin-right:-3px!important;width:16px!important;background-color:transparent!important;margin-left:4px!important}\
    [src$='post_expand_plus.png']{background-position:-48px 0!important}\
    [src$='arrow_up.png']{background-position:-64px 0!important}\
    [src$='quote.png']{background-position:-80px 0!important}\
    [src$='stop.png']{background-position:-96px 0!important}\
    [src$='arrow_right.png']{background-position:-112px 0!important}\
    [src$='post_expand_minus.png']{margin-left:3px!important;background-position:-32px -16px!important}\
    [src$='arrow_down.png']{background-position:-64px -16px!important}\
    [src$='arrow_down2.png']{background-position:-80px -16px!important}\
    [src$='empty.png']{background-position:-96px -16px!important}\
    .inputtext,textarea{margin:0;padding:1px 4px;outline:none}\
    .pages td b{color:#fff;display:inline-block;padding:0 3px}\
    input[type=file]{width:305px;margin:0}\
    .inputtext:not(textarea){height:20px!important}\
    form[name=post] .inputtext:not(textarea),#qr>.move>.inputtext,#qr input[name=pwd]{width:305px!important}\
    form[name=post] input[type=text][name=sub]{width:254px!important;margin-right:1px!important}\
    textarea,input,input[type=file]>input[type=button],input[type=file]::-webkit-file-upload-button\
    {background:rgba(22,22,22,0.9)!important;border:0!important;border-bottom:1px solid #101010!important;border-top:1px solid #262626!important}\
    textarea:hover,input:not([type=file]):hover,input[type=file]>input[type=button]:hover,input[type=file]::-webkit-file-upload-button:hover{background:rgba(33,33,33,0.9)!important}\
    select{background:rgba(40,40,40,.9);border:1px solid #121212}\
    select:hover{background:rgba(50,50,50,1);}\
    textarea{color:#fff;width:305px!important;margin:0!important;height:55px!important}\
    .unkfunc{font-weight:bold!important;color:#568821!important}\
    .unkfunc a,.unkfunc a:hover{font-weight:bold!important;text-shadow:none!important;text-decoration:none!important;color:#888!important}\
    #pages{color:#666!important;line-height:18px}\
    #pages span{color:#999!important}\
    #pages b{color:#fff!important}\
    #pages a{font-weight:bold!important;text-decoration:none!important}\
    #navi{padding:1px 0;color:#999!important;line-height:18px}\
    #navi a{font-weight:bold!important}\
    .navi-left{padding-left:320px!important;text-align:left!important}\
    td.doubledash{padding:0;text-indent:-9999px}\
    #updater input:not([type=checkbox]){margin:1px!important}\
    #updater input[type=text]{width:50px!important}\
    .logo{background:rgba(40,40,40,.9);position:fixed;right:0;top:19px;text-align:center;padding:2px 6px;width:300px}\
    .logo img{margin:0!important;opacity:0.4;border:1px solid #1c1c1c!important}\
    .logo span{color:#eee;text-shadow:#000 0 0 10px;display:block;font-size:20px!important;text-align:center;width:300px;position:absolute;font-family:Trebuchet MS,sans-serif!important;bottom:-12px;z-index:3}\
    .logo font[size='1']{text-shadow:#000 0 0 5px;color:#ccc;font-size:10px!important;position:absolute;bottom:8px;text-align:center;width:300px;text-transform:uppercase}\
    .logo font[size='1']>a{padding:0 2px;text-transform:none!important}\
    div.autohide>a[title='Auto-hide dialog box']{color:#fff!important;text-decoration:underline!important}#captchas{padding:0 3px}#overlay{z-index:1000}\
    input,select,input[type=file]::-webkit-file-upload-button{color:#fff!important;-webkit-transition:all 100ms ease-in-out;-moz-transition:all 100ms ease-in-out;-o-transition:all 100ms ease-in-out}\
    input[type=submit],input[type=file]::-webkit-file-upload-button{width:50px;height:20px!important;color:#ddd!important;cursor:pointer;margin:0!important;padding:0!important;font-size:9px!important;text-transform:uppercase}\
    input[type=checkbox]{position:relative;top:2px!important;margin:2px!important;vertical-align:top;border:1px solid #444!important;\
    -webkit-appearance:button!important;-moz-appearance:none;-o-appearance:none;width:12px!important;height:12px!important;cursor:pointer!important;border-radius:3px;-moz-border-radius:3px}\
    input[type=checkbox]:checked{border:1px solid #1f1f1f!important;background:rgba(180,180,180,0.6)!important;-moz-box-shadow:#eee 0 0 2px;box-shadow:#eee 0 0 2px}\
    input[type=checkbox]:active{background:rgba(255,255,255,0.6)!important}\
    td.reply input[type=checkbox],#autohide,#themeoptions input[type=checkbox],#options input[type=checkbox]{top:0!important}\
    input[name=recaptcha_response_field]{height:20px!important;padding:1px 4px!important;width:305px!important}\
    input[type=file]>input[type=button],input[type=file]::-webkit-file-upload-button{padding:0 5px!important;width:auto!important;border:0!important;vertical-align:bottom}\
    .postarea table{padding:0!important;border-spacing:0px!important;border-collapse:collapse!important}\
    .postarea,#qr{width:306px;height:265px;position:fixed!important;z-index:1!important;margin:0!important;padding:3px;right:0;bottom:-230px;top:auto!important;left:auto!important;\
    -webkit-transition:all .2s linear 1s;-moz-transition:all .2s linear 1s;-o-transition:all .2s linear 1s;background:rgba(40,40,40,0.9)}\
    .postarea:hover{bottom:7px;-webkit-transition:all .2s linear;-moz-transition:all .2s linear;-o-transition:all .2s linear}\
    .postarea form[name=post]::before,#qr .move::before{display:block;height:18px;padding-top:1px;font-size:10px!important;text-align:center;content:'" + postTabText + "'}\
    form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),#qr>div.move{font-size:0!important;color:transparent!important}\
    form[name=post] #com_submit+label{position:absolute;color:#ccc!important;top:auto;right:55px;vertical-align:bottom}\
    .postarea #com_submit+label{position:absolute;color:#ccc!important;top:auto;bottom:35px;right:8px!important;vertical-align:bottom}\
    form[name=post] input[name=email]+label{position:absolute;color:#ccc!important;top:173px;right:6px;vertical-align:bottom;z-index:1}\
    .filesize{margin-left:4px!important}\
    .filesize span{font-size:0!important;visibility:hidden}\
    .filesize span::after{content:attr(title);font-size:12px;visibility:visible}\
    .postarea input[type=password]{width:150px}\
    #imageType{-webkit-appearance:none;-moz-appearance:none;-o-appearance:none;}\
    #options label,#options a,#themeoptions label,#themeoptions a,.pointer{cursor: pointer}\
    #themeoptions label>span{padding:0 3px}\
    #watcher .move,#updater .move,#options .move,#stats .move,#filter>div:first-child,#thread_filter>div:first-child,#qr .move{cursor:default!important}\
    #watcher{position:fixed!important;top:" + (getValue("Show Logo") ? 126 : 19) + "px!important;right:0!important;left:auto!important;bottom:auto!important;width:312px!important}\
    #watcher .move,#themeoptions .move{font-size:9px!important;text-decoration:none!important;padding:5px!important;text-transform:uppercase}\
    #watcher>div>a:first-child{font-size:10px!important}\
    #themeoptions{background:#262626!important;border-top:1px solid #121212!important;position:fixed;top:" + (getValue("Show Logo") ? 147 : 40) + "px;right:0;text-align:right;width:312px;padding-bottom:5px;z-index:5!important}\
    #themeoptions>div{padding:5px}\
    #themeoptions .move{text-align:left;position:absolute}\
    #themeoptions input[type=text]{height:auto;margin:2px;padding:1px!important}\
    #themeoptions textarea{height:100px!important;width:305px!important}\
    #thread_filter{width:312px;z-index:6!important}\
    #thread_filter input{height:22px;margin:2px 1px;padding:1px 4px}\
    #thread_filter.reply>div:first-child{padding:2px 5px!important}\
    #thread_filter.reply>div:not(:first-child):not(:last-child){padding:0 3px!important}\
    #thread_filter.reply>div:first-child>span:first-child{line-height:14px}\
    #thread_filter.reply>div:first-child>.autohide{margin:2px -5px 0;padding:0 5px;border-top:1px solid #121212}\
    #imgControls{background:rgba(40,40,40,.9);height:18px;position:fixed;right:157px;top:0;z-index:7;border-right:1px solid #121212}\
    #imgControls select{border:0;background:rgba(40,40,40,.9);margin-top:3px!important;}\
    #thread_filter.reply>div:first-child>span,#imgControls label,form[name=post] #com_submit+label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,\
    #qr #close,form[name=post] input[name=email]+label{text-transform:uppercase;font-size:9px!important;line-height:20px}\
    #qr{bottom:0!important;height:auto!important;padding-bottom:21px}\
    #qr #files>div,#qr .autohide>div,#qr .autohide>form>div{position:relative}\
    #qr input[name=upfile]+a,#qr #captchas,#qr #attach{position:absolute;right:6px;top:1px}\
    #qr input[name=upfile]+a::before,#qr #close::before{content:'[';padding-right:2px}\
    #qr input[name=upfile]+a::after,#qr #close::after{content:']';padding-left:2px}\
    #qr .move::before{color:#fff;content:'QUICK REPLY';width:306px}\
    #qr #close{position:absolute;right:6px;top:1px}\
    #updater{bottom:0;left:0!important;right:auto!important;top:auto!important;padding:1px 3px}\
    #updater:not(:hover){background:transparent!important;line-height:14px}\
    #updater:hover{border-right:1px solid #1c1c1c!important;border-top:1px solid #1c1c1c!important}\
    body>center:nth-of-type(2){position:relative}\
    body>center:nth-of-type(2)>font[color=red]{background:rgba(40,40,40,.9);color:#f66!important;position:absolute;width:100%;top:-92px;left:0;height:88px;z-index:9;\
    margin-left:-5px;padding:0 0 3px 5px;-webkit-transition:all 100ms ease-in-out;-moz-transition:all 100ms ease-in-out;-o-transition:all 100ms ease-in-out}\
    body>center:nth-of-type(2)>font[color=red]:hover{top:-24px}\
    body>center:nth-of-type(2)>font[color=red]::after{color:#fff!important;content:'ANNOUNCEMENT';display:block;line-height:18px;font-size:10px!important}";
    
    if (!getValue("Show Announcements"))
        css += "body>center:nth-of-type(2)>font[color=red]{display:none!important}";

    if (getValue("Custom nav links"))
    {
        var pages = '';
        
        if (getValue("Pages in nav"))
        {
            css += ".pages{display:none!important}";
            var pagesTd = document.getElementsByTagName('td');
            
            for (i = 0; i < pagesTd.length; i++)
                if (pagesTd[i].innerHTML == 'Previous' || pagesTd[i].innerHTML == '<input type="submit" value="Previous" accesskey="z">')
                    var pages = pagesTd[i+1].innerHTML;
            
            var pages = pages.replace(/\] \[/g,'<span> | </span>');
                pages = pages.replace(/\[/g,'');
                pages = pages.replace(/\] /g,'');
                
            if (pages == '' || pages.substring(0,3) == '<b>')
                var before = '';            
            else if (pages.substring(0,3) != '<b>')
            {
                var thispage = pages.search('<b>');
                    thispage = pages.substring(thispage+3,thispage+5);
                var before = parseInt(thispage)-1;
                    before = '<a href="' + before + '"><font style="font-family:Tahoma, Arial, Helvetica, sans-serif!important;">&#171;</font></a> ';
            }
            var nCheck = pages.substring(pages.length-2,pages.length);
            if (pages == '' || nCheck == 'b>' || nCheck == '15')
                var next = '';
            else if (pages.substring(pages.length-4,pages.length) != '</b>')
            {
                var thispage = pages.search('<b>');
                    thispage = pages.substring(thispage+3,thispage+5);
                var next = parseInt(thispage)+1;
                    next = ' <a href="' + next + '"><font style="font-family:Tahoma, Arial, Helvetica, sans-serif!important;">&#187;</font></a>';
            }
            
            pages = before+pages+next;
        }
            
        var _4chlinks = getValue('_4chlinks');
        var navi = document.getElementById('header');
        
        navi.innerHTML = '<div style="position:relative;width:100%;"><div id="pages" style="position:absolute;left:5px;">'+pages+'</div>\
        <div style="position:absolute;right:5px;top:3px;z-index:2;"><span id="navtopr"><a></a></span><a name="4chdarkop" class="pointer">Theme</a></div></div>\
        <div id="navi">'+_4chlinks+'</div>';
        $('a[name="4chdarkop"]').addEventListener('click', options, true);
    }
    else
    {
        css += "#navtop,#navtopr{float:none!important;display:inline!important}.pages{background:transparent;color:#fff!important}";
        var text, a;
        text = $('#navtopr a').nextSibling;
        a = tag('a');
        a.textContent = 'Theme';
        a.setAttribute('class','pointer');
        a.addEventListener('click', options, true);
        inBefore(text, document.createTextNode('/'));
        inBefore(text, a);
    }
    
       
    if(typeof GM_addStyle != "undefined")
        GM_addStyle(css);
    else if(typeof PRO_addStyle != "undefined")
        PRO_addStyle(css);
    else if(typeof addStyle != "undefined")
        addStyle(css);
    else
    {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0)
        {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
    
    if(getValue('Auto noko'))
        document.getElementsByName("email", "input")[0].value = "noko";
    
    var elem = document.getElementsByName('post')[0].elements;
    for(var i = 0; i < elem.length; i++)
        switch (elem[i].name)
        {
            case "name":
                elem[i].setAttribute("placeholder", "Name");
                break;
            case "email":
                elem[i].setAttribute("placeholder", "E-mail");
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
})();