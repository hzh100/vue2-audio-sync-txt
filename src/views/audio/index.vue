<template>
  <div class="phone-details">
    <div class="phone-l">
      <div class="phone-header-l">
        <div class="phone-title">
          <div class="hightLight"></div>
          <div>录音详情</div>
        </div>
        <div class="phone-down">
          <el-tooltip
            :content="cnfrId.addState ? '已收藏' : '收藏'"
            placement="top"
          >
            <div v-if="cnfrId.addState" class="active" @click.stop="addClick">
              <span class="iconfont icon-shoucang">已收藏</span>
            </div>
            <div v-else @click.stop="addClick">
              <span class="iconfont icon-shoucang">收藏</span>
            </div>
          </el-tooltip>
          <el-tooltip content="下载" placement="top">
            <div @click.stop="fileDownload(music, musicType)">下载</div>
          </el-tooltip>
        </div>
      </div>
      <div class="phone-audio">
        <div class="phone-audio-progress">
          <Audio
            ref="audio"
            title="title"
            :isTitle="true"
            :optionBorder="false"
            titlePosition="top"
            :onload="loadStatus"
            :src="music"
            :message="true"
            :timeupdate="ontimeupdate"
            :id="String(Math.random() * 100)"
          ></Audio>
        </div>
        <div class="phone-audio-icon">
          <div class="phone-audio-date">
            <div class="phone-row-date">
              <div class="phone-row-date-title">
                <el-tooltip
                  placement="top"
                  :content="cnfrId.cnfrTime | filterTime1"
                >
                  <div class="iconfont icon-calendar">
                    <b class="detail-time"
                      >{{ cnfrId.cnfrTime | filterMain }}&nbsp;&nbsp;&nbsp;{{
                        cnfrId.cnfrTime | filterTime2
                      }}</b
                    >
                  </div>
                </el-tooltip>
              </div>
              <div class="phone-row-date-title" v-if="cnfrId.partyName">
                <el-tooltip placement="top" :content="cnfrId.partyName">
                  <div class="iconfont icon-zhengquan">
                    <b>{{ cnfrId.partyName }}</b>
                  </div>
                </el-tooltip>
              </div>

              <div class="phone-row-date-title" v-if="cnfrId.blockName">
                <el-tooltip placement="top" :content="cnfrId.blockName">
                  <div class="iconfont icon-hangye">
                    <b>{{ cnfrId.blockName }}</b>
                  </div>
                </el-tooltip>
              </div>

              <div class="phone-row-date-title" v-if="cnfrId.categoryStmt">
                <el-tooltip placement="top" :content="cnfrId.categoryStmt">
                  <div class="iconfont icon-biaoqian">
                    <b>{{ cnfrId.categoryStmt }}</b>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="phone-audio-date">
            <h3>参会人员：</h3>
            <el-tooltip placement="top">
              <div slot="content">
                {{ cnfrId.conferee }}
              </div>
              <span class="phone-audio-title">{{
                cnfrId.conferee
              }}</span></el-tooltip
            >
          </div>
        </div>
      </div>
      <div class="phone-text">
        <div class="phone-header-l">
          <div class="phone-title">
            <div class="hightLight"></div>
            <div>语音识别</div>
          </div>
          <div class="phone-down">
            <el-tooltip content="复制" placement="top">
              <div @click.stop="copyCode">复制</div>
            </el-tooltip>
          </div>
        </div>
        <div class="phone-text-content">
          <div class="phone-text" ref="phonetext" onselectstart="return false">

            <div
              class="detail-item"
              :class="{
                'detail-in-play': item.bg <= audioTime && audioTime <= item.ed,
              }"
              v-for="(item, index) in content"
              :key="index"
            >
              <div class="speaker" @dblclick.stop="setAudioTime(item)">
                <span class="in-play-icon"></span>发言人{{
                  item.speaker
                }}：<span>{{ item.total }}</span>
              </div>
              <div class="detail-content">
                <span
                  :class="{
                    'in-play': word.bg <= audioTime && audioTime <= word.ed,
                  }"
                  v-for="(word, k) in item.sentence"
                  :key="k"
                  @dblclick.stop="setAudioTime(word)"
                  >{{ word.wordsName }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from "./audio.vue";
import { debounce, DateUtils } from "./utils/common.js";
import { txt1, txt2 } from "./config";
import wav1 from "./config/wav-1.wav";
import wav2 from "./config/wav-2.wav";
import {
  filterTel,
  filterTime,
  filterTime1,
  filterTime2,
  filterTime3, // MM-DD hh:mm
  filterDate,
  filterDateYear,
  filterDateYear2,
  filterMain,
  filterText,
  filterText2,
} from "./utils/filter.js";

export default {
  name: "details",
  data() {
    return {
      dialog: {
        visible: false,
        title: "",
        showFooter: false,
      },
      //相关会议
      RelativeCnfr: [],
      titleStyle: "color: #FFFFFF;",
      cnfrId: {},
      content: "",
      music: "",
      musicType: "",
      loadStatus: false,
      filterText: /[啊|嗯|呢|呃|吖|啦|哼|噢|呀|嘛|呀|耶]/g,
      audioTime: 0,
      scrollerTimer: false,
    };
  },
  components: {
    Audio,
  },
  filters: {
    filterTel,
    filterTime,
    filterTime1,
    filterTime2,
    filterTime3, // MM-DD hh:mm
    filterDate,
    filterDateYear,
    filterDateYear2,
    filterMain,
    filterText,
    filterText2,
  },
  methods: {
    getAudio(url, type) {
      let txt =txt2, wav = wav2;
      this.content = this.parseAudioText(txt);
      this.music = wav;
      this.musicType = ".wav";
      this.loadStatus = false;
    },
    goNavLink(item) {
      sessionStorage.setItem("details" + item.id, JSON.stringify(item));
      this.$router.push({ name: `details`, query: { id: item.id } });
    },
    downloadMp3(filePath, type) {
      fetch(filePath)
        .then((res) => res.blob())
        .then((blob) => {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = this.cnfrId.topic + type;
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
    },
    //复制按钮
    copyCode() {
      if (this.content != "") {
        let range = document.createRange();
        const aa = document.getElementsByClassName("phone-text-content")[0]; // 这里是你要选择复制的文本dom节点
        const clone = aa.cloneNode(true);
        document.body.appendChild(clone);
        range.selectNode(clone);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        this.$message.success( "复制成功")
        
        clone.remove();
        // this.dialog.visible = true;
      }
    },
    //关闭弹窗
    closeDirlog() {
      this.dialog.visible = !this.dialog.visible;
    },
    //获取详情页数据
    getDetails(id) {
      this.getAudio();
    },
    paramsUrl(res, type) {
      return res.find((item) => item.extension == type);
    },
    
    // 下载文件
    fileDownload: debounce(
      function (url, type) {
        let link = url;
        if (!link) {
          this.$message.warning( "正在加载音频文件")
          return;
        }
        let a = document.createElement("a");
        // 指定生成的文件名
        a.download = this.cnfrId.topic + type;
        a.href = link;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(link);
        document.body.removeChild(a);
      },
      1000,
      true
    ),
    // 格式化音频文本分词数据
    parseAudioText(data) {
      /*
       * bg 句子相对于本音频的起始时间 单位ms
       * ed 句子相对于本音频的结束时间 单位ms
       * onebest 句子内容
       * speaker 说话人编号，从1开始，未开启说话人分离时sepaker都是0
       * si 句子标识，相同si表示同一句话，从0开始
       * wordsResultList 分词列表
       * alertnativeList 多候选列表 按置信度排名
       * wordBg 词相对于本句子的起始帧，一帧10ms
       * wordEd 词相对于本句子的终止帧，一帧10ms
       * wordsName 词内容
       * wc 句子置信度 范围[0,1]
       * wp 词属性 n 普通词、r 人名、 d 数字、 m 量词、 s 语气词、 t 地名&多音字、 p 地点、 g 分段标识
       */
      // 原始数据处理，主要进行分段(speaker 和 段落长度 si 控制分段)及时间定位计算
      let result = [];
      let section = {
        speaker: -233,
        sentence: [],
      };
      for (let i = 0, l = data.length; i < l; i++) {
        let item = data[i];
        // 不是同一个发言人，是同一个发言人总语句长度超出300所遇到的第一个。？！结尾的字符数量大于10的句子，需要进行分段
        if (
          item.speaker !== section.speaker ||
          (section.onebest.length > 300 &&
            item.onebest.length > 10 &&
            "。？！".indexOf(
              section.onebest.charAt(section.onebest.length - 1)
            ) > -1)
        ) {
          if (-233 !== section.speaker) {
            result.push(section);
          }
          section = {
            speaker: item.speaker,
            onebest: item.onebest,
            bg: +item.bg, // 此发言人发言起始时间
            sentence: [],
          };
        }

        // 分词数据处理
        // item.wordsResultList = this.parseWordsResultList( item );
        section.ed = +item.ed; // 发言人发言结束时间 每插入新的就更新一次
        section.total = this.getSectonTotal(section.bg, item.ed);
        section.onebest += item.onebest; // 每个分词总句都累加起来 用于前端计算分段
        // section.lastSi = item.si;           // 最后一个分词句子标识 可信度不高不采用
        section.sentence.push(...this.parseWordsResultList(item));
      }
      console.log(result);
      return result;
    },
    // 已00:00:00 的时长计时形式 返回语句开始结束时长
    getSectonTotal(start, end) {
      let s = Math.floor((end - start) / 1000); // 时长转换为秒
      return DateUtils.getSecondCount(s);
    },
    // 分词数据处理 适用于编辑模式
    // parseWordsResultList( sentence ) {
    //   let result = [];
    //   for ( let i = 0, l = sentence.wordsResultList.length; i < l; i++ ) {
    //     let item = sentence.wordsResultList[i];
    //     item.bg = sentence.bg + +item.wordBg;
    //     item.ed = sentence.bg + +item.wordEd;
    //     result.push( item );
    //   }
    //   return result;
    // },
    parseWordsResultList(sentence) {
      let result = [];
      for (let i = 0, l = sentence.wordsResultList.length; i < l; i++) {
        let item = sentence.wordsResultList[i];
        item.bg = +sentence.bg + item.wordBg * 10;
        item.ed = +sentence.bg + item.wordEd * 10;
        result.push(item);
      }
      return result;
    },
    // 音频播放时间变化时 获取到currentTime
    ontimeupdate(e) {
      console.log(e);
      let last = this.audioTime + 0;
      this.audioTime = e * 1000;
      let change = Math.abs(this.audioTime - last);
      if (change && change > 15000) {
        this.scrollerTimer = true;
      }
      this.$nextTick(() => {
        let element = this.$refs.phonetext.querySelector(".in-play");
        if (element && element.getInnerHTML() !== "") {
          if (this.scrollerTimer) {
            element.scrollIntoView({ block: "center" });
            this.scrollerTimer = false;
            return;
          }
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
    setAudioTime(word) {
      // if (!this.$refs.audio.isplay) {
      //   this.$refs.audio.play();
      //   this.$nextTick(()=> {
      //     this.audioTime = word.bg / 1000
      //     this.$refs.audio.currentTime = word.bg / 1000;
      //     this.$refs.audio.audioEl.currentTime = word.bg / 1000
      //     this.$refs.audio.play()
      //   })
      //   return
      // }
      this.audioTime = word.bg / 1000;
      this.$refs.audio.currentTime = word.bg / 1000;
      this.$refs.audio.audioEl.currentTime = word.bg / 1000;
      // this.$refs.audio.play()
    },
    addClick() {
      this.$nextTick(() => {
        this.cnfrId = { ...this.cnfrId };
        sessionStorage.setItem(
          "details" + this.cnfrId.id,
          JSON.stringify(this.cnfrId)
        );
      });
    },
  },
  mounted() {
    // let id = this.$route.query.id;
    // let sObj = sessionStorage.getItem(`details${id}`) || "{}";
    // this.cnfrId = JSON.parse(sObj);
    if (window.LocalObjectURL === undefined) {
      window.LocalObjectURL = {};
      this.getDetails(this.cnfrId.id);
    }
  },
  watch: {
    $route: function (arr) {
      let id = this.$route.query.id;
      if (id) {
        this.music = "";
        this.content = "";
        this.loadStatus = false;
        let sObj = sessionStorage.getItem(`details${id}`) || "{}";
        this.cnfrId = JSON.parse(sObj);
        this.getDetails(this.cnfrId.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";
.phone-details {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: $--main-background-color;
  ::v-deep.el-dialog__footer {
    display: none;
  }
  .detail-time {
    font-family: $--text-DingPro;
    font-weight: 400;
  }
  #time {
    padding-right: 13px;
  }
  ::v-deep.el-dialog__body {
    border-radius: 0 0 8px 8px;
  }
  ::v-deep.progress-btn {
    top: 10px;
  }
  .phone-row-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 11px;
    font-family: $--text-DingPro;
    color: $--main-text1-color;
    padding-left: 23px;
    text-align: center;
    b {
      padding-left: 5px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      color: $--main-text-color;
    }
    div {
      overflow: hidden;
      padding-right: 14px;
      border-right: solid 1px $--border-color;
      padding-left: 16px;
      &:last-child {
        border: none;
      }
      &:first-child {
        padding-left: 0px;
      }
    }
    .phone-row-date-title {
      display: flex;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        b {
          font-weight: 400;
          font-size: 12px;
          color: $--main-text1-color;
        }
      }
    }
  }
  .copy {
    text-align: center;
  }
  .phone-fun-footer {
    height: 24px;
    text-align: end;
    padding-bottom: 0px;
    padding-top: 0;
    border-radius: 0 0 8px 8px;
    background-color: $--common-background-color;
    .el-button.el-button--mini {
      height: 24px;
      padding: 3px 24px;
      margin-left: 20px;
      border: 0;
      border-radius: 13px;
      color: $--main-text-color;
      background-color: $--button-background-color;
      font-family: $--text-family;
      &.apply {
        color: $--main-text-color;
        background-color: $--nav-active-color;
      }
    }
  }
  .phone-l {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 383px;
    display: flex;
    flex-direction: column;
    min-height: 300px;
    .phone-header-l {
      height: 36px;
      background-color: $--common-background-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding-left: 14px;
      padding-right: 14px;
      .phone-down {
        display: flex;
        cursor: pointer;
        div {
          width: 64px;
          height: 24px;
          background: $--button-background-color;
          border-radius: 12px;
          text-align: center;
          line-height: 25px;
          font-size: 12px;
          font-family: $--text-family;
          font-weight: 400;
          color: $--main-text1-color;
          margin-left: 16px;
          // display: flex;
          // align-items: center;
          &:hover {
            background-color: $--nav-active-color;
            color: $--main-text-color;
          }
          .icon-shoucang {
            font-size: 12px;
            &::before {
              padding-right: 2px;
            }
          }
        }
        .active {
          background-color: $--nav-active-color;
          color: $--main-text-color;
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
        }
      }
      .phone-title {
        font-size: 12px;
        font-family: $--text-family;
        font-weight: 500;
        color: $--main-text-color;
        line-height: 18px;
        display: flex;
        align-items: center;
        div {
          &:nth-child(2) {
            padding-left: 18px;
          }
        }
      }
      .hightLight {
        width: 3px;
        height: 12px;
        background: $--nav-active-color;
        border-radius: 2px;
      }
    }
    .phone-audio {
      height: 280px;
      background: $--input-background-color;
      display: flex;
      flex-direction: column;
      margin-top: 1px;
      .phone-row-date {
        padding-left: 0px;
        b {
          font-size: 12px;
        }
      }
      .phone-audio-progress {
        height: 169px;
        width: calc(100% - 29px);
        background: $--common-background-color;
        border-radius: 8px;
        border: 1px solid $--common-border-color;
        margin-top: 14px;
        margin-left: 14px;
        overflow: hidden;
        // display: flex;
        // align-items: center;
      }
      .phone-audio-icon {
        display: flex;
        flex-direction: column;
        padding-top: 7px;
        .phone-audio-date {
          padding-left: 28px;
          display: flex;
          align-items: center;
          padding-bottom: 3px;
          h3 {
            font-size: 12px;
            font-family: $--text-family;
            font-weight: 400;
            color: $--main-text1-color;
          }
          span {
            font-size: 12px;
            font-family: $--text-family;
            font-weight: 400;
            // color: $--main-text-color;
            color: $--main-text1-color;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            max-width: 90%;
          }
        }
      }
    }
    .phone-text {
      height: calc(100% - 280px);
      overflow: hidden;
      padding-top: 2px;
      .phone-text-content {
        background-color: $--common-background-color;
        margin-top: 1px;
        height: calc(100% - 36px);
        overflow-y: auto;
        .phone-text {
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 60px;
          margin-right: 60px;
          -moz-user-select: none;
          .detail-item {
            font-size: 16px;
            font-family: $--text-family;
            font-weight: 400;
            color: $--main-text1-color;
            line-height: 37px;
            padding-top: 30px;
            .speaker {
              .in-play-icon {
                display: none;
              }
            }
            .detail-content {
              span {
              }
              .in-play {
                color: $--main-text-color;
                background-color: $--nav-active-color;
              }
              .detail-sentence {
                display: inline;
              }
            }
          }
          .detail-in-play .speaker .in-play-icon {
            display: inline-block;
            background-color: $--nav-active-color;
            position: relative;
            width: 12px;
            height: 12px;
            border-radius: 10px;
          }
        }
      }
    }
  }
  .phone-r {
    width: calc(100% - 991px);
    min-width: 500px;
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    .phone-header-l {
      height: 36px;
      background-color: $--common-background-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding-left: 14px;
      padding-right: 14px;
      .phone-down {
        display: flex;
        div {
          width: 64px;
          height: 24px;
          background: $--button-background-color;
          border-radius: 12px;
          text-align: center;
          line-height: 25px;
          font-size: 12px;
          font-family: $--text-family;
          font-weight: 400;
          color: $--main-text1-color;
          margin-left: 16px;
        }
      }
      .hightLight {
        width: 3px;
        height: 12px;
        background: $--nav-active-color;
        border-radius: 2px;
      }
      .phone-title {
        font-size: 12px;
        font-family: $--text-family;
        font-weight: 500;
        color: $--main-text-color;
        line-height: 18px;
        display: flex;
        align-items: center;
        div {
          &:nth-child(2) {
            padding-left: 18px;
          }
        }
      }
    }
    .phone-r-content {
      background: $--common-background-color;
      margin-top: 1px;
      display: flex;
      flex-direction: column;
      padding-left: 14px;
      padding-top: 16px;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
      .phone-r-row {
        width: 100%;
        border-bottom: solid 1px $--common-border-color;
        padding-top: 9px;
        padding-bottom: 10px;
        padding-left: 16px;
        cursor: pointer;
        &:hover {
          background-color: $--common-background-hcolor;
          color: $--main-text-color;
        }
        .phone-row {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: $--text-family;
          font-weight: 400;
          color: $--main-text-color;
          .phone-row-span {
            width: 68px;
            height: 22px;
            border-radius: 11px;
            border: 1px solid $--span-border-color;
            font-size: 11px;
            font-family: $--text-family;
            font-weight: 400;
            color: $--main-text1-color;
            line-height: 23px;
            text-align: center;
            margin-left: 14px;
          }
          .iconfont {
            margin-right: 9px;
            color: $--nav-derivatived-icon;
          }
          .phone-row-title {
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            max-width: 300px;
          }
        }
        .phone-row-date {
          div {
            font-family: $--text-DingPro;
            font-weight: 400;
            div {
              border-right: solid 1px $--border-color;
            }
            b {
              font-size: 12px;
              color: $--main-text1-color;
            }
            &.calendar {
              border: none;
              div {
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
