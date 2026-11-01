
# Etapa 1: Compilar la API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Copiar los archivos del proyecto
COPY . .

# Restaurar dependencias
RUN dotnet restore ClientesAPI.csproj

# Publicar la aplicación
RUN dotnet publish ClientesAPI.csproj -c Release -o /app/publish --no-restore

# Etapa 2: Ejecutar la API
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ClientesAPI.dll"]
