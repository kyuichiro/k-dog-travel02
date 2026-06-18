import { Star, ShieldAlert, BadgeInfo, Award, ShieldCheck, Heart, PawPrint, ChevronRight } from 'lucide-react';
import { TravelArea } from '../types';

interface RightSidebarProps {
  dogName: string;
  dogBreed: string;
  dogAge: number;
  selectedArea: TravelArea | null;
  onOpenModal: (type: 'checklist' | 'etiquette' | 'coupon' | 'ad_laurel' | 'ad_insurance' | 'ad_taxi' | 'ad_food') => void;
}

export default function RightSidebar({ dogName, dogBreed, dogAge, selectedArea, onOpenModal }: RightSidebarProps) {
  
  // Static gorgeous hot spots
  const featuredSpots = [
    {
      name: '淡路島ドッグヴィラ・碧',
      area: '関西',
      rating: 4.9,
      type: 'ヴィラ / 貸切コテージ',
      image: 'https://picsum.photos/seed/rp_awaji/200/130',
      description: '播磨灘の極上夕日！50坪の占有芝生ドッグラン＆温水プールを完備した超豪華施設。'
    },
    {
      name: '那須森のクラフトギャラリー',
      area: '関東',
      rating: 4.7,
      type: '体験型フォト / ワークショップ',
      image: 'https://picsum.photos/seed/rp_nasu/200/130',
      description: '本革を使用した手作り迷子札作りが当日お持ち帰り可能で大人気。'
    },
    {
      name: '宮古島サンセットヴィラ',
      area: '沖縄',
      rating: 4.9,
      type: 'ビーチフロントヴィラ',
      image: 'https://picsum.photos/seed/rp_miyakojima/200/130',
      description: '専用のサンゴ砂プライベート庭を抜けたら、そのままペットと綺麗な海へ。'
    }
  ];

  return (
    <aside className="w-full lg:w-[280px] space-y-6 lg:shrink-0 text-left shrink-0" id="portal-right-sidebar">
      
      {/* Kintetsu Friendly Dog Pass Card (Digital Pass) */}
      <div className="bg-gradient-to-br from-[#12402b] via-[#1b4d36] to-spa-primary rounded-3xl p-5 shadow-lg text-white space-y-4 border border-spa-gold/20 relative overflow-hidden">
        
        {/* Subtle background paw print decoration */}
        <div className="absolute -bottom-8 -right-8 text-white/5 pointer-events-none">
          <PawPrint size={150} />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9px] bg-white/20 text-white font-black uppercase px-2 py-0.5 rounded-full tracking-widest font-sans">
              Digital Member ID
            </span>
            <h4 className="font-extrabold font-sans text-xs tracking-wider text-spa-secondary mt-1">KINTETSU FRIENDLY DOG</h4>
          </div>
          <Award size={24} className="text-amber-400 animate-pulse shrink-0" />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
            <span className="text-[10px] text-white/70">MEMBER DOG:</span>
            <span className="font-sans font-black tracking-tight">{dogName || 'ワンちゃん'} さま</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-[10px] text-white/80">
            <div>
              <span className="text-[9px] text-white/50 block">BREED / 犬種:</span>
              <span className="font-semibold">{dogBreed || 'トイプードル'}</span>
            </div>
            <div>
              <span className="text-[9px] text-white/50 block">AGE / 年齢:</span>
              <span className="font-semibold font-sans">{dogAge} 歳</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 bg-white rounded-xl p-3 text-gray-800 text-center shadow-md">
          {/* Mock Barcode generated with vertical CSS bars */}
          <div className="h-6 flex justify-center items-stretch gap-0.5 overflow-hidden select-none">
            <div className="w-1 bg-gray-800"></div>
            <div className="w-0.5 bg-gray-800"></div>
            <div className="w-1.5 bg-gray-800"></div>
            <div className="w-0.5 bg-gray-800"></div>
            <div className="w-1 bg-gray-800"></div>
            <div className="w-2 bg-gray-800"></div>
            <div className="w-0.5 bg-gray-800"></div>
            <div className="w-1 bg-gray-800"></div>
            <div className="w-0.5 bg-gray-800"></div>
            <div className="w-1.5 bg-gray-800"></div>
            <div className="w-0.5 bg-gray-800"></div>
            <div className="w-2 bg-gray-800"></div>
            <div className="w-1 bg-gray-800"></div>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-gray-400">CLASS_PASS_202611</p>
        </div>

        <p className="text-[10px] text-white/70 text-center font-medium leading-relaxed pt-1">
          本画面のご提示で、近鉄提携ペットホテル全店舗の宿泊ドッグアメニティ無料特典をプレゼント中。
        </p>
      </div>

      {/* Featured National Popular Spots */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold text-xs text-spa-primary uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            今月の特薦人気ドッグスポット
          </h4>
          <p className="text-[10px] text-gray-400 mt-1">全国の口コミデータから選抜された今月の注目スポット</p>
        </div>

        <div className="space-y-3.5">
          {featuredSpots.map((spot, index) => (
            <div 
              key={index}
              className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-spa-primary/50 transition-all shadow-2xs hover:shadow-xs"
            >
              <div className="h-24 w-full relative">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-black/75 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={9} className="fill-amber-400 text-amber-400" /> {spot.rating}
                </span>
                <span className="absolute bottom-2 right-2 bg-spa-primary text-white text-[9px] font-bold px-2 py-0.5 rounded">
                  {spot.area}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[10px] font-bold text-gray-400 block">{spot.type}</span>
                <h5 className="font-bold text-xs text-gray-800 leading-tight block group-hover:text-spa-primary transition-colors">
                  {spot.name}
                </h5>
                <p className="text-[10px] text-gray-500 leading-relaxed block line-clamp-2">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Dog Travel Etiquette tips */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-3">
        <h4 className="font-bold text-xs text-spa-primary uppercase tracking-wider flex items-center gap-1.5 font-sans border-b border-gray-100 pb-2">
          <ShieldAlert size={14} className="text-red-500" />
          愛犬お出かけマナー３か条
        </h4>
        <ul className="space-y-2.5 text-[11px] text-gray-600 leading-relaxed font-sans">
          <li className="flex gap-2 items-start">
            <span className="text-red-500 font-extrabold shrink-0">①</span>
            <div>
              <strong className="text-gray-800 font-bold block">ワクチンの証明書を常備</strong>
              多くのドッグヴィラや同伴レストランで提出を求められます。常にコピーかスマホ写真を保存して。
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-red-500 font-extrabold shrink-0">②</span>
            <div>
              <strong className="text-gray-800 font-bold block">マナーベルト＆マナーおむつの着用</strong>
              ホテルのロビーや共用施設、お食事のテラス席などではマーキング防止の着用が基本ルールです。
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <span className="text-red-500 font-extrabold shrink-0">③</span>
            <div>
              <strong className="text-gray-800 font-bold block">お散歩時のリード解除はドッグラン限定</strong>
              公共の並木歩道やSA休憩時では、安全のために必ず「リード」パーツを繋いで旅しましょう。
            </div>
          </li>
        </ul>
      </div>

      {/* --- 広告枠 (PR) 2枠 --- */}
      <div className="space-y-4 pt-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center">- COLLABORATION (PR) -</span>

        {/* Ad 3: Petハイヤー */}
        <div 
          onClick={() => onOpenModal('ad_taxi')}
          className="bg-gradient-to-br from-[#f2f6f3] to-[#e6ede8] rounded-2xl p-4 border border-emerald-300/30 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer text-left pointer-events-auto"
        >
          <span className="absolute top-2 right-2 bg-emerald-500/10 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            特別提携PR
          </span>
          <div className="pr-12">
            <h5 className="font-bold text-xs text-emerald-900 leading-snug group-hover:text-emerald-700 transition-colors">
              車をもっていなくても安心！<br />【近鉄ドッグ・フレンドハイヤー】
            </h5>
            <p className="text-[10px] text-emerald-800/85 mt-1.5 leading-relaxed">
              大型犬もケージに入れずに広々同乗可能！除菌・消臭パーテーション完備の愛犬お出かけ専用タクシー。本診断利用で【迎車回送費無料】！
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-emerald-200/40">
            <span className="text-[9px] text-emerald-600 font-bold">簡単オンライン見積り＆空き状況はこちら</span>
            <ChevronRight size={10} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Ad 4: Premium Food */}
        <div 
          onClick={() => onOpenModal('ad_food')}
          className="bg-gradient-to-br from-[#faf4f2] to-[#f4e6e1] rounded-2xl p-4 border border-rose-200/30 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer text-left pointer-events-auto"
        >
          <span className="absolute top-2 right-2 bg-rose-500/10 text-rose-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            提携PR
          </span>
          <div className="pr-12">
            <h5 className="font-bold text-xs text-rose-900 leading-snug group-hover:text-rose-700 transition-colors">
              旅先でのお腹のトラブル対策に<br />【近鉄ワン・メゾン プレミアム】
            </h5>
            <p className="text-[10px] text-rose-800/85 mt-1.5 leading-relaxed">
              環境が変わるお出かけ先でも豊かな食いつきをサポート。獣医師推奨の乳酸菌＆食物繊維高配合国産プレミアム無添加ドッグフード。
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-rose-200/50">
            <span className="text-[9px] text-rose-600 font-bold">先着100名に試供サンプル無料進呈中！</span>
            <ChevronRight size={10} className="text-rose-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

    </aside>
  );
}
