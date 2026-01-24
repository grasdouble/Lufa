#!/bin/bash

# 🤖 Script d'Aide: Mise à Jour Documentation après Phase
# Usage: bash scripts/update-docs-after-phase.sh
# Description: Guide interactif pour mettre à jour MASTER-STATUS et Roadmap

set -e

echo "🚀 Mise à Jour Documentation - Assistant"
echo "========================================"
echo ""

# Couleurs pour output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Demander les informations
echo -e "${BLUE}📝 Informations Phase Complétée:${NC}"
echo ""

read -p "Numéro de phase complétée (1-8): " PHASE_NUM
read -p "Nom de la phase (ex: Semantic Tokens): " PHASE_NAME
read -p "Nombre de tokens créés (0 si N/A): " TOKENS_CREATED
read -p "Durée réelle (ex: 2 jours): " DURATION
read -p "Date de complétion (YYYY-MM-DD): " COMPLETION_DATE

echo ""
echo -e "${BLUE}📊 Calcul des métriques...${NC}"
echo ""

# Lire le token count actuel depuis MASTER-STATUS
CURRENT_COUNT=$(grep -oP 'Current Progress: \K\d+' _bmad-output/analysis/MASTER-STATUS.md | head -1)

if [ -z "$CURRENT_COUNT" ]; then
    echo -e "${YELLOW}⚠️  Impossible de lire le count actuel, utiliser 161 par défaut${NC}"
    CURRENT_COUNT=161
fi

# Calculer nouveau total
NEW_TOTAL=$((CURRENT_COUNT + TOKENS_CREATED))
PERCENTAGE=$((NEW_TOTAL * 100 / 361))

echo -e "${GREEN}✅ Métriques calculées:${NC}"
echo "  - Ancien total: ${CURRENT_COUNT}/361"
echo "  - Tokens ajoutés: ${TOKENS_CREATED}"
echo "  - Nouveau total: ${NEW_TOTAL}/361 (${PERCENTAGE}%)"
echo ""

# Déterminer prochaine phase
NEXT_PHASE=$((PHASE_NUM + 1))

# Générer les snippets de mise à jour
echo -e "${BLUE}📋 Snippets à copier-coller:${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  MASTER-STATUS.md - Executive Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat <<EOF

\`\`\`markdown
✅ Phase ${PHASE_NUM}: ${PHASE_NAME} (${TOKENS_CREATED})  - 100% COMPLETE
⏳ Phase ${NEXT_PHASE}: [Next Phase Name] (~XX)   - 0% NEXT 🎯
\`\`\`

Current Progress: ${NEW_TOTAL}/361 tokens (${PERCENTAGE}%)
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  MASTER-STATUS.md - Phase Status Table"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat <<EOF

\`\`\`markdown
| Phase ${PHASE_NUM}   | ✅ Complete | ${TOKENS_CREATED}    | ${DURATION}    | ${COMPLETION_DATE} | \`path/to/phase-${PHASE_NUM}-*.md\` |
\`\`\`
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  roadmap-implementation-v2.0.md - Header"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat <<EOF

\`\`\`markdown
**Dernière mise à jour:** ${COMPLETION_DATE}
**Statut:** 🟢 Phase ${PHASE_NUM} COMPLETED - ${NEW_TOTAL} tokens créés (${PERCENTAGE}% architecture complète)
\`\`\`
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  roadmap-implementation-v2.0.md - Phase Section"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat <<EOF

\`\`\`markdown
## ✅ Phase ${PHASE_NUM}: ${PHASE_NAME} - **COMPLETED**

**Statut:** ✅ **COMPLETE**
**Date Completed:** ${COMPLETION_DATE}
**Durée réelle:** ${DURATION}

### Résultats Phase ${PHASE_NUM}

**Tokens créés:** ${TOKENS_CREATED} tokens

**Livrables:**

- ✅ [Livrable 1]
- ✅ [Livrable 2]

**Documentation:** \`path/to/phase-${PHASE_NUM}-completion-summary.md\`
\`\`\`
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Git Commit Message"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat <<EOF

\`\`\`bash
git add _bmad-output/analysis/MASTER-STATUS.md
git add _bmad-output/analysis/roadmap-implementation-v2.0.md
git add [path-to-phase-${PHASE_NUM}-summary]

git commit -m "docs: update Phase ${PHASE_NUM} completion status

- Phase ${PHASE_NUM} completed: ${PHASE_NAME}
- ${TOKENS_CREATED} tokens created
- Total: ${NEW_TOTAL}/361 tokens (${PERCENTAGE}%)
- Updated MASTER-STATUS and roadmap
- Added phase-${PHASE_NUM}-completion-summary.md"
\`\`\`
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Générer checklist avec statut
echo -e "${BLUE}✅ Checklist de Vérification:${NC}"
echo ""
cat <<EOF
- [ ] Phase ${PHASE_NUM} summary créé
- [ ] MASTER-STATUS.md - Executive Summary mis à jour
- [ ] MASTER-STATUS.md - Phase Status Table mis à jour
- [ ] MASTER-STATUS.md - Section Phase ${PHASE_NUM} mise à jour
- [ ] MASTER-STATUS.md - Section Phase ${NEXT_PHASE} marquée NEXT
- [ ] MASTER-STATUS.md - Metrics & Progress mis à jour
- [ ] MASTER-STATUS.md - Footer date mis à jour
- [ ] roadmap - Header mis à jour
- [ ] roadmap - Vue d'Ensemble mis à jour
- [ ] roadmap - Section Phase ${PHASE_NUM} mise à jour
- [ ] roadmap - Section Phase ${NEXT_PHASE} marquée NEXT
- [ ] roadmap - Footer mis à jour
- [ ] Vérification: Token count identique (${NEW_TOTAL}/361) dans les 2 docs
- [ ] Vérification: Date identique (${COMPLETION_DATE}) dans les 2 docs
- [ ] Vérification: Phase ${PHASE_NUM} = ✅ COMPLETE dans les 2 docs
- [ ] Vérification: Phase ${NEXT_PHASE} = ⏳ NEXT dans les 2 docs
- [ ] Git commit créé
EOF

echo ""
echo -e "${GREEN}✅ Snippets générés avec succès!${NC}"
echo ""
echo -e "${YELLOW}💡 Prochaines étapes:${NC}"
echo "   1. Copier-coller les snippets ci-dessus dans les bons fichiers"
echo "   2. Cocher la checklist au fur et à mesure"
echo "   3. Vérifier la cohérence entre les deux documents"
echo "   4. Créer le git commit"
echo ""
echo -e "${BLUE}📖 Documentation complète:${NC} _bmad-output/analysis/CHECKLIST-update-documentation.md"
echo ""
