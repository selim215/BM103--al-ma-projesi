import {
  BM101ExamScenario,
  BM101ExtraExercise,
  BM101SolvedExample,
} from '../types/bm101';

export const BM101_SOLVED_EXAMPLES: BM101SolvedExample[] = [
  {
    id: 'ex-lab1-avg',
    weekId: 'w1',
    category: 'temel-io',
    title: 'Lab 1: İki Sayının Ortalamasını Hesaplama',
    pdfFile: 'lab_260928_1e9ffad1.pdf',
    pdfLabel: 'lab_260928.pdf',
    slideNum: 10,
    problem:
      'Kullanıcıdan iki ondalıklı sayı alıp ortalamasını virgülden sonra 2 basamak hassasiyetle (%.2f) ekrana yazdıran C programı.',
    codeOrPseudo: `#include <stdio.h>
int main() {
    float sayi1, sayi2, ort;
    printf("Iki sayi giriniz: ");
    scanf_s("%f %f", &sayi1, &sayi2);
    ort = (sayi1 + sayi2) / 2;
    printf("Ortalama: %.2f\\n", ort);
    return 0;
}`,
    expectedOutput: 'Girdi: 5 8  -->  Ortalama: 6.50',
    stepByStepSolution: [
      'Adım 1: float tipinde sayi1, sayi2 ve ort değişkenleri bellekte tanımlanır.',
      'Adım 2: scanf_s ile girilen 5 ve 8 sırasıyla &sayi1 ve &sayi2 adreslerine yazılır.',
      'Adım 3: (5.0 + 8.0) / 2 = 6.5 sonucu ort değişkenine atanır.',
      'Adım 4: %.2f belirteci ile ekrana tam olarak 6.50 yazdırılır.',
    ],
  },
  {
    id: 'ex-d2-cases',
    weekId: 'w2',
    category: 'akıs-diyagramı',
    title: 'Ders 2 Case Studies 1–8: En Büyük/Küçük ve Referans Sayı Akışı',
    pdfFile: '2-_Algoritma_ve_Ak___Diyagramlar__5171d132.pdf',
    pdfLabel: '2- Algoritma ve Akış Diyagramları.pdf',
    slideNum: 29,
    problem:
      'Ders 2 Sayfa 24–31 arasındaki Vaka Çalışmaları: (Case 6-7) 3 sayının en büyüğünü ve en küçüğünü bulma; (Case 8) 1 referans sayı + 5 sayı okuyup referanstan küçükleri yazdırma.',
    codeOrPseudo: `// Case Study 7 (Max & Min of 3):
Oku(a, b, c)
max = a; min = a;
Eğer b > max ise max = b;  Eğer b < min ise min = b;
Eğer c > max ise max = c;  Eğer c < min ise min = c;
Yaz("En Buyuk:", max, "En Kucuk:", min)

// Case Study 8 (Ref'ten Kucukleri Yazdir):
Oku(ref); sayac = 1;
Döngü (sayac <= 5):
    Oku(sayi);
    Eğer sayi < ref ise Yaz(sayi);
    sayac = sayac + 1;`,
    expectedOutput: 'Case 7 (Girdi: 14, 5, 29) -> En Buyuk: 29, En Kucuk: 5',
    stepByStepSolution: [
      'Başlangıçta ilk okunan sayı (a) hem max hem min kabul edilir.',
      'Kalan sayılar tek tek max ve min ile karşılaştırılır; daha büyük/küçük bulunursa güncellenir.',
      'Case 8’de sayaç 1’den 5’e kadar her adımda yeni sayı okunur ve yalnızca ref değerinden küçük olanlar ekrana basılır.',
    ],
  },
  {
    id: 'ex-lab2-fact-delta',
    weekId: 'w2',
    category: 'akıs-diyagramı',
    title: 'Lab 2: Faktöriyel ve İkinci Derece Denklem Kökleri Akış Diyagramı',
    pdfFile: 'lab_261005_bac67355.pdf',
    pdfLabel: 'lab_261005.pdf',
    slideNum: 12,
    problem:
      'Lab 2 s.10–16: (a) Girilen x sayısının faktöriyelini hesaplayan akış şeması, (b) ax^2+bx+c=0 köklerini Delta’ya göre bulan akış şeması.',
    codeOrPseudo: `// (a) Faktöriyel (s.12):
Başla -> Oku x -> sonuc = 1
Döngü: x >= 1 mi?
  Evet -> sonuc = x * sonuc; x = x - 1; (Döngü başına dön)
  Hayır -> Yaz sonuc -> Dur

// (b) İkinci Derece Denklem (s.16):
Başla -> Oku a, b, c -> d = b*b - 4*a*c
Eğer d < 0 ise Yaz "Reel kok yok"
Değilse Eğer d == 0 ise x1 = -b / (2*a); Yaz x1
Değilse x1 = (-b + sqrt(d))/(2*a); x2 = (-b - sqrt(d))/(2*a); Yaz x1, x2`,
    expectedOutput: 'x = 5 için Faktöriyel: 5 -> 20 -> 60 -> 120 -> 120',
    stepByStepSolution: [
      'Faktöriyel akışında sonuc çarpmanın etkisiz elemanı 1 ile başlatılır.',
      'x=5, 4, 3, 2, 1 değerleri sırayla sonuc ile çarpılır; x=0 olduğunda döngü koşulu (x>=1) yanlış olur ve 120 yazılır.',
      'Delta akışında negatif (0 kök), sıfır (çakışık 1 kök) ve pozitif (2 farklı kök) durumları iki karar kutusuyla ayrılır.',
    ],
  },
  {
    id: 'ex-lab3-ascii-scanf',
    weekId: 'w3',
    category: 'temel-io',
    title: 'Lab 3: ASCII Dönüşüm, Escape ve Scanf Bellek İzleme',
    pdfFile: 'lab_261012_77753471.pdf',
    pdfLabel: 'lab_261012.pdf',
    slideNum: 26,
    problem:
      'Lab 3 s.20–30 örnekleri: (1) printf("\\"a\\"\\t\\\\a\\\\n"); çıktısı, (2) char c=\'0\'; int i=50; çıktısı, (3) scanf("%d",&a) bellek trace.',
    codeOrPseudo: `// Örnek 1 (s.22):
printf("\\"a\\"\\t\\\\a\\\\n");

// Örnek 2 (s.26):
char c = '0';
int i = 50;
printf("%c, %d, %c, %d", c, c, i, i);`,
    expectedOutput: `Örnek 1: "a"	\\a\\n\nÖrnek 2: 0, 48, 2, 50`,
    stepByStepSolution: [
      'Örnek 1’de \\" çift tırnak, \\t sekme boşluğu, \\\\ ise tek ters eğik çizgi basar; sondaki \\\\n ise düz metin "\\n" olarak basılır (satır atlamaz!).',
      "Örnek 2’de '0' karakterinin ASCII kodu 48'dir. Tam sayı 50'nin ASCII tablosundaki karakter karşılığı ise '2' rakamıdır.",
      'Sayfa 30’da scanf("%d", &a) klavyeden girilen 5’i a kutusuna, 7’yi b kutusuna yazar; c = a + b sonucu 12 olur.',
    ],
    memoryHighlight: "RAM'de char c = 48 (0x30) olarak saklanır; %c veya %d sadece ekrana nasıl basılacağını seçer.",
  },
  {
    id: 'ex-lab4-shortcircuit',
    weekId: 'w4',
    category: 'kosul-dongu',
    title: 'Lab 4: İç İçe if-else Çıktısı (a || b ve a && b)',
    pdfFile: 'lab_261019_d96f8c28.pdf',
    pdfLabel: 'lab_261019.pdf',
    slideNum: 8,
    problem:
      'Lab 4 Sayfa 8–11: İki farklı başlangıç değeri için if-else bloklarının ekran çıktısını bulunuz.',
    codeOrPseudo: `// Soru A (s.8-9): a=1, b=1, c=0
if (a || b)
    if (c) printf("A");
    else printf("B");
else
    printf("C");

// Soru B (s.10-11): a=1, b=0, c=1
if (a && b)
    if (c) printf("A");
    else printf("B");
else
    printf("C");`,
    expectedOutput: 'Soru A: B  |  Soru B: C',
    stepByStepSolution: [
      'Soru A: (a || b) → (1 || 1) = 1 (Doğru) olduğu için dış if içine girilir. İçteki if(c) → if(0) (Yanlış) olduğu için en yakın else olan printf("B") çalışır.',
      'Soru B: (a && b) → (1 && 0) = 0 (Yanlış) olduğu için içteki if-else bloğuna hiç girilmez; doğrudan dış else çalışır ve "C" basılır.',
    ],
  },
  {
    id: 'ex-lab4-mtv-switch',
    weekId: 'w4',
    category: 'kosul-dongu',
    title: 'Lab 4: İç İçe MTV Vergisi ve Switch-Case 1–5 Okunuş',
    pdfFile: 'lab_261019_d96f8c28.pdf',
    pdfLabel: 'lab_261019.pdf',
    slideNum: 14,
    problem:
      'Araç yaşı (1-3, 4-6, 7+) ve motor silindir hacmine (<=1300, 1301-1600, 1601+) göre vergi belirleyen program + 1..5 arası rakamı yazıyla yazan switch örneği.',
    codeOrPseudo: `if (yas >= 1 && yas <= 3) {
    if (hacim <= 1300) vergi = 1767;
    else if (hacim <= 1600) vergi = 3075;
    else vergi = 5434;
} else if (yas <= 6) {
    if (hacim <= 1300) vergi = 1232;
    else if (hacim <= 1600) vergi = 2306;
    else vergi = 4251;
} else {
    if (hacim <= 1300) vergi = 688;
    else if (hacim <= 1600) vergi = 1337;
    else vergi = 2503;
}`,
    expectedOutput: 'Örn: yas=2, hacim=1500  -->  Vergi = 3075 TL',
    stepByStepSolution: [
      'Dış if-else if yapısı araç yaş aralığını seçer.',
      'Seçilen yaş dalının içindeki else if yapısı motor hacmine göre kesin vergi tutarını atar.',
      'Sayfa 17–20’deki switch örneğinde kullanıcı 1..5 arası sayı girer; eşleşen case sonrası break; ile çıkış yapılır.',
    ],
  },
  {
    id: 'ex-lab4-nested-loop',
    weekId: 'w4',
    category: 'kosul-dongu',
    title: 'Lab 4: continue, break ve İç İçe Döngü (B / AB / AAB / AAAB)',
    pdfFile: 'lab_261019_d96f8c28.pdf',
    pdfLabel: 'lab_261019.pdf',
    slideNum: 30,
    problem:
      'Lab 4 s.28–31: continue/break farkı ile m=0..3 iç içe for döngüsünün adım adım ekran çıktısını çıkarınız.',
    codeOrPseudo: `for (int m = 0; m < 4; m++) {
    for (int n = 0; n < m; n++) {
        printf("A");
    }
    printf("B\\n");
}`,
    expectedOutput: `B\nAB\nAAB\nAAAB`,
    stepByStepSolution: [
      'm=0: İç döngü n=0 < 0 (Yanlış) → 0 adet A, ardından "B\\n" → Satır 1: B',
      'm=1: İç döngü n=0 (<1) 1 kez → "A", ardından "B\\n" → Satır 2: AB',
      'm=2: İç döngü n=0, 1 → "AA", ardından "B\\n" → Satır 3: AAB',
      'm=3: İç döngü n=0, 1, 2 → "AAA", ardından "B\\n" → Satır 4: AAAB',
    ],
  },
  {
    id: 'ex-d5-scope',
    weekId: 'w5',
    category: 'fonksiyon-scope',
    title: 'Ders 5: Global, Yerel, İç Blok ve Static Kapsam Programı',
    pdfFile: '5-_Fonksiyonlar_-_Temel_b14f8ed4.pdf',
    pdfLabel: '5- Fonksiyonlar - Temel.pdf',
    slideNum: 17,
    problem:
      'Deitel Kapsam Programı (s.17–22): global x=1, main x=5, iç blok x=7, useLocal (x=25), useStaticLocal (static x=50) ve useGlobal çağrıları sonrasında tam çıktı ve bellek durumu nedir?',
    codeOrPseudo: `int x = 1; // global
void useLocal() { int x = 25; x++; ... }
void useStaticLocal() { static int x = 50; x++; ... }
void useGlobal() { x *= 10; ... }
int main() {
    int x = 5;
    { int x = 7; printf("%d", x); } // iç blok: 7
    printf("%d", x); // dış main: 5
    useLocal(); useStaticLocal(); useGlobal();
    useLocal(); useStaticLocal(); useGlobal();
    printf("%d", x); // main x hâlâ 5!
}`,
    expectedOutput:
      'İç blok: 7 | Main: 5 | 1.Tur -> Local: 25->26, Static: 50->51, Global: 1->10 | 2.Tur -> Local: 25->26, Static: 51->52, Global: 10->100 | Son Main: 5',
    stepByStepSolution: [
      'main içindeki { int x = 7; } sadece kendi süslü parantezi içinde main’in x=5 değişkenini gölgeler.',
      'useLocal her seferinde yeni bir yerel x=25 oluşturur; çıkışta 26 olsa da bellekten silinir.',
      'useStaticLocal bellekte kalıcı bir static x tutar: 1. çağrıda 50→51, 2. çağrıda kaldığı 51’den 52’ye çıkar.',
      'useGlobal kendi içinde x tanımlamadığı için global x=1 değişkenini kalıcı olarak 10 ve sonra 100 yapar.',
    ],
    memoryHighlight: 'Program sonunda Global x=100, useStaticLocal.x=52, main.x=5 değerindedir.',
  },
  {
    id: 'ex-lab5-traces',
    weekId: 'w5',
    category: 'fonksiyon-scope',
    title: 'Lab 5: Değerle Çağırma, YerDegistir ve Static printf Sırası (#1–#4)',
    pdfFile: 'lab_261026_b58eb079.pdf',
    pdfLabel: 'lab_261026.pdf',
    slideNum: 24,
    problem:
      'Lab 5 s.9–10 YerDegistir(79)->97 ve s.18–25 Ekran Çıktısı 1-2-3-4 sorularının tam çözümleri.',
    codeOrPseudo: `// YerDegistir (s.9-10):
int YerDegistir(int sayi) {
    int birler = sayi % 10;
    int onlar = sayi / 10;
    return birler * 10 + onlar;
}

// Ekran Ciktisi #4 (s.24-25):
int fonk() {
    static int a = 3;
    printf("fonk() a=%d\\n", a);
    a *= 2;
    return a;
}
int main() {
    int a = 10;
    printf("main() a=%d\\n", a);
    fonk();
    printf("main() a=%d\\n", a);
    fonk();
    printf("main() a=%d\\n", fonk());
}`,
    expectedOutput: `main() a=10\nfonk() a=3\nmain() a=10\nfonk() a=6\nfonk() a=12\nmain() a=24`,
    stepByStepSolution: [
      '1) main a=10 yazdırılır. 2) İlk fonk() çağrısında static a=3 basılır ve a 6 olur.',
      '3) main a=10 yazdırılır (main’deki a farklı bellek hücresindedir).',
      '4) İkinci fonk() çağrısında static a=6 basılır ve a 12 olur.',
      '5) Son satırda printf("%d", fonk()) yazdırılmadan ÖNCE fonk() çalışır: "fonk() a=12" basar, a’yı 24 yapar ve 24 döndürür.',
      '6) Son olarak dönen 24 main içindeki printf ile "main() a=24" olarak basılır!',
    ],
  },
  {
    id: 'ex-lab6-numbers',
    weekId: 'w6',
    category: 'fonksiyon-scope',
    title: 'Lab 6: Basamak Sayısı, Ters Çevirme, Palindrom, Asal ve Tam Kare/Küp',
    pdfFile: 'lab_261109_edd840a7.pdf',
    pdfLabel: 'lab_261109.pdf',
    slideNum: 4,
    problem:
      'Lab 6 Sayfa 2–9 arası tüm sayı fonksiyonları: basamak_say, rakam_toplami, cift_rakam_say, ters_cevir, palindrom_mu, asalmi, tam_kare_mi.',
    codeOrPseudo: `int ters_cevir(int n) {
    int ters = 0;
    while (n > 0) {
        ters = ters * 10 + (n % 10);
        n /= 10;
    }
    return ters;
}
int palindrom_mu(int n) {
    return (n == ters_cevir(n)) ? 1 : 0;
}
int asalmi(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}`,
    expectedOutput: 'ters_cevir(123) -> 321 | palindrom_mu(121) -> 1 | asalmi(17) -> 1',
    stepByStepSolution: [
      'n=123 için adım 1: ters = 0*10 + 3 = 3, n = 12.',
      'Adım 2: ters = 3*10 + 2 = 32, n = 1.',
      'Adım 3: ters = 32*10 + 1 = 321, n = 0 → döngü biter ve 321 döner.',
      'asalmi fonksiyonunda i*i <= n kontrolü kareköke kadar bölen aramayı sağlar.',
    ],
  },
  {
    id: 'ex-lab6-recursion',
    weekId: 'w6',
    category: 'ozyineleme',
    title: 'Lab 6 & Ders 6: Özyineli factorial(4), rakamlarToplami ve usAl',
    pdfFile: 'lab_261109_edd840a7.pdf',
    pdfLabel: 'lab_261109.pdf',
    slideNum: 10,
    problem:
      'Lab 6 Sayfa 10–13 (rakamlarToplami, usAl) ile Ders 6 Sayfa 5–12 (factorial(4)) özyineli çözümleri ve yığıt açılımı.',
    codeOrPseudo: `int rakamlarToplami(int n) {
    if (n == 0) return 0;
    return (n % 10) + rakamlarToplami(n / 10);
}
int usAl(int taban, int us) {
    if (us == 0) return 1;
    return taban * usAl(taban, us - 1);
}`,
    expectedOutput: 'rakamlarToplami(458) -> 17  |  usAl(2, 5) -> 32  |  factorial(4) -> 24',
    stepByStepSolution: [
      'rakamlarToplami(458) = 8 + rakamlarToplami(45) = 8 + 5 + rakamlarToplami(4) = 8 + 5 + 4 + 0 = 17.',
      'usAl(2, 5) = 2 * usAl(2, 4) = 2 * 2 * 2 * 2 * 2 * usAl(2, 0) = 32 * 1 = 32.',
      'factorial(4) sarılma: f(4)->f(3)->f(2)->f(1)->f(0)=1; çözülme: 1*1=1, 2*1=2, 3*2=6, 4*6=24.',
    ],
  },
  {
    id: 'ex-lab6-diamond',
    weekId: 'w6',
    category: 'yildiz-desen',
    title: 'Lab 6 Yıldız Desenleri ve Sınıf Çalışması (Baklava Dilimi)',
    pdfFile: 'lab_261109_edd840a7.pdf',
    pdfLabel: 'lab_261109.pdf',
    slideNum: 21,
    problem:
      'Lab 6 Sayfa 14–21: Üçgen desenleri ve Sayfa 21 Sınıf Çalışması (9 satırlık ortalanmış Baklava Dilimi çıktısı).',
    codeOrPseudo: `int n = 5;
// Üst yarım (1..5)
for (int i = 1; i <= n; i++) {
    for (int b = 1; b <= n - i; b++) printf(" ");
    for (int y = 1; y <= 2 * i - 1; y++) printf("*");
    printf("\\n");
}
// Alt yarım (4..1)
for (int i = n - 1; i >= 1; i--) {
    for (int b = 1; b <= n - i; b++) printf(" ");
    for (int y = 1; y <= 2 * i - 1; y++) printf("*");
    printf("\\n");
}`,
    expectedOutput: `    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *`,
    stepByStepSolution: [
      'Üst piramitte i=1..5 için her satırda (5 - i) boşluk ve (2*i - 1) adet yıldız basılır (1, 3, 5, 7, 9).',
      'Orta en geniş satır (9 yıldız) tek bir kez üst döngü sonunda basılır.',
      'Alt yarıda i=4’ten 1’e azalır; tekrar (5 - i) boşluk ve (2*i - 1) yıldız basılarak simetrik 9 satırlık baklava tamamlanır.',
    ],
  },
];

