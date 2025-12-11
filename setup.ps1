# FreshChain Setup Script
# Run this script to install all dependencies

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  FreshChain - Installation Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Installing Backend Dependencies" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies
Write-Host "Installing Hardhat and blockchain dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Installing Frontend Dependencies" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Install frontend dependencies
Write-Host "Installing React and frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setting Up Environment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path .env) {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
} else {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ .env file created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env file with your credentials:" -ForegroundColor Yellow
    Write-Host "   - SEPOLIA_RPC_URL (from Alchemy)" -ForegroundColor Yellow
    Write-Host "   - PRIVATE_KEY (from MetaMask)" -ForegroundColor Yellow
    Write-Host "   - ETHERSCAN_API_KEY (optional)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Compiling Smart Contracts" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Compiling FreshChain contract..." -ForegroundColor Yellow
npx hardhat compile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Smart contracts compiled successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to compile smart contracts!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Running Tests" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Running contract tests..." -ForegroundColor Yellow
npx hardhat test

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed. Please review the output." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Installation Complete!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Edit .env file with your credentials" -ForegroundColor White
Write-Host "   - Get Sepolia RPC URL from: https://www.alchemy.com/" -ForegroundColor Gray
Write-Host "   - Get your MetaMask private key" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy to Sepolia testnet:" -ForegroundColor White
Write-Host "   npx hardhat run scripts/deploy.js --network sepolia" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Update frontend/src/config.js with contract address" -ForegroundColor White
Write-Host ""
Write-Host "4. Start the frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Get Sepolia testnet ETH from:" -ForegroundColor White
Write-Host "   https://sepoliafaucet.com/" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, read:" -ForegroundColor White
Write-Host "   - README.md (full documentation)" -ForegroundColor Cyan
Write-Host "   - QUICKSTART.md (quick guide)" -ForegroundColor Cyan
Write-Host "   - PROJECT_REPORT.md (technical report)" -ForegroundColor Cyan
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
