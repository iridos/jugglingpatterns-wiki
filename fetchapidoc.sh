#!/bin/bash

curl -s "https://www.jugglingpatterns.de/mediawiki/api.php?action=query&list=allpages&aplimit=500&format=json" \
| jq -r '.query.allpages[].title' \
| while IFS= read -r title; do
    echo "Exportiere: $title"

    # URL-kodierter Titel für die API
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$title'''))")

    # Sicherer Dateiname (kein /, kein Leerzeichen)
    safe_name=$(echo "$title" | tr ' /:' '__')

    # Inhalte holen und konvertieren
    curl -s "https://www.jugglingpatterns.de/mediawiki/api.php?action=query&prop=revisions&titles=$encoded&rvslots=main&rvprop=content&formatversion=2&format=json" \
    | jq -r '.query.pages[0].revisions[0].slots.main.content' \
    | pandoc -f mediawiki -t markdown -o "$safe_name.md"

    # Optional: Leere oder fehlerhafte Dateien löschen
    if [ ! -s "$safe_name.md" ]; then
        echo "Leere Datei für '$title' – wahrscheinlich Fehler beim Abruf." >&2
        rm -f "$safe_name.md"
    fi

done

