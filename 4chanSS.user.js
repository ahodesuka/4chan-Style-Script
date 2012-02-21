// ==UserScript==
// @name          4chan Style Script
// @author        ahoka
// @description   Customize 4chan to your liking right on the page itself.
// @namespace     ahodesuka.github.com
// @version       1.4.2
// @run-at        document-start
// @include       http://boards.4chan.org/*
// @include       http://rs.4chan.org/*
// @include       http://sys.4chan.org/*
// @updateURL     https://github.com/ahodesuka/4chan-Style-Script/raw/master/4chanSS.user.js
// ==/UserScript==

(function()
{
    var defaultConfig =
    {
        "Show Board Name":          [ true,  "Toggle visibility of the board name" ],
        "Show Text Board":          [ true,  "Toggle visibility of the text board link" ],
        "Show Logo":                [ true,  "Toggle visibility of the logo" ],
        "Auto Hide Thread Watcher": [ true,  "Hides watched threads unless the mouse is over the watcher" ],
        "Slim Replies":             [ true,  "Reduces the size of replies" ],
        "Neko/Sega Icons":          [ false, "Show icons when a posters e-mail begins with neko or sega" ],
        "Smart Tripcode Hider":     [ false, "Hides the name field if the value contains a tripcode" ],
        "Expanding Form Inputs":    [ true,  "Makes certain form elements expand on focus" ],
        "Custom Navigation Links":  [ true,  "Use specified links instead of showing all boards" ],
        "Style Scrollbars":         [ true,  "Make the scroll bar match the theme" ],
        "Side Margin":
        [
            26, "Change the size of the margin opposite of the sidebar",
            [
                { name: "Normal",        value: 26 },
                { name: "Small",         value: 20  },
                { name: "Slim",          value: 6  },
                { name: "None",          value: 2  }
            ]
        ],
        "Layout":
        [
            1, "Change the layout of the main content",
            [
                { name: "Fit Width",   value: 1 },
                { name: "Fit Content", value: 2 },
                { name: "Centered",    value: 3 }
            ]
        ],
        "Post Form":
        [
            2, "Change the transition for the post form",
            [
                { name: "Slide Up", value: 1 },
                { name: "Fade",     value: 2 },
                { name: "Fixed",    value: 3 }
            ]
        ],
        "Sidebar Position":
        [
            1, "Change the position of the sidebar",
            [
                { name: "Right",    value: 1 },
                { name: "Left",     value: 2 },
                { name: "Disabled", value: 3 }
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
        "Themes":
        [
            {
                name:        "Dark Flat",
                enabled:     true,
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
                customCSS:   "td.reply,td.replyhl{border:0!important}\n.reply>.reportbutton,.replyhl>.reportbutton{top:2px!important}"
            },
            {
                name:        "Photon",
                enabled:     false,
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
                enabled:     false,
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
                enabled:     false,
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
                customCSS:   'new String(".thread{margin:1px 0 1px!important;padding:3px 0 0!important}\nform[name=delform],td.reply,td.replyhl,.stub>a,.stub>.block>a,\n.pages td:nth-of-type(2),.pages input[type=submit]{border-radius:0!important}\ntd.reply,td.replyhl,.stub>a,.stub>.block>a{border-left:0!important;border-top:0!important;"+(config["Layout"]==1?"border-right:0!important":"")+"}\n.reply>.reportbutton,.replyhl>.reportbutton{right:14px!important;top:2px!important}")'
            },
            {
                name:        "Yotsuba B",
                enabled:     false,
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
                customCSS:   'new String(".thread{margin:1px 0 1px!important;padding:3px 0 0!important}\nform[name=delform],td.reply,td.replyhl,.stub>a,.stub>.block>a,\n.pages td:nth-of-type(2),.pages input[type=submit]{border-radius:0!important}\ntd.reply,td.replyhl,.stub>a,.stub>.block>a{border-left:0!important;border-top:0!important;"+(config["Layout"]==1?"border-right:0!important":"")+"}\n.reply>.reportbutton,.replyhl>.reportbutton{right:14px!important;top:2px!important}")'
            },
            {
                name:        "安心院なじみ",
                enabled:     false,
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
                enabled:     false,
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
                enabled:     false,
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
                customCSS:   "td.reply,td.replyhl{border:0!important}\n.reply>.reportbutton,.replyhl>.reportbutton{top:2px!important}"
            },
            {
                name:        "4chan Rewired", // Originally by !K.WeEabo0o @ http://userstyles.org/styles/57787/4chan-rewired
                author:      "!K.WeEabo0o",
                enabled:     false,
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
                customCSS:   'new String((config["Layout"]==2?".replyhider{border:1px solid "+this.brderColor.hex+"!important;border-right:0!important}.op{border:1px solid "+this.brderColor.hex+"!important;"+(config["Sidebar Position"]==3?"left:-"+(config["Side Margin"]+2)+"px!important;padding-left:"+(config["Side Margin"]+2)+"px!important}.op,":"}"):"")+"td.reply,td.replyhl{background:-webkit-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;background:-moz-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;background:-o-linear-gradient(top,rgba(244,244,244,.8),rgba(239,239,239,.8))!important;box-shadow:0 2px 5px rgba(0,0,0,.05)!important}")'
            }
        ],
        "Mascots":
        [
            { img: "http://i.imgur.com/DL5uR.png", enabled: true, overflow: true                                          }, // asuka
            { img: "http://i.imgur.com/zhPlM.png", enabled: true                                                          }, // erio
            { img: "http://i.imgur.com/b9KmB.png", enabled: true                                                          }, // homu
            { img: "http://i.imgur.com/bsLY4.png", offset: 0, position: "center", enabled: true                           }, // horo
            { img: "http://i.imgur.com/uO5qZ.png", enabled: true                                                          }, // kuroko
            { img: "http://i.imgur.com/Ht6dr.png", offset: -90, position: "center", enabled: true, small: true            }, // kuroneko
            { img: "http://i.imgur.com/56oEl.png", enabled: true                                                          }, // inori
            { img: "http://i.imgur.com/ridLc.png", enabled: true, overflow: true                                          }, // kimi
            { img: "http://i.imgur.com/AfjG9.png", offset: 0, position: "center", enabled: true, flip: false, small: true }, // lain
            { img: "http://i.imgur.com/WUIMw.png", enabled: true                                                          }, // luka
            { img: "http://i.imgur.com/J1i26.png", offset: -90, position: "center", enabled: true                         }, // madotsuki
            { img: "http://i.imgur.com/53yAK.png", enabled: true, overflow: true                                          }, // ムゥ～りさ
            { img: "http://i.imgur.com/H1pgZ.png", offset: 0, position: "center", enabled: true, flip: false, small: true }, // miku
            { img: "http://i.imgur.com/MdE9K.png", enabled: true, flip: false, overflow: true                             }, // mio
            { img: "http://i.imgur.com/NaKmF.png", offset: 0, position: "center", enabled: true                           }, // mokou
            { img: "http://i.imgur.com/WWozC.png", enabled: true, overflow: true                                          }, // ran
            { img: "http://i.imgur.com/K1mLx.png", enabled: true, flip: false, samll: true                                }, // shana
            { img: "http://i.imgur.com/FKDcd.png", enabled: true                                                          }, // shiki
            { img: "http://i.imgur.com/zu9nY.png", enabled: true                                                          }, // tessa
            { img: "http://i.imgur.com/haBSN.png", enabled: true                                                          }, // yin
            { img: "http://i.imgur.com/xwPrX.png", enabled: true                                                          }  // yozora
        ],
        "Nav Links":
        [
            { text: "anime & manga", link: "http://boards.4chan.org/a/"  },
            { text: "anime/cute",    link: "http://boards.4chan.org/c/"  },
            { text: "technology",    link: "http://boards.4chan.org/g/"  },
            { text: "video games",   link: "http://boards.4chan.org/v/"  },
            { text: "otaku culture", link: "http://boards.4chan.org/jp/" }
        ],
        "Nav Link Delimiter":
        [
            "&nbsp;-&nbsp;", "Sets the character which will separate navigation links"
        ]
    },
    MAX_FONT_SIZE = 16,
    MIN_FONT_SIZE = 10,
    NAMESPACE     = "4chanSS.",
    inputImages   = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQVJREFUeNpi1NZUZcABkoFYngWHpAUQBwPxOyYskpJAXAjEv4C4EaTADoh1oZJcQFwBxGJAPBeIb4MUlANxHhCLAnECEOsB8Tog3gzSwSwmKvwfSLsCsSEQWwHxFSDug1rBADJhBRDvBWIVIP4AxB1A/BnmIJAvQCZMBmJ+IN4CxM+RXcx45dqtQR8OIAVLoF5sA+IgIL4ExAtg9lEhHP7//8+AD4DDQUdLTRhI+QKxA1T8AMiRwEB8CwsokGQ8kkYYewEsoBywmO4A8wVewIRkJzo4AHckLNTQHUmUNwm6AWzF1eu3BYCUNxC7QMX3APFWYKb6AHNDAFo4pAAx65AJB4AAAwAw/Uz3NoqiVgAAAABJRU5ErkJggg==",
    defaultIcons  = "iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC0xJREFUeNrsWgtQVNcZ/u++2JXFB7amtSo11apRR9vVZkTA3fooDhhJrUQnmEzq+EpTbTOdTh9OIUpSzKRNNKkdZbQxPqCorRUcoYPdRRKso0QhFesrjqgIIiDP3b13d2///+y9y91lHwSwWuuZuXvPPa899//O///ff87lRFGEJ+nhJY2cKfqlmt3VKg70OjBxAHPw8SmpugFhKnPwUOn2eAFL/a3bN0idShXpfxLw2oA9trUAlNfjw00EfuUAgZ9emm7FmzmgmAt4DvwzW8G8AssjA4BvliLM1BhHrp5keWVBXf09A5WN/MqX7Betf5okNtXtxMczffifDSPz8n5wdflyLUqB0CobyJfo6uoyJyYmsnxtbS1UVVVx9+/f92szdOhQbtq0aeKYMWPYc3l5OQPsmU2VEGUwgE6vB21UFGi02mQsfh4twxqqt7e3+40jtQFOpdphe2XEmgEDwM77IJj/7YSXU06d+HtLTdXpI2yS056dNzPp5ZTygreu9wUADwn99m0Yu23b4jPr1+tF7/+eGCgASNitra0sj8IHSRtsAc3MVDdkyBBfH+i5+pJdgpAtPzrt9h5q5Ha7geO4X+GPKbD7zp07zVqt1qpHMKMQKJ1Ox8p5ngen0wkOhwMEQbCsXr3a1gMAnYaDpnampaNFTv9U7ZVPP9NpYANbVVc+LZkxJ3Viux1G0/MwIxdRKGK3DUgQEAAeV1L9uXPw5SVLvld76JBRAqHEaDQux5ca0xfBq9Xq2o6OjjwS5jkc++bNmzBr1iw4deoUmSSLAgQztrFS3dGjR2H06NE9AUDhCzyfvXLJ06Zdhz+vdLtc4PF4QIMJa2MkcxwnejwLYgycubnV2RA4H5fLZTWZTGHnfPr0aavSPPoAGBINhCxcb/AYO1vbVCAKTiMaoKY2BEcrOO3tHap2u2gcGctBjKHXMmK2f2xublpTWRmgsGAIqvuC9PTZeQUFbxIAcXFxI4uKinL6AkBqaurP5NWMQiWzYz5+/Lg1Pj4eKioqlC/KyrCO8hZsa8O2YrfsxWTe6cxe9+IzprY2N/C4UjGdZSveJXCGKI3GGK3VDR0cZRg1ImZYp53n6xtaAzWMVje7wqXAeqUPWGfQwTe7nKL2fMk7uzQqGIb++M8utzhWo+JuluRvOU51qCm52LYar/eDjP8GWSxJA1R2XKTjcnMXk/AdqLrnT5w4RWVo7dRYv5HajRo1ykWL7OrVq7L5ALTVMG7cuIgAUN8Ah2tDf2ApLS21SnPxzQvLMkn4gwYNsin7MOE7HNnrf2gyXbrUCXq9Cr4/7xsm4gfeS0SzQ6tbZBeIHnd1zZ1a3uHMD5wPmZr6+np2D5bIJAXWKQF4ev5rH/3E3GVnK4C34+W0Q0vTFYjSwcxBegC6DEYN2PL3bFUOcrmbzaSY8/NNUFcHbhyjC1emLPxjBw6cRWltwj8sVtKR6OhoD9pNMhuwdOlSVnbw4EGYNGlSRACob5BiWxAGlCVdPRJvt2f/dO1sU1XVfcmhS/YfTVA7yqAT/QDPC+DBdzDoNe7m5q4bd+91HVBrND18Idl50vKMjIyg8923bx9rE5IFnUFhaZBS0orkOBUi74KWFjvaWgC9FoWPPiU6RhvMycp2f2PJsmXZC3JzTW3V1dDc0ABOtKP/Kin5BIVPzq04iBBFWhm4ckGF/03mBFepz4FFAIBhOX36dOZc6U59IzAmX1sGgMOxMefd0uwNay2mq1c7gNOpoYUT4a6HAwGdqVsXBR5e4N2t7e211xruODocB9RazVaPxw3BAKDr85bg/y3XhwRg5pw5IARoQJSugzQAlBpwrcJ/4I+6ASjGaX3VuWrVj+Jff93UVlMDg6KjAYmclpOEH0jGDQaDh4Q9d+5c2L59O4wYMQKuXLkCN27cgPHjx4cVJvUNUkwMSDZBWQoNyAxwzLL9L0YtgLd/fyx72doUk61VBfV5hZUBfKIRr4voI/M1Ot0ZBCCkgIklFedtD045cWGHBEBwgdhbDaC2fgBwnPwyxBZ06z7+2HQiIaFyRkqKyYhjSTbfS+N6ClEkE0ROki5m0i5fhpycHNi9e3ckAMQA0mXGFW6lmAB5fqYCgEypTMmORIUfKKZFt+fdQ9nj1y43Ef1Erj+DCwgwVRECTrLv9C50hWsTFIDbDaJ7/mu904B/NIrBXL0aV0hyTU3Ne1OmTNmYplI1O44dg+eWLjWFi3eRM4uBE548eTLs3bs3ogmivjILQrMi0j0pKQkKCwtBErScLFhmpbqTJ09ayQQF0lACwYXCqdn6IYsDBFypUWjO1BpNr1lZv1jQtduirrcacP226CcxzqsBSfv37//51KlTN+DzQXyhFlzt19Gh0gtVhpoQmp/bWVlZa/tCQ7FvnQzAokWLmP0nnk8Cx8hXaWqIdlqwjsUCxLBkxtUDBK+Anme8HoO7wcOH93o+GAdYqqurwwZi1CYoAHfuwfCZaIfd6PFd1BA1wIUaMHiwC2gcHNN31TfBsAAApi5cuDBjxYoVZHePy5ZG9DKe4nCT3rx5c+FARMKVlV6MY2Ji4NKlS7a6uroe7GjChAksYqa2sgbc2rogsF0xRJhzqLRjx45gDKx3WxHtnWLni999oQjNTGPsEK4zdhiojNEQU35G/JrsOzmfwJlTUgKQUVxc/AFmzz2MDS20+zbk+ebggXh3GQJD4Cjp6kNP3JPt6IebVE9E8IhtR/8vpvTS9JA8P1ycUDCvIOuJBgyMD8ikXUiKAehsQMqLdFfmqY7aSPnMR04DDmf+2qzV6azKAwqZE1NsQAGKwPOWJW+8GXSV9bd/P1iQH89HKuh3RkB5LAsXJwxI6td5gHfr1WWdLJ0suT0eX9BAgZJaigKrrVZrKKpF/SfOns36kXNXq9XKQww2zoWyMusXpWq9AIBeqAfPf+vrb7H6KUen9IgTHgQLUp4HNDU1+bYdjEYjxMXFhT8PYCsVkXJJobIDO89IWczyZ4/9DfTyag6x1SrX0Ur/VnIqe77wzwoGwsSZz7Lnc8VFYfv3Jw6Ij4+30YGMkuejbwgaJ9B5QEVFxYDPQxkJ06ZfWloayx85cgTjqcERzwOYcO7V1noHcDiBbYRjunujFgbpewdAy61bUPjBe7Bo3Y9hsiR4Gqfwj+9DNKrmgwCAXhbjAManlTwfnSzLxJbG+sUJ2EYcaC0Mdh4guLvL6aw60nkAOFHoXW1tLG8n9ZHQsrdjGR/laxMqUZ2jowM8Lhd8cuQwzE55jpWfLy9j5wMOLA/Xv6+pOacZwgkU6/8rXz8ozwN4FL5DAiBtSTro1L04D+AlZ8nsGQlfQovMEi8FbLwztADl/oLLTQcdvv58ZycINC7tjDqd8Lgmeb+/sdO/3CH414fWAGk/W9qZgg/f9joxA6qOXO4MI0CqE3CVk/ZYklN8AHwnIQn+XXkmYv9+xAHy9oPf3o/83U+o74ZkEzWQAJCcDu7xngcsyniV3Qv3eZ/Dngf49rMl6sThQC+sWsfyf9mzCzQSo+HD2HCqo+3bl1auYearAgmPvasT5i5MhZdeXc/G4R+QD0hMTOTQzvp997OlZYtc7/fdELbhsH7A56E8D2hDUy77AHK8shMO6wMEweVzkh7UgAM7/uCloShUUdIAahOaBbiIivr60QEGGWblOOH694cFIbdnK1z53Y8yDlB+N4SX+UHQUCULIhr+192/Y3lignJ5WBbkcrssF87TfnYUCyRkbRB8gYSTtQnJg7HuYtVnfe7fDwDY9kLgdz+NjY0+ACJ8NzRQccAXPg94LHZDR20aJUrfArEgi2ICzFMZY0ZyHu8MKLntrd/c4h723B8LAGJ/EdunzTikp1lPAPg/T/8RYADvldOthSiASgAAAABJRU5ErkJggg==",
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
    SSf, $SS, config, theme, mascot, css, fontList;
    
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
            if (selector == null || selector == undefined) return this;
            
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
            
            this.each(function(){ ret.push(this.cloneNode(deep)); });
            
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
                
            return this.each(function(){ this.insertBefore(el, this.firstChild); });
        },
        append: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
            
            return this.each(function(){ this.appendChild(el); });
        },
        before: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
                
            return this.each(function(){ this.parentNode.insertBefore(el, this); });
        },
        after: function(el)
        {
            if (el.constructor === SSf)
                el = el.get();
                
            return this.each(function()
            {
                if (this.nextSibling != null)
                    this.parentNode.insertBefore(el, this.nextSibling);
                else if (this.parentNode != null)
                    this.parentNode.appendChild(el);
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
                return this.elems[0].getAttribute(name);
                    
            return this.each(function(){ this.setAttribute(name, val); });
        },
        disabled: function(bDisabled)
        {
            if (bDisabled == undefined)
                return this.elems[0].disabled;
                
            return this.each(function(){ this.disabled = bDisabled; });
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
            
            return this.elems[0].className.indexOf(className) != -1;
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
                            if (classNames[j] != cclassNames[k])
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
                return new SSf(null);
            
            if (selector != undefined)
            {
                var t, m = new SSf(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;
                    
                for (var i = s.length - 1; i >= 0; i--)
                {
                    if (s[i] == this.elems[0] && t == undefined)
                        return new SSf(null);
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
                return new SSf(null);
            
            if (selector != undefined)
            {
                var t, m = new SSf(selector, this.elems[0].parentNode),
                    s = this.elems[0].parentNode.childNodes;
                
                for (var i = 0, MAX = s.length; i < MAX; i++)
                {
                    if (s[i] == this.elems[0] && t == undefined)
                        return new SSf(null);
                    else if (s[i] == this.elems[0] && t != undefined)
                        return new SSf(t);
                    else if (m.elems.indexOf(s[i]) != -1)
                        t = s[i];
                }
            }
            
            return new SSf(this.elems[0].previousSibling);
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
                var rfChange = function()
                {
                    $(this).nextSibling("span").text(this.files.length != 1 ? "" : this.files[0].name);
                };
                
                $(this).bind("change", rfChange);
                
                if (this.files.length == 1)
                    rfChange();
            });
        },
        riceCheck: function()
        {
            return this.each(function()
            {
                var $this = $(this);
                
                if ($this.attr("id") == "imageExpand")
                    return;
                else if ($this.attr("riced") === "true")
                    return $this.nextSibling(".riceCheck").riceCheckBind();
                
                var div = $("<div class=riceCheck>").riceCheckBind();
                
                $this.attr("riced", true).attr("hidden", true).after(div);
            });
        },
        riceCheckBind: function()
        {
            return this.each(function()
            {
                if (this.riceCheckBind) return;
                
                $(this).bind("click", function(e)
                {
                    e.preventDefault();
                    $(this).previousSibling("input[type=checkbox][riced]").get().click();
                });
                
                this.riceCheckBind = true;
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
    /* END STYLE SCRIPT FRAMEWORK */
    
    /* STYLE SCRIPT CLASSES & METHODS */
    $SS =
    {
        incRice: false,
        bHideSidebar: false,
        bNewQR: false,
        browser: { gecko: false, opera: false, webkit: false },
        location: { },
        init: function(reload)
        {
            if (!reload)
            {
                $SS.browser.webkit = /AppleWebKit/.test(navigator.userAgent);
                $SS.browser.gecko  = /Gecko\//.test(navigator.userAgent);
                $SS.browser.opera  = /Opera/.test(navigator.userAgent);
                $SS.location       = $SS.getLocation();
            }

            if (/^about:neterror/.test(document.documentURI) || $SS.location.sub != "boards") return;
            
            config                             = $SS.config.load();
            config["Small Font Size"]          = config["Font Size"] > 11 && !config["Bitmap Font"] ? 12 : config["Font Size"];
            config["Sidebar Position String"]  = config["Sidebar Position"] != 2 ? "right" : "left";
            config["Sidebar Position oString"] = config["Sidebar Position"] != 2 ? "left" : "right";
            config["Side Margin"]              = config["Layout"] == 2 ? Math.min(Math.max(20, config["Side Margin"]), 26) : config["Side Margin"];

            
            mascot = $SS.options.getMascot();
            theme  = $SS.options.getTheme();
                        
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
        getLocation: function(url)
        {
            var obj;
            
            if (typeof url === "string")
            {
                obj = document.createElement("a");
                obj.href = url;
            }
            else
                obj = window.location;
            
            var pathname = obj.pathname.substr(1).split("/");
            
            return {
                sub  : obj.hostname.split(".")[0],
                board: pathname[0],
                reply: pathname[1] == "res"
            };
        },
        
        /* STYLING & DOM */
        insertCSS: function()
        {
            if ($(document.head).exists())
                $(document).unbind("DOMNodeInserted", $SS.insertCSS);
            else return;
            
            $SS.bHideSidebar = (config["Sidebar Position"] == 3 ||
                                $SS.location.sub != "boards" ||
                                document.title == "Website is currently unreachable");
            
            css = "@import url(http://fonts.googleapis.com/css?family=PT+Sans+Narrow);*{font-family:" + $SS.FormatFont(config["Font"]) + "!important;font-size:" + config["Font Size"] + "px!important}*:focus{outline:none!important;-moz-outline:none!important;-moz-user-focus:none!important}input:not([disabled]):active,input:focus,select:focus,textarea:focus{box-shadow:inset " + theme.linkColor.hex +" 0 -1px 0,inset " + theme.linkColor.hex +" 0 1px 0,inset " + theme.linkColor.hex +" -1px 0 0,inset " + theme.linkColor.hex +" 1px 0 0}input::-moz-focus-inner{border:0;padding:0}::selection{background:" + theme.linkColor.hex + ";color:#" + (theme.linkColor.isLight ? "000" : "fff") +"!important}::-moz-selection{background:" + theme.linkColor.hex + ";color:#" + (theme.linkColor.isLight ? "000" : "fff") +"!important}" + (config["Style Scrollbars"] ? "::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track-piece,::-webkit-scrollbar-track{background:" + theme.brderColor.hex + "}::-webkit-scrollbar-corner,::-webkit-scrollbar-resizer{background:" + theme.brderColor.hex + "}::-webkit-scrollbar-thumb{background:rgb(" + theme.brderColor.shiftRGB(32, true) + ");border:2px solid " + theme.brderColor.hex + ";border-radius:5px}::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active{background:rgb(" + theme.brderColor.shiftRGB(64, true) + ")}::-webkit-scrollbar-thumb:window-inactive{}.reply ::-webkit-scrollbar-track,.reply ::-webkit-scrollbar-track-piece{border-radius:5px}": "") + "img{border:0!important}hr{border:0!important;border-top:1px solid rgba(" + theme.brderColor.rgb + ",.9)!important;clear:left;margin:0!important}h1,h2,h3,h4,h5{margin:.4em 0!important}h3,.commentpostername,.postername,.replytitle,body>center:nth-of-type(2)>font[color=red]>b,.pages b,.filetitle{font-weight:400!important}a{text-decoration:none!important;color:" + theme.linkColor.hex + "!important;font-weight:normal!important;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}a:hover{color:" + theme.linkHColor.hex + "!important;text-shadow:rgba(" + theme.linkHColor.rgb + ",.2) 0 0 2px!important}a:not([href]),a[href='javascript:;']{color:" + theme.jlinkColor.hex + "!important}.commentpostername,.postername,.commentpostername a,.postername a{color:" + theme.nameColor.hex + "!important}.postertrip,.trip{color:" + theme.tripColor.hex + "!important}.unkfunc{color:" + theme.quoteColor.hex + "!important}.filetitle,.replytitle{color:" + theme.titleColor.hex + "!important}a.linkmail[href='mailto:sage'],a.linkmail[href='mailto:sage']:hover,body[class*='chanx_']>#qr .warning,span[style='color:#F00000'],span[style='color:#FF0000;font-weight:normal']{color:" + theme.sageColor.hex + "!important;text-shadow:none!important}" + ( config["Pages Position"] != 2 ? ".pages td:nth-of-type(2)," : "") + (config["Layout"] == 2 ? ".replyhider," : "") + ".reply,.replyhl,.stub>a,.stub>.block>a,option,div[id*=jsMath],body[class*='chanx_']>#qr .warning,#imgControls,#imgControls #imageType,#jsMath_float>*,#watcher>div,.deletebuttons,.deletebuttons::before,.postarea,a.omittedposts{background:rgba(" + theme.mainColor.rgb + ",.9)!important}body>center:nth-of-type(2)>font[color=red],#header{background:" + theme.mainColor.hex + "!important}a,button,input[type=checkbox],input[type=radio],input[type=button],input[type=submit],#themeoptions #tMascot div,#themeoptions #tThemes>div,.pointer,.riceCheck,.trbtn{cursor:pointer}body,form[name=post] tr:nth-of-type(3)>td:nth-of-type(3),.pages td:nth-of-type(2),img[alt=closed],img[alt=sticky],body>span[style],body>span[style] a,body>a[href='.././'],body>a[style='cursor: pointer; float: right;'],.deletebuttons,#navtop,#navtopr,#qr>div.move,#imgControls>label,#qr input[name=upfile]+a,#qr #close,body[class*='chanx_']>#qr>form #spoilerLabel,.preview>label,.close,.remove,.reportbutton,.replyhider a,.op>a:first-child,.stub>a>span,.stub>.block>a>span{color:transparent!important;font-size:0!important}body[class*='chanx_']>#qr>.move,body>a[style='cursor: pointer; float: right;'],body[class*='chanx_']>#qr>form #spoilerLabel::after,button,form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input[type=button],input[type=submit],#imgControls label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,#qr .move::before,#stats .move,#themeoptions #tThemes>div p a,#updater span,#updater .move,#watcher .move,.deletebuttons::before,.logo font[size='1'],.pages td,.postarea form[name=post]::before,.preview>label::after,.riceFile div,.trbtn{text-transform:uppercase}body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump):focus+span,input:not([type=submit]),select,select *,textarea,#navlinks,#themeoptions label,#themeoptions label>span,#themeoptions #tMascot div a,#updater label,#updater span,.container *,.filesize span::after,.logo font[size='1'],.pages td:nth-of-type(2) *{font:" + config["Small Font Size"] + "px " + $SS.FormatFont(config["Font"]) + "!important}body>a[style='cursor: pointer; float: right;'],body[class*='chanx_']>#qr>form #spoilerLabel::after,button,form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input[type=button],input[type=submit],#imgControls label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,#stats .move,#updater span,#updater .move,#watcher .move,#qr #captchas,#qr #attach,#stats span,.deletebuttons::after,.pages td,.preview>label::after,.riceFile div{font-size:" + (config["Bitmap Font"] ? config["Font Size"] : 9) + "px!important}body>center:nth-of-type(2)>font[color=red]::before,body[class*='chanx_']>#qr>.move,#qr .move::before,#themeoptions #tMascot div a,#themeoptions #tThemes>div p a,#watcher>div>a:first-child,.commentpostername a.linkmail[href='mailto:sage']::after,.container::before,.deletebuttons::before,.postarea form[name=post]::before,.riceFile span,.trbtn{font-size:" + (config["Bitmap Font"] ? config["Font Size"] : 10) + "px!important}" + (config["Replace Reply Form"] ? "body>span[style]~.postarea,body>span[style]~#qr #close," : "") +(!config["Show Board Name"] ? ".logo span," : "") +(!config["Show Text Board"] ? ".logo font[size='1']," : "") +(!config["Show Logo"] ? ".logo img," : "") +(config["Post Form"] == 3 ? "body>span[style]~#qr>#autohide,body>span[style]~#qr>.riceCheck," : "") + (config["Layout"] == 2 ? "form[name=delform]>hr," : "") + "#recaptcha_tagline,td[align=right],img+br,#BF_WIDGET,.bf,.yui-g,#option-button,#recaptcha_table td:nth-of-type(2),#recaptcha_table td:nth-of-type(3),#hd,#ft,td small,#footer,.rules,body>br,body>hr,body[class*='chanx_']>#qr.fixed>.move #autohide,body[class*='chanx_']>#qr.fixed>.move .riceCheck,body>table[style='text-align:center;width:100%;height:300px;'],center font small,form[name=delform]>span[style],td.postblock,.thread>br:last-child,.deletebuttons br,table[width='100%'],form[name=delform]>br[clear],.logo>br,body>div[style*='center'],body>center:nth-of-type(1),body[class*='chanx_']>#qr>.move .close,form[name=delform]>center,.hidden,body>span[style]~form[name=delform]>br,body>a[href='.././']~form[name=delform]>br,body>span[style]~form[name=delform]>hr,form[name=delform] center+hr,center~form[name=delform] hr:nth-last-of-type(2),form[name=delform] hr:nth-last-of-type(1),[hidden],body>span[style]~#navlinks,#navtop,#navtopr,#navtop>a,#navtop>span,.pages,#imgControls #imageExpand,#imgControls #imageExpand+.riceCheck,#qp>a[href='javascript:;']:not([class]),.inline .reply>a:first-child,.postarea>h1,a[href='#bottom']{display:none!important}a.omittedposts,a.omittedposts:hover,blockquote>.abbr,body>center:nth-of-type(2)>font[color=red]::before,button,div,div.autohide>a,form[name=delform],form[name=post] input[name=email]+label,form[name=post] #com_submit+label,input:not(.jsColor),select,textarea,tr,body[class*='chanx_']>#qr>.move,body[class*='chanx_']>#qr>form #spoilerLabel::after,#qr .move::before,#navtopr span,#stats span,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,.deletebuttons::before,.deletebuttons::after,.omittedposts,.pages b,.pages td,.preview>label::after,.reply,.replyhl,.replymode{color:" + theme.textColor.hex + "!important}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:rgba(" + theme.textColor.rgb + ",.4)!important}input:-moz-placeholder,textarea:-moz-placeholder{color:rgba(" + theme.textColor.rgb + ",.4)!important}body{background:" + theme.bgImg.get() + theme.bgColor.hex +"!important;margin:" + (!$SS.bHideSidebar && config["Sidebar Position"] == 1 ? "0 265px 43px 0" : (!$SS.bHideSidebar ? "0 0 43px 265px" : "0 0 43px")) + "!important;padding:18px 0 0!important}" + (!$SS.bHideSidebar ? "body::before{background:rgba(" + theme.mainColor.shiftRGB(-18) + ",.8);border-" + config["Sidebar Position oString"] + ":2px solid rgba(" + theme.mainColor.rgb + ",.9);box-shadow:" + (config["Sidebar Position"] != 2 ? "inset " : "") + theme.brderColor.hex + " 1px 0 0," + (config["Sidebar Position"] == 2 ? "inset " : "") + theme.brderColor.hex + " -1px 0 0;content:'';height:100%;width:262px;position:fixed;top:-19px!important;z-index:1}body::after{" + (mascot.overflow ? "content:" + mascot.img.get() + ";" :"background:" + mascot.img.get() + ";content:'';height:100%;width:261px;" + (!mascot.small ? "background-size:contain;" : "")) + "bottom:21px!important;margin-bottom:" + mascot.offset + "px;position:fixed;z-index:2;" + (config["Sidebar Position"] == 2 && mascot.flip ? "-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-o-transform:scaleX(-1);" : "") + "}" : "") + "body::after,body::before,body>span[style]~#qr,body>center:nth-of-type(2)>font[color=red],#updater,#imgControls,#watcher,.postarea{" + (config["Sidebar Position"] != 2 ? "right:0!important;left:auto!important;" : "left:0!important;right:auto!important;") + "}" + (config["Layout"] == 2 ? ".op," : "") + "body[class*='chanx_']>#qr .warning,#jsmath_button,#jsMath_panel,#jsMath_float,#options ul,#qr,#themeoptions #toWrapper,#updater:hover,body>a[style='cursor: pointer; float: right;']+div,.reply,.replyhl,.stub>a,.stub>.block>a{border:1px solid " + theme.brderColor.hex + "!important}body>center:nth-of-type(2)>font[color=red],#imgControls{border-bottom:1px solid " + theme.brderColor.hex + "!important}" + (config["Sidebar Position"] == 3 ? "#imgControls," : "") + ".deletebuttons,body>center:nth-of-type(2)>font[color=red]{border-" + config["Sidebar Position oString"] + ":1px solid " + theme.brderColor.hex + "!important}" + (config["Sidebar Position"] == 3 ? "body>center:nth-of-type(2)>font[color=red]," : "") + "#updater{border-right:1px solid " + theme.brderColor.hex + "!important}.deletebuttons,.postarea,#header,#fs_data td{border-top:1px solid " + theme.brderColor.hex + "!important}#jsmath_button{bottom:auto!important;left:0!important;top:1px!important;right:auto!important}#jsMath_panel{bottom:auto!important;left:1em!important;top:1.75em!important;right:auto!important}" + (config["Layout"] != 2 ? ".thread:not(.stub),body>span[style]~form[name=delform]" : ".op") + "{background:rgba(" + theme.mainColor.rgb + ",.5)}.thread{clear:both;margin:1px" + (config["Layout"] == 1 ? (config["Sidebar Position"] != 2 ? " 0 1px 1px" : " 1px 1px 0") : (config["Layout"] == 2 ? " 0 1px" : "")) + "!important;padding:3px 0 0!important;position:relative;border-radius:" + (config["Layout"] != 3 ? (config["Sidebar Position"] != 2 ? "2px 0 0 2px" : "0 2px 2px 0") : "2px") + "}.thread::after,#updater div>label::after,form[name=delform] .op::after,#addMascot>label::after,#qr_form>div::after{clear:both;content:'';display:block}.op{border:0!important;padding-bottom:12px;position:relative;" + (config["Layout"] == 2 ? "border-radius:" + (config["Layout"] != 3 ? (config["Sidebar Position"] != 2 ? "2px 0 0 2px" : "0 2px 2px 0") : "2px") + ";" : "") + "}.op>a:first-child{" + (config["Layout"] != 2 ? "position:absolute;right:2px;top:0;" : "position:relative;top:-1px;") + "}form[name=delform]{" + (config["Layout"] != 2 ? "border:1px solid rgba(" + theme.brderColor.rgb + ",.9);" + (config["Layout"] == 1 ? "border-" + config["Sidebar Position String"] + ":0!important;" : "") : "") + "margin:" + (config["Layout"] != 3 ?(config["Sidebar Position"] != 2 ? "0 0 0 " + config["Side Margin"] + "px" : "0 " + config["Side Margin"] + "px 0 0") : "0 10% 0") + ";padding:0!important;position:relative;border-radius:" + (config["Layout"] != 3 ? (config["Sidebar Position"] != 2 ? "4px 0 0 4px" : "0 4px 4px 0") : "4px") + "}form[name=delform]>table,form[name=delform]>.thread>table{margin:1px 0 0;position:relative;width:100%}form[name=delform]>table:not(.pages){margin-left:" + (config["Sidebar Position"] != 2 ? 1 : -1) + "px!important}form[name=delform]>table:nth-last-of-type(3){margin-bottom:1px}body>span[style]~form[name=delform]>table,body>a[href='.././']~form[name=delform]>table{margin-left:0!important}body>span[style]~form[name=delform]>table:nth-last-of-type(3),body>a[href='.././']~form[name=delform]>table:nth-last-of-type(3){margin-bottom:0}body>span[style]~form[name=delform],body>a[href='.././']~form[name=delform]{padding:" + (config["Layout"] != 3 ? (config["Sidebar Position"] != 2 ? "4px 0 1px 1px" : "4px 1px 1px 0") : "4px 1px 1px") + "!important}body,body>a[style='cursor: pointer; float: right;']+div,td.reply,td.replyhl,.stub>a,.stub>.block>a,.thread.stub,.riceFile,.riceCheck,.logo span,.postarea,#qr,#themeoptions #tThemes .reply{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}" + (config["Layout"] == 2 ? ".op," : "") + ".reply,.replyhl,.stub>a,.stub>.block>a{" + (config["Layout"] != 3 && !(config["Sidebar Position"] != 2 && config["Layout"] == 2)? "border-" + config["Sidebar Position String"] + ":0!important;" : "") + "}.reply,.replyhl{display:inline-block;position:relative!important}.reportbutton{background-position:0 -16px;" + (config["Layout"] != 2 ? "position:absolute;right:14px;top:1px;" : "") + "}" + (config["Layout"] == 2 ? "td .reportbutton:" : ".inline .reportbutton,#qp .reportbutton") + "{position:static!important;vertical-align:top!important}td.reply input[type=checkbox],td.replyhl input[type=checkbox],td.reply .riceCheck,td.replyhl .riceCheck,.container,.op>a:first-child,.replyhider,.reportbutton{z-index:3!important}.inline{z-index:6!important;position:relative}.op>.reportbutton{top:0}.replyhider{position:absolute;" + (config["Layout"] != 2 ? "right:2px;top:2px;" : "left:-18px;padding:2px 0 2px 2px;top:7px;border-radius:4px 0 0 4px;") + "}.replyhider a,.op>a:first-child{background-position:-80px 0}.stub>a>span,.stub>.block>a>span{background-position:-80px -16px;position:relative;top:1px;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#qr input[name=upfile]+a,#qr #close,.close,.remove,.reportbutton,.replyhider a,.op>a:first-child,.stub>a>span,.stub>.block>a>span{margin:0!important;opacity:.5;text-indent:-9999px!important}#qr input[name=upfile]+a:hover,#qr #close:hover,.close:hover,.remove:hover,.reportbutton:hover,.replyhider a:hover,.op>a:first-child:hover,.stub>a:hover>span,.stub>.block>a:hover>span{opacity:.75}td.reply,td.replyhl{-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}td.reply>img,td.replyhl>img{vertical-align:middle}td.reply,td.replyhl,.stub,.stub>a,.stub>.block>a{padding:5px!important;" + (config["Layout"] != 2 ? "width:100%;" : (config["Sidebar Position"] != 2 ? "margin-right:1px!important;" : "")) + "border-radius:" + (config["Layout"] != 3 && !(config["Sidebar Position"] != 2 && config["Layout"] == 2) ?(config["Sidebar Position"] != 2 ? "2px 0 0 2px" : "0 2px 2px 0") : "2px") + "}td.replyhl,td.qphl{background:rgba(" + theme.linkColor.rgb + ",.2)!important;box-shadow:inset rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.3) 0 0 3px}.stub{margin:1px 0 0!important;padding:0!important}.thread.stub{margin:1px 0px!important;padding:0 " + (config["Sidebar Position"] != 2 ? "0 0 1px" : "1px 0 0") + "!important}.stub>a,.stub>.block>a{display:" + (config["Layout"] == 2 ? "inline-" : "") + "block;padding:7px}.container{" + (config["Backlinks Position"] != 1 ? "bottom:" + (config["Slim Replies"] ? 0 : 2) + "px;position:absolute;" + (config["Backlinks Position"] == 2 ? "right" : "left") + ":2px;z-index:1;" : "") + "margin-left:2px}" + (config["Backlinks Position"] != 1 ? ".container::before{color:rgba(" + theme.textColor.rgb + ",.4)!important;content:'REPLIES:';padding-right:2px}" : "") + ".container>a{color:" + theme.blinkColor.hex + "!important}.qphl{outline:none!important}#qp{background:rgb(" + theme.mainColor.shiftRGB(-8) + ")!important;border:1px solid rgba(" + theme.linkColor.rgb + ",.4)!important;margin:0 10px!important;max-width:65%;padding:5px 5px 20px;position:fixed!important;z-index:11!important;border-radius:3px}.inline td.reply{background:rgba(" + theme.mainColor.shiftRGB(-16) + ",.1)!important;border:1px solid rgba(" + theme.brderColor.rgb + ",.4)!important;padding:5px!important;border-radius:3px;box-shadow:rgba(0,0,0,.1) 0 5px 10px}.commentpostername a.linkmail[href='mailto:sage']::after{content:' (SAGE)'}" + (config["Neko/Sega Icons"] ? ".commentpostername a.linkmail[href$='neko']::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAMAAAAIRmf1AAACoFBMVEUAAABnUFZoUVddU1T6+PvFwLzn4eFXVlT/+vZpZGCgm5dKU1Cfnpz//flbWljr5uLp5OCalpNZWFb//f3r6+n28ff9+PRaVVH59Pr//vr38vj57/Dp7eyjn5zq8O5aVVJbYV9nVFhjUFRiWFlZVlFgZGOboJzm5uZhamfz9/bt8fDw6+drb26bl5j/8/lkX1z06uldWFS5r61UT0tfWlbDwr3Ew76moqNRTU7Mx8P75OpeY19pWl1XW1qzr6x5eHaLiojv7+1UT0xIU0uzqadVS0nV0MxkZGT5+PPk497///ra29Xq5eFtY2H28e2hnJignJlUUE1dXV2vrqxkY2FkYF/m3d5vZmfDuruhl5aZlJHx8O75+PZWVVP29vT/9fTj3trv6ubh5eRdXFqTkpBOTUtqZmX88/RMQ0T78vPEvr7HwcHDwsDq6ef///3Gx8H++fXEv7tZWVedmZZXXVudnJp0c3FZU1f79fnb1dlXUVVjXWFrZmy8t7359/qLj455e3q4s69vamZjX1zy4+avpaReWFz/+f1NR0vu6Ozp4+f48/lnYmi8ur3Iw7/69fHz7+xbV1SZmJZVUk1ZV1zq5ez++f/c196uqbDn4uj9+P7z7vRVVVXt6ORiXl/OycXHw8CPi4ihoJ5aWF3/+v/k3+axrLOsp67LzMZYU1m2sq9dWF5WUU1WUk/Au7eYlJGqpqObmphYVV749f7p5Or38fPu6OpiXFz38fH79vLz7urv6+hhYF5cWWKal6D//f/Z09Xg29exraqbl5RqaW6kpKTq5uPv7Of/+PDj29D//vP18Ozs5+OloJymoZ1ZVVJZWVlkYF2hnpmblIyspJmVjYKQi4enop5STUlRTUpcWUhqY1BgWT9ZUjhcV1NiXVkkhke3AAAABHRSTlMA5vjapJ+a9wAAAP9JREFUGBk9wA1EAwEAhuHv3dTQAkLiUlJFJWF0QDLFYDRXIMkomBgxNIYxhOk4wwCqQhQjxgxSGIsALFA5BiYbMZHajz1oJlx51sBJpf6Gd3zONcrqm/r1W8ByK0r+XV1LXyOLLnjW6hMGpu0u1IzPSdO17DgrGC6AadrVodGcDQYbhguP6wAvAaC0BRZQalkUQ8UQDz5tAof0XbejOFcV5xiUoCfjj3O/nf0ZbqAMPYmzU18KSDaRQ08qnfw+B2JNdAEQt2O5vctUGjhoIBU4ygPsj2Vh5zYopDK73hsirdkPTwGCbSHpiYFwYVVC/17pCFSBeUmoqwYQuZtWxx+BVEz0LeVKIQAAAABJRU5ErkJggg==');vertical-align:middle}.commentpostername a.linkmail[href$='sega']::after{content:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAALBAMAAAD2A3K8AAAAMFBMVEUAAACMjpOChImytLmdnqMrKzDIyM55dnkODQ94foQ7PkXm5Olsb3VUUVVhZmw8Sl6klHLxAAAAAXRSTlMAQObYZgAAANFJREFUGJVjYIACRiUlJUUGDHBk4syTkxQwhO3/rQ/4ZYsuymi3YEFUqAhC4LCJZJGIi1uimKKjk3KysbOxsaMnAwNLyqoopaXhttf2it1anrJqke1pr1DlBAZhicLnM5YXZ4RWlIYoezx0zrjYqG6czCDsYRzxIko6Q/qFaKy0690Ij0MxN8K2MIhJXF+hsfxJxuwdpYGVaUU3Mm5bqgKFOZOFit3Vp23J3pgsqLxFUXpLtlD5bgcGBs45794dn6mkOVFQUOjNmXPPz8ysOcAAANw6SHLtrqolAAAAAElFTkSuQmCC');vertical-align:middle}" : "") + "a.omittedposts{display:inline-block;height:14px;margin:" + (config["Layout"] == 2 ? "-10px 10px -2px" : "-16px 10px 0") + "!important;padding:1px 6px 2px;position:" + (config["Layout"] == 2 ? "relative" : "absolute") + ";border-radius:3px 3px 0 0}.deletebuttons{bottom:20px!important;height:22px;overflow:hidden;padding:1px 2px 0 18px!important;position:fixed;" + (config["Sidebar Position"] == 3 ? "right:261px;z-index:11;" : config["Sidebar Position String"] + ":264px;z-index:4;") + "width:0;white-space:nowrap;" + (config["Layout"] != 1 ? "border-radius:" + (config["Sidebar Position"] != 2 ? "3px 0 0 0" : "0 3px 0 0") : "") + ";-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deletebuttons:hover{" + (config["Sidebar Position"] != 2 ? "padding-left:2px!important;" : "padding-left:0!important;padding-right:3px!important;") + "width:238px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}.deletebuttons::before{content:'X';display:inline-block;position:absolute;left:0;top:0;width:20px;height:24px;text-align:center;padding-top:1px}.deletebuttons:hover::before{overflow:hidden;white-space:nowrap;padding:0;width:0}.deletebuttons::after{content:'FILE ONLY';position:absolute;bottom:0;right:" + (config["Sidebar Position"] != 2 ? 120 : 122) + "px;line-height:24px}.deletebuttons *{visibility:visible!important}.deletebuttons input[type=checkbox],.deletebuttons .riceCheck{margin:2px!important;position:absolute;right:" + (config["Sidebar Position"] != 2 ? 103 : 105) + "px;bottom:4px!important;top:auto!important}.deletebuttons input:not([type=checkbox]){height:20px!important;margin:0 1px 0 0!important}.deletebuttons input[type=password]{margin-left:4px!important;width:138px}.deletebuttons:hover input[type=password]{margin-left:0!important}table,td{border:0!important;border-spacing:0!important;table-layout:fixed!important}tr,.replymode{background-color:transparent!important}tr[height='73']{height:auto!important}#recaptcha_div{height:auto!important}#recaptcha_table #recaptcha_image{background-color:transparent!important;margin-left:0!important;border:0!important}.postarea .recaptcha_input_area{margin-top:1px!important;padding-top:1px!important}#recaptcha_image img,#qr img[src*='recaptcha/api']{height:57px!important;margin-top:1px!important}#recaptcha_table tr td,.recaptcha_input_area{padding:0!important}.recaptcha_image_cell{padding-right:2px!important}blockquote{margin:0!important;padding:" + (config["Slim Replies"] ? (config["Backlinks Position"] != 1 ? 8 : 4) + "px 16px" : "12px 12px 24px 40px") + "!important}blockquote>div[style]{border-color:" + theme.sageColor.hex + "!important}div.reply{border:0!important;margin:0!important;z-index:2!important}form[name=delform] .filesize+br+a[target='_blank'] img{float:left;margin:2px 24px " + (!config["Slim Replies"] ? 24 : 6) + "px!important}form[name=delform] .filesize+br+a[target='_blank'] img+img{margin:0 0 20px!important;position:relative;z-index:10!important}form[name=delform] .filesize+br+a[target='_blank'] img+img{background-color:rgba(" + theme.mainColor.rgb + ",.01)!important}img[alt=closed],img[alt=sticky],body>span[style] a,body>a[href='.././'],body>a[style='cursor: pointer; float: right;'],#imgControls>label,#qr input[name=upfile]+a,#qr #close,.close,.remove,.reportbutton,.replyhider a,.op>a:first-child,.stub>a>span,.stub>.block>a>span{background-image:" + theme.icons.get() + "!important;background-color:transparent!important;background-repeat:no-repeat;display:inline-block;height:0!important;padding-top:16px!important;vertical-align:bottom;width:16px!important}img[alt=closed]{background-position:0 0!important}img[alt=sticky]{background-position:-16px 0!important}.inputtext,textarea{margin:0;padding:1px 4px}input[type=file]{height:22px!important;margin:0}.inputtext:not(textarea),#qr input[form=qr_form]{height:22px!important}#qr .inputtext,#qr .riceFile,#qr input[type=file],#qr input[name=recaptcha_response_field]{margin-top:1px!important;width:255px!important}#qr img[src*='recaptcha/api']{width:253px!important}#qr input[name=sub]{width:203px!important;margin-right:1px!important}#recaptcha_image,.postarea .inputtext,.postarea .riceFile,.postarea input[type=file],.postarea input[name=recaptcha_response_field],body>span[style]~#qr .inputtext,body>span[style]~#qr .riceFile,body>span[style]~#qr input[type=file],body>span[style]~#qr input[name=recaptcha_response_field]{margin-top:1px!important;width:255px!important}.postarea table td:last-of-type,#recaptcha_table td:first-of-type{max-width:255px!important;min-width:255px!important}.postarea img[src*='recaptcha/api'],body>span[style]~#qr img[src*='recaptcha/api']{width:253px!important}.postarea input[name=sub],body>span[style]~#qr input[name=sub]{width:204px!important;margin-right:1px!important}textarea,button,input:not([type=checkbox]):not([type=radio]),select,.riceFile,input#recaptcha_response_field,#recaptcha_image img,#qr img[src*='recaptcha/api']{border:1px solid " + theme.inputbColor.hex + "!important}button,input[type=button],input[type=file],input[type=password],input[type=submit],input[type=text]:not(.jsColor),input#fs_search,input.field,select,textarea,.riceFile,#options input{background:rgba(" + theme.inputColor.rgb + ",.9)!important}input[type=file]::-webkit-file-upload-button{background:rgba(" + theme.inputColor.rgb + ",.9)!important;border:0!important;border-right:1px solid transparent!important;font-size:8px!important;text-transform:uppercase!important;padding:0 5px!important;width:auto!important;vertical-align:bottom;height:20px!important;color:" + theme.textColor.hex + "!important;cursor:pointer;margin:0!important;-webkit-transition:background .1s ease-in-out;-moz-transition:background .1s ease-in-out;-o-transition:background .1s ease-in-out}input[type=file]::-webkit-file-upload-button:hover{background:rgba(" + theme.inputColor.hover + ",.9)!important}button,input:not(.jsColor),select,textarea,.riceFile input~div{-webkit-transition:background .2s linear,box-shadow .2s linear;-moz-transition:background .2s linear,box-shadow .2s linear;-o-transition:background .2s linear,box-shadow .2s linear}button:hover,input[type=button]:hover,input[type=password]:hover,input[type=submit]:hover,input[type=text]:not(.jsColor):not([disabled]):hover,input#fs_search:hover,input.field:hover,select:hover,textarea:hover,#options input:hover,.riceFile input:hover~div{background:rgba(" + theme.inputColor.hover + ",.9)!important;-webkit-transition:background .2s linear,box-shadow .2s linear;-moz-transition:background .2s linear,box-shadow .2s linear;-o-transition:background .2s linear,box-shadow .2s linear}input[type=password]:hover,input[type=text]:not([disabled]):hover,input#fs_search:hover,input.field:hover,select:hover,textarea:hover,#options input:hover{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px}input[type=password]:focus,input[type=text]:focus,input#fs_search:focus,input.field:focus,select:focus,textarea:focus,#options input:focus{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px, inset " + theme.linkColor.hex +" 0 -1px 0,inset " + theme.linkColor.hex +" 0 1px 0,inset " + theme.linkColor.hex +" -1px 0 0,inset " + theme.linkColor.hex +" 1px 0 0!important}textarea:focus,input[type=text]:not(.jsColor):not([disabled]):focus,input[type=password]:focus,input#fs_search:focus,input.field:focus,#options input:focus{background:-webkit-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;background:-moz-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;background:-o-linear-gradient(top,rgba(" + (theme.inputColor.isLight ? theme.inputColor.hover : theme.inputColor.rgb) + ",.9),rgba(" + (theme.inputColor.isLight ? theme.inputColor.rgb : theme.inputColor.hover) + ",.9))!important;-webkit-transition:box-shadow .2s linear;-moz-transition:box-shadow .2s linear;-o-transition:box-shadow .2s linear}button,input[type=button],input[type=submit],.riceFile div{height:22px!important;margin-top:1px!important;padding:0!important;text-align:center!important;vertical-align:top;width:50px}input[type=checkbox],input[type=radio],.riceCheck{background:rgba(" + theme.inputColor.rgb + ",.9)!important;border:1px solid rgb(" + theme.inputbColor.rgb + ")!important;display:inline-block;height:12px!important;margin:3px;position:relative;vertical-align:top;width:12px!important;border-radius:2px!important;-webkit-appearance:none;-webkit-transition:background .1s linear;-moz-transition:background .1s linear;-o-transition:background .1s linear}input[type=radio]{border-radius:10px!important}input[type=checkbox],.riceCheck{box-shadow:rgba(" + theme.mainColor.shiftRGB(64) + ",.3) 0 1px}input[type=checkbox]:hover,input[type=radio]:hover,.riceCheck:hover{background:rgba(" + theme.inputColor.hover + ",.9)!important}input[type=checkbox]:checked,input[type=checkbox]:checked+.riceCheck{box-shadow:inset rgba(0,0,0,.2) 0 1px 2px,rgba(" + (theme.mainColor.isLight ? "255,255,255" : "100,100,100")  + ",.6) 0 1px}input[type=radio]:checked{background:rgba(" + theme.inputColor.shiftRGB(40, true) + ",.9)!important;box-shadow:inset rgba(" + theme.inputColor.shiftRGB(100, true) + ",.2) 0 0 1px!important}input[type=checkbox]::before,input[type=radio]::before,input[type=checkbox]+.riceCheck::before{content:'';display:block;height:8px;margin:1px;opacity:0;width:8px;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out}input[type=checkbox]:checked::before,input[type=radio]:checked::before,input[type=checkbox]:checked+.riceCheck::before{opacity:1}input[type=checkbox]:checked::before,input[type=checkbox]:checked+.riceCheck::before{background:" + theme.checkMark.get() + "!important}input[type=radio]:checked::before{background:" + theme.radioCheck.get() + " transparent!important}input[type=checkbox]:active,input[type=radio]:active,.riceCheck:active{background:rgba(" + theme.inputColor.shiftRGB(40, true) + ",.9)!important;box-shadow:inset rgba(" + theme.inputColor.shiftRGB(100, true) + ",.4) 0 0 3px,rgba(" + theme.mainColor.shiftRGB(64) + ",.6) 0 1px!important}td.reply input[type=checkbox],td.replyhl input[type=checkbox],td.reply .riceCheck,td.replyhl .riceCheck{margin-left:0!important;position:relative}span.filesize~input[type=checkbox],span.filesize~.riceCheck{top:2px}input[name=recaptcha_response_field],input#recaptcha_response_field{height:22px!important;padding:1px 4px!important}textarea{margin:0!important}td.doubledash{padding:0;text-indent:-9999px}.logo{position:fixed;" + config["Sidebar Position String"] + ":1px;text-align:center;top:" + (!config["Show Logo"] ? 1 : "") + "20px}.logo,.logo img,.logo span{width:259px!important}.logo img{height:auto!important;margin:0!important;opacity:.5;position:relative;z-index:1;-webkit-box-reflect:below 0 -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(.1,transparent),to(rgba(255,255,255,.5)))}.logo::after{background-image:-moz-element(#logo);bottom:-100%;content:'';left:0;mask:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KCTxkZWZzPg0KCQk8bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJncmFkaWVudCIgeDI9IjAiIHkyPSIxIj4NCgkJCTxzdG9wIHN0b3Atb2Zmc2V0PSIwIi8+DQoJCQk8c3RvcCBzdG9wLWNvbG9yPSJ3aGl0ZSIgb2Zmc2V0PSIxIi8+DQoJCTwvbGluZWFyR3JhZGllbnQ+DQoJCTxtYXNrIGlkPSJtYXNrIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBtYXNrQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+DQoJCQk8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPg0KCQk8L21hc2s+DQoJPC9kZWZzPg0KPC9zdmc+#mask');opacity:.6;position:absolute;right:0;top:100%;z-index:1;-moz-transform:scaleY(-1)}.logo span{bottom:-16px;cursor:default!important;display:block;font-family:'PT Sans Narrow',sans-serif!important;font-size:28px!important;height:36px;letter-spacing:-1px;padding:0 10px;position:absolute;text-align:center;text-shadow:" + theme.mainColor.hex + " -1px -1px," + theme.mainColor.hex + " 1px -1px," + theme.mainColor.hex + " -1px 1px," + theme.mainColor.hex + " 1px 1px,rgba(0,0,0,.6) 0 2px 4px,rgba(0,0,0,.6) 0 0 10px;z-index:3}.logo span::selection{background:transparent!important}.logo span::-moz-selection{background:transparent!important}.logo font[size='1']{left:0;position:absolute;text-shadow:" + theme.mainColor.hex + " -1px -1px," + theme.mainColor.hex + " 1px -1px," + theme.mainColor.hex + " -1px 1px," + theme.mainColor.hex + " 1px 1px,rgba(0,0,0,.2) 0 0 10px,#000 0 1px 5px,#000 0 -1px 5px;top:98px;width:100%;z-index:3}.logo font[size='1']>a{text-transform:none!important;text-shadow:" + theme.mainColor.hex + " -1px -1px," + theme.mainColor.hex + " 1px -1px," + theme.mainColor.hex + " -1px 1px," + theme.mainColor.hex + " 1px 1px,rgba(0,0,0,.2) 0 0 10px,#000 0 1px 5px,#000 0 -1px 5px!important}div.autohide>a[title='Auto-hide dialog box']{text-decoration:underline!important}.op .filesize{display:inline-block!important;margin:2px " + (config["Layout"] != 2 ? 6 : 0) + "px!important}.inline .filesize{margin:2px 0!important}.filesize span{font-size:0!important;visibility:hidden}.filesize span::after{content:attr(title);visibility:visible}input:not([type=checkbox]):not([type=radio]),button,select,textarea{-webkit-appearance:none;-o-appearance:none}#watcher .move,#updater .move,#options .move,#stats .move,body[class*='chanx_']>#qr>.move{cursor:default!important}#watcher{background:none!important;bottom:auto!important;position:fixed!important;max-width:" + (config["Auto Hide Thread Watcher"] ? 200 : 261) + "px!important;min-width:" + (config["Auto Hide Thread Watcher"] ? 0 : 261) + "px!important;text-align:" + config["Sidebar Position String"] + ";z-index:4!important;-webkit-transition:max-width .1s linear .1s,min-width .1s linear .1s;-moz-transition:max-width .1s linear .1s,min-width .1s linear .1s;-o-transition:max-width .1s linear .1s,min-width .1s linear .1s}" + (config["Auto Hide Thread Watcher"] ? "#watcher:hover{padding-bottom:16px;max-width:261px!important;min-width:261px!important;-webkit-transition:none;-moz-transition:none;-o-transition:none}" : "") + "#watcher .move{display:inline-block;margin:0 5px;padding:2px 5px!important;text-align:center;text-decoration:none!important;border-radius:0 0 3px 3px}#watcher>div:not(.move){line-height:15px;margin:0 5px;" + (config["Auto Hide Thread Watcher"] ? "max-height:0px;max-width:0!important;" : "max-width:100%!important;") + "padding:0 5px!important;text-align:left!important;-webkit-transition:max-height .1s linear,max-width .1s linear .1s,padding .1s linear;-moz-transition:max-height .1s linear,max-width .1s linear .1s,padding .1s linear;-o-transition:max-height .1s linear,max-width .1s linear .1s,padding .1s linear}#watcher" + (config["Auto Hide Thread Watcher"] ? ":hover" : "") + ">div:not(.move):nth-of-type(2){margin-top:3px;padding-top:5px!important;border-top-left-radius:3px;border-top-right-radius:3px}#watcher" + (config["Auto Hide Thread Watcher"] ? ":hover" : "") + ">div:not(.move):last-child{padding-bottom:5px!important;border-bottom-left-radius:3px;border-bottom-right-radius:3px}#watcher" + (config["Auto Hide Thread Watcher"] ? ":hover" : "") + ">div:not(.move){max-height:16px;max-width:100%!important;padding:1px 5px!important;-webkit-transition:max-height .1s linear,max-width 0s linear,padding .1s linear;-moz-transition:max-height .1s linear,max-width 0s linear,padding .1s linear;-o-transition:max-height .1s linear,max-width 0s linear,padding .1s linear}#watcher,body>a[style='cursor: pointer; float: right;']{top:19px!important}#overlay,#overlay2{background:rgba(0,0,0,.5);position:fixed;top:0;left:0;height:100%;width:100%;text-align:center;z-index:999!important}#overlay::before,#overlay2::before{content:'';display:inline-block;height:100%;vertical-align:middle}#addMascot,#addTheme,#themeoptions{display:inline-block;text-align:right!important;width:600px;padding:5px;vertical-align:middle}#themeoptions>div{padding:5px}.trbtn{color:" + theme.jlinkColor.hex + ";display:inline-block;line-height:18px;margin:0 2px;min-width:40px;padding:2px 10px;text-align:center;background:-webkit-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));background:-moz-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));background:-o-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(20) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));border-radius:3px;box-shadow:rgba(0,0,0,.3) 0 0 2px}.trbtn:hover,#selectImage>input[type=file]:hover+.trbtn{background:rgba(60,60,60,.9);background:-webkit-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));background:-moz-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9));background:-o-linear-gradient(top,rgba(" + theme.mainColor.shiftRGB(40) + ",.9),rgba(" + theme.mainColor.rgb + ",.9))}.trbtn:active,#selectImage>input[type=file]:active+.trbtn{box-shadow:inset rgba(0,0,0,.3) 0 0 2px,rgba(0,0,0,.3) 0 0 2px}.trbtn-small{padding:2px 5px;min-width:30px}#themeoptions #toNav{list-style:none;margin:0;padding:0;position:absolute;top:-26px}#themeoptions #toNav li{float:left;margin:0;padding:0}#themeoptions #toNav li label{background:rgba(" + theme.mainColor.shiftRGB(-10) + ",.9);color:#888!important;display:block;height:16px;line-height:16px;margin:0 2px;padding:5px 10px;text-align:center;width:75px;border-radius:5px 5px 0 0;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#themeoptions #toWrapper{background:rgba(" + theme.mainColor.shiftRGB(-96) + ",.3);box-shadow:inset rgba(0,0,0,.3) 0 0 5px,rgba(" + theme.mainColor.shiftRGB(32) + ",.6) 0 1px 3px;border-radius:5px}#themeoptions #toWrapper,#themeoptions #toWrapper>div{height:400px}#themeoptions #toWrapper>div{overflow:auto}#themeoptions #toWrapper>[name=toTab]:not(:checked)+div{display:none}#updater label,#themeoptions #tMain label,#themeoptions #tNavLinks>div{display:block;border-bottom:1px solid rgba(" + theme.mainColor.rgb + ",.3);border-top:1px solid rgba(0,0,0,.1);height:20px;padding:0 3px;vertical-align:top}.deletebuttons::before,#updater label,#themeoptions #tMain label span{line-height:20px!important}#themeoptions #tMain label:first-child,#updater div:first-child label{border-top:0!important}#themeoptions #tMain label:last-child,#updater div:nth-last-of-type(3) label{border-bottom:0!important}#themeoptions #tMain label:hover{border-left:2px solid " + theme.mainColor.hex + "}#themeoptions #tMain select[name=Font] option{max-width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#updater label:hover,#addMascot label:hover>span{border-left:2px solid rgba(" + theme.mainColor.shiftRGB(-32, true) + ",.6)}#themeoptions #tThemes>div{opacity:.5;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out}#themeoptions #tThemes>div:hover,#themeoptions #tThemes>div.selected{opacity:1}#themeoptions #tThemes .reply{margin:2px 0!important;padding:2px!important;text-align:left;width:100%;border-radius:2px!important}#themeoptions #tThemes>div p{bottom:4px;right:2px;margin:0;opacity:0;position:absolute;z-index:3;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}#themeoptions #tThemes>div:hover p{opacity:1}#themeoptions #tThemes>div p a{display:inline-block;margin:0 2px;padding:2px 5px;text-align:center;width:50px;border-radius:3px}#themeoptions #tThemes>div h3{bottom:0;font-size:32px!important;margin:0!important;opacity:0;position:absolute;right:300px;-webkit-transition:all .4s ease-in-out;-moz-transition:all .4s ease-in-out;-o-transition:all .4s ease-in-out}#themeoptions #tThemes>div.selected h3{opacity:1;right:3px;z-index:1}#themeoptions #tMascot{text-align:center}#themeoptions #toWrapper>div>p{bottom:10px;left:10px;position:absolute}#themeoptions #toWrapper>div>p{margin:0}#themeoptions #tMascot div{background-position:center top!important;background-size:cover!important;display:inline-block;position:relative;margin:2px;width:185px;height:257px;border-radius:10px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}#themeoptions #tMascot div:hover{background-color:rgba(" + theme.linkColor.rgb + ",.2)!important}#themeoptions #tMascot div.selected{background-color:rgba(" + theme.linkColor.rgb + ",.6)!important;box-shadow:inset rgba(0,0,0,.15) 0 0 15px, rgba(" + theme.linkColor.rgb + ",.6) 0 0 2px}#themeoptions #tMascot div a{position:absolute;top:0;padding:5px 8px;background:rgba(0,0,0,.3)}#themeoptions #tMascot div a:not([href]):hover{background:rgba(0,0,0,.5)}#themeoptions #tMascot div a[title=Delete]{left:0;border-radius:10px 0 10px 0}#themeoptions #tMascot div a[title=Edit]{right:0;border-radius:0 10px 0 10px}#themeoptions #tNavLinks>div{height:24px;padding-top:1px}#themeoptions #tNavLinks label{margin:0 5px;position:relative;top:1px}#themeoptions #tNavLinks label:first-child{float:left}#themeoptions #tNavLinks label:first-child>input[type=text]{width:130px}#themeoptions #tNavLinks label>input[type=text]{width:180px}#themeoptions label>span{float:left}#themeoptions label>input[type=checkbox],#themeoptions label>.riceCheck{margin:4px 2px 0!important;vertical-align:bottom!important}#themeoptions label>select,#themeoptions label>input[type=text]{width:125px}#themeoptions input[type=text],#themeoptions select{height:20px;margin:0!important;padding:1px 3px!important}#themeoptions select{padding:1px 1px 1px 0!important}#themeoptions textarea{background:transparent!important;border:0!important;height:100%!important;width:100%!important;resize:none}#addMascot{width:350px!important}#addMascot>div{padding:5px}#addMascot>label{display:block}#addMascot>label>span,#addTheme>label>span{float:left;line-height:22px;padding-left:5px}#addMascot>label>input[type=text],#addMascot>label>select,#addMascot>label>textarea{margin-top:1px!important;width:200px}#addMascot select[name=mPosition],#addMascot input[name=mOffset][type=text]{width:80px}#addMascot>label>textarea{height:20px;line-height:20px;overflow:hidden;resize:none}#addMascot>label>input[type=checkbox],#addMascot>label>.riceCheck{margin-top:5px}#selectImage{float:left;height:24px!important;margin-top:-2px;padding-top:2px}#selectImage>input[type=file]{-webkit-transform:translateX(-500px) scale(10)!important;-moz-transform:translateX(-500px) scale(10)!important;-o-transform:translateX(-500px) scale(10)!important}a[name=clearIMG]{display:none;float:left;opacity:0;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}input[name=customIMGB64]+a[name=clearIMG]{display:inline-block;opacity:1}#addTheme{text-align:left!important;width:500px!important}#addTheme>label{display:inline-block;text-align:right;width:50%}#addTheme>label#customCSS{width:100%}#addTheme>label#customCSS>textarea{height:100px;resize:vertical;width:100%}#addTheme>label>input[type=text],#addTheme>label>select{width:100px}#addTheme>div{margin-top:.6em;text-align:right}#themeoptions,#options.dialog,#themeoptions #toNav li label.selected,#themeoptions #toNav li label:hover,#addMascot,#addTheme{background:rgba(" + theme.mainColor.rgb + ",.98)!important;text-align:center}#options.dialog,#themeoptions,#addMascot,#addTheme{margin:0 auto!important;text-align:left;box-shadow:rgba(0,0,0,.6) 0 0 10px;border-radius:5px}#options{width:600px!important}#options hr{margin:3px 0!important}#options button{vertical-align:baseline!important;width:auto!important}#options input{width:150px}#options ul{margin-right:5px;padding:2px 5px!important;border-radius:5px;box-shadow:inset rgba(" + (theme.mainColor.isLight ? "255,255,255" : "155,155,155") + ",.3) 0 0 5px}#imgControls{height:18px;position:fixed!important;top:0;width:115px!important;padding-" + config["Sidebar Position String"] + ":147px!important;z-index:6}#imgControls #imageType{border:0!important;line-height:16px!important;margin:0!important;height:18px!important;padding:1px 1px 1px 0;width:77px!important}#imgControls>label{background-position:-48px -16px;content:'';float:right;margin:1px;overflow:hidden}#imgControls>label.imgExpanded{background-position:-48px 0}body>a[style='cursor: pointer; float: right;']form[name=post] input[name=email]+label,form[name=post] #com_submit+label,body[class*='chanx_']>#qr>form #spoilerLabel::after,#imgControls label,#qr input[name=upfile]+a,#qr #captchas,#qr #attach,#stats .move,#updater span,#updater .move,#watcher .move,.preview>label::after{line-height:16px}.postarea table,.postarea table td{padding:0!important;border-spacing:0!important;border-collapse:collapse!important}.postarea,body>span[style]~#qr,body[class*='chanx_']>#qr{margin-bottom:21px!important;padding:3px;top:auto!important;" + config["Sidebar Position String"] + ":0!important;" + config["Sidebar Position oString"] + ":auto!important;" + (config["Post Form"] == 1 ? "bottom:-252px;-webkit-transition:bottom .2s ease-in-out 1s;-moz-transition:bottom .2s ease-in-out 1s;-o-transition:bottom .2s ease-in-out 1s;" :(config["Post Form"] == 2 ? "bottom:0!important;opacity:.2;-webkit-transition:opacity .2s ease-in-out 1s;-moz-transition:opacity .2s ease-in-out 1s;-o-transition:opacity .2s ease-in-out 1s;" : "bottom:0!important;")) + "}.postarea,#qr{margin:0!important;position:fixed!important;width:261px!important;z-index:" + (config["Post Form"] == 1 ? 11 : 5) + "!important}.postarea:hover,body>span[style]~#qr:hover,body[class*='chanx_']>#qr:hover,#qr.focus{bottom:0!important;" + (config["Post Form"] == 1 ? "-webkit-transition:bottom .2s ease-in-out;-moz-transition:bottom .2s ease-in-out;-o-transition:bottom .2s ease-in-out;" :(config["Post Form"] == 2 ? "opacity:1!important;-webkit-transition:opacity .2s ease-in-out;-moz-transition:opacity .2s ease-in-out;-o-transition:opacity .2s ease-in-out;" : "")) + "}.postarea form[name=post]{margin:0!important}.postarea form[name=post]::before{display:block;height:18px!important;text-align:center;content:'NEW THREAD'}body>span[style]~.postarea form[name=post]::before{display:block;height:18px;padding-top:1px;text-align:center;content:'QUICK REPLY'}form[name=post] #com_submit+label{position:absolute;top:48px;right:8px}form[name=post] input[name=email]+label{position:absolute;right:6px;top:3px}.postarea textarea,#qr textarea{min-height:120px;resize:vertical;-webkit-transition:background .2s linear,box-shadow .2s linear,width .2s ease-in-out!important;-moz-transition:background .2s linear,box-shadow .2s linear,width .2s ease-in-out!important;-o-transition:background .2s linear,box-shadow .2s linear,width .2s ease-in-out!important}" + (config["Sidebar Position"] != 2 ? ".postarea textarea,body[class*='chanx_']>#qr textarea,body>span[style]~#qr textarea{float:right}" : "") + ".postarea textarea:focus,body[class*='chanx_']>#qr textarea:focus,body>span[style]~#qr textarea:focus,body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump):focus{position:relative;" + (config["Expanding Form Inputs"] ? "width:415px!important;" : "") + "z-index:1;-webkit-transition:box-shadow .2s linear,width .2s ease-in-out!important;-moz-transition:box-shadow .2s linear,width .2s ease-in-out!important;-o-transition:box-shadow .2s linear,width .2s ease-in-out!important}#qr{height:auto!important;overflow:hidden!important;width:262px!important}#qr .move{cursor:move!important;padding:3px!important}body>span[style]~#qr{border:0!important;border-top:1px solid " + theme.brderColor.hex + "!important;overflow:visible!important;width:261px!important}body>span[style]~#qr div.move{cursor:default!important;padding:0!important}#qr>#autohide,#qr>.riceCheck{float:right;top:3px}body>span[style]~#qr>#autohide,body>span[style]~#qr>.riceCheck{top:0}#qr #autohide:checked~.autohide{height:0!important;overflow:hidden!important;padding:0!important}#qr:not(:hover) #autohide:checked~div.move>input{display:none}#qr div.move>input{display:inline-block;margin-top:3px!important}body>span[style]~#qr #autohide:checked~div.move>input{display:inline}body>span[style]~#qr .autohide,body>span[style]~#qr #autohide:checked~.autohide,#qr .autohide,#qr:hover #autohide:checked~.autohide{height:auto!important;overflow:visible!important}#qr .autohide,#qr:hover #autohide:checked~.autohide{padding:3px!important}body>span[style]~#qr .autohide,body>span[style]~#qr #autohide:checked~.autohide{padding:0!important}#qr #files>div,#qr .autohide>div,#qr .autohide>form>div{position:relative}#qr #captchas,#qr #attach{line-height:20px;position:absolute;right:6px;top:2px;z-index:2}#qr #close{margin-top:4px!important}body>span[style]~#qr>#close{margin-top:1px!important}#qr input[name=upfile]+a,#qr #close,.close,.remove{background-position:-16px -16px}#qr div.move{height:18px!important;line-height:16px;text-align:center!important}#qr div.move::before{content:'QUICK REPLY';display:block;margin:0 auto;width:75%}#qr #com_submit+label{bottom:auto!important;top:3px;right:56px}#updater{" + (config["Sidebar Position"] != 2 ? "border-left:1px solid " + theme.brderColor.hex + "!important;text-align:right!important;left:auto!important;right:0!important;" : "text-align:left!important;left:0!important;right:auto!important;") + "position:fixed!important;bottom:auto!important;top:0!important;height:18px;line-height:18px;max-height:18px!important;overflow:hidden;padding:0 3px;z-index:11!important;width:140px;-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}#updater:hover{border-top:0!important;border-" + config["Sidebar Position String"] + ":0!important;height:auto!important;max-height:180px!important;padding-bottom:3px}#updater #count.new{background-color:transparent!important}#updater label{text-align:left!important}#updater input,#updater .riceCheck{float:right}#updater input:not([type=checkbox]){margin:1px!important}#updater input[type=button]{margin-right:3px!important;padding:0 5px!important;width:auto!important}#updater input[type=text]{height:19px!important;width:40px!important}#updater:not(:hover){background:transparent!important}#stats{bottom:auto!important;height:18px;line-height:18px;top:0!important;z-index:8!important;" + (config["Sidebar Position"] != 2 ? "right:43px!important;left:auto!important;text-align:left;" : "right:auto!important;left:43px!important;text-align:right;") + "width:100px}#navlinks{" + (config["Sidebar Position"] != 2 ? "right:5px;" : "left:5px;right:auto!important;") + "top:0!important;height:20px;line-height:16px;z-index:6!important}#ihover{padding-bottom:21px;z-index:8!important}body>center:nth-of-type(2){position:relative}*[color=red]{color:#f66!important}body>center:nth-of-type(2)>font[color=red]{max-height:18px;max-width:100px;overflow:hidden;padding:0 10px;position:absolute;" + (config["Sidebar Position"] == 3 ? "right:262px!important;" : "") + "top:-18px;white-space:nowrap;z-index:10;" + (config["Layout"] != 1 ? "border-radius:" + (config["Sidebar Position"] != 2 ? "0 0 0 3px " : "0 0 3px 0") : "") + ";-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out}body>center:nth-of-type(2)>font[color=red]::before{content:'ANNOUNCEMENT';display:block;line-height:18px}body>center:nth-of-type(2)>font[color=red]:hover{max-height:200px;max-width:600px;padding:0 10px 10px;white-space:normal;border-radius:" + (config["Sidebar Position"] != 2 ? "0 0 0 3px " : "0 0 3px 0") + "}#header{bottom:0!important;left:0!important;line-height:20px!important;height:20px!important;padding:0!important;position:fixed!important;text-align:center;top:auto!important;width:100%!important;z-index:12!important}#navtop,#navtopr{float:none!important;height:18px}#navtop a{text-shadow:rgba(0,0,0,.2) 0 0 3px}#navtop>div{line-height:20px}#navtopr{position:absolute;right:5px!important;top:0}" + (!config["Custom Navigation Links"] ? "#navtop{bottom:0;display:inline-block!important;height:20px;padding:3px 6px 6px;position:relative;width:500px;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out}#navtop::before{color:" + theme.jlinkColor.hex + ";content:'Navigation';display:block;font-size:" + config["Small Font Size"] + "px;line-height:14px!important}#navtop:hover{background:rgb(" + theme.mainColor.rgb + ");bottom:48px;height:64px;border-radius:3px;box-shadow:rgba(0,0,0,.2) 0 0 5px}#navtop>a{padding:2px!important}#navtop>a,#navtop>span{display:inline!important;line-height:18px}" : "") + ".pages{margin:0!important;position:fixed!important;visibility:hidden;width:auto!important;" + (config["Pages Position"] == 1 ? "height:20px!important;bottom:22px!important;" + (config["Sidebar Position"] != 2 ? "left:-375px;right:auto!important;" : "left:auto!important;right:-375px;") + "top:auto!important;z-index:13;-webkit-transition:" + config["Sidebar Position oString"] + " .1s ease-in-out 1s;-moz-transition:" + config["Sidebar Position oString"] + " .1s ease-in-out 1s;-o-transition:" + config["Sidebar Position oString"] + " .1s ease-in-out 1s;" :(config["Pages Position"] == 2 ? "background:transparent!important;height:20px!important;border:0!important;bottom:0!important;left:0!important;z-index:13!important;" :"bottom:17px!important;height:24px!important;" + config["Sidebar Position oString"] + ":0!important;z-index:2;-webkit-transform:rotate(" + (config["Sidebar Position"] != 2 ? -90 : 90) + "deg);-webkit-transform-origin:top " + config["Sidebar Position oString"] + ";-moz-transform:rotate(" + (config["Sidebar Position"] != 2 ? -90 : 90) + "deg);-moz-transform-origin:top " + config["Sidebar Position oString"] + ";-o-transform:rotate(" + (config["Sidebar Position"] != 2 ? -90 : 90) + "deg);-o-transform-origin:top " + config["Sidebar Position oString"] + ";")) + "}.pages *{font-size:" + config["Font Size"] + "px!important;visibility:visible}.pages td{" + ( config["Pages Position"] != 2 ? "padding:0 2px!important;" : "padding:0!important;") + "text-align:center}.pages td:nth-of-type(2){" + ( config["Pages Position"] != 2 ? "border-radius:4px;" : "") + "padding:0 5px!important}.pages b{font-weight:700!important}.pages a:not(:last-child),.pages b:not(:last-child){margin:0 2px}.pages input[type=submit]{" + (config["Pages Position"] != 2 ? "border-radius:4px;" : "") + "margin:0!important;padding:0 10px!important;width:50px!important;height:" + (config["Pages Position"] == 3 ? 24 : 20) + "px!important}" + (config["Pages Position"] == 1 ? ".pages:hover{" + config["Sidebar Position oString"] + ":0!important}.pages td:nth-of-type(2),.pages input[type=submit]{border:1px solid " + theme.brderColor.hex + "!important}" : (config["Pages Position"] == 2 ? ".pages input[type=submit],.pages input[type=submit]:hover{border:0!important}" : ".pages td:nth-of-type(2){border:1px solid " + theme.brderColor.hex + "!important}")) + (config["Pages Position"] == 1 && config["Sidebar Position"] == 2 ? ".pages td:nth-of-type(3){left:-53px;position:absolute;top:0}" : "" ) + "body>a[style='cursor: pointer; float: right;'],body>a[style='cursor: pointer; float: right;']::before,body>a[style='cursor: pointer; float: right;']::after{background-color:rgba(" + theme.mainColor.rgb + ",.9)!important}body>a[style='cursor: pointer; float: right;']{background-position:-32px 0;position:fixed;" + config["Sidebar Position String"] + ":" + (config["Sidebar Position"] == 3 ? 243 : 241) + "px;text-indent:-9999px;z-index:5}body>a[style='cursor: pointer; float: right;']::before,body>a[style='cursor: pointer; float: right;']::after{content:'';display:block;height:16px;position:absolute;top:0;width:4px}body>a[style='cursor: pointer; float: right;']::before{left:-4px;" + (config["Sidebar Position"] != 1 ? "border-radius:0 0 0 2px;" : "") + "}body>a[style='cursor: pointer; float: right;']::after{right:-4px;" + (config["Sidebar Position"] != 2 ? "border-radius:0 0 2px 0;" : "") + "}body>div[style='width: 100%;']+form[name=delform]{display:block!important;margin-top:43px!important;position:fixed}body>span[style] a,body>a[href='.././'],body>a[style='cursor: pointer; float: right;'],#imgControls>label{opacity:.75;-webkit-transition:opacity .1s ease-in-out;-moz-transition:opacity .1s ease-in-out;-o-transition:opacity .1s ease-in-out}body>span[style] a:hover,body>a[href='.././']:hover,body>a[style='cursor: pointer; float: right;']:hover,#imgControls>label:hover,#imgControls>label.imgExpanded{opacity:1}body>a[style='cursor: pointer; float: right;']+div{border-left:0!important;border-right:0!important;height:100%;margin:0 auto;width:100%!important}body>a[style='cursor: pointer; float: right;']+div>table{height:100%!important;padding-bottom:20px}body>a[style='cursor: pointer; float: right;']+div>table td{border-left:1px solid " + theme.brderColor.hex + "!important}body>a[style='cursor: pointer; float: right;']+div>table td:first-child{border-left:0!important}body>a[style='cursor: pointer; float: right;']+div>table input[type=button]{width:100px!important}body>a[style='cursor: pointer; float: right;']+div>table table td{border:0!important}body>a[style='cursor: pointer; float: right;']+div>table textarea{resize:vertical!important}body>a[style='cursor: pointer; float: right;']+div>table table,body>a[style='cursor: pointer; float: right;']+div>table textarea,body>a[style='cursor: pointer; float: right;']+div>table #fs_search{width:100%!important}#fs_data tr:first-child td{border-top:0!important}.riceFile,#selectImage{height:22px;line-height:22px;overflow:hidden;position:relative}.riceFile input[type=file],#selectImage input[type=file]{cursor:pointer!important;position:absolute;top:0;right:0;z-index:1;opacity:0;-webkit-transform:scale(100);-moz-transform:scale(100);-o-transform:scale(100)}#qr input[name=upfile]+a{float:right;position:relative;top:2px;z-index:2}.riceFile div{display:inline-block;line-height:20px!important;margin:0!important;padding:0 10px!important}.riceFile span{display:inline-block;max-width:223px;overflow:hidden;padding:0 5px!important;text-overflow:ellipsis;white-space:nowrap}ul#Alerts,ul#Alerts a:hover{color:#222!important}body>span[style] a,body>a[href='.././']{background-position:-64px 0;position:fixed!important;text-indent:-9999px;top:2px;" + config["Sidebar Position String"] + ":" + (265 - (config["Sidebar Position"] != 2 ? 99 : 38)) + "px!important;z-index:8}.exSource{display:inline-block;height:16px;position:relative}.exFound{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important}.exFound:hover{background:rgba(" + theme.mainColor.shiftRGB(-4) + ",.9)!important;border-radius:3px 3px 0 0}.exFound:hover>.exPopup{display:block!important}.exPopup{background:rgba(" + theme.mainColor.shiftRGB(-4) + ",.9)!important;display:none;left:0;padding:5px;position:absolute!important;top:16px;white-space:nowrap;z-index:11!important;box-shadow:rgba(0,0,0,.3) 0 2px 2px;border-radius:0 3px 3px 3px}.exPopup a{display:block}.selectedBoard{text-decoration:underline!important}body[class*='chanx_']>#qr,body[class*='chanx_']>span[style]~body[class*='chanx_']>#qr{border:0!important;border-top:1px solid " + theme.brderColor.hex + "!important;max-width:261px!important;min-width:261px!important;padding-top:0!important;overflow:visible!important;width:261px!important}body[class*='chanx_']>#qr>.move::before{content:''!important}body[class*='chanx_']>#qr>.move{height:22px!important;line-height:18px!important;min-width:0!important;padding:2px 0 0 3px!important;text-align:left!important}body[class*='chanx_']>span[style]~#qr>.move{text-align:center!important}body[class*='chanx_']>span[style]~#qr>.move #autohide,body[class*='chanx_']>span[style]~#qr>.move .riceCheck{position:absolute;right:3px}body[class*='chanx_']>#qr>.move *{text-transform:none}body[class*='chanx_']>#qr>.move select{height:19px!important}body[class*='chanx_']>#qr.autohide>form{display:block!important}body[class*='chanx_']>#qr>form>div{position:relative}body[class*='chanx_']>#qr>form .field{height:22px}body[class*='chanx_']>#qr>form>div:first-child #dump,body[class*='chanx_']>#qr>form>.captcha>img[src*='recaptcha/api'],body[class*='chanx_']>#qr>form input[type=submit],body[class*='chanx_']>#qr>form .riceFile,body[class*='chanx_']>span[style]~#qr .riceFile{margin-top:0!important}body[class*='chanx_']>#qr>form>div:first-child{position:relative}body[class*='chanx_']>#qr>form>div:first-child #dump{float:left;width:24px!important}body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump){float:left;margin-left:1px!important;width:76px!important}" + (config["Expanding Form Inputs"] ? "body[class*='chanx_']>#qr input:focus::-webkit-input-placeholder,body[class*='chanx_']>#qr textarea:focus::-webkit-input-placeholder{color:transparent!important}body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump):focus{left:24px!important;position:absolute;width:230px!important}" : "") + "body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump)+span{color:rgba(" + theme.textColor.rgb + ",0)!important;font-size:0!important;position:absolute;right:265px;top:4px;white-space:nowrap;z-index:-1}body[class*='chanx_']>#qr>form>div:first-child .field:not(#dump):focus+span{color:rgba(" + theme.textColor.rgb + ",.4)!important;right:6px;z-index:3;-webkit-transition:right .3s ease-in-out,color .3s ease-in-out;-moz-transition:right .3s ease-in-out,color .3s ease-in-out;-o-transition:right .3s ease-in-out,color .3s ease-in-out}body[class*='chanx_']>#qr>form>div:first-child .field[name=sub]{margin-right:0!important}body[class*='chanx_']>#qr>form>div:first-child+div,body[class*='chanx_']>#qr>form>div#replies+div,body[class*='chanx_']>#qr>form>.captcha{clear:both}body[class*='chanx_']>#qr>form .field,body[class*='chanx_']>#qr>form>.captcha{margin-bottom:1px!important}body[class*='chanx_']>#qr>form>.captcha{background:none!important;outline:none!important}body[class*='chanx_']>#qr>form>.captcha+div{float:left;margin-right:1px;position:relative;z-index:1}body[class*='chanx_']>#qr>form>.captcha+div input{width:189px!important}body[class*='chanx_']>#qr>form input[type=submit]{width:65px!important}body[class*='chanx_']>#qr>form input[type=file]+input[type=submit]{position:absolute;right:0;top:0}body[class*='chanx_']>#qr>form #spoilerLabel{bottom:4px;position:absolute;right:8px;z-index:2}body[class*='chanx_']>#qr>form #spoilerLabel::after,.preview>label::after{content:'SPOILER'}.preview>label{background:rgba(0,0,0,.75)!important;color:#fff!important}#addReply{font-size:3.5em!important}body[class*='chanx_']>#qr .warning{height:16px;left:5px;opacity:0;overflow:hidden;padding:2px 0;position:absolute;text-align:center;text-overflow:ellipsis;top:24px;white-space:nowrap;width:248px;z-index:-1;border-radius:4px;-webkit-transition:all .2s cubic-bezier(0,.3,.35,1.3);-moz-transition:all .2s cubic-bezier(0,0.3,.35,1.3);-o-transition:all .2s cubic-bezier(0,.3,.35,1.3)}body[class*='chanx_']>#qr .warning.showWarning{opacity:1;top:-24px;z-index:1}input[name=name].tripping:not(:hover):not(:focus){color:transparent!important}" + theme.customCSS + "";

            if ($("#ch4SS").exists())
                $("#ch4SS").text(css);
            else
            {
                $(document.head).append($("<style type='text/css' id=ch4SS>"));
                $("#ch4SS").text(css);
            }
        },
        DOMLoaded: function(reload)
        {
            // ensure reload is a boolean
            reload = reload === true;
            
            // allow 4chan x to load first
            setTimeout(function()
            {
                var ann, pages, qr,
                    postLoadCSS = "#navtop,#navtopr{display:inline-block!important}.pages{display:table!important}",
                    addLabels   = function(qr)
                    {
                        $("form>div:first-child input:not(#dump)", qr).each(function()
                        {
                            if ($(this).nextSibling("span").exists()) return;
                            
                            $(this).after($("<span>" + $(this).attr("placeholder")));
                        });
                    };
                    
                if (!reload)
                {
                    $SS.options.init();
                    $SS.bNewQR = /chanx_/.test(document.body.className);
                    
                    $(".logo>img").attr("id", "logo");
                
                    // force persistent QR with 2.25+
                    if ($SS.bNewQR && !$("#qr").exists() && $(".postarea h1 a").exists())
                    {
                        $(".postarea h1 a").get().click();
                        $("#qr textarea[name=com]").get().blur();
                    }
                    else if (!$SS.bNewQR)
                        $(".postarea form[name=post]").elements().each(function()
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
                    // fix auto offset mascot in locked threads
                    else if (!$(".postarea").exists() && !mascot.bOffset)
                        postLoadCSS += "body::after{margin-bottom:0!important}";
                
                    var next, prev, imgCtrl;
                    
                    if ((prev = $(".pages td input[value='Previous']")).exists())
                        prev.val("Prev");
                    else if ((prev = $(".pages td:first-child")).exists())
                        prev.text("").attr("style", "padding:0 2px 0 0!important");
                    
                    if ((next = $(".pages td:last-child")).exists() && !next.children("input").exists())
                        next.text("").attr("style", "padding:0 2px 0 0!important");
                    
                    if ((imgCtrl = $("#imgControls>label")).exists())
                        imgCtrl.bind("change", function()
                        {
                            $(this).toggleClass("imgExpanded");
                        });
                }
                else
                {
                    var boardLinks;
                    
                    if ((boardLinks = $("#boardLinks")).exists())
                        boardLinks.remove();
                }
                
                // persistent QR
                if ($("#qr").exists())
                    postLoadCSS += ".postarea,#qr .close{display:none!important}";
                    
                // old QR and auto mascot offset
                if (!$SS.bNewQR && !mascot.bOffset && config["Post Form"] != 1)
                    postLoadCSS += "body::after{margin-bottom:324px!important}";
                    
                if (config["Custom Navigation Links"])
                    $SS.buildCustomNav();
                    
                if ((pages = $(".pages")).exists())
                {
                    // Set left offset for slide out pages
                    if (config["Pages Position"] == 1)
                    {
                        pages.attr("style", "display:table!important");
                        setTimeout(function()
                        {
                            pages.attr("style",
                                config["Sidebar Position oString"] + ":" +
                                    ((config["Sidebar Position"] != 2 ? $(".pages td:last-child").get().offsetWidth : 0) - pages.get().offsetWidth) + "px");
                        }, 10);
                    }
                    else if (reload)
                        pages.attr("style", "");
                }
                
                // Add ExHentai source link
                if (config["ExHentai Source"] != 1)
                {
                    config["ExType"] = config["ExHentai Source"] == 2 ? "exhentai" : "g.e-hentai";
                    
                    if (!reload || !$(".exSource").exists())
                        $SS.exsauce.addLinks(document);
                }
                else if (reload)
                    $(".exSource").remove();
                
                if (config["Rice Inputs"] == 2)
                    $("input[type=file]").riceFile();
                else if (config["Rice Inputs"] == 3)
                  $("input[type=checkbox]").riceCheck();
                else if (config["Rice Inputs"] == 4)
                {
                    $("input[type=file]").riceFile();
                    $("input[type=checkbox]").riceCheck();
                }
                
                if (reload)
                {
                    $("#ch4SSPost").text(postLoadCSS);
                    
                    if ((qr = $("body>span[style]~#qr")).exists() || (qr = $("body[class*='chanx_']>#qr")).exists())
                    {
                        if (config["Post Form"] != 1)
                        {
                            qr.attr("style", "")
                              .unbind("mouseover", $SS.qrMouseOver)
                              .unbind("mouseout", $SS.qrMouseOut);
                              
                            if (config["Post Form"] == 3)
                                qr.addClass("fixed");
                            else
                                qr.removeClass("fixed");
                        }
                        else
                        {
                            qr.bind("mouseover", $SS.qrMouseOver)
                              .bind("mouseout", $SS.qrMouseOut);
                            
                            setTimeout(function(){ $SS.qrMouseOut(qr.get()); }, 1000);
                        }
                        
                        if ($SS.bNewQR && config["Expanding Form Inputs"])
                            addLabels(qr);
                    
                        $SS.fixQRhide();
                    }
                    
                    if (config["Smart Tripcode Hider"])
                        $("input[name=name]").each(function()
                        {
                            $(this).bind("blur", $SS.tripCheck);
                            $SS.tripCheck(this);
                        });
                    else
                        $("input[name=name]").each(function()
                        {
                            $(this).unbind("blur", $SS.tripCheck)
                                   .removeClass("tripping");
                        });
                }
                else
                {
                    $(document.head).append($("<style type='text/css' id=ch4SSPost>"));
                    $("#ch4SSPost").text(postLoadCSS);
                    
                    // Change some of 4chan x quick reply events
                    if ((qr = $("body[class*='chanx_']>#qr")).exists() || (qr = $("body>span[style]~#qr")).exists())
                    {
                        // Clone to remove event listeners and delete text
                        var move  = qr.children("div.move"),
                            moveC = move.clone(true),
                            check = qr.children("#autohide"),
                            rcheck = check.nextSibling(".riceCheck");
                        
                        move.remove();
                        
                        if ($SS.bNewQR)
                        {
                            check = $("#autohide", moveC);
                            qr.prepend(moveC);
                            
                            if ((rcheck = $(".riceCheck", moveC)).exists())
                            {
                                rcheck.remove();
                                check.attr("riced", false).riceCheck();
                            }
                            
                            $(".warning", qr).bind("click", function(){ $(this).removeClass("showWarning"); });
                            $("input[type=submit]", qr).bind("click", function(){ setTimeout($SS.fixQRhide, 10); });
                            
                            if (config["Expanding Form Inputs"])
                                addLabels(qr);
                        }
                        else if (rcheck.exists())
                            rcheck.after(moveC);
                        else
                            check.after(moveC);
                            
                        check.bind("change", $SS.fixQRhide)
                            
                        $SS.fixQuote(document);
                        $SS.fixQRhide();
                        
                        if (config["Post Form"] == 1 && ($SS.bNewQR || $SS.location.reply))
                        {
                            qr.bind("mouseover", $SS.qrMouseOver)
                              .bind("mouseout", $SS.qrMouseOut);
                            
                            setTimeout(function(){ $SS.qrMouseOut(qr.get()); }, 1000);
                        }
                        else if (config["Post Form"] == 3)
                            qr.addClass("fixed");
                        
                        $("input,textarea,select", qr).bind("focus", function(){ $("#qr").addClass("focus"); })
                                                      .bind("blur", function(){ $("#qr").removeClass("focus"); });
                    }
                    
                    if (config["Smart Tripcode Hider"])
                        $("input[name=name]").each(function()
                        {
                            $(this).bind("blur", $SS.tripCheck);
                            $SS.tripCheck(this);
                        });
                    
                    $(document).bind("DOMNodeInserted", $SS.nodeInsertedHandler)
                               .bind("DOMSubtreeModified", $SS.subtreeModifiedHandler); // this may be deprecated
                                                                                        // but there is no(?) alternative.
                }
            }, 10);
        },
        fixQuote: function(x)
        {
            $("a.quotejs", x).bind("click", $SS.fixQRhide);
        },
        fixQRhide: function()
        {
            var autohide = $("#autohide");
            
            if (!autohide.exists() || (!$SS.bNewQR && !$SS.location.reply)) return;
            
            var parent = $SS.bNewQR ? autohide.parent().parent() : autohide.parent();

            if (!autohide.val())
            {
                if (config["Post Form"] == 1)
                    parent.attr("style", "bottom:0!important;-webkit-transition:bottom .1s;-moz-transition:bottom .1s;-o-transition:bottom .1s");
                else if (config["Post Form"] == 2)
                    parent.attr("style", "opacity:1!important;-webkit-transition:none;-moz-transition:none;-o-transition:none");
            }
            else
                parent.attr("style", "");
                
            return $SS.bQRhide = true;
        },
        nodeInsertedHandler: function(e)
        {
            if (e.target.nodeName === "DIV")
            {
                if ((config["Rice Inputs"] == 2 || config["Rice Inputs"] == 4) && (e.target.className != "riceFile" || $SS.incRice))
                {
                    $SS.incRice = false;
                    
                    // Deal with nesting riceFile
                    if (e.target.className == "riceFile")
                    {
                        $(e.target).parent().before(e.target).remove();
                        $(e.target).children("a").remove(); // remove the remove button
                    }
                    else
                    {
                        $("input[type=file]", e.target).riceFile();
                        
                        if (config["Rice Inputs"] == 4)
                            $("input[type=checkbox]", e.target).riceCheck();
                    }
                }
            }
            // replies
            else if (e.target.nodeName === "TABLE")
            {
                $SS.fixQuote(e.target);
                
                if (config["ExHentai Source"] != 1)
                    $SS.exsauce.addLinks(e.target);

                if (config["Rice Inputs"] == 3 || config["Rice Inputs"] == 4)
                    $("input[type=checkbox]", e.target).riceCheck();
            }
            // occurs after form is submitted
            else if (e.target.nodeName === "INPUT" && e.target.name === "upfile")
            {
                $SS.fixQRhide();
                
                if (config["Rice Inputs"] == 2 || config["Rice Inputs"] == 4)
                {
                    $(e.target).riceFileBind();
                    $SS.incRice = true;
                }
            }
            // occurs after form is submitted (new QR) or multiple images added
            else if (e.target.className === "preview")
            {
                if (config["Rice Inputs"] == 3 || config["Rice Inputs"] == 4)
                    $("input[type=checkbox]", e.target).riceCheck();
                    
                $(".riceFile>span", $("#qr")).text("");
            }
            // warning text inserted
            else if (e.target.parentNode.className == "warning")
                $(e.target.parentNode).addClass("showWarning");
        },
        subtreeModifiedHandler: function(e)
        {
            if (e.target.nodeName === "DIV")
            {
                var node = $(e.target);
                
                // warning text removed
                if (node.hasClass("warning") && node.text() == "")
                    node.removeClass("showWarning");
            }
        },
        qrMouseOver: function()
        {
            if ($("#autohide", this).val())
                $(this).attr("style", "");
        },
        qrMouseOut: function(e)
        {
            var qr = this.nodeName ? this : e;
            
            if ($("#autohide", qr).val() && !$(qr).hasClass("focus"))
                $(qr).attr("style", "bottom:-" + (qr.clientHeight - $(".move", qr).get().clientHeight) + "px!important");
        },
        tripCheck: function(e)
        {
            var $this = this.nodeName ? $(this) : $(e),
                check = /^#.+/.test($this.val());
            
            if (check && !$this.hasClass("tripping"))
                $this.addClass("tripping");
            else if (!check && $this.hasClass("tripping"))
                $this.removeClass("tripping");
        },
        
        /* CONFIG */
        config:
        {
            contains: function(arr, val, key)
            {
                for (var i = 0, MAX = arr.length; i < MAX; i++)
                    if (arr[i][key] === val)
                        return true;
                        
                return false;
            },
            parseVal: function(val)
            {
                return (Array.isArray(val) && typeof val[0] !== "object") ? val[0] : val;
            },
            get: function(name)
            {
                var val = localStorage.getItem(NAMESPACE + name);
                    
                if (val != null)
                {
                    val = JSON.parse(val);

                    if (!isNaN(val) && typeof val === "string")
                        return parseInt(val);
                    
                    if (!Array.isArray(val) || (Array.isArray(val) && val[0] != undefined))
                        return val;
                }
                    
                return defaultConfig[name];
            },
            set: function(name, val)
            {
                name = NAMESPACE + name;
                val  = JSON.stringify(val);
                
                if (val == undefined || (Array.isArray(val) && val[0] == undefined))
                    return localStorage.removeItem(name);
                    
                return localStorage.setItem(name, val);
            },
            load: function()
            {
                var ret = { };
                
                for (var key in defaultConfig)
                    ret[key] = this.parseVal(this.get(key));
                
                return ret;
            },
            update: function(name)
            {
                var current  = config[name],
                    defaults = defaultConfig[name],
                    key      = name == "Themes" ? "name" : "img";
                    
                for (var i = 0, MAX = defaults.length; i < MAX; i++)
                    if (!this.contains(current, defaults[i][key], key))
                        current.push(defaults[i]);
                        
                return current;
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
                    $SS.options.close();
                else
                {
                    var key, val, des,
                        overlay = $("<div id=overlay>"),
                        tOptions = $("<div id=themeoptions class=reply>"),
                        optionsHTML = "<ul id=toNav>\
                    <li><label class=selected for=tcbMain>Main</label></li>\
                    <li><label for=tcbThemes>Themes</label></li>\
                    <li><label for=tcbMascots>Mascots</label></li>\
                    <li><label for=tcbNavLinks>Nav Links</label></li>\
                    </ul><div id=toWrapper><input type=radio name=toTab id=tcbMain hidden checked><div id=tMain>\
                    <p><a class=trbtn name=loadSysFonts title='Reqiures flash'>" + (fontList ? "System Fonts Loaded!" : "Load System Fonts") + "</a></p>";
                    
                    for (key in config)
                    {
                        if (!defaultConfig.hasOwnProperty(key) || 
                            (key == "Style Scrollbars" && !$SS.browser.webkit) ||
                            key == "Nav Link Delimiter")
                            continue;
                        
                        val = config[key];
                        des = defaultConfig[key][1];
                        
                        if (Array.isArray(defaultConfig[key][2]))
                        {
                            var opts = key == "Font" ? fontList || defaultConfig[key][2] : defaultConfig[key][2],
                                cFonts = [];
                            optionsHTML += "<label title=\"" + des + "\"><span>" + key + "</span><select name='" + key + "'>";
                            
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
                                    
                                if (key == "Font") cFonts.push(value);
                                
                                optionsHTML += "<option" + (key == "Font" ? " style=\"font-family:" + $SS.FormatFont(value) + "!important\"" : "") + " value='" + value + "'" + (value == val ? " selected" : "") + ">" + name + "</option>";
                            }
                            
                            if (key == "Font" && cFonts.indexOf(config["Font"]) == -1)
                               optionsHTML += "<option style=\"font-family:" + $SS.FormatFont(config["Font"]) + "!important\" value='" + config["Font"] + "' selected>" + config["Font"] + "</option>"; 
                            
                            optionsHTML += "</select></label>";
                        }
                        else if (key == "Font Size")
                        {
                            optionsHTML += "<label title=\"" + des + "\"><span>" + key + "</span><input type=text name='Font Size' value=" + config["Font Size"] + "px></label>";
                        }
                        else if (key == "Themes")
                        {
                            var themes = config["Themes"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbThemes hidden><div id=tThemes>\
                                            <p><a class=trbtn name=addTheme>add</a><a class=trbtn name=updateThemes title='Adds all missing default themes'>update</a></p>";
                            
                            for (var i = 0, MAX = themes.length, tTheme; i < MAX; i++)
                            {
                                tTheme = new $SS.Theme(themes[i]);
                                optionsHTML += "<div id=theme" + i + (tTheme.name == theme.name ? " class=selected>" : ">") + $SS.themePreview(tTheme) + "</div>";
                            }
                        }
                        else if (key == "Mascots")
                        {
                            var mascots = config["Mascots"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbMascots hidden><div id=tMascot>\
                                            <p><a class=trbtn name=addMascot>add</a><a class=trbtn name=updateMascots title='Adds all missing default mascots'>update</a><a class=trbtn name=selectAll>select all</a><a class=trbtn name=selectNone>select none</a></p>";
                            
                            for (var i = 0, MAX = mascots.length, tMascot; i < MAX; i++)
                            {
                                tMascot = new $SS.Mascot(mascots[i]);
                                optionsHTML += "<div id=mascot" + i + (tMascot.enabled ? " class=selected" : "") + " style=\"background:" + tMascot.img.get() + "\">\
                                <a title=Delete>X</a><a title=Edit>E</a></div>";
                            }
                        }
                        else if (key == "Nav Links")
                        {
                            var links = config["Nav Links"];
                            optionsHTML += "</div><input type=radio name=toTab id=tcbNavLinks hidden><div id=tNavLinks>\
                                            <p><a class=trbtn name=addLink>add</a>\
                                            <label>Delimiter: \
                                            <input type=text name='Nav Link Delimiter' value='" + config["Nav Link Delimiter"] + "' style='width:40px' title='" + defaultConfig["Nav Link Delimiter"][1] + "'></p>";
                            
                            for (var i = 0, MAX = links.length; i < MAX; i++)
                                optionsHTML += "<div><label>Text: <input type=text value='" + links[i].text + "'></label>" +
                                                    "<label>Link: <input type=text value='" + links[i].link + "'></label>" +
                                                    "<a class='trbtn trbtn-small' name=upLink>up</a><a class='trbtn trbtn-small' name=downLink>down</a><a class=trbtn name=delLink>remove</a></div>";
                            
                            optionsHTML += "</div>";
                        }
                        else
                            optionsHTML += "<label title=\"" + des + "\"><span>" + key + "</span><input" + (val ? " checked" : "") + " name='" + key + "' type=checkbox></label>";
                    }
                    
                    optionsHTML += "</div><div><a class=trbtn name=save title='Hold any modifier to prevent window from closing'>save</a><a class=trbtn name=cancel>cancel</a></div>";
                    tOptions.html(optionsHTML);
                    overlay.append(tOptions);
                    
                    $("input[name='Font Size']", tOptions).bind("keydown", function(e)
                    {
                        var val    = parseInt($(this).val()),
                            bitmap = $(this).parent().nextSibling().children("input[name='Bitmap Font']").val();
                        
                        if (e.keyCode == 38 && (val < MAX_FONT_SIZE || bitmap))
                            $(this).val(++val + "px");
                        else if (e.keyCode == 40 && (val > MIN_FONT_SIZE || bitmap))
                            $(this).val(--val + "px");
                    });
                    
                    $("#toNav li label", tOptions).bind("click", function(e)
                    {
                        if ($(this).hasClass("selected")) return;
                        
                        $("#toNav li label.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                    
                    $("#tThemes>div", tOptions).each(function(){ $SS.options.bindThemeInputs(this); });
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
                    
                    if (!fontList)
                        $("a[name=loadSysFonts]", tOptions).bind("click", $SS.options.loadSystemFonts);
                    
                    $("a[name=addTheme]", tOptions).bind("click", $SS.options.showTheme);
                    $("a[name=updateThemes]", tOptions).bind("click", function()
                    {
                        config["Themes"] = $SS.config.update("Themes");
                        $("#tThemes>div").remove();
                        
                        for (var i = 0, MAX = config["Themes"].length; i < MAX; i++)
                        {
                            var tTheme = new $SS.Theme(config["Themes"][i]),
                                div    = $("<div id=theme" + i + (tTheme.name == theme.name ? " class=selected>" : ">"));
                                
                            div.html($SS.themePreview(tTheme));
                            $SS.options.bindThemeInputs(div);
                            $("#tThemes").append(div);
                        }
                    });
                    $("a[name=updateMascots]", tOptions).bind("click", function()
                    {
                        config["Mascots"] = $SS.config.update("Mascots");
                        $("#tMascot>div").remove();
                        
                        for (var i = 0, MAX = config["Mascots"].length; i < MAX; i++)
                            $("#tMascot").append($SS.mascotPreview(i));
                    });
                    $("a[name=addMascot]", tOptions).bind("click", $SS.options.showMascot);
                    $("a[name=selectAll]", tOptions).bind("click", function(){ $("#tMascot>div").each(function(){ $(this).addClass("selected") }); });
                    $("a[name=selectNone]", tOptions).bind("click", function(){ $("#tMascot>div").each(function(){ $(this).removeClass("selected") }); });
                    
                    $("a[name=addLink]", tOptions).bind("click", function()
                    {
                        var el = $("<div>").html("<label>Text: <input type=text></label><label>Link: <input type=text value='http://boards.4chan.org/'></label>" +
                                    "<a class='trbtn trbtn-small' name=upLink>up</a><a class='trbtn trbtn-small' name=downLink>down</a><a class=trbtn name=delLink>remove</a>");
                        bindLinkButtons(el);
                        $("#tNavLinks").append(el);
                    });
                    bindLinkButtons(tOptions);
                    
                    $("a[name=save]", tOptions).bind("click", $SS.options.save);
                    $("a[name=cancel]",tOptions).bind("click", $SS.options.close);
                    
                    $(document).bind("keydown", $SS.options.keydown)
                               .bind("keyup", $SS.options.keyup);
                    
                    return $(document.body).attr("style", "overflow:hidden;").append(overlay);
                }
            },
            close: function()
            {
                $(document.body).attr("style", "");
                
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
                    fontList = e.data;
                    var fontSelect = $("<select name=Font>");
                    
                    for (var i = 0, MAX = fontList.length; i < MAX; i++)
                    {
                        var name, value;
                            name = value = fontList[i];
                            
                        fontSelect.append($("<option" + " style=\"font-family:" + $SS.FormatFont(value) + "!important\"" + " value='" + value + "'" + (value == config["Font"] ? " selected=true" : "") + ">" + name));
                    }
                    
                    $("select[name=Font]").before(fontSelect).remove();
                    
                    $("#fontListSWF").remove();
                    window.removeEventListener("message", getFontMessage);
                    loadFontBTN.text("System Fonts Loaded!").unbind("click", $SS.options.loadSystemFonts);
                }, false);
                
                $(document.body).append($("<div id=fontListSWF hidden><object type='application/x-shockwave-flash' data='" + fontListSWF + "'><param name=allowScriptAccess value=always></object>"));
            },
            save: function()
            {
                var div     = $("#themeoptions"),
                    themes  = [],
                    mascots = [],
                    links   = [];
                
                // Save main
                $("#themeoptions input:not([name=toTab]), #themeoptions select").each(function()
                {
                    var name = $(this).attr("name"),
                        val  = $(this).val();
                    
                    if (name == "Font Size")
                    {
                        val = parseInt(val);
                        
                        if (!$("input[name='Bitmap Font']", div).val())
                            val = Math.max(Math.min(val, MAX_FONT_SIZE), MIN_FONT_SIZE);
                    }
                    else if (name == "Nav Link Delimiter")
                        val = val.replace(/\s/g, "&nbsp;");
                    
                    $SS.config.set($(this).attr("name"), val);
                });
                
                // Save Themes
                $("#themeoptions #tThemes>div").each(function(index)
                {
                    config["Themes"][index].enabled = $(this).hasClass("selected");
                    themes.push(config["Themes"][index]);
                });
                
                $SS.config.set("Themes", themes);
                
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
                    var nLink = { };
                    
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
                    $SS.options.close();
                    $(document).unbind("keydown", $SS.options.keydown)
                               .unbind("keyup", $SS.options.keydown);
                }
                
                return $SS.init(true);
            },
            showTheme: function(tIndex)
            {
                var div, overly;
                
                if (typeof tIndex === "number")
                {
                    var bEdit  = true,
                        tEdit  = config["Themes"][tIndex],
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
                <option" + (bEdit && themeR == "no-repeat" ? " selected" : "") + ">no-repeat</option>\
                <option" + (bEdit && themeR == "repeat" ? " selected" : "") + ">repeat</option>\
                <option" + (bEdit && themeR == "repeat-x" ? " selected" : "") + ">repeat-x</option>\
                <option" + (bEdit && themeR == "repeat-y" ? " selected" : "") + ">repeat-y</option>\
                </select></label><label>\
                <span>BG Attachment:</span><select name=bgA>\
                <option" + (bEdit && themeA == "fixed" ? " selected" : "") + ">fixed</option>\
                <option" + (bEdit && themeA == "scroll" ? " selected" : "") + ">scroll</option>\
                </select></label><label>\
                <span>BG Position-X:</span><select name=bgPX>\
                <option" + (bEdit && themePX == "left" ? " selected" : "") + ">left</option>\
                <option" + (bEdit && themePX == "center" ? " selected" : "") + ">center</option>\
                <option" + (bEdit && themePX == "right" ? " selected" : "") + ">right</option>\
                </select></label><label>\
                <span>BG Position-Y:</span><select name=bgPY>\
                <option" + (bEdit && themePY == "top" ? " selected" : "") + ">top</option>\
                <option" + (bEdit && themePY == "center" ? " selected" : "") + ">center</option>\
                <option" + (bEdit && themePY == "bottom" ? " selected" : "") + ">bottom</option>\
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
                    error = false;
                    
                $("input[type=text],textarea", overlay).each(function()
                {
                    var val;
                    
                    if (this.name == "bgImg")
                    {
                        var b64 = $("input[name=customIMGB64]", overlay);
                        val     = b64.exists() ? decodeURIComponent(b64.val()) : this.value;
                        
                        if (val != "" && !$SS.validImageURL(val) && !$SS.validBase64(val))
                        {
                            error = true;
                            return alert("Invalid image URL/base64.");
                        }
                        
                        val = $SS.cleanBase64(val);
                    }
                    else if (this.name == "name") // names must be unique
                    {
                        val = this.value;
                        
                        if (!bEdit && $SS.config.contains(config["Themes"], val, "name"))
                        {
                            error = true;
                            return alert("A theme with the name `" + val + "` already exists!\nTheme names must be unique.");
                        }
                    }
                    else
                        val = this.value;
                    
                    if (val != "")
                        tTheme[this.name] = val;
                });
                
                if (error) return;
                
                if (tTheme.bgImg)
                    tTheme.bgRPA = makeRPA();
                    
                if (bEdit)
                {
                    config["Themes"][tIndex] = tTheme;
                    tTheme = new $SS.Theme(tTheme);
                    
                    $("#theme" + tIndex, $("#overlay")).html($SS.themePreview(tTheme));
                    $SS.options.bindThemeInputs($("#theme" + tIndex, $("#overlay")));
                }
                else
                {
                    config["Themes"].push(tTheme);
                    tTheme = new $SS.Theme(tTheme);
                    
                    $("#overlay #tThemes").append($("<div id=theme" + (config["Themes"].length - 1) + ">").html($SS.themePreview(tTheme)));
                    $SS.options.bindThemeInputs($("#theme" + (config["Themes"].length - 1), $("#overlay")));
                }
                
                return overlay.remove();
            },
            deleteTheme: function(tIndex)
            {
                if (confirm("Are you sure?"))
                {
                    config["Themes"].splice(tIndex, 1);
                    $("#theme" + tIndex).remove();
                    
                    return $("#overlay #tThemes>div").each(function(index){ $(this).attr("id", "theme" + index); });
                }
            },
            getTheme: function()
            {
                var themes = config["Themes"];
                
                for (var i = 0, MAX = themes.length; i < MAX; i++)
                    if (themes[i].enabled == true)
                        return new $SS.Theme(themes[i]);
                        
                return new $SS.Theme(themes[0]);
            },
            bindThemeInputs: function(div)
            {
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
                    $SS.options.showTheme(parseInt(e.target.parentNode.parentNode.parentNode.id.substr(5)));
                });
                $("a[title=Delete]", div).bind("click", function(e)
                {
                    e.stopPropagation();
                    $SS.options.deleteTheme(parseInt(e.target.parentNode.parentNode.parentNode.id.substr(5)));
                });
            },
            showMascot: function(mIndex)
            {
                var div, overly;
                
                if (typeof mIndex === "number")
                    var bEdit = true,
                        mEdit = config["Mascots"][mIndex];
                
                div = $("<div id=addMascot>").html("<label><span>Image:</span><input type=text name=customIMG value='" + (bEdit ? ($SS.validImageURL(mEdit.img) ? mEdit.img + "'" : "[Base 64 Encoded Image]' disabled=true") : "'") + "></label>\
                        <label title='Auto goes according to the post forms position' for=null><span>Alignment/Offset:</span>\
                        <select name=mPosition>\
                            <option" + ((bEdit && !mEdit.position) || !bEdit ? " selected" : "") + ">Auto</option>\
                            <option" + (bEdit && mEdit.position == "top" ? " selected" : "") + ">Top</option>\
                            <option" + (bEdit && mEdit.position == "center" ? " selected" : "") + ">Center</option>\
                            <option" + (bEdit && mEdit.position == "bottom" ? " selected" : "") + ">Bottom</option>\
                        </select>\
                        <input type=text name=mOffset value='" + (bEdit && mEdit.position ? mEdit.offset + "px" : "") + "'></label>\
                        <label title='Prevent streching with smaller images (Width < 313px)'><span>Prevent stretching:</span><input type=checkbox name=mSmall" + (bEdit && mEdit.small ? " checked" : "") + "></label>\
                        <label title='Horizontally flip the mascot when sidebar is on the left'><span>Flip with sidebar:</span><input type=checkbox name=mFlip" + (!bEdit || (bEdit && (mEdit.flip || mEdit.flip == undefined)) ? " checked" : "") + "></label>\
                        <label title='Allows the mascot to be shown outside the sidebar, forces auto offset and ignores `Prevent stretching` option'><span>Allow overflow:</span><input type=checkbox name=mOverflow" + (bEdit && mEdit.overflow ? " checked" : "") + "></label>\
                        <label title='List of boards to display this mascot on, seperated by commas. Can be left blank to display on all boards'><span>Boards:</span><input type=text name=mBoards value='" + (bEdit && mEdit.boards ? mEdit.boards : "") + "'></label>\
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
                    bSetPos, cIMG, cPosition, cOffset, cSmall, cFlip;
                
                cIMG      = decodeURIComponent($("input[name=customIMGB64]", overlay).val() || $("input[name=customIMG]", overlay).val());
                cPosition = $("select[name=mPosition]", overlay).val().toLowerCase();
                cOffset   = parseInt($("input[name=mOffset]", overlay).val()) || 0;
                cSmall    = $("input[name=mSmall]", overlay).val();
                cFlip     = $("input[name=mFlip]", overlay).val();
                cOverflow = $("input[name=mOverflow]", overlay).val();
                cBoards   = $("input[name=mBoards]", overlay).val();
                bSetPos   = cPosition != "auto";
                
                if (!$SS.validImageURL(cIMG) && !$SS.validBase64(cIMG))
                    return alert("Invalid image URL/base64.");
                                
                cIMG = $SS.cleanBase64(cIMG);
                
                if (typeof mIndex === "number")
                {
                    config["Mascots"][mIndex].img      = cIMG;
                    config["Mascots"][mIndex].small    = cSmall;
                    config["Mascots"][mIndex].flip     = cFlip;
                    config["Mascots"][mIndex].overflow = cOverflow;
                    
                    if (cBoards != "")
                        config["Mascots"][mIndex].boards   = cBoards;
                    else
                        delete config["Mascots"][mIndex].boards;
                    
                    if (bSetPos)
                    {
                        config["Mascots"][mIndex].position = cPosition;
                        config["Mascots"][mIndex].offset   = cOffset;
                    }
                    else
                    {
                        delete config["Mascots"][mIndex].position;
                        delete config["Mascots"][mIndex].offset;
                    }
                    
                    var tIMG = new $SS.Image(cIMG);
                    $("#mascot" + mIndex).attr("style", "background:" + tIMG.get());
                }
                else
                {
                    var m = { img: cIMG, enabled: true, small: cSmall, flip: cFlip, overflow: cOverflow, boards: (cBoards == "" ? undefined : cBoards) };
                    
                    if (bSetPos)
                    {
                        m.position = cPosition;
                        m.offset   = cOffset;
                    }
                    
                    config["Mascots"].push(m);
                    $("#tMascot").append($SS.mascotPreview(config["Mascots"].length - 1));
                }
                
                return overlay.remove();
            },
            deleteMascot: function(mIndex)
            {
                if (confirm("Are you sure?"))
                {
                    config["Mascots"].splice(mIndex, 1);
                    $("#mascot" + mIndex).remove();
                    
                    return $("#overlay #tMascot div").each(function(index){ $(this).attr("id", "mascot" + index); });
                }
            },
            getMascot: function()
            {
                var mascots = config["Mascots"],
                    eMascot = [],
                    rnd, m;
                
                for (var i = 0, MAX = mascots.length; i < MAX; i++)
                    if (mascots[i].enabled)
                    {
                        if (mascots[i].boards != undefined &&
                            mascots[i].boards.split(",").indexOf($SS.location.board) == -1)
                            continue;
                        
                        eMascot.push(mascots[i]);
                    }
                
                if (eMascot.length == 0)
                    m = { img: null, color: null, enabled: false };
                else
                {
                    rnd = Math.round(Math.random() * (eMascot.length - 1));
                    m = eMascot[rnd];
                }
                
                return new $SS.Mascot(m);
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
        
        /* Thanks to hurfdurf
         * http://pastebin.com/TTDJNH7c 
         * Modified by ahoka
         * To display links to matched doujins/galleries. 
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
                    overrideMimeType: "text/plain; charset=x-user-defined",
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
                        
                        if (value[0] == "#")
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
                    p.pad.style.backgroundImage = "url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/7gAhQWRvYmUAZMAAAAABAwAQAwMGCQAABTgAAAVfAAAHAv/bAIQACAYGBgYGCAYGCAwIBwgMDgoICAoOEA0NDg0NEBEMDg0NDgwRDxITFBMSDxgYGhoYGCMiIiIjJycnJycnJycnJwEJCAgJCgkLCQkLDgsNCw4RDg4ODhETDQ0ODQ0TGBEPDw8PERgWFxQUFBcWGhoYGBoaISEgISEnJycnJycnJycn/8IAEQgAZQC1AwEiAAIRAQMRAf/EAJgAAAIDAQEAAAAAAAAAAAAAAAQFAAEDAgYBAAIDAQEBAAAAAAAAAAAAAAUGAQMEAgAHEAADAAMBAQADAQEAAAAAAAAAAQIhEgMRBBAwIiAxEQEAAAAAAAAAAAAAAAAAAACAEgEBAQEAAAAAAAAAAAAAAAAwgVBgEwACAgICAgIDAAAAAAAAAAAAARExECEgkTBh8MFBgaH/2gAMAwEAAhEDEQAAAEXp0vo0r6m99Mg9EtKGaxutrS0y5wvKJGRE3bRE4K4d6fJ+Z9h5xpY/FhPgz7f0zzZZHfay7CuCwdrglbVcPi3c69Asej1xt6BM8ArGa9oBWpqQWoRFSy261ZRlcFcNtXmvP+qRMR3yQjsU0z0xo/M3dWXYpnW4NMVPWth0A2uHIbbGvsHK1sHA5hMBOVxaGyG2reOvWp3BzwTyyVoEvpFBsv5gdyOUYMzejKGOrLscwLsmWS5oXQ6CLGrTBjQDJZhsBonMU0fkKAOfhpC4aadlsfHJFGuUyt8uKEfP4N8t5ccrYio1nZd4i6/NjwGuXQ6De2ZsK5D9m4k48HGBWUDxMTM7h2HW3W6jKiKI8qwm4u3Wlza56d4uxOvBDCGXn3gcMOR1i+HTJ0x3276FcbzuqnjPfmKB+Cue8+F7XdxjRFXwFiw4utV8sqsvB0M6i8SGSu8KjqokGHSqS7k7x3ckRKk9zKk9EuSfSSdeqpJ9VSe6uSem5JEySR6pJE//2gAIAQIAAQUB7I7SRJEnzI+c40TX83R3ePpPDqjrJMkScEcDlQqxVHV47nh0R0kmSZOKORzoVYqjo8djwtFyKSZOaOZFCrDotnQ8KRUikUkIkmjYdFMs8GhyamokIVGxsNjPP2//2gAIAQMAAQUB70d2fSfRI5FGeEnznzM51hUbnajszudpHIozxk4HBkVhUbnWjqzsdZHJpnlJyOLIrCo3LotnQ6SamhEnM5smjY3KopllSamhMkkMVGxuOhsY5NTQUiEzY2N/2//aAAgBAQABBQHhJwk4I4/8stFoaykJCR1WO8neTvBEEQRJEjkcjk1zxk4ycUcSy0WhrKQkJHVY7SdpO0EQRBEkSORyOTU4ycZOKORZaLQ1lISEjosdpO0naCIIgiSJHI5HJqcpOUnJHIstFoaykJCR0WOsnWTrBEEQRJMjkcjk1OUnKTkjmUUikNZSEhItY6ydZOsEwTBMkyORyOTU5yc5OaOZRSKQ0JCQkWsdJOknSCYJgmSZHI5HJqRJEkIgopFIaPDw8LRclyXBMEwTIpNTU1NSJIkhEjGho8PDw8KRclyXAoFApFJqampqTJMkokY0NHh4eHhSKkqSoFAoFIpNTU1NSZJklCGNDR4eHh4NFSVJUCgUCkUmpqamopFIkL8eHh4eHh4NDkcjg0NDU1NTU1NTU1PPz4eHh4eHh4ampoaGhqampqampgx/rBgx+MGDB/J/JgwYMGDBg//aAAgBAgIGPwE6lS6P/9oACAEDAgY/AeU//9oACAEBAQY/ARX/AP/aAAgBAgMBPxC0tw7kQQNCRRlMrG0lvn8Fpbj2IigaEijP5xvJb5/BbldyIIHhIoy2cbTxF6CKBo4C50byfbiqQDxgWuGVGx9sqihANGBajMpth0dHR1hHZ2dnef/aAAgBAwMBPxCeSaRJkkbx6JFAkNEEGnj+hLJNIsyTPDokECQ0RQa+VLJJIkyTPCtBBAsQQQaWVPJNIsySMZWyIoEiCKDShYpyYSSYZWxELBAaxYpSQSSTNAJBALO7z0dHR1ns7Oz/2gAIAQEDAT8QrKioX+BbLi/j/v5y4vLioqKzXx/qyoqE1+hbLi/lv3cXlxXoqKzTw/uUlBQLr9CeAcrrC0sPTkdPBW5WVFQmhPAOVVxeXHpPRh18FblJQUC6F8FpTWFpYes9XL1blZUVCaEyO3ipri8u8AKrcrKisXQmR2iKKOkuLy49PAdllm+UoF0Lm3uIoo6/AJ3sss34dILm3uIoo6eF3pPVlWWWb8EFEyL3EUUNfAT0noyrLL46SDQwy/BzIggiuP0UEUhoYfH7LDLC9RBFc/2jRo0a4DXlJ/8A/9k=')";
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
        Mascot: function(mascot)
        {
            this.position = mascot.position || "bottom";
            this.overflow = mascot.overflow;
            this.img      = new $SS.Image(mascot.img, this.overflow ? "" : "no-repeat " + this.position + " center");
            this.enabled  = mascot.enabled;
            this.small    = mascot.small;
            this.flip     = mascot.flip == undefined ? true : mascot.flip;
            this.bOffset  = typeof mascot.offset === "number";
            this.offset   = this.bOffset && !this.overflow ? mascot.offset : (config["Post Form"] != 1 ? 275 : 23);
            this.boards   = mascot.boards;
        },
        Theme: function(theme)
        {
            this.name        = theme.name;
            this.author      = theme.author || "ahodesuka";
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
                        this.customCSS = eval(theme.customCSS.replace(/(\r\n|\n|\r)/gm, ""));
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
        },
        
        /* HELPER METHODS */
        FormatFont: function(font)
        {
            if (font == "sans-serif" || font == "monospace")
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
        validHexColor: function(c)
        {
            return /^#?[A-F0-9]{6}$/i.test(c);
        },
        validImageURL: function(img)
        {
            return /^https?:\/\/.+$/i.test(img);
        },
        buildCustomNav: function()
        {
            var links = config["Nav Links"],
                a = [];
            
            for (var i = 0, MAX = links.length; i < MAX; i++)
                a.push("<a href='" + links[i].link + "'" +
                    ($SS.location.board == $SS.getLocation(links[i].link).board ? " class=selectedBoard" : "") + ">" + links[i].text + "</a>");
                
            $("#header").prepend($("<div id=boardLinks>").html(a.join(config["Nav Link Delimiter"])));
        },
        mascotPreview: function(index)
        {  
            var tIMG = new $SS.Image(config["Mascots"][index].img),
                div  = $("<div id=mascot" + index + (config["Mascots"][index].enabled ? " class=selected" : "") + " style=\"background:" + tIMG.get() + "\">")
                       .html("<a title=Delete>X</a><a title=Edit>E</a>");

            $SS.options.bindMascotInputs(div);
            
            return div;
        },
        themePreview: function(t)
        {
            return "<div class=reply\
                style='background-color:" + t.mainColor.hex + "!important;border:1px solid " + t.brderColor.hex + "!important;color:" + t.textColor.hex + "!important'>\
                <div class=riceCheck style='background-color:" + t.inputColor.hex + "!important;border:1px solid " + t.inputbColor.hex + "!important;box-shadow:rgba(" + t.mainColor.shiftRGB(64) + ",.3) 0 1px;'></div>\
                <span style='color:" + t.titleColor.hex + "!important'>" + t.name + "</span> \
                <span style='color:" + t.nameColor.hex + "!important'>" + t.author + "</span>\
                <span style='color:" + t.sageColor.hex + "!important'> (SAGE)</span>\
                <span style='color:" + t.tripColor.hex + "!important'>!.pC/AHOKAg</span>\
                <time> 20XX.01.01 12:00 </time>\
                <a href='javascript:;' style='color:" + t.linkColor.hex + "!important' \
                onmouseover='this.setAttribute(\"style\",\"color:" + t.linkHColor.hex + "!important\")' \
                onmouseout='this.setAttribute(\"style\",\"color:" + t.linkColor.hex + "!important\")'>No.22772469</a>\
                <br>\
                <blockquote>Post content is right here.</blockquote>\
                <p>\
                <a title=Edit style='background-color:" + t.inputColor.hex + "!important;border:1px solid " + t.inputbColor.hex + "!important;color:" + t.textColor.hex + "!important'>Edit</a>\
                <a title=Delete style='background-color:" + t.inputColor.hex + "!important;border:1px solid " + t.inputbColor.hex + "!important;color:" + t.textColor.hex + "!important'>Delete</a></p>\
                <h3>SELECTED</h3>\
            </div>";
        }
    };
    /* END STYLE SCRIPT CLASSES */

    $SS.init();
    
})();
