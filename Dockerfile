FROM mcr.microsoft.com/dotnet/sdk:7.0




RUN apt update

# instal iputils for ping 
RUN apt install iputils-ping -y

WORKDIR /srv/


COPY ./backend/ /srv/

# run dotnet run in the backend/Server folder
CMD ["dotnet", "run", "--project", "Server/Server.csproj"]
