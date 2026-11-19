export const MAT101_YOUTUBE_PLAYLIST_ID = 'PLcNWqzWzYG2v5_R_uPyLRzGXSoYgjfd8C';
export const MAT101_YOUTUBE_PLAYLIST_URL =
  'https://youtube.com/playlist?list=PLcNWqzWzYG2v5_R_uPyLRzGXSoYgjfd8C&si=6cTdIqoboapUv5D-';

export const HIGHER_ORDER_PLAYLIST_ID = 'PLcNWqzWzYG2tT025seU45BSHkrdTbQumF';
export const HIGHER_ORDER_PLAYLIST_URL =
  'https://youtube.com/playlist?list=PLcNWqzWzYG2tT025seU45BSHkrdTbQumF&si=Qp-5lGdNL7I5158P';

export interface YoutubeVideoRef {
  url: string;
  title: string;
}

export interface OrderedPlaylistVideoItem {
  id: string;
  orderLabel: string;
  calculusIndex?: number;
  title: string;
  playlistId: string;
  moduleId: string;
  topicLabel: string;
  slidePage?: number;
  isHigherOrderGroup?: boolean;
  isMidtermCutoffEnd?: boolean;
}

export const plUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}&list=${MAT101_YOUTUBE_PLAYLIST_ID}`;

export const videoWatchUrl = (videoId: string, playlistId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`;

/**
 * Full Calculus-1 Playlist (122 videos) ordered according to Lecture Notes PDF:
 * - Pre-p.119 topics (s. 1–118: Functions, Hyperbolic Functions, Limits, Continuity,
 *   Derivative Rules, Chain/Composite, Tangent/Normal, Hyperbolic Derivatives)
 * - Followed by Higher Order Derivatives (6 videos, s. 117–118) -> VİZE SON YER
 * - Followed by p.119+ topics (Implicit s.119, Logarithmic s.122, Inverse s.124,
 *   Parametric s.127, Rolle/MVT s.128, L'Hospital, Extrema, Sketching, Integrals)
 */
