# Git Commit Safety Protocol

**Version:** 1.0  
**Created:** 2026-01-26  
**Status:** Active  
**Applies to:** All agents (BMad Master, sub-agents, future agents)

---

## 🚨 Core Rule

**NEVER commit without explicit user authorization. PERIOD.**

No exceptions. No interpretations. No assumptions.

---

## 📋 Mandatory Pre-Commit Checklist

Before executing **ANY** `git commit` command, the agent **MUST** complete this checklist:

```
🔴 PRE-COMMIT CHECKLIST

[ ] STOP - Do not execute commit yet
[ ] SHOW - Display git status
[ ] SHOW - Display git diff --stat
[ ] ASK - Use mandatory question format (see below)
[ ] WAIT - Wait for explicit user response
[ ] VERIFY - Confirm response contains authorization

Veux-tu que je commit ces changements?
```

**If any step is skipped = PROTOCOL VIOLATION**

---

## 🎯 Mandatory Question Format

**Always use this EXACT format (no variations):**

```
🔴 COMMIT AUTHORIZATION REQUIRED

Ready to commit: [brief description of changes]

Files: [X files]
Changes: +[insertions] -[deletions]

OPTIONS:
A) Oui, commit maintenant
B) Non, montre-moi d'abord [git diff / specific files / autre]
C) Non, ne commit pas encore

Quelle option choisis-tu? (A/B/C)
```

**User must respond with A, B, or C explicitly.**

---

## ✅ Authorization Keywords

**ONLY these responses authorize commit execution:**

### French

- "A" (in response to A/B/C question)
- "oui commit"
- "commit maintenant"
- "go commit"
- "commit" (alone, in direct response to authorization question)

### English

- "A" (in response to A/B/C question)
- "yes commit"
- "commit now"
- "go commit"
- "commit" (alone, in direct response to authorization question)

---

## ❌ Forbidden Assumptions

**These words/phrases DO NOT authorize commit:**

- ❌ "continue"
- ❌ "next steps"
- ❌ "proceed"
- ❌ "go ahead" (unless explicitly "go ahead and commit")
- ❌ "ok"
- ❌ "good"
- ❌ "sounds good"
- ❌ "looks good"
- ❌ "keep going"
- ❌ "move forward"
- ❌ Any ambiguous language

**Rule:** If there is ANY doubt (even 1%) about user intent → DO NOT COMMIT

---

## 🔍 Principle of Intentional Friction

**When in doubt, ASK. Never assume.**

Examples:

| User Says         | Agent Response                                                         |
| ----------------- | ---------------------------------------------------------------------- |
| "continue"        | ❌ AMBIGUOUS → Ask: "Continue with commit or continue with next task?" |
| "next steps"      | ❌ AMBIGUOUS → Ask: "Should I commit first, or skip to next step?"     |
| "oui commit"      | ✅ CLEAR → Execute commit                                              |
| "A" (after A/B/C) | ✅ CLEAR → Execute commit                                              |

---

## 📊 Post-Commit Audit (If Commit Executed)

**Immediately after executing `git commit`, agent MUST write:**

```
✅ COMMIT EXECUTED: [commit hash]

Post-Commit Audit:
- Did I show git status? [YES/NO]
- Did I show git diff --stat? [YES/NO]
- Did I use A/B/C format? [YES/NO]
- Did user explicitly authorize? [YES/NO]
- Authorization phrase: "[exact words user said]"

[If any NO → Protocol violation → Apologize and offer git reset --soft HEAD~1]
```

---

## 🚨 Violation Consequences

### If Protocol Violated

**Agent must immediately:**

1. **Stop** any further git operations
2. **Acknowledge** the violation explicitly
3. **Apologize** to the user
4. **Explain** what went wrong (which step was skipped)
5. **Offer** remediation: `git reset --soft HEAD~1` (undo commit, keep changes)
6. **Wait** for user decision on remediation
7. **Update** this protocol if new edge case discovered

### Example Response

```
🚨 PROTOCOL VIOLATION DETECTED

I committed without following the mandatory checklist.

What I did wrong:
- Skipped the A/B/C question format
- Assumed "continue" meant "commit ok"

I apologize. This violates the Git Commit Safety Protocol.

OPTIONS:
A) Keep the commit as-is (commit hash: abc1234)
B) Undo the commit (git reset --soft HEAD~1) - keeps changes staged
C) Other action

What would you like me to do?
```

