
import os
import uuid
from datetime import timedelta 

# ----------------------------------------------------------------------------
# enumerations
# ----------------------------------------------------------------------------
PRODUCT_CATEGORY = {
    1: 'Chicken Meals',
    2: 'Drinks', 
    3: 'Meals',
    4: 'Pasteries',
    5: 'Extras',
}

ORDER_STATUS = {
    0 : 'Done',
    1 : 'Pending',
    2 : 'Cancelled'
}

ORDER_TYPE = {
    0 : 'DINE IN',
    1 : 'TAKE OUT'
}

DRINK_SIZE = {
    0 : '8 OZ',
    1 : '12 OZ',
    2 : '16 OZ',
}

DRINK_TYPE = {
    0 : 'HOT',
    1 : 'COLD'
}

EMPLOYEE_POSITION = {
    0 : 'EXECUTIVE',
    1 : 'MANAGER',
    2 : 'CASHIER',
    3 : 'STAFF'
}


# ----------------------------------------------------------------------------
# table definitions
# ----------------------------------------------------------------------------

# ----------------------------------------------------------------------------
# PRODUCTS
# ----------------------------------------------------------------------------
db.define_table('product',
    Field('uuid',length=64,default=str(uuid.uuid4()).upper(), hidden=True,readable=True,writable=True),
    Field('name','string',length=64,requires=IS_NOT_EMPTY(),required=True,label=T('Product Name')),
    Field('description','string', length=128,label=T('Product Description')),
    Field('category','integer',requires=IS_IN_SET(PRODUCT_CATEGORY),default=1,required=True,label=T('Product Category')),
    Field('variety','integer',requires=IS_EMPTY_OR(IS_IN_SET(DRINK_TYPE)),label=T('Product Variety')),
    Field('product_size','integer',requires=IS_EMPTY_OR(IS_IN_SET(DRINK_SIZE)),label=T('Product Variety')),
    Field('price','float',requires=IS_NOT_EMPTY(),default=0,required=True,label=T('Product Price')),
    Field('product_image','upload',uploadfolder=os.path.join(request.folder, 'static', 'uploads'),label=T('Product Image')),
    
    # Field('stock_quantity','integer',requires=IS_NOT_EMPTY(),default=0,required=True,label=T('Product Stock Quantity')),
    primarykey=['uuid'],
)