/// <reference types="Cypress" />
import systemAdminObjects from '../DSD_Page_Objects/systemAdminObjects'
//import example from '../../fixtures/dsdTestData/dsdTestData.json'
//import DSD_Features from '../../fixtures/dsdTestData/dsdTestData.json'
import 'cypress-wait-until'

const sysObj = new systemAdminObjects()
const testData = require('../../fixtures/dsdTestData/dsdTestData.json')
const userJson = require('../../fixtures/users.json')
let connCounter = 0
var connValue = []
let conNameList
let DSNameList
let adminName

class systemAdminActions{

  
loginToAdmin(){
    cy.visit(Cypress.env('URL'))
    sysObj.getSigninButton().should('have.text','Sign in')
    //sysObj.getUserNameTextField().type(testData.AdminUserName)
    //cy.SendKeys(sysObj.getUserNameTextField(),testData.AdminUserName)
    sysObj.getUserNameTextField().SendKeys(testData.AdminUserName)
    sysObj.getPasswordTextField().SendKeys(testData.AdminPassword)
    sysObj.getSigninButton().ClickElement()
    cy.check_DuplicateSession()
    sysObj.getfeatureGroupButton().should('have.attr','title','Feature Groups') 
        
        //Sobana
    cy.get('#COMPANY_INFORMATION').ClickElement()
    cy.get('.defaultCompanyStatus').ClickElementForce()
    cy.get('[aria-label="Users"]').ClickElementForce()
    //cy.log(cy.get('.undefined'))
    cy.get('td.undefined').first().then($adminusername => {
        adminName = $adminusername.text()
        cy.log("Fetched user name "+ adminName)
        //cy.get(adminName).as('warpText')
    })
    //return cy.get('@warpText')
    }
    
    getDSDfeaturesEnabled(){        
        sysObj.getfeatureGroupButton().ClickElementForce()
        sysObj.getfeatureGroupPasswordTextField().should('have.attr','type','password')
        sysObj.getfeatureGroupPasswordTextField().SendKeys(testData.featureGroupPassword)
        sysObj.getfeaturegroupPasswordSubmitButton().ClickElement()
        sysObj.getDSDModuleTitle().should('have.text','DATA SOURCES DISCOVERY')   
    }

    enableFeatureGroup(){
        sysObj.getDSDModuleTitle().ClickElement()
      testData.DSD_Features.forEach((element)=>{
           
            //cy.get('[aria-label="'+element+'"]').scrollIntoView()
            cy.get('[aria-label="'+element+'"]').ClickElement()
            cy.log(element +" connector enabled")
        })  
        sysObj.getfeaturegroupPasswordSubmitButton().ClickElementForce()
        //cy.wait(3000)

    }

    verifyDSDFeatureGroupEnabled(){
        sysObj.getfeatureGroupButton().ClickElement()
        sysObj.getfeatureGroupPasswordTextField().should('have.attr','type','password')
        sysObj.getfeatureGroupPasswordTextField().SendKeys(testData.featureGroupPassword)
        sysObj.getfeaturegroupPasswordSubmitButton().ClickElement()
        //cy.wait(3000)
        sysObj.getDSDModuleTitle().ClickElement()
        testData.DSD_Features.forEach((element)=>{
            cy.log("Given DSD Connector : " + element)
            cy.get('[aria-label="'+element+'"]').scrollIntoView()
            cy.get('[aria-label="'+element+'"]').should('be.checked')
            
        })
        sysObj.getfeaturegroupPasswordSubmitButton().ClickElementForce()
        //cy.wait(3000)
    }

    clickSysAdminHomePageIcon(){
        sysObj.getSysAdminHomePageIcon().ClickElement()
    }
    loginToApplication(){
        cy.visit(Cypress.env('tenantURL'))
        
    //cy.get('@warpText').then(aun=>{
        //cy.log(adminUserName)
        //const adminName=adminUserName.text()
       //cy.login(adminUserName,"Password-098");
       sysObj.getUserNameTextField().SendKeys(adminName)
        //cy.wait(500)
       sysObj.getPasswordTextField().SendKeys("Password-098")
       sysObj.getSigninButton().ClickElement()
       cy.check_DuplicateSession()
       sysObj.getHomePageConnTab().should('have.text','Connectors/Integrations') 
    }   

    goToManageConnectorPage(){
       sysObj.getHomePageConnModuleName().invoke('text').then((text) => {
            expect(text.trim()).equal('Connectors/Integrations')
            if(text == 'Connectors/Integrations'){
               //cy.server()
               //cy.route('GET','**/asset/rest/0/connectors**').as('manageConnector_Response') 
               cy.intercept('GET','**/asset/rest/0/connectors**').as('manageConnector_Response') 
               sysObj.getHomePageConnTab().ClickElement()
               cy.wait('@manageConnector_Response').its('response.statusCode').should('eq',200)
            }else{
                cy.log("Module Not Found")
            }
        })   
    }

