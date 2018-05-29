<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd" v-if="header" @click="onClickHeader" v-html="header">
        <slot name="header"></slot>
      </div>
      <div class="weui-panel__bd">
        <slot name="body">
          <div class="weui-media-box weui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <h4 class="weui-media-box__title" v-html="item.title"></h4>
            <ul class="weui-media-box__info">
              <template  v-for="(field, index) in item.meta">
                <li class="weui-media-box__info__meta" v-html="field.value"></li>
              </template>
            </ul>
          </div>
        </slot>
      </div>
      <div class="weui-panel__ft">
        <a
          class="weui-cell weui-cell_access weui-cell_link"
          v-if="footer && footer.title"
          @click.prevent="onClickFooter">
          <div class="weui-cell__bd" v-html="footer.title"></div>
        </a>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showForm" height="100%" position="bottom">
        <div class="popup0">
          <group>
            <treeForm :allFormData.sync="allFormData"
                      :model="model" :id="id" @save="addNewRecord" @cancel="cancelAdd"> </treeForm>
          </group>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import treeForm from './OdooTreeForm.vue'
  import { go } from '../../libs/router'
  import {Popup, Group, TransferDom} from 'vux'

  export default {
    name: 'TreeRow',
    components: {
      Popup,
      treeForm,
      Group
    },
    directives: {
      TransferDom
    },
    props: {
      header: String,
      footer: Object,
      list: Array
    },
    data () {
      return {
        showForm: false,
        id: '',
        allFormData: [],
        model: ''
      }
    },
    methods: {
      onImgError (item, $event) {
        this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event)
        if (item.fallbackSrc) {
          $event.target.src = item.fallbackSrc
        }
      },
      addNewRecord: function (newRecord) {
        console.log(newRecord)
        this.list.push(newRecord)
        this.showForm = false
      },
      cancelAdd: function (newRecord) {
        this.showForm = false
      },
      onClickFooter () {
        this.get_form_data()
        this.showForm = true
      },
      onClickHeader () {
        this.$emit('on-click-header')
      },
      onItemClick (item) {
        this.$emit('on-click-item', item)
        go(item.url, this.$router)
      },
      get_form_data: function () {
        let self = this
        axios.get('/odoo/form/new/data', {model: this.model, id: this.recordId}).then(function (response) {
          self.allFormData = response.data
        }).catch(function (error) {
          alert(error)
        })
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '~vux/src/styles/weui/widget/weui_cell/weui_access';
  @import '~vux/src/styles/weui/widget/weui_panel/weui_panel';
  @import '~vux/src/styles/weui/widget/weui_media_box/weui_media_box';
</style>
