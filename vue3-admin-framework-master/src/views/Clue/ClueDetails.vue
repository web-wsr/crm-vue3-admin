<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import clueService from '@/services/clue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index';

const { permissions } = useStore();
const router = useRouter();
const userInfoForm = ref({
  user_id: null,
  status: null,
  remark: null
});
const salesList = ref();
const statusList = ref([
  { label: '没有意向', value: 1 },
  { label: '意向一般', value: 2 },
  { label: '意向强烈', value: 3 },
  { label: '完成销售', value: 4 },
  { label: '取消销售', value: 5 }
]);

async function getClueDetails() {
  const id = router.currentRoute.value.params.id;
  const { clue, sales } = await clueService.getClueDetails({ id });
  userInfoForm.value = clue;
  salesList.value = sales;
}
router.currentRoute.value.params.id && getClueDetails();

// 在 onMounted 钩子中进行权限检查。
onMounted(() => {
  if (!permissions.includes('clue-details')) {
    ElMessage({
      message: '无权限访问此页面,3s后自动跳转',
      type: 'error'
    });
    router.push('/403');
    setTimeout(() => {
      router.push('/clue');
    }, 3000);
  }
});

async function updateClue() {
  const id = router.currentRoute.value.params.id;
  const data = userInfoForm.value;
  try {
    const res = await clueService.updateClue({ id, ...data });
    if (res.code === 200) {
      ElMessage({
        message: res.message,
        type: 'success'
      });
      router.push('/clue');
    }
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error'
    });
  }
}
</script>

<template>
  <div class="content-mainer">
    <el-form label-width="auto" style="max-width: 600px" class="clue-form" :model="userInfoForm">
      <div class="form-item">
        <span class="form-text">联系电话: {{ userInfoForm.name }}</span>
      </div>
      <div class="form-item">
        <span class="form-text">联系电话: {{ userInfoForm.phone }}</span>
      </div>
      <div class="form-item">
        <span class="form-text">线索来源: {{ userInfoForm.utm }}</span>
      </div>
      <div class="form-item">
        <span class="form-text">创建时间: {{ userInfoForm.created_time_display }}</span>
      </div>
      <div class="form-item" style="height: 40px; margin: 10px 0">
        <el-form-item prop="user_id" label="当前分配的销售：" class="form-item"> </el-form-item>
      </div>
      <el-select
        v-model="userInfoForm.user_id"
        placeholder="请选择分配的销售人员"
        style="width: 400px"
      >
        <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>

      <div class="form-item" style="height: 40px; margin: 10px 0">
        <el-form-item prop="status" label="当前客户的状态：" class="form-item"></el-form-item>
      </div>
      <el-select
        v-model="userInfoForm.status"
        placeholder="请选择客户的销售状态"
        style="width: 400px"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="form-item" style="height: 40px; margin: 10px 0">
        <el-form-item prop="remark" label="当前客户线索备注:" class="form-item"></el-form-item>
      </div>

      <el-input
        type="textarea"
        placeholder="备注"
        :row="2"
        style="width: 400px"
        v-model="userInfoForm.remark"
      />
      <div class="form-item">
        <!-- 提交按钮 -->
        <el-button style="width: 100%" type="primary" @click="updateClue">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.form-section {
  display: block;
  width: 450px;
}

.clue-form {
  display: flex;
  flex-direction: column;

  padding: 0 100px;
}

/* form表单样式 */
.form-item {
  width: 400px;
  margin: 15px 0;
}

.form-input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: none;
  outline: 0;
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
}
</style>
