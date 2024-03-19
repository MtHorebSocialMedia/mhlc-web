# MHLC Web Contributing Guide

So you want to conribute to the Mt. Horeb Lutheran Church's website?  Great!

Here's a few things to know before getting started!

## Definition of Done

When completing a unit of work, please consider the following questions to know if you're "done"

- How was this tested?
    - Can I write unit tests for the work?
    - Was accessibility taken into account?
    - Was responsiveness taken into account?
- Was it documented?
    - Does this change need any documentation to be added?
    - Does this change or remove any existing documentation?

## Branching Etiquette

Here's a few tips/guidelines to follow for branching!

- Please do not commit directly to main.
- Create a new branch for all new work.
- Keep branches as small as possible
    - This helps keep units of work succint and easier to complete
    - This helps with reviewing PRs as smaller changesets
- Please prefix your branch name with one of the following patterns:
    - `feature/*`: a unit of work representing a new feature or requirement.  Example: `feature/leaders-page`
    - `issue/*`: a unit of work representing a bug or issue fix.  When possible put the issue number in the branch name.  Example: `issue/48-broken-footer-rendering`
    - `upgrade/*`: a unit of work representing a dependency upgrade.  Example: `upgrade/vue-3.1.2`
    - `docs/*`: a unit of work representing adding/updating/fixing any of the documentation.  Example: `docs/adding-a-contributing-guide`

## Pull Requests Etiquete

When your branch is complete and tested, please submit a PR for review.  In the PR, please provide details on:

- Description of work
- How was it tested
- Any particular areas of concern or feedback requested
- Any known issues