# Changelog

Newest first. Every change that reaches a client's page gets a line here.

Format: what changed, then why it mattered - not the code, the effect.

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
