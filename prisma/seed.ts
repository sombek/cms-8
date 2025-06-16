import { PrismaClient } from '../src/generated/prisma';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Create sample content
  const sampleContent = await prisma.content.createMany({
    data: [
      {
        title: 'Welcome to Our CMS',
        description:
          'This is the first article in our content management system',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'General',
        language: 'en',
        status: 'PUBLISHED',
        author_id: 'author-1',
        published_at: new Date(),
        meta_data: {
          tags: ['welcome', 'cms', 'introduction'],
          featured: true,
        },
      },
      {
        title: 'Getting Started Guide',
        description: 'A comprehensive guide to help you get started',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        category: 'Guide',
        language: 'en',
        status: 'DRAFT',
        author_id: 'author-1',
        meta_data: {
          tags: ['guide', 'tutorial', 'getting-started'],
          difficulty: 'beginner',
        },
      },
      {
        title: 'Advanced Features',
        description: 'Explore the advanced features available in the system',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        category: 'Advanced',
        language: 'en',
        status: 'PUBLISHED',
        author_id: 'author-2',
        published_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        meta_data: {
          tags: ['advanced', 'features', 'expert'],
          difficulty: 'advanced',
        },
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
