import Vue from 'vue';
import Router from 'vue-router';
import EntryForm from '@/components/EntryForm';
import LeaderBoard from '@/components/LeaderBoard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entryform',
      component: EntryForm,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderBoard,
    },
  ],
});
