'use client';
// app/page.tsx
import MainBlock, { MainBlockInterface } from '@/widgets/main-block';
import TreatmentStage, {
  TreatmentStageInterface,
} from '@/widgets/treatment-stage';
// import LastBlock, {LastBlockInterface} from '@/widgets/last-block';
// import { getAnamnes } from '@/shared/utils/getAnamnes';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingIcon from '../../loading.svg';
import { getAnamnes } from '@/shared/utils/getAnamnes';
// import generatePDF, { Resolution, Options } from 'react-to-pdf';

export default function Home() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [anamnes, setAnamnes] = useState('');

  const [locale, setLocale] = useState('ru');

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams(
        searchParams.toString()
      ).toString();
      const localeTemp = searchParams.get('lang') ?? 'en';
      setAnamnes(getAnamnes(searchParams.get('1.2.6.1') ?? '2', localeTemp));
      setLocale(localeTemp);
      const res = await fetch(`/api/products?${queryParams}`);
      const data = await res.json();
      // console.log(data,"DATAAA");
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, [searchParams]);

  const data: {
    mainBlock: MainBlockInterface;
    treatmentStages: TreatmentStageInterface[];
  } = {
    mainBlock: {
      title: 'Персональная программа \n' + 'по уходу за кожей',
      description:
        '**Цифровой рецепт** – это ваш персональный путеводитель в мире здоровой кожи.\n' +
        '\n' +
        'Созданный специально для вас, он учитывает все особенности вашего типа кожи, индивидуальные потребности и предпочтения.\n' +
        '\n' +
        'С его помощью вы получите точные рекомендации по уходу и лечению, доступные всегда и везде на вашем смартфоне или компьютере.\n',
      tiles: [
        {
          title: 'Анамнез:',
          description: anamnes,
          icon: '/icons/profile.png',
        },
        {
          description:
            'Вам требуется консультация дерматолога для назначения и/или коррекции лекарственного лечения.',
          icon: '/icons/consultation.png',
          isActive: true,
        },
        {
          description:
            'Для **облегчения** состояния кожи ребенка и предотвращения раздражения, следуйте рекомендациям в следующих блоках.\n',
          icon: '/icons/tablets.png',
        },
      ],
    },
    treatmentStages: [],
  };

  const enData: {
    mainBlock: MainBlockInterface;
    treatmentStages: TreatmentStageInterface[];
  } = {
    mainBlock: {
      title: 'Personal Skin \n' + 'Care Program',
      description:
        '**A digital prescription** – is your personal guide to healthy skin.\n' +
        '\n' +
        'Created especially for you, it takes into account all the characteristics of your skin type, individual needs, and preferences.\n' +
        '\n' +
        'With it, you will receive precise care and treatment recommendations, always available on your smartphone or computer.\n',
      tiles: [
        {
          title: 'Anamnesis:',
          description: anamnes,
          icon: '/icons/profile.png',
        },
        {
          description:
            'You need a consultation with a dermatologist to prescribe and/or adjust drug treatment.',
          icon: '/icons/consultation.png',
          isActive: true,
        },
        {
          description:
            "**To relieve** your baby's skin and prevent irritation, follow the recommendations in the following blocks.\n",
          icon: '/icons/tablets.png',
        },
      ],
    },
    treatmentStages: [],
  };

  const frData: {
    mainBlock: MainBlockInterface;
    treatmentStages: TreatmentStageInterface[];
  } = {
    mainBlock: {
      title: 'Programme de Soin Personnel de la Peau',
      description:
        '**Une prescription** numérique est votre guide personnel pour une peau saine.\n' +
        '\n' +
        'Créée spécialement pour vous, elle prend en compte toutes les caractéristiques de votre type de peau, vos besoins individuels et vos préférences.\n' +
        '\n' +
        'Grâce à elle, vous recevrez des recommandations précises pour les soins et les traitements, toujours disponibles sur votre smartphone ou votre ordinateur.\n',
      tiles: [
        {
          title: 'Anamnesis:',
          description: anamnes,
          icon: '/icons/profile.png',
        },
        {
          description:
            "Vous avez besoin d'une consultation avec un dermatologue pour prescrire et/ou ajuster le traitement médicamenteux.",
          icon: '/icons/consultation.png',
          isActive: true,
        },
        {
          description:
            'Pour soulager la peau de votre bébé et prévenir les irritations, suivez les recommandations des blocs suivants.',
          icon: '/icons/tablets.png',
        },
      ],
    },
    treatmentStages: [],
  };

  const langs = new Map();
  langs.set('ru', data);
  langs.set('en', enData);
  langs.set('fr', frData);

  // const options: Options = {
  //   filename: 'receipt.pdf',
  //   // default is `save`
  //   method: 'save',
  //   // default is Resolution.MEDIUM = 3, which should be enough, higher values
  //   // increases the image quality but also the size of the PDF, so be careful
  //   // using values higher than 10 when having multiple pages generated, it
  //   // might cause the page to crash or hang.
  //   resolution: Resolution.LOW,
  //   canvas: {
  //     // default is 'image/jpeg' for better size performance
  //     mimeType: 'image/png',
  //     qualityRatio: 1,
  //   },
  //   // customize any value passed to the jsPDF instance and html2canvas
  //   // function
  //   overrides: {
  //     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
  //     pdf: {
  //       compress: true,
  //     },
  //     // see https://html2canvas.hertzen.com/configuration for more options
  //     canvas: {
  //       useCORS: true,
  //     },
  //   },
  // };

  // const openPDF = () => {
  //   generatePDF(() => document.getElementById('wrapper'), options);
  // };
  //
  // const [hideBtn, setHideBtn] = useState(false);

  return (
    <div className={'bg-wrapper pb-10'} id={'wrapper'}>
      {/*{!isLoading && !hideBtn && (*/}
      {/*  <div*/}
      {/*    style={{ transform: 'translate(-50%, -50%)' }}*/}
      {/*    onClick={() => {*/}
      {/*      alert('Идёт генерация рецепта, ожидайте.');*/}
      {/*      setHideBtn(true);*/}
      {/*      setTimeout(() => {*/}
      {/*        openPDF();*/}
      {/*      }, 1000);*/}
      {/*    }}*/}
      {/*    className={*/}
      {/*      'font-bold min-w-fit cursor-pointer text-sm p-2 rounded-full whitespace-nowrap text-black bg-white fixed z-[99999999] right-[50%] left-[50%] md:left-auto bottom-0.5 md:bottom-2 md:right-2 flex items-center justify-center'*/}
      {/*    }>*/}
      {/*    Скачать в PDF*/}
      {/*  </div>*/}
      {/*)}*/}
      <main className={'flex flex-col gap-2'}>
        {isLoading && (
          <div
            className={
              'fixed top-0 left-0 loading z-50 w-full h-full flex justify-center items-center'
            }>
            <LoadingIcon className={'w-[50px] aspect-square animate-spin'} />
          </div>
        )}

        <MainBlock
          description={langs.get(locale).mainBlock.description}
          title={langs.get(locale).mainBlock.title}
          tiles={langs.get(locale).mainBlock.tiles}
        />
        <div className={'flex treatment sm:px-10 p-2 flex-col gap-2'}>
          {products.map((stage: any, index: number) => {
            if (stage.stage_title) {
              return (
                <TreatmentStage
                  key={index}
                  locale={locale}
                  displayArrow
                  title={stage.stage_title}
                  image={`/images/stages/${stage.stage_image}`}
                  description={stage.stage_description}
                  drugs={stage.preparats}
                />
              );
            }
          })}
        </div>
      </main>
    </div>
  );
}
