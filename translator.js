console.log("google translator")
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

let selectTags=document.querySelectorAll('select')
let transButt=document.getElementById('transButt')
let Copyicon=document.getElementsByClassName('fa-clone')
let Volumeicon=document.getElementsByClassName('fa-volume-up')
let fromText=document.getElementById('from-text')
let toText=document.getElementById('to-text')
let Alert=document.getElementById('Alert')


selectTags.forEach((tag,index) =>{
    for (const country_code in countries) {
        let selected;
        if(index==0 && country_code=="en-GB"){
            selected='selected';
        }
        else if(index==1&&country_code=="hi-IN"){
            selected='selected';
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option);
    }
})

function Translate() {
    let text=fromText.value
    let url=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${selectTags[0].value}|${selectTags[1].value}`
    transButt.innerText="Translating......."
    fetch(url).then((res) => {
        return res.json()
    }).then((data) =>{
        transButt.innerText="Translate"
        let translatedText=data.responseData.translatedText
        toText.value=translatedText
    })
    
}

for (const icon of Copyicon) {
    icon.addEventListener("click",CopyText)
}

for (const icon of Volumeicon) {
    icon.addEventListener("click",SpeakText)
}

function CopyText(event) {
    let icon=event.target
    if(icon.id==="copy-fromtext"){
        navigator.clipboard.writeText(fromText.value)
    }
    else{
        navigator.clipboard.writeText(toText.value)
    }
    Alert.style.display="block"
        setTimeout(() => {
            Alert.style.display="none" 
        }, 1500);
}

function SpeakText(event) {
    let icon=event.target
    let utterance;
    if(icon.id==="fromtext-volume"){
        utterance=new SpeechSynthesisUtterance(fromText.value)
        utterance.lang=selectTags[0].value
    }
    else{
        utterance=new SpeechSynthesisUtterance(toText.value)
        utterance.lang=selectTags[1].value
    }
    speechSynthesis.speak(utterance)
}

function Exchange() {
    let text=fromText.value
    fromText.value=toText.value
    toText.value=text
}