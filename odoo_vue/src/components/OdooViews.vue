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
    <template v-for="view in allViews">
      <component :model.sync="model" :is='view' :viewData.sync="viewData" v-on:on-click-item="treeRowClick" v-show="view===curentComponent">
      </component>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import Tree from './OdooTree.vue'
  import OdooCard from './OdooCard.vue'
  import { mapState } from 'vuex'
  import { XHeader, Actionsheet, Tab, TabItem, Sticky } from 'vux'

  export default {
    name: 'odooViews',
    components: {
      XHeader,
      Tree,
      OdooCard,
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
        allViews: ['Tree', 'OdooCard'],
        model: '',
        items: []
      }
    },
    methods: {
      ClickButtonTableItem: function (item) {
        this.viewData = {}
        this.curentComponent = this.curentComponent === 'OdooCard' ? 'Tree' : 'OdooCard'
      },
      treeRowClick: function (item) {
        this.$router.push({name: 'odooForm', params: {recordId: item.id}})
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.vux.isLoading,
        vux: state => state.vux
      })
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
