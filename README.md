# 2SS_website.github.io
## Project name: Bakery order

## Team member:
+ Dương Thu Hương - 22040003
+ Nguyễn Vân Nhi - 22040006

## Wireframe: 

We will have 3 main pages: Homepage, Menu, Cart-Checkout

More detail: <a href='/content/Wireframe/README.md'>Wireframe</a>

## Planning

We also make detail plan to make sure equal contribution and easy to tracking

More detail: <a href='/content/Planning/README.md'>Planning</a>

## Database

<img src='webapp/public/dtb_img.jpg'>

## Database Schema Overview

The bakery shop database schema consists of six main tables: `contacts`, `customers`, `orders`, `order_details`, `products`, and `categories`. Here is a concise description of each table and its key fields:

### 1. Contacts (`apps_contacts`)
- **id**: Unique identifier
- **name**: Contact's name
- **email**: Contact's email
- **message**: Message from contact
- **customer_id**: References `customers.id`
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### 2. Customers (`apps_customers`)
- **id**: Unique identifier
- **first_name**: Customer's first name
- **last_name**: Customer's last name
- **email**: Customer's email
- **phone**: Customer's phone number
- **address**: Customer's address
- **city**: Customer's city
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### 3. Orders (`apps_orders`)
- **id**: Unique identifier
- **order_date**: Date of order
- **total_amount**: Total order amount
- **customer_id**: References `customers.id`
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### 4. Order Details (`apps_order_details`)
- **id**: Unique identifier
- **quantity**: Product quantity
- **price**: Product price
- **order_id**: References `orders.id`
- **product_id**: References `products.id`
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### 5. Products (`apps_products`)
- **id**: Unique identifier
- **image**: Product image URL/path
- **name**: Product name
- **category_id**: References `categories.id`
- **description**: Product description
- **regular_price**: Regular price
- **sale_price**: Sale price
- **quantity_in_stock**: Stock quantity
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### 6. Categories (`apps_categories`)
- **id**: Unique identifier
- **name**: Category name
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

## Relationships
- **Contacts ↔ Customers**: `contacts.customer_id` references `customers.id`
- **Orders ↔ Customers**: `orders.customer_id` references `customers.id`
- **Order Details ↔ Orders**: `order_details.order_id` references `orders.id`
- **Order Details ↔ Products**: `order_details.product_id` references `products.id`
- **Products ↔ Categories**: `products.category_id` references `categories.id`

