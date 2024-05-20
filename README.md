#Doctor Appointment App

##Backend
This project allows users to create an account for a doctor's appointment at a hospital. The user will create an account with a username, password, insurance, and a short bio of their problems. Once the user has created their account, they will be able to look up doctors and schedule an appointment. In addition, there is an Admin user that can add, edit, and delete doctors. 

Starting in the server folder, the models folder holds the three models for this project, Appointment, Doctor, and User. The appointment model holds the many-to-many relationship between Doctors and Users. It stores their IDs as foreign keys and also has a date for an attribute. The User model takes a name, password, first name, last name, birthdate, sex, and a bio attribute. It also has a relationship to appointments to get any appointments that a user has signed up for. The password has added security by hashing the password and storing the hash and not the actual password for security reasons. The Doctor's model's attributes are name, image URL, department, bio, and tagline. They also have a relationship to retrieve all appointments assigned to a doctor. 

The app file in server contains all of the RESTful API's in the backend. The first class, CheckSession, checks if a user has already logged in. If they have, it will store their ID in sessions until they logout. Login checks for a matching username and password. The password gets changed into a hash and checks the server if it matches the saved hash of the user. Logout sets the session's user ID to none so that the CheckSession doesn't pull up the user's information anymore. 

For the user class, the models associated with it are GetUsers, Signup, and UserDetails. GetUsers lists all of the users, their attributes, and their appointments with doctors. It is only accessed server side. Signup creates an account for a user that takes all the attributes of the model User and enters them into the database, creating a new account. 
UserDetails has three methods within it, a GET, PATCH, and DELETE. When the user logs in, their data is saved into a state that is used throughout the app like on their account page. On their account page, they can change the details of their account and the patch updates any changes.  Delete deletes their account and with the cascade in the back_populates in their model deletes any appointments associated with them as well. 

The models associated with the Doctors model are Call_Doctor, AddDoctor, and DoctorDetails. CallDoctors shows all of the doctors within the database with their appointments which can be viewed on the server. AddDoctor and DoctorDetails can be accessed only by the administrator. Using AddDoctor, the admin can create a doctor with the Doctor model's attributes and adds them to the database. DoctorDetails has  GET, PATCH, and DELETE methods with them. The get model gives all of the doctor's details and appointments associated with them. PATCH lets the admin update any of the doctor's attributes and DELETE removes the doctor from the system, deleting all the appointments assigned to them. 

The models associated with the Appointments model are CreateAppointment and AppointmentDetails. CreateAppointment is done by the patient on the appointment page where they choose a doctor and a date to see them. It takes the ID of the user and the ID of the doctor with the date of the appointment. AppointmentDetails updates and deletes appointments for users. Both methods use datetime to take the new Date from the front end, changes it into a tuple and the striptime converts it into year-month-day and grabs the 0 index where the value is located in the tuple. 


##Frontend
Going to the client side, in components, the app component starts by getting all of the doctors data and adds it to the listDoctor state to be used throughout the app. Then, it checks to see if the user is still logged in, using the CheckSession model in the back end. It sets up the NavBar on every page and uses Outlet to send states thoughout the application. 

The NavBar starts with the home, doctor, login and signup pages at the start. If the user is logged in, the login and signup is replaced with the appointment and account pages. If the admin logs in, it has a special page just for the adminstrator. 

In the pages, the home page is the starting page for all users that lets the user know to signup or login if they have an account. The doctors page lists all of the doctors available to be seen with their name, department, biography and a tagline.
If a user goes to a wrong page, the routes will send them to the ErrorPage, prompting them to go back. 

The login page just prompts the user to enter their username and password. Once entered, it is sent to the backend and the Login method checks if the username and password matches any results. The signup page takes all of the attributes from the User method in the models folder and uses the Signup method to create an account.

When the user logs in or creates an account, it sends them back to the home page, displaying their first name. The appointment page lets the user pick a doctor and a date to see them for an appointment. It uses the react-calendar, https://www.npmjs.com/package/react-calendar, and uses the css that comes witht that package.
The account page shows their appointments that are coming up, along with changing their account details, chainging an appointment, logging out and deleting their account. EditPatient allows the user to change their account details and patches it in the backend. It will fill out each item with their data and the user can submit any changes. The EditAppointment has the user select an appointment they have made and either changes it or deletes it. If the user delete it, it is removed from the database. If the user changes an appointment, the calendar will pop up and will have the details of that appointment set up, allowing the user to either change the date and/or the doctor. 




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

