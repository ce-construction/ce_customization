# Copyright (c) 2023, ce construction and contributors
# For license information, please see license.txt

import frappe

def get_context(context):
    context.name = "Prasant"
    return context

def execute(filters=None):
	#if not filters: filters = {}

	# message = [
    # "'<b>Filter</b>' is <span style='color:Red;'>not working</span>",
   
#]

	return get_columns(), get_data(filters), #message
   

# 	query = """
#     SELECT
# 	    so.name AS my_id,
#         so.user_name,
#         so.subject,
#         so.department,
#         si.item_code
#     FROM
#         `tabIssue` AS so
#     LEFT JOIN
#         `tabSupport Item` AS si
#     ON
#         so.name = si.parent
	
# """

	#data = get_all_data_from_list("Issue")
	# data2 = get_child_table_data("Support Item")
	#data = frappe.db.sql(query, as_dict=True)
	
	#return columns, data
	# if not cs_data:
	# 	msgprint(_('no record found'))
	# 	return columns, cs_data
	# #return columns, data
	# data = []

def get_data(filters):
    print(f"\n\n{filters}\n\n")
   # _from, to = filters.get('from'), filters.get('to')

    #conditions = " WHERE creation BETWEEN '" + filters_from+ "' AND '" + filters.to+ "'"
    from_date = filters.get('_from')
    to_date = filters.get('to') 
  
   # particular_item = filters.get('item_name_')

    sql_query = """
 WITH CTENote (name,resolution_date,nepali_miti,item_name_,quantity,site,custom_item_used_from_site,user_name,closed_by,subject) AS (
    SELECT so.name, DATE(so.resolution_date) as resolution_date, sa.nepali_miti ,CONCAT(si.item_name_ ,CASE WHEN si.type = 'old' THEN CONCAT(' (', si.type, ')') ELSE '' END) as item_name_,si.quantity as quantity,CONCAT(so.site ,CASE WHEN so.department IS NOT NULL THEN CONCAT(' - ', so.department) ELSE '' END) as site,so.custom_item_used_from_site as custom_item_used_from_site,so.user_name, so.closed_by,so.subject 
    FROM `tabIssue` AS so 
    JOIN `tabSupport Item` AS si ON so.name = si.parent
    JOIN `tabDateMiti` AS sa ON DATE(so.resolution_date) = sa.date

    UNION

    SELECT so.name, so.date_ as resolution_date, sa.nepali_miti , CONCAT(si.particular ,CASE WHEN si.item_status_ = 'old' THEN CONCAT(' (', si.item_status_, ')') ELSE '' END) as item_name_,si.quantity_ as quantity,CONCAT(so.from_," To ",so.to_) as site,so.from_ as custom_item_used_from_site,si.user_name_ as user_name,so.prepared_by as closed_by,CONCAT("Challan No: ", CAST(so.challan AS CHAR), ' ' ,IFNULL(si.remarks_, ''))as subject 
    FROM `tabChallan` as so 
    JOIN `tabIT Stock` AS si ON so.name = si.parent
    JOIN `tabDateMiti` AS sa ON so.date_ = sa.date
    WHERE so.checked_by != ''
    )
    SELECT * FROM CTENote 
    WHERE {from_filter}
    {to_filter}
    """
    from_filter = ""
    to_filter = ""
    # site_filter = ""
    
    

    if from_date:
        from_filter = f" (DATE(resolution_date) >= '{from_date}')"

    if to_date:
        to_filter = f" AND (DATE(resolution_date) <= '{to_date}')"

    # if site_filter:
    #     to_filter = f" AND site_single like '%{site_filter}%')"
    
    # if particular_item:
    #     particular = f" AND '{particular_item}'"
    # Insert the 'from_filter' and 'to_filter' into the SQL query
    sql_query = sql_query.format(from_filter=from_filter, to_filter=to_filter)

    filter_condition = ""

    for fieldname, value in filters.items():
        if fieldname not in ['_from', 'to']:
        # Build a list of additional filter conditions
            filter_condition += f" AND {fieldname} like '{value}%'"
            sql_query += filter_condition
        else:
            pass
        #if fieldname == '_from':
        #     pass
        # elif fieldname == 'to':
        #     pass
        # else:
        #     fieldname += f" AND {fieldname} = '{value}'"
            #print(sql_query)
