# rules表单验证的参数问题

> 在使用element或者antdv等ui的时候，基本很容易忽略一个东西，rules的参数，其中有个type参数。至少我可能忽略了....

## type

<strong style='color:orange;font-size:16px' >string</strong>: Must be of type string. This is the default type.这个是默认值

<strong style='color:orange;font-size:16px' >number</strong>: Must be of type number.

<strong style='color:orange;font-size:16px' >boolean</strong>: Must be of type boolean.

<strong style='color:orange;font-size:16px' >method</strong>: Must be of type function.

<strong style='color:orange;font-size:16px' >regexp</strong>: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.

<strong style='color:orange;font-size:16px' >integer</strong>: Must be of type number and an integer.

<strong style='color:orange;font-size:16px' >float</strong>: Must be of type number and a floating point number.

<strong style='color:orange;font-size:16px' >array</strong>: Must be an array as determined by Array.isArray.

<strong style='color:orange;font-size:16px' >object</strong>: Must be of type object and not Array.isArray.

<strong style='color:orange;font-size:16px' >enum</strong>: Value must exist in the enum.也就是绑定的数据必须是这里面的，比如[c1,c2],那么v-model绑定的数据只能是c1或者c2

<strong style='color:orange;font-size:16px' >date</strong>: Value must be valid as determined by Date

<strong style='color:orange;font-size:16px' >url</strong>: Must be of type url.

<strong style='color:orange;font-size:16px' >hex</strong>: Must be of type hex.

<strong style='color:orange;font-size:16px' >email</strong>: Must be of type email.
any: Can be any type.

## Required

属性为true是，该字段为必填项

## Pattern

该 pattern 规则属性指示一个正则表达式的值必须匹配，才能通过验证。

## min、max

规定最小长度与最大长度

## len

指定确切长度。（如果该len属性与min和max范围属性结合使用，len则优先。）

## whitespace

验证是否只有空格,必选时，空格是否会被视为错误

## Transform

有时有必要在验证之前转换值，以强制或以某种方式对其进行清理。为此 transform ，向验证规则添加一个function。在验证之前，先转换属性，然后将其重新分配给源对象，以更改该属性的值。
```
import Schema from 'async-validator';
const descriptor = {
  name: {
    type: 'string',
    required: true,
    pattern: /^[a-z]+$/,
    transform(value) {
      return value.trim();
    },
  },
};
const validator = new Schema(descriptor);
const source = { name: ' user  ' };
validator.validate(source)
  .then(() => assert.equal(source.name, 'user'));
```

## Messages

效验不通过显示

## asyncValidator

可以为指定的字段自定义异步验证功能

## validator

可以为指定字段自定义验证功能

```
let numberLengthSix = (rule, value, callback) => {
  if(String(value).length > 6) {
    callback('超出限制')
  } else {
    callback()
  }
}

// 校验
numberLengthSix: [
  {validator: numberLengthSix, trigger: 'blur'}
]
```