import frappe

# @frappe.whitelist()
# def get_total_leads():
#     total_lead = frappe.db.sql("""SELECT COUNT(*) AS total_lead FROM `tabLead`""", as_dict=True)[0].total_lead
#     return total_lead 


@frappe.whitelist()
def get_Valuable_Opportunities():
    oppprtunity_value = frappe.db.sql("""SELECT customer_name, custom_total_amt, probability FROM `tabOpportunity`
     ORDER BY custom_total_amt DESC;""", as_dict=True)
    return oppprtunity_value 


@frappe.whitelist()
def get_Valuable_Opportunities_chart():
    oppprtunity_value_chart = frappe.db.sql("""SELECT
    CASE
        WHEN rank <= 4 THEN source
        ELSE 'Other'
    END AS grouped_source,
    SUM(total) AS total
FROM (
    SELECT source, COUNT(source) AS total,
        DENSE_RANK() OVER (ORDER BY COUNT(source) DESC) AS rank
    FROM tabOpportunity
    GROUP BY source
) AS ranked_sources
GROUP BY grouped_source
ORDER BY total DESC;
""", as_dict=True)
    return oppprtunity_value_chart  

@frappe.whitelist()
def get_pipeline_value():
    pipelinevalue = frappe.db.sql("""SELECT probability, SUM(custom_total_amt) AS total_amount FROM tabOpportunity GROUP BY probability""", as_dict=True)
    return pipelinevalue  

@frappe.whitelist()
def get_curr_opp():
    currentopportunity = frappe.db.sql("""SELECT probability, COUNT(*) AS opportunity_count FROM `tabOpportunity` GROUP BY probability;""", as_dict=True)
    return currentopportunity  

@frappe.whitelist()
def get_New_opp():
    newopportunity = frappe.db.sql("""SELECT customer_name, custom_total_amt FROM `tabOpportunity` ORDER BY creation DESC LIMIT 5;""", as_dict=True)
    return newopportunity


@frappe.whitelist()
def get_opp_this_month():
    oppthismonth = frappe.db.sql("""SELECT COUNT(*) AS opportunity_count FROM `tabOpportunity`
    WHERE DATE_FORMAT(creation, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m');""", as_dict=True)
    return oppthismonth

@frappe.whitelist()
def get_change_in_count():
    countchange = frappe.db.sql("""SELECT
  CASE
    WHEN last_month_count = 0 THEN 100.0
    ELSE ((this_month_count - last_month_count) / last_month_count) * 100.0
  END AS percentage_change
FROM (
  SELECT COUNT(*) AS this_month_count
  FROM `tabOpportunity`
  WHERE YEAR(creation) = YEAR(CURRENT_DATE)
    AND MONTH(creation) = MONTH(CURRENT_DATE)
) AS this_month,
(
  SELECT COUNT(*) AS last_month_count
  FROM `tabOpportunity`
  WHERE YEAR(creation) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
    AND MONTH(creation) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)
) AS last_month;""", as_dict=True)
    return countchange


@frappe.whitelist()
def get_converted_quartly():
    convertedquartly = frappe.db.sql("""SELECT
    DATE_FORMAT(creation, '%M') AS month,
    sum(custom_total_amt) as total
FROM `tabOpportunity`
WHERE status = 'closed'
    AND creation >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
GROUP BY DATE_FORMAT(creation, '%M')
ORDER BY month(creation);""", as_dict=True)
    return convertedquartly



# @frappe.whitelist()
# def get_comments():
#     parent_docname = frappe.form_dict.parent_docname
#     data = frappe.get_list('CRM Note', filters={'parent': parent_docname}, fields=['note', 'added_on'], order_by='added_on asc')
#     frappe.response['message'] = data

