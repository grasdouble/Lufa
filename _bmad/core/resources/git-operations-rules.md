# Git Operations Rules for BMad Agents

**Version:** 1.0.0  
**Last Updated:** 2026-01-25  
**Applies To:** ALL BMad agents  
**Priority:** 🚨 CRITICAL

---

## 🚨 PRIMARY RULE: NEVER COMMIT WITHOUT AUTHORIZATION

**ALL agents MUST follow this rule without exception:**

> **NEVER run `git commit` or `git push` without explicit user authorization.**

The user MUST have complete control over what gets committed and when.

---

## 📋 Complete Git Operations Ruleset

### Rule 1: No Autonomous Commits 🚨

**FORBIDDEN:**

```bash
# ❌ NEVER do this autonomously
git add .
git commit -m "some message"
git push
```

**REQUIRED:**

```bash
# ✅ ALWAYS do this instead
git status
git diff
# Then STOP and ASK user for permission
```

### Rule 2: Always Ask Permission First

**After preparing changes, ALWAYS ask:**

```
Veux-tu que je commit ces changements maintenant ? 🚀

Fichiers modifiés:
- .gitignore
- _bmad/core/config.yaml
- _bmad-output/README.md

Options:
1. Oui, commit maintenant
2. Non, je vais le faire moi-même
3. Montre-moi d'abord les détails (git diff)
```

### Rule 3: Wait for User Response

**Do NOT proceed until user explicitly:**

- ✅ Says "yes" / "oui" / "commit" / "go ahead"
- ❌ Says "no" / "non" / "wait" / "stop"
- 🔍 Says "review" / "show me" / "details" → Show git diff, then ask again

### Rule 4: Respect User's Decision

**If user says NO:**

- ✅ Acknowledge: "D'accord, je ne commit pas. Les changements sont prêts quand tu veux."
- ✅ Show summary of what WOULD have been committed
- ❌ DO NOT commit
- ❌ DO NOT ask again unless user brings it up

**If user says YES:**

- ✅ Proceed with commit using proper message
- ✅ Show commit confirmation
- ✅ Ask about push separately (if needed)

### Rule 5: Never Assume Permission

**FORBIDDEN assumptions:**

- ❌ "The user wants this committed, so I'll do it"
- ❌ "This is ready, I should commit it now"
- ❌ "The user asked me to create files, so I can commit them"
- ❌ "I'll commit to save the user time"

**CORRECT mindset:**

- ✅ "I prepared the changes. User decides when to commit."
- ✅ "User has final authority over git operations"
- ✅ "I must always ask permission first"

---

## 🔄 Proper Workflow for Git Operations

### Step 1: Prepare Changes

```bash
# Agent makes file changes as requested
# Agent verifies changes are correct
```

### Step 2: Show Status

```bash
git status --short
# Show user what changed
```

### Step 3: ASK Permission

```
Agent: "Veux-tu que je commit ces changements maintenant ? 🚀"
[Wait for user response]
```

### Step 4: Execute Based on Response

**User says YES:**

```bash
git add [files]
git commit -m "meaningful message"
git status  # Verify
# Report success to user
```

**User says NO:**

```
Agent: "D'accord, les changements sont prêts. Tu peux commiter quand tu veux avec:
  git add .
  git commit -m 'your message'
"
```

---

## 🎯 Special Cases

### Case 1: User Explicitly Requests Commit

**User says:** "Crée ce fichier et commit-le"

**Agent response:**

```
✅ Create file
✅ Show what would be committed
⚠️ STILL ASK: "Fichier créé. Veux-tu que je le commit maintenant?"
```

**Why:** User might have changed their mind or want to review first.

### Case 2: Multiple Changes in Session

**If making multiple file changes:**

- ✅ Complete ALL changes first
- ✅ Show comprehensive git status
- ✅ Ask ONCE for permission to commit everything
- ❌ DO NOT ask after each individual file

### Case 3: Fixing Mistakes

**If agent made an error and needs to fix it:**

- ✅ Fix the files
- ✅ Show the corrections
- ✅ Ask permission to commit the fix
- ❌ DO NOT auto-commit fixes

### Case 4: Documentation Updates

**Even for "safe" changes like README updates:**

- ✅ STILL require permission
- ✅ User might want to edit before commit
- ❌ NO exceptions to the authorization rule

---

## ❌ Common Violations to AVOID

### Violation 1: Silent Commits

```bash
# ❌ FORBIDDEN
git add . && git commit -m "update" && git push
```

