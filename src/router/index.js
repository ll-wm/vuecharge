import Vue from 'vue'
import Router from 'vue-router'
import Usertable from '@/components/usertable.vue'
import Role from '@/components/role.vue'
import Chara from '@/components/chara.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Usertable',
      meta:{
        title:'用户信息'
      },
      component:Usertable
    },
    {
      path:'/Usertable',
      name:'Usertable',
      meta:{
        title:'用户信息'
      },
      component:Usertable
    },
    {
      path:'/Role',
      name:'Role',
      meta:{
        title:'角色信息'
      },
      component:Role
    },
    {
      path:'/Chara',
      name:'Chara',
      meta:{
        title:'用户角色详情'
      },
      component:Chara
    }
   
  ]
})
