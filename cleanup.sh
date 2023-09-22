#!/bin/bash

# 获取当前脚本的目录路径
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 构建server目录的完整路径
server_dir="$script_dir/server"

# 更改当前目录到server目录
cd "$server_dir"

# 删除db.sqlite3中的表中的所有数据
sqlite3 db.sqlite3 "DELETE FROM base_record;"
sqlite3 db.sqlite3 "DELETE FROM base_evaluation;"
sqlite3 db.sqlite3 "DELETE FROM base_subsubtitle;"
sqlite3 db.sqlite3 "DELETE FROM base_youtube;"
sqlite3 db.sqlite3 "DELETE FROM base_bookmark;"
sqlite3 db.sqlite3 "DELETE FROM base_dailytask;"
sqlite3 db.sqlite3 "DELETE FROM base_weeklytask;"

echo "数据已删除。"

# 删除videos和media文件夹中的所有内容
rm -rf "$server_dir/videos/*"

echo "videos和media文件夹已清空。"
