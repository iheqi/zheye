<template>
  <div class="file-upload">
    <button @click.prevent="triggerUpload" class="btn btn-primary">
      <span v-show="fileStatus === 'loading'">正在上传...</span>
      <span v-show="fileStatus === 'success'">上传成功</span>
      <span v-show="fileStatus === 'error'">上传失败</span>
      点击上传
    </button>

    <input @change="handleFileChange" type="file" class="file-input d-none" ref="fileInput">
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error';

export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>('ready');
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChange = (e: InputEvent) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        fileStatus.value = 'loading';
        const files = Array.from(currentTarget.files);
        const formData = new FormData();
        formData.append('file', files[0]);

        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((resp) => {
          console.log(resp.data);
          fileStatus.value = 'success';
        }).catch((err) => {
          console.log(err);
          fileStatus.value = 'error';
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = '';
          }
        });
      }
    };
    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      fileStatus,
    };
  },
});
</script>
