
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from datetime import datetime

from flask import Flask, request
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports


#######start#######
from flask import Flask, jsonify, make_response, request, session
from flask_migrate import Migrate
from models import db, User, Order, Item, UserOrder, OrderItem, Cart
import os

app = Flask(__name__)
app.secret_key = "abc123"



CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 


db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)

excluded_endpoints = ['login', 'signup', 'check_session', 'root', 'items'] ### any other routes that does not need to be logged in



@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# #######start#######
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(email=data['email'])
    new_user.password_hash = data['password']

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'Registration Successful!'}, 201


from flask import jsonify

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # check if user exists
    user = User.query.filter(User.email == data['email']).first()

    if not user:
        return jsonify({'error': 'User not found.'}), 404
    
    if user.authenticate(data['password']):
        # passwords matched, add cookie
        session['user_id'] = user.id
        user_data = {
            'id': user.id,
            'email': user.email,
            # Add other user details as needed
        }
        return jsonify({'message': 'Login successful!', 'user': user_data}), 200
    else:
        # password did not match, send error resp
        return jsonify({'error': 'Invalid email or password.'}), 401


@app.route('/check_session')
def check_session():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': 'Invalid Session.'}, 401
    
    return {'message': 'Session Valid, Access Granted'}, 200

@app.delete('/logout')
def logout():
    session.pop('user_id')

    return {'message': 'Successfully logged out.'}, 200
#######end#######


@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    body = [item.to_dict() for item in items]
    return jsonify(body), 200


@app.route('/items/<int:item_id>', methods=['PATCH'])
def item_to_cart(item_id):
    new_stock = request.json.get('new_stock')

    item = Item.query.get(item_id)

    if item:
        item.stock = new_stock
        db.session.commit()
        return jsonify({'message': 'Stock updated successfully'}), 200
    else:
        return jsonify({'error': 'Item not found'}), 404
    

#### HOME STUFF

#### HOME STUFF

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()

    user_id = data.get('user_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    # Check if user and item exist
    user = User.query.get(user_id)
    item = Item.query.get(item_id)

    if not user or not item:
        return jsonify({'error': 'User or item not found'}), 404

    # Check if there is enough stock
    if item.stock >= quantity:
        # Check if the item is already in the cart for the user
        existing_cart_entry = Cart.query.filter_by(user_id=user_id, item_id=item_id).first()

        if existing_cart_entry:
            # If the item is already in the cart, update the quantity
            if existing_cart_entry.quantity + quantity <= item.stock:
                existing_cart_entry.quantity += quantity
            else:
                return jsonify({'error': 'Not enough stock to add to cart'}), 400
        else:
            # Otherwise, create a new Cart entry
            cart_entry = Cart(quantity=quantity, user=user, item=item)
            db.session.add(cart_entry)

        # Commit changes to the cart
        db.session.commit()

        return jsonify({'message': 'Item added to the cart successfully'}), 200
    else:
        return jsonify({'error': 'Not enough stock'}), 400





#### CART STUFF


@app.route('/remove_from_cart', methods=['POST'])
def remove_from_cart():
    data = request.get_json()

    user_id = data.get('user_id')
    item_id = data.get('item_id')
    quantity_to_remove = data.get('quantity')

    # Check if user and item exist
    user = User.query.get(user_id)
    item = Item.query.get(item_id)

    if not user or not item:
        return jsonify({'error': 'User or item not found'}), 404

    # Check if the item is in the cart for the user
    cart_entry = Cart.query.filter_by(user_id=user_id, item_id=item_id).first()

    if cart_entry and cart_entry.quantity >= quantity_to_remove:
        # Add the selected quantity back to the stock of the original item
        item.stock += quantity_to_remove

        # Reduce the selected quantity for the item in the cart
        cart_entry.quantity -= quantity_to_remove

        # Delete the row if the quantity becomes zero
        if cart_entry.quantity == 0:
            db.session.delete(cart_entry)

        db.session.commit()

        return jsonify({'message': 'Item removed from cart successfully'}), 200
    else:
        return jsonify({'error': 'Invalid request'}), 400


@app.route('/cart', methods=['GET'])
def get_cart_items():

    user_id = request.args.get('user_id')

    # Fetch all items in the cart that have the specified user_id
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    # Serialize the items
    serialized_items = [item.to_dict() for item in cart_items]

    return jsonify({'cart_items': serialized_items}), 200


####### ORDERS

from sqlalchemy.exc import SQLAlchemyError

@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()

    def calculate_total_cost(data):      
        total_cost = 0
        for item_data in data:
            price = item_data['item']['price']
            quantity = item_data['quantity']
            total_cost += price * quantity
        return  total_cost

    def calculate_total_items(data):      
        total_items = 0
        for item_data in data:
            quantity = item_data['quantity']
            total_items +=quantity
        return  total_items

    current_datetime = datetime.now()
    total_cost = calculate_total_cost(data)
    total_items = calculate_total_items(data)

    # Create a new order
    new_order = Order(created_date=current_datetime, cost=total_cost, n_items=total_items)
    db.session.add(new_order)
    db.session.commit()

    # Extract user ID from the first item in the data array
    user_id = data[0]['user']['id']

    # Create a new UserOrder record linking the user and the order
    user_order = UserOrder(user_id=user_id, order_id=new_order.id)
    db.session.add(user_order)
 
    # Create OrderItem instances for each item in the data array
    for item_data in data:
        item_id = item_data['item']['id']
        quantity = item_data['quantity']

        order_item = OrderItem(order_id=new_order.id, item_id=item_id, quantity=quantity)
        db.session.add(order_item)

    try:
        db.session.commit()

        # Delete cart items for the user
        Cart.query.filter_by(user_id=user_id).delete()
        db.session.commit()

        # Use the to_dict method for the response
        return jsonify({"message": "Order created successfully", "order": new_order.to_dict()}), 201

    except SQLAlchemyError as e:
        # Handle any database errors
        db.session.rollback()
        return jsonify({"error": "Failed to create order", "details": str(e)}), 500



@app.route('/user_order', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')

    # Fetch all orders that have the specified user_id
    userorders = UserOrder.query.filter_by(user_id=user_id).all()

    # Serialize each order and create a list of dictionaries
    serialized_orders = [order.to_dict() for order in userorders]

    return jsonify({'orders': serialized_orders}), 200



@app.route('/order/<int:order_id>', methods=['GET'])
def get_order_details(order_id):
    order = Order.query.get(order_id)

    if order:
        # Assuming you have a 'to_dict()' method in your Order model
        order_data = order.to_dict()
        return jsonify(order_data)
    else:
        return jsonify({'error': 'Order not found'}), 404





if __name__ == '__main__':
    app.run(port=5555, debug=True)