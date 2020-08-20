<template>
  <div class="tmenu" style="width: 100%">
    <a-menu
      :default-selected-keys="[choosed=''?choosed:'1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      
    >
     <a-menu-item key="0" title="" :display="disp==true?'none':'block'"  style="height:60px;background-Color:#001529;text-align: center;">
        <a-icon type=""/>
        <span class="tspan">用户角色管理</span>
      </a-menu-item>
      <a-menu-item key="1"  :src='user'>
        <router-link to='/Usertable'>
          <a-icon type="user"/>
          <span>用户信息</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2" :src='role'>
        <router-link to="/Role">
          <a-icon type="team" />
          <span>角色信息</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3" :src='chara'>
        <router-link to="/Chara">
          <a-icon type="info" />
          <span>角色详情</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <div class="left">
      <a-button class="mbutton" type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="table">
        <div class="tb1">
          <!-- <UserTable></UserTable> -->
          <router-view></router-view>
        </div>
        
      </div>
    </div>
   
  </div>
</template>

<script>
import UserTable from './usertable'
export default {
  components:{
    UserTable
  },
  data() {
    return {
      collapsed: false,
      disp:true,
      user:'/Usertable',
      role:'/Role',
      chara:'/Chara',
      list:{
        Usertable:'1',
        Role:'2',
        Chara:'3'
      },
      tempurl:'',
      choosed:'',
      rout:''
    };
  },
  beforeMount(){
    let url = this.$route.path
    let len = url.length
    this.tempurl = url.split('/')[1]
    this.choosed = this.list[this.tempurl]
    console.log(this.tempurl);
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    swit(event){
      // console.log('ok');
      this.rout = event.domEvent.currentTarget.getAttribute("src")
      this.$router.replace(this.rout)
      console.log(event.domEvent.currentTarget.getAttribute("src"));
      // console.log(event.domEvent.currentTarget);
    }
  },
};
</script>
<style scoped>
.tmenu{
  height: 100%;
  display: flex;
  flex-direction: row;
}
ul{
  height: 100%;
}
.mbutton{
  margin: 10px;
}
.tspan{
  color: #ffffff;
  font-size: 20px;
  line-height: 60px;
  margin-left: -35px;
}
.left{
  width: 400%;
}
.table{
  width: 100%;
  padding: 10px;
  background-color: #F0F2F5;
}
.tb1{
  padding: 20px;
  background-color: #ffffff;
}
</style>
