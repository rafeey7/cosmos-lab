# Stage A — concurrent execution readiness

Snapshot: 2026-10-21, Asia/Jakarta. The CEO approved J07 in principle and instructed preparation for concurrent Stage A, with C0 interfaces gated and no feature merge or deployment without CEO authorization.

## Authorization and state

- [PR #6](https://github.com/rafeey7/cosmos-lab/pull/6) must stay open until maintainer review and explicit merge approval. In-principle coordination approval is not merge approval or C0 interface approval.
- Latest inspection before this documentation update: `main` and J02–J06 branches remain at `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`; only PR #6 is open. Each worker must inspect again before editing.
- No worker sessions have been launched by this coordination action. The available chat inventory did not reveal confirmed J02–J05 owner sessions. This does not establish that no external session exists.
- READY means the execution packet is available. RUNNING requires an actual session identifier/URL, observable model where available, checkout, branch/head and owner acknowledgement. A published issue request is not an acknowledgement or proof of execution.
- Priority: numerical correctness, interface compatibility and reliable fallback before visual embellishment. Cinematic graphics are outside Stage A.

## Exact prompt manifest

Read the full original prompt verbatim from commit `454b63f81ec74147f336a25c0dc6b38f53033a3a`. Do not replace it with this summary. All four prompt files remain unchanged. The Stage A restriction in this document implements the newer CEO instruction and limits any broader Stage B language in those prompts.

| Task | Exact versioned prompt | Git blob SHA | Branch / issue | Requested model |
| --- | --- | --- | --- | --- |
| J02 | [Physics](https://github.com/rafeey7/cosmos-lab/blob/454b63f81ec74147f336a25c0dc6b38f53033a3a/docs/agent-prompts/J02-physics.md) | `236b2389fa8327ca0fd9d1fcf9c8841e5c216459` | `j02-physics` / [#1](https://github.com/rafeey7/cosmos-lab/issues/1) | GPT-6.1 Sol |
| J03 | [Graphics](https://github.com/rafeey7/cosmos-lab/blob/454b63f81ec74147f336a25c0dc6b38f53033a3a/docs/agent-prompts/J03-graphics.md) | `4b3c6450f09f403c36518fc78c5af285dbac9d94` | `j03-graphics` / [#2](https://github.com/rafeey7/cosmos-lab/issues/2) | Claude Sonnet 5.5 |
| J04 | [Product UI](https://github.com/rafeey7/cosmos-lab/blob/454b63f81ec74147f336a25c0dc6b38f53033a3a/docs/agent-prompts/J04-product-ui.md) | `27d5fc67d8b542afc5a0696eff4ecd71ea857d0c` | `j04-product-ui` / [#3](https://github.com/rafeey7/cosmos-lab/issues/3) | Claude Sonnet 5.5 |
| J05 | [QA / DevOps](https://github.com/rafeey7/cosmos-lab/blob/454b63f81ec74147f336a25c0dc6b38f53033a3a/docs/agent-prompts/J05-qa.md) | `4258d1f5a6d819bc47bb05c4b2b61a4ed0787402` | `j05-qa` / [#4](https://github.com/rafeey7/cosmos-lab/issues/4) | GPT-6.1 Sol |

Worker retrieval, from its own repository checkout:

```sh
git fetch origin j07-engineering-coordination
git show 454b63f81ec74147f336a25c0dc6b38f53033a3a:docs/agent-prompts/J02-physics.md
```

Use the corresponding exact path for your assignment and verify it against the manifest with `git ls-tree`. Reading pending coordination docs is allowed; merging PR #6 or consuming proposed interfaces is not. No worker should switch branches in the lead's checkout or edit another owner's working directory.

## Concurrent work and boundaries

| Task | Ready Stage A slice using existing APIs | Deliverable before C0 | Status at preparation |
| --- | --- | --- | --- |
| J02 | Independent eccentric/Kepler, conservation, barycentre, reversal, convergence, invalid-value/overflow and current guard tests; document observed limitations | Focused numerical evidence draft PR and written domain/failure proposals | READY; session and owner ACK unconfirmed |
| J03 | Current RenderSnapshot scale/immutability tests, low-preset/capability/fallback/context-loss evaluation and lifecycle findings | Compatibility evidence draft PR and written reset/trail/viewport proposal | READY packet; actual Claude session unavailable in this tool environment |
| J04 | Existing Step/Reset/error/HTML fallback, keyboard/focus/360px assessment and focused tests | Existing-behavior draft PR and written lifecycle/scheduler proposal | READY packet; actual Claude session unavailable in this tool environment |
| J05 | Frozen baseline, dependency audit, browser matrix, existing-app smoke/integration tests and minimal tooling proposal | QA evidence/tooling draft PR, test strategy for C0, hardware availability report | READY; session and owner ACK unconfirmed |

All four slices can run concurrently in isolated checkouts. No new force mode, solar scenario API, epoch/segment field, failure type or continuous scheduler may be implemented or consumed before the relevant C0 approval. Do not build mocks against unapproved signatures; Stage A mocks/fixtures must use the existing foundation contract. C0 signatures and examples may be discussed in documentation only. Existing-behavior bug fixes must preserve the current interface; any behavior change affecting consumers goes back to C0 review.

Ownership remains as in the exact prompts: J02 physics/numerical tests; J03 graphics/render adapter; J04 app/UI/controller area; J05 integration/browser tests and shared tooling. J05 is the designated prospective writer for package/lock/config files, but must first submit a tooling change record and obtain lead acknowledgement; no other owner edits these files. Browser test harness can exercise current behavior without new C0 fields. When a dependency is pending, continue unaffected tests and documentation.

Each draft PR targets main, references its issue without closing an incomplete assignment, records exact base/head and CI evidence, and lists dependencies. No auto-merge. A green CI or approved task slice never substitutes for CEO merge authorization. PR #6 stays open throughout this preparation.

## Owner acknowledgement and reporting

Post the following in your own issue after the actual session exists; until then every owner ACK stays PENDING:

```text
Task / actual model (or unverified):
Session ID or URL:
Exact prompt commit and blob verified:
Checkout / branch / base SHA:
Owned files and shared-tooling requests:
Stage A slice and baseline command results:
C0 decision IDs reviewed / proposal or objection:
Draft PR URL / head SHA (or not yet created):
Evidence / checks NOT RUN:
Blocker and next action:
```

Report on first baseline, first reproducible failure, first draft PR, each contract review response and final Stage A handoff. Do not invent percentages, launch times, owner reviews or numerical/hardware results. Acknowledging receipt is distinct from approving a particular interface revision.

## C0 and integration blockers

Use the [C0 decision register](c0-decision-register.md). Physics, Graphics, UI and QA each supply written responses in their task issue; consolidate revision-specific decisions in PR #6. No response is pending, not approval.

| Blocker | Effect | Resolution owner |
| --- | --- | --- |
| No confirmed worker session/ACK | Cannot report an assignment running or collect a real owner decision | Operator/assigned owner provides actual session; lead records evidence |
| Claude Sonnet 5.5 not exposed by this environment's agent tools | J03/J04 cannot be launched here on their requested model | CEO/operator supplies external Claude sessions or explicitly approves a named substitute |
| C0 decisions pending | New interfaces and dependent Stage B implementation remain blocked; existing-API Stage A proceeds | Producing owner + consuming owners + QA + lead review |
| PR #6 awaiting maintainer review and explicit merge approval | Coordination docs remain on PR branch; reference exact commit | Maintainer/CEO |
| Main previously reported unprotected | Merge policy is procedural, not proven technical enforcement | Owner decides ruleset; no settings change by this preparation |
| Target hardware not verified | Intel UHD/8GB acceptance remains NOT RUN; other QA proceeds | J05 and representative-hardware tester |

Stage A exit: actual owner reports, reviewable separate draft PRs and evidence against unchanged contracts, explicit unresolved failures, and C0 proposals ready for review. Do not mark a role's exit complete just because its prompt is prepared. J06 final release audit waits for an integrated candidate and J05 evidence; no audit session was started here.
