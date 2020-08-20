<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
      <template slot="username" slot-scope="text, record">
        <!-- {{record}} -->
        <a-input v-if="record.editable"  type="text" :value="text" @change="Changeu"></a-input>
        <div v-else>
          {{ text || ' ' }}
        </div>
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'username', $event)" /> -->
      </template>
      <template slot="password" slot-scope="text, record">
        <a-input v-if="record.editable"  type="text" :value="text" @change="Changep"></a-input>
        <div v-else>
          {{ text[0]+'******'+text[text.length-1] || ' ' }}
        </div>
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'username', $event)" /> -->
      </template>
      <template slot="operation" slot-scope="text, record">
        <a v-if="record.editable" href="javascript:;" @click="save(record.key,$event)">Save &nbsp&nbsp&nbsp</a>
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
          password: '32',
          index:0,
          editable:false
        },
        {
          key: '1',
          username: 'Edward King 1',
          password: '32',
          index:1,
          editable:false
        },
      ],
      pagination:{
        defaultPageSize:5,
        pageSize:8
      },
      count: 2,
      editable:false,
      uname:'',
      upwd:'',
      val:'',
      isadd:0,
      incount:0,
      maxid:0,
      tempo:0,
      columns: [
        {
          title: '用户名称',
          dataIndex: 'username',
          width: '30%',
          scopedSlots: { customRender: 'username' },
        },
        {
          title: '用户密码',
          dataIndex: 'password',
          scopedSlots: { customRender: 'password' },
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
          url:'user/all/1/100',
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            this.dataSource = []
            for(var i = 0;i<res.length;i++){
              this.incount++;
              if(parseInt(res[i].userid)>=this.maxid){
                console.log('大');
                console.log(this.maxid);
                this.maxid = parseInt(res[i].userid)+1;
              }
              this.dataSource.push({key:res[i].userid,username:res[i].username,password:res[i].password,index:i,editable:false})
            }
            
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      console.log('change')
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      console.log('key'+key);
      console.log(this.maxid);
      if(key == this.maxid-1){
        this.incount--
      }
      else{
        this.maxid++
      }
      this.dataSource = dataSource.filter(item => item.key !== key);
      
      axios({
        url:'user/deleteById/'+key,
        method:"get",
        }).then(res => {
        console.log("delete");
        console.log("deleteok");
        // datalist = res;

        }).catch(err => {
        // console.log(err);  
        })
        axios({
        url:'user_role/deleteByUserId/'+key,
        method:"get",
        }).then(res => {
        console.log("delete");
        console.log("deleteok");
        // datalist = res;
        }).catch(err => {
        // console.log(err);  
        })
       
    },
    handleAdd() {
      // console.log('lok');
      // console.log(this.maxid,this.incount);
      // this.dataSource.push({key:this.maxid,username:'',password:'',index:this.incount,editable:true})
      // console.log(this.dataSource);
      // this.incount++
      const { count, dataSource } = this;
      const newData = {
        key: this.incount,
        username: '',
        password: '',
        index:this.incount,
        editable:true
      };
      this.incount++
      this.dataSource = [newData, ...dataSource];
      this.count = this.count + 1;
      this.isadd=1;
      console.log('ok');
    },
    destroyed() {
      console.log('销毁')
    },
    edit(key){
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          console.log('-------------');
          // console.log(temp,"---------",key);
          this.uname = this.dataSource[i].username;
          this.upwd = this.dataSource[i].password;
          this.dataSource[i].editable = true;
          this.tempo=i;
        }
        
      }
    },
    Changeu(e) {
      this.uname = e.target.value;
    },
    Changep(e) {
      this.upwd = e.target.value;
    },
    //保存修改
    save(key){
      console.log(this.uname,this.upwd)
      this.maxid++;
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          console.log(temp,"---------",key);
          this.dataSource[i].username = this.uname
          this.dataSource[i].password = this.upwd
          this.dataSource[i].editable = false;
          this.tempo=i;
        }
        
      }
      this.val = 'userid='+this.dataSource[this.tempo].key+'&username='+this.uname+'&password='+this.upwd
      if(this.isadd==1){
        this.val = 'userid='+this.maxid+'&username='+this.uname+'&password='+this.upwd
        axios({
          url:'user/add',
          method:"post",
          data:this.val
          }).then(res => {
            console.log("post");
            console.log("postok");
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
          this.isadd=0
      }
      else{
         axios({
        url:'user/change',
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
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          this.dataSource[i].editable = false;
          this.tempo=i;
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



