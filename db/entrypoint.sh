#!/bin/bash
/opt/mssql/bin/sqlservr &
/usr/db/dbconf.sh
eval $1
