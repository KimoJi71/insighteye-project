<template>
  <q-dialog v-model="state.showDialog" persistent>
    <q-card class="q-pa-lg dialog">
      <q-card-section align="center">
        <q-toolbar-title class="dialog-title">
          {{ title }}
        </q-toolbar-title>
      </q-card-section>

      <q-card-section align="center">
        <div class="dialog-content" v-html="content"></div>
      </q-card-section>

      <q-card-actions class="custom-button-group q-mt-lg" align="center">
        <q-btn
          @click="cancel()"
          label="取消"
          color="primary"
          outline
        />
        <q-btn
          @click="confirm()"
          label="確定"
          color="primary"
          unelevated
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { reactive, onMounted } from 'vue';

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => '',
    },
    content: {
      type: String,
      default: () => '',
    },
  },

  setup (props, {emit}) {
    const state = reactive({
      showDialog: false,
    });


    // onMounted
    onMounted(() => {
      state.showDialog = props.showDialog;
      state.optionalData = props.optionalData;
      state.optionVal = props.optionalData ? props.optionalData.optionVal : '';
    });


    // Method
    const confirm = () => {
      emit('confirm');
    };

    const cancel = () => {
      emit('cancel');
    };


    return {
      state,
      confirm,
      cancel,
    };
  }
};
</script>
<style scoped lang="scss">
.dialog {
  max-width: 400px;
  width: 400px;
  .q-card__section {
    padding-bottom: 0;
  }
}

.dialog-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 28px;
}

.dialog-content {
  font-size: 16px;
}

.custom-button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 12px;
  width: 100%;
  .q-btn {
    padding: 0;
    width: max-content;
    flex-grow: 1;
  }
}
</style>