export interface KBEntry {
  keywords: string[];
  reply: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const knowledgeBase: KBEntry[] = [
  // ---------------------------------------------------------
  // Existing Entries (Basics, Seasons, General Info)
  // ---------------------------------------------------------
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
    keywords: ["bajra", "bajara", "pearl millet", "बाजरा", "बाजरी", "bajri"],
    reply: {
      en: "Bajra (Pearl Millet) is primarily a Kharif crop. It should be sown with the onset of the monsoon, usually between June and July, depending on rainfall in your region.",
      hi: "बाजरा मुख्य रूप से एक खरीफ फसल है। इसे आमतौर पर मानसून की शुरुआत के साथ, आपके क्षेत्र में बारिश के आधार पर जून और जुलाई के बीच बोया जाना चाहिए।",
      mr: "बाजरी हे प्रामुख्याने खरीप पीक आहे. साधारणपणे मान्सूनच्या सुरुवातीला, पावसाचा अंदाज घेऊन जून ते जुलै दरम्यान याची पेरणी करावी."
    }
  },

  // ---------------------------------------------------------
  // New Plant Diseases & Solutions
  // ---------------------------------------------------------
  
  // COTTON DISEASES
  {
    keywords: ["pink bollworm", "बोंडअळी", "गुलाबी सुंडी", "gulabi sundi", "bollworm", "cotton worm", "kapas kida", "kapus ali"],
    reply: {
      en: "Pink Bollworm destroys cotton bolls from the inside. Solution: Use Bt cotton seeds, install pheromone traps (5/acre) to monitor moths, and spray Spinosad or Emamectin Benzoate if infection crosses 5-10%.",
      hi: "गुलाबी सुंडी (Pink Bollworm) कपास के टिंडों को अंदर से नष्ट कर देती है। समाधान: बीटी कपास के बीज का उपयोग करें, निगरानी के लिए फेरोमोन ट्रैप (5/एकड़) लगाएं, और प्रकोप 5-10% से अधिक होने पर स्पिनोसैड या एमामेक्टिन बेंजोएट का छिड़काव करें।",
      mr: "गुलाबी बोंडअळी कापसाची बोंडे आतून पोखरून खराब करते. उपाय: बीटी कापूस बियाणे वापरा, निरीक्षणासाठी कामगंध सापळे (५/एकर) लावा आणि प्रादुर्भाव ५-१०% च्या वर गेल्यास स्पिनोसॅड किंवा एमामेक्टिन बेंझोएटची फवारणी करा."
    }
  },
  {
    keywords: ["whitefly", "सफेद मक्खी", "पांढरी माशी", "pandhri mashi", "safed makhi", "kapas makhi"],
    reply: {
      en: "Whiteflies suck sap from cotton leaves, making them curl and turn yellow, spreading leaf curl virus. Solution: Spray Neem oil (10,000 ppm) early on, use yellow sticky traps, and for severe cases, spray Diafenthiuron or Flonicamid.",
      hi: "सफेद मक्खी कपास के पत्तों का रस चूसती है जिससे वे मुड़कर पीले हो जाते हैं। समाधान: शुरुआत में नीम का तेल (10,000 ppm) छिड़कें, पीले चिपचिपे कार्ड (Yellow sticky traps) लगाएं, और अधिक प्रकोप पर डायफेन्थियूरॉन या फ्लोनिकामिड स्प्रे करें।",
      mr: "पांढरी माशी कापसाच्या पानांतील रस शोषते, ज्यामुळे पाने वाकडी होऊन पिवळी पडतात. उपाय: सुरुवातीला कडुनिंब तेलाची (१०,००० ppm) फवारणी करा, पिवळे चिकट सापळे लावा. जास्त प्रादुर्भाव असल्यास डायफेन्थिउरॉन किंवा फ्लोनिकामिड फवारा."
    }
  },
  {
    keywords: ["fusarium wilt", "उकठा", "मर रोग", "mar rog", "wilt", "kapus mar"],
    reply: {
      en: "Fusarium Wilt causes cotton leaves to yellow and dry, eventually killing the plant. Solution: Practice crop rotation, treat seeds with Trichoderma viride before sowing, and apply Carbendazim in the root zone for infected plants.",
      hi: "उकठा (विल्ट) रोग में कपास के पत्ते पीले होकर सूख जाते हैं और पौधा मर जाता है। समाधान: फसल चक्र अपनाएं, बुवाई से पहले बीजों को ट्राइकोडर्मा विरिडी से उपचारित करें, और बीमार पौधों की जड़ों में कार्बेन्डाजिम का घोल डालें।",
      mr: "मर रोगामुळे कापसाची पाने पिवळी पडून सुकतात आणि झाड मरते. उपाय: पीक पालट करा, पेरणीपूर्वी बियाणांवर ट्रायकोडर्मा विरिडीची प्रक्रिया करा आणि रोगट झाडांच्या मुळाशी कार्बेन्डाझिमचे द्रावण ओता."
    }
  },

