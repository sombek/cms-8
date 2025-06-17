import { PrismaClient } from '../src/generated/prisma';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Create sample content
  const sampleContent = await prisma.content.createMany({
    data: [
      {
        title: 'كيف تفهم نفسك | بودكاست فنجان',
        description: 'حلقة تناقش الصحة النفسية مع عبد الرحمن أبومالح.',
        body: 'زاد الحديث عن الصحة النفسية مؤخرًا ...',
        category: 'Podcast',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-3',
        published_at: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        meta_data: { tags: ['فنجان', 'صحة نفسية'], featured: true },
      },
      {
        title: 'كيف تصمم حياتك وتعيش راضيًا | بودكاست فنجان',
        description: 'نقاش عن تصميم الحياة والرضا.',
        body: 'جميعنا نبحث عن حياة مُرضية ...',
        category: 'Podcast',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-3',
        published_at: new Date(Date.now() - 2.1 * 365 * 24 * 60 * 60 * 1000),
        meta_data: { tags: ['تصميم الحياة', 'رضا'], featured: false },
      },
      {
        title: 'مجهولة أبوين | بودكاست فنجان',
        description: 'حلقة تتناول قصص مجهولة الأبوين.',
        body: 'نقاش حول غياب الأصول وتأثيره ...',
        category: 'Podcast',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-3',
        published_at: new Date(Date.now() - 1.1 * 365 * 24 * 60 * 60 * 1000),
        meta_data: { tags: ['هوية', 'فنجان'], featured: false },
      },
      {
        title: 'بودكاست سقراط مع عمر الجريسي',
        description: 'حوار فلسفي على خطى سقراط.',
        body: 'حلقات معمقة في الفلسفة والمجتمع ...',
        category: 'Podcast',
        language: 'ar',
        status: 'DRAFT',
        author_id: 'author-5',
        meta_data: { tags: ['سقراط', 'فلسفة'], featured: false },
      },
      {
        title: 'Swalif Business Episode #1',
        description: 'Insights into the business world.',
        body: 'نقاش حول قصص نجاح الشركات ...',
        category: 'Business',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-6',
        published_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
        meta_data: { tags: ['business', 'Swalif'], featured: false },
      },
      {
        title: 'Things That Changed Us — Episode 1',
        description: 'التغيير الشخصي والمهني.',
        body: 'قصص تحدث تحولاً حقيقياً في الحياة ...',
        category: 'Stories',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-7',
        published_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
        meta_data: { tags: ['change', 'stories'], featured: false },
      },
      {
        title: 'بودكاست الفجر من ثمانية – حرب إيران وإسرائيل',
        description: 'تحليل آخر التطورات في الصراع.',
        body: 'بدر السيف يستعرض العملية الإسرائيلية ...',
        category: 'News',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-8',
        published_at: new Date('2025-06-16'),
        meta_data: { tags: ['فجر', 'إيران', 'إسرائيل'], featured: true },
      },
      {
        title: 'بودكاست جادي – أبل: متى ستفقد هيمنتها؟',
        description: 'نقاش حول مستقبل أبل.',
        body: 'حلقة تعميق حول كيف ومتى ستفقد أبل مكانتها ...',
        category: 'Tech',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-9',
        published_at: new Date('2025-06-16'),
        meta_data: { tags: ['آبل', 'تكنولوجيا'], featured: false },
      },
      {
        title: 'ثمانية أسئلة من ثمانية: مع مرشد سياحي',
        description: 'ثمانية أسئلة شخصية ومهنية.',
        body: 'حلقة مع مرشد سياحي تسرد تجربته ...',
        category: 'Interview',
        language: 'ar',
        status: 'PUBLISHED',
        author_id: 'author-10',
        published_at: new Date('2025-05-19'),
        meta_data: { tags: ['ثمانية أسئلة', 'مسافر'], featured: false },
      },
    ],
  });

  console.log(`Created ${sampleContent.count} content entries`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
