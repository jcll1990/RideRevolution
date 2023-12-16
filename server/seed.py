#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from random import choice 


# Local imports
from app import app, db  # Import the 'db' object from the 'app' module
from models import User, Order, Item, UserOrder, OrderItem, Cart

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Item.query.delete()
        Order.query.delete()
        UserOrder.query.delete()
        OrderItem.query.delete()
        Cart.query.delete()



        # Create and add users to the database
        user1 = User(email="user1@example.com", password="password1")
        user2 = User(email="user2@example.com", password="password2")

        db.session.add(user1)
        db.session.add(user2)

        item1 = Item(name="Engine Rebuild Kit", price=1049.36, image_url="https://www.revzilla.com/product_images/0287/4651/wrench_rabbit_engine_rebuild_kit_honda_cr80_r19901991_750x750.jpg", stock=50, category="Engine Parts", brand="Vertex")
        item2 = Item(name="800cc Cam Kit", price=1334.99, image_url="https://www.revzilla.com/product_images/0248/4024/ss_hooligan_big_bore_cam_kit_for_harley_sportster_black_750x750.jpg", stock=60, category="Engine Parts", brand="Screaming Eagle")
        item3 = Item(name="1000cc power pack", price=1555.99, image_url="https://www.revzilla.com/product_images/1587/0687/ss_power_pack4_bore585_chain0717_tc_exc1416_twin_cooled_750x750.jpg", stock=80, category="Engine Parts", brand="Screaming Eagle")
        item4 = Item(name="1250cc Custom pack", price=1789.99, image_url="https://www.revzilla.com/product_images/1586/7933/ss_power_package_for_harley_oil_cooled114_milwaukee_eight20172021_750x750.jpg", stock=50, category="Engine Parts", brand="Hammer Performance")
        item5 = Item(name="Harley cilinder heads", price=1450.99, image_url="https://www.revzilla.com/product_images/0104/6738/ss_super_stock_cylinder_heads_for_harley_twin_cam_black_750x750.jpg", stock=70, category="Engine Parts", brand="Screaming Eagle")
        item6 = Item(name="VO2 Air Intake", price=351.99, image_url="https://www.revzilla.com/product_images/0278/7312/vance_hines_vo2_rogue_air_intake_for_harley_sportster20042017_750x750.jpg", stock=50, category="Air & Fuel", brand="Vance & Hines")
        item7 = Item(name="Air Cleaner", price=485.99, image_url="https://www.revzilla.com/product_images/0262/1130/arlen_ness_deep_cut_monster_sucker_air_cleaner_kit_for_harley_twin_cam19992017_750x750.jpg", stock=50, category="Air & Fuel", brand="Arlen Ness")
        item8 = Item(name="Fuel Injector", price=160.99, image_url="https://www.revzilla.com/product_images/1501/7866/feuling_fuel_injectors_for_harley_750x750.jpg", stock=50, category="Air & Fuel", brand="Screaming Eagle")
        item9 = Item(name="Power Vision", price=666.99, image_url="https://www.revzilla.com/product_images/0248/6472/dynojet_power_vision_for_harley20012017_750x750.jpg", stock=80, category="Air & Fuel", brand="Dynojet")
        item10 = Item(name="Front Brake Pads", price=50.99, image_url="https://www.revzilla.com/product_images/0291/1326/galfer_semi_metallic_front_brake_pads_750x750.jpg", stock=70, category="Brakes", brand="Galfer")
        item11 = Item(name="Wave Rotor Front", price=320.99, image_url="https://www.revzilla.com/product_images/0065/8415/galfer_wave_rotors_front_750x750.jpg", stock=50, category="Brakes", brand="Galfer")
        item12 = Item(name="Brake Rotors", price=650.99, image_url="https://www.revzilla.com/product_images/0209/5063/brembo_hp_brake_rotors_750x750.jpg", stock=80, category="Brakes", brand="Brembo")
        item13 = Item(name="Rear Brake Caliper", price=750.99, image_url="https://www.revzilla.com/product_images/0215/1752/brembo_super_sport_rear_brake_caliper_black_anodized_750x750.jpg", stock=50, category="Brakes", brand="Brembo")
        item14 = Item(name="Rear Brake Line", price=110.99, image_url="https://www.revzilla.com/product_images/0063/4382/galfer_rear_brake_lines_clear_silver_750x750.jpg", stock=70, category="Brakes", brand="Galfer")
        item15 = Item(name="Brake Front Rotor", price=290.99, image_url="https://www.revzilla.com/product_images/0236/2379/arlen_ness14_big_brake_front_rotors_for_harley_750x750.jpg", stock=60, category="Brakes", brand="Arlen Ness")
        item16 = Item(name="Twin HD Echaust", price=1111.99, image_url="https://www.revzilla.com/product_images/1891/0782/vance_hines_big_radius2_into2_exhaust_for_harley_softail19862017_750x750.jpg", stock=50, category="Exhaust Systems", brand="Vance & Hines")
        item17 = Item(name="LV-10 Slip-On Exhaust", price=630.99, image_url="https://www.revzilla.com/product_images/0365/1893/leo_vince_lv10_slip_on_exhaust_z1000_ss_black_stainless_steel_750x750.jpg", stock=60, category="Exhaust Systems", brand="LeoVince")
        item18 = Item(name="Shorty Exhaust", price=950.99, image_url="https://www.revzilla.com/product_images/1019/4316/two_brothers_bagger2_into1_shorty_exhaust_for_harley_touring20092016_stainless_750x750.jpg", stock=60, category="Exhaust Systems", brand="Two Brothers")
        item19 = Item(name="Slip-On Muffler", price=450.99, image_url="https://www.revzilla.com/product_images/0399/3627/ss_grand_national_slip_on_muffler_for_harley_750x750.jpg", stock=70, category="Exhaust Systems", brand="S&S Cycle")
        item20 = Item(name="Slip-On Exhausts", price=510.99, image_url="https://www.revzilla.com/product_images/0893/1126/akrapovic_slip_on_exhausts_750x750.jpg", stock=50, category="Exhaust Systems", brand="Akrapovic")
        

        


  
        db.session.add(user1)
        db.session.add(user2)

        db.session.add(item1)
        db.session.add(item2)
        db.session.add(item3)
        db.session.add(item4)
        db.session.add(item5)
        db.session.add(item6)
        db.session.add(item7)
        db.session.add(item8)
        db.session.add(item9)
        db.session.add(item10)
        db.session.add(item11)
        db.session.add(item12)
        db.session.add(item13)   
        db.session.add(item14)
        db.session.add(item15)
        db.session.add(item16)
        db.session.add(item17)
        db.session.add(item18)
        db.session.add(item19)
        db.session.add(item20)                


        db.session.commit()