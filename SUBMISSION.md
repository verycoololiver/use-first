# Use First — Devpost entry draft

Project: https://obstudio.org/tools/use-first/
Source: https://github.com/verycoololiver/use-first

**Short pitch:** Paste what is left in your kitchen. Get a meal you can make from it, or split the food across your next two meals.

## Inspiration and idea

The annoying part of leftovers is deciding what to do with several small amounts of food. Use First starts with the food you have, instead of sending you through a recipe search that assumes a full shopping trip.

Paste a list such as `leftover rice, half a tomato, ripe banana, plain yogurt`. The tool recognizes the foods and quietly fixes small spelling mistakes when you review the list. It suggests a meal using the actual items you entered. If there is enough for two different meals, it can split the list between them without using the same item twice.

## SDG connection

Use First addresses **UN Sustainable Development Goal 12, target 12.3**, which calls for halving food waste at the retail and consumer levels by 2030. The UN reports that households produced 60% of global food waste in 2022. The US EPA recommends keeping a list of food to use up and planning meals around it. This tool makes those two steps easier to do on an ordinary day.

## What I built

The app runs entirely in the browser. It recognizes over 90 common ingredient names across 36 food types, with a small matching algorithm for typos. Unrecognized names are not turned into cooking instructions. Its meal patterns include fried rice, soup, potato hash, a tortilla melt, hummus wraps, bean salad, and fruit with yogurt. Cooked leftovers need a cooked date; items past four days are left out of suggestions. The kitchen list stays on the device in browser local storage.

The optional two-meal plan appears only when the current list can make two complete meals. It assigns each item at most once. The meal ideas are suggestions, not a claim that food has already been saved.

## Technologies

HTML, CSS, vanilla JavaScript, and browser local storage. OpenAI Codex assisted development. The static app is hosted at the project link above. No recipe API or runtime AI key is needed.

## Screenshots for Devpost

Upload these four files from the separate `Devpost-screenshots` folder:

1. `01-goal-12-landing.png` — project introduction and Goal 12.3.
2. `02-meal-idea-demo.png` — a demo list with the matched meal.
3. `03-two-meal-plan-demo.png` — separate meal assignments using each food once.
4. `04-spelling-review.png` — a misspelled ingredient corrected during review.

The second and third screenshots show entered example food. They are demos, not measured food-waste savings.

## Optional video outline

Show the empty page, paste the four example foods, check the types, and enter the cooked date for rice. Point to the fried rice idea. Then press **Plan two meals** to show rice and tomato in one meal, banana and yogurt in the other. Finish with the Goal 12.3 card.
