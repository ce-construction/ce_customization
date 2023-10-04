frappe.ui.form.on('Challan', {
		refresh:function(frm){
	    
	    if(!frm.doc.__islocal){
	        frm.add_custom_button(__("Check Chalan Item List"), function() {
	              frappe.msgprint
                     ({
                        title: __('Confirm Check'),
                        message: __('Please confirm before check'),
                        indicator: 'blue',
                        primary_action: 
                        {
                            label: __('Confirm'),
                            action: function() 
                            {
                                // Do something when the user clicks "OK"
                                frappe.call({
                                    method: 'frappe.client.get_value',
                                    args: {
                                        doctype: 'User',
                                        filters: { name: frappe.session.user },
                                        fieldname: 'full_name'
                                    },
                                    callback: function(response) {
                                        var full_name = response.message.full_name;
                        
                                        // Set the value to a field
                                        frm.set_value('checked_by', full_name);
                                        frm.set_df_property('checked_by', 'read_only', 1);
                                         frm.save(); 
                                         cur_dialog.hide();                      
                                        }
                                    });
                                            
                            }
                        },
                        secondary_action: {
                            label: __('Cancel'), // Change "Cancel" to your desired label
                            action: function() {
                                // Do something when the user clicks "Cancel"
                                cur_dialog.hide();
                            },
                            style: 'background-color: #ff0000; color: red;'
                        },
                    });
				// frm.set_value("status", "Checked Item");
				// frm.save();
			}).css({
                "background-color": "rgb(163 1 1)",
                "color": "white"
            });
	    }
		

      if(frm.doc.checked_by)
      {
          frm.remove_custom_button(__('Check Chalan Item List'));
          	var fields = frm.fields_dict;
          	for (var fieldname in fields) {
           // Set all fields as read-only except for the specific field
                    frm.set_df_property(fieldname, 'read_only', 1);
                     
          
          	}
          	
               frm.add_custom_button(__("Receive Chalan Item List"), function() {
	              frappe.msgprint
                     ({
                        title: __('Confirm Receive'),
                        message: __('Please confirm before Receive'),
                        indicator: 'blue',
                        primary_action: 
                        {
                            label: __('Confirm'),
                            action: function() 
                            {
                                // Do something when the user clicks "OK"
                                frappe.call({
                                    method: 'frappe.client.get_value',
                                    args: {
                                        doctype: 'User',
                                        filters: { name: frappe.session.user },
                                        fieldname: 'full_name'
                                    },
                                    callback: function(response) {
                                        var full_name = response.message.full_name;
                        
                                        // Set the value to a field
                                        frm.set_value('approved_by', full_name);
                                        frm.set_df_property('approved_by', 'read_only', 1);
                                         frm.save(); 
                                         cur_dialog.hide();                      
                                        }
                                    });
                                            
                            }
                        },
                        secondary_action: {
                            label: __('Cancel'), // Change "Cancel" to your desired label
                            action: function() {
                                // Do something when the user clicks "Cancel"
                                cur_dialog.hide();
                            },
                            style: 'background-color: #ff0000; color: red;'
                        },
                    });
				// frm.set_value("status", "Checked Item");
				// frm.save();
			}).css({
                "background-color": " #039487",
                "color": "white"
            });
          	 
            
      }
      if(frm.doc.approved_by){
           frm.remove_custom_button(__('Receive Chalan Item List'));
      }
            
	    if(frm.doc.prepared_by === undefined)
	    {
    	    frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'User',
                    filters: { name: frappe.session.user },
                    fieldname: 'full_name'
                },
                callback: function(response) {
                    var full_name = response.message.full_name;
    
                    // Set the value to a field
                    frm.set_value('prepared_by', full_name);
                    frm.set_df_property('prepared_by', 'read_only', 1);
                    
                }
            });
	   
	    }
	},
	

})
frappe.ui.form.on('IT Stock', {
     	item_code_: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                doctype: 'Item',
                filters: { name: child.item_code_ },
                fieldname: 'item_name'
            },
            callback: function(response) {
                var full_name = response.message.item_name;

                // Set the value to the field in the child table
                frappe.model.set_value(cdt, cdn, 'particular', full_name);
                
            }
        });
    },
});

