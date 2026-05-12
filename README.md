# AI Workshop 2026

In this workshop, we will use Cursor. We will use `composer-2` model throughout.

## Agenda:
1. A Calculator app from scratch using AI
2. Understand about Agent Context, Rules, Skills and Subagents
3. Create a new Rule
4. Create a custom Skill
5. Create new Subagents
6. We learn how to multitask using agents
7. We will use mcp servers


## 1. Create the new app:
1. We use `calculator_app_creation.plan.md` to scaffold the basic calculator app. Just click 'Build' on the plan and we are ready.
2. Lets run the app using `npm run dev`

## 2. Rules: 

1. Review the rule `create_new_branch.mdc`. This rule is to create a new branch everytime I ask the agent to change something int he code.
2. Use `composer-2` in `Agent` mode and run:
```
 Add a C button to clear the Calculator
```
3. It should create this in a new branch: `workshop/....`
4. Lets validate if the Clear button works.

## 3. MCP Servers: 

1. Go to https://cursor.com/docs/context/mcp/directory [need to login]
2. Add Atlassian and authenticate

## 4. Skills:

1. Use this prompt:   
```
/search-company-knowledge tell me about multiverse
```
[This skill is coming from Atlassian plugin we just added]. If you are authenticated, you should be able to see a summary of Multiverse.

2. Lets download a new skill and use it from https://skills.sh/. Type this command to install an accessibility skill [DO INSTALL LOCALLY. In Project Scope]:
```
// RUN ON TERMINAL. NOT A PROMPT!
npx skills add https://github.com/addyosmani/web-quality-skills --skill accessibility
```
3. Now create a new agent and use this skill to assess accessibility problems in the calculator apps in `Ask` mode. Prompt: `use /accessibility skill to audit`

### 4.1. Create a NEW Skill:

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
5. However, you can manually move it to `.agents/skills` so that can be used by Claude Code or something similar.


## 5. Subagents:

1. Subagents can run parallely AND independently. 
2. We will create 2 subagents which can perform different tasks and run them together.
2. The first subagent is to run test coverage. Prompt in `agent` mode:
```
/create-subagent to run the test Coverage
```
3. The second subagent is to get a maximum five pointer summary:
```
/create-subagent to generate summary in maximum 5 pointers.
```
4. Now will run both the subagents together. Prompt in `agent` mode:
```
Use test-coverage subagent to get test coverage. 
also summarize the calculator project technical details using five-bullet-summary subagent.
```
5. If we run an agent to get the coverage and ask the same agent to get a summary of the project, you will see more context is going to be used. This is because, subagents are `independent` and has independent context too.

