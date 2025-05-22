import { createRouter, createWebHashHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'
import UserDetailView from '../views/UserDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'userList',
    component: UserListView,
  },
  {
    path: '/users/:id',
    name: 'userDetail',
    component: UserDetailView,
    props: true,
  },
  {
    path: '/:pathMath(.*)*',
    name: 'notFound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
