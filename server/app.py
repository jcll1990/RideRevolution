
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask_restful import Resource
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from flask import jsonify
from sqlalchemy import column


from flask import Flask
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports


#######start#######
from flask import Flask, jsonify, request, session
from flask_migrate import Migrate
from models import db, User, Order, Item, OrderItem
import os

app = Flask(__name__)
app.secret_key = "abc123"

CORS(app)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 


db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)

excluded_endpoints = ['login', 'logout', 'signup', 'check_session', 'root', 'items']



@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# #######start#######
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email is already in use. Please choose another.'}), 400
    
    new_user = User(email=data['email'])
    new_user.password_hash = data['password']
    
    db.session.add(new_user)
    db.session.commit()

    user_id = new_user.id

    first_order = Order(user_id=user_id, created=False)
    
    db.session.add(first_order)
    db.session.commit()

    return {'message': 'Registration Successful!'}, 201



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter(User.email == data['email']).first()

    if not user:
        return jsonify({'error': 'User not found.'}), 404
    
    if user.authenticate(data['password']):
        session['user_id'] = user.id
        user_data = {
            'id': user.id,
            'email': user.email,
        }
        return jsonify({'message': 'Login successful!', 'user': user_data}), 200
    else:
        return jsonify({'error': 'Invalid password.'}), 401
    

@app.route('/getorder', methods=['GET'])
def get_last_order():
    user_id = request.args.get('user_id')  

    latest_order = (
        Order.query
        .filter_by(user_id=user_id)
        .order_by(column('id').desc())
        .first() 
    )

    if latest_order:
        return jsonify({'order_id': int(latest_order.id)}), 200
    else:
        return jsonify({'error': 'No orders found for the specified user.'}), 404



@app.route('/check_session')
def check_session():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()

    if not user:
        return {'error': 'Invalid Session.'}, 401
    
    return {'message': 'Session Valid, Access Granted'}, 200

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {'message': 'Successfully logged out.'}, 200


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
    



@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()

    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    order = Order.query.get(order_id)
    item = Item.query.get(item_id)


    existing_cart_entry = OrderItem.query.filter_by(order_id=order_id, item_id=item_id).first()

    if existing_cart_entry:
        existing_cart_entry.quantity += quantity

    else:
        cart_entry = OrderItem(quantity=quantity, order=order, item=item)
        db.session.add(cart_entry)

    db.session.commit()

    return jsonify({'message': 'Item added to the cart successfully'}), 200





@app.route('/remove_from_cart', methods=['POST'])
def remove_from_cart():
    data = request.get_json()

    order_id = data.get('order_id')
    item_id = data.get('item_id')
    quantity_to_remove = data.get('quantity')
    item = Item.query.get(item_id)

    cart_entry = OrderItem.query.filter_by(order_id=order_id, item_id=item_id).first()


    if cart_entry and cart_entry.quantity - quantity_to_remove >= 1:
        cart_entry.quantity -= quantity_to_remove
        message = 'Quantity removed from cart'

    elif cart_entry and cart_entry.quantity - quantity_to_remove <= 0:
        db.session.delete(cart_entry)
        message = 'Item removed from cart'

    else:
        return jsonify({'error': 'Invalid request or insufficient quantity in cart'}), 400

    new_stock = item.stock + quantity_to_remove
    item.stock = new_stock
    db.session.commit()

    return jsonify({'message': f'{message} and stock updated successfully'}), 200





@app.route('/cart', methods=['GET'])
def get_cart_items():
    order_id = request.args.get('order')

    cart_items = OrderItem.query.filter(OrderItem.order_id == order_id).all()

    serialized_items = [item.to_dict() for item in cart_items]
    return jsonify({'cart_items': serialized_items}), 200




# ####### ORDERS


@app.route('/order', methods=['PATCH'])
def update_order():
    order_id = request.args.get('order')

    data = OrderItem.query.filter(Order.id == order_id).all()

    def calculate_total_cost(data):
        total_cost = 0

        for item in data:
            item_id = item.id  
            item_price = Item.query.filter(OrderItem.id == item_id).first().price
            total_cost += item.quantity * item_price

        return total_cost

    def calculate_total_items(data):
        return sum(item.quantity for item in data)

    current_datetime = datetime.now()
    total_cost = calculate_total_cost(data)
    total_items = calculate_total_items(data)

    existing_order = Order.query.get(order_id)
    user_id = existing_order.user_id
    if existing_order:
        existing_order.created_date = current_datetime
        existing_order.cost = total_cost
        existing_order.n_items = total_items
        existing_order.created = True
        db.session.commit()

        next_order = Order(user_id=user_id, created=False)
        
        db.session.add(next_order)
        
        db.session.commit()

        return jsonify({"message": "Order updated successfully"}), 200
    else:
        return jsonify({"error": "Order not found"}), 404



@app.route('/get_orders', methods=['GET'])
def get_orders():
    user_id = request.args.get('user_id')

    user_orders = Order.query.filter_by(user_id=user_id, created=True).all()

    serialized_items = [item.to_dict() for item in user_orders]
    return jsonify(serialized_items), 200









if __name__ == '__main__':
    app.run(port=5555, debug=True)