<!-- 子组件 -->
<template id="myCpn">
  <div class="progress-bar">
    <!-- 后面黑色的一条 -->
    <div class="bar-inner" @click="clickProgress" :style="barColor">
      <!-- 已经播放的区域 -->
      <div class="progress" :style="progressStyle" ref="progress"></div>
      <!-- btn -->
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @mousedown="onMouseStart"
      >
        <div class="progress-btn" :style="btnColor"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "./utils/common.js";
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    barColor: {
      type: String,
      default: `height:8px;background: rgba(255, 255, 255, 0.45);`,
    },
    // border-radius:20px 100px 100px 0px;
    btnColor: {
      type: String,
      default: `width:11px;height:11px;border:3px solid #44CD7C;background: #44CD7C;border-radius:50%;`,
    },
    //重新计算滚动条
    resize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      offset: 0,
      progressBtnWidth: 0,
      countWidth: 0,
      flag: false,
    };
  },
  mounted() {
    this.bindEvents();
    if (this.resize) {
      window.onresize = (e) => {
        this.refashSize();
      };
    }
    this.refashSize();
  },
  created() {
    this.touch = {};
  },
  computed: {
    //计算播放时的偏移量
    progressStyle() {
      if (this.offset > this.countWidth) {
        return `width: ${this.countWidth}px`;
      } else {
        return `width: ${this.offset}px;`;
      }
    },
    btnStyle() {
      if (this.offset < 0) {
        return `transform: translate3d(0px,0,0)`;
      } else {
        if (this.offset > this.countWidth) {
          return `transform: translate3d(${this.countWidth}px,0,0)`;
        } else {
          return `transform: translate3d(${this.offset}px,0,0)`;
        }
      }
    },
  },
  watch: {
    progress(newProgress) {
      // 进度条宽度
      const barWidth = this.$el.clientWidth - this.progressBtnWidth;
      this.offset = barWidth * newProgress;
    },
  },
  methods: {
    refashSize: function () {
      const barWidth = this.$el.clientWidth - this.progressBtnWidth;
      this.$nextTick(() => {
        this.countWidth = barWidth;
        // if(this.$refs.progress.clientWidth>=barWidth){
        //   this.offset=barWidth
        //   return
        // }
        // this.offset = barWidth - this.$refs.progress.clientWidth;
      });
    },
    //鼠标按下 进度条
    onMouseStart: debounce(
      function (e) {
        this.touch.x1 = e.clientX;
        // 黄色进度条初始宽度
        this.touch.beginWidth = this.$refs.progress.clientWidth;
        this.flag = true;
        document
          .querySelector("#Audio")
          .addEventListener("mousemove", this.onMouseMove);
      },
      1000,
      true
    ),
    //按下滑动事件
    onMouseMove(e) {
      e.preventDefault();
      if ( !this.flag ) {
        return
      }
      // x偏移量
      const delta = e.clientX - this.touch.x1;
      // 之前的width+这次拖动增加的偏移量=应有的黄条长度
      const tempWidth = this.touch.beginWidth + delta;
      // 再拿到barWidth
      const barWidth = this.$el.clientWidth - this.progressBtnWidth;
      // 黄条长度/barwidth = progress 现在应该有的进度
      const progress = tempWidth / barWidth;
      this.countWidth = barWidth;
      this.offset = barWidth * progress;
      this.$emit("progress-changing", progress);
    },
    //鼠标按下抬起事件
    onMouseEnd: debounce(
      function (e) {
        const barWidth = this.$el.clientWidth - this.progressBtnWidth;
        const progress = this.$refs.progress.clientWidth / barWidth;
        this.$emit("progress-changed", progress);
        document
          .querySelector("#Audio")
          .removeEventListener("mousemove", this.onMouseMove);
        this.flag = false;
      },
      1000,
      true
    ),
    // 点击进度条
    clickProgress(e) {
      this.$el.getBoundingClientRect();
      const rect = this.$el.getBoundingClientRect();
      // 黄条应有的宽度
      const offsetWidth = e.pageX - rect.x;
      const barWidth = this.$el.clientWidth - this.progressBtnWidth;
      const progress = offsetWidth / barWidth;
      this.$emit("progress-changed", progress);
    },
    // 添加绑定事件
    bindEvents() {
      document
        .querySelector("#Audio")
        .addEventListener("mousemove", this.onMouseMove);
      document
        .querySelector("#Audio")
        .addEventListener("mouseup", this.onMouseEnd);
      document
        .querySelector(".progress-bar")
        .addEventListener("mouseleave", () => {
          if (this.flag) {
            document
              .querySelector("#Audio")
              .removeEventListener("mousemove", this.onMouseMove);
            this.onMouseEnd();
          }
        });
    },
    // 移除绑定事件
    unbindEvents() {
      window.removeEventListener("mousemove", this.onMouseMove);
      window.removeEventListener("mouseup", this.onMouseEnd);
      window.removeEventListener("mouseleave", this.onMouseEnd);
    },
  },
  beforeDestroy() {
    this.unbindEvents();
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.progress-bar {
  height: 30px;
  cursor: pointer;
}

.bar-inner {
  position: relative;
  top: 11px;
  height: 6px;
  background-color: $--progress-back;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  position: absolute;
  height: 100%;
  background: #44cd7c;
  border-radius: 5px;
}

.progress-btn-wrapper {
  position: absolute;
  left: 0px;
  top: -11px;
  width: 30px;
  height: 30px;
}

.progress-btn {
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  top: 9px;
  left: -5px;
}
</style>
