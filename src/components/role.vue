<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
      <template slot="rolename" slot-scope="text, record">
        <a-input v-if=record.editable  type="text" :value="text" @change="Changeu"></a-input>
        <div v-else>
          {{ text || ' ' }}
        </div>
        <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'username', $event)" /> -->
      </template>
      <template slot="operation" slot-scope="text, record">
        <a v-if=record.editable href="javascript:;" @click="save(record.key,)">Save &nbsp&nbsp&nbsp</a>
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
          rolename: 'Edward King 0',
          index:0,
          editable:false
        },
        {
          key: '1',
          rolename: 'Edward King 1',
          index:1,
          editable:false
        },
      ],
      pagination:{
        current:1,
        defaultPageSize:5,
        pageSize:8,
        // showQuickJumper:true
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
          title: '角色名称',
          dataIndex: 'rolename',
          width: '30%',
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

  watch:{
  $route(to,from){
    console.log(to.path);
  }
},
   mounted() {
    console.log("没问题")
    axios({
          url:'role/all/1/100',
          method:"get",
          // data:this.val
          
          }).then(res => {
            console.log("post");
            console.log(res.data);
            res=res.data
            this.dataSource = []
            for(var i = 0;i<res.length;i++){
              this.incount++;
              if(parseInt(res[i].roleid)>=this.maxid){
                console.log('大');
                console.log(this.maxid);
                this.maxid = parseInt(res[i].roleid)+1;
              }
              this.dataSource.push({key:res[i].roleid,rolename:res[i].rolename,index:i,editable:false})
            }
            
            // datalist = res;
          }).catch(err => {
            // console.log(err);
            
          })
  },
  methods: {
    
    onDelete(key) {
      const dataSource = [...this.dataSource];
      if(key == this.maxid-1){
        this.incount--
      }
      else{
        this.maxid++
      }
      this.dataSource = dataSource.filter(item => item.key !== key);
      
      axios({
        url:'role/deleteById/'+key,
        method:"get",
        }).then(res => {
        console.log("delete");
        console.log("deleteok");
        }).catch(err => {
        // console.log(err);  
        });
        axios({
        url:'user_role/deleteByRoleId/'+key,
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
      const { count, dataSource } = this;
      const newData = {
        key: this.maxid,
        rolename: '',
        index:this.incount,
        editable:true
      };
      this.dataSource = [newData, ...dataSource];
      this.count = count + 1;
      this.incount++;
      this.isadd=1
      // this.pagination.current = 2
    },
    destroyed() {
      console.log('销毁')
    },
    edit(key){
      console.log(key);
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          console.log('-------------');
          // console.log(temp,"---------",key);
          this.uname = this.dataSource[i].rolename;
          this.dataSource[i].editable = true;
          this.tempo=i;
        }
        
      }
      // this.editable = true;
    },
    Changeu(e) {
      this.uname = e.target.value;
    },
    Changep(e) {
      this.upwd = e.target.value;
    },
    save(key){
      // console.log(this.uname,this.upwd)
      this.maxid++
      // console.log(key);
      for(let i = 0;i<this.dataSource.length;i++){
        
        // console.log(this.dataSource[i].key+'-----'+key);
        var temp = this.dataSource[i].key
        if(temp == key){
          // console.log(temp,"---------",key);
          this.dataSource[i].rolename = this.uname
          this.dataSource[i].editable = false;
          this.tempo=i;
        }
        
      }
      
      this.val = 'roleid='+this.dataSource[this.tempo].key+'&rolename='+this.uname;
      if(this.isadd==1){
        this.val = 'roleid='+this.maxid+'&rolename='+this.uname
        axios({
          url:'role/add',
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
        url:'role/change',
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



