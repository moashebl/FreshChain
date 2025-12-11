# 📋 أوامر النشر - نسخ ولصق مباشرة

## ⚠️ قبل البدء: غير اسم المستخدم

**في ملف:** `frontend/package.json`

**غير السطر:**
```json
"homepage": ".",
```

**إلى:** (استبدل YOUR-USERNAME باسمك على GitHub)
```json
"homepage": "https://YOUR-USERNAME.github.io/freshchain",
```

**مثال:**
```json
"homepage": "https://royaldev.github.io/freshchain",
```

---

## 🔥 الأوامر الجاهزة

### 1️⃣ تهيئة Git ورفع على GitHub

**افتح PowerShell في المجلد الرئيسي وانسخ:**

```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1

git init

git add .

git commit -m "FreshChain: Blockchain Food Traceability System"

git remote add origin https://github.com/YOUR-USERNAME/freshchain.git

git branch -M main

git push -u origin main
```

**⚠️ قبل تنفيذ الأمر الأخير:**
- غير `YOUR-USERNAME` باسمك على GitHub
- تأكد أنك أنشأت Repository اسمه `freshchain` على GitHub

---

### 2️⃣ نشر الموقع على GitHub Pages

```powershell
cd frontend

npm run deploy
```

**⏱️ انتظر 2-3 دقائق**

---

### 3️⃣ تفعيل GitHub Pages (على الموقع)

1. اذهب إلى: `https://github.com/YOUR-USERNAME/freshchain`
2. اضغط **Settings** (⚙️)
3. من القائمة الجانبية → **Pages**
4. في **Source**:
   - **Branch:** اختر `gh-pages`
   - **Folder:** `/root`
5. اضغط **Save**

**⏱️ انتظر 2 دقيقة**

---

## ✅ رابط موقعك

```
https://YOUR-USERNAME.github.io/freshchain
```

---

## 🔄 تحديث الموقع بعد تعديل الكود

```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1

git add .

git commit -m "Update: [وصف التعديل]"

git push

cd frontend

npm run deploy
```

---

## 🧪 اختبار QR Code على الموقع المباشر

### رابط مباشر لباتش:
```
https://YOUR-USERNAME.github.io/freshchain?batchId=101
```

**جرب:**
1. افتح موقعك المباشر
2. سجل كـ Retailer
3. أدخل Batch ID: 101
4. اضغط "Download QR Code"
5. امسح QR Code بالموبايل → سيفتح الرابط أعلاه!

---

## 📱 ملاحظات مهمة

### ✅ الموقع يعمل تلقائياً مع:
- `http://localhost:3000?batchId=101` ← التطوير المحلي
- `https://YOUR-USERNAME.github.io/freshchain?batchId=101` ← الموقع المباشر

### ✅ QR Code الآن يفتح:
- الموقع المباشر (ليس localhost)
- تلقائياً يعرض تفاصيل الباتش
- يعمل على الموبايل والكمبيوتر

---

## 🐛 حل المشاكل

### المشكلة: صفحة 404
**الحل:**
```powershell
cd frontend
npm run build
npm run deploy
```

### المشكلة: CSS لا يعمل
**الحل:** تأكد من `homepage` في `package.json` بدون `/` في النهاية

### المشكلة: git: command not found
**الحل:** ثبت Git من: https://git-scm.com/download/win

---

## 📊 مثال كامل للمستخدم "royaldev"

```powershell
# في package.json
"homepage": "https://royaldev.github.io/freshchain"

# أمر Git
git remote add origin https://github.com/royaldev/freshchain.git

# رابط الموقع النهائي
https://royaldev.github.io/freshchain

# رابط QR Code
https://royaldev.github.io/freshchain?batchId=101
```

---

## 🎯 Checklist النشر

- [ ] غيرت `homepage` في `package.json`
- [ ] أنشأت Repository على GitHub
- [ ] نفذت أوامر Git
- [ ] نفذت `npm run deploy`
- [ ] فعلت GitHub Pages من Settings
- [ ] جربت الموقع المباشر
- [ ] جربت QR Code
- [ ] الموقع يعمل على الموبايل

---

## 🚀 جاهز للتسليم!

**في تقريرك، أضف:**
- ✅ رابط GitHub: `https://github.com/YOUR-USERNAME/freshchain`
- ✅ رابط الموقع المباشر: `https://YOUR-USERNAME.github.io/freshchain`
- ✅ رابط العقد: `https://sepolia.etherscan.io/address/0xBBeEd68A4754C2bdb5e94940285382aB5DFA198C`

---

**💡 نصيحة:** اطبع QR Code واعرضه في البرزنتيشن!
