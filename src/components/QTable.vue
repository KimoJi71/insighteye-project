<template>
  <q-table
    class="q-mt-sm custom-table"
    row-key="id"
    :columns="columns"
    :rows="rows"
    flat
    bordered
    selection="multiple"
    :selected-rows-label="() => ''"
    v-model:selected="state.selected"
  >

    <!-- 各欄位的搜尋 -->
    <template v-slot:top-row>
      <template v-if="showFilterColumn">
        <q-tr class="custom-table-filter">
          <q-td></q-td>
          <q-td v-for="col in columns" :key="col.name">
            <template v-if="col.showFilter">
              <!-- 文字搜尋 -->
              <q-input
                v-model="state.columnsFilter[col.name]"
                :placeholder="`搜尋${col.label}`"
                color="primary"
                dense
                rounded
                outlined
                clearable
                @blur="filterData"
              />
            </template>
          </q-td>
        </q-tr>
      </template>
    </template>

    <!-- cell tooltip -->
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <div>
          {{ props.value }}
          <q-tooltip anchor="bottom left" self="top start" :offset="[5, 5]">
            <div>{{ props.value }}</div>
          </q-tooltip>
        </div>
      </q-td>
    </template>
  </q-table>
</template>
<script>
import { reactive, onMounted } from 'vue';

export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },

    rows: {
      type: Array,
      default: () => [],
    },

    showFilterColumn: {
      type: Boolean,
      default: () => false,
    },
  },

  setup(props, { emit }) {

    const state = reactive({
      // for selection
      selected: [],

      // for filtering
      columnsFilter: {},
    });


    // onMounted
    onMounted(() => {});


    // Method
    const filterData = async () => {
      let filters = Object.keys(state.columnsFilter)
        .filter(column => state.columnsFilter[column] !== '' && state.columnsFilter[column] !== null);

      // 需要被篩選的欄位
      let filterObj = {};
      filters.forEach(column => {
        filterObj[column] = state.columnsFilter[column];
      });

      emit('filter', filterObj);
    };
    

    return {
      state,
      filterData,
    };
  },
};
</script>
<style lang="scss">
.custom-table {
  max-height: calc(100vh - 48px - 36px - 8px);

  th {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fff;
  }

  .custom-table-filter {
    position: sticky;
    top: 55px;
    z-index: 99;
    background-color: #fff;
  }
}
</style>
