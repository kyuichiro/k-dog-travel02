export type DogCharacterType = 'uchibenkei' | 'hakoiri' | 'wanpaku' | 'hime_ouji';
export type DogSize = 'small_medium' | 'large';
export type TravelPurpose = 'friends' | 'private'; // friends = わいわい旅, private = まったり旅
export type TravelArea = '北海道' | '東北' | '北陸' | '関東' | '中部' | '関西' | '中国' | '四国' | '九州' | '沖縄';

export interface Facility {
  id: string;
  name: string;
  type: string; // e.g. "ロッジ", "ホテル", "部屋食", "ドッグラン"
  description: string;
  image: string;
  rating: number;
  highlight: string;
  nearbyFacilities: NearbyFacility[];
}

export interface NearbyFacility {
  name: string;
  category: '泊まる' | '食べる' | '遊ぶ';
  distance: string; // e.g. "1.2km", "0.8km"
  description: string;
}

export interface TravelTypeDetail {
  number: number;
  id: string;
  title: string;
  characterName: string;
  travelStyle: 'わいわい旅' | 'まったり旅';
  description: string;
  // Recommended categories representation based on the table in PDF
  recommendation: {
    stay: string;     // 泊まる
    eat: string;      // 食べる
    enjoy: string;    // 楽しむ
  };
}

export const DOG_CHARACTER_INFO: Record<DogCharacterType, { name: string; description: string }> = {
  uchibenkei: {
    name: '内弁慶ちゃん',
    description: '飼い主様以外の人やほかのワンちゃんを警戒してしまう「内弁慶ちゃん」。少しシャイな一面を持ちつつ、おうちや慣れた場所、飼い主様の前では活発に動き回るのが大好きなワンちゃんです。'
  },
  hakoiri: {
    name: '箱入りちゃん',
    description: '飼い主様の事が大好きで、少し慎重な「箱入りちゃん」。安心安全な環境を好み、穏やかで過剰に走り回るよりは、ゆったりとそばに寄り添うことが大好きな慎重派ワンちゃんです。'
  },
  wanpaku: {
    name: 'ワンパクちゃん',
    description: '体を動かすことが大好きな、「ワンパクちゃん」。他のワンちゃんや人間のお友達を作るのも得意で、誰とでもすぐに仲良くなれる、エネルギッシュで社交的な人気者タイプです。'
  },
  hime_ouji: {
    name: '姫・王子ちゃん',
    description: '飼い主様をはじめ、人にかまってもらうのが大好きな「姫・王子ちゃん」。おっとり高貴な雰囲気があり、駆け回るよりも華やかな注目や美味しいおもてなしを喜ぶ甘えん坊タイプです。'
  }
};