  // SOYBEAN DISEASES
  {
    keywords: ["yellow mosaic", "ymv", "पीला मोज़ेक", "पिवळा मोझॅक", "soybean yellow", "soya yellow", "mojek"],
    reply: {
      en: "Yellow Mosaic Virus in Soybean causes leaves to develop alternating yellow and green patches. It is spread by Whitefly. Solution: Remove infected plants. Spray Thiamethoxam or Acetamiprid to control whiteflies and stop the virus from spreading.",
      hi: "सोयाबीन में पीला मोज़ेक (YMV) रोग से पत्तों पर पीले और हरे धब्बे बन जाते हैं। यह सफेद मक्खी से फैलता है। समाधान: बीमार पौधों को उखाड़ दें। सफेद मक्खी को मारने के लिए थियामेथोक्साम या एसिटामिप्रिड का छिड़काव करें।",
      mr: "सोयाबीनवरील पिवळा मोझॅक रोगामुळे पानांवर पिवळे आणि हिरवे डाग पडतात. हा रोग पांढऱ्या माशीमुळे पसरतो. उपाय: रोगट झाडे उपटून टाका. पांढऱ्या माशीच्या नियंत्रणासाठी थायामेथोक्साम किंवा एसिटामिप्रिडची फवारणी करा."
    }
  },
  {
    keywords: ["girdle beetle", "चक्र भृंग", "चक्री भुंगा", "chakri bhunga", "soybean stem worm"],
    reply: {
      en: "Girdle Beetle creates two rings on the soybean stem, causing the top part to dry up. Solution: Destroy infested plant parts. Spray Triazophos or Chlorantraniliprole 18.5% SC before the damage spreads.",
      hi: "चक्र भृंग (Girdle Beetle) सोयाबीन के तने पर दो छल्ले बनाता है जिससे ऊपर का हिस्सा सूख जाता है। समाधान: खराब हुए पौधों को नष्ट कर दें। नुकसान बढ़ने से पहले ट्रायज़ोफॉस या क्लोरैन्ट्रानिलिप्रोल 18.5% SC का छिड़काव करें।",
      mr: "चक्री भुंगा सोयाबीनच्या खोडावर दोन रिंग (वर्तुळे) तयार करतो, ज्यामुळे वरचा भाग सुकतो. उपाय: कीडग्रस्त भाग नष्ट करा. नुकसान वाढण्यापूर्वी ट्रायझोफॉस किंवा क्लोरँट्रानिलिप्रोल १८.५% SC ची फवारणी करा."
    }
  },

