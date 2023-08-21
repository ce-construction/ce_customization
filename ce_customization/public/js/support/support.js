var count = 0;








function DurationText(days, hours, mins,secs){
    let duration = '';
    if( days > 1){
        duration = duration.concat(`${days} days`);
    }
    else if( days === 0 ){
        duration = duration.concat("");
    }
    else{
        duration = duration.concat(`${days} day`);
    }
    
    
    
    if( hours > 1){
        duration = duration.concat(" ",`${hours} hrs`);
    }
    else if( hours === 0 ){
        duration = duration.concat("");
    }
    else{
        duration = duration.concat(" ",`${hours} hr`);
    }
    
    
     if( mins > 1){
        duration = duration.concat(" ",`${mins} mins`);
    }
    else if( mins === 0 ){
        duration = duration.concat("");
    }
    else{
        duration = duration.concat(" ",`${mins} min`);
    }
    
    
     if( secs > 1){
        duration = duration.concat(" ",`${secs} secs`);
    }
    else if( secs === 0 ){
        duration = duration.concat("");
    }
    else{
        duration = duration.concat(" ",`${secs} sec`);
    }
    
    
    
    return duration;
    
   
}






frappe.ui.form.on('Issue', {
    
    
    setup: function(frm) {
		frm.set_query("item_name", "item", function(doc, cdt, cdn) {
			let d = locals[cdt][cdn];
			return {
				filters: [
				
					['Item', 'is_fixed_asset', '=', 0]
				
				]
			};
		});
	},
	
	after_save:function(frm) {
	    //calculateTotalAmount(frm);
             
	     
	   if(frm.doc.status === "Open" || frm.doc.status === "Replied" || frm.doc.status === "On Hold" || frm.doc.status === "Resolved"){
	        count = 1;
	         frappe.call({
                    method: 'frappe.client.set_value',
                    args: {
                        doctype: frm.doc.doctype,
                        name: frm.doc.name,
                        fieldname: 'starting_date',
                        value:frm.doc.opening_date+ " "+ frm.doc.opening_time
                    },
            callback: function(response) {
                if (response.message) {
                  console.log("Starting date updated successfully!");
                   // frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
                 frm.reload_doc();
                } else {
                  console.log("Failed to update starting date.");
                }
              }
             });
             
             
	       
	   }
           
		// your code here
		if(frm.doc.status === "Closed" && count === 0){
		    
		    
		     frappe.call({
                                method: 'frappe.client.set_value',
                                args: {
                                    doctype: frm.doc.doctype,
                                    name: frm.doc.name,
                                    fieldname: 'resolution_date',
                                    value:frm.doc.opening_date+ " "+ frm.doc.opening_time
                                },
                        callback: function(response) {
                            if (response.message) {
                              console.log("success!");
                                //frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
                          frm.reload_doc();
                            } else {
                              console.log("Failed.");
                            }
                          }
                         });
                         
		}
		
		if(frm.doc.status === "Closed" && count === 1){
		    
               // frm.set_value('resolution_date', frappe.datetime.now_datetime());
               //frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
             
             frappe.call({
                    method: 'frappe.client.set_value',
                    args: {
                        doctype: frm.doc.doctype,
                        name: frm.doc.name,
                        fieldname: 'resolution_date',
                        value:frappe.datetime.now_datetime()
                    },
            callback: function(response) {
                if (response.message) {
                  console.log("Resolution date updated successfully!");
                   // frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
                 frm.reload_doc();
                } else {
                  console.log("Failed to update resolution date.");
                }
              }
             });
             
               
                 
         
        
                

        // Display the days difference in the console
                
           // frm.set_value('work_duration_', days + " "+ hours + ":"+mins+":"+secs);
               // frm.set_value('user_resolution_time', "10 1:20:55");
              
            // Call the save  
           }
           var delayTime = 1000;
           
           setTimeout(function() {
           
                     if(frm.doc.starting_date && frm.doc.resolution_date){
                         
                         var closed_date = frm.doc.resolution_date;
                var opened_date = frm.doc.starting_date;
                var new_closedDate = new Date(closed_date);
                var new_openedOpened = new Date(opened_date);
       
                
                
                 var timeDifference = new_closedDate.getTime() - new_openedOpened.getTime();
              
                 
                 var days = Math.floor(timeDifference / (1000 * 3600 * 24));
                 var hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 *60*60));
                 var mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 *60));
                 var secs =Math.floor((timeDifference % (1000 * 60 )) / (1000 ));
                 
                
                       frappe.call({
                                method: 'frappe.client.set_value',
                                args: {
                                    doctype: frm.doc.doctype,
                                    name: frm.doc.name,
                                    fieldname: 'work_duration_',
                                    value:DurationText(days,hours,mins, secs)   // days + " "+ hours + ":"+mins+":"+secs
                                },
                        callback: function(response) {
                            if (response.message) {
                              console.log("success!");
                                //frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
                           frm.reload_doc();
                            } else {
                              console.log("Failed.");
                            }
                          }
                         });
                     
                 
                 
                       }},delayTime);
                         
             
             
           
        },
        
   
        onload:function(frm){
         if(frm.doc.status === "Open"){
    // //          frm.set_value('starting_date',frm.doc.opening_date+ " "+ frm.doc.opening_time);
    //       frm.save();
		count = 1;
         }
	    
            	var fields = frm.fields_dict;
		
        if(frm.doc.status == "Closed" ){
            // if(frm.doc.resolution_date === undefined){
            //      frm.set_value('resolution_date',frm.doc.opening_date+ " "+ frm.doc.opening_time);
            //      frm.save();
           // }
           
        // Iterate through the fields
            for (var fieldname in fields) {
            // Set all fields as read-only except for the specific field
                if (fieldname !== 'status') {
                   frm.set_df_property(fieldname, 'read_only', 1);
                    
                }
            }
        }
     
    
            
        },
        
         timeline_refresh:function(frm){
            //   if(frm.doc.status == "Open") {

            //          frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time); 
            //          count = 0;
                   
            //  }
            //       // if(frm.doc.status == "Closed" && frm.doc.resolution_date === undefined){
                    //frm.set_value('resolution_date', frappe.datetime.now_datetime());
                   // frm.save();
               // }
            
            
            //  if(frm.doc.status == "Closed" ){
            //      count = 1;
            // if(frm.doc.resolution_date === undefined){
                
            //       frappe.call({
            //                     method: 'frappe.client.set_value',
            //                     args: {
            //                         doctype: frm.doc.doctype,
            //                         name: frm.doc.name,
            //                         fieldname: 'resolution_date',
            //                         value:frm.doc.opening_date+ " "+ frm.doc.opening_time
            //                     },
            //             callback: function(response) {
            //                 if (response.message) {
            //                   console.log("success!");
            //                     //frm.set_value('starting_date', frm.doc.opening_date+ " "+ frm.doc.opening_time);
            //               frm.reload_doc();
            //                 } else {
            //                   console.log("Failed.");
            //                 }
            //               }
            //              });
                 
            // }}
        },
	refresh:function(frm){
	    
      
            
	    if(frm.doc.opened_by === undefined){
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
                frm.set_value('opened_by', full_name);
                frm.set_df_property('opened_by', 'read_only', 1);
                
            }
        });}
	},
		status:function(frm){
		    
		var fields = frm.fields_dict;
		
        if(frm.doc.status == "Closed"){
            
        // Iterate through the fields
            for (var fieldname in fields) {
            // Set all fields as read-only except for the specific field
                if (fieldname !== 'status') {
                   frm.set_df_property(fieldname, 'read_only', 1);
                    
                }
            }
        }
        else{
            
            for (var fieldname2 in fields) {
            // Set all fields as read-only 0 except for the specific field
                if(fieldname2 == 'opening_date' || fieldname2 == 'opening_time' || fieldname2 == "opened_by" || fieldname2 == "total_amount"){
                   frm.set_df_property(fieldname2, 'read_only', 1)}
                else{
                    frm.set_df_property(fieldname2, 'read_only', 0)
                }
                    
            }
        }
		
		 //if(frm.doc.closed_by === undefined){
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
                frm.set_value('closed_by', full_name);
                frm.set_df_property('closed_by', 'read_only', 1);
            }
        });//}
	}
	
});

frappe.ui.form.on('Support Item', {
    rate: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'amount', child.rate * child.quantity);
        calculateTotalAmount(frm);
    },
    
    quantity: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        frappe.model.set_value(cdt, cdn, 'amount', child.rate * child.quantity);
       calculateTotalAmount(frm);
    },
    item_remove:function(frm){
        calculateTotalAmount(frm);
    }
    
});


function calculateTotalAmount(frm) {
    var total_amount = 0;
    $.each(frm.doc.item || [], function(i, row) {
        total_amount += row.amount;
    });
    frm.set_value('total_amount', total_amount);
}

