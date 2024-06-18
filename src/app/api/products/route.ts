import { NextRequest, NextResponse } from 'next/server';
import { getStages } from '@/shared/utils/getStages';

type Product = {
  brand: string;
  title: string;
  type: string;
  must: string[];
  must_not: string[];
  stage_title: string;
  stage_description: string;
  stage_image: string;
  link: string;
};

const parseQueryParams = (query: URLSearchParams) => {
  const answers: Record<string, string[]> = {};

  query.forEach((value, key) => {
    answers[key] = value.split(',');
  });

  return answers;
};

const checkCondition = (
  condition: string,
  answers: Record<string, string[]>
): boolean => {
  const conditions = condition.split('+');
  for (const cond of conditions) {
    const [question, answer] = cond.split('#');
    if (!answers[question]?.includes(answer)) {
      return false;
    }
  }
  return true;
};

const isMatchingProduct = (
  product: Product,
  answers: Record<string, string[]>
): boolean => {
  // Проверка условий must
  let mustConditionsMet = false;

  for (const mustCondition of product.must) {
    if (checkCondition(mustCondition, answers)) {
      mustConditionsMet = true;
      break;
    }
  }

  if (!mustConditionsMet) {
    return false;
  }

  // Проверка условий must_not
  for (const mustNotCondition of product.must_not) {
    if (checkCondition(mustNotCondition, answers)) {
      return false;
    }
  }

  return true;
};

const groupByStage = (products: Product[]) => {
  const grouped: Record<
    string,
    {
      stage_title: string;
      stage_description: string;
      stage_image: string;
      preparats: Product[];
    }
  > = {};

  products.forEach((product) => {
    const key = `${product.stage_title}-${product.stage_description}-${product.stage_image}`;
    if (!grouped[key]) {
      grouped[key] = {
        stage_title: product.stage_title,
        stage_description: product.stage_description,
        stage_image: product.stage_image,
        preparats: [],
      };
    }
    grouped[key].preparats.push(product);
  });

  return Object.values(grouped);
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log(searchParams.toString(), 'SearchParams');

  const userAnswers = parseQueryParams(searchParams);

  const products: Product[] = await getStages(1);
  // console.log(products, 'Products');

  const matchingProducts = products.filter((product) =>
    isMatchingProduct(product, userAnswers)
  );

  // console.log(matchingProducts,"Matching products")
  const groupedProducts = groupByStage(matchingProducts);

  return NextResponse.json(groupedProducts);
}
