FROM mcr.microsoft.com/mssql/server

USER root
RUN mkdir -p /usr/db
WORKDIR /usr/db

COPY . /usr/db

# Grant permissions for to our scripts to be executable
RUN chmod +x /usr/db/entrypoint.sh
RUN chmod +x /usr/db/dbconf.sh

ENTRYPOINT ["./entrypoint.sh"]

# Tail the setup logs to trap the process
CMD ["tail -f /dev/null"]

HEALTHCHECK --interval=15s CMD /opt/mssql-tools/bin/sqlcmd -U sa -P $SA_PASSWORD -Q "select 1" && grep -q "MSSQL CONFIG COMPLETE" ./config.log