export const CALCULUS1_ORDERED_PLAYLIST: OrderedPlaylistVideoItem[] = [
  // --- MODÜL 1–3: TEMEL CEBİR, FONKSİYONLAR, TRİGONOMETRİ & HİPERBOLİK FONKSİYONLAR (s. 1–75) ---
  { id: 'jDZAAWzEH4k', orderLabel: '1', calculusIndex: 1, title: 'Calculus Dersinde Lise Yıllarından Bilinmesi Gereken Konular', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm1', topicLabel: 'Modül 1 · Temel Cebir & Eşitsizlikler', slidePage: 1 },
  { id: '0sP8iFGWR0Q', orderLabel: '2', calculusIndex: 5, title: 'Fonksiyonlarda Tanım Kümesi Bulma (Domain)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm2', topicLabel: 'Modül 2 · Tanım ve Değer Kümesi', slidePage: 28 },
  { id: 'aJqqnng3gE4', orderLabel: '3', calculusIndex: 2, title: 'Parçalı Fonksiyonların Grafiğini Çizme', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm2', topicLabel: 'Modül 2 · Parçalı Fonksiyonlar', slidePage: 41 },
  { id: 'tcF61ho_E78', orderLabel: '4', calculusIndex: 3, title: 'Parçalı Fonksiyon Grafiği Çizme Örnek Soru-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm2', topicLabel: 'Modül 2 · Parçalı Fonksiyonlar', slidePage: 41 },
  { id: '1WhbC3aOMTw', orderLabel: '5', calculusIndex: 6, title: 'Fonksiyonlarda Görüntü Kümesi Bulma (Range)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm2', topicLabel: 'Modül 2 · Görüntü Kümesi & Ters Fonksiyon', slidePage: 47 },
  { id: 'btftwzl1tnI', orderLabel: '6', calculusIndex: 4, title: 'Calculus Dersinde Bilinmesi Gereken Trigonometrik Bağıntılar', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm3', topicLabel: 'Modül 3 · Trigonometrik Fonksiyonlar', slidePage: 50 },
  { id: 'iHfWQ49MQis', orderLabel: '7', calculusIndex: 94, title: 'Hiperbolik Fonksiyonlar', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm3', topicLabel: 'Modül 3 · Hiperbolik Fonksiyonlar', slidePage: 70 },

  // --- MODÜL 4: LİMİT VE SÜREKLİLİK (s. 76–106) ---
  { id: 'x5gre8Pf-ZY', orderLabel: '8', calculusIndex: 7, title: 'Limit Nedir?', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Limit Tanımı', slidePage: 76 },
  { id: 'dsr-1Z268fA', orderLabel: '9', calculusIndex: 8, title: 'Bir Noktada Limit Olma Şartı', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Sağ/Sol Limit', slidePage: 80 },
  { id: 'XYrnu3mAjfk', orderLabel: '10', calculusIndex: 9, title: 'Parçalı Fonksiyonlarda Limit', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Parçalı Fonksiyonlarda Limit', slidePage: 80 },
  { id: '043GuX5bu_U', orderLabel: '11', calculusIndex: 10, title: 'Mutlak Değerli Fonksiyonlarda Limit', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Mutlak Değer & Limit', slidePage: 80 },
  { id: 'aGHnZW2rePU', orderLabel: '12', calculusIndex: 11, title: 'Tanımsızlık Noktalarında Limit', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Tanımsızlık & Belirsizlik', slidePage: 84 },
  { id: 'v_vYqDchk7M', orderLabel: '13', calculusIndex: 12, title: 'Çarpanlara Ayırma Yardımıyla Çözülebilen Belirsizlikler', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · 0/0 Belirsizliği', slidePage: 84 },
  { id: 'FL0tjCiO3nA', orderLabel: '14', calculusIndex: 13, title: 'Eşlenik Çarpımı Yardımıyla Çözülebilen Belirsizlikler', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Eşlenik ile Limit', slidePage: 84 },
  { id: 'dPL3nBb7EPI', orderLabel: '15', calculusIndex: 14, title: 'Trigonometrik Kurallar Yardımıyla Çözülebilen Belirsizlikler', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Trigonometrik Limitler', slidePage: 84 },
  { id: '3tvtw-6lFAo', orderLabel: '16', calculusIndex: 15, title: 'Sıkıştırma Teoremi (Squeeze or Sandwich Theorem)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Sıkıştırma (Squeeze) Teoremi', slidePage: 80 },
  { id: '93kbvifoNrU', orderLabel: '17', calculusIndex: 16, title: 'Sonsuza Giden Limitler Neyi Hesaplar?', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Sonsuzda Limit', slidePage: 91 },
  { id: 'L_g1oV4WN7Y', orderLabel: '18', calculusIndex: 17, title: 'Sonsuza Giden Limit Kuralları (Limit at Infinity)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Sonsuz Limit Kuralları', slidePage: 91 },
  { id: '4cUT3XTdLqU', orderLabel: '19', calculusIndex: 18, title: 'Kök ve Mutlak Değer İçeren Sonsuza Giden Limitler', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · √(x²) = |x| Limitleri', slidePage: 91 },
  { id: '5uFZVjueVV8', orderLabel: '20', calculusIndex: 19, title: 'Limit Çözümlü Örnek Sorular-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Limit Örnek Sorular', slidePage: 91 },
  { id: 'HsQV6bqmetU', orderLabel: '21', calculusIndex: 20, title: 'Süreklilik Nedir? (Continuity)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Süreklilik', slidePage: 96 },
  { id: 'IHSln7HviBI', orderLabel: '22', calculusIndex: 21, title: 'Bir Noktada Süreklilik Olma Şartı', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Süreklilik Şartları', slidePage: 96 },
  { id: 'H_HyZYv59OA', orderLabel: '23', calculusIndex: 22, title: 'Süreklilik Çözümlü Örnek Sorular', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Süreklilik Örnekleri', slidePage: 96 },
  { id: '-mfYnyp5j2A', orderLabel: '24', calculusIndex: 23, title: 'Süreksizlik Çeşitleri (Type of Discontinuities)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Süreksizlik Çeşitleri', slidePage: 96 },
  { id: 'JQyGeTrkWps', orderLabel: '25', calculusIndex: 24, title: 'Ara Değer Teoremi (Intermediate Value Theorem)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · Ara Değer Teoremi (IVT)', slidePage: 102 },
  { id: 'psCjvV4Yi64', orderLabel: '26', calculusIndex: 25, title: 'Ara Değer Teoremi ile Bir Denklemin En Az Bir Kökü Olduğunu İspatlama', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · IVT Kök İspatı', slidePage: 102 },
  { id: 'sqNbyyCyTUA', orderLabel: '27', calculusIndex: 26, title: 'Ara Değer Teoremi ile Bir Aralıkta İki Fonksiyonun Kesiştiklerini İspatlama', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · IVT Kesişim İspatı', slidePage: 102 },
  { id: 'GZjRRTyprlw', orderLabel: '28', calculusIndex: 27, title: 'Bir Denklemin Verilen Bir Aralıkta Bir Tek Kökü Olduğunu İspatlama', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm4', topicLabel: 'Modül 4 · IVT Tek Kök İspatı', slidePage: 102 },

  // --- MODÜL 5 (s. 107–117): TÜREV TANIMI, KURALLAR, TEĞET/NORMAL, ZİNCİR & HİPERBOLİK TÜREVLER ---
  { id: 'Qa8A0qjh27Y', orderLabel: '29', calculusIndex: 29, title: 'Türevin Tanım Kuralları (Definition Rules)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Türevin Limit Tanımı', slidePage: 107 },
  { id: '3fEn64MDM1c', orderLabel: '30', calculusIndex: 28, title: 'Bir Noktada Türevin Var Olma Şartları', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Türevlenebilirlik', slidePage: 111 },
  { id: 'AF-qZ82eisk', orderLabel: '31', calculusIndex: 32, title: 'Mutlak Değerli Fonksiyonun Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Mutlak Değerli Türev', slidePage: 111 },
  { id: '9xzVkoNEfiw', orderLabel: '32', calculusIndex: 30, title: 'Türev Kuralları', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Temel Türev Kuralları', slidePage: 111 },
  { id: 'A2HKauJpFkU', orderLabel: '33', calculusIndex: 31, title: 'Çarpımın ve Bölümün Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Çarpım ve Bölüm Türevi', slidePage: 111 },
  { id: 'bc3SIRH51rs', orderLabel: '34', calculusIndex: 34, title: 'Zincir Kuralı (Chain Rule)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Zincir Kuralı', slidePage: 115 },
  { id: 'CyZRb5DRUuo', orderLabel: '35', calculusIndex: 35, title: 'Bileşke Fonksiyonun Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Bileşke Fonksiyon Türevi', slidePage: 115 },
  { id: 'YxPUaharl5M', orderLabel: '36', calculusIndex: 41, title: 'Teğetin Eğimi ve Denklemi (Tangent Line)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Teğet Doğrusu', slidePage: 115 },
  { id: 'er4sWjNr340', orderLabel: '37', calculusIndex: 42, title: 'Normalin Eğimi ve Denklemi (Normal Line)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Normal Doğrusu', slidePage: 115 },
  { id: 'sTA74R3Tzw4', orderLabel: '38', calculusIndex: 95, title: 'Hiperbolik Fonksiyonların Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Hiperbolik Türevler', slidePage: 117 },

  // --- YÜKSEK MERTEBEDEN TÜREV OYNATMA LİSTESİ (s. 117–118 · VİZE SON YER) ---
  { id: 'aLByz_v49No', orderLabel: 'YM-1', title: 'Calculus-I : Yüksek Mertebe Türev (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true },
  { id: 'Cy3Dd_HiRA4', orderLabel: 'YM-2', title: 'Calculus-I : Yüksek Mertebe Türev Örnek Soru-1 (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true },
  { id: 'j3itMt8GFQE', orderLabel: 'YM-3', title: 'Calculus-I : Yüksek Mertebe Türev Örnek Soru-2 (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true },
  { id: 'LJEUNMhxnwo', orderLabel: 'YM-4', title: 'Calculus-I : Yüksek Mertebe Türev Örnek Soru-3 (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true },
  { id: '5UrxJbV2xcI', orderLabel: 'YM-5', title: 'Calculus-I : Yüksek Mertebe Türev Örnek Soru-4 (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true },
  { id: '4d3lYEZkC4A', orderLabel: 'YM-6', title: 'Calculus-I : Yüksek Mertebe Türev Örnek Soru-5 (Higher Order Derivatives)', playlistId: HIGHER_ORDER_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Yüksek Mertebeden Türevler (s. 117–118)', slidePage: 117, isHigherOrderGroup: true, isMidtermCutoffEnd: true },

  // --- s. 119 VE SONRASI (VİZE DIŞI / FİNAL KONULARI) ---
  { id: 'CREPsKSV5QE', orderLabel: '39', calculusIndex: 38, title: 'Kapalı Fonksiyonun Türevi (Implicit Differentiation)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Kapalı (Implicit) Türev', slidePage: 119 },
  { id: 'OnUNEPO7oao', orderLabel: '40', calculusIndex: 37, title: 'Logaritma Yardımıyla Türev Alma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Logaritmik Türev', slidePage: 119 },
  { id: 'Kwy_YRONHso', orderLabel: '41', calculusIndex: 36, title: 'Ters Fonksiyonun Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Ters Fonksiyon Türevi', slidePage: 123 },
  { id: 'F9a4hh98kJk', orderLabel: '42', calculusIndex: 33, title: 'Parametrik Fonksiyonun Türevi', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Parametrik Türev', slidePage: 123 },
  { id: 'RwQAWifpimA', orderLabel: '43', calculusIndex: 40, title: "Rolle's Teoremi (Rolle's Theorem)", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Rolle Teoremi', slidePage: 128 },
  { id: '5LkxLs8MiMs', orderLabel: '44', calculusIndex: 39, title: 'Ortalama Değer Teoremi (Mean Value Theorem)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm5', topicLabel: 'Modül 5 · Ortalama Değer Teoremi', slidePage: 128 },
  { id: 'h1iQlw0OOjc', orderLabel: '45', calculusIndex: 43, title: "Belirsizlik Çeşitleri ve L'hospital Kuralı", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital Kuralı", slidePage: 164 },
  { id: '0sQ8fnYR2UY', orderLabel: '46', calculusIndex: 44, title: "0/0 Belirsizliğinin L'hospital Kuralı ile Çözümü", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital (0/0)", slidePage: 164 },
  { id: 'lvr7OUbLWQs', orderLabel: '47', calculusIndex: 45, title: "∞/∞ Belirsizliğinin L'hospital Kuralı ile Çözümü", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital (∞/∞)", slidePage: 164 },
  { id: 'QQB7VaIgPM0', orderLabel: '48', calculusIndex: 46, title: "∞ - ∞ Belirsizliğinin L'hospital Kuralı ile Çözümü", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital (∞ - ∞)", slidePage: 164 },
  { id: '4T4n0vQR9rQ', orderLabel: '49', calculusIndex: 47, title: "0 . ∞ Belirsizliğinin L'hospital Kuralı ile Çözümü", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital (0 · ∞)", slidePage: 164 },
  { id: 'TqIxWhzbZ8c', orderLabel: '50', calculusIndex: 48, title: "1^∞ , 0^0 ve ∞^0 Belirsizliklerinin L'hospital Kuralı ile Çözümü", playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: "Modül 6 · L'Hospital (Üstel Belirsizlik)", slidePage: 164 },
  { id: 'TeRoIhEx4s0', orderLabel: '51', calculusIndex: 49, title: '1. ve 2. Türevin Yorumu Neyi Amaçlar?', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Türev Uygulamaları Giriş', slidePage: 134 },
  { id: 'JgpN-A2LFsw', orderLabel: '52', calculusIndex: 50, title: '1. Türevin Yorumu', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · 1. Türev & Artan/Azalan', slidePage: 134 },
  { id: '9XHBpauMCrM', orderLabel: '53', calculusIndex: 51, title: 'Daima Artan ve Daima Azalan Fonksiyonlar', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Artan / Azalan Fonksiyonlar', slidePage: 134 },
  { id: 'ukH48VtJ9og', orderLabel: '54', calculusIndex: 52, title: 'Yerel ile Mutlak Maksimum ve Minimum Arasındaki Fark', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Ekstremum Kavramı', slidePage: 134 },
  { id: 'Sjh9mPrO9ok', orderLabel: '55', calculusIndex: 53, title: 'Verilen Bir Aralıkta Fonksiyonun Mutlak Maksimum ve Minimum Noktalarını Bulma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Mutlak Ekstremum', slidePage: 134 },
  { id: 'sJLPmw5bjfg', orderLabel: '56', calculusIndex: 54, title: 'Maksimum ve Minimum Noktaları 2. Türev Testi ile Belirleme', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · 2. Türev Testi', slidePage: 143 },
  { id: 'hUXibtM7T1A', orderLabel: '57', calculusIndex: 55, title: '2. Türevin Yorumu', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Konkavlık ve Büküm Noktası', slidePage: 143 },
  { id: 'q7JTh2eOYlo', orderLabel: '58', calculusIndex: 56, title: 'Optimizasyon Problemleri (Maksimum ve Minimum Problemleri)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Optimizasyon Problemleri', slidePage: 177 },
  { id: '3ItuAbdU--4', orderLabel: '59', calculusIndex: 57, title: 'Optimizasyon Problemi Örneği-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Optimizasyon Örneği-1', slidePage: 177 },
  { id: 'q9a-_a5SfFM', orderLabel: '60', calculusIndex: 58, title: 'Optimizasyon Problemi Örneği-2', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Optimizasyon Örneği-2', slidePage: 177 },
  { id: 'OfdZ-eGkY6I', orderLabel: '61', calculusIndex: 59, title: 'Asimptot Nedir ve Çeşitleri Nelerdir?', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Asimptotlar', slidePage: 149 },
  { id: 'RDFliZG-zbY', orderLabel: '62', calculusIndex: 60, title: 'Düşey Asimptot (Vertical Asymptote)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Düşey Asimptot', slidePage: 149 },
  { id: 'bSdAts-vr9E', orderLabel: '63', calculusIndex: 61, title: 'Yatay Asimptot (Horizontal Asymptote)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Yatay Asimptot', slidePage: 149 },
  { id: 'POxzQiTaUGA', orderLabel: '64', calculusIndex: 62, title: 'Eğik ve Eğri Asimptot (Oblique Asymptote)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Eğik Asimptot', slidePage: 149 },
  { id: 'KVvx5ufL7m8', orderLabel: '65', calculusIndex: 63, title: 'Türev Kullanarak Fonksiyon Grafiği Çizme (Curve Sketching)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Grafik Çizimi', slidePage: 149 },
  { id: 'OKopyuV8UKg', orderLabel: '66', calculusIndex: 64, title: 'Türev Kullanarak Fonksiyon Grafiği Çizme Örneği-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Grafik Çizimi Örneği-1', slidePage: 149 },
  { id: 'bUmV2ltrJFo', orderLabel: '67', calculusIndex: 65, title: 'Türev Kullanarak Fonksiyon Grafiği Çizme Örneği-2', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Grafik Çizimi Örneği-2', slidePage: 149 },
  { id: 'p874gqpZefc', orderLabel: '68', calculusIndex: 66, title: 'Türev Kullanarak Fonksiyon Grafiği Çizme Örneği-3', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm6', topicLabel: 'Modül 6 · Grafik Çizimi Örneği-3', slidePage: 149 },
  { id: 'IiFc9w127Kw', orderLabel: '69', calculusIndex: 67, title: 'İntegral Temel Bilgiler', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegral Temelleri', slidePage: 183 },
  { id: 'y-vBcb6k_vk', orderLabel: '70', calculusIndex: 68, title: 'İntegral Alma Kuralları', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegral Kuralları', slidePage: 183 },
  { id: 'txkRgRRWKFE', orderLabel: '71', calculusIndex: 69, title: 'İntegral Alma Yöntemleri', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegral Yöntemleri', slidePage: 186 },
  { id: 'vSXy0RvJh0g', orderLabel: '72', calculusIndex: 70, title: 'Değişken Değiştirme Yöntemi (u Substitution)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Değişken Değiştirme (u-sub)', slidePage: 186 },
  { id: '1gQpfwapdA8', orderLabel: '73', calculusIndex: 71, title: 'Kısmi İntegral Yöntemi (Integration by Parts) (LAPTÜ)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Kısmi İntegral (LAPTÜ)', slidePage: 190 },
  { id: '5J3f_08mbOE', orderLabel: '74', calculusIndex: 72, title: 'Polinom Bölmesi Yardımıyla İntegral Alma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Polinom Bölmesi ile İntegral', slidePage: 194 },
  { id: 'jMapEaADrXQ', orderLabel: '75', calculusIndex: 73, title: 'Basit Kesirlere Ayırma ile İntegral Alma (Partial Fractions)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Basit Kesirlere Ayırma', slidePage: 194 },
  { id: 'SlGBLYpyVno', orderLabel: '76', calculusIndex: 74, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (1. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (1)', slidePage: 197 },
  { id: 'heAb_UOiN9g', orderLabel: '77', calculusIndex: 75, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (2. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (2)', slidePage: 197 },
  { id: 'kPC6fqA31eA', orderLabel: '78', calculusIndex: 76, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (3. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (3)', slidePage: 197 },
  { id: 'R2Cx8ovJwJw', orderLabel: '79', calculusIndex: 77, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (4. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (4)', slidePage: 197 },
  { id: 'F04ujRWIHyw', orderLabel: '80', calculusIndex: 78, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (5. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (5)', slidePage: 197 },
  { id: 'N2Bz6DiE9uA', orderLabel: '81', calculusIndex: 79, title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (6. Bölüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Trigonometrik İntegraller (6)', slidePage: 197 },
  { id: '3SqzFdNFX7o', orderLabel: '82', calculusIndex: 80, title: 'Ters Trigonometrik Dönüşüm ile İntegral Alma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Ters Trig Dönüşüm', slidePage: 208 },
  { id: 'RBIEtJZX970', orderLabel: '83', calculusIndex: 81, title: 'İntegral Örnek Sorular ve Çözümleri-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegral Örnekleri-1', slidePage: 208 },
  { id: 'KR4inyu5mp0', orderLabel: '84', calculusIndex: 82, title: 'İntegral Örnek Sorular ve Çözümleri-2', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegral Örnekleri-2', slidePage: 208 },
  { id: 'RpkURJPlVys', orderLabel: '85', calculusIndex: 83, title: 'Değişken Değiştirme Ardından Kısmi İntegral Gerektiren İntegraller', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Karma İntegral Teknikleri', slidePage: 190 },
  { id: 'iA7kYzY-M5o', orderLabel: '86', calculusIndex: 84, title: 'Değişken Değiştirme Ardından Basit Kesirlere Ayırma Gerektiren İntegraller', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · u-Sub + Basit Kesirler', slidePage: 194 },
  { id: 'MnbrJtkT7nQ', orderLabel: '87', calculusIndex: 85, title: 'Özel İntegral Soruları-1 (1-sinx ile pay ve paydayı çarpma)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Özel İntegral-1', slidePage: 197 },
  { id: 'FOa5HiYckSM', orderLabel: '88', calculusIndex: 86, title: 'Özel İntegral Soruları-2 (sec^3(x) integrali)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Özel İntegral-2 (sec³x)', slidePage: 197 },
  { id: 'UKszfZIG_NU', orderLabel: '89', calculusIndex: 87, title: 'Özel İntegral Soruları-3 (kök içine u^2 denilerek dönüşüm)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Özel İntegral-3 (Köklü)', slidePage: 208 },
  { id: 'FhKnxSdSUko', orderLabel: '90', calculusIndex: 88, title: 'Belirli İntegral (Definite Integral)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Belirli İntegral', slidePage: 183 },
  { id: 'xQNMfOPbClY', orderLabel: '91', calculusIndex: 89, title: 'Belirli İntegral Özellikleri', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Belirli İntegral Özellikleri', slidePage: 183 },
  { id: 'bIrEA1uIBRw', orderLabel: '92', calculusIndex: 90, title: 'Mutlak Değerli Belirli İntegrallerin Çözümü', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Mutlak Değerli İntegral', slidePage: 183 },
  { id: '_DZtw_7B8QI', orderLabel: '93', calculusIndex: 91, title: 'Parçalı Fonksiyon İçeren Belirli İntegrallerin Çözümü', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Parçalı İntegral', slidePage: 183 },
  { id: 'e_-ww29CRuc', orderLabel: '94', calculusIndex: 92, title: 'Belirli İntegralin Türevi (Fundamental Theorem of Calculus)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Kalkülüsün Temel Teoremi', slidePage: 183 },
  { id: 'tq6-kbOdXpM', orderLabel: '95', calculusIndex: 93, title: 'Çember Yardımıyla Belirli İntegralleri Çözme', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Geometrik Alan ile İntegral', slidePage: 183 },
  { id: 'qrWf6eHvebw', orderLabel: '96', calculusIndex: 96, title: 'Hiperbolik Fonksiyonların İntegrali', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hiperbolik İntegraller', slidePage: 183 },
  { id: 'TPj9armytgI', orderLabel: '97', calculusIndex: 97, title: 'İntegralde Alan Çeşitleri', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İntegralde Alan', slidePage: 208 },
  { id: 'Fy4-QRwMn2g', orderLabel: '98', calculusIndex: 98, title: 'İntegralde Alan Hesaplamada Çizimi Bilinmesi Gereken Fonksiyonlar', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Alan Hesabı Grafikleri', slidePage: 208 },
  { id: 'bDa3ELie0LE', orderLabel: '99', calculusIndex: 99, title: 'x-ekseni ile Grafik Arasında Kalan Alanı Bulma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · x-Ekseni Alan Hesabı', slidePage: 208 },
  { id: 'nf3FL2j-tRs', orderLabel: '100', calculusIndex: 100, title: 'y-ekseni ile Grafik Arasında Kalan Alanı Bulma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · y-Ekseni Alan Hesabı', slidePage: 208 },
  { id: 'grXKTgICcn4', orderLabel: '101', calculusIndex: 101, title: 'İki Grafik Arasında Kalan Alanı Bulma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · İki Eğri Arasındaki Alan', slidePage: 208 },
  { id: 'nezL-q_uwy0', orderLabel: '102', calculusIndex: 102, title: 'İntegralde Alan Örnek Sorular', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Alan Örnek Sorular', slidePage: 208 },
  { id: 'B5HtvsHYYBk', orderLabel: '103', calculusIndex: 103, title: 'Genelleştirilmiş İntegral Nedir?', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Genelleştirilmiş İntegral', slidePage: 208 },
  { id: '8c5oRJQ8eoM', orderLabel: '104', calculusIndex: 104, title: 'Sınırlarında Sonsuz İçeren Genelleştirilmiş İntegraller', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Sonsuz Sınırlı İntegraller', slidePage: 208 },
  { id: 'WYT1-Ixydr4', orderLabel: '105', calculusIndex: 105, title: 'Sınırlarında Tanımsızlık İçeren Genelleştirilmiş İntegraller', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Tanımsız Noktalı İntegraller', slidePage: 208 },
  { id: 'yQESHBfIgz8', orderLabel: '106', calculusIndex: 106, title: 'Genelleştirilmiş İntegral Örnekleri', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Genelleştirilmiş Örnekler', slidePage: 208 },
  { id: 'BTr8DYO0Kz0', orderLabel: '107', calculusIndex: 107, title: 'İntegralde Hacim Hesaplama Çeşitleri', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hacim Hesaplama', slidePage: 208 },
  { id: 'Zter8dFE3hY', orderLabel: '108', calculusIndex: 108, title: 'Disk ve Washer Metod ile Hacim Hesaplama (x-ekseni)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Disk & Washer (x-ekseni)', slidePage: 208 },
  { id: 'p_39zZkbOHw', orderLabel: '109', calculusIndex: 109, title: 'Disk ve Washer Metod ile Hacim Hesaplama (y-ekseni)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Disk & Washer (y-ekseni)', slidePage: 208 },
  { id: 'JdT7kYMk4s4', orderLabel: '110', calculusIndex: 110, title: 'Disk Metod ile Hacim Hesaplama (Yatay Doğru)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Disk (Yatay Doğru)', slidePage: 208 },
  { id: 'Wymq8Zp7fiM', orderLabel: '111', calculusIndex: 111, title: 'Disk Metod ile Hacim Hesaplama (Düşey Doğru)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Disk (Düşey Doğru)', slidePage: 208 },
  { id: 'rgZGg9lRn7w', orderLabel: '112', calculusIndex: 112, title: 'Washer Metodu ile Hacim Hesaplama (Yatay Doğru)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Washer (Yatay Doğru)', slidePage: 208 },
  { id: 'wq6zJZ61u1g', orderLabel: '113', calculusIndex: 113, title: 'Washer Metodu ile Hacim Hesaplama (Düşey Doğru)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Washer (Düşey Doğru)', slidePage: 208 },
  { id: 'I7PVgFLsKeg', orderLabel: '114', calculusIndex: 114, title: 'Shell Metodu ile Hacim Hesaplama (y ekseni)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Shell (y-ekseni)', slidePage: 208 },
  { id: 'Dp9TcdSu6fQ', orderLabel: '115', calculusIndex: 115, title: 'Shell Metodu ile Hacim Hesaplama (x ekseni)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Shell (x-ekseni)', slidePage: 208 },
  { id: 'U9-rtJ227UY', orderLabel: '116', calculusIndex: 116, title: 'İntegralde Hacim Örnek Soru-1', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hacim Örnek-1', slidePage: 208 },
  { id: 'Y2kc6x5aEws', orderLabel: '117', calculusIndex: 117, title: 'İntegralde Hacim Örnek Soru-2', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hacim Örnek-2', slidePage: 208 },
  { id: 'SkohVjBzblQ', orderLabel: '118', calculusIndex: 118, title: 'İntegralde Hacim Örnek Soru-3', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hacim Örnek-3', slidePage: 208 },
  { id: 'kuxcDCktrN8', orderLabel: '119', calculusIndex: 119, title: 'İntegralde Hacim Örnek Soru-4', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Hacim Örnek-4', slidePage: 208 },
  { id: 'pw8bRvZ6_Mc', orderLabel: '120', calculusIndex: 120, title: 'Yay Uzunluğu Bulma (Arc Length)', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Yay Uzunluğu', slidePage: 208 },
  { id: 'AeI4Cu_n6hI', orderLabel: '121', calculusIndex: 121, title: 'Parametrik Eğrilerde Yay Uzunluğu Bulma', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Parametrik Yay Uzunluğu', slidePage: 208 },
  { id: 'Nbgz1o7VhFA', orderLabel: '122', calculusIndex: 122, title: 'İntegral ile Ortalama Değer Hesaplama', playlistId: MAT101_YOUTUBE_PLAYLIST_ID, moduleId: 'm7', topicLabel: 'Modül 7 · Ortalama Değer', slidePage: 208 },
];

/**
 * Exact video IDs from playlist PLcNWqzWzYG2v5_R_uPyLRzGXSoYgjfd8C (Calculus-1 · BUders)
 */
export const PL_VIDEOS = {
  // Modül 1: Lise / Temel Cebir / Analitik / Kümeler / Eşitsizlik
  precalcPrep: {
    id: 'jDZAAWzEH4k',
    title: 'Calculus Dersinde Lise Yıllarından Bilinmesi Gereken Konular',
  },
  // Modül 2: Fonksiyonlar
  domain: {
    id: '0sP8iFGWR0Q',
    title: 'Fonksiyonlarda Tanım Kümesi Bulma (Domain)',
  },
  range: {
    id: '1WhbC3aOMTw',
    title: 'Fonksiyonlarda Görüntü Kümesi Bulma (Range)',
  },
  piecewiseGraph: {
    id: 'aJqqnng3gE4',
    title: 'Parçalı Fonksiyonların Grafiğini Çizme',
  },
  piecewiseExample: {
    id: 'tcF61ho_E78',
    title: 'Parçalı Fonksiyon Grafiği Çizme Örnek Soru-1',
  },
  // Modül 3: Trig, Üstel/Log, Hiperbolik
  trigRelations: {
    id: 'btftwzl1tnI',
    title: 'Calculus Dersinde Bilinmesi Gereken Trigonometrik Bağıntılar',
  },
  hyperbolic: {
    id: 'iHfWQ49MQis',
    title: 'Hiperbolik Fonksiyonlar (Hyperbolic Functions)',
  },
  // Modül 4: Limit ve Süreklilik
  limitIntro: {
    id: 'x5gre8Pf-ZY',
    title: 'Limit Nedir?',
  },
  limitCondition: {
    id: 'dsr-1Z268fA',
    title: 'Bir Noktada Limit Olma Şartı',
  },
  limitPiecewise: {
    id: 'XYrnu3mAjfk',
    title: 'Parçalı Fonksiyonlarda Limit',
  },
  limitAbs: {
    id: '043GuX5bu_U',
    title: 'Mutlak Değerli Fonksiyonlarda Limit',
  },
  limitFactoring: {
    id: 'v_vYqDchk7M',
    title: 'Çarpanlara Ayırma Yardımıyla Çözülebilen Belirsizlikler',
  },
  limitConjugate: {
    id: 'FL0tjCiO3nA',
    title: 'Eşlenik Çarpımı Yardımıyla Çözülebilen Belirsizlikler',
  },
  limitTrig: {
    id: 'dPL3nBb7EPI',
    title: 'Trigonometrik Kurallar Yardımıyla Çözülebilen Belirsizlikler',
  },
  limitSqueeze: {
    id: '3tvtw-6lFAo',
    title: 'Sıkıştırma Teoremi (Squeeze / Sandwich Theorem)',
  },
  limitInfinityRules: {
    id: 'L_g1oV4WN7Y',
    title: 'Sonsuza Giden Limit Kuralları (Limit at Infinity)',
  },
  limitInfinityRoots: {
    id: '4cUT3XTdLqU',
    title: 'Kök ve Mutlak Değer İçeren Sonsuza Giden Limitler',
  },
  continuityIntro: {
    id: 'HsQV6bqmetU',
    title: 'Süreklilik Nedir? (Continuity)',
  },
  continuityCondition: {
    id: 'IHSln7HviBI',
    title: 'Bir Noktada Süreklilik Olma Şartı',
  },
  discontinuities: {
    id: '-mfYnyp5j2A',
    title: 'Süreksizlik Çeşitleri (Types of Discontinuities)',
  },
  ivt: {
    id: 'JQyGeTrkWps',
    title: 'Ara Değer Teoremi (Intermediate Value Theorem)',
  },
  // Modül 5: Türev
  derivativeExistence: {
    id: '3fEn64MDM1c',
    title: 'Bir Noktada Türevin Var Olma Şartları',
  },
  derivativeDefinition: {
    id: 'Qa8A0qjh27Y',
    title: 'Türevin Tanım Kuralları (Definition Rules)',
  },
  derivativeRules: {
    id: '9xzVkoNEfiw',
    title: 'Türev Kuralları',
  },
  derivativeProductQuotient: {
    id: 'A2HKauJpFkU',
    title: 'Çarpımın ve Bölümün Türevi',
  },
  derivativeChain: {
    id: 'bc3SIRH51rs',
    title: 'Zincir Kuralı (Chain Rule)',
  },
  derivativeComposite: {
    id: 'CyZRb5DRUuo',
    title: 'Bileşke Fonksiyonun Türevi',
  },
  derivativeInverse: {
    id: 'Kwy_YRONHso',
    title: 'Ters Fonksiyonun Türevi',
  },
  derivativeLogarithmic: {
    id: 'OnUNEPO7oao',
    title: 'Logaritma Yardımıyla Türev Alma',
  },
  derivativeImplicit: {
    id: 'CREPsKSV5QE',
    title: 'Kapalı Fonksiyonun Türevi (Implicit Differentiation)',
  },
  derivativeParametric: {
    id: 'F9a4hh98kJk',
    title: 'Parametrik Fonksiyonun Türevi',
  },
  derivativeHyperbolic: {
    id: 'sTA74R3Tzw4',
    title: 'Hiperbolik Fonksiyonların Türevi',
  },
  tangentLine: {
    id: 'YxPUaharl5M',
    title: 'Teğetin Eğimi ve Denklemi (Tangent Line)',
  },
  normalLine: {
    id: 'er4sWjNr340',
    title: 'Normalin Eğimi ve Denklemi (Normal Line)',
  },
  mvt: {
    id: '5LkxLs8MiMs',
    title: 'Ortalama Değer Teoremi (Mean Value Theorem)',
  },
  rolle: {
    id: 'RwQAWifpimA',
    title: "Rolle's Teoremi (Rolle's Theorem)",
  },
  // Modül 6: Türev Uygulamaları & L'Hospital
  lhospitalIntro: {
    id: 'h1iQlw0OOjc',
    title: "Belirsizlik Çeşitleri ve L'Hospital Kuralı",
  },
  firstSecondDerivOverview: {
    id: 'TeRoIhEx4s0',
    title: '1. ve 2. Türevin Yorumu Neyi Amaçlar?',
  },
  firstDerivInterpretation: {
    id: 'JgpN-A2LFsw',
    title: '1. Türevin Yorumu',
  },
  secondDerivInterpretation: {
    id: 'hUXibtM7T1A',
    title: '2. Türevin Yorumu',
  },
  optimization: {
    id: 'q7JTh2eOYlo',
    title: 'Optimizasyon Problemleri (Maksimum ve Minimum Problemleri)',
  },
  curveSketching: {
    id: 'KVvx5ufL7m8',
    title: 'Türev Kullanarak Fonksiyon Grafiği Çizme (Curve Sketching)',
  },
  // Modül 7: İntegral
  integralBasics: {
    id: 'IiFc9w127Kw',
    title: 'İntegral Temel Bilgiler',
  },
  integralRules: {
    id: 'y-vBcb6k_vk',
    title: 'İntegral Alma Kuralları',
  },
  integralMethods: {
    id: 'txkRgRRWKFE',
    title: 'İntegral Alma Yöntemleri',
  },
  uSubstitution: {
    id: 'vSXy0RvJh0g',
    title: 'Değişken Değiştirme Yöntemi (u Substitution)',
  },
  integrationByParts: {
    id: '1gQpfwapdA8',
    title: 'Kısmi İntegral Yöntemi (Integration by Parts - LAPTÜ)',
  },
  partialFractions: {
    id: 'jMapEaADrXQ',
    title: 'Basit Kesirlere Ayırma ile İntegral Alma (Partial Fractions)',
  },
  trigSubstitution: {
    id: 'SlGBLYpyVno',
    title: 'Trigonometrik Dönüşüm Yardımıyla İntegral Alma (1. Bölüm)',
  },
} as const;

export function refFrom(item: { id: string; title: string }): YoutubeVideoRef {
  return {
    url: plUrl(item.id),
    title: item.title,
  };
}

/**
 * Maps a Past Midterm question topicTag (and optional question text) to the most specific video in the playlist.
 */
export function getYoutubeForTopicTag(topicTag: string): YoutubeVideoRef {
  const tag = topicTag.toLocaleLowerCase('tr-TR');

  if (tag.includes('squeeze') || tag.includes('sıkıştırma')) {
    return refFrom(PL_VIDEOS.limitSqueeze);
  }
  if (tag.includes('ara değer') || tag.includes('ivt')) {
    return refFrom(PL_VIDEOS.ivt);
  }
  if (tag.includes('hiperbolik')) {
    return refFrom(PL_VIDEOS.hyperbolic);
  }
  if (tag.includes('tanım kümesi')) {
    return refFrom(PL_VIDEOS.domain);
  }
  if (tag.includes('signum') && tag.includes('süreksizlik')) {
    return refFrom(PL_VIDEOS.discontinuities);
  }
  if (tag.includes('süreklilik') && tag.includes('türev')) {
    return refFrom(PL_VIDEOS.derivativeExistence);
  }
  if (tag.includes('süreklilik') || tag.includes('süreksizlik')) {
    return refFrom(PL_VIDEOS.continuityCondition);
  }
  if (tag.includes('normal')) {
    return refFrom(PL_VIDEOS.normalLine);
  }
  if (tag.includes('teğet')) {
    return refFrom(PL_VIDEOS.tangentLine);
  }
  if (tag.includes('logaritmik türev')) {
    return refFrom(PL_VIDEOS.derivativeLogarithmic);
  }
  if (tag.includes('kapalı')) {
    return refFrom(PL_VIDEOS.derivativeImplicit);
  }
  if (tag.includes('parametrik')) {
    return refFrom(PL_VIDEOS.derivativeParametric);
  }
  if (tag.includes('zincir')) {
    return refFrom(PL_VIDEOS.derivativeChain);
  }
  if (tag.includes('bölüm') && tag.includes('türev')) {
    return refFrom(PL_VIDEOS.derivativeProductQuotient);
  }
  if (tag.includes('limit ile türev') || tag.includes('türev tanım')) {
    return refFrom(PL_VIDEOS.derivativeDefinition);
  }
  if (tag.includes('ikinci mertebeden türev') || tag.includes('türev')) {
    return refFrom(PL_VIDEOS.derivativeRules);
  }
  if (tag.includes('l\'hospital') || tag.includes('trigonometrik belirsizlik') || tag.includes('trigonometrik limit')) {
    return refFrom(PL_VIDEOS.limitTrig);
  }
  if (tag.includes('eşlenik')) {
    return refFrom(PL_VIDEOS.limitConjugate);
  }
  if (tag.includes('sonsuzda') || tag.includes('sonsuz limit') || tag.includes('√x²') || tag.includes('kök mutlak')) {
    return refFrom(PL_VIDEOS.limitInfinityRoots);
  }
  if (tag.includes('limit')) {
    return refFrom(PL_VIDEOS.limitCondition);
  }
  if (tag.includes('ters fonksiyon') || tag.includes('artan') || tag.includes('azalan')) {
    return refFrom(PL_VIDEOS.range);
  }
  if (tag.includes('bileşke') || tag.includes('tek/çift') || tag.includes('fonksiyon')) {
    return refFrom(PL_VIDEOS.piecewiseGraph);
  }
  return {
    url: MAT101_YOUTUBE_PLAYLIST_URL,
    title: 'Calculus-1 Oynatma Listesi (BUders)',
  };
}
