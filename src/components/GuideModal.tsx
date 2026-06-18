import { motion } from 'motion/react';
import { X, Check, Copy, Award, Ticket, ShieldCheck, HeartPulse } from 'lucide-react';
import { useState } from 'react';

interface GuideModalProps {
  type: 'checklist' | 'etiquette' | 'coupon' | 'ad_laurel' | 'ad_insurance' | 'ad_taxi' | 'ad_food' | null;
  onClose: () => void;
  dogName: string;
}

export default function GuideModal({ type, onClose, dogName }: GuideModalProps) {
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!type) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('KINTETSU_DOG2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistItems = {
    essentials: [
      { id: 'vaccine', text: '狂犬病・混合ワクチン接種証明書（コピー可/1年以内）' },
      { id: 'food', text: '普段食べ慣れているフード・食器' },
      { id: 'leash', text: '首輪・リード（迷子札付き）' },
      { id: 'waste', text: 'マナーおむつ。排泄物処理袋、消臭剤入りスプレー' },
      { id: 'water', text: '給水用ボトル・足洗い用お水' },
    ],
    convenient: [
      { id: 'towel', text: 'お気に入り毛布・バスタオル（ドッグランやケージ用）' },
      { id: 'toy', text: 'お気に入りのおもちゃ（旅先での不安解消に効果的）' },
      { id: 'wipe', text: '犬用ウェットティッシュ、肉球クリーム' },
      { id: 'rain', text: '犬用レインコート・予備の服' },
      { id: 'comb', text: '抜け毛取り用コーム・粘着ローラー（抜け毛マナー対策）' },
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]"
        id="portal-guide-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#184E34] to-spa-primary p-5 text-white flex justify-between items-center shrink-0 border-b border-white/10">
          <div className="flex items-center gap-2">
            {type === 'checklist' && <ShieldCheck size={22} className="text-spa-secondary" />}
            {type === 'etiquette' && <HeartPulse size={22} className="text-spa-secondary" />}
            {type === 'coupon' && <Ticket size={22} className="text-spa-secondary" />}
            {type === 'ad_laurel' && <Award size={22} className="text-amber-300" />}
            {type === 'ad_insurance' && <ShieldCheck size={22} className="text-blue-300" />}
            {type === 'ad_taxi' && <Award size={22} className="text-emerald-300" />}
            {type === 'ad_food' && <Award size={22} className="text-rose-300" />}
            <h3 className="font-sans font-bold text-lg tracking-tight">
              {type === 'checklist' && '愛犬旅行 持ち物チェックリスト'}
              {type === 'etiquette' && '愛犬とお出かけ・車移動マナー'}
              {type === 'coupon' && '近鉄不動産×愛犬プレミアム会員特典'}
              {type === 'ad_laurel' && 'ローレルコート for Dog 特別相談会'}
              {type === 'ad_insurance' && '近鉄のペットあんしん保険 ご案内'}
              {type === 'ad_taxi' && 'ドッグ・フレンドハイヤー ご優待窓口'}
              {type === 'ad_food' && 'ワン・メゾン プレミアム 無料試供プラン'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">

          {type === 'checklist' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500 leading-relaxed">
                出発前の荷物チェックに便利！{dogName}ちゃんとの旅をノンストレスで楽しむための必需品 ＆ 快適お役立ちグッズです。
              </p>

              <div>
                <h4 className="text-xs font-bold text-red-600 bg-red-50 py-1.5 px-3 rounded-md mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 block"></span>
                  【必須】これがないと泊まれない！旅のマストアイテム
                </h4>
                <div className="space-y-2.5">
                  {checklistItems.essentials.map(item => (
                    <label 
                      key={item.id} 
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm text-gray-700"
                    >
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-spa-primary focus:ring-spa-primary pointer-events-auto cursor-pointer"
                      />
                      <span className={checkedItems[item.id] ? 'line-through text-gray-400' : 'font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-md mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-primary block"></span>
                  【あると便利】快適性がグッと高まるケアグッズ
                </h4>
                <div className="space-y-2.5">
                  {checklistItems.convenient.map(item => (
                    <label 
                      key={item.id} 
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm text-gray-700"
                    >
                      <input 
                        type="checkbox" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleCheck(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-spa-primary focus:ring-spa-primary pointer-events-auto cursor-pointer"
                      />
                      <span className={checkedItems[item.id] ? 'line-through text-gray-400' : 'font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type === 'etiquette' && (
            <div className="space-y-5 text-sm text-gray-600">
              <p className="text-sm text-gray-500 leading-relaxed">
                車移動や公共エリアで、{dogName}ちゃんが快適に過ごしつつ、周囲の皆様への配慮を怠らないための重要なマナー集です。
              </p>

              <div className="bg-emerald-50/40 rounded-2xl p-4.5 border border-emerald-100 space-y-3.5">
                <div className="flex gap-2.5">
                  <span className="bg-spa-primary text-white text-[11px] font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h5 className="font-bold text-gray-800">サービスエリア（SA）での休憩と水分補給</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      長時間のドライブはワンちゃんにとっても疲労がたまります。目安として「1.5〜2時間」ごとにSA・PAで休憩をとり、リードをつけてお散歩をさせてリフレッシュしましょう。水分補給も忘れずに。
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 border-t border-emerald-100/60 pt-3.5">
                  <span className="bg-spa-primary text-white text-[11px] font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h5 className="font-bold text-gray-800">車内での安全確保（クレート・犬用シートベルト）</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      車内を自由に歩き回れる状態は、急ブレーキや事故の際にきわめて危険です。クレートを固定するか、犬用シートベルトを装着し、安全な乗り心地を体験させてあげましょう。
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 border-t border-emerald-100/60 pt-3.5">
                  <span className="bg-spa-primary text-white text-[11px] font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h5 className="font-bold text-gray-800">車用乗り物酔い対策</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      出発の「2〜3時間前」までに食事はすませ、お腹を満腹にしないことがポイントです。あらかじめ獣医師さんに相談して酔い止め薬を処方してもらうのも効果的。
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5 border-t border-emerald-100/60 pt-3.5">
                  <span className="bg-spa-primary text-white text-[11px] font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h5 className="font-bold text-gray-800">公共空間・ホテルの基本ルール</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      ホテル館内のロビーや共有廊下、エレベーターでは、抱っこするかバギーに乗せるのがルールです。マナーパンツの着用を推奨するエリアも豊富ですのでマナーベルトは必ず持参しましょう。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'coupon' && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-spa-secondary/60 rounded-full flex items-center justify-center mx-auto text-spa-primary animate-bounce">
                <Award size={36} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-gray-800">ドッグ旅応援 10%OFF クーポン</h4>
                <p className="text-xs text-gray-400">近鉄不動産×ドッグトラベルカルテユーザー限定特典</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 border-2 border-dashed border-amber-300 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  SPECIAL PASS
                </div>
                <div className="text-sm font-bold text-amber-900 mb-1">対象施設のご予約がすべて10%割引！</div>
                <div className="text-xs text-amber-700/85 mb-4">カルテに表示された、全国のおすすめペット宿が、予約決済時に以下のクーポンコード入力で割引適用されます。</div>
                
                <div className="bg-white rounded-xl p-3 border border-amber-200 inline-flex items-center gap-4 shadow-xs">
                  <span className="font-mono text-xl font-extrabold text-spa-primary tracking-wider">KINTETSU_DOG2026</span>
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-spa-primary text-white hover:bg-spa-primary/95 transition-colors flex items-center gap-1.5 text-xs font-bold pointer-events-auto"
                  >
                    {copied ? (
                      <>
                        <Check size={14} /> コピー済
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> コードをコピー
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-center items-center gap-1 mt-4 text-[10px] text-gray-400">
                  <span>有効期限：2026年12月31日まで ／ 会員登録不要でご利用可能です。</span>
                </div>
              </div>

              <div className="text-left bg-gray-50 p-4 rounded-xl text-xs text-gray-500 space-y-1.5 border border-gray-100">
                <span className="font-bold text-gray-700 block text-xs">ご利用方法：</span>
                <p>1. 診断のリストからお好きな施設（例：淡路島ドッグヴィラ・碧 など）を選択。</p>
                <p>2. 各施設の詳細・予約ボタンまたは近鉄ホテルパートナーページへ移動。</p>
                <p>3. クーポンコード欄に「KINTETSU_DOG2026」を入力して予約を完了してください。</p>
              </div>
            </div>
          )}

          {type === 'ad_laurel' && (
            <div className="space-y-5 text-sm text-gray-650 text-left">
              <div className="h-40 rounded-2xl overflow-hidden relative shadow-inner">
                <img src="https://picsum.photos/seed/ad_laurel/500/300" alt="Laurel Court" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute bottom-3 left-3 bg-amber-600 text-[10px] text-white px-2.5 py-1 rounded font-bold font-sans">
                  近鉄不動産の分譲マンション
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-850 font-sans leading-snug">
                愛犬との一生を変える住まい：ローレルコート for Dog
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                ただ「ペット飼育可能」という条件だけではありません。共用スペースに足洗い場、犬用マイクロバブル温泉、そして広大なプライベートドッグランを完備。滑りにくく傷がつきにくい消臭・抗菌特殊フローリングを標準装備した、まさに愛犬ファースト設計の新築分譲マンションです。
              </p>
              <div className="bg-amber-50 p-4.5 rounded-2xl border border-amber-250">
                <span className="text-xs font-bold text-amber-900 block mb-1">【トラベルカルテ診断 特典キャンペーン】</span>
                <p className="text-xs text-amber-800 leading-normal mb-3">
                  本カルテ画面をスマートフォン等でモデルルーム見学時にご提示いただいたお客様全員に、<strong>【愛犬専用オーガニック無添加プレミアムおやつ詰め合わせ】</strong>を特別にプレゼントいたします。
                </p>
                <div className="text-center font-mono font-bold bg-white text-amber-700 py-1.5 rounded-xl border border-amber-300 tracking-wider text-xs">
                  紹介キーコード：LC_DOG_TRAVEL2026
                </div>
              </div>
            </div>
          )}

          {type === 'ad_insurance' && (
            <div className="space-y-5 text-sm text-gray-650 text-left">
              <div className="h-40 rounded-2xl overflow-hidden relative shadow-inner">
                <img src="https://picsum.photos/seed/ad_insurance/500/300" alt="Pet Insurance" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute bottom-3 left-3 bg-blue-800 text-[10px] text-white px-2.5 py-1 rounded font-bold font-sans">
                  近鉄ゴールドケアあんしん特約
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-850 font-sans leading-snug">
                旅先でのどんなアクシデントも。安心の賠償最大1,000万円補償！
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                旅行中、興奮したワンちゃんがホテルの高級な障子や備品・家具を破いてしまった、あるいは旅先ドッグランで他のワンちゃんとトラブルになってしまった...そんな万が一の賠償責任を手厚くフルカバーする、1日約35円のおすすめペット保険。
              </p>
              <ul className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl list-disc list-inside">
                <li>通院・入院・手術時の窓口精算・自己負担ゼロ（最大90%補償プラン）</li>
                <li>賠償責任特約つき（月額換算約120円の特約追加で自動保障）</li>
                <li>24時間365日いつでも相談可能！「プロの資格者による無料獣医師相談窓口」付帯</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-center font-sans">
                <span className="font-bold text-xs text-blue-900 block mb-1 font-sans">WEBから3ステップで一瞬見積もり！</span>
                <p className="text-[10px] text-blue-700 mb-0.5">※今お見積もりいただくと全員に【犬用オリジナルお手入れクロス】を無料発送いたします。</p>
              </div>
            </div>
          )}

          {type === 'ad_taxi' && (
            <div className="space-y-5 text-sm text-gray-650 text-left">
              <div className="h-40 rounded-2xl overflow-hidden relative shadow-inner">
                <img src="https://picsum.photos/seed/ad_taxi/500/300" alt="Dog Taxi" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute bottom-3 left-3 bg-emerald-850 text-[10px] text-white px-2.5 py-1 bg-emerald-800 rounded font-bold font-sans">
                  ドアToドアの安心プライベート送迎
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-850 font-sans leading-snug">
                電車や一般タクシーが苦手な子も安心：近鉄ドッグ・フレンドハイヤー
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                車を運転しないご家族や、ケージに入れると吠えてしまうデリケートなワンちゃんのための快適ペット専用ハイヤーサービス。大型高級バンクラスを犬専用にクリーンに改造し、専属ドライバーが同伴。飼い主様の真隣のシートで窮屈感なくお出かけをお楽しみいただけます。
              </p>
              <div className="bg-emerald-50/70 p-4.5 rounded-2xl border border-emerald-250">
                <span className="text-xs font-bold text-emerald-950 block mb-1">【トラベルカルテ連動 優待】</span>
                <span className="text-xs text-emerald-850 leading-normal block mb-2 font-sans">
                  本カルテ予約窓口からの優待コード適用で、<strong>【全乗車パターンの迎車回送手数料（最大3,500円相当）が完全無料】</strong>になります。
                </span>
                <div className="text-center font-mono font-bold bg-white text-emerald-800 py-1.5 rounded-xl border border-emerald-300 text-xs">
                  優待コード：K_HARE_TAXI2026
                </div>
              </div>
            </div>
          )}

          {type === 'ad_food' && (
            <div className="space-y-5 text-sm text-gray-655 text-left">
              <div className="h-40 rounded-2xl overflow-hidden relative shadow-inner">
                <img src="https://picsum.photos/seed/ad_food/500/300" alt="Dog Food" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute bottom-3 left-3 bg-rose-800 text-[10px] text-white px-2.5 py-1 rounded font-bold font-sans">
                  近鉄プレミアムドッグリゾート公認推奨
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-850 font-sans leading-snug">
                旅先でのおなかのゆるみ・食欲不振に：近鉄ワン・メゾン プレミアム
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                お出かけ・旅先などの不慣れな遠出は、おうちとは異なる微細なストレスによってお腹を下しやすくなります。獣医師と共同開発した特別食で、お腹のスマート乳酸菌＆国産さつまいも繊維を独自比率ブレンド。驚きの食いつきの良さとデリケートな胃腸の調子をバッチリ整えます。
              </p>
              <div className="bg-rose-50/70 p-4.5 rounded-2xl border border-rose-200">
                <span className="text-xs font-bold text-rose-900 block mb-1">【1,000袋限定 無料サンプリング】</span>
                <p className="text-xs text-rose-800 leading-normal mb-3 font-sans">
                  本診断カルテをお持ちのオーナー先着1,000名様に限り、食べ切りお出かけ用パック（150g×3個パック：1,800円相当）を送料も含め<strong>【完全ゼロ円】</strong>でご自宅にお送りたします！
                </p>
                <div className="text-center font-mono font-bold bg-white text-rose-800 py-1.5 rounded-xl border border-rose-300 text-xs">
                  サンプル請求コード：W_MAISON_SAMPLE2026
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer button */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-800 text-white text-sm font-bold hover:bg-gray-700 transition-colors pointer-events-auto"
          >
            画面を閉じて戻る
          </button>
        </div>
      </motion.div>
    </div>
  );
}
