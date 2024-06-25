// Save the original function
var original_on_page_load = frappe.pages["print"].on_page_load;

frappe.pages["print"].on_page_load = function(wrapper) {
    // Call the original function
    original_on_page_load(wrapper);

    // Create the print button
    var print_button = $('<button class="btn btn-primary btn-sm primary-action">Image</button>').css({
        'margin': '16px'
    });
    print_button.click(function () {
        frappe.call({
            method: "ce_customization.ce_customization.convert.convert",
            args: {
                pdf: "https://pdfobject.com/pdf/sample.pdf" // The URL of the PDF
            },
            headers: {
                'Content-Type': 'application/json'
            },
            callback: function (r) {
                if (r.message && r.message.image_urls) {
                    // The server returned an object with an image_urls property. You can safely access its length property.
                    var image_urls = r.message.image_urls;
                    for (var i = 0; i < image_urls.length; i++) {
                        var win = window.open();
                        win.document.write('<img src="' + image_urls[i] + '" />');
                    }
                } else {
                    // The server returned something else (like an error message). Handle this case.
                    console.error(r.message);
                }
            }
        });
    });
    // Insert the print button before the last element in the page's toolbar
    $(wrapper).find('.page-head').append(print_button);
};
