# Billing Counter Management
### One of my customer is looking to develop app for managing their billing process. The system in discussion will have following features in the terms of REST API, Database Connectivity and proper UI.

**NOTE**

> This requirement document can be understood better by keeping [wireframes](./wireframes-billing-counter-mgmt.pdf) in mind/front.

> Apply common sense where you need to. You can take a call for deciding on adding/removing/rectifying fields/database constraints/columns etc. Just make sure, complexity of application remains intact and you are not chaninging core intent of the app. 


## Admin Login
- Admin can login using email and password
- Admin details are stored in table
- Admin (id(pk), email (str unique), password (str), created(date)
- Feel free to change/modify above fileds

## Customers (Landing Page)
- It should show list of customers in descending manner i.e last created displayed first
- Store customers in seperate table. 
- Customer(id(pk), name (str), mobile (str unique), dob ,created) 
- Feel free to change/modify above fileds
- Customers can be deleted i.e. active flag set to false
- User consent is required before update or delete i.e. Alert Dialog with yes no button
- Details of the customer can be displayed on click mobile number
- New customers can be created
- Customer can be searched by means of Mobile number
- Field since and dob are defferent. since refers to created.

## New Customer
- Simple interface for storing new customer
- All the fields excluding DOB in the form are mandetory.
- email, mobile is unique
- DOB should be past date only
- All the validations must be applied at React, Django, Db level. 

## Customer Details
- This page will show basic customer details along with 3 recent bills
- there should be provision for showing more bills for same customer
- on click of bill number it show bill details

## Bill (Landing Page)
- This page will give you facility of seraching, sorting, listing and creating new bill
- Bill will be stored in seperate bill table
- Bill(id(pk), billno(integer unique), mobile(str), billdate(date), counter(integer), cashier(str), paymentmode(integer))
- amount will be taken from BillItems table
- paymentmode 1 -> cash, 2 -> card, 3 -> upi
- This page should show list of top 10 recent bills i.e. last created displayed first
- Each text box above respective column shows sorting feature local data i.e data loaded by rest api
- Search filter in first section shows, searching facility on the server. It is or query i.e. match by mobile or billno or date or counter or cashier
- Click on billno will show bill details
- Click on mobile number will show customer details
- There should be option for Generating New Bill

## New Bill
- Page for generating new bill for given customer
- In the begining page will display place to enter mobile number, Date, Cashier(the person who logged in), Counter (keep by default 1 presently)
- Once entered mobile number is checked and found it is available, UI for adding bill details will be displayed
- If mobile number is not available, simply customer not found message will be displayed
- Bill Items will be stored in BillItems table
- BillItems(id(pk), item(str), price(decimal), quantity(integer), billno(integer))
- Bill items can be added and removed
- price can not be zero or negative
- item name can be alphanumeric
- quantity can be non zero positive
- 18 % GST will be added on total amount
- Presently checkout is generating the bill

## Bill Details
- Admin can see all bill details
- All item details also displayed in tabular format
- From the bill details admin can check customer details by clicking on mobile number

## Analytics
- Monthly sell can be displayed in bar chart format
- Monthly sell should show Total Sell and Year
- Product Sell should show pie chart of percentage of items sold
- Product Sell should also show Total Items and Year
