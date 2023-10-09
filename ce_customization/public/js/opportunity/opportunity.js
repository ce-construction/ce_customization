// frappe.ui.form.on('Opportunity', {
//     setup: function(frm) {

//         frm.set_query("project", "plot", function(doc, cdt, cdn) {
//             let d = locals[cdt][cdn];
//             return {
//                 filters: [
//                     ['Project', 'status', '=', 'Open']
//                 ]
//             };
//         });

//         frm.set_query("plot_list", "plot", function(doc, cdt, cdn) {
//             let d = locals[cdt][cdn];
//             return {
//                 filters: [
//                     ['Plot List', 'project_name', '=', 'test']
//                 ]
//             };
//         });

       
//     }
// });

frappe.ui.form.on('Opportunity', {
    setup: function(frm) {
        frm.set_query("project", "plot", function(doc, cdt, cdn) {
            let d = locals[cdt][cdn];
            let filters = [['Project', 'status', '=', 'Open']];

            // Check if the project field is filled
            if (d.project) {
                filters.push(['Project', 'name', '=', d.project]);
            }

            return {
                filters: filters
            };
        });

        frm.set_query("plot_list", "plot", function(doc, cdt, cdn) { 
            let d = locals[cdt][cdn];
            let filters = [];

            // Check if the project field is filled
            if (d.project) {
                filters.push(['Plot List', 'project_name', '=', d.project]);
            }

            return {
                filters: filters
            };
        });
    }
});

    frappe.ui.form.on('Unit', {

        plot_list: function(frm, cdt, cdn) {
            var child = locals[cdt][cdn];
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Plot List',
                    filters: { name: child.plot_list },
                    fieldname: 'project_name'
                },
                callback: function(response) {
                    var full_name = response.message.project_name;
    
                    // Set the value to the field in the child table
                    frappe.model.set_value(cdt, cdn, 'project', full_name);
                    
                }
            });
        },
    price: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        calculateTotalAmount(frm);
    },
    
    plot_remove: function(frm) {
        calculateTotalAmount(frm);
    }
  });

function calculateTotalAmount(frm) {
    var total = 0;
    $.each(frm.doc.plot || [], function(i, row) {
        total  += row.price;
    });
    // frm.set_value('total', total);
    frm.set_value('custom_total_amt', total);
}



