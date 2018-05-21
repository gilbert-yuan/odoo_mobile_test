<template>
  <div>
    <x-header :title="HeaderTitle">
    </x-header>
    <tab>
      <template v-for="(item, index) in Items"  >
        <tab-item v-if="parseInt(Items.length/2)===index"
                  @on-item-click="ClickButtonTableItem(item)" selected>{{ item.title }}</tab-item>
        <tab-item v-if="parseInt(Items.length/2)!==index"
                  @on-item-click="ClickButtonTableItem(item)">{{item.title}}</tab-item>
      </template>
    </tab>
  </div>
</template>

<script>
  import axios from 'axios'
  import { XHeader, Actionsheet, Tab, TabItem } from 'vux'

  export default {
    components: {
      XHeader,
      Actionsheet,
      Tab,
      TabItem
    },
    data () {
      return {
        HeaderTitle: '',
        TitleOne: '为审批',
        TitleTwo: '已审批',
        TitleThird: '全部',
        Items: [{title: '已审批'}, {title: '全部'}, {title: '未审批'}]
      }
    },
    methods: {
      ClickButtonTableItem: function () {
        return true
      }
    },
    created: function () {
      axios.get('/get/action/views', {actionId: this.$route.params.actionId}).then(function (response) {
        console.log(JSON.stringify(response))
      })
    }
  }
</script>

<style>
  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
