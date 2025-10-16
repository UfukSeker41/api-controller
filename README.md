# 🚀 API Dokümantasyon Gezgini

Next.js 15, React 19 ve TypeScript ile geliştirilmiş modern, tam özellikli bir API dokümantasyon ve test platformu. Postman ve Insomnia benzeri sezgisel bir arayüz ile API'leri keşfedin, test edin ve yönetin.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Özellikler

### 🎯 Temel Özellikler
- **API Testi** - Postman benzeri arayüz ile REST API'leri test edin
- **Dokümantasyon Görüntüleyici** - Kapsamlı API dokümantasyonlarını inceleyin
- **İçe/Dışa Aktarma** - Swagger, OpenAPI ve Postman koleksiyonları desteği
- **Kimlik Doğrulama** - GitHub ve Google OAuth entegrasyonu
- **Karanlık Mod** - Güzel karanlık/aydınlık tema desteği

### 🔧 Gelişmiş Özellikler
- **API Anahtar Yönetimi** - API anahtarlarını güvenli şekilde saklayın ve yönetin
- **Test Geçmişi** - Tüm API test sonuçlarınızı takip edin
- **Favoriler** - Sık kullandığınız API'leri kaydedin
- **Arama ve Filtreleme** - Kategori, kimlik doğrulama türü veya anahtar kelimelere göre API'leri hızlıca bulun
- **Yanıt Analitiği** - Yanıt sürelerini ve başarı oranlarını görüntüleyin
- **Kod Örnekleri** - Birden fazla dil için kullanıma hazır kod örnekleri

## 🛠️ Teknoloji Yığını

- **Framework:** Next.js 15.5.4 (App Router)
- **UI Kütüphanesi:** React 19.1.0
- **Dil:** TypeScript 5
- **Stil:** Tailwind CSS 4.1
- **Kimlik Doğrulama:** NextAuth.js 4.24
- **State Yönetimi:** Zustand 5.0
- **Veri Çekme:** TanStack React Query 5.90
- **Grafikler:** Recharts 3.2
- **HTTP İstemcisi:** Axios 1.12
- **İkonlar:** Heroicons 2.2 & React Icons 5.5

## 📦 Kurulum

### Ön Gereksinimler
- Node.js 18+ 
- npm, yarn veya pnpm

### Adımlar

1. **Depoyu klonlayın**
```bash
git clone https://github.com/yourusername/api-document-explorer.git
cd api-document-explorer
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Ortam değişkenlerini ayarlayın**

Kök dizinde bir `.env.local` dosyası oluşturun:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=gizli-anahtariniz-buraya

# GitHub OAuth
GITHUB_ID=github-client-id-niz
GITHUB_SECRET=github-client-secret-iniz

# Google OAuth
GOOGLE_ID=google-client-id-niz
GOOGLE_SECRET=google-client-secret-iniz
```

4. **Geliştirme sunucusunu çalıştırın**
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

5. **Tarayıcınızı açın**

[http://localhost:3000](http://localhost:3000) adresine gidin

## 🔐 Kimlik Doğrulama Kurulumu

### GitHub OAuth

1. [GitHub Geliştirici Ayarları](https://github.com/settings/developers) sayfasına gidin
2. Yeni bir OAuth Uygulaması oluşturun
3. Yetkilendirme geri çağırma URL'sini şu şekilde ayarlayın: `http://localhost:3000/api/auth/callback/github`
4. Client ID ve Client Secret'ı `.env.local` dosyasına kopyalayın

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com) sayfasına gidin
2. Yeni bir proje oluşturun veya mevcut olanı seçin
3. Google+ API'yi etkinleştirin
4. OAuth 2.0 kimlik bilgileri oluşturun
5. Yetkili yönlendirme URI'sini ekleyin: `http://localhost:3000/api/auth/callback/google`
6. Client ID ve Client Secret'ı `.env.local` dosyasına kopyalayın

## 📁 Proje Yapısı

```
api-document/
├── public/                 # Statik dosyalar
├── src/
│   ├── app/               # Next.js uygulama dizini
│   │   ├── api/          # API rotaları
│   │   ├── auth/         # Kimlik doğrulama sayfaları
│   │   ├── layout.tsx    # Ana düzen
│   │   ├── page.tsx      # Ana sayfa
│   │   └── providers.tsx # Context sağlayıcıları
│   ├── components/        # React bileşenleri
│   │   ├── ApiCard.tsx
│   │   ├── ApiTester.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── hooks/            # Özel React hook'ları
│   │   ├── useApiKeys.ts
│   │   └── useFavorites.ts
│   ├── services/         # İş mantığı
│   │   └── TestHistoryService.ts
│   ├── store/            # State yönetimi
│   │   └── authStore.ts
│   ├── types/            # TypeScript tipleri
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── utils/            # Yardımcı fonksiyonlar
│   │   └── apiDocumentManager.ts
│   └── data/             # Örnek veriler
│       └── sampleApis.ts
├── .env.local            # Ortam değişkenleri (bunu oluşturun)
├── package.json
└── README.md
```

## 🎨 Anahtar Bileşenler

### API Test Aracı
Özel başlıklar, parametreler ve istek gövdesi ile herhangi bir REST API uç noktasını test edin.

### API Yönetimi
API istatistiklerini, dokümantasyonunu, yorumlarını ve test geçmişini tek bir yerde görüntüleyin.

### İçe/Dışa Aktarma
API koleksiyonlarını şu formatlardan içe aktarın:
- Swagger/OpenAPI (JSON/YAML)
- Postman Koleksiyonları
- Özel JSON formatı

### Test Geçmişi
Tüm API testlerinizi şunlarla takip edin:
- Yanıt süreleri
- Durum kodları
- Başarı/başarısızlık oranları
- Detaylı istek/yanıt verileri

## 🚀 Dağıtım

### Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Kodunuzu GitHub'a gönderin
2. Vercel'de deponuzu içe aktarın
3. Ortam değişkenlerini ekleyin
4. Dağıtın!

### Diğer Platformlar

Bu standart bir Next.js uygulamasıdır ve şu platformlara dağıtılabilir:
- Netlify
- AWS Amplify
- DigitalOcean
- Railway
- Render

## 📝 Kullanım Örnekleri

### API Test Etme

1. Listeden bir API seçin
2. Bir uç nokta seçin
3. "Dene" butonuna tıklayın
4. Başlıkları ve parametreleri ekleyin
5. "İstek Gönder" butonuna tıklayın
6. Yanıtı görüntüleyin

### API Anahtarlarını Yönetme

1. API detaylarına gidin
2. "API Anahtarları" sekmesine gidin
3. "Yeni Anahtar Ekle" butonuna tıklayın
4. Anahtarınızı adlandırın ve kaydedin
5. İsteklerinizde kullanın

### Koleksiyonları İçe Aktarma

1. "İçe/Dışa Aktar" butonuna tıklayın
2. Format seçin (Swagger/Postman/OpenAPI)
3. Dosyanızı yükleyin
4. İnceleyin ve onaylayın
5. Test etmeye başlayın!

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen bir Pull Request göndermekten çekinmeyin.

1. Depoyu fork edin
2. Özellik dalınızı oluşturun (`git checkout -b feature/HarikaOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Dalınıza push yapın (`git push origin feature/HarikaOzellik`)
5. Bir Pull Request açın

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Vercel](https://vercel.com/)

---

⭐ Bu projeyi faydalı bulduysanız, lütfen yıldız verin!
