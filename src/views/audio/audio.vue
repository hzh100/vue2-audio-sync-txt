<template>
  <div id="Audio">
    <div class="progress-title" v-if="isTitle">{{ title }}</div>
    <audio
      ref="audioRef"
      autoplay
      @canplay="canplay"
      @timeupdate="update"
      @ended="endAudio"
    ></audio>
    <div class="progress-wrapper">
      <span class="time time-l">{{ formatTime(currentTime) }}</span>
      <div class="progress-bar-wrapper">
        <MmProgress
          :progress="progress"
          @progress-changing="onProgressChanging"
          @progress-changed="progressChanged"
          @progress-stop="pause"
          ref="Progress"
          :resize="true"
          btnColor="width:14px;height:14px;border:3px solid #DC573C;background: #DC573C;border-radius:50%;"
        >
        </MmProgress>
      </div>
      <span class="time time-l">{{ formatTime(duration) }}</span>
    </div>
    <div class="progress-state">
      <div class="progress-svg">
        <svg
          t="1652839942347"
          class="icon go"
          @click="go(2)"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3666"
          width="200"
          height="200"
        >
          <path
            d="M268.064 348.192l-156.8 38.304a8 8 0 0 1-9.92-7.68L100.544 217.28c0-6.72 7.68-10.528 12.896-6.304L271.04 334.08a8 8 0 0 1-2.976 14.08z m-167.712 301.12l56.704-19.52a8 8 0 0 1 10.08 4.8 351.36 351.36 0 0 0 81.92 127.616 352.992 352.992 0 0 0 250.208 103.68c47.776 0 94.08-9.28 137.696-27.776a352.992 352.992 0 0 0 112.48-75.904 354.624 354.624 0 0 0 75.904-112.512c18.304-43.52 27.616-89.92 27.616-137.696 0-47.808-9.312-94.208-27.84-137.792a351.36 351.36 0 0 0-75.872-112.512 352.992 352.992 0 0 0-250.112-103.68c-47.776 0-94.08 9.28-137.696 27.776A352.992 352.992 0 0 0 248.96 261.696a362.88 362.88 0 0 0-28.608 32.32L160.544 247.168a428.8 428.8 0 0 1 338.816-165.216A429.216 429.216 0 0 1 928.96 516.384c-2.4 235.52-193.92 425.6-429.824 425.6-185.472 0-343.488-117.6-403.68-282.272a8.16 8.16 0 0 1 4.896-10.4z"
            p-id="3667"
          ></path>
          <path
            d="M433.44 655.136V358.4h-34.048c-9.984 10.816-22.464 20.352-37.44 29.504-14.944 8.32-28.64 14.144-41.952 17.472v44.864c27.424-7.904 50.272-20.352 68.16-37.408v242.304h45.28z m160.416 5.824c29.536 0 54.88-8.736 76.064-26.208 22.432-19.52 34.08-44.48 34.08-75.2 0-32-9.152-56.96-26.592-75.2-17.472-18.304-40.32-27.456-68.16-27.456-13.312 0-25.76 2.08-36.576 6.656a78.08 78.08 0 0 0-31.584 20.352h-1.248l8.736-85.6h142.112V358.4H512l-16.192 166.24h42.368c5.824-10.816 13.728-18.72 24.512-23.68 9.984-4.992 21.216-7.072 34.496-7.072 19.968 0 34.912 5.824 45.728 17.44 10.816 11.648 16.192 27.84 16.192 48.64 0 19.104-6.208 34.08-18.688 45.696-12.48 11.2-27.84 17.056-46.144 17.056-16.64 0-29.92-3.744-39.872-11.2-11.232-8.32-17.888-21.216-19.52-37.856h-44.48c2.08 27.424 13.696 49.472 34.88 65.28 19.136 14.528 41.984 22.016 68.576 22.016z"
            p-id="3668"
          ></path>
        </svg>
        <svg
          t="1653280935948"
          class="icon play"
          v-show="isplay"
          @click.stop="pause"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4685"
          width="200"
          height="200"
        >
          <path
            d="M512 64C264.592696 64 64 264.592696 64 512S264.592696 960 512 960 960 759.407304 960 512 759.407304 64 512 64z m0 820.001391C306.598957 883.97913 140.02087 717.401043 140.02087 512c0-205.401043 166.578087-371.97913 371.97913-371.97913S883.97913 306.576696 883.97913 512 717.423304 883.97913 512 883.97913z m-87.997217-531.990261H375.986087a8.013913 8.013913 0 0 0-8.013913 7.991653v303.994434c0 4.407652 3.606261 8.013913 8.013913 8.013913h47.994435a8.013913 8.013913 0 0 0 8.013913-8.013913V360.002783a8.013913 8.013913 0 0 0-8.013913-8.013913z m223.988869 0h-47.994435a8.013913 8.013913 0 0 0-8.013913 7.991653v303.994434c0 4.407652 3.606261 8.013913 8.013913 8.013913h47.994435a8.013913 8.013913 0 0 0 8.013913-8.013913V360.002783a8.013913 8.013913 0 0 0-8.013913-8.013913z"
            p-id="4686"
          ></path>
        </svg>
        <svg
          t="1653280812253"
          class="icon play"
          v-show="!isplay"
          @click.stop="play($event)"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4534"
          width="200"
          height="200"
        >
          <path
            d="M512 64C264.592696 64 64 264.592696 64 512S264.592696 960 512 960 960 759.407304 960 512 759.407304 64 512 64z m0 820.001391C306.598957 883.97913 140.02087 717.401043 140.02087 512c0-205.401043 166.578087-371.97913 371.97913-371.97913S883.97913 306.576696 883.97913 512 717.423304 883.97913 512 883.97913z"
            p-id="4535"
          ></path>
          <path
            d="M719.404522 499.088696l-296.114087-214.995479a15.894261 15.894261 0 0 0-25.288348 12.911305v429.990956c0 13.111652 14.803478 20.502261 25.288348 12.911305l296.114087-215.01774a15.916522 15.916522 0 0 0 0-25.778086z m-257.602783 134.010434V390.90087L628.49113 512l-166.689391 121.09913z"
            p-id="4536"
          ></path>
        </svg>
        <svg
          svg
          t="1652839960236"
          class="icon back"
          @click="go(1)"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3817"
          width="200"
          height="200"
        >
          <path
            d="M755.904 348.192l156.8 38.304a8 8 0 0 0 9.92-7.68l0.768-161.504c0-6.72-7.68-10.528-12.896-6.304l-157.6 123.104a8 8 0 0 0 3.008 14.08z m167.68 301.12l-56.672-19.52a8 8 0 0 0-10.112 4.8 351.36 351.36 0 0 1-81.92 127.616 352.992 352.992 0 0 1-250.176 103.68c-47.808 0-94.08-9.28-137.696-27.776a352.992 352.992 0 0 1-112.512-75.904 354.624 354.624 0 0 1-75.904-112.512A353.44 353.44 0 0 1 171.008 512c0-47.808 9.28-94.208 27.808-137.792a351.36 351.36 0 0 1 75.872-112.512 352.992 352.992 0 0 1 250.112-103.68c47.808 0 94.08 9.28 137.696 27.776 42.112 17.792 80 43.392 112.512 75.904 10.208 10.304 19.776 20.992 28.576 32.32l59.84-46.816a428.8 428.8 0 0 0-338.816-165.216A429.216 429.216 0 0 0 95.008 516.384c2.4 235.52 193.92 425.6 429.792 425.6 185.504 0 343.488-117.6 403.712-282.272a8.16 8.16 0 0 0-4.896-10.4z"
            p-id="3818"
          ></path>
          <path
            d="M433.44 655.136V358.4h-34.048c-9.984 10.816-22.464 20.352-37.44 29.504-14.944 8.32-28.64 14.144-41.952 17.472v44.864c27.424-7.904 50.272-20.352 68.16-37.408v242.304h45.28z m160.416 5.824c29.536 0 54.88-8.736 76.064-26.208 22.432-19.52 34.08-44.48 34.08-75.2 0-32-9.152-56.96-26.592-75.2-17.472-18.304-40.32-27.456-68.16-27.456-13.312 0-25.76 2.08-36.576 6.656a78.08 78.08 0 0 0-31.584 20.352h-1.248l8.736-85.6h142.112V358.4H512l-16.192 166.24h42.368c5.824-10.816 13.728-18.72 24.512-23.68 9.984-4.992 21.216-7.072 34.496-7.072 19.968 0 34.912 5.824 45.728 17.44 10.816 11.648 16.192 27.84 16.192 48.64 0 19.104-6.208 34.08-18.688 45.696-12.48 11.2-27.84 17.056-46.144 17.056-16.64 0-29.92-3.744-39.872-11.2-11.232-8.32-17.888-21.216-19.52-37.856h-44.48c2.08 27.424 13.696 49.472 34.88 65.28 19.136 14.528 41.984 22.016 68.576 22.016z"
            p-id="3819"
          ></path>
        </svg>
      </div>
      <div class="progress-mulriple">
        <el-form :model="ruleForm" ref="ruleForm">
          <el-form-item prop="region" label="倍速">
            <el-select v-model="ruleForm.region" @change="mulriple">
              <el-option
                v-for="item in option"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import MmProgress from "./Progres.vue";
