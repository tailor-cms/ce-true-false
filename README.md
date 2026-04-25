# True - False

Boolean question content element. Learners choose True or False; gradable with optional hint and per-answer feedback.

**Type:** `TRUE_FALSE`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `question` | `string[]` | Embed ids of the question prompt |
| `embeds` | `Record<string, any>` | Embedded elements (e.g. question body) |
| `correct` | `boolean \| null` | Correct answer (present only when gradable) |
| `isGradable` | `boolean?` | Whether the element is graded |
| `hint` | `string` | Optional hint |
| `feedback` | `Record<number, string>` | Per-answer feedback (0 = True, 1 = False) |

## Edit

- Radio selector for the correct answer (True / False)
- Supports non-gradable mode (displays as plain options)

## Display

- Two-card True / False selector
- Per-choice correctness icons shown after submission when graded

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
