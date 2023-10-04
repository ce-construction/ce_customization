

frappe.ui.form.on('Support User Branch Setting', {
before_load: function (frm) {
        
          frappe.call({
             method: 'ce_customization.ce_customization.doctype.support_user_branch_setting.support_user_branch_setting.get_user_email',
             args: {},
             callback: function(r) {
                 var childTable = frm.doc.support_usersite;
                 
                 //console.log(r.message)
                 
                    // while (i--)
                    // {
                       
                    //     frm.doc.support_usersite.splice(frm.doc.support_usersite[i], 1)
                    // }
                 
                 for (i = 0; i < r.message.length; i++) {
                 
                    let mail=r.message[i].email;
                    let name=r.message[i].name;
                    var found = 0;
                   
                    if(mail != '' ){
                       
                        for( x =0; x < childTable.length; x++ ){
                            if(name === childTable[x].user_email ){
                                found = 1;
                                
                            }
                          
                            
                        }
                         if(found == 0){
                             var row = frm.add_child("support_usersite");
                             row.user_email = name
                         }
                        
                        
                    }
                    
                 }
            

                 frm.refresh_field('support_usersite')
                 
             }
             
         })
         
     },
     refresh: function(frm) {
        //cur_frm.fields_dict['support_usersite'].grid.wrapper.find('.grid-remove-rows').hide();
        frm.set_df_property('support_usersite', 'cannot_add_rows', true); // Hide add row button
        frm.set_df_property('support_usersite', 'cannot_delete_rows', true); // Hide delete button
        frm.set_df_property('support_usersite', 'cannot_delete_all_rows', true); // Hide delete all button
     }
 });
 

