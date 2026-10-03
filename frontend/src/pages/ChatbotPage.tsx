import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Bot,
  Bug,
  CloudSun,
  Droplets,
  Leaf,
  MessageCircle,
  Send,
  Sprout,
  User,
  Zap,
  Mic,
  MicOff,
  ImagePlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  image?: string;
  timestamp: Date;
}

import { knowledgeBase } from "@/data/knowledgeBase";


function detectLanguage(text: string, defaultLang: string): string {
  const lower = text.toLowerCase();
  const cleanLower = " " + lower.replace(/[.,!?।\n]/g, ' ') + " ";
  
  const marathiDeva = ["आहे", "काय", "कसे", "कधी", "कुठे", "करू", "माझी", "माझा", "मला", "मराठी", "मी", "कोणत्या", "कोणता", "कोणते", "कसा", "कशी", "आणि", "पण", "लावू", "करावं", "करायचं", "नाही", "होय", "कोण", "कशा", "कशासाठी", "द्यावे", "घ्यावे", "येईल", "लागेल", "महिना", "महिन्यात", "पाहिजे"];
  const isMarathiDevanagari = marathiDeva.some(w => cleanLower.includes(" " + w + " ")) || lower.includes("ळ");
  
  const hindiDeva = ["है", "क्या", "कैसे", "कब", "कहाँ", "कहां", "क्यों", "में", "मैं", "को", "का", "की", "के", "और", "यह", "वह", "कौन", "नहीं", "हूँ", "हूं", "हो", "सकता", "सकती", "लगाऊँ", "लगा", "सकते", "चाहिए", "लिए", "वाला", "वाले", "वाली", "महीने", "महीना"];
  const isHindiDevanagari = hindiDeva.some(w => cleanLower.includes(" " + w + " "));

  const isHindiRoman = /\b(hai|kya|kaise|kyu|kab|kaha|kahan|karen|kare|meri|mera|mujhe|ka|ki|ko|jo|vah|main|mein|hun|hu|se|kaun|sakta|sakti|he|hain|ho)\b/.test(lower);
  const isMarathiRoman = /\b(ahe|kay|kase|kadhi|kuthe|karu|majhi|majha|mala|cha|chi|che|mi|he|aahe)\b/.test(lower);

  const isMarathi = lower.includes("marathi") || isMarathiDevanagari || isMarathiRoman;
  const isHindi = lower.includes("hindi") || isHindiDevanagari || isHindiRoman;

  if (isMarathi && !isHindi) return "mr";
  if (isHindi && !isMarathi) return "hi";

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

  for (const item of knowledgeBase) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return (item.reply as any)[lang] || item.reply.en;
    }
  }

  if (lower.includes("tell me") || lower.includes("translate") || lower.includes("in hindi") || lower.includes("in marathi") || lower.includes("in english") || lower.includes("this answer")) {
    const lastBotMsg = [...history].reverse().find(m => m.role === 'bot' && m.id !== 'greeting');
    if (lastBotMsg) {
      for (const item of knowledgeBase) {
        if (item.reply.en === lastBotMsg.text || item.reply.hi === lastBotMsg.text || item.reply.mr === lastBotMsg.text) {
          return (item.reply as any)[lang] || item.reply.en;
        }
      }
    }
  }

  const defaults: Record<string, string> = {
    en: "🙏 Thank you for your question! I can help you with:\n\n• Crop diseases & treatments\n• Fertilizer recommendations\n• Irrigation scheduling\n• Soil health improvement\n• Weather-smart farming\n• Pest management\n\nPlease ask about one of these topics or use the quick questions below!",
    hi: "🙏 आपके प्रश्न के लिए धन्यवाद! मैं इसमें मदद कर सकता हूँ:\n\n• फसल रोग और उपचार\n• उर्वरक सिफारिशें\n• सिंचाई\n• मिट्टी का स्वास्थ्य\n• मौसम-स्मार्ट खेती\n• कीट प्रबंधन\n\nकृपया इनमें से किसी विषय के बारे में पूछें!",
    mr: "🙏 तुमच्या प्रश्नासाठी धन्यवाद! मी मदत करू शकतो:\n\n• पीक रोग आणि उपचार\n• खतांच्या शिफारसी\n• सिंचन\n• मातीचे आरोग्य\n• हवामान-स्मार्ट शेती\n• कीड व्यवस्थापन\n\nकृपया यापैकी कोणत्याही विषयाबद्दल विचारा!"
  };
  return defaults[lang] || defaults.en;
}

