# ContrastForm对照组件
``` js
import ContrastForm from '@BCommon/components/RenderCustomForm/contrastForm'
```
## 为啥使用表单对照
---
变更页面上的表单对照左边的数据是变更前的数据右边的数据要变更的数据形成一种对比，左边的字段在业务上一般是根据右边字段自动生成的只能进行查看所以不能编辑，做保存操作也不会保存到数据库
## 变更组件基本使用
---
在河图上将左侧的普通组件(FormItem)或者ExtInfo扩展组件放入Panel中，勾选 **【isContrasForm】** 在输入框配置 **【contrastFormRef】** 属性用作右边表单ref的实例名称 左边表单会自动在名称前加上一个old

<!-- ![图片1](./public/assets/images/1.png) -->
<img src="/assets/images/1.png" data-fancybox="gallery" />

RenderCustomForm组件提供一个属性 **showContrast**该值默认为true 如果河图在Panel配置了这个 **isContrasForm** 但是RenderCustomForm组件将showContrast设置为fasle就按普通表单显示为true就展示对比组件

<!-- ![图片2](./public/assets/images/2.png) -->
<img src="/assets/images/2.png" data-fancybox="gallery" />

表单对照应用于页面的效果：

<!-- ![图片2](./public/assets/images/3.png) -->
<img src="/assets/images/3.png" data-fancybox="gallery" />


2. 变更组件的属性和方法

| 名称          | 类型             |    默认值    |  描述           |
| :-------------: |:-------------:|:-------------:| :-------------|
| showContrast  | Boolean         |  true          | 是否展示组件对比<br>河图panel组件属性栏中勾选了isContrastForm 该值为true就展示组件对比 否则按普通组件展示  |
| contrastFormRef | String        |    ''          |  对照表单的ref命名<br>河图panel组件属性栏中填入 例如: **填写formRef可获取到对照组件中右边新数据表单组件的实例 左边旧数据表单组件实例用oldformRef获取到** |
|  customRefs     | Object         |  null          | 所有对照组件的表单ref实例集合包含新、旧表单，新、旧扩展组件 |
| setFieldsValue  | Function       | (props: Object) => void | 用于设置表单字段的值同RForm的 **setFieldsValue** 方法 |
| changeContrastProps |  Function  | (props: Object) => void |  改变变更表单RFormItem的属性可通过拿到新旧表单组件实例调用该方法就能改变其RFormItem的属性<br>例如：**this.formRef.changeContrastProps({ hidden: true })** |
| contrastExtUrid | String         |    ''             | 用来获取对照的扩展组件中旧扩展表数据 |
| hiddenContrastDetailItems        |    Array          | []  | 隐藏详情页或新增页detailmode下变更组件的新老字段新旧字段名放在一个数组里 **hiddenContrastDetailItems=['old字段A', '新字段B']** |

## showContrast 是否启用变更组件
---
河图上勾选isContrastForm，RenderCustomForm组件传入中showContrast=true 这样就能使用变更组件如图：
<!-- ![图片4](/public/assets/images/4.png) -->
<img src="/assets/images/4.png" data-fancybox="gallery" />
RenderCustomForm组件传入中showContrast=false 不管河图上勾不勾选isContrastForm， 不会使用变更组件会以普通组件显示：
<!-- ![图片5](/public/assets/images/5.png) -->
<img src="/assets/images/5.png" data-fancybox="gallery" />

## contrastFormRef 对照表单的ref命名
---
对照表单的ref命名在河图中配置，可通过这个ref命名获取到对照表单的组件实例，例如配置了changeFormRef可以获取到右边新表单的实例，左边旧表单实例直接oldchangeFormRef在changeFormRef后加个old就行
<!-- ![图片6](/docs/public/assets/images/6.png) -->
<img src="/assets/images/6.png" data-fancybox="gallery" />

为啥需要获取对照表单组件的实例下面介绍下业务开发中常用的几个场景(其实对照表单底层还是RForm，所以可以用RForm组件上的属性和方法)

- 首先要在RenderCustomForm组件的formRedux方法中获取到对照表单组件实例
```js
formRedux = (ref) => {
  //  组件和常用方法引用
  if (ref) {
    this.formRef = ref;
    this.setFieldsValue = ref.setFieldsValue;
    this.getFieldsValue = ref.getFieldsValue;
    this.setFieldsState = ref.setFieldsState;
    this.setFieldsProps = ref.setFieldsProps;
    this.validateForm = this.formRef.validateForm;
    // 对照表单组件实例的ref集合
    this.customRefs = ref.customRefs
    // 用于设置对照表单的FormItem属性的方法
    this.changeContrastProps = ref.changeContrastProps
    if (ref.customRefs) {
      this.changeFormRef = ref.customRefs.changeFormRef // 新表单实例ref
      this.oldchangeFormRef = ref.customRefs.oldchangeFormRef // 旧表单实例ref
    }
  }
}
```

