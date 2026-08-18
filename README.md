# Kids

Home practice for UK primary children. First subject: **maths**, starting with times tables and division.

Live host later: [kids.mradib.com](https://kids.mradib.com). This repo is the whole site.

## Try it locally

```bash
npm install
npm run dev
```

Open:

- http://localhost:5173/ — hub
- http://localhost:5173/maths/ — maths
- http://localhost:5173/maths/times-tables/ — packs and charts

Print from the times tables page. Choose **Save as PDF** in the browser dialog if you want a file. History is stored in this browser after you print, not after you generate.

```bash
npm test
npm run lint
npm run build
npm run preview
```

CI (`.github/workflows/ci.yml`) runs lint, types, tests, and build on every pull request and on every push to `main`. A green push to `main` also deploys `dist` to GitHub Pages at [kids.mradib.com](https://kids.mradib.com).

## What it prints

- A four-page practice pack for one focus table (multiplication, division, or mixed), with earlier tables kept in the mix
- An optional answer page
- A fridge chart for a year set or any custom set such as 2, 3, 5 and 10

## Pedagogy

A child has mastered a table when they are quick, they can undo the fact (division), and last term’s tables have not gone rusty. A 7 pack is therefore a lot of 7 and a lot of the tables taught before 7.