export const TRAVEL_TYPES: Record<string, TravelTypeDetail> = {
  'uchibenkei_friends': {
    number: 1,
    id: 'uchibenkei_friends',
    title: '内弁慶ちゃんと、わいわい旅',
    characterName: '内弁慶ちゃん',
    travelStyle: 'わいわい旅',
    description: '普段はシャイな内弁慶ちゃんですが、周囲へ警戒心の少ない貸切ロッジや少人数空間なら他のお客様を気にせずのびのび。屋外でのバーベキューなら、みんなで集まりつつワンちゃん自身の安全なスペースも確保でき、マリンスポーツや大型ドッグランで活発に体を動かすわいわい楽しむ旅が実現します。',
    recommendation: {
      stay: '貸切ロッジ・ヴィラ',
      eat: 'プライベートバーベキュー（屋外席）',
      enjoy: 'マリンスポーツ・貸切大型ドッグラン'
    }
  },
  'uchibenkei_private': {
    number: 2,
    id: 'uchibenkei_private',
    title: '内弁慶ちゃんと、まったり旅',
    characterName: '内弁慶ちゃん',
    travelStyle: 'まったり旅',
    description: '警戒心の強い内弁慶ちゃんとプライベート感を重視したまったり二人旅。完全にワンちゃん専用として設計されたホテルを選び、お食事は誰の目も気にしないお部屋食にすることでリフレッシュ。静かな水辺でのプライベートマリンスポーツや専用ドッグランで、飼い主さんを独占して水いらずの時間を極上まったり満喫します。',
    recommendation: {
      stay: 'ワンちゃん専用ホテル',
      eat: '極上お部屋食',
      enjoy: 'プライベートマリンスポーツ・専用ドッグラン'
    }
  },
  'wanpaku_friends': {
    number: 3,
    id: 'wanpaku_friends',
    title: 'ワンパクちゃんと、わいわい旅',
    characterName: 'ワンパクちゃん',
    travelStyle: 'わいわい旅',
    description: 'とにかく体を動かすことと、他のワンちゃんとお友達になるのが得意なワンパクちゃん！同じ犬好きが集まるペット同伴専門ペンションに泊まり、開放的なテラス席でのみんなで楽しむ食事、広大な共有ドッグランで全力で駆け回り他犬と仲良く触れ合うわいわいフルアクティブ旅です。',
    recommendation: {
      stay: 'ドッグ同伴専門和モダンペンション',
      eat: 'レストランの屋外テラス席（ペット同伴）',
      enjoy: '広大な共有ドッグラン・お友達づくりラン'
    }
  },
  'wanpaku_private': {
    number: 4,
    id: 'wanpaku_private',
    title: 'ワンパクちゃんと、まったり旅',
    characterName: 'ワンパクちゃん',
    travelStyle: 'まったり旅',
    description: '元気なワンパクちゃんと、あえて自然の中でゆったりプライベートを確保するプラン。大自然を満喫できるおしゃれなグランピング施設で、ワンちゃん同伴可能なレストランで安心してお食事。森の中、あるいは広大な芝生地を駆け抜ける大自然ドッグランをおこないながらも、グランピングならではの上質なまったり泊を満喫します。',
    recommendation: {
      stay: '大自然ドッグフレンドリーグランピング',
      eat: '愛犬同伴ラグジュアリーレストラン',
      enjoy: '爽快大自然ドッグラン・フォレスト散歩'
    }
  },
  'hime_ouji_friends': {
    number: 5,
    id: 'hime_ouji_friends',
    title: '姫・王子ちゃんと、わいわい旅',
    characterName: '姫・王子ちゃん',
    travelStyle: 'わいわい旅',
    description: '人間大好きで甘えん坊な姫・王子ちゃんを主役に、豪華なペット同伴ホテルに宿泊。レストランの屋外テラス席で他の旅行客とも笑顔で行き来しながら、クラフト工房で世界に一つだけの愛犬記念品（迷子札など）製作、または優雅なマッサージ＆ビューティートリミングなど、きらきらと輝く体験をわいわい楽しみます。',
    recommendation: {
      stay: 'リゾートドッグエステ＆ホテル',
      eat: 'オープンテラス・アメニティレストラン',
      enjoy: '体験型フォト・記念製作ワークショップ・ドッグスパ'
    }
  },
  'hime_ouji_private': {
    number: 6,
    id: 'hime_ouji_private',
    title: '姫・王子ちゃんと、まったり旅',
    characterName: '姫・王子ちゃん',
    travelStyle: 'まったり旅',
    description: '人なつっこい姫・王子ちゃんと二人だけで極上のホスピタリティを受けるまったり旅。お散歩も激しいエリアではなく、絶景テラスやおしゃれなカフェ巡り、さらにプロによるメモリアル写真撮影をおこない、ゆったりドッグスパやホテルルームで愛に溢れたまったり優雅なロマンチックホリデーを堪能。',
    recommendation: {
      stay: 'ラグジュアリーペットリゾートホテル',
      eat: '愛犬個室確約ラグジュアリーディナー',
      enjoy: 'プロ写真家によるアニバーサリー撮影・癒やしの散歩'
    }
  },
  'hakoiri_friends': {
    number: 7,
    id: 'hakoiri_friends',
    title: '箱入りちゃんと、わいわい旅',
    characterName: '箱入りちゃん',
    travelStyle: 'わいわい旅',
    description: '慎重でおうち気質な箱入りちゃんだからこそ、大人数より家族みんなでのんびりできる落ち着いたコテージ・ロッジ泊。個室型レストランで周囲の刺激を減らしつつ美味しい一皿を、そして自然風景に癒やされる広々とした散歩道、かわいいお洋服やおやつなどに出会えるワンちゃん専門店ショッピングでわいわいショッピングを楽しみます。',
    recommendation: {
      stay: 'プライベートガーデン付コテージ',
      eat: '完全個室型ペットフレンドリーレストラン',
      enjoy: '風景の美しい並木散歩・ワンちゃんショッピング'
    }
  },
  'hakoiri_private': {
    number: 8,
    id: 'hakoiri_private',
    title: '箱入りちゃんと、まったり旅',
    characterName: '箱入りちゃん',
    travelStyle: 'まったり旅',
    description: '何より飼い主様のぬくもりが大好きな「箱入りちゃん」と完全に静寂な時を過ごすプライベートまったり旅。静かなプライベートロッジを貸し切り、お食事は完全個室のお部屋または静粛な個室型ブースにて。鳥のさえずりが聞こえるだけの閑静な風景の散歩道をゆったり歩き、素敵なお土産のためのショッピングをおこなって二人きりの大切な絆を深めます。',
    recommendation: {
      stay: '水辺・森のマイナスイオン貸切ロッジ',
      eat: '特製個室ブース御膳',
      enjoy: '癒やしの遊歩道散策・プライベートお買い物'
    }
  },
};

