<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly" :primary="'title'" value-text-align="left">
    <div  style="width:12.5em;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;">
       <span v-if="displayValue" value-text-align="left" >{{ displayValue }}</span>
    </div>
    <span slot="icon">
      <slot name="icon"></slot>
    </span>
    <div v-transfer-dom>
      <popup
        height="100%"
        width="60%"
        position="right"
        v-model="showPopup"
        style="background-color:#fff;"
        @on-hide="$emit('on-hide')"
        @on-show="$emit('on-show')">
        <search
          :results="results"
          v-model="searchValue"
          position="absolute"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"></search>
        <radio
          :style="'margin-top:' + radioSearchHeight"
          :options="options"
          v-model="currentValue"
          :fill-mode="false"
          @on-change="onValueChange">
          <template slot="each-item" slot-scope="props">
            <slot name="each-item" :icon="props.icon" :label="props.label" :index="props.index">
              <p>
                <img class="vux-radio-icon" :src="props.icon" v-show="props.icon">
                <span class="vux-radio-label">{{ props.label }}</span>
              </p>
            </slot>
          </template>
        </radio>
      </popup>
    </div>
  </cell>
</template>

<script>
  import {Cell, Popup, Radio, TransferDom, Search} from 'vux'
  import find from 'array-find'

  export default {
    name: 'Many2one',
    components: {
      Popup,
      Search,
      Radio,
      Cell
    },
    directives: {
      TransferDom
    },
    props: ['title', 'value', 'readonly', 'field', 'options_default'],
    computed: {
      displayValue: function () {
        if (this.options && !this.options.length) {
          return ''
        }
        if (typeof this.options[0] === 'object') {
          const match = find(this.options, option => {
            return option.key === this.currentValue
          })
          if (match) {
            return match.value
          }
        }
        return this.currentValue
      }
    },
    methods: {
      onValueChange: function (val) {
        this.hide()
      },
      show: function () {
        if (!this.readonly) {
          this.getNewData()
          this.showPopup = true
        }
      },
      setFocus: function () {
        this.$refs.search.setFocus()
      },
      onSubmit: function () {
        this.getNewData()
      },
      onFocus: function () {
        this.radioSearchHeight = '45px'
      },
      onCancel: function () {
        this.radioSearchHeight = '0px'
        this.showPopup = false
      },
      hide: function () {
        this.showPopup = false
      },
      getNewData: function () {
        let self = this
        self.$http.get('/odoo/mobile/model/name_search',
          {
            params:
              {model: self.field.model, value: self.searchValue || '', domain: self.field.domain || [], limit: 15}
          }).then(function (response) {
            self.options = response.data
          }).catch(function (error) {
            alert(JSON.stringify(error))
          })
      }
    },
    watch: {
      value: function (val) {
        this.currentValue = val
      },
      currentValue: function (val) {
        this.$emit('update:value', val)
        this.$emit('update:options_default', [
          {
            key: val,
            value: this.displayValue
          }
        ])
      }
    },
    created: function () {
      // this.getNewData()
    },
    data: function () {
      return {
        results: [],
        searchValue: '',
        radioSearchHeight: '0px',
        options: this.options_default || [],
        showPopup: false,
        currentValue: this.value
      }
    }
  }
</script>

<style type="less">

  .vux-popup-radio-popup {
    background-color: #fff;
  }
</style>
