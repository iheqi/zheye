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

  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter((c) => c.id > 2).length;
    },
    getColumnById: (state) => (id: number) => state.columns.find((c) => c.id === id),
    getPostByCid: (state) => (cid: number) => state.posts.filter((post) => post.columnId === cid),
  },
});