- 设置对照表单字段的值setFieldsValue和RForm的用法一样
```js
// 对照表单中右边新数据表单设置字段值
this.changeFormRef.setFieldsValue({
  name: 'test'
})

// 对照表单中左边旧数据表单设置字段值
this.oldchangeFormRef.setFieldsValue({
  oldname: 'oldTest'
})
```

- 获取对照表单字段的值getFieldsValue和RForm的用法一样
```js
// 对照表单中右边新数据表单获取字段值
const { name } = this.changeFormRef.getFieldsValue()

// 对照表单中左边旧数据表单获取字段值
const { oldname } = this.oldchangeFormRef.getFieldsValue()
```

- 重置对照表单所有字段的值resetFields和RForm的用法一样
```js
this.changeFormRef.resetFields()
this.oldchangeFormRef.resetFields()
```

## changeContrastProps 修改对照表单中RFormItem组件的属性
---
举个例子：根据业务联动我们需要对name属性进行hidden或者禁用，我们需要调用这个方法对修改这个字段属性具体用法同setFieldsProps
```js
// 对照表单中右边新数据表单修改字段属性
this.changeFormRef.changeContrastProps({
  name: {
    hidde: true,
    disabled: true,
  }
})

// 对照表单中左边旧数据表单修改字段属性
this.oldchangeFormRef.changeContrastProps({
  name: {
    hidden: true,
    disabled: false
  }
})
```
## contrastExtUrid 可以通过旧数据的urid加载对照扩展组件旧的扩展表数据
对照的扩展组件唯一的区别可能就是数据不同，所以需要根据urid加载不同数据的扩展组件进行对比，新增/详情都支持此属性
```js
// 新增/修改
<RenderCustomForm
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  urid={this.getExtInfoUrid()} // 获取对照扩展组件新的扩展组件数据
  contrastExtUrid={this.getOldExtInfoUrid()} // 获取对照扩展组件旧的扩展组件数据
  moduleName="BANKACCOUNT"
  propsObj={this.props}
  formRedux={this.initFormRedux}
/>

// 详情页
<RenderDetail
  {...otherProps}
  isShowHistory
  detailData={newData}
  propsObj={this.props}
  moduleName="BANKACCOUNT"
  urid={urid} // 获取对照扩展组件新的扩展组件数据
  contrastExtUrid={contrastExtUrid} // 获取对照扩展组件旧的扩展组件数据
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  data={newData}
  oldData={oldData}
  extraConfig={this.getExtraConfig()}
  isWorkflow={this.props.handleApprove}
/>
```

## hiddenContrastDetailItems 隐藏对照组件的新老字段(详情页/新增页detailmode下)
隐藏对照组件的新老字段(详情页/新增页detailmode下)，新老字段放在一个数组中 **hiddenContrastDetailItems=['name', 'oldname']** 这样就能将这俩个字段进行隐藏
- 详情页隐藏对照组件字段
```js
<RenderDetail
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  data={newData}
  oldData={oldData}
  hiddenContrastDetailItems={['accountnumber', 'oldaccountnumber']} // 隐藏对照表单中银行账号新老字段
/>
```
上面代码设置完成后会隐藏下图中俩个字段
<!-- ![图片8](/docs/public/assets/images/8.png) -->
<img src="/assets/images/8.png" data-fancybox="gallery" />

- 新增/修改页隐藏对照组件字段在河图中panel设置为detailmode才会生效
<!-- ![图片9](/docs/public/assets/images/9.png) -->
<img src="/assets/images/9.png" data-fancybox="gallery" />

- 新增/修改页中的getExtraConfig中panel配置中设置detailmode
```js
getExtraConfig = () => {
  return {
    panel: [
      { // 基本信息
        id: 2, // panel的id
        detailmode: true // 启用详情模式
      }
    ]
  }
}
```
- 新增/修改页面如果在panel里启用详情模式的话，需要提供详情的新、老数据，并且如果要隐藏新，老字段的话得使用hiddenContrastDetailItems
```jsx
/**
 * 注意这里的老数据字段前需要加上old
 * 例如：新数据是detailData = { name: '11' },老数据就得是oldDetailData = { oldname: '22' }
 */
<RenderCustomForm
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  urid={this.getExtInfoUrid()}
  contrastExtUrid={this.getOldExtInfoUrid()}
  moduleName="BANKACCOUNT"
  propsObj={this.props}
  detailData={this.state.data} // 对照表单时详情模式下得新数据
  oldDetailData={this.state.oldData} // 对照表单时详情模式下老数据
  hiddenContrastDetailItems={['accountnumber', 'oldaccountnumber']} // 需要隐藏的新老字段
  formRedux={this.initFormRedux}
  extraConfig={this.getExtraConfig()}
  showContrast
/>
```
上面代码在新增/修改页启用了detailmode并对银行账号这个新老字段进行隐藏设置后的效果如下图：
<!-- ![图片](/docs/public/assets/images/10.png) -->
<img src="/assets/images/10.png" data-fancybox="gallery" />

