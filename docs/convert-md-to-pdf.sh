#!/bin/bash

# Script de conversion Markdown → PDF pour macOS
# Utilise textutil (préinstallé) et cupsfilter

cd /Users/PROJETS/IAIA/CODE/iaia-app/docs

echo "🔄 Conversion des fichiers Markdown en PDF..."
echo ""

# Fonction de conversion
convert_md_to_pdf() {
    local md_file="$1"
    local pdf_file="${md_file%.md}.pdf"
    
    echo "📄 Conversion de $md_file..."
    
    # Convertir MD → HTML → PDF
    textutil -convert html "$md_file" -output "${md_file%.md}.html"
    cupsfilter "${md_file%.md}.html" > "$pdf_file" 2>/dev/null
    rm "${md_file%.md}.html"
    
    if [ -f "$pdf_file" ]; then
        echo "✅ $pdf_file créé ($(du -h "$pdf_file" | cut -f1))"
    else
        echo "❌ Échec de la conversion de $md_file"
    fi
    echo ""
}

# Convertir les 3 fichiers
convert_md_to_pdf "DOSSIER-AVOCAT-IAIA.md"
convert_md_to_pdf "RECAP-ANALYSE-IAIA-FR.md"
convert_md_to_pdf "SUIVI-PROTECTION-JURIDIQUE.md"

echo "✅ Conversion terminée !"
echo ""
echo "📂 Fichiers PDF créés dans docs/ :"
ls -lh *.pdf | grep -E "(DOSSIER-AVOCAT|RECAP-ANALYSE|SUIVI-PROTECTION)" | awk '{print "   "$9" ("$5")"}'
