<template xmlns="http://www.w3.org/1999/html">
  <div class="cardStyle">
    <el-card>
      <el-form>
        <el-form-item label="延时主题">
          <el-select v-model="delayTopicChoose" placeholder="选择topic">
            <el-option
                v-for="item in delayTopicSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table
        :data="delayTopicSelect"
        style="width: 100%">
      <el-table-column
          prop="label"
          label="主题"
          width="300">
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template #default="scope">
          <el-button type="primary" @click="delayTopicDetail(scope.row.label)">详情</el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog
        v-model="dialogVisible"
        title="主题详情"
        width="50%"
        :before-close="handleClose">
      <el-card class="card-item">
        <el-descriptions title="基础信息">
          <el-descriptions-item label="主题">{{this.delayTopicDetailData.topic}}</el-descriptions-item>
          <el-descriptions-item label="消费者组">{{this.delayTopicDetailData.groupId}}</el-descriptions-item>
          <el-descriptions-item label="分区数">{{this.delayTopicDetailData.partitionInfo.length}}</el-descriptions-item>
          <el-descriptions-item label="数据大小">{{this.delayTopicDetailData.size/1024/1024}}(MB)</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="card-item">
        <el-table
            :data="this.delayTopicDetailData.partitionInfo"
            style="width: 100%">
          <el-table-column
              prop="partition"
              label="partition"
              width="180">
          </el-table-column>
          <el-table-column
              label="leader"
              width="180">
            <template #default="scope">
              <div>
                <el-tag type="danger">
                  {{ scope.row.leader.id }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="replicas">
            <template #default="scope">
              <div>
                <el-tag v-for="item in scope.row.replicas" :key="item.id">
                  {{ item.id }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="isr">
            <template #default="scope">
              <div>
                <el-tag type="success" v-for="item in scope.row.isr" :key="item.id">
                  {{ item.id }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="lag"
          >
            <template #default="scope">
              <div class="font_red">
                {{scope.row.lag}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="lead"
          >
            <template #default="scope">
              <div class="font">
                {{scope.row.lead}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "@/components/ajax/ajax";
const REQUEST = {
  getDelayTopic: {
    'url': '/delayTopic/list',
    'method': 'post'
  },
  getDelayTopicDetail: {
    'url': '/delayTopic/detail',
    'method': 'post'
  }
}
export default {
  name: "delayTopic",
  data: function data() {
    return {
      delayTopicSelect: [],
      delayTopicChoose: '',
      dialogVisible: false,
      dialogHead: '',
      delayTopicDetailData: {}
    }
  },
  mounted: function mounted() {
    this.delayTopicList()
  },
  methods:{
    delayTopicList() {
      ajax({
        ...REQUEST['getDelayTopic']
      }).then(res => {
        console.log(res)
        if (res.code = 200) {
          this.delayTopicSelect = res.data.map(value => ({ value: value, label: value }))
          this.tableData = res.data
        }
      })
    },
    delayTopicDetail(topic) {
      console.log("topic"+topic)
      let param = {
        'topic': topic
      }
      ajax({
        ...REQUEST['getDelayTopicDetail'],
        data: param
      }).then(res => {
        if (res.code == 200) {
          console.log(res.data)
          this.delayTopicDetailData = res.data
          this.dialogHead = this.delayTopicDetailData.topic + "-详情"
          this.dialogVisible = true
          console.log(this.dialogVisible)
        }
      })

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>
.cardStyle {
  height: 100%;
  width: 100%;
}
.card-item {
  margin-bottom: 20px; /* 下方间距 */
}
.font {
  font-weight: bold;
  color: #337ecc;
}
.font_red {
  font-weight: bold;
  color: #c45656;
}
</style>