    managePageVerifyEnabledConnectors(){
        let counter =0
       testData.DSD_Features.forEach(function(element) {
           let subElement
            if(element == 'Gmail' || element =='Google Calendar' || element =='Google Drive' || element =='Google Vault'){
                subElement = 'Google Workspace'               
                cy.log("Element changed to " + subElement)
                //return element
            }
            if(element == 'Employee devices'||element =='Exchange Mailboxes'||element =='Network Share'){
                subElement = 'Active Directory'               
                cy.log("Element changed to" + subElement)
                //return element
            }
            if(element == 'Salesforce Chatter'||element =='Salesforce CRM'){
                subElement = 'Salesforce'              
               cy.log("Element changed to" + subElement)
               //return element
            }
            if(element == 'Exchange Online' ||element == 'OneDrive'||element =='OneNote'||element =='SharePoint Online'||element =='Teams'||element =='Yammer'){
                subElement = 'Office365'                
                cy.log("Element changed to" + subElement)
                //return element
            } 

            sysObj.getConnList().each(($els, index, $list) => {
                let connList = $els.text()
            }).then((connectorsList)=>{
                const ll = connectorsList.text()
                 if((ll.includes(element)||ll.includes(subElement)) && ll.includes('Add new') ){
                    cy.log(element + " is available")
                    connCounter++
                    conNameList = element
                    connValue.push(conNameList)
                    //cy.log("Connector available - : " +connValue)
                    cy.wrap(connCounter).as('counterValue')                  
                }
                else if(counter == 0){
                    cy.log(element + "  not available")
                    counter++                    
                }               
            })
            //return cy.get('@counterValue')
            })
            cy.get('@counterValue').then((count)=>{
                cy.log('Connector Length '+count)
                expect(testData.DSD_Features.length).to.eq(count)                
            })
            cy.get(testData.DSD_Features).each(($ele,i)=>{
                expect($ele).to.equal(connValue[i])
            }) 
        }
        
