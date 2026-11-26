const search = document.querySelector<HTMLInputElement>("#path-search");
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-path-card]"));

if (search && cards.length) {
  search.addEventListener("input", () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const matches = card.textContent?.toLocaleLowerCase().includes(query) ?? false;
      card.hidden = !matches;
      if (matches) visible += 1;
    }
    const empty = document.querySelector<HTMLElement>("#path-empty");
    if (empty) empty.hidden = visible !== 0;
  });
}
