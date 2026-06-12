const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@studypulse.ai';

  // Make seed safe to run multiple times by cleaning up existing user first
  await prisma.user.deleteMany({
    where: { email }
  });

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create User and StudyGarden
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Demo Student',
      studyGarden: {
        create: {
          level: 1
        }
      }
    }
  });

  console.log(`User created: ${user.email} (1 Study Garden created via relation)`);

  // 2. Create 4 subjects
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Mathematics', userId: user.id } }),
    prisma.subject.create({ data: { name: 'Computer Science', userId: user.id } }),
    prisma.subject.create({ data: { name: 'Physics', userId: user.id } }),
    prisma.subject.create({ data: { name: 'Literature', userId: user.id } })
  ]);
  
  console.log('Created 4 subjects.');

  const subject1 = subjects[0];
  const subject2 = subjects[1];

  // 3. Create 5 notes
  for (let i = 1; i <= 5; i++) {
    await prisma.note.create({
      data: {
        title: `Note ${i}`,
        content: `This is the content for note ${i}`,
        userId: user.id,
        subjectId: i % 2 === 0 ? subject1.id : subject2.id
      }
    });
  }
  console.log('Created 5 notes.');

  // 4. Create 8 focus sessions
  for (let i = 1; i <= 8; i++) {
    await prisma.focusSession.create({
      data: {
        duration: 25,
        userId: user.id,
        subjectId: i % 2 === 0 ? subject1.id : subject2.id
      }
    });
  }
  console.log('Created 8 focus sessions.');

  // 5. Create 4 academic records
  for (let i = 1; i <= 4; i++) {
    await prisma.academicRecord.create({
      data: {
        grade: 'A',
        userId: user.id,
        subjectId: subjects[i - 1].id
      }
    });
  }
  console.log('Created 4 academic records.');

  // 6. Create 5 growth activities
  for (let i = 1; i <= 5; i++) {
    await prisma.growthActivity.create({
      data: {
        activity: `Completed learning task ${i}`,
        userId: user.id
      }
    });
  }
  console.log('Created 5 growth activities.');

  // 7. Create 4 study quests
  for (let i = 1; i <= 4; i++) {
    await prisma.studyQuest.create({
      data: {
        title: `Study Quest ${i}`,
        completed: i % 2 === 0,
        userId: user.id
      }
    });
  }
  console.log('Created 4 study quests.');
  
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
