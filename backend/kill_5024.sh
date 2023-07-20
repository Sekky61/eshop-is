# Kills processes that are using port 5024
# Needs sudo privileges

# if not root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

kill -9 `sudo lsof -t -i:5024`