/*
 * @Author: your name
 * @Date: 2022-03-09 14:48:39
 * @LastEditTime: 2022-08-18 18:07:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /quark/src/utils/common.js
 */
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;
    try {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      }
    } catch(e) {console.log(e)}
  };
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait, type) {
  let previous = 0,
    timeout;

  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}

/**
 *
 * @returns GUID
 */
export function GUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 代理法
export function deepClone(obj) {
    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(cloneObj).forEach(key => {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return cloneObj
}

// 判断两个对象的值是否一致
export function isObjectValueEqual(a, b) {
  // 判断两个对象是否指向同一内存，指向同一内存返回true
  if (a === b) return true
  // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回false
  if (aProps.length !== bProps.length) return false
  // 遍历对象的键值
  for (let prop in a) {
    // 判断a的键值，在b中是否存在，不存在，返回false
    if (b.hasOwnProperty(prop)) {
      // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) return false
      } else if (a[prop] !== b[prop]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}


// 事件委托
export function eventListenerOn(el, eventType, selector, fn){
  el.addEventListener(eventType, function(e){
    let el2 = e.target
    while (!el2.matches(selector)) {
      if (el === el2) {
        el2 = null
        break
      }
      el2 = el2.parentNode
    }
    el2 && fn(el2, e);
  });
}

/**
 * date 工具包
 */

const DateUtils = {
        // 将13位的时间戳转换为 'yyyy-MM-dd hh:mm'格式
        timetrans (d, type) {
             if (typeof d === 'string') {
               d = d.replace(/\-/g, "/")
             }
             let date = new Date(d);
             let Y = date.getFullYear();
             let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
             let _M = date.getMonth() + 1;
             let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
             let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
             let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
             let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
             switch (type) {
               case "yyyy年MM月dd日 午HH:mm":
                 h = h * 1;
                 if (h < 12) {
                   h = "上午" + (h < 10 ? "0" + h : h);
                 } else {
                   h = h - 12;
                   h = "下午" + (h < 10 ? "0" + h : h);
                 }
                 return Y + "年" + M + "月" + D + "日" + "  " + h + ":" + m;
               case "yyyy年MM月dd日":
                 return Y + "年" + _M + "月" + D + "日";
               case "yyyy年MM月":
                 return Y + "年" + _M + "月";
               case "yyyy-MM":
                  return Y + "-" + _M ;
               case "yyyy/MM/dd":
                 return Y + "/" + M + "/" + D;
               case "yyyy-MM-dd":
                 return Y + "-" + M + "-" + D;
               case "HH:mm:SS":
                 return h + ":" + m + ":" + s;
               case "HH:mm":
                 return h + ":" + m;
               case "yyyy-MM-dd HH:mm":
                 return Y + "-" + M + "-" + D + "  " + h + ":" + m;
               case "MM-dd HH:mm":
                return M + "-" + D + "  " + h + ":" + m;
               default:
                 return Y + "-" + M + "-" + D + "  " + h + ":" + m + ":" + s;
             }
        },

        // 固定的格式化时间日期格式为 yyyy-MM-dd
        dateF1: function(v){
            let tt = new Date(v);
            let month = (tt.getMonth() + 1);
            let newDay = tt.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (newDay < 10) {
                newDay = "0" + newDay;
            }
            return tt.getFullYear() + '-' + month + '-' + newDay;
        },

        // 获取今天 的前几天 后几天日期
        getDayBeforeAfter: function(d) {
            let _t = new Date();
            _t = _t.setDate(_t.getDate() + d);
            let tt = new Date(_t);
            let month = (tt.getMonth() + 1);
            let newDay = tt.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (newDay < 10) {
                newDay = "0" + newDay;
            }
            return tt.getFullYear() + '-' + month + '-' + newDay;
        },

        // 判断传入时间是否为几天前
        anyDayBefore(time, day) {
            let t1 = new Date(time);
            let t2 = new Date();
            return t1.getTime() + day * 24 * 60 * 60 * 1000 < t2.getTime();
        },

        // 今天
        getToday() {
            let tt = new Date();
            let month = (tt.getMonth() + 1);
            let newDay = tt.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (newDay < 10) {
                newDay = "0" + newDay;
            }
            return tt.getFullYear() + '-' + month + '-' + newDay;
        },

        // 上周
        getLastWeek() {
            let date = new Date();
            let w = date.getDay();
            let weekDate = [];
            for (let i=0; i<7; i++) {
                weekDate.push(this.getDayBeforeAfter(i-w-7));
            }
            return weekDate;
        },
    
        // 本周
        getThisWeek() {
            let date = new Date();
            let w = date.getDay();
            let weekDate = [];
            for (let i=0; i<7; i++) {
                weekDate.push(this.getDayBeforeAfter(i-w));
            }
            return weekDate;
        },

        // 下一周
        getNextWeek() {
            let date = new Date();
            let w = date.getDay();
            let weekDate = [];
            for (let i=0; i<7; i++) {
                weekDate.push(this.getDayBeforeAfter(7-w + i));
            }
            return weekDate;
        },

        // 获取两个日期及之间的 日期
        getBetweenDay(start, end) {
            let result = [ start ];
            let beginDay = new Date(start).getTime();
            let i = 1;
            while(i) {
                let day = this.dateF1(beginDay + i * 24 * 60 * 60 * 1000 );
                i ++;
                if (day == end) {
                    i = 0;
                }
                result.push(day);
            }
            return result;
        },

        // 将秒转为 00:00:00 时分秒计数
        getSecondCount(s) {
          let str = '';
          try {
            let hour = Math.floor(s/3600)
            let min = Math.floor(s/60) % 60
            let sec = s % 60
            if(hour < 10) {
              str = '0'+ hour + ":"
            } else { 
              str = hour + ":"
            } 
            if(min < 10){
              str += "0"
            } 
            str += min + ":"
            if(sec < 10){
              str += "0"
            } 
            str += sec.toFixed(0)
          } catch ( e ) {
            str = '00:00:00'
          } 
          return str;
        }

    }

/**
 * 系统
 */
const SysUtils = {
  // 获取设备类型
  getDeviceType() {
      // 101 移动H5 201 PCH5 301 Android 302 IOS 401 Windows终端 402 Mac终端
      let agent = navigator.userAgent.toLowerCase();
      // 非终端都按H5算
      if (/windows/.test(agent)) {
          return 201 //'windows pc';
      } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
          return 101 //'iphone';
      } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
          return 201 //'ipad';
      } else if (/android/.test(agent) && /mobile/.test(agent)) {
          return 101 //'android';
      } else if (/linux/.test(agent)) {
          return 201 //'linux pc';
      } else if (/mac/.test(agent)) {
          return 201 //'mac';
      } else {
          return 201 //'other';
      }
  },

  getURLSupplement(account) {
    let str =  JSON.stringify(this.getSupplement(account));
    return encodeURIComponent(str);
  }
}

/**
 *  字符串工具包
 */
let StringUtils;
(function StringUtilsFunc() {
  String.prototype.replaceAll = function(s1, s2) {  //全部替换 兼容旧版本
    return this.replace(new RegExp(s1, "gm"), s2);
  }
 
  // 正则
  let emailReg = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;   // 邮箱
  let noZHCN = /.*[\u4e00-\u9fa5]+.*$/;   // 非中文
  let abcReg = /^[a-z]+$/i;   // 纯英文  
  let specialReg = /[#&+{}/\\\:*?"<>|]/;   // 特殊字符英文
 
  StringUtils = {
    // 邮箱格式验证
    checkEmail(str) {
        return emailReg.test(str);
    },
    
    // 通用密码验证 6-16 非中文 不允许空格
    checkCommonPsd(str) {
        if (str.indexOf(" ")> -1) {
            return false;
        }
        return !noZHCN.test(str) && str.length > 5 && str.length < 17;
    },

    // 空字符串验证
    isEmpty(str) {
        return typeof str === "undefined" || str === null || str.trim() === ""; 
    },

    notEmpty(str) {
        return !this.isEmpty(str);
    },

    // 仅包含英文字母和数字
    onlyEngOrNum(str) {
      let reg = /^[A-Za-z0-9]+$/
      return reg.test(str);
    },

    // 只包含字母
    isAlpha(str) {
        return abcReg.test(str);
    },

    // 文件名特殊字符校验
    isSpecial(str) {
        return specialReg.test(str);
    },

    // 计算字符的字节数
    byteCount(str) {
        let length = 0;
        for (let i =0,l=str.length; i<l; i++) {
            if(str.charCodeAt(i)>0 && str.charCodeAt(i)<255){
                length += 1;
                continue ;
            }
            length += 2;
        }
        return length;
    },

    // 字符串匹配替换不区分大小写
    valueReplaceNoCase(str, value1, callback) {
        value1 = value1 == '.' ? '\\.': value1;
        let a = new RegExp(value1, 'gi');
        return str.replace(a, (val)=> {
            return callback(val);
        })
    },

    // 切换换行空格符为html格式
    transFormaterToHtml(str) {
      return str.replace(/(\r)*\n/g,"<br/>").replace(/\s/g,"&nbsp;");
    },

    // 用正则表达式实现html编码（转义
    htmlEncodeByRegExp(str) {  
      let temp = "";
      if(str.length == 0) return "";
        temp = str.replace(/&/g,"&amp;");
        temp = temp.replace(/</g,"&lt;");
        temp = temp.replace(/>/g,"&gt;");
        // temp = temp.replace(/\s/g,"&nbsp;");
        temp = temp.replace(/\'/g,"&#39;");
        temp = temp.replace(/\"/g,"&quot;");
      return temp;
    },
    // echarts 左侧坐标轴自动转换单位
    echartYscaleFormat(value) {
      value = Number(value);
      let isFu = false;
      if (value < 0) {
        isFu = true;
        value = -value;
      }
      let unit = ["", "K", "M", "B"];
      for (var i = 1; i < unit.length + 1; i++) {
        value = value / 1000;
        if (value < 1) {
          return (isFu ? "-" : "") + value * 1000 + unit[i - 1];
        }
      }
      return (isFu ? "-" : "") + value * 1000 + "B";
    },
    // 从数组中根据某一个key和value取出这条数据
    getDataFromArrByKey(arr, key, value, type) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == value) {
          if (type == "index") {
            return i;
          } else {
            return arr[i];
          }
        }
      }
      return null;
    },
    // 获取文件类型
    getFileType(type) {
      const excelSuffix = '.xls.xlt.et.xlsx.xltx.csv.xlsm.xltm';
      const wordSuffix = '.doc.dot.wps.wpt.docx.dotx.docm.dotm.rtf';
      const pptSuffix = '.ppt.pptx..pptm.ppsx.ppsm.pps.potx.potm.dpt.dps';
      const imageSuffix = '.bmp.jpg.jpeg.png.gif.psd.pdd.svg';
      const pdfSuffix = '.pdf';
      const rarSuffix = '.zip.rar.7z';
      const txtSuffix = '.txt';
      const audioSuffix = '.m4a.caf.mp3.wav.CD.WAVE.AIFF.MPEG.MPEG4.MIDI';
      const viedoSuffix = '.avi.wmv.mpeg.mp4.m4v.mov.asf.flv.f4v.rmvb.rm.3gp.vob.avi.wmv.mpg.mpeg.mov.mp4.swf.rm';

      if (excelSuffix.indexOf(type) != -1) {
        return 'excel'
      } else if (wordSuffix.indexOf(type)  != -1) {
        return 'word'
      } else if (pptSuffix.indexOf(type)  != -1) {
        return 'ppt'
      } else if (imageSuffix.indexOf(type)  != -1) {
        return 'image'
      } else if (pdfSuffix.indexOf(type)  != -1) {
        return 'pdf'
      } else if (rarSuffix.indexOf(type)  != -1) {
        return 'rar'
      } else if (txtSuffix.indexOf(type)  != -1) {
        return 'txt'
      } else if (audioSuffix.indexOf(type)  != -1) {
        return 'audio'
      } else if (viedoSuffix.indexOf(type)  != -1) {
        return 'viedo'
      } else {
        return 'other'
      }
    },
    /**
     * 获得数据默认保留小数位
     * @param {*} data 数据
     * @param {*} precision 需强制保留小数位(通过函数进行设置)
     * @param {*} isSignificant 是否开始有效位保留(默认开启)
     * @returns 
     */
    getDataPrecision(data, precision, isSignificant = true) {
      if (precision !== '') {
        return Number(Number(data).toFixed(precision))
      }
      let modifyData = Number(data).toFixed(2);
      if (isSignificant && Number(modifyData) === 0 && Number(data) !== 0) {
        let xs = data.toString().split('.')[1];
        let index = -1;
        for (let i = 0; i < xs.length; i++) {
          if (Number(xs[i]) !== 0) {
            index = i;
            break;
          }
        }
        modifyData = Number(data).toFixed(index + 2);
      }

      return Number(modifyData);
    },
  }
}());

export {
  DateUtils,
  SysUtils,
  StringUtils
}