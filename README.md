# Billing Counter Management
>One of my customer is looking to develop app for managing their billing process. The system in discussion will have following features in the terms of REST API, Database Connectivity and proper UI.

> This document can be understood better by keeping wireframes in mind. 


## Admin Login
- Admin can login using email and password
- Admin details are stored in table
- Admin (id(pk), email (str unique), password (str), created(date)
- Feel free to change/modify above fileds

## Customers
- It should show list of customers in descending manner i.e last created displayed first
- Store customers in seperate table. 
- Customer(id(pk), name (str), mobile (str unique), dob ,created) 
- Feel free to change/modify above fileds
- Customers can be deleted i.e. active flag set to false
- Details of the customer can be displayed 
- New customers can be created
- Customer can be searched by means of Mobile number

## New Customer
- Simple interface for storing new customer
- All the fields excluding DOB in the form are mandetory.
- email, mobile is unique
- DOB should be past date only
- All the validations must be applied at React, Django, Db level. 

## Customer Details
- This page will show customer details along with 3 recent bills
- 
