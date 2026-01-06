# Check and create .env files
$env_auth_path = "apps/auth-service/.env"
$env_order_path = "apps/order-service/.env"

if (-not (Test-Path $env_auth_path)) {
    Write-Host "Creating auth-service .env..."
    Set-Content -Path $env_auth_path -Value "DATABASE_URL=`"postgresql://admin:password@localhost:5432/eshop_db?schema=auth`"`nJWT_SECRET=`"supersecret`""
}

if (-not (Test-Path $env_order_path)) {
    Write-Host "Creating order-service .env..."
    Set-Content -Path $env_order_path -Value "DATABASE_URL=`"postgresql://admin:password@localhost:5432/eshop_db?schema=orders`""
}

# Run Docker
Write-Host "Pulling Docker images (this requires internet)..."
docker-compose pull
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Docker pull failed. If you have no internet but images are cached, this might still work. Proceeding..."
}

Write-Host "Starting Docker containers..."
docker-compose up -d

# Wait for DB
Write-Host "Waiting for database to be ready (10s)..."
Start-Sleep -Seconds 10

# Push Schema
Write-Host "Pushing Auth Service schema..."
npx prisma db push --schema=apps/auth-service/prisma/schema.prisma

Write-Host "Pushing Order Service schema..."
npx prisma db push --schema=apps/order-service/prisma/schema.prisma

Write-Host "Setup complete! You can now run the apps via VS Code 'Run and Debug' or 'npx nx run-many ...'"
