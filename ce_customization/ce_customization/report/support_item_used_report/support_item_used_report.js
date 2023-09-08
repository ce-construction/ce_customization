// Copyright (c) 2023, ce construction and contributors
// For license information, please see license.txt







frappe.query_reports["Support Item Used Report"] = {
    
	"filters": [
        
        {
			'fieldname': 'site',
            'label':__('Site'),
            'fieldtype': 'Link',
        	'options': 'Branch',
			//'css_class': 'small'
        },

        {
			'fieldname': 'department',
            'label': __('Department'),
            'fieldtype': 'Link',
        	'options': 'Department'
        },
      
        {
			'fieldname': 'item_name_',
            'label': __('Item Name'),
            'fieldtype': 'Data',
            //'options': 'Item'
        },

        {
            'fieldname': 'user_name',
            'label': __('User name'),
            'fieldtype': 'Data',
            'width':'120'
            //'options': 'Account'
        },

		{
			'fieldname': '_from',
            'label': __('From Date'),
            'fieldtype': 'Date',
            'default':frappe.datetime.add_months(frappe.datetime.get_today(), -1)
		},
		{
			'fieldname': 'to',
            'label': __('To Date'),
            'fieldtype': 'Date',
            'default':frappe.datetime.get_today()
        },
        // {
		// 	'fieldname': 'item_code',
        //     'label': __('Item Code'),
        //     'fieldtype': 'Link',
        //     'options': 'Item'
        // }
      
        {
			'fieldname': 'subject',
            'label': __('Particular'),
            'fieldtype': 'Data',
            //'options': 'Account'
        },

	]
};
