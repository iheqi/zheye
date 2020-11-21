<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
  },

  setup() {
    const inputRef = ref<any>();
    const emailRef = reactive({
      val: '123@qq.com',
      error: false,
      message: '',
    });
    const emailRules = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
    ];

    const onFormSubmit = (res: boolean) => {
      console.log(inputRef.value);
      console.log('res', res);
    };

    return {
      user: {
        isLogin: true,
        name: 'qihe',
        id: 0,
      },
      emailRef,
      emailRules,
      onFormSubmit,
      inputRef,
    };
  },
});
</script>
