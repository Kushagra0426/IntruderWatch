# IntruderWatch

IntruderWatch is a free tool, using which you can create a tracker and hide the tracker with your important files with an eye catchy filename like "My Passwords". If your system will ever be compromised and some attacker will try to access your important files then the attacker will definately open this file and you will get an alert through email with the details of the attacker.

---

## **Project Structure**

- **Frontend**: Built with React.js.
- **Backend**: Built with Django REST Framework.
- **Payment Gateway**: Razorpay integration for handling subscription payments.

---

## **Prerequisites**

Ensure you have the following installed before running the project:

- **Node.js** (for running the frontend)
- **Python 3.x** (for running the backend)
- **Django** and **Django REST Framework**
- **Razorpay Account** for payment integration
- **Google reCAPTCHA Account** for authentication

---

## **Backend Setup Instructions**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/IntruderWatch.git
cd IntruderWatch/backend
```

### 2. Set up a Python Virtual Environment (Optional)

```bash
python -m venv env
source env/bin/activate  # For Windows: env\Scripts\activate
```

### 3. Install Backend Requirements

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory and set the following variables:

```bash
SECRET_KEY = 'YOUR_DJANGO_SECRET_KEY'
DEBUG = 'False'
DB_NAME = 'YOUR_DB_NAME'
DB_USER = 'YOUR_DB_USER'
DB_PASSWORD = 'YOUR_DB_PASSWORD'
DB_HOST = 'YOUR_DB_HOST'
DB_PORT = 'YOUR_DB_PORT'
SMTP_HOSTNAME = 'YOUR_SMTP_HOSTNAME'
SMTP_PORT = YOUR_SMTP_PORT
SMTP_USERNAME = 'YOUR_SMTP_USERNAME'
SMTP_PASSWORD = 'YOUR_SMTP_PASSWORD'
DEFAULT_EMAIL = 'YOUR_DEFAULT_EMAIL'
BACKEND_URL = 'YOUR_BACKEND_URL'
FRONTEND_URL = 'YOUR_FRONTEND_URL'
IPGEOLOCATION_API_KEY = 'YOUR_IPGEOLOCATION_API_KEY'
GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'
GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET'
RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY'
RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID'
RAZORPAY_KEY_SECRET = 'YOUR_RAZORPAY_KEY_SECRET'
```

### 5. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Run the Django Development Server

```bash
python manage.py runserver
```
---

## **Frontend Setup Instructions**

### 1. Navigate to the frontend directory

```bash
cd ../frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Create the .env file in the frontend directory

```bash
touch .env
```

### 4. Add the following variables to the .env file

```bash
REACT_APP_BACKEND_URL = YOUR_BACKEND_URL
REACT_APP_GOOGLE_OAUTH_CLIENT_ID = 'YOUR_GOOGLE_OAUTH_CLIENT_ID'
REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY = 'YOUR_GOOGLE_RECAPTCHA_SITE_KEY'
REACT_APP_RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID'
```

### 5. Start the Development Server

```bash
npm start
```
---

## **Razorpay Integration**

The Razorpay payment gateway is integrated for handling subscription payments. Make sure you have provided the correct Razorpay Key ID and Razorpay Key Secret in both the backend and frontend .env files.

- The payment page can be accessed via the Subscription page after logging in.

- Ensure that you have added the Razorpay Checkout Script in your index.html file as shown below:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

## **Google reCAPTCHA Integration**

The Google reCAPTCHA is integrated for authentication. Make sure you have provided the correct reCAPTCHA Site Key and Secret Key in the frotned and backend .env files respectively.

---

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

#### **Built with ❤️ by [Kushagra Saxena](https://kushagrasaxena.me)**

---










