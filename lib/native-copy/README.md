# Language editing

English remains the source for product facts, policy applicability and assessment identities. Tamil, Hindi and Arabic use independently written teaching prose in this folder. Keep topic-specific objectives, steps, cases, records and approval routes as labelled statements; do not splice English fragments into native sentences.

Edit canonical `lib/locales/LANG-core.json` and `LANG-aux.json` for factual content and UI wording. Use natural workplace language appropriate to the intended meaning: a sales lead's suitability is different from an educational qualification; the responsible person is different from a property owner; a customer benefit is different from a generic output. Preserve brands and useful technical abbreviations.

Never change facts, dates, numerical limits, legal qualifications, planned/released status, source URLs or exclusions while editing language. Preserve question order, option order, correct indices, assessment versions and stored identities. Newly authored lessons with missing translations retain the original content and show the existing fallback notice.

Run `node scripts/i18n/prepare.mjs` after dictionary edits. It generates public UI assets without overwriting canonical dictionaries. Legacy Tamil split files are archival and no longer participate in generation. Full lesson dictionaries and teaching copy stay server-side.

Validate with TypeScript, the strict language audit and workflow tests. The audit checks original reference sections, option structure and grading; workflow tests check that native feedback matches the choices displayed to the learner and that public practice does not modify employee records.