### Violation 2: Assumed Permission

```bash
# ❌ FORBIDDEN - Don't assume user wants this
# Agent: "I'll commit this for you..."
git commit -m "auto-save"
```

### Violation 3: Batch Commits Without Asking

```bash
# ❌ FORBIDDEN
for file in *.md; do
  git add "$file"
  git commit -m "update $file"
done
```

### Violation 4: Committing After "No"

```
User: "Non, pas maintenant"
Agent: *commits anyway* ❌ FORBIDDEN
```

---

## ✅ Good Examples

### Example 1: Proper Authorization Flow

```
Agent: "J'ai créé ces fichiers:
- _bmad-output/README.md
- _bmad/core/resources/output-organization-rules.md

Git status:
?? _bmad-output/README.md
?? _bmad/core/resources/output-organization-rules.md

Veux-tu que je commit ces changements maintenant ? 🚀"

User: "Oui"

Agent: *executes git commit*
Agent: "✅ Changements committés avec succès!"
```

### Example 2: User Declines

```
Agent: "Fichiers prêts. Veux-tu que je commit maintenant ? 🚀"

User: "Non, je vais revoir d'abord"

Agent: "D'accord, les changements sont prêts. Tu peux commiter quand tu veux avec:
  git add _bmad-output/README.md _bmad/core/resources/output-organization-rules.md
  git commit -m 'Add output organization rules'
"
```

### Example 3: User Wants Details

```
Agent: "Veux-tu que je commit ces changements ? 🚀"

User: "Montre-moi d'abord"

Agent: *shows git diff*
Agent: "Maintenant, veux-tu que je commit ? 🚀"

User: "Oui"

Agent: *executes git commit*
```

---

## 🔒 Security Considerations

### Why This Rule is Critical

1. **User Control** - User must approve what goes in git history
2. **Security** - Prevent accidental commit of secrets/credentials
3. **Quality** - User might want to review/edit before commit
4. **Intent** - User might have changed their mind
5. **Trust** - Agent must respect user's authority over their repository

### What Could Go Wrong Without This Rule

- ❌ Committing sensitive data (API keys, passwords)
- ❌ Committing work-in-progress that breaks builds
- ❌ Creating messy git history user didn't want
- ❌ Pushing to wrong branch accidentally
- ❌ Breaking team collaboration workflows

---

## 📚 Related Rules

- **Output Organization:** See `output-organization-rules.md`
- **File Permissions:** Never write files outside project scope without permission
- **Destructive Operations:** Never run `git reset --hard`, `git push --force`, etc. without explicit permission

---

## 🎓 For Agent Developers

When implementing git operations in agents:

```typescript
async function proposeCommit(changes: FileChange[]) {
  // Show what changed
  await showGitStatus();

  // REQUIRED: Ask for permission
  const response = await askUser(
    'Veux-tu que je commit ces changements maintenant ? 🚀\n' + '1. Oui\n2. Non\n3. Montre-moi les détails'
  );

  // REQUIRED: Wait for and respect response
  if (response === 'oui' || response === 'yes' || response === '1') {
    await executeCommit(changes);
  } else if (response === '3') {
    await showGitDiff();
    await proposeCommit(changes); // Ask again
  } else {
    console.log("D'accord, changements prêts mais non committés.");
  }
}

// ❌ NEVER do this
async function autoCommit(changes: FileChange[]) {
  await git.add('.');
  await git.commit('auto commit'); // FORBIDDEN
}
```

---

## ✅ Compliance Checklist

All agents MUST verify:

- [ ] Never use `git commit` without asking user first
- [ ] Never use `git push` without asking user first
- [ ] Always show `git status` before asking permission
- [ ] Always wait for user response before proceeding
- [ ] Respect user's "no" - don't commit if declined
- [ ] Ask in user's preferred language (Français for Noofreuuuh)
- [ ] Provide clear options (yes/no/review)
- [ ] Report success/failure after authorized commits

---

## 🔄 Version History

| Version | Date       | Changes                      |
| ------- | ---------- | ---------------------------- |
| 1.0.0   | 2026-01-25 | Initial git operations rules |

---

**Priority:** 🚨 CRITICAL  
**Enforcement:** MANDATORY for ALL agents  
**Exceptions:** NONE - This rule has NO exceptions

**Last Updated:** 2026-01-25  
**Maintained By:** BMad Core Team  
**Questions?** This rule is non-negotiable. User ALWAYS authorizes commits.
