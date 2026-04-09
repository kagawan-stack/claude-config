cd "C:\Users\user\claude-config"
git add .
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Auto backup $timestamp"
git push
