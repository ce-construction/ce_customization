// Copyright (c) 2023, ce construction and contributors
// For license information, please see license.txt

frappe.query_reports["Support Report"] = {
	"filters": [

		{
            'fieldname': 'user_name',
            'label': __('User name'),
            'fieldtype': 'Data',
            //'options': 'Account'
        },
        {
			'fieldname': 'department',
            'label': __('Department'),
            'fieldtype': 'Link',
        	'options': 'Department'
        },
        {
			'fieldname': 'subject',
            'label': __('Particular'),
            'fieldtype': 'Data',
            //'options': 'Account'
        },
		{
			'fieldname': 'starting_date',
            'label': __('Starting Date'),
            'fieldtype': 'Datetime',
            //'options': 'Account'
        },
		{
			'fieldname': 'resolution_date',
            'label': __('Resolution Date'),
            'fieldtype': 'Datetime',
            //'options': 'Account'
        },
        {
			'fieldname': 'item_code',
            'label': __('Item Code'),
            'fieldtype': 'Link',
            'options': 'Item'
        }
	]
};