export const BM101_EXTRA_EXERCISES: BM101ExtraExercise[] = [
  {
    id: 'ext-1-static-order',
    weekId: 'w5',
    kind: 'output',
    difficulty: 'Vize Seviyesi',
    title: 'Ek Alıştırma 1: Static Değişken ve Çoklu Fonksiyon Çağrı Sırası',
    prompt: 'Aşağıdaki C programının ekrana yazdıracağı çıktıyı satır satır belirleyiniz.',
    code: `#include <stdio.h>
int x = 2;
int hesap(int k) {
    static int s = 3;
    s += k;
    x += 1;
    printf("hesap: s=%d, x=%d\\n", s, x);
    return s;
}
int main() {
    int k = 10;
    printf("sonuc1=%d\\n", hesap(4));
    printf("main: x=%d, k=%d\\n", x, k);
    printf("sonuc2=%d\\n", hesap(5));
    return 0;
}`,
    quickCheckOpts: [
      'hesap: s=7, x=3 -> sonuc1=7 -> main: x=3, k=10 -> hesap: s=12, x=4 -> sonuc2=12',
      'sonuc1=7 -> hesap: s=7, x=3 -> main: x=2, k=10 -> hesap: s=8, x=3',
      'hesap: s=7, x=3 -> sonuc1=7 -> main: x=2, k=10 -> hesap: s=8, x=3 -> sonuc2=8',
    ],
    quickCheckAns: 0,
    expectedOutputOrSnapshot: `hesap: s=7, x=3\nsonuc1=7\nmain: x=3, k=10\nhesap: s=12, x=4\nsonuc2=12`,
    solutionSteps: [
      'printf("sonuc1=%d", hesap(4)) çalışmadan önce hesap(4) çağrılır: s=3+4=7, global x=2+1=3 → "hesap: s=7, x=3" yazar ve 7 döner.',
      'Dönen 7 ile "sonuc1=7" basılır.',
      'main içinde x global olduğu için 3, k yerel olduğu için 10 basılır.',
      'hesap(5) çağrıldığında static s kaldığı 7 değerinden 7+5=12’ye, global x ise 4’e çıkar.',
    ],
    relatedPdf: 'lab_261026.pdf · Sayfa 24',
    relatedPdfFile: 'lab_261026_b58eb079.pdf',
    relatedSlide: 24,
  },
  {
    id: 'ext-2-recursion-stack',
    weekId: 'w6',
    kind: 'recursion',
    difficulty: 'Vize Seviyesi',
    title: 'Ek Alıştırma 2: Özyineli Fonksiyonda Gidiş-Dönüş Çıktısı',
    prompt: 'yaz(3) çağrıldığında ekrana basılacak karakter ve sayıların tam sırasını bulunuz.',
    code: `#include <stdio.h>
void yaz(int n) {
    if (n <= 0) {
        printf("B ");
        return;
    }
    printf("G%d ", n);
    yaz(n - 1);
    printf("D%d ", n);
}
int main() {
    yaz(3);
    return 0;
}`,
    quickCheckOpts: [
      'G3 G2 G1 B D1 D2 D3',
      'G3 G2 G1 B D3 D2 D1',
      'B D1 D2 D3 G1 G2 G3',
    ],
    quickCheckAns: 0,
    expectedOutputOrSnapshot: 'G3 G2 G1 B D1 D2 D3',
    solutionSteps: [
      'Stack Push (Gidiş): yaz(3) "G3 " basar → yaz(2) "G2 " basar → yaz(1) "G1 " basar → yaz(0) Base Case "B " basar ve return eder.',
      'Stack Pop (Dönüş): yaz(1) kaldığı yerden devam edip "D1 " basar → yaz(2) "D2 " basar → yaz(3) "D3 " basar.',
      'LIFO kuralı gereği son giren yaz(1), dönüş kısmını ilk tamamlar!',
    ],
    relatedPdf: '6- Fonksiyonlar - 2.pdf · Sayfa 6–17',
    relatedPdfFile: '6-_Fonksiyonlar_-_2_709f35c9.pdf',
    relatedSlide: 6,
  },
  {
    id: 'ext-3-memory-snapshot',
    weekId: 'w6',
    kind: 'memory',
    difficulty: 'Vize Seviyesi',
    title: 'Ek Alıştırma 3: Döngü + Koşul Bellek Anlık Görüntüsü (Snapshot)',
    prompt: 'Aşağıdaki döngüde i == 4 olduğunda continue çalışmadan HEMEN ÖNCE bellekteki top, ciftSayac ve i değerleri nelerdir?',
    code: `int top = 0, ciftSayac = 0;
for (int i = 1; i <= 6; i++) {
    if (i == 4) continue;
    if (i % 2 == 0) {
        top += i;
        ciftSayac++;
    } else {
        top += 1;
    }
}`,
    quickCheckOpts: [
      'i = 4, top = 4, ciftSayac = 1',
      'i = 4, top = 8, ciftSayac = 2',
      'i = 3, top = 4, ciftSayac = 1',
    ],
    quickCheckAns: 0,
    expectedOutputOrSnapshot: 'i = 4, top = 4 (i=1:+1 -> 1, i=2:+2 -> 3, i=3:+1 -> 4), ciftSayac = 1 (sadece i=2 sayıldı).',
    solutionSteps: [
      'i=1 (tek): top = 0 + 1 = 1, ciftSayac = 0.',
      'i=2 (çift): top = 1 + 2 = 3, ciftSayac = 1.',
      'i=3 (tek): top = 3 + 1 = 4, ciftSayac = 1.',
      'i=4 başlangıcında: i=4, top=4, ciftSayac=1. continue çalışır ve 4 atlanır!',
    ],
    relatedPdf: 'lab_261019.pdf · Sayfa 28',
    relatedPdfFile: 'lab_261019_d96f8c28.pdf',
    relatedSlide: 28,
  },
  {
    id: 'ext-4-bug-hunt',
    weekId: 'w4',
    kind: 'bug',
    difficulty: 'Orta',
    title: 'Ek Alıştırma 4: C Hata Avı (= vs ==, do-while ;, İnteger Bölme)',
    prompt: 'Verilen koddaki 3 klasik hatayı bulunuz ve nedenlerini açıklayınız.',
    code: `int x = 5, y = 2;
float ort = x / y;         // Hata 1
if (x = 10)                // Hata 2
    printf("Esit");
do {
    x--;
} while (x > 0)            // Hata 3`,
    expectedOutputOrSnapshot: 'Hata 1: x/y tam sayı bölmesi yapar (2.0). Hata 2: = atamadır, her zaman True olur. Hata 3: while(x>0); sonunda noktalı virgül eksiktir.',
    solutionSteps: [
      '1) x/y iki int böldüğü için sonuç 2 olur ve float’a 2.0 atanır. Doğrusu: (float)x / y.',
      '2) if (x = 10) x’e 10 atar (True) ve koşul daima sağlanır. Doğrusu: if (x == 10).',
      '3) do-while döngüsünün kapanışındaki while(...) ifadesi mutlaka ; ile bitmelidir.',
    ],
    relatedPdf: '4- Program Denetimi.pdf · Sayfa 31',
    relatedPdfFile: '4-_Program_Denetimi_a066062c.pdf',
    relatedSlide: 31,
  },
  {
    id: 'ext-5-coding-armstrong',
    weekId: 'w6',
    kind: 'coding',
    difficulty: 'Vize Seviyesi',
    title: 'Ek Alıştırma 5: 3 Basamaklı Armstrong Sayısı Fonksiyonu Yazma',
    prompt: 'Parametre olarak aldığı 3 basamaklı sayının rakamlarının küpleri toplamı kendisine eşitse (örn. 153 = 1^3+5^3+3^3) 1, değilse 0 döndüren armstrongMu(int n) C fonksiyonunu yazınız.',
    code: `// Prototip:
int armstrongMu(int n);
// Beklenen: armstrongMu(153) -> 1, armstrongMu(120) -> 0`,
    expectedOutputOrSnapshot: '153 için 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153 -> return 1;',
    solutionSteps: [
      'Orijinal n sayısını kaybetmemek için kopya (temp = n) tutunuz.',
      'while (temp > 0) içinde b = temp % 10; toplam += b*b*b; temp /= 10; yapınız.',
      'Döngü sonunda if (toplam == n) return 1; else return 0; döndürünüz.',
    ],
    relatedPdf: 'lab_261109.pdf · Sayfa 2–9',
    relatedPdfFile: 'lab_261109_edd840a7.pdf',
    relatedSlide: 4,
  },
];

