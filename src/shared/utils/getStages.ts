// shared/utils/getStages.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const getStages = async (listIndex: number) => {
  const doc = new GoogleSpreadsheet(
    '1KNqlgf-Mmyb_gYnK-_c7GebI2ifgUoAJ_zytg43wUM4',
    { apiKey: process.env.GOOGLE_API_KEY ?? '' }
  );
  await doc.loadInfo(); // Загрузка данных документа
  const sheet = doc.sheetsByIndex[listIndex]; // доступ к первому листу

  const rows = await sheet.getRows(); // чтение данных

  const headerValues = new Map();
  headerValues.set('is_active', 'Активный или нет');
  headerValues.set('brand', 'Бренд');
  headerValues.set('name', 'Название препарата');
  headerValues.set('type', 'Тип');
  headerValues.set('description', 'Описание');
  headerValues.set('suitable', 'Для кого подходит');
  headerValues.set('usage', 'Как использовать');
  headerValues.set('usage_kids', 'Как использовать с первых дней');
  headerValues.set('sk', 'Артикул');
  headerValues.set('goal', 'Цель рекомендации и дальнейшие действия');
  headerValues.set('additional', 'Дополнительное к рекомендации');
  headerValues.set('clinic_situation', 'Пример клинической ситуации');
  headerValues.set('link', 'Ссылки для лендинк на продукт');
  headerValues.set('must', 'Есть ответ');
  headerValues.set('must_not', 'Нет ответа');
  headerValues.set('stage_title', 'Заголовок этапа');
  headerValues.set('stage_description', 'Описание этапа');
  headerValues.set('image', 'Изображение');
  headerValues.set('stage_image', 'Изображение этапа');

  const preparats: any[] = [];

  rows.forEach((row) => {
    if (row.get(headerValues.get('is_active')) === '1') {
      // console.log('AAAAAAAAA', row);
      const res: any = {};
      Array.from(headerValues.keys()).forEach((key) => {
        let value = row.get(headerValues.get(key));
        if (key === 'must' || key === 'must_not') {
          value = value ? JSON.parse(value) : [];
        }
        res[key] = value;
      });
      preparats.push(res);
    }
  });

  return preparats;
};
