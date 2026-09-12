# Quinteca client status portal

The page a client opens to see where their job is. One URL per client, no login.
Live at **projectstatus.quinteca.com**.

Trello is the only place anyone types anything. The portal reads it and renders it.
Nobody edits this repo to update a job.

---

## How it fits together

```
Trello board (one per client)
        |  read live, every 2 minutes
        v
index.html  --reads-->  client-mapping.json   (URL key -> Trello board ID)
        |
        v
projectstatus.quinteca.com/<client key>
```

| File | What it is |
|---|---|
| `index.html` | The whole portal - markup, styles and logic in one file |
| `client-mapping.json` | Maps each client's URL key to their Trello board ID |
| `_redirects` | Sends every path to `index.html` so client URLs resolve |
| `package.json` | Build metadata only; the page has no build step |

A commit to `main` deploys. There is no staging environment, so anything
committed is live to clients immediately.

---

## Adding a client

1. Create their Trello board (see **Board conventions** below).
2. Add an entry to `client-mapping.json`:

   ```json
   "clientID347-xxxxxx": { "boardId": "<trello board id>", "name": "Client Name" }
   ```

   The key is the URL. The random suffix is what keeps one client from guessing
   another's page, so generate a fresh one - never a sequence.
3. Commit. Send them `https://projectstatus.quinteca.com/clientID347-xxxxxx`.

The Trello board ID is the string in the board's URL: `trello.com/b/<id>/name`.

---

## Board conventions

The portal matches **list names by keyword**, so exact names don't matter but the
keyword does. Rename a list away from these words and its tasks vanish from the page.

| Portal section | List name must contain |
|---|---|
| Recently Completed | `done`, `complete`, `completed` or `finished` |
| Active Work | `in progress`, `doing`, `active` or `current` |
| Coming Up Next | `to do`, `todo`, `backlog` or `planned` |
| Future Work & Additions | `future`, `out of scope`, `additions` or `extra` |
| Scope Changes | `scope change`, `variation` or `change request` |

**Board description** - two optional lines, read verbatim:

```
Completion Date: Friday 9 October 2026
Next Visit: Monday 15 September, 2pm
```

`Completion Date:` fills the **Handover** panel. `Next Visit:` fills **Next on site**
and overrides the automatic version below. Omit a line and its panel hides itself.

**Card due dates** drive the rest:

- **Next on site** is the earliest due date that hasn't been ticked off, unless
  `Next Visit:` is set.
- Each task shows its due date, and lists sort by date rather than card order.
- Times only display when set on the hour or half hour. Trello stamps whatever
  time you happened to be looking at the screen, so anything else is treated as
  noise and hidden.

**Progress** is completed / (completed + in progress + to do). Future Work is
excluded, so an unquoted Phase 2 can't drag the percentage down.

---

## Scope changes

Work agreed after the original quote goes in a list called **Scope Changes**
(`variation` or `change request` also match). It renders in its own section on the
client's page, and sits outside the progress figure — agreeing a change never knocks
the percentage backwards.

**Each card:** the card name is the change, the card description is the explanation
the client reads. Write it for them, not for us. Whether it carries a price is your
call — the page is public to anyone holding the URL.

**Sign-off:** a change shows as *Awaiting your approval* with a link that opens a
pre-filled email to projects@quinteca.com. Add a label whose name contains
**approved** or **signed** and it flips to *Approved*. The label shows on the Trello
board too, so board and client page never disagree.

It is a record, not a contract. Anyone with the URL could click the link, so for
anything material get it in writing the usual way as well.

## Things worth knowing before you change it

**The client sees this immediately.** No staging, no review. Check the preview
tab before committing.

**Cards move, they don't get renamed.** A job progresses by dragging a card from
To Do to In Progress to Done. If a board sits with everything in In Progress, the
client sees a project that's 0% done and scattered across five fronts.

**The board name becomes the headline.** Boards are named
`Client Name [clientID344]`; the portal strips the bracket and shows the reference
on the small line above, so the client reads their own name.

**Trello credentials are in the page.** `index.html` carries a Trello API key and
token in plain text, and the page is public, so anyone who views source can read
them - and they grant write access to the boards, not just read. Moving the Trello
calls behind the Cloudflare Worker would fix this properly. Until then, treat the
key as compromised and rotate it if anything looks wrong.

---

## Change tracking

Every change to this repo goes in `CHANGELOG.md` under the date, newest first.
Commit messages say what changed and why; the changelog is the version a human
reads six months later.
