# Work packages

These versioned task specs satisfy the foundation handoff even when GitHub Issues cannot be created. Each task has a separate branch name; a spec is not evidence that the branch exists remotely. See delivery report for actual remote state.

| Task | Branch | Spec | Depends on |
| --- | --- | --- | --- |
| J02 Physics | `j02-physics` | [spec](J02-physics.md) | Foundation contracts |
| J03 Graphics | `j03-graphics` | [spec](J03-graphics.md) | Foundation render contract; coordinate changes with J02 |
| J04 Product UI | `j04-product-ui` | [spec](J04-product-ui.md) | Foundation contracts; J02/J03 integration |
| J05 QA | `j05-qa` | [spec](J05-qa.md) | J02–J04 integration for final evidence |
| J06 Audit | `j06-audit` | [spec](J06-audit.md) | Foundation initially; J02–J05 before sign-off |

Use one task per PR. No features beyond its acceptance criteria. Keep unverified checklist items open.
