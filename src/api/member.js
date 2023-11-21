import { api } from 'boot/axios';

export default {

  // 取得員工基本資訊
  getMembers: () => {
    return api.get('/members');
  },

  getSearchMembers: (payload) => {
    return api.post('/members/search', payload);
  },

};
