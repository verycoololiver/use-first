# Use First

**Enter leftovers. Get a meal you can actually make. Then plan the next two days without using the same ingredient twice.**

Use First is a small browser tool made for the [Acodemic x G.I.R.L.S. Global SDG Hackathon](https://acodemic-hackathon.devpost.com/). It addresses **UN Sustainable Development Goal 12: Responsible Consumption and Production**, specifically [target 12.3](https://sdgs.un.org/goals/goal12), which calls for halving food waste at the retail and consumer levels by 2030. The UN reports that households accounted for 60% of global food waste in 2022.

## Why this exists

The hard part of avoiding food waste is often the ordinary Tuesday question: *I have cooked rice, half a tomato and a little chicken. What can I do with these before they go bad?* A generic recipe search can return thousands of meals, many of which still need a shopping trip. Use First stays narrow. It starts with the food already in the kitchen, suggests short remixes, shows missing ingredients plainly, and can assign available food to tonight and tomorrow without counting it twice.

This is not the first ingredient-to-recipe tool, and it is not a claim to have invented leftover cooking. The contribution is a transparent, compact planning flow for **already-cooked leftovers**, with timing and safety constraints visible to the user. No AI-generated recipes, external recipe database, login, or server is required to use it.

## Try it

Use the [live tool on OB Studio](https://obstudio.org/tools/use-first/). You can also open `index.html` in a browser or serve this folder locally. Add each food item, choose the closest type, and enter when cooked if it is a cooked leftover. For cooked food, the app asks whether it was refrigerated promptly and kept cold. It will not use cooked food more than four days old in suggestions. Choose another meal idea if the first is not appealing, or press **Build my two-day plan** to allocate items across tonight and tomorrow.

The kitchen list is saved in this browser's local storage. It starts empty. No sample item or test purchase is inserted. Clearing the list is a user action. The two-day plan is a proposal, not evidence that a meal was cooked or food was saved.

## How matching works

The app has a small set of flexible meal patterns: fried rice, a pasta skillet, soup, an egg skillet, a rice bowl, loaded toast, a bean pan, fruit and yogurt, and a few one-ingredient fallbacks. It matches food types, names the exact items used, and separately lists any missing category. Water and a little cooking oil are assumed; seasoning is optional. Complete matches rank ahead of those needing another ingredient. The two-day planner searches pairs of complete meal matches, excludes any leftover that would pass the four-day cooked-food window by tomorrow, and scores plans by how much listed food they assign, with a small priority for older cooked food. Each item can appear in at most one planned meal.

The match is intentionally modest. It does not know quantities, allergies, dietary needs, equipment, or whether a food has been stored safely. A suggested meal may not be satisfying for every combination. Food names are inserted as text, never interpreted as HTML.

## Food safety and evidence

Food waste reduction never overrides safety. [USDA guidance](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety) advises refrigerating leftovers within two hours (one hour above 90°F / 32°C), eating refrigerated leftovers within three to four days, and reheating them to 165°F / 74°C with a food thermometer. The app asks about storage, excludes cooked leftovers beyond four days, and reminds users that it cannot check spoilage. Fresh-food plan dates are reminders, not safety decisions. Follow labels and local guidance.

The [US EPA](https://www.epa.gov/recycle/preventing-wasted-food-home) recommends keeping a list of foods to use up and planning meals around them. Use First implements that specific behavior. It makes no carbon-savings or “meals rescued” claim from a click.

## Built with

Plain HTML, CSS and JavaScript. The plate and ingredient illustration is CSS drawn for this project; no third-party art is included. Development was assisted by OpenAI Codex. The interface follows OB Studio's yellow, ink and paper visual system.

## Hackathon checklist

The [event rules](https://acodemic-hackathon.devpost.com/rules) permit AI tools and require rights to included assets. Projects must clearly align with at least one SDG and be accessible in a browser or app. The [submission requirements](https://acodemic-hackathon.devpost.com/) call for a public project link, a description explaining the idea and SDG connection, **at least three screenshots**, a technology list and source code. A 1–5 minute demo video is optional. The listed deadline is **September 26, 2026 at 11:45 p.m. CDT** (**September 27 at 1:45 p.m. Korea time**).

For screenshots, capture: (1) the landing page and real empty state; (2) a user-entered leftover set with the suggested meal and exact ingredients; (3) the two-day plan showing separate assignments and any unplanned item. Use only food you actually enter for the demo, and label screenshots as demonstrations.

The judges assess SDG impact and relevance, creativity and originality, and execution and functionality. The strongest honest story here is a small, working response to household food waste—not an invented environmental impact figure or a claim that recipe search is new.
