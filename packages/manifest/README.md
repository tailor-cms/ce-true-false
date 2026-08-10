# @tailor-cms/ce-true-false-manifest

Shared element definition for the **True - False** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Declares the element type, display name, UI configuration and initial state. The authoring, end-user and server packages all build on it, so it is the only package that has to be understood to know what the element *is*.

## Installation

```sh
npm install @tailor-cms/ce-true-false-manifest
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import manifest, { type ElementData } from '@tailor-cms/ce-true-false-manifest';

manifest.type;       // 'TRUE_FALSE'
manifest.initState(); // initial element data
```

## Element

| Property | Value |
| --- | --- |
| Name | True - False |
| Type | `TRUE_FALSE` |
| Icon | [`mdi-check-circle`](https://pictogrammers.com/library/mdi/) |
| Composite | Yes |
| Question | Yes |

## Packages

This element ships as four packages, published together from the
[`ce-true-false`](https://github.com/tailor-cms/ce-true-false) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-true-false-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-true-false-manifest) | Shared element definition |
| [`@tailor-cms/ce-true-false-edit`](https://www.npmjs.com/package/@tailor-cms/ce-true-false-edit) | Authoring component |
| [`@tailor-cms/ce-true-false-display`](https://www.npmjs.com/package/@tailor-cms/ce-true-false-display) | End-user component |
| [`@tailor-cms/ce-true-false-server`](https://www.npmjs.com/package/@tailor-cms/ce-true-false-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
