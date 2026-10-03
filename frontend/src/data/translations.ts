import type { Language } from "@/types";

export interface Translations {
  // Nav
  nav_home: string;
  nav_soil: string;
  nav_planner: string;
  nav_health: string;
  nav_mandi: string;
  nav_chatbot: string;
  // Header
  auto_detect: string;
  detecting: string;
  language: string;
  farmer_brain: string;
  alerts: string;
  // Home
  home_welcome: string;
  home_subtitle: string;
  home_location: string;
  home_soil_health: string;
  home_crop_recs: string;
  home_active_listings: string;
  home_weather: string;
  home_alerts: string;
  home_no_alerts: string;
  home_view_all: string;
  home_quick_stats: string;
  // Soil
  soil_title: string;
  soil_subtitle: string;
  soil_npk: string;
  soil_nitrogen: string;
  soil_phosphorus: string;
  soil_potassium: string;
  soil_fertility: string;
  soil_recommendations: string;
  soil_update: string;
  soil_last_updated: string;
  soil_location_label: string;
  soil_enter_location: string;
  soil_fetch: string;
  // Planner
  planner_title: string;
  planner_subtitle: string;
  planner_month: string;
  planner_tasks: string;
  planner_sow: string;
  planner_irrigate: string;
  planner_fertilize: string;
  planner_harvest: string;
  planner_weekly_guide: string;
  planner_week: string;
  // Planner — Crop Selection
  planner_crop_select_title: string;
  planner_fasal_naam: string;
  planner_zameen_acres: string;
  planner_aage_badhe: string;
  planner_edit: string;
  planner_acres: string;
  planner_complete: string;
  // Planner — Mandi Prediction
  planner_mandi_title: string;
  planner_nearest_mandis: string;
  planner_ai_prediction: string;
  planner_predicted_range: string;
  planner_best_time: string;
  planner_trend_7day: string;
  planner_sell_wait: string;
  planner_sell_now: string;
  // Health
  health_title: string;
  health_subtitle: string;
  health_upload: string;
  health_drag: string;
  health_analyzing: string;
  health_diagnosis: string;
  health_severity: string;
  health_treatment: string;
  health_confidence: string;
  health_upload_hint: string;
  // Mandi
  mandi_title: string;
  mandi_subtitle: string;
  mandi_list_crop: string;
  mandi_live_auction: string;
  mandi_crop_type: string;
  mandi_quantity: string;
  mandi_base_price: string;
  mandi_harvest_date: string;
  mandi_submit: string;
  mandi_current_bid: string;
  mandi_place_bid: string;
  mandi_max_price: string;
  mandi_timer: string;
  mandi_no_bids: string;
  mandi_listed_by: string;
  // Mandi Buy Flow
  mandi_buy: string;
  mandi_buyer_details: string;
  mandi_buyer_name: string;
  mandi_buyer_phone: string;
  mandi_delivery_address: string;
  mandi_quantity_buy: string;
  mandi_order_summary: string;
  mandi_total_amount: string;
  mandi_confirm_buy: string;
  mandi_purchase_success: string;
  // Payment
  payment_processing: string;
  payment_success: string;
  payment_failed: string;
  payment_redirecting: string;
  payment_success_title: string;
  payment_success_msg: string;
  payment_order_placed: string;
  payment_stripe_notice: string;
  payment_demo_mode: string;
  payment_demo_note: string;
  // Chatbot
  chatbot_title: string;
  chatbot_subtitle: string;
  chatbot_placeholder: string;
  chatbot_send: string;
  chatbot_greeting: string;
  chatbot_quick_questions: string;
  // Auth
  auth_welcome_title: string;
  auth_welcome_subtitle: string;
  auth_login: string;
  auth_signup: string;
  auth_phone: string;
  auth_password: string;
  auth_name: string;
  auth_location: string;
  auth_guest_demo: string;
  auth_logout: string;
  auth_language: string;
  auth_no_account: string;
  auth_have_account: string;
  auth_signing_in: string;
  auth_registering: string;
  // Common
  loading: string;
  error: string;
  retry: string;
  save: string;
  cancel: string;
  submit: string;
  search: string;
  close: string;
  status: string;
  kg: string;
  per_kg: string;
  high: string;
  medium: string;
  low: string;
}

