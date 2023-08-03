export const calculateExpZh = (exp) => {
    if(exp < 180) {
        return "新手"
    }
    else if(exp < 600) {
        return "学徒"
    }
    else if(exp < 1800) {
        return "熟手"
    }
    else if(exp < 3600) {
        return "精通"
    }
    else if(exp < 6000) {
        return "老手"
    }
    else if(exp < 9000) {
        return "精英"
    }
    else if(exp < 18000) {
        return "冠军"
    }
    else if(exp < 30000) {
        return "大师"
    }
    else if(exp < 48000) {
        return "宗师"
    }
    else if(exp < 72000) {
        return "英雄"
    }
    else if(exp < 120000) {
        return "传奇"
    }
    else if(exp < 192000) {
        return "半神"
    }
    else if(exp < 300000) {
        return "神话"
    }
    else if(exp < 600000) {
        return "神圣"
    }
    else {
        return "永恒"
    }
}

export const calculateExpEn = (exp) => {
    if(exp < 180) {
        return "Novice"
    }
    else if(exp < 600) {
        return "Apprentice"
    }
    else if(exp < 1800) {
        return "Journeyman"
    }
    else if(exp < 3600) {
        return "Adept"
    }
    else if(exp < 6000) {
        return "Veteran"
    }
    else if(exp < 9000) {
        return "Elite"
    }
    else if(exp < 18000) {
        return "Champion"
    }
    else if(exp < 30000) {
        return "Master"
    }
    else if(exp < 48000) {
        return "Grandmaster"
    }
    else if(exp < 72000) {
        return "Hero"
    }
    else if(exp < 120000) {
        return "Legend"
    }
    else if(exp < 192000) {
        return "Demigod"
    }
    else if(exp < 300000) {
        return "Mythic"
    }
    else if(exp < 600000) {
        return "Divine"
    }
    else {
        return "Eternal"
    }
}