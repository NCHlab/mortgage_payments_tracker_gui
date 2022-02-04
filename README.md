# Mortgage Payments Tracker GUI

<p align="center" width="100%">
   <img height='240px' src='./src/images/logo.png'>
</p>

Welcome to the Mortgage Payments Tracker (MPT). This is the frontend for the website and requires the associated [MPT API](https://github.com/NCHlab/Mortgage_Payments_Tracker_API) to function.

> Note: Due to specific considerations, an instance of this server + API can only be used by 1 set of people who know each other. This is due to data on some pages being shared for all users (this project has a specific case for me - which is obvious by its name), thus adding in features for gobal public use has not been done.

Demo Access can be found on: [mortgage.nayamc.com/demo](mortgage.nayamc.com/demo)

This website allows a user to track how much they have paid towards their mortgage, as well as being able to see payments made by others to the same mortgage.

Features such as adding / editing / deleting payments allows you to modify payment information across 3 different pages: `Payments`, `Overpayments`, `Home Improvements`. These pages also allow a user to download either an EXCEL or CSV file for each page.

A `logs` page exists for auditing payments and seeing changes. Logs can be viewed as JSON or as a table.

A `totals` page also exists which shows condensed payment information about all users as well as allowing a user to download all payment information into an EXCEL file.

Some examples of pages are below:

### Homepage (Logged in)

<img src='./src/images/image1Homepage.png'>



### Payments page

<img src='./src/images/image2PaymentsPage.png'>


### All Payments page Table

<img src='./src/images/image8AllPaymentsSelected.png'>

# Notes

Ensure you have a `.env.development` (used by `npm start` ). You can also use an `.env.production` if required (used by `npm run build` for production).

```bash
REACT_APP_BROKER="Google"
REACT_APP_BROKER_LINK="https://www.google.com/"
REACT_APP_SOLICITOR="Legal Ltd"
REACT_APP_SOLICITOR_LINK="https://www.google.com/"
REACT_APP_ESTATE_AGENT="Agents Ltd"
REACT_APP_ESTATE_AGENT_LINK="https://www.google.com/"
REACT_APP_DEMO_URL=""
REACT_APP_IS_DEMO_SITE=false
REACT_APP_API_BASE_URL=""
```