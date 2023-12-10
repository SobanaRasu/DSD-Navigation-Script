class systemAdminObjects{
    getSigninButton(){
        return  cy.get('#loginDiv')
    }
    getUserNameTextField(){
        return cy.get('#username')
    }
    getPasswordTextField(){
        return cy.get('#password')
    }
    getfeatureGroupButton(){
        return cy.get('#featuregroup')
    }
    getfeatureGroupPasswordTextField(){
        return cy.get('#pwdForFeatureGroup')
    }
    getSysAdminHomePageIcon(){
        return cy.get('#myBatchesHomeImg')
    }
    getfeaturegroupPasswordSubmitButton(){
        return cy.get('.buttonFinal .ui-button-text')
    }
    getDSDModuleTitle(){
        return cy.contains('DATA SOURCES DISCOVERY')
    }
    getCheckboxOption(){
        return cy.get('input[type="checkbox"]')
    }
    getfeatureGroupSubmitButton(){
        return cy.get('.buttonFinal ui-button ui-corner-all ui-widget')
    }
    getHomePageConnTab(){
        return cy.get('.appBoxes .moduleNameText').contains('Connectors/Integrations')
    }
    getHomePageConnModuleName(){
        return cy.get("#appId20 .appBoxes").find('.moduleNameText')
    }
    getManageConnectorFromHomePage(){
        return cy.get('#appId20 > :nth-child(2)')
    }
    getConnList(){
        //return  cy.get('ul li div.connectorsDet').not('.disabledCont')
        return cy.get('[class*="conMainCont noFocusNeeded"] > div:nth-child(1) > ul > li > div')
    }
    getConnAddNewButton(){
        return cy.get('ul li div.connectorsDet').children('.addNewConnector')
    }
    getDataSourceTab(){
        return cy.get('i.icon-data-source')
    }
    getApplicationTabText(){
        return cy.get('#applicationsLP').siblings('.menuNameDiv').contains('Applications')
    }
    getApplicationTabIcon(){
        return cy.get('#applicationsLP')
    }
    getApplicationTabEmptyResult(){
        return cy.get('.allAppNoResults')
    }
    getSettingsTabIcon(){
        return cy.get('.icon-settings')
    }
    getSettingsTabText(){
        return cy.get('#settingsLP').siblings('.menuNameDiv').contains('Settings')
    }
    getSettingsTabSettingsText(){
        return cy.get('.settingsHeader')
    }
    getSettingsTabDiscoveryschedule(){
        return cy.get('.customDatasourcesDiv.activeTab')
    }
    getSettingsTabHealthMonitor(){
        return cy.get('[aria-label="Health Monitor"]')
    }
    getSettingsDSStartBy(){
        return cy.get('.startBySpan')
    }
    getSettingsDSRecurring(){
        return cy.get('.entercheckText')
    }
    getSettingsHMTable(){
        return cy.get('.mat-header-row.cdk-header-row.headerRow.br4.ng-tns-c137-3.ng-star-inserted')
    }
    getConnectorApplicationTab(){
        return cy.get('#wid_1')
    }
    getConnectorDataSourceTab(){
        return cy.get('#wid_2')
    }
    getDSTabsForEachConnector(){
        return cy.get('.driveContainer')
    }
    getSecurityRoleTabInSysAdminPage(){
        return cy.get('#SECURITY_ROLES')
    }
    getDSDRoleTypeinList(){
        return cy.get('.smartTable_firstListSubrow')
    }
    getSecurityRoleSearchTab(){
        return cy.get('#advancedFilterModuleDialog_filterBySearch')
    }

    //Sobana_Objects
    
    dsdtilenavigation() {
        return cy.get('#moduleAppBoxes')
    }
    dsdapplicationavai(){
        return cy.get('.icon-connectors')
    }

    getconnectorsiconLP() {
        return cy.get('#connectorsLP')

    }
    getsettingsiconLP() {
        return cy.get('#settingsLP')
    }
    getsearchbar(){
        return cy.get(':nth-child(1) > ul.ng-star-inserted > ')
    }
    getsearchicon(){
            return cy.get('#searchBar > .icon-search')
    }
    getavaconicon(){
        return cy.get(':nth-child(1) > .noFocusNeeded > .connectorGrpName')
}
getshowallfilter(){
    return cy.get('.connectorFilter')
}
getlogo(){
    return cy.get('.logo')
}
getmodulename(){
    return cy.get('.appTitle > span')
}
getusername(){
    return cy.get('#userNameDropDown')
}
gethomeicon(){
    return cy.get('#homeIcon')
}
gethelpicon(){
    return cy.get('#helpIcon')
}
getnotificationicon(){
    return cy.get('#notificationCont')
}
getsearchbar(){
    return cy.get('#searchIp')
}
getsearchicon(){
    return cy.get('#searchBar > .icon-search')
}
getconnectorname(){
    return cy.get('.connectorName')
}
getreseticon(){
    return cy.get('.icon-close')
}
getApplicationListDSDHomePage(){
    return cy.get('.connectorDetailsCont')
}
getModuleListClass(){
return cy.get("#appId20 .appBoxes")}
getDSDModuleClass(){
    return cy.get('.appBoxesTd')
}
getApplicationPageMiddlepane(){
    return cy.get('.noFocusNeeded.mainContainer_allApplications.ng-star-inserted')
}
getTaskPortal(){
    return cy.get('#appTaskPortal')
}
getAppsList(){
    return cy.get('.appsLi')
}
getAppsIcon(){
    return cy.get('#navigateApps')
}
}
export default systemAdminObjects;