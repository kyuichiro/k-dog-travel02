import { 
  Home, 
  MapPin, 
  Sparkles, 
  Inbox, 
  Compass, 
  Info,
  Sliders,
  CalendarDays,
  Dog,
  Ticket,
  ChevronRight,
  BookOpenCheck
} from 'lucide-react';
import { TravelArea } from '../types';

interface LeftSidebarProps {
  step: string;
  setStep: (step: any) => void;
  dogName: string;
  setDogName: (name: string) => void;
  dogBreed: string;
  setDogBreed: (breed: string) => void;
  dogAge: number;
  setDogAge: (age: number) => void;
  selectedArea: TravelArea | null;
  setSelectedArea: (area: TravelArea) => void;
  onOpenModal: (type: 'checklist' | 'etiquette' | 'coupon' | 'ad_laurel' | 'ad_insurance' | 'ad_taxi' | 'ad_food') => void;
  resetAll: () => void;
}

export default function LeftSidebar({
  step,
  setStep,
  dogName,
  setDogName,
  dogBreed,
  setDogBreed,
  dogAge,
  setDogAge,
  selectedArea,
  setSelectedArea,
  onOpenModal,
  resetAll
}: LeftSidebarProps) {
  
  const areas: TravelArea[] = ['北海道', '東北', '北陸', '関東', '中部', '関西', '中国', '四国', '九州', '沖縄'];

  const handleAreaClick = (area: TravelArea) => {
    setSelectedArea(area);
    // If we haven't started diagnostic, default other values so they can see results,
    // or if they are in the diagnostic, let them jump to result!
    if (step === 'home' || step.startsWith('q')) {
      setStep('result');
    }
  };

  return (
    <aside className="w-full lg:w-[280px] space-y-6 lg:shrink-0" id="portal-left-sidebar">
      
      {/* Brand Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-spa-primary rounded-xl flex items-center justify-center text-white">
            <Dog size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-spa-primary block">Portal System</span>
            <h3 className="font-extrabold font-sans text-base text-gray-800 leading-tight">愛犬トラベルカルテ</h3>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
          近鉄不動産がお届けする、すべての愛犬家とワンちゃんのためのプレミアム旅行相談ポータルサイト。
        </p>
      </div>

      {/* Dog Info Input dashboard */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h4 className="font-bold text-xs text-spa-primary uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Sliders size={14} />
            愛犬のカルテプロフィール
          </h4>
          <span className="text-[9px] bg-spa-secondary/50 text-spa-primary font-bold px-2 py-0.5 rounded-full uppercase">
            連動中
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">おなまえ（ニックネーム）</label>
            <input 
              type="text"
              value={dogName}
              onChange={(e) => setDogName(e.target.value || 'ワンちゃん')}
              placeholder="ワンちゃん のなまえ"
              className="w-full text-xs font-semibold p-2 rounded-xl bg-spa-secondary/10 border border-spa-secondary/60 text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-spa-primary font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1">犬種</label>
              <input 
                type="text"
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
                placeholder="トイプードル"
                className="w-full text-xs font-semibold p-2 rounded-xl bg-spa-secondary/10 border border-spa-secondary/60 text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-spa-primary font-sans"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1">ねんれい（才）</label>
              <input 
                type="number"
                min="0"
                max="25"
                value={dogAge}
                onChange={(e) => setDogAge(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs font-semibold p-2 rounded-xl bg-spa-secondary/10 border border-spa-secondary/60 text-gray-700 focus:outline-hidden focus:border-spa-primary font-sans"
              />
            </div>
          </div>
        </div>

        <div className="bg-spa-secondary/40 p-3 rounded-2xl flex items-start gap-2 text-[10px] text-gray-500 leading-normal">
          <div className="w-1.5 h-1.5 rounded-full bg-spa-primary mt-1 shrink-0"></div>
          <div>ここで登録したお名前やプロフィールが、診断質問や結果に即座に反映します！</div>
        </div>
      </div>

      {/* Main Portal Site Navigation Menu */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-4">
        <h4 className="font-bold text-xs text-spa-primary uppercase tracking-wider flex items-center gap-1.5 font-sans border-b border-gray-100 pb-3">
          <BookOpenCheck size={14} />
          サイト基本メニュー
        </h4>
        <nav className="flex flex-col gap-1.5">
          <button 
            onClick={resetAll}
            className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-between transition-all pointer-events-auto ${step === 'home' ? 'bg-spa-primary text-white shadow-sm shadow-spa-primary/20' : 'text-gray-600 hover:bg-spa-secondary/40'}`}
          >
            <span className="flex items-center gap-2">
              <Home size={15} />
              ポータルホーム
            </span>
            <ChevronRight size={12} className={step === 'home' ? 'text-white' : 'text-gray-400'} />
          </button>

          <button 
            onClick={() => { if (step === 'home') setStep('q1'); }}
            className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold font-sans flex items-center justify-between transition-all pointer-events-auto ${step !== 'home' ? 'bg-spa-primary/10 text-spa-primary' : 'text-gray-600 hover:bg-spa-secondary/40'}`}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={15} />
              カルテ診断を始める / 閲覧
            </span>
            {step !== 'home' && <span className="bg-spa-primary text-white text-[9px] px-1.5 py-0.5 rounded font-black">実施中</span>}
          </button>

          <div className="h-[1px] bg-gray-100 my-2"></div>

          <button 
            onClick={() => onOpenModal('checklist')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-600 hover:bg-spa-secondary/40 font-sans flex items-center justify-between transition-all pointer-events-auto"
          >
            <span className="flex items-center gap-2">
              <Compass size={15} className="text-teal-600" />
              旅行 持ち物チェックリスト
            </span>
            <ChevronRight size={12} className="text-gray-400" />
          </button>

          <button 
            onClick={() => onOpenModal('etiquette')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-600 hover:bg-spa-secondary/40 font-sans flex items-center justify-between transition-all pointer-events-auto"
          >
            <span className="flex items-center gap-2">
              <Info size={15} className="text-emerald-600" />
              車移動・SAマナー集
            </span>
            <ChevronRight size={12} className="text-gray-400" />
          </button>

          <button 
            onClick={() => onOpenModal('coupon')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-600 hover:bg-spa-secondary/40 font-sans flex items-center justify-between transition-all pointer-events-auto"
          >
            <span className="flex items-center gap-2">
              <Ticket size={15} className="text-amber-600 animate-bounce" />
              近鉄ドッグ旅特別割引
            </span>
            <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">10%巻</span>
          </button>
        </nav>
      </div>

      {/* Quick Map Areas Shortcut Nav */}
      <div className="bg-white rounded-3xl p-5 border border-spa-secondary/40 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold text-xs text-spa-primary uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <MapPin size={14} />
            エリア別自動クイック検索
          </h4>
          <p className="text-[10px] text-gray-400 mt-1">選ぶとその地域の特薦宿と〇km圏内リストを一気に閲覧表示します。</p>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {areas.map((ar) => (
            <button
              key={ar}
              onClick={() => handleAreaClick(ar)}
              className={`py-1.5 px-2 text-center rounded-xl text-[11px] font-bold transition-all border pointer-events-auto ${selectedArea === ar ? 'bg-spa-primary text-white border-spa-primary shadow-xs' : 'bg-gray-50 border-gray-100 hover:bg-spa-secondary/30 text-gray-700'}`}
            >
              {ar}
            </button>
          ))}
        </div>
      </div>

      {/* --- 広告枠 (PR) 2枠 --- */}
      <div className="space-y-4 pt-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-center">- PARTNER LYNX (PR) -</span>
        
        {/* Ad 1: Laurel Coat */}
        <div 
          onClick={() => onOpenModal('ad_laurel')}
          className="bg-gradient-to-br from-[#fcfaf5] to-[#f7f3e8] rounded-2xl p-4 border border-spa-gold/30 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer text-left pointer-events-auto"
        >
          <span className="absolute top-2 right-2 bg-amber-500/10 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            特別提携PR
          </span>
          <div className="pr-12">
            <h5 className="font-bold text-xs text-amber-900 leading-snug group-hover:text-amber-700 transition-colors">
              近鉄のペット共生マンション<br />【ローレルコート for Dog】
            </h5>
            <p className="text-[10px] text-amber-800/85 mt-1.5 leading-relaxed">
              敷地内ドッグラン＆専用足洗い場完備！愛犬の暮らしを中心に設計された次世代プレミアム分譲マンション、先行見学会受付中。
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-amber-200/50">
            <span className="text-[9px] text-amber-600 font-bold">モデルルーム来場で犬用おやつ進呈</span>
            <ChevronRight size={10} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Ad 2: Kintetsu Pet Insurance */}
        <div 
          onClick={() => onOpenModal('ad_insurance')}
          className="bg-gradient-to-br from-[#f4f7fa] to-[#e9f0f5] rounded-2xl p-4 border border-blue-200/40 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer text-left pointer-events-auto"
        >
          <span className="absolute top-2 right-2 bg-blue-500/10 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            提携PR
          </span>
          <div className="pr-12">
            <h5 className="font-bold text-xs text-blue-900 leading-snug group-hover:text-blue-700 transition-colors">
              旅先のケガ・器物破損に備える<br />【近鉄のペットあんしん保険】
            </h5>
            <p className="text-[10px] text-blue-800/85 mt-1.5 leading-relaxed">
              ホテル備品の破損や、旅先トラブルの個人賠償責任を最大1,000万円補償！1日あたり約35円から入れる新感覚ペット専用健康保険。
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-blue-200/50">
            <span className="text-[9px] text-blue-600 font-bold">無料のパンフレット・お見本はこちら</span>
            <ChevronRight size={10} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

    </aside>
  );
}
