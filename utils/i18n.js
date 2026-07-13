import { createContext, useContext, useMemo } from 'react';
import {
  translations,
  CATEGORY_NAMES_ES,
  DAY_NAMES_ES,
  DAY_ABBR_ES,
  WEEKDAY_LETTERS_ES,
  MONTH_NAMES_ES,
} from './translations';
import { EXERCISE_TRANSLATIONS_ES } from '../data/exercises.es';

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_LETTERS_EN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getByPath(source, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), source);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ language, setLanguage, children }) {
  const value = useMemo(() => {
    function t(path, ...args) {
      const entry = getByPath(translations[language], path);
      if (typeof entry === 'function') {
        return entry(...args);
      }
      return entry ?? path;
    }

    function translateCategory(category) {
      return language === 'es' ? CATEGORY_NAMES_ES[category] ?? category : category;
    }

    function translateDay(day) {
      return language === 'es' ? DAY_NAMES_ES[day] ?? day : day;
    }

    function translateDayAbbr(day) {
      return language === 'es' ? DAY_ABBR_ES[day] ?? day : day;
    }

    function translateExercise(exercise) {
      if (!exercise) {
        return exercise;
      }
      if (language === 'es') {
        const es = EXERCISE_TRANSLATIONS_ES[exercise.id];
        if (es) {
          return { ...exercise, name: es.name, setup: es.setup, steps: es.steps };
        }
      }
      return exercise;
    }

    return {
      language,
      setLanguage,
      t,
      translateCategory,
      translateDay,
      translateDayAbbr,
      translateExercise,
      monthNames: language === 'es' ? MONTH_NAMES_ES : MONTH_NAMES_EN,
      weekdayLetters: language === 'es' ? WEEKDAY_LETTERS_ES : WEEKDAY_LETTERS_EN,
      locale: language === 'es' ? 'es-ES' : 'en-US',
    };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
