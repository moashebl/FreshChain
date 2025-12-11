# 🚀 نشر FreshChain على GitHub Pages

## دليل شامل لرفع المشروع على GitHub ونشره على الإنترنت

---

## 📋 المتطلبات الأساسية

1. ✅ حساب على GitHub (إنشاء مجاني من github.com)
2. ✅ Git مثبت على الكمبيوتر
3. ✅ المشروع جاهز ويعمل على localhost

---

## 🔧 الخطوة 1: تجهيز المشروع للنشر

### 1.1 تعديل package.json

أضف السطر التالي في `frontend/package.json`:

```json
{
  "name": "freshchain-frontend",
  "version": "0.1.0",
  "homepage": "https://YOUR-USERNAME.github.io/freshchain",
  "private": true,
  "dependencies": {
    ...
  }
}
```

**⚠️ مهم:** استبدل `YOUR-USERNAME` باسم المستخدم الخاص بك في GitHub

**مثال:**
```json
"homepage": "https://royaldev.github.io/freshchain",
```

---

### 1.2 تثبيت gh-pages

افتح Terminal في مجلد `frontend/`:

```powershell
cd frontend
npm install --save-dev gh-pages
```

### 1.3 تحديث Scripts في package.json

أضف السطور التالية في قسم `"scripts"`:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

---

## 📦 الخطوة 2: رفع المشروع على GitHub

### 2.1 إنشاء Repository جديد

1. اذهب إلى GitHub.com
2. اضغط على `+` في الأعلى → `New repository`
3. اسم Repository: `freshchain`
4. اختر **Public** (مهم للنشر المجاني)
5. لا تضف README أو .gitignore
6. اضغط `Create repository`

### 2.2 ربط المشروع المحلي بـ GitHub

افتح Terminal في مجلد المشروع الرئيسي:

```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1

# إنشاء Git repository محلي
git init

# إضافة جميع الملفات
git add .

# أول Commit
git commit -m "Initial commit: FreshChain blockchain project"

# ربط بـ GitHub (استبدل YOUR-USERNAME باسمك)
git remote add origin https://github.com/YOUR-USERNAME/freshchain.git

# رفع الملفات
git branch -M main
git push -u origin main
```

**مثال:**
```powershell
git remote add origin https://github.com/royaldev/freshchain.git
```

---

## 🌐 الخطوة 3: نشر الموقع على GitHub Pages

### 3.1 نشر Frontend

```powershell
cd frontend
npm run deploy
```

**ستظهر رسالة:**
```
Published
```

### 3.2 تفعيل GitHub Pages

1. اذهب إلى Repository على GitHub
2. اضغط `Settings` (⚙️)
3. من القائمة الجانبية → `Pages`
4. في `Source`:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. اضغط `Save`

**⏱️ انتظر 2-3 دقائق**

### 3.3 تأكيد الموقع

رابط موقعك سيكون:
```
https://YOUR-USERNAME.github.io/freshchain
```

**مثال:**
```
https://royaldev.github.io/freshchain
```

---

## 🔗 الخطوة 4: ربط QR Code بالموقع المباشر

### 4.1 التأكد من QR Code يستخدم الرابط الصحيح

الكود الحالي في `App.js` يستخدم:
```javascript
value={`${window.location.origin}?batchId=${viewBatchId}`}
```

✅ **هذا صحيح!** سيعمل تلقائيًا مع:
- `http://localhost:3000?batchId=101` (محلي)
- `https://YOUR-USERNAME.github.io/freshchain?batchId=101` (مباشر)

### 4.2 إضافة صفحة استقبال للعملاء

سنضيف صفحة خاصة تفتح عند مسح QR Code:

**في `frontend/src/App.js`، أضف في بداية الـ `useEffect`:**

