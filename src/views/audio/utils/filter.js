import { DateUtils } from "./common.js";

//加密手机号
export function filterTel(val) {
  if (val) {
    return val.substring(3, 0) + "****" + val.substring(7);
  }
}
//文字省略号
export function filterText(val) {
  if (val) {
    if (val.length >= 30) {
      return val.substring(10, 0) + "....";
    }
  }
  return val;
}
export function filterText2(val) {
  if (val) {
    if (val.length >= 10) {
      return val.substring(10, 0) + "....";
    }
  }
  return val;
}

export function filterTime(val) {
  return DateUtils.timetrans(val, "HH:mm:SS");
}

export function filterDate(val) {
  return DateUtils.timetrans(val, "yyyy年MM月dd日 午HH:mm");
}

export function filterDateYear(val) {
  return DateUtils.timetrans(val, "yyyy年MM月");
}
export function filterDateYear2(val) {
  return DateUtils.timetrans(val, "yyyy-MM");
}
export function filterTime1(val) {
  return DateUtils.timetrans(val, "yyyy-MM-dd HH:mm");
}
export function filterTime2(val) {
  return DateUtils.timetrans(val, "HH:mm");
}

export function filterTime3(val) {
  return DateUtils.timetrans(val, "MM-dd HH:mm");
}
export function filterMain(val) {
  return DateUtils.timetrans(val, "yyyy年MM月dd日");
}
function filterYearMain(val) {
  return DateUtils.timetrans(val, "yyyy-MM-dd");
}
export function setTime(m, s, f) {
  let content;
  if (s < 10 && s[0] != 0) {
    s = "0" + s;
  }
  if (f < 10 && f[0] != 0) {
    f = "0" + f;
  }
  content =
    filterYearMain(new Date(m).toLocaleDateString()) + " " + s + ":" + f;
  return new Date(content).getTime();
}
