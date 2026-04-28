import { Language, LanguageData } from './types';

export const LANGUAGES: Record<Language, LanguageData> = {
  spanish: {
    name: 'Spanish',
    flag: '🇪🇸',
    phrases: [
      { original: 'Hola', translated: 'Hello', pronunciation: 'oh-lah' },
      { original: 'Gracias', translated: 'Thank you', pronunciation: 'grah-see-ahs' },
      { original: '¿Cómo estás?', translated: 'How are you?', pronunciation: 'koh-moh es-tahs' },
      { original: 'Me gusta aprender', translated: 'I like learning', pronunciation: 'meh goos-tah ah-pren-dehr' },
    ],
    quiz: [
      {
        question: 'How do you say "Thank you" in Spanish?',
        options: ['Hola', 'Gracias', 'Por favor', 'Adiós'],
        correctAnswer: 'Gracias',
        explanation: '"Gracias" is the standard way to express gratitude in Spanish.'
      },
      {
        question: 'What does "Hola" mean?',
        options: ['Goodbye', 'Please', 'Hello', 'Water'],
        correctAnswer: 'Hello',
        explanation: '"Hola" is a common greeting meaning "Hello".'
      }
    ]
  },
  french: {
    name: 'French',
    flag: '🇫🇷',
    phrases: [
      { original: 'Bonjour', translated: 'Hello', pronunciation: 'bohn-zhoor' },
      { original: 'Merci', translated: 'Thank you', pronunciation: 'mehr-see' },
      { original: 'Comment ça va?', translated: 'How is it going?', pronunciation: 'koh-mahn sah vah' },
      { original: 'J\'aime voyager', translated: 'I like to travel', pronunciation: 'zhem vwah-yah-zhay' },
    ],
    quiz: [
      {
        question: 'Translate "Hello" to French:',
        options: ['Salut', 'Merci', 'Bonjour', 'Pardon'],
        correctAnswer: 'Bonjour',
        explanation: '"Bonjour" is the most common way to say hello during the day.'
      },
      {
        question: 'What is "Thank you" in French?',
        options: ['S\'il vous plaît', 'Merci', 'Oui', 'Non'],
        correctAnswer: 'Merci',
        explanation: '"Merci" means thank you.'
      }
    ]
  },
  japanese: {
    name: 'Japanese',
    flag: '🇯🇵',
    phrases: [
      { original: 'こんにちは', translated: 'Hello', pronunciation: 'Kon-ni-chi-wa' },
      { original: 'ありがとう', translated: 'Thank you', pronunciation: 'A-ri-ga-tou' },
      { original: 'お元気ですか？', translated: 'How are you?', pronunciation: 'O-gen-ki de-su ka?' },
      { original: '日本語を勉強しています', translated: 'I am studying Japanese', pronunciation: 'Ni-hon-go o ben-kyou shi-te i-ma-su' },
    ],
    quiz: [
      {
        question: 'What is the Japanese word for "Hello"?',
        options: ['Arigatou', 'Sayonara', 'Konnichiwa', 'Sumimasen'],
        correctAnswer: 'Konnichiwa',
        explanation: '"Konnichiwa" is the standard greeting used in the daytime.'
      },
      {
        question: 'Which of these means "Thank you"?',
        options: ['Ohayou', 'Arigatou', 'Oishii', 'Sugoi'],
        correctAnswer: 'Arigatou',
        explanation: '"Arigatou" is a polite way to say thank you.'
      }
    ]
  },
  german: {
    name: 'German',
    flag: '🇩🇪',
    phrases: [
      { original: 'Hallo', translated: 'Hello', pronunciation: 'hah-loh' },
      { original: 'Danke', translated: 'Thank you', pronunciation: 'dahn-keh' },
      { original: 'Wie geht es dir?', translated: 'How are you?', pronunciation: 'vee geyt es deer' },
      { original: 'Ich lerne Deutsch', translated: 'I am learning German', pronunciation: 'ikh lehr-neh doytsh' },
    ],
    quiz: [
      {
        question: 'How do you say "Hello" in German?',
        options: ['Guten Tag', 'Danke', 'Hallo', 'Bitte'],
        correctAnswer: 'Hallo',
        explanation: '"Hallo" is the informal and common way to say hello.'
      },
      {
        question: 'What does "Danke" mean?',
        options: ['Please', 'Thank you', 'Yes', 'No'],
        correctAnswer: 'Thank you',
        explanation: '"Danke" means thank you in German.'
      }
    ]
  }
};
