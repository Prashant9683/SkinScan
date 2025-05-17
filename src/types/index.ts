export interface Prediction {
  id: string;
  image_path: string;
  disease_class: string;
  confidence: number;
  created_at: string;
}

export interface UploadResponse {
  disease_class: string;
  confidence: number;
}

export interface DiseaseInfo {
  name: string;
  remedies: string[];
  description: string;
  severity: 'low' | 'medium' | 'high';
  seekMedicalAttention: boolean;
}

export const DISEASE_INFO: Record<string, DiseaseInfo> = {
  'Actinic Keratosis': {
    name: 'Actinic Keratosis',
    description: 'A rough, scaly patch on the skin caused by years of sun exposure',
    remedies: [
      'Apply broad-spectrum sunscreen daily',
      'Wear protective clothing',
      'Use prescribed topical medications',
      'Consider cryotherapy treatment'
    ],
    severity: 'medium',
    seekMedicalAttention: true
  },
  'Basal Cell Carcinoma': {
    name: 'Basal Cell Carcinoma',
    description: 'The most common type of skin cancer',
    remedies: [
      'Seek immediate medical attention',
      'Protect from sun exposure',
      'Schedule regular skin checks',
      'Consider surgical removal'
    ],
    severity: 'high',
    seekMedicalAttention: true
  },
  'Benign Keratotic Lesion': {
    name: 'Benign Keratotic Lesion',
    description: 'A non-cancerous growth on the skin',
    remedies: [
      'Monitor for changes',
      'Keep the area clean',
      'Use moisturizer',
      'Consider removal if bothersome'
    ],
    severity: 'low',
    seekMedicalAttention: false
  },
  'Melanoma': {
    name: 'Melanoma',
    description: 'A serious form of skin cancer that develops in melanocytes',
    remedies: [
      'Seek immediate medical attention',
      'Avoid sun exposure',
      'Schedule urgent biopsy',
      'Regular full-body skin examinations'
    ],
    severity: 'high',
    seekMedicalAttention: true
  },
  'Nevus': {
    name: 'Nevus',
    description: 'A common mole that is usually harmless',
    remedies: [
      'Monitor for changes in size or color',
      'Protect from sun exposure',
      'Document with photos',
      'Regular self-examination'
    ],
    severity: 'low',
    seekMedicalAttention: false
  },
  'Squamous Cell Carcinoma': {
    name: 'Squamous Cell Carcinoma',
    description: 'A common form of skin cancer that develops in squamous cells',
    remedies: [
      'Seek prompt medical attention',
      'Avoid direct sun exposure',
      'Use high SPF sunscreen',
      'Consider surgical removal'
    ],
    severity: 'high',
    seekMedicalAttention: true
  },
  'Vascular Lesion': {
    name: 'Vascular Lesion',
    description: 'An abnormality of blood vessels that may appear as a birthmark',
    remedies: [
      'Consult with a dermatologist',
      'Protect from injury',
      'Consider laser treatment',
      'Monitor for changes'
    ],
    severity: 'medium',
    seekMedicalAttention: false
  }
};