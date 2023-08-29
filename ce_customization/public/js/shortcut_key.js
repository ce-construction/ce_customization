frappe.ui.keys.add_shortcut({
	shortcut: "alt+ctrl+n",
	action: function () {
		frappe.new_doc("Issue");
	},
	description: __("Open new issue"),
});


frappe.ui.keys.add_shortcut({
    description: "Show issue List",
    shortcut: "ctrl+i",
    action: () => {
        frappe.set_route("List","Issue");
    }
});
