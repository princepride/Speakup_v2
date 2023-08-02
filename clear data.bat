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
sqlite3 db.sqlite3 "DELETE FROM base_bookmark;"

echo 数据已删除。

rem 删除videos和media文件夹中的所有内容
del /S /Q "%server_dir%\videos\*"
del /S /Q "%server_dir%\media\*"

echo videos和media文件夹已清空。
