var fs = require('fs');

casper.options.onError = function(msg, backtrace) {
  casper.capture('error.png')
  casper.echo('ERROR', 'ERROR')
  casper.exit();
}
casper.options.waitTimeout = 180000;

// Make folder for testpictures
var foldername = makeFolder();

var testWebsiteUrl = '';

var inputFields = {
  disableVirtualPaging: {
    type: 'button',
    selector: '#disablemedebug',
    existMessage: 'virtualpaging-button exists'
  },
  maleInput: {
    type: 'radiobutton',
    id: 'male-radiobutton',
    selector: '#material-honorific-prefix > div > div.input-holder.input-holder-male > label',
    existMessage: 'male-radiobutton exists',
    value: true, // birthday example ('10')
    filledMessage: 'male-radiobutton is selected'
  },
  femaleInput: {
    type: 'radiobutton',
    id: 'female-radiobutton',
    selector: '#material-honorific-prefix > div > div.input-holder.input-holder-male > label',
    existMessage: 'female-radiobutton exists',
    value: true, // birthday example ('10')
    filledMessage: 'female-radiobutton is selected'
  },
  initialsInput: {
    type: 'textbox',
    id: 'initials',
    selector: '#initials',
    existMessage: 'initial-textbox exists',
    value: 'G.', // Initials example ('P.R.') DONT FORGET THE PERIODS
    filledMessage: 'initial(s) is/are filled'
  },
  additionalNameInput: {
    type: 'textbox',
    id: 'additional-name',
    selector: '#additional-name',
    existMessage: 'additional-name-textbox exists',
    value: 'Van', // Additional-name example ('de')
    filledMessage: 'additional-name is filled'
  },
  surnameInput: {
    type: 'textbox',
    id: 'family-name',
    selector: '#family-name',
    existMessage: 'family-name-textbox exists',
    value: 'Dijkhuis', // Family name example ('Vries')
    filledMessage: 'family-name is filled'
  },
  nextButton_page1: {
    type: 'button',
    selector: '#material-button-name > div > button',
    existMessage: 'name-button exists'
  },
  postalcodeInput: {
    type: 'textbox',
    id: 'postal-code',
    selector: '#postal-code',
    existMessage: 'postalcode-textbox exists',
    value: '1435NJ', // Postalcode example ('2133JM') DONT FORGET 4 NUMBERS + 2 LETTERS
    filledMessage: 'postal-code is filled'
  },
  housenumberInput: {
    type: 'textbox',
    id: 'house-number',
    selector: '#house-number',
    existMessage: 'housenumber-textbox exists',
    value: housenumberGenerator([20, 22, 24, 26, 28, 30, 32, 34, 36, 19, 21, 23, 25, 27, 29, 31, 33, 35]), // All housenumbers of postalcode https://drimble.nl/buurten/3940113/hoofddorp-toolenburg-west.html
    filledMessage: 'housenumber is filled'
  },
  housenumberExtensionInput: {
    type: 'textbox',
    id: 'street-number-extension',
    selector: '#street-number-extension',
    existMessage: 'streetnumberextension-textbox exists',
    value: 'A', // housenumber extension example ('A')
    filledMessage: 'housenumber-extension is filled'
  },
  nextButton_page2: {
    type: 'button',
    selector: '#material-button-address > div > button',
    existMessage: 'address-button exists'
  },
  ibanInput: {
    type: 'textbox',
    id: 'iban',
    selector: '#iban',
    existMessage: 'iban-textbox exists',
    value: ibanGenerator(), // iban generator
    filledMessage: 'iban is filled'
  },
  permissionLink: {
    type: 'link',
    selector: '#material-subscription-opt-in > div > div.input-holder.input-holder-subscription-opt-in > label',
    existMessage: 'permission-link exist'
  },
  nextButton_page3: {
    type: 'button',
    selector: '#material-button-iban-1 > div > button > span',
    existMessage: 'iban-button exists'
  },
  birthDayInput: {
    type: 'textbox',
    id: 'bday-day',
    selector: '#bday-day',
    existMessage: 'bday-day-textbox exists',
    value: '10', // birthday example ('10')
    filledMessage: 'birthday-day is filled'
  },
  birthmMonthInput: {
    type: 'textbox',
    id: 'bday-month',
    selector: '#bday-month',
    existMessage: 'bday-month-textbox exists',
    value: '03', // birthmonth example ('03')
    filledMessage: 'birthday-month is filled'
  },
  birthYearInput: {
    type: 'textbox',
    id: 'bday-year',
    selector: '#bday-year',
    existMessage: 'bday-year-textbox exists',
    value: '1996', // birthyear example ('1996')
    filledMessage: 'birthday-year is filled'
  },
  emailAddressInput: {
    type: 'textbox',
    id: 'email',
    selector: '#email',
    existMessage: 'email-textbox exists',
    value: 'guus.dijkhuis@thevalley.com', // email address example ('peter@gmail.com')
    filledMessage: 'email is filled'
  },
  phoneNumberInput: {
    type: 'textbox',
    id: 'tel',
    selector: '#tel',
    existMessage: 'phonenumber-textbox exists',
    value: '0612345678', // phonenumber example ('0612345678')
    filledMessage: 'phone-number is filled'
  },
  nextButton_page4: {
    type: 'button',
    selector: '#material-button-tel > div > button',
    existMessage: 'phone-number-button exists'
  }
}

