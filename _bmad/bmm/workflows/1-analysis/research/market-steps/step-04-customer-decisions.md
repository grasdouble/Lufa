# Market Research Step 4: Customer Decisions and Journey

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without web search verification

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ Search the web to verify and supplement your knowledge with current facts
- 📋 YOU ARE A CUSTOMER DECISION ANALYST, not content generator
- 💬 FOCUS on customer decision processes and journey mapping
- 🔍 WEB SEARCH REQUIRED - verify current facts against live sources
- 📝 WRITE CONTENT IMMEDIATELY TO DOCUMENT
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show web search analysis before presenting findings
- ⚠️ Present [C] continue option after decision processes content generation
- 📝 WRITE CUSTOMER DECISIONS ANALYSIS TO DOCUMENT IMMEDIATELY
- 💾 ONLY proceed when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Customer behavior and pain points analysis completed in previous steps
- Focus on customer decision processes and journey mapping
- Web search capabilities with source verification are enabled
- **Research topic = "{{research_topic}}"** - established from initial discussion
- **Research goals = "{{research_goals}}"** - established from initial discussion

## YOUR TASK:

Conduct customer decision processes and journey analysis with emphasis on decision factors and journey mapping.

## CUSTOMER DECISIONS ANALYSIS SEQUENCE:

### 1. Begin Customer Decisions Analysis

**UTILIZE SUBPROCESSES AND SUBAGENTS**: Use research subagents, subprocesses or parallel processing if available to thoroughly analyze different customer decision areas simultaneously and thoroughly.

Start with customer decisions research approach:
"Now I'll conduct **customer decision processes analysis** for **{{research_topic}}** to understand customer decision-making.

**Customer Decisions Focus:**

- Customer decision-making processes
- Decision factors and criteria
- Customer journey mapping
- Purchase decision influencers
- Information gathering patterns

**Let me search for current customer decision insights.**"

### 2. Parallel Decisions Research Execution

**Execute multiple web searches simultaneously:**

Search the web: "{{research_topic}} customer decision process"
Search the web: "{{research_topic}} buying criteria factors"
Search the web: "{{research_topic}} customer journey mapping"
Search the web: "{{research_topic}} decision influencing factors"

**Analysis approach:**

- Look for customer decision research studies
- Search for buying criteria and factor analysis
- Research customer journey mapping methodologies
- Analyze decision influence factors and channels
- Study information gathering and evaluation patterns

### 3. Analyze and Aggregate Results

**Collect and analyze findings from all parallel searches:**

"After executing comprehensive parallel web searches, let me analyze and aggregate customer decision findings:

**Research Coverage:**

- Customer decision-making processes
- Decision factors and criteria
- Customer journey mapping
- Decision influence factors

**Cross-Decisions Analysis:**
[Identify patterns connecting decision factors and journey stages]

**Quality Assessment:**
[Overall confidence levels and research gaps identified]"

### 4. Generate Customer Decisions Content

**WRITE IMMEDIATELY TO DOCUMENT**

**Framework Location:**
`data/customer-decision-analysis-framework.md`

Load the customer decision analysis framework from the data file. This framework provides:

- Complete 8-subsection structure for customer decision processes
- Decision-making processes template
- Decision factors and criteria format
- Customer journey mapping structure
- Touchpoint and influence analysis templates
- Source citation formats

Using the framework structure from `data/customer-decision-analysis-framework.md`:

1. **Fill all 8 subsections** with synthesized customer decision content from web searches
2. **Maintain source citations** throughout with verified URLs
3. **Ensure comprehensive coverage** across all decision aspects
4. **Write immediately to document** as per protocols

### 5. Present Analysis and Continue Option

**Show analysis and present continue option:**

"I've completed **customer decision processes analysis** for {{research_topic}}, focusing on customer decision-making.

**Key Decision Findings:**

- Customer decision-making processes clearly mapped
- Decision factors and criteria thoroughly analyzed
- Customer journey mapping completed across all stages
- Decision influencers and touchpoints identified
- Information gathering patterns documented

**Ready to proceed to competitive analysis?**
[C] Continue - Save this to document and proceed to competitive analysis

### 6. Handle Continue Selection

#### If 'C' (Continue):

- **CONTENT ALREADY WRITTEN TO DOCUMENT**
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4]`
- Load: `./step-05-competitive-analysis.md`

## APPEND TO DOCUMENT:

Content is already written to document when generated in step 4. No additional append needed.

## SUCCESS METRICS:

✅ Customer decision-making processes clearly mapped
✅ Decision factors and criteria thoroughly analyzed
✅ Customer journey mapping completed across all stages
✅ Decision influencers and touchpoints identified
✅ Information gathering patterns documented
✅ Content written immediately to document
✅ [C] continue option presented and handled correctly
✅ Proper routing to next step (competitive analysis)
✅ Research goals alignment maintained

## FAILURE MODES:

❌ Relying solely on training data without web verification for current facts

❌ Missing critical decision-making process stages
❌ Not identifying key decision factors
❌ Incomplete customer journey mapping
❌ Not writing content immediately to document
❌ Not presenting [C] continue option after content generation
❌ Not routing to competitive analysis step

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## CUSTOMER DECISIONS RESEARCH PROTOCOLS:

- Research customer decision studies and psychology
- Use customer journey mapping methodologies
- Analyze buying criteria and decision factors
- Study decision influence and touchpoint analysis
- Focus on current decision data
- Present conflicting information when sources disagree
- Apply confidence levels appropriately

## DECISION ANALYSIS STANDARDS:

- Always cite URLs for web search results
- Use authoritative customer decision research sources
- Note data currency and potential limitations
- Present multiple perspectives when sources conflict
- Apply confidence levels to uncertain data
- Focus on actionable decision insights

## NEXT STEP:

After user selects 'C', load `./step-05-competitive-analysis.md` to analyze competitive landscape, market positioning, and competitive strategies for {{research_topic}}.

Remember: Always write research content to document immediately and emphasize current customer decision data with rigorous source verification!
