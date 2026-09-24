# Use First

A few leftovers in the kitchen, but no clear idea what to do with them. Use First is a small tool for making that decision easier.

**[Try the tool](https://obstudio.org/tools/use-first/)**

Paste your food as a comma-separated list or put one item on each line. The tool recognizes common food names and quietly fixes small spelling mistakes when you review the list. You add a date for cooked leftovers or raw meat and fish, then it shows meals you can make from your food. If the list can make two separate meals, a second button splits the food between them so the same item is never counted twice.

For example, entering `leftover rice, half a tomato, ripe banana, plain yogurt` can give you fried rice for one meal and a fruit-and-yogurt bowl for the next. The list starts empty; that example is only here to show how it works.

## Why I made it for SDG 12

[UN Sustainable Development Goal 12](https://sdgs.un.org/goals/goal12) is about responsible consumption and production. [Target 12.3](https://sdgs.un.org/goals/goal12) calls for halving food waste at the retail and consumer levels by 2030. The UN reports that households made up 60% of global food waste in 2022. The [US EPA](https://www.epa.gov/recycle/preventing-wasted-food-home) recommends keeping a list of food to use up and planning meals around it. That is the small, everyday action this tool helps with.

There are plenty of recipe search sites. This one focuses on leftovers already in the kitchen: quick meal patterns, a short cooked-food age check, and a two-meal plan that does not reuse an item. It is meant to make the next decision easier, not to calculate an unverified environmental impact.

## How it works

The app is plain HTML, CSS and JavaScript. It recognizes 117 common ingredient names, groups them into 40 food types, and fixes minor typos with a small edit-distance matcher. Unknown names are not accepted or used in recipes; the user can try a more specific name. Its 31 meal patterns include fried rice, chicken and vegetable skillet, meat and tomato pasta, fish with potatoes, a bean and cheese wrap, soup, oatmeal, and fruit with yogurt. It only presents a meal as complete when it matches the foods you entered. When it cannot make a complete match, it suggests one type of food that could help.

Cooked leftovers need a cooked date. Raw meat and fish need the date they went into the fridge. The app leaves cooked food out of suggestions after four days, raw poultry, fish and ground meat after two days, and whole cuts of meat after five days. The cooking steps use the [FoodSafety.gov temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures). The app cannot check how food was stored or whether it is spoiled.

Everything runs in the browser. Your kitchen list is saved in local storage on that device. There is no account or external recipe API. TheMealDB's [free API](https://www.themealdb.com/api.php) only filters by one ingredient; multi-ingredient filtering requires a supporter key. The local meal patterns keep the tool usable without a key or network call. OpenAI Codex assisted development.

To run it yourself, put `index.html`, `styles.css`, and `app.js` in a `tools/use-first` folder under a static web server, then open `/tools/use-first/`. The asset paths start at that folder so the live page also works when someone leaves off the final slash. The public version is hosted at the link above.

## Hackathon notes

This project was made for the [Acodemic × G.I.R.L.S. Global SDG Hackathon](https://acodemic-hackathon.devpost.com/). The [rules](https://acodemic-hackathon.devpost.com/rules) allow AI tools and require participants to have rights to the content they submit. The project must clearly connect to an SDG and work in a browser or app. The overview lists students aged 13+ as eligible, with companies and professional organizations excluded.

A submission needs the public link, a description explaining the idea and SDG connection, **at least three screenshots**, the technologies used, and source code. A 1–5 minute video is optional. The deadline listed by Devpost is **September 26, 2026 at 11:45 p.m. CDT** (**September 27 at 1:45 p.m. Korea time**). This repository contains the source; four screenshots are prepared separately for the Devpost entry.
