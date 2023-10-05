
frappe.query_reports["Support Item Used Report"] = {
    
	"filters": [
        {
			'fieldname': 'custom_item_used_from_site',
            'label':__('Item Used Site'),
            'fieldtype': 'Link',
        	'options': 'Branch',
            'default':'H/O'
			//'css_class': 'small'
        },
        
        
      
        {
			'fieldname': 'item_name_',
            'label': __('Particulars'),
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
            'default':frappe.datetime.add_months(frappe.datetime.get_today(), -1),
            'reqd': 1
		},
		{
			'fieldname': 'to',
            'label': __('To Date'),
            'fieldtype': 'Date',
            'default':frappe.datetime.get_today(),
            'reqd': 1
            
        }

	],
    "onload": function (report) {
        // Add an event listener to the "_from" date field
        report.page.fields_dict['_from'].$input.on('change', function () {
            // Reload the page when the "_from" date field changes
            report.refresh();
        });
        report.page.fields_dict['to'].$input.on('change', function () {
            // Reload the page when the "_from" date field changes
            report.refresh();
        });
    }
    
};









