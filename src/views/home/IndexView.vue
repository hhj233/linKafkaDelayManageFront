<template>

  <div>
    <el-header class="topHeader">linKafkaDelayTopicManager</el-header>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="activeIndex" @select="handleMenuSelect">
          <el-menu-item index="index">
            <el-icon><ChatLineSquare /></el-icon>
            <span>延迟主题</span>
          </el-menu-item>
          <el-menu-item index="delayMonitor">
            <el-icon><ChatLineSquare /></el-icon>
            <span>延迟监控</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="cardStyle">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script >
import {ElMessage} from "element-plus";
import router from "@/router";
import ajax from "@/components/ajax/ajax";

const REQUEST = {
  getDelayTopic: {
    'url': '/delayTopic/list',
    'method': 'post'
  }
}

export default {
  name: "index",
  data: function data() {
    return {
      activeIndex: "1"
    }
  },
  mounted: function mounted() {

  },
  methods:{
    handleMenuSelect(index) {
      this.activeIndex = index;
      router.push('/' + index)
    }
  }
}
</script>

<style scoped>
.topHeader {
  background-color: #001D36;
  color: #b1b3b8;
  text-align: center;
  line-height: 60px;
}
.aside{
  /*"height: 500px; border: 1px solid #eee"*/
  border: #001D36;
  width: 200px;
}
.cardStyle {
  height: 100%;
  width: 100%;
}
</style>