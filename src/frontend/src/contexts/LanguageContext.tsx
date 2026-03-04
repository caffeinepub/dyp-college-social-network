import { type ReactNode, createContext, useContext, useState } from "react";

export type Language = "en" | "mar" | "hin";

export const translations = {
  en: {
    announcements: "Announcements",
    updates: "Updates",
    events: "Events",
    home: "Home",
    activityPulse: "Activity Pulse",
    notifications: "Notifications",
    addToCalendar: "Add to Calendar",
    upcomingEvents: "Upcoming Events",
    recentPosts: "Recent Posts",
    help: "Help",
    githubShowcase: "GitHub Showcase",
    markAllRead: "Mark All Read",
    clubs: "Clubs",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    noNotifications: "No notifications yet",
    noEvents: "No upcoming events",
    noPosts: "No posts yet",
    viewAll: "View All",
    submitProject: "Submit Project",
    projectTitle: "Project Title",
    repoUrl: "Repository URL",
    authorName: "Author Name",
    description: "Description",
    cancel: "Cancel",
    submit: "Submit",
    countdown: "Countdown",
    days: "d",
    hours: "h",
    minutes: "m",
    seconds: "s",
    loading: "Loading...",
    clubPage: "Club Page",
    readMore: "Read More",
    allClubs: "All Clubs",
    repoLink: "Open Repository",
    helpTitle: "Help & Guide",
    helpDesc:
      "Welcome to the DYP College Social Network! Here's how to get started:",
    helpItem1:
      "Browse announcements, updates, and events from the top tabs on the home page.",
    helpItem2:
      "Click on any club in the left sidebar to see club-specific posts.",
    helpItem3: "Click the bell icon to see your notifications.",
    helpItem4:
      "Use the GitHub button (bottom-right) to explore or submit student projects.",
    helpItem5:
      "Add events to your calendar using the calendar button on event cards.",
    helpItem6: "Toggle dark/light mode using the sun/moon icon in the header.",
    helpItem7: "Switch language using the language selector in the header.",
    close: "Close",
    posted: "Posted",
    by: "by",
    in: "in",
    noActivity: "No recent activity",
    activityFeed: "Live Activity",
  },
  mar: {
    announcements: "घोषणा",
    updates: "अपडेट्स",
    events: "कार्यक्रम",
    home: "मुख्यपृष्ठ",
    activityPulse: "क्रियाकलाप पल्स",
    notifications: "सूचना",
    addToCalendar: "कॅलेंडरमध्ये जोडा",
    upcomingEvents: "येणारे कार्यक्रम",
    recentPosts: "अलीकडील पोस्ट",
    help: "मदत",
    githubShowcase: "गिटहब शोकेस",
    markAllRead: "सर्व वाचले म्हणून चिन्हांकित करा",
    clubs: "क्लब",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",
    noNotifications: "अद्याप सूचना नाहीत",
    noEvents: "कोणतेही आगामी कार्यक्रम नाहीत",
    noPosts: "अद्याप पोस्ट नाहीत",
    viewAll: "सर्व पहा",
    submitProject: "प्रकल्प सादर करा",
    projectTitle: "प्रकल्प शीर्षक",
    repoUrl: "रिपॉझिटरी URL",
    authorName: "लेखकाचे नाव",
    description: "वर्णन",
    cancel: "रद्द करा",
    submit: "सादर करा",
    countdown: "उलटी गणना",
    days: "दि",
    hours: "त",
    minutes: "मि",
    seconds: "से",
    loading: "लोड होत आहे...",
    clubPage: "क्लब पृष्ठ",
    readMore: "अधिक वाचा",
    allClubs: "सर्व क्लब",
    repoLink: "रिपॉझिटरी उघडा",
    helpTitle: "मदत आणि मार्गदर्शन",
    helpDesc: "DYP कॉलेज सोशल नेटवर्कमध्ये आपले स्वागत आहे!",
    helpItem1: "मुख्यपृष्ठावरील टॅबमधून घोषणा, अपडेट्स आणि कार्यक्रम पहा.",
    helpItem2: "डाव्या साइडबारमध्ये क्लबवर क्लिक करा.",
    helpItem3: "घंटा चिन्हावर क्लिक करून सूचना पहा.",
    helpItem4: "विद्यार्थी प्रकल्पांसाठी GitHub बटण वापरा.",
    helpItem5: "कार्यक्रम कार्डवरील बटणाने कॅलेंडरमध्ये जोडा.",
    helpItem6: "हेडरमधील आयकॉनने डार्क/लाइट मोड बदला.",
    helpItem7: "हेडरमधून भाषा बदला.",
    close: "बंद करा",
    posted: "पोस्ट केले",
    by: "द्वारे",
    in: "मध्ये",
    noActivity: "कोणतीही अलीकडील क्रियाकलाप नाही",
    activityFeed: "थेट क्रियाकलाप",
  },
  hin: {
    announcements: "घोषणाएं",
    updates: "अपडेट्स",
    events: "कार्यक्रम",
    home: "होम",
    activityPulse: "गतिविधि पल्स",
    notifications: "सूचनाएं",
    addToCalendar: "कैलेंडर में जोड़ें",
    upcomingEvents: "आगामी कार्यक्रम",
    recentPosts: "हालिया पोस्ट",
    help: "सहायता",
    githubShowcase: "गिटहब शोकेस",
    markAllRead: "सभी पढ़ा हुआ चिन्हित करें",
    clubs: "क्लब",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",
    noNotifications: "अभी तक कोई सूचना नहीं",
    noEvents: "कोई आगामी कार्यक्रम नहीं",
    noPosts: "अभी तक कोई पोस्ट नहीं",
    viewAll: "सभी देखें",
    submitProject: "प्रोजेक्ट जमा करें",
    projectTitle: "प्रोजेक्ट शीर्षक",
    repoUrl: "रिपॉजिटरी URL",
    authorName: "लेखक का नाम",
    description: "विवरण",
    cancel: "रद्द करें",
    submit: "जमा करें",
    countdown: "उलटी गिनती",
    days: "दि",
    hours: "घ",
    minutes: "मि",
    seconds: "से",
    loading: "लोड हो रहा है...",
    clubPage: "क्लब पृष्ठ",
    readMore: "और पढ़ें",
    allClubs: "सभी क्लब",
    repoLink: "रिपॉजिटरी खोलें",
    helpTitle: "सहायता और मार्गदर्शिका",
    helpDesc: "DYP कॉलेज सोशल नेटवर्क में आपका स्वागत है!",
    helpItem1: "होम पेज के टैब से घोषणाएं, अपडेट्स और कार्यक्रम देखें।",
    helpItem2: "बाएं साइडबार में क्लब पर क्लिक करें।",
    helpItem3: "बेल आइकन पर क्लिक करके सूचनाएं देखें।",
    helpItem4: "स्टूडेंट प्रोजेक्ट्स के लिए GitHub बटन उपयोग करें।",
    helpItem5: "कैलेंडर बटन से इवेंट जोड़ें।",
    helpItem6: "हेडर आइकन से डार्क/लाइट मोड बदलें।",
    helpItem7: "हेडर से भाषा बदलें।",
    close: "बंद करें",
    posted: "पोस्ट किया",
    by: "द्वारा",
    in: "में",
    noActivity: "कोई हालिया गतिविधि नहीं",
    activityFeed: "लाइव गतिविधि",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: TranslationKey): string => {
    return translations[language][key] as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
