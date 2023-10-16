frappe.listview_settings['Opportunity'] = {
    button: {
        show: function(doc) {
            return true;
        },
        get_label: function(doc) {
            return __("Comments");
        },
        get_description: function(doc) {
            return __('Show comments of {0}', [doc.name]);
        },
        action: function(doc) {
            get_comments(doc);
        }
    }
};

get_comments = function(doc) {
    var message_display = "";
    frappe.call({
            method: 'ce_customization.ce_customization.ce_customization.get_comments',
            args: {
                parent_docname: doc.name,  // Pass the name of the parent document
            },
            callback: function(r) {
                if (r.message) {
                    console.log(r)
                    // Process the data from ChildType here
                    var childData = r.message;
                    console.log(childData);
                    message_display = message_display+ "<div>";
                    
                    for (var i = 0; i < childData.length; i++) {
                        var dt = childData[i];
                        message_display = message_display + "<p><b>" + dt.added_on.substring(0,19) + "</b> " + dt.note + "</p>";
                    }
                    
                    message_display = message_display+ "</div>";
                    
                    frappe.msgprint(message_display, 'Comment list with opportunity (' + doc.name + ')')
                    
                }
            }
    });
    
};

