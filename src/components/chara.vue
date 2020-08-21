<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination" @change='laload()'>
      <template slot="username" slot-scope="text, record">
        <!-- <a-input v-if=dataSource[record.index].editable  type="text" :value="text" @change="Changeu"></a-input> -->
        <a-select  v-if=record.editable :default-value=text style="width: 120px" @focus="sele">
          <a-select-option v-for="(item,index) in datauser" @click="handlechange(item)" :key="(item,index)" :value="(item,index)">
            {{item.username}}
          </a-select-option>
        </a-select>
        <div v-else>
          {{ text || ' ' }}
        </div>
        
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'username', $event)" /> -->
      </template>
      <template slot="rolename" slot-scope="text, record">
        <!-- <a-input v-if=dataSource[record.index].editable  type="text" :value="text" @change="Changep"></a-input> -->
        <a-select  v-if=record.editable :default-value=text style="width: 120px" @focus="selerole">
          <a-select-option v-for="(item,index) in datarole" @click="handlechangerole(item)" :key="(item,index)" :value="(item,index)">
            {{item.rolename}}
          </a-select-option>
        </a-select>
        <div v-else>
          {{ text || ' ' }}
        </div>
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'username', $event)" /> -->
      </template>
      <template slot="operation" slot-scope="text, record">
        <a v-if=record.editable href="javascript:;" @click="save(record.key,$event)">Save &nbsp&nbsp&nbsp</a>
        <a v-if="record.editable" href="javascript:;" @click="cancle(record.key,$event)">Cancle &nbsp&nbsp&nbsp</a>
        <a v-else href="javascript:;" @click="edit(record.key,$event)">Edit &nbsp&nbsp&nbsp</a>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          
          <a href="javascript:;"> Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {
    // EditableCell,
  },
  data() {
    return {
      dataSource: [
        {
          key: '0',
          username: 'Edward King 0',
          rolename: '32',
          index:0,
          editable:false
        },
        {
          key: '1',
          username: 'Edward King 1',
          rolename: '32',
          index:1,
          editable:false
        },
      ],
      pagination:{
        current:1,
        defaultCurrent:1,
        defaultPageSize:5,
        pageSize:8,
        onChange: (current,size)=>{
          console.log('current'+current);
          this.current = current
        }
      },
      datauser:[],//user
      datarole:[],//role
      count: 2,
      editable:false,//决定是否处于修改状态
      uname:'',
      upwd:'',
      val:'',
      isadd:0,
      incount:0,
      maxid:0,//插入数据id
      usname:'',
      roname:'',
      tempo:0,//当前数据在数组里面的index
      current:1,//页码
      tempcurrent:0,
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          width: '30%',
          scopedSlots: { customRender: 'username' },
        },
        {
          title: '角色',
          dataIndex: 'rolename',
          scopedSlots: { customRender: 'rolename' },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  mounted() {
    console.log("没问题")
    axios({
          url:'user_role/all/1/100',
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            this.dataSource = []
            for(let i = 0;i<res.length;i++){
              console.log(i);
              this.incount++;
              if(parseInt(res[i].id)>=this.maxid){
                // console.log('大');
                // console.log(this.maxid);
                this.maxid = parseInt(res[i].id)+1;
              }
              let m = '5';
              let n = '';
              let p = res[i];
              axios({
                url:'user/findById/'+res[i].userid,
                method:'get',
              }).then(res=>{
                console.log(res.data);
                m = res.data.username;
                console.log('m='+m);
                axios({
                  url:'role/findById/'+p.roleid,
                  method:'get',
                }).then(res=>{
                  console.log(res);
                  n = res.data.rolename
                  // console.log(n);
                  // console.log('mn');
                  console.log(m,n,p.id,i);
                  this.dataSource.push({key:p.id,username:m,rolename:n,index:i,editable:false})
                })
              })
              
              
            }
            if(i == 8){
              this.dataSource.push({key:'',username:'',rolename:'',index:'',editable:false})
            }
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
  },
  methods: {
    handlechange(item){
      console.log(item.username); 
      this.usname = item.username
      this.uname = item.key
    },
    //下拉列表请求数据
    sele(item){
      console.log(item);
      axios({
          url:'user/all/1/100',
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            this.datauser = []
            for(var i = 0;i<res.length;i++){
              this.datauser.push({key:res[i].userid,username:res[i].username,password:res[i].password,index:i,editable:false})
            }
            
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
      console.log("请求数据");
    },
  //请求role数据
  handlechangerole(item){
      console.log(item.rolename); 
      this.roname = item.rolename;
      this.upwd = item.key
    },
    //下拉列表请求数据
  selerole(item){
      console.log(item);
      axios({
          url:'role/all/1/100',
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            this.datarole = []
            for(var i = 0;i<res.length;i++){
              this.datarole.push({key:res[i].roleid,rolename:res[i].rolename,index:i,editable:false})
            }
            
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
      console.log("请求数据");
    },
    //懒加载数据
    laload(){
      this.pagination.current = this.current
      if(this.tempcurrent<this.current){
      console.log(this.current);
      this.dataSource.pop()
      let url = 'user_role/all/'+(this.current*2+1)+'/8'
      // console.log()
      axios({
          url:url,
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            // this.dataSource = []
            for(let i = 0;i<res.length;i++){
              console.log(i);
              this.incount++;
              if(parseInt(res[i].id)>=this.maxid){
                // console.log('大');
                // console.log(this.maxid);
                this.maxid = parseInt(res[i].id)+1;
              }
              let m = '5';
              let n = '';
              let p = res[i];
              axios({
                url:'user/findById/'+res[i].userid,
                method:'get',
              }).then(res=>{
                console.log(res.data);
                m = res.data.username;
                console.log('m='+m);
                axios({
                  url:'role/findById/'+p.roleid,
                  method:'get',
                }).then(res=>{
                  console.log(res);
                  n = res.data.rolename
                  // console.log(n);
                  // console.log('mn');
                  console.log(m,n,p.id,i);
                  this.dataSource.push({key:p.id,username:m,rolename:n,index:i,editable:false})
                })
              })
              
              
            }
            if(i == 8){
              this.dataSource.push({key:'',username:'',rolename:'',index:'',editable:false})
            }
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
          this.tempcurrent = this.current;
      }
    },
    //删除数据
    onDelete(key) {
      const dataSource = [...this.dataSource];
      console.log(this.maxid,this.incount);
      if(key == this.maxid-1){
        this.incount--
      }
      else{
        this.maxid++
      }
      this.dataSource = dataSource.filter(item => item.key !== key);
      axios({
        url:'user_role/deleteById/'+key,
        method:"get",
        }).then(res => {
        console.log("delete");
        console.log("deleteok");
       
        }).catch(err => {
        // console.log(err);  
        })
    },
    //点击添加事件
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: this.incount,
        username: '',
        rolename: '',
        index:this.incount,
        editable:true
      };
      this.incount++
      this.dataSource = [newData, ...dataSource];
      this.count = count + 1;
      this.isadd=1;
    },
    destroyed() {
      console.log('销毁')
    },
    //改变状态为可修改
    edit(key){
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          console.log('-------------');
          // console.log(temp,"---------",key);
          this.uname = this.datauser[i].userid;
          this.upwd = this.datarole[i].roleid;
          this.dataSource[i].editable = true;
          this.tempo=i;
        }
        
      }
      
    },
    //监听两列数据的变化
    Changeu(e) {
      this.uname = e.target.value;
    },
    Changep(e) {
      this.upwd = e.target.value;
    },
    //保存修改以及确认添加数据
    save(key){
      console.log(this.uname,this.upwd)
      this.maxid++
      
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          console.log('-------------');
          // console.log(temp,"---------",key);
          this.dataSource[i].username = this.usname
          this.dataSource[i].rolename = this.roname
          console.log('userid-----'+this.uname);
          this.dataSource[i].editable = false;
          this.tempo=i;
        }
        
      }
      this.val = 'id='+this.dataSource[this.tempo].key+'&userid='+this.uname+'&roleid='+this.upwd
      if(this.isadd==1){
        this.val = 'id='+this.maxid+'&userid='+this.uname+'&roleid='+this.upwd
        axios({
          url:'user_role/add',
          method:"post",
          data:this.val
          }).then(res => {
            console.log("post");
            console.log("postok");
            alert("添加完成")
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
          this.isadd=0
      }
      else{
         axios({
        url:'user_role/change',
        method:"post",
        data:this.val
        }).then(res => {
        console.log("post");
        console.log("postok");
        // datalist = res;
        }).catch(err => {
        // console.log(err);  
        })
      }
    },
    cancle(key){
      if(this.isadd == 1){
        this.dataSource.shift();
        this.isadd = 0
      }
      else{
        for(let i = 0;i<this.dataSource.length;i++){
        
          // console.log(this.dataSource[i].key+'-----'+key);
          var temp = this.dataSource[i].key
          if(temp == key){
            this.dataSource[i].editable = false;
            this.tempo=i;
          }
          
        }
      }
    }
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
th:last-child{
  color: red;
}
</style>



