<template>
  <div>
    <sticky
      scroll-box="vux_view_box_body"
      ref="sticky"
      :offset="46"
      :check-sticky-support="false"
      :disabled="disabled">
      <tab>
        <template v-for="(item, index) in items"  >
          <tab-item @on-item-click="ClickButtonTableItem(item)" :selected="index===0">{{ item.title }}</tab-item>
        </template>
      </tab>
    </sticky>
    <component :model.sync="model" :is='curentComponent' :viewData.sync="viewData" v-on:on-click-item="treeRowClick">
    </component>
  </div>
</template>

<script>
  import axios from 'axios'
  import Tree from './OdooTree.vue'
  import { XHeader, Actionsheet, Tab, TabItem, Sticky } from 'vux'

  export default {
    name: 'odooViews',
    components: {
      XHeader,
      Tree,
      Sticky,
      Actionsheet,
      Tab,
      TabItem
    },
    data () {
      return {
        disabled: false,
        curentComponent: 'Tree',
        viewData: [],
        model: '',
        items: []
      }
    },
    methods: {
      ClickButtonTableItem: function (item) {
        this.viewData = {}
        this.curentComponent = item.component
        return true
      },
      treeRowClick: function (item) {
        this.$router.push({name: 'odooForm', params: {recordId: item.id}})
      }
    },
    created: function () {
      let self = this
      axios.get('/get/action/views', {actionId: ''}).then(function (response) {
        self.items = response.data.viewsData
        self.model = response.data.model
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
