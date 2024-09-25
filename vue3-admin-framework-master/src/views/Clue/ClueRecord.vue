<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import clueService from '@/services/clue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const logForm = ref({
  content: null,
  clue_id: router.currentRoute.value.params.id
});
const logList = ref();

// 增添记录
async function handleAddLog() {
  try {
    const { code, message } = await clueService.logAdd({ ...logForm.value });
    if (code === 200) {
      ElMessage({
        message: message,
        type: 'success'
      });
      getLogList();
      router.push('/clue');
    } else {
      ElMessage({
        message: message,
        type: 'error'
      });
    }

    logForm.value.content = null;
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error'
    });
  }
}

// 获取记录列表
async function getLogList() {
  try {
    const { data } = await clueService.logList({ clue_id: router.currentRoute.value.params.id });
    logList.value = data;
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error'
    });
  }
}
getLogList();
</script>

<template>
  <div class="log-section">
    <ul class="log-list">
      <li class="log-item" v-for="item in logList" :key="item.id">
        <p class="log-date">{{ item.created_time_display }}</p>
        <p class="log-content">{{ item.content }}</p>
      </li>
      <li v-if="!logList" class="log-item">
        <p class="log-content">当前没有记录</p>
      </li>
    </ul>
    <div class="form-section log-form">
      <p class="form-text">添加记录:</p>
      <el-input
        type="textarea"
        placeholder="请输入线索记录"
        :row="3"
        style="width: 100%"
        v-model="logForm.content"
      />
      <div class="form-item">
        <!-- 提交按钮 -->
        <el-button style="width: 100%" type="primary" @click="handleAddLog">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.form-textarea {
  width: 400px;
  height: 100px;
  outline: 0;
}

.form-section {
  display: block;
  width: 450px;
  margin-top: 20px;
}

.form-item {
  margin: 15px 0;
}

.log-section {
  margin-left: 60px;
  padding: 0 20px;
}

.log-item {
  margin-left: 20px 0;
}

.log-item .log-date {
  font-size: 16px;
}

.log-content {
  font-size: 14px;
  color: #666;
}
</style>