import { debounce } from "./utils/common.js";
export default {
  props: {
    //标题
    title: {
      default: "空空如也",
      type: String,
    },
    //需要播放的src
    src: {
      default: " ",
      type: String,
    },
    //需要错误弹窗
    message: {
      default: false,
      type: Boolean,
    },
    //倍数名称
    label: {
      default: "",
      type: String,
    },
    //是否需要展示选项框的border
    optionBorder: {
      default: true,
      type: Boolean,
    },
    //是否显示标题
    isTitle: {
      default: false,
      type: Boolean,
    },
    //是否加载完成
    onload: {
      default: true,
      type: Boolean,
    },
    //监听用户切换变化
    id: {
      default: "",
      type: String,
    },
    // 音频播放时间变化通知函数
    timeupdate: {
      default:'',
      type: Function,
    },
  },
  data() {
    return {
      //Audio dom元数
      audioEl: null,
      //当前已播放时长
      currentTime: 0,
      //总时长
      duration: 0,
      //当前播放状态
      isplay: false,
      progressChanging: false,
      //当前用户选择的倍数
      ruleForm: {
        region: "",
      },
      end: false,
      option: [
        {
          label: "0.75X",
          value: 0.75,
        },
        {
          label: "1.0X",
          value: 1.0,
        },
        {
          label: "1.2X",
          value: 1.25,
        },
        {
          label: "1.75X",
          value: 1.75,
        },
      ],
    };
  },
  computed: {
    progress() {
      if(!this.currentTime){
        return 0
      }
      return this.currentTime / this.duration;
    },
    Detail() {
      return URL.createObjectURL(new Blob([this.src]));
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.audioEl = this.$refs.audioRef;
      this.audioEl.src = this.src;
      // 默认暂停
      this.audioEl.pause();
      //默认播放1.5倍
      this.ruleForm.region = this.option[1].label;
      this.mulriple(this.option[1].value);
    });
  },
  watch: {
    // 临时加的 变更src重新加载 需要优化处理内部逻辑
    src: {
      deep: true,
      handler(n, o) {
        if (!this.src) {
          this.duration = 0;
          this.currentTime = 0;
          this.isplay = false;
          this.progressChanging = false;
         this.$nextTick(()=>{
            this.audioEl.src =''
         });
          return;
        }
        this.$nextTick(() => {
          this.audioEl = this.$refs.audioRef;
          this.audioEl.src = this.src;
          // 默认暂停
          this.audioEl.pause();
          //默认是播放按钮
          this.isplay = false;
          //默认播放1.5倍
          this.ruleForm.region = this.option[1].label;
          this.mulriple(this.option[1].value);
        });
      },
    },
    currentTime(n, o) {
      if (n >= 0 && this.timeupdate) {
        this.timeupdate(n);
      }
    }
  },
  methods: {
    endAudio() {
      this.isplay = false;
      this.end = true;
    },
    //播放事件
    play: debounce(
      function () {
        // 1 = MEDIA_ERR_ABORTED-用户中止获取过程

        // 2 = MEDIA_ERR_NETWORK-下载时发生错误

        // 3 = MEDIA_ERR_DECODE-解码时发生错误

        // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED-不支持音频
        if (this.onload) {
          this.$Mas("app", "正在加载音频文件", "reminder", {
            top: "5%",
            left: "45%",
          });
          return;
        }
        if (this.audioEl.error) {
          const { code } = this.audioEl.error;
          if (this.message) {
            switch (code) {
              case 1:
                this.$Mas("app", "用户中止获取过程", "error", {
                  top: "5%",
                  left: "45%",
                });
                break;
              case 2:
                this.$Mas("app", "下载时发生错误", "error", {
                  top: "5%",
                  left: "45%",
                });
                break;
              case 3:
                this.$Mas("app", "解码时发生错误", "error", {
                  top: "5%",
                  left: "45%",
                });
                break;
              case 4:
                this.$Mas("app", "不支持的音频格式", "error", {
                  top: "5%",
                  left: "45%",
                });
                break;

              default:
                this.$Mas("app", "网络错误!请刷新页面后重新尝试", "error", {
                  top: "5%",
                  left: "45%",
                });
                break;
            }
          }
        } else {
          if (this.end) {
            this.audioEl.load();
            // this.audioEl.play();
            this.isplay = true;
            this.end = false;
            return;
          }
          this.audioEl.play();
          this.isplay = true;
        }
      },
      1000,
      true
    ),
    //暂停事件
    pause() {
      this.audioEl.pause();
      this.isplay = false;
    },
    //调整倍数
    mulriple(number) {
      this.audioEl.playbackRate = number;
    },
    //获取总时长
    canplay(e) {
      this.duration = e.target.duration;
    },
    //当前已经播放的时长
    update(e) {
      if (!this.progressChanging) {
        this.currentTime = e.target.currentTime;
      }
    },
    onProgressChanging(e) {
      this.progressChanging = true;
      // 实时修改currentTime值
      this.currentTime = this.duration * e;
    },
    //快进 后退
    go: debounce(
      function (type) {
        if (type === 1) {
          this.audioEl.currentTime = parseInt(this.audioEl.currentTime) + 15;
        } else {
          this.audioEl.currentTime = parseInt(this.audioEl.currentTime) - 15;
        }
        this.play();
      },
      1000,
      true
    ),
    //点击进度条
    progressChanged(e) {
      // this.isplay = true;
      this.progressChanging = false;
      this.audioEl.currentTime = this.currentTime = this.duration * e;
      // this.audioEl.play();
    },
    //当前播放时间进行格式转换
    formatTime(interval) {
      // interval 向下取整
      interval = interval | 0;
      // 不足两位的话就向前填充一个0
      let minute = ((interval / 60) | 0) + "";
      let second = (interval % 60 | 0) + "";
      let len = minute.length;
      for (; len < 2; len++) {
        minute = "0" + minute;
      }
      len = second.length;
      for (; len < 2; len++) {
        second = "0" + second;
      }
      if (minute < 0) {
        minute = 0;
      }
      if (second <= 0) {
        second = "0" + "0";
      }
      if (parseInt(this.currentTime) >= parseInt(this.duration)) {
        minute = "0" + ((this.duration / 60) | 0);
        second = (this.duration % 60 | 0) + "";
      }
      return `${this.ChangeHourMinutestr(minute)}:${second.length <= 1 ? "0" + second : second}`;
    },
     ChangeHourMinutestr(str) {
      if (str !== "0" && str !== "" && str !== null) {
        return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
        (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
        }
        else
        {
        return "";
        }
    }
  },
  components: {
    MmProgress,
  },
};
</script>

