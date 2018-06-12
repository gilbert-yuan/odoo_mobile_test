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
    <div v-for="view in allViews">
      <component :model.sync="model" :is='view' :domain.sync="domain" :view_id.sync="view_id" :offset_step.sync="offset"
                 v-on:on-click-item="treeRowClick" v-if="view===curentComponent" :limit.sync="limit">
      </component>
    </div>
    <div class="divcss6_right" >
      <x-icon type="ios-plus-outline" size="50" @click.native="AddNewRecord()"></x-icon>
    </div>
  </div>
</template>

<script>
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
    data: function () {
      return {
        disabled: false,
        curentComponent: 'Tree',
        domain: [],
        view_id: '',
        allViews: ['Tree', 'OdooCard'],
        model: '',
        noForm: '',
        offset: '',
        limit: '',
        items: []
      }
    },
    methods: {
      ClickButtonTableItem: function (item) {
        this.domain = item.domain
      },
      AddNewRecord: function () {
        let self = this
        console.log('00000')
        self.$router.push({
          name: 'newForm',
          params: {
            id: 0,
            model: self.model,
            viewId: self.view_id
          }
        })
      },
      treeRowClick: function (item) {
        let self = this
        console.log(item, '00000')
        if (!self.noForm) {
          self.$router.push({name: 'odooForm', params: {recordId: item[0].value, model: self.model, viewId: self.view_id}})
        }
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
      this.$nextTick(() => {
        self.$http.get('/odoo/get/action/views', {params: {actionId: self.$route.params.actionId}}).then(function (response) {
          self.items = response.data.viewsData
          self.view_id = response.data.view_id
          self.offset = response.data.offset
          self.limit = response.data.limit
          self.noForm = response.data.noForm
          console.log(response.data)
          self.curentComponent = response.data.view_type
          self.model = JSON.stringify(response.data.model)
          self.ClickButtonTableItem(self.items[0])
        })
      })
    }
  }
</script>

<style>
  .divcss6_right{margin-top: 100%; position: absolute; margin-left:85%;}
</style>
