# Create a migration
# Usage: createMigration.sh <migration name>

# Get the migration name
if [ -z "$1" ]; then
    echo "Usage createMigration.sh <migration name>"
    exit 1
fi

# Create the migration
ASPNETCORE_ENVIRONMENT='Production' dotnet ef migrations add $1 --project DataAccess --startup-project Server
