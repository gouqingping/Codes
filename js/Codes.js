// JavaScript Document

function KinerCode(options) {

    this.opt = this.extend(true, this.options, options);
    this.opt.chars = (this.opt.chars && this.opt.chars.length == 0) ? this.options.chars : this.opt.chars;   
    this.opt.bg = (this.opt.bgImg && this.opt.bgImg.length != 0) ? "url('" + this.opt.bgImg + "')" : this.options.bgColor;
    if(this.opt.question){
        this.answer = [];
        for(var i=0;i<this.opt.chars.length;i++){
            this.answer.push(eval(this.opt.chars[i]));
        }
    }
    this.init();
    this.bind();
}

KinerCode.prototype.init = function () {

    var self = this;

    if(!this.body){
        this.body = document.createElement('div');
    }else{
        this.body.innerHTML = '';
    }
    if (self.opt.click2refresh) {
        this.body.title = ' ';
    }

    this.opt.codeArea.style.overflow = 'none';

    if (!self.opt.copy) {
        doProhibit();
    }

    this.myCode = this.createCode();

    var len = this.myCode.arrCode.length;

    for (var i = 0; i < len; i++) {
        var item = this.createCodeEle(this.myCode.arrCode[i]);
        this.body.appendChild(item);
    }

    this.body.style.background = this.opt.randomBg ? this.toRGB().background : this.opt.bg;
    this.body.style.backgroundPosition = 'center';
    this.body.style.backgroundSize = 'cover';
    this.body.style.width = '100%';
    this.body.style.cursor = 'pointer';
    this.body.style.position = 'relative';
    this.body.style.transition = 'all 1s';
    this.body.style.webkitTransition = 'all 1s';
    this.body.style.mozTransition = 'all 1s';
    this.body.style.oTransition = 'all 1s';

    function doProhibit() {
        if (window.Event)
            document.captureEvents(Event.MOUSEUP);

        function nocontextmenu(ev) {
            ev.cancelBubble = true;
            ev.returnvalue = false;
            return false;
        }

        function norightclick(e) {
            if (window.Event) {
                if (e.which == 2 || e.which == 3)
                    return false;
            }
            else if (e.button == 2 || e.button == 3) {
                e.cancelBubble = true;
                e.returnvalue = false;
                return false;
            }
        }

        function select() {
            return false;
        }

        self.body.oncontextmenu = nocontextmenu;
        self.body.onmousedown = norightclick;
        self.body.onselectionstart = select;
        self.body.oncopy = function () {
            return false;
        };
        self.body.oncut = function () {
            return false;
        };
        self.opt.inputArea.style.imeMode = 'disabled';
        self.opt.inputArea.onpaste = function () {
            return false;
        };
        self.opt.inputArea.oncontextmenu = nocontextmenu;
        self.opt.inputArea.onmousedown = norightclick;
        self.opt.inputArea.onselectionstart = select;
        setSelectable(self.body, false);

    }

    this.opt.codeArea.appendChild(this.body);

    function setSelectable(obj, enabled) {
        if (enabled) {
            obj.removeAttribute("unselectable");
            obj.removeAttribute("onselectstart");
            obj.style["-moz-user-select"] = '';
            obj.style["-webkit-user-select"] = '';
            obj.style["user-select"] = "";
            obj.ondrag = function(){return false;};
        } else {
            obj.setAttribute("unselectable", "on");
            obj.setAttribute("onselectstart", "return false;");
            obj.style["-moz-user-select"] = 'none';
            obj.style["-webkit-user-select"] = "none";
            obj.style["user-select"] = "none";
            obj.ondrag = function(){return false;};
        }
    }


};

KinerCode.prototype.refresh = function () {

    var self = this;

        self.init();
};

KinerCode.prototype.bind = function () {

    var self = this;

    if (self.opt.click2refresh) {
        self.bindHandler(self.body,'click',function(){
            self.refresh();
        });
    }

    self.bindHandler(self.opt.validateObj || self.opt.inputArea,self.opt.validateEven,function(){
        self.opt.validateFn.call(self,self.validate(),self.myCode);
        if(self.opt.false2refresh && !self.validate()){
            self.refresh();
            self.opt.inputArea.focus();
            self.opt.inputArea.select();
        }
    });



};
KinerCode.prototype.bindHandler = function(elem, type, handler) {
    if (window.addEventListener) {
            elem.addEventListener(type, handler, false);
    } else if (window.attachEvent) {
            elem.attachEvent("on" + type, handler);
    }
};
KinerCode.prototype.validate = function(){

    if(!this.opt.question)
    return this.myCode.strCode.toLowerCase().trim()==this.opt.inputArea.value.toLowerCase().trim();
    else
    return parseFloat(this.myCode.answer) === parseFloat(this.opt.inputArea.value.trim());

};
KinerCode.prototype.createCodeEle = function (code) {
    var item = document.createElement('span');
    item.innerHTML = code;
    item.style.color = this.toRGB().color;
    item.style.textAlign = 'center';
    item.style.lineHeight = this.opt.codeArea.offsetHeight + 'px';
    if(!this.opt.question){
        item.style.width = 90 / this.opt.len + '%';
    }else{

        item.style.width = '100%';
    }

    item.style.padding = '0 1%';
    item.style.fontSize = '1.5em';
    item.style.display = 'inline-block';
    return item;

};

KinerCode.prototype.toRGB = function () {
    var str = "", str2 = "";
    var num = [], strs2 = [], strs = [];
    var i = 0;

    for (i = 0; i < 3; i++) {
        num.push(parseInt(Math.random() * 255));
    }
    for (i = 0; i < num.length; i++) {
        strs.push(num[i].toString(16));
        strs2.push((255 - num[i]).toString(16))
    }
    for (i = 0; i < strs.length; i++) {
        str += strs[i];
        str2 += strs2[i];
    }

    var rgb = {

        background: '#' + str,
        color: '#' + str2

    };
    return rgb;
};


KinerCode.prototype.createCode = function () {
    var str = "";
    var codes = [];
    var char;
    var self = this;
    var answer = '';
    if(this.opt.question){

        var c = parseInt(Math.random() * self.opt.chars.length);
        char = self.opt.chars[c];
        str  = char;
        answer = this.answer[c];
        codes.push(char);
    }else{
        for (var i = 0; i < self.opt.len; i++) {
            var c = parseInt(Math.random() * self.opt.chars.length);
            char = self.opt.chars[c];
            str += char;
            codes.push(char);
        }
    }
    return this.myCode = {
        strCode: str,
        arrCode: codes,
        answer : answer
    };

};
KinerCode.prototype.options = {
    len: 4,
    chars: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    copy: false,

    bgColor: "#222222",
    bgImg: "",
    randomBg: false,
    inputArea: "",
    codeArea: "",
    click2refresh: true,
    validateEven : "",
    validateFn : function(result,strCode){

    }
};
KinerCode.prototype.extend = function (flag, destination, source) {
    if (flag) {
        var obj = {};

        for (var property in destination) {
            obj[property] = destination[property];
        }
        for (var property in source) {
            obj[property] = source[property];
        }


        return obj;


    } else {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    }
};