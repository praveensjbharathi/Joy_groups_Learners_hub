# Joy Groups Learning Hub — self-hosting ZIP

Start here. This is a complete source project based on published version 10 (23 November 2026), adapted for your own Cloudflare account. It is a server application, not an HTML-only website. Ordinary cPanel/shared static hosting cannot run the employee workflows as supplied.

## Included

- All 105 built-in lessons: 93 Hub lessons and 12 Product Delivery lessons; grouped courses, full-page lessons, worked examples, practical exercises and mixed assessments.
- English, Tamil, Hindi and Arabic content, native teaching prose, Arabic RTL layout and all illustration assets.
- Public learning plus Super Admin, company-scoped HR and employee workflows; assessments, practical review, onboarding, policy/COC acknowledgements, assets, declarations, requests, exit records and weekly readiness reviews.
- D1 database migrations, private R2 document handling and optional email/SMS/WhatsApp configuration.
- Independent build/deployment configuration and verified Cloudflare Access login adapter. The old internal auth route names are retained for compatibility; this export does not depend on ChatGPT sign-in.
- Source provenance in `SOURCE_VERSION.txt` and automated tests.

This ZIP starts with a NEW database. Live employee records, historical attempts, uploaded employee documents, secrets and sessions from the existing hosted site are NOT included. No notification provider credentials are included. Lottery and gaming platform applications remain excluded.

## What you need

1. Node.js 24 LTS and npm (the application engine allows 22.13+, but the complete supplied test suite uses newer Node test APIs).
2. Your Cloudflare account, a D1 database and an R2 bucket. Cloudflare may charge according to your plan and usage.
3. A custom domain/subdomain, such as `learn.yourcompany.com`, for the documented login setup.
4. Cloudflare Zero Trust Access with an allowed login method (email OTP or your identity provider). Its user/plan limits are separate from this application.

## 1. Install and view public learning locally

Extract the ZIP and open a terminal in the folder containing `package.json`.

```sh
npm ci
npm run db:local
npm run dev
```

Open the local URL printed by the development server. Public learning is available; production login needs the Access setup below. There is deliberately no fake administrator login or password embedded in the ZIP.

For a local production build:

```sh
npm run build
npm start
```

The same `.wrangler/state` directory is used for local migrations and local production testing.

## 2. Create your own database and file bucket

```sh
npx wrangler login
npx wrangler d1 create joy-learning-hub
npx wrangler r2 bucket create joy-learning-files
```

Edit `wrangler.json`:

- Replace the placeholder `database_id` with the ID returned by D1 creation.
- Keep the database binding named `DB` and the R2 binding named `BUCKET`.
- If you choose different resource names, update `database_name` and `bucket_name` too.
- Set a unique Worker `name` if needed.
- Set `INITIAL_ADMIN_EMAIL` to the email you control and will use to sign in. Its default is `praveen.red.07@gmail.com`. Do this BEFORE the first administrator login. Changing it later is not an automatic ownership-transfer or data-migration tool.

Apply the migrations to your NEW database:

```sh
npm run db:remote
```

Do not import unrelated data into these tables. For later releases, back up D1 and use the migration history rather than replaying schema SQL manually.

## 3. Deploy the application

```sh
npm run deploy
```

This builds with the pinned Vinext / Cloudflare Vite plugin v1 toolchain and deploys using `dist/server/wrangler.json`. Do not replace this configuration with the newer `cf init` / Vite-plugin-v2 setup without a separate migration.

Attach your custom domain under your Worker's Domains & Routes. Public lessons can be used before login is configured; the sign-in route explains the missing configuration and employee APIs reject anonymous changes.

## 4. Configure login while keeping learning public

In Cloudflare Zero Trust, create a self-hosted Access application for your custom hostname and ONLY the path:

```text
/signin-with-chatgpt
```

Use an **Allow** policy for your administrator and authorised staff emails (or an approved identity-provider group). Do not use a Bypass policy on that login path. Configure email OTP or your chosen identity provider.

In the Access application's cookie settings, DISABLE **Cookie Path Attribute**. The signed application cookie must be available to the site's other pages and API requests. Keep the public learning paths outside this Access application; protecting the entire hostname would also require login for public lessons.

Copy the Access application's audience tag and your team domain into `wrangler.json`:

