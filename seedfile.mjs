import db, { client } from '../db/conn.mjs';

const grades = [
  {
    scores: [
      {
        type: 'exam',
        score: 78,
      },
      {
        type: 'homework',
        score: 90,
      },
      {
        type: 'test',
        score: 95,
      },
    ],
    class_id: 339,
    student_id: 0,
  },
  {
    scores: [
      {
        type: 'exam',
        score: 54,
      },
      {
        type: 'homework',
        score: 80,
      },
      {
        type: 'test',
        score: 75,
      },
    ],
    class_id: 420,
    student_id: 38,
  },
  {
    scores: [
      {
        type: 'exam',
        score: 87,
      },
      {
        type: 'homework',
        score: 97,
      },
      {
        type: 'test',
        score: 80,
      },
    ],
    class_id: 120,
    student_id: 90,
  },
];

async function seed() {
  const gradesCollection = await db.collection('grades');

  await gradesCollection.deleteMany({});

  await gradesCollection.insertMany(grades);

  console.log('Completed');

  await client.close();
  return;
}

seed();