const en: Translations = {
  nav_home: "Home",
  nav_soil: "Soil Intelligence",
  nav_planner: "Crop Planner",
  nav_health: "Crop Health AI",
  nav_mandi: "Digital Mandi",
  nav_chatbot: "AI Chatbot",
  auto_detect: "Auto-Detect Location",
  detecting: "Detecting...",
  language: "Language",
  farmer_brain: "Farmer Brain",
  alerts: "Alerts",
  home_welcome: "Welcome, Farmer!",
  home_subtitle: "Your smart farming dashboard — all insights in one place.",
  home_location: "Current Location",
  home_soil_health: "Soil Health Score",
  home_crop_recs: "AI Crop Recommendations",
  home_active_listings: "Active Mandi Listings",
  home_weather: "Weather Today",
  home_alerts: "Recent Alerts",
  home_no_alerts: "No alerts at the moment",
  home_view_all: "View All",
  home_quick_stats: "Quick Stats",
  soil_title: "Soil Intelligence Dashboard",
  soil_subtitle: "Real-time soil analysis and crop suitability insights",
  soil_npk: "Soil NPK Levels",
  soil_nitrogen: "Nitrogen (N)",
  soil_phosphorus: "Phosphorus (P)",
  soil_potassium: "Potassium (K)",
  soil_fertility: "Fertility Score",
  soil_recommendations: "Crop Recommendations",
  soil_update: "Update Soil Data",
  soil_last_updated: "Last updated",
  soil_location_label: "Location",
  soil_enter_location: "Enter location (e.g., Nagpur, Maharashtra)",
  soil_fetch: "Fetch Soil Data",
  planner_title: "Seasonal Crop Planner",
  planner_subtitle: "Monthly crop calendar with smart farming timeline",
  planner_month: "Month",
  planner_tasks: "Tasks",
  planner_sow: "Sowing",
  planner_irrigate: "Irrigation",
  planner_fertilize: "Fertilization",
  planner_harvest: "Harvesting",
  planner_weekly_guide: "Smart Farming Weekly Guide",
  planner_week: "Week",
  planner_crop_select_title: "Apni Fasal Chuniye",
  planner_fasal_naam: "Fasal ka Naam",
  planner_zameen_acres: "Zameen (Acres)",
  planner_aage_badhe: "Aage Badhe",
  planner_edit: "Edit",
  planner_acres: "Acres",
  planner_complete: "complete",
  planner_mandi_title: "Mandi Aur Bhav Prediction",
  planner_nearest_mandis: "Nearest Mandis (Nagpur Area)",
  planner_ai_prediction: "AI Bhav Prediction",
  planner_predicted_range: "Predicted Price Range",
  planner_best_time: "Best Time to Sell",
  planner_trend_7day: "7-Day Trend",
  planner_sell_wait: "RUKO — Bhav Badhega!",
  planner_sell_now: "BECHO — Abhi Accha Bhav Hai!",
  health_title: "Crop Health AI",
  health_subtitle: "AI-powered crop disease detection and diagnosis",
  health_upload: "Upload Crop Image",
  health_drag: "Drag & drop or click to upload crop image",
  health_analyzing: "Analyzing crop image...",
  health_diagnosis: "Diagnosis",
  health_severity: "Severity",
  health_treatment: "Recommended Treatment",
  health_confidence: "Confidence",
  health_upload_hint: "Supports JPG, PNG, WEBP — max 10MB",
  mandi_title: "Digital Mandi",
  mandi_subtitle: "List your crops and participate in live auctions",
  mandi_list_crop: "List Your Crop",
  mandi_live_auction: "Live Auctions",
  mandi_crop_type: "Crop Type",
  mandi_quantity: "Quantity (kg)",
  mandi_base_price: "Base Price (₹/kg)",
  mandi_harvest_date: "Harvest Date",
  mandi_submit: "List for Auction",
  mandi_current_bid: "Current Bid",
  mandi_place_bid: "Place Bid",
  mandi_max_price: "Max Price",
  mandi_timer: "Time Left",
  mandi_no_bids: "No bids yet — be the first!",
  mandi_listed_by: "Listed by",
  mandi_buy: "Buy",
  mandi_buyer_details: "Buyer Details",
  mandi_buyer_name: "Your Name",
  mandi_buyer_phone: "Phone Number",
  mandi_delivery_address: "Delivery Address",
  mandi_quantity_buy: "Quantity (kg)",
  mandi_order_summary: "Order Summary",
  mandi_total_amount: "Total Amount",
  mandi_confirm_buy: "Confirm Buy",
  mandi_purchase_success: "Purchase confirmed! Seller will contact you.",
  payment_processing: "Processing your payment...",
  payment_success: "Payment Successful",
  payment_failed: "Payment Failed. Please try again.",
  payment_redirecting: "Redirecting to secure payment...",
  payment_success_title: "Payment Successful ✅",
  payment_success_msg: "Your order has been placed!",
  payment_order_placed: "Order ID",
  payment_stripe_notice:
    "You will be redirected to Stripe's secure checkout to complete the payment.",
  payment_demo_mode: "Demo Payment Mode",
  payment_demo_note: "Demo Payment - No actual charge",
  chatbot_title: "Kisan Sahayak AI",
  chatbot_subtitle: "Your intelligent farming assistant",
  chatbot_placeholder: "Ask about crops, soil, weather, diseases...",
  chatbot_send: "Send",
  chatbot_greeting:
    "Namaste! I am Kisan Sahayak AI. Welcome to the Nagpur Farmers network! How can I help you today? Ask me about Oranges, Black soil, weather, or crop diseases.",
  chatbot_quick_questions: "Quick Questions",
  auth_welcome_title: "Farmer Brain",
  auth_welcome_subtitle: "Empowering your Harvest.",
  auth_login: "Login",
  auth_signup: "Sign Up",
  auth_phone: "Phone Number",
  auth_password: "Password",
  auth_name: "Full Name",
  auth_location: "Village / City",
  auth_guest_demo: "Guest Demo",
  auth_logout: "Logout",
  auth_language: "Language",
  auth_no_account: "Don't have an account?",
  auth_have_account: "Already have an account?",
  auth_signing_in: "Signing in...",
  auth_registering: "Creating account...",
  loading: "Loading...",
  error: "Something went wrong",
  retry: "Retry",
  save: "Save",
  cancel: "Cancel",
  submit: "Submit",
  search: "Search",
  close: "Close",
  status: "Status",
  kg: "kg",
  per_kg: "₹/kg",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const hi: Translations = {
  nav_home: "होम",
  nav_soil: "मिट्टी विश्लेषण",
  nav_planner: "फसल योजनाकार",
  nav_health: "फसल स्वास्थ्य AI",
  nav_mandi: "डिजिटल मंडी",
  nav_chatbot: "AI चैटबॉट",
  auto_detect: "स्थान पहचानें",
  detecting: "पहचान हो रही है...",
  language: "भाषा",
  farmer_brain: "किसान ब्रेन",
  alerts: "अलर्ट",
  home_welcome: "स्वागत है, किसान भाई!",
  home_subtitle: "आपका स्मार्ट खेती डैशबोर्ड — सभी जानकारी एक जगह।",
  home_location: "वर्तमान स्थान",
  home_soil_health: "मिट्टी स्वास्थ्य स्कोर",
  home_crop_recs: "AI फसल सिफारिशें",
  home_active_listings: "सक्रिय मंडी सूचियां",
  home_weather: "आज का मौसम",
  home_alerts: "हाल के अलर्ट",
  home_no_alerts: "अभी कोई अलर्ट नहीं",
  home_view_all: "सभी देखें",
  home_quick_stats: "त्वरित आंकड़े",
  soil_title: "मिट्टी विश्लेषण डैशबोर्ड",
  soil_subtitle: "रियल-टाइम मिट्टी विश्लेषण और फसल उपयुक्तता",
  soil_npk: "मिट्टी NPK स्तर",
  soil_nitrogen: "नाइट्रोजन (N)",
  soil_phosphorus: "फॉस्फोरस (P)",
  soil_potassium: "पोटेशियम (K)",
  soil_fertility: "उर्वरता स्कोर",
  soil_recommendations: "फसल सिफारिशें",
  soil_update: "मिट्टी डेटा अपडेट करें",
  soil_last_updated: "अंतिम अपडेट",
  soil_location_label: "स्थान",
  soil_enter_location: "स्थान दर्ज करें (जैसे, नागपुर, महाराष्ट्र)",
  soil_fetch: "मिट्टी डेटा प्राप्त करें",
  planner_title: "मौसमी फसल योजनाकार",
  planner_subtitle: "मासिक फसल कैलेंडर और स्मार्ट खेती टाइमलाइन",
  planner_month: "महीना",
  planner_tasks: "कार्य",
  planner_sow: "बुवाई",
  planner_irrigate: "सिंचाई",
  planner_fertilize: "उर्वरक",
  planner_harvest: "कटाई",
  planner_weekly_guide: "स्मार्ट खेती साप्ताहिक गाइड",
  planner_week: "सप्ताह",
  planner_crop_select_title: "अपनी फसल चुनिए",
  planner_fasal_naam: "फसल का नाम",
  planner_zameen_acres: "ज़मीन (एकड़)",
  planner_aage_badhe: "आगे बढ़ें",
  planner_edit: "बदलें",
  planner_acres: "एकड़",
  planner_complete: "पूर्ण",
  planner_mandi_title: "मंडी और भाव अनुमान",
  planner_nearest_mandis: "नज़दीकी मंडियां (नागपुर क्षेत्र)",
  planner_ai_prediction: "AI भाव अनुमान",
  planner_predicted_range: "अनुमानित मूल्य सीमा",
  planner_best_time: "बेचने का सही समय",
  planner_trend_7day: "7 दिन का ट्रेंड",
  planner_sell_wait: "रुको — भाव बढ़ेगा!",
  planner_sell_now: "बेचो — अभी अच्छा भाव है!",
  health_title: "फसल स्वास्थ्य AI",
  health_subtitle: "AI-संचालित फसल रोग पहचान",
  health_upload: "फसल की तस्वीर अपलोड करें",
  health_drag: "तस्वीर यहाँ खींचें या क्लिक करें",
  health_analyzing: "फसल की तस्वीर का विश्लेषण...",
  health_diagnosis: "निदान",
  health_severity: "गंभीरता",
  health_treatment: "अनुशंसित उपचार",
  health_confidence: "विश्वास",
  health_upload_hint: "JPG, PNG, WEBP समर्थित — अधिकतम 10MB",
  mandi_title: "डिजिटल मंडी",
  mandi_subtitle: "अपनी फसल सूचीबद्ध करें और लाइव नीलामी में भाग लें",
  mandi_list_crop: "फसल सूचीबद्ध करें",
  mandi_live_auction: "लाइव नीलामी",
  mandi_crop_type: "फसल का प्रकार",
  mandi_quantity: "मात्रा (किग्रा)",
  mandi_base_price: "आधार मूल्य (₹/किग्रा)",
  mandi_harvest_date: "कटाई की तारीख",
  mandi_submit: "नीलामी के लिए सूचीबद्ध करें",
  mandi_current_bid: "वर्तमान बोली",
  mandi_place_bid: "बोली लगाएं",
  mandi_max_price: "अधिकतम मूल्य",
  mandi_timer: "शेष समय",
  mandi_no_bids: "अभी कोई बोली नहीं — पहले बोलें!",
  mandi_listed_by: "द्वारा सूचीबद्ध",
  mandi_buy: "खरीदें",
  mandi_buyer_details: "खरीदार विवरण",
  mandi_buyer_name: "आपका नाम",
  mandi_buyer_phone: "फोन नंबर",
  mandi_delivery_address: "डिलीवरी पता",
  mandi_quantity_buy: "मात्रा (किग्रा)",
  mandi_order_summary: "ऑर्डर सारांश",
  mandi_total_amount: "कुल राशि",
  mandi_confirm_buy: "खरीद की पुष्टि करें",
  mandi_purchase_success: "खरीद की पुष्टि हो गई! विक्रेता आपसे संपर्क करेगा।",
  payment_processing: "भुगतान प्रक्रिया जारी है...",
  payment_success: "भुगतान सफल",
  payment_failed: "भुगतान विफल। पुनः प्रयास करें।",
  payment_redirecting: "सुरक्षित भुगतान पृष्ठ पर जा रहे हैं...",
  payment_success_title: "भुगतान सफल ✅",
  payment_success_msg: "आपका ऑर्डर दर्ज हो गया!",
  payment_order_placed: "ऑर्डर ID",
  payment_stripe_notice:
    "भुगतान पूरा करने के लिए आपको Stripe के सुरक्षित चेकआउट पर भेजा जाएगा।",
  payment_demo_mode: "डेमो पेमेंट मोड",
  payment_demo_note: "डेमो पेमेंट - कोई वास्तविक शुल्क नहीं",
  chatbot_title: "किसान सहायक AI",
  chatbot_subtitle: "आपका बुद्धिमान खेती सहायक",
  chatbot_placeholder: "फसल, मिट्टी, मौसम, रोग के बारे में पूछें...",
  chatbot_send: "भेजें",
  chatbot_greeting: "नमस्ते! मैं किसान सहायक AI हूँ। नागपुर किसान नेटवर्क में आपका स्वागत है! आज मैं आपकी कैसे मदद कर सकता हूँ? मुझसे संतरे, काली मिट्टी, मौसम या फसल रोगों के बारे में पूछें।",
  chatbot_quick_questions: "त्वरित प्रश्न",
  auth_welcome_title: "किसान ब्रेन",
  auth_welcome_subtitle: "आपकी फसल को सशक्त बनाएं।",
  auth_login: "लॉगिन",
  auth_signup: "साइन अप",
  auth_phone: "फोन नंबर",
  auth_password: "पासवर्ड",
  auth_name: "पूरा नाम",
  auth_location: "गांव / शहर",
  auth_guest_demo: "अतिथि डेमो",
  auth_logout: "लॉगआउट",
  auth_language: "भाषा",
  auth_no_account: "खाता नहीं है?",
  auth_have_account: "पहले से खाता है?",
  auth_signing_in: "लॉगिन हो रहा है...",
  auth_registering: "खाता बना रहे हैं...",
  loading: "लोड हो रहा है...",
  error: "कुछ गलत हुआ",
  retry: "पुनः प्रयास",
  save: "सहेजें",
  cancel: "रद्द करें",
  submit: "जमा करें",
  search: "खोज",
  close: "बंद करें",
  status: "स्थिति",
  kg: "किग्रा",
  per_kg: "₹/किग्रा",
  high: "उच्च",
  medium: "मध्यम",
  low: "निम्न",
};

const mr: Translations = {
  nav_home: "मुखपृष्ठ",
  nav_soil: "माती विश्लेषण",
  nav_planner: "पीक नियोजक",
  nav_health: "पीक आरोग्य AI",
  nav_mandi: "डिजिटल मंडी",
  nav_chatbot: "AI चॅटबॉट",
  auto_detect: "स्थान शोधा",
  detecting: "शोधत आहे...",
  language: "भाषा",
  farmer_brain: "शेतकरी ब्रेन",
  alerts: "सूचना",
  home_welcome: "स्वागत आहे, शेतकरी!",
  home_subtitle: "तुमचा स्मार्ट शेती डॅशबोर्ड — सर्व माहिती एकाच ठिकाणी.",
  home_location: "सध्याचे स्थान",
  home_soil_health: "माती आरोग्य गुण",
  home_crop_recs: "AI पीक शिफारसी",
  home_active_listings: "सक्रिय मंडी यादी",
  home_weather: "आजचे हवामान",
  home_alerts: "अलीकडील सूचना",
  home_no_alerts: "सध्या कोणत्याही सूचना नाहीत",
  home_view_all: "सर्व पहा",
  home_quick_stats: "जलद आकडेवारी",
  soil_title: "माती विश्लेषण डॅशबोर्ड",
  soil_subtitle: "रियल-टाइम माती विश्लेषण आणि पीक योग्यता",
  soil_npk: "माती NPK पातळी",
  soil_nitrogen: "नायट्रोजन (N)",
  soil_phosphorus: "फॉस्फरस (P)",
  soil_potassium: "पोटॅशियम (K)",
  soil_fertility: "सुपीकता गुण",
  soil_recommendations: "पीक शिफारसी",
  soil_update: "माती डेटा अपडेट करा",
  soil_last_updated: "शेवटचे अपडेट",
  soil_location_label: "स्थान",
  soil_enter_location: "स्थान प्रविष्ट करा (उदा., नागपूर, महाराष्ट्र)",
  soil_fetch: "माती डेटा मिळवा",
  planner_title: "हंगामी पीक नियोजक",
  planner_subtitle: "मासिक पीक दिनदर्शिका आणि स्मार्ट शेती वेळापत्रक",
  planner_month: "महिना",
  planner_tasks: "कार्ये",
  planner_sow: "पेरणी",
  planner_irrigate: "सिंचन",
  planner_fertilize: "खत",
  planner_harvest: "कापणी",
  planner_weekly_guide: "स्मार्ट शेती साप्ताहिक मार्गदर्शिका",
  planner_week: "आठवडा",
  planner_crop_select_title: "आपले पीक निवडा",
  planner_fasal_naam: "पिकाचे नाव",
  planner_zameen_acres: "जमीन (एकर)",
  planner_aage_badhe: "पुढे जा",
  planner_edit: "बदला",
  planner_acres: "एकर",
  planner_complete: "पूर्ण",
  planner_mandi_title: "मंडी आणि भाव अंदाज",
  planner_nearest_mandis: "जवळच्या मंड्या (नागपूर परिसर)",
  planner_ai_prediction: "AI भाव अंदाज",
  planner_predicted_range: "अंदाजे किंमत श्रेणी",
  planner_best_time: "विक्रीची योग्य वेळ",
  planner_trend_7day: "७ दिवसांचा ट्रेंड",
  planner_sell_wait: "थांबा — भाव वाढेल!",
  planner_sell_now: "विका — आत्ता चांगला भाव आहे!",
  health_title: "पीक आरोग्य AI",
  health_subtitle: "AI-संचालित पीक रोग ओळख",
  health_upload: "पीकाचे छायाचित्र अपलोड करा",
  health_drag: "छायाचित्र येथे ड्रॅग करा किंवा क्लिक करा",
  health_analyzing: "पीक प्रतिमेचे विश्लेषण...",
  health_diagnosis: "निदान",
  health_severity: "तीव्रता",
  health_treatment: "शिफारस केलेले उपचार",
  health_confidence: "विश्वास",
  health_upload_hint: "JPG, PNG, WEBP समर्थित — कमाल 10MB",
  mandi_title: "डिजिटल मंडी",
  mandi_subtitle: "तुमचे पीक यादी करा आणि थेट लिलावात भाग घ्या",
  mandi_list_crop: "पीक यादी करा",
  mandi_live_auction: "थेट लिलाव",
  mandi_crop_type: "पीकाचा प्रकार",
  mandi_quantity: "प्रमाण (किग्रा)",
  mandi_base_price: "आधार किंमत (₹/किग्रा)",
  mandi_harvest_date: "कापणीची तारीख",
  mandi_submit: "लिलावासाठी यादी करा",
  mandi_current_bid: "सध्याची बोली",
  mandi_place_bid: "बोली लावा",
  mandi_max_price: "कमाल किंमत",
  mandi_timer: "उर्वरित वेळ",
  mandi_no_bids: "अद्याप कोणतीही बोली नाही — प्रथम बोला!",
  mandi_listed_by: "द्वारे यादी केली",
  mandi_buy: "विकत घ्या",
  mandi_buyer_details: "खरेदीदाराचे तपशील",
  mandi_buyer_name: "तुमचे नाव",
  mandi_buyer_phone: "फोन नंबर",
  mandi_delivery_address: "डिलिव्हरी पत्ता",
  mandi_quantity_buy: "प्रमाण (किलो)",
  mandi_order_summary: "ऑर्डर सारांश",
  mandi_total_amount: "एकूण रक्कम",
  mandi_confirm_buy: "खरेदी निश्चित करा",
  mandi_purchase_success: "खरेदी निश्चित! विक्रेता तुमच्याशी संपर्क साधेल.",
  payment_processing: "पेमेंट प्रक्रिया सुरू आहे...",
  payment_success: "पेमेंट यशस्वी",
  payment_failed: "पेमेंट अयशस्वी. पुन्हा प्रयत्न करा.",
  payment_redirecting: "सुरक्षित पेमेंट पेजवर जात आहे...",
  payment_success_title: "पेमेंट यशस्वी ✅",
  payment_success_msg: "तुमची ऑर्डर नोंदवली गेली!",
  payment_order_placed: "ऑर्डर ID",
  payment_stripe_notice:
    "पेमेंट पूर्ण करण्यासाठी तुम्हाला Stripe च्या सुरक्षित चेकआउटवर पाठवले जाईल.",
  payment_demo_mode: "डेमो पेमेंट मोड",
  payment_demo_note: "डेमो पेमेंट - कोणतेही वास्तविक शुल्क नाही",
  chatbot_title: "किसान सहायक AI",
  chatbot_subtitle: "तुमचा बुद्धिमान शेती सहायक",
  chatbot_placeholder: "पीक, माती, हवामान, रोगांबद्दल विचारा...",
  chatbot_send: "पाठवा",
  chatbot_greeting: "नमस्ते! मी किसान सहायक AI आहे. नागपूर शेतकरी नेटवर्कमध्ये आपले स्वागत आहे! आज मी तुम्हाला कशी मदत करू शकतो? मला संत्री, काळी माती, हवामान किंवा पिकांच्या रोगांबद्दल विचारा.",
  chatbot_quick_questions: "जलद प्रश्न",
  auth_welcome_title: "शेतकरी ब्रेन",
  auth_welcome_subtitle: "तुमच्या पिकाला सक्षम करा.",
  auth_login: "लॉगिन",
  auth_signup: "साइन अप",
  auth_phone: "फोन नंबर",
  auth_password: "पासवर्ड",
  auth_name: "पूर्ण नाव",
  auth_location: "गाव / शहर",
  auth_guest_demo: "अतिथी डेमो",
  auth_logout: "लॉगआउट",
  auth_language: "भाषा",
  auth_no_account: "खाते नाही?",
  auth_have_account: "आधीच खाते आहे?",
  auth_signing_in: "लॉगिन होत आहे...",
  auth_registering: "खाते तयार होत आहे...",
  loading: "लोड होत आहे...",
  error: "काहीतरी चुकले",
  retry: "पुन्हा प्रयत्न करा",
  save: "जतन करा",
  cancel: "रद्द करा",
  submit: "सबमिट करा",
  search: "शोध",
  close: "बंद करा",
  status: "स्थिती",
  kg: "किग्रा",
  per_kg: "₹/किग्रा",
  high: "उच्च",
  medium: "मध्यम",
  low: "कमी",
};

export const translations: Record<Language, Translations> = { en, hi, mr, pa: hi, gu: hi };

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
  pa: "ਪੰਜਾਬੀ",
  gu: "ગુજરાતી",
};