```json
"vars": {
  "TEAM_DOMAIN": "https://YOUR-TEAM.cloudflareaccess.com",
  "ACCESS_AUD": "YOUR-APPLICATION-AUDIENCE-TAG",
  "INITIAL_ADMIN_EMAIL": "praveen.red.07@gmail.com"
}
```

Rebuild and deploy after changing these values:

```sh
npm run deploy
```

Click **Sign in** on your site. Access authenticates the email; the application verifies the JWT signature, issuer, audience, expiry and required application-user claims. Raw email headers and URL parameters never grant access. The application can validate the signed application cookie on public routes after login.

On the first valid administrator visit, the Hub creates its initial roster. Invite users with their exact login email, assign their courses and grant scoped HR access as needed. Access authentication alone does not give someone HR or Super Admin privileges. Use the Hub's employee/exit controls when removing employee access, and choose an appropriate short Access session duration; an independently verified JWT remains valid until its expiry.

The logout link uses Cloudflare's Access logout endpoint. This may sign the user out of other applications in the same Access session.

This login adapter was tested with signed synthetic tokens. Your real Access application, identity provider, domain and multi-account sign-in must be checked after you configure them; no account was provisioned or deployment performed in your Cloudflare account during this export.

## 5. Notifications (optional)

In the Hub, configure verified sender details, approved WhatsApp templates, opt-in, reminder interval and message limits. Set provider credentials as Worker secrets, for example:

```sh
npx wrangler secret put RESEND_API_KEY --config dist/server/wrangler.json
npx wrangler secret put TWILIO_ACCOUNT_SID --config dist/server/wrangler.json
npx wrangler secret put TWILIO_AUTH_TOKEN --config dist/server/wrangler.json
npx wrangler secret put WHATSAPP_ACCESS_TOKEN --config dist/server/wrangler.json
```

Configure only providers you will actually use. An enabled switch alone does not deliver messages. New events enter the in-app/dispatch queue; administrator dispatch is separate. No unattended scheduler or delivery-status callback is included. Review provider setup, templates, recipient consent, costs and delivery results before operational use.

## 6. Checks before using employee records

```sh
npm run check
npm run test:selfhost
node scripts/i18n/audit.mjs --strict
node tests/hub-workflows.mjs
node tests/academy-flow.mjs
```

Then check your actual deployment: public lessons without login; administrator login; an invited HR user with the right company scope; an employee who can see only their records; an assessment and practical review; an authorised document upload/download; and sign-out. Use fictional data for this check.

Approve your company/jurisdiction-reviewed policy versions before operational acknowledgement. Country-law learning is based on employment applicability, not the language selected. Training text and a passing score do not replace approved policy or legal review.

## Backups and updates

Back up D1 and R2 independently. Keep provider keys and `.dev.vars` out of source control. This export does not move the old site's database or attachments; arrange a controlled data migration separately if you need its history.

Edit canonical language dictionaries under `lib/locales` and native teaching copy under `lib/native-copy`, then rebuild. Preserve lesson IDs, question order, correct-option indices and assessment versions unless you intentionally release a new assessment.

## Official setup references

- Access JWT validation: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/
- Access cookies / Cookie Path Attribute: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/
- D1 migrations: https://developers.cloudflare.com/d1/reference/migrations/
- R2 bindings: https://developers.cloudflare.com/r2/api/workers/workers-api-usage/
- Cloudflare Vite plugin: https://developers.cloudflare.com/workers/vite-plugin/

## தமிழில் முக்கியக் குறிப்பு

இந்த ZIP-ல் முழு மூல நிரல், நான்கு மொழிப் பாடங்கள், படங்கள், தரவுத்தள அமைப்பு மற்றும் நிறுவல் வழிமுறைகள் உள்ளன. இது HTML கோப்புகளை மட்டும் பதிவேற்றும் தளம் அல்ல. உங்கள் Cloudflare கணக்கில் D1, R2 மற்றும் Access உள்நுழைவை அமைத்துப் பயன்படுத்த வேண்டும். பழைய தளத்தின் உண்மையான ஊழியர் பதிவுகளும் ரகசிய விசைகளும் இதில் சேர்க்கப்படவில்லை. முதலில் மேலுள்ள வழிமுறைகளைப் பின்பற்றி, கற்பனைத் தகவல்களுடன் சோதித்த பிறகு பயன்படுத்தவும்.