  // ORANGE DISEASES (Nagpur Mandarin)
  {
    keywords: ["citrus greening", "greening", "सिट्रस ग्रीनिंग", "संत्रा पिवळे", "orange greening"],
    reply: {
      en: "Citrus Greening causes mottled yellow leaves and misshapen, green fruits that taste bitter. Spread by Citrus Psylla. Solution: Remove heavily infected trees. Control Psylla by spraying Imidacloprid and use disease-free nursery plants.",
      hi: "सिट्रस ग्रीनिंग से संतरे के पत्ते पीले-चितकबरे हो जाते हैं और फल हरे व कड़वे रह जाते हैं। यह सिट्रस सिला कीड़े से फैलता है। समाधान: बीमार पेड़ों को हटा दें। सिला को रोकने के लिए इमिडाक्लोप्रिड का छिड़काव करें और नर्सरी से स्वस्थ पौधे ही लें।",
      mr: "सिट्रस ग्रीनिंगमुळे संत्र्याची पाने पिवळट-ठिपकेदार होतात आणि फळे हिरवट व कडू राहतात. हे सायट्रस सायला कीटकामुळे पसरते. उपाय: रोगट झाडे काढून टाका. सायलाच्या नियंत्रणासाठी इमिडाक्लोप्रिडची फवारणी करा आणि नर्सरीतून निरोगी रोपेच आणा."
    }
  },
  {
    keywords: ["gummosis", "डिंक्या", "गमोसिस", "orange gum", "tree sap", "dinkya", "santra dink"],
    reply: {
      en: "Gummosis in citrus causes sap (gum) to ooze from the bark, leading to bark cracking. Solution: Scrape off the diseased bark and apply Bordeaux paste (Copper Sulphate + Lime) on the wound. Improve soil drainage around the tree.",
      hi: "गमोसिस (डिंक्या) रोग में संतरे के तने की छाल से गोंद जैसा पदार्थ निकलता है और छाल फटने लगती है। समाधान: बीमार छाल को छीलकर वहां बोर्डो पेस्ट (नीला थोथा + चूना) लगाएं। पेड़ के आस-पास जलभराव न होने दें।",
      mr: "गमोसिस (डिंक्या) रोगामध्ये संत्र्याच्या खोडातून डिंकासारखा स्त्राव बाहेर येतो आणि साल फाटते. उपाय: रोगट साल खरवडून काढा आणि त्या जखमेवर बोर्डो पेस्ट (मोरचूद + चुना) लावा. झाडाभोवती पाणी साचू देऊ नका."
    }
  },

  // WHEAT DISEASES
  {
    keywords: ["wheat rust", "brown rust", "गेहूं का रस्ट", "गहू तांबेरा", "tambera", "ratuva", "रतुवा"],
    reply: {
      en: "Wheat Rust (Brown/Yellow) causes orange-brown powdery pustules on leaves, reducing yield. Solution: Grow rust-resistant wheat varieties. If you see symptoms, spray Propiconazole (Tilt) or Tebuconazole immediately.",
      hi: "गेहूं के रस्ट (रतुवा/तांबेरा) रोग में पत्तों पर भूरे-नारंगी रंग के पाउडर वाले धब्बे बन जाते हैं। समाधान: रस्ट-प्रतिरोधी गेहूं की किस्में बोएं। बीमारी दिखने पर तुरंत प्रोपिकोनाज़ोल (Tilt) या टेबुकोनाज़ोल का छिड़काव करें।",
      mr: "गव्हावरील तांबेरा रोगामुळे पानांवर नारिंगी-तपकिरी रंगाचे भुकटीसारखे डाग येतात. उपाय: तांबेरा-प्रतिकारक गव्हाचे वाण वापरा. रोगाची लक्षणे दिसताच प्रोपिकोनाझोल (Tilt) किंवा टेब्युकोनाझोलची फवारणी करा."
    }
  },
  {
    keywords: ["wheat smut", "loose smut", "कांगियारी", "काणी रोग", "kani rog", "gahu kani", "smut"],
    reply: {
      en: "Loose Smut turns wheat ears into a black powdery mass instead of grains. Solution: This is a seed-borne disease. Always treat your wheat seeds with Carboxin (Vitavax) or Tebuconazole before sowing to prevent it.",
      hi: "लूज़ स्मट (कांगियारी/काणी) रोग में गेहूं की बालियां दानों की जगह काले पाउडर में बदल जाती हैं। समाधान: यह बीज से फैलने वाली बीमारी है। बुवाई से पहले बीजों का उपचार कार्बोक्सिन (विटावैक्स) या टेबुकोनाज़ोल से जरूर करें।",
      mr: "काणी रोगामध्ये (Loose Smut) गव्हाच्या ओंब्यांमध्ये दाण्यांऐवजी काळी भुकटी तयार होते. उपाय: हा बियाण्यांद्वारे पसरणारा रोग आहे. पेरणीपूर्वी बियाणांवर कार्बोक्सिन (Vitavax) किंवा टेब्युकोनाझोलची बीजप्रक्रिया नक्की करा."
    }
  },

