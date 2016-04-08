len: 4,//需要产生的验证码长度
//        chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
chars: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
],//经典模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
question: false,//若给定词典为算数题，则此项必须选择true
copy: false,//是否允许复制产生的验证码
bgColor: "",//背景颜色[与背景图任选其一设置]
bgImg: "bg.jpg",//若选择背景图片，则背景颜色失效
randomBg: false,//若选true则采用随机背景颜色，此时设置的bgImg和bgColor将失效
inputArea: codetext,//输入验证码的input对象绑定
codeArea: codeShowBox,//验证码放置的区域
click2refresh: true,//是否点击验证码刷新验证码
false2refresh: true,//在填错验证码后是否刷新验证码
validateObj: submit,//触发验证的对象，若不指定则默认为已绑定的输入框inputArea
validateEven: "click",//触发验证的方法名，如click，blur等
