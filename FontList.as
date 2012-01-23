 /*
    The MIT License

    Copyright (c) Ali Rantakari
    http://hasseg.org

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
 */
package
{
    import flash.system.Security;
    Security.allowDomain("*.4chan.org");
    
    import flash.display.Sprite;
    import flash.text.Font;
    import flash.text.FontType;
    import flash.text.FontStyle;
    import flash.external.ExternalInterface;
   
    public class FontList extends Sprite
    {
        public function FontList()
        {
            ExternalInterface.call("populateFontList", getDeviceFonts());
        }
       
        public function getDeviceFonts():Array
        {
            var embeddedAndDeviceFonts:Array = Font.enumerateFonts(true);
           
            var deviceFontNames:Array = [];
            for each (var font:Font in embeddedAndDeviceFonts)
            {
                if (font.fontType == FontType.EMBEDDED || font.fontStyle != FontStyle.REGULAR) continue;
                deviceFontNames.push(font.fontName);
            }
           
            deviceFontNames.sort();
            
            return deviceFontNames;
        }
    }
}