  // SUGARCANE DISEASES
  {
    keywords: ["grassy shoot", "gss", "गन्ने का घासी प्ररोह", "ऊस गवताळ वाढ", "oos gavtal", "sugarcane grass"],
    reply: {
      en: "Grassy Shoot Disease causes sugarcane to produce numerous thin, grass-like yellowish tillers with no cane formation. Solution: Uproot and destroy infected clumps. Treat seed sets with hot water (50°C for 2 hours) before planting.",
      hi: "ग्रासी शूट रोग में गन्ने से घास जैसी बहुत सी पतली और पीली टहनियां निकलती हैं और गन्ना नहीं बनता। समाधान: बीमार पौधों को उखाड़कर नष्ट कर दें। बुवाई से पहले गन्ने के टुकड़ों को गर्म पानी (50°C पर 2 घंटे) से उपचारित करें।",
      mr: "गवताळ वाढ (Grassy Shoot) रोगामुळे ऊसाला गवतासारखे अनेक बारीक, पिवळट फुटवे येतात आणि ऊस तयार होत नाही. उपाय: रोगट बेटे उपटून नष्ट करा. लागवडीपूर्वी बेण्यांवर गरम पाण्याची (५०°C तापमानावर २ तास) प्रक्रिया करा."
    }
  },

  // BANANA DISEASES
  {
    keywords: ["panama wilt", "पनामा विल्ट", "पनामा मर", "केळी पनामा", "banana wilt", "banana drying"],
    reply: {
      en: "Panama Wilt causes yellowing of older banana leaves from margins towards the midrib, leading to plant collapse. Solution: It's a soil-borne fungus. Plant resistant varieties (like Grand Naine). Drench the soil with Carbendazim.",
      hi: "पनामा विल्ट में केले के पुराने पत्ते किनारों से बीच की ओर पीले होकर सूख जाते हैं और पौधा गिर जाता है। समाधान: यह मिट्टी का फंगस है। प्रतिरोधी किस्में (जैसे ग्रैंड नैन) लगाएं। मिट्टी में कार्बेन्डाजिम का घोल बनाकर डालें।",
      mr: "पनामा विल्ट रोगामुळे केळीची जुनी पाने कडांकडून मध्यभागाकडे पिवळी पडून सुकतात आणि झाड कोलमडते. उपाय: ही मातीतील बुरशी आहे. प्रतिकारक वाण (उदा. ग्रँड नैन) लावा. मुळाभोवती कार्बेन्डाझिमचे द्रावण ओता."
    }
  },
  {
    keywords: ["sigatoka", "सिगाटोका", "केळी करपा", "banana leaf spot", "yellow spots banana"],
    reply: {
      en: "Sigatoka Leaf Spot forms yellow spots on banana leaves that turn dark brown, reducing bunch size. Solution: Ensure proper spacing for sunlight. Remove dry infected leaves and spray Propiconazole or Mancozeb.",
      hi: "सिगाटोका लीफ स्पॉट में केले के पत्तों पर पीले धब्बे बनते हैं जो बाद में गहरे भूरे हो जाते हैं, जिससे केले का आकार छोटा रह जाता है। समाधान: पौधों के बीच उचित दूरी रखें। सूखे पत्ते हटा दें और प्रोपिकोनाज़ोल या मैनकोज़ेब का छिड़काव करें।",
      mr: "सिगाटोका करपा रोगामुळे केळीच्या पानांवर पिवळे ठिपके येतात जे नंतर गडद तपकिरी होतात. यामुळे घड लहान राहतो. उपाय: झाडांमध्ये योग्य अंतर ठेवा. सुकलेली रोगट पाने कापून टाका आणि प्रोपिकोनाझोल किंवा मॅनकोझेबची फवारणी करा."
    }
  },

