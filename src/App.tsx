import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  PawPrint, 
  Home, 
  Utensils, 
  Hotel, 
  Sparkles, 
  Heart, 
  Search, 
  Compass, 
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  TRAVEL_TYPES, 
  DOG_CHARACTER_INFO, 
  AREA_FACILITIES, 
  getNearbyFacilities, 
  DogCharacterType, 
  DogSize, 
  TravelArea, 
  TravelPurpose,
  Facility
} from './types';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import GuideModal from './components/GuideModal';

type Step = 'home' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('home');
  
  // Real-time synced Dog custom profile
  const [dogName, setDogName] = useState<string>('ココア');
  const [dogBreed, setDogBreed] = useState<string>('トイプードル');
  const [dogAge, setDogAge] = useState<number>(3);

  // States of the 5-step diagnostic process
  const [isIntroverted, setIsIntroverted] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [selectedSize, setSelectedSize] = useState<DogSize | null>(null);
  const [selectedArea, setSelectedArea] = useState<TravelArea | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<TravelPurpose | null>(null);

  // States for interactive nearby facility explorer
  const [selectedCategory, setSelectedCategory] = useState<'泊まる' | '食べる' | '遊ぶ' | null>(null);
  const [currentSelectedFacility, setCurrentSelectedFacility] = useState<Facility | null>(null);

  // Modal selector for sidebar menus
  const [activeModal, setActiveModal] = useState<'checklist' | 'etiquette' | 'coupon' | 'ad_laurel' | 'ad_insurance' | 'ad_taxi' | 'ad_food' | null>(null);

  // Derives character based on introversion + activity levels
  const getDogCharacter = (): DogCharacterType => {
    if (isIntroverted) {
      return isActive ? 'uchibenkei' : 'hakoiri';
    } else {
      return isActive ? 'wanpaku' : 'hime_ouji';
    }
  };

  // Maps to the specific travel type identifier
  const getTravelTypeKey = (): string => {
    const character = getDogCharacter();
    const purpose = selectedPurpose || 'private';
    return `${character}_${purpose}`;
  };

  const travelType = TRAVEL_TYPES[getTravelTypeKey()] || TRAVEL_TYPES['uchibenkei_private'];
  const characterInfo = DOG_CHARACTER_INFO[getDogCharacter()];

  const reset = () => {
    setStep('home');
    setIsIntroverted(null);
    setIsActive(null);
    setSelectedSize(null);
    setSelectedArea(null);
    setSelectedPurpose(null);
    setSelectedCategory(null);
    setCurrentSelectedFacility(null);
  };

  const resetAll = () => {
    reset();
    setStep('home');
  };

  // Steps progress helper
  const getProgressPercent = () => {
    switch (step) {
      case 'q1': return 20;
      case 'q2': return 40;
      case 'q3': return 60;
      case 'q4': return 80;
      case 'q5': return 100;
      default: return 0;
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case 'q1': return 1;
      case 'q2': return 2;
      case 'q3': return 3;
      case 'q4': return 4;
      case 'q5': return 5;
      default: return 0;
    }
  };

  // Get current recommendation value based on the PDF mapping
  const getRecommendationValue = (category: '泊まる' | '食べる' | '遊ぶ' | '楽しむ') => {
    if (category === '泊まる') return travelType.recommendation.stay;
    if (category === '食べる') return travelType.recommendation.eat;
    return travelType.recommendation.enjoy;
  };

  // Retrieves matching realistic facilities based on chosen area and category type
  const getAreaFacilitiesForCategory = (category: '泊まる' | '食べる' | '遊ぶ'): Facility[] => {
    const areaData = AREA_FACILITIES[selectedArea || '関西'];
    let arr: any[] = [];
    if (category === '泊まる') arr = areaData.stay;
    else if (category === '食べる') arr = areaData.eat;
    else arr = areaData.enjoy;

    // Map raw facilities with on-the-fly computed nearby ones to respect "〇km圏内リスト"
    return arr.map(f => ({
      ...f,
      nearbyFacilities: getNearbyFacilities(selectedArea || '関西', category, f.name)
    }));
  };

  const handleFacilitySelect = (category: '泊まる' | '食べる' | '遊ぶ', facility: Facility) => {
    setSelectedCategory(category);
    setCurrentSelectedFacility(facility);
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.98, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-spa-secondary/25 via-white to-spa-secondary/15 font-serif">
      
      {/* Universal Page Header */}
      <header className="w-full max-w-7xl mx-auto mb-8 flex flex-col items-center mt-3 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-1.5 bg-spa-primary rounded-xl text-white">
            <PawPrint size={22} className="animate-pulse" />
          </span>
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-spa-primary">
            Kintetsu Real Estate Co., Ltd.
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-spa-primary text-center tracking-tight font-sans">
          近鉄犬旅クラブ 愛犬お出かけポータル
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-mono">
          Comprehensive Dog Travel Portal & Medical History Passport
        </p>
      </header>

      {/* Main Portal Body (3-Column Desktop Layout) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 flex-grow items-start justify-center">
        
        {/* Left Column: Navigation Menus & Profile inputs */}
        <LeftSidebar 
          step={step}
          setStep={(s) => setStep(s)}
          dogName={dogName}
          setDogName={setDogName}
          dogBreed={dogBreed}
          setDogBreed={setDogBreed}
          dogAge={dogAge}
          setDogAge={setDogAge}
          selectedArea={selectedArea}
          setSelectedArea={(a) => {
            setSelectedArea(a);
            // Pre-fill dummy choices to display the diagnostic card if skipped or selected immediately
            if (isIntroverted === null) setIsIntroverted(false);
            if (isActive === null) setIsActive(true);
            if (selectedSize === null) setSelectedSize('small_medium');
            if (selectedPurpose === null) setSelectedPurpose('private');
          }}
          onOpenModal={(type) => setActiveModal(type)}
          resetAll={resetAll}
        />

        {/* Center Column: Core Diagnostic Process Content */}
        <main className="flex-1 w-full flex flex-col justify-start min-w-0" id="portal-center-content">
          <AnimatePresence mode="wait">
            
            {/* STEP: HOME */}
            {step === 'home' && (
              <motion.div
                key="home"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-[32px] p-8 sm:p-11 shadow-xl shadow-spa-primary/5 text-center border border-spa-secondary/40 w-full"
              >
                <div className="w-20 h-20 bg-spa-secondary/60 rounded-full flex items-center justify-center mx-auto mb-6 text-spa-primary">
                  <Compass size={40} className="animate-spin-slow animate-pulse" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight font-sans">
                  おうちの{dogName}ちゃんのトラベル診断
                </h2>
                <div className="h-1.5 w-16 bg-spa-primary mx-auto mb-6 rounded-full" />
                <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base font-medium">
                  うちの{dogName}ちゃんに一番マッチした旅行タイプはどれかな？<br />
                  簡単な「5タップ」のしぐさ・お好み診断で、日本全国おすすめペット歓迎施設 ＆ お出かけ周辺情報を自動で検出。旅のパスポートを作成します。
                </p>
                <button
                  onClick={() => setStep('q1')}
                  className="bg-spa-primary text-white w-full max-w-sm mx-auto py-4 rounded-full text-lg font-bold font-sans hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-spa-primary/35 cursor-pointer pointer-events-auto"
                >
                  診断をはじめよう！ <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* QUESTIONS FLOW CONTAINER */}
            {['q1', 'q2', 'q3', 'q4', 'q5'].includes(step) && (
              <motion.div
                key={step}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xl shadow-spa-primary/5 border border-spa-secondary/40 w-full"
              >
                {/* Progress Bar & Indicators */}
                <div className="mb-6 font-sans">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-spa-primary uppercase tracking-widest">
                      診断質問 {getStepNumber()} / 5 項目
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      診断進捗 {getProgressPercent()}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-spa-primary transition-all duration-300"
                      style={{ width: `${getProgressPercent()}%` }}
                    />
                  </div>
                </div>

                {/* Q1: Shyness (人見知り・犬見知り) */}
                {step === 'q1' && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-snug font-sans">
                      Q1. {dogName}ちゃんは、普段人見知り・犬見知りをしますか？
                    </h3>
                    <div className="space-y-4 font-sans">
                      <button
                        onClick={() => {
                          setIsIntroverted(true);
                          setStep('q2');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-gray-800">する（内向的・おうちタイプ）</span>
                            <span className="text-gray-500 text-xs mt-1 block">プライベートな落ち着いた空間を好み、おうちでまったりするのが安心なタイプ</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setIsIntroverted(false);
                          setStep('q2');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-gray-800">あまりしない（外交的・フレンドリー）</span>
                            <span className="text-gray-500 text-xs mt-1 block">外の世界が大好き！誰とでもすぐに仲良く駆け寄っていける天真爛漫なタイプ</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                    </div>
                    <button
                      onClick={() => setStep('home')}
                      className="mt-8 flex items-center gap-1 text-gray-400 hover:text-spa-primary transition-colors text-xs font-semibold font-sans pointer-events-auto"
                    >
                      <ChevronLeft size={16} /> 最初に戻る
                    </button>
                  </div>
                )}

                {/* Q2: Activity Level (運動好き) */}
                {step === 'q2' && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-snug font-sans">
                      Q2. {dogName}ちゃんは、お外で体を動かすことが大好きですか？
                    </h3>
                    <div className="space-y-4 font-sans">
                      <button
                        onClick={() => {
                          setIsActive(true);
                          setStep('q3');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-gray-800">大好き！（活発・アクティブ派）</span>
                            <span className="text-gray-500 text-xs mt-1 block">おもちゃを追いかけたり、ドッグランを全力疾走・探検するのが大好きな子</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setIsActive(false);
                          setStep('q3');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-gray-800">おとなしい・お座りまったり派</span>
                            <span className="text-gray-500 text-xs mt-1 block">美しい景色をのんびり眺めて歩いたり、そばでゆったり寄り添うのが好きな子</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                    </div>
                    <button
                      onClick={() => setStep('q1')}
                      className="mt-8 flex items-center gap-1 text-gray-400 hover:text-spa-primary transition-colors text-xs font-semibold font-sans pointer-events-auto"
                    >
                      <ChevronLeft size={16} /> 戻る
                    </button>
                  </div>
                )}

                {/* Q3: Size Selection (中小型・大型) */}
                {step === 'q3' && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-snug font-sans">
                      Q3. {dogName}ちゃんのおおよその体長サイズ（大きさ）は？
                    </h3>
                    <div className="grid grid-cols-2 gap-4 font-sans">
                      <button
                        onClick={() => {
                          setSelectedSize('small_medium');
                          setStep('q4');
                        }}
                        className="p-6 text-center border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 flex flex-col items-center pointer-events-auto"
                      >
                        <div className="w-16 h-16 bg-spa-secondary/40 rounded-full flex items-center justify-center text-spa-primary mb-4 group-hover:bg-spa-primary group-hover:text-white transition-all">
                          <PawPrint size={24} />
                        </div>
                        <span className="block font-bold text-gray-800 text-lg">中型・小型犬</span>
                        <span className="text-gray-500 text-xs mt-1">チワワ・プードル・柴犬など</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSize('large');
                          setStep('q4');
                        }}
                        className="p-6 text-center border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 flex flex-col items-center pointer-events-auto"
                      >
                        <div className="w-16 h-16 bg-spa-secondary/40 rounded-full flex items-center justify-center text-spa-primary mb-4 group-hover:bg-spa-primary group-hover:text-white transition-all">
                          <PawPrint size={32} />
                        </div>
                        <span className="block font-bold text-gray-800 text-lg">大型犬</span>
                        <span className="text-gray-500 text-xs mt-1">ラボ・ゴールデン・シェパードなど</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setStep('q2')}
                      className="mt-8 flex items-center gap-1 text-gray-400 hover:text-spa-primary transition-colors text-xs font-semibold font-sans pointer-events-auto"
                    >
                      <ChevronLeft size={16} /> 戻る
                    </button>
                  </div>
                )}

                {/* Q4: Area Selection (旅先エリア) */}
                {step === 'q4' && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 leading-snug font-sans">
                      Q4. 旅行ご計画中の、目的「エリア」はどちらですか？
                    </h3>
                    <p className="text-gray-500 text-xs mb-6 font-sans">
                      近鉄がお勧めする、{dogName}ちゃんの体格等に考慮した推奨エリア施設をピンポイントで照合します。
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
                      {['北海道', '東北', '北陸', '関東', '中部', '関西', '中国', '四国', '九州', '沖縄'].map((ar) => (
                        <button
                          key={ar}
                          onClick={() => {
                            setSelectedArea(ar as TravelArea);
                            setStep('q5');
                          }}
                          className="p-3 text-center border border-gray-100 rounded-xl hover:border-spa-primary hover:bg-spa-secondary/30 text-gray-700 font-bold text-sm transition-all active:scale-97 pointer-events-auto bg-gray-50/50"
                        >
                          {ar}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep('q3')}
                      className="mt-8 flex items-center gap-1 text-gray-400 hover:text-spa-primary transition-colors text-xs font-semibold font-sans pointer-events-auto"
                    >
                      <ChevronLeft size={16} /> 戻る
                    </button>
                  </div>
                )}

                {/* Q5: Travel Purpose (旅の目的) */}
                {step === 'q5' && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-snug font-sans">
                      Q5. 一緒の滞在スタイルはどちらをご希望ですか？
                    </h3>
                    <div className="space-y-4 font-sans">
                      <button
                        onClick={() => {
                          setSelectedPurpose('friends');
                          setStep('result');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-teal-850">
                              友達づくり・にぎやか体験（わいわい旅スタイル）
                            </span>
                            <span className="text-gray-500 text-xs mt-1 block">
                              愛犬家との談話を楽しめる共有ドッグランやオープンテラス、わいわい楽しく触れ合うスタイル
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPurpose('private');
                          setStep('result');
                        }}
                        className="w-full text-left p-5 border-2 border-gray-100 rounded-2xl hover:border-spa-primary hover:bg-spa-secondary/20 transition-all group active:scale-99 pointer-events-auto"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-lg font-bold text-teal-900">
                              完全プライベート貸切（水いらず・まったり旅スタイル）
                            </span>
                            <span className="text-gray-500 text-xs mt-1 block">
                              一戸建貸切ロッジや、他を気にせず絆を深め合えるお部屋食など、極上まったりスタイル
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-spa-primary group-hover:bg-spa-primary/10 flex items-center justify-center text-spa-primary transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </button>
                    </div>
                    <button
                      onClick={() => setStep('q4')}
                      className="mt-8 flex items-center gap-1 text-gray-400 hover:text-spa-primary transition-colors text-xs font-semibold font-sans pointer-events-auto"
                    >
                      <ChevronLeft size={16} /> 戻る
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP: RESULT SCREEN */}
            {step === 'result' && (
              <motion.div
                key="result"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full space-y-6"
              >
                <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xl shadow-spa-primary/5 border border-spa-secondary/40">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-spa-secondary/60 text-spa-primary rounded-full text-xs font-bold tracking-tight mb-2 font-sans">
                        <Sparkles size={12} />
                        {dogName}ちゃんの診断されたカルテ旅タイプ
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-spa-primary leading-tight font-sans">
                        {travelType.number}．{travelType.title.replace('内弁慶ちゃん', dogName + 'ちゃん').replace('ワンパクちゃん', dogName + 'ちゃん').replace('姫・王子ちゃん', dogName + 'ちゃん').replace('箱入りちゃん', dogName + 'ちゃん')}
                      </h2>
                    </div>
                    <div className="flex gap-2 font-sans shrink-0">
                      <span className="bg-spa-primary/10 text-spa-primary text-xs font-bold px-3 py-2 rounded-lg">
                        エリア: {selectedArea || '関西'}
                      </span>
                      <span className="bg-spa-primary text-white text-xs font-bold px-3 py-2 rounded-lg">
                        サイズ: {selectedSize === 'large' ? '大型犬' : '中・小型犬'}
                      </span>
                    </div>
                  </div>

                  {/* Character Profile & Narrative */}
                  <div className="grid md:grid-cols-3 gap-6 mt-6 items-stretch font-sans">
                    <div className="md:col-span-2 bg-gradient-to-r from-emerald-50/55 to-spa-secondary/35 p-6 rounded-2xl flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-spa-primary flex items-center gap-1.5 mb-2">
                          <Heart size={18} className="text-spa-primary fill-spa-primary/20" />
                          愛犬カルテプロファイル： {dogName}ちゃんは 「{characterInfo.name}」
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {characterInfo.description.replaceAll('ワンちゃん', dogName + 'ちゃん').replaceAll('愛犬', dogName + 'ちゃん')}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-emerald-100 text-xs text-gray-500 font-medium">
                        お出かけのおすすめ: {dogName}ちゃん（{dogBreed || 'トイプードル'}・{dogAge}才）の得意な空間やペースを確保し、ストレスを最小限に抑えるのがおすすめです。
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">カルテ旅スタイル</span>
                        <span className="text-2xl font-black text-spa-primary block mb-2">{travelType.travelStyle}</span>
                        <p className="text-gray-500 text-xs leading-normal">
                          あなたの指定した滞在お好み『{selectedPurpose === 'friends' ? '友達作り・賑やか' : 'プライベート完全貸切'}』から導き出した最適な行動プランです。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-600 leading-relaxed bg-emerald-50/10 border-l-4 border-spa-primary p-4 rounded-r-xl font-sans">
                      {travelType.description.replaceAll('ワンちゃん', dogName + 'ちゃん').replaceAll('内弁慶ちゃん', dogName + 'ちゃん').replaceAll('ワンパクちゃん', dogName + 'ちゃん').replaceAll('姫・王子ちゃん', dogName + 'ちゃん').replaceAll('箱入りちゃん', dogName + 'ちゃん')}
                    </p>
                  </div>
                </div>

                {/* Grid representation corresponding to categorized listings */}
                <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xl shadow-spa-primary/5 border border-spa-secondary/40 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-sans">
                      カテゴリー別 自動スポット表示： 【{selectedArea || '関西'}】のおすすめ
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-sans">
                      ご指定のカルテ（{travelType.title}）から{dogName}ちゃんのサイズにマッチした推奨店舗が選抜されました。選択すると、その場所を基準にした「〇km圏内の他施設（類似歓迎店）」が自動的にリスト表記されます。
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 font-sans">
                    {/* Category Card 1: 泊まる (Stay) */}
                    <div 
                      onClick={() => {
                        const list = getAreaFacilitiesForCategory('泊まる');
                        if (list.length > 0) handleFacilitySelect('泊まる', list[0]);
                      }}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedCategory === '泊まる' ? 'border-spa-primary ring-2 ring-spa-primary/10 shadow-md' : 'border-gray-100 hover:border-spa-primary/40 shadow-sm'}`}
                    >
                      <div className="bg-spa-primary text-white p-3 flex justify-between items-center">
                        <span className="font-bold text-xs tracking-widest uppercase flex items-center gap-1.5">
                          <Hotel size={14} /> 泊まる（宿泊）
                        </span>
                        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                          {getRecommendationValue('泊まる')}
                        </span>
                      </div>
                      
                      {getAreaFacilitiesForCategory('泊まる').slice(0, 1).map((facility) => (
                        <div key={facility.id} className="p-4 space-y-3">
                          <div className="h-32 rounded-lg overflow-hidden relative">
                            <img 
                              src={facility.image} 
                              alt={facility.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">★ {facility.rating}</span>
                          </div>
                          <h4 className="font-bold text-sm text-gray-800 leading-tight">{facility.name}</h4>
                          <p className="text-gray-500 text-xs leading-normal line-clamp-2">{facility.description}</p>
                          <div className="bg-spa-secondary/50 p-2 rounded text-[11px] font-bold text-spa-primary flex justify-between items-center group">
                            <span>周辺情報 & 他施設を調べる</span>
                            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Category Card 2: 食べる (Eat) */}
                    <div 
                      onClick={() => {
                        const list = getAreaFacilitiesForCategory('食べる');
                        if (list.length > 0) handleFacilitySelect('食べる', list[0]);
                      }}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedCategory === '食べる' ? 'border-spa-primary ring-2 ring-spa-primary/10 shadow-md' : 'border-gray-100 hover:border-spa-primary/40 shadow-sm'}`}
                    >
                      <div className="bg-emerald-800 text-white p-3 flex justify-between items-center">
                        <span className="font-bold text-xs tracking-widest uppercase flex items-center gap-1.5">
                          <Utensils size={14} /> 食べる（同伴店）
                        </span>
                        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                          {getRecommendationValue('食べる')}
                        </span>
                      </div>
                      
                      {getAreaFacilitiesForCategory('食べる').slice(0, 1).map((facility) => (
                        <div key={facility.id} className="p-4 space-y-3">
                          <div className="h-32 rounded-lg overflow-hidden relative">
                            <img 
                              src={facility.image} 
                              alt={facility.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">★ {facility.rating}</span>
                          </div>
                          <h4 className="font-bold text-sm text-gray-800 leading-tight">{facility.name}</h4>
                          <p className="text-gray-500 text-xs leading-normal line-clamp-2">{facility.description}</p>
                          <div className="bg-spa-secondary/50 p-2 rounded text-[11px] font-bold text-spa-primary flex justify-between items-center group">
                            <span>周辺情報 & 他施設を調べる</span>
                            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Category Card 3: 楽しむ (Enjoy) */}
                    <div 
                      onClick={() => {
                        const list = getAreaFacilitiesForCategory('遊ぶ');
                        if (list.length > 0) handleFacilitySelect('遊ぶ', list[0]);
                      }}
                      className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedCategory === '遊ぶ' ? 'border-spa-primary ring-2 ring-spa-primary/10 shadow-md' : 'border-gray-100 hover:border-spa-primary/40 shadow-sm'}`}
                    >
                      <div className="bg-[#c39e6c] text-white p-3 flex justify-between items-center">
                        <span className="font-bold text-xs tracking-widest uppercase flex items-center gap-1.5">
                          <Compass size={14} /> 遊ぶ・楽しむメニュー
                        </span>
                        <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                          {getRecommendationValue('楽しむ')}
                        </span>
                      </div>
                      
                      {getAreaFacilitiesForCategory('遊ぶ').slice(0, 1).map((facility) => (
                        <div key={facility.id} className="p-4 space-y-3">
                          <div className="h-32 rounded-lg overflow-hidden relative">
                            <img 
                              src={facility.image} 
                              alt={facility.name} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">★ {facility.rating}</span>
                          </div>
                          <h4 className="font-bold text-sm text-gray-800 leading-tight">{facility.name}</h4>
                          <p className="text-gray-500 text-xs leading-normal line-clamp-2">{facility.description}</p>
                          <div className="bg-spa-secondary/50 p-2 rounded text-[11px] font-bold text-spa-primary flex justify-between items-center group">
                            <span>周辺情報 & 他施設を調べる</span>
                            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discovery Section explaining proximity discovery rules */}
                  <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-2 text-xs text-gray-500 leading-normal border border-gray-100 font-sans">
                    <Info size={16} className="text-spa-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-700 block mb-0.5">〇km圏内自動連動システムについて</span>
                      お好きなカテゴリーを選択すると、基準の推薦施設を中心とする〇km圏内（車でのリアルアクセス内）にある、同伴可能な他のスポット（他施設）をマッピングし、すぐ下にアジリティリスト形式で展開します。
                    </div>
                  </div>
                </div>

                {/* DYNAMIC DISCOVERY DRAWER (〇km圏内の他施設をリスト表記) */}
                {selectedCategory && currentSelectedFacility && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-spa-primary/5 rounded-[32px] p-6 sm:p-10 border-2 border-spa-primary/20 space-y-6 font-sans"
                  >
                    <div className="flex justify-between items-center border-b border-spa-primary/10 pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-spa-primary flex items-center gap-1.5 leading-snug">
                          <Search size={18} />
                          【{currentSelectedFacility.name}】周辺の〇km圏内推奨店リスト
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {selectedArea}周辺マッピング：現在地と同エリア内に実在する愛犬同伴対応施設一覧です。
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCategory(null);
                          setCurrentSelectedFacility(null);
                        }}
                        className="text-xs font-bold text-spa-primary bg-white border border-spa-primary/30 hover:bg-spa-secondary/35 px-3 py-1.5 rounded-full transition-all cursor-pointer pointer-events-auto shrink-0"
                      >
                        閉じる
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {currentSelectedFacility.nearbyFacilities.map((nf, index) => (
                        <div key={index} className="bg-white p-4.5 rounded-2xl shadow-xs border border-spa-secondary/40 hover:border-spa-primary transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="inline-block bg-spa-secondary text-spa-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                {nf.category} ✕ {selectedArea}
                              </span>
                              <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                基準宿から {nf.distance}先
                              </span>
                            </div>
                            <h5 className="font-extrabold text-sm text-gray-800 leading-tight mb-2">
                              {nf.name}
                            </h5>
                            <p className="text-gray-500 text-xs leading-normal">
                              {nf.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end text-[11px] font-bold text-spa-primary items-center gap-1 cursor-pointer hover:underline">
                            案内ルートを開く（目安車で約{(parseFloat(nf.distance) * 2.5).toFixed(0)}分） <ArrowRight size={10} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Bottom Actions to Reset flow */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 font-sans">
                  <button
                    onClick={() => setStep('q5')}
                    className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-spa-primary transition-colors py-4 font-bold text-sm bg-white rounded-full border border-gray-100 active:scale-98 cursor-pointer pointer-events-auto"
                  >
                    <ChevronLeft size={20} /> 前の入力へ戻る
                  </button>
                  <button
                    onClick={reset}
                    className="flex-1 flex items-center justify-center gap-2 bg-spa-primary text-white py-4 rounded-full font-bold hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-spa-primary/20 cursor-pointer pointer-events-auto"
                  >
                    <Home size={20} /> 新しい診断カルテを作成する
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Right Column: Recommended Spots & Quick Manners */}
        <RightSidebar 
          dogName={dogName}
          dogBreed={dogBreed}
          dogAge={dogAge}
          selectedArea={selectedArea}
          onOpenModal={(type) => setActiveModal(type)}
        />

      </div>

      {/* GuideModal Overlays */}
      <AnimatePresence>
        {activeModal && (
          <GuideModal 
            type={activeModal}
            onClose={() => setActiveModal(null)}
            dogName={dogName}
          />
        )}
      </AnimatePresence>

      {/* Universal Footer */}
      <footer className="w-full max-w-7xl mx-auto text-center py-6 mt-14 border-t border-gray-100 text-gray-400 font-sans text-xs tracking-widest leading-normal">
        <p>&copy; 2026 近鉄不動産株式会社 ソリューション事業部 ／ わんこおトク旅パートナーズ</p>
        <p className="text-[10px] mt-1 text-gray-300">
          ドッグトラベルカルテ ＆ 周辺他施設探索システム Ver.2026.5.13 (ポータル構築版)
        </p>
      </footer>
    </div>
  );
}
