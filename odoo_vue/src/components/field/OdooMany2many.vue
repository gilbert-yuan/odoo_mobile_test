<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly"
        align-items="flex-start" primary="title">
    <div style="width:12.5em;overflow: hidden; text-overflow: ellipsis;">
      <span class="vux-cell-value" v-if="displayValue" v-html="displayValue"></span>
    </div>
    <div v-transfer-dom>
      <popup
        height="100%"
        width="100%"
        position="right"
        v-model="showPopup"
        style="background-color:#fff;"
        @on-hide="$emit('on-hide')"
        @on-show="$emit('on-show')">
        <search
          :results="results"
          v-model="searchValue"
          position="fixed"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"></search>
        <checklist random-order
                   :required="required"
                   :style="'margin-top:' + radioSearchHeight"
                   :options.sync="options" v-model="currentValue"
                   @on-change="onValueChange"></checklist>
      </popup>
    </div>
  </cell>
</template>

<script>
  import {Cell, Popup, Radio, TransferDom, Checklist} from 'vux'
  import Search from './OdooSearch'

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
    props: ['title', 'value', 'readonly', 'field', 'required', 'options_default'],
    computed: {
      displayValue: function () {
        let ChoiceVal = ''
        if (this.options && !this.options.length) {
          return ChoiceVal
        }
        if (typeof this.options[0] === 'object') {
          const match = this.options.filter(option => {
            return this.currentValue.indexOf(option.key) >= 0
          })
          if (match) {
            match.forEach(function (value) {
              if (ChoiceVal) {
                ChoiceVal = ChoiceVal + '</br>' + value.value
              } else {
                ChoiceVal = ChoiceVal + value.value
              }
            })
            return ChoiceVal
          }
        }
        return ChoiceVal
      }
    },
    methods: {
      onValueChange: function (val) {
        // console.log(this.field)
      },
      show: function () {
        if (!this.readonly) {
          this.getNewData()
          this.showPopup = true
        }
      },
      setFocus: function () {
        // this.$refs.search.setFocus()
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
        this.$emit('update:options_default', this.currentValue)
      }
    },
    created: function () {
      // console.log(this.options_default)
      // console.log(this.currentValue)
      // console.log(this.val)
      // console.log(this.field)
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

<style  type="less">

</style>
