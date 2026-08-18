# Kids

Printable home practice for UK primary children. Built for the kitchen table, not for another screen.

Most times-tables generators dump fifty of the same sum on a page. The child can chant 7 for a week and quietly forget 4. Division is treated as a different subject. There is no name line, no timer, no way to mark the sheet, and no fridge chart of *only* the tables that child actually needs.

Kids exists to fix that. A parent picks a table and a stage — multiplication, then division, then mixed — and prints four mixed pages. A pack whose focus is 7 is a lot of 7 **and** a lot of the tables already earned. Last term’s facts stay alive while the new one is learned. Speed is part of mastery, so each sheet has a suggested time, a space for time taken, and a score box.

The site is [kids.mradib.com](https://kids.mradib.com). Maths (times tables) is first. Other subjects can follow as the children grow.

## Pedagogy

A child has mastered a table when three things are true: they answer quickly without counting up, they can undo the fact (division), and they can still do last term’s tables while they learn the new one.

We teach in that order on purpose. Multiplication first. Division next, as the same fact backwards. Then mixed, so the page layout cannot give the answer away. Year 2–6 labels on the site are a map, not a cage.

## Contribute

Issues and pull requests are welcome: another activity type, a clearer print layout, a translation, a bug you hit at the kitchen table. Fork the repo, make a branch, open a PR against `main`. CI runs lint, types, tests, and a production build on every pull request.

## Run it locally

```bash
git clone https://github.com/JohnAdib/kids.mradib.com.git
cd kids.mradib.com
npm install
npm run dev
```

Then open [http://localhost:5173/maths/times-tables/](http://localhost:5173/maths/times-tables/). Print from the browser (Save as PDF if you want a file). History is stored in that browser after you print, not after you generate.

```bash
npm test
npm run lint
npm run build
```

A green push to `main` deploys to [kids.mradib.com](https://kids.mradib.com).
