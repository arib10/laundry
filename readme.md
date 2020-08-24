# Models

## Users

### privileges
* Should have account and be able to sign in and out of the app
* can Add, Update, and Delete A customer
* can Add, Update, andDelete other Users
* Can enter a wash record for each customer
* Can enter payment records after a customer is done washing

### Needed Informations:
* Staff Name
* Date Staff Resumed
* Staff Email
* Staff Phone number
* Staff Home Address

## Customers Accounts
* Customer Name
* Customer Phone number
* Customer Email
* Customer Address
* Date Customer was registered

## Washes
* Number of washes made by a particular customer as a particular instance
* The date the wash was made
* The customer who made the wash
* The Staff who entered this wash record
* How much was Paid for the wash

## payments
* Which wash is this payment for?
* Date Payment was made
* Which customer made this payment
* Which Staff entered this payment record
* Was payment in cash, bank transfer or POS

# Relationships
* Customers and washes
* Staff and Washes
* Wash and Payment

* Wash and payment
* Customer and Payment
* Staff and Payment
