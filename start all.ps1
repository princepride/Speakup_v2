# 运行 ngrok
$ngrokProcess = Start-Process "ngrok" -ArgumentList "start --all" -NoNewWindow -PassThru

# 延迟以确保 ngrok 完全启动
Start-Sleep -Seconds 3

# 获取 ngrok 地址
$tunnels = Invoke-RestMethod http://localhost:4040/api/tunnels | Select-Object -ExpandProperty tunnels | Select-Object -Property public_url, config

# 初始化 URL 变量
$ngrokUrl3000 = $null
$ngrokUrl8000 = $null

# 检查每个隧道，确定映射的本地端口，并设置对应的 URL 变量
foreach ($tunnel in $tunnels) {
    if ($tunnel.config.addr -eq 'http://localhost:3000') {
        $ngrokUrl3000 = $tunnel.public_url
    } elseif ($tunnel.config.addr -eq 'http://localhost:8000') {
        $ngrokUrl8000 = $tunnel.public_url
    }
}

# 替换 .env 文件中的值
$envFile = Get-Content -Path '.\client\.env'
$envFile = $envFile | ForEach-Object {
    if ($_ -match '^REACT_APP_BACKEND_URL=') {
        "REACT_APP_BACKEND_URL=$ngrokUrl8000"
    } else {
        $_
    }
}
$envFile | Set-Content -Path '.\client\.env'

# 读取 config.json 文件
$config = Get-Content -Path '.\server\config.json' | ConvertFrom-Json

# 替换 config.json 文件中的值
$config.NGROK = $ngrokUrl3000

# 将更改后的对象转换回 json 并写入文件
$config | ConvertTo-Json -Depth 20 | Set-Content '.\server\config.json'

# 运行 start.bat
Start-Process -NoNewWindow '.\start.bat'

Wait-Process -InputObject $ngrokProcess
