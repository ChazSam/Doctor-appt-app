#Doctor Appointment App

This project allows users to create an account for a doctor's appointment at a hospital. The user will create an account with a username, password, insurance, and a short bio of their problems. Once the user has created their account, they will be able to look up doctors and schedule an appointment. In addition, there is an Admin user that can add, edit, and delete doctors. 

Starting in the server folder, the models folder holds the three models for this project, Appointment, Doctor, and User. The appointment model holds the many-to-many relationship between Doctors and Users. It stores their IDs as foreign keys and also has a date for an attribute. The User model takes a name, password, first name, last name, birthdate, sex, and a bio attribute. It also has a relationship to appointments to get any appointments that a user has signed up for. The password has added security by hashing the password and storing the hash and not the actual password for security reasons. The Doctor's model's attributes are name, image URL, department, bio, and tagline. They also have a relationship to retrieve all appointments assigned to a doctor. 

The app file in server contains all of the RESTful API's in the backend. The first class, CheckSession, checks if a user has already logged in. If they have, it will store their ID in sessions until they logout. Login checks for a matching username and password. The password gets changed into a hash and checks the server if it matches the saved hash of the user. Logout sets the session's user ID to none so that the CheckSession doesn't pull up the user's information anymore. 

For the user class, the models associated with it are GetUsers, Signup, and UserDetails. GetUsers lists all of the users, their attributes, and their appointments with doctors. It is only accessed server side. Signup creates an account for a user that takes all the attributes of the model User and enters them into the database, creating a new account. 
UserDetails has three methods within it, a GET, PATCH, and DELETE. When the user logs in, their data is saved into a state that is used throughout the app like on their account page. On their account page, they can change the details of their account and the patch updates any changes.  Delete deletes their account and with the cascade in the back_populates in their model deletes any appointments associated with them as well. 

The models associated with the Doctors model are Call_Doctor, AddDoctor, and DoctorDetails. CallDoctors shows all of the doctors within the database with their appointments which can be viewed on the server. AddDoctor and DoctorDetails can be accessed only by the administrator. Using AddDoctor, the admin can create a doctor with the Doctor model's attributes and adds them to the database. DoctorDetails has  GET, PATCH, and DELETE methods with them. The get model gives all of the doctor's details and appointments associated with them. PATCH lets the admin update any of the doctor's attributes and DELETE removes the doctor from the system, deleting all the appointments assigned to them. 

The models associated with the Appointments model are CreateAppointment and AppointmentDetails. CreateAppointment is done by the patient on the appointment page where they choose a doctor and a date to see them. It takes the ID of the user and the ID of the doctor with the date of the appointment. AppointmentDetails updates and deletes appointments for users. Both methods use datetime to take the new Date from the front end, changes it into a tuple and the striptime converts it into year-month-day and grabs the 0 index where the value is located in the tuple. 



Going to the client side, in components, 




create an account
log into their account
edit details about their account
schedule a doctors appointment 
changes a doctors appointment
delete a doctors appointment


admin to add doctors
change drs schedules
remove drs
change user appointments
delete users


3 models - appointment, doctor, user
user/admin > appointment < doctor

appointment full crud
user create and update admin can add and remove doctors
doctor - admin can create and update doctors in user

