<template>
  <div class="container">
    <div>
      <el-menu class="el-menu-vertical-demo">
        <RouterLink to="/map">
          <el-menu-item index="1">
            <el-icon><Menu /></el-icon>
            <template #title>Map</template>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/log">
          <el-menu-item index="2">
            <el-icon><Setting /></el-icon>
            <template #title> Log</template>
          </el-menu-item>
        </RouterLink>
      </el-menu>
    </div>

    <div class="content">
      <RouterView />
    </div>

    <el-dialog v-model="dialogVisible" title="Connection" width="30%" center>
      <el-table
        ref="singleTableRef"
        :data="connections"
        highlight-current-row
        style="width: 100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          property="connection"
          label="Connection"
          header-align="center"
          align="center"
        />

        <el-table-column
          label="Status"
          header-align="center"
          align="center"
          width="100"
        >
          <template #default="scope">
            <div v-if="scope.row.status == true" class="connectionTableCell">
              Active<el-icon size="20" color="#67C23A"><CircleCheck /></el-icon>
            </div>
            <div v-else class="connectionTableCell">
              Inactive<el-icon size="20" color="#F56C6C"
                ><CircleClose
              /></el-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="dialogVisible = false"
            :disabled="!currentRow || (currentRow && !currentRow.status)"
          >
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
// import SerialPort from "serialport";
import {
  Menu,
  Setting,
  CircleCheck,
  CircleClose,
} from "@element-plus/icons-vue";
import axios from "axios";

const dialogVisible = ref(false);
const currentRow = ref();
const get4GStatus = async () => {
  let res = await axios.get("http://3.139.94.118:8080/get-current-position");
  let difference =
    new Date().getTime() - new Date(res.data.timestamp).getTime();

  connections.value[0].status = difference >= 0 && difference <= 5000;
};

const getSerialStatus = () => {
  // const port = new SerialPort({
  //   path: "/dev/tty.usbserial-D30EZNZF",
  //   baudRate: 57600,
  // });
  connections.value[1].status = true;
};
onMounted(() => {
  dialogVisible.value = true;
  get4GStatus();
  // getSerialStatus();
});
interface Connection {
  connection: string;
  status: Boolean;
}

const handleCurrentChange = (val: Connection | undefined) => {
  currentRow.value = val;
};

const connections = ref([
  {
    connection: "4G LTE Modem",
    status: false,
  },
  {
    connection: "Telemetry Radio",
    status: true,
  },
]);
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.container {
  display: flex;
}

.content {
  height: 100vh;
  flex: 1;
}

.connectionTableCell {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
