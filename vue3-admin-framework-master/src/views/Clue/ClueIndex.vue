<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import clueService from '@/services/clue';
import { useRouter } from 'vue-router';

const router = useRouter();
const clueList = ref();
const pageParams = ref({
  page: 1, //第几页
  pageSize: 5, //每页几条数据
  totalItems: 0
});
const statusList = ref([
  { label: '没有意向', value: 1 },
  { label: '意向一般', value: 2 },
  { label: '意向强烈', value: 3 },
  { label: '完成销售', value: 4 },
  { label: '取消销售', value: 5 }
]);

async function getClueList() {
  const page = pageParams.value.page;
  const pageSize = pageParams.value.pageSize;
  try {
    const { data, total } = await clueService.getClueList({ page, pageSize });
    clueList.value = data;
    pageParams.value.totalItems = total;
    console.log(clueList.value, pageParams.value.totalItems);
  } catch (error) {
    ElMessage({
      message: error.message,
      type: 'error'
    });
  }
}
getClueList();

// 分页事件处理
function handleCurrentChange(newPage) {
  pageParams.value.page = newPage;
  getClueList();
}

// 计算属性或方法来获取对应的 label
const statusLabel = computed(() => {
  const labelMap = new Map(statusList.value.map((item) => [item.value, item.label]));
  return (value) => labelMap.get(value) || '未知';
});
</script>

<template>
  <div class="container">
    <div class="app-container">
      <el-table style="width: 100%" :data="clueList">
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" prop="utm" label="线索来源"></el-table-column>
        <el-table-column
          align="center"
          prop="created_time_display"
          label="创建时间"
        ></el-table-column>
        <el-table-column align="center" prop="sales_name" label="跟踪销售"></el-table-column>
        <el-table-column align="center" prop="status" label="线索状态">
          <template v-slot="{ row }">
            {{ statusLabel(row.status) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注信息"></el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <el-button
              type="success"
              link
              @click="router.push({ name: 'ClueDetails', params: { id: row.id } })"
              >跟踪线索</el-button
            >
            <el-button
              type="success"
              link
              @click="router.push({ name: 'ClueRecord', params: { id: row.id } })"
              >跟踪记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="end" align="middle" style="height: 60px">
      <el-pagination
        background
        v-model:current-page="pageParams.page"
        :page-size="pageParams.pageSize"
        layout="total,prev, pager, next"
        :total="pageParams.totalItems"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: calc(100% - 10px);
  padding: 5px;
  background-color: #fff;
  .app-container {
    display: flex;
    .left {
      width: 280px;
      padding: 20px;
    }
    .right {
      flex: 1;
      padding: 20px;
      .opeate-tool {
        margin: 5px;
      }
    }
  }
}
</style>