    clickConnectors(){
        let dsTabList 
        sysObj.getConnList().each(($cnl,index,list) => {
            sysObj.getConnList().eq(index).invoke('attr' ,'id').then((value)=>{
            cy.log('connector Name: ' +value)
            
            sysObj.getConnList().eq(index).ClickElement()
            sysObj.getConnectorApplicationTab().contains('Application').should('have.text','Applications')
            cy.wait(1000)
            sysObj.getConnectorDataSourceTab().contains('Data sources').should('have.text','Data sources')
            sysObj.getConnectorDataSourceTab().contains('Data sources').ClickElementForce()
            sysObj.getDSTabsForEachConnector().each(($dsList,index,list)=>{}).then((dd)=>{
                let connDSList = dd.text().trim().split("0")
                cy.log("Data source Name: "+connDSList[0])
                if(value ==='activeDirectory'){
                    Cypress.env("Active Directory").forEach((dsList,index)=>{
                        // cy.log("dsList: " +dsList.trim())
                        // cy.log("conNameList[0]:" + connDSList[0])
                        if((connDSList[0]).includes(dsList)) {
                            cy.log(connDSList[0] + " is available")
                            cy.wrap(connDSList[0]).should('contain',(dsList))
                        }
                    })
                    
                } 
                if(value ==='box' || value ==='druva' || value ==='druva' || value ==='slack' || value ==='zoom' || value === 'quip'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("Box"))
                }
                // if(value ==='activeDirectory'){
                //     cy.wrap(connDSList[0]).should('contain',Cypress.env("Active Directory"))
                // }
                if(value ==='code42'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("Code 42"))
                }
                if(value ==='confluence'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("Confluence"))
                }
                if(value ==='druva'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("Druva Insync"))
                }
                if(value ==='fbworkplace'){
                    //cy.wrap(connDSList[0]).should('contain',Cypress.env("Facebook Workplace"))
                    Cypress.env("Facebook Workplace").forEach((dsList,index)=>{
                        //cy.log(dsList)
                        if((connDSList[0]).includes(dsList)) {
                            cy.log(connDSList[0] + " is available")
                            cy.wrap(connDSList[0]).should('contain',(dsList))
                        }
                    })
                }
                if(value ==='fileNet'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("FileNet"))
                }
                if(value ==='gsuite'){
                    //cy.wrap(connDSList[0]).should('contain',Cypress.env("Google Workspace"))
                    Cypress.env("Google Workspace").forEach((dsList,index)=>{
                        //cy.log(dsList)
                        if((connDSList[0]).includes(dsList)) {
                            cy.log(connDSList[0] + " is available")
                            cy.wrap(connDSList[0]).should('contain',(dsList))
                        }
                    })
                }
                if(value ==='jira'){
                    cy.wrap(connDSList[0]).should('contain',Cypress.env("JIRA"))
                }
                if(value ==='office365'){
                    //cy.wrap(connDSList[0]).should('contain',Cypress.env("Office 365"))
                    Cypress.env("Office 365").forEach((dsList,index)=>{
                        //cy.log(dsList)
                        if((connDSList[0]).includes(dsList)) {
                            cy.log(connDSList[0] + " is available")
                            cy.wrap(connDSList[0]).should('contain',(dsList))
                        }
                    })
                }
                if(value ==='salesforce'){
                   // cy.wrap(connDSList[0]).should('contain',Cypress.env("Salesforce"))
                   Cypress.env("Salesforce").forEach((dsList,index)=>{
                   // cy.log(dsList)
                   if((connDSList[0]).includes(dsList)) {
                    cy.log(connDSList[0] + " is available")
                    cy.wrap(connDSList[0]).should('contain',(dsList))
                }
                })
                }                    
            })                
               //cy.server()
               //cy.route('GET','**/asset/rest/0/connectors**').as('manageConnector_Response') 
               cy.intercept('GET','**/asset/rest/0/connectors**').as('manageConnector_Response') 
               cy.get('.icon-connectors.sideNavIcon').ClickElement()  
               cy.wait('@manageConnector_Response').its('response.statusCode').should('eq',200)
            })     
            })        
        }

    clickManageApplication(){
        sysObj.getApplicationTabText().should('have.text','Applications')
        sysObj.getApplicationTabIcon().ClickElement()
        sysObj.getApplicationTabEmptyResult().contains('No results to display.').should('have.text','No results to display.')
    }

    clickDSDSettingsPage(){
        sysObj.getSettingsTabText().should('have.text','Settings')
        sysObj.getSettingsTabIcon().ClickElement()
        sysObj.getSettingsTabSettingsText().should('have.attr','aria-label','Settings')
        sysObj.getSettingsTabDiscoveryschedule().should('have.attr','aria-label','Discovery schedule')
        sysObj.getSettingsTabHealthMonitor().contains('Health Monitor').should('have.text','Health Monitor')
    }

    CheckSettingsPageTabs(){
        sysObj.getSettingsTabDiscoveryschedule().ClickElement()
        sysObj.getSettingsDSStartBy().should('be.visible')
        sysObj.getSettingsDSRecurring().should('be.visible')
        sysObj.getSettingsTabHealthMonitor().ClickElement()
        sysObj.getSettingsHMTable().should('be.visible')
    }

    DSDRoleTypeAvailability(){
        sysObj.getSecurityRoleTabInSysAdminPage().ClickElement()
        testData.DSD_Role.forEach(function(element){
            if(element == "DSD Admin"){
                
        sysObj.getSecurityRoleSearchTab().SendKeys(element + '{enter}')
        cy.wait(1000)
        sysObj.getDSDRoleTypeinList().contains('DSD Admin').ClickElementForce()
        cy.intercept('GET','**/fusion/core/rest/api/0/securityroles/selected/**').as('response')
        sysObj.getDSDRoleTypeinList().contains('DSD Admin').ClickElementForce()
        cy.wait('@response').then((xhr)=>{
            cy.log("Actual Response: " +JSON.stringify(xhr.response.body.ACCESS_MODULES))
            cy.wrap(userJson.DSD_Admin).then((json) =>{
                cy.log("Feed File Json: " + JSON.stringify(json))
                cy.wrap(JSON.stringify(json)).should('eq',JSON.stringify(xhr.response.body.ACCESS_MODULES))
            })
            
        })

            }
            else if(element == "DSD User"){
                //sysObj.getSecurityRoleTabInSysAdminPage().ClickElement()
                sysObj.getSecurityRoleSearchTab().clear()
        sysObj.getSecurityRoleSearchTab().SendKeys(element + '{enter}')
        cy.wait(1000)
        sysObj.getDSDRoleTypeinList().contains('DSD User').ClickElementForce()
        cy.intercept('GET','**/fusion/core/rest/api/0/securityroles/selected/**').as('response')
        sysObj.getDSDRoleTypeinList().contains('DSD User').ClickElementForce()
        cy.wait('@response').then((xhr)=>{
            cy.log("Actual Response: " +JSON.stringify(xhr.response.body.ACCESS_MODULES))
            cy.wrap(userJson.DSD_User).then((json) =>{
                cy.log("Feed File Json: " + JSON.stringify(json))
                cy.wrap(JSON.stringify(json)).should('eq',JSON.stringify(xhr.response.body.ACCESS_MODULES))
            })
            
        })
            }
            

        })
        
    }

