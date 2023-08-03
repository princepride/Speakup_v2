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
        return {title:"Novice", expNeed:180}
    }
    else if(exp < 600) {
        return {title:"Apprentice", expNeed:600}
    }
    else if(exp < 1800) {
        return {title:"Journeyman", expNeed:1800}
    }
    else if(exp < 3600) {
        return {title:"Adept", expNeed:3600}
    }
    else if(exp < 6000) {
        return {title:"Veteran", expNeed:6000}
    }
    else if(exp < 9000) {
        return {title:"Elite", expNeed:9000}
    }
    else if(exp < 18000) {
        return {title:"Champion", expNeed:18000}
    }
    else if(exp < 30000) {
        return {title:"Master", expNeed:30000}
    }
    else if(exp < 48000) {
        return {title:"Grandmaster", expNeed:48000}
    }
    else if(exp < 72000) {
        return {title:"Hero", expNeed:72000}
    }
    else if(exp < 120000) {
        return {title:"Legend", expNeed:120000}
    }
    else if(exp < 192000) {
        return {title:"Demigod", expNeed:192000}
    }
    else if(exp < 300000) {
        return {title:"Mythic", expNeed:300000}
    }
    else if(exp < 600000) {
        return {title:"Divine", expNeed:600000}
    }
    else {
        return {title:"Eternal", expNeed:Infinity}
    }
}