<style scoped lang="scss">
@import "./variables.scss";

#Audio {
  border-radius: 8px;
  overflow: hidden;
  // overflow-x: scroll;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ::v-deep.bar-inner {
    overflow: inherit;
  }
  ::v-deep.progress {
    background: $--nav-active-color;
  }
  ::v-deep .progress-btn {
    top: 8px;
  }
  .progress-state {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    .progress-svg {
      display: flex;
      align-items: center;
      width: calc(100% - 230px);
      justify-content: center;
      margin-left: 140px;
      .icon {
        fill: $--main-text1-color;
        cursor: pointer;
        transition: all 1s;
        width: 26px;
        height: 26px;
      }
      .go {
        &:hover {
          transform: rotate(-20deg);
        }
      }

      .play {
        width: 40px;
        height: 40px;
        fill: $--main-text1-color;
        padding-left: calc(100% - 91%);
        padding-right: calc(100% - 91%);
      }

      .back {
        &:hover {
          transform: rotate(20deg);
        }
      }
    }

    .progress-mulriple {
      ::v-deep.el-form {
        .el-form-item {
          margin-bottom: 0px;
        }

        .el-input__inner {
          width: 88px;
          height: 32px;
        }
        .el-form-item__content {
          display: flex;
        }
      }
    }
  }

  .progress-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $--main-text-color;
    line-height: 24px;
    text-align: center;
    margin-top: 24px;
    // margin-right: 117px;
  }
}
.progress-wrapper {
  display: flex;
  width: 95%;
  padding: 10px 0;
  align-items: center;
  margin: 0 auto;
}
.progress-bar-wrapper{
  padding-left: 14px;
}

.time {
  width: 40px;
  flex: 0 0 40px;
  font-size: 8px;
  margin: 0 auto;
  font-size: 12px;
  font-family: "DingPro";
  font-weight: 400;
  color: $--main-text-color;
  line-height: 18px;
  padding-left: 15px;
  padding: 0 8px;
}

.time-l {
  text-align: left;
  // padding-right:14px;
}

.time-l {
  text-align: right;
}

.progress-bar-wrapper {
  flex: 1;
}
</style>
