import frappe

@frappe.whitelist(allow_guest=True)
def remove_email_site():
    data = frappe.db.sql(""" delete  from `tabEmail And Site` where parenttype = 'Support User Branch Setting' and user_email not in (select so.name from `tabUser` as so join `tabHas Role` as si on so.name = si.parent where si.role = 'Support Team') """ )
    return data

@frappe.whitelist(allow_guest=True)
def get_values_from_child_table():
    my_doc = frappe.get_doc("Support User Branch Setting")
    for row in my_doc.support_usersite:

        child_field1 = row.user_email  # Replace "fieldname1" with the actual field name
        child_field2 = row.site # Replace "fieldname2" with the actual field name
        if frappe.session.user == child_field1:
            return child_field2
        