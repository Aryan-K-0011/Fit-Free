import { Workout } from './types';

export const WORKOUTS: Workout[] = [
  {
    id: '1',
    title: 'Morning Energy Boost',
    description: 'A quick 10-minute routine to wake up your body and mind. No equipment needed.',
    duration: 10,
    difficulty: 'Beginner',
    category: 'Cardio',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737a57a9b298c9980f07cd73af',
    exercises: [
      { name: 'Jumping Jacks', duration: '60s', description: 'Standard jumping jacks to get heart rate up.' },
      { name: 'High Knees', duration: '45s', description: 'Run in place bringing knees high.' },
      { name: 'Arm Circles', duration: '30s', description: 'Big circles forward and backward.' },
      { name: 'Torso Twists', duration: '30s', description: 'Gentle spinal rotation.' },
      { name: 'Squats', reps: '15', description: 'Bodyweight squats.' }
    ]
  },
  {
    id: '2',
    title: 'Core Crusher',
    description: 'Intense ab workout to strengthen your core stability.',
    duration: 15,
    difficulty: 'Intermediate',
    category: 'Strength',
    imageUrl: 'https://fithero.app/static/01446ce5b37816640ab478e68fabe487/dd919/core-workout.jpg',
    exercises: [
      { name: 'Plank', duration: '60s', description: 'Hold a solid plank position.' },
      { name: 'Bicycle Crunches', reps: '20 per side', description: 'Elbow to opposite knee.' },
      { name: 'Leg Raises', reps: '15', description: 'Keep legs straight and lift.' },
      { name: 'Mountain Climbers', duration: '45s', description: 'Drive knees to chest quickly.' }
    ]
  },
  {
    id: '3',
    title: 'Full Body HIIT',
    description: 'High Intensity Interval Training to burn calories fast.',
    duration: 25,
    difficulty: 'Advanced',
    category: 'HIIT',
    imageUrl: 'https://s3assets.skimble.com/assets/3022120/maxresdefault_full.jpg',
    exercises: [
      { name: 'Burpees', reps: '15', description: 'Full body explosive movement.' },
      { name: 'Push-ups', reps: '20', description: 'Standard or knee push-ups.' },
      { name: 'Jump Squats', reps: '15', description: 'Explode up from the squat.' },
      { name: 'Lunges', reps: '15 per leg', description: 'Walking lunges.' },
      { name: 'Plank Jacks', duration: '45s', description: 'Plank position, jumping feet in and out.' }
    ]
  },
  {
    id: '4',
    title: 'Bedtime Yoga Stretch',
    description: 'Relax your muscles and prepare for a good night sleep.',
    duration: 20,
    difficulty: 'Beginner',
    category: 'Yoga',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/57b5ef68c534a5cc06edc769/b624caaa-e746-4d6a-8e67-cbaabdfc5319/bedtime-yoga-happy-baby-pose.jpg',
    exercises: [
      { name: 'Child\'s Pose', duration: '2m', description: 'Resting pose tailored for relaxation.' },
      { name: 'Cat-Cow', duration: '1m', description: 'Spinal flow.' },
      { name: 'Forward Fold', duration: '1m', description: 'Release hamstring tension.' },
      { name: 'Supine Twist', duration: '1m per side', description: 'Lying spinal twist.' }
    ]
  },
  {
    id: '5',
    title: 'Office Break Mobility',
    description: '5-minute routine to do at your desk to relieve stiffness.',
    duration: 5,
    difficulty: 'Beginner',
    category: 'Flexibility',
    imageUrl: 'https://canterburyhealthhub.com.au/uploads/blog/7-minute-mobility-routine-to-get-you-moving-on-your-lunch-break/_1200x630_crop_center-center_82_none/7-minute-mobility-routine-BLOG.jpg?mtime=1605826694',
    exercises: [
      { name: 'Neck Rolls', duration: '30s', description: 'Gentle neck rotation.' },
      { name: 'Shoulder Shrugs', duration: '30s', description: 'Release shoulder tension.' },
      { name: 'Seated Spinal Twist', duration: '30s per side', description: 'Use chair for leverage.' },
      { name: 'Wrist Stretches', duration: '30s', description: 'Extend arms and pull fingers back gently.' }
    ]
  },
  {
    id: '6',
    title: 'Lower Body Strength',
    description: 'Focus on legs and glutes with zero equipment.',
    duration: 20,
    difficulty: 'Intermediate',
    category: 'Strength',
    imageUrl: 'https://www.shape.com/thmb/e1oEJ2CjfrkhHGgABpnM3-42p7U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SQ-single-leg-deadlift-GettyImages-860707524-1-057da57891fd4ed8a17ca7272d023ff4.jpg',
    exercises: [
      { name: 'Glute Bridges', reps: '20', description: 'Squeeze glutes at the top.' },
      { name: 'Reverse Lunges', reps: '15 per leg', description: 'Step back and lower down.' },
      { name: 'Side Lunges', reps: '12 per side', description: 'Lateral movement.' },
      { name: 'Calf Raises', reps: '30', description: 'Lift heels off the ground.' }
    ]
  }
];