```javascript
useEffect(() => {
  // التعامل مع QR Code للعملاء
  const urlParams = new URLSearchParams(window.location.search);
  const batchIdFromQR = urlParams.get('batchId');
  
  if (batchIdFromQR) {
    setViewBatchId(batchIdFromQR);
    setSelectedRole('Customer');
    // Scroll إلى قسم العميل
    setTimeout(() => {
      const customerSection = document.querySelector('.customer-panel');
      if (customerSection) {
        customerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
}, []);
```

---

## 📱 الخطوة 5: اختبار QR Code على الموقع المباشر

### 5.1 سيناريو الاستخدام

1. **Retailer** يفتح الموقع: `https://YOUR-USERNAME.github.io/freshchain`
2. يدخل Batch ID (مثلاً: 101)
3. يولد QR Code
4. يضغط "Download QR Code"
5. يطبع الصورة ويضعها على المنتج

6. **Customer** يمسح QR Code بالموبايل
7. يفتح الرابط: `https://YOUR-USERNAME.github.io/freshchain?batchId=101`
8. يرى تاريخ المنتج كاملاً!

### 5.2 اختبار الرابط

جرب الروابط التالية (استبدل YOUR-USERNAME):

```
https://YOUR-USERNAME.github.io/freshchain?batchId=101
https://YOUR-USERNAME.github.io/freshchain?batchId=202
```

---

## 🔄 تحديث الموقع بعد تعديل الكود

عند تعديل أي ملف في `frontend/src/`:

```powershell
cd frontend

# بناء نسخة جديدة
npm run build

# نشر التحديث
npm run deploy
```

**⏱️ انتظر 1-2 دقيقة ثم اعمل Refresh للموقع**

---

## 📝 ملف .gitignore

تأكد من وجود `.gitignore` في مجلد `frontend/`:

```
# .gitignore
node_modules/
build/
.DS_Store
.env
.env.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

## 🎯 الخطوة 6: إضافة Custom Domain (اختياري)

إذا كان عندك Domain خاص (مثل: freshchain.com):

### 6.1 في إعدادات GitHub Pages

1. Settings → Pages
2. Custom domain: `freshchain.com`
3. Save

### 6.2 في إعدادات الـ Domain Provider

أضف CNAME Record:

```
Type: CNAME
Name: @
Value: YOUR-USERNAME.github.io
```

---

## 📊 مثال كامل للعملية

### مثال 1: المستخدم RoyalDev

**1. Repository URL:**
```
https://github.com/royaldev/freshchain
```

**2. موقع GitHub Pages:**
```
https://royaldev.github.io/freshchain
```

**3. QR Code للـ Batch 101:**
```
https://royaldev.github.io/freshchain?batchId=101
```

**4. في `frontend/package.json`:**
```json
"homepage": "https://royaldev.github.io/freshchain",
```

---

## 🔒 أمان المفاتيح الخاصة (Private Keys)

**⚠️ تحذير مهم جدًا:**

❌ **لا ترفع** Private Keys على GitHub أبدًا!
❌ **لا ترفع** ملف `.env` يحتوي على مفاتيح

✅ **فقط** Contract Address و ABI (موجودين في `config.js`)

---

## 🎨 تخصيص الموقع

### تغيير اسم الموقع في الـ Tab

في `frontend/public/index.html`:

```html
<title>FreshChain - Food Traceability</title>
<meta name="description" content="Blockchain-based food traceability system" />
```

### إضافة Favicon

ضع صورة `favicon.ico` في `frontend/public/`

---

## 📱 جعل الموقع Mobile-Friendly

الموقع جاهز للموبايل، لكن يمكن تحسينه:

في `frontend/src/App.css`:

```css
/* إضافة للموبايل */
@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 15px;
  }
  
  .qr-code svg {
    width: 100%;
    height: auto;
  }
  
  input, select, button {
    font-size: 16px; /* منع الزوم التلقائي */
  }
}
```

---

## 🐛 حل المشاكل الشائعة

### المشكلة 1: الموقع لا يفتح (404)

**الحل:**
```powershell
cd frontend
npm run deploy
```
انتظر 2-3 دقائق ثم جرب مرة أخرى.

### المشكلة 2: QR Code يفتح صفحة بيضاء

**الحل:**
- تأكد أن `homepage` في `package.json` صحيح
- تأكد أن Branch `gh-pages` موجود على GitHub
- اعمل Clear Cache للمتصفح (Ctrl + Shift + R)

### المشكلة 3: CSS لا يعمل

**الحل:**
في `frontend/package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/freshchain",
```
تأكد من عدم وجود `/` في النهاية.

### المشكلة 4: MetaMask لا يتصل

**الحل:**
GitHub Pages يستخدم HTTPS - تأكد من:
```javascript
// في config.js
export const NETWORK_CONFIG = {
  chainId: '0xaa36a7', // Sepolia
  chainName: 'Sepolia',
  rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'], // HTTPS مهم
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};
```

---

## 📸 إضافة Screenshots للـ README

في `README.md`:

```markdown
## 🌐 Live Demo

