import { ExamScenario, SlideItem, WeekModule } from '../types/course';

export const WEEKS: WeekModule[] = [
  {
    id: 'w0',
    tag: 'Modül 0',
    title: 'Ders Tanıtımı ve İzlence',
    pdfName: 'BM103 Ders Tanıtım PDF (6 Sayfa)',
    desc: 'Ders sorumlusu, yardımcı kaynaklar, 13 haftalık konu başlıkları, notlandırma ölçütleri ve sınıf aracı bilgileri.',
    hapBilgiler: [
      {
        badge: 'Akademik Kadro',
        q: 'Ders Sorumlusu ve Asistanı kimlerdir?',
        a: 'Ders Sorumlusu: Doç. Dr. Feyza YILDIRIM OKAY (feyzaokay@gazi.edu.tr, Oda: 137). Dersin Asistanı: Arş. Gör. Zeynep Sözen (zeynepsozen@gazi.edu.tr, Oda: Z-26).',
        slide: 2,
      },
      {
        badge: 'Notlandırma',
        q: 'BM103 dersinin geçme/notlandırma dağılımı nasıldır?',
        a: 'Arasınav (Vize): %30 · Dönem Sonu Sınavı: %40 · Proje-Rapor+Sunum: %30 · Devam: %70 (Geçme-Kalma).',
        slide: 5,
      },
      {
        badge: 'Kaynaklar',
        q: 'Ders Kitabı ve Yardımcı Kaynaklar hangileridir?',
        a: 'Ders Kitabı: Bilgisayar Mühendisliğine Giriş (Papatya Yayıncılık, Rıfat Çölkesen). Yardımcı: Bilgisayar Bilimine Giriş (J. Glenn Brookshear, Dennis Brylow - Nobel Akademik) ve Principles of Information Systems (R. M. Stair, G. W. Reynolds, 2018).',
        slide: 3,
      },
      {
        badge: 'Ders Aracı',
        q: 'PDF sayfasında paylaşılan sınıf kodu nedir?',
        a: 'Sınıf kodu: xkfuqz5g (Ders Araçları ekranı, Sayfa 6).',
        slide: 6,
      },
    ],
    summaryA4: [
      {
        h: 'Künye ve İletişim',
        items: [
          'Ders: BM103 Bilgisayar Mühendisliğinin Temelleri',
          'Ders Sorumlusu: Doç. Dr. Feyza YILDIRIM OKAY · feyzaokay@gazi.edu.tr · Oda: 137',
          'Ders Asistanı: Arş. Gör. Zeynep Sözen · zeynepsozen@gazi.edu.tr · Oda: Z-26',
          'Sınıf kodu: xkfuqz5g',
        ],
      },
      {
        h: 'Değerlendirme ve Devam',
        items: [
          'Arasınav (Vize): %30',
          'Dönem Sonu Sınavı: %40',
          'Proje-Rapor+Sunum: %30',
          'Devam zorunluluğu: %70 (Geçme-Kalma)',
        ],
      },
      {
        h: 'Kaynak Kitaplar',
        items: [
          'Ders Kitabı: Bilgisayar Mühendisliğine Giriş — Rıfat Çölkesen (Papatya Yayıncılık)',
          'Yardımcı 1: Bilgisayar Bilimine Giriş — J. Glenn Brookshear, Dennis Brylow (Nobel Akademik Yayıncılık)',
          'Yardımcı 2: Principles of Information Systems — R. M. Stair, G. W. Reynolds (Cengage Learning USA, 2018)',
        ],
      },
      {
        h: 'İzlence Konuları (13 Başlık)',
        items: [
          'Bilgisayar Mühendisliği Tanımı ve Bileşenleri',
          'Boole Cebri · Algoritmalar · Programlama Dilleri',
          'İşletim Sistemleri · Bilgisayar Ağları · Sayı Sistemleri',
          'Yazılım Mühendisliği · Veri Yapıları · Veritabanı Sistemleri',
          'Dosya Organizasyonu · Akademik Etik · Yapay Zeka',
        ],
      },
    ],
    quiz: [
      {
        q: 'BM103 dersinde Dönem Sonu Sınavı ve Proje-Rapor+Sunum ağırlıkları sırasıyla kaçtır?',
        opts: ['%30 ve %40', '%40 ve %30', '%50 ve %20', '%40 ve %20'],
        ans: 1,
        exp: 'Sayfa 5: Arasınav %30, Dönem Sonu Sınavı %40, Proje-Rapor+Sunum %30, Devam %70.',
      },
      {
        q: 'Ders kitabı olarak belirlenen eser ve yazarı hangisidir?',
        opts: [
          'Bilgisayar Bilimine Giriş - Brookshear',
          'Bilgisayar Mühendisliğine Giriş - Rıfat Çölkesen',
          'Principles of Information Systems - Stair',
          'Algoritmalar - Feyza Yıldırım Okay',
        ],
        ans: 1,
        exp: 'Sayfa 3: Ders Kitabı "Bilgisayar Mühendisliğine Giriş, Papatya Yayıncılık, Rıfat Çölkesen"dir.',
      },
      {
        q: 'BM103 dersinde devam şartı yüzde kaçtır?',
        opts: ['%60', '%70', '%75', '%80'],
        ans: 1,
        exp: 'Sayfa 5 Notlandırma tablosu: DEVAM (%70) Geçme-Kalma.',
      },
    ],
    slides: [
      { n: 1, t: 'BM103 Bilgisayar Mühendisliğinin Temelleri', body: '<p><strong>Doç. Dr. Feyza YILDIRIM OKAY</strong></p>' },
      {
        n: 2,
        t: 'Akademik Kadro ve İletişim',
        body: '<ul><li><strong>Ders Sorumlusu:</strong> Doç. Dr. Feyza YILDIRIM OKAY — feyzaokay@gazi.edu.tr — Oda: 137</li><li><strong>Dersin Asistanı:</strong> Arş. Gör. Zeynep Sözen — zeynepsozen@gazi.edu.tr — Oda: Z-26</li></ul>',
      },
      {
        n: 3,
        t: 'Ders Kitabı ve Yardımcı Kaynaklar',
        body: '<ul><li><strong>Ders Kitabı:</strong> Bilgisayar Mühendisliğine Giriş, Papatya Yayıncılık, Rıfat Çölkesen</li><li><strong>Yardımcı Kaynaklar:</strong> Bilgisayar Bilimine Giriş (Nobel Akademik Yayıncılık, J. Glenn Brookshear, Dennis Brylow); Principles of Information Systems (R. M. Stair, G. W. Reynolds, Cengage Learning USA 2018)</li></ul>',
      },
      {
        n: 4,
        t: 'İçerik',
        body: '<ul><li>Bilgisayar Mühendisliği Tanımı ve Bileşenleri</li><li>Boole Cebri</li><li>Algoritmalar</li><li>Programlama Dilleri</li><li>İşletim Sistemleri</li><li>Bilgisayar Ağları</li><li>Sayı Sistemleri</li><li>Yazılım Mühendisliği</li><li>Veri Yapıları</li><li>Veritabanı Sistemleri</li><li>Dosya Organizasyonu</li><li>Akademik Etik</li><li>Yapay Zeka</li></ul>',
      },
      {
        n: 5,
        t: 'Notlandırma',
        body: '<table class="data-table"><tr><th>Ölçüt</th><th>Oran / Durum</th></tr><tr><td>ARASINAV (VİZE)</td><td>%30</td></tr><tr><td>DÖNEM SONU SINAVI</td><td>%40</td></tr><tr><td>PROJE-RAPOR+SUNUM</td><td>%30</td></tr><tr><td>DEVAM (%70)</td><td>Geçme-Kalma</td></tr></table>',
      },
      {
        n: 6,
        t: 'Ders Araçları',
        body: '<p>Çevrimiçi sınıf platformu (Bilgisayar Mühendisliğinin Temelleri) — Sınıf kodu: <strong>xkfuqz5g</strong></p>',
      },
    ],
  },

  {
    id: 'w1',
    tag: 'Hafta 1',
    title: 'Bilgisayar Mühendisliği Tanımı ve Bileşenleri',
    pdfName: 'Bilgisayar Mühendisliği Tanımı ve Bileşenleri (50 Sayfa)',
    desc: 'Bilgisayar ve bilgisayar mühendisliği tanımı, tarihsel kuşaklar (bilgisayar öncesi ve 1-5. kuşaklar), 5 temel işlev, iç/dış/ek donanımlar ve yazılımlar.',
    hapBilgiler: [
      {
        badge: 'Bilgisayar Öncesi',
        q: '1642 Pascal, 1671 Leibniz, 1800 Jacquard ve 1820 Charles Babbage katkıları nelerdir?',
        a: 'Pascal (1642): Dişli çarklarla toplama-çıkarma. Leibniz (1671): Çarpma-bölme ekledi. Jacquard (1800): Dokuma makinesi ve delikli kart sistemi. Babbage (1820): Delikli kartı hesapta kullanan Analitik Makine.',
        slide: 6,
      },
      {
        badge: 'IBM Kökeni',
        q: 'Herman Hollerith (1890) ve IBM (1924) bağlantısı nedir?',
        a: 'Hollerith 1890 seçimlerinde delikli kart + elektrik sinyali sistemi kullandı. 1911\'de şirketi birleşerek Computer-Recording-Company, 1924\'te International-Business-Machines (IBM) corporation adını aldı.',
        slide: 7,
      },
      {
        badge: '1. Kuşak (1940-58)',
        q: 'Mark I ve ENIAC arasındaki temel fark nedir?',
        a: 'Mark I (1944): 18m×2,5m, sn\'de 5-10 işlem, programı sürekli yürüten ilk bilgisayar ama ELEKTRONİK DEĞİL. ENIAC (1946): İlk genel amaçlı bilgisayar, 30 ton, 130 m², vakumlu tüp teknolojisi.',
        slide: 8,
      },
      {
        badge: '2. & 3. Kuşak',
        q: '2. Kuşak ve 3. Kuşak temel teknolojisi ve ilk modelleri nelerdir?',
        a: '2. Kuşak (1958-1964): Transistör (~10.000 adet, el ile monte), ilk model IBM 1401. 3. Kuşak (1965-1971): Entegre devre, ilk CPU, işletim sistemi, manyetik diskler, ilk model IBM 360.',
        slide: 14,
      },
      {
        badge: 'İlk PC & Türkiye',
        q: 'İlk ekrana sahip PC, ilk klavye-fareli PC ve Türkiye\'deki ilk bilgisayar hangileridir?',
        a: 'İlk ekrana sahip: IBM PC. İlk klavye ve fareye sahip: Macintosh. Türkiye\'deki ilk bilgisayar: IBM 650-Data (1960). Programma 101 (1962, 1 MHz) ve Altair 8800 de öncü kişisel bilgisayarlardır.',
        slide: 16,
      },
      {
        badge: 'İlk Virüsler',
        q: 'Kabul edilen ilk virüs ve ilk kontrol dışı virüs hangileridir?',
        a: 'The Creeper (1971): ARPANET\'te deney amaçlı ve zararsız ("I\'m the creeper, catch me if you can!"). Elk Cloner (1982): Apple DOS 3.3\'e bulaşan ilk kontrol dışı virüs (kısa şiir gösterir).',
        slide: 22,
      },
      {
        badge: '4. & 5. Kuşak',
        q: '4. ve 5. Kuşak dönüm noktaları nelerdir?',
        a: '4. Kuşak (1972-1990): Silikon yonga/mikroişlemci, ilk mikroişlemci Intel 4004, CD\'ler, ağlar. 5. Kuşak (1990-...): Yapay Zekâ teknolojileri, Kasparov ile satranç maçı yapan Deep Blue.',
        slide: 20,
      },
      {
        badge: 'RAM vs ROM',
        q: 'RAM ve ROM arasındaki temel fark nedir?',
        a: 'RAM (Ana bellek): Çalıştırılan programlar geçici yüklenir, elektrik kesilince tüm bilgiler silinir. ROM (Yalnız Okunabilir Bellek): Bilgiler kalıcıdır, BIOS/UEFI başlangıç kontrol programlarını içerir.',
        slide: 33,
      },
      {
        badge: 'HDD vs SSD',
        q: 'HDD ve SSD farkı nedir?',
        a: 'HDD (Hard Disk Drive): Manyetik kayıt, dönen diskler (hareketli parça var). SSD (Solid State Disk): Flaş bellek kullanır, hareketli parça yoktur, elektrik kesilse de veri kalır, daha hızlıdır.',
        slide: 35,
      },
      {
        badge: 'Optik & Güç',
        q: 'Güç kaynağı voltaj dönüşümü ve CD/DVD kapasiteleri nedir?',
        a: 'Güç kaynağı: 220 Volt şebekeyi 12 Volt\'a düşürür. CD-ROM: 650 MB+ (CD-R: tek kayıt, CD-RW: yeniden yazılabilir). DVD: 4,7 GB.',
        slide: 37,
      },
    ],
    summaryA4: [
      {
        h: 'Temel Tanımlar ve Amaç',
        items: [
          'Bilgisayar: Veri alıp işlem/karşılaştırma yapan, dış bellekte saklayan, yazılı/ses/görüntü çıktı veren elektronik makine.',
          'Bilgisayar Mühendisliği: Bilgisayar sistemlerinin yapısı, tasarımı, geliştirilmesi ve kullanımlarını içerir.',
          '5 Temel İşlev: Girdi · Aritmetik · Veri Saklama · Koordinasyon ve Kontrol · Çıktı.',
          'Bileşenler: Donanım (Hardware) + Yazılım (Software) — ikisi bir arada olmadan çalışmaz.',
        ],
      },
      {
        h: 'Bilgisayar Öncesi Dönem',
        items: [
          '1642 Pascal: Dişli çarklarla toplama-çıkarma.',
          '1671 Leibniz: Çarpma ve bölme ekledi.',
          '1800 Jacquard: Dokuma makinesi, delikli kart.',
          '1820 Charles Babbage: Analitik Makine.',
          '1854 George Boole: Boole cebri.',
          '1890 Herman Hollerith: Delikli kart + elektrik sinyali (1890 seçimleri).',
          '1911 Computer-Recording-Company → 1924 IBM.',
        ],
      },
      {
        h: 'Bilgisayar Kuşakları (1–5)',
        items: [
          '1. Kuşak (1940–58): Vakum tüpleri, manyetik teyp, makine dili, aşırı ısı/enerji. Mark I (1944, elektronik değil), ENIAC (1946, ilk genel amaçlı, 30 ton, 130 m²), EDVAC, UNIVAC.',
          '2. Kuşak (1958–64): Transistör (~10.000 adet, el ile monte). İlk: IBM 1401.',
          '3. Kuşak (1965–71): Entegre devre, ilk CPU, işletim sistemi, manyetik diskler. İlk: IBM 360.',
          '4. Kuşak (1972–90): Silikon yonga/mikroişlemci (ilk: Intel 4004), Apple I, IBM PC, CD, ağlar.',
          '5. Kuşak (1990–...): Yapay zekâ, Deep Blue (Kasparov satranç maçı).',
        ],
      },
      {
        h: 'İlk Kişisel Bilgisayarlar ve Virüsler',
        items: [
          'Programma 101 (1962): 1 MHz işlemci hızı.',
          'Altair 8800 · IBM PC (ilk ekrana sahip) · Macintosh (ilk klavye+fare).',
          'Türkiye\'deki ilk bilgisayar: IBM 650-Data (1960).',
          'İlk virüs: The Creeper (1971, ARPANET, zararsız).',
          'İlk kontrol dışı virüs: Elk Cloner (1982, Apple DOS 3.3).',
        ],
      },
      {
        h: 'Donanım Birimleri',
        items: [
          'İç Donanım: Anakart · CPU (Aritmetik/Mantık Birimi + Denetim Birimi) · GPU · RAM (geçici) · ROM (kalıcı, BIOS/UEFI) · HDD (manyetik dönen disk) · SSD (flaş bellek, hareketsiz) · Güç Kaynağı (220V → 12V, fanlı).',
          'Dış Donanım: Klavye · Fare/Touchpad · Ekran/Monitör (çözünürlük).',
          'Ek Donanım: Yazıcı, Çizici (Plotter), Tarayıcı, Ses Kartı, Hoparlör, Mikrofon, Kamera, TV kartı, Ekran Filtresi, Sunu Cihazı, Ağ Kartı, UPS, CD-ROM (650 MB, CD-R/RW), DVD (4,7 GB).',
        ],
      },
      {
        h: 'Yazılım Sınıflandırması',
        items: [
          'İşletim Sistemleri: Microsoft (Windows 98..11) · Linux (Debian, Ubuntu, Fedora, OpenSuse, yerli Pardus) · Apple (Macintosh..MacOS 12.6).',
          'Uygulama Yazılımları: Office (Word, Excel, PowerPoint), Oyunlar, Haberleşme (Skype), Güvenlik (Antivirüs, Firewall), Tarayıcılar (Chrome, Opera, Firefox), Otomasyon.',
        ],
      },
    ],
    quiz: [
      {
        q: 'İnsanlık tarihinde geliştirilen genel amaçlı ilk bilgisayar hangisidir ve kaç yılında tamamlanmıştır?',
        opts: ['Harvard Mark I (1944)', 'ENIAC (1946)', 'IBM 1401 (1958)', 'UNIVAC (1950)'],
        ans: 1,
        exp: 'Sayfa 8: İnsanlık tarihinde geliştirilen genel amaçlı ilk bilgisayar 1946 yılında tamamlanan ENIAC\'tır (30 ton, 130 m²).',
      },
      {
        q: 'Türkiye\'ye gelen ilk bilgisayar modeli ve yılı hangisidir?',
        opts: ['IBM 1401 (1958)', 'IBM 650-Data (1960)', 'IBM 360 (1965)', 'Programma 101 (1962)'],
        ans: 1,
        exp: 'Sayfa 16: Türkiyedeki ilk bilgisayar – IBM 650-Data (1960).',
      },
      {
        q: '1971\'de ARPANET\'te deney amaçlı geliştirilen kabul edilen ilk bilgisayar virüsü hangisidir?',
        opts: ['Elk Cloner', 'The Creeper', 'Apple DOS', 'Deep Blue'],
        ans: 1,
        exp: 'Sayfa 22: İlk bilgisayar virüsü ARPANET\'teki "The Creeper" (1971, zararsız). "Elk Cloner" ise 1982\'deki ilk kontrol dışı virüstür.',
      },
      {
        q: 'Şebeke elektriğini (220 Volt) bilgisayar için gerekli olan 12 Volt\'a ayarlayan iç donanım birimi hangisidir?',
        opts: ['Anakart', 'Kesintisiz Güç Kaynağı', 'Güç Kaynağı (Power Supply)', 'Denetim Birimi'],
        ans: 2,
        exp: 'Sayfa 37: Güç Kaynağı (Power Supply) şebeke elektriğini (220Volt) 12Volt\'a ayarlar.',
      },
      {
        q: 'PDF\'te "Yerli işletim sistemi" olarak belirtilen Linux dağıtımı hangisidir?',
        opts: ['Ubuntu', 'Debian', 'Pardus', 'Fedora'],
        ans: 2,
        exp: 'Sayfa 48: İşletim Sistemleri: Linux altında "Pardus (Yerli işletim sistemi)" yer almaktadır.',
      },
      {
        q: 'CD-ROM ve DVD için PDF\'te verilen depolama kapasiteleri sırasıyla nedir?',
        opts: ['650 MB ve 4,7 GB', '700 MB ve 8,5 GB', '512 MB ve 4 GB', '650 MB ve 2,4 GB'],
        ans: 0,
        exp: 'Sayfa 44: CD-ROM 650 MB ya da daha fazla veri; DVD 4,7 GB veri depolayabilir.',
      },
    ],
    slides: [
      { n: 1, t: 'Bilgisayar Mühendisliği Tanımı ve Bileşenleri', body: '<p>BM103 Bilgisayar Mühendisliğinin Temelleri — Doç. Dr. Feyza YILDIRIM OKAY</p>' },
      {
        n: 2,
        t: 'Bilgisayar ve Bilgisayar Mühendisliği Nedir?',
        body: '<ul><li><strong>Bilgisayar:</strong> Kullanıcıdan aldığı veri/bilgilerle işlem ve karşılaştırma yapabilen, dış belleklerde (hard disk, CD, DVD) saklayabilen, yazılı/ses/görüntü çıktı verebilen elektronik makinelerdir.</li><li><strong>Bilgisayar Mühendisliği:</strong> Bilgisayar sistemlerinin yapısı, tasarımı, geliştirilmesi ve kullanımlarını içeren mühendislik dalıdır.</li></ul>',
      },
      {
        n: 3,
        t: 'Amaç ve Başlıca Görev Alanları',
        body: '<ul><li><strong>Amaç:</strong> Programlanacak sistemlerin tasarımını öğretmek; platform ve teknolojilerin geliştirilmesi için bilgi birikimi kazandırmak.</li><li><strong>Görev Alanları:</strong> Kaliteli donanım ve yazılım geliştirmek; işletim sistemi ve uygulama yazılımı hazırlamak; veritabanı uygulamaları; bilgisayar ağları projelendirmek; bilgisayar güvenliği önleyici sistemler tasarlamak.</li></ul>',
      },
      {
        n: 4,
        t: 'Bilgisayar Mühendisliği Konuları',
        body: '<ul><li><strong>Donanım:</strong> Sayısal sistemler, Gömülü sistemler, Sayısal sinyal işleyiciler.</li><li><strong>Yazılım:</strong> Algoritma tasarımı, Veritabanı tasarımı, Bilgisayar Ağları, Veri Güvenliği, Web tasarımı ve programcılığı, Gerçek zamanlı işletim sistemleri, Yapay zeka.</li></ul>',
      },
      {
        n: 5,
        t: 'Bilgisayar Sistemlerinin Gelişimi (Sınıflandırma)',
        body: '<p>Bilgisayar Öncesi Dönem ve Bilgisayar Dönemi: 1. Kuşak (1950-1958), 2. Kuşak (1958-1964), 3. Kuşak (1965-1971), 4. Kuşak (1972-1990), 5. Kuşak (1990 ve Sonrası).</p>',
      },
      {
        n: 6,
        t: 'Bilgisayar Öncesi Dönem (1642–1820)',
        body: '<ul><li><strong>1642-PASCAL:</strong> Dişli çarklarla toplama-çıkarma yapan hesap makinesi.</li><li><strong>1671-LEIBNIZ (PDF\'te LEIBNTIZ):</strong> Çarpma ve bölme işlevleri ekledi.</li><li><strong>1800-JACQUARD (PDF\'te JACGUARD):</strong> Dokuma makinesi ve delikli kart sistemi.</li><li><strong>1820-CHARLES BABBAGE:</strong> Delikli kartı hesapta kullanan Analitik Makine.</li></ul>',
      },
      {
        n: 7,
        t: 'Bilgisayar Öncesi Dönem (1854–1924)',
        body: '<ul><li><strong>1854-GEORGE BOOLE:</strong> Boole cebrini buldu.</li><li><strong>1890-HERMAN HOLLERITH:</strong> Delikli kartlarla elektrik sinyali sistemi (1890 seçimleri).</li><li><strong>1911:</strong> Computer-Recording-Company.</li><li><strong>1924:</strong> International-Business-Machines corporation (IBM).</li></ul>',
      },
      {
        n: 8,
        t: 'Birinci Kuşak (1940–1958)',
        body: '<ul><li><strong>1944 Harvard Mark I:</strong> Saniyede 5-10 işlem, 18M uzunluk, 2,5M yükseklik, insan müdahalesiz programı yürüten ilk bilgisayar ama elektronik değildi.</li><li><strong>1946 ENIAC:</strong> İlk genel amaçlı bilgisayar, 30 ton, 130 m².</li><li><strong>Vakumlu tüp teknolojisi:</strong> ENIAC, EDVAC, UNIVAC.</li></ul>',
      },
      {
        n: 9,
        t: '1. Kuşak Temel Özellikleri',
        body: '<ol><li>İşlemci olarak çok büyük vakum tüpleri</li><li>Fazla enerji harcama</li><li>Çevreye fazla ısı yayma</li><li>Veri programlarını ana belleklerinde tutma</li><li>Manyetik teyp ile saklama</li><li>Makine dilinde programlama</li></ol>',
      },
      {
        n: 14,
        t: 'İkinci Kuşak (1958–1964)',
        body: '<ul><li>Transistör teknolojisi (ortalama 10.000 transistör, tabloya el ile monte).</li><li>İlk bilgisayar: <strong>IBM 1401</strong> (Sayfa 15: Kart Okuma-Delme, İşlemci Ünitesi, Yazıcı).</li><li>Daha küçük boyut, yüksek performans, az enerji/ısı.</li></ul>',
      },
      {
        n: 16,
        t: 'İlk Kişisel Bilgisayarlar',
        body: '<ul><li>Programma 101 (1962) — İşlemci hızı 1 MHz</li><li>Altair 8800</li><li>IBM PC — ilk ekrana sahip</li><li>Macintosh — ilk klavye ve fareye sahip</li><li>Türkiye\'deki ilk bilgisayar — IBM 650-Data (1960)</li></ul>',
      },
      {
        n: 17,
        t: 'Üçüncü Kuşak (1965–1971)',
        body: '<ul><li>Entegre devre teknolojisi (transistörler bir araya getirildi).</li><li>İlk Merkezi İşlem Birimi (CPU) yapıldı; işletim sistemi altında programlar çalıştırıldı.</li><li>İlk model: <strong>IBM 360</strong> (Sayfa 19: IBM 700, IBM 360).</li><li>Sayfa 18: Düşük maliyet, yüksek güvenirlik, manyetik diskler.</li></ul>',
      },
      {
        n: 20,
        t: 'Dördüncü Kuşak (1972–1990)',
        body: '<ul><li>Silikon yonga / mikroişlemci teknolojisi (avuç içine sığacak küçüklük).</li><li>İlk mikroişlemci: <strong>Intel 4004</strong>. Apple I, IBM PC üretildi.</li><li>Sayfa 21: Daha hızlı işlem, disk ve CD\'ler, yapay zekâ kavramı, ağ sistemleri, taşınabilirlik.</li></ul>',
      },
      {
        n: 22,
        t: 'İlk Bilgisayar Virüsü',
        body: '<ul><li><strong>The Creeper (1971):</strong> ARPANET\'te deney amaçlı, zararsız ilk virüs ("I\'m the creeper, catch me if you can!").</li><li><strong>Elk Cloner (1982):</strong> Apple DOS 3.3\'e bulaşan ilk kontrol dışı virüs (kısa bir şiir gösterdi).</li></ul>',
      },
      {
        n: 23,
        t: 'Beşinci Kuşak (1990–...)',
        body: '<ul><li>Yapay Zekâ teknolojileri kullanılan bilgisayarlar.</li><li>Örnek: Kasparov ile satranç maçı yapan <strong>Deep Blue</strong> (Sayfa 24).</li></ul>',
      },
      {
        n: 26,
        t: 'Bilgisayar Sistemlerinin İşlevleri (Sayfa 25–26)',
        body: '<p>Sayfa 25: Giriş – İşleme – Çıktı (Bellek ↔ CPU). Sayfa 26 (5 temel işlev):</p><ul><li>Girdi İşlemleri</li><li>Aritmetik İşlemler (çarpma, toplama, çıkarma, bölme, üs alma)</li><li>Veri Saklama İşlemleri</li><li>Koordinasyon ve Kontrol İşlevi</li><li>Çıktı İşlemleri</li></ul>',
      },
      {
        n: 29,
        t: 'Donanım Birimleri: İç, Dış ve Ek Donanım (Sayfa 28–44)',
        body: '<p>Bilgisayarlar <strong>yazılım (software)</strong> ve <strong>donanım (hardware)</strong> bileşenlerinden oluşur; ikisinin de bir arada olması şarttır.</p><ul><li><strong>İç Donanım (Sayfa 29–37):</strong> Anakart, CPU (ALU + Denetim Birimi), GPU, RAM (geçici, elektrik kesilince silinir), ROM (kalıcı, BIOS/UEFI), HDD (manyetik dönen disk), SSD (flaş bellek, hareketsiz), Güç Kaynağı (220V→12V).</li><li><strong>Dış Donanım (Sayfa 38–40):</strong> Klavye, Fare/Touchpad, Ekran/Monitör (çözünürlük).</li><li><strong>Ek Donanımlar (Sayfa 41–44):</strong> Yazıcı, Çizici, Tarayıcı, Ses Kartı, Hoparlör, Mikrofon, Kamera, TV kartı, Ekran Filtresi, Sunu Cihazı, Ağ Kartı, Kesintisiz Güç Kaynağı, CD-ROM (650 MB+, CD-R/RW), DVD (4,7 GB).</li></ul>',
      },
      {
        n: 48,
        t: 'Yazılım Sınıflandırması (Sayfa 45–50)',
        body: '<ul><li><strong>İşletim Sistemleri:</strong> Microsoft (Windows 98, XP, Vista, 7, 8, 8.1, 10, 11), Linux (Debian, Ubuntu, Fedora, OpenSuse, Pardus [Yerli işletim sistemi]), Apple (Macintosh, Mac OS X, OS X, MacOS, MacOS 12.6).</li><li><strong>Uygulama Yazılımları:</strong> Office (Word, Excel, PowerPoint), Oyunlar, Haberleşme (Skype), Güvenlik (Antivirüs, Firewall), Tarayıcılar (Chrome, Opera, Firefox), Otomasyon yazılımları.</li></ul>',
      },
    ],
  },

  {
    id: 'w2',
    tag: 'Hafta 2',
    title: 'Boole Cebri ve Lojik Kapılar',
    pdfName: 'Boole Cebri (35 Sayfa)',
    desc: 'Onluk/ikilik/sekizlik/onaltılık tabanlar, 7 temel lojik kapı ve doğruluk tabloları, Boole cebri teoremleri, sadeleştirme, minterm/maxterm ve Karnaugh diyagramları.',
    hapBilgiler: [
      {
        badge: 'Kurucu',
        q: 'Boole Cebri ne zaman ve kim tarafından ortaya konulmuştur?',
        a: '1854 yılında İngiliz matematikçi George Boole (1815–1864) tarafından lojik devrelerde kullanılmak üzere ortaya konulmuştur. İkili sistemin (1 ve 0) cebridir.',
        slide: 4,
      },
      {
        badge: '7 Lojik Kapı',
        q: 'Temel olarak hangi 7 mantık kapısı vardır?',
        a: 'VE (AND: A.B), VEYA (OR: A+B), DEĞİL (NOT: A\'), VEDEĞİL (NAND: (A.B)\'), VEYADEĞİL (NOR: (A+B)\'), ÖZEL VEYA (XOR: A\'B+AB\'), ÖZEL VEYA DEĞİL (XNOR: A\'B\'+AB).',
        slide: 7,
      },
      {
        badge: 'De Morgan & Yutma',
        q: 'De Morgan ve Yutma Kuralları nelerdir?',
        a: 'De Morgan: (A+B)\' = A\'.B\' ve (A.B)\' = A\'+B\'. Yutma Kuralı: A + A.B = A ve A.(A+B) = A. (İspat: A.1+AB = A(1+B) = A).',
        slide: 19,
      },
      {
        badge: 'Özel Eşitlik (Soru 3)',
        q: 'A + A\'B ifadesinin sadeleşmiş hali nedir?',
        a: 'A + A\'B = A + B. (İspat: A = A+AB yazılıp (A+AB)+A\'B = A+B(A+A\') = A+B).',
        slide: 22,
      },
      {
        badge: 'Doğruluk Tablosu',
        q: 'n giriş değişkenli bir lojik devrenin doğruluk tablosunda kaç durum vardır?',
        a: '2ⁿ durum vardır. (Örn: 2 giriş → 4 durum, 3 giriş → 8 durum).',
        slide: 24,
      },
      {
        badge: 'Minterm vs Maxterm',
        q: 'Minterm ve Maxterm farkı nedir?',
        a: 'Minterm (Çarpımların Toplamı - SOP): Değişkenlerin VE işlemine alınıp sonucunun 1 olması (örn: m0=A\'B\'C\'). Maxterm (Toplamların Çarpımı - POS): Değişkenlerin VEYA işlemine alınıp sonucunun 0 olması (örn: M0=A+B+C).',
        slide: 28,
      },
      {
        badge: 'Karnaugh (K-Map)',
        q: 'Karnaugh diyagramlarında kaç kare komşu olarak birleştirilebilir?',
        a: '2, 4 ve 8 kare komşu olarak birleştirilebilir. 3 değişkenlide m0 ile m2 (ve m4 ile m6) komşudur.',
        slide: 31,
      },
    ],
    summaryA4: [
      {
        h: 'Temel Kavramlar ve Tabanlar',
        items: [
          'George Boole (1815–1864), 1854: İkili sistemin (0 ve 1) cebri; elektronik devre tasarım ve analizinde kullanılır.',
          'Tabanlar (0–15): Onluk (0..15) · İkilik (0000..1111) · Sekizlik (0..17) · Onaltılık (0..9, A..F).',
          'Doğruluk Tablosu: n giriş değişkeni için 2ⁿ durum içerir.',
        ],
      },
      {
        h: '7 Temel Lojik Kapı',
        items: [
          'AND (VE): Z = A.B (yalnızca A=1, B=1 iken 1).',
          'OR (VEYA): Z = A+B (en az biri 1 ise 1).',
          'NOT (DEĞİL): Z = A\' (tersler).',
          'NAND (VEDEĞİL): Z = (A.B)\' = A\'+B\' (yalnızca 1,1 iken 0).',
          'NOR (VEYADEĞİL): Z = (A+B)\' = A\'.B\' (yalnızca 0,0 iken 1).',
          'XOR (YADA): Z = A⊕B = A\'B + AB\' (girişler farklı ise 1).',
          'XNOR (YADADEĞİL): Z = A⊗B = A\'B\' + AB (girişler aynı ise 1).',
        ],
      },
      {
        h: 'Boole Cebri Teoremleri (10 Kural)',
        items: [
          '1. Değişme: A+B=B+A | A.B=B.A',
          '2. Birleşme: (A+B)+C=A+(B+C) | (A.B).C=A.(B.C)',
          '3. Dağılma: A+(B.C)=(A+B).(A+C) | A.(B+C)=A.B+A.C',
          '4. Değişkende Fazlalık: A+A=A | A.A=A',
          '5. VE Kuralı: A.1=A (etkisiz) | A.0=0 (yutan)',
          '6. VEYA Kuralı: A+1=1 (yutan) | A+0=A (etkisiz)',
          '7. Tümleyen: A+A\'=1 | A.A\'=0',
          '8. Tümleyenin Tümleyeni: (A\')\'=A',
          '9. De Morgan: (A+B)\'=A\'.B\' | (A.B)\'=A\'+B\'',
          '10. Yutma: A+A.B=A | A.(A+B)=A | Ek eşitlik (Soru 3): A+A\'B = A+B',
        ],
      },
      {
        h: 'Minterm, Maxterm ve Karnaugh',
        items: [
          'Minterm (Minimal Sum of Products): VE işlemi, sonuç 1 (m0=X\'Y\'Z\', ..., m7=XYZ).',
          'Maxterm (Minimal Product of Sum): VEYA işlemi, sonuç 0 (M0=X+Y+Z, ..., M7=X\'+Y\'+Z\').',
          'Karnaugh: 4–5 değişkene kadar hızlı indirgeme; 2, 4, 8 komşu kare birleştirilir.',
          '3 değişkenlide m0–m2 ve m4–m6 komşudur. Örn: F(x,y,z) = x\'yz\'+x\'yz+xy\'z\'+xy\'z = x\'y + xy\'.',
        ],
      },
    ],
    quiz: [
      {
        q: 'XNOR (YADADEĞİL) kapısının ifadesi ve çıktısının 1 olduğu durumlar hangisidir?',
        opts: [
          'A\'B + AB\', girişler farklıyken',
          'A\'B\' + AB, girişler aynıyken (0,0 ve 1,1)',
          '(A+B)\', yalnızca 1,1 iken',
          '(A.B)\', yalnızca 0,0 iken',
        ],
        ans: 1,
        exp: 'Sayfa 14: Z = A ⊗ B = A\'B\' + AB; A=0,B=0 ve A=1,B=1 durumlarında çıkış 1\'dir.',
      },
      {
        q: 'Onaltılık (Hexadecimal) tabandaki D sayısının İkilik ve Sekizlik tabandaki karşılığı nedir?',
        opts: ['1100 ve 14', '1101 ve 15', '1110 ve 16', '1011 ve 13'],
        ans: 1,
        exp: 'Sayfa 5 tablosu: Onluk 13 = İkilik 1101 = Sekizlik 15 = Onaltılık D.',
      },
      {
        q: 'Soru 1: ABC + ABC\' + AB\' + BC\' ifadesinin sadeleşmiş hali nedir?',
        opts: ['A + B\'C', 'A + BC\'', 'AB + C\'', 'B + AC\''],
        ans: 1,
        exp: 'Sayfa 20: AB(C+C\') + AB\' + BC\' = AB + AB\' + BC\' = A(B+B\') + BC\' = A + BC\'.',
      },
      {
        q: 'Soru 2: (A+B)(AC+AC\'+CC\') + AB + B ifadesinin en sade hali nedir?',
        opts: ['A.B', 'A + B', 'A\' + B', 'B'],
        ans: 1,
        exp: 'Sayfa 21: CC\'=0, AC+AC\'=A → (A+B)A + AB + B = A + AB + AB + B = A(1+B)+B = A + B.',
      },
      {
        q: 'Maxterm (Toplamların Çarpımı) ifadesinde X=1, Y=0, Z=1 için M5 terimi hangisidir?',
        opts: ['X + Y\' + Z', 'X\' + Y + Z\'', 'X.Y\'.Z', 'X\' + Y\' + Z'],
        ans: 1,
        exp: 'Sayfa 30: Maxterm sonucu 0 olacak şekilde VEYA işlemine alınır; X=1→X\', Y=0→Y, Z=1→Z\' → M5 = X\' + Y + Z\'.',
      },
      {
        q: 'Karnaugh örneğinde F(x,y,z) = x\'yz\' + x\'yz + xy\'z\' + xy\'z fonksiyonunun sadeleşmiş hali nedir?',
        opts: ['x\'y + xy\'', 'x\'z + xz\'', 'y + z\'', 'x + y\''],
        ans: 0,
        exp: 'Sayfa 35: (m3, m2) grubundan x\'y ve (m4, m5) grubundan xy\' elde edilir: F(x,y,z) = x\'y + xy\'.',
      },
    ],
    slides: [
      { n: 1, t: 'Boole Cebri (Boolean Algebra)', body: '<p>BM103 — Doç. Dr. Feyza YILDIRIM OKAY. İçerik: Boole Cebrinin Esasları, Lojik Kapılar ve Doğruluk Tabloları, Lojik İfadelerin İndirgenmesi, Karnaugh Diyagramları.</p>' },
      { n: 3, t: 'Onluk ve İkilik Taban', body: '<p>10\'luk taban: 0..9 (123 = 1×100 + 2×10 + 3×1). İkilik taban: 0,1 (110 = 1×4 + 1×2 + 0×1 = 6).</p>' },
      { n: 4, t: 'Boole Cebri', body: '<p>1854\'te George Boole (1815–1864) tarafından lojik devrelerde kullanılmak üzere ortaya konulmuştur. İkili sistemin cebridir; bilgisayarlar 1 ve 0 dönüşümüyle çalışır.</p>' },
      { n: 5, t: 'Tabanlar Tablosu (0–15)', body: '<p>0: 0000/0/0 ... 9: 1001/11/9 · 10: 1010/12/A · 11: 1011/13/B · 12: 1100/14/C · 13: 1101/15/D · 14: 1110/16/E · 15: 1111/17/F.</p>' },
      {
        n: 7,
        t: '7 Temel Lojik Kapı (Sayfa 6–14)',
        body: '<ul><li>VE (AND): Z = A.B</li><li>VEYA (OR): Z = A+B</li><li>DEĞİL (NOT): Z = A\'</li><li>VEDEĞİL (NAND): Z = (A.B)\' = A\'+B\'</li><li>VEYADEĞİL (NOR): Z = (A+B)\' = A\'.B\'</li><li>YADA (XOR): Z = A⊕B = A\'B + AB\'</li><li>YADADEĞİL (XNOR): Z = A⊗B = A\'B\' + AB</li></ul>',
      },
      {
        n: 15,
        t: 'Boole Cebri Teoremleri (Sayfa 15–19)',
        body: '<ol><li>Değişme: A+B=B+A | A.B=B.A</li><li>Birleşme: (A+B)+C=A+(B+C) | (A.B).C=A.(B.C)</li><li>Dağılma: A+(B.C)=(A+B).(A+C) | A.(B+C)=A.B+A.C</li><li>Fazlalık: A+A=A | A.A=A</li><li>VE Kuralı: A.1=A | A.0=0</li><li>VEYA Kuralı: A+1=1 | A+0=A</li><li>Tümleyen: A+A\'=1 | A.A\'=0</li><li>Tümleyenin Tümleyeni: (A\')\'=A</li><li>De Morgan: (A+B)\'=A\'.B\' | (A.B)\'=A\'+B\'</li><li>Yutma: A+A.B=A | A.(A+B)=A</li></ol>',
      },
      {
        n: 20,
        t: 'Çözümlü Sadeleştirme Soruları (Sayfa 20–23)',
        body: '<ul><li><strong>Soru 1:</strong> ABC+ABC\'+AB\'+BC\' = AB(C+C\')+AB\'+BC\' = A(B+B\')+BC\' = <strong>A+BC\'</strong></li><li><strong>Soru 2:</strong> (A+B)(AC+AC\'+CC\')+AB+B = (A+B)A+AB+B = <strong>A+B</strong></li><li><strong>Soru 3:</strong> <strong>A+A\'B = A+B</strong> ispatı (A=A+AB yutma kuralı ile)</li><li><strong>Soru 4:</strong> A\'BC+AB\'C\'+A\'B\'C\'+ABC+AB\'C = <strong>BC+B\'A+B\'C\'</strong></li></ul>',
      },
      {
        n: 24,
        t: 'Doğruluk Tablosu (Sayfa 24–27)',
        body: '<p>n giriş değişkeni için <strong>2ⁿ</strong> durum bulunur. De Morgan ispatı, (A+C)(B\'+C) ve A+A\'B=A+B tabloları.</p>',
      },
      {
        n: 28,
        t: 'Minterm ve Maxterm (Sayfa 28–30)',
        body: '<p>Minterm (Minimal sum of products): VE işlemi, sonuç 1 (m0..m7). Maxterm (Minimal product of sum): VEYA işlemi, sonuç 0 (M0..M7).</p>',
      },
      {
        n: 31,
        t: 'Karnaugh Diyagramları (Sayfa 31–35)',
        body: '<p>4 veya 5 değişkenliye kadar indirgeme hızlandırır. 2, 4 ve 8 kare komşu birleştirilir. 3 değişkenlide m0-m2 ve m4-m6 komşudur. Örnek1: A\'B\'+A\'B=A\'. Örnek2: F(x,y,z)=x\'yz\'+x\'yz+xy\'z\'+xy\'z = x\'y+xy\'.</p>',
      },
    ],
  },

  {
    id: 'w3',
    tag: 'Hafta 3',
    title: 'Algoritmalar, Akış Şemaları ve Sözde Kod',
    pdfName: 'Algoritmalar (27 Sayfa)',
    desc: 'Algoritma tanımı ve 5 özelliği, akış şeması elemanları ve kuralları, doğrusal/mantıksal/döngüsel akış şemaları, sözde kod, Euclid ve Bubble Sort.',
    hapBilgiler: [
      {
        badge: '5 Özellik',
        q: 'Bir algoritmada olması gereken 5 özellik nelerdir?',
        a: '1) Etkin ve genel olma, 2) Sonlu olma, 3) Yanılmazlık, 4) Giriş / Çıkış tanımlı olma, 5) Başarım.',
        slide: 5,
      },
      {
        badge: 'Hazırlama Kuralları',
        q: 'Akış şeması hazırlamanın 5 kuralı nedir?',
        a: '1) Başlangıç ve bitiş uçları tanımlanmalı. 2) Standart semboller kullanılmalı. 3) Birbirini kesen akış hatları kullanılmamalı. 4) Basit kararlar alınmalı. 5) Şema belli bir yönde hazırlanmalı.',
        slide: 8,
      },
      {
        badge: 'Semboller',
        q: 'Akış şemasındaki 8 temel eleman hangileridir?',
        a: 'Uçbirim (Terminal), İşlem (Process), Girdi/Çıktı (I/O), Karar (Decision), Bağlaç (Connector), Belirlenmiş Eylem (Predefined Process), Belge (Document), Akış Çizgileri (Flow Lines).',
        slide: 9,
      },
      {
        badge: '3 Akış Şeması Türü',
        q: 'Akış şemaları içerik ve biçimlerine göre kaça ayrılır?',
        a: '1) Doğrusal (sıralı - sequential), 2) Mantıksal (conditional), 3) Döngüsel (iteratif, çevrimli, yineli, tekrarlı - iterative).',
        slide: 11,
      },
      {
        badge: 'Sözde vs Gerçek Kod',
        q: 'Sözde Kod (Pseudo Kod) ile Gerçek Kod farkı nedir?',
        a: 'Sözde Kod: Yarı programlama dili kuralları, yarı konuşma diline dönük tanımlama (dil bağımsızdır). Gerçek Kod: Herhangi bir programlama diliyle gerçekleştirilmiş halidir.',
        slide: 20,
      },
      {
        badge: 'Euclid & Bubble Sort',
        q: 'Euclid algoritması ve Kabarcık Sıralama (Bubble Sort) nasıl çalışır?',
        a: 'Euclid: n≠0 iken r ← m mod n, m ← n, n ← r yapıp m döndürür. Bubble Sort: Dizide birden çok geçiş yapar, sıra dışı (aj > aj+1) her komşu öğe çiftini değiştirir.',
        slide: 26,
      },
    ],
    summaryA4: [
      {
        h: 'Algoritma Tanımı ve Özellikleri',
        items: [
          'Tanım: Herhangi bir sorunun çözümü için izlenecek belirleyici yol; adımlar öncelik sırasıyla ayrıntılı tanımlanır.',
          'Programlamanın en önemli kısmı algoritma geliştirmektir; kodlama işin basit kısmıdır.',
          '5 Özellik: Etkin ve genel olma · Sonlu olma · Yanılmazlık · Giriş/Çıkış tanımlı olma · Başarım.',
        ],
      },
      {
        h: 'Akış Şeması (Flowchart) Kuralları ve Avantajları',
        items: [
          'Avantajlar: Mantıksal ilişkiyi gösterir · İzlenmesi/anlaşılması kolay · Şartlı olayları takip mümkün · Standart sayesinde ortak çalışma.',
          '5 Kural: Başlangıç-bitiş uçları tanımlı · Standart semboller · Birbirini kesen akış hatları yok · Basit kararlar · Belli bir yönde hazırlama.',
        ],
      },
      {
        h: 'Akış Şeması Elemanları (8 Sembol)',
        items: [
          'Uçbirim (Terminal): Başlangıç/sonlanış.',
          'İşlem (Process): İşlemci/bellekteki dahili işlem.',
          'Girdi/Çıktı (Paralelkenar): Veri alma veya çıktı verme.',
          'Karar (Eşkenar dörtgen): İkili cevap (Evet/Hayır, Doğru/Yanlış).',
          'Bağlaç (Daire): Çizgiler kesişmeden bağlantı.',
          'Belirlenmiş Eylem: Alt program/fonksiyon çağırma.',
          'Belge: Belgenin girdi/çıktı alınması.',
          'Akış Çizgileri: Akış yönü.',
        ],
      },
      {
        h: 'Akış Şeması Türleri ve Örnekler',
        items: [
          'Doğrusal (Sequential): Giriş → Hesaplama → Çıkış (Merhaba Dünya; X+Y toplamı).',
          'Mantıksal (Conditional): Koşulun doğru/yanlış olmasına göre yönlendirme (x>y, y>x, eşit).',
          'Döngüsel (Iterative): Adımların birden fazla kullanılması (Sayıyı 5 kez yazdır; 1–20 arası tamsayıların toplamı).',
        ],
      },
      {
        h: 'Sözde Kod (Pseudo Kod) ve Klasik Algoritmalar',
        items: [
          'Tanım: Yarı programlama dili, yarı konuşma dili; dil bağımsızdır; mantığı test eder; ekip iletişimini kolaylaştırır.',
          '5 Temel Yapı: Başlangıç/Bitiş · Girdi/Çıktı · Atama (S=0) · Karar (IF/ELSE) · Döngü (FOR, WHILE).',
          'Örnekler: 1–10 yazdırma · N! faktöriyel · N adet sayı toplamı.',
          'Euclid Algoritması: while n ≠ 0 do { r ← m mod n; m ← n; n ← r } return m.',
          'Bubble Sort: for i:=1 to n-1, for j:=1 to n-i, if aj > aj+1 then yer değiştir.',
        ],
      },
    ],
    quiz: [
      {
        q: 'Hangisi PDF\'te sayılan "Algoritmada Olması Gereken 5 Özellik"ten biri değildir?',
        opts: ['Sonlu olma', 'Yanılmazlık', 'Giriş / Çıkış tanımlı olma', 'Nesne yönelimli olma'],
        ans: 3,
        exp: 'Sayfa 5: Etkin ve genel olma, Sonlu olma, Yanılmazlık, Giriş/Çıkış tanımlı olma, Başarım.',
      },
      {
        q: 'Akış şemasında çizgiler kesişmeksizin akış diyagramı hazırlanmasını sağlayan eleman hangisidir?',
        opts: ['Belge (Document)', 'Bağlaç (Connector)', 'Belirlenmiş Eylem', 'Uçbirim (Terminal)'],
        ans: 1,
        exp: 'Sayfa 9 tablosu: Bağlaç (Connector) — Çizgiler kesişmeksizin akış diyagramı hazırlanmasını sağlar.',
      },
      {
        q: 'Önceden tanımlanmış bir eylemler dizisinin (alt yordam/fonksiyon) kullanılacağını belirten akış şeması sembolü hangisidir?',
        opts: ['Karar', 'Belirlenmiş Eylem (Predefined Process)', 'İşlem', 'Girdi/Çıktı'],
        ans: 1,
        exp: 'Sayfa 9: Belirlenmiş Eylem (Predefined Process) — Used to invoke a subroutine.',
      },
      {
        q: '1–20 arasındaki tamsayıların toplamını bulan algoritmada döngüden çıkış koşulu (Adım 4) nedir?',
        opts: ['EĞER Sayac = 20 İSE GİT 7', 'EĞER Sayac > 20 İSE GİT 7', 'EĞER Toplam > 20 İSE GİT 7', 'EĞER Sayac < 1 İSE GİT 7'],
        ans: 1,
        exp: 'Sayfa 19: Adım3. Sayac=Sayac+1; Adım4. EĞER Sayac>20 İSE GİT 7.',
      },
      {
        q: 'Euclid\'s Algoritması sözde kodunda while n ≠ 0 döngüsü içinde hangi atamalar sırasıyla yapılır?',
        opts: ['r ← m mod n; m ← n; n ← r', 'r ← m + n; m ← r; n ← m', 'n ← m mod r; r ← n; m ← r', 'r ← n mod m; n ← m; m ← r'],
        ans: 0,
        exp: 'Sayfa 26: while n ≠ 0 do: r ← m mod n; m ← n; n ← r; döngü bitince return m.',
      },
      {
        q: 'Hangisi Sözde Kod\'un (Pseudo Kod) önem nedenlerinden biri değildir?',
        opts: [
          'Dil bağımsızdır',
          'Programlamaya geçmeden önce mantığı test eder',
          'Doğrudan CPU tarafından makine kodu gibi çalıştırılır',
          'Ekip çalışmasında iletişimi kolaylaştırır',
        ],
        ans: 2,
        exp: 'Sayfa 21: Algoritmayı anlaşılır kılar, mantığı test eder, dil bağımsızdır, ekip iletişimini kolaylaştırır.',
      },
    ],
    slides: [
      {
        n: 3,
        t: 'Algoritma Nedir? (Sayfa 3–4)',
        body: '<p>Herhangi bir sorunun çözümü için izlenecek yol. İşlemler son derece belirleyici ve öncelik sıralı olmalıdır. Programlamanın en önemli kısmı algoritma geliştirmektir.</p>',
      },
      {
        n: 5,
        t: 'Algoritmada Olması Gereken Özellikler',
        body: '<ul><li>Etkin ve genel olma</li><li>Sonlu olma</li><li>Yanılmazlık</li><li>Giriş / Çıkış tanımlı olma</li><li>Başarım</li></ul>',
      },
      {
        n: 6,
        t: 'Akış Şemaları, Avantajları ve Kuralları (Sayfa 6–8)',
        body: '<p>Algoritmanın görsel olarak şekillerle ifadesidir. Kurallar: 1) Başlangıç-bitiş uçları, 2) Standart semboller, 3) Kesişmeyen hatlar, 4) Basit kararlar, 5) Belli bir yön.</p>',
      },
      {
        n: 9,
        t: 'Akış Şeması Elemanları',
        body: '<table class="data-table"><tr><th>Adı</th><th>İşlevi</th></tr><tr><td>Uçbirim (Terminal)</td><td>Programın başlayacağı ve sonlanacağı kısım</td></tr><tr><td>İşlem (Process)</td><td>İşlemci/bellekte gerçekleşecek dahili işlem</td></tr><tr><td>Girdi/Çıktı (I/O)</td><td>Veri alma veya çıktı verme</td></tr><tr><td>Karar (Decision)</td><td>İkili sistemde soru (Evet/Hayır, Doğru/Yanlış)</td></tr><tr><td>Bağlaç (Connector)</td><td>Çizgiler kesişmeden akış diyagramı çizme</td></tr><tr><td>Belirlenmiş Eylem</td><td>Önceden tanımlanmış eylem/fonksiyon çağırma</td></tr><tr><td>Belge (Document)</td><td>Belgenin girdi veya çıktı alınması</td></tr><tr><td>Akış Çizgileri</td><td>Akış yönünü gösterir</td></tr></table>',
      },
      {
        n: 10,
        t: 'Algoritma ve Akış Şeması Örneği: Kek Tarifi',
        body: '<p>Fırını 170°C\'ye getir → yumurta/şeker çırp → yoğurt/zeytinyağı → un → (Fındık ve kakao var mı? / Kuru üzüm var mı? kararları) → karıştır/kabartma tozu → yağla → dök → 45 dk pişir → çıkar → Bitir.</p>',
      },
      {
        n: 11,
        t: 'Akış Şeması Sınıflandırması ve Örnekler (Sayfa 11–19)',
        body: '<ul><li><strong>Doğrusal (Sequential):</strong> Merhaba Dünya (Sayfa 13), İki sayının toplamı T=X+Y (Sayfa 14).</li><li><strong>Mantıksal (Conditional):</strong> 2 sayıdan büyük olanı bulma (Sayfa 16).</li><li><strong>Döngüsel (Iterative):</strong> Sayıyı 5 kez yazdırma S=0,5,1 (Sayfa 18), 1–20 arası tamsayıların toplamı (Sayfa 19).</li></ul>',
      },
      {
        n: 20,
        t: 'Sözde/Kaba (Pseudo) Kod (Sayfa 20–27)',
        body: '<p><strong>Sözde Kod:</strong> Yarı programlama dili, yarı konuşma dili. <strong>Gerçek Kod:</strong> Programlama diliyle gerçekleştirilmiş hal. Örnekler: 1-10 yazdır (Sayfa 23), N! faktöriyel (Sayfa 24), N adet sayı toplamı (Sayfa 25), Euclid\'s Algoritması (Sayfa 26), Bubble Sort (Sayfa 27).</p>',
      },
    ],
  },

  {
    id: 'w4',
    tag: 'Hafta 4',
    title: 'Programlama Dilleri ve Nesne Yönelimli Programlama',
    pdfName: 'Programlama Dilleri (47 Sayfa)',
    desc: 'Dil nesilleri (1–4), Ada Lovelace, biçimsel/doğal diller, 4 paradigma, dilin yapı taşları, seviye ve ortam sınıflandırması, derleyici/yorumlayıcı/IDE ve OOP.',
    hapBilgiler: [
      {
        badge: 'İlk Programcı',
        q: 'İlk bilgisayar programcısı kimdir ve ilk program neyi hesaplamıştır?',
        a: 'Ada Lovelace (1815–1852). Charles Babbage\'ın Analitik Makine\'si için Bernoulli sayılarını hesaplayan algoritmayı yazmıştır (ilk bilgisayar programı). 1980\'de Pascal tabanlı Ada dili onun onuruna adlandırılmıştır.',
        slide: 9,
      },
      {
        badge: 'Dil Nesilleri (1–4)',
        q: 'Programlama dillerinin 4 nesli nelerdir?',
        a: '1. Nesil: Makine dili (0 ve 1). 2. Nesil: Assembly (LD, ST, ADDI). 3. Nesil: Yüksek seviyeli diller (FORTRAN, COBOL). 4. Nesil: Probleme yönelik diller (SQL).',
        slide: 10,
      },
      {
        badge: 'Biçimsel vs Doğal',
        q: 'Biçimsel dil (programlama dili) ve Doğal dil farkı nedir?',
        a: 'Biçimsel dilde gramer ÖNCE ve kesin tanımlanır (tanımlayıcıdır). Doğal dilde gramer dil kullanımını özetlemek için SONRADAN oluşturulur ve istisna içerir (açıklayıcıdır). Esperanto (1887) biçimsel özellik taşır.',
        slide: 15,
      },
      {
        badge: '4 Paradigma',
        q: 'Programlama paradigmaları nelerdir?',
        a: '1) Emirsel (FORTRAN, COBOL, C, Pascal, Ada, Python), 2) Bildirimsel (GPSS, Prolog, SQL), 3) Fonksiyonel (LISP, ML, Scheme), 4) Nesne Yönelimli (Smalltalk, C++, Visual Basic, Java, C#).',
        slide: 16,
      },
      {
        badge: 'Syntax vs Semantics',
        q: 'Söz Dizimi (Syntax) ve Anlambilim (Semantics) farkı nedir?',
        a: 'Syntax: Simgelerin geçerli sayılması için yazım düzeni kuralları (örn: ";" eksikliği). Semantics: İfadenin ne anlama geldiği (örn: int x = "hello"; yazım doğru, anlam yanlış).',
        slide: 21,
      },
      {
        badge: 'Derleyici vs Yorumlayıcı',
        q: 'Derleyici (Compiler) ve Yorumlayıcı (Interpreter) farkları nelerdir?',
        a: 'Derleyici: Programın tamamını çevirir, ara kod üretir, daha hızlı çalışır, hataları derleme sonunda topluca raporlar (C, C++, Rust, Go). Yorumlayıcı: Bir seferde bir komut çevirir, ara kod üretmez, hatalı satırda durur (Python, JS, PHP).',
        slide: 33,
      },
      {
        badge: 'Hibrit Sistem (Java)',
        q: 'Java\'da hibrit gerçekleştirim nasıl işler?',
        a: 'Merhaba.java (kaynak kod) → javac (derleyici) → Merhaba.class (bytecode) → JVM (yorumlayıcı + JIT) → Windows/Linux/macOS. Diğer hibrit diller: C#, Kotlin, Scala, Perl.',
        slide: 35,
      },
      {
        badge: 'OOP 3 Temel İlke',
        q: 'Nesne Yönelimli Programlama\'nın (OOP) 3 temel ilkesi nedir?',
        a: '1) Kapsülleme (Encapsulation): public/private ile dahili erişimi kısıtlama. 2) Kalıtım (Inheritance): "bir ...dır" ilişkisi (Dog extends Animal). 3) Çok Biçimlilik (Polymorphism): Aynı çağrının nesneye göre farklı yorumlanması (makeSound → Hav hav / Miyav).',
        slide: 44,
      },
    ],
    summaryA4: [
      {
        h: 'Temel Kavramlar ve Tarihçe',
        items: [
          'Yolculuk: Problem → Algoritma → Program → Çevirici → Makine kodu.',
          'Ada Lovelace (1815–1852): İlk programcı; Analitik Makine için Bernoulli sayıları algoritması; Ada dili (1980).',
          '4 Nesil: 1. Makine dili (0/1) · 2. Assembly (LD, ST, ADDI, HLT, ORG, db; Assembler) · 3. Yüksek seviyeli (FORTRAN, COBOL; Derleyici) · 4. Probleme yönelik (SQL).',
          'Biçimsel Dil: Gramer önce ve tanımlayıcı · Doğal Dil: Gramer sonradan ve açıklayıcı · Esperanto (1887, L. Zamenhof).',
        ],
      },
      {
        h: 'Paradigmalar ve Yapı Taşları',
        items: [
          '4 Paradigma: Emirsel (C, Python, Pascal, Ada) · Bildirimsel (SQL, Prolog, GPSS) · Fonksiyonel (LISP, ML, Scheme) · Nesne Yönelimli (Smalltalk, C++, Java, C#, VB).',
          '4 Komut Türü: Giriş/Çıkış · Hesaplama · Kontrolün yönlendirilmesi (if/for/while, JMP/CMP/CALL) · Veri taşıma/saklama (LOAD/STORE/MOV).',
          '8 Eleman: Söz Dizimi (Syntax) · Anlambilim (Semantics) · Değişken · Veri Türü (Integer, Real/float, Character, Boolean) · Atama (önce sağ hesaplanır, sola yazılır) · Kontrol Deyimleri · Fonksiyonlar · Yorum Satırları.',
        ],
      },
      {
        h: 'Sınıflandırma (Seviye ve Ortam)',
        items: [
          'Seviye: Çok yüksek (Python, PHP, VB) · Yüksek (Pascal, Basic, Fortran) · Orta (C, C++, C#, Java, Ada) · Düşük (Assembly) · Makine dili.',
          '8–10 satır C ≈ 80–90 satır Assembly. Assembly kullanım alanları: Gömülü sistemler, Donanım sürücüleri, Performans kritik kod, Tersine mühendislik.',
          'Lokal (exe) vs Web tabanlı: Front-end (HTML, CSS, JavaScript — tarayıcıda) vs Back-end (Node.js, Django, PHP, Java — sunucuda).',
        ],
      },
      {
        h: 'Çeviriciler ve Programın Yolculuğu',
        items: [
          'Derleyici Aşamaları: Kaynak program → Sözcüksel analiz (Token) → Ayrıştırıcı/Parser (Ayrıştırma ağacı) → Kod üreteci → Object code.',
          'Derleyici (C, C++, Rust, Go, Fortran, COBOL): Tamamı çevrilir, hızlı, ara kod üretir. Yorumlayıcı (Python, Ruby, JS, PHP, Perl, MATLAB): Satır satır, ara kod yok.',
          'Hibrit (Java, C#, Kotlin, Scala, Perl): .java → javac → .class (bytecode) → JVM (yorumlayıcı + JIT).',
          'Yolculuk: Editör (toplama.c) → Derleyici (toplama.o) → Bağlayıcı/Linker (+ Kütüphane) → toplama.exe → Hata ayıklayıcı/Debugger.',
        ],
      },
      {
        h: 'Nesne Yönelimli Programlama (OOP)',
        items: [
          'Sınıf (Class): Şablon/kalıp. Nesne (Object): Sınıfın örneği (instance); verileri (instance variable) + metotları + Constructor (yapıcı) içerir.',
          'Kapsülleme (Encapsulation): private (yalnız sınıf içi) ve public (dışarıdan erişilebilir).',
          'Kalıtım (Inheritance): "bir ...dır" ilişkisi (extends).',
          'Çok Biçimlilik (Polymorphism): Çağrı nesneye göre farklı davranır (Animal[] → Dog Hav hav!, Cat Miyav!).',
        ],
      },
    ],
    quiz: [
      {
        q: 'PDF\'te "Orta seviyeli" olarak sınıflandırılan programlama dilleri grubu hangisidir?',
        opts: ['Python, PHP, Visual Basic', 'Pascal, Basic, Fortran', 'C, C++, C#, Java, Ada', 'LISP, ML, Scheme'],
        ans: 2,
        exp: 'Sayfa 26: Çok yüksek (Python, PHP, VB), Yüksek (Pascal, Basic, Fortran), Orta (C, C++, C#, Java, Ada), Düşük (Assembly).',
      },
      {
        q: 'int x = "hello"; ifadesinde görülen hata türü hangisidir?',
        opts: [
          'Söz dizimi (Syntax) hatası',
          'Anlambilim (Semantics) hatası',
          'Sözcüksel analiz (Token) hatası',
          'Bağlayıcı (Linker) hatası',
        ],
        ans: 1,
        exp: 'Sayfa 21: Yazım kurallarına uygun olduğu için syntax doğru, ancak metin int\'e atanamayacağı için Anlambilim (Semantics) yanlıştır.',
      },
      {
        q: 'Derleme sonucu oluşan object dosyaları (toplama.o) ile kütüphaneleri tek bir çalıştırılabilir dosyada (toplama.exe) birleştiren araç hangisidir?',
        opts: ['Editör', 'Ayrıştırıcı (Parser)', 'Bağlayıcı (Linker)', 'Yorumlayıcı'],
        ans: 2,
        exp: 'Sayfa 37: Bağlayıcı (Linker) derleme sonucu oluşan object dosyaları ve kütüphaneleri tek bir çalıştırılabilir dosyada birleştirir.',
      },
      {
        q: 'Derleyicinin çeviri sürecindeki doğru aşama sırası hangisidir?',
        opts: [
          'Ayrıştırıcı → Sözcüksel analiz → Kod üreteci',
          'Sözcüksel analiz → Ayrıştırıcı (parser) → Kod üreteci',
          'Kod üreteci → Token → Bağlayıcı',
          'Yorumlayıcı → Ayrıştırıcı → JIT',
        ],
        ans: 1,
        exp: 'Sayfa 34: Kaynak program → Sözcüksel analiz → Ayrıştırıcı (parser) → Kod üreteci → Object code.',
      },
      {
        q: 'Web tabanlı programlamada istemci taraflı (front-end) ve sunucu taraflı (back-end) teknolojiler hangi seçenekte doğru ayrılmıştır?',
        opts: [
          'Front-end: PHP, Java | Back-end: HTML, CSS',
          'Front-end: HTML, CSS, JavaScript | Back-end: Node.js, Django, PHP, Java',
          'Front-end: Python, SQL | Back-end: CSS, JS',
          'Front-end: Django, Node.js | Back-end: HTML, CSS',
        ],
        ans: 1,
        exp: 'Sayfa 30: Front-end (HTML, CSS, JavaScript), Back-end (Node.js, Django, PHP, Java).',
      },
      {
        q: 'OOP\'de bir nesnenin çağrılan aynı metot ismine (örn. makeSound()) nesne türüne göre farklı tepki vermesi hangi ilkedir?',
        opts: ['Kapsülleme (Encapsulation)', 'Kalıtım (Inheritance)', 'Çok Biçimlilik (Polymorphism)', 'Yapıcı (Constructor)'],
        ans: 2,
        exp: 'Sayfa 44 & 47: Çok Biçimlilik (Polymorphism) — Çağıran kod nesnenin türünü bilmek zorunda değildir; doğru davranışı nesnenin kendisi seçer.',
      },
    ],
    slides: [
      {
        n: 4,
        t: 'Bilgisayar Programı ve Yolculuk (Sayfa 4–7)',
        body: '<p>Problem → Algoritma → Program → Çevirici → Makine kodu. Programlama dilleri insan dili (kolay ama belirsiz) ile makine kodu (hassas ama ayrıntılı) arasında köprüdür.</p>',
      },
      {
        n: 9,
        t: 'İlk Bilgisayar Programcısı: Ada Lovelace (1815–1852)',
        body: '<p>Charles Babbage\'ın yardımcısı; Analitik Makine için Bernoulli sayılarını hesaplayan ilk bilgisayar programını yazdı. 1980\'de Ada dili onun onuruna adlandırıldı.</p>',
      },
      {
        n: 10,
        t: 'Programlama Dillerinin Nesilleri (Sayfa 10–14)',
        body: '<ul><li>1. Nesil: Makine dili (0 ve 1)</li><li>2. Nesil: Assembly (LD, ST, ADDI, HLT, ORG, db; Assembler)</li><li>3. Nesil: Yüksek seviyeli (FORTRAN, COBOL; Derleyici)</li><li>4. Nesil: Probleme yönelik (SQL)</li></ul>',
      },
      {
        n: 15,
        t: 'Biçimsel Diller ve Paradigmalar (Sayfa 15–17)',
        body: '<p>Biçimsel dilde gramer tanımlayıcıdır; doğal dilde açıklayıcıdır (Esperanto 1887). Paradigmalar: Emirsel, Bildirimsel, Fonksiyonel, Nesne Yönelimli.</p>',
      },
      {
        n: 19,
        t: 'Dilin Yapı Taşları (Sayfa 19–24)',
        body: '<p>Komutlar (G/Ç, Hesaplama, Kontrol, Veri taşıma) ve 8 Eleman: Syntax, Semantics, Değişken, Veri Türü (Integer, Real, Character, Boolean), Atama, Kontrol, Fonksiyonlar, Yorum Satırları.</p>',
      },
      {
        n: 26,
        t: 'Sınıflandırma (Sayfa 26–30)',
        body: '<p>Seviyeye göre (Çok yüksek → Makine dili) ve Ortama göre (Lokal vs Web: front-end HTML/CSS/JS, back-end Node.js/Django/PHP/Java). 8-10 satır C ≈ 80-90 satır Assembly.</p>',
      },
      {
        n: 32,
        t: 'Dil Çeviriciler ve IDE (Sayfa 32–38)',
        body: '<p>Assembler, Derleyici, Yorumlayıcı, Hibrit (Java: javac → bytecode → JVM+JIT). Bir programın yolculuğu: Editör → Derleyici → Bağlayıcı (+Kütüphane) → Hata ayıklayıcı.</p>',
      },
      {
        n: 40,
        t: 'Nesne Yönelimli Programlama (Sayfa 40–47)',
        body: '<p>Sınıf (şablon), Nesne (örnek/instance), Instance Variable, Metot, Constructor. 3 Temel İlke: Kapsülleme (private/public), Kalıtım (extends), Çok Biçimlilik (Polymorphism).</p>',
      },
    ],
  },

  {
    id: 'w5',
    tag: 'Hafta 5',
    title: 'İşletim Sistemleri',
    pdfName: 'İşletim Sistemleri (43 Sayfa)',
    desc: 'İşletim sistemi katmanları ve görevleri, gelişim evreleri, 9 işletim sistemi türü, Sanal Makine, Kabuk/Çekirdek mimarisi, Önyükleme, PCB, Scheduler/Dispatcher, Semafor ve Deadlock.',
    hapBilgiler: [
      {
        badge: 'Katmanlı Yapı',
        q: 'Kullanıcı ile donanım arasındaki 4 katman sırası nedir?',
        a: 'Kullanıcı ↔ Uygulama ↔ İşletim sistemi ↔ Donanım. İşletim sistemi donanımı yöneten ve kullanıcı ile donanım arasında köprü gören yazılım katmanıdır.',
        slide: 2,
      },
      {
        badge: 'Gelişim Evreleri',
        q: '1946–1967 arasındaki 5 işlem yöntemi evresi sırasıyla nelerdir?',
        a: '1946–52: Komut komut yürütme · 1952–57: İşten-işe yürütme (Job to Job, punchcard) · 1957–62: Toplu işleme (Batch) · 1962–67: Çoklu programlama (Multi programming) · 1967–: Zaman paylaşımı (Time sharing).',
        slide: 8,
      },
      {
        badge: 'Özel İS Türleri',
        q: 'Gerçek Zamanlı, Gömülü ve Akıllı Kart işletim sistemlerinin farkları nelerdir?',
        a: 'Gerçek Zamanlı: Milisaniyelerde çalışır (VxWorks). Gömülü: Fırın/buzdolabı gibi cihazlarda, kullanıcı program indirip çalıştıramaz (Embedded Linux, QNX, VxWorks). Akıllı Kart: En küçük İS, Sim/Kredi/e-imza, JVM içerebilir.',
        slide: 26,
      },
      {
        badge: 'Mimari: Kabuk & Çekirdek',
        q: 'Kabuk (Shell) ve Çekirdek (Kernel) ne iş yapar?',
        a: 'Kabuk (Shell): Kullanıcıyla iletişime geçer (CLI veya GUI). Çekirdek (Kernel): En basit işlemleri gerçekleştirir (Dosya yöneticisi, Aygıt sürücüleri, Bellek yöneticisi, Scheduler ve dispatcher).',
        slide: 31,
      },
      {
        badge: 'Bootstrapping',
        q: 'Bilgisayar açılışında Önyükleme (Bootstrapping) nasıl gerçekleşir?',
        a: 'ROM\'da bulunan Açılış Önyükleyicisi (Boot Loader) güç verilince CPU tarafından çalıştırılır; işletim sistemini sabit disk/SSD\'den RAM\'e aktarır ve kontrolü işletim sistemine devreder.',
        slide: 32,
      },
      {
        badge: 'PCB İçeriği',
        q: 'Process Control Block (PCB) içinde neler tutulur?',
        a: 'Her işlem (process) işletim sistemince yönetilmek üzere PCB içinde tutulur: Program counter, Genel amaçlı registerlar, Ana belleğin ilgili kısmı.',
        slide: 34,
      },
      {
        badge: 'Scheduler vs Dispatcher',
        q: 'Scheduler (Zamanlayıcı) ve Dispatcher (Dağıtıcı) farkı nedir?',
        a: 'Scheduler: Süreç tablosu tutar; işlemleri hazır veya bekleme havuzuna ekler/kaldırır. Dispatcher: CPU\'yu hazır bir işlemi yürütmek üzere atar (önleyici/kesintili veya işbirliğine dayalı çoklu görev; Öncelik, En iyi çaba).',
        slide: 37,
      },
      {
        badge: 'Semafor & Kritik Bölge',
        q: 'Semafor, Kritik Bölge ve Mutual Exclusion nedir?',
        a: 'Semafor: Kaynağın kullanımda olup olmadığını belirten kontrol bayrağı. Kritik bölge: Aynı anda yalnızca bir işlemce yürütülmesi gereken komut grubu. Mutual exclusion: Tek işlemin girmesi gereksinimi.',
        slide: 41,
      },
      {
        badge: 'Deadlock (Coffman)',
        q: 'Kilitlenme (Deadlock) oluşması için gereken 4 Coffman koşulu nelerdir?',
        a: 'Hepsinin aynı anda oluşması gerekir: 1) Mutual exclusion, 2) Hold and wait, 3) No preemption, 4) Circular wait.',
        slide: 42,
      },
    ],
    summaryA4: [
      {
        h: 'Tanım, Fonksiyonlar ve Gelişim',
        items: [
          'Katmanlar: Kullanıcı ↔ Uygulama ↔ İşletim Sistemi ↔ Donanım.',
          '5 Temel Fonksiyon: İşleyişi denetleme · Kullanıcı arayüzü · Donanımı paylaştırma · Programları koordine etme · G/Ç işlemleri.',
          'Gelişim Evreleri: 1946–52 Komut-komut · 1952–57 İşten-işe (punchcard, 1401–7094–1401) · 1957–62 Toplu işleme (Batch, Görev Kuyruğu) · 1962–67 Çoklu programlama · 1967– Zaman paylaşımı (Time sharing).',
        ],
      },
      {
        h: '9 İşletim Sistemi Türü ve Sanal Makine',
        items: [
          '1. Ana Bilgisayar (Mainframe): IBM z/OS, Linux for zSeries.',
          '2. Sunucu (Server): Solaris, FreeBSD, Linux, Windows Server.',
          '3. Dağıtık: Her işlemcinin kendi belleği var; ağ üzerindeki işlemler kullanıcıya görünür/tek sistem gibi.',
          '4. Paralel/Çok İşlemcili: Parallel computers & multicomputers (Windows, Linux).',
          '5. Kişisel Bilgisayar: Tek kullanıcı, multiprogramming (Linux, Windows, MacOS).',
          '6. El Bilgisayarı (PDA): Android, iOS. 7. Gerçek Zamanlı: Milisaniye (VxWorks).',
          '8. Gömülü: Fırın/buzdolabı, program indirilemez (Embedded Linux, QNX, VxWorks).',
          '9. Akıllı Kart: En küçük İS, JVM içerebilir (Sim, Kredi, e-imza).',
          'Sanal Makine (VM): Donanımın yazılım taklidi (Vmware, VirtualBox, Hyper-V).',
        ],
      },
      {
        h: 'Mimari, Önyükleme ve Süreç Yönetimi',
        items: [
          'Kabuk (Shell): CLI ve GUI. Çekirdek (Kernel): Dosya yöneticisi, Aygıt sürücüleri, Bellek yöneticisi, Scheduler, Dispatcher.',
          'Önyükleme (Bootstrapping): ROM\'daki Boot Loader → İS\'yi diskten RAM\'e yükler → kontrolü devreder.',
          'PCB: Program counter, Genel amaçlı registerlar, Ana belleğin ilgili kısmı.',
          'Proses Durumları: Hazır ↔ Çalışır ↔ Askıda (1: Olay bekle, 2: Süre doldu, 3: Tekrar sıra, 4: Olay gerçekleşti).',
          'Scheduler (süreç tablosu, hazır/bekleme havuzu) · Dispatcher (önleyici vs işbirliğine dayalı; Öncelik, En iyi çaba).',
        ],
      },
      {
        h: 'Yarış Yönetimi ve Kilitlenme (Deadlock)',
        items: [
          'Semafor: Kaynak kullanım kontrol bayrağı. Kritik Bölge: Aynı anda tek işlemin girebildiği komut grubu. Mutual Exclusion: Karşılıklı dışlama.',
          'Kilitlenme (Deadlock) — 4 Coffman Koşulu (hepsi şart): 1. Mutual exclusion · 2. Hold and wait · 3. No preemption · 4. Circular wait.',
        ],
      },
    ],
    quiz: [
      {
        q: 'Bilgisayar açıldığında işletim sistemini kalıcı depolamadan RAM\'e aktaran ve ROM\'da bulunan program hangisidir?',
        opts: ['Shell (Kabuk)', 'Boot Loader (Açılış Önyükleyicisi)', 'Dispatcher', 'Semafor'],
        ans: 1,
        exp: 'Sayfa 32: Açılış Önyükleyicisi (Boot Loader) ROM\'daki programdır; İS\'yi yığın depolamadan RAM\'e aktarır ve kontrolü devreder.',
      },
      {
        q: 'Hangisi İşletim Sistemi Çekirdeği (Kernel) bileşenlerinden biri değildir?',
        opts: ['Dosya yöneticisi', 'Aygıt sürücüleri', 'Grafiksel kullanıcı arayüzü (GUI)', 'Bellek yöneticisi'],
        ans: 2,
        exp: 'Sayfa 31: CLI ve GUI Kabuk (Shell) tarafındadır; Kernel ise Dosya yöneticisi, Aygıt sürücüleri, Bellek yöneticisi, Scheduler ve Dispatcher içerir.',
      },
      {
        q: 'İçerisine kullanıcının kendisinin program indirip çalıştıramadığı, genellikle kullanıcı arayüzü olmayan özelleşmiş işletim sistemi türü hangisidir?',
        opts: ['Sunucu İşletim Sistemi', 'Dağıtık İşletim Sistemi', 'Gömülü İşletim Sistemi', 'Kişisel Bilgisayar İşletim Sistemi'],
        ans: 2,
        exp: 'Sayfa 27: Gömülü İşletim Sistemleri (fırın, buzdolabı vb.) özelleşmiştir, içine program indirip çalıştırılamaz (Embedded Linux, QNX, VxWorks).',
      },
      {
        q: 'Proses Durum Modeli\'nde bir işlem CPU\'yu kullanma süresi dolduğunda hangi duruma geçer?',
        opts: ['Çalışır → Askıda', 'Çalışır → Hazır', 'Askıda → Sonlan', 'Hazır → Askıda'],
        ans: 1,
        exp: 'Sayfa 35: 2 numaralı ok: Prosesin CPU\'yu kullanma süresi dolmuşsa Çalışır durumundan Hazır durumuna geçer.',
      },
      {
        q: 'Hangisi Kilitlenme (Deadlock) için gereken 4 Coffman koşulundan biri değildir?',
        opts: ['Mutual exclusion', 'Hold and wait', 'Preemption (Zorla alma)', 'Circular wait'],
        ans: 2,
        exp: 'Sayfa 42: Koşullar Mutual exclusion, Hold and wait, NO preemption (zorla bırakmama) ve Circular wait\'tir.',
      },
      {
        q: 'PDF\'te örnek olarak verilen sanal makine (VM) yazılımları hangileridir?',
        opts: ['Solaris, FreeBSD, QNX', 'Vmware, VirtualBox, Hyper-V', 'VxWorks, Embedded Linux', 'JVM, Python, CLI'],
        ans: 1,
        exp: 'Sayfa 29: Sanal Makine örnekleri: Vmware, VirtualBox, Hyper-V.',
      },
    ],
    slides: [
      {
        n: 2,
        t: 'İşletim Sistemi ve Katmanlar (Sayfa 2–6)',
        body: '<p>Kullanıcı ↔ Uygulama ↔ İşletim Sistemi ↔ Donanım. Fonksiyonlar: İşleyişi denetlemek, kullanıcı arayüzü sağlamak, donanımı paylaştırmak, yürütmeyi koordine etmek, G/Ç işlemleri.</p>',
      },
      {
        n: 8,
        t: 'Gelişim Evreleri (Sayfa 7–18)',
        body: '<ul><li>1946–1952: Komut komut yürütme (Seri işlem)</li><li>1952–1957: İşten-işe yürütme (Job to Job, punchcard)</li><li>1957–1962: Toplu işleme (Batch processing)</li><li>1962–1967: Çoklu programlama (Multi programming)</li><li>1967–: Zaman paylaşımı (Time sharing)</li><li>Günümüz: Mikroişlemcili İşletim Sistemleri</li></ul>',
      },
      {
        n: 19,
        t: 'İşletim Sistemi Türleri (Sayfa 19–29)',
        body: '<p>9 Tür: Mainframe (IBM z/OS), Sunucu (Solaris, FreeBSD, Linux, Windows Server), Dağıtık, Paralel/Çok İşlemcili, Kişisel Bilgisayar, El Bilgisayarı (PDA: Android, iOS), Gerçek Zamanlı (VxWorks), Gömülü (Embedded Linux, QNX, VxWorks), Akıllı Kart (Sim, Kredi, e-imza, JVM). Sanal Makine: Vmware, VirtualBox, Hyper-V.</p>',
      },
      {
        n: 31,
        t: 'İşletim Sistemi Mimarisi ve Önyükleme (Sayfa 30–33)',
        body: '<p>Kabuk (CLI, GUI) ve Çekirdek (Dosya, Sürücü, Bellek, Scheduler, Dispatcher). Önyükleme (Bootstrapping): ROM\'daki Boot Loader İS\'yi RAM\'e yükler.</p>',
      },
      {
        n: 34,
        t: 'Süreç Yönetimi: PCB, Scheduler, Dispatcher (Sayfa 34–39)',
        body: '<p>PCB (Program counter, Genel amaçlı registerlar, Ana belleğin ilgili kısmı). Durumlar: Hazır, Çalışır, Askıda (Sayfa 35). Scheduler süreç tablosunu tutar; Dispatcher CPU ataması yapar (önleyici veya işbirliğine dayalı).</p>',
      },
      {
        n: 40,
        t: 'Yarış Yönetimi ve Kilitlenme / Deadlock (Sayfa 40–43)',
        body: '<p>Semafor, Kritik bölge, Mutual exclusion. Deadlock Coffman koşulları: 1) Mutual exclusion, 2) Hold and wait, 3) No preemption, 4) Circular wait.</p>',
      },
    ],
  },

  {
    id: 'w6',
    tag: 'Hafta 6',
    title: 'Mikroişlemciler, Mimari ve Makine Dili',
    pdfName: 'Mikroişlemciler (46 Sayfa)',
    desc: 'Mikroişlemci gelişimi (4004\'ten günümüze), komut döngüsü ve kesmeler, 6 ayırt edici özellik, von Neumann vs Harvard, ALU/Kaydediciler/Yollar, Ek-C Sanal Makine ve Mikrodenetleyiciler.',
    hapBilgiler: [
      {
        badge: 'Temel İlke',
        q: 'Mikroişlemci ve Entegre Devre (IC) ilişkisi nasıldır?',
        a: 'Her mikroişlemci bir entegre devredir; ama her entegre devre mikroişlemci değildir. Sıradan IC tek görev yapar; mikroişlemci programlanabilir ve çok yönlüdür.',
        slide: 4,
      },
      {
        badge: 'Komut Döngüsü',
        q: 'Komut döngüsünün 4 aşaması nelerdir?',
        a: '1) Getir (Fetch: PC\'deki adresten komut IR\'ye alınır), 2) Çöz (Decode), 3) Yürüt (Execute), 4) Kesmeyi kontrol et (INT? varsa ISR çalıştırılır).',
        slide: 11,
      },
      {
        badge: '6 Ayırt Edici Özellik',
        q: 'Mikroişlemcileri birbirinden ayıran 6 özellik nelerdir?',
        a: '1) Kelime uzunluğu (4..64 bit), 2) Komut işleme hızı (MIPS), 3) Adresleme kapasitesi (2ⁿ), 4) Kaydedici sayısı, 5) Adresleme modları, 6) Komut seti türü (CISC / RISC).',
        slide: 15,
      },
      {
        badge: 'Adresleme Kapasitesi',
        q: '16, 20, 32 ve 48 adres hattıyla ne kadar bellek adreslenir?',
        a: '16 hat (8080): 2¹⁶ = 64 KB · 20 hat (8086): 2²⁰ = 1 MB · 32 hat (80386): 2³² = 4 GB · 48 hat (x86-64 pratik): 256 TB.',
        slide: 18,
      },
      {
        badge: 'CISC vs RISC',
        q: 'CISC ve RISC farkı ve güncel örnekleri nelerdir?',
        a: 'CISC (Intel/AMD x86): Çok sayıda karmaşık komut, aynı iş daha az komutla, sıralı/kademeli. RISC (ARM, RISC-V, MIPS; telefonlar ve Apple M serisi): Az ve basit komut, pipeline tekniği, daha az transistör.',
        slide: 21,
      },
      {
        badge: 'von Neumann vs Harvard',
        q: 'von Neumann darboğazı nedir ve nasıl hafifletilir?',
        a: 'von Neumann\'da program ve veri tek yolu paylaşır; CPU bellekten veri beklerken zaman kaybeder (darboğaz). Bunu hafifletmek için önbellek (cache) ve dallanma tahmini (branch prediction) geliştirilmiştir. Harvard\'da iki ayrı bellek vardır.',
        slide: 25,
      },
      {
        badge: '3 İletim Yolu (Bus)',
        q: 'Adres yolu, Veri yolu ve Kontrol yolunun yönleri nelerdir?',
        a: 'Adres yolu: Tek yönlü (CPU → bellek/GÇ). Veri yolu: Çift yönlü (↔). Kontrol yolu: Tek yönlü (RD, WR, CLK, INT).',
        slide: 32,
      },
      {
        badge: 'Sanal Makine (Ek-C)',
        q: 'Sanal makinede her komut neden PC\'yi 2 artırır?',
        a: 'Her komut 16 bittir (4 hex basamak) ve ana bellek hücreleri 8 bitliktir (256 hücre: 00–FF). Bir komut 2 hücre kapladığı için PC 2 artar (A0 → A2 → A4).',
        slide: 41,
      },
      {
        badge: 'MPU vs MCU',
        q: 'Mikroişlemci (MPU) ve Mikrodenetleyici (MCU) farkı nedir?',
        a: 'Mikroişlemci yalnızca CPU\'dur; RAM/ROM/GÇ dışarıdan bağlanır, genel amaçlıdır (PC, telefon). Mikrodenetleyici (PIC16F877, ATmega328P/Arduino Uno, STM32, ESP32) CPU+RAM+ROM/Flash+GÇ+Zamanlayıcı tek çiptedir, özel amaçlıdır.',
        slide: 46,
      },
    ],
    summaryA4: [
      {
        h: 'Tanım ve Tarihsel Gelişim',
        items: [
          'Mikroişlemci: CPU fonksiyonlarını tek bir yarı iletken tümdevrede (IC) birleştiren programlanabilir bileşen.',
          '1944 Mark I (çarpma ≈6 sn) → 1946 ENIAC (≈18.000 tüp, ≈150 kW) → 1947 Transistör (Bell Lab.) → 1958–59 Entegre devre.',
          '1971 Intel 4004 (4 bit, 2.300 transistör, 0,74 MHz) → 1972 8008 (8 bit) → 1974 8080 (8 bit, ≈4.500 tr.) → 1976 Zilog Z80 → 1978 8086 (16 bit, x86) → 1985 80386 (32 bit) → 1995 Pentium Pro (5,5M tr.) → 1999 Pentium III (1 GHz+) → Günümüz (on milyarlarca tr., 3–5 GHz, 64 bit, 8–24+ çekirdek).',
        ],
      },
      {
        h: 'Görevler, Döngü ve 6 Özellik',
        items: [
          'Komut Döngüsü: Getir (PC→IR) → Çöz (Decode) → Yürüt (Execute) → Kesmeyi kontrol et (INT? → ISR).',
          '1. Kelime Uzunluğu: Saat darbesinde işlenen bit (veri yolu ve kaydedici genişliği).',
          '2. Hız: MIPS (Örn: 1 GHz / 2 darbe = 500 MIPS).',
          '3. Adresleme Kapasitesi: n hat → 2ⁿ adres (16→64KB, 20→1MB, 32→4GB, 48→256TB).',
          '4. Kaydediciler (8086): Genel (AX, BX, CX, DX, SI/DI, BP/SP) · Özel (CS, DS, IP, FLAGS: C, Z, D, V, N).',
          '5. Adresleme Modları: Anlık (MOV CL, 16h) · Doğrudan (MOV AX, [1000]) · Dolaylı (MOV AX, [SI]) · Kaydedici (MOV AL, BL) · İndisli (MOV AX, [SI+4]).',
          '6. CISC (x86) vs RISC (ARM, RISC-V, MIPS; Apple M serisi).',
        ],
      },
      {
        h: 'İç Yapı, Mimari ve İletim Yolları',
        items: [
          'CPU 4 Yetenek: Saklama · Hesaplama · Karar verme · Giriş/Çıkış.',
          'von Neumann (tek yol, darboğaz → cache + branch prediction) vs Harvard (ayrı program ve veri belleği).',
          'Bellek Hiyerarşisi (hızlı/pahalı ↑): Kaydedici > Önbellek (cache) > RAM > Disk/SSD.',
          'Yollar (Bus): Adres yolu (tek yönlü, kapasite belirler) · Veri yolu (çift yönlü, performans belirler) · Kontrol yolu (tek yönlü: RD, WR, CLK, INT).',
        ],
      },
      {
        h: 'Ek-C Sanal Makine ve Mikrodenetleyiciler',
        items: [
          'Intel Örnek: 1011 0000 0110 0001 = B0 61 = MOV AL, 61H (ASCII "a" = 97).',
          'Sanal Makine: 16 yazmaç (0–F), 256×8 bit bellek (00–FF), 16 bit komut (4 hex), PC her komutta +2 artar.',
          'Ek-C Komutlar: 1 LOAD (bellekten) · 2 LOAD (anlık) · 3 STORE · 4 MOVE · 5 ADD (2\'nin tümleyeni) · 6 ADD (kayan nokta) · 7 OR · 8 AND · 9 XOR · A ROTATE · B JUMP · C HALT.',
          'Mikrodenetleyici (MCU): CPU+RAM+ROM/Flash+GÇ+Zamanlayıcı+ADC+PWM+UART+SPI/I²C/CAN tek çipte. Örn: PIC16F877, ATmega328P (Arduino Uno), STM32, ESP32.',
        ],
      },
    ],
    quiz: [
      {
        q: '1 GHz saat frekansına sahip bir işlemcide bir komut ortalama 2 saat darbesi sürüyorsa hızı kaç MIPS\'tir?',
        opts: ['250 MIPS', '500 MIPS', '1000 MIPS', '2000 MIPS'],
        ans: 1,
        exp: 'Sayfa 17: 1.000.000.000 / 2 = 500 milyon komut/s = 500 MIPS.',
      },
      {
        q: '20 adres hattına sahip Intel 8086 işlemcisinin doğrudan adresleyebileceği bellek kapasitesi nedir?',
        opts: ['64 KB', '1 MB', '4 GB', '256 TB'],
        ans: 1,
        exp: 'Sayfa 18: 2²⁰ = 1 MB (Intel 8086). 16 hat = 64 KB, 32 hat = 4 GB, 48 hat = 256 TB.',
      },
      {
        q: 'MOV AX, [SI+4] komutu hangi adresleme moduna örnektir?',
        opts: ['Anlık adresleme', 'Doğrudan adresleme', 'Dolaylı adresleme', 'İndisli adresleme'],
        ans: 3,
        exp: 'Sayfa 20: İndisli adresleme — MOV AX, [SI+4] (SI\'daki adrese 4 eklenir).',
      },
      {
        q: 'Üç iletim yolundan (bus) hangisi çift yönlü (CPU ↔ bellek / G/Ç) veri taşır?',
        opts: ['Adres yolu', 'Veri yolu', 'Kontrol yolu', 'Kesme yolu'],
        ans: 1,
        exp: 'Sayfa 32: Veri yolu çift yönlüdür; Adres yolu ve Kontrol yolu CPU\'dan bellek/GÇ\'ye tek yönlüdür.',
      },
      {
        q: 'Ek-C Sanal Makinesi\'nde "35A7" komutu ne anlama gelir?',
        opts: [
          'A7 adresindeki veriyi yazmaç 5\'e yükle',
          'Yazmaç 5\'in içeriğini A7 adresli bellek hücresine yaz (STORE)',
          'Yazmaç 3 ile 5\'i topla A7\'ye yaz',
          'Yazmaç 5, R0\'a eşitse A7\'ye atla',
        ],
        ans: 1,
        exp: 'Sayfa 37: 3 = STORE op-code, 5 = kaynak yazmaç 5, A7 = hedef bellek adresi.',
      },
      {
        q: 'Hangisi tek çipte CPU, RAM, ROM/Flash ve G/Ç kapılarını barındıran bir mikrodenetleyici (MCU) örneği değildir?',
        opts: ['PIC16F877', 'ATmega328P (Arduino Uno)', 'ESP32', 'Intel 80386'],
        ans: 3,
        exp: 'Sayfa 45: MCU örnekleri PIC16F877, ATmega328P, STM32, ESP32\'dir. Intel 80386 bir mikroişlemcidir.',
      },
    ],
    slides: [
      {
        n: 4,
        t: 'Mikroişlemci Nedir? ve Tarihçe (Sayfa 4–8)',
        body: '<p>CPU fonksiyonlarını tek bir IC\'de birleştirir. İçinde ALU, Kontrol birimi, Kaydediciler, İç veri yolları vardır. 1971 Intel 4004 (4 bit, 2.300 tr., 0,74 MHz) → Günümüz (on milyarlarca tr., 3–5 GHz, 64 bit, 8–24+ çekirdek).</p>',
      },
      {
        n: 11,
        t: 'Komut Döngüsü ve Kesmeler (Sayfa 10–13)',
        body: '<p>1. Getir (Fetch) → 2. Çöz (Decode) → 3. Yürüt (Execute) → 4. Kesmeyi kontrol et (INT? → ISR). Kesme kaynakları: Klavye, Disk, Sensör, Zamanlayıcı.</p>',
      },
      {
        n: 15,
        t: '6 Ayırt Edici Özellik (Sayfa 15–21)',
        body: '<p>1. Kelime uzunluğu · 2. Komut işleme hızı (MIPS) · 3. Adresleme kapasitesi (2ⁿ) · 4. Kaydedici sayısı (8086: AX, BX, CX, DX, SI/DI, BP/SP; CS, DS, IP, FLAGS) · 5. Adresleme modları (Sayfa 20) · 6. CISC vs RISC (Sayfa 21).</p>',
      },
      {
        n: 24,
        t: 'İç Yapı, Mimari, Bellek ve Yollar (Sayfa 23–33)',
        body: '<p>von Neumann (darboğaz → cache + branch prediction) vs Harvard (Sayfa 25). Bellek hiyerarşisi: Kaydedici > Önbellek > RAM > Disk/SSD. Adres (tek yönlü), Veri (çift yönlü), Kontrol (tek yönlü) yolları (Sayfa 32). 2+5 hesap makinesi akışı.</p>',
      },
      {
        n: 36,
        t: 'Sanal Makine ve Ek-C Makine Dili (Sayfa 35–42)',
        body: '<p>16 yazmaç (0–F), 256×8 bit bellek (00–FF), 16-bit komut (4 hex). Örnek program: 156C, 166D, 5056, 306E, C000. PC her komutta 2 artar.</p>',
      },
      {
        n: 44,
        t: 'Performans ve Mikrodenetleyiciler (Sayfa 44–46)',
        body: '<p>Performans: Saat frekansı, Çekirdek sayısı, MIPS, Önbellek, Mimari. MCU (PIC16F877, ATmega328P, STM32, ESP32) vs Mikroişlemci farkları (Sayfa 46).</p>',
      },
    ],
  },
];

