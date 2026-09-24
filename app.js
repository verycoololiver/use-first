(() => {
  'use strict';

  const KEY = 'usefirst_kitchen_v1';
  const PLAN_KEY = 'usefirst_two_day_plan_v1';
  const COOKED = new Set(['cooked-rice', 'cooked-pasta', 'cooked-veg', 'cooked-protein', 'cooked-beans']);
  const TYPE_LABEL = {
    'cooked-rice': 'cooked rice or grain', 'cooked-pasta': 'cooked pasta',
    'cooked-veg': 'cooked vegetables', 'cooked-protein': 'cooked protein',
    'cooked-beans': 'cooked beans or lentils', 'fresh-veg': 'fresh vegetables',
    bread: 'bread or wrap', eggs: 'eggs', fruit: 'fruit', cheese: 'cheese', yogurt: 'yogurt', milk: 'milk'
  };
  const $ = (id) => document.getElementById(id);
  const byDate = (a, b) => (a.date || '9999').localeCompare(b.date || '9999');
  const todayISO = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  const dayDiff = (date) => {
    const [y, m, d] = date.split('-').map(Number);
    const [ty, tm, td] = todayISO().split('-').map(Number);
    return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(y, m - 1, d)) / 86400000);
  };

  const recipes = [
    {
      title: 'Fried rice from leftovers',
      intro: 'A hot pan turns yesterday’s rice and odds-and-ends vegetables into dinner.',
      slots: [['cooked-rice'], ['cooked-veg', 'fresh-veg']],
      extras: ['cooked-protein', 'eggs', 'cooked-beans'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Heat a little oil in a pan and cook ${names('fresh-veg')} until tender.` : `Heat a little oil in a pan and warm ${names('cooked-veg') || 'your vegetables'}.`,
        `Add ${names('cooked-rice') || 'cooked rice'}${has('cooked-protein') || has('cooked-beans') ? ` and ${names('cooked-protein', 'cooked-beans')}` : ''}. Break up the rice and stir until all cooked leftovers are thoroughly reheated.`,
        `${has('eggs') ? `Push the rice aside, cook ${names('eggs')} fully, then mix in.` : 'Season with whatever you already keep in your kitchen.'} Serve immediately.`
      ]
    },
    {
      title: 'Pasta skillet',
      intro: 'A quick second life for leftover pasta, vegetables, and any cooked protein.',
      slots: [['cooked-pasta'], ['cooked-veg', 'fresh-veg', 'cooked-protein', 'cooked-beans']],
      extras: ['cheese'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Heat a little oil in a pan and cook ${names('fresh-veg')} until tender.` : 'Heat a little oil in a pan.',
        `Add ${names('cooked-pasta') || 'the cooked pasta'} and ${names('cooked-veg', 'cooked-protein', 'cooked-beans') || 'the other leftover ingredients'}. Toss until the leftovers are piping hot.`,
        `${has('cheese') ? `Finish with ${names('cheese')}.` : 'Add any seasoning you already have.'} Serve hot.`
      ]
    },
    {
      title: 'Soup from what’s left',
      intro: 'Water, a pan, and what is already in the fridge. Add seasoning only if you have it.',
      slots: [['cooked-veg', 'fresh-veg', 'cooked-protein', 'cooked-beans']],
      extras: ['cooked-rice', 'cooked-pasta'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Put ${names('fresh-veg')} in a pan with enough water to cover; simmer until tender.` : 'Bring a pan of water to a simmer.',
        has('cooked-veg') || has('cooked-protein') || has('cooked-beans') || has('cooked-rice') || has('cooked-pasta') ? `Add ${names('cooked-veg', 'cooked-protein', 'cooked-beans', 'cooked-rice', 'cooked-pasta')}. Simmer until all cooked leftovers are thoroughly reheated.` : 'Keep simmering until the vegetables are cooked through.',
        `Taste and season with what you have. ${has('cooked-rice') || has('cooked-pasta') ? 'The rice or pasta makes it more filling.' : 'Serve with bread if you have some.'}`
      ]
    },
    {
      title: 'Egg-and-leftovers skillet',
      intro: 'Eggs can hold small amounts of vegetables or cooked leftovers together.',
      slots: [['eggs'], ['fresh-veg', 'cooked-veg', 'cooked-protein', 'cooked-beans']],
      extras: ['cheese'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Cook ${names('fresh-veg')} in a lightly oiled pan until tender.${has('cooked-veg') || has('cooked-protein') || has('cooked-beans') ? ` Add ${names('cooked-veg', 'cooked-protein', 'cooked-beans')} and reheat thoroughly.` : ''}` : `Warm ${names('cooked-veg', 'cooked-protein', 'cooked-beans') || 'your cooked filling'} thoroughly in a lightly oiled pan.`,
        `Beat ${names('eggs') || 'the eggs'} and pour them into the pan. Cook until the eggs are fully set.`,
        `${has('cheese') ? `Add ${names('cheese')} if it makes sense with your filling.` : 'Season to taste.'} Serve hot.`
      ]
    },
    {
      title: 'Loaded toast or wrap',
      intro: 'A small leftover can become a meal when it has a base.',
      slots: [['bread'], ['cooked-protein', 'cooked-beans', 'cooked-veg', 'fresh-veg', 'cheese']],
      extras: [],
      steps: ({ names, has }) => [
        `Toast or warm ${names('bread') || 'bread or a wrap'}.`,
        `${has('fresh-veg') ? `Wash and cut ${names('fresh-veg')}. ` : ''}${has('cooked-protein') || has('cooked-beans') || has('cooked-veg') ? `Thoroughly reheat ${names('cooked-protein', 'cooked-beans', 'cooked-veg')}.` : 'Prepare your topping.'}`,
        `Pile on ${names('cooked-protein', 'cooked-beans', 'cooked-veg', 'fresh-veg', 'cheese') || 'your topping'} and eat while warm.`
      ]
    },
    {
      title: 'Rice bowl, rebuilt',
      intro: 'Use the rice as a base and put the most urgent leftovers on top.',
      slots: [['cooked-rice'], ['cooked-protein', 'cooked-beans', 'cooked-veg', 'fresh-veg']],
      extras: [],
      steps: ({ names, has }) => [
        `Heat ${names('cooked-rice') || 'the cooked rice'} until piping hot.`,
        `${has('fresh-veg') ? `Cook ${names('fresh-veg')} until tender. ` : ''}${has('cooked-protein') || has('cooked-beans') || has('cooked-veg') ? `Thoroughly reheat ${names('cooked-protein', 'cooked-beans', 'cooked-veg')}.` : ''}`,
        `Put ${names('cooked-protein', 'cooked-beans', 'cooked-veg', 'fresh-veg') || 'the topping'} over the rice. Add a sauce or seasoning only if you have one.`
      ]
    },
    {
      title: 'Warm bean pan',
      intro: 'Beans and vegetables make a quick, filling pan meal.',
      slots: [['cooked-beans'], ['cooked-veg', 'fresh-veg']],
      extras: ['bread', 'cooked-rice'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Cook ${names('fresh-veg')} in a little oil until tender.` : `Warm ${names('cooked-veg') || 'your cooked vegetables'} in a lightly oiled pan.`,
        `Add ${names('cooked-beans') || 'the cooked beans'}${has('cooked-veg') ? ` and ${names('cooked-veg')}` : ''}. Heat thoroughly and season to taste.`,
        `Serve with ${names('bread', 'cooked-rice') || 'what you have'} or eat it as a simple bowl.`
      ]
    },
    {
      title: 'Fruit-and-yogurt bowl',
      intro: 'A useful breakfast or snack for fruit that needs eating soon.',
      slots: [['fruit'], ['yogurt']],
      extras: [],
      steps: ({ names }) => [
        `Wash and cut ${names('fruit') || 'the fruit'}, removing any inedible parts.`,
        `Spoon ${names('yogurt') || 'yogurt'} into a bowl and add the fruit.`,
        'Eat it now, or refrigerate promptly.'
      ]
    },
    {
      title: 'Fruit smoothie',
      intro: 'A quick way to use fruit and milk together.',
      slots: [['fruit'], ['milk']], extras: ['yogurt'],
      steps: ({ names }) => [
        `Wash and cut ${names('fruit') || 'the fruit'}, removing any inedible parts.`,
        `Blend with ${names('milk') || 'milk'}${names('yogurt') ? ` and ${names('yogurt')}` : ''} until smooth.`,
        'Drink right away or refrigerate promptly.'
      ]
    },
    {
      title: 'Rice porridge',
      intro: 'A simple way to use leftover rice even if it is the only food you entered.',
      slots: [['cooked-rice']],
      extras: ['cooked-veg', 'cooked-protein', 'cooked-beans', 'eggs'],
      steps: ({ names, has }) => [
        `Put ${names('cooked-rice') || 'the cooked rice'} in a pan with water. Simmer, stirring, until it softens into a thick porridge.`,
        `${has('cooked-veg') || has('cooked-protein') || has('cooked-beans') ? `Add ${names('cooked-veg', 'cooked-protein', 'cooked-beans')} and heat it thoroughly.` : 'Season with anything suitable you already have.'}`, 
        `${has('eggs') ? `Cook ${names('eggs')} fully before serving.` : 'Serve hot.'}`
      ]
    },
    {
      title: 'Vegetable pan',
      intro: 'A quick use-up meal for vegetables, even when no grain or protein is listed.',
      slots: [['fresh-veg', 'cooked-veg']],
      extras: ['cooked-beans', 'cooked-protein', 'eggs'],
      steps: ({ names, has }) => [
        has('fresh-veg') ? `Cut ${names('fresh-veg')} into bite-sized pieces and cook in a lightly oiled pan until tender.${has('cooked-veg') ? ` Add ${names('cooked-veg')} and reheat thoroughly.` : ''}` : `Warm ${names('cooked-veg') || 'your cooked vegetables'} in a lightly oiled pan until thoroughly reheated.`,
        has('cooked-beans') || has('cooked-protein') ? `Add ${names('cooked-beans', 'cooked-protein')} and heat thoroughly.` : 'Season with what you have.',
        `${has('eggs') ? `Add ${names('eggs')} and cook until fully set.` : 'Season to taste with what you have.'} Serve hot.`
      ]
    },
    {
      title: 'Fruit plate',
      intro: 'No elaborate recipe needed: use the fruit while it is good.',
      slots: [['fruit']], extras: [],
      steps: ({ names }) => [`Wash ${names('fruit') || 'the fruit'} and cut away inedible parts.`, 'Serve as a snack or alongside a meal.', 'Refrigerate any cut fruit promptly.']
    },
    {
      title: 'Eggs for dinner',
      intro: 'A plain cooked-egg meal if eggs are all you have listed.',
      slots: [['eggs']], extras: ['bread', 'fresh-veg', 'cooked-veg'],
      steps: ({ names, has }) => [`Beat ${names('eggs') || 'the eggs'} with a little water if you like.`, `${has('fresh-veg') ? `Cook ${names('fresh-veg')} until tender. ` : ''}${has('cooked-veg') ? `Reheat ${names('cooked-veg')} thoroughly. ` : ''}Add the eggs to a lightly oiled pan and cook until fully set.`, `${has('bread') ? `Serve with ${names('bread')}.` : 'Serve hot.'}`]
    }
  ];

  let pantry = readPantry();
  let current = 0;
  let twoDayPlan = readTwoDayPlan();

  function readPantry() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter(i => i && typeof i.id === 'string' && typeof i.name === 'string' && Object.hasOwn(TYPE_LABEL, i.type) && /^\d{4}-\d{2}-\d{2}$/.test(i.date)).slice(0, 60) : [];
    } catch { return []; }
  }
  function savePantry() { try { localStorage.setItem(KEY, JSON.stringify(pantry)); } catch {} }
  function readTwoDayPlan() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PLAN_KEY) || 'null');
      return parsed && parsed.date === todayISO() && Array.isArray(parsed.days) ? parsed : null;
    } catch { return null; }
  }
  function saveTwoDayPlan() { try { localStorage.setItem(PLAN_KEY, JSON.stringify(twoDayPlan)); } catch {} }
  function resetTwoDayPlan() { twoDayPlan = null; saveTwoDayPlan(); }
  function isEligible(item, dayOffset = 0) { return !COOKED.has(item.type) || (item.safe === true && dayDiff(item.date) >= 0 && dayDiff(item.date) + dayOffset <= 4); }
  function listText(list) { return new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(list); }
  function pickName(items, ...types) { return listText(items.filter(i => types.includes(i.type)).map(i => i.name)); }

  function ideasFor(items, dayOffset = 0) {
    const eligible = items.filter(i => isEligible(i, dayOffset)).sort(byDate);
    return recipes.map((recipe) => {
      if (recipe.valid && !recipe.valid(eligible)) return null;
      const chosen = new Set();
      const missing = [];
      for (const group of recipe.slots) {
        const match = eligible.find(i => group.includes(i.type) && !chosen.has(i.id));
        if (match) chosen.add(match.id); else missing.push(group.map(type => TYPE_LABEL[type]).join(' or '));
      }
      const relevant = new Set([...recipe.slots.flat(), ...recipe.extras]);
      for (const item of eligible) if (relevant.has(item.type)) chosen.add(item.id);
      const used = eligible.filter(i => chosen.has(i.id));
      if (!used.length || missing.length > 1) return null;
      const urgent = used.reduce((sum, i) => sum + (COOKED.has(i.type) ? 10 + dayDiff(i.date) * 4 : Math.max(0, 4 + dayDiff(i.date))), 0);
      return { recipe, used, missing, score: used.length * 100 - missing.length * 200 + urgent + (recipe.slots.length > 1 ? 6 : 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  }

  function updateDateField() {
    const cooked = COOKED.has($('food-type').value);
    $('food-date-label').textContent = cooked ? 'Cooked on' : 'Plan to use by (optional)';
    $('safe-row').hidden = !cooked;
    $('stored-safely').required = cooked;
    $('food-date').required = cooked;
    $('food-date').max = cooked ? todayISO() : '';
    $('date-help').textContent = cooked ? 'Cooked food needs a date and storage check. This app cannot verify food safety.' : 'Your plan date helps rank ideas. It does not judge whether the food is safe.';
  }

  function renderPantry() {
    $('item-count').textContent = pantry.length;
    $('clear-list').hidden = pantry.length === 0;
    const list = $('pantry-list');
    list.replaceChildren();
    if (!pantry.length) { const p = document.createElement('p'); p.className = 'empty-pantry'; p.textContent = 'Your kitchen is empty. Add one ingredient to begin.'; list.append(p); return; }
    for (const [index, item] of [...pantry].sort(byDate).entries()) {
      const row = document.createElement('div'); row.className = 'food-row';
      if (!isEligible(item)) row.classList.add('excluded');
      else if (dayDiff(item.date) >= -1) row.classList.add('urgent');
      const number = document.createElement('span'); number.className = 'food-number'; number.textContent = String(index + 1).padStart(2, '0');
      const main = document.createElement('div'); main.className = 'food-main';
      const strong = document.createElement('strong'); strong.textContent = item.name;
      const small = document.createElement('small'); small.textContent = `${TYPE_LABEL[item.type]} · ${COOKED.has(item.type) ? 'cooked' : 'planned'} ${item.date}${isEligible(item) ? '' : ' · not suggested'}`;
      main.append(strong, small);
      const button = document.createElement('button'); button.type = 'button'; button.textContent = '×'; button.setAttribute('aria-label', `Remove ${item.name}`);
      button.addEventListener('click', () => { pantry = pantry.filter(i => i.id !== item.id); savePantry(); resetTwoDayPlan(); current = 0; render(); });
      row.append(number, main, button); list.append(row);
    }
  }

  function fillList(id, values) {
    const list = $(id); list.replaceChildren();
    for (const value of values) { const li = document.createElement('li'); li.textContent = value; list.append(li); }
  }

  function buildTwoDayPlan() {
    const tonightIdeas = ideasFor(pantry, 0).filter(idea => idea.missing.length === 0);
    let best = null;
    for (const tonight of tonightIdeas) {
      const usedTonight = new Set(tonight.used.map(i => i.id));
      const remaining = pantry.filter(i => !usedTonight.has(i.id));
      const tomorrowIdeas = ideasFor(remaining, 1).filter(idea => idea.missing.length === 0 && idea.recipe.title !== tonight.recipe.title);
      for (const tomorrow of [null, ...tomorrowIdeas]) {
        const covered = tonight.used.length + (tomorrow?.used.length || 0);
        const urgency = tonight.used.reduce((score, item) => score + (COOKED.has(item.type) ? 10 + dayDiff(item.date) * 6 : Math.max(0, dayDiff(item.date) + 2)), 0);
        const score = covered * 100 + urgency + (tonight.used.length > 1 ? 12 : 0) + (tomorrow && tomorrow.used.length > 1 ? 15 : 0);
        if (!best || score > best.score) best = { tonight, tomorrow, score };
      }
    }
    twoDayPlan = { date: todayISO(), days: best ? [best.tonight, best.tomorrow].filter(Boolean).map(idea => ({ title: idea.recipe.title, usedIds: idea.used.map(i => i.id) })) : [] };
    saveTwoDayPlan(); renderTwoDayPlan();
  }

  function renderTwoDayPlan() {
    const days = twoDayPlan?.date === todayISO() ? twoDayPlan.days : [];
    for (const [index, label] of ['tonight', 'tomorrow'].entries()) {
      const entry = days[index];
      const recipe = entry && recipes.find(r => r.title === entry.title);
      const used = entry ? entry.usedIds.map(id => pantry.find(i => i.id === id)).filter(Boolean) : [];
      const title = $(`${label}-title`), items = $(`${label}-items`), steps = $(`${label}-steps`);
      steps.replaceChildren(); steps.hidden = !recipe || !used.length;
      if (!twoDayPlan) {
        title.textContent = 'Waiting for your kitchen';
        items.textContent = index === 0 ? 'Add your food above, then build a plan.' : 'Each ingredient is assigned to at most one meal.';
      } else if (!recipe || !used.length) {
        title.textContent = index === 0 ? 'No complete match yet' : 'No second meal needed';
        items.textContent = index === 0 ? 'Add another ingredient or try a meal idea above.' : 'The remaining food did not make a complete second meal.';
      } else {
        title.textContent = recipe.title;
        items.textContent = `Uses ${listText(used.map(i => i.name))}.`;
        const context = { names: (...types) => pickName(used, ...types), has: (type) => used.some(i => i.type === type) };
        for (const instruction of recipe.steps(context)) { const li = document.createElement('li'); li.textContent = instruction; steps.append(li); }
      }
    }
    const plannedIds = new Set(days.flatMap(day => day.usedIds));
    const remaining = pantry.filter(i => !plannedIds.has(i.id));
    $('unplanned').textContent = twoDayPlan ? (remaining.length ? `Still unplanned: ${listText(remaining.map(i => i.name))}.` : 'All listed food has a place in this plan.') : '';
    $('build-plan').firstChild.textContent = twoDayPlan ? 'REBUILD MY TWO-DAY PLAN ' : 'BUILD MY TWO-DAY PLAN ';
  }

  function renderPlan() {
    const ideas = ideasFor(pantry);
    const hasFood = pantry.length > 0;
    const excluded = pantry.filter(i => !isEligible(i));
    $('overdue-note').hidden = excluded.length === 0;
    $('overdue-note').textContent = excluded.length ? `${excluded.length} cooked item${excluded.length === 1 ? ' is' : 's are'} outside the four-day refrigerator guideline or lacked the storage check. ${excluded.length === 1 ? 'It is' : 'They are'} not used in meal ideas.` : '';
    $('empty-plan').hidden = ideas.length > 0;
    $('plan-content').hidden = ideas.length === 0;
    if (!ideas.length) {
      $('plan-count').textContent = hasFood ? 'NO SAFE MATCH YET' : 'NO INGREDIENTS YET';
      const empty = $('empty-plan');
      empty.querySelector('h3').textContent = hasFood ? 'Add one more ingredient.' : 'A meal starts with what you’ve got.';
      empty.querySelector('p').textContent = hasFood ? 'The current list has no supported match. Try adding another ingredient or check the food-safety note below.' : 'Add food on the left. Use First will match it to simple meals and plainly show anything else needed.';
      return;
    }
    current %= ideas.length;
    const { recipe, used, missing } = ideas[current];
    $('plan-count').textContent = `${current + 1} OF ${ideas.length} IDEAS`;
    $('plan-kicker').textContent = missing.length ? 'ONE THING MISSING' : 'YOU HAVE WHAT IT NEEDS';
    $('recipe-title').textContent = recipe.title;
    $('recipe-intro').textContent = recipe.intro;
    fillList('used-items', used.map(i => i.name));
    $('missing-block').hidden = missing.length === 0;
    fillList('missing-items', missing);
    const context = { names: (...types) => pickName(used, ...types), has: (type) => used.some(i => i.type === type) };
    fillList('recipe-steps', recipe.steps(context));
    $('safety-note').textContent = used.some(i => COOKED.has(i.type)) ? 'Safety first: these meal ideas assume cooked leftovers were refrigerated promptly, kept cold, and are within 3–4 days. Reheat cooked leftovers thoroughly to 165°F / 74°C. If in doubt, do not use them.' : 'Safety first: wash fresh produce, cook eggs fully, and follow the food’s label and local guidance. This tool cannot judge freshness.';
    $('next-recipe').hidden = ideas.length < 2;
  }

  function render() { renderPantry(); renderPlan(); renderTwoDayPlan(); }

  $('food-type').addEventListener('change', () => { $('food-date').value = ''; $('stored-safely').checked = false; updateDateField(); });
  $('add-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('food-name').value.trim().replace(/\s+/g, ' ');
    const type = $('food-type').value;
    const cooked = COOKED.has(type);
    const date = $('food-date').value || todayISO();
    let error = '';
    if (!name) error = 'Name the food first.';
    else if (!Object.hasOwn(TYPE_LABEL, type)) error = 'Choose a food type.';
    else if (cooked && !$('food-date').value) error = 'Enter the date this leftover was cooked.';
    else if (cooked && !$('stored-safely').checked) error = 'Only add cooked leftovers that were refrigerated promptly and kept cold; see the timing note above.';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) error = 'Enter a valid date.';
    else if (cooked && dayDiff(date) < 0) error = 'Cooked-on date cannot be in the future.';
    else if (pantry.length >= 60) error = 'The kitchen list is full. Remove an item before adding more.';
    $('form-error').hidden = !error; $('form-error').textContent = error;
    if (error) return;
    pantry.push({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, name, type, date, safe: cooked ? true : null });
    savePantry(); resetTwoDayPlan(); current = 0; $('add-form').reset(); updateDateField(); render(); $('food-name').focus();
  });
  $('clear-list').addEventListener('click', () => {
    if (!confirm('Clear your kitchen list from this browser?')) return;
    pantry = []; current = 0; savePantry(); resetTwoDayPlan(); render();
  });
  $('next-recipe').addEventListener('click', () => { current++; renderPlan(); });
  $('print-plan').addEventListener('click', () => window.print());
  $('build-plan').addEventListener('click', buildTwoDayPlan);
  updateDateField(); render();
})();
