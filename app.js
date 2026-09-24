(() => {
  'use strict';

  const KEY = 'usefirst_kitchen_v1';
  const PLAN_KEY = 'usefirst_two_day_plan_v1';
  const COOKED = new Set(['cooked-rice', 'cooked-pasta', 'cooked-noodles', 'cooked-grain', 'cooked-potato', 'cooked-veg', 'cooked-protein', 'cooked-beans']);
  const RAW = new Set(['raw-poultry', 'raw-meat', 'raw-ground-meat', 'raw-fish']);
  const DATED = new Set([...COOKED, ...RAW]);
  const LABEL = {
    'cooked-rice': 'cooked rice', 'cooked-pasta': 'cooked pasta', 'cooked-noodles': 'cooked noodles',
    'cooked-grain': 'cooked grains', 'cooked-potato': 'cooked potatoes', 'cooked-veg': 'cooked vegetables',
    'cooked-protein': 'cooked meat, fish or tofu', 'cooked-beans': 'cooked beans or lentils',
    'fresh-veg': 'fresh vegetables', greens: 'leafy greens', tomato: 'tomatoes', onion: 'onions',
    mushrooms: 'mushrooms', 'raw-potato': 'potatoes', bread: 'bread', tortilla: 'wraps or tortillas',
    eggs: 'eggs', fruit: 'fruit or berries', cheese: 'cheese', yogurt: 'yogurt', milk: 'milk',
    oats: 'oats', 'canned-beans': 'canned beans or lentils', 'canned-tomato': 'canned tomatoes',
    carrot: 'carrots', pepper: 'peppers', broccoli: 'broccoli', cucumber: 'cucumber',
    cabbage: 'cabbage', corn: 'corn', avocado: 'avocado', hummus: 'hummus',
    'peanut-butter': 'peanut butter', nuts: 'nuts or seeds', 'canned-fish': 'canned fish',
    'raw-poultry': 'raw chicken or turkey', 'raw-meat': 'raw beef, pork or lamb',
    'raw-ground-meat': 'raw ground meat', 'raw-fish': 'raw fish or shrimp'
  };
  const FRESH_VEG = ['fresh-veg', 'greens', 'tomato', 'onion', 'mushrooms', 'carrot', 'pepper', 'broccoli', 'cabbage', 'corn'];
  const VEG = ['cooked-veg', ...FRESH_VEG];
  const BEANS = ['cooked-beans', 'canned-beans'];
  const INGREDIENTS = [
    ['rice', 'cooked-rice'], ['fried rice', 'cooked-rice'], ['risotto', 'cooked-rice'],
    ['pasta', 'cooked-pasta'], ['spaghetti', 'cooked-pasta'], ['macaroni', 'cooked-pasta'], ['penne', 'cooked-pasta'],
    ['noodles', 'cooked-noodles'], ['ramen', 'cooked-noodles'], ['udon', 'cooked-noodles'], ['soba', 'cooked-noodles'],
    ['quinoa', 'cooked-grain'], ['couscous', 'cooked-grain'], ['bulgur', 'cooked-grain'], ['barley', 'cooked-grain'],
    ['potato', 'raw-potato'], ['sweet potato', 'raw-potato'], ['mashed potato', 'cooked-potato'],
    ['beans', 'canned-beans'], ['black beans', 'canned-beans'], ['kidney beans', 'canned-beans'], ['lentils', 'canned-beans'], ['chickpeas', 'canned-beans'],
    ['tomato', 'tomato'], ['cherry tomatoes', 'tomato'], ['canned tomatoes', 'canned-tomato'],
    ['onion', 'onion'], ['shallot', 'onion'], ['spring onion', 'onion'], ['mushroom', 'mushrooms'],
    ['spinach', 'greens'], ['lettuce', 'greens'], ['kale', 'greens'], ['arugula', 'greens'],
    ['carrot', 'carrot'], ['bell pepper', 'pepper'], ['capsicum', 'pepper'], ['broccoli', 'broccoli'],
    ['cucumber', 'cucumber'], ['cabbage', 'cabbage'], ['corn', 'corn'], ['sweetcorn', 'corn'], ['avocado', 'avocado'],
    ['zucchini', 'fresh-veg'], ['courgette', 'fresh-veg'], ['eggplant', 'fresh-veg'], ['aubergine', 'fresh-veg'],
    ['cauliflower', 'fresh-veg'], ['peas', 'fresh-veg'], ['green beans', 'fresh-veg'], ['asparagus', 'fresh-veg'],
    ['tortilla', 'tortilla'], ['wrap', 'tortilla'], ['flatbread', 'tortilla'], ['pita', 'tortilla'],
    ['bread', 'bread'], ['bagel', 'bread'], ['roll', 'bread'], ['sourdough', 'bread'], ['egg', 'eggs'],
    ['yogurt', 'yogurt'], ['yoghurt', 'yogurt'], ['cheese', 'cheese'], ['cheddar', 'cheese'],
    ['mozzarella', 'cheese'], ['parmesan', 'cheese'], ['feta', 'cheese'], ['milk', 'milk'],
    ['oats', 'oats'], ['oatmeal', 'oats'], ['banana', 'fruit'], ['apple', 'fruit'], ['pear', 'fruit'],
    ['orange', 'fruit'], ['mango', 'fruit'], ['strawberry', 'fruit'], ['blueberry', 'fruit'],
    ['grapes', 'fruit'], ['peach', 'fruit'], ['pineapple', 'fruit'], ['melon', 'fruit'],
    ['hummus', 'hummus'], ['peanut butter', 'peanut-butter'], ['almond butter', 'peanut-butter'],
    ['almonds', 'nuts'], ['walnuts', 'nuts'], ['peanuts', 'nuts'], ['sunflower seeds', 'nuts'], ['pumpkin seeds', 'nuts'],
    ['canned tuna', 'canned-fish'], ['tinned tuna', 'canned-fish'], ['canned salmon', 'canned-fish'], ['sardines', 'canned-fish'],
    ['cooked chicken', 'cooked-protein'], ['cooked tofu', 'cooked-protein'], ['cooked fish', 'cooked-protein'], ['cooked beef', 'cooked-protein'],
    ['chicken', 'raw-poultry'], ['chicken breast', 'raw-poultry'], ['chicken thigh', 'raw-poultry'], ['turkey', 'raw-poultry'],
    ['beef', 'raw-meat'], ['steak', 'raw-meat'], ['pork', 'raw-meat'], ['pork chop', 'raw-meat'], ['lamb', 'raw-meat'],
    ['ground beef', 'raw-ground-meat'], ['minced beef', 'raw-ground-meat'], ['ground pork', 'raw-ground-meat'], ['minced pork', 'raw-ground-meat'],
    ['fish', 'raw-fish'], ['salmon', 'raw-fish'], ['cod', 'raw-fish'], ['tilapia', 'raw-fish'], ['tuna', 'raw-fish'], ['shrimp', 'raw-fish'], ['prawns', 'raw-fish']
  ];
  const $ = id => document.getElementById(id);
  const todayISO = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  const dayDiff = date => {
    const [y, m, d] = date.split('-').map(Number);
    const [ty, tm, td] = todayISO().split('-').map(Number);
    return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(y, m - 1, d)) / 86400000);
  };
  const list = values => new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(values);
  const named = (items, ...types) => list(items.filter(item => types.includes(item.type)).map(item => item.name));
  const cookRaw = ({ names, has, items }) => {
    const steps = [];
    if (has('raw-poultry')) steps.push(`Cook ${names('raw-poultry')} in a clean pan to 74°C / 165°F.`);
    if (has('raw-ground-meat')) steps.push(`Cook ${names('raw-ground-meat')} in a clean pan to 71°C / 160°F.`);
    if (has('raw-meat')) steps.push(`Cook ${names('raw-meat')} in a clean pan to 63°C / 145°F, then rest it for 3 minutes.`);
    const seafood = items.filter(item => item.type === 'raw-fish');
    const shellfish = seafood.filter(item => /\b(shrimp|prawns?)\b/i.test(item.name));
    const fish = seafood.filter(item => !shellfish.includes(item));
    if (fish.length) steps.push(`Cook ${list(fish.map(item => item.name))} in a clean pan to 63°C / 145°F.`);
    if (shellfish.length) steps.push(`Cook ${list(shellfish.map(item => item.name))} in a clean pan until opaque throughout.`);
    return steps.join(' ');
  };

  const recipes = [
    {
      title: 'Fried rice from leftovers',
      intro: 'A hot pan makes yesterday’s rice and spare vegetables feel like dinner.',
      slots: [['cooked-rice'], VEG], extras: ['cooked-protein', ...BEANS, 'eggs'],
      steps: ({ names, has }) => [
        names(...FRESH_VEG) ? `Prepare ${names(...FRESH_VEG)} and cook in a little oil until tender.${has('cooked-veg') ? ` Add ${names('cooked-veg')} and reheat.` : ''}` : `Reheat ${names('cooked-veg')} in a lightly oiled pan.`,
        `Add ${names('cooked-rice')}${names('cooked-protein', ...BEANS) ? ` and ${names('cooked-protein', ...BEANS)}` : ''}. Stir until the rice and any cooked leftovers are thoroughly hot.`,
        has('eggs') ? `Cook ${names('eggs')} fully in the pan, then mix through.` : 'Season with what you have and serve hot.'
      ]
    },
    {
      title: 'Pasta skillet',
      intro: 'Leftover pasta, a pan, and whatever vegetables or protein are around.',
      slots: [['cooked-pasta'], [...VEG, 'canned-tomato', 'cooked-protein', ...BEANS]], extras: ['cheese'],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Prepare and cook ${names(...FRESH_VEG)} in a little oil until tender.` : 'Heat a little oil in a pan.',
        `Add ${names('cooked-pasta')}${names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS) ? ` with ${names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS)}` : ''}. Toss until all cooked leftovers are thoroughly hot.`,
        names('cheese') ? `Finish with ${names('cheese')} and serve.` : 'Season to taste and serve.'
      ]
    },
    {
      title: 'Noodle stir-fry',
      intro: 'Give cooked noodles a quick second life in a hot pan.',
      slots: [['cooked-noodles'], [...VEG, 'cooked-protein', ...BEANS]], extras: ['eggs'],
      steps: ({ names, has }) => [
        names(...FRESH_VEG) ? `Prepare and cook ${names(...FRESH_VEG)} until tender.` : 'Heat a lightly oiled pan.',
        `Add ${names('cooked-noodles')}${names('cooked-veg', 'cooked-protein', ...BEANS) ? ` and ${names('cooked-veg', 'cooked-protein', ...BEANS)}` : ''}. Toss until the cooked leftovers are thoroughly reheated.`,
        has('eggs') ? `Cook ${names('eggs')} fully in the pan, then mix through.` : 'Add any seasoning you already have and serve.'
      ]
    },
    {
      title: 'Grain bowl',
      intro: 'Put leftover rice or grains under a warm, simple topping.',
      slots: [['cooked-rice', 'cooked-grain'], ['cooked-protein', ...BEANS, ...VEG]], extras: [],
      steps: ({ names }) => [
        `Warm ${names('cooked-rice', 'cooked-grain')} until thoroughly hot.`,
        names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} until tender.${names('cooked-veg', 'cooked-protein', ...BEANS) ? ` Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.` : ''}` : `Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.`,
        `Put the topping over the grains. Add seasoning or sauce only if you have it.`
      ]
    },
    {
      title: 'Potato hash',
      intro: 'A pan meal for spare potatoes and a few other odds and ends.',
      slots: [['cooked-potato', 'raw-potato'], [...VEG, 'eggs', ...BEANS]], extras: ['cooked-protein', 'cheese'],
      steps: ({ names, has }) => [
        has('raw-potato') ? `Dice ${names('raw-potato')} and cook in a lightly oiled pan until fully tender.` : `Cut ${names('cooked-potato')} and reheat in a lightly oiled pan.`,
        `${names(...FRESH_VEG) ? `Add ${names(...FRESH_VEG)} and cook until tender. ` : ''}${names('cooked-veg', 'cooked-protein', ...BEANS) ? `Add ${names('cooked-veg', 'cooked-protein', ...BEANS)} and reheat thoroughly.` : ''}` || 'Keep the pan hot.',
        `${has('eggs') ? `Cook ${names('eggs')} fully in the pan. ` : ''}${has('cheese') ? `Top with ${names('cheese')}.` : 'Season and serve hot.'}`
      ]
    },
    {
      title: 'Tortilla melt',
      intro: 'A wrap and a little cheese make a useful base for small leftovers.',
      slots: [['tortilla'], ['cheese']], extras: [...VEG, 'cooked-protein', ...BEANS],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Prepare and cook ${names(...FRESH_VEG)} until tender.` : 'Heat a pan over medium heat.',
        names('cooked-veg', 'cooked-protein', ...BEANS) ? `Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.` : 'Keep the pan ready for the wrap.',
        `Put ${names('cheese')}${names(...VEG, 'cooked-protein', ...BEANS) ? ` and ${names(...VEG, 'cooked-protein', ...BEANS)}` : ''} inside ${names('tortilla')}. Fold and toast both sides until the cheese melts.`
      ]
    },
    {
      title: 'Toast with toppings',
      intro: 'Turn a small leftover into something to eat on toast.',
      slots: [['bread'], ['cheese', ...VEG, 'cooked-protein', ...BEANS]], extras: [],
      steps: ({ names }) => [
        `Toast ${names('bread')}.`,
        `${names(...FRESH_VEG) ? `Prepare ${names(...FRESH_VEG)} for the topping. ` : ''}${names('cooked-veg', 'cooked-protein', ...BEANS) ? `Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.` : ''}` || 'Prepare the topping.',
        `Pile ${names('cheese', ...VEG, 'cooked-protein', ...BEANS)} onto the toast and serve.`
      ]
    },
    {
      title: 'Egg-and-leftovers skillet',
      intro: 'Eggs pull small amounts of vegetables or cooked leftovers together.',
      slots: [['eggs'], [...VEG, 'cooked-protein', ...BEANS]], extras: ['cheese'],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} in a lightly oiled pan until tender.` : 'Heat a lightly oiled pan.',
        names('cooked-veg', 'cooked-protein', ...BEANS) ? `Add ${names('cooked-veg', 'cooked-protein', ...BEANS)} and reheat thoroughly.` : 'Keep the pan warm.',
        `Beat ${names('eggs')} and pour into the pan. Cook until fully set.${names('cheese') ? ` Add ${names('cheese')} before serving.` : ''}`
      ]
    },
    {
      title: 'Use-it-up soup',
      intro: 'A small pot can bring several separate leftovers together.',
      slots: [[...VEG, 'canned-tomato'], [...VEG, 'canned-tomato', 'cooked-protein', ...BEANS, 'cooked-rice', 'cooked-pasta', 'cooked-noodles', 'cooked-grain']], extras: [],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Prepare ${names(...FRESH_VEG)} and simmer in enough water to cover until tender.` : 'Bring a pot of water to a simmer.',
        names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS, 'cooked-rice', 'cooked-pasta', 'cooked-noodles', 'cooked-grain') ? `Add ${names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS, 'cooked-rice', 'cooked-pasta', 'cooked-noodles', 'cooked-grain')}. Simmer until all cooked leftovers are thoroughly hot.` : 'Keep simmering until the vegetables are cooked through.',
        'Season with what you have and serve.'
      ]
    },
    {
      title: 'Warm bean pan',
      intro: 'Beans plus vegetables make a quick, filling meal.',
      slots: [BEANS, VEG], extras: ['bread', 'tortilla', 'cooked-rice', 'cooked-grain'],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} in a little oil until tender.` : 'Heat a lightly oiled pan.',
        `Add ${names(...BEANS)}${names('cooked-veg') ? ` and ${names('cooked-veg')}` : ''}. Heat thoroughly.`,
        names('bread', 'tortilla', 'cooked-rice', 'cooked-grain') ? `Warm ${names('bread', 'tortilla', 'cooked-rice', 'cooked-grain')} and serve with the beans.` : 'Season and eat as a simple bowl.'
      ]
    },
    {
      title: 'Fruit-and-yogurt bowl',
      intro: 'A quick breakfast for fruit that is ready to eat.',
      slots: [['fruit'], ['yogurt']], extras: [],
      steps: ({ names }) => [`Wash and cut ${names('fruit')}, removing inedible parts.`, `Spoon ${names('yogurt')} into a bowl and add the fruit.`, 'Eat now or refrigerate promptly.']
    },
    {
      title: 'Fruit smoothie',
      intro: 'Fruit and milk are enough for a simple drink.',
      slots: [['fruit'], ['milk']], extras: ['yogurt'],
      steps: ({ names }) => [`Wash and cut ${names('fruit')}, removing inedible parts.`, `Blend with ${names('milk')}${names('yogurt') ? ` and ${names('yogurt')}` : ''}.`, 'Drink right away or refrigerate promptly.']
    },
    {
      title: 'Fruit oatmeal',
      intro: 'A useful breakfast when you have oats and fruit.',
      slots: [['oats'], ['fruit']], extras: ['milk', 'yogurt'],
      steps: ({ names }) => [`Cook ${names('oats')} with ${names('milk') || 'water'} until soft.`, `Wash and cut ${names('fruit')} and add it to the oats.`, names('yogurt') ? `Top with ${names('yogurt')} and serve.` : 'Serve warm.']
    },
    {
      title: 'Rice porridge',
      intro: 'Even one portion of leftover rice can become a warm meal.',
      slots: [['cooked-rice']], extras: ['cooked-veg', 'cooked-protein', ...BEANS],
      steps: ({ names }) => [`Simmer ${names('cooked-rice')} with water until soft and thick.`, names('cooked-veg', 'cooked-protein', ...BEANS) ? `Add ${names('cooked-veg', 'cooked-protein', ...BEANS)} and reheat thoroughly.` : 'Season with what you have.', 'Serve hot.']
    },
    {
      title: 'Loaded potato',
      intro: 'A potato makes a base for whatever small topping you have.',
      slots: [['raw-potato', 'cooked-potato'], ['cheese', 'yogurt', ...BEANS, 'cooked-veg', 'cooked-protein']], extras: ['tomato', 'greens'],
      steps: ({ names, has }) => [
        has('raw-potato') ? `Cook ${names('raw-potato')} until fully tender.` : `Reheat ${names('cooked-potato')} thoroughly.`,
        names('cooked-veg', 'cooked-protein', ...BEANS) ? `Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.` : 'Cut the potato open.',
        `Top with ${names('cheese', 'yogurt', ...BEANS, 'cooked-veg', 'cooked-protein', 'tomato', 'greens')}. Wash fresh toppings before adding them.`
      ]
    },
    {
      title: 'Grilled cheese and tomato',
      intro: 'A familiar way to use the last slices of bread and cheese.',
      slots: [['bread'], ['cheese']], extras: ['tomato'],
      steps: ({ names }) => [`Put ${names('cheese')}${names('tomato') ? ` and sliced ${names('tomato')}` : ''} between ${names('bread')}.`, 'Toast in a lightly oiled pan until golden on both sides and the cheese melts.', 'Serve warm.']
    },
    {
      title: 'Eggs for dinner',
      intro: 'A simple answer when eggs are the main thing left.',
      slots: [['eggs']], extras: ['bread', ...VEG],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} until tender.` : 'Heat a lightly oiled pan.',
        names('cooked-veg') ? `Reheat ${names('cooked-veg')} thoroughly, then add ${names('eggs')} and cook until fully set.` : `Add ${names('eggs')} and cook until fully set.`,
        names('bread') ? `Serve with ${names('bread')}.` : 'Serve hot.'
      ]
    },
    {
      title: 'Hummus and veg wrap',
      intro: 'A quick way to use the last bits of fresh vegetables.',
      slots: [['tortilla'], ['hummus']], extras: [...FRESH_VEG, 'cucumber', 'avocado'],
      steps: ({ names }) => [
        names(...FRESH_VEG, 'cucumber', 'avocado') ? `Prepare ${names(...FRESH_VEG, 'cucumber', 'avocado')}: wash fresh produce and drain anything canned.` : 'Set out a plate for the wrap.',
        `Spread ${names('hummus')} on ${names('tortilla')}.`,
        names(...FRESH_VEG, 'cucumber', 'avocado') ? `Add ${names(...FRESH_VEG, 'cucumber', 'avocado')}, roll up, and eat.` : 'Roll up and eat.'
      ]
    },
    {
      title: 'Peanut butter toast',
      intro: 'A fast use for bread, with fruit if you have some.',
      slots: [['bread'], ['peanut-butter']], extras: ['fruit', 'nuts'],
      steps: ({ names }) => [
        `Toast ${names('bread')}.`,
        `Spread ${names('peanut-butter')} on the toast.`,
        names('fruit', 'nuts') ? `Add ${names('fruit', 'nuts')} on top and eat.` : 'Eat while warm.'
      ]
    },
    {
      title: 'Bean and vegetable salad',
      intro: 'Beans and a few fresh vegetables make a no-cook lunch.',
      slots: [BEANS, ['tomato', 'carrot', 'pepper', 'cucumber', 'cabbage', 'corn', 'greens']], extras: ['avocado', 'cheese', 'nuts'],
      steps: ({ names }) => [
        names('canned-beans') ? `Drain and rinse ${names('canned-beans')}.` : `Use ${names('cooked-beans')} only if it has been kept cold since cooking.`,
        `Prepare ${names('tomato', 'carrot', 'pepper', 'cucumber', 'cabbage', 'corn', 'greens', 'avocado')}: wash fresh produce and drain anything canned.`,
        `Mix with the beans${names('cheese', 'nuts') ? ` and ${names('cheese', 'nuts')}` : ''}. Season with what you have and eat promptly.`
      ]
    },
    {
      title: 'Tuna toast',
      intro: 'A simple lunch from canned fish and spare bread.',
      slots: [['bread'], ['canned-fish']], extras: ['tomato', 'cucumber', 'avocado'],
      steps: ({ names }) => [
        `Toast ${names('bread')} and drain ${names('canned-fish')}.`,
        names('tomato', 'cucumber', 'avocado') ? `Wash and cut ${names('tomato', 'cucumber', 'avocado')}.` : 'Flake the fish with a fork.',
        `Put the fish${names('tomato', 'cucumber', 'avocado') ? ` and ${names('tomato', 'cucumber', 'avocado')}` : ''} on the toast. Eat promptly.`
      ]
    },
    {
      title: 'Crunchy side salad',
      intro: 'A place for the last handfuls of fresh vegetables.',
      slots: [['greens', 'cabbage'], ['tomato', 'carrot', 'pepper', 'cucumber', 'corn']], extras: ['avocado', 'cheese', 'nuts'],
      steps: ({ names }) => [
        `Prepare ${names('greens', 'cabbage', 'tomato', 'carrot', 'pepper', 'cucumber', 'corn', 'avocado')}: wash fresh produce, drain anything canned, and cut as needed.`,
        `Toss the vegetables together${names('cheese', 'nuts') ? ` with ${names('cheese', 'nuts')}` : ''}.`,
        'Add any dressing you already have and serve.'
      ]
    },
    {
      title: 'Chicken and vegetable skillet',
      intro: 'Chicken and the vegetables you need to use, cooked in one pan.',
      slots: [['raw-poultry'], VEG], extras: ['cooked-rice'],
      steps: (ctx) => {
        const { names } = ctx;
        return [
          cookRaw(ctx),
          `${names(...FRESH_VEG) ? `In the same pan, cook ${names(...FRESH_VEG)} until tender.` : ''}${names('cooked-veg') ? ` Reheat ${names('cooked-veg')} until thoroughly hot.` : ''}`.trim(),
          names('cooked-rice') ? `Reheat ${names('cooked-rice')} until thoroughly hot and serve with the chicken and vegetables.` : 'Serve the chicken and vegetables together.'
        ];
      }
    },
    {
      title: 'Chicken fried rice',
      intro: 'Turn leftover rice and chicken into dinner.',
      slots: [['raw-poultry'], ['cooked-rice']], extras: VEG,
      steps: (ctx) => {
        const { names } = ctx;
        return [cookRaw(ctx), names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} in the same pan until tender.` : 'Keep the cooked chicken warm.',
          `Add ${names('cooked-rice')}${names('cooked-veg') ? ` and ${names('cooked-veg')}` : ''}. Stir until the cooked leftovers are thoroughly hot, then mix in the chicken.`];
      }
    },
    {
      title: 'Beef or pork with vegetables',
      intro: 'A quick pan meal for meat and spare vegetables.',
      slots: [['raw-meat', 'raw-ground-meat'], VEG], extras: ['cooked-rice', 'cooked-noodles'],
      steps: (ctx) => {
        const { names } = ctx;
        return [cookRaw(ctx), `${names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} until tender.` : ''}${names('cooked-veg') ? ` Reheat ${names('cooked-veg')} until thoroughly hot.` : ''}`.trim(),
          names('cooked-rice', 'cooked-noodles') ? `Reheat ${names('cooked-rice', 'cooked-noodles')} until thoroughly hot and serve with the meat and vegetables.` : 'Put the meat and vegetables together and season to taste.'];
      }
    },
    {
      title: 'Meat and tomato pasta',
      intro: 'Use cooked pasta with beef or pork and a tomato.',
      slots: [['raw-meat', 'raw-ground-meat'], ['cooked-pasta'], ['tomato', 'canned-tomato']], extras: ['onion', 'mushrooms', 'cheese'],
      steps: (ctx) => {
        const { names } = ctx;
        return [cookRaw(ctx), names('onion', 'mushrooms') ? `Cook ${names('onion', 'mushrooms')} until tender, then add ${names('tomato', 'canned-tomato')}.` : `Add ${names('tomato', 'canned-tomato')} to the pan and cook until softened.`,
          `Add ${names('cooked-pasta')} and heat until thoroughly hot. Mix in the meat${names('cheese') ? ` and finish with ${names('cheese')}` : ''}.`];
      }
    },
    {
      title: 'Fish with potatoes',
      intro: 'A simple plate from fish, potatoes, and any spare vegetables.',
      slots: [['raw-fish'], ['raw-potato', 'cooked-potato']], extras: VEG,
      steps: (ctx) => {
        const { names, has } = ctx;
        return [`${has('raw-potato') ? `Cut ${names('raw-potato')} and cook until fully tender.` : ''}${has('cooked-potato') ? ` Reheat ${names('cooked-potato')} until thoroughly hot.` : ''}`.trim(),
          cookRaw(ctx), `${names(...FRESH_VEG) ? `Cook ${names(...FRESH_VEG)} until tender.` : ''}${names('cooked-veg') ? ` Reheat ${names('cooked-veg')} until thoroughly hot.` : ''} Serve with the fish and potatoes.`.trim()];
      }
    },
    {
      title: 'Fish and rice bowl',
      intro: 'A warm bowl using fish and leftover rice.',
      slots: [['raw-fish'], ['cooked-rice']], extras: VEG,
      steps: (ctx) => {
        const { names } = ctx;
        return [cookRaw(ctx), `Reheat ${names('cooked-rice')} until thoroughly hot.`,
          `${names(...FRESH_VEG) ? `Wash and prepare ${names(...FRESH_VEG)}. Cook any vegetables you prefer warm.` : ''}${names('cooked-veg') ? ` Reheat ${names('cooked-veg')} thoroughly.` : ''} Put the fish over the rice and serve.`.trim()];
      }
    },
    {
      title: 'Chicken wrap',
      intro: 'Chicken and a wrap can take in the last bits of vegetables.',
      slots: [['raw-poultry'], ['tortilla']], extras: [...FRESH_VEG, 'cooked-veg', 'cheese', 'yogurt'],
      steps: (ctx) => {
        const { names } = ctx;
        return [cookRaw(ctx), names('cooked-veg') ? `Reheat ${names('cooked-veg')} thoroughly; wash and cut any fresh vegetables.` : 'Wash and cut any fresh vegetables you want in the wrap.',
          `Fill ${names('tortilla')} with the chicken${names(...FRESH_VEG, 'cooked-veg', 'cheese', 'yogurt') ? ` and ${names(...FRESH_VEG, 'cooked-veg', 'cheese', 'yogurt')}` : ''}. Fold and serve.`];
      }
    },
    {
      title: 'Tomato and egg pan',
      intro: 'Eggs and tomatoes make a quick meal with bread if you have it.',
      slots: [['eggs'], ['tomato', 'canned-tomato']], extras: ['onion', 'pepper', 'bread', 'cheese'],
      steps: ({ names }) => [
        `Cook ${names('tomato', 'canned-tomato', 'onion', 'pepper')} in a pan until the vegetables soften.`,
        `Crack in ${names('eggs')} and cook until the whites and yolks are fully set.`,
        names('bread', 'cheese') ? `Serve with ${names('bread', 'cheese')}.` : 'Season and serve hot.'
      ]
    },
    {
      title: 'Bean and cheese wrap',
      intro: 'A warm wrap for beans and the last bit of cheese.',
      slots: [['tortilla'], BEANS, ['cheese']], extras: ['tomato', 'onion', 'pepper'],
      steps: ({ names }) => [
        names('onion', 'pepper') ? `Cook ${names('onion', 'pepper')} until tender.` : 'Heat a pan over medium heat.',
        `Drain any canned beans, then heat ${names(...BEANS)} thoroughly.`,
        `Add the beans${names('tomato', 'onion', 'pepper') ? ` and ${names('tomato', 'onion', 'pepper')}` : ''} with ${names('cheese')} to ${names('tortilla')}. Fold and toast until the cheese melts.`
      ]
    }
  ];

  // Each entry has its own required foods and method. Numbered placeholders
  // name the matched food for that slot; the cook placeholder handles raw meat.
  const extendedMeals = [
    ["Egg in toast",["bread","eggs"],["Cut a hole in the middle of a slice of {0}. Keep the cut-out for dipping.","Warm a lightly oiled pan, add the bread and crack {1} into the hole.","Cook on both sides until the egg white and yolk are firm. Toast the cut-out alongside."]],
    ["French toast",["bread","eggs","milk"],["Beat {1} with a splash of {2} in a shallow bowl.","Dip slices of {0} into the mixture, coating both sides without soaking them until they fall apart.","Cook in a lightly oiled pan on both sides until golden and the egg coating is fully cooked."]],
    ["Cheese-stuffed French toast",["bread","eggs","milk","cheese"],["Put {3} between two thin slices of {0}.","Beat {1} with a splash of {2} and dip both sides of the sandwich into it.","Cook over medium-low heat, turning carefully, until the cheese melts and the egg coating is fully set."]],
    ["Fruit bread pudding",["bread","eggs","milk","fruit"],["Heat the oven to 180°C / 350°F. Tear {0} into a small ovenproof dish and add washed, chopped {3}, removing stones, cores or peel as needed.","Beat {1} with enough {2} to moisten the bread, then pour it over. Leave for a few minutes to soak in.","Bake until the middle is set and reaches 74°C / 165°F, checking from about 25 minutes. Let it cool slightly before eating."]],
    ["Baked fruit oats",["oats","milk","fruit"],["Heat the oven to 180°C / 350°F. Wash and chop {2}, removing inedible parts.","Mix {0} with the fruit and enough {1} to cover the oats in a small ovenproof dish.","Bake until the oats are soft and the liquid is mostly absorbed, checking from about 25 minutes. Add a splash more milk if it dries out."]],
    ["Peanut butter porridge",["oats","peanut-butter"],["Put {0} in a saucepan with enough water to cover generously.","Simmer, stirring and adding water as needed, until the oats soften.","Stir in a spoonful of {1} at a time until the porridge is as rich as you like. Serve warm."]],
    ["Overnight fruit oats",["oats","yogurt","fruit"],["Mix {0} with {1} and a little water to loosen it.","Wash and chop {2}, removing inedible parts, and stir it through.","Cover and refrigerate overnight. Stir before eating, adding water if the oats are too thick."]],
    ["Oat pancakes",["oats","eggs","milk"],["Blend {0} into a coarse flour, or use fine oats.","Beat in {1}, then add {2} a little at a time until you have a thick, spoonable batter. Rest for a few minutes.","Spoon small pancakes into a lightly oiled pan. Cook over medium-low heat on both sides until firm and cooked through."]],
    ["Potato and egg breakfast bake",[["raw-potato","cooked-potato"],"eggs","cheese"],["Heat the oven to 180°C / 350°F. Cut {0} into small pieces; boil any raw potatoes until tender and drain.","Put the potatoes in a small ovenproof dish. Beat {1}, mix in {2}, and pour over.","Bake until the egg is fully set and the center reaches 74°C / 165°F, checking from about 20 minutes."]],
    ["Avocado and egg toast",["bread","avocado","eggs"],["Toast {0} and mash the flesh of {1} with a fork.","Cook {2} in a pan until the whites and yolks are firm, or scramble until fully set.","Spread the avocado over the toast and put the eggs on top."]],
    ["Rice omelette",["cooked-rice","eggs","cheese"],["Reheat {0} in a lightly oiled pan until thoroughly hot.","Beat {1}, pour over the rice, and scatter {2} on top.","Cook on low heat until the egg is fully set, covering the pan if needed. Fold and serve."]],
    ["Breakfast tortilla",["tortilla","eggs","tomato"],["Wash and dice {2}. Warm {0} in a dry pan.","Beat {1} and scramble in a lightly oiled pan until fully set.","Fill the warm tortilla with the eggs and tomato, then fold it up."]],
    ["Pasta picnic salad",["cooked-pasta","tomato","cucumber","cheese"],["Use {0} that has been kept refrigerated. Loosen the pasta with a splash of water if it sticks together.","Wash and chop {1} and {2}, then cut or crumble {3}.","Toss everything together. Add a little oil or a dressing if you already have one, and eat promptly."]],
    ["Cucumber and grain salad",["cooked-grain","cucumber","tomato"],["Use chilled {0} that has been kept refrigerated, and fluff it with a fork.","Wash and dice {1} and {2}.","Mix the vegetables through the grains. Season with what you have and eat promptly."]],
    ["Fish and bean salad",["canned-fish",["canned-beans","cooked-beans"],"cucumber"],["Drain {0}. Drain canned beans, or use {1} that has been kept chilled after cooking.","Wash and dice {2}, then flake the fish with a fork.","Mix the cucumber, fish and beans together. Add a dressing if you have one and eat promptly."]],
    ["Avocado egg salad",["eggs","avocado","yogurt"],["Hard-boil {0} until the yolks are firm, then cool, peel and chop them.","Mash the flesh of {1} with a spoonful of {2}.","Fold the eggs into the avocado mixture and eat promptly, or refrigerate until serving."]],
    ["Cabbage and carrot slaw",["cabbage","carrot","yogurt"],["Wash and finely shred {0}. Wash and grate {1}.","Loosen {2} with a little water and season to taste.","Toss the vegetables with the yogurt dressing. Let them soften for a few minutes before eating."]],
    ["Tomato bread salad",["bread","tomato","cucumber"],["Tear {0} into small pieces and toast them in a dry pan until crisp.","Wash and chop {1} and {2}, keeping the tomato juices in the bowl.","Toss the bread with the vegetables and their juices. Let it sit briefly so the bread softens at the edges."]],
    ["Corn and bean salad",["corn",["canned-beans","cooked-beans"],"tomato"],["Drain canned {0}, or cook fresh corn until tender and cool it.","Drain canned beans, or use chilled {1}. Wash and dice {2}.","Mix the corn, beans and tomato. Season with what you have and eat promptly."]],
    ["Warm potato and bean salad",[["raw-potato","cooked-potato"],["canned-beans","cooked-beans"],"greens"],["Cut {0} into small pieces. Boil raw potatoes until tender, or reheat cooked potatoes until thoroughly hot.","Drain canned beans, then heat {1} thoroughly. Wash and roughly chop {2}.","Fold the potatoes and beans through the greens; let tough leaves wilt in the warm pan before serving."]],
    ["Hummus-stuffed peppers",["pepper","hummus","cucumber"],["Wash {0}, halve them and remove the seeds.","Wash and dice {2}, then mix it through {1}.","Spoon the filling into the pepper halves and eat as a crunchy light lunch."]],
    ["Cucumber yogurt dip with bread",["cucumber","yogurt","bread"],["Wash and grate {0}, then squeeze out the excess water.","Mix it into {1} and season to taste.","Toast or warm {2}, cut into pieces, and use it to scoop up the dip."]],
    ["Warm mushroom grain salad",["mushrooms","cooked-grain","greens"],["Clean and slice {0}, then cook in a lightly oiled pan until tender.","Add {1} with a splash of water and reheat until thoroughly hot.","Wash and chop {2}, stir through, and let the leaves wilt before serving."]],
    ["Broccoli and cheese pasta bowl",["broccoli","cooked-pasta","cheese"],["Cut {0} into small florets and steam or boil until tender. Save a little cooking water.","Add {1} to the drained broccoli with a splash of the water and heat thoroughly.","Stir in grated or crumbled {2}. Add a little more hot water to help it coat the pasta."]],
    ["Potato and onion soup",[["raw-potato","cooked-potato"],"onion","milk"],["Chop {1} and soften in a little oil in a saucepan. Add diced {0}.","Cover with water and simmer until the potatoes are fully tender.","Mash some of the potatoes into the liquid, stir in a splash of {2}, and heat through without boiling hard."]],
    ["Carrot and bean soup",["carrot",["canned-beans","cooked-beans"]],["Wash and chop {0}. Simmer in enough water to cover until soft.","Drain any canned beans or lentils, then add {1} and heat thoroughly.","Mash part of the soup to thicken it, or blend after cooling slightly. Add water to reach the thickness you like and serve hot."]],
    ["Tomato and bread soup",[["tomato","canned-tomato"],"bread","onion"],["Chop {2} and cook in a little oil until softened.","Add chopped {0} and enough water for a thick soup. Simmer until the tomatoes soften.","Tear in {1}, stir until the bread breaks down, and season to taste."]],
    ["Chicken or turkey noodle soup",["raw-poultry","cooked-noodles","carrot"],["{cook}","Wash and thinly slice {2}, then simmer in a pot of water until tender.","Cut the cooked poultry into bite-size pieces. Add it with {1} and heat until the noodles are thoroughly hot. Season and serve."]],
    ["Fish and tomato stew",["raw-fish","canned-tomato",["raw-potato","cooked-potato"]],["Dice {2} and simmer with {1} and a little water until the potatoes are fully tender.","{cook}","Gently fold the cooked fish or shrimp into the tomato potatoes and serve hot."]],
    ["Bean and pasta minestrone",[["canned-beans","cooked-beans"],"cooked-pasta","canned-tomato","carrot"],["Wash and dice {3}. Simmer with {2} and enough water for soup until the carrot is tender.","Drain any canned beans, then add {0} and {1}.","Simmer until the cooked ingredients are thoroughly hot. Season to taste and serve."]],
    ["Corn and potato chowder",["corn",["raw-potato","cooked-potato"],"milk"],["Dice {1} and simmer in water until fully tender.","Drain canned {0}, or cut fresh kernels from the cob. Add to the potatoes and simmer until tender.","Mash some potatoes to thicken the soup, stir in {2}, and warm through without boiling hard."]],
    ["Broccoli and potato soup",["broccoli",["raw-potato","cooked-potato"],"milk"],["Chop {1} and simmer in water until almost tender.","Add chopped {0} and simmer until both vegetables are soft.","Mash or blend the vegetables after cooling slightly. Stir in {2} and warm through, adding water if needed."]],
    ["Cabbage and bean soup",["cabbage",["canned-beans","cooked-beans"],"canned-tomato"],["Wash and shred {0}.","Simmer the cabbage with {2} and water until tender.","Drain any canned beans and add {1}. Heat thoroughly, season, and serve."]],
    ["Mushroom and grain soup",["mushrooms","cooked-grain","onion"],["Chop {2} and slice {0}. Cook together in a little oil until softened.","Add water and {1}, breaking up any clumps.","Simmer until the grains are thoroughly hot and the soup has the thickness you like."]],
    ["Peanut and carrot soup",["peanut-butter","carrot","canned-tomato"],["Wash and finely chop {1}. Simmer with {2} and water until soft.","Mix a spoonful of {0} with some hot soup in a bowl until smooth, then stir it back into the pan.","Simmer gently and add water if the soup becomes too thick. Season to taste."]],
    ["Rice and egg-drop soup",["cooked-rice","eggs","greens"],["Simmer {0} in enough water for a loose soup until thoroughly hot.","Wash and chop {2}, add to the pot, and cook until tender.","Beat {1} and pour it in slowly while stirring. Keep simmering until all the egg strands are fully cooked."]],
    ["Rice-stuffed peppers",["pepper","cooked-rice","cheese"],["Heat the oven to 180°C / 350°F. Wash and halve {0}, removing the seeds.","Mix {1} with {2} and spoon into the pepper halves. Put in a baking dish with a little water in the bottom.","Cover and bake until the peppers are tender and the filling reaches 74°C / 165°F. Uncover briefly to brown the top."]],
    ["Grain-stuffed tomatoes",["tomato","cooked-grain","cheese"],["Heat the oven to 180°C / 350°F. Halve {0} and scoop the centers into a bowl, keeping the outer shells.","Mix the scooped tomato with {1} and {2}, then spoon back into the shells.","Bake in a snug ovenproof dish until the filling is thoroughly hot at 74°C / 165°F and the tomatoes are tender."]],
    ["Cheesy stuffed mushrooms",["mushrooms","bread","cheese"],["Heat the oven to 180°C / 350°F. Clean {0} and remove the stems, chopping them finely.","Crumble {1}, mix with the chopped stems and {2}, then mound onto the mushroom caps. If the mushrooms are small, bake everything together in a small dish.","Bake until the mushrooms are tender and the topping is golden, checking from about 15 minutes."]],
    ["Bread pizza",["bread","tomato","cheese"],["Heat the oven to 200°C / 400°F. Toast {0} lightly first so it holds the topping.","Wash and thinly slice {1}. Put it on the bread and top with {2}.","Bake until the cheese melts and the edges are crisp, checking from about 5 minutes."]],
    ["Thin tortilla pizza",["tortilla","canned-tomato","cheese"],["Heat the oven to 200°C / 400°F. Drain excess liquid from {1} and mash it into a thick sauce.","Spread a thin layer over {0} and add {2}.","Bake on a tray until the base is crisp and the cheese melts, checking from about 5 minutes."]],
    ["Pasta frittata",["cooked-pasta","eggs","cheese"],["Reheat {0} in a lightly oiled pan until thoroughly hot.","Beat {1} with {2} and pour over the pasta.","Cook over low heat with a lid until the egg is fully set, or finish in an ovenproof pan at 180°C / 350°F. Check the middle reaches 74°C / 165°F."]],
    ["Potato and onion tortilla",[["raw-potato","cooked-potato"],"eggs","onion"],["Thinly slice {0} and {2}. Cook in a lightly oiled pan until the potatoes are fully tender, adding splashes of water if needed.","Beat {1}, pour over the vegetables, and lower the heat.","Cover and cook until the egg is fully set throughout. Cut into wedges to serve."]],
    ["Crisp rice cakes",["cooked-rice","eggs","cheese"],["Mix {0} with beaten {1} and grated {2}, adding enough egg to hold the rice together.","Press small, thin patties into a lightly oiled pan.","Cook on both sides until crisp and the centers reach 74°C / 165°F. Turn gently so they hold together."]],
    ["Bean and oat patties",[["canned-beans","cooked-beans"],"oats","onion"],["Drain {0} well and mash. Finely chop {2} and cook until soft.","Mix the onion into the beans with {1}, adding oats gradually until the mixture holds together. Let it sit for a few minutes.","Shape small, thin patties and pan-fry on both sides until browned and thoroughly hot at 74°C / 165°F."]],
    ["Fish and potato cakes",["canned-fish","cooked-potato","eggs"],["Drain and flake {0}. Mash {1} and mix it with the fish.","Beat {2} and mix in a little at a time until the mixture binds. Shape small, thin cakes.","Pan-fry on both sides until golden and the centers reach 74°C / 165°F."]],
    ["Broccoli oat fritters",["broccoli","eggs","oats"],["Steam {0} until tender, drain well, and chop finely.","Mix with beaten {1} and finely ground {2} to make a thick spoonable batter.","Cook small spoonfuls in a lightly oiled pan on both sides until firm, golden, and fully cooked through."]],
    ["Cabbage pancakes",["cabbage","eggs","oats"],["Wash and finely shred {0}. Grind {2} into a coarse flour.","Mix the cabbage with beaten {1} and the oats, adding a little water only if needed to bind it.","Press small, thin pancakes into a lightly oiled pan. Cook both sides over medium-low heat until the cabbage is tender and the egg is fully set."]],
    ["Meat-stuffed peppers",["raw-ground-meat","pepper","cooked-rice"],["{cook}","Heat the oven to 180°C / 350°F. Wash and halve {1}, removing the seeds. Mix the cooked meat with {2}.","Fill the peppers and put in a baking dish with a splash of water. Cover and bake until the peppers are tender and the filling reaches 74°C / 165°F."]],
    ["Meat and potato pie",["raw-ground-meat",["raw-potato","cooked-potato"],"carrot"],["Cut {1}; boil any raw potatoes until tender, then mash with a little cooking water. Heat the oven to 180°C / 350°F.","{cook}","Finely chop {2}, cook until tender, and mix with the cooked meat and a splash of water. Put in an ovenproof dish, spread the mashed potato over it, and bake until golden and thoroughly hot at 74°C / 165°F."]],
    ["Bean and potato pie",[["canned-beans","cooked-beans"],["raw-potato","cooked-potato"],"carrot"],["Heat the oven to 180°C / 350°F. Cut {1}, boil any raw potatoes until tender, and mash with a little cooking water.","Finely chop {2} and cook until soft. Drain any canned beans, then mix in {0} and heat thoroughly with a splash of water.","Put the bean mixture in an ovenproof dish, cover with mashed potato, and bake until golden and hot throughout at 74°C / 165°F."]],
    ["Baked pasta and cheese",["cooked-pasta","milk","cheese"],["Heat the oven to 180°C / 350°F. Put {0} in a small ovenproof dish.","Add a little {1} to loosen the pasta and stir through most of {2}. Scatter the rest on top.","Bake until bubbling and thoroughly hot at 74°C / 165°F. Add another splash of milk if the pasta dries out."]],
    ["Fish pasta bake",["canned-fish","cooked-pasta","cheese"],["Heat the oven to 180°C / 350°F. Drain and flake {0}.","Mix the fish with {1}, a splash of water and half of {2}. Put in a small ovenproof dish and top with the remaining cheese.","Bake until the top is golden and the center reaches 74°C / 165°F."]],
    ["Cabbage and egg noodles",["cabbage","cooked-noodles","eggs"],["Wash and shred {0}, then cook in a lightly oiled pan until tender.","Add {1} with a splash of water and reheat thoroughly.","Push everything aside, add beaten {2}, and cook until fully set. Toss together and season."]],
    ["Peanut noodles with cucumber",["cooked-noodles","peanut-butter","cucumber"],["Mix {1} with warm water a little at a time until it becomes a smooth, pourable sauce.","Reheat {0} thoroughly in a pan with a splash of water, then toss with the sauce.","Wash and thinly slice {2} and scatter it over the noodles for crunch."]],
    ["Creamy mushroom pasta",["cooked-pasta","mushrooms","milk"],["Clean and slice {1}, then cook in a lightly oiled pan until tender and browned.","Add {0} and a splash of {2}.","Heat gently, stirring until the pasta is thoroughly hot. Add more milk if needed and serve once it lightly coats the pasta."]],
    ["Chicken in yogurt sauce",["raw-poultry","yogurt","onion"],["{cook}","Chop {2} and soften in a little oil. Turn the heat down and stir in {1} with a splash of water.","Slice the cooked poultry and fold into the warm sauce. Heat gently without boiling hard, then serve."]],
    ["Chicken and corn soup",["raw-poultry","corn","milk"],["{cook}","Drain canned {1}, or cut kernels from fresh corn. Simmer in a little water until tender.","Cut up the cooked poultry and add to the corn with {2}. Warm through without boiling hard, and season to taste."]],
    ["Meat and potato hash",[["raw-meat","raw-ground-meat"],["raw-potato","cooked-potato"],"onion"],["{cook}","Dice {1} and {2}. Cook in a lightly oiled pan until the potatoes are fully tender, adding small splashes of water if needed.","Cut any large pieces of cooked meat into bite-size pieces and toss through the potatoes. Let the edges brown before serving."]],
    ["Meat and cabbage rice",["raw-ground-meat","cabbage","cooked-rice"],["{cook}","Wash and shred {1}, then cook in the pan until tender.","Add {2} with a splash of water and heat thoroughly. Stir in the cooked meat and season to taste."]],
    ["Meat with creamy mushrooms",["raw-meat","mushrooms","milk"],["{cook}","Clean and slice {1}, then cook in the pan until softened and browned.","Add a splash of {2} and stir over gentle heat to loosen the browned bits. Slice the rested meat and spoon the mushrooms and pan juices over it."]],
    ["Fish and tomato pasta",["raw-fish","cooked-pasta",["tomato","canned-tomato"]],["{cook}","Chop {2} and cook in a separate pan until softened. Add {1} and a splash of water and heat thoroughly.","Break the cooked fish into chunks, or leave shrimp whole, and gently fold into the pasta."]],
    ["Fish and greens wraps",["raw-fish","greens","yogurt"],["{cook}","Wash {1}. Use large leaves as wraps, or chop smaller leaves for a bowl.","Break up the cooked fish or shrimp and place on the greens. Spoon over {2}, season to taste, and serve."]],
    ["Chicken or turkey bean stew",["raw-poultry",["canned-beans","cooked-beans"],"canned-tomato"],["{cook}","Drain any canned beans. Simmer {1} with {2} and a little water until thoroughly hot.","Cut up the cooked poultry, add it to the stew, and simmer briefly. Season with any spices you already have."]],
    ["Meat and bean stew",["raw-ground-meat",["canned-beans","cooked-beans"],"canned-tomato"],["{cook}","Drain any canned beans and add {1} and {2} to the cooked meat, with a splash of water if needed.","Simmer until thickened and thoroughly hot. Season with any spices you already have."]],
    ["Cabbage wraps with leftovers",["cooked-protein","tortilla","cabbage"],["Wash and shred {2}, then cook in a lightly oiled pan until tender.","Add chopped {0} and reheat to 74°C / 165°F.","Warm {1}, fill with the meat and cabbage, and fold up."]],
    ["Avocado pasta",["cooked-pasta","avocado","cheese"],["Reheat {0} in a pan with a splash of water until thoroughly hot.","Mash the flesh of {1} with a little warm water to make a loose sauce.","Take the pasta off the heat, stir through the avocado, and finish with grated or crumbled {2}. Eat immediately."]],
    ["Hummus and tomato pasta",["cooked-pasta","hummus","tomato"],["Wash and chop {2}, then cook in a pan until softened.","Add {0} with a splash of water and reheat thoroughly.","Stir in {1}, adding warm water a little at a time until it coats the pasta."]],
    ["Tomato and bean rice",["cooked-rice",["canned-beans","cooked-beans"],["tomato","canned-tomato"]],["Chop {2} and cook in a pan until softened.","Drain any canned beans and add {1} with {0} and a splash of water.","Cover and heat until thoroughly hot, stirring to break up the rice. Season and serve."]],
    ["Broccoli potato bake",[["raw-potato","cooked-potato"],"broccoli","cheese"],["Heat the oven to 180°C / 350°F. Cut {0}; boil any raw potatoes until tender.","Cut {1} into florets and steam until just tender. Arrange with the potatoes in an ovenproof dish and top with {2}.","Bake until the cheese melts and everything is thoroughly hot at 74°C / 165°F."]],
    ["Warm beans over hummus",["hummus",["canned-beans","cooked-beans"],"bread"],["Drain any canned beans and warm {1} thoroughly in a pan with a little water.","Spread {0} on a plate and spoon the warm beans over it.","Toast {2}, tear into pieces, and use it to scoop up the beans and hummus."]],
    ["Cheesy potato patties",["cooked-potato","eggs","cheese"],["Mash {0} and stir in {2}.","Beat {1}, then mix in a little at a time until the potatoes bind. Shape small, thin patties.","Pan-fry on both sides until golden and the centers reach 74°C / 165°F."]],
    ["Bean and rice patties",[["canned-beans","cooked-beans"],"cooked-rice","eggs"],["Drain and mash {0}, then mix with {1}.","Beat {2} and add just enough to bind the mixture. Shape small, thin patties.","Cook in a lightly oiled pan on both sides until browned and thoroughly hot at 74°C / 165°F."]],
    ["Bean and egg burrito",[["canned-beans","cooked-beans"],"eggs","tortilla"],["Drain any canned beans and heat {0} thoroughly in a pan.","Beat {1} and scramble in the pan until fully set.","Warm {2}, add the beans and eggs, tuck in the sides, and roll up."]],
    ["Vegetable bread bake",["bread","eggs","milk",["cooked-veg","fresh-veg","greens","tomato","onion","mushrooms","carrot","pepper","broccoli","cabbage","corn"]],["Heat the oven to 180°C / 350°F. Chop {3}; cook any raw vegetables until tender. Tear {0} into an ovenproof dish and add the vegetables.","Beat {1} with enough {2} to moisten the bread and pour over. Let it soak for a few minutes.","Bake until the middle is set and reaches 74°C / 165°F, checking from about 25 minutes."]]
  ];
  recipes.push(...extendedMeals.map(([title, needs, instructions]) => {
    const slots = needs.map(need => Array.isArray(need) ? need : [need]);
    return {
      title, intro: '', slots, extras: [],
      steps: ctx => instructions.map(instruction => instruction.replace(/\{(\d+|cook)\}/g,
        (_, key) => key === 'cook' ? cookRaw(ctx) : ctx.names(...slots[Number(key)])))
    };
  }));

  let pantry = readPantry();
  let currentIdea = 0;
  let twoDayPlan = readPlan();
  let draft = [];

  function readPantry() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(value) ? value.filter(item => item && typeof item.id === 'string' && typeof item.name === 'string' && Object.hasOwn(LABEL, item.type) && /^\d{4}-\d{2}-\d{2}$/.test(item.date)).slice(0, 60).map(item => {
        const recognized = parseFood(item.name);
        return recognized?.type === item.type && recognized.name !== item.name ? { ...item, name: recognized.name } : item;
      }) : [];
    } catch { return []; }
  }
  function savePantry() { try { localStorage.setItem(KEY, JSON.stringify(pantry)); } catch {} }
  function readPlan() {
    try {
      const value = JSON.parse(localStorage.getItem(PLAN_KEY) || 'null');
      return value && value.date === todayISO() && Array.isArray(value.days) ? value : null;
    } catch { return null; }
  }
  function savePlan() { try { localStorage.setItem(PLAN_KEY, JSON.stringify(twoDayPlan)); } catch {} }
  function resetPlan() { twoDayPlan = null; savePlan(); }
  function recognizedItem(item) { return parseFood(item.name)?.type === item.type; }
  function maxFridgeDays(type) { return RAW.has(type) ? type === 'raw-meat' ? 5 : 2 : 4; }
  function eligible(item, dayOffset = 0) { return recognizedItem(item) && (!DATED.has(item.type) || (dayDiff(item.date) >= 0 && dayDiff(item.date) + dayOffset <= maxFridgeDays(item.type))); }
  function ideasFor(items, dayOffset = 0) {
    const available = items.filter(item => eligible(item, dayOffset)).sort((a, b) => a.date.localeCompare(b.date));
    return recipes.map(recipe => {
      const ids = new Set();
      const missing = [];
      for (const group of recipe.slots) {
        const item = available.find(candidate => group.includes(candidate.type) && !ids.has(candidate.id));
        if (item) ids.add(item.id); else missing.push(LABEL[group[0]]);
      }
      const relevant = new Set([...recipe.slots.flat(), ...recipe.extras]);
      for (const item of available) if (relevant.has(item.type)) ids.add(item.id);
      const used = available.filter(item => ids.has(item.id));
      const urgency = used.reduce((sum, item) => sum + (DATED.has(item.type) ? 8 + dayDiff(item.date) * 5 + (RAW.has(item.type) ? 6 : 0) : 0), 0);
      return { recipe, used, missing, score: used.length * 100 + urgency + recipe.slots.length * 5 - missing.length * 250 };
    }).filter(idea => idea.used.length).sort((a, b) => b.score - a.score);
  }
  function completeIdeas(items, dayOffset = 0) { return ideasFor(items, dayOffset).filter(idea => !idea.missing.length); }
  function context(used) { return { items: used, names: (...types) => named(used, ...types), has: type => used.some(item => item.type === type) }; }

  function simpleName(name) {
    return name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ')
      .replace(/\b(?:\d+|a|an|the|of|half|quarter|one|two|three|four|some|few|last|night|s|bit|ripe|plain|left|over|leftover|leftovers|cooked|fresh|raw|uncooked|small|large|can|tin|tinned|canned|yesterday|reheated|fried|grilled|roasted|baked|boiled|steamed)\b/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function editDistance(a, b) {
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const next = [i];
      for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = next;
    }
    return previous[b.length];
  }
  function matchIngredient(name) {
    const query = simpleName(name);
    if (query.length < 3) return null;
    const proteinAllowed = /\b(cooked|leftover|yesterday|reheated|fried|grilled|roasted|baked|boiled|steamed)\b/i.test(name);
    const fishAllowed = /\b(can|canned|tin|tinned|sardines?)\b/i.test(name);
    return INGREDIENTS.map(([label, type]) => {
      if (type === 'cooked-protein' && !proteinAllowed) return null;
      if (type === 'canned-fish' && !fishAllowed) return null;
      const candidate = simpleName(label);
      const distance = editDistance(query, candidate);
      return query[0] === candidate[0] && distance <= (query.length >= 8 ? 2 : 1) ? { label, type, distance } : null;
    }).filter(Boolean).sort((a, b) => a.distance - b.distance || a.label.length - b.label.length)[0] || null;
  }
  function guessType(name) {
    const value = name.toLowerCase();
    const cooked = /\b(leftover|cooked|yesterday|last night|reheated|fried|grilled|roasted|baked|boiled|steamed)\b/.test(value);
    if (/\b(canned|tinned|tin of|can of)\s+(tuna|salmon|sardines?|fish)\b|\bsardines?\b/.test(value)) return 'canned-fish';
    if (/\b(rice|risotto)\b/.test(value)) return 'cooked-rice';
    if (/\b(pasta|spaghetti|macaroni|penne)\b/.test(value)) return 'cooked-pasta';
    if (/\b(noodles?|ramen|udon|soba)\b/.test(value)) return 'cooked-noodles';
    if (/\b(quinoa|couscous|bulgur|barley)\b/.test(value)) return 'cooked-grain';
    if (/\b(potatoes|potato|mash)\b/.test(value)) return cooked || /\bmash/.test(value) ? 'cooked-potato' : 'raw-potato';
    if (/\b(beans?|lentils?|chickpeas?)\b/.test(value)) return cooked ? 'cooked-beans' : 'canned-beans';
    if (/\b(tomatoes|tomato)\b/.test(value)) return /\b(can|canned|tin|tinned)\b/.test(value) ? 'canned-tomato' : cooked ? 'cooked-veg' : 'tomato';
    if (/\b(onions?|shallots?)\b/.test(value)) return cooked ? 'cooked-veg' : 'onion';
    if (/\b(mushrooms?)\b/.test(value)) return cooked ? 'cooked-veg' : 'mushrooms';
    if (/\b(spinach|lettuce|kale|greens|arugula)\b/.test(value)) return cooked ? 'cooked-veg' : 'greens';
    if (/\bcarrots?\b/.test(value)) return cooked ? 'cooked-veg' : 'carrot';
    if (/\b(peppers?|capsicum)\b/.test(value)) return cooked ? 'cooked-veg' : 'pepper';
    if (/\bbroccoli\b/.test(value)) return cooked ? 'cooked-veg' : 'broccoli';
    if (/\bcucumbers?\b/.test(value)) return 'cucumber';
    if (/\bcabbage\b/.test(value)) return cooked ? 'cooked-veg' : 'cabbage';
    if (/\b(corn|sweetcorn)\b/.test(value)) return cooked ? 'cooked-veg' : 'corn';
    if (/\bavocados?\b/.test(value)) return 'avocado';
    if (/\bhummus\b/.test(value)) return 'hummus';
    if (/\b(peanut|almond) butter\b/.test(value)) return 'peanut-butter';
    if (/\b(almonds?|walnuts?|peanuts?|nuts?|sunflower seeds?|pumpkin seeds?)\b/.test(value)) return 'nuts';
    if (/\b(chicken|turkey)\b/.test(value)) return cooked ? 'cooked-protein' : 'raw-poultry';
    if (/\b(ground|minced|mince)\s+(beef|pork|lamb)\b/.test(value)) return cooked ? 'cooked-protein' : 'raw-ground-meat';
    if (/\b(beef|steak|pork|lamb)\b/.test(value)) return cooked ? 'cooked-protein' : 'raw-meat';
    if (/\b(fish|salmon|cod|tilapia|tuna|shrimp|prawns?)\b/.test(value)) return cooked ? 'cooked-protein' : 'raw-fish';
    if (/\btofu\b/.test(value)) return cooked ? 'cooked-protein' : '';
    if (/\b(zucchini|courgette|eggplant|aubergine|cauliflower|vegetables?|peas|asparagus)\b/.test(value)) return cooked ? 'cooked-veg' : 'fresh-veg';
    if (/\b(tortillas?|wraps?|flatbread|pita)\b/.test(value)) return 'tortilla';
    if (/\b(bread|toast|bagel|rolls?|sourdough)\b/.test(value)) return 'bread';
    if (/\b(eggs?)\b/.test(value)) return 'eggs';
    if (/\b(yogurt|yoghurt)\b/.test(value)) return 'yogurt';
    if (/\b(cheese|cheddar|mozzarella|parmesan|feta)\b/.test(value)) return 'cheese';
    if (/\b(milk)\b/.test(value)) return 'milk';
    if (/\b(oats?|oatmeal)\b/.test(value)) return 'oats';
    if (/\b(banana|apple|pear|orange|mango|berries|berry|strawberry|strawberries|blueberry|blueberries|grapes?|peaches?|pineapple|melon|fruit)\b/.test(value)) return 'fruit';
    return '';
  }
  function parseFood(name) {
    const match = matchIngredient(name);
    if (!match) return null;
    const corrected = match.distance > 0 && !guessType(name);
    const prefix = name.match(/^\s*(?:leftover|cooked|raw|uncooked|canned|tinned|fried|grilled|roasted|baked|boiled|steamed)\s+/i)?.[0] || '';
    const displayName = corrected ? `${prefix}${match.label}`.trim() : name;
    const type = guessType(displayName) || match.type;
    return { name: displayName, originalName: name, type, date: '' };
  }
  function renderReview() {
    $('review').hidden = draft.length === 0;
    const holder = $('review-list'); holder.replaceChildren();
    for (const [index, item] of draft.entries()) {
      const row = document.createElement('div'); row.className = 'review-row';
      const name = document.createElement('strong'); name.textContent = item.name;
      const type = document.createElement('small'); type.textContent = LABEL[item.type];
      row.append(name, type);
      if (item.originalName !== item.name) {
        const correction = document.createElement('em'); correction.textContent = `Spelling fixed from “${item.originalName}”`;
        row.append(correction);
      }
      const dateRow = document.createElement('div'); dateRow.className = 'review-date'; dateRow.hidden = !DATED.has(item.type);
      const dateLabel = document.createElement('label'); dateLabel.htmlFor = `review-date-${index}`; dateLabel.textContent = RAW.has(item.type) ? 'In fridge since' : 'Cooked on';
      const date = document.createElement('input'); date.id = `review-date-${index}`; date.type = 'date'; date.max = todayISO(); date.value = item.date;
      date.addEventListener('change', () => { item.date = date.value; });
      dateRow.append(dateLabel, date); row.append(dateRow); holder.append(row);
    }
  }
  function renderPantry() {
    $('item-count').textContent = pantry.length;
    $('clear-list').hidden = pantry.length === 0;
    const holder = $('pantry-list');
    holder.replaceChildren();
    if (!pantry.length) {
      const empty = document.createElement('p'); empty.className = 'empty-pantry'; empty.textContent = 'Nothing here yet. Add your food above.'; holder.append(empty);
    }
    const sorted = [...pantry].sort((a, b) => a.date.localeCompare(b.date));
    for (const [index, item] of sorted.entries()) {
      const row = document.createElement('div'); row.className = 'food-row';
      if (!eligible(item)) row.classList.add('excluded');
      const number = document.createElement('span'); number.className = 'food-number'; number.textContent = String(index + 1).padStart(2, '0');
      const main = document.createElement('div'); main.className = 'food-main';
      const strong = document.createElement('strong'); strong.textContent = item.name;
      const small = document.createElement('small'); small.textContent = `${LABEL[item.type]}${DATED.has(item.type) ? ` · ${RAW.has(item.type) ? 'in fridge since' : 'cooked'} ${item.date}` : ''}${recognizedItem(item) ? eligible(item) ? '' : ` · past ${maxFridgeDays(item.type)} days; not used in ideas` : ' · unrecognized; not used in ideas'}`;
      main.append(strong, small);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.setAttribute('aria-label', `Remove ${item.name}`);
      remove.addEventListener('click', () => { pantry = pantry.filter(food => food.id !== item.id); savePantry(); resetPlan(); currentIdea = 0; render(); });
      row.append(number, main, remove); holder.append(row);
    }
    const unrecognized = pantry.filter(item => !recognizedItem(item)).length;
    const overdue = pantry.filter(item => recognizedItem(item) && DATED.has(item.type) && !eligible(item)).length;
    const notes = [];
    if (unrecognized) notes.push(`${unrecognized} older item${unrecognized === 1 ? ' is' : 's are'} unrecognized and left out of meal ideas. Remove and re-add with a food name.`);
    if (overdue) notes.push(`${overdue} dated item${overdue === 1 ? ' is' : 's are'} past its fridge window and left out of meal ideas.`);
    $('overdue-note').hidden = !notes.length;
    $('overdue-note').textContent = notes.join(' ');
  }
  function fillList(id, values) {
    const holder = $(id); holder.replaceChildren();
    for (const value of values) { const item = document.createElement('li'); item.textContent = value; holder.append(item); }
  }
  function renderIdea() {
    const ideas = completeIdeas(pantry);
    $('second-meal-prompt').hidden = !ideas.some(idea => {
      const used = new Set(idea.used.map(item => item.id));
      return completeIdeas(pantry.filter(item => !used.has(item.id)), 1).length > 0;
    });
    $('empty-plan').hidden = ideas.length > 0;
    $('plan-content').hidden = ideas.length === 0;
    if (!ideas.length) {
      const near = ideasFor(pantry).find(idea => idea.missing.length === 1);
      $('plan-count').textContent = pantry.length ? 'NO FULL MATCH YET' : 'WAITING FOR FOOD';
      $('empty-plan').querySelector('h4').textContent = pantry.length ? 'Not enough for a meal yet.' : 'Start with your food list.';
      $('empty-plan').querySelector('p').textContent = near ? `Add ${near.missing[0]} to try ${near.recipe.title.toLowerCase()}.` : pantry.length ? 'Try adding another food. We only show meals we can match to what you entered.' : "Paste what's left in your kitchen. We'll look for meals you can make from it.";
      return;
    }
    currentIdea %= ideas.length;
    const idea = ideas[currentIdea];
    $('plan-count').textContent = `${currentIdea + 1} / ${ideas.length} MATCHES`;
    $('recipe-title').textContent = idea.recipe.title;
    $('recipe-intro').textContent = idea.recipe.intro;
    $('recipe-intro').hidden = !idea.recipe.intro;
    fillList('used-items', idea.used.map(item => item.name));
    fillList('recipe-steps', idea.recipe.steps(context(idea.used)));
    $('next-recipe').hidden = ideas.length < 2;
  }
  function renderTwoMealPlan() {
    if (twoDayPlan && twoDayPlan.date !== todayISO()) twoDayPlan = null;
    if (twoDayPlan && twoDayPlan.days.some(day => !day || !Array.isArray(day.usedIds) || day.usedIds.some(id => !pantry.some(item => item.id === id && eligible(item))))) resetPlan();
    $('two-day-result').hidden = !twoDayPlan;
    if (!twoDayPlan) return;
    const days = twoDayPlan.date === todayISO() ? twoDayPlan.days : [];
    for (const [index, label] of ['tonight', 'tomorrow'].entries()) {
      const entry = days[index];
      const recipe = entry && recipes.find(item => item.title === entry.title);
      const used = entry ? entry.usedIds.map(id => pantry.find(item => item.id === id)).filter(Boolean) : [];
      const steps = $(`${label}-steps`); steps.replaceChildren();
      if (!recipe || !used.length) {
        $(`${label}-title`).textContent = index === 0 ? 'No full meal yet' : 'Add more food for meal 2';
        $(`${label}-items`).textContent = index === 0 ? 'Try adding another ingredient above.' : 'There is no second complete match from what remains.';
      } else {
        $(`${label}-title`).textContent = recipe.title;
        $(`${label}-items`).textContent = `Uses ${list(used.map(item => item.name))}.`;
        for (const instruction of recipe.steps(context(used))) { const li = document.createElement('li'); li.textContent = instruction; steps.append(li); }
      }
    }
    const planned = new Set(days.flatMap(day => day.usedIds));
    const remaining = pantry.filter(item => !planned.has(item.id));
    $('unplanned').textContent = remaining.length ? `Still in your kitchen: ${list(remaining.map(item => item.name))}.` : 'Everything on your list has a place in these two meals.';
  }
  function buildPlan() {
    const firstIdeas = completeIdeas(pantry);
    let best = null;
    for (const first of firstIdeas) {
      const firstIds = new Set(first.used.map(item => item.id));
      const remaining = pantry.filter(item => !firstIds.has(item.id));
      const secondIdeas = completeIdeas(remaining, 1);
      for (const second of [null, ...secondIdeas]) {
        const count = first.used.length + (second?.used.length || 0);
        const urgency = first.used.reduce((sum, item) => sum + (DATED.has(item.type) ? 10 + dayDiff(item.date) * 6 + (RAW.has(item.type) ? 6 : 0) : 0), 0);
        const score = count * 100 + urgency + (second ? 30 : 0) - (second?.recipe.title === first.recipe.title ? 5 : 0);
        if (!best || score > best.score) best = { first, second, score };
      }
    }
    twoDayPlan = { date: todayISO(), days: best ? [best.first, best.second].filter(Boolean).map(idea => ({ title: idea.recipe.title, usedIds: idea.used.map(item => item.id) })) : [] };
    savePlan(); renderTwoMealPlan(); $('two-day-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function render() { renderPantry(); renderIdea(); renderTwoMealPlan(); }

  $('food-input').addEventListener('input', () => { draft = []; $('review').hidden = true; $('form-error').hidden = true; });
  $('add-form').addEventListener('submit', event => {
    event.preventDefault();
    const names = $('food-input').value.split(/[,;\n]+/).map(value => value.trim().replace(/\s+/g, ' ')).filter(Boolean);
    let error = '';
    if (!names.length) error = 'List at least one food.';
    else if (names.some(name => name.length > 45)) error = 'Keep each food name under 45 characters.';
    else if (names.length > 20) error = 'Add up to 20 foods at a time.';
    else if (pantry.length + names.length > 60) error = 'Your kitchen list has room for 60 foods. Remove a few first.';
    const parsed = error ? [] : names.map(parseFood);
    const unknown = parsed.findIndex(item => !item);
    if (!error && unknown >= 0) error = `I don't recognize “${names[unknown]}” yet. Try a specific food name or check the spelling.`;
    $('form-error').hidden = !error; $('form-error').textContent = error;
    if (error) return;
    draft = parsed;
    $('review-error').hidden = true;
    renderReview();
    $('review').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  $('add-reviewed').addEventListener('click', () => {
    const missingDate = draft.find(item => DATED.has(item.type) && !item.date);
    const futureDate = draft.find(item => DATED.has(item.type) && item.date && dayDiff(item.date) < 0);
    const error = missingDate ? `Add the ${RAW.has(missingDate.type) ? 'fridge' : 'cooked'} date for ${missingDate.name}.` : futureDate ? `The date for ${futureDate.name} cannot be in the future.` : '';
    $('review-error').hidden = !error; $('review-error').textContent = error;
    if (error) return;
    for (const item of draft) pantry.push({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, name: item.name, type: item.type, date: DATED.has(item.type) ? item.date : todayISO() });
    savePantry(); resetPlan(); currentIdea = 0; draft = []; $('add-form').reset(); renderReview(); render();
  });
  $('clear-list').addEventListener('click', () => {
    if (!confirm('Clear this kitchen list from your browser?')) return;
    pantry = []; currentIdea = 0; savePantry(); resetPlan(); render();
  });
  $('next-recipe').addEventListener('click', () => { currentIdea++; renderIdea(); });
  $('build-plan').addEventListener('click', buildPlan);
  $('recipe-total').textContent = recipes.length;
  render();
})();
