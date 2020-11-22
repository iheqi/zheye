import { createStore } from 'vuex';
import axios from 'axios';
import {
  testPosts, ColumnProps, PostProps,
} from './testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  isLoading: boolean;
}

export default createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
    user: {
      isLogin: true,
      columnId: 1,
      name: 'qihe',
    },
    isLoading: false,
  },

  mutations: {
    login(state, payload) {
      state.user = { isLogin: true, ...payload };
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, data) {
      state.columns = data;
    },
    setLoading(state, flag) {
      state.isLoading = flag;
    },
  },

  actions: {
    fetchColumns(context) {
      axios.get('/mock/columns.json').then((resp) => {
        context.commit('fetchColumns', resp.data);
      });
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
