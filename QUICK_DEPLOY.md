# 🚀 Quick Deployment Guide

## نشر المشروع في 5 دقائق

### الخطوة 1️⃣: تعديل اسم المستخدم

في `frontend/package.json`، غير:
```json
"homepage": "https://YOUR-USERNAME.github.io/freshchain",
```

**مثال:** إذا كان اسمك `royaldev`:
```json
"homepage": "https://royaldev.github.io/freshchain",
```

---

### الخطوة 2️⃣: تثبيت gh-pages

```powershell
cd frontend
npm install --save-dev gh-pages
```

---

### الخطوة 3️⃣: إنشاء Repository على GitHub

1. افتح github.com
2. اضغط **New Repository**
3. الاسم: `freshchain`
4. اختر **Public**
5. **Create repository**

---

### الخطوة 4️⃣: رفع الكود

```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1

git init
git add .
git commit -m "FreshChain - Blockchain Food Traceability"

# غير YOUR-USERNAME باسمك
git remote add origin https://github.com/YOUR-USERNAME/freshchain.git

git branch -M main
git push -u origin main
```

---

### الخطوة 5️⃣: نشر الموقع

```powershell
cd frontend
npm run deploy
```

**انتظر 2-3 دقائق**

---

### الخطوة 6️⃣: تفعيل GitHub Pages

1. Repository → **Settings**
2. **Pages** (من القائمة الجانبية)
3. **Source**: Branch `gh-pages` ← `/root`
4. **Save**

---

## ✅ جاهز!

**موقعك:**
```
https://YOUR-USERNAME.github.io/freshchain
```

**QR Code مثال:**
```
https://YOUR-USERNAME.github.io/freshchain?batchId=101
```

---

## 🔄 تحديث الموقع لاحقاً

```powershell
cd frontend
npm run deploy
```

---

## 📱 اختبار QR Code

1. افتح الموقع المباشر
2. سجل Retailer → أنشئ QR Code
3. حمل QR Code كصورة
4. امسحها بالموبايل
5. سيفتح الموقع مباشرة على Batch المحدد!

---

**للدليل الكامل:** اقرأ `GITHUB_PAGES_DEPLOYMENT.md`
