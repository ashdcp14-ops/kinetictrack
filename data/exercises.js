export const PROBLEM_AREAS = [
  'Shoulder & Rotator Cuff',
  'Hip & Glutes',
  'Knee & Quadriceps / Hamstrings',
  'Lower Back & Core (Spinal Stability)',
  'Upper Back & Arms (Elbow / Wrist)',
  'Advanced Stage: Plyometrics & Agility (Return to Sport)',
];

export const PROBLEM_AREA_ICONS = {
  'Shoulder & Rotator Cuff': require('../assets/category-icons/shoulder-rotator-cuff.png'),
  'Hip & Glutes': require('../assets/category-icons/hip-glutes.png'),
  'Knee & Quadriceps / Hamstrings': require('../assets/category-icons/knee-quadriceps-hamstrings.png'),
  'Lower Back & Core (Spinal Stability)': require('../assets/category-icons/lower-back-core.png'),
  'Upper Back & Arms (Elbow / Wrist)': require('../assets/category-icons/upper-back-arms.png'),
  'Advanced Stage: Plyometrics & Agility (Return to Sport)': require('../assets/category-icons/advanced-plyometrics-agility.png'),
};

export const EXERCISES_BY_AREA = {
  'Shoulder & Rotator Cuff': [
    {
      id: 'shoulder-arm-circles',
      name: 'Arm Circles',
      setup:
        'Stand upright with your feet hip-width apart. Extend both arms straight out to the sides at shoulder height, forming a "T" shape with your body. Keep your palms facing downward.',
      steps: [
        'Initiate small, controlled circular motions forward from the shoulder joints.',
        "Maintain a tight core and neutral spine, ensuring your shoulders don't shrug toward your ears.",
        'After completing the designated repetitions or time, reverse the direction, circling backward.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=140RTNMciH8',
    },
    {
      id: 'shoulder-arm-pull-stretch',
      name: 'Arm Pull Shoulder Stretch',
      setup: 'Stand or sit tall with a neutral posture.',
      steps: [
        'Extend your right arm straight out in front of you, then sweep it horizontally across your chest.',
        'Bring your left forearm up to hook and catch the right arm just above the elbow joint.',
        'Gently pull the right arm closer to your chest using your left arm until you feel a deep release across the back of the shoulder. Hold, then switch sides.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=GIureJZfHUQ',
    },
    {
      id: 'shoulder-band-lateral-raise',
      name: 'Band Lateral Raise (Palm Back / Forward / Up)',
      setup:
        'Stand on the center of the resistance band with one or both feet. Grip the handles or ends of the band with your arms down at your sides, keeping your palms facing backward.',
      steps: [
        'Keeping a very slight bend in your elbows, exhale and raise both arms out to the sides until they are level with your shoulders.',
        'Pause for a split second at the peak of the movement.',
        'Inhale as you slowly lower your arms back down to the starting position under strict control.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=j1kLVl2JnOA',
    },
    {
      id: 'shoulder-band-overhead-press',
      name: 'Band Overhead Press',
      setup:
        'Stand on the center of the band with feet shoulder-width apart. Bring your hands up to shoulder level, bending your elbows so your palms face forward and the band is positioned behind your forearms.',
      steps: [
        'Engage your core and keep your knees slightly unlocked.',
        'Exhale and drive your hands straight up toward the ceiling, fully extending your arms without locking your elbows at the top.',
        'Lower the hands back down to shoulder height with control.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Zli1UXH9ZeE',
    },
    {
      id: 'shoulder-band-reverse-fly',
      name: 'Band Reverse Fly',
      setup:
        'Stand with feet hip-width apart, holding the resistance band in front of you at chest height with your arms completely straight. Leave enough slack in the band to allow for a full range of motion.',
      steps: [
        'Keeping your arms extended, exhale and pull your hands out and back to the sides, expanding across your chest.',
        'Focus on pulling from the back of your shoulders and squeezing your shoulder blades together at the peak.',
        'Slowly return your hands back to the front starting position.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=38leTE2y1I8',
    },
    {
      id: 'shoulder-band-upright-row',
      name: 'Band Upright Row (Normal / Wide)',
      setup:
        'Stand on the center of the band with your feet hip-width apart. Hold the band handles in front of your thighs with an overhand grip (palms facing your body).',
      steps: [
        'Exhale and pull the band straight up along the front of your torso toward your chin.',
        'Lead the movement with your elbows, ensuring they always stay higher than your hands.',
        'Lower the band back down to the starting position slowly, resisting the tension.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=VhpnXlphu88',
    },
    {
      id: 'shoulder-band-ventral-raise',
      name: 'Band Ventral Raise (Palm In / Out / Up)',
      setup:
        'Stand on the resistance band with feet hip-width apart. Hold the ends down at your sides with your palms facing each other (a neutral grip).',
      steps: [
        'Keeping your arms straight and core locked to prevent rocking, raise both arms straight up in front of you.',
        'Stop once your arms reach eye or shoulder level.',
        'Inhale and lower your arms back down smoothly.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=KMP1L_Wed2k',
    },
    {
      id: 'shoulder-overhead-tricep-stretch',
      name: 'Overhead Tricep Stretch',
      setup: 'Stand or sit tall with your spine long.',
      steps: [
        'Raise your right arm up toward the ceiling, bend at the elbow, and reach your right hand down the center of your upper back.',
        'Place your left hand on top of your raised right elbow.',
        'Gently press downward on the elbow to guide your right hand further down your back until you feel a stretch along your triceps. Hold, then switch.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=nbHOmIYMazk',
    },
  ],
  'Hip & Glutes': [
    {
      id: 'hip-captain-morgan',
      name: 'Captain Morgan (Lv 1 & 2)',
      setup: 'Stand upright sideways next to a sturdy wall (about a foot away).',
      steps: [
        'Lift your inside leg (the one closest to the wall) until your hip and knee are bent at a 90° angle.',
        'Press the outside of your raised knee and thigh firmly into the wall.',
        'Push continuously against the wall using isometric force, which deeply activates the gluteus medius of your standing leg to stabilize you. Hold for time.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=6F9BBCw72Fs',
    },
    {
      id: 'hip-deep-glute-stretch',
      name: 'Deep Glute Stretch',
      setup: 'Lie flat on your back on a mat with your knees bent and feet flat on the floor.',
      steps: [
        'Lift your right leg and cross your right ankle over your left knee, creating a "figure 4" shape.',
        'Reach both hands around your left thigh (or shin).',
        'Gently pull your left leg up and toward your chest until you feel a deep stretch in your right hip and glute. Hold, then swap sides.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=2zMMjowsfB0',
    },
    {
      id: 'hip-it-band-stretch',
      name: 'IT Band Stretch',
      setup: 'Stand tall with your feet together.',
      steps: [
        'Cross your right leg completely behind your left leg, planting both feet firmly on the floor.',
        'Reach your right arm up over your head and slowly lean your torso laterally to the left side.',
        'Push your right hip slightly outward to isolate and stretch the outer thigh and iliotibial band. Repeat on the other side.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=QVM_vT4hb_c',
    },
    {
      id: 'hip-pilates-kneeling-rear-leg-raise',
      name: 'Pilates Kneeling Rear Leg Raise',
      setup:
        'Get into a tabletop position on your hands and knees. Align your hands under your shoulders and your knees directly under your hips, keeping your spine flat.',
      steps: [
        'Extend your right leg straight back behind you, resting your toes lightly on the floor.',
        'Squeeze your right glute to lift the leg straight up until it is parallel to the floor, keeping your hips square to the mat.',
        'Lower the foot back down to tap the floor lightly and repeat.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=LC9OX5i_dOo',
    },
    {
      id: 'hip-pilates-kneeling-side-leg-raise',
      name: 'Pilates Kneeling Side Leg Raise',
      setup:
        'Kneel in the center of your mat. Lean your torso to the left, placing your left hand flat on the floor directly under your shoulder, while extending your right leg straight out to the side. Place your right hand on your hip.',
      steps: [
        'Engage your core and lift your right leg straight up toward the ceiling as high as your hip flexibility allows.',
        "Keep your foot flexed and your leg completely aligned with your torso (don't let it drift forward).",
        'Lower the leg back down to tap the floor and repeat.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=9MZPEq2o9Mk',
    },
    {
      id: 'hip-pilates-side-hip-raise',
      name: 'Pilates Side Hip Raise (Lv 1, 2, & 3)',
      setup:
        'Lie on your side, propped up on your bottom forearm with your elbow directly beneath your shoulder. Bend both knees at a 90° angle, stacking your legs and hips.',
      steps: [
        'Exhale and press through your forearm and bottom knee to lift your hips up off the mat until your body forms a straight line from your head to your knees.',
        'Pause briefly at the top, focusing on your obliques and lower hip stabilizers.',
        'Lower your hips back down to lightly touch the mat before immediately starting the next rep.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=ZPf8jtTkRxI',
    },
    {
      id: 'hip-seated-hip-stretch',
      name: 'Seated Hip Stretch',
      setup: 'Sit on the floor with both legs extended straight out in front of you.',
      steps: [
        'Bend your right knee, lift your right foot, and cross it over your left leg, planting it flat on the outside of your left knee.',
        'Wrap your left arm around your right knee, hugging it tightly into your chest.',
        'Place your right hand on the floor behind you and gently twist your upper body to the right, looking over your shoulder. Hold, then switch.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=y8-hBKr3utI',
    },
    {
      id: 'hip-sumo-squat',
      name: 'Squat, Sumo',
      setup:
        'Stand with a very wide stance—well past shoulder-width. Turn your toes outward at roughly a 45° angle.',
      steps: [
        "Inhale as you push your hips back and bend your knees, lowering your body into a deep squat. Make sure your knees track directly over your toes and don't collapse inward.",
        'Drop down until your thighs are at least parallel to the floor while keeping your chest upright.',
        'Press firmly through your heels to return to the standing position, squeezing your glutes at the top.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=9ZuXKqRbT9k',
    },
    {
      id: 'hip-standing-inside-thigh-stretch',
      name: 'Standing Inside Thigh Stretch',
      setup: 'Stand up straight with your feet spread very wide apart, facing forward.',
      steps: [
        'Keep your hands on your hips or clasped in front of your chest.',
        'Shift your weight completely over to your right leg by bending your right knee and pushing your hips back, while keeping your left leg perfectly straight.',
        'Hold the position once you feel a stretch along the inside thigh (adductor) of the straight left leg. Repeat on the opposite side.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=7h_WtBWu2vY',
    },
  ],
  'Knee & Quadriceps / Hamstrings': [
    {
      id: 'knee-clock-lunge',
      name: 'Clock Lunge',
      setup: 'Stand tall with your feet together and hands on your hips.',
      steps: [
        "Step forward with your right foot into a front lunge (12 o'clock), lower your hips, then push back to center.",
        "Step out to the right side with your right foot into a lateral lunge (3 o'clock), bend that knee while keeping the left leg straight, then return to center.",
        "Step straight backward with your right foot into a reverse lunge (6 o'clock), lower down, and return to center. Repeat the circuit.",
      ],
      videoUrl: 'https://www.youtube.com/watch?v=GIm5-KIdWBk',
    },
    {
      id: 'knee-lunge',
      name: 'Lunge (Alternating / Cross Over)',
      setup: 'Stand with feet hip-width apart, posture long and core engaged.',
      steps: [
        'Take a large step forward with your right foot.',
        'Lower your hips vertically until your front thigh is parallel to the floor and your back knee hangs just an inch above the ground (both knees should form roughly 90° angles).',
        'Press powerfully off your right front foot to return to the starting position, then repeat the movement stepping forward with your left foot.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=tTej-ax9XiA',
    },
    {
      id: 'knee-squat-ski-squat',
      name: 'Squat / Ski Squat',
      setup: 'Stand with your feet shoulder-width apart, toes pointing forward or slightly outward.',
      steps: [
        'Inhale as you bend your knees and hinge at your hips, lowering your glutes backward as if sitting into a chair.',
        'Keep your weight distributed in your heels and your chest lifted; do not let your knees travel past your toes.',
        'Drive through your feet to stand back up, fully straightening your hips.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=GrnV8VIhS-I',
    },
    {
      id: 'knee-standing-quad-stretch',
      name: 'Standing Quadricep Stretch',
      setup: 'Stand on one leg. If needed, place one hand on a wall or chair for balance.',
      steps: [
        'Bend your right knee backward, lifting your foot toward your glutes.',
        'Reach back with your right hand and grasp your ankle or the top of your foot.',
        'Gently pull your heel closer to your glutes while keeping your knees glued side-by-side and your hips pushed slightly forward to stretch the front of the thigh. Hold and switch.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Uwwuc8pRRc0',
    },
    {
      id: 'knee-standing-wall-calf-stretch',
      name: 'Standing Wall Calf Stretch',
      setup:
        "Stand facing a wall, slightly more than an arm's length away. Place both palms flat against the wall at chest height.",
      steps: [
        'Step your right leg straight back into a long stride, leaving your left leg bent slightly forward.',
        'Press your right heel firmly down into the floor while keeping your right leg completely locked straight.',
        'Lean your hips gently forward toward the wall until you feel a deep stretch in the upper calf muscle (gastrocnemius) of the back leg. Hold and switch.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=f1HzSAuB-Vw',
    },
    {
      id: 'knee-standing-toe-touch-stretch',
      name: 'Standing Toe Touch Stretch',
      setup: 'Stand upright with your feet close together and your legs completely straight.',
      steps: [
        'Inhale deeply, then exhale as you slowly hinge forward from your hips, letting your arms, neck, and torso relax downward.',
        'Reach your hands down toward your toes as far as your hamstring flexibility allows without bending your knees.',
        'Hold the deep stretch, breathing steadily into your posterior chain.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Xvr5N_Xf6QM',
    },
    {
      id: 'knee-wall-sit',
      name: 'Wall Sit',
      setup: 'Stand with your back against a sturdy wall, feet about two feet away from the base.',
      steps: [
        'Slide your back down the wall until your hips and knees are bent at a perfect 90° angle, making your thighs parallel to the ground.',
        'Ensure your knees are directly above your ankles, and press your entire lower back flat against the wall.',
        'Hold this position statically for the duration of the exercise, breathing evenly.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=-cdph8hv0O0',
    },
  ],
  'Lower Back & Core (Spinal Stability)': [
    {
      id: 'core-back-bow-crossover',
      name: 'Back Bow Crossover (Lv 1 & 2)',
      setup: 'Lie face down on a mat with your legs straight behind you and your arms extended straight out overhead.',
      steps: [
        'Engage your lower back and glutes to simultaneously lift your chest, arms, and legs a few inches off the floor.',
        'While holding this elevated position, begin a controlled flutter movement: raise your right arm and left leg slightly higher, then lower them as you raise your left arm and right leg.',
        'Keep your neck long by looking down at the mat throughout the movement.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=JBJmsE6xGsA',
    },
    {
      id: 'core-bicycle-crunch',
      name: 'Bicycle Crunch',
      setup:
        'Lie on your back, bring your knees up to a 90° angle (tabletop), and lightly place your fingertips behind your head. Lift your head and shoulder blades slightly off the floor.',
      steps: [
        'Twist your torso to the right, bringing your left elbow across your body toward your right knee, while simultaneously extending your left leg straight out at a 45° angle.',
        'Smoothly switch sides: pull your left knee in and extend your right leg out, twisting your right elbow toward your left knee.',
        'Continue alternating in a fluid, rhythmic cycling motion.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=lQ76ehxls3c',
    },
    {
      id: 'core-cobra-stretch',
      name: 'Cobra Stretch',
      setup:
        'Lie flat on your stomach. Place your palms flat on the mat directly underneath your shoulders, keeping your elbows tucked tightly against your ribs.',
      steps: [
        'Press your pelvic bone and the tops of your feet firmly down into the mat.',
        'Inhale as you slowly straighten your arms to lift your chest off the floor, opening up your posture. Only go as high as comfortable for your lower back.',
        'Keep your shoulders dropped away from your ears; hold the position to stretch your abs and mobilize the spine.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=JDcdhTuycOI',
    },
    {
      id: 'core-crunch-variations',
      name: 'Crunch (Traditional / Jack Knife / Scissored / Toe Touch)',
      setup:
        'Lie flat on your back with your knees bent and feet flat on the floor, hip-width apart. Place your hands lightly behind your head or crossed over your chest.',
      steps: [
        'Exhale and contract your abdominal muscles to lift your head, neck, and shoulder blades off the floor. Keep your lower back pressed firmly into the mat.',
        'Look up toward the ceiling to avoid pulling on your neck with your hands.',
        'Inhale as you slowly lower your upper body back down to the start position.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=4hmQA3snTyk',
    },
    {
      id: 'core-double-leg-circles',
      name: 'Double Leg Circles',
      setup:
        'Lie on your back with your arms flat by your sides for stability. Extend both legs straight up toward the ceiling, keeping them pressed tightly together.',
      steps: [
        'Engage your deep core to ensure your lower back stays glued to the floor.',
        'Keeping your legs straight and together, begin drawing a small, controlled circle in the air with your feet.',
        'Complete a set number of rotations in one direction, then reverse the circles. Keep the movement small to protect your lower back.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=qAGvdqAsp1w',
    },
    {
      id: 'core-flutter-kicks',
      name: 'Flutter Kicks',
      setup:
        'Lie on your back. Place your hands flat under your glutes to help support your pelvis and keep your lower back flat against the floor. Lift your head and feet a few inches off the mat.',
      steps: [
        'Keeping both legs straight, lift your right leg slightly higher while dropping the left leg down toward the floor (without letting it touch).',
        'Switch the position of your legs rapidly and continuously in a vertical scissor-like motion.',
        'Focus entirely on maintaining abdominal bracing to keep your spine stable.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=ocRe4ccKeK4',
    },
    {
      id: 'core-pilates-back-bows',
      name: 'Pilates Back Bows (Lv 1, 2, & 3)',
      setup:
        'Lie face down on your stomach. Rest your hands flat on the floor by your sides or underneath your forehead, with your legs straight behind you.',
      steps: [
        'Keep your lower body relaxed and your toes anchored to the mat.',
        'Engage your upper back and spinal erectors to lift your chest and shoulders off the floor.',
        'Pause briefly at the top of the extension, then lower down smoothly. Keep your gaze directed at the floor to protect your neck.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=SxOuXcL5GWs',
    },
    {
      id: 'core-pilates-heel-toe-taps',
      name: 'Pilates Heel Taps / Toe Taps',
      setup:
        'Lie on your back and raise your legs into a tabletop position (90° angles at both the hips and knees). Place your arms flat by your sides.',
      steps: [
        'Keeping the 90° bend in your right knee, hinge from your hip to slowly lower your right foot down to tap the floor with your heel.',
        'Exhale and use your lower abs to pull the right leg back up to the tabletop starting position.',
        'Repeat the exact same movement with your left leg, alternating sides slowly.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=zAvOAXLR1MY',
    },
    {
      id: 'core-pilates-hundreds',
      name: 'Pilates Hundreds',
      setup:
        'Lie on your back. Raise your legs into a tabletop position (90° angles), lift your head and shoulders off the mat, and extend your arms straight out a few inches above the floor by your sides.',
      steps: [
        'Rhythmic pumping: Begin pulsing your straight arms up and down rapidly (moving from the shoulders, about a 6-inch range).',
        'Coordinate your breathing: Inhale deeply for 5 arm pumps, then exhale sharply for 5 arm pumps.',
        'Repeat this cycle 10 times to reach a total of 100 pumps, keeping your core completely locked.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=1lGW6tdT3gU',
    },
    {
      id: 'core-pilates-imprint',
      name: 'Pilates Imprint',
      setup:
        'Lie flat on your back with your knees bent and feet flat on the floor. Take a moment to find your "neutral spine," where there is a tiny, natural gap between your lower back and the mat.',
      steps: [
        'Take a deep breath in to prepare.',
        'As you exhale, contract your deep core muscles (transversus abdominis) to close that gap, gently flattening your lower back down into the floor.',
        'Hold this braced "imprint" position for a few seconds before inhaling to relax back to neutral.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=vrBKwzW5Ysw',
    },
    {
      id: 'core-pilates-leg-pull-facing-down',
      name: 'Pilates Leg Pull Facing Down',
      setup:
        'Get into a high push-up plank position on your hands and toes. Your hands should be directly under your shoulders and your body must form a straight line.',
      steps: [
        'Lock your core and glutes to keep your pelvis perfectly steady.',
        'Lift your right leg straight up off the floor a few inches, keeping the knee locked and foot flexed. Do not let your hips sag or twist.',
        'Lower the right foot back down and immediately repeat the lift with your left leg.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=xoDO6U79v5g',
    },
    {
      id: 'core-pilates-oblique-crunch-leg-raise',
      name: 'Pilates Oblique Crunch with Leg Raise',
      setup:
        'Lie completely on your right side, creating a straight line from your head to your toes. Balance yourself by placing your left hand flat on the floor in front of your chest.',
      steps: [
        'Engage your obliques along the top side of your body.',
        'Simultaneously lift your top left leg and your upper torso off the floor, performing a lateral crunch.',
        'Lower both your torso and leg back down with control to complete the rep.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=10YumE_tphU',
    },
    {
      id: 'core-pilates-shoulder-bridge',
      name: 'Pilates Shoulder Bridge / Bridge Prep',
      setup:
        'Lie on your back with your knees bent, feet flat on the floor hip-width apart, and arms resting long by your sides.',
      steps: [
        'Inhale to prepare, then exhale as you squeeze your glutes and press through your heels to lift your hips up toward the ceiling.',
        'Create a straight diagonal line from your knees down to your shoulders at the top of the bridge.',
        'Lower your hips back down to the floor smoothly, one vertebra at a time.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=h2OqMrVWhdQ',
    },
    {
      id: 'core-pilates-table-top',
      name: 'Pilates Table Top',
      setup: 'Lie on your back with your arms resting flat by your sides.',
      steps: [
        'Engage your core to imprint your lower back into the mat.',
        'Lift your right leg up, bending it until your hip and knee form a precise 90° angle.',
        'Lift your left leg up to match the right one, holding both legs steady in the air with your shins parallel to the ground. Maintain this isometric hold.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=pybDwdZcmWM',
    },
    {
      id: 'core-pilates-teaser',
      name: 'Pilates Teaser / Single Leg',
      setup:
        'Lie flat on your back with your arms extended straight overhead. Bend your knees and place your feet flat on the floor.',
      steps: [
        'Extend your right leg straight out so it floats at about a 45° angle, keeping your knees aligned.',
        'Exhale as you sweep your arms forward and roll your spine up off the floor, reaching your hands toward your right toes until you are balanced on your sit bones.',
        'Inhale at the top, then slowly roll your spine back down to the mat with control.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=qktawQfRsIU',
    },
    {
      id: 'core-plank-extensions',
      name: 'Plank Extensions & Push Up Plank',
      setup: 'Get into a standard forearm plank position, balancing on your elbows and toes with a flat back and a braced core.',
      steps: [
        "Establish a rock-solid foundation, ensuring your hips don't sag or sway.",
        'Reach your right arm straight out in front of you, holding it for a second without shifting your body weight or twisting your torso.',
        'Return your right elbow to the floor and extend your left arm forward on the next rep.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Kk8Qj19hg6Q',
    },
    {
      id: 'core-plank-jacks',
      name: 'Plank Jacks',
      setup:
        'Start in a high plank position on your hands and toes, keeping your hands directly under your shoulders and your feet close together.',
      steps: [
        'Keeping your upper body completely stable, jump both feet out wide to the sides (like a jumping jack).',
        'Immediately jump both feet back together to return to the starting plank position.',
        "Repeat dynamically, ensuring your hips don't bounce up and down during the jumps.",
      ],
      videoUrl: 'https://www.youtube.com/watch?v=PR9nHQXCZMo',
    },
    {
      id: 'core-reclined-oblique-twist',
      name: 'Reclined Oblique Twist / Russian Twist',
      setup:
        'Sit on the floor with your knees bent and feet flat on the mat. Clasp your hands together in front of your chest and lean your torso back slightly (45° angle) to engage your abdominal wall.',
      steps: [
        'Keeping your feet anchored to the floor, rotate your torso to the right side, guiding your hands toward the floor next to your hip.',
        'Reverse the movement and twist all the way over to the left side.',
        'Move smoothly and deliberately, focusing the work on your obliques.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=_CBb01Bjn98',
    },
    {
      id: 'core-reverse-crunch',
      name: 'Reverse Crunch',
      setup: 'Lie flat on your back with your arms down by your sides. Raise your legs into a tabletop position (90° angles).',
      steps: [
        'Exhale and contract your lower abdominal muscles to curl your knees in toward your chest.',
        'Allow your hips and lower back to tilt and lift slightly off the mat. Avoid using momentum or pushing off with your hands.',
        'Inhale as you slowly lower your hips back down to the starting tabletop position.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=OzRiZ6QgnTA',
    },
    {
      id: 'core-shell-stretch',
      name: 'Shell Stretch',
      setup: 'Begin on your hands and knees in a tabletop position.',
      steps: [
        'Shift your weight backward, widening your knees slightly, and sit your glutes all the way back onto your heels.',
        'Slide your arms straight out in front of you along the floor, allowing your chest to drop down between your thighs.',
        'Rest your forehead gently on the mat and breathe deeply to release tension in your lower back.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=99CuTw_hNAI',
    },
    {
      id: 'core-windshield-wipers',
      name: 'Windshield Wipers',
      setup:
        'Lie flat on your back and extend your arms straight out to the sides for stability, forming a "T" shape. Raise your legs into a tabletop position (90° bend in knees).',
      steps: [
        'Keeping your shoulders pinned flat against the mat, slowly lower both knees down to the right side toward the floor.',
        'Stop just before your knees touch the ground, using your core to control the weight of your legs.',
        'Exhale and use your obliques to pull your legs back up to the center, then lower them down to the left side.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=SQMAuU7LvkI',
    },
  ],
  'Upper Back & Arms (Elbow / Wrist)': [
    {
      id: 'upper-band-bent-over-row',
      name: 'Band Bent Over Row (Close / Wide)',
      setup:
        'Stand on the center of the band with your feet hip-width apart. Hinge forward at your hips, keeping your back flat and knees slightly bent, letting your arms hang straight down toward the floor while gripping the band handles.',
      steps: [
        'Exhale and pull the band handles up toward your ribs.',
        'Keep your elbows tucked tightly against the sides of your body as you pull.',
        'Squeeze your shoulder blades together at the top, then slowly lower your arms back down to the start.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=gQfb_k_2ZwI',
    },
    {
      id: 'upper-band-bicep-curl',
      name: 'Band Bicep Curl',
      setup:
        'Stand on the resistance band with both feet. Hold the handles down by your sides with your arms fully extended and your palms facing forward.',
      steps: [
        'Keep your elbows pinned close to your torso. Exhale and bend your elbows, curling your hands up toward your shoulders.',
        'Squeeze your biceps firmly at the top of the movement.',
        'Inhale and slowly lower your hands back down to the starting position, maintaining tension on the band.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=3g-1J2KkX_8',
    },
    {
      id: 'upper-band-overhead-tricep-extension',
      name: 'Band Overhead Tricep Extension',
      setup:
        'Step on one end of the band with your back foot. Reach your right arm up over your head, bending the elbow so your hand holds the band handle behind your neck.',
      steps: [
        'Keep your upper arm completely vertical and stable next to your ear.',
        'Exhale and extend your right hand straight up toward the ceiling, moving only from the elbow joint.',
        'Slowly lower your hand back down behind your head, resisting the pull of the band. Complete your reps, then switch arms.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Yi_zNoIsNcc',
    },
    {
      id: 'upper-push-up',
      name: 'Push Up (Traditional / Wide / Tricep / Single Leg)',
      setup:
        'Start in a modified plank position with your knees on the floor, your hands placed slightly wider than shoulder-width apart, and your body forming a straight line from your head to your knees.',
      steps: [
        'Inhale as you bend your elbows, lowering your chest down toward the floor. Keep your elbows tracking backward at a 45° angle (do not flare them straight out).',
        'Drop down until your chest is just an inch or two off the ground.',
        'Exhale and push through your palms to return to the starting position, keeping your core braced throughout.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=HCapLWaJ_qY',
    },
  ],
  'Advanced Stage: Plyometrics & Agility (Return to Sport)': [
    {
      id: 'advanced-agility-dots',
      name: 'Agility Dots',
      setup: 'Stand upright with your feet close together. Imagine a square grid of four dots drawn on the floor in front of you.',
      steps: [
        'Keeping your feet glued together, perform quick, rapid hops from dot to dot in a specific pattern (e.g., front-right, front-left, back-left, back-right).',
        'Stay light on the balls of your feet, keeping your contact time with the floor as brief as possible to train ankle reactivity.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=rY6wLs011WA',
    },
    {
      id: 'advanced-broad-jump',
      name: 'Broad Jump / Squat Jump / Jump Turns / Knee Tuck Jumps',
      setup: 'Stand with feet shoulder-width apart. Drop down into a half-squat and swing your arms back behind you to load your lower body.',
      steps: [
        'Swing your arms forward violently and leap explosively forward as far as you can off both feet.',
        'In the air, bring your feet forward to prepare for landing.',
        'Land softly on both feet, immediately absorbing the impact by bending your knees back into a controlled squat position.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=96zJo3nlmHI',
    },
    {
      id: 'advanced-burpee',
      name: 'Burpee',
      setup: 'Stand tall with your feet hip-width apart and your arms at your sides.',
      steps: [
        'Drop down into a deep squat and place your hands flat on the floor in front of you.',
        'Step your right foot back, then your left foot, ending up in a solid high plank position (this low-impact version skips the push-up).',
        'Step your right foot forward, then your left foot to return to the squat position, stand up straight, and stretch your arms overhead.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Y6RMSAbWd-4',
    },
    {
      id: 'advanced-high-knees',
      name: 'High Knees',
      setup: 'Stand upright with your feet hip-width apart and your elbows bent at 90° by your sides.',
      steps: [
        'March dynamically in place, driving your right knee up toward your chest until it passes hip height.',
        'Lower the right foot and immediately drive your left knee up.',
        'As you progress to higher levels, turn this march into a rapid sprint, bouncing explosively from foot to foot.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Xh8JEoYjYhg',
    },
    {
      id: 'advanced-ice-skaters',
      name: 'Ice Skaters',
      setup: 'Stand on the right side of your mat, bending your knees slightly in an athletic stance.',
      steps: [
        'Push off your right foot to leap laterally to the left side of your mat, landing softly on your left foot.',
        'Allow your right leg to sweep naturally behind you diagonally (like a curtsy), while swinging your arms across your body to help balance.',
        'Immediately push off your left foot to leap back over to the right side.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=0blnmxtoqVY',
    },
    {
      id: 'advanced-jumping-jacks',
      name: 'Jumping Jacks / Jumping Oblique Twist / Push Up Jacks',
      setup: 'Stand upright with your feet together and your arms resting at your sides.',
      steps: [
        'Jump your feet out wide to the sides while simultaneously swinging your arms up over your head in a wide arc.',
        'Without pausing, jump your feet back together and bring your arms back down to your sides.',
        'Repeat the movement continuously and rhythmically.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=c4DAnQ6DtF8',
    },
    {
      id: 'advanced-lateral-hops',
      name: 'Lateral Hops / Jumps / Ventral Hops / Single Leg Hops',
      setup: 'Stand tall on your right foot only, keeping your left foot hovered in the air.',
      steps: [
        'Using only your right leg, hop sideways to the right, then immediately hop back to the left over an imaginary line.',
        'Stay springy and light on the ball of your foot, focusing on ankle stability. Swap legs after completing the set.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=bqbZqxqs8tY',
    },
    {
      id: 'advanced-jumping-lunge',
      name: 'Lunge, Jumping',
      setup:
        'Start in a standard forward lunge position with your right foot forward and your left foot back, both knees bent at a 90° angle.',
      steps: [
        'Explode vertically into the air, driving through both feet. Swing your arms upward to gain momentum.',
        'While in mid-air, quickly switch the position of your legs, bringing your left leg forward and right leg back.',
        'Land softly, dropping directly into a lunge on the opposite side to begin the next rep.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=cIkkHg8YZQU',
    },
    {
      id: 'advanced-mountain-climbers',
      name: 'Mt. Climbers',
      setup: 'Get into a high plank position on your hands and toes, keeping your body in a straight line and hands under your shoulders.',
      steps: [
        'Drive your right knee forward toward your chest under control, tapping your right toes lightly on the floor.',
        'Step the right foot back to the plank position.',
        'Drive your left knee forward toward your chest, tap, and return. Speed up the rhythm into a running motion for higher levels.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=OFmap6Q2iqQ',
    },
    {
      id: 'advanced-squat-jacks',
      name: 'Squat Jacks',
      setup: 'Stand with your feet together and hands clasped in front of your chest.',
      steps: [
        'Jump your feet out wide into a broad stance and immediately drop your hips back into a wide squat.',
        'Press through your feet to jump out of the squat, bringing your feet back together to return to the starting standing position.',
        'Repeat continuously, maintaining a fast pace.',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=LK3jSsdQ7M4',
    },
  ],
};

export function getExercisesForAreas(areas) {
  return areas.flatMap((area) => EXERCISES_BY_AREA[area] ?? []);
}
