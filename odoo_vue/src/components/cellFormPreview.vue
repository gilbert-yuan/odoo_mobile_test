<template>
  <div class="weui-cell vux-cell-form-preview" :class="{'vux-cell-no-border-intent': !borderIntent}">
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in list">
        <template v-if="!item.invisible">
          <template v-if="item.type === 'char'">
            <label class="weui-form-preview__label">{{item.label}}</label>
            <span class="weui-form-preview__value">{{item.value}}</span>
          </template>
          <template v-else-if="item.type === 'boolean'">
            <label class="weui-form-preview__label">{{item.label}}</label>
            <template v-if="item.value">
              <span class="weui-form-preview__value"><icon type="success"></icon></span>
            </template>
            <template v-else>
              <span class="weui-form-preview__value"><icon type="cancel"></icon></span>
            </template>
          </template>
        </template>
      </div>
      <div class="weui-form-preview__ft">
        <template  v-for="(item, index) in list">
          <button class="weui-form-preview__btn weui-form-preview-btn__primary"
                  v-if="!item.invisible && item.type === 'button'"
                  v-on:click.prevent="buttonHttp(item, index)"
                  v-bind:value="list[0].value">{{item.value}} </button>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
  import { Icon } from 'vux'
  import axios from 'axios'
  export default {
    name: 'cell-form-preview',
    components: {
      Icon
    },
    props: {
      list: Array,
      borderIntent: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      buttonHttp: function (item, index) {
        axios.get('', '').then(function (response) {

        }).catch(function () {

        })
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui_cell/weui_cell_global';
  @import '~vux/src/styles//weui/widget/weui_cell/weui_form/weui-form-preview.less';

  .vux-cell-form-preview .weui-form-preview__bd {
    width: 100%;
    padding: 0;
  }
  .weui-form-preview-ft {
    display: -webkit-flex;
    display: flex;
    line-height: 50px;
    position: relative;
  }
  button.weui-form-preview-btn {
    background-color: transparent;
    border: 0 none;
    font-size: inherit;
    outline: 0 none;
  }
  .weui-form-preview-btn:active {
    background-color: #eeeeee;
  }
  .weui-form-preview-btn::after {
    border-left: 1px solid #d5d5d6;
    bottom: 0;
    color: #d5d5d6;
    content: " ";
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleX(0.5);
    transform-origin: 0 0 0;
    width: 1px;
  }
  .weui-form-preview-btn:first-child::after {
    display: none;
  }
  .weui-form-preview-btn-default {
    color: #999999;
  }
  .weui-form-preview-btn-default {
    color: #999999;
  }
  .weui-form-preview-btn-primary {
    color: #0bb20c;
  }
</style>

