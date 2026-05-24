# Agent Instructions

All AI agents (including Gemini CLI) operating in this repository MUST strictly adhere to the project's established standards and skills.

## 1. Skill Activation & Adherence

Before initiating any task, agents MUST activate the relevant skills and follow their instructions as expert procedural guidance.

- **TypeScript Skill:** Activate when modifying or reviewing any `.ts` or `.tsx` files.
  - Respect `@alphacifer/tsconfig` and `@alphacifer/biome` configurations.
  - Follow the [TypeScript Skill](./.agents/skills/typescript/SKILL.md) for type-safety and style conventions.
- **Testing Skill:** Activate when adding features, fixing bugs, or refactoring.
  - Every code change MUST be accompanied by appropriate tests.
  - Follow the [Testing Skill](./.agents/skills/testing/SKILL.md) for principles, test types, and data factory usage.

## 2. Technical Standards

- **Package Manager:** Use `pnpm`. Never use `npm` or `yarn`.
- **Formatting & Linting:** Use `biome`. Do not introduce ESLint or Prettier unless explicitly requested.
- **Testing Framework:** Use `vitest`. Ensure tests are deterministic and follow the layered safety net principle.
- **Build System:** Use `turbo` for workspace-wide tasks.

## 3. Workflow Mandates

- **Research First:** Always perform an empirical investigation (using `grep_search`, `glob`, and `read_file`) before proposing changes.
- **Verification:** Validation is mandatory. Run `pnpm test` and `pnpm build` (or `turbo run build`) to ensure no regressions.
- **Surgical Updates:** Keep changes focused and idiomatic. Do not perform unrelated refactoring.
- **No Suppression:** NEVER suppress type errors, lint warnings, or test failures without explicit user consent.

## 4. Documentation

- If you identify a recurring pattern or requirement not covered by existing skills, use the `skill-creator` to propose an update or a new skill.
