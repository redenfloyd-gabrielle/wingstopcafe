import json

# response.view = 'generic.json' 

response.headers['Content-Type'] = 'application/json; charset=utf-8'
response.headers['Access-Control-Allow-Origin'] = 'locahost:8888'
response.headers['Access-Control-Max-Age'] = 86400
response.headers['Access-Control-Allow-Headers'] = 'Origin'
response.headers['Access-Control-Allow-Methods'] = ['GET','POST','PUT','OPTIONS','DELETE']
response.headers['Access-Control-Allow-Credentials'] = 'true'
response.headers['Access-Control-Allow-Headers'] = "Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, Accept-Encoding"

plurals = {
    'products':'product',
    'orders':'orders',
    'order-items' : 'order_item',
    'employees' : 'employee',
    'tokens' : 'token',
    'patterns' : 'patterns',
}

def index():
    redirect('v1')

def valid_api_key(app_key=None):
    # no need for API key if localhost
    return True
    if request.env.HTTP_HOST in ['localhost','rev-kitten.com'] : return True

    # do check if the api_key exist in the api_sec table if yes return true, else false
    if app_key==None:
        if request.env.HTTP_APPKEY:
            app_key = request.env.HTTP_APPKEY
        elif request.env.HTTP_AUTHORIZATION:
            app_key = request.env.HTTP_AUTHORIZATION
        else:
            return False
    
    domain=request.env.HTTP_HOST

    aps = db.api_security
    query = aps.api_key == app_key
    query &= aps.client_domain.contains(domain)
    result = db(query).count()

    
    logger.info("--> API REQUEST: {0}, {1}, {2}".format(app_key,domain,result))

    if result:
        return True
    else: 
        logger.warning('====> WARNING: INVALID API_KEY REQUESTED <=== {0}, {1}'.format(domain,app_key))
        return False

    

@request.restful()
def v1():
    response.view = 'generic.json' 

    # allow CORS
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = "POST,GET,OPTIONS,PUT,DELETE"
    response.headers['Access-Control-Allow-Credentials'] = "true"
    response.headers['Access-Control-Allow-Headers'] = "Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, Accept-Encoding"

    # @auth.requires(valid_api_key(), requires_login=False)      
    def GET(*args, **vars):

        logger.info('args: {0} , vars: {1}'.format(args,vars))

        if len(args) == 0: 
            # response.status = 400
            return dict(status='fail',message='No matching pattern or missing parameters')

        if len(args)>0 and args[0] not in plurals.keys():
            return dict(status="fail",data='no matching pattern, use plural')

        # map plurals to table
        if len(args)>0 and args[0] in  plurals.keys():
            t  = tuple([plurals[a] if a.replace('_','-') in plurals.keys() else a  for a in args])
            args = t

        # use pre defined patterns
        patterns = 'auto'

        parser = db.parse_as_rest(patterns, args, vars)

        if parser.status == 200:
            return dict(status="success",data=parser.response)
        else:
            return dict(status="fail",data=parser.error)

        return dict(status='fail')

    def POST(table_name,*args, **vars):
            response.view = 'generic.json'

            if len(args)>0 and args[0] not in plurals.keys():
                return dict(status="fail",data='no matching pattern, use plural')

            if table_name in plurals.keys():
                table_name = plurals[table_name].replace('_','-')
            
            # check id if included in parameters
            id = int(vars['id'] or 0) if 'id' in vars else 0

            try:
                if id > 0: 
                    result = db(db[table_name].id == id).validate_and_update(**vars)
                    if 'updated' in result:
                        return dict(status="success", data=result)
                    else:
                        return dict(status="fail", data=result)
                else:
                    result = db[table_name].validate_and_insert(**vars)
                    if 'id' in result and result['id']:
                        return dict(status="success", data=result)
                    else:
                        return dict(status="fail", data=result)
            except Exception as e:
                return dict(status="fail", message=T('DATABASE ERROR'),error=str(e))
            except:
                return dict(status="fail", message=T('SERVER OR DATABASE ERROR'))

    return locals() #do not remove this

@request.restful()
def cas(): 
    '''
    CAS REST protocol

    api/cas/validate
    api/cas/tickets
    api/cas/users

    '''
    return locals() #do not remove this

