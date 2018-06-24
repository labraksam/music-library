# Auto-fill GDL
The Auto-fill GDL is a testing module for the GDL websites. On these websites you can register for promotions of the GDL websites. The Auto-fill module makes it easier to check fails of the websites.

The GDL Websites includes:
* VriendenLoterij
* PostcodeLoterij
* BankGiroLoterij


This module ensures that you no longer have to enter all the input fields yourself for testing. Below I explain how this should be installed and how the test should be performed.

# Getting started

## Installing
For using this module you need to install:
* [PhantomJS](http://phantomjs.org/) - Headless website testing
* [CasperJS](http://casperjs.org/) - Framework of PhantomJS

```
npm install phantomjs casperjs
```

# Running the test
For running the test, go into the root directory of the repository and directly run with casperjs:
```
casperjs test tests/autofill.js
```
or with npm:
```
npm test
```
While the test runs, the module makes screenshots after each input is filled. The screenshots are different sizes, you can change the sizes of the screenshots in the script.

# Use the script

### Website URL
Use the **URL** of the test website and put it in `your_url`

`var testWebsiteUrl = '[your_url]';`

---
### Inputfields
Put the names of the inputfields inside the `inputFields` object. Here are all the inputfields of the form.

```
var inputFields = {
  ...
}
```

The `inputfields` object is constructed in unlimited objects

---

### Objectname
Inside the `inputfields` object are other objects. These child-objects has names what you want but I prefer to choose a relative name.

These child-objects are constructed in 6 properties.

##### *Example of object*

```
var inputFields = {
  surnameInput: {
    type: 'textbox',
    id: 'family-name',
    selector: '#family-name',
    existMessage: 'family-name-textbox exists',
    value: 'Dijkhuis',
    filledMessage: 'family-name is filled'
  }
}
```

#### Object explenation
#### 1. Type
The type of an inputfield
##### datatype
`string`
##### options
`'link' | 'button' | 'radiobutton' | 'textbox' `
##### example
`type: 'textbox'`


#### 2. Id
Give an Id whatever you want
##### datatype
`string`
##### options
`The_id_you_want`
##### example
`id: 'family-name'`


#### 3. Selector
The selector of an inputfield
##### datatype
`string`
##### options
`The_selector_of_the_element`
##### example
`selector: '#family-name'`


#### 4. ExistMessage
The message you want if an inputfield exist
##### datatype
`string`
##### options
`message_you_want_if_exists`
##### example
`existMessage: 'family-name-textbox exists'`


#### 5. Value
The value what you want in the inputtype
##### datatype
`string | boolean`
##### options
`value_you_want_in_the_input`
##### example
`value: 'Dijkhuis'`


#### 6. FilledMessage
The message you want if the inputfield is filled with the value.
##### datatype
`string`
##### options
`value_you_want_in_the_input`
##### example
`filledMessage: 'family-name is filled'`

---

#### Viewports
Put the names of the inputfields inside the inputFields object

```
var viewports = {
  ...
}
```

If you want an extra viewport screenshot you can add a viewport to the `viewports` object.

Inside the `viewport` object are other objects. These child-objects has names of the device with these screenwidth or -height.

These child-objects are constructed in 2 properties.

##### *Example of object*

```
var viewports = {
  desktop_large: {
    width: 1280,
    height: 800
  }
};
```

---

#### Generator

##### Housenumber generator
When you want an random housenumber you need the housenumber generator. The housenumber generator is a very simple tool to get a random housnumber. As parameter you give an array with housenumbers.

##### *Example of housenumberGenerator*

```
surnameInput: {
  value: housenumberGenerator([20, 22, 24, 26])
}
```