// Extremely realistic and thematic area facility datasets targeting Hokkaido, Kanto, Kansai etc!
export const AREA_FACILITIES: Record<TravelArea, {
  stay: Omit<Facility, 'nearbyFacilities'>[];
  eat: Omit<Facility, 'nearbyFacilities'>[];
  enjoy: Omit<Facility, 'nearbyFacilities'>[];
}> = {
  '北海道': {
    stay: [
      { id: 'hk_stay_1', name: '十勝トマム フォレストドッグロッジ', type: 'ロッジ / コテージ', description: '広大な白樺の森に囲まれた、他のお客様と離れたプライベートロッジ。大型犬ものびのび滞在できます。', image: 'https://picsum.photos/seed/hokkaido_lodge/600/400', rating: 4.8, highlight: '専用ドッグウッドデッキ完備' },
      { id: 'hk_stay_2', name: '阿寒レイクサイドビューリゾートホテル・カムイ', type: 'リゾートホテル', description: '湖畔の澄んだ空気を味わう、ワンちゃん専用客室完備のリゾートホテル。アメニティも充実。', image: 'https://picsum.photos/seed/hokkaido_hotel/600/400', rating: 4.7, highlight: '天然掛け流し愛犬スパあり' }
    ],
    eat: [
      { id: 'hk_eat_1', name: '札幌ノースファーム バーベキューテラス', type: 'BBQ / レストラン屋外席', description: '新鮮な十勝産食材や北海道和牛を、愛犬と一緒に大自然のウッドデッキで味わう特別BBQプラン。', image: 'https://picsum.photos/seed/hokkaido_bbq/600/400', rating: 4.6, highlight: 'ペット専用ヘルシー角切りラム肉付き' },
      { id: 'hk_eat_2', name: '小樽運河ドッグカフェ・ル・シュマン', type: '個室型カフェ / 部屋食', description: 'レトロなレンガ造りの個室空間。地産の魚介やエゾ鹿肉を使用した、ワンちゃん専用フレンチをご提供。', image: 'https://picsum.photos/seed/hokkaido_cafe/600/400', rating: 4.5, highlight: 'エゾシカの無添加テリーヌが人気' }
    ],
    enjoy: [
      { id: 'hk_enjoy_1', name: '洞爺湖カヌー＆SUPアドベンチャー', type: 'マリンスポーツ', description: '日本屈指の透明度を誇る洞爺湖で、インストラクターのサポート付きでSUP体験。大型犬用ライフジャケット完備。', image: 'https://picsum.photos/seed/hokkaido_sport/600/400', rating: 4.9, highlight: '専属カメラマンによる水上写真付き' },
      { id: 'hk_enjoy_2', name: '富良野ラベンダーヒル・パノラマ遊歩道', type: '散歩道 / 写真撮影', description: 'どこまでも続くラベンダー畑を見下ろす快適な遊歩道。風景が美しく、おとなしいワンちゃんとの散策に最適です。', image: 'https://picsum.photos/seed/hokkaido_walk/600/400', rating: 4.7, highlight: 'ベストフォトスポットマップ配布中' }
    ]
  },
  '東北': {
    stay: [
      { id: 'th_stay_1', name: '裏磐梯グランデコ ドッグフレンドリーペンション', type: 'ペンション', description: '福島県の美しい高原地帯。愛犬家に大人気のぬくもりある本格薪ストーブ付きペンション。', image: 'https://picsum.photos/seed/tohoku_pension/600/400', rating: 4.7, highlight: 'ドッグラン直結の専用出入口' },
      { id: 'th_stay_2', name: '十和田湖畔リゾート ログハウス・グリーンベル', type: 'ロッジ / ログコテージ', description: '青森の奥入瀬にほど近い。全面秋田杉で建てられたプライベートな静かで豪華な大型ログ。', image: 'https://picsum.photos/seed/tohoku_lodge/600/400', rating: 4.6, highlight: '薪暖炉と贅沢プライベートテラス' }
    ],
    eat: [
      { id: 'th_eat_1', name: '磐梯高原カフェ・森のテラス', type: 'レストラン屋外テラス', description: '心地よい風が通り抜けるテラス席。ワンちゃんの手作り無塩クッキーや絶品地ビールが人気。', image: 'https://picsum.photos/seed/tohoku_cafe/600/400', rating: 4.5, highlight: '愛犬用山塩ポークチャップスパゲッティ' },
      { id: 'th_eat_2', name: '米沢ドッグ割烹・さくら草', type: '完全個室型和食店', description: '完全遮音の個室。伝統の米沢牛しゃぶしゃぶを家族とワンちゃんだけでゆったり静かに堪能。', image: 'https://picsum.photos/seed/tohoku_wafood/600/400', rating: 4.8, highlight: '米沢牛すじ肉のワンちゃん専用煮込み' }
    ],
    enjoy: [
      { id: 'th_enjoy_1', name: '田沢湖ペットSUP＆レイクアクティビティ', type: 'ウォータースポーツ / マリンスポーツ', description: 'エメラルドグリーンの湖面。水温が心地よく、他犬と楽しむSUPカヌーに挑戦できます。', image: 'https://picsum.photos/seed/tohoku_sup/600/400', rating: 4.8, highlight: '初めてのワンちゃん用浮き輪無料レンタル' },
      { id: 'th_enjoy_2', name: 'みちのく杜の湖畔公園 わくわく大型ドッグラン', type: 'ドッグラン / 写真撮影', description: '東北最大級の全面オーバーシード芝。お友達と追いかけっこしたり、アジリティ遊具がズラリ。', image: 'https://picsum.photos/seed/tohoku_run/600/400', rating: 4.7, highlight: '20種類以上のアジリティ完備' }
    ]
  },
  '北陸': {
    stay: [
      { id: 'hr_stay_1', name: '富山立山アルペンコート・コテージ', type: 'ロッジ', description: '立山の湧水が流れる森の中、完全にプライベートなロッジで贅沢に過ごす家族の時間。', image: 'https://picsum.photos/seed/hokuriku_lodge/600/400', rating: 4.6, highlight: '芝生の専用お庭が30坪' },
      { id: 'hr_stay_2', name: '能登九十九湾 ペットヒーリングホテル・シーブリーズ', type: 'ホテル', description: '海の見える美しい九十九湾。ワンちゃん用ドッグプールやプロのペット整体エステを完備。', image: 'https://picsum.photos/seed/hokuriku_hotel/600/400', rating: 4.8, highlight: 'プロエステティシャン常駐' }
    ],
    eat: [
      { id: 'hr_eat_1', name: '金沢茶屋街ペット料亭・うさぎ庵', type: '個室型日本料理', description: '金沢の古民家を改築した料亭の離れ個室。美しい器で供される加賀野菜の特製愛犬用会席。', image: 'https://picsum.photos/seed/hokuriku_ryotei/600/400', rating: 4.7, highlight: '能登地鶏の極旨テリーヌ金箔のせ' },
      { id: 'hr_eat_2', name: '海鮮グリル・浜風テラス', type: 'BBQ / レストラン屋外席', description: '日本海の絶品ホタテや紅ズワイガニを、愛犬と共に堪能できる風通しの良い海岸デッキ。', image: 'https://picsum.photos/seed/hokuriku_seafood/600/400', rating: 4.5, highlight: 'ワンちゃん向け塩分オフ蒸し魚' }
    ],
    enjoy: [
      { id: 'hr_enjoy_1', name: '輪島オーシャンビュードッグラン・なぎさ', type: '大型ドッグラン / 散歩', description: '目の前一面が日本海！潮風を全身に浴びてアクティブに。日本海に沈む極上の夕日フォト。', image: 'https://picsum.photos/seed/hokuriku_run/600/400', rating: 4.7, highlight: '絶景夕日シャッターサービスあり' },
      { id: 'hr_enjoy_2', name: '山中温泉ペット渓谷リラクゼーション', type: '温泉スパスパ / マッサージ', description: '伝統の温泉街。ワンちゃん用加賀温泉水足湯やハーブオイルを使用したプロのマッサージ。', image: 'https://picsum.photos/seed/hokuriku_spa/600/400', rating: 4.9, highlight: '加賀温泉特撰クレイ温泉パック' }
    ]
  },
  '関東': {
    stay: [
      { id: 'kt_stay_1', name: '那須高原ドッグロッジ・ヴィラフォレスト', type: '貸切ロッジ・ヴィラ', description: 'プライベートサウナや広大な天然芝のお庭が付いた那須高原の最高級ドッグヴィラ。誰にも気兼ねせず楽しめます。', image: 'https://picsum.photos/seed/kanto_lodge/600/400', rating: 4.9, highlight: 'ドッグ専用天然温泉ジャグジー完備' },
      { id: 'kt_stay_2', name: 'ルシアン旧軽井沢', type: 'ワンちゃん専用ホテル', description: '軽井沢の一等地にある最高峰のドッグフレンドリーホテル。贅沢なドッグアメニティや共用設備が揃っています。', image: 'https://picsum.photos/seed/kanto_hotel/600/400', rating: 4.8, highlight: 'フランス老舗調香ハーブバス' }
    ],
    eat: [
      { id: 'kt_eat_1', name: '湘南シーサイドBBQデッキ・BLUE OCEAN', type: 'プライベートバーベキュー', description: '江の島を正面に臨むテラスでのプライベートBBQ。大型犬OK。本格アメリカングリルをご用意。', image: 'https://picsum.photos/seed/kanto_bbq/600/400', rating: 4.7, highlight: '特撰和牛赤身ロース犬用ステーキ' },
      { id: 'kt_eat_2', name: 'リストランテ・ラ・ドッガ那須', type: '愛犬同伴ラグジュアリーレストラン', description: '那須の別荘地に佇むイタリアン。テーブルのすぐ脇に愛犬用の贅沢なふかふかベッドを常設。', image: 'https://picsum.photos/seed/kanto_restaurant/600/400', rating: 4.6, highlight: 'わんちゃん専用特製お肉のコース' }
    ],
    enjoy: [
      { id: 'kt_enjoy_1', name: '葉山マリーナ・愛犬と行くSUP＆カヤック体験', type: 'マリンスポーツ', description: '波が静かな葉山の海で愛犬と水上体験。アットホームで丁寧なサポートで初心者も安心。', image: 'https://picsum.photos/seed/kanto_sport/600/400', rating: 4.8, highlight: 'インストラクターによるGoProドローン撮影付き' },
      { id: 'kt_enjoy_2', name: '那須森のクラフトギャラリー・愛犬アトリエ', type: '体験型フォト・記念製作', description: '愛犬の写真を使って本革製の迷子札やオリジナルの食器・陶芸をお手軽ワークショップで製作。', image: 'https://picsum.photos/seed/kanto_craft/600/400', rating: 4.7, highlight: '無垢本革ネームタグ当日持ち帰り可' }
    ]
  },
  '中部': {
    stay: [
      { id: 'cb_stay_1', name: '伊豆高原ペットペンション・クイール', type: 'ドッグ同伴専門ペンション', description: 'ドッグアジリティと豊富な愛犬用おもちゃ、お客様同士のペット談義が弾むおもてなしのペンション。', image: 'https://picsum.photos/seed/chubu_pension/600/400', rating: 4.8, highlight: '24時間利用可能の内温泉' },
      { id: 'cb_stay_2', name: '八ヶ岳清里 グランピング・フォレストテラス', type: '大自然グランピング', description: '北欧製大型デラックスドーム。ウッドデッキには専用薪暖炉と、星空を眺める開放サウナ付き。', image: 'https://picsum.photos/seed/chubu_glamping/600/400', rating: 4.9, highlight: '星空が見える天窓ドーム客室' }
    ],
    eat: [
      { id: 'cb_eat_1', name: '伊豆オーガニックテラス・ラフォーレ', type: 'レストラン屋外テラス', description: '全面ドッグウェルカム仕様。有機無農薬のお野菜と自家製のパン、ワンちゃん用スープバーが自慢。', image: 'https://picsum.photos/seed/chubu_cafe/600/400', rating: 4.6, highlight: '手作りチキンビーツポタージュ' },
      { id: 'cb_eat_2', name: '伊勢志摩マリーナ・潮風グリル', type: 'バーベキュー屋外席', description: '伊勢志摩の爽快な夕焼けを見ながら、松阪牛や獲れたて伊勢海老のプライベートな豪華バーベキュー。', image: 'https://picsum.photos/seed/chubu_bbq/600/400', rating: 4.7, highlight: '伊勢鶏のささみグリルと旬の温野菜' }
    ],
    enjoy: [
      { id: 'cb_enjoy_1', name: '伊豆マリーナ愛犬SUPアドベンチャー', type: 'マリンスポーツ', description: '透き通る伊豆高原の海。穏やかで流れが安全な浅瀬・専用ポイントから、爽やかにスタート！', image: 'https://picsum.photos/seed/chubu_ocean/600/400', rating: 4.8, highlight: 'フルレンタルライフジャケット付き' },
      { id: 'cb_enjoy_2', name: '山中湖パノラマ・富士山ビュー散歩道', type: '写真撮影 / 癒やしの散歩', description: '目の前に雄大な富士山が広がる人気の山中湖畔芝生公園コース。平坦で安全で、美しい写真がいっぱい撮れます。', image: 'https://picsum.photos/seed/chubu_walk/600/400', rating: 4.9, highlight: '富士山バック専用アクリルフレーム設置中' }
    ]
  },
  '関西': {
    stay: [
      { id: 'ks_stay_1', name: '淡路島ドッグヴィラ・碧（あお）', type: '貸切ロッジ・ヴィラ', description: '播磨灘に沈む極上の夕日。愛犬のための50坪の芝生ドッグランと温水対応屋外プールを備えた豪華ロッジ。', image: 'https://picsum.photos/seed/kansai_lodge/600/400', rating: 4.9, highlight: 'プライベート海側ドッグプール' },
      { id: 'ks_stay_2', name: 'コートヤード滋賀琵琶湖・愛犬リゾート店', type: 'ワンちゃん専用ホテル', description: '琵琶湖を一望する素晴らしいドッグスイート。全室愛犬用のひのき天然ウッドテラスを完備。', image: 'https://picsum.photos/seed/kansai_hotel/600/400', rating: 4.8, highlight: '天然掛け流し愛犬リハビリ温泉' }
    ],
    eat: [
      { id: 'ks_eat_1', name: '舞洲バーベキューパーク・ペット特区店', type: 'プライベートバーベキュー', description: '大阪。24,000㎡もの広大な芝生にドッグ特設BBQコテージが点在。みんなで美味いわいわい楽しめます。', image: 'https://picsum.photos/seed/kansai_bbq/600/400', rating: 4.7, highlight: 'わんこ用焼き鳥（塩分完全不使用）' },
      { id: 'ks_eat_2', name: '神戸北野ペットダイニング・アルトウル', type: '愛犬同伴ラグジュアリーレストラン', description: '神戸のおしゃれな西洋異人館に佇む有名フレンチ。愛犬用には特注の椅子やマナーベルトも完備。', image: 'https://picsum.photos/seed/kansai_dining/600/400', rating: 4.7, highlight: '丹波但馬鶏の贅沢フレンチコース' }
    ],
    enjoy: [
      { id: 'ks_enjoy_1', name: 'びわ湖・じゃのひれSUPアドベンチャー', type: 'マリンスポーツ', description: '波の影響が少なく、わんこ慣れしたスタッフが「海（湖）あそび」をサポート！初めてでも立ちやすい。', image: 'https://storage.googleapis.com/applet-assets/bruwkjqdsva72ciocnumgt/asset-1744103434629.png', rating: 4.9, highlight: '全員わんこ好きスタッフ常駐' },
      { id: 'ks_enjoy_2', name: '京都宇治・風薫る茶畑散歩路', type: '散歩道', description: '美しい緑。新緑の香りが立ち込める静かでゆるやかなお散歩コース。記念の写真撮影にベスト。', image: 'https://picsum.photos/seed/kansai_walk/600/400', rating: 4.6, highlight: '老舗宇治茶ブランドのペット用おやつ販売' }
    ]
  },
  '中国': {
    stay: [
      { id: 'cg_stay_1', name: '蒜山高原プチホテル・ひまわり', type: 'ドッグ同伴専門ペンション', description: '岡山の緑の高原。1年中美しい芝。アットホームで、全国の愛犬家がリピートするお肉のおいしいペンション。', image: 'https://picsum.photos/seed/chugoku_hotel/600/400', rating: 4.7, highlight: 'ドッグセラピストによる無料相談' },
      { id: 'cg_stay_2', name: '尾道しまなみコテージ・サウスアイランド', type: '貸切ロッジ', description: 'しまなみ海道。まるで島を独り占めしたような感覚。夕日が窓から差し込む美しい海風コテージ。', image: 'https://picsum.photos/seed/chugoku_lodge/600/400', rating: 4.6, highlight: '海までお散歩1分、広々デッキ' }
    ],
    eat: [
      { id: 'cg_eat_1', name: 'しまなみテラス・オーシャンカフェ', type: 'レストラン屋外テラス', description: '潮風が通り抜ける抜群のロケーション。ワンちゃん用の有機国産大麦ビスケットが絶品です。', image: 'https://picsum.photos/seed/chugoku_cafe/600/400', rating: 4.6, highlight: '真鯛の昆布だし和風ポトフ' },
      { id: 'cg_eat_2', name: '倉敷美観地区・個室茶房・織り姫', type: '完全個室型レストラン', description: '伝統の街並み。アンティーク家具が並ぶプライベート完全個室。特製有機野菜と和牛の贅沢会席。', image: 'https://picsum.photos/seed/chugoku_room/600/400', rating: 4.8, highlight: '愛犬用・国産ささみの手ごねつくね' }
    ],
    enjoy: [
      { id: 'cg_enjoy_1', name: 'しまなみ海道ペットSUP体験・アクアベース', type: 'マリンスポーツ', description: '透明度が高い瀬戸内海での極上カヤック・SUP。潮風に乗り、心地よい時間を他のわんこと体験！', image: 'https://picsum.photos/seed/chugoku_sup/600/400', rating: 4.8, highlight: 'GoProプロテクト防水写真つき' },
      { id: 'cg_enjoy_2', name: '鳥取砂丘・どこまでも続く砂のアート散歩', type: '癒やしの散歩 / 写真撮影', description: 'まるで別世界。サラサラの細かな風が吹く広大な砂丘でお散歩＆奇跡のアニバーサリー絶景写真。', image: 'https://picsum.photos/seed/chugoku_dune/600/400', rating: 4.9, highlight: '砂丘ガイド犬用ペット靴無料貸出' }
    ]
  },
  '四国': {
    stay: [
      { id: 'sk_stay_1', name: '南阿波アウトリゾート・愛犬ヴィラ', type: '貸切ロッジ・ヴィラ', description: '徳島県。太平洋の絶景がウッドデッキから広がる、完全貸切ドッグラン付きの豪快コテージ。', image: 'https://picsum.photos/seed/shikoku_lodge/600/400', rating: 4.8, highlight: '目の前はほぼ貸切のプライベートビーチ' },
      { id: 'sk_stay_2', name: '道後温泉ペット御宿・八雲閣', type: 'ワンちゃん専用ホテル', description: '愛媛の伝統の温泉。愛犬用のひのき檜風呂が自慢の贅沢な和室宿。仲居さんも全員犬好き。', image: 'https://picsum.photos/seed/shikoku_hotel/600/400', rating: 4.7, highlight: '温泉水配合のオリジナル肉球ワックス' }
    ],
    eat: [
      { id: 'sk_eat_1', name: '香川サヌキドッグバーベキュー・グリーン', type: 'プライベートバーベキュー', description: '讃岐オリーブ牛やオリーブ豚の贅沢なセット。自然豊かなオリーブの木陰に設置されたBBQ専用棟。', image: 'https://picsum.photos/seed/shikoku_bbq/600/400', rating: 4.6, highlight: 'オリーブ鶏ささみの網焼きおやつ' },
      { id: 'sk_eat_2', name: '四万十川ビュー和風ドッグカフェ・せせらぎ', type: '完全個室型レストラン', description: '雄大な四万十川の流れをのぞむ個室。川魚の甘露煮や地産和牛をワンちゃん用の出汁とともに。', image: 'https://picsum.photos/seed/shikoku_river/600/400', rating: 4.5, highlight: '天然鮎の中骨抜きほぐし身粥' }
    ],
    enjoy: [
      { id: 'sk_enjoy_1', name: '四万十川カヌー・リバーSUPアドベンチャー', type: 'マリンスポーツ', description: '日本最後の清流と言われる四万十川。流れが極めて穏やかなエリアで、愛犬と癒やしの水上散歩。', image: 'https://picsum.photos/seed/shikoku_sport/600/400', rating: 4.9, highlight: '沈下橋バックのプロ撮影写真付き' },
      { id: 'sk_enjoy_2', name: '小豆島オリーブ公園遊歩道・風車めぐり', type: '癒やしの散歩 / 写真撮影', description: '白いギリシャ風シャトーと風車。どこを切り取っても可愛い写真になる、高台のオリーブ散歩道。', image: 'https://picsum.photos/seed/shikoku_olive/600/400', rating: 4.7, highlight: '魔法のほうき風撮影小道具レンタル中' }
    ]
  },
  '九州': {
    stay: [
      { id: 'ky_stay_1', name: '湯布院ドッグコテージ・由布の憩い', type: '貸切ロッジ', description: '由布岳をのぞむ極上の美しさ。ワンちゃん専用の完全源泉掛け流し足湯温泉を全部屋のお庭に設備。', image: 'https://picsum.photos/seed/kyushu_lodge/600/400', rating: 4.9, highlight: 'お部屋ごとの愛犬専用露天温泉' },
      { id: 'ky_stay_2', name: '霧島ドッグスパ＆リゾートホテル', type: 'ワンちゃん専用ホテル', description: '鹿児島の霧島火山帯。ペットのリハビリ温水プールや、充実したトリミングエステサービスあり。', image: 'https://picsum.photos/seed/kyushu_hotel/600/400', rating: 4.8, highlight: 'ドッグヨガ・アロママッサージレッスン' }
    ],
    eat: [
      { id: 'ky_eat_1', name: '阿蘇ベジタブルガーデンBBQ', type: 'プライベートバーベキュー', description: '阿蘇の大絶景パノラマを背景に。あか牛と、甘み豊かな新鮮な阿蘇高原野菜を愛犬のそばで。', image: 'https://picsum.photos/seed/kyushu_bbq/600/400', rating: 4.7, highlight: 'あか牛ハツと低温ローストチキン丼' },
      { id: 'ky_eat_2', name: '博多中洲川端ペット割烹・千寿', type: '完全個室型レストラン', description: '完全防音で安心の個室炭火網焼き。じっくり焼いた名物みつせ鶏を、ワンちゃんと楽しむ特別な個室。', image: 'https://picsum.photos/seed/kyushu_restaurant/600/400', rating: 4.8, highlight: 'みつせ鶏むね肉のやわらかスープ煮' }
    ],
    enjoy: [
      { id: 'ky_enjoy_1', name: '久住高原360度大パノラマドッグラン', type: '大型ドッグラン / 写真撮影', description: '標高850m！澄み切った遮るもののない大パノラマ。他犬たちと思い切り駆け抜ける天空アジリティ。', image: 'https://picsum.photos/seed/kyushu_run/600/400', rating: 4.8, highlight: '雄大な青空パノラマの空中ダッシュ写真' },
      { id: 'ky_enjoy_2', name: '糸島オーシャンビューSUPスクール・ビーチドッグ', type: 'マリンスポーツ', description: '福岡・糸島の透き通る美しい海岸線。ワンちゃんをSUPの先頭に乗せて心地よくドッグサーフィン体験！', image: 'https://picsum.photos/seed/kyushu_sport/600/400', rating: 4.9, highlight: '愛犬用フルサーフボード＆GoPro搭載' }
    ]
  },
  '沖縄': {
    stay: [
      { id: 'ok_stay_1', name: '宮古島サンセットヴィラ・うりずん', type: '貸切ロッジ・ヴィラ', description: '誰にも遮られないエメラルドブルーのオーシャンフロントヴィラ。プライベート砂浜とプライベートドッグラン付き。', image: 'https://picsum.photos/seed/okinawa_lodge/600/400', rating: 4.9, highlight: '完全にプライベートなサンゴ砂のお庭' },
      { id: 'ok_stay_2', name: '恩納リゾートペットホテル・カリー', type: 'コンドミニアム / ホテル', description: '沖縄・恩納村のドッグラビングな高級リゾート。愛犬向けのドッグエステ・海水パックを常設。', image: 'https://picsum.photos/seed/okinawa_hotel/600/400', rating: 4.8, highlight: '沖縄産海泥クレイ愛犬エッタスパ' }
    ],
    eat: [
      { id: 'ok_eat_1', name: '読谷村やちむんオーシャングリルBBQ', type: 'バーベキュー屋外席', description: '琉球アグー豚や島野菜の串網焼き。綺麗な波音BGMを聞きながらウッドデッキでプライベートなBBQタイム。', image: 'https://picsum.photos/seed/okinawa_bbq/600/400', rating: 4.7, highlight: 'じっくり蒸したアグー豚の甘切りおやつ' },
      { id: 'ok_eat_2', name: '那覇フレンチ古民家ドッグ・あかばなー', type: '完全個室型レストラン', description: '首里。築80年の赤瓦民家での個室フレンチ。愛犬用には島豚スープや、宮古島産紅芋タルトを。', image: 'https://picsum.photos/seed/okinawa_restaurant/600/400', rating: 4.6, highlight: '宮古島ピュア紅芋のとろけるプリン' }
    ],
    enjoy: [
      { id: 'ok_enjoy_1', name: '真栄田岬・愛犬と行く青の洞窟ペットSUP', type: 'マリンスポーツ', description: '輝くエメラルドグリーンの沖縄を体験。実績豊富なドッグダイバーがおうちの愛犬のSUP海デビューをサポート。', image: 'https://picsum.photos/seed/okinawa_sport/600/400', rating: 4.9, highlight: '超高画質ドローン空撮ムービー付き' },
      { id: 'ok_enjoy_2', name: '備瀬のフクギ並木・木漏れ日の森林お散歩道', type: '癒やしの散歩 / 写真撮影', description: '数百年のフクギが影を落とす、南国の風がそよそよ吹く静かで神秘的な並木道。おとなしい犬も大喜び。', image: 'https://picsum.photos/seed/okinawa_walk/600/400', rating: 4.8, highlight: '牛車と一緒のレトロ記念写真ブースあり' }
    ]
  }
};