const quickQuestions = [
  {
    label: "Nagpur Orange diseases",
    icon: Leaf,
    query: "orange canker disease",
  },
  {
    label: "Black Cotton Soil care",
    icon: Zap,
    query: "black cotton soil",
  },
  {
    label: "Tur (Pigeonpea) planting",
    icon: Bug,
    query: "when to plant tur",
  },
  {
    label: "Vidarbha weather updates",
    icon: Droplets,
    query: "vidarbha weather today",
  },
  {
    label: "Cotton pest control",
    icon: CloudSun,
    query: "cotton bollworm pest control",
  },
  {
    label: "Soybean season",
    icon: Sprout,
    query: "soybean sowing month",
  },
];

export function ChatbotPage() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "bot",
      text: t.chatbot_greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

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

  function speakText(text: string, langCode: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode === "hi" ? "hi-IN" : langCode === "mr" ? "mr-IN" : "en-IN";
    utterance.lang = targetLang;
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => v.lang.replace('_', '-').toLowerCase().includes(targetLang.toLowerCase()));
    
    // Many systems don't have a Marathi voice installed. 
    // Fallback to Hindi voice for Devanagari text, which sounds much better than the default English voice failing to read it.
    if (!voice && langCode === "mr") {
      voice = voices.find(v => v.lang.replace('_', '-').toLowerCase().includes("hi-in"));
    }
    
    if (voice) {
      utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  }

  // Scroll to bottom after each new message
  const prevCountRef = useRef(0);
  if (messages.length !== prevCountRef.current) {
    prevCountRef.current = messages.length;
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }

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
      speakText(replyText, ttsLang);
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
        
        speakText(replyText, language);
      }, 1500); // Simulated delay for AI image processing
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // reset input
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl" data-ocid="chatbot-page">
      <div className="mb-6">
        <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          {t.chatbot_title}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t.chatbot_subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Chat area */}
        <Card className="lg:col-span-2 shadow-card flex flex-col h-[65vh]">
          {/* Chat header */}
          <CardHeader className="pb-3 border-b border-border bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm">{t.chatbot_title}</CardTitle>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    Online · Always available
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
                data-ocid="chat-message"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === "bot" ? "bg-primary/10" : "bg-secondary/20",
                  )}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-secondary-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-sm",
                    msg.role === "bot"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm",
                  )}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded crop" className="w-full max-w-[250px] rounded-lg mb-2 object-cover shadow-sm" />
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1 opacity-60",
                      msg.role === "user" ? "text-right" : "text-left",
                    )}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </CardContent>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2 items-center">
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
                className="h-10 w-10 shrink-0 rounded-full transition-colors"
                onClick={() => fileInputRef.current?.click()}
                title="Upload Image"
              >
                <ImagePlus className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn("h-10 w-10 shrink-0 rounded-full transition-colors", isListening && "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90")}
                onClick={toggleListening}
                title="Speak"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage(input)
                }
                placeholder={isListening ? "Listening..." : t.chatbot_placeholder}
                className="text-sm h-10 flex-1"
                data-ocid="chatbot-page-input"
              />
              <Button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="gap-2 flex-shrink-0 h-10"
                data-ocid="chatbot-page-send"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t.chatbot_send}</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick questions + info */}
        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary" />
                {t.chatbot_quick_questions}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map(({ label, icon: Icon, query }) => (
                <button
                  type="button"
                  key={label}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-sm text-left bg-muted/40 hover:bg-muted/80 transition-smooth border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                  onClick={() => sendMessage(query)}
                  data-ocid="quick-question-btn"
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  {label}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Oranges",
                  "Cotton",
                  "Soybean",
                  "Tur",
                  "Wheat",
                  "Rice",
                  "Black Soil",
                  "Pest Control",
                  "Weather",
                ].map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-smooth"
                    onClick={() => sendMessage(topic.toLowerCase())}
                    data-ocid="kb-topic"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Click any topic to get instant farming guidance from our AI
                assistant.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
