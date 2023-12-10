Feature: Enable DSD Feature Group and Navigation Validation in DSD Module fusion page

@Navigation 
Scenario: Login to system admin to enble DSD Features in feature group
Given Login to system admin
When Go to Feature Group and click DSD Module
And Enable Applicable Connectors
Then Verify whether connectors are enabled

@Navigation
Scenario: Login to system admin and check whether the role type for DSD module RBACs enabled correctly
Given Go to System Admin Home Page
When Go to Security role & Check DSD role types are created
#And Edit the DSD role types & get the RBACs enabled
#Then Verify the RBACs 

@Navigation
Scenario: Check the DSD Module avalability in Home page and Navigate to DSD Manage Page 
Given Login to application
#When Get User Name
When Check the DSD Module availability in Home Page and Navigate to DSD Home Page
Then Check DSD Module manage page is loading properly and the elements present in the DSD Home Page should be visible

@Navigation
Scenario: Login to application and check whether the enabled connectors are available
#Given Navigate to home Page
When Go to Manage connector page
And Check enabled connectors are available
Then Click Connector to check Application & Data Source tab

@Navigation
Scenario: Check the Manage Connectors tab available under the Connectors/Integrations Module and Navigate to Manage Connectors page 
#Given Login to application
Given Navigate to home Page
When Check the Manage Connectors tab availability and Navigate to Manage Connectors Page
Then Check Manage Connectors page is loading properly and the elements present in the Manage Connectors Page should be visible
Then Check Search tab is available

@Navigation
Scenario: Check the Manage Application tab available under the Connectors/Integrations Module and Navigate to Manage Application page 
#Given Login to application
#Given Navigate to home Page
When Check the Manage Application tab availability and Navigate to Manage Application Page
# Then Check Manage Application page is loading properly and the elements present in the Manage Application Page should be visible

@Navigation
Scenario: Check the Connectors/Integration module is available when navigating through Apps icon
#Given Login to application
Given Navigate to home Page
Then Check the DSD Module is available in Apps icon and Navigate to DSD Page
#Then Navigate to DSD Home page through Apps icon

@Navigation
Scenario: Login to application and check whether the manage application page loaded
Given Navigate to home Page
When Go to Manage connector page
Then Check Application page is getting loaded

@Navigation
Scenario: Login to application and check whether the Settings page loaded
Given Navigate to home Page
When Go to Manage connector page
And Check Settings Page Tabs availability
Then Check Tabs are loaded in new tenant for configuration


