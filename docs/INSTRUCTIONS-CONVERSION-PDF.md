# 📄 INSTRUCTIONS - Conversion en PDF

## 🎯 Fichiers à convertir en PDF

Vous devez convertir ces 3 fichiers Markdown en PDF pour finaliser le dossier avocat :

### **1. DOSSIER-AVOCAT-IAIA.md** ⭐ (PRIORITAIRE)
- **Chemin :** `docs/DOSSIER-AVOCAT-IAIA.md`
- **Destination :** `docs/DOSSIER-AVOCAT-IAIA.pdf`
- **Taille :** ~20 pages
- **Importance :** Document principal pour l'avocat

### **2. PROCHAINES-ETAPES.md** 
- **Chemin :** `docs/PROCHAINES-ETAPES.md`
- **Destination :** `docs/PROCHAINES-ETAPES.pdf`
- **Taille :** ~5 pages
- **Importance :** Planning et suivi

### **3. TIMELINE-PROTECTION-IP.md**
- **Chemin :** `docs/TIMELINE-PROTECTION-IP.md`
- **Destination :** `docs/TIMELINE-PROTECTION-IP.pdf`
- **Taille :** ~2 pages
- **Importance :** Visualisation rapide

---

## 🛠️ **Méthode 1 : VS Code (RECOMMANDÉE)** ⭐

### **Étape par étape :**

1. **Ouvrir le fichier dans VS Code**
   - Ouvrir `docs/DOSSIER-AVOCAT-IAIA.md`

2. **Prévisualiser en Markdown**
   - Appuyer sur `Cmd + Shift + V`
   - Le fichier s'affiche formaté

3. **Imprimer en PDF**
   - Appuyer sur `Cmd + P` (Imprimer)
   - En bas à gauche : cliquer sur **"PDF"**
   - Choisir **"Enregistrer au format PDF"**
   - Nom du fichier : `DOSSIER-AVOCAT-IAIA.pdf`
   - Emplacement : `docs/`

4. **Répéter pour les 2 autres fichiers**

---

## 🛠️ **Méthode 2 : Marked 2 (si vous l'avez)**

Si vous avez l'application **Marked 2** installée :

1. Ouvrir le fichier .md avec Marked 2
2. Menu **File → Export → PDF**
3. Enregistrer dans `docs/`

---

## 🛠️ **Méthode 3 : En ligne (rapide)**

### **Site recommandé :** https://www.markdowntopdf.com/

1. Aller sur le site
2. Cliquer sur **"Choose File"**
3. Sélectionner `DOSSIER-AVOCAT-IAIA.md`
4. Cliquer sur **"Convert"**
5. Télécharger le PDF
6. Le déplacer dans `docs/`

---

## 🛠️ **Méthode 4 : Terminal avec pandoc (avancé)**

Si vous avez **pandoc** installé :

```bash
cd /Users/PROJETS/IAIA/CODE/iaia-app/docs

# Convertir le dossier avocat
pandoc DOSSIER-AVOCAT-IAIA.md -o DOSSIER-AVOCAT-IAIA.pdf \
  --pdf-engine=wkhtmltopdf \
  -V geometry:margin=2cm

# Convertir les prochaines étapes
pandoc PROCHAINES-ETAPES.md -o PROCHAINES-ETAPES.pdf \
  --pdf-engine=wkhtmltopdf \
  -V geometry:margin=2cm

# Convertir la timeline
pandoc TIMELINE-PROTECTION-IP.md -o TIMELINE-PROTECTION-IP.pdf \
  --pdf-engine=wkhtmltopdf \
  -V geometry:margin=2cm
```

**Installation de pandoc (si besoin) :**
```bash
brew install pandoc
brew install wkhtmltopdf
```

---

## ✅ **Vérification après conversion**

Ouvrez chaque PDF et vérifiez :

- [ ] Toutes les pages sont présentes
- [ ] Le formatage est correct
- [ ] Les tableaux sont lisibles
- [ ] Les emojis s'affichent (ou sont remplacés)
- [ ] La taille du fichier est raisonnable (< 5 Mo chacun)

---

## 📋 **Checklist finale**

Après conversion, vous devriez avoir :

```
docs/
├── DOSSIER-AVOCAT-IAIA.md        ✅ (existant)
├── DOSSIER-AVOCAT-IAIA.pdf       ⬜ (à créer)
├── PROCHAINES-ETAPES.md          ✅ (existant)
├── PROCHAINES-ETAPES.pdf         ⬜ (à créer)
├── TIMELINE-PROTECTION-IP.md     ✅ (existant)
├── TIMELINE-PROTECTION-IP.pdf    ⬜ (à créer)
```

---

## 🎯 **Une fois les PDF créés**

Revenez me voir et je :
1. Vérifierai que les fichiers sont présents
2. Les ajouterai au commit Git
3. Créerai un commit avec tout le dossier avocat

---

## ❓ **Problème de conversion ?**

Si vous rencontrez des difficultés :
- **Option A :** Utilisez la méthode en ligne (la plus simple)
- **Option B :** Demandez-moi de créer un script automatique
- **Option C :** Convertissez seulement le document principal (DOSSIER-AVOCAT-IAIA.md)

---

**🚀 Commencez par la Méthode 1 (VS Code), c'est la plus rapide !**
