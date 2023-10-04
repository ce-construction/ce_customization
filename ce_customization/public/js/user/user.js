frappe.ui.form.on('User', {
    after_save: function (frm) {
       
                console.log("hello");

                frappe.call({
                    method: 'ce_customization.ce_customization.ce_customization.remove_email_site',
                    args: {},
                    callback: function(r) {
                        console.log(r.message)
                        var data  = r.message;

                        console.log(data[0][13])
                    }
                });
               
            
        }

});




