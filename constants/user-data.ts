export interface Country {
  code: string
  name: string
  flag: string
}

export interface Language {
  code: string
  name: string
  flagEmoji?: string // Optional flag emoji for language
}

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
]

export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "de", name: "German" },
  { code: "zh", name: "Mandarin Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "pl", name: "Polish" },
  { code: "ar", name: "Arabic" },
  { code: "da", name: "Danish" },
  { code: "ru", name: "Russian" },
  { code: "bg", name: "Bulgarian" },
]

// Extended countries list for friend requests
export const EXTENDED_COUNTRIES: Country[] = [
  ...COUNTRIES,
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
]

export const getCountryByCode = (code: string): Country | undefined => {
  return EXTENDED_COUNTRIES.find((country) => country.code === code)
}

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find((language) => language.code === code)
}