//Sobana_Actions

dsdModuleInHomePage() {
    //assrtion needed module visibilty
    sysObj.getModuleListClass().find('.moduleNameText').invoke('text').then((text) => {

        expect(text.trim()).equal('Connectors/Integrations')
        if (text == 'Connectors/Integrations') {
            cy.intercept('GET','**/fusion/assetIntegration/index.html**').as('dsdHome')
            sysObj.dsdapplicationavai().ClickElement()
            // cy.wait('@dsdHome').then((dsdhp)=>{
            // expect(dsdhp.statusCode).should('equal','200')
            cy.wait('@dsdHome').its('response.statusCode').should('eq',200)
                
            //  })
            
        } else {

            cy.log("DSD Module not found")
        }

    })
    //cy.url().should('eq','https://qadrp1asset1.exterrocloud.info/fusion/assetIntegration/index.html#/connectors')

    //  Cypress.softAssert(10, 12, "expected actual mismatch..."); 
    // cy.log("text")

}

connectorsbuttons() {
   // cy.wait(5000)
    sysObj.getconnectorsiconLP().should('be.visible');
    sysObj.getApplicationTabIcon().should('be.visible');
    sysObj.getsettingsiconLP().should('be.visible');
    sysObj.getsearchbar().should('be.visible');
    sysObj.getsearchicon().should('be.visible');
    sysObj.getavaconicon().should('be.visible');
    sysObj.getshowallfilter().should('be.visible');
    sysObj.getlogo().should('be.visible');
    sysObj.getmodulename().should('be.visible');
    sysObj.getusername().should('be.visible');
    sysObj.gethomeicon().should('be.visible');
    sysObj.gethelpicon().should('be.visible');
    sysObj.getnotificationicon().should('be.visible');

}
searchfunctionality() {
    //cy.get('#connectorsList').should('have.length', 13)
    
    sysObj.getsearchbar().should('be.visible').SendKeys(testData.DSD_Features[0] + '{enter}')
    sysObj.getConnList().should('have.length', 1)
    sysObj.getApplicationListDSDHomePage().should('contain', testData.DSD_Features[0])
    sysObj.getreseticon().click()
    //sysObj.getApplicationListDSDHomePage().should('have.length', 13)
}
homePageNavigation() {
    sysObj.gethomeicon().ClickElement()
}
homePageURL() {
    //cy.url().should('eq', Cypress.env('url'))
    cy.url().should('contain', 'start')
}


manageConnectorspageNavigation() {
    //connpage.gethomeicon().click()

    sysObj.getDSDModuleClass().each(($el) => {
        let a = 0;
        //cy.log($el.text())

        if ($el.text().includes('Manage Connectors')) {
           // let tab = cy.get('.appBoxesBotText.appBoxFieldHasIcon')

            //cy.get('#appId20 > :nth-child(2)').click()
            //cy.get('.appBoxesTd .appBoxes.jq_matter.color_group_1 .moduleNameText.TitleFont').contains('Manage Connectors').click()
            cy.intercept('GET','**/asset/rest/0/connectors*').as('manageConnector_Response')
                //expect(response.status).to.eq(200)
                sysObj.getManageConnectorFromHomePage().ClickElement()
                cy.wait('@manageConnector_Response').its('response.statusCode').should('eq',200)
                
             
        }
        else {
            cy.log("Manage Connectors option not visible")
        }
    })
    
    //cy.url().should('eq','https://qadrp1asset1.exterrocloud.info/fusion/assetIntegration/index.html#/connectors')
}
manageApplicationPageNavigation() {
    sysObj.getDSDModuleClass().each(($el) => {

        if ($el.text().includes('Manage Applications')) {
            //cy.get('#appId20').contains('Manage Applications').click()
            cy.intercept('GET','**/asset/rest/0/application/all*').as('manageApplication_Response')
               // expect(response.status).to.eq(200)
               cy.get('#appId20').contains('Manage Applications').ClickElement()

                cy.wait('@manageApplication_Response').its('response.statusCode').should('eq',200)
              cy.log("Manage Application Page Loaded")
                
             
          }
        // else{
        //     cy.log("Manage Applications option not visible")
        // }
    })
}

manageApplicationPageElements() {
   
   cy.get('.allAppNoResults').contains('No results to display.')
}
navigationFromAppsIcon() {
    let a = 0;
    sysObj.getTaskPortal().click()
    sysObj.getAppsIcon().click()
    sysObj.getAppsList().each(($el) => {
        if ($el.text().includes('Connectors / Integrations')) {
            cy.get('#viewAssetDiscoveryPageApp').ClickElement()
            //connpage.getAppsIcon().contains('Connectors / Integrations').click()
        }
    })


}

}export default systemAdminActions; 