## 新增页启用详情模式
---
普通表单panel中启用详情模式，需要给panel组件提供detailmode属性，并且需要给RenderCustomForm提供detailData数据用作详情数据回显，对于是Select或Combogrid元素的字段回显需要注意数据格式，例如需要对select的元素的字段名为select回显它的数据就得为select_show，需要对Combogrid元素的字段回显，他的回显字段来源是editFieldText的配置
```jsx
getExtraConfig = () => {
  return {
    panel: [
      {
        id: 2,
        detailmode: true // 给id=2的panel启用详情模式
      }
    ]
  }
}

<RenderCustomForm
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  propsObj={this.props}
  detailData={this.state.data} // detailmode下需要提供给详情页回显的数据
  formRedux={this.initFormRedux}
  extraConfig={this.getExtraConfig()}
  showContrast
/>
```

对照表单启用详情模式，这里和普通表单启用详情页基本一样，唯一不同需要提供对照表单新，老数据做为详情模式的数据回显
``` js
<RenderCustomForm
  pageId="ms_bankaccountApply"
  pageName="accountApplyChange"
  propsObj={this.props}
  detailData={this.state.data} // detailmode下需要提供给详情页回显的新数据
  oldDetailData={this.state.oldData} // detailmode下需要提供给详情页回显的老数据
  formRedux={this.initFormRedux}
  extraConfig={this.getExtraConfig()}
  showContrast
/>
```
<!-- ![图片](/docs/public/assets/images/11.png) -->
<img src="/assets/images/11.png" data-fancybox="gallery" />

## 详情页嵌套一个表单，进行补录数据
就是详情页可以嵌套一个表单，吾流程图的在RDetailPage下套一个RenderCustomForm并且配置isNestedForm属性就可以了，有流程图的在RWorkflowDetailPage套一个表单就行，可以看下面的列子：
```jsx
/**
 * isNestedForm
 * 是否为嵌套表单？
 * 用于将RenderCustomForm直接放入其他页面中使用，如 其他的新增页，详情页等等，
 * 变为嵌套表单之后，结构为 RForm => RPanel => RFormItem，不存在Anchor了
 */
<RDetailPage>
  <React.Fragment key={this.accountApplyIntl.COLLECT_INFO}>
    <RenderCustomForm
      pageId="ms_bankaccountApply"
      pageName="accountApplyChange"
      urid={urid} // 扩展信息加载
      contrastExtUrid={this.props?.query?.accountid}
      detailData={newData} // panel是detailmode的时候需要给详情字段提供回显数据
      moduleName="BANKACCOUNT"
      propsObj={this.props}
      formRedux={this.initFormRedux}
      extraConfig={this.getExtraConfig()}
      isNestedForm
    />
  </React.Fragment>
</RDetailPage>

<RWorkflowDetailPage
  {...this.props}
  onRef={ref => this.myFormRef = ref}
  sendFormRef={this.sendFormRef}
  beforeShowApproveModal={this.beforeShowApproveModal}
>
  <React.Fragment key={this.accountApplyIntl.COLLECT_INFO}>
    <RenderCustomForm
      pageId="ms_bankaccountApply"
      pageName="accountApplyChange"
      urid={urid} // 扩展信息加载
      contrastExtUrid={this.props?.query?.accountid}
      detailData={newData} // panel是detailmode的时候需要给详情字段提供回显数据
      moduleName="BANKACCOUNT"
      propsObj={this.props}
      formRedux={this.initFormRedux}
      extraConfig={this.getExtraConfig()}
      isNestedForm
      showContrast
    />
  </React.Fragment>
</RWorkflowDetailPage>
```
<!-- ![图片](/docs/public/assets/images/12.png) -->
<img src="/assets/images/12.png" data-fancybox="gallery" />

::: warning 注意
变更组件只支持河图上的普通组件和扩展组件生成对照其他组件目前都不支持
:::