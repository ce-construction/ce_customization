import frappe

@frappe.whitelist(allow_guest=True)
def create_record(username, password, email):
    print(f"Received data: username={username}, password={password}, email={email}")

    data = frappe.get_doc({
        "doctype": "PD Vendor Signup",
        "username": username,
        "password": password,
        "email": email
    })

    data.insert(ignore_permissions=True)  # Ignore permissions to force creation
  
    user = frappe.get_doc({
        "doctype": "User",
        "first_name": username,
        "new_password": password,
        "email": email,
        "role_profile_name": "Customer"
        

    })

    user.insert(ignore_permissions=True)  # Ignore permissions to force creation
 
    return user