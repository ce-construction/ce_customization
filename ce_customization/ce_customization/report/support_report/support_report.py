# Copyright (c) 2023, ce construction and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	if not filters: filters = {}

	columns, data = [], []

	columns = get_columns()

	query = """
    SELECT
	    so.name AS my_id,
        so.user_name,
        so.subject,
        so.department,
        si.item_code
    FROM
        `tabIssue` AS so
    LEFT JOIN
        `tabSupport Item` AS si
    ON
        so.name = si.parent
	
"""

	# data1 = get_all_data_from_list("Issue")
	# data2 = get_child_table_data("Support Item")
	data = frappe.db.sql(query, as_dict=True)
	
	return columns, data
	# if not cs_data:
	# 	msgprint(_('no record found'))
	# 	return columns, cs_data
	# #return columns, data
	# data = []


def get_columns():
	return[
		{
            'fieldname': 'user_name',
            'label': ('User name'),
            'fieldtype': 'Data',
			'width':'120'
            #'options': 'Account'
        },
        {
			'fieldname': 'department',
            'label': ('Department'),
            'fieldtype': 'Link',
        	'options': 'Department',
			'width':'120'
        },
        {
			'fieldname': 'subject',
            'label': ('Particular'),
            'fieldtype': 'Data',
			'width':'120'
            #'options': 'Account'
        },
		{
			'fieldname': 'starting_date',
            'label': ('Starting Date'),
            'fieldtype': 'Datetime',
			'width':'120'
            #'options': 'Account'
        },
		{
			'fieldname': 'resolution_date',
            'label': ('Resolution Date'),
            'fieldtype': 'Datetime',
			'width':'120'
            #'options': 'Account'
        },
        {
			'fieldname': 'item_code',
            'label': ('Item Code'),
            'fieldtype': 'Link',
            'options': 'Item',
			'width':'120'
        }
	]

# def get_cs_data(filters):

# 	data = frappe.get_all(
# 		doctype = 'Issue',
# 		fields = ['user_name', 'department','subject'],
# 		order_by = 'user_name desc'
# 	)
# 	return data


# def get_all_data_from_list(doctype):
#     data_all = frappe.get_all(doctype, fields=["subject", "department"])
#     return data_all


# def get_child_table_data(parent_name):
#     # Fetch the child table records related to the parent record
#     child_records = frappe.get_all(parent_name, fields=["item_code"])
#     return child_records