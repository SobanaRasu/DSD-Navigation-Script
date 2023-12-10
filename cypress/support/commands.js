// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-wait-until';
//import 'cypress-file-upload';
//import LoginPage from './PageObjects/Core_pageObjects/LoginPage/loginPageObjects'
//import LoginPageActions from './PageActions/Core_pageActions/LoginPage_actions/loginPage_actions'
//import O365_Connector_pageActions from './PageActions/DSD_pageActions/O365_connector_pageActions/O365_createAppPopup_pageActions'
//import 'cypress-mailosaur'
//const loginpage = new LoginPage()
//const loginAction = new LoginPageActions()
let LOCAL_STORAGE_MEMORY = {};



beforeEach(() => {
   cy.restoreLocalStorage();
});

afterEach(() => {
   cy.saveLocalStorage();
});

Cypress.Commands.add("saveLocalStorage", () => {
   Object.keys(localStorage).forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
   });
});

Cypress.Commands.add("restoreLocalStorage", () => {
   Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
   });
});

/**
 * Click on the Element/Button by the exact locator and assert if the Element is vsible
 * @param element - Locator to identify the element initially
 */
Cypress.Commands.add('ClickElement', { prevSubject: 'element' }, (WebElement) => {

   /*  cy.wrap(WebElement).scrollIntoView()
    cy.wrap(WebElement).should('be.visible').click() */
   /*  cy.injectAxe()
     cy.configureAxe({
        reporter: "v2",
        iframes: true
    })
    cy.checkA11y() */
   /*   cy.waitUntil(() =>
    cy.wrap(WebElement).as('Clickelement' ,{log:false}).wait(10 , {log:false}) // for some reason this is needed, otherwise next line returns true even if click() fails due to detached element in the next step
    .then($el => Cypress.dom.isAttached($el)),
    { timeout: 1000, interval: 10 ,log:false }).get('@Clickelement' , {log:false}).scrollIntoView().should('be.visible').click() 
  */
   cy.wrap(WebElement).scrollIntoView().should('be.visible').as('Clickelement')
   cy.get('@Clickelement').then($el =>
      cy.waitUntil(() =>
         Cypress.dom.isAttached($el), { timeout: 1000, interval: 10, log: false }).get('@Clickelement', { log: false }).click()
   )
})

Cypress.Commands.add('ClickElementByText', (text) => {

   cy.get('body').contains(text).wait(300, { log: false }).click({ force: true })
})


/**
* Click on the Element/Button forcefully incase the locator hiding behind any other element
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('ClickElementForce', { prevSubject: 'element' }, (WebElement) => {


   /*   cy.waitUntil(() =>
    cy.wrap(WebElement).as('Clickelementforce' ,{log:false}).wait(10 , {log:false}) // for some reason this is needed, otherwise next line returns true even if click() fails due to detached element in the next step
    .then($el => Cypress.dom.isAttached($el)),
    { timeout: 1000, interval: 10 ,log:false }).get('@Clickelementforce' , {log:false}).scrollIntoView().should('be.visible').click({ force: true }) */

   cy.wrap(WebElement).click({ force: true })

})




/**
* Type value into a Textbox by the exact locator and assert if the Element is visible and it does not have any value
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('SendKeys', { prevSubject: 'element' }, (WebElement, Testdata) => {

   /*   cy.waitUntil(() =>
     cy.wrap(WebElement).as('sendKeys' ,{log:false}).wait(10 , {log:false}) // for some reason this is needed, otherwise next line returns true even if click() fails due to detached element in the next step
     .then($el => Cypress.dom.isAttached($el)),
     { timeout: 1000, interval: 10 ,log:false }).get('@sendKeys' , {log:false}).scrollIntoView().should('be.visible').clear().should('not.have.text').type(Testdata)
   */
   cy.wrap(WebElement).scrollIntoView().should('be.visible').wait(30, { log: false }).as('sendKeys')
   cy.get('@sendKeys').type(Testdata)

   // cy.wrap(WebElement).scrollIntoView().should('be.visible').clear()
   //  cy.wrap(WebElement).should('be.visible').wait(100,{log:false}).should('not.have.text').type(Testdata)
})

