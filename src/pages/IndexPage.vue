<template>
  <q-page class="row justify-center q-px-xl q-py-lg">
    <div class="block-item">
      <div class="row justify-between items-center">
        <div class="text-h6">員工基本資訊</div>
        <div>
          <q-btn
            class="q-mr-sm"
            color="primary"
            label="新增"
            @click="addRow()"
          />
          <q-btn
            color="primary"
            label="刪除"
            outline
            :disable="selectedRows.length === 0"
            @click="deleteRows()"
          />
        </div>
      </div>
      <QTable
        ref="qTableRef"
        :columns="state.columns"
        :rows="state.rows"
        :showFilterColumn="true"
        @filter="onFilter"
      />
    </div>

    <ConfirmDialog
      v-if="state.showDialog"
      :showDialog="state.showDialog"
      :title="state.dialogData.title"
      :content="state.dialogData.content"
      @confirm="state.dialogData.onConfirm"
      @cancel="state.showDialog = false;"
    />

  </q-page>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useDateFormat } from 'src/composition-api';
import api from 'src/api/index';

import QTable from 'src/components/QTable.vue';
import ConfirmDialog from 'src/components/ConfirmDialog.vue';

export default {
  name: 'IndexPage',

  components: {
    QTable,
    ConfirmDialog,
  },

  setup () {

    const $q = useQuasar();
    const { getDate } = useDateFormat();

    const qTableRef = ref(null);

    const state = reactive({
      columns: [
        {
          name: 'name',
          label: '姓名',
          align: 'left',
          field: 'name',
          sortable: true,
          showFilter: true,
        },
        {
          name: 'cellphone',
          label: '手機',
          align: 'left',
          field: 'cellphone',
          sortable: true,
          showFilter: true,
        },
        {
          name: 'email',
          label: '信箱',
          align: 'left',
          field: 'email',
          sortable: true,
          showFilter: true,
        },
        {
          name: 'gender',
          label: '性別',
          align: 'left',
          field: 'gender',
          sortable: true,
          showFilter: true,
        },
        {
          name: 'birthday',
          label: '生日',
          align: 'left',
          field: 'birthday',
          sortable: true,
          showFilter: false,
        },
      ],
      rows: [],

      // for dialog
      showDialog: false,
      dialogData: {},
    });


    // Computed
    const selectedRows = computed({
      get: () => qTableRef.value?.state.selected || [],
      set: (val) => val,
    });
    
    
    // onMounted
    onMounted(async () => {
      try {
        const res = await api.member.getMembers();
        if (res?.data?.members) {
          state.rows = handleMembers(res.data.members);
        }
      } catch (err) {
        return err;
      }
    });


    // Method
    // 搜尋資料
    const onFilter = async (filter) => {
      try {
        const res = Object.keys(filter).length
          ? await api.member.getSearchMembers({ filter })
          : await api.member.getMembers();
        if (res?.data?.members) {
          state.rows = handleMembers(res.data.members);
        }
      } catch (err) {
        return err;
      }
    };
    
    const handleMembers = (members) => {
      let result = members.map(m => {
        return {
          ...m,
          id: Math.random().toString(36).substr(2),
          birthday: getDate(m.birthday),
        }
      });
      return result;
    };

    // 新增一列在最上方
    const addRow = () => {
      state.rows.unshift({
        id: Math.random().toString(36).substr(2),
      });
    };

    // 刪除資料
    const deleteRows = () => {
      let deletedRowIds = selectedRows.value.map(r => r.id);

      state.showDialog = true;
      state.dialogData = {
        title: '刪除',
        content: `<p>是否確定刪除${selectedRows.value.length}筆資料？</p>`,
        onConfirm: () => {
          state.rows = state.rows.filter(r => !deletedRowIds.includes(r.id));
          state.showDialog = false;
          $q.notify({
            type: 'positive',
            color: 'green',
            message: '刪除成功',
            icon: 'task_alt',
            position: 'top',
          });
        },
      };
    };


    return {
      qTableRef,
      state,
      selectedRows,
      onFilter,
      addRow,
      deleteRows,
    }
  }
};
</script>
<style lang="scss" scoped>
.block-item {
  width: 100vw;
}
</style>
