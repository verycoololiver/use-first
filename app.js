(() => {
  'use strict';

  const KEY = 'usefirst_kitchen_v1';
  const PLAN_KEY = 'usefirst_two_day_plan_v1';
  const COOKED = new Set(['cooked-rice', 'cooked-pasta', 'cooked-noodles', 'cooked-grain', 'cooked-potato', 'cooked-veg', 'cooked-protein', 'cooked-beans']);
  const LABEL = {
    'cooked-rice': 'cooked rice', 'cooked-pasta': 'cooked pasta', 'cooked-noodles': 'cooked noodles',
    'cooked-grain': 'cooked grains', 'cooked-potato': 'cooked potatoes', 'cooked-veg': 'cooked vegetables',
    'cooked-protein': 'cooked meat, fish or tofu', 'cooked-beans': 'cooked beans or lentils',
    'fresh-veg': 'fresh vegetables', greens: 'leafy greens', tomato: 'tomatoes', onion: 'onions',
    mushrooms: 'mushrooms', 'raw-potato': 'potatoes', bread: 'bread', tortilla: 'wraps or tortillas',
    eggs: 'eggs', fruit: 'fruit or berries', cheese: 'cheese', yogurt: 'yogurt', milk: 'milk',
    oats: 'oats', 'canned-beans': 'canned beans or lentils', 'canned-tomato': 'canned tomatoes'
  };
  const FRESH_VEG = ['fresh-veg', 'greens', 'tomato', 'onion', 'mushrooms'];
  const VEG = ['cooked-veg', ...FRESH_VEG];
  const BEANS = ['cooked-beans', 'canned-beans'];
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

  const recipes = [
    {
      title: 'Fried rice from leftovers',
      intro: 'A hot pan makes yesterday’s rice and spare vegetables feel like dinner.',
      slots: [['cooked-rice'], VEG], extras: ['cooked-protein', ...BEANS, 'eggs'],
      steps: ({ names, has }) => [
        names(...FRESH_VEG) ? `Chop ${names(...FRESH_VEG)} and cook in a little oil until tender.${has('cooked-veg') ? ` Add ${names('cooked-veg')} and reheat.` : ''}` : `Reheat ${names('cooked-veg')} in a lightly oiled pan.`,
        `Add ${names('cooked-rice')}${names('cooked-protein', ...BEANS) ? ` and ${names('cooked-protein', ...BEANS)}` : ''}. Stir until the rice and any cooked leftovers are thoroughly hot.`,
        has('eggs') ? `Cook ${names('eggs')} fully in the pan, then mix through.` : 'Season with what you have and serve hot.'
      ]
    },
    {
      title: 'Pasta skillet',
      intro: 'Leftover pasta, a pan, and whatever vegetables or protein are around.',
      slots: [['cooked-pasta'], [...VEG, 'canned-tomato', 'cooked-protein', ...BEANS]], extras: ['cheese'],
      steps: ({ names }) => [
        names(...FRESH_VEG) ? `Chop and cook ${names(...FRESH_VEG)} in a little oil until tender.` : 'Heat a little oil in a pan.',
        `Add ${names('cooked-pasta')}${names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS) ? ` with ${names('cooked-veg', 'canned-tomato', 'cooked-protein', ...BEANS)}` : ''}. Toss until all cooked leftovers are thoroughly hot.`,
        names('cheese') ? `Finish with ${names('cheese')} and serve.` : 'Season to taste and serve.'
      ]
    },
    {
      title: 'Noodle stir-fry',
      intro: 'Give cooked noodles a quick second life in a hot pan.',
      slots: [['cooked-noodles'], [...VEG, 'cooked-protein', ...BEANS]], extras: ['eggs'],
      steps: ({ names, has }) => [
        names(...FRESH_VEG) ? `Chop ${names(...FRESH_VEG)} and cook until tender.` : 'Heat a lightly oiled pan.',
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
        names(...FRESH_VEG) ? `Chop and cook ${names(...FRESH_VEG)} until tender.` : 'Heat a pan over medium heat.',
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
        `${names(...FRESH_VEG) ? `Wash and cut ${names(...FRESH_VEG)}. ` : ''}${names('cooked-veg', 'cooked-protein', ...BEANS) ? `Reheat ${names('cooked-veg', 'cooked-protein', ...BEANS)} thoroughly.` : ''}` || 'Prepare the topping.',
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
        names(...FRESH_VEG) ? `Chop ${names(...FRESH_VEG)} and simmer in enough water to cover until tender.` : 'Bring a pot of water to a simmer.',
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
    }
  ];

  let pantry = readPantry();
  let currentIdea = 0;
  let twoDayPlan = readPlan();
  let draft = [];

  function readPantry() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(value) ? value.filter(item => item && typeof item.id === 'string' && typeof item.name === 'string' && Object.hasOwn(LABEL, item.type) && /^\d{4}-\d{2}-\d{2}$/.test(item.date)).slice(0, 60) : [];
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
  function eligible(item, dayOffset = 0) { return !COOKED.has(item.type) || (dayDiff(item.date) >= 0 && dayDiff(item.date) + dayOffset <= 4); }
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
      const urgency = used.reduce((sum, item) => sum + (COOKED.has(item.type) ? 8 + dayDiff(item.date) * 5 : 0), 0);
      return { recipe, used, missing, score: used.length * 100 + urgency + recipe.slots.length * 5 - missing.length * 250 };
    }).filter(idea => idea.used.length).sort((a, b) => b.score - a.score);
  }
  function completeIdeas(items, dayOffset = 0) { return ideasFor(items, dayOffset).filter(idea => !idea.missing.length); }
  function context(used) { return { names: (...types) => named(used, ...types), has: type => used.some(item => item.type === type) }; }

  function guessType(name) {
    const value = name.toLowerCase();
    const cooked = /\b(leftover|cooked|yesterday|last night|reheated)\b/.test(value);
    if (/\b(rice|risotto)\b/.test(value)) return 'cooked-rice';
    if (/\b(pasta|spaghetti|macaroni|penne)\b/.test(value)) return 'cooked-pasta';
    if (/\b(noodles?|ramen|udon)\b/.test(value)) return 'cooked-noodles';
    if (/\b(quinoa|couscous|bulgur|barley)\b/.test(value)) return 'cooked-grain';
    if (/\b(potatoes|potato|mash)\b/.test(value)) return cooked ? 'cooked-potato' : 'raw-potato';
    if (/\b(beans?|lentils?|chickpeas?)\b/.test(value)) return cooked ? 'cooked-beans' : 'canned-beans';
    if (/\b(tomatoes|tomato)\b/.test(value)) return /\b(can|canned|tin|tinned)\b/.test(value) ? 'canned-tomato' : 'tomato';
    if (/\b(onions?|shallots?)\b/.test(value)) return 'onion';
    if (/\b(mushrooms?)\b/.test(value)) return 'mushrooms';
    if (/\b(spinach|lettuce|kale|greens)\b/.test(value)) return 'greens';
    if (/\b(chicken|beef|pork|turkey|fish|salmon|tofu|meat)\b/.test(value)) return cooked ? 'cooked-protein' : '';
    if (/\b(broccoli|carrots?|peppers?|zucchini|courgette|vegetables?|peas)\b/.test(value)) return cooked ? 'cooked-veg' : 'fresh-veg';
    if (/\b(tortillas?|wraps?|flatbread)\b/.test(value)) return 'tortilla';
    if (/\b(bread|toast|bagel|rolls?)\b/.test(value)) return 'bread';
    if (/\b(eggs?)\b/.test(value)) return 'eggs';
    if (/\b(yogurt|yoghurt)\b/.test(value)) return 'yogurt';
    if (/\b(cheese|cheddar|mozzarella|parmesan|feta)\b/.test(value)) return 'cheese';
    if (/\b(milk)\b/.test(value)) return 'milk';
    if (/\b(oats?|oatmeal)\b/.test(value)) return 'oats';
    if (/\b(banana|apple|pear|orange|mango|berries|berry|strawberry|strawberries|blueberry|blueberries|grapes?|peaches?|fruit)\b/.test(value)) return 'fruit';
    return '';
  }
  function renderReview() {
    $('review').hidden = draft.length === 0;
    const holder = $('review-list'); holder.replaceChildren();
    for (const [index, item] of draft.entries()) {
      const row = document.createElement('div'); row.className = 'review-row';
      const name = document.createElement('strong'); name.textContent = item.name;
      const select = document.createElement('select'); select.id = `review-type-${index}`; select.setAttribute('aria-label', `Food type for ${item.name}`);
      const placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = 'Choose a food type'; select.append(placeholder);
      for (const [label, types] of [['Cooked leftovers', [...COOKED]], ['Fresh and pantry food', Object.keys(LABEL).filter(type => !COOKED.has(type))]]) {
        const group = document.createElement('optgroup'); group.label = label;
        for (const type of types) { const option = document.createElement('option'); option.value = type; option.textContent = LABEL[type]; group.append(option); }
        select.append(group);
      }
      select.value = item.type;
      const dateRow = document.createElement('div'); dateRow.className = 'review-date'; dateRow.hidden = !COOKED.has(item.type);
      const dateLabel = document.createElement('label'); dateLabel.htmlFor = `review-date-${index}`; dateLabel.textContent = 'Cooked on';
      const date = document.createElement('input'); date.id = `review-date-${index}`; date.type = 'date'; date.max = todayISO(); date.value = item.date;
      date.addEventListener('change', () => { item.date = date.value; });
      select.addEventListener('change', () => { item.type = select.value; item.date = ''; date.value = ''; dateRow.hidden = !COOKED.has(item.type); });
      dateRow.append(dateLabel, date); row.append(name, select, dateRow); holder.append(row);
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
      const small = document.createElement('small'); small.textContent = `${LABEL[item.type]}${COOKED.has(item.type) ? ` · cooked ${item.date}` : ''}${eligible(item) ? '' : ' · not used in ideas'}`;
      main.append(strong, small);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.setAttribute('aria-label', `Remove ${item.name}`);
      remove.addEventListener('click', () => { pantry = pantry.filter(food => food.id !== item.id); savePantry(); resetPlan(); currentIdea = 0; render(); });
      row.append(number, main, remove); holder.append(row);
    }
    const excluded = pantry.filter(item => !eligible(item)).length;
    $('overdue-note').hidden = !excluded;
    $('overdue-note').textContent = excluded ? `${excluded} cooked item${excluded === 1 ? ' is' : 's are'} past four days, so ${excluded === 1 ? 'it is' : 'they are'} left out of meal ideas.` : '';
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
    $('plan-count').textContent = `${currentIdea + 1} / ${ideas.length} IDEAS`;
    $('recipe-title').textContent = idea.recipe.title;
    $('recipe-intro').textContent = idea.recipe.intro;
    fillList('used-items', idea.used.map(item => item.name));
    fillList('recipe-steps', idea.recipe.steps(context(idea.used)));
    $('next-recipe').hidden = ideas.length < 2;
  }
  function renderTwoMealPlan() {
    if (twoDayPlan && twoDayPlan.date !== todayISO()) twoDayPlan = null;
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
        const urgency = first.used.reduce((sum, item) => sum + (COOKED.has(item.type) ? 10 + dayDiff(item.date) * 6 : 0), 0);
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
    $('form-error').hidden = !error; $('form-error').textContent = error;
    if (error) return;
    draft = names.map(name => ({ name, type: guessType(name), date: '' }));
    $('review-error').hidden = true;
    renderReview();
    $('review').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  $('add-reviewed').addEventListener('click', () => {
    const missingType = draft.find(item => !Object.hasOwn(LABEL, item.type));
    const missingDate = draft.find(item => COOKED.has(item.type) && !item.date);
    const futureDate = draft.find(item => COOKED.has(item.type) && item.date && dayDiff(item.date) < 0);
    const error = missingType ? `Choose a food type for ${missingType.name}.` : missingDate ? `Add the cooked date for ${missingDate.name}.` : futureDate ? `The cooked date for ${futureDate.name} cannot be in the future.` : '';
    $('review-error').hidden = !error; $('review-error').textContent = error;
    if (error) return;
    for (const item of draft) pantry.push({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, name: item.name, type: item.type, date: COOKED.has(item.type) ? item.date : todayISO() });
    savePantry(); resetPlan(); currentIdea = 0; draft = []; $('add-form').reset(); renderReview(); render();
  });
  $('clear-list').addEventListener('click', () => {
    if (!confirm('Clear this kitchen list from your browser?')) return;
    pantry = []; currentIdea = 0; savePantry(); resetPlan(); render();
  });
  $('next-recipe').addEventListener('click', () => { currentIdea++; renderIdea(); });
  $('build-plan').addEventListener('click', buildPlan);
  render();
})();
