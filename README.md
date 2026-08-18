# Kids

Printable times tables for the first years of primary school, anywhere.

I made this for my daughters. The usual generators were not good enough: a wall of the same sum, no division, and last term’s tables gone the moment a new one arrived. So I built a small printer for the kitchen table. If you like it, use it for your own children.

A parent ticks the tables for the quiz — or types them in the address bar as `?tables=1,2,3` — and prints four A4 pages, one activity on each. Each sheet has a name line and a score box (`______ / total`). That URL is the pack: open it again and you get the same pages. The times table is a separate page. Prints stay in the header after you print.

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

Then open [http://localhost:5173/maths/times-tables/](http://localhost:5173/maths/times-tables/). Tick a table and the A4 pages appear beside the form. Print from the browser (Save as PDF if you want a file). History is stored in that browser after you print.

```bash
npm test
npm run lint
npm run build
```

A green push to `main` deploys to [kids.mradib.com](https://kids.mradib.com).
