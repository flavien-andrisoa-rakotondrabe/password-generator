import { 
  CHARSET_LOWERCASE, 
  CHARSET_UPPERCASE, 
  CHARSET_DIGITS, 
  CHARSET_SPECIAL,
  ENTROPY_THRESHOLDS,
  PASSWORD_QUALITIES 
} from './constants.js';

/**
 * Calcule le jeu de caractères utilisé dans le mot de passe
 * @param {string} password - Le mot de passe à analyser
 * @returns {Object} Objet contenant les caractéristiques
 */
export function analyzePasswordCharset(password) {
  if (!password) {
    return {
      hasLower: false,
      hasUpper: false,
      hasDigits: false,
      hasSpecial: false,
      charsetSize: 0,
    };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()\-_=+[\]{}|;:,.<>?]/.test(password);

  let charsetSize = 0;
  if (hasLower) charsetSize += CHARSET_LOWERCASE.length;
  if (hasUpper) charsetSize += CHARSET_UPPERCASE.length;
  if (hasDigits) charsetSize += CHARSET_DIGITS.length;
  if (hasSpecial) charsetSize += CHARSET_SPECIAL.length;

  return {
    hasLower,
    hasUpper,
    hasDigits,
    hasSpecial,
    charsetSize,
  };
}

/**
 * Calcule l'entropie du mot de passe
 * Formule : E = L × log₂(R)
 * L = longueur du mot de passe
 * R = nombre de caractères possibles
 * @param {string} password - Le mot de passe
 * @returns {number} L'entropie en bits
 */
export function calculateEntropy(password) {
  if (!password || password.length === 0) return 0;

  const charset = analyzePasswordCharset(password);
  const length = password.length;
  const characterSetSize = charset.charsetSize;

  if (characterSetSize === 0) return 0;

  // Entropie = length × log2(characterSetSize)
  const entropy = length * Math.log2(characterSetSize);
  return Math.round(entropy * 100) / 100; // Arrondir à 2 décimales
}

/**
 * Détermine la qualité du mot de passe basée sur l'entropie
 * @param {number} entropy - L'entropie en bits
 * @returns {Object} Objet avec la qualité et les détails
 */
export function getPasswordQuality(entropy) {
  // Trouver le seuil approprié
  let quality = ENTROPY_THRESHOLDS[0];
  
  for (const [threshold, info] of Object.entries(ENTROPY_THRESHOLDS)) {
    if (entropy >= parseInt(threshold)) {
      quality = info;
    }
  }

  return quality;
}

/**
 * Calcule le nombre total de combinaisons possibles pour brute force
 * @param {string} password - Le mot de passe cible
 * @returns {number} Le nombre total de combinaisons
 */
export function calculateTotalCombinations(password) {
  if (!password) return 0;

  const charset = analyzePasswordCharset(password);
  const length = password.length;
  
  return Math.pow(charset.charsetSize, length);
}

/**
 * Estime le temps nécessaire pour craquer un mot de passe par brute force
 * @param {string} password - Le mot de passe cible
 * @param {number} speed - Vitesse en tentatives par seconde (par défaut CPU)
 * @returns {Object} Objet avec le temps estimé et les détails
 */
export function estimateCrackingTime(password, speed = 500000) {
  const totalCombinations = calculateTotalCombinations(password);
  const averageTries = totalCombinations / 2; // En moyenne, on teste la moitié
  
  // Temps en secondes
  const seconds = averageTries / speed;
  
  // Convertir en unités compréhensibles
  let timeString = '';
  let value = 0;

  if (seconds < 1) {
    timeString = `${(seconds * 1000).toFixed(0)} ms`;
    value = seconds * 1000;
  } else if (seconds < 60) {
    timeString = `${seconds.toFixed(2)} secondes`;
    value = seconds;
  } else if (seconds < 3600) {
    const minutes = seconds / 60;
    timeString = `${minutes.toFixed(2)} minutes`;
    value = minutes;
  } else if (seconds < 86400) {
    const hours = seconds / 3600;
    timeString = `${hours.toFixed(2)} heures`;
    value = hours;
  } else if (seconds < 31536000) {
    const days = seconds / 86400;
    timeString = `${days.toFixed(2)} jours`;
    value = days;
  } else if (seconds < 31536000 * 1000) {
    const years = seconds / 31536000;
    timeString = `${years.toFixed(2)} ans`;
    value = years;
  } else {
    timeString = '> 1000 ans';
    value = Infinity;
  }

  return {
    seconds,
    timeString,
    totalCombinations,
    averageTries,
    isPractical: seconds < 86400, // Si c'est moins d'un jour
  };
}

/**
 * Génère un mot de passe aléatoire
 * @param {Object} options - Options de génération
 * @returns {string} Le mot de passe généré
 */
export function generatePassword(options = {}) {
  const {
    length = 16,
    includeLower = true,
    includeUpper = true,
    includeDigits = true,
    includeSpecial = true,
  } = options;

  let charset = '';
  if (includeLower) charset += CHARSET_LOWERCASE;
  if (includeUpper) charset += CHARSET_UPPERCASE;
  if (includeDigits) charset += CHARSET_DIGITS;
  if (includeSpecial) charset += CHARSET_SPECIAL;

  if (charset.length === 0) charset = CHARSET_LOWERCASE;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}

/**
 * Formate un nombre grand avec des séparateurs
 * @param {number} num - Le nombre à formater
 * @returns {string} Le nombre formaté
 */
export function formatNumber(num) {
  return num.toLocaleString('fr-FR', {
    maximumFractionDigits: 0,
  });
}

/**
 * Formate l'entropie pour l'affichage
 * @param {number} entropy - L'entropie en bits
 * @returns {string} Entropie formatée
 */
export function formatEntropy(entropy) {
  return `${entropy.toFixed(1)} bits`;
}

/**
 * Crée un hash SHA-256 d'un mot de passe (pour la démonstration)
 * Attention : c'est une simulation, pas un vrai hash sécurisé
 * @param {string} password - Le mot de passe
 * @returns {Promise<string>} Le hash en hex
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convertir en hex
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Simule une attaque dictionnaire
 * @param {string} password - Le mot de passe à craquer
 * @param {Array<string>} dictionary - Le dictionnaire à utiliser
 * @returns {Object} Résultat de l'attaque
 */
export function dictionaryAttack(password, dictionary) {
  const startTime = performance.now();
  let found = false;
  let attempts = 0;
  let foundPassword = null;

  for (const word of dictionary) {
    attempts++;
    if (word === password) {
      found = true;
      foundPassword = word;
      break;
    }
  }

  const endTime = performance.now();
  const timeMs = endTime - startTime;

  return {
    found,
    attempts,
    foundPassword,
    timeMs,
    speed: (attempts / (timeMs / 1000)).toFixed(0),
  };
}
