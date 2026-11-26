# Zand CE Hub

**درگاه یادگیری انجمن مهندسی کامپیوتر مؤسسه آموزش عالی زند شیراز**

[وب‌سایت](https://shaiinarab.github.io/zand-ce-association/) · [کاتالوگ مسیرها](https://shaiinarab.github.io/zand-ce-association/programs/) · [کتابخانه اسناد](https://shaiinarab.github.io/zand-ce-association/docs/) · [نقشه راه](https://shaiinarab.github.io/zand-ce-association/roadmap/)

> وضعیت برنامه‌ها و اسناد پیشنهادی است. انتشار این وب‌سایت به‌معنی تصویب رسمی انجمن، تأیید زمان‌بندی، یا وابستگی به ACM/IEEE نیست. نام رسمی، مجوزها، استاد مشاور و مسئول هر فعالیت باید توسط مراجع مربوط تأیید شوند.

## معماری

- **Go 1.27.4:** مولد سایت استاتیک، خواندن محتوای Markdown، تولید صفحات و API جست‌وجوی Vercel.
- **htmx 4.0.0:** تعامل تدریجی و دریافت نتایج جست‌وجو از endpoint.
- **TypeScript 7.0.2:** بهبودهای سمت مرورگر؛ کامپایلر native با فرمان `tsgo`.
- **GitHub Pages:** میزبانی رایگان خروجی استاتیک در `dist/`.
- **Vercel:** انتشار خروجی استاتیک به‌همراه Go Function برای جست‌وجوی سروری.

محتوای اصلی فقط یک‌بار در فایل‌های Markdown نگه‌داری می‌شود. `cmd/export` همان محتوا را برای GitHub Pages و Vercel به HTML تبدیل می‌کند. در GitHub Pages، جست‌وجو با TypeScript در مرورگر انجام می‌شود؛ در Vercel، htmx می‌تواند از API جست‌وجوی Go استفاده کند.

## شروع محلی

نیازمندی‌ها: Go 1.27.4 یا جدیدتر، Node.js 22 یا جدیدتر و npm.

```bash
go mod download
npm run check
npm run typecheck
npm run build
```

پیش‌نمایش خروجی استاتیک:

```bash
go run ./cmd/export -out dist
python3 -m http.server 8080 --directory dist
```

سپس `http://localhost:8080` را باز کنید.

## مسیرهای یادگیری

۱. هوش مصنوعی و خلاقیت دیجیتال — [Workshop Zero](https://shaiinarab.github.io/workshop-zero/)  
۲. سیستم‌عامل و زیرساخت — [Bootcraft](https://shaiinarab.github.io/bootcraft-workshops/)  
۳. بلاکچین و DeFi — [آخرین قطرات هایپ](https://shaiinarab.github.io/crypto-hype-last-drops/)  
۴. مهندسی نرم‌افزار و برنامه‌نویسی  
۵. بازی‌سازی و تجربه تعاملی  
۶. اینترنت اشیا و سیستم‌های نهفته  
۷. روباتیک و سامانه‌های خودمختار  
۸. امنیت سایبری و دفاع دیجیتال  
۹. رقابت‌های فتح پرچم (CTF)  
۱۰. شبکه و زیرساخت

سه پروژه مستقل، مرجع اجرایی و چرخه انتشار خود را حفظ می‌کنند. پورتال مرکزی مسیر کشف و دسترسی مشترک را فراهم می‌کند.

## منابع آزاد برای طراحی مسیر

- [OSSU Computer Science](https://github.com/ossu/computer-science)
- [Teach Yourself Computer Science](https://teachyourselfcs.com/)
- [MIT Missing Semester](https://missing.csail.mit.edu/)
- [OpenLearn](https://www.open.edu/openlearn/)
- [Awesome Lists](https://github.com/sindresorhus/awesome)

این منابع برای الهام و پیوند دادن به مطالب اصلی هستند؛ محتوای آن‌ها بدون بررسی مجوز بازنشر نمی‌شود.

## ایمنی، حریم خصوصی و مشارکت

- اطلاعات اعضا، شماره تماس، رضایت‌نامه‌ها و داده شخصی را در مخزن عمومی قرار ندهید.
- هیچ فرم عضویت یا ثبت‌نامی در این نسخه داده شخصی را ارسال یا ذخیره نمی‌کند.
- برای تصویر و صدای اشخاص، رضایت و مجوز لازم است.
- آزمون‌های امنیتی و CTF فقط در آزمایشگاه ایزوله یا هدف دارای مجوز صریح انجام می‌شوند.
- فعالیت فاقد مسئول، مجوز یا حداقل پشتیبانی متوقف یا به تعویق می‌افتد.
- پیشنهادها را از طریق [GitHub Issues](https://github.com/Shaiinarab/zand-ce-association/issues) ثبت کنید؛ کلید، رمز یا داده خصوصی منتشر نکنید.

## ساختار اصلی

- `00-governance` تا `06-research`: محتوای مرجع Markdown.
- `cmd/export`: تولید خروجی HTML ایستا.
- `internal/site`: مدل مسیرها و رندر صفحات.
- `api/search.go`: endpoint جست‌وجوی Vercel با Go.
- `web/static`: CSS و TypeScript.
- `dist`: خروجی تولیدی، خارج از Git.

## مجوز

مجوز و حقوق محتوای شخص ثالث باید برای هر دارایی جداگانه بررسی شود. این مخزن مجوز استفاده از آثار متعلق به دیگران را اعطا نمی‌کند.