/**
 * Type a long String value into a Textbox by the exact locator and assert if the Element is visible and it does not have any value
 * @param element - Locator to identify the element initially
 */

Cypress.Commands.add('SendKeys_longstring', { prevSubject: 'element' }, (WebElement, Testdata) => {

   cy.wrap(WebElement).scrollIntoView().should('be.visible')
   cy.wrap(WebElement).should('be.visible').invoke('val', Testdata)
})

/**
* OverWrites cypress type methods to include sensitive option  
*/
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
   if (options && options.sensitive) {
      // turn off original log
      options.log = false
      // create our own log with masked message
      Cypress.log({
         $el: element,
         name: 'type',
         message: '*'.repeat(text.length),
      })
   }

   return originalFn(element, text, options)
})


/**
* Hide sesitive contents While typing into a textbox and assert if the Element is visible and it does not have any value
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('SendKeySensitive', { prevSubject: 'element' }, (WebElement, Testdata) => {


   /*  cy.waitUntil(() =>
    cy.wrap(WebElement).as('sendKeySensitive' ,{log:false}).wait(10 , {log:false}) // for some reason this is needed, otherwise next line returns true even if click() fails due to detached element in the next step
    .then($el => Cypress.dom.isAttached($el)),
    { timeout: 1000, interval: 10 ,log:false }).get('@sendKeySensitive' , {log:false}).scrollIntoView().should('be.visible').clear().should('not.have.text').type(Testdata ,{ sensitive: true })
  */
   cy.wrap(WebElement).scrollIntoView().should('be.visible').as('sendKeysensitive')
   cy.get('@sendKeysensitive').type(Testdata, { sensitive: true })
})

/**
* Retrieve text contained in the given element
* @param element - Locator to identify the element initially
* @returns{string} - Returns a string contained in the given element
*/
Cypress.Commands.add('getText', { prevSubject: 'element' }, (element) => {

   // cy.wrap(element).scrollIntoView().as()
   return cy.wrap(element).scrollIntoView().invoke('text')
})

Cypress.Commands.add('getAttributeFromElement', { prevSubject: 'element' }, (element, attribute) => {

   let value;
   cy.wrap(element).then((ele) => {

      value = ele.attr(attribute)
      return value;
   })
})


/**
* Retrieve text contained in the given element
* @param element - Locator to identify the element initially
* @returns{string} - Returns a string contained in the given element
*/
Cypress.Commands.add('compareTextEquals', { prevSubject: 'element' }, (element, Testdata) => {

   cy.wrap(element).invoke('text').then((text) => {
      text = text.trim()
      expect(text).to.eq(Testdata)
   })
})


