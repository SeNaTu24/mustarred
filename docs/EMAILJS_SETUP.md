# EmailJS Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and use your Gmail account: **solusesi03@gmail.com**
3. Verify your email

### Step 2: Connect Gmail Service
1. In EmailJS dashboard, click "Add New Service"
2. Select "Gmail"
3. Click "Connect Account" and authorize with solusesi03@gmail.com
4. Name your service: **service_mustarred**
5. Click "Create Service"

### Step 3: Create Email Templates

#### Template 1: Big Table Leads
1. Click "Email Templates" → "Create New Template"
2. Template ID: **template_bigtable**
3. Template Name: "Big Table DCMI Lead"
4. Subject: `{{subject}}`
5. Content: `{{message}}`
6. Click "Save"

#### Template 2: Payment Confirmations  
1. Create another template
2. Template ID: **template_payment**
3. Template Name: "DCMI Payment Received"
4. Subject: `{{subject}}`
5. Content: `{{message}}`
6. Click "Save"

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Configuration
1. Open `client/src/lib/emailjs-config.ts`
2. Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key
3. Save the file

## ✅ Test Your Setup
- Try submitting the DCMI form
- Check solusesi03@gmail.com for clean, professional emails
- No more "FormSubmit Team" branding!

## 📧 What You'll Get
- **Professional emails** from your own Gmail account
- **Custom formatting** with your signature
- **No third-party branding**
- **200 free emails/month**

## 🔧 Troubleshooting
- If emails don't send, check the browser console for errors
- Make sure all IDs match exactly (case-sensitive)
- Verify Gmail account is properly connected

Your emails will now look completely professional and come directly from your Gmail account!