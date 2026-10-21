# C0 — interface decision register

Status on 2026-10-21: OPEN, all decisions PENDING. J07 is approved in principle; no new C0 interface is approved by that statement. This register is a coordination request, not a runtime specification or an assertion of owner consent.

Baseline remains `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`: positive G and masses; two bodies; immutable SI state; fixed positive dt; RangeError failures; RenderSnapshot with time/IDs/scaled positions; manual Step/Reset. Stage A must use these interfaces.

## Decision ownership and evidence required

| ID | Decision requiring review | Producer / required reviewers | Required proposal and validation evidence | State |
| --- | --- | --- | --- | --- |
| C0-01 | Sun–Earth initial-condition domain, frame, units, solar-mass and tangential-velocity ranges, safe fixed dt | Physics / UI, QA, lead; Graphics acknowledges coordinate implications | Sourced constants, exact supported ranges, barycentric construction, dt justification, compatibility/migration examples and independent accuracy tests | PENDING |
| C0-02 | Explicit artificial pair-gravity-off mode and guard behavior | Physics / UI, QA, lead; Graphics reviews event display | Positive masses/G preserved, default compatibility, zero-acceleration ballistic semantics, separation guard decision, potential-energy interpretation and intervention continuity tests | PENDING |
| C0-03 | Close-encounter handling, overflow and failure taxonomy | Physics / UI, QA, lead | Endpoint versus between-step guarantee; reproducible failure cases; finite state and diagnostic checks; last-valid-state semantics; whether an additive adapter is needed for existing RangeError callers | PENDING |
| C0-04 | Apply/Reset/toggle lifecycle, experiment epoch and diagnostic segment | UI / Physics, Graphics, QA, lead | Command/state table, reset-to-applied versus defaults, pause boundary, clock/trail/baseline reset semantics, invalid-input retention and intervention examples | PENDING |
| C0-05 | Snapshot/viewport compatibility, bounded trails and reset/intervention communication | Graphics / Physics, UI, QA, lead | Exact proposed data ownership and props, scale/origin, epoch/segment handling, <=256 samples/body lifecycle, disposal and old-client compatibility | PENDING |
| C0-06 | Fixed-step scheduler, publication rate, overload and hidden-tab policy | UI / Physics, Graphics, QA, lead | Proposed <=8 substeps/frame, <=250ms admitted delta, bounded backlog and snapshot rate are review inputs; clock tests, explicit slowdown, duplicate-loop/cleanup checks and dt-domain integration required | PENDING |
| C0-07 | Scientific diagnostics and conservation baselines across interventions | Physics / UI, QA, lead; Graphics reviews displayed markers | Units/frame, scale-normalized errors, validity flags, energy mode/segment semantics, near-zero denominators and reference test fixtures; no cross-intervention conservation claim | PENDING |
| C0-08 | Shared test tooling and producer/consumer contract tests | QA / Physics, Graphics, UI, lead | Exact dependencies/config paths, single writer, isolated runner discovery, baseline-only fixture schema, deterministic test plan and browser provisioning; no production contract invented by QA | PENDING |

Requests are routed through [Physics #1](https://github.com/rafeey7/cosmos-lab/issues/1), [Graphics #2](https://github.com/rafeey7/cosmos-lab/issues/2), [UI #3](https://github.com/rafeey7/cosmos-lab/issues/3), [QA #4](https://github.com/rafeey7/cosmos-lab/issues/4), with consolidated review in [PR #6](https://github.com/rafeey7/cosmos-lab/pull/6). The role labels identify required participants; they do not prove an assigned person or model session has responded.

## Review protocol

1. Producing owner submits a documentation proposal with ID, revision, exact signatures/semantics, SI units, examples, affected paths, compatibility impact, testable acceptance and unresolved alternatives. Include issue/PR and commit links.
2. Each required reviewer records ACCEPT / REQUEST CHANGES / NOT REVIEWED against that exact revision and explains test/consumer implications. Receipt acknowledgement is not acceptance.
3. Lead checks that issues and versioned specs remain consistent. Any new scope needs an explicit reviewed task-spec addendum; product-scope conflicts go to CEO. Never silently replace the original issue criteria.
4. Lead records an approval only when the producer and required reviewers have supplied explicit agreement and evidence. Track decision approval separately from merge approval. If a participant is absent, keep PENDING; do not fill in their answer or fabricate an independent review.
5. Only after the interface is approved can its owner implement the contract on the assigned feature branch. Consumers still wait for the approved producer contract to be available through the agreed dependency workflow; no copying unapproved source or signatures into mocks.
6. Every implementation remains in its separate PR. Landing on main requires maintainer review and CEO merge authorization even after C0 acceptance. No deployment is authorized.

For each decision record: proposal revision/SHA; producer and real session; reviewer identities/session links and responses; evidence; lead approval/rejection with timestamp; superseded revision; affected task-spec amendment; implementation PR/head; merge authorization and merged SHA (or NOT AUTHORIZED / NOT MERGED). Empty fields mean unknown/pending, never implicitly approved.

## Initial approval ledger

| Participant | Actual session confirmed | Response to current register |
| --- | --- | --- |
| Physics owner | No | PENDING |
| Graphics owner | No | PENDING |
| UI owner | No | PENDING |
| QA owner | No | PENDING |
| Lead | Coordination session only | Register prepared; no C0 interface approved |
| CEO | User directive received | J07 coordination approved in principle; PR #6 merge, feature merges and deployment not authorized |

## Handoff dependencies

Discuss independent choices concurrently. C0-01/02/03/07 establish physical meanings; C0-04 consumes those meanings; C0-05 coordinates the view boundary; C0-06 must agree with physical dt and the view update policy. C0-08 can specify baseline test tooling immediately, but new-interface tests depend on the accepted decision revisions.

Do not form a circular wait: owners can submit documentation proposals and counterexamples before any implementation is merged. Existing-API tests and compatibility investigations continue while decisions wait. Prioritize Physics/QA counterexamples and WebGL fallback evidence over trails or cinematic rendering.
