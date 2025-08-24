import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
const resources = {
  en: {
    translation: {
      Navbar: {
        home: "Home",
        blog: "Blog",
        about: "About",
        profile: "Profile",
        login: "Login",
        logout: "Logout",
        search: "Search...",
        dashboard: "Dashboard"
      },
      Footer: {
        rights: "All rights reserved."
      },
      Home: {
        solve_problems: "Solve your logistics problems",
        subtitle_text: "MMSH Logistics - Your reliable partner for transportation and logistics services",
        learn_more: "Learn More",
        instagram: "Instagram",
        get_started: "Get started by",
        login: "logging in"
      },
      siteConfig: {
        name: "MMSH Logistics",
        description: "MMSH Logistics Web Application"
      },
      Language: {
        en: "English",
        ru: "Russian",
        uz: "Uzbek",
        switch: "Switch language"
      },
      Common: {
        loading: "Loading...",
        error: "Error occurred",
        success: "Success",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        create: "Create",
        view: "View",
        back: "Back",
        next: "Next",
        previous: "Previous",
        submit: "Submit",
        reset: "Reset",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        download: "Download",
        upload: "Upload",
        confirm: "Confirm",
        yes: "Yes",
        no: "No",
        ok: "OK",
        name: "Name",
        surname: "Surname",
        welcome: "Welcome To MMSH",
        confirm_country_code: "Please confirm your country code and enter your phone number",
        try_again: "Try again",
        try_again_sms: "Try again to send SMS",
        send_sms: "You can send another SMS in just",
        send_sms_in: "You can send another SMS in {{time}} seconds",
        send: "Send",
        sent_code: "We have sent the code to your phone number."
      }
    },
  },
  ru: {
    translation: {
      Navbar: {
        home: "Главная",
        blog: "Блог",
        about: "О нас",
        profile: "Профиль",
        login: "Войти",
        logout: "Выйти",
        search: "Поиск...",
        dashboard: "Панель управления"
      },
      Footer: {
        rights: "Все права защищены."
      },
      Home: {
        solve_problems: "Решите свои логистические проблемы",
        subtitle_text: "MMSH Logistics - Ваш надежный партнер в области транспортировки и логистики",
        learn_more: "Узнать больше",
        instagram: "Инстаграм",
        get_started: "Начните с",
        login: "входа"
      },
      siteConfig: {
        name: "MMSH Logistics",
        description: "Веб-приложение MMSH Logistics"
      },
      Language: {
        en: "Английский",
        ru: "Русский",
        uz: "Узбекский",
        switch: "Сменить язык"
      },
      Common: {
        loading: "Загрузка...",
        error: "Произошла ошибка",
        success: "Успех",
        save: "Сохранить",
        cancel: "Отмена",
        delete: "Удалить",
        edit: "Редактировать",
        create: "Создать",
        view: "Просмотреть",
        back: "Назад",
        next: "Далее",
        previous: "Предыдущий",
        submit: "Отправить",
        reset: "Сбросить",
        search: "Поиск",
        filter: "Фильтр",
        sort: "Сортировать",
        download: "Скачать",
        upload: "Загрузить",
        confirm: "Подтвердить",
        yes: "Да",
        no: "Нет",
        ok: "ОК",
        name: "Имя",
        surname: "Фамилия",
        welcome: "Добро пожаловать в MMSH",
        confirm_country_code: "Пожалуйста, подтвердите код страны и введите свой номер телефона"
      }
    },
  },
  uz: {
    translation: {
      Navbar: {
        home: "Bosh sahifa",
        blog: "Blog",
        about: "Biz haqimizda",
        profile: "Profil",
        login: "Kirish",
        logout: "Chiqish",
        search: "Qidirish...",
        dashboard: "Boshqaruv paneli"
      },
      Footer: {
        rights: "Barcha huquqlar himoyalangan."
      },
      Home: {
        solve_problems: "Logistika muammolaringizni hal qiling",
        subtitle_text: "MMSH Logistics - Transport va logistika xizmatlari bo'yicha ishonchli hamkoringiz",
        learn_more: "Ko'proq biling",
        instagram: "Instagram",
        get_started: "Boshlash uchun",
        login: "tizimga kiring"
      },
      siteConfig: {
        name: "MMSH Logistics",
        description: "MMSH Logistics veb-ilovasi"
      },
      Language: {
        en: "Inglizcha",
        ru: "Ruscha",
        uz: "O'zbekcha",
        switch: "Tilni o'zgartirish"
      },
      Common: {
        loading: "Yuklanmoqda...",
        error: "Xatolik yuz berdi",
        success: "Muvaffaqiyat",
        save: "Saqlash",
        cancel: "Bekor qilish",
        delete: "O'chirish",
        edit: "Tahrirlash",
        create: "Yaratish",
        view: "Ko'rish",
        back: "Orqaga",
        next: "Keyingi",
        previous: "Oldingi",
        submit: "Yuborish",
        reset: "Qayta o'rnatish",
        search: "Qidirish",
        filter: "Filtr",
        sort: "Saralash",
        download: "Yuklab olish",
        upload: "Yuklash",
        confirm: "Tasdiqlash",
        yes: "Ha",
        no: "Yo'q",
        ok: "OK",
        name: "Ism",
        surname: "Familiya",
        welcome: "MMSH ga xush kelibsiz",
        confirm_country_code: "Iltimos, mamlakat kodini tasdiqlang va telefon raqamingizni kiriting"
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
