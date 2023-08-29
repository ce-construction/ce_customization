frappe.ui.form.on('Opportunity', {
    setup: function(frm) {
        frm.set_query("plot_list", "plot", function(doc, cdt, cdn) {
            let d = locals[cdt][cdn];
            return {
                // Define your query conditions here
            };
        });

        frm.set_query("project", "plot", function(doc, cdt, cdn) {
            let d = locals[cdt][cdn];
            return {
                filters: [
                    ['Project', 'status', '=', 'Open']
                ]
            };
        });
    }
});


  frappe.ui.form.on('Unit', {
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
    frm.set_value('custom_total_amt', total);
}


