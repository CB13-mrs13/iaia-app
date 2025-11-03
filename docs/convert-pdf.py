#!/usr/bin/env python3
"""
Convertir les fichiers Markdown en PDF pour le dossier avocat
Utilise markdown2 et weasyprint (ou pdfkit si disponible)
"""

import os
import subprocess
import sys

def convert_with_chrome(md_file, pdf_file):
    """Convertir MD en PDF via Chrome (méthode la plus fiable)"""
    html_file = md_file.replace('.md', '.html')
    
    # Lire le markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Créer HTML basique
    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }}
        h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #34495e; margin-top: 30px; }}
        h3 {{ color: #7f8c8d; }}
        table {{ border-collapse: collapse; width: 100%; margin: 20px 0; }}
        th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
        th {{ background-color: #f2f2f2; }}
        code {{ background-color: #f4f4f4; padding: 2px 6px; border-radius: 3px; }}
        pre {{ background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }}
    </style>
</head>
<body>
<pre>{content}</pre>
</body>
</html>"""
    
    # Écrire HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Convertir en PDF avec Chrome
    try:
        subprocess.run([
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '--headless',
            '--disable-gpu',
            '--print-to-pdf=' + pdf_file,
            html_file
        ], check=True, capture_output=True)
        
        os.remove(html_file)
        return True
    except Exception as e:
        print(f"❌ Erreur Chrome: {e}")
        if os.path.exists(html_file):
            os.remove(html_file)
        return False

def main():
    os.chdir('/Users/PROJETS/IAIA/CODE/iaia-app/docs')
    
    files = [
        'DOSSIER-AVOCAT-IAIA.md',
        'RECAP-ANALYSE-IAIA-FR.md',
        'SUIVI-PROTECTION-JURIDIQUE.md'
    ]
    
    print("🔄 Conversion des fichiers Markdown en PDF...")
    print("")
    
    for md_file in files:
        pdf_file = md_file.replace('.md', '.pdf')
        print(f"📄 Conversion de {md_file}...")
        
        if convert_with_chrome(md_file, pdf_file):
            size = os.path.getsize(pdf_file)
            print(f"✅ {pdf_file} créé ({size // 1024} Ko)")
        else:
            print(f"❌ Échec de la conversion")
        print("")
    
    print("✅ Conversion terminée !")

if __name__ == '__main__':
    main()