/**
* Compare Element text value by passing string value and assert both String matching or not
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('compareTextIncludes', { prevSubject: 'element' }, (element, Testdata) => {

   cy.wrap(element).invoke('text').then((text) => {

      expect(text).to.includes(Testdata)

   })
})


/**
* Clear the text from the element
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('clearText', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).clear()
})



/**
* Select a checkbox by the exact locator and assert if the checkbox is selected
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('selectCheckbox', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).check().should('be.checked', { force: true })
})

//Select a checkbox Forcefully
Cypress.Commands.add('selectCheckboxForce', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).check({ force: true }).should('be.checked', { force: true })
})

/**
* unSelect a checkbox by the exact locator and assert if the checkbox is unselected
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('unSelectCheckbox', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).uncheck().should('not.be.checked')
})

//unSelect a checkbox Forcefully
Cypress.Commands.add('unSelectCheckboxForce', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).uncheck({ force: true }).should('not.be.checked')
})

/**
* Choose a dropdown value by the exact locator and assert if the value chosen in the dropdown
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('get_selected_element_from_dropdown', { prevSubject: 'element' }, (element, value) => {

   cy.wrap(element).select(value).should('have.value', value)
})

/**
* Choose a dropdown value by using the value and assert if the value chosen in the dropdown
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('Select_from_dropdown_using_value', { prevSubject: 'element' }, (element, value) => {

   cy.wrap(element).each(($e1, index, list) => {

      const elementValue = $e1.text().trim()
      if (elementValue.includes(value.trim())) {

         $e1.click()
      }
   })
})


/**
* Click a elemnt by using the value and assert if the Clicked
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('click_Dynamic_Element_using_includes_value', { prevSubject: 'element' }, (element, value) => {

   cy.wrap(element).each(($e1, index, list) => {

      const elementValue = $e1.text()

      if (elementValue.includes(value.trim())) {

         $e1.click()
      }

   })
})

Cypress.Commands.add('click_Dynamic_Element_using_exact_value', { prevSubject: 'element' }, (element, value) => {

   cy.wrap(element).each(($e1, index, list) => {

      const elementValue = $e1.text()
      if (elementValue.trim() === value.trim()) {

         $e1.click()
      }
   })
})


/**
* Choose a dropdown value by the indexvalue and assert if the value chosen in the dropdown
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('selectDropdownByIndexValue', { prevSubject: 'element' }, (element, indexNum) => {

   cy.wrap(element).eq(indexNum).should('be.visible').click()
})

/**
* Check the Element displayed in the current page 
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('visibilityOfElement', { prevSubject: 'element' }, (WebElement) => {

   cy.wrap(WebElement).should('be.visible')
})

/**
* Retrieve length of the given element
* @param element - Locator to identify the element initially
* @returns{string} - Returns  length in the given element
*/
Cypress.Commands.add('getLengthOfElement', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).its('length').then((lengthOfelement) => {

      return lengthOfelement;
   })
})


/**
* Check the titile contains the passin value in the current page 
*/
Cypress.Commands.add('getTitleCompare', (ExpectedTitle) => {

   cy.title().should('include', ExpectedTitle)
})


/**
* Navigate to next page using browser history
*/
Cypress.Commands.add('navigateForward', () => {

   cy.go('forward')
})

/**
* Navigate beck to previous page using browser history
*/
Cypress.Commands.add('navigateBack', () => {

   cy.go('back');
   cy.wait(3000)
})


/**
* Check the url contains the passing value in the current page 
*/
Cypress.Commands.add('compareCurrentURL', (Url) => {

   cy.url().should('eq', Url)
})

/**
* Retrieve title  of the Current page
* @param element - Locator to identify the element initially
* @returns{string} - Returns title of the current Page
*/
Cypress.Commands.add('getTitle', () => {

   cy.title().then((title) => {

      return title;
   })
})



/**
* Retrieve the URL  of the Current page
* @param element - Locator to identify the element initially
* @returns{string} - Returns URL  of the current Page
*/
Cypress.Commands.add('getCurrentURL', () => {

   return cy.url()/* .then((getCurrenturl)=>{

       return getCurrenturl;
  }) */
})

/**
* Retrieve the URL  of the Current page
* @param element - Locator to identify the element initially
* @returns{string} - Returns tenant Name
*/
Cypress.Commands.add('getTenantName', () => {

   cy.url().then((getCurrenturl) => {

      let value = getCurrenturl.split('.exterro')
      const tenant = value[0].split('https://')
      const tenantName = tenant.slice(1)
      return tenantName;
   })
})

/**
* Refresh the Current page
*/
Cypress.Commands.add('refreshPage', () => {

   cy.reload()
})

/**
* Navigate to the new URL from the Current URL (same domain)
*/
Cypress.Commands.add('navigateToUrl', (url) => {

   cy.visit(url)
})

/**
* Upload file by the exact locator and assert the element visibility
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('fileUpload', { prevSubject: 'element' }, (element, filepath) => {

   cy.wrap(element).scrollIntoView()
   cy.wrap(element).selectFile(filepath, { force: true })
   // cy.wrap(element).attachFile(filepath) 

})


/**
* Double Click on the Element/Button by the exact locator and assert if the Element is vsible
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('doubleClickElement', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).should('be.visible').dblclick();
})


/**
* right Click on the Element/Button by the exact locator and assert if the Element is vsible
* @param element - Locator to identify the element initially
*/
Cypress.Commands.add('rightClickElement', { prevSubject: 'element' }, (element) => {

   cy.wrap(element).should('be.visible').rightclick()
})


