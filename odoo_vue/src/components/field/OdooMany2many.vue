<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly">
    <span class="vux-cell-value" v-if="displayValue">{{ displayValue }}</span>
    <span slot="icon">
      <slot name="icon"></slot>
    </span>
    <div v-transfer-dom>
      <popup
        height="100%"
        width="80%"
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
        <checklist  random-order
                   :options.sync="options" v-model="currentValue"
                   @on-change="onValueChange"></checklist>
      </popup>
    </div>
  </cell>
</template>

<script>
  import {Cell, Popup, Radio, TransferDom, Search, Checklist} from 'vux'
  import find from 'array-find'

  export default {
    name: 'Many2many',
    components: {
      Popup,
      Search,
      Checklist,
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
        // this.hide()
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
        self.$http.get('/odoo/model/name_search',
          {
            params:
              {model: self.field.model, value: self.searchValue || '', domain: self.field.domain || [], limit: 15}
          }).then(function (response) {
            console.log(response.data, '----------')
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

<style>
  .vux-popup-radio-popup {
    background-color: #fff;
  }
</style>
