# Copyright (c) 2023, ce construction and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SupportUserBranchSetting(Document):
	pass

@frappe.whitelist()
def get_user_email():
	data = frappe.db.sql(f""" select so.email,so.name as name from `tabUser` as so join `tabHas Role` as si on so.name = si.parent where si.role = 'Support Team'""",as_dict=True)
	
	return data
