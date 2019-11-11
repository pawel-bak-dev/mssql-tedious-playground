# mssql-tedious testing project

## Setting up docker 
Download ms sql server image
```.bash
docker pull mcr.microsoft.com/mssql/server:2017-latest
```

Run docker image with assigne params and mounting directory
```.bash
docker run -v /Volumes/Data/developer/mssql-tedious/database:/database -e "ACCEPT_EULA=Y" -e 'MSSQL_PID=Express' -e "SA_PASSWORD=Test-123" -p 1400:1433 --name mssql_tedious -d mcr.microsoft.com/mssql/server:2017-latest
```

Get inside container 
```.bash
docker exec -it mssql_tedious bash
```

first connection to database 
```.bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Test-123"
```

mssql setup command
```sql
CREATE DATABASE testing
GO
USE testing
GO 
CREATE LOGIN admin WITH PASSWORD = 'Admin-123'
GO
CREATE USER admin FOR LOGIN admin
GO
GRANT CREATE TABLE, SELECT, INSERT, UPDATE, DELETE TO admin
GO
```

second connection to database with sql script 
```.bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U admin -P "Admin-123" -d testing -i ./database/script.sql
```