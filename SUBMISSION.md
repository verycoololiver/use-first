# Devpost entry draft: Use First

**Project link:** https://obstudio.org/tools/use-first/

**Source code:** https://github.com/verycoololiver/use-first

**One-line pitch:** Put in the leftovers you have. Get a meal you can make now, then use the rest in a two-day plan without counting anything twice.

## About the project

I built Use First for the moment when there are a few things in the fridge but no obvious dinner. You enter the food you actually have. The tool suggests a simple meal, names the items it would use, and shows any missing ingredient rather than pretending the recipe is complete. If you want to plan ahead, it assigns food to tonight and tomorrow, using each entered item at most once.

This connects to **SDG 12, target 12.3: reducing food waste at the consumer level**. The UN reports that households accounted for 60% of global food waste in 2022. The US EPA recommends keeping a list of food to use up and planning meals around it. Use First turns those two actions into a small browser tool. It does not claim that opening a recipe saved food or reduced emissions.

Cooked leftovers need a date and a storage check. The tool keeps cooked food beyond the four-day refrigerator guideline out of its meal suggestions and tells people to follow food-safety guidance. It cannot judge whether food is actually safe to eat.

Ingredient-to-recipe apps already exist. What I wanted to make here was a focused leftover planner: a short, understandable set of meal patterns, a clear missing-ingredient label, and a two-day allocation that does not use the same food twice. There is no account, external recipe service, or AI-generated meal text at runtime.

## How to try it

1. Open the project link and add the food you have. The list starts empty.
2. Look at the first meal idea, or switch to another. The tool shows exactly which entered foods it uses.
3. Press **Build my two-day plan** to see separate assignments for tonight and tomorrow.

## Technologies

HTML, CSS, and vanilla JavaScript. Browser local storage saves the kitchen list on that device. The illustration is drawn in CSS. OpenAI Codex assisted development. The static app is hosted on OB Studio.

## Screenshots to upload

- `screenshots/01-landing.png` — live landing page and empty-state tool.
- `screenshots/02-meal-idea-demo.png` — demo ingredients and a meal suggestion.
- `screenshots/03-two-day-plan-demo.png` — demo plan with each ingredient assigned once.

The latter two use example food entered for the screenshots. They are demonstrations, not verified meals or measured waste reduction.

## Optional short demo video outline

Show the empty kitchen first. Add leftover rice with a cooked date and storage check, then half a tomato. Point to the fried rice idea and the exact items it uses. Add a banana and yogurt, build the two-day plan, and show that rice and tomato appear tonight while banana and yogurt appear tomorrow. End on the SDG 12.3 explanation and food-safety note.