/**
* Retrieve the string value drom the alert message
* @param element - Locator to identify the element initially
* @returns{string} - Returns string value from the alert box
*/
Cypress.Commands.add('getAlertText', function () {

   cy.on('window:alert', (txt) => {

      return txt;
   })
})

/**
* Compare text of the alert box by passing value 
*/
Cypress.Commands.add('compareAlertText', function (Testdata) {

   cy.on('window:alert', (txt) => {
      expect(txt).to.equal(Testdata);
   })
})

/**
* Click on ok/confirm button on alert box 
*/
Cypress.Commands.add('alertClickConfirm', function () {

   cy.on('window:confirm', () => true);

})

/**
* Click on cancel button on alert box 
*/
Cypress.Commands.add('alertClickCancel', function () {

   cy.on('window:confirm', () => false);

})

Cypress.Commands.add('move_To_element_and_Click', { prevSubject: 'element' }, (element) => {

   //  cy.wrap(element).scrollIntoView({ easing: 'swing' }).should('be.visible')
   cy.wrap(element).invoke('show').should('be.visible').ClickElementForce()

})


/**
* Login to the fusion application by passing loginURL and valid credentials
*/
// Cypress.Commands.add('login', function () {

//    cy.loginURL().then(() => {

//       if (Cypress.env("loginType") === 'jdbc') {

//          const username = Cypress.env('Fusion_UserName')
//          const password = Cypress.env('Fusion_Password')
//          loginpage.getUsername_JDBC().SendKeys(username)
//          loginpage.getPassword_JDBC().SendKeySensitive(password)
//          loginpage.getSignInbutton_JDBC().click().then(() => {
//             loginAction.getDuplicatesession()
//             cy.CurrentUserName()
            

//          })
//       }

//       else if (Cypress.env("loginType") === 'saml') {
//          const SSO_username = Cypress.env('SSO_UserName')
//          const SSO_password = Cypress.env('SSO_Password')

//          loginpage.getUsername_SSO().SendKeys(SSO_username)
//          loginpage.getNext_SSO().ClickElement()
//          loginpage.getPassword_SSO().SendKeySensitive(SSO_password)
//          let duplicateWindow = 'fusion/core/rest/0/auth/token?*'
//          cy.interceptAPI('POST', duplicateWindow).as('duplicateSessionCheck')
//          loginpage.getSignInbutton_SSO().ClickElement().then(() => {

//             cy.wait('@duplicateSessionCheck').then(() => {

//                loginAction.getDuplicatesession()
//                cy.CurrentUserName()

//             })
//          })
//       }
//       else {

//          cy.log('Incorrect Login Type. Please check Environmental variable key')
//       }
//    })
// })


/**
* Launch fusionURL 
*/

// Cypress.Commands.add('loginURL', () => {

//    cy.POST_Request('fusion/core/rest/0/auth/token', { "username": '', "password": '' }).then((response) => {

//       if (response.status === 502 || response.status === 504 || response.status === 401) {

//          cy.log('Build down')
//       }
//       else if (response.status === 200) {

//          cy.visit(Cypress.env('fusionURL') + 'fusion/ui/pages/login.htm')
//          Cypress.env("loginType", response.body.AUTHENTICATION_TYPE)
        
         
//       }
//    })
// })

// Cypress.Commands.add('loginAPI', () => {

//    cy.session( [Cypress.env('Fusion_UserName') , Cypress.env('Fusion_Password')] ,() => {

//       cy.POST_Request('fusion/core/rest/0/auth/token', { "username": '', "password": '' }).then((response) => {

//          if (response.status === 502 || response.status === 504 || response.status === 401) {

//             cy.log('Build down')
//          }
//          else if (response.status === 200) {

//       //     Cypress.env("loginType", response.body.AUTHENTICATION_TYPE)

//             if (response.body.AUTHENTICATION_TYPE === 'jdbc') {

//                cy.POST_Request('fusion/core/rest/0/auth/token', { "username":Cypress.env('Fusion_UserName'), "password": Cypress.env('Fusion_Password') , "reCreateUser": "true" }).then((xhrResponse)=>{

