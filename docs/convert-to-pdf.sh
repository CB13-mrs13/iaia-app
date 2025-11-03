#!/bin/bash

# Script de conversion des fichiers Markdown en PDF pour Enveloppe Soleau
# Usage: bash convert-to-pdf.sh

echo "🔄 Conversion des fichiers .md en PDF pour Enveloppe Soleau..."

# Vérifier si pandoc est installé
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc n'est pas installé."
    echo "📦 Installation via Homebrew..."
    brew install pandoc
fi

# Vérifier si basictex est installé (pour la conversion PDF)
if ! command -v pdflatex &> /dev/null; then
    echo "❌ BasicTeX n'est pas installé."
    echo "📦 Installation via Homebrew..."
    brew install --cask basictex
    echo "⚠️  Vous devrez redémarrer le terminal après l'installation."
    exit 1
fi

# Créer le dossier de sortie
mkdir -p SOLEAU-PDF

# Conversion du document principal
echo "📄 Conversion de ENVELOPPE-SOLEAU-IAIA.md..."
pandoc ENVELOPPE-SOLEAU-IAIA.md \
    -o SOLEAU-PDF/ENVELOPPE-SOLEAU-IAIA.pdf \
    --pdf-engine=pdflatex \
    -V geometry:margin=2cm \
    -V fontsize=11pt \
    --metadata title="Enveloppe Soleau - IAIA" \
    --metadata author="Bruno COUSIN" \
    --metadata date="1er novembre 2025"

# Conversion de l'historique Git
echo "📄 Conversion de HISTORIQUE-GIT-IAIA.txt..."
pandoc HISTORIQUE-GIT-IAIA.txt \
    -o SOLEAU-PDF/HISTORIQUE-GIT-IAIA.pdf \
    --pdf-engine=pdflatex \
    -V geometry:margin=2cm \
    -V fontsize=10pt \
    --metadata title="Historique Git - Preuve d'antériorité IAIA" \
    --metadata author="Bruno COUSIN" \
    --metadata date="1er novembre 2025"

echo ""
echo "✅ Conversion terminée !"
echo "📁 Les fichiers PDF sont dans le dossier: docs/SOLEAU-PDF/"
echo ""
echo "📋 Fichiers générés:"
ls -lh SOLEAU-PDF/*.pdf
echo ""
echo "🎯 Prochaine étape: Ajoutez vos autres documents (captures, logo, ID) dans SOLEAU-PDF/"
