import random

def get_random_elements(lst, n):
    return random.sample(lst, n)

dailyTasks=[
    {"task_id": "D001", "name_en": "Paraphrase Oracle", "name_zh": "释义神谕", "description_en": "15 minutes of Paraphrase practice", "description_zh": "练习Paraphrase 15分钟", "exp": 5},
    {"task_id": "D002", "name_en": "Seque Sorcery", "name_zh": "顺接巫术", "description_en": "15 minutes of Seque practice", "description_zh": "练习Seque 15分钟", "exp": 5},
    {"task_id": "D003", "name_en": "Bilingual Bifrost", "name_zh": "双语虹桥", "description_en": "15 minutes of Zh-En practice", "description_zh": "练习Zh-En 15分钟", "exp": 5},
    {"task_id": "D004", "name_en": "Conversation Codex", "name_zh": "呢喃法典", "description_en": "15 minutes of Conversation practice", "description_zh": "练习Conversation 15分钟", "exp": 5},
]

weeklyTasks=[
    {"task_id": "W000", "name_en": "Week of the Phoenix", "name_zh": "凤凰之周", "description_en": "Practicing every day of the week", "description_zh": "一周每天都练习过", "exp": 30},
    {"task_id": "W001", "name_en": "Gauntlet of the Griffin", "name_zh": "狮鹫试炼", "description_en": "Completing all daily tasks in a week", "description_zh": "完成一周所有的每日任务", "exp": 100},
]

achievement=[
    {"task_id": "A000", "name_en": "Ember's Persistence", "name_zh": "余烬的坚持", "description_en": "30 days of accumulated usage", "description_zh": "累计使用30天", "exp": 30},
    {"task_id": "A001", "name_en": "Stone's Endurance", "name_zh": "石头的耐力", "description_en": "100 days of accumulated usage", "description_zh": "累计使用100天", "exp": 100},
    {"task_id": "A002", "name_en": "River's Tenacity", "name_zh": "河流的韧性", "description_en": "300 days of accumulated usage", "description_zh": "累计使用300天", "exp": 300},
    {"task_id": "A003", "name_en": "Mountain's Fortitude", "name_zh": "山峰的坚韧", "description_en": "1000 days of accumulated usage", "description_zh": "累计使用1000天", "exp": 1000},
]

def generate_daily_tasks(n):
    #daily_tasks = [{"task_id": "D000", "name_en": "Dawn's Blessing", "name_zh": "黎明祝福", "description_en": "First practice of the day", "description_zh": "每日第一次练习", "exp": 5}]
    #return daily_tasks + get_random_elements(dailyTasks, n)
    return get_random_elements(dailyTasks, n)

def generate_weekly_tasks():
    return weeklyTasks