

frappe.pages['custom-crm-dashboard'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'CRM Dashboard',
		parent: wrapper,
		single_column: true
	});
	//  page.set_title(' Dashboard')
	//  page.set_title_sub('ad,flahfdlasg')


	// let field = page.add_field({
	// 	label: 'Status',
	// 	fieldtype: 'Select',
	// 	fieldname: 'status',
	// 	options: [
	// 		'Open',
	// 		'Closed',
	// 		'Cancelled'
	// 	],
	// 	change() {
	// 		console.log(field.get_value());
	// 	}
	// });
	// add a normal menu item
	// page.add_action_item('Delete', () => delete_items())


	// pipeline value
	
	let TotalAmt = 0;
	
	
	
	let opportunity_val = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_pipeline_value",
			callback: function (r) {
				// Handle the data received from the server here
				if (r.message) {
					const data = r.message;

					// Get the "pipeline-data" div element
					const pipelineDataDiv = document.getElementById('pipeline-data');

					// Create an empty HTML string for pipeline data
					let pipelineHtml = '';

					// Initialize a variable to store the total amount
					let totalAmount = 0;
					

					// Loop through the data and generate the HTML structure
					data.forEach(function (item) {
						// Calculate the total amount
						totalAmount += item.total_amount;

						// Format the total amount as "Rs {amount}K" if amount is greater than or equal to 1000, otherwise format as "Rs {amount}"
						const formattedAmount = formatValue(item.total_amount) 

						TotalAmt = (totalAmount);
						//console.log(TotalAmt);

						pipelineHtml += `
							<div class="progressbar-group">
								<div>
									<p class="sidebar-label" style="margin-bottom: 0px;">
										@${item.probability}%<span class="float-right">${formattedAmount}</span></p>
								</div>
								<div class="bar">
									<div class="progress" style="height: 5px;">
										<div class="progress-bar" role="progressbar" style="width: ${item.probability}%;"
											aria-valuenow="${item.probability}" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
							</div>`;
					});

					
					// Set the innerHTML of the "pipeline-data" div to the generated HTML
					pipelineDataDiv.innerHTML = pipelineHtml;


					//Display the total amount in the "total-amount-value" span
					const totalAmountSpan = document.getElementById('total-amount-value');
					
			
				    totalAmountSpan.innerHTML = formatNumber(totalAmount);

		
				}
			}
		});
	};


	// Current Oppertunities

	let current_opp = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_curr_opp",
			callback: function (r) {
				//console.log(r.message);
				if (r.message) {
					const data = r.message;
	
					const currentoppDiv = document.getElementById('opp-data');
	
					let currentoppHtml = '';
	
					let totalopp = 0;
	
					data.forEach(function (item) {
						// Use the correct property name 'probability'
						totalopp += item.opportunity_count;
	
						currentoppHtml += `
						<div class="progressbar-group">
							<div>
								<p class="sidebar-label" style="margin-bottom: 0px;">
									@${item.probability}%<span class="float-right">${item.opportunity_count}</span></p>
							</div>
							<div class="bar">
								<div class="progress" style="height: 5px;">
									<div class="progress-bar" role="progressbar" style="width: ${item.probability}%;"
										aria-valuenow="${item.probability}" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
						</div>`;
					});
	
					currentoppDiv.innerHTML = currentoppHtml;
	
					const totalAmountSpan = document.getElementById('total-opp');
					totalAmountSpan.innerHTML = `${totalopp}`;
				}
			}
		});
	};
	


	// new opportunity

	let newopp = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_New_opp", //dotted path to server method
			callback: function (r) {
				//console.log(r.message)
				// Get the table body
				const tableBody = document.getElementById("data2");

				// Clear the table body (in case there's existing data)
				tableBody.innerHTML = "";

				// Loop through the data and append rows to the table
				r.message.forEach(function (opportunity) {
					const row = tableBody.insertRow();
					const cell1 = row.insertCell(0);
					const cell2 = row.insertCell(1);
					
					// Format the "Value" column
					const formattedValue = formatValue(opportunity.custom_total_amt);
					cell1.textContent = opportunity.customer_name;
					cell2.textContent = formattedValue;
				});
			}
		});
	};



	// 	let total_lead = function () {
	// 		frappe.call({
	// 			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_total_leads", //dotted path to server method
	// 			callback: function (r) {
	// 				// console.log(r)
	// 				$("#total-leads")[0].innerText = currency(r.message);
	// 			}
	// 		});
	// }


	
        // opp count of this month
		let count = function () {
			frappe.call({
				method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_opp_this_month",
				callback: function (r) {
					//console.log(r);
					// Access the 'message' property to get the count
					const countValue = r.message[0].opportunity_count;
					$("#opp-count").text(countValue);
				}
			});
		};
		

		// percentage change in count
		let count_change = function () {
			frappe.call({
				method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_change_in_count",
				callback: function (r) {
					//console.log(r.message);
					// Access the 'message' property to get the percentage change
					const percentageChange = r.message[0].percentage_change; // Assuming it's the first and only item in the array
					const oppCountChangeElement = $("#opp-count-change");
		
					// Determine the icon class based on the sign of the percentage change
					let iconClass = "fa fa-sort-desc"; // Default down arrow
					if (percentageChange > 0) {
						iconClass = "fa fa-sort-asc"; // Up arrow for positive percentage change
						oppCountChangeElement.addClass("positive"); // Add positive class
					} else if (percentageChange < 0) {
						oppCountChangeElement.addClass("negative"); // Add negative class
					}
		
					// Update the HTML with the icon and formatted percentage
					oppCountChangeElement.html(
						`<i class="${iconClass}" aria-hidden="true"></i> ${Math.abs(percentageChange).toFixed()}%`
					);
				}
			});
		};
		
		




	// recently added
	let opp_value = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_Valuable_Opportunities", //dotted path to server method
			callback: function (r) {
				//console.log(r.message)
				// Get the table body
				const tableBody = document.getElementById("data-body");

				// Clear the table body (in case there's existing data)
				tableBody.innerHTML = "";

				// Loop through the data and append rows to the table
				r.message.forEach(function (opportunity) {
					const row = tableBody.insertRow();
					const cell1 = row.insertCell(0);
					const cell2 = row.insertCell(1);
					const cell3 = row.insertCell(2);

					// Format the "Value" column
					const formattedValue = formatValue(opportunity.custom_total_amt);
					cell1.textContent = opportunity.customer_name;
					cell2.textContent = formattedValue;

					// Format the "Stage" column
					cell3.textContent = `${opportunity.probability}%`;
				});
			}
		});
	};

	function formatValue(value) {
		// Convert value to a number
		const numericValue = parseFloat(value);
	
		// Check if the numeric value is greater than or equal to 1 billion
		if (numericValue >= 1000000000) {
			// Format as "Rs{amount}B" for billions
			return `Rs${(numericValue / 1000000000).toFixed()}B`;
		} else if (numericValue >= 1000000) {
			// Format as "Rs{amount}M" for millions
			return `Rs${(numericValue / 1000000).toFixed()}M`;
		} else if (numericValue >= 1000) {
			// Format as "Rs{amount}K" for thousands
			return `Rs${(numericValue / 1000).toFixed()}K`;
		} else {
			// Format as "Rs{amount}" for values less than 1000
			return `Rs${numericValue}`;
		}
	}
	
	function formatNumber(value){
		const numericValue1 = parseFloat(value);
		if (numericValue1 >= 1000000000) {
			return `Rs<span style="font-size:30px;padding-right: 1px;">${(numericValue1 / 1000000000).toFixed()}</span>B`;
		} else if (numericValue1 >= 1000000) {
			return `Rs<span style="font-size:30px;padding-right: 1px;">${(numericValue1 / 1000000).toFixed()}</span>M`;
		} else if (numericValue1 >= 1000) {
			return `Rs<span style="font-size:30px;padding-right: 1px;">${(numericValue1 / 1000).toFixed()}</span>K`;
		} else {
			return `Rs<span style="font-size:30px;padding-right: 1px;">${numericValue1}</span>`;
		}
}



	let fchart = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_Valuable_Opportunities_chart",
			callback: function (r) 
			{
				//console.log(r.message)
				let source = [];
				let total = [];

				// Use keys to access data instead of indices
				r.message.forEach((item) => {
					source.push(item.grouped_source);
					total.push(item.total);
				});

				let chart = new frappe.Chart("#frost-chart", {
					data: {
						labels: source,
						datasets: [
							{
								name: "Acquisition source(Current pipeline)",
								chartType: 'bar',
								values: total,
								
							},
						],
						yRegions: [{ label: "", start: 0, end: "",
		              options: {  }}]
					},
					// width:200,
					// type: 'axis-mixed',
			         // height: 200,
					 colors: ['purple'],
					// tooltipOptions: {
					// 	formatTooltipX: d => (d + '').toUpperCase(),
					// 	formatTooltipY: d => d + ' %',
					// }
				});
			}
		});
	}

	// let chart = function () {
	// 	frappe.call({
	// 		method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_converted_quartly",
	// 		callback: function (r) 
	// 		{
	// 			console.log(r.message)
	// 			let month = [];
	// 			let total = [];
	
	// 			// Use keys to access data instead of indices
	// 			r.message.forEach((item) => {
	// 				month.push(item.month);
	// 				total.push(item.total);
	// 			});
	
	// 			let frchart = new frappe.Chart("#chart", {
	// 				data: {
	// 					labels: month,
	// 					datasets: [
	// 						{
	// 							name: "Current pipeline",
	// 							chartType: 'bar',
	// 							values: total,
	// 						},
	// 					],
	// 					yRegions: [
	// 						{
	// 							label: "",
	// 							start: 0,  // Replace with your desired start value in Rs format
	// 							end: 50000, // Replace with your desired end value in Rs format
	// 							options: {
	// 								label_formatter: value => (value / 1000).toFixed(1) + 'K Rs', // Format Y-region labels as Rs valueK
	// 							},
	// 						},
	// 					],
	// 				},
	// 				colors: ['purple'],
	// 				tooltipOptions: {
	// 					formatTooltipX: d => d,
	// 					formatTooltipY: (value, index) => {
	// 						// Format 'total' values as K format
	// 						return (value / 1000).toFixed() + 'K';
	// 					},
	// 				},
	// 			});
	// 		}
	// 	});
	// }
	
	
	// let frappechart = function(){
	// 	let chart = new frappe.Chart( "#frost-chart", { // or DOM element
	// 		data: {
	// 		labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
	// 			"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],

	// 		datasets: [
	// 			{
	// 				name: "Some Data", chartType: 'line',
	// 				values: [25, 40, 30, 35, 8, 52, 17, -4]
	// 			},
	// 			{
	// 				name: "Another Set", chartType: 'line',
	// 				values: [25, 50, -10, 15, 18, 32, 27, 14]
	// 			},
	// 			{
	// 				name: "Yet Another", chartType: 'line',
	// 				values: [15, 20, -3, -15, 58, 12, -17, 37]
	// 			}
	// 		],

	// 		yMarkers: [{ label: "Marker", value: 70,
	// 			options: { labelPos: 'left' }}],
	// 		yRegions: [{ label: "Region", start: -10, end: 50,
	// 			options: { labelPos: 'right' }}]
	// 		},

	// 		title: "Chart",
	// 		type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
	// 		height: 300,
	// 		colors: ['purple', '#ffa3ef', 'light-blue'],

	// 		tooltipOptions: {
	// 			formatTooltipX: d => (d + '').toUpperCase(),
	// 			formatTooltipY: d => d + ' pts',
	// 		}
	// 	  });
	// }

	let chart = function () {
		frappe.call({
			method: "ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_converted_quartly",
			callback: function (r) 
			{
				//console.log(r.message);
				let month = [];
				let total = [];
	
				// Use keys to access data instead of indices
				r.message.forEach((item) => {
					month.push(item.month);
					total.push(item.total);
				});
	
				// Calculate the sum of total values for each three months
				let sumTotal = [];
				for (let i = 0; i < total.length; i += 3) {
					const threeMonthTotal = total.slice(i, i + 3).reduce((acc, val) => acc + val);
					sumTotal.push(threeMonthTotal);
				}
	
				let frchart = new frappe.Chart("#chart", {
					data: {
						labels: month,
						datasets: [
							{
								name: "Current pipeline",
								chartType: 'line',
								values: total,
							},
						],
						yRegions: [
													{
														label: "",
														start: 0,  // Replace with your desired start value in Rs format
														end: 0, // Replace with your desired end value in Rs format
														options: {
															label_formatter: value => (value / 1000).toFixed() + 'K Rs', // Format Y-region labels as Rs valueK
														},
													},
												],
					},
					colors: ['purple'],
					tooltipOptions: {
						formatTooltipX: d => d,
						formatTooltipY: (value, index) => {
							// Format 'total' values as K format
							return (value / 1000).toFixed() + 'K';
						},
					},
				});
	
				// Display the sum in value format
				const sumValue = sumTotal.reduce((acc, val) => acc + val);
				
				// document.getElementById("sum-value").innerText = formatValue(sumValue);
			

				const sumvaluediv = document.getElementById('sum-value');
				sumvaluediv.innerHTML = formatNumber(sumValue);

				//console.log(formatNumber(sumValue))
                // Get a reference to the div element
				const totalAmountDiv = document.getElementById('total-amount-display');
		
			   // Set the innerHTML of the div to display the totalAmount
			   totalAmountDiv.innerHTML = (formatValue(TotalAmt)); 
			  // console.log(formatValue(TotalAmt))
				// Calculate the percentage based on your data

           //  const percentage = (sumValue / TotalAmt ) * 100;
		              //console.log(percentage)
			
					//  const percentage = (200000/ 400000 ) * 100;

            // Display the percentage in your HTML
			const percentageDisplay = document.getElementById('percent');
			const percentage = (sumValue / TotalAmt ) * 100;
		
			
			if (isNaN(percentage)) {
				percentage = 0;
			}
			
			percentageDisplay.textContent = `${percentage.toFixed(2)}%`;
			
			// Update the progress bar width based on the percentage
			const progressBar = document.getElementById('progress-bar');
			progressBar.style.width = `${percentage}%`;

			}
		});
	}
	



	$(frappe.render_template("custom_crm_dashboard", {
		data: ''
	})).appendTo(page.body);

	// frappe.listview_settings['Opportunity'] = {
	// 	button: {
	// 		show: function(doc) {
	// 			return true;
	// 		},
	// 		get_label: function(doc) {
	// 			return __("Comments");
	// 		},
	// 		get_description: function(doc) {
	// 			return __('Show comments of {0}', [doc.name]);
	// 		},
	// 		action: function(doc) {
	// 			get_comments(doc);
	// 		}
	// 	}
	// };
	
	// let get_comments = function(doc) {
	// 	var message_display = "";
	// 	frappe.call({
	// 			method: 'ce_customization.ce_customization.page.custom_crm_dashboard.custom_crm_dashboard.get_comments',
	// 			args: {
	// 				parent_docname: doc.name,  // Pass the name of the parent document
	// 			},
	// 			callback: function(r) {
	// 				if (r.message) {
	// 					console.log(r)
	// 					// Process the data from ChildType here
	// 					var childData = r.message;
	// 					console.log(childData);
	// 					message_display = message_display+ "<div>";
						
	// 					for (var i = 0; i < childData.length; i++) {
	// 						var dt = childData[i];
	// 						message_display = message_display + "<p><b>" + dt.added_on.substring(0,19) + "</b> " + dt.note + "</p>";
	// 					}
						
	// 					message_display = message_display+ "</div>";
						
	// 					frappe.msgprint(message_display, 'Comment list with opportunity (' + doc.name + ')')
						
	// 				}
	// 			}
	// 	});
		
	// };
	
	// Call the function to fetch and display the data
	opportunity_val();
	//total_lead();
	opp_value();
	fchart();
	current_opp();
	newopp();
	count();
	count_change();
	chart();
	//get_comments();

	
	

	// document.querySelector("#referesh").addEventListener('click', () => {
	// 	console.log("referesh clicked")
	// 	total_lead();
	// })

	// let currency = function currency(n) {
	// 	let money = new Intl.NumberFormat('ne-IN', {
	// 		style: 'currency',
	// 		currency: 'NPR'
	// 	}).format(n);
	// 	return money;
	// }
	// let currency = function formatCurrencyInRS(n) {
	// 	let formatter = new Intl.NumberFormat('en-US', {
	// 		style: 'currency',
	// 		currency: 'NPR',
	// 		currencyDisplay: 'code',
	// 		minimumFractionDigits: 0, // Ensure no decimal places
	// 		maximumFractionDigits: 0  // Ensure no decimal places
	// 	});
	// 	if (n >= 1000) {
	// 		const abbreviatedValue = (n / 1000).toFixed(1) + 'K'; // Abbreviate thousands as "K"
	// 		formattedValue = `<span style="font-size: 18px; color: blue;">RS</span> <span style="font-size: 24px; color: red;">${abbreviatedValue}</span>`;
	// 	}
	// 	let formattedValue = formatter.format(n).replace('NPR', 'Rs');
	// 	return formattedValue;
	// 	document.getElementById('output').innerHTML = formattedAmount;
	// }
};