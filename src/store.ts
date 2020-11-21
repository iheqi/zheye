import { createStore } from 'vuex';
import {
  testData, testPosts, ColumnProps, PostProps,
} from './testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false,
    },
  },

  mutations: {
    login(state, payload) {
      console.log(payload, 'fuck');
      state.user = { isLogin: true, ...payload };
    },
  },
});