---

## 📚 Violation History

### Violation Log

| Date       | Agent       | Context         | Cause                                | Resolution                  |
| ---------- | ----------- | --------------- | ------------------------------------ | --------------------------- |
| 2026-01-26 | BMad Master | Phase 2C commit | Interpreted "continue" as permission | User corrected, commit kept |
| [Previous] | Unknown     | Unknown         | Unknown                              | Unknown                     |

**Purpose:** Track patterns to improve protocol.

---

## 🎯 Special Cases

### Case 1: User Asks "Can you commit this?"

**Agent response:**

```
I can show you what would be committed first.

[Show git status + git diff --stat]

🔴 COMMIT AUTHORIZATION REQUIRED

OPTIONS:
A) Oui, commit maintenant
B) Non, montre-moi les détails d'abord
C) Non, ne commit pas

Quelle option? (A/B/C)
```

### Case 2: User Says "If everything looks good, commit it"

**Agent response:**

```
I've verified the changes [brief summary].

Everything looks good from a technical perspective.

🔴 COMMIT AUTHORIZATION REQUIRED

Ready to commit: [description]

OPTIONS:
A) Oui, commit maintenant
B) Non, montre-moi d'abord
C) Non, attends

Quelle option? (A/B/C)
```

**Key:** Still requires explicit A/B/C choice, no assumption.

### Case 3: Multi-Phase Work

**Scenario:** Working on Phase 2D Sprint 1, Sprint 2, Sprint 3. Commit after each?

**Agent must:**

1. Complete Sprint 1 work
2. Ask explicitly: "Sprint 1 complete. Commit now (A), continue to Sprint 2 first (B), or show me changes (C)?"
3. Wait for explicit response
4. Repeat for each sprint

**NO batching authorization:** "commit after each sprint" ≠ blanket permission. Ask each time.

---

## 🔧 Integration with Other Tools

### When Using Task/Sub-Agent Tool

**If sub-agent needs to commit:**

1. Sub-agent completes work
2. Sub-agent returns to main agent with: "Work complete, ready to commit (but NOT committed)"
3. Main agent asks user with A/B/C format
4. Main agent executes commit only after authorization

**Sub-agents inherit this protocol.**

---

## 📖 Educational: Why This Protocol Exists

### The Problem

**Commits are irreversible actions** (in terms of git history) that:

- Create permanent records
- Trigger CI/CD pipelines
- Affect team members
- Change project state

**User must control when these happen.**

### The Solution

**Mandatory human-in-the-loop for all commits:**

- User reviews changes (via git status/diff)
- User makes explicit decision (A/B/C)
- Agent executes only after authorization
- Creates trust and predictability

### Anti-Pattern: "Move Fast and Break Things"

❌ **Bad:** Agent commits frequently to "save progress"  
✅ **Good:** Agent completes work, shows changes, waits for user decision

---

## 🔄 Protocol Updates

### How to Update This Protocol

1. Identify new edge case or violation pattern
2. Propose update to user
3. Get user approval
4. Update this document
5. Add entry to changelog below

### Changelog

| Version | Date       | Changes                   | Reason                                      |
| ------- | ---------- | ------------------------- | ------------------------------------------- |
| 1.0     | 2026-01-26 | Initial protocol creation | 2 violations occurred, formalization needed |

---

## ✅ Quick Reference Card

**Before ANY commit:**

1. ⏸️ **STOP** - Don't execute yet
2. 👁️ **SHOW** - git status + git diff --stat
3. ❓ **ASK** - Use A/B/C format
4. ⏳ **WAIT** - For explicit response
5. ✅ **VERIFY** - Check authorization keywords
6. ⚡ **EXECUTE** - Only after verification
7. 📝 **AUDIT** - Post-commit checklist

**If ANY doubt → ASK, don't assume.**

---

**Maintained by:** BMad Master Agent  
**Enforced by:** All agents  
**Review frequency:** After each violation or quarterly  
**Next review:** 2026-04-26
