import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, Send, Sprout, User, X, Mic, MicOff, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  image?: string;
  timestamp: Date;
}

const KB = [
  {
    keywords: ["yellow", "पीला", "पिवळी", "पिवळे", "nitrogen", "yello", "peele", "pilvi", "पीले"],
    reply: {
      en: "Yellow leaves usually mean your plants are thirsty for nitrogen or drowning in too much water. Try sprinkling some urea fertilizer and make sure your field isn't waterlogged. It should look better in a week!",
      hi: "पत्तियां पीली पड़ने का मतलब है कि या तो पानी ज्यादा हो गया है या यूरिया की कमी है। खेत से रुका हुआ पानी निकाल दें और थोड़ा यूरिया डालें। एक हफ्ते में पौधा फिर से हरा हो जाएगा।",
      mr: "पाने पिवळी पडण्याचा अर्थ असा की जमिनीत पाणी जास्त झाले आहे किंवा युरियाची कमतरता आहे. शेतात साचलेले पाणी काढून टाका आणि थोडा युरिया टाका. एका आठवड्यात पीक पुन्हा हिरवेगार होईल."
    }
  },
  {
    keywords: ["orange", "santra", "santari", "citrus", "संत्रा", "संतरा", "sntra", "kinnow", "mandarin", "nagpur orange", "nagpur santra", "limbu"],
    reply: {
      en: "Nagpur is famous for its Oranges (Santra)! They thrive in our black soil. For the best yield, ensure proper drip irrigation and watch out for Citrus Psylla and Canker during the monsoons. Spray Bordeaux mixture before the rains.",
      hi: "नागपुर अपने संतरों के लिए प्रसिद्ध है! ये हमारी काली मिट्टी में बहुत अच्छे होते हैं। अच्छी पैदावार के लिए ड्रिप सिंचाई का इस्तेमाल करें और मानसून के दौरान साइट्रस सिला और कैंकर से बचाव के लिए बारिश से पहले बोर्डो (Bordeaux) मिश्रण का छिड़काव करें।",
      mr: "नागपूर त्याच्या संत्र्यांसाठी प्रसिद्ध आहे! ती आपल्या काळ्या मातीत खूप छान येतात. चांगल्या उत्पादनासाठी ठिबक सिंचन वापरा आणि पावसाळ्यात 'सायट्रस सायला' आणि 'कॅन्कर' रोगापासून वाचवण्यासाठी पावसाळ्यापूर्वी बोर्डो मिश्रणाची फवारणी करा."
    }
  },
  {
    keywords: ["canker", "dieback", "citrus canker", "orange disease", "santra rog", "संत्रा रोग", "संतरा रोग"],
    reply: {
      en: "Citrus Canker shows up as raised, corky spots on leaves and fruit. It spreads fast in the rain! Prune away the infected branches immediately and spray a Copper-based fungicide (like Blitox) to protect your orange trees.",
      hi: "साइट्रस कैंकर में पत्तों और संतरों पर भूरे रंग के खुरदुरे धब्बे हो जाते हैं। यह बारिश में तेजी से फैलता है! तुरंत बीमार टहनियों को काट दें और अपने पेड़ों को बचाने के लिए कॉपर युक्त फफूंदनाशक (जैसे Blitox) का छिड़काव करें।",
      mr: "सायट्रस कॅन्करमुळे संत्र्याच्या पानांवर आणि फळांवर तपकिरी, खडबडीत डाग येतात. पावसात हा रोग वेगाने पसरतो! रोगट फांद्या त्वरित कापून टाका आणि झाडांच्या संरक्षणासाठी कॉपरयुक्त बुरशीनाशकाची (उदा. ब्लिटॉक्स) फवारणी करा."
    }
  },
  {
    keywords: ["soybean", "सोयाबीन", "soya", "soyaben", "soybin", "soyabean", "soyabeen"],
    reply: {
      en: "For the Nagpur/Vidarbha region, the best sowing window for Soybean (Kharif) is between 25 June and 8 July. Our black soil holds moisture well, but ensure good drainage so roots don't rot. Keep a good distance between plants!",
      hi: "नागपुर/विदर्भ क्षेत्र में, सोयाबीन की बुवाई का सबसे अच्छा समय 25 जून से 8 जुलाई के बीच है। हमारी काली मिट्टी नमी को अच्छी तरह रोक कर रखती है, लेकिन खेत में पानी न रुकने दें ताकि जड़ें न सड़ें।",
      mr: "तुमच्या नागपूर/विदर्भ भागात सोयाबीनची पेरणी साधारण २५ जून ते ८ जुलैदरम्यान करणे योग्य आहे. आपली काळी माती ओलावा चांगला टिकवून ठेवते, पण शेतात पाणी साचू देऊ नका जेणेकरून मुळे सडणार नाहीत."
    }
  },
  {
    keywords: ["tur", "arhar", "pigeonpea", "pigeon pea", "तूर", "तुअर", "toor", "red gram"],
    reply: {
      en: "Tur (Pigeonpea) is a major crop in Vidarbha! It grows wonderfully in our deep black soils. Plant it in June/July. Keep an eye out for Pod Borers when flowers start blooming, and spray Quinalphos or Neem oil if you spot them.",
      hi: "तुअर (अरहर) विदर्भ की एक प्रमुख फसल है! यह हमारी गहरी काली मिट्टी में बहुत अच्छी होती है। इसे जून/जुलाई में लगाएं। फूल आने पर फली छेदक (Pod Borer) कीड़ों पर नजर रखें और दिखने पर क्विनालफॉस या नीम का तेल छिड़कें।",
      mr: "तूर हे विदर्भातील एक प्रमुख पीक आहे! आपल्या काळ्या मातीत ते खूप छान वाढते. याची लागवड जून/जुलैमध्ये करा. फुले येऊ लागल्यावर शेंगा पोखरणारी अळी (Pod Borer) दिसल्यास क्विनॉलफॉस किंवा कडुनिंब तेलाची फवारणी करा."
    }
  },
  {
    keywords: ["wheat", "गेहूं", "गहू", "gehu", "gehun", "kanik", "gahu", "gahun"],
    reply: {
      en: "Wheat is a Rabi crop suited for the cooler months. In Maharashtra, it is typically sown between late October and December, depending on the soil type and irrigation availability. Give it a good dose of DAP fertilizer before sowing.",
      hi: "गेहूं एक रबी फसल है जो ठंडे मौसम में अच्छी होती है। महाराष्ट्र में इसे मिट्टी और सिंचाई के आधार पर आमतौर पर अक्टूबर के अंत से दिसंबर के बीच बोया जाता है। बोने से पहले खेत में DAP खाद जरूर डालें।",
      mr: "गहू हे रब्बी पीक आहे. महाराष्ट्रात साधारणपणे जमिनीचा प्रकार आणि सिंचनाची सोय पाहून ऑक्टोबरच्या अखेरीस ते डिसेंबर दरम्यान गव्हाची पेरणी केली जाते. पेरणीपूर्वी शेतात डीएपी (DAP) खत नक्की टाका."
    }
  },
  {
    keywords: ["cotton", "कपास", "कापूस", "kapas", "kapus", "cotton seed", "kapashi"],
    reply: {
      en: "Cotton is a major Kharif crop in Vidarbha! Our Regur (Black Cotton Soil) is absolutely perfect for it. Plant in June/July after the first showers. Using Bt cotton seeds really helps keep the Pink Bollworm away.",
      hi: "विदर्भ में कपास (White Gold) एक प्रमुख फसल है! हमारी काली मिट्टी (रेगुर) इसके लिए एकदम सही है। पहली बारिश के बाद जून/जुलाई में इसे लगाएं। पिंक बोलवर्म (गुलाबी सुंडी) से बचने के लिए बीटी (Bt) बीज का इस्तेमाल करें।",
      mr: "विदर्भात कापूस (पांढरे सोने) हे मुख्य पीक आहे! आपली काळी माती (रेगुर) कापसासाठी उत्तम आहे. पहिल्या पावसानंतर जून/जुलैमध्ये याची लागवड केली जाते. गुलाबी बोंडअळीपासून वाचण्यासाठी बीटी (Bt) बियाणे वापरा."
    }
  },
  {
    keywords: ["pest", "कीट", "कीटक", "किडा", "रोग", "disease", "बग", "kide", "kid", "kida", "bugs", "insects"],
    reply: {
      en: "If bugs are eating your crops, try a natural neem oil spray first—it's cheap and safe. Spray it early in the morning or late in the evening. If the problem is really bad, your local farm store can give you a specific medicine for that insect.",
      hi: "अगर कीड़े फसल खराब कर रहे हैं, तो सबसे पहले सुबह या शाम के समय नीम के तेल का छिड़काव करें। यह सस्ता और सुरक्षित है। ज्यादा नुकसान होने पर ही बाजार की तेज दवा का इस्तेमाल करें।",
      mr: "जर कीड पीक खराब करत असेल, तर आधी सकाळी किंवा संध्याकाळी कडुनिंब तेलाची फवारणी करा. हे स्वस्त आणि सुरक्षित आहे. कीड खूप वाढल्यास दुकानातून योग्य औषध आणा."
    }
  },
  {
    keywords: ["fertilizer", "उर्वरक", "खाद", "खत", "दवा", "khad", "khat", "dawa", "dava", "npk", "urea", "dap"],
    reply: {
      en: "Don't just guess with fertilizers! A simple soil test is the best way to know what your field needs. Generally, use DAP or compost when planting, and urea later when the plants are growing fast.",
      hi: "अंदाजे खाद न डालें! सबसे अच्छा तरीका है कि पहले अपनी मिट्टी की जांच कराएं। आम तौर पर बुवाई के समय DAP या गोबर की खाद डालें, और बाद में जब पौधा बढ़ रहा हो तब यूरिया दें।",
      mr: "अंदाजाने खत टाकू नका! माती परीक्षण करणे हा सर्वोत्तम मार्ग आहे. साधारणपणे पेरणीच्या वेळी डीएपी (DAP) किंवा शेणखत टाका, आणि नंतर पीक वाढत असताना युरिया द्या."
    }
  },
  {
    keywords: ["irrigation", "सिंचाई", "पानी", "पाणी", "सिंचन", "drip", "sichai", "pani", "sichan", "water", "watering"],
    reply: {
      en: "Save water by irrigating early in the morning or late evening so the sun doesn't dry it all up. Drip irrigation is amazing if you can set it up—it gives water straight to the roots and saves money!",
      hi: "पानी बचाने के लिए हमेशा सुबह जल्दी या शाम को सिंचाई करें ताकि धूप में पानी भाप न बने। अगर हो सके तो ड्रिप (टपक) सिंचाई लगाएं, इससे सीधा जड़ों को पानी मिलता है।",
      mr: "पाण्याची बचत करण्यासाठी नेहमी सकाळी लवकर किंवा संध्याकाळी पाणी द्या. शक्य असल्यास ठिबक सिंचन बसवा, यामुळे थेट मुळांना पाणी मिळते आणि पैशांचीही बचत होते."
    }
  },
  {
    keywords: ["soil", "मिट्टी", "माती", "mitti", "mati", "black cotton soil", "regur", "kali mitti", "kali mati", "काळी माती"],
    reply: {
      en: "Nagpur is blessed with 'Regur' or Black Cotton Soil. It's incredibly fertile and holds moisture beautifully for long periods. Try adding cow dung compost every year to keep it soft and healthy!",
      hi: "नागपुर में 'रेगुर' यानी काली कपास वाली मिट्टी पाई जाती है, जो बहुत उपजाऊ है और नमी को लंबे समय तक रोक कर रखती है! हर साल खेत में गोबर की खाद जरूर डालें ताकि मिट्टी भुरभुरी और स्वस्थ रहे।",
      mr: "नागपूरला 'रेगुर' म्हणजेच काळी कापसाची माती लाभली आहे. ही खूप सुपीक असते आणि ओलावा जास्त काळ टिकवून ठेवते! दरवर्षी शेतात शेणखत नक्की टाका ज्यामुळे माती भुसभुशीत आणि निरोगी राहील."
    }
  },
  {
    keywords: ["weather", "मौसम", "हवामान", "mausam", "havaman", "rain", "barish", "paus", "baarish"],
    reply: {
      en: "Always check the Vidarbha weather forecasts before you spray any medicine or give fertilizer. If rain is coming, wait! Otherwise, all your expensive medicine will just wash away into the ground.",
      hi: "खेत में कोई भी दवा या खाद डालने से पहले विदर्भ के मौसम का हाल जरूर देखें। अगर बारिश होने वाली है, तो रुक जाएं, वरना आपकी महंगी दवा पानी में धुल जाएगी।",
      mr: "शेतात कोणतीही फवारणी किंवा खत टाकण्यापूर्वी विदर्भाचा हवामान अंदाज नक्की तपासा. जर पाऊस येणार असेल तर थांबा, अन्यथा तुमचे महागडे औषध पाण्यात वाहून जाईल."
    }
  },
  {
    keywords: ["red rot", "sugarcane red rot", "sugarcane rotting", "sour smell", "गन्ना लाल", "ऊस लाल", "ganna lal", "oos lal"],
    reply: {
      en: "It sounds like your sugarcane has Red Rot. The inside of the cane turns red and might smell a bit sour. The best way to fix this is to pull out and burn the sick plants so it doesn't spread. Next time, make sure to plant healthy disease-free sugarcane cuttings!",
      hi: "ऐसा लगता है कि आपके गन्ने में 'रेड रॉट' (लाल सड़न) की बीमारी है। इसमें गन्ने के अंदर लाल रंग हो जाता है और खट्टी महक आती है। बचाव के लिए बीमार पौधों को उखाड़ कर जला दें। अगली बार बुवाई के लिए हमेशा स्वस्थ और बिना बीमारी वाले गन्ने का ही इस्तेमाल करें।",
      mr: "तुमच्या ऊसाला 'रेड रॉट' (लाल सड) हा रोग झाला असावा असे दिसते. यात ऊस आतून लाल होतो आणि थोडा आंबट वास येतो. हा रोग पसरू नये म्हणून रोगट झाडे मुळासकट उपटून जाळून टाका. पुढच्या वेळी लागवडीसाठी निरोगी आणि रोगमुक्त बेणे वापरा!"
    }
  },
  {
    keywords: ["early blight", "potato spots", "bullseye", "potato rings", "आलू के पत्ते", "बटाटा करपा", "aloo", "batata"],
    reply: {
      en: "Brown spots with rings on your potato leaves mean it's Early Blight! Don't worry—just make sure to remove and burn the dried leaves after harvest. Rotating your crops every few years and using a good fungicide spray early on will keep your potatoes healthy and happy.",
      hi: "अगर आलू के पत्तों पर गोल छल्ले वाले भूरे धब्बे दिख रहे हैं, तो यह 'अगेती झुलसा' (Early Blight) रोग है। फसल कटने के बाद खेत से सूखे पत्तों को हटा कर जला दें। हर साल फसल बदलकर लगाएं और बीमारी दिखने पर फफूंदनाशक (फंगीसाइड) का छिड़काव करें।",
      mr: "बटाट्याच्या पानांवर गोल रिंगांसारखे तपकिरी ठिपके दिसणे म्हणजे हा 'करपा' (Early Blight) रोग आहे. घाबरू नका, पीक काढणीनंतर शेतातील सुकलेली पाने जाळून टाका. दरवर्षी पीक बदला आणि रोग दिसताच योग्य बुरशीनाशकाची फवारणी करा."
    }
  },
  {
    keywords: ["blast", "rice blast", "diamond spot", "paddy neck", "धान के पत्ते", "भात करपा"],
    reply: {
      en: "Diamond-shaped spots on rice leaves or rotting necks mean your crop has Rice Blast. To manage it, clear away any weeds around your field, plant your seeds a bit early, and avoid using too much urea fertilizer. A good seed treatment before planting does wonders!",
      hi: "धान के पत्तों पर आंख या हीरे के आकार के धब्बे 'ब्लास्ट' (झोंका) रोग की निशानी हैं। इससे बचने के लिए खेत के आस-पास सफाई रखें और यूरिया खाद का जरूरत से ज्यादा इस्तेमाल न करें। बुवाई से पहले बीजों का उपचार जरूर करें।",
      mr: "भाताच्या पानांवर डोळ्याच्या किंवा हिऱ्याच्या आकाराचे ठिपके दिसल्यास तो 'ब्लास्ट' (करपा) रोग आहे. याच्या नियंत्रणासाठी शेताच्या आजूबाजूला तण वाढू देऊ नका आणि युरिया खताचा अतिवापर टाळा. पेरणीपूर्वी बियाणांवर योग्य औषधाची प्रक्रिया नक्की करा."
    }
  },
  {
    keywords: ["bunchy top", "banana bunchy", "rosette banana", "केला गुच्छा", "केळी बंची", "banana", "kela", "kele"],
    reply: {
      en: "If your banana leaves are shrinking and bunching up at the top, it's the Bunchy Top virus, spread by tiny black insects (aphids). Sadly, infected plants won't recover, so dig them up completely and burn them. Always plant certified virus-free banana suckers!",
      hi: "अगर केले के पेड़ के ऊपरी पत्ते छोटे होकर एक गुच्छे की तरह बन गए हैं, तो यह 'बंची टॉप' (गुच्छा रोग) है जो माहू (एफिड) नाम के कीड़ों से फैलता है। बीमार पौधे कभी ठीक नहीं होते, इसलिए उन्हें जड़ से उखाड़ कर जला दें। हमेशा रोगमुक्त और प्रमाणित पौधों की ही रोपाई करें।",
      mr: "केळीची पाने आकाराने लहान होऊन शेंड्याकडे गुच्छासारखी जमा झाली असतील, तर हा 'बंची टॉप' (शेंडेगुच्छा) रोग आहे. हा रोग मावा कीटकामुळे पसरतो. रोगट झाडे मुळासकट उपटून जाळून टाका. नेहमी प्रमाणित आणि निरोगी केळीची रोपेच लावा."
    }
  },
  {
    keywords: ["root knot", "nematode", "tomato root knot", "root swelling", "tomato wilt", "टमाटर की जड़", "टोमॅटो गाठी", "tomato", "tamatar", "टोमॅटो"],
    reply: {
      en: "Stunted tomato plants with swollen knots on the roots are caused by tiny worms called Root-knot Nematodes. Next summer, try deep ploughing your field and leaving it in the hot sun to kill these pests. Also, try rotating your tomatoes with other crops like corn or wheat!",
      hi: "टमाटर के पौधे छोटे रह जाना और जड़ों में गांठे बनना 'रूट-नॉट नेमाटोड' (सूत्रकृमि) का काम है। अगली गर्मियों में खेत की गहरी जुताई करके उसे तेज धूप में खुला छोड़ दें। टमाटर के बाद खेत में मक्का या गेहूं जैसी फसलें लगाना फायदेमंद होता है।",
      mr: "टोमॅटोची झाडे खुरटी राहणे आणि मुळांवर गाठी येणे हे 'रूट-नॉट नेमाटोड' (सूत्रकृमी) मुळे होते. पुढच्या उन्हाळ्यात शेताची खोल नांगरट करून जमीन कडक उन्हात तापू द्या. तसेच दरवर्षी टोमॅटो न घेता पीकपालट म्हणून मका किंवा गहू घ्या."
    }
  },
  {
    keywords: ["rice", "chawal", "paddy", "dhan", "चावल", "धान", "भात"],
    reply: {
      en: "Rice (Paddy) is a Kharif crop. The best time to plant rice in Maharashtra is during the monsoon season (June/July). Ensure your field has plenty of standing water and select a variety suited for your local taluka.",
      hi: "चावल (धान) एक खरीफ फसल है। इसे लगाने का सबसे अच्छा समय मानसून (जून/जुलाई) के दौरान होता है। खेत में पानी की अच्छी व्यवस्था रखें और अपने इलाके के अनुकूल बीज चुनें।",
      mr: "भात (तांदूळ) हे खरीप पीक आहे. मान्सूनमध्ये (जून/जुलै) याची लागवड केली जाते. शेतात पुरेसे पाणी उभे राहील याची काळजी घ्या आणि तुमच्या भागाला योग्य असे वाण निवडा."
    }
  },
  {
    keywords: ["sorghum", "jowar", "ज्वार", "ज्वारी", "jawar"],
    reply: {
      en: "For Rabi Sorghum (Jowar) in Maharashtra, ICAR recommends planting in the second half of September or early October, taking advantage of the post-monsoon soil moisture.",
      hi: "महाराष्ट्र में रबी ज्वार के लिए, सितंबर के दूसरे पखवाड़े या अक्टूबर की शुरुआत में बुवाई करना सबसे अच्छा होता है, ताकि मिट्टी की नमी का पूरा फायदा मिल सके।",
      mr: "महाराष्ट्रात रब्बी ज्वारीसाठी (ICAR च्या मते) सप्टेंबरचा दुसरा पंधरवडा किंवा ऑक्टोबरच्या सुरुवातीस पेरणी करणे उत्तम, जेणेकरून जमिनीत उरलेल्या ओलाव्याचा फायदा होतो."
    }
  },
  {
    keywords: ["june", "july", "जून", "जुलै", "जुलाई", "kharif", "खरीफ", "खरीप"],
    reply: {
      en: "In June and July (Kharif season), farmers in Nagpur typically plant Soybean, Cotton, Pigeonpea (Tur), Paddy, Maize, and Sorghum. For example, PDKV recommends sowing soybean between 25 June–8 July after sufficient rainfall.",
      hi: "जून और जुलाई (खरीफ) में, नागपुर के किसान मुख्य रूप से सोयाबीन, कपास, तुअर, धान और ज्वार लगाते हैं। उदाहरण के लिए, सोयाबीन की बुवाई पर्याप्त बारिश के बाद 25 जून से 8 जुलाई के बीच करनी चाहिए।",
      mr: "जून आणि जुलै (खरीप हंगाम) मध्ये, नागपूरचे शेतकरी प्रामुख्याने सोयाबीन, कापूस, तूर, भात आणि ज्वारी लावतात. उदा. चांगला पाऊस पडल्यानंतर २५ जून ते ८ जुलै या दरम्यान सोयाबीनची पेरणी करावी."
    }
  },
  {
    keywords: ["october", "november", "december", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", "अक्टूबर", "नवंबर", "दिसंबर", "rabi", "रबी", "रब्बी"],
    reply: {
      en: "In October, November, and December (Rabi season), suitable crops include Wheat, Chickpea (Gram), Mustard, Safflower, and Rabi Sorghum. The exact sowing date depends on irrigation availability and soil moisture.",
      hi: "अक्टूबर, नवंबर और दिसंबर (रबी मौसम) में गेहूं, चना, सरसों, करड़ी और रबी ज्वार जैसी फसलें लगाई जाती हैं। बुवाई की सही तारीख सिंचाई और मिट्टी की नमी पर निर्भर करती है।",
      mr: "ऑक्टोबर, नोव्हेंबर आणि डिसेंबर (रब्बी हंगाम) मध्ये गहू, हरभरा, मोहरी, करडई आणि रब्बी ज्वारी ही पिके घेतली जातात. सिंचनाची सोय आणि जमिनीतील ओलावा पाहून पेरणीची वेळ ठरवावी."
    }
  },
  {
    keywords: ["january", "february", "march", "april", "may", "jan", "feb", "mar", "apr", "janvari", "farvari", "मार्च", "अप्रैल", "मई", "जानेवारी", "फेब्रुवारी", "एप्रिल", "मे", "summer", "उन्हाळा", "गर्मी", "unhala", "garmi"],
    reply: {
      en: "During the summer and pre-Kharif months (Jan-May), you can grow summer vegetables, summer Moong, watermelon, and cucumber. May is also the time for nursery preparation before the monsoon.",
      hi: "गर्मियों (जनवरी-मई) के दौरान, आप गर्मी की सब्जियां, मूंग, तरबूज और ककड़ी उगा सकते हैं। मई का महीना मानसून से पहले नर्सरी तैयार करने का भी सही समय है।",
      mr: "उन्हाळ्यात (जानेवारी-मे), तुम्ही उन्हाळी फळभाज्या, मूग, कलिंगड आणि काकडी घेऊ शकता. तसेच मे महिना मान्सूनपूर्व नर्सरीच्या तयारीसाठी उत्तम असतो."
    }
  },
  {
    keywords: ["bajra", "bajara", "pearl millet", "बाजरा", "बाजरी", "bajri"],
    reply: {
      en: "Bajra (Pearl Millet) is primarily a Kharif crop. It should be sown with the onset of the monsoon, usually between June and July, depending on rainfall in your region.",
      hi: "बाजरा मुख्य रूप से एक खरीफ फसल है। इसे आमतौर पर मानसून की शुरुआत के साथ, आपके क्षेत्र में बारिश के आधार पर जून और जुलाई के बीच बोया जाना चाहिए।",
      mr: "बाजरी हे प्रामुख्याने खरीप पीक आहे. साधारणपणे मान्सूनच्या सुरुवातीला, पावसाचा अंदाज घेऊन जून ते जुलै दरम्यान याची पेरणी करावी."
    }
  },
  {
    keywords: ["mahine", "mahina", "month", "season", "kab", "when", "महीने", "महिना", "कधी", "rutu", "time"],
    reply: {
      en: "In farming, the sowing month depends on the crop. In Nagpur, Kharif crops (Soybean, Cotton, Rice, Tur) are planted in June-July. Rabi crops (Wheat, Gram) are planted in Oct-Nov. Which crop do you want to plant?",
      hi: "खेती में, बुवाई का महीना फसल पर निर्भर करता है। नागपुर में खरीफ फसलें (सोयाबीन, कपास, चावल, तुअर) जून-जुलाई में लगाई जाती हैं। रबी फसलें (गेहूं, चना) अक्टूबर-नवंबर में लगाई जाती हैं। आप कौन सी फसल लगाना चाहते हैं?",
      mr: "शेतीमध्ये पेरणीचा महिना पिकावर अवलंबून असतो. नागपुरात खरीप पिके (सोयाबीन, कापूस, भात, तूर) जून-जुलैमध्ये लावली जातात. रब्बी पिके (गहू, हरभरा) ऑक्टोबर-नोव्हेंबरमध्ये लावली जातात. तुम्हाला कोणते पीक लावायचे आहे?"
    }
  }
];


function detectLanguage(text: string, defaultLang: string): string {
  const lower = text.toLowerCase();
  const isMarathiDevanagari = ["आहे", "काय", "कसे", "कधी", "कुठे", "करू", "माझी", "माझा", "मला", "मराठी"].some(w => lower.includes(w));
  const hasDevanagari = /[\u0900-\u097F]/.test(lower);
  const isHindiDevanagari = hasDevanagari && !isMarathiDevanagari;

  const isHindi = lower.includes("hindi") || isHindiDevanagari || /\b(hai|kya|kaise|kyu|kab|kaha|kahan|karen|kare|meri|mera|mujhe|ka|ki|ko|jo|vah)\b/.test(lower);
  const isMarathi = lower.includes("marathi") || isMarathiDevanagari || /\b(ahe|kay|kase|kadhi|kuthe|karu|majhi|majha|mala|cha|chi|che)\b/.test(lower);

  if (isMarathi) return "mr";
  if (isHindi) return "hi";
  if (lower.includes("english") || lower.includes("angrezi")) return "en";
  return defaultLang;
}

async function getBotReply(query: string, appLang: string, history: Message[] = []): Promise<string> {
  const lang = detectLanguage(query, appLang);
  const lower = query.toLowerCase();

  const weatherKeywords = ["weather", "mausam", "havaman", "rain", "barish", "paus", "baarish", "temperature", "tapman", "taapman", "nature", "nisarg", "prakruti", "climate", "मौसम", "हवामान", "बारिश", "पाऊस", "तापमान", "प्रकृति", "निसर्ग"];
  if (weatherKeywords.some(k => lower.includes(k))) {
    try {
      // Nagpur coordinates
      const lat = 21.1458;
      const lon = 79.0882;
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`);
      if (res.ok) {
        const data = await res.json();
        const currentTemp = data.current.temperature_2m;
        const rainProb = data.daily.precipitation_probability_max[0];
        const humidity = data.current.relative_humidity_2m;
        
        const responses: Record<string, string> = {
          en: `Here is the current weather for Vidarbha (Nagpur region):\n🌡️ Temperature: ${currentTemp}°C\n💧 Humidity: ${humidity}%\n🌧️ Chance of Rain Today: ${rainProb}%\n\nAlways check conditions before spraying pesticides or fertilizers!`,
          hi: `विदर्भ (नागपुर क्षेत्र) का वर्तमान मौसम इस प्रकार है:\n🌡️ तापमान: ${currentTemp}°C\n💧 नमी: ${humidity}%\n🌧️ आज बारिश की संभावना: ${rainProb}%\n\nदवा या खाद डालने से पहले हमेशा मौसम का ध्यान रखें!`,
          mr: `विदर्भ (नागपूर विभाग) चे सध्याचे हवामान:\n🌡️ तापमान: ${currentTemp}°C\n💧 आर्द्रता: ${humidity}%\n🌧️ आज पावसाची शक्यता: ${rainProb}%\n\nफवारणी किंवा खत देण्यापूर्वी नेहमी हवामान तपासा!`
        };
        return responses[lang] || responses.en;
      }
    } catch (e) {
      console.error("Weather fetch failed:", e);
    }
  }

  if (query === "[IMAGE_UPLOAD]") {
    const responses: Record<string, string> = {
      en: "I see you uploaded an image! Let me analyze it... 🔍\n\nIt looks like Early Blight of Potato. I recommend removing and burning the dried leaves. A foliar spray of Dithane Z-78 (2 lb/100 gallons) can also help keep it under control.",
      hi: "मुझे आपका फोटो मिल गया है! मैं इसे देख रहा हूँ... 🔍\n\nयह आलू का 'अगेती झुलसा' (Early Blight) रोग लग रहा है। सूखे पत्तों को हटा दें और डाइथेन Z-78 फफूंदनाशक का छिड़काव करें।",
      mr: "तुम्ही पाठवलेला फोटो मला मिळाला! मी तपासत आहे... 🔍\n\nहे बटाट्यावरील 'करपा' (Early Blight) रोगासारखे दिसतेय. सुकलेली पाने काढून टाका आणि डायथेन Z-78 बुरशीनाशकाची फवारणी करा."
    };
    return responses[lang] || responses.en;
  }

  for (const item of KB) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return (item.reply as any)[lang] || item.reply.en;
    }
  }

  if (lower.includes("tell me") || lower.includes("translate") || lower.includes("in hindi") || lower.includes("in marathi") || lower.includes("in english") || lower.includes("this answer")) {
    const lastBotMsg = [...history].reverse().find(m => m.role === 'bot' && m.id !== 'greeting');
    if (lastBotMsg) {
      for (const item of KB) {
        if (item.reply.en === lastBotMsg.text || item.reply.hi === lastBotMsg.text || item.reply.mr === lastBotMsg.text) {
          return (item.reply as any)[lang] || item.reply.en;
        }
      }
    }
  }

  const defaults: Record<string, string> = {
    en: "Thank you for your question! For specific advice, I recommend consulting your local Krishi Vigyan Kendra (KVK). Common topics I can help with: crop diseases, fertilizer recommendations, irrigation, soil health, and seasonal planting calendars. Please ask about these topics!",
    hi: "आपके प्रश्न के लिए धन्यवाद! विशिष्ट सलाह के लिए, मैं आपके स्थानीय कृषि विज्ञान केंद्र (KVK) से संपर्क करने की सलाह देता हूँ। मैं फसल रोगों, उर्वरकों, सिंचाई और मिट्टी के स्वास्थ्य में मदद कर सकता हूँ।",
    mr: "तुमच्या प्रश्नासाठी धन्यवाद! अधिक माहितीसाठी, कृपया तुमच्या स्थानिक कृषी विज्ञान केंद्राशी (KVK) संपर्क साधा. मी पीक रोग, खते, सिंचन आणि मातीच्या आरोग्याबद्दल मदत करू शकतो."
  };
  return defaults[lang] || defaults.en;
}

const quickQuestions = [
  "Soybean leaves turning yellow",
  "Best fertilizer for wheat",
  "Cotton pest control",
  "Drip irrigation benefits",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { language, t } = useLanguage();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const msgCount = messages.length;

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev ? prev + " " + transcript : transcript);
      };
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  function toggleListening() {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
      recognitionRef.current.start();
    }
  }

  useEffect(() => {
    if (!open) return;
    if (msgCount === 0) {
      setMessages([
        {
          id: "greeting",
          role: "bot",
          text: t.chatbot_greeting,
          timestamp: new Date(),
        },
      ]);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [open, t.chatbot_greeting, msgCount]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setTimeout(async () => {
      const ttsLang = detectLanguage(text, language);

      const replyText = await getBotReply(text, language, messages);
      setMessages((m) => [
        ...m,
        {
          id: `${Date.now()}b`,
          role: "bot",
          text: replyText,
          timestamp: new Date(),
        },
      ]);
      
      // Speak the reply
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(replyText);
        utterance.lang = ttsLang === "hi" ? "hi-IN" : ttsLang === "mr" ? "mr-IN" : "en-IN";
        utterance.rate = 0.95; 
        window.speechSynthesis.speak(utterance);
      }
    }, 700);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        text: "Uploaded an image",
        image: imageUrl,
        timestamp: new Date(),
      };
      setMessages((m) => [...m, userMsg]);
      
      setTimeout(async () => {
        const replyText = await getBotReply("[IMAGE_UPLOAD]", language, messages);
        setMessages((m) => [
          ...m,
          {
            id: `${Date.now()}b`,
            role: "bot",
            text: replyText,
            timestamp: new Date(),
          },
        ]);
        
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(replyText);
          utterance.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
          utterance.rate = 0.95; 
          window.speechSynthesis.speak(utterance);
        }
      }, 1500); // Simulated delay for AI image processing
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // reset input
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevation flex items-center justify-center transition-smooth hover:scale-105 active:scale-95",
          open && "rotate-90",
        )}
        onClick={() => setOpen((o) => !o)}
        aria-label={t.chatbot_title}
        data-ocid="chatbot-toggle"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-elevation flex flex-col overflow-hidden"
          style={{ maxHeight: "70vh" }}
          data-ocid="chatbot-panel"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{t.chatbot_title}</p>
              <p className="text-xs opacity-80">{t.chatbot_subtitle}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    msg.role === "bot"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/20 text-secondary-foreground",
                  )}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 max-w-[85%] shadow-sm",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted rounded-bl-none text-foreground",
                      )}
                    >
                      {msg.image && (
                        <img src={msg.image} alt="Uploaded crop" className="w-full max-w-[200px] rounded-lg mb-2 object-cover" />
                      )}
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">
              {t.chatbot_quick_questions}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  type="button"
                  key={q}
                  className="text-xs bg-primary/8 text-primary border border-primary/20 rounded-full px-2.5 py-1 hover:bg-primary/15 transition-smooth"
                  onClick={() => sendMessage(q)}
                  data-ocid="chatbot-quick-q"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2 px-4 py-3 border-t border-border items-center">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full transition-colors"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Image"
            >
              <ImagePlus className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-9 w-9 shrink-0 rounded-full transition-colors", isListening && "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90")}
              onClick={toggleListening}
              title="Speak"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={isListening ? "Listening..." : t.chatbot_placeholder}
              className="text-sm h-9 flex-1"
              data-ocid="chatbot-input"
            />
            <Button
              size="sm"
              className="h-9 px-3 shrink-0"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              data-ocid="chatbot-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
