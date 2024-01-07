
# Local imports
from app import app, db  # Import the 'db' object from the 'app' module
from models import User, Order, Item, OrderItem

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Item.query.delete()
        Order.query.delete()
        OrderItem.query.delete()


       
        item1 = Item(image = "/images/engines/engines1.png", stock=15, category="Motorcycle engines", type = "Motorcyccle upgrades" , brand="Velocity Tech", name="Hyper Charge X-5500",price=1899.99, description ="Elevate your ride with Velocity Tech's Hyper Charge X-5500, a high-performance engine kit delivering lightning-fast acceleration and cutting-edge technology for the true speed enthusiast.")
        item2 = Item(image = "/images/engines/engines2.png", stock=5, category="Motorcycle engines", type = "Motorcyccle upgrades" , brand="Velocity Tech", name="Quantum Boost 7000R", price=2299.99, description="Unleash quantum-level power with Velocity Tech's Quantum Boost 7000R engine kit. Precision engineering meets unrivaled speed, providing an exhilarating riding experience for those who demand the best.")
        item3 = Item(image = "/images/engines/engines3.png", stock=8, category="Motorcycle engines", type = "Motorcyccle upgrades" , brand="Thunder Force", name="Storm Pulse 800GT", price=2099.99, description="Feel the force of the storm with Thunder Force's Storm Pulse 800GT engine kit. Harnessing the raw power of thunder, this kit offers exceptional torque and performance for riders seeking a dynamic and thrilling journey.")
        item4 = Item(image = "/images/engines/engines4.png", stock=5, category="Motorcycle engines", type = "Motorcyccle upgrades" , brand="Thunder Force", name="Cyclone Turbo 9500X", price=2499.99, description="Unleash the cyclonic power of Thunder Force's Cyclone Turbo 9500X engine kit. Designed for maximum efficiency and speed, this kit propels your motorcycle into a new realm of high-performance riding.")
        item5 = Item(image = "/images/engines/engines5.png", stock=10, category="Motorcycle engines", type = "Motorcyccle upgrades" , brand="Blaze Tech", name="Inferno Ignite 6000R", price=1799.99, description="Ignite your passion for riding with Blaze Tech's Inferno Ignite 6000R engine kit. Immerse yourself in the fiery power and precision, experiencing a ride that blazes new trails in the world of motorcycle performance.")
        
        item6 = Item(image = "/images/exhaust/exhaust1.png", stock=35, category="Motorcycle Exhausts", type = "Motorcyccle upgrades" ,brand="Velocity Tech", name="TurboPulse 750", price=649.99, description="Feel the pulse of speed with Velocity Tech's TurboPulse 750 motorcycle exhaust. Engineered for enhanced performance and an aggressive exhaust note that turns heads.")
        item7 = Item(image = "/images/exhaust/exhaust2.png", stock=25, category="Motorcycle Exhausts", type = "Motorcyccle upgrades" ,brand="Thunder Force", name="StormRider 950GT", price=749.99, description="Ride like the storm with Thunder Force's StormRider 950GT motorcycle exhaust. Unleash a powerful and dynamic riding experience with this precision-engineered exhaust system.")
        item8 = Item(image = "/images/exhaust/exhaust3.png", stock=30, category="Motorcycle Exhausts", type = "Motorcyccle upgrades" ,brand="Blaze Tech", name="BlazeStrike 7000X", price=579.99, description="Strike a balance between style and power with Blaze Tech's BlazeStrike 7000X motorcycle exhaust. Elevate your ride with this sleek and high-performance exhaust.")
        item9 = Item(image = "/images/exhaust/exhaust4.png", stock=20, category="Motorcycle Exhausts", type = "Motorcyccle upgrades" ,brand="Velocity Tech", name="VelocityVortex 800", price=819.99, description="Immerse yourself in the velocity vortex created by Velocity Tech's VelocityVortex 800 motorcycle exhaust. Enhance your bike's aerodynamics and unleash superior performance.")
        item10 = Item(image = "/images/exhaust/exhaust5.png", stock=15, category="Motorcycle Exhausts", type = "Motorcyccle upgrades" ,brand="Blaze Tech", name="RevoltRider 11000", price=949.99, description="Join the revolution with Blaze Tech's RevoltRider 11000 motorcycle exhaust. Experience cutting-edge technology and a revolutionary sound for an unmatched riding adventure.")

        item11 = Item(image = "/images/brakes/brakes1.png", stock=50, category="Motorcycle Brakes", type = "Motorcyccle upgrades" ,brand="Velocity Tech", name="TurboStop X-1200", price=299.99, description="Upgrade your stopping power with Velocity Tech's TurboStop X-1200 brake upgrade. Experience precision braking for enhanced safety and control.")
        item12 = Item(image = "/images/brakes/brakes2.png", stock=40, category="Motorcycle Brakes", type = "Motorcyccle upgrades" ,brand="Thunder Force", name="ThunderGrip 1500R", price=349.99, description="Feel the grip of thunder with Thunder Force's ThunderGrip 1500R brake upgrade. Achieve superior braking performance for a confident ride.")
        item13 = Item(image = "/images/brakes/brakes3.png", stock=25, category="Motorcycle Brakes", type = "Motorcyccle upgrades" ,brand="Blaze Tech", name="InfernoBrake 9000X", price=269.99, description="Ignite your braking capabilities with Blaze Tech's InfernoBrake 9000X upgrade. Designed for maximum efficiency, this brake system ensures a responsive and safe ride.")
        item14 = Item(image = "/images/brakes/brakes4.png", stock=30, category="Motorcycle Brakes", type = "Motorcyccle upgrades" ,brand="Velocity Tech", name="VelocityStop 800", price=399.99, description="Experience swift and reliable stopping with Velocity Tech's VelocityStop 800 brake upgrade. Enhance your braking performance for a smoother ride.")
        item15 = Item(image = "/images/brakes/brakes5.png", stock=35, category="Motorcycle Brakes", type = "Motorcyccle upgrades" ,brand="Blaze Tech", name="RevolutionBrake 12000", price=449.99, description="Join the braking revolution with Blaze Tech's RevolutionBrake 12000 upgrade. Advanced technology and precision engineering for unparalleled braking control.")

        item16 = Item(image = "/images/helmets/helmets1.png", stock=35, category="Helmets", type = "Motorcyccle gear" ,brand="Velocity Tech", name="AeroSafe X-550", price=199.99, description="Experience maximum safety and style with Velocity Tech's AeroSafe X-550 helmet. Designed for aerodynamics and comfort on every ride.")
        item17 = Item(image = "/images/helmets/helmets2.png", stock=25, category="Helmets", type = "Motorcyccle gear" ,brand="Thunder Force", name="GuardianRide 700R", price=229.99, description="Ride with the protection of a guardian with Thunder Force's GuardianRide 700R helmet. Combining safety features and a sleek design for a confident journey.")
        item18 = Item(image = "/images/helmets/helmets3.png", stock=15, category="Helmets", type = "Motorcyccle gear" ,brand="Blaze Tech", name="BlazeArmor 8000X", price=179.99, description="Elevate your riding experience with Blaze Tech's BlazeArmor 8000X helmet. Superior protection and a cutting-edge design for the modern rider.")
        item19 = Item(image = "/images/helmets/helmets4.png", stock=35, category="Helmets", type = "Motorcyccle gear" ,brand="Velocity Tech", name="SwiftGuard 950", price=249.99, description="Ride with swiftness and protection in Velocity Tech's SwiftGuard 950 helmet. A perfect blend of agility and safety for the adventurous rider.")
        item20 = Item(image = "/images/helmets/helmets5.png", stock=25, category="Helmets", type = "Motorcyccle gear" ,brand="Blaze Tech", name="ZenithHelm 1100", price=269.99, description="Reach the zenith of safety with Blaze Tech's ZenithHelm 1100. Unmatched protection and a stylish design for riders who demand the best.")
        item21 = Item(image = "/images/helmets/helmets6.png", stock=15, category="Helmets", type = "Motorcyccle gear" ,brand="Thunder Force", name="ThunderStrike 1200GT", price=299.99, description="Feel the strike of thunder with Thunder Force's ThunderStrike 1200GT helmet. Unleash a combination of safety and performance for an exhilarating ride.")

        item22 = Item(image = "/images/jackets/jackets1.png", stock=50, category="Jackets", type = "Motorcyccle gear" ,brand="Velocity Tech", name="SwiftRider X-700", price=349.99, description="Ride in style with Velocity Tech's SwiftRider X-700 leather jacket. Crafted for comfort and durability, this jacket complements your adventurous spirit.")
        item23 = Item(image = "/images/jackets/jackets2.png", stock=35, category="Jackets", type = "Motorcyccle gear" ,brand="Thunder Force", name="ThunderStrike 850GT", price=399.99, description="Feel the thunderous style with Thunder Force's ThunderStrike 850GT leather jacket. Unleash your boldness with this combination of fashion and functionality.")
        item24 = Item(image = "/images/jackets/jackets3.png", stock=45, category="Jackets", type = "Motorcyccle gear" ,brand="Blaze Tech", name="InfernoFlex 6000X", price=299.99, description="Ignite your style with Blaze Tech's InfernoFlex 6000X leather jacket. A perfect fusion of flexibility and fashion, designed for the modern rider.")
        item25 = Item(image = "/images/jackets/jackets4.png", stock=50, category="Jackets", type = "Motorcyccle gear" ,brand="Velocity Tech", name="TurboCharge 750", price=449.99, description="Charge into the adventure with Velocity Tech's TurboCharge 750 leather jacket. Engineered for both style and protection, this jacket sets a new standard.")
        item26 = Item(image = "/images/jackets/jackets5.png", stock=45, category="Jackets", type = "Motorcyccle gear" ,brand="Blaze Tech", name="BlazeGuard 9000", price=479.99, description="Guard yourself in style with Blaze Tech's BlazeGuard 9000 leather jacket. Unmatched protection and a bold design for riders who prioritize safety and fashion.")
        item27 = Item(image = "/images/jackets/jackets6.png", stock=55, category="Jackets", type = "Motorcyccle gear" ,brand="Thunder Force", name="StormRider 1000GT", price=529.99, description="Ride through the storm in Thunder Force's StormRider 1000GT leather jacket. Embrace the perfect blend of durability and style in every journey.")
       
        item28 = Item(image = "/images/boots/boots1.png", stock=50, category="Boots", type = "Motorcyccle gear" ,brand="Velocity Tech", name="TurboStride X-550", price=179.99, description="Step into speed with Velocity Tech's TurboStride X-550 motorcycle boots. Engineered for both comfort and style, these boots are a perfect companion for your rides.")
        item29 = Item(image = "/images/boots/boots2.png", stock=55, category="Boots", type = "Motorcyccle gear" ,brand="Thunder Force", name="ThunderGrip 700R", price=199.99, description="Grip the road with Thunder Force's ThunderGrip 700R motorcycle boots. Experience a perfect balance of traction and comfort for a confident ride.")
        item30 = Item(image = "/images/boots/boots3.png", stock=45, category="Boots", type = "Motorcyccle gear" ,brand="Blaze Tech", name="BlazeFlex 5000X", price=159.99, description="Flexibility meets fashion with Blaze Tech's BlazeFlex 5000X motorcycle boots. Designed to enhance your riding experience with comfort and durability.")
        item31 = Item(image = "/images/boots/boots4.png", stock=50, category="Boots", type = "Motorcyccle gear" ,brand="Velocity Tech", name="SwiftGuard 800", price=219.99, description="Guard your journey with Velocity Tech's SwiftGuard 800 motorcycle boots. Offering superior protection and a sleek design, these boots are built for adventure.")
        
        item32 = Item(image = "/images/gloves/gloves1.png", stock=50, category="Gloves", type = "Motorcyccle gear" ,brand="Velocity Tech", name="TurboGrip X-450", price=89.99, description="Enhance your grip with Velocity Tech's TurboGrip X-450 motorcycle gloves. Engineered for comfort and control, these gloves elevate your riding experience.")
        item33 = Item(image = "/images/gloves/gloves2.png", stock=50, category="Gloves", type = "Motorcyccle gear" ,brand="Thunder Force", name="ThunderTouch 600R", price=99.99, description="Feel the touch of thunder with Thunder Force's ThunderTouch 600R motorcycle gloves. Designed for precision and protection, these gloves are a stylish addition to your gear.")


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
        db.session.add(item21)
        db.session.add(item22)
        db.session.add(item23)
        db.session.add(item24)
        db.session.add(item25)
        db.session.add(item26)
        db.session.add(item27)
        db.session.add(item28)
        db.session.add(item29)
        db.session.add(item30)
        db.session.add(item31)
        db.session.add(item32)
        db.session.add(item33)

        # Commit the changes to the database
        db.session.commit()
        print("Done papu")
