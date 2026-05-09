# AI Workshop 2026

In this workshop, we will use Cursor. We will use `composer-2` model throughout.

### In this workshop we build together:
1. A Calculator app from scratch using AI
2. Understand about Agent Context, Rules, Skills and Subagents
3. We create a new Rule, Skills and Subagents
4. We create a new Skill
5. We create new Subagents
6. We learn how to multitask using agents
7. We will use mcp servers

### Steps we follow:

#### Create the new app:
1. We use `calculator_app_creation.plan.md` to scaffold the basic calculator app. Just click 'Build' on the plan and we are ready.
2. Lets run the app using `npm run dev`

#### Rules: 
1. Review the rule `create_new_branch.mdc`. This rule is to create a new branch everytime I ask the agent to change something int he code.
2. Use `composer-2` in `Agent` mode and run:
```
 Add a C button to clear the Calculator
```
3. It should create this in a new branch: `workshop/....`
4. Lets validate if the Clear button works.

#### MCP Servers: 
1. Go to https://cursor.com/docs/context/mcp/directory
2. Add Atlassian and authenticate

#### Skills:

1. Use this prompt:  `/search-company-knowledge tell me about multiverse` [This skill is coming from Atlassian plugin we just added]. If you are authenticated, you should be able to see a summary of Multiverse.
2. Lets download a new skill and use it from https://skills.sh/. Type this command to install an accessibility skill [DO INSTALL LOCALLY. In Project Scope]:
```
npx skills add https://github.com/addyosmani/web-quality-skills --skill accessibility
```
3. Now create a new agent and use this skill to assess accessibility problems in the calculator apps in `Ask` mode. Prompt: `use /accessibility skill to audit`

##### Create a NEW Skill:

1. We will create a new Custom Skill. We will use a skill called `/create-skill` for this.
2. Use prompt: 
```
/create-skill to add a unit test case based on a test description.
```
3. You will notice your skill `add-unit-test-from-description` is inside `.cursor/skills/. Because this is cursor specific skill.
4. Use this skill to create a test case. Prompt : 
```
use /add-unit-test-from-description to add a test for: 
'any number devided by zero should be an error'
```
4. However, you can manually move it to `.agents/skills` so that can be used by Claude Code or something similar.


#### Subagents:
