// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
const getAllOdooGrid = function () {
  let data = []
  for (let i = 0; i < Random.integer(1, 3); i++) {
    let gridRow = []
    for (let j = 0; j < Random.integer(3, 4); j++) {
      gridRow.push({
        image: Random.image('300x300'),
        actionId: Random.integer(1, 10),
        title: Random.ctitle(2, 4)
      })
    }
    data.push({
      groupTitle: Random.ctitle(2, 4),
      gridRow: gridRow,
      gridCols: Random.integer(i + 1, i + 1)
    })
  }
  return data
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/get/all/grid_data', 'get', getAllOdooGrid)

const getActionView = function () {
  let itemsData = []
  for (let i = 0; i < Random.integer(2, 4); i++) {
    itemsData.push({
      title: Random.ctitle(2, 4),
      domain: [('name', '=', '测试')]
    })
  }
  return {
    viewsData: itemsData,
    model: Random.csentence(2, 4)
  }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/get/action/views', 'get', getActionView)

const getTreeView = function () {
  let treeData = []
  for (let i = 0; i < Random.integer(6, 6); i++) {
    treeData.push({
      title: Random.ctitle(2, 4),
      meta: [
        {name: 'name', value: Random.ctitle(2, 8)},
        {name: 'note', value: Random.ctitle(2, 4)},
        {name: 'desc', value: Random.ctitle(2, 8)},
        {name: 'other', value: Random.ctitle(2, 8)},
        {name: 'date', value: '2011-09-10'}
      ]
    })
  }

  return treeData
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/odoo/get/tree', 'get', getTreeView)

const getFromViewData = function () {
  let treeData = []
  let fieldChar = ['char', 'boolean']
  for (let i = 0; i < Random.integer(6, 10); i++) {
    let field = fieldChar[Random.integer(0, 1)]
    let value = [true, false][Random.integer(0, 1)]
    if (field === 'char') {
      value = Random.ctitle(2, 4)
    }
    treeData.push({
      title: Random.ctitle(2, 4),
      name: Random.ctitle(2, 3),
      value: value,
      type: field
    })
  }
  let tableTh = []
  let tableValue = []
  for (let i = 0; i < Random.integer(4, 6); i++) {
    tableTh.push(Random.ctitle(2, 4))
  }
  for (let i = 0; i < Random.integer(4, 6); i++) {
    let rowVal = []
    for (let j = 0; j < tableTh.length; j++) {
      rowVal.push(Random.ctitle(2, 4))
    }
    tableValue.push(rowVal)
  }
  let value = {
    tableTh: tableTh,
    value: tableValue
  }
  treeData.push({
    title: Random.ctitle(2, 4),
    value: value,
    type: 'one2many'
  })

  return treeData
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/odoo/form/view/data', 'get', getFromViewData)
// /odoo/get/formPreView
const getPreViewFromData = function () {
  let treeData = []
  for (let i = 0; i < Random.integer(6, 6); i++) {
    let oneRecord = []
    for (let j = 0; j < Random.integer(6, 10); j++) {
      let type = ['boolean', 'char', 'button'][Random.integer(0, 1)]
      oneRecord.push({
        label: Random.ctitle(2, 2),
        value: Random.ctitle(2, 6),
        type: type,
        params: {
          invisible: [true, false][Random.integer(0, 1)],
          id: Random.integer(4, 100),
          model: 'model_name'
        }
      })
    }
    oneRecord.push({
      label: Random.ctitle(2, 2),
      value: Random.ctitle(2, 6),
      type: 'button',
      params: {
        invisible: [true, false][Random.integer(0, 1)],
        id: Random.integer(4, 100),
        model: 'model_name'
      }
    })
    oneRecord.push({
      label: Random.ctitle(2, 2),
      value: Random.ctitle(2, 6),
      type: 'button',
      params: {
        invisible: [true, false][Random.integer(0, 1)],
        id: Random.integer(4, 100),
        model: 'model_name'
      }
    })
    oneRecord.push({
      label: Random.ctitle(2, 2),
      value: Random.ctitle(2, 6),
      type: 'button',
      params: {
        invisible: [true, false][Random.integer(0, 1)],
        id: Random.integer(4, 100),
        model: 'model_name'
      }
    })
    treeData.push(oneRecord)
  }
  return treeData
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/odoo/get/formPreView', 'get', getPreViewFromData)

const getViewFromData = function () {
  let formOptions = []
  formOptions.push({ type: 'char', title: '姓名', value: '' })
  formOptions.push({ type: 'date', title: '生日', value: '' })
  formOptions.push({ type: 'datetime', title: '创建时间', value: '' })
  formOptions.push({ type: 'boolean', title: '婚否', value: '' })
  formOptions.push({ type: 'float', title: '年龄', value: '' })
  formOptions.push({ type: 'text', title: '自评', value: '' })
  formOptions.push({ type: 'one2many',
    title: '订单行',
    value: [{
      title: Random.ctitle(2, 4),
      meta: [
        {key: 'name', value: Random.ctitle(2, 8)},
        {key: 'note', value: Random.ctitle(2, 4)},
        {key: 'desc', value: Random.ctitle(2, 8)},
        {key: 'other', value: Random.ctitle(2, 8)},
        {key: 'date', value: '2011-09-10'}]
    }]})
  formOptions.push({ type: 'many2one', title: '销售员', value: '', model: 'sale.order', domain: [] })
  formOptions.push({ type: 'selection', title: '性别', value: '', options: [{ key: 'man', value: '男' }, { key: 'female', value: '女' }] })
  return formOptions
}

Mock.mock('/odoo/form/new/data', 'get', getViewFromData)
const getViewNameSearchData = function () {
  let formOptions = []
  for (let i = 0; i < 15; i++) {
    formOptions.push({key: Random.integer(), value: Random.ctitle(2, 4)})
  }
  return formOptions
}

Mock.mock('/odoo/model/name_search', 'get', getViewNameSearchData)
