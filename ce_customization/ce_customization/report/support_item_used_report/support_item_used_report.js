
frappe.query_reports["Support Item Used Report"] = {
    
	"filters": [
        {
			'fieldname': 'custom_item_used_from_site',
            'label':__('Item Used Site'),
            'fieldtype': 'Link',
        	'options': 'Branch',
            'default':'H/O',
            'css_class': 'custom-width'
           
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
            
        },
        {
			'fieldname': '_from_nepali',
            'label': __('From Nepali Date'),
            'fieldtype': 'Data',
            'on_change': function() {
               console.log("Hello");
            }
           
		},
		{
			'fieldname': 'to_nepali',
            'label': __('To Nepali Date'),
            'fieldtype': 'Data',
        
           
            
        },
        


	],
    "onload": function (report) {
        function setupDatePicker(fieldName) {
            $(report.page.fields_dict[fieldName].input).nepaliDatePicker({
                ndpYear: true,
                ndpMonth: true,
                ndpYearCount: 10,
                onChange: function(e) {
                    var date_format_converted = new Date(e.ad);
                    if (report.page.fields_dict[fieldName.replace('_nepali', '')] && report.page.fields_dict[fieldName.replace('_nepali', '')].df.fieldtype == "Datetime") {
                        date_format_converted = date_format_converted.toISOString().split("T")[0] + " 00:00:00";
                    }
                    var formattedDate = moment(date_format_converted).format('DD-MM-YYYY');
                    report.page.fields_dict[fieldName.replace('_nepali', '')].$input.val(formattedDate);
                }
            });
        }
    
        function setupDatePickerEnglishDate(fieldName) {
            $(report.page.fields_dict[fieldName].input).on('change', function() {
                var date = new Date($(this).val());
                var formattedDate = moment(date).format('DD-MM-YYYY');
                var englishdate = NepaliFunctions.AD2BS(formattedDate, "DD-MM-YYYY", "YYYY-MM-DD");
                if (typeof englishdate === 'object' && englishdate.hasOwnProperty('formatted')) {
                    englishdate = englishdate.formatted;
                }
                report.page.fields_dict[fieldName + '_nepali'].$input.val(englishdate);
            });
        }
    
        ['_from', 'to'].forEach(function(fieldName) {
            report.page.fields_dict[fieldName].$input.on('change', function () {
                report.refresh();
            });
            setupDatePicker(fieldName + '_nepali');
            setupDatePickerEnglishDate(fieldName);
        });
    
        var filtersToSend = Object.assign({}, report.filters); // create a copy of the filters
        delete filtersToSend._from_nepali; // remove the _from_nepali field
        delete filtersToSend.to_nepali; // remove the to_nepali field
    },
  
    // Add a comma here
};