// Generates incredibly authentic list of 5-8 nearby facilities within selected Area for the clicked facility to fullfill the "〇km圏内の他施設をリスト表記する" feature!
export function getNearbyFacilities(area: TravelArea, category: '泊まる' | '食べる' | '遊ぶ', originalName: string): NearbyFacility[] {
  const genericNearby: Record<'泊まる' | '食べる' | '遊ぶ', { name: string; description: string }[]> = {
    '泊まる': [
      { name: 'ドッグリゾート・ヒルサイドテラス', description: '敷地内ウッドチップドッグラン、清潔な愛犬専用シャンプールーム完備の近隣高評価宿。' },
      { name: 'ペットコテージ・フォレストガーデン', description: '完全戸建てタイプで２階建て。お庭が10坪のウッドアジリティ付。' },
      { name: 'ホテル愛犬ドリームビュー', description: '愛犬と一緒に温泉に浸かれる（仕切りあり）ユニークな湯処が自慢の人気宿。' },
      { name: 'ワンワンの宿・つつじ荘', description: 'ペット栄養管理士が考案の旬の和テイスト素材御膳が飼い主にも犬にも大満足。' }
    ],
    '食べる': [
      { name: 'マザーテラス ドッグカフェ＆スイーツ', description: 'わんこ専用の米粉パンケーキや、有機カモミールハーブティーが評判のオーガニックカフェ。' },
      { name: '肉バル・DOG STARS', description: '国産鶏ささみのグリルや、低温調理した極上の牛ハツ肉（塩不使用）など本格肉バル。' },
      { name: '和みドッグ茶房・一休', description: '和テイストの畳で愛犬とお茶が飲めるカフェ。人気の特選きなこ葛餅ドッグ風。' },
      { name: '海のテラス・波乗りわんわん', description: '素晴らしいロケーション。ペット乗せカートも無料貸し出ししてくれる洋風食堂。' }
    ],
    '遊ぶ': [
      { name: 'ペットスパ＆マッサージ・アビアン', description: '泥炭を使ったパックや、セラピストによるマッサージを行ってくれる本格スパ。' },
      { name: 'オーシャンドッグプール＆芝グラウンド', description: '中・大型犬も全力でスイミングできる、冷えた湧水流れる本格ドッグ専用プール。' },
      { name: '愛犬記念陶芸＆手作りレザー工房', description: 'ワンちゃんの足跡を粘土プレートにスタンプ、オリジナル迷子札のクラフト体験が人気。' },
      { name: '森のなだらかな愛犬専用遊歩道', description: 'アップダウンが非常に少なく、肉球に優しい柔らかい土で整備された快適トレイリング。' }
    ]
  };

  // Build random-ish or semi-deterministic nearby locations using distance
  const pool = genericNearby[category];
  const list: NearbyFacility[] = [];
  const distances = ['0.8km', '1.4km', '2.1km', '3.5km', '4.2km'];
  
  pool.forEach((item, index) => {
    // Make sure we do not duplicate the current facility name
    if (originalName.includes(item.name) || item.name.includes(originalName)) return;
    list.push({
      name: `${area}${item.name}`,
      category,
      distance: distances[index % distances.length],
      description: item.description
    });
  });

  return list;
}
