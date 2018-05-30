<template>
  <cell @click.native="show" :title="title" :value="currentValue" :is-link="!readonly">
    <span class="vux-cell-value" v-if="displayValue">{{ displayValue }}</span>
    <span slot="icon">
      <slot name="icon"></slot>
    </span>
    <div v-transfer-dom>
      <popup
        height="100%"
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
  import axios from 'axios'
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
    props: [ 'title', 'value', 'readonly' ],
    computed: {
      displayValue () {
        if (!this.options.length) {
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
      onValueChange (val) {
        this.hide()
      },
      show () {
        if (!this.readonly) {
          this.showPopup = true
        }
      },
      setFocus: function () {
        this.$refs.search.setFocus()
      },
      onSubmit () {
        this.getNewData()
      },
      onFocus () {
        this.radioSearchHeight = '45px'
      },
      onCancel () {
        this.radioSearchHeight = '0px'
        this.showPopup = false
      },
      hide () {
        this.showPopup = false
      },
      getNewData: function () {
        let self = this
        axios.get('/odoo/model/name_search', {model: this.model, value: this.searchValue, limit: 15}).then(function (response) {
          self.options = response.data
        }).catch(function (error) {
          alert(JSON.stringify(error))
        })
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      }
    },
    created: function () {
      this.getNewData()
    },
    data () {
      return {
        results: [],
        searchValue: '',
        radioSearchHeight: '0px',
        options: [],
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
