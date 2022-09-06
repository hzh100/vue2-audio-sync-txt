<template>
  <div class="warp">
    <el-form :model="form" ref="formRef" label-width="100px">
      <!-- <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="活动区域">
        <el-select v-model="form.area" multiple :disabled="!!form.name">
          <el-option value="1" label="one"></el-option>
          <el-option value="2" label="two"></el-option>
        </el-select>
      </el-form-item> -->
      <FormItemDemo
        v-for="(item, index) in config"
        :key="index"
        :item-config="item"
        :config="config"
      />

      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')"
          >提交</el-button
        >
        <el-button @click="resetForm('formRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

/**
 * https://mp.weixin.qq.com/s/hICH4Z7utFBLyc5NG_eTJQ
 */
import FormItemDemo from "./FormItemDemo.vue";

const config = [
  {
    type: "el-input",
    label: "活动名称",
    formKey: "name",
    value: "ddd", // 默认值为空字符串
    options: {
      vIf: [
        // 表示：当 form.area === 'area1'，才显示
        { relationKey: "area", value: "area1" },
      ],
    },
  },
  {
    type: "el-select",
    label: "活动区域",
    formKey: "area",
    value: "area1",
    options: {
      multiple: true,
    },
    optionData: [
      // 这里模拟去后端拉回数据
      { label: "区域1", value: "area1" },
      { label: "区域2", value: "area2" },
    ],
  },
]

function optimize (array) {
  return array.reduce((acc, cur) => {
    for (const key of Object.keys(cur)) {
      if (key === 'value') continue
      // 将不是 value 的属性都进行非响应式优化
      Object.defineProperty(cur, [key], { enumerable: false })
    }
    acc.push(cur)
    return acc
  }, [])
}

export default {
  name: "HelloWorld",
  props: {},
  components: {
    FormItemDemo,
  },
  data() {
    return {
      form: {
        name: "",
        area: "",
      },
      config: optimize(config),
    };
  },
  mounted() {
    console.log(this.config);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.config);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
</style>
