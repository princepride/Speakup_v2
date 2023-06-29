@echo off

rem 获取当前脚本的目录路径
set "script_dir=%~dp0"

rem 构建server目录的完整路径
set "server_dir=%script_dir%server"

rem 更改当前目录到server目录
cd /d "%server_dir%"

rem 删除db.sqlite3中的表中的所有数据
sqlite3 db.sqlite3 "DELETE FROM base_record;"
sqlite3 db.sqlite3 "DELETE FROM base_evaluation;"
sqlite3 db.sqlite3 "DELETE FROM base_subsubtitle;"
sqlite3 db.sqlite3 "DELETE FROM base_youtube;"

echo 数据已删除。