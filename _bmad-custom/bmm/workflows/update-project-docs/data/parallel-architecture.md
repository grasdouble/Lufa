# Parallel Subagent Architecture

**Purpose:** Architecture rationale and mandatory rules for the parallel subagent pattern used in `step-02-update-packages.md`.

---

## Why Parallel Subagents?

- **Speed**: All packages documented simultaneously
- **Context Isolation**: Each package gets a fresh, clean context
- **No Cross-Contamination**: Information from one package doesn't pollute another
- **Better Quality**: Full focus on a single package
- **Error Isolation**: One failure doesn't affect other packages

---

## One Package = One Subagent = PARALLEL

**MANDATORY RULES**:

1. Each package MUST be processed by its own dedicated subagent
2. NEVER process multiple packages in the same subagent call
3. **LAUNCH ALL SUBAGENTS IN PARALLEL** — call ALL `runSubagent` invocations in the SAME `function_calls` block
4. Each subagent receives ONLY the information about its assigned package
5. Wait for ALL subagents to complete before processing results

---

## How Parallel Execution Works

In ONE `function_calls` block, launch all subagents:

```
runSubagent("Document package-a", prompt_for_a)
runSubagent("Document package-b", prompt_for_b)
runSubagent("Document package-c", prompt_for_c)
```

All three execute IN PARALLEL automatically. Do NOT call them sequentially.

---

## Failure Handling

If one subagent fails, it does NOT affect others. Handle each failure independently — see section 4.3 in `step-02-update-packages.md` for the error recovery menu (R/S/M/A).
