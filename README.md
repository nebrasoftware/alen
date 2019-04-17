```
pipenv shell
export FLASK_DEBUG=true
export FLASK_ENV=development
export FLASK_APP=run.py

flask run


###Solución mysqlclient en mac

1. brew install mysql-connector-c
2. editar mysql_config (localizarlo: which mysql_config)
3. corrige esto en mysql_config:

# Create options 
libs="-L$pkglibdir"
libs="$libs -l "

Debería ser:

# Create options 
libs="-L$pkglibdir"
libs="$libs -lmysqlclient -lssl -lcrypto"

4. brew info openssl
```