//                      Cypress.env('fusionAuth' ,xhrResponse.body.access_token)

//                })
//             }
//             else if (response.body.AUTHENTICATION_TYPE === 'saml'){

//                cy.POST_Request('fusion/core/rest/0/auth/token', { "username": Cypress.env('SSO_UserName'), "password": Cypress.env('SSO_Password') })

//             }
//          }
//       })

//    }).then(() => {

//       window.localStorage.setItem('fusionAccessToken', Cypress.env('fusionAuth'))
//    })
// })


Cypress.Commands.add('CurrentUserName',()=>{

 

  cy.GET_Request('fusion/core/rest/api/0/users/currentuser?&fromMyProfile=true&**').then((currentUser)=>{

    Cypress.env('Current_Fusion_Username' , currentUser.body.FULL_NAME)
 })
  
})

Cypress.Commands.add('interceptAPI', (method, url) => {

   cy.intercept({
      method: method,
      url: Cypress.env('fusionURL') + url
   })
})


Cypress.Commands.add('Mock_interceptAPI', (method, url, statuscode) => {

   cy.intercept({
      method: method,
      url: Cypress.env('fusionURL') + url
   }, {
      statusCode: statuscode
   })
})

Cypress.Commands.add('POST_Request', (url, bodyValue) => {

   cy.request({
      method: 'POST',
      url: Cypress.env('fusionURL') + url,
      headers: {
         'fusion-auth': Cypress.env('fusionAuth')
      },
      failOnStatusCode: false,
      body: bodyValue
   })
})

Cypress.Commands.add('GET_Request', (url) => {

   cy.request({
      method: 'GET',
      url: Cypress.env('fusionURL') + url,
      headers: {
         'fusion-auth': Cypress.env('fusionAuth')
      },
      failOnStatusCode: false,
   })
})

Cypress.Commands.add('fetch_email_from_server', (emailname) => {
   const serverId = '6xtvggrr'
   const serverDomain = '@6xtvggrr.mailosaur.net'
   const emailAddress = emailname + serverDomain

   cy.mailosaurGetMessage(serverId, {
      sentTo: emailAddress
   }).then(email => {
      return email
   })
})

// Cypress.Commands.add('selectFromLoop', (DSD_Features) => { 
//     cy.get('ul li.connLi.showTopFiveConnectors.displayAllConnectors.ng-star-inserted').each((x,index,$list) => {
//         if(x.text().includes(DSD_Features)){
//             const y = x.text()
//             cy.log(x,y)
//             cy.log(DSD_Features + "available")
//         }
    
//     })
//     })
Cypress.Commands.add('check_DuplicateSession', () => 
{
   cy.wait(3000)
  cy.get('.ui-button-text').then(function(tlen){
   let text = tlen.text()
   //cy.log(text)
   if(text.includes("Sign in"))
        {
          cy.wait(1000)
         cy.get('.ui-dialog-buttonset > .buttonFinal').click()

          cy.log("A Duplicate session has been found")
          cy.wait(2000)         
        }
    else
        {
          cy.log("No Duplicate session")
        }

      })

})

    Cypress.Commands.add('checkSystemAdminDuplicateSession', () => 
{
  cy.get(".buttonFinal").then(function(tlen)
  {

    if(tlen.length === 1)
        {
          cy.wait(1000)
          cy.get('.ui-dialog-buttonset > .buttonFinal').click()
          cy.log("A Duplicate session has been found")
          cy.wait(1000)         
        }
    else
        {
          cy.log("No Duplicate session")
        }

  })

})
// Cypress.Commands.add('checkLoginDuplicateSession', () => 
// {
//     cy.wait(3000)
//       cy.get("div[tabindex='0']").then(function(tlen)
//       {
    
//         if(tlen.length===5)
//             {
//               cy.wait(3000)
//               cy.get('.ui-dialog-buttonset > .buttonFinal').click()
//               cy.log("A Duplicate session has been found")
//               cy.wait(5000)         
//             }
//         else
//             {
//               cy.log("No Duplicate session")
//             }
    
//       })
    
//     })


