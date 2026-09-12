# Changelog

Newest first. Every change that reaches a client's page gets a line here.

Format: what changed, then why it mattered - not the code, the effect.

---

## 12 September 2026

### Sub-tasks

- **Trello checklist items now show under the task**, indented, with a tick box that
  fills in as each one is done. A card like "KNX Device Migration Testing and Sign-off"
  used to tell the client nothing about what actually gets tested — the detail sat in a
  checklist the page never read. The board stays tidy with one card per job, and the
  client still sees the thoroughness.

### Favicon

- **The Q instead of a blank page icon**, in two versions: dark green for light tab
  strips, cream behind `prefers-color-scheme: dark` because the green disappears against
  a dark tab. Also set as the apple-touch-icon, so a client who saves the tracker to
  their phone home screen gets the Q rather than a screenshot of the page.

---

## 12 September 2026

### Scope changes wording

- **The section now says why changes happen, not just that they do.** The kick-off
  email used to carry a paragraph warning the client that scope might change; it read
  as bracing them for bad news before a spanner had been lifted, so it came out of the
  email. The reasoning lives here instead, where it only surfaces once there is an
  actual change on the page to look at — and it makes the point that changes come from
  the building, not from us upselling.

---

## 12 September 2026

### Scope changes

- **New Scope Changes section.** Work agreed after the original quote now has a
  home on the client's page instead of living in email. Cards in a Trello list
  called Scope Changes (or Variations, or Change Requests) render with the change
  described and a status against each one.
- **Client sign-off.** A change shows as *Awaiting your approval* with a link that
  opens a pre-filled email to projects@quinteca.com. Once the card carries a label
  whose name contains "approved" or "signed", it flips to *Approved*. The label is
  visible on the Trello board, so the state is the same in both places.
- **Scope changes sit outside the progress figure**, so agreeing a change doesn't
  knock the percentage backwards.

### Header

- **Page header removed.** The wordmark, tagline and rule above the hero took up a
  third of the first screen and said nothing the client needed. The Q mark now sits
  inside the hero panel, top right. Embedded as a 2KB data URI so the page stays
  self-contained.

---

## 12 September 2026

### Status page redesign

- **New hero panel** carrying the three things a client opens the page to find:
  next site visit, handover date, and what's in hand right now. Previously the
  page opened with a support card and four count tiles, and the client had to
  read the whole page to work out when anyone was turning up.
- **Progress ring** replaces the four stat tiles and the flat progress bar.
  One number reads at a glance instead of four competing for attention.
- **Client reference moved off the headline.** Boards are named
  `Client Name [clientID344]`; the client now sees their own name, with the
  reference on the small line above.
- **Due dates shown against each task**, and lists sorted by date rather than
  Trello card order.
- **Empty sections hide themselves** instead of printing "No tasks in this
  category yet" in an otherwise empty card.
- **Times hidden unless set deliberately.** Trello stamps the current clock time
  when you set a due date, which was surfacing as "Fri 18 Sept, 15:35" on the
  client's page. Times now show only on the hour or half hour.
- **Card names HTML-escaped** before rendering, so a card name containing
  `<` or `&` can't break the page.

### Other

- Support address changed from `install@quinteca.com` to `projects@quinteca.com`,
  matching the shared projects mailbox.
- Added `README.md` documenting how the portal works, how to add a client, and
  the Trello board conventions the page depends on.
- Added this changelog.

---

## Earlier

Not recorded. The portal was built and clients 334, 336, 343, 344, 345 and 346
added before change tracking started.

---

## Known issues

- **Trello credentials are exposed.** `index.html` carries a Trello API key and
  token in plain text on a public page. They grant write access to the boards.
  The fix is to move the Trello calls behind the Cloudflare Worker that already
  handles invoicing. Open.
- **Duplicate client IDs.** 336 is on both Sloan Cooper and David Lodge; 334 is
  on both Kent Albin and the Gentine board. Open.