// ============================================================================
// HOCANIN SORU METODLARINA ÖZEL 3 VİZE SINAV SENARYOSU
// Format: Doğru/Yanlış (tf) + Çoktan Seçmeli Test (test) + Klasik (classic) = 100 Puan
// Kurallar: Tarih sorusu yok (İLKLER odaklı), Minterm/Maxterm yalnızca sözel,
// Karnaugh/diyagram çözümleme yok, sözel + sayısal dengeli.
// ============================================================================
export const EXAM_SCENARIOS: ExamScenario[] = [
  {
    id: 'vize-1',
    title: 'Senaryo 1: Hocanın Standart Karma Vizesi (D/Y + Test + Klasik)',
    badge: 'VİZE · Senaryo 1 (Dengeli Sözel & Sayısal)',
    desc: 'Dersin vize yapısına uygun olarak Doğru/Yanlış, Test ve Klasik bölümlerinden oluşur. İlklere, Minterm/Maxterm sözel ayrımına, Boole sadeleştirmeye, algoritma izlemeye ve Ek-C/MIPS sayısal sorularına dengeli biçimde yer verir.',
    durationMin: 30,
    formatSummary: '5 Doğru/Yanlış (20p) + 5 Test (30p) + 5 Klasik (50p) = 100 Puan',
    questions: [
      // --- BÖLÜM 1: DOĞRU / YANLIŞ (5 x 4 = 20 Puan) ---
      {
        kind: 'tf',
        points: 4,
        src: 'Hafta 1 / Sayfa 8',
        q: 'Harvard Mark I, programı insan müdahalesi olmadan sürekli yürüten ilk bilgisayar olmasına rağmen elektronik değildi; insanlık tarihinde geliştirilen genel amaçlı ilk elektronik bilgisayar ENIAC\'tır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 1 Sayfa 8: Mark I elektronik değildi; ENIAC ise insanlık tarihinde geliştirilen genel amaçlı ilk bilgisayardır.',
      },
      {
        kind: 'tf',
        points: 4,
        src: 'Hafta 1 / Sayfa 22',
        q: 'Kabul edilen ilk bilgisayar virüsü olan "The Creeper" Apple DOS 3.3 sistemine kontrol dışı bulaşmış, "Elk Cloner" ise ARPANET\'te zararsız deney amaçlı yazılmıştır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 1 Sayfa 22: İfadeler ters verilmiştir. İlk virüs ARPANET\'te deney amaçlı/zararsız "The Creeper", ilk kontrol dışı virüs ise Apple DOS 3.3\'e bulaşan "Elk Cloner"dır.',
      },
      {
        kind: 'tf',
        points: 4,
        src: 'Hafta 2 / Sayfa 28',
        q: 'Minterm yaklaşımı "Çarpımların Toplamı" (Sum of Products) esasına dayanır ve her bir minterm teriminde değişkenler VE işlemine alınarak sonucun 1 olması sağlanır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 2 Sayfa 28–30: Minterm (Minimal sum of products) değişkenlerin VE işlemine alınıp sonucun 1 olmasını hedefler.',
      },
      {
        kind: 'tf',
        points: 4,
        src: 'Hafta 5 / Sayfa 31',
        q: 'İşletim sistemi mimarisinde kullanıcı ile komut satırı (CLI) veya grafik arayüz (GUI) üzerinden iletişim kuran katman Çekirdek (Kernel) olarak adlandırılır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 5 Sayfa 31: CLI ve GUI ile kullanıcıyla iletişime geçen katman Kabuk (Shell) katmanıdır; Çekirdek (Kernel) dosya, sürücü, bellek ve süreç yönetimini yapar.',
      },
      {
        kind: 'tf',
        points: 4,
        src: 'Hafta 6 / Sayfa 4',
        q: 'Her mikroişlemci bir entegre devredir; ancak her entegre devre programlanabilir çok yönlü bir mikroişlemci değildir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 6 Sayfa 4: Sıradan entegre devreler tek bir sabit görev yaparken mikroişlemci CPU işlevlerini tek IC\'de birleştiren programlanabilir yapıdır.',
      },

      // --- BÖLÜM 2: ÇOKTAN SEÇMELİ TEST (5 x 6 = 30 Puan) ---
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 1 / Sayfa 14–17',
        q: 'Aşağıdaki "ilkler" eşleştirmelerinden hangisi tamamen doğrudur?',
        opts: [
          '2. Kuşak ilk model: IBM 360 · 3. Kuşak ilk model: IBM 1401 · İlk mikroişlemci: Intel 4004',
          '2. Kuşak ilk model: IBM 1401 · 3. Kuşak ilk model: IBM 360 · İlk mikroişlemci: Intel 4004',
          'İlk ekrana sahip PC: Macintosh · İlk klavye-fareli PC: IBM PC · Türkiye ilk: IBM 1401',
          'İlk programcı: George Boole · Türkiye\'deki ilk bilgisayar: ENIAC · İlk CPU: 4. Kuşak',
        ],
        ans: 1,
        exp: 'Hafta 1 Sayfa 14–20: 2. Kuşak ilk bilgisayar IBM 1401, 3. Kuşak ilk bilgisayar IBM 360 (ilk CPU ve İS), 4. Kuşak ilk mikroişlemci Intel 4004.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 2 / Sayfa 5',
        q: 'Onaltılık (Hexadecimal) tabandaki E ve B sayılarının İkilik (Binary) tabandaki karşılıkları sırasıyla nedir?',
        opts: ['1101 ve 1010', '1110 ve 1011', '1111 ve 1100', '1100 ve 1011'],
        ans: 1,
        exp: 'Hafta 2 Sayfa 5: E (14) = 1110₂, B (11) = 1011₂.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 3 / Sayfa 9',
        q: 'Akış şemalarında karar (Evet/Hayır) yapısı ile önceden tanımlanmış bir alt yordamı/fonksiyonu çağırmak için kullanılan semboller sırasıyla hangileridir?',
        opts: [
          'Paralelkenar ve Daire (Bağlaç)',
          'Eşkenar Dörtgen (Karar) ve Belirlenmiş Eylem (Predefined Process)',
          'Dikdörtgen (İşlem) ve Belge (Document)',
          'Uçbirim (Terminal) ve Bağlaç (Connector)',
        ],
        ans: 1,
        exp: 'Hafta 3 Sayfa 9: Eşkenar dörtgen ikili karar içindir; Belirlenmiş Eylem (Predefined Process) alt yordam/fonksiyon çağırır.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 4 / Sayfa 33–35',
        q: 'Java programlama dilinin hibrit çalışma modeli için hangi akış doğrudur?',
        opts: [
          'Kaynak kod (.java) → doğrudan CPU tarafından satır satır yorumlanır',
          'Kaynak kod (.java) → javac derleyicisi → Bytecode (.class) → JVM (Yorumlayıcı + JIT)',
          'Kaynak kod (.java) → Assembler → Linker → makine kodu (.exe)',
          'Kaynak kod (.java) → Parser → HTML → Tarayıcı',
        ],
        ans: 1,
        exp: 'Hafta 4 Sayfa 35: Java önce javac ile ara koda (bytecode .class) derlenir, ardından JVM içinde yorumlayıcı + JIT ile çalıştırılır.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 6 / Sayfa 18',
        q: '32 adres hattına sahip bir işlemcinin (örneğin 80386) doğrudan adresleyebileceği maksimum bellek kapasitesi kaçtır?',
        opts: ['64 KB', '1 MB', '4 GB', '256 TB'],
        ans: 2,
        exp: 'Hafta 6 Sayfa 18: Adresleme kapasitesi 2ⁿ formülüyle hesaplanır; 2³² = 4 GB.',
      },

      // --- BÖLÜM 3: KLASİK SORULAR (5 x 10 = 50 Puan) ---
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 1 / Sayfa 16 & Hafta 4 / Sayfa 9',
        q: 'Klasik (Sözel — İlklere Odaklı): Aşağıdaki "ilklerin" karşılıklarını ve kısa özelliklerini yazınız:\n1) İlk bilgisayar programcısı ve yazdığı ilk program\n2) Türkiye\'ye gelen ilk bilgisayar\n3) İlk ekrana sahip PC ve ilk klavye-fareli PC',
        modelAnswer:
          '1) İlk bilgisayar programcısı Ada Lovelace\'tır; Charles Babbage\'ın Analitik Makinesi için Bernoulli sayılarını hesaplayan ilk algoritmayı/programı yazmıştır.\n2) Türkiye\'deki ilk bilgisayar IBM 650-Data modelidir.\n3) İlk ekrana sahip kişisel bilgisayar IBM PC, ilk klavye ve fareye sahip kişisel bilgisayar ise Macintosh\'tur.',
        expectedKeywords: ['ada lovelace', 'bernoulli', 'ibm 650', 'ibm pc', 'macintosh'],
        exp: 'Hafta 1 Sayfa 16 ve Hafta 4 Sayfa 9: Vize sınavında tarihlerden ziyade bilişim tarihindeki bu ilklere ve tanımlarına hâkim olunması beklenir.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 2 / Sayfa 28–30',
        q: 'Klasik (Sözel — Minterm & Maxterm): Minterm ve Maxterm kavramlarını işlem yapmadan sözel olarak açıklayınız ve aralarındaki 3 temel farkı (hangi mantık işlemi kullanıldığı, hangi çıkış değerinin hedeflendiği ve kanonik biçim adı) belirtiniz.',
        modelAnswer:
          'Minterm, "Çarpımların Toplamı" (Sum of Products) yönteminin temel terimidir; değişkenler VE (AND) işlemine alınarak terimin sonucunun 1 olması sağlanır ve bu 1 veren terimler VEYA ile toplanır.\nMaxterm ise "Toplamların Çarpımı" (Product of Sum) yönteminin temel terimidir; değişkenler VEYA (OR) işlemine alınarak terimin sonucunun 0 olması sağlanır ve bu 0 veren terimler VE ile çarpılır.',
        expectedKeywords: ['ve', 'veya', '1', '0', 'çarpımların toplamı', 'toplamların çarpımı'],
        exp: 'Hafta 2 Sayfa 28–30: Minterm (VE işlemi, sonuç 1, çarpımların toplamı) ve Maxterm (VEYA işlemi, sonuç 0, toplamların çarpımı) sözel karşılaştırması.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 2 / Sayfa 20',
        q: 'Klasik (Sayısal — Boole Sadeleştirme): F = ABC + ABC\' + AB\' + BC\' ifadesini Boole cebri kurallarını adım adım göstererek en sade haline indirgeyiniz.',
        modelAnswer:
          '1) İlk iki terimden AB ortak parantezi alınır: AB(C + C\') + AB\' + BC\'\n2) Tümleyen kuralı gereği (C + C\' = 1) ve VE kuralı (AB.1 = AB): AB + AB\' + BC\'\n3) İlk iki terimden A ortak parantezi alınır: A(B + B\') + BC\'\n4) (B + B\' = 1) olduğundan en sade sonuç: F = A + BC\' bulunur.',
        expectedKeywords: ['ab(c+c\')', 'c+c\'', 'a(b+b\')', 'a + bc\'', 'a+bc\''],
        exp: 'Hafta 2 Sayfa 20 (Soru 1): Dağılma ve tümleyen (X + X\' = 1) kuralları uygulanarak A + BC\' sonucuna ulaşılır.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 5 / Sayfa 32 & 42',
        q: 'Klasik (Sözel — İşletim Sistemi): Bilgisayar açıldığında gerçekleşen Önyükleme (Bootstrapping) sürecini kısaca açıklayınız ve bir Kilitlenme (Deadlock) oluşması için aynı anda gerçekleşmesi gereken 4 Coffman koşulunu yazınız.',
        modelAnswer:
          'Önyükleme (Bootstrapping): Bilgisayara güç verildiğinde ROM içinde kalıcı olarak bulunan Boot Loader (Açılış Önyükleyicisi) çalışır, işletim sistemini ikincil depolamadan (disk/SSD) RAM\'e yükler ve kontrolü işletim sistemine devreder.\nDeadlock 4 Coffman Koşulu: 1) Mutual exclusion (Karşılıklı dışlama), 2) Hold and wait (Tut ve bekle), 3) No preemption (Zorla alamama), 4) Circular wait (Dairesel bekleme).',
        expectedKeywords: ['rom', 'boot loader', 'ram', 'mutual exclusion', 'hold and wait', 'no preemption', 'circular wait'],
        exp: 'Hafta 5 Sayfa 32 & 42: Bootstrapping (ROM → RAM) ve Deadlock için 4 koşulun eksiksiz bilinmesi gerekir.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 6 / Sayfa 17 & 38–42',
        q: 'Klasik (Sayısal — İşlemci Hızı & Makine Dili):\na) Saat frekansı 2 GHz olan bir işlemcide bir komut ortalama 4 saat darbesinde yürütülüyorsa işlemcinin hızı kaç MIPS\'tir?\nb) Ek-C Sanal Makinesi\'nde her komut 16 bit (4 hex basamak) ve her bellek hücresi 8 bit olduğuna göre; A0 adresinden başlayan 3 komutluk bir programda 3. komut getirildikten sonra Program Sayacı (PC) değeri hex olarak ne olur?',
        modelAnswer:
          'a) 2 GHz = 2.000.000.000 Hz (darbe/s). Komut hızı = 2.000.000.000 / 4 = 500.000.000 komut/s = 500 MIPS.\nb) Her 16 bitlik komut 2 adet 8 bitlik bellek hücresi kapladığı için PC her komutta 2 artar: 1. komut A0–A1 (PC=A2), 2. komut A2–A3 (PC=A4), 3. komut A4–A5 getirildikten sonra PC = A6 olur.',
        expectedKeywords: ['500', 'mips', '2', 'a6'],
        exp: 'Hafta 6 Sayfa 17 & 41–42: MIPS = Frekans / Komut Başına Saat Darbesi; Ek-C\'de her komut 2 hücre kapladığı için A0 + (3×2) = A6.',
      },
    ],
  },

  {
    id: 'vize-2',
    title: 'Senaryo 2: İlklere, Kavramlara ve Sistem Mimarisine Özel Vize',
    badge: 'VİZE · Senaryo 2 (İlklere & Sözel Ağırlığa Özel)',
    desc: 'Tarih ezberi yerine bilişimdeki İLKLER, donanım/yazılım bileşenleri, sözel Minterm/Maxterm, akış şeması/OOP ilkeleri, İşletim Sistemleri ve temel sayısal soruları kapsayan 15 soruluk vize senaryosu.',
    durationMin: 30,
    formatSummary: '6 Doğru/Yanlış (30p) + 5 Test (30p) + 4 Klasik (40p) = 100 Puan',
    questions: [
      // --- BÖLÜM 1: DOĞRU / YANLIŞ (6 x 5 = 30 Puan) ---
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 1 / Sayfa 17–19',
        q: 'İlk Merkezi İşlem Birimi (CPU) ve programların bir işletim sistemi altında çalıştırılması entegre devrelerin kullanıldığı 3. Kuşak bilgisayarlarda (ilk model IBM 360) başlamıştır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 1 Sayfa 17: 3. Kuşak\'ta transistörler entegre devrelere dönüştürüldü, ilk CPU yapıldı ve işletim sistemi altında çalışma başladı (ilk model IBM 360).',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 1 / Sayfa 34–36',
        q: 'SSD depolama birimleri manyetik dönen disklere sahip olduğu için HDD\'lere göre hareketli parçası daha fazladır.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 1 Sayfa 35–36: Dönen manyetik disk (hareketli parça) HDD\'dedir; SSD flaş bellek kullanır ve hareketli parçası yoktur.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 2 / Sayfa 30',
        q: 'Maxterm (Toplamların Çarpımı) yönteminde terimlerin her biri VEYA işlemine alınarak sonucun 0 olması hedeflenir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 2 Sayfa 30: Maxterm (Minimal product of sum) değişkenlerin VEYA işlemine alınıp sonucun 0 olması mantığına dayanır.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 4 / Sayfa 15',
        q: 'Programlama dilleri gibi biçimsel dillerde gramer kuralları sonradan açıklayıcı olarak çıkarılırken, doğal dillerde gramer baştan kesin ve tanımlayıcı olarak belirlenir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 4 Sayfa 15: Tam tersidir. Biçimsel dilde gramer ÖNCE ve tanımlayıcıdır; doğal dilde SONRADAN ve açıklayıcıdır.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 5 / Sayfa 27–28',
        q: 'Gömülü işletim sistemlerine kullanıcı dışarıdan yeni program indirip kuramazken, en küçük işletim sistemi türü olan Akıllı Kart işletim sistemleri JVM (Java Sanal Makinesi) içerebilir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 5 Sayfa 27–28: Gömülü İS özelleşmiştir (program indirilemez); Akıllı Kart İS en küçük İS olup JVM barındırabilir.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 6 / Sayfa 32',
        q: 'Mikroişlemci ile bellek/GÇ arasındaki üç iletim yolundan Adres yolu ve Kontrol yolu tek yönlü, Veri yolu ise çift yönlüdür.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 6 Sayfa 32: Adres ve Kontrol yolları CPU\'dan dışa tek yönlü; Veri yolu çift yönlüdür.',
      },

      // --- BÖLÜM 2: ÇOKTAN SEÇMELİ TEST (5 x 6 = 30 Puan) ---
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 1 / Sayfa 6–7',
        q: 'Bilgisayar öncesi dönemde dokuma makinesi için delikli kart sistemini geliştiren kişi ile daha sonra IBM\'e dönüşecek yapının temelini elektrik sinyalli delikli kartlarla atan kişi sırasıyla kimlerdir?',
        opts: [
          'Blaise Pascal ve Gottfried Leibniz',
          'Jacquard (Jacguard) ve Herman Hollerith',
          'Charles Babbage ve George Boole',
          'Ada Lovelace ve Alan Turing',
        ],
        ans: 1,
        exp: 'Hafta 1 Sayfa 6–7: Jacquard dokuma makinesinde delikli kart sistemini geliştirdi; Herman Hollerith delikli kartlara elektrik sinyali uygulayarak sonradan IBM adını alacak şirketin temelini attı.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 2 / Sayfa 24',
        q: '5 giriş değişkenine sahip bir lojik devrenin doğruluk tablosunda kaç farklı giriş durumu (satır) bulunur?',
        opts: ['10', '16', '25', '32'],
        ans: 3,
        exp: 'Hafta 2 Sayfa 24: n giriş değişkeni için doğruluk tablosundaki durum sayısı 2ⁿ formülüyle 2⁵ = 32 olur.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 4 / Sayfa 43–46',
        q: 'Nesne Yönelimli Programlama\'da (OOP) bir sınıfın dahili verilerine (private) dış erişimi kısıtlama ilkesi ve "bir ...dır" (extends) ilişkisi kuran ilke sırasıyla hangileridir?',
        opts: [
          'Çok Biçimlilik ve Yapıcı Metot (Constructor)',
          'Kapsülleme (Encapsulation) ve Kalıtım (Inheritance)',
          'Kalıtım (Inheritance) ve Çok Biçimlilik (Polymorphism)',
          'Söz Dizimi (Syntax) ve Anlambilim (Semantics)',
        ],
        ans: 1,
        exp: 'Hafta 4 Sayfa 45–46: Kapsülleme private/public ile erişim kısıtlar; Kalıtım "bir ...dır" ilişkisini kurar.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 5 / Sayfa 34–37',
        q: 'İşletim sisteminde bir sürecin Program Counter ve register bilgilerini saklayan yapı ile süreç tablosunu tutup işlemleri hazır/bekleme havuzuna yerleştiren birim sırasıyla hangileridir?',
        opts: [
          'Boot Loader ve Kernel',
          'PCB (Process Control Block) ve Scheduler (Zamanlayıcı)',
          'Semafor ve Dispatcher (Dağıtıcı)',
          'Shell ve Kritik Bölge',
        ],
        ans: 1,
        exp: 'Hafta 5 Sayfa 34 & 37: PCB süreç verilerini (PC, registerlar, bellek kısmı) tutar; Scheduler süreç tablosu ve hazır/bekleme havuzunu yönetir.',
      },
      {
        kind: 'test',
        points: 6,
        src: 'Hafta 6 / Sayfa 25 & 29',
        q: 'von Neumann mimarisindeki bellek darboğazını azaltmak için geliştirilen iki teknik ve bellek hiyerarşisindeki en hızlı birim hangisinde doğru verilmiştir?',
        opts: [
          'Semafor + Kritik Bölge; en hızlı birim RAM',
          'Önbellek (Cache) + Dallanma tahmini (Branch prediction); en hızlı birim Kaydedici (Register)',
          'Linker + Debugger; en hızlı birim SSD',
          'Pipeline + Interrupt; en hızlı birim Önbellek',
        ],
        ans: 1,
        exp: 'Hafta 6 Sayfa 25 & 29: Darboğaza karşı cache ve branch prediction geliştirilmiştir. Bellek hiyerarşisinde en hızlı birim Kaydedici (Register)\'dir.',
      },

      // --- BÖLÜM 3: KLASİK SORULAR (4 x 10 = 40 Puan) ---
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 1 / Sayfa 34–37',
        q: 'Klasik (Sözel — Donanım): RAM ve ROM belleklerin temel farklarını (kalıcılık ve kullanım amacı) açıklayınız; ayrıca Güç Kaynağı (Power Supply) biriminin şebeke elektriğinde yaptığı voltaj dönüşümünü yazınız.',
        modelAnswer:
          'RAM (Ana Bellek), çalıştırılan programların geçici olarak yüklendiği bellektir; elektrik kesildiğinde içindeki tüm bilgiler silinir.\nROM (Yalnız Okunabilir Bellek) ise kalıcıdır, elektrik kesilse de bilgileri korur ve BIOS/UEFI gibi başlangıç kontrol programlarını içerir.\nGüç Kaynağı (Power Supply), şebeke elektriğini (220 Volt) bilgisayar donanımlarının ihtiyaç duyduğu 12 Volt seviyesine düşürür/ayarlar.',
        expectedKeywords: ['geçici', 'silinir', 'kalıcı', 'bios', 'uefi', '220', '12'],
        exp: 'Hafta 1 Sayfa 33–37: RAM/ROM farkı ve Güç Kaynağının 220V → 12V görevi temel iç donanım sorularıdır.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 2 / Sayfa 11–14 & 28–30',
        q: 'Klasik (Sözel — Lojik & Minterm/Maxterm): XOR (Özel VEYA) kapısının çıkışının hangi durumlarda 1 olduğunu açıklayınız; ardından Minterm ile Maxterm arasındaki temel farkı işlem yapmadan sözel olarak özetleyiniz.',
        modelAnswer:
          'XOR (Özel VEYA) kapısı, iki giriş değeri birbirinden farklı olduğunda (A=0, B=1 veya A=1, B=0) 1 çıkışını verir; girişler aynı iken (0,0 veya 1,1) çıkış 0\'dır.\nMinterm (Çarpımların Toplamı) giriş değişkenlerini VE işlemine alarak sonucu 1 yapan terimleri kullanır; Maxterm (Toplamların Çarpımı) ise giriş değişkenlerini VEYA işlemine alarak sonucu 0 yapan terimleri kullanır.',
        expectedKeywords: ['farklı', '0,1', '1,0', 've', 'veya', '1', '0'],
        exp: 'Hafta 2 Sayfa 13 & 28–30: XOR çalışma ilkesi ve Minterm/Maxterm sözel tanımı.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 4 / Sayfa 33 & 37',
        q: 'Klasik (Sözel — Dil Çeviriciler): Derleyici (Compiler) ile Yorumlayıcı (Interpreter) arasındaki 3 temel farkı yazınız ve bir C programının kaynak koddan çalıştırılabilir (.exe) dosyaya uzanan yolculuğundaki araçları sırasıyla belirtiniz.',
        modelAnswer:
          'Farklar: 1) Derleyici programın tamamını tek seferde çevirir, yorumlayıcı satır satır (bir seferde bir komut) çevirir. 2) Derleyici ara/amaç kod (.o) üretir, yorumlayıcı ara kod üretmez. 3) Derleyici hataları sonunda topluca raporlar ve daha hızlı çalışır; yorumlayıcı hatalı satırda durur.\nC Programının Yolculuğu: Editör (kaynak kod .c) → Derleyici (amaç kod .o) → Bağlayıcı / Linker (+ kütüphaneler → .exe) → Hata Ayıklayıcı (Debugger).',
        expectedKeywords: ['tamamını', 'satır', 'ara kod', 'editör', 'derleyici', 'bağlayıcı', 'linker'],
        exp: 'Hafta 4 Sayfa 33 & 37: Derleyici/Yorumlayıcı karşılaştırması ve programın yolculuğu.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 2 / Sayfa 5 & Hafta 6 / Sayfa 18',
        q: 'Klasik (Sayısal — Taban & Kapasite):\na) Onluk tabandaki 13 sayısını İkilik, Sekizlik ve Onaltılık tabanlarda yazınız.\nb) Bir mikroişlemcinin 20 adres hattına sahip olması durumunda doğrudan adresleyebileceği bellek kapasitesi kaç MB\'tır? (Formülüyle gösteriniz)',
        modelAnswer:
          'a) 13₁₀ = 1101₂ (İkilik) = 15₈ (Sekizlik) = D₁₆ (Onaltılık).\nb) Adresleme kapasitesi = 2ⁿ = 2²⁰ = 2¹⁰ × 2¹⁰ = 1024 × 1024 bayt = 1.048.576 bayt = 1 MB.',
        expectedKeywords: ['1101', '15', 'd', '2^20', '1 mb'],
        exp: 'Hafta 2 Sayfa 5 ve Hafta 6 Sayfa 18: Temel taban dönüşümü ve 2ⁿ adresleme kapasitesi hesabı.',
      },
    ],
  },

  {
    id: 'vize-3',
    title: 'Senaryo 3: Sayısal Çözüm, Algoritma İzleme ve Makine Dili Vizesi',
    badge: 'VİZE · Senaryo 3 (Sayısal & Analiz Ağırlıklı)',
    desc: 'Boole kurallarıyla cebirsel sadeleştirme, taban/ALU bit işlemleri, algoritma ve sözde kod izleme, MIPS/adresleme hesapları, Ek-C makine kodu çözümleme ile ilklere ve sözel kavramlara yer veren karma vize.',
    durationMin: 35,
    formatSummary: '4 Doğru/Yanlış (20p) + 6 Test (30p) + 5 Klasik (50p) = 100 Puan',
    questions: [
      // --- BÖLÜM 1: DOĞRU / YANLIŞ (4 x 5 = 20 Puan) ---
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 1 / Sayfa 16 & 23',
        q: 'İlk kişisel bilgisayarlardan IBM PC ilk ekrana sahip model, Macintosh ilk klavye ve fareye sahip model, Türkiye\'deki ilk bilgisayar ise IBM 650-Data modelidir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 1 Sayfa 16: Verilen tüm ilk bilgisayar eşleştirmeleri ders materyaliyle birebir doğrudur.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 2 / Sayfa 19 & 22',
        q: 'Boole Cebri\'ndeki Yutma Kuralı\'na göre A + A.B = A ve A + A\'.B = A eşitlikleri geçerlidir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 2 Sayfa 19 & 22: Yutma kuralı A + A.B = A\'dır; ancak A + A\'.B ifadesi A\'ya değil A + B\'ye eşittir.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 3 / Sayfa 8',
        q: 'Akış şeması hazırlama kurallarına göre akış yönünü korumak şartıyla birbirini kesen akış hatları kullanılabilir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 1,
        exp: 'Hafta 3 Sayfa 8 (Kural 3): Birbirini kesen akış hatları kesinlikle kullanılmamalıdır; gerekirse Bağlaç (Connector) sembolü kullanılır.',
      },
      {
        kind: 'tf',
        points: 5,
        src: 'Hafta 6 / Sayfa 21 & 25',
        q: 'Program belleği ile veri belleğinin fiziksel olarak ayrıldığı mimari Harvard Mimarisi, telefonlarda ve Apple M serisinde kullanılan komut seti ise RISC tabanlı ARM mimarisidir.',
        opts: ['Doğru', 'Yanlış'],
        ans: 0,
        exp: 'Hafta 6 Sayfa 21 & 25: Harvard mimarisinde iki ayrı bellek vardır; mobil işlemciler ve Apple M serisi RISC tabanlı ARM kullanır.',
      },

      // --- BÖLÜM 2: ÇOKTAN SEÇMELİ TEST (6 x 5 = 30 Puan) ---
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 2 / Sayfa 19–21',
        q: 'De Morgan kuralları ve Soru 2: (A + B)(AC + AC\' + CC\') + AB + B ifadesinin en sade hali sırasıyla hangi seçenekte verilmiştir?',
        opts: [
          '(A+B)\' = A\'+B\' ve sade hali: A.B',
          '(A+B)\' = A\'.B\', (A.B)\' = A\'+B\' ve sade hali: A + B',
          '(A+B)\' = A\'.B\' ve sade hali: B',
          '(A.B)\' = A\'.B\' ve sade hali: A\' + B',
        ],
        ans: 1,
        exp: 'Hafta 2 Sayfa 19 & 21: De Morgan (A+B)\'=A\'.B\', (A.B)\'=A\'+B\'. İfadede CC\'=0, AC+AC\'=A → (A+B)A+AB+B = A+AB+B = A+B.',
      },
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 2 / Sayfa 28–30',
        q: 'Minterm ve Maxterm kavramları için sözel olarak aşağıdakilerden hangisi doğrudur?',
        opts: [
          'Minterm toplamların çarpımıdır ve sonucu 0 yapar',
          'Minterm çarpımların toplamıdır (VE işlemi, sonuç 1); Maxterm toplamların çarpımıdır (VEYA işlemi, sonuç 0)',
          'Maxterm yalnızca ikiden az değişkenli devrelerde kullanılır',
          'Her ikisi de yalnızca XOR kapısıyla kurulur',
        ],
        ans: 1,
        exp: 'Hafta 2 Sayfa 28–30: Minterm (SOP: VE, çıkış 1) ve Maxterm (POS: VEYA, çıkış 0) sözel tanımı.',
      },
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 3 / Sayfa 24',
        q: 'Faktöriyel (N!) sözde kodunda i=1 ve FAKT=1 başlangıç değerleriyle "WHILE i ≤ N DO { FAKT ← FAKT * i; i ← i + 1 }" çalıştırıldığında N=4 için döngü bittiği anda (FAKT, i) değerleri ne olur?',
        opts: ['FAKT = 24, i = 4', 'FAKT = 24, i = 5', 'FAKT = 6, i = 4', 'FAKT = 120, i = 5'],
        ans: 1,
        exp: 'Hafta 3 Sayfa 24: i=4 adımında FAKT=24 olur ve i←5 yapılır; i≤4 koşulu bozulduğunda döngü sonlanır (FAKT=24, i=5).',
      },
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 6 / Sayfa 20',
        q: 'MOV AX, [1000] ve MOV AX, [SI+4] komutlarının kullandığı adresleme modları sırasıyla hangileridir?',
        opts: [
          'Anlık ve Kaydedici adresleme',
          'Doğrudan ve İndisli adresleme',
          'Dolaylı ve Anlık adresleme',
          'İndisli ve Doğrudan adresleme',
        ],
        ans: 1,
        exp: 'Hafta 6 Sayfa 20: [1000] Doğrudan adresleme, [SI+4] İndisli adreslemedir.',
      },
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 6 / Sayfa 35',
        q: 'Intel mimarisinde "1011 0000 0110 0001" ikilik makine kodunun onaltılık (Hex) ve Assembly karşılığı nedir?',
        opts: [
          'B0 61 → MOV AL, 61H',
          '35 A7 → STORE R5, A7',
          'A0 61 → ADD AL, 61H',
          'B4 3C → JUMP R4, 3C',
        ],
        ans: 0,
        exp: 'Hafta 6 Sayfa 35: 1011=B, 0000=0, 0110=6, 0001=1 → B0 61 → MOV AL, 61H (ASCII "a").',
      },
      {
        kind: 'test',
        points: 5,
        src: 'Hafta 6 / Sayfa 38–39',
        q: 'Ek-C Sanal Makine komut kümesinde "20A3" ve "14A3" komutları arasındaki temel fark nedir?',
        opts: [
          '20A3 bellekten okur; 14A3 doğrudan A3 sayısını yükler',
          '20A3 doğrudan A3 bit örüntüsünü yazmaç 0\'a yükler; 14A3 ise A3 adresli bellek hücresinin içeriğini yazmaç 4\'e yükler',
          'İkisi de aynı bellek adresini yazmaçlara kopyalar',
          '20A3 yazmaçları toplar; 14A3 sağa döndürür',
        ],
        ans: 1,
        exp: 'Hafta 6 Sayfa 38: Op-code 1 bellek hücresi içeriğini yükler (14A3), Op-code 2 ise verilen değeri doğrudan yazmaca yükler (20A3).',
      },

      // --- BÖLÜM 3: KLASİK SORULAR (5 x 10 = 50 Puan) ---
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 2 / Sayfa 23',
        q: 'Klasik (Sayısal — Boole Sadeleştirme): A\'BC + AB\'C\' + A\'B\'C\' + ABC + AB\'C ifadesini Boole cebri kurallarıyla adım adım sadeleştiriniz.',
        modelAnswer:
          '1) BC ortak parantezi: BC(A\' + A) = BC\n2) AB\' ortak parantezi: AB\'(C\' + C) = AB\'\n3) Kalan ifade: BC + AB\' + A\'B\'C\'\n4) Son iki terimde B\' ortak parantezi: BC + B\'(A + A\'C\')\n5) A + A\'C\' = A + C\' kuralıyla: BC + B\'(A + C\') = BC + B\'A + B\'C\'.',
        expectedKeywords: ['bc', 'ab\'', 'b\'', 'a+c\'', 'b\'a', 'b\'c\''],
        exp: 'Hafta 2 Sayfa 23 (Soru 4): Ortak parantez, tümleyen ve A + A\'X = A + X kuralı uygulanır.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 3 / Sayfa 26',
        q: 'Klasik (Sayısal — Algoritma İzleme): Euclid\'s Algoritması (while n ≠ 0 do { r ← m mod n; m ← n; n ← r } return m) için m = 48, n = 18 başlangıç değerleriyle tüm döngü adımlarındaki (r, m, n) değişimlerini yazınız ve dönen sonucu bulunuz.',
        modelAnswer:
          'Başlangıç: m = 48, n = 18\n1. Adım: r = 48 mod 18 = 12 → m = 18, n = 12\n2. Adım: r = 18 mod 12 = 6 → m = 12, n = 6\n3. Adım: r = 12 mod 6 = 0 → m = 6, n = 0\nn = 0 olduğu için döngü biter ve algoritma m = 6 (EBOB) değerini döndürür.',
        expectedKeywords: ['12', '6', '0', '6'],
        exp: 'Hafta 3 Sayfa 26: Euclid algoritması adımlarının sırayla izlenmesi (48, 18 → 18, 12 → 12, 6 → 6, 0 → sonuç 6).',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 6 / Sayfa 27 & 17',
        q: 'Klasik (Sayısal — ALU & İşlemci Hızı):\na) ALU mantıksal işlemlerinde 1010 AND 1100 ve 1010 XOR 1100 sonuçlarını ayrı ayrı hesaplayınız.\nb) Aynı saat frekansında çalışan A işlemcisinde bir komut 5 saat darbesi, B işlemcisinde 7 saat darbesi sürüyorsa hangisi daha hızlıdır? Nedenini açıklayınız.',
        modelAnswer:
          'a) 1010 AND 1100 = 1000 (her iki bit 1 ise 1); 1010 XOR 1100 = 0110 (bitler farklı ise 1).\nb) A işlemcisi daha hızlıdır; çünkü saat frekansları aynı olduğunda komut başına daha az saat darbesi (5 < 7) harcayan işlemci aynı sürede daha fazla komut yürütür (MIPS değeri daha yüksektir).',
        expectedKeywords: ['1000', '0110', 'a', 'az', 'darbe', 'mips'],
        exp: 'Hafta 6 Sayfa 17 & 27: ALU bit düzeyinde mantıksal işlemler ve saat darbesi-hız ilişkisi.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 6 / Sayfa 38–42',
        q: 'Klasik (Sayısal — Ek-C Makine Dili Çözümleme): Ek-C Sanal Makine komut kümesine göre aşağıdaki 5 komutluk programın her bir komutunun görevini yazınız ve A0 adresinden başlayan programda C000 getirildikten sonra PC değerinin kaç olacağını gösteriniz:\n156C · 166D · 5056 · 306E · C000',
        modelAnswer:
          '156C: 6C adresli bellek hücresindeki içeriği Yazmaç 5\'e yükle (LOAD).\n166D: 6D adresli bellek hücresindeki içeriği Yazmaç 6\'ya yükle (LOAD).\n5056: Yazmaç 5 ve Yazmaç 6\'yı (2\'nin tümleyeni biçiminde) topla, sonucu Yazmaç 0\'a yaz (ADD).\n306E: Yazmaç 0\'daki sonucu 6E adresli bellek hücresine yaz (STORE).\nC000: Programı durdur (HALT).\nProgram A0 adresinden başlar ve her komut 2 hücre kaplar (A0, A2, A4, A6, A8). 5. komut olan C000 getirildikten sonra PC = AA olur.',
        expectedKeywords: ['6c', '6d', 'topla', '6e', 'durdur', 'halt', 'aa'],
        exp: 'Hafta 6 Sayfa 40–42: Ders notlarındaki 5 komutluk toplama programı çözümlemesi ve PC adımı.',
      },
      {
        kind: 'classic',
        points: 10,
        src: 'Hafta 1 / Sayfa 14–22 & Hafta 5 / Sayfa 35–38',
        q: 'Klasik (Sözel — İlklere & İşletim Sistemine Bakış): Bilgisayar tarihinde 1., 2., 3. ve 4. kuşakların temel donanım teknolojilerini ve her kuşağın öne çıkan ilk modelini yazınız; ayrıca İşletim Sistemi\'nde Önleyici (Preemptive) ile İşbirliğine Dayalı (Cooperative) çoklu görev farkını tek cümleyle belirtiniz.',
        modelAnswer:
          'Kuşaklar ve İlk Modeller:\n- 1. Kuşak: Vakumlu tüp (ENIAC ilk genel amaçlı, Mark I elektronik olmayan ilk sürekli programlı)\n- 2. Kuşak: Transistör (İlk model IBM 1401)\n- 3. Kuşak: Entegre devre + ilk CPU ve İS (İlk model IBM 360)\n- 4. Kuşak: Mikroişlemci / Silikon yonga (İlk mikroişlemci Intel 4004)\nÇoklu Görev Farkı: Önleyici çoklu görevde süreçler kesintiler nedeniyle CPU\'yu bırakmak zorunda kalır; işbirliğine dayalıda ise süreç CPU\'yu kendi isteğiyle bırakır.',
        expectedKeywords: ['vakum', 'eniac', 'transistör', 'ibm 1401', 'entegre', 'ibm 360', 'intel 4004', 'kesinti'],
        exp: 'Hafta 1 Sayfa 8–20 ve Hafta 5 Sayfa 38: Kuşak teknolojileri, ilk modeller ve Dispatcher çoklu görev yöntemleri.',
      },
    ],
  },
];


export function resolveSlideForWeek(weekId: string, slideNum: number): { week: WeekModule; slide: SlideItem; requestedNum: number } | null {
  const week = WEEKS.find((w) => w.id === weekId);
  if (!week || week.slides.length === 0) return null;

  const exact = week.slides.find((s) => s.n === slideNum);
  if (exact) return { week, slide: exact, requestedNum: slideNum };

  const sorted = [...week.slides].sort((a, b) => a.n - b.n);
  let fallback = sorted[0];
  for (const s of sorted) {
    if (s.n <= slideNum) fallback = s;
    else break;
  }
  return { week, slide: fallback, requestedNum: slideNum };
}
