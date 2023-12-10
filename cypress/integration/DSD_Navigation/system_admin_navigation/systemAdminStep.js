//import cypress from "cypress";
import { Given,When,Then, And} from "cypress-cucumber-preprocessor/steps";
import systemAdminActions from '../../../support/DSD_Page_Actions/systemAdminActions'

const sysAct = new systemAdminActions()

Given('Login to system admin',function(){
   sysAct.loginToAdmin()
})
When('Go to Feature Group and click DSD Module',function(){
   sysAct.getDSDfeaturesEnabled()
})
And('Enable Applicable Connectors',function(){
   sysAct.enableFeatureGroup()
})
Then('Verify whether connectors are enabled',function(){
    sysAct.verifyDSDFeatureGroupEnabled()
 })
Given('Login to application',function(){
   sysAct.loginToApplication()
})
When('Go to Manage connector page',function(){
   sysAct.goToManageConnectorPage()
   //sysAct.homePageNavigation()
})
And('Check enabled connectors are available',function(){
   sysAct.managePageVerifyEnabledConnectors()
})
Then('Click Connector to check Application & Data Source tab',function(){
   sysAct.clickConnectors()
})
Then('Check Application page is getting loaded',function(){
   sysAct.clickManageApplication()
})
And('Check Settings Page Tabs availability',function(){
   sysAct.clickDSDSettingsPage()
})
Then('Check Tabs are loaded in new tenant for configuration',function(){
   sysAct.CheckSettingsPageTabs()
})
When('Go to Security role & Check DSD role types are created',function(){
   sysAct.DSDRoleTypeAvailability()
})

//Sobana

When('Check the DSD Module availability in Home Page and Navigate to DSD Home Page',function(){
   sysAct.dsdModuleInHomePage();
})

Then('Check DSD Module manage page is loading properly and the elements present in the DSD Home Page should be visible',function(){
   sysAct.connectorsbuttons()
   sysAct.homePageNavigation()
})

When('Check the Navigation from the Manage connectors page to their Manage Application Page',function(){
   sysAct.manageConnectorspageNavigation()
   sysAct.connectorsbuttons()
})

Then('Check the Navigation for Manage application page from Home Page',function(){
   sysAct.manageApplicationPageNavigation()
   //sysAct.homePageNavigation()
})

Given('Navigate to home Page',function(){
   sysAct.homePageNavigation()
   sysAct.homePageURL()
})


When('Check the Manage Connectors tab availability and Navigate to Manage Connectors Page',function(){
   sysAct.manageConnectorspageNavigation()   
})

Then('Check Manage Connectors page is loading properly and the elements present in the Manage Connectors Page should be visible',function(){
   sysAct.connectorsbuttons()
   

})
When('Check the Manage Application tab availability and Navigate to Manage Application Page',function(){
   sysAct.manageApplicationPageNavigation()
})
Then('Check Manage Application page is loading properly and the elements present in the Manage Application Page should be visible',function(){
   sysAct.manageApplicationPageElements()
   sysAct.homePageNavigation()
   
})
Then('Check the DSD Module is available in Apps icon and Navigate to DSD Page',function(){
   sysAct.navigationFromAppsIcon()
   sysAct.connectorsbuttons()
   
})
Given('Go to System Admin Home Page',function(){
   sysAct.clickSysAdminHomePageIcon()
})
Then('Check Search tab is available',function(){
   sysAct.searchfunctionality()
   sysAct.homePageNavigation()
})