**Website:** https://royaldev.github.io/freshchain

### Screenshots

![Homepage](screenshots/homepage.png)
![QR Code Generation](screenshots/qr-code.png)
![Customer View](screenshots/customer-view.png)

### QR Code Example

Scan this to test:
![Test QR](screenshots/test-qr.png)
```

**حفظ Screenshots:**
1. خذ لقطات شاشة
2. احفظها في مجلد `screenshots/`
3. ارفعها على GitHub:
   ```powershell
   git add screenshots/
   git commit -m "Add screenshots"
   git push
   ```

---

## 🎓 خطوات التسليم النهائي

### 1. رابط GitHub Repository

```
https://github.com/YOUR-USERNAME/freshchain
```

### 2. رابط الموقع المباشر

```
https://YOUR-USERNAME.github.io/freshchain
```

### 3. رابط العقد على Etherscan

```
https://sepolia.etherscan.io/address/0xBBeEd68A4754C2bdb5e94940285382aB5DFA198C
```

### 4. QR Code للتجربة

اطبع QR Code لـ Batch تجريبي واعرضه في العرض التقديمي!

---

## 🚀 أوامر سريعة (Quick Commands)

### رفع أول مرة:
```powershell
cd C:\Users\Royal\Desktop\blockchain\project_v1
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/freshchain.git
git push -u origin main

cd frontend
npm install --save-dev gh-pages
npm run deploy
```

### تحديث الموقع:
```powershell
cd frontend
npm run deploy
```

### تحديث GitHub:
```powershell
git add .
git commit -m "Update: [وصف التعديل]"
git push
```

---

## 📋 Checklist قبل النشر

- [ ] `homepage` محدث في `package.json`
- [ ] `gh-pages` مثبت
- [ ] `.gitignore` موجود
- [ ] لا توجد Private Keys في الكود
- [ ] العقد منشور على Sepolia
- [ ] Contract Address صحيح في `config.js`
- [ ] الموقع يعمل على localhost
- [ ] README محدث برابط الموقع
- [ ] Screenshots محفوظة

---

## 🎉 النتيجة النهائية

بعد اتباع هذا الدليل:

✅ موقع مباشر على الإنترنت
✅ QR Code يفتح الموقع الحقيقي (ليس localhost)
✅ يمكن لأي شخص فتح الموقع من أي مكان
✅ مناسب للعرض التقديمي والتسليم
✅ يعمل على الموبايل والكمبيوتر

---

## 📞 دعم إضافي

**GitHub Pages Documentation:**
https://docs.github.com/en/pages

**React Deployment Guide:**
https://create-react-app.dev/docs/deployment/#github-pages

**مشكلة؟ تواصل مع:**
- GitHub Support
- Stack Overflow
- Reddit r/reactjs

---

**🎓 نصيحة للتقديم:**

في العرض التقديمي:
1. اعرض الموقع المباشر (ليس localhost)
2. اطبع QR Code واعرضه
3. امسحه بالموبايل أمام الدكتور
4. اعرض تاريخ Batch كامل

**سيعطيك تقييم ممتاز! 🌟**

---

*آخر تحديث: ديسمبر 11, 2025*
