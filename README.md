# Kids

Printable times tables for the first years of primary school, anywhere.

I made this for my daughters. The usual generators were not good enough: a wall of the same sum, no division, and last term’s tables gone the moment a new one arrived. So I built a small printer for the kitchen table. If you like it, use it for your own children.

A parent picks a table and a stage — multiplication, then division, then mixed — and prints four A4 pages, one activity on each. A pack whose focus is 7 is a lot of 7 **and** a lot of the tables already earned. Speed is part of mastery, so each sheet has a suggested time, a space for time taken, and a score box. The times table — a multiplication square on one A4 page — is a separate page.

The site is [kids.mradib.com](https://kids.mradib.com). The source is on [GitHub](https://github.com/JohnAdib/kids.mradib.com). Times tables first. Other subjects can follow as the children grow.

## How we teach

The pedagogy is simple. A child has mastered a table when three things are true: they answer quickly without counting up, they can undo the fact (division), and they can still do last term’s tables while they learn the new one.

We teach in that order on purpose. Multiplication first. Division next, as the same fact backwards. Then mixed, so the page layout cannot give the answer away.

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
