export const getAnamnes = (answer: string, lang: string) => {
  switch (lang) {
    case 'ru': {
      switch (answer) {
        case '1':
          return (
            'Имеются участки выраженного покраснения кожи с или без мокнутия,\n' +
            'сопровождающиеся сильным зудом'
          );
        case '2':
          return 'Имеются локальные участки незначительного покраснения кожи, сухость, зуд';
        case '3':
          return 'Имеются трещины, расчесы, сухость, незначительное покраснение и зуд кожи.';
        case '4':
          return 'Очень сухая кожа, шелушение, выраженный зуд, особенно в ночное время';
        case '5':
          return (
            'Визуально нормальная кожа, но периодически возникает покраснение, сухость,\n' +
            'раздражение и зуд'
          );
        default:
          return 'Не указан';
      }
    }
    case 'en': {
      switch (answer) {
        case '1':
          return (
            'There are areas of pronounced redness of the skin with or without weeping\n' +
            'accompanied by severe itching'
          );
        case '2':
          return 'There are local areas of slight redness of the skin, dryness, itching';
        case '3':
          return 'There are cracks, scratches, dryness, slight redness, and itching of the skin';
        case '4':
          return 'Very dry skin, peeling, pronounced itching, especially at night';
        case '5':
          return (
            'Visually normal skin, but periodically there is redness, dryness\n' +
            'irritation, and itching'
          );
        default:
          return 'Not specified';
      }
    }
    case 'fr': {
      switch (answer) {
        case '1':
          return (
            'Il y a des zones de rougeur prononcée de la peau avec ou sans suintement\n' +
            'accompagnées de démangeaisons sévères'
          );
        case '2':
          return 'Il y a des zones locales de légère rougeur de la peau, de sécheresse, de démangeaisons';
        case '3':
          return 'Il y a des fissures, des égratignures, de la sécheresse, une légère rougeur et des démangeaisons de la peau';
        case '4':
          return 'Peau très sèche, desquamation, démangeaisons prononcées, surtout la nuit';
        case '5':
          return (
            'Peau visuellement normale, mais périodiquement il y a des rougeurs, de la sécheresse\n' +
            "de l'irritation et des démangeaisons"
          );
        default:
          return 'Non spécifié';
      }
    }
    default: {
      switch (answer) {
        case '1':
          return (
            'There are areas of pronounced redness of the skin with or without weeping\n' +
            'accompanied by severe itching'
          );
        case '2':
          return 'There are local areas of slight redness of the skin, dryness, itching';
        case '3':
          return 'There are cracks, scratches, dryness, slight redness, and itching of the skin';
        case '4':
          return 'Very dry skin, peeling, pronounced itching, especially at night';
        case '5':
          return (
            'Visually normal skin, but periodically there is redness, dryness\n' +
            'irritation, and itching'
          );
        default:
          return 'Not specified';
      }
    }
  }
};