var viewports = {
  desktop_large: {
    width: 1280,
    height: 800
  },
  ipad_portrait: {
    width: 768,
    height: 1024
  },
  iphone_6_portrait: {
    width: 375,
    height: 667
  },
  iphone_5_portrait: {
    width: 320,
    height: 568
  }
};




casper.test.begin('Testing 1-speel-mee-code', function() {

  casper.start();
  var viewportsIndex = 0;
    casper.repeat(Object.keys(viewports).length, function() {

        var viewportKey = Object.keys(viewports)[viewportsIndex];
        var viewportObj = viewports[viewportKey];

        casper.echo(viewportKey, 'INFO');

        casper.viewport(viewportObj.width, viewportObj.height);

        casper.thenOpen(testWebsiteUrl);
        var inputFieldIndex = 0;

        casper.repeat(Object.keys(inputFields).length, function() {
          // casper.capture('tests/' + foldername + '/' + viewportKey + '/' + inputFieldIndex + '-shot.png');

            var inputFieldsKey = Object.keys(inputFields)[inputFieldIndex];
            var inputFieldsObj = inputFields[inputFieldsKey];

            switch (inputFieldsObj.type) {
                case 'textbox':
                  casper.waitForSelector(inputFieldsObj.selector, function() {
                    casper.test.assertExist(inputFieldsObj.selector, inputFieldsObj.existMessage);
                    casper.sendKeys(inputFieldsObj.selector, inputFieldsObj.value);
                    casper.then(function() {
                      casper.capture('tests/' + foldername + '/' + viewportKey + '/' + inputFieldIndex + '-screenshot.png');
                    });
                  });
                break;
                case 'button':
                  casper.waitForSelector(inputFieldsObj.selector, function() {
                    casper.test.assertExist(inputFieldsObj.selector, inputFieldsObj.existMessage);
                    casper.thenClick(inputFieldsObj.selector, function() {});
                    casper.then(function() {
                      casper.capture('tests/' + foldername + '/' + viewportKey + '/' + inputFieldIndex + '-screenshot.png');
                    });
                  });
                break;
                case 'radiobutton':
                  casper.waitForSelector(inputFieldsObj.selector, function() {
                    casper.test.assertExist(inputFieldsObj.selector, inputFieldsObj.existMessage);
                    casper.thenClick(inputFieldsObj.selector, function() {});
                    casper.then(function() {
                      casper.capture('tests/' + foldername + '/' + viewportKey + '/' + inputFieldIndex + '-screenshot.png');
                    });
                  });
                break;
                case 'link':
                  casper.waitForSelector(inputFieldsObj.selector, function() {
                    casper.test.assertExist(inputFieldsObj.selector, inputFieldsObj.existMessage);
                    casper.thenClick(inputFieldsObj.selector, function() {});
                    casper.then(function() {
                      casper.capture('tests/' + foldername + '/' + viewportKey + '/' + inputFieldIndex + '-screenshot.png');
                    });
                  });
                break;
                default:
                  console.log('nothing');
            }
          inputFieldIndex++
        });
        viewportsIndex++;
    });
})

casper.run(function() {
  casper.test.done()
});


function makeFolder() {
  var dateTime = new Date();

  var seconds = dateTime.getUTCSeconds();
  var minute = dateTime.getUTCMinutes();
  var hour = dateTime.getUTCHours() + 2;
  var day = dateTime.getUTCDate();
  var month = dateTime.getUTCMonth() + 1;
  var year = dateTime.getUTCFullYear();

  var date = year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + seconds;

  fs.makeDirectory('/Users/guus.dijkhuis/Documents/CampaignSites/src/GDL.Html/src/assets/toolkit/scripts/auto-test/tests/' + date);
  return date
};

function ibanGenerator() {
  var r = Math.floor((Math.random() * 9999) + 1000);
  return r.toString();
}

function housenumberGenerator(numArr) {
  var r = Math.floor((Math.random() * numArr.length));
  return numArr[r].toString();
}
