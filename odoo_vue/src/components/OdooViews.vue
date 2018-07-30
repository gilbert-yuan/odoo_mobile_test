<template>
  <div>

    <sticky
      scroll-box="vux_view_box_body"
      ref="sticky"
      :offset="46"
      :check-sticky-support="false"
      :disabled="disabled">
      <tab :scroll-threshold="items.length" :line-width="4">
        <template v-for="(item, index) in items">
          <template v-if="item.badge" >
            <tab-item @on-item-click="ClickButtonTableItem(item)"  :badge-label="item.badge+''"
                      :selected="$route.params.domain===JSON.stringify(item.domain)">{{ item.title  }}
            </tab-item>
          </template>
          <template v-else>
            <tab-item @on-item-click="ClickButtonTableItem(item)"
                      :selected="$route.params.domain===JSON.stringify(item.domain)">{{ item.title  }}
            </tab-item>
          </template>
        </template>
      </tab>
    </sticky>
    <div v-for="view in allViews">
      <component :model.sync="model" :is='view' :domain.sync="domain" :view_id.sync="view_id" :offset_step.sync="offset" :order="order"
                 v-on:on-click-item="treeRowClick" v-if="view===curentComponent" :limit.sync="limit" :context="context">
      </component>
    </div>
    <div class="floating-button" @click="AddNewRecord()">
      <i class="icon icon-plus" ></i>
    </div>
  </div>
</template>

<script>
  import Tree from './OdooTree.vue'
  import OdooCard from './OdooCard.vue'
  import {mapState} from 'vuex'
  import {XHeader, Actionsheet, Tab, TabItem, Sticky} from 'vux'

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
        context: {},
        allViews: ['Tree', 'OdooCard'],
        model: '',
        noForm: '',
        order: '',
        offset: '',
        limit: '',
        items: []
      }
    },
    methods: {
      ClickButtonTableItem: function (item) {
        let self = this
        if (item) {
          self.getAllData()
          self.$router.push({path: '/odoo/view/' + self.$route.params.actionId + '/' + JSON.stringify(item.domain)})
        }
      },
      AddNewRecord: function () {
        let self = this
        self.$router.push({
          name: 'newForm',
          params: {
            id: 0,
            context: self.context,
            model: self.model,
            viewId: self.view_id
          }
        })
      },
      treeRowClick: function (item) {
        let self = this
        if (!self.noForm && self.curentComponent !== 'OdooCard') {
          self.$router.push({
            path: '/odoo/form/' + item.id,
            query: {recordId: item.value, model: self.model, viewId: self.view_id}
          })
        }
      },
      getAllData: function () {
        let self = this
        self.$http.get('/odoo/mobile/get/action/views', {params: {actionId: self.$route.params.actionId}}).then(function (response) {
          self.items = response.data.viewsData
          self.view_id = response.data.view_id
          self.offset = response.data.offset
          self.limit = response.data.limit
          self.order = response.data.order
          self.context = response.data.context
          self.noForm = response.data.noForm
          self.curentComponent = response.data.view_type
          self.model = response.data.model
          if (!self.$route.params.domain && self.items) {
            self.ClickButtonTableItem(self.items[0])
          } else {
            self.domain = JSON.parse(self.$route.params.domain)
          }
        })
      }
    },
    watch: {
      '$route': function (to, from) {
        if (this.$route.params.domain) {
          this.domain = JSON.parse(this.$route.params.domain)
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
      self.vux.tabbarShow = false
      self.vux.showBackHeader = true
      self.$nextTick(() => {
        self.getAllData()
      })
    }
  }
</script>

<style>
  .divcss6_right {
    margin-top: 100%;
    position: absolute;
    margin-left: 85%;
  }

  .floating-button {
    position: absolute;
    right: 16px;
    bottom: 66px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    z-index: 1500;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23);
    background-color: #2196f3;
    color: #fff;
    overflow: hidden;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center
  }

  .floating-button.active-state, html:not(.watch-active-state) .floating-button:active {
    background: #0c82df
  }

  .floating-button-toolbar, .speed-dial {
    position: absolute;
    right: 16px;
    bottom: 36px;
    z-index: 1500
  }

  .floating-button-toolbar .floating-button, .speed-dial .floating-button {
    right: 0;
    bottom: 0;
    position: relative
  }

  i.icon.icon-plus {
    width: 24px;
    height: 24px;
    font-size: 0;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D'%23FFFFFF'%20height%3D'24'%20viewBox%3D'0%200%2024%2024'%20width%3D'24'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M19%2013h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'%2F%3E%3Cpath%20d%3D'M0%200h24v24H0z'%20fill%3D'none'%2F%3E%3C%2Fsvg%3E")
  }


</style>