  // TOMATO & CHILLI
  {
    keywords: ["leaf curl", "मरोड़ियाँ", "चुरडा मुरडा", "churda murda", "chilli curl", "tomato curl", "patti mudna"],
    reply: {
      en: "Leaf Curl Virus (Churda Murda) causes tomato/chilli leaves to curl upwards and stunt growth. It is spread by Whiteflies and Thrips. Solution: Uproot infected plants. Spray Imidacloprid or Fipronil to kill the insects spreading the virus.",
      hi: "लीफ कर्ल (चुरडा मुरडा) वायरस से टमाटर/मिर्च के पत्ते ऊपर की ओर मुड़ जाते हैं और पौधे की वृद्धि रुक जाती है। यह सफेद मक्खी और थ्रिप्स से फैलता है। समाधान: बीमार पौधों को उखाड़ दें। वायरस फैलाने वाले कीड़ों को मारने के लिए इमिडाक्लोप्रिड या फिप्रोनिल छिड़कें।",
      mr: "चुरडा मुरडा (Leaf Curl) रोगामुळे टोमॅटो/मिरचीची पाने वरच्या बाजूला वळतात आणि झाडाची वाढ खुंटते. हा रोग पांढरी माशी आणि फुलकिड्यांमुळे पसरतो. उपाय: रोगट झाडे उपटून टाका. कीटक नियंत्रणासाठी इमिडाक्लोप्रिड किंवा फिप्रोनिल फवारा."
    }
  },
  {
    keywords: ["late blight", "पछेती झुलसा", "उशिरा येणारा करपा", "tomato blight", "ushira karpa"],
    reply: {
      en: "Late Blight appears as large, dark water-soaked spots on tomato leaves and rotting fruits. It thrives in cool, wet weather. Solution: Spray Metalaxyl + Mancozeb (Ridomil Gold) immediately at the first sign of disease.",
      hi: "पछेती झुलसा (Late Blight) में टमाटर के पत्तों पर बड़े, गहरे पानी भरे धब्बे बनते हैं और फल सड़ने लगते हैं। यह ठंडे, नम मौसम में तेजी से फैलता है। समाधान: बीमारी के पहले लक्षण दिखते ही मेटालैक्सिल + मैनकोज़ेब (रिडोमिल गोल्ड) का छिड़काव करें।",
      mr: "उशिरा येणाऱ्या करपा (Late Blight) रोगामुळे टोमॅटोच्या पानांवर पाण्याचे मोठे गडद डाग पडतात आणि फळे सडतात. हा थंड व दमट हवेत वेगाने पसरतो. उपाय: रोगाची लक्षणे दिसताच मेटालॅक्सिल + मॅनकोझेब (रिडोमिल गोल्ड) ची फवारणी करा."
    }
  },
  {
    keywords: ["thrips", "थ्रिप्स", "फुलकिडे", "fulkide", "chilli thrips", "onion thrips"],
    reply: {
      en: "Thrips are tiny insects that scrape leaves and suck the sap, causing leaves to curl upwards (boat shape) in chilli and onions. Solution: Use blue sticky traps. Spray Spinosad (Tracer) or Fipronil for effective control.",
      hi: "थ्रिप्स (फुलकिड़े) बहुत छोटे कीड़े होते हैं जो पत्तों को खुरचकर रस चूसते हैं। इससे मिर्च और प्याज के पत्ते नाव के आकार में ऊपर मुड़ जाते हैं। समाधान: नीले चिपचिपे कार्ड लगाएं। असरदार नियंत्रण के लिए स्पिनोसैड या फिप्रोनिल का छिड़काव करें।",
      mr: "थ्रिप्स (फुलकिडे) हे पानांना खरवडून रस शोषतात, ज्यामुळे मिरची आणि कांद्याची पाने नावेच्या आकारासारखी वर वळतात. उपाय: निळे चिकट सापळे वापरा. प्रभावी नियंत्रणासाठी स्पिनोसॅड (Tracer) किंवा फिप्रोनिलची फवारणी करा."
    }
  },