export const BM101_EXAM_SCENARIOS: BM101ExamScenario[] = [
  {
    id: 'bm101-vize-1',
    title: 'Vize Senaryosu 1 — Karma Temeller, Scope ve Static İzleme',
    badge: 'Senaryo 1 (3 Soru)',
    desc: 'Değişken kapsamı, static bellek kalıcılığı ve printf argüman değerlendirme sırası + Lab 6 tarzı fonksiyon yazma + Call Stack anlık bellek fotoğrafı.',
    durationMin: 60,
    formatSummary: '3 Klasik Uygulamalı Soru · (1) Çıktı 30p · (2) Kodlama 40p · (3) Bellek İzleme 30p',
    q1Output: {
      title: 'Soru 1: Kod Verip Ekran Çıktısı Sorma',
      points: 30,
      srcLabel: 'Lab 5 (lab_261026.pdf · Sayfa 24–25) & Ders 5 (Sayfa 17–22)',
      pdfFile: 'lab_261026_b58eb079.pdf',
      slideNum: 24,
      prompt:
        'Aşağıdaki C programının çalışması sonucunda ekrana yazdıracağı TÜM satırları eksiksiz ve sırasıyla yazınız.',
      code: `#include <stdio.h>
int g = 5;

int islem(int p) {
    static int s = 2;
    int g = 20;
    s = s + p;
    printf("islem: s=%d g=%d\\n", s, g);
    return s;
}

int main() {
    int p = 3;
    printf("main-1: g=%d p=%d\\n", g, p);
    islem(p);
    printf("main-2: g=%d son=%d\\n", g, islem(4));
    return 0;
}`,
      expectedOutput: `main-1: g=5 p=3
islem: s=5 g=20
islem: s=9 g=20
main-2: g=5 son=9`,
      stepTrace: [
        '1) Global g=5, main yerel p=3 oluşur. İlk printf: "main-1: g=5 p=3".',
        '2) islem(3) çağrılır: static s=2 başlar, yerel g=20 global g’yi gölgeler. s = 2+3 = 5. Ekrana "islem: s=5 g=20" yazar ve 5 döner.',
        '3) İkinci printf basılmadan ÖNCE argümanı olan islem(4) çalışır! static s kaldığı 5 değerinden 5+4=9 olur; yerel g=20 tekrar oluşur. Ekrana "islem: s=9 g=20" yazar ve 9 döner.',
        '4) main’deki g hâlâ global 5’tir ve islem(4)’ten 9 dönmüştür: "main-2: g=5 son=9".',
      ],
      exp: 'Buradaki en kritik kural: (1) Yerel g global g’yi gölgeler, (2) static s değerini çağrılar arasında korur, (3) printf içindeki islem(4) çağrısı, main-2 satırı basılmadan ÖNCE çalışır!',
    },
    q2Coding: {
      title: 'Soru 2: C Programı / Fonksiyonu Yazma',
      points: 40,
      srcLabel: 'Lab 6 (lab_261109.pdf · Sayfa 2–7)',
      pdfFile: 'lab_261109_edd840a7.pdf',
      slideNum: 6,
      prompt:
        'Kullanıcıdan pozitif bir tam sayı alan, ardından yazdığınız `ters_cevir(int n)` ve `palindrom_mu(int n)` fonksiyonlarını kullanarak sayının tersini ve palindrom olup olmadığını (örneğin 12321 -> Palindromdur, 145 -> Palindrom değildir) ekrana yazdıran tam C programını yazınız.',
      constraints: [
        'main() dışına int ters_cevir(int n) ve int palindrom_mu(int n) fonksiyonlarını yazınız.',
        'Negatif veya 0 girilirse kullanıcıdan yeniden pozitif sayı isteyiniz (do-while veya while).',
        'String/dizi kullanmadan yalnızca % 10 ve / 10 matematiksel işlemleriyle çözünüz.',
      ],
      sampleIO: 'Girdi: 12321  -->  Sayinin Tersi: 12321 | 12321 bir palindrom sayidir.',
      rubricKeywords: ['ters_cevir', 'palindrom_mu', '% 10', '/ 10', 'while', 'scanf', 'return'],
      rubricChecklist: [
        'int ters_cevir(int n) içinde ters = ters * 10 + (n % 10) döngüsü doğru kurulmuş mu?',
        'palindrom_mu içinde n == ters_cevir(n) karşılaştırması yapılıyor mu?',
        'main() içinde scanf("%d", &sayi) ile pozitif kontrolü mevcut mu?',
        'stdio.h ve eksiksiz main return 0 yapısı bulunuyor mu?',
      ],
      modelCode: `#include <stdio.h>

int ters_cevir(int n) {
    int ters = 0;
    while (n > 0) {
        ters = ters * 10 + (n % 10);
        n /= 10;
    }
    return ters;
}

int palindrom_mu(int n) {
    if (n == ters_cevir(n))
        return 1;
    return 0;
}

int main() {
    int sayi;
    do {
        printf("Pozitif bir tam sayi giriniz: ");
        scanf("%d", &sayi);
    } while (sayi <= 0);

    printf("Sayinin Tersi: %d\\n", ters_cevir(sayi));
    if (palindrom_mu(sayi))
        printf("%d bir palindrom sayidir.\\n", sayi);
    else
        printf("%d palindrom degildir.\\n", sayi);

    return 0;
}`,
      exp: 'Basamak parçalama (n % 10) ve basamak eksiltme (n / 10) Lab 6 boyunca bütün sayı problemlerinin (basamak sayısı, rakam toplamı, ters çevirme, palindrom) ortak temelidir.',
    },
    q3Memory: {
      title: 'Soru 3: Çalışma Anında Bellekteki & Call Stack’teki Değerleri Sorma',
      points: 30,
      srcLabel: 'Ders 6 (6- Fonksiyonlar - 2.pdf · Sayfa 16–19) & Lab 5',
      pdfFile: '6-_Fonksiyonlar_-_2_709f35c9.pdf',
      slideNum: 17,
      prompt:
        'Aşağıdaki programı satır numaralarıyla inceleyiniz. Program `kar(3)` çağrısı içindeki **Satır 9 (return 2 * t;)** tam çalıştırılmadan HEMEN ÖNCE bellekte (Global alan ve Call Stack çerçeveleri içinde aşağıdan yukarıya) tüm değişkenlerin değerlerini ve Stack sıralamasını yazınız.',
      targetMoment: 'main -> hesap(5) -> kar(3) çağrısı içinde Satır 9 yürütülürken (return etmeden hemen önce)',
      code: `1:  #include <stdio.h>
2:  int sayac = 1;
3:
4:  int kar(int a) {
5:      int t = a * a;
6:      sayac += t;
7:      // <-- TAM BURADA (Satır 9 öncesi) BELLEK VE STACK NASILDIR?
8:      return 2 * t;
9:  }
10:
11: int hesap(int x) {
12:     int y = x - 2;
13:     int r = kar(y);
14:     return r + 1;
15: }
16:
17: int main() {
18:     int m = 5;
19:     int sonuc = hesap(m);
20:     printf("%d %d", sonuc, sayac);
21:     return 0;
22: }`,
      expectedSlots: [
        { scope: 'Global Bellek', variable: 'sayac', expectedValue: '10', note: 'Başta 1 idi; Satır 6’da sayac += 9 ile 10 oldu' },
        { scope: 'main() Frame', variable: 'm', expectedValue: '5', note: 'Satır 18’de atandı, hesap dönene kadar bekler' },
        { scope: 'hesap() Frame', variable: 'x', expectedValue: '5', note: 'main’den gönderilen m değerinin kopyası' },
        { scope: 'hesap() Frame', variable: 'y', expectedValue: '3', note: 'Satır 12’de y = 5 - 2 = 3 hesaplandı' },
        { scope: 'kar() Frame (Tepe)', variable: 'a', expectedValue: '3', note: 'hesap içindeki y=3 parametresiyle geldi' },
        { scope: 'kar() Frame (Tepe)', variable: 't', expectedValue: '9', note: 'Satır 5’te t = 3 * 3 = 9 hesaplandı' },
      ],
      expectedStackOrder: ['main()', 'hesap(5)', 'kar(3)  ← EN ÜST (Aktif)'],
      timelineSteps: [
        { step: 1, line: 'Satır 2 & 18', action: 'Global sayac=1; main frame push (m=5)', memorySummary: 'Global: sayac=1 | Stack: [main(m=5)]' },
        { step: 2, line: 'Satır 19 -> 11', action: 'hesap(5) çağrılır, frame push', memorySummary: 'Stack: [main(m=5), hesap(x=5, y=3)]' },
        { step: 3, line: 'Satır 13 -> 4', action: 'kar(3) çağrılır, tepeye push', memorySummary: 'Stack: [main, hesap, kar(a=3)]' },
        { step: 4, line: 'Satır 5–6', action: 't = 3*3 = 9; sayac = 1 + 9 = 10', memorySummary: 'Global sayac=10 | Stack Tepesi: kar(a=3, t=9)' },
      ],
      exp: 'Bu anda Stack’te alttan üste main -> hesap -> kar çerçeveleri üst üste beklemektedir. kar henüz return etmediği için a=3 ve t=9 bellektedir; global sayac ise Satır 6 nedeniyle 10 değerine güncellenmiştir.',
    },
  },
  {
    id: 'bm101-vize-2',
    title: 'Vize Senaryosu 2 — Döngüler, Özyineleme ve Stack Çözülmesi',
    badge: 'Senaryo 2 (3 Soru)',
    desc: 'break/continue & kısa devre mantığı çıktısı + Yıldız deseni / recursive program yazma + Özyineli fonksiyonda en derin adımda Call Stack bellek fotoğrafı.',
    durationMin: 60,
    formatSummary: '3 Klasik Uygulamalı Soru · (1) Çıktı 30p · (2) Kodlama 40p · (3) Bellek İzleme 30p',
    q1Output: {
      title: 'Soru 1: Döngü, continue/break ve ASCII Çıktı İzleme',
      points: 30,
      srcLabel: 'Lab 4 (s.28–31) & Lab 3 (s.26)',
      pdfFile: 'lab_261019_d96f8c28.pdf',
      slideNum: 30,
      prompt: 'Aşağıdaki C programının konsola yazdıracağı çıktıyı karakter ve satır düzenine dikkat ederek eksiksiz yazınız.',
      code: `#include <stdio.h>
int main() {
    char ch = 'A';
    for (int i = 0; i < 4; i++) {
        if (i == 2) continue;
        for (int j = 0; j <= i; j++) {
            if (j == 2) break;
            printf("%c", ch + j);
        }
        printf("-\\n");
    }
    return 0;
}`,
      expectedOutput: `A-
AB-
AB-`,
      stepTrace: [
        'i=0: j=0 <= 0 → ch+0 = \'A\' basılır. j=1 durur. "-" ve yeni satır → "A-"',
        'i=1: j=0 (\'A\'), j=1 (\'B\') basılır. j=2 durur → "AB-"',
        'i=2: if (i == 2) continue; çalışır! İç döngü ve printf("-") tamamen atlanır.',
        'i=3: j=0 (\'A\'), j=1 (\'B\'), j=2 olunca break iç döngüyü kırar (\'C\' basılmaz!). Dış döngüden "-\\n" basılır → "AB-"',
      ],
      exp: 'continue yalnızca i=2 turunu atlarken, j==2 içindeki break yalnızca içteki for döngüsünü sonlandırır ve dış döngüdeki printf("-\\n") yine çalışır!',
    },
    q2Coding: {
      title: 'Soru 2: Özyineli (Recursive) Fonksiyon ve Desen Yazma',
      points: 40,
      srcLabel: 'Lab 6 (lab_261109.pdf · Sayfa 10–13 & 21)',
      pdfFile: 'lab_261109_edd840a7.pdf',
      slideNum: 12,
      prompt:
        '(a) İki tam sayı alarak taban^us değerini ÖZYİNELİ (recursive) hesaplayan `int usAl(int taban, int us)` fonksiyonunu yazınız.\n(b) main() içinde n=4 için aşağıdaki gibi ortalanmış yıldız piramidini çizdiren kodu yazınız.',
      constraints: [
        'usAl fonksiyonunda döngü (for/while) KULLANILMAMALIDIR; mutlaka recursion + Base Case (us == 0) içermelidir.',
        'Piramit satır 1’den n’e kadar (n - i) boşluk ve (2 * i - 1) yıldız basmalıdır.',
      ],
      sampleIO: 'usAl(3, 4) = 81\n   *\n  ***\n *****\n*******',
      rubricKeywords: ['usAl', 'us == 0', 'return 1', 'us - 1', 'for', '2 * i - 1', 'n - i'],
      rubricChecklist: [
        'usAl içinde durma koşulu (if (us == 0) return 1;) var mı?',
        'Recursive adım taban * usAl(taban, us - 1) şeklinde mi?',
        'Piramit için boşluk döngüsü (n - i) ve yıldız döngüsü (2 * i - 1) doğru mu?',
      ],
      modelCode: `#include <stdio.h>

int usAl(int taban, int us) {
    if (us == 0)
        return 1;
    return taban * usAl(taban, us - 1);
}

int main() {
    printf("3^4 = %d\\n", usAl(3, 4));
    int n = 4;
    for (int i = 1; i <= n; i++) {
        for (int b = 1; b <= n - i; b++)
            printf(" ");
        for (int y = 1; y <= 2 * i - 1; y++)
            printf("*");
        printf("\\n");
    }
    return 0;
}`,
      exp: 'Lab 6 s.12 usAl özyinelemesi ile s.19 ortalanmış piramit formülü (boşluk = n-i, yıldız = 2*i-1) doğrudan birleştirilmiştir.',
    },
    q3Memory: {
      title: 'Soru 3: Özyineli Çağrı Anında Call Stack & Bellek Değerleri',
      points: 30,
      srcLabel: 'Ders 6 (6- Fonksiyonlar - 2.pdf · Sayfa 6–12 & 17)',
      pdfFile: '6-_Fonksiyonlar_-_2_709f35c9.pdf',
      slideNum: 9,
      prompt:
        'Aşağıdaki özyineli `toplaSeri(int n)` fonksiyonunda `main()` içinden `toplaSeri(4)` çağrılıyor. **n == 1 (Base Case) satırına ulaşıldığı ANDA (return etmeden hemen önce)** Call Stack üzerinde kaç adet çerçeve vardır ve her çerçevedeki parametre/yerel değişken değerleri nelerdir?',
      targetMoment: 'toplaSeri(1) içine girildiğinde Satır 5 (if (n <= 1) return 1;) çalışırken',
      code: `1:  int toplaSeri(int n) {
2:      int katki = n * 2;
3:      if (n <= 1)
4:          return 1; // <-- TAM BU ANDA STACK VE BELLEK?
5:      return katki + toplaSeri(n - 1);
6:  }
7:  int main() {
8:      int sonuc = toplaSeri(4);
9:      return 0;
10: }`,
      expectedSlots: [
        { scope: 'main() Frame (Taban)', variable: 'sonuc', expectedValue: 'beklemede', note: 'Henüz toplaSeri(4) dönmediği için atanmadı' },
        { scope: 'toplaSeri(4) Frame', variable: 'n / katki', expectedValue: 'n=4, katki=8', note: 'Satır 5’te toplaSeri(3)’ü bekliyor' },
        { scope: 'toplaSeri(3) Frame', variable: 'n / katki', expectedValue: 'n=3, katki=6', note: 'Satır 5’te toplaSeri(2)’yi bekliyor' },
        { scope: 'toplaSeri(2) Frame', variable: 'n / katki', expectedValue: 'n=2, katki=4', note: 'Satır 5’te toplaSeri(1)’i bekliyor' },
        { scope: 'toplaSeri(1) Frame (Tepe)', variable: 'n / katki', expectedValue: 'n=1, katki=2', note: 'Base case! 1 döndürüp geri çözülmeyi başlatacak' },
      ],
      expectedStackOrder: [
        'main()',
        'toplaSeri(4) [n=4, katki=8]',
        'toplaSeri(3) [n=3, katki=6]',
        'toplaSeri(2) [n=2, katki=4]',
        'toplaSeri(1) [n=1, katki=2] ← EN ÜST (Aktif)',
      ],
      timelineSteps: [
        { step: 1, line: 'Satır 8 -> 1', action: 'main() -> toplaSeri(4) push (katki=8)', memorySummary: '2 Frame aktif' },
        { step: 2, line: 'Satır 5 -> 1', action: 'toplaSeri(3) push (katki=6)', memorySummary: '3 Frame aktif' },
        { step: 3, line: 'Satır 5 -> 1', action: 'toplaSeri(2) push (katki=4)', memorySummary: '4 Frame aktif' },
        { step: 4, line: 'Satır 5 -> 4', action: 'toplaSeri(1) push (katki=2), n<=1 Base Case!', memorySummary: 'Toplam 5 Frame: Dönüş toplamı = 1 + 4 + 6 + 8 = 19' },
      ],
      exp: 'Her özyineli çağrı kendi bağımsız yerel değişken kopyasına (n ve katki) sahip yeni bir Stack Frame açar! n=1 anında toplam 5 frame bellektedir ve çözülme sırasında 1 -> 4+1=5 -> 6+5=11 -> 8+11=19 döner.',
    },
  },
  {
    id: 'bm101-vize-3',
    title: 'Vize Senaryosu 3 — Operatör Tuzakları, Özyineli Çağırma & Bellek İzleme',
    badge: 'Senaryo 3 (3 Soru)',
    desc: '++ / -- ve switch-case düşmesi + Asal sayı ve rakam toplamı fonksiyonları + Program çalışırken verilen bir turda bellek hücrelerinin son durumu.',
    durationMin: 60,
    formatSummary: '3 Klasik Uygulamalı Soru · (1) Çıktı 30p · (2) Kodlama 40p · (3) Bellek İzleme 30p',
    q1Output: {
      title: 'Soru 1: ++/-- , switch Fall-Through ve == Tuzağı Çıktısı',
      points: 30,
      srcLabel: 'Ders 4 (s.12 & s.31) & Lab 3 (s.12)',
      pdfFile: '4-_Program_Denetimi_a066062c.pdf',
      slideNum: 31,
      prompt: 'Aşağıdaki C kodunun üreteceği ekran çıktısını eksiksiz olarak yazınız.',
      code: `#include <stdio.h>
int main() {
    int a = 2, b = 5;
    switch (a++) {
        case 1: b += 1;
        case 2: b += 3;
        case 3: b += 4; break;
        default: b = 0;
    }
    if (a = 1)
        printf("A:%d B:%d\\n", a, b);
    else
        printf("C:%d\\n", b);
    return 0;
}`,
      expectedOutput: 'A:1 B:12',
      stepTrace: [
        '1) switch(a++) ifadesi ÖNCE a’nın eski değeri 2’yi switch’e verir, sonra a=3 olur!',
        '2) case 2 eşleşir: b = 5 + 3 = 8. Ancak case 2 sonunda break YOKTUR!',
        '3) Fall-through ile case 3 de çalışır: b = 8 + 4 = 12; ardından break switch’i bitirir.',
        '4) if (a = 1) eşitlik değil ATAMA operatörüdür! a’ya 1 atanır ve koşul 1 (True) olur.',
        '5) Ekrana "A:1 B:12" yazdırılır.',
      ],
      exp: 'Tek soruda 3 klasik sınav tuzağı: postfix a++ (2 olarak girer), case 2’de break unutulması (fall-through) ve if içinde = kullanımı!',
    },
    q2Coding: {
      title: 'Soru 2: Asal Kontrol ve Özyineli Rakam Toplamı Programı',
      points: 40,
      srcLabel: 'Lab 6 (lab_261109.pdf · Sayfa 7–11)',
      pdfFile: 'lab_261109_edd840a7.pdf',
      slideNum: 10,
      prompt:
        'Kullanıcıdan alınan sayının (1) `asalmi(int n)` fonksiyonuyla asal olup olmadığını bulan, (2) sayı asal ise özyineli `rakamlarToplami(int n)` fonksiyonuyla rakamları toplamını hesaplayıp ekrana yazdıran C programını yazınız.',
      constraints: [
        'rakamlarToplami(int n) mutlaka özyineli (recursive) yazılmalıdır.',
        'asalmi(int n) fonksiyonu n < 2 durumunu 0 olarak döndürmelidir.',
      ],
      sampleIO: 'Girdi: 197  -->  197 asaldir. Rakamlar toplami: 17',
      rubricKeywords: ['asalmi', 'rakamlarToplami', '% 10', '/ 10', 'n < 2', 'return 0', 'return 1'],
      rubricChecklist: [
        'asalmi fonksiyonunda 0, 1 ve negatif sayılar için return 0 var mı?',
        '2’den itibaren bölen kontrolü yapılıyor mu?',
        'rakamlarToplami içinde (n == 0) base case ve (n % 10) + rakamlarToplami(n / 10) mevcut mu?',
      ],
      modelCode: `#include <stdio.h>

int asalmi(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int rakamlarToplami(int n) {
    if (n == 0) return 0;
    return (n % 10) + rakamlarToplami(n / 10);
}

int main() {
    int sayi;
    printf("Bir tam sayi giriniz: ");
    scanf("%d", &sayi);

    if (asalmi(sayi)) {
        printf("%d asaldir. Rakamlar toplami: %d\\n", sayi, rakamlarToplami(sayi));
    } else {
        printf("%d asal degildir.\\n", sayi);
    }
    return 0;
}`,
      exp: 'Lab 6’nın iki temel fonksiyonunu birleştirir: döngülü asal kontrolü ve özyineli rakam toplama.',
    },
    q3Memory: {
      title: 'Soru 3: Döngü ve Fonksiyon İçinde Verilen Adımdaki Bellek Durumu',
      points: 30,
      srcLabel: 'Lab 5 (s.22) & Lab 6 (s.5)',
      pdfFile: 'lab_261026_b58eb079.pdf',
      slideNum: 22,
      prompt:
        'Aşağıdaki programda `for` döngüsünün **i == 2** turu tamamlanıp `i++` çalışmadan HEMEN ÖNCE (Satır 14 sonunda) bellekteki tüm aktif değişkenlerin değerlerini yazınız.',
      targetMoment: 'main() içindeki for döngüsünde i = 2 turunun sonunda (i=3 olmadan hemen önce)',
      code: `1:  int katla(int d) {
2:      static int carpan = 1;
3:      carpan = carpan * 2;
4:      return d + carpan;
5:  }
6:  int main() {
7:      int toplam = 0;
8:      int son = 0;
9:      for (int i = 1; i <= 3; i++) {
10:         son = katla(i);
11:         if (son % 2 == 1)
12:             toplam += son;
13:         // <-- TAM BURADA (i == 2 iken) BELLEK DEĞERLERİ NELERDİR?
14:     }
15:     return 0;
16: }`,
      expectedSlots: [
        { scope: 'katla() Static Alan', variable: 'carpan', expectedValue: '4', note: 'i=1’de 1*2=2 oldu; i=2’de 2*2=4 oldu ve bellekte kaldı' },
        { scope: 'main() Frame', variable: 'i', expectedValue: '2', note: 'Henüz i++ çalışmadığı için i = 2' },
        { scope: 'main() Frame', variable: 'son', expectedValue: '6', note: 'i=2 için katla(2) = 2 + 4 = 6 döndü' },
        { scope: 'main() Frame', variable: 'toplam', expectedValue: '3', note: 'i=1’de son=3 (tek -> eklendi: 3); i=2’de son=6 (çift -> eklenmedi!)' },
      ],
      expectedStackOrder: ['main() [i=2, son=6, toplam=3] ← Aktif', '(katla frame pop edildi, sadece static carpan=4 yaşar)'],
      timelineSteps: [
        { step: 1, line: 'Başlangıç', action: 'toplam=0, son=0, static carpan=1', memorySummary: 'main(toplam=0, son=0) | static carpan=1' },
        { step: 2, line: 'i=1 turu', action: 'katla(1): carpan=2, döner 1+2=3 -> tek, toplam=3', memorySummary: 'i=1, son=3, toplam=3, carpan=2' },
        { step: 3, line: 'i=2 turu', action: 'katla(2): carpan=4, döner 2+4=6 -> çift, toplam değişmez (3)', memorySummary: 'i=2, son=6, toplam=3, carpan=4' },
      ],
      exp: 'i=2 turunun sonunda katla(2) çoktan return ettiği için katla Stack Frame’i silinmiştir (d değişkeni yoktur), ANCAK static int carpan kalıcı bellekte 4 olarak yaşamaya devam eder!',
    },
  },
];