#    # if filters.get('subject'): conditions += f" AND subject='{filters.get('subject')}' "
    #additional_filters_str = " AND ".join(additional_filters)  
   # sql_query +=  fieldname
    sql_query +=  " ORDER BY resolution_date DESC"
#     #print(f"\n\n{conditions}\n\n")
    all_data = frappe.db.sql(sql_query)

    return all_data 

def get_columns():
	return[
        {
            'fieldname': 'name',
            'label': ('<span style="color: blue;">ID</span>'),
            'fieldtype': 'Data',
            #'options':"Issue",         
			'width':'130',
            'style': 'background-color: yellow; color: black;'
           
            
        },
        {
			'fieldname': 'resolution_date',
            'label': ('Date (A.D)'),
            'fieldtype': 'Date',
            'width':'110'
        },
          {
			'fieldname': 'nepali_miti',
            'label': ('Date (B.S)'),
            'fieldtype': 'Data',
            'width':'110'
        },
        {
			'fieldname': 'item_name_',
            'label': ('Particulars'),
            'fieldtype': 'Data',
            'align':'left',
			'width':'120'
        },
        {
			'fieldname': 'quantity',
            'label': ('Quantity'),
            'fieldtype': 'Float',
            #'align':'left',
			'width':'90'
        },
        
        {
			'fieldname': 'site',
            'label': ('Site/Department'),
            'fieldtype': 'Link',
        	'options': 'Branch',
            'align':'left',
			'width':'130'
        },
        {
			'fieldname': 'custom_item_used_from_site',
            'label': ('Item Used Site'),
            'fieldtype': 'Link',
        	'options': 'Branch',
            'align':'left',
			'width':'130'
        },
		{
            'fieldname': 'user_name',
            'label': ('User name'),
            'fieldtype': 'Data',
			'width':'120',
            'align':'left',
            #'options': 'Account'
        },
        # {
		# 	'fieldname': 'department',
        #     'label': ('Department'),
        #     'fieldtype': 'Link',
        # 	'options': 'Department',
        #     'align':'left',
		# 	'width':'120'
        # },
        {
			'fieldname': 'closed_by',
            'label': ('Entered By'),
            'fieldtype': 'Data',
			'width':'120',
            'align':'left'
            #'options': 'Account'
        },
      
        {
			'fieldname': 'subject',
            'label': ('Remarks'),
            'fieldtype': 'Data',
			'width':'120',
            'align':'left'
            #'options': 'Account'
        },
		# {
		# 	'fieldname': 'starting_date',
        #     'label': ('Starting Date'),
        #     'fieldtype': 'Datetime',
		# 	'width':'120'
        #     #'options': 'Account'
        # },
		# {
		# 	'fieldname': 'resolution_date',
        #     'label': ('Resolution Date'),
        #     'fieldtype': 'Datetime',
		# 	'width':'120'
        #     #'options': 'Account'
        # },
        # {
		# 	'fieldname': 'item_code',
        #     'label': ('Item Code'),
        #     'fieldtype': 'Link',
        #     'options': 'Item',
        #     'align':'left',
		# 	'width':'90'
        # },
      
        # {
		# 	'fieldname': 'type',
        #     'label': ('Status'),
        #     'fieldtype': 'Select',
        #     'align':'left',
		# 	'width':'120'
        # },
       
        # {
		# 	'fieldname': 'rate',
        #     'label': ('Rate'),
        #     'fieldtype': 'Currency',
        #     #'align':'left',
		# 	'width':'90'
        # },
        # {
		# 	'fieldname': 'amount',
        #     'label': ('Amount'),
        #     'fieldtype': 'Currency',
        #     #'align':'left',
		# 	'width':'90'
        # }
     
	]

# def get_cs_data(filters):

# 	data = frappe.get_all(
# 		doctype = 'Issue',
# 		fields = ['user_name', 'department','subject'],
# 		order_by = 'user_name desc'
# 	)
# 	return data


# def get_all_data_from_list(doctype):
#    data_all = frappe.get_all(doctype, fields=["subject", "department","item.item_code","item.item_name_"])
#    return data_all


# def get_child_table_data(parent_name):
#     # Fetch the child table records related to the parent record
#     child_records = frappe.get_all(parent_name, fields=["item_code"])
#     return child_records