  // GENERAL DISEASES
  {
    keywords: ["powdery mildew", "पाउडरी मिल्ड्यू", "भुरी रोग", "bhuri", "safed powder", "white powder on leaves"],
    reply: {
      en: "Powdery Mildew looks like white, dusty powder on leaves and stems. It spreads in warm, dry weather with cool nights. Solution: Spray water-soluble Sulphur (80% WDG) or Hexaconazole to clear the fungus.",
      hi: "पाउडरी मिल्ड्यू (भुरी रोग) में पत्तों और तनों पर सफेद, धूल जैसा पाउडर जमा हो जाता है। समाधान: इस फंगस को खत्म करने के लिए पानी में घुलनशील सल्फर (80% WDG) या हेक्साकोनाज़ोल का छिड़काव करें।",
      mr: "भुरी रोगामध्ये (Powdery Mildew) पानांवर आणि खोडावर पांढरी भुकटी जमा होते. उपाय: या बुरशीच्या नियंत्रणासाठी पाण्यात विरघळणारे गंधक (Sulphur 80% WDG) किंवा हेक्साकोनाझोलची फवारणी करा."
    }
  },
  {
    keywords: ["downy mildew", "डाउनी मिल्ड्यू", "केवडा रोग", "kevda", "yellow spots underneath"],
    reply: {
      en: "Downy Mildew causes pale yellow spots on top of leaves and a grayish-purple fuzz underneath, common in wet conditions. Solution: Improve air circulation. Spray Cymoxanil + Mancozeb (Curzate) or Azoxystrobin.",
      hi: "डाउनी मिल्ड्यू (केवड़ा रोग) में पत्तों के ऊपर हल्के पीले धब्बे और नीचे भूरे-बैंगनी रंग की फफूंद दिखाई देती है। समाधान: पौधों में हवा का संचार बढ़ाएं। सिमोक्सानिल + मैनकोज़ेब (Curzate) या एज़ोक्सीस्ट्रोबिन का छिड़काव करें।",
      mr: "केवडा रोगामध्ये (Downy Mildew) पानांच्या वरच्या बाजूला पिवळट ठिपके आणि खालच्या बाजूला करडी-जांभळी बुरशी दिसते. उपाय: झाडांमध्ये हवा खेळती राहील हे पहा. सिमोक्सानिल + मॅनकोझेब (Curzate) किंवा अझोक्सीस्ट्रोबिनची फवारणी करा."
    }
  },
  {
    keywords: ["mealybug", "मिलीबग", "पिठ्या ढेकूण", "pithya dhekun", "white cottony bugs"],
    reply: {
      en: "Mealybugs look like tiny white cotton spots on stems and fruit. They suck sap and attract ants. Solution: Spray Neem oil with a little soap. For severe attacks, spray Profenofos or Buprofezin.",
      hi: "मिलीबग (सफेद सूंडी) तने और फलों पर सफेद रुई जैसे धब्बों की तरह दिखते हैं। ये रस चूसते हैं और चींटियों को आकर्षित करते हैं। समाधान: थोड़ा साबुन मिलाकर नीम के तेल का छिड़काव करें। ज्यादा प्रकोप होने पर प्रोफेनोफॉस या बुप्रोफेज़िन स्प्रे करें।",
      mr: "पिठ्या ढेकूण (Mealybug) खोडावर आणि फळांवर पांढऱ्या कापसाच्या गोळ्यांसारखे दिसतात. ते रस शोषतात आणि मुंग्यांना आकर्षित करतात. उपाय: कडुनिंब तेलात थोडे साबणाचे पाणी मिसळून फवारा. जास्त प्रादुर्भाव असल्यास प्रोफेनोफॉस किंवा बुप्रोफेझिन फवारा."
    }
  },
  {
    keywords: ["aphids", "माहू", "मावा", "mava", "mahu", "black bugs on leaves"],
    reply: {
      en: "Aphids are tiny green, black, or brown bugs that cluster on new growth, sucking sap and stunting the plant. Solution: A strong spray of water can wash them off. For chemical control, use Imidacloprid or Dimethoate.",
      hi: "माहू (Aphids) छोटे हरे, काले या भूरे कीड़े होते हैं जो नई पत्तियों पर गुच्छों में चिपक कर रस चूसते हैं। समाधान: पानी की तेज धार से इन्हें धोया जा सकता है। रासायनिक नियंत्रण के लिए इमिडाक्लोप्रिड या डाइमेथोएट का प्रयोग करें।",
      mr: "मावा (Aphids) हे छोटे हिरवे, काळे किंवा तपकिरी कीटक असतात जे नवीन पानांवर गुच्छाने चिकटून रस शोषतात. उपाय: पाण्याच्या जोराच्या फवाऱ्याने ते धुऊन काढता येतात. रासायनिक नियंत्रणासाठी इमिडाक्लोप्रिड किंवा डायमेथोएट वापरा."
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
  }
];
