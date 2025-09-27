# Bug Intake Playbook

When reporting a bug, include:

1) What you saw (1–2 lines)
2) Route + steps to reproduce
3) Screenshot (PNG) and, if possible, DOM snippet (outerHTML of container)
4) Expected behaviour (BDD — Given/When/Then)
5) Environment (browser, viewport, OS); console/network logs if relevant

Template:
```
What:
Route:
Steps:
Screenshot:
DOM snippet (optional):
BDD:
- Given ...
- When ...
- Then ...
Env:
Logs:
```

Process:
- I reproduce via Storybook/Playwright if multi-step.
- Create/attach a task (ID) with BDD; implement minimal fix; add to deferred test pass.
- Update session log and link to task.
