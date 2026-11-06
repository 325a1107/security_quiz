import { DifficultyConfig, Scenario } from '../types/game';
import { EASY_SCENARIOS } from './scenarios/easy';
import { NORMAL_SCENARIOS } from './scenarios/normal';
import { HARD_SCENARIOS } from './scenarios/hard';

export { EASY_SCENARIOS, NORMAL_SCENARIOS, HARD_SCENARIOS };

export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: '初級（ビギナー防衛編）',
    subTitle: '典型的な詐欺・スミッシングのパターンを見抜く',
    badge: 'EASY',
    description: '明らかな不審ドメインや誇張された緊急連絡など、日常で遭遇しやすい基本的ななりすましを識別する入門編。',
    questionCount: 5,
    initialLives: 3,
    hintAllowed: true,
    targetAudience: 'セキュリティの基礎を確認したい方、新入社員、一般ユーザー',
    features: [
      '不審な送信元ドメインや怪しい日本語の見分け方',
      '典型的な不在通知スミッシングやサポート詐欺',
      'ヒント機能いつでも利用可能',
      '全20問のシナリオプールから毎回ランダム出題'
    ]
  },
  normal: {
    id: 'normal',
    name: '中級（実践・社内インシデント編）',
    subTitle: '巧妙な社内偽装と正規通知を的確にトリアージ',
    badge: 'NORMAL',
    description: '総務・情シスを騙る偽ログイン要請や、正規の二要素認証・公式通知が混在するリアルなオフィス環境シミュレーション。',
    questionCount: 6,
    initialLives: 2,
    hintAllowed: true,
    targetAudience: '日常的に業務メール・チャットを扱うビジネスパーソン',
    features: [
      '社内情シスやクラウドサービスを装ったクレデンシャル詐取',
      '本物のセキュリティ通知を誤って弾かない「正規判別」訓練',
      '公的機関（税務機関等）を騙る還付金トラップの解明',
      '全20問のシナリオプールから毎回ランダム出題'
    ]
  },
  hard: {
    id: 'hard',
    name: '上級（標的型・BECエキスパート編）',
    subTitle: 'タイポスクワッティング・MFA疲労・役員詐欺の迎撃',
    badge: 'HARD',
    description: '巧妙なビジネスメール詐欺（BEC）、1文字違いのドメイン、OAuth過剰権限、MFA連打攻撃など、最高レベルの心理誘導を極限の緊迫感で判定。',
    questionCount: 7,
    initialLives: 1,
    timeLimitPerQuestion: 35, // 35秒の心理的プレッシャー
    hintAllowed: false,
    targetAudience: 'IT・セキュリティ担当者、管理職、標的型攻撃に備えたい方',
    features: [
      'タイポスクワッティング（1文字違いの取引先ドメイン）',
      '緊急役員チャット（CEO詐欺・ギフトカード購入要請・AI音声詐欺）',
      '35秒の制限時間カウントダウン（焦りの心理誘導を体感）',
      '全20問のシナリオプールから毎回ランダム出題'
    ]
  }
};

export const SCENARIOS: Scenario[] = [
  ...EASY_SCENARIOS,
  ...NORMAL_SCENARIOS,
  ...HARD_SCENARIOS
];

export const PSYCHOLOGY_GUIDES = [
  {
    type: 'urgency',
    title: '緊急性の演出（Urgency & FOMO）',
    catchphrase: '「今すぐ対応しないと」「24時間以内」「本日中」',
    attackGoal: '被害者を焦らせ、冷静に考える時間や他人に相談する時間を奪う。',
    realExamples: [
      '「24時間以内にパスワード変更をしないとアカウントが永久凍結されます」',
      '「本日18時までに再認証を行わないと明日からメールが使えなくなります」',
      '「48時間以内に講演スロットを確定してください」'
    ],
    countermeasure: 'どんなに急かされても「1分深呼吸して立ち止まる」。本物の企業や公的機関が、数時間の猶予で顧客のアカウントを突然全削除することはありません。'
  },
  {
    type: 'fear',
    title: '恐怖・不安の煽り（Fear & Intimidation）',
    catchphrase: '「ウイルス感染！」「不正アクセス検知」「法的手続き」',
    attackGoal: 'パニック状態を作り出し、批判的思考力を麻痺させて提示された救済措置（偽サポート・偽解除リンク）に飛びつかせる。',
    realExamples: [
      '「Trojanウイルスが検出されました！今すぐサポート窓口にお電話ください」',
      '「不正ログインを検知したためカード決済を制限しました。カード番号を再入力してください」',
      '「法規通則に基づき還付請求権が消滅します」'
    ],
    countermeasure: '画面に出た電話番号には絶対に電話しない。リンクを踏まず、手元のキャッシュカード裏面の電話番号や公式アプリから事実確認を行う。'
  },
  {
    type: 'authority',
    title: '権威への服従（Authority Bias）',
    catchphrase: '「代表取締役社長より」「情シス管理部」「公的機関」「警察」',
    attackGoal: '「組織の偉い人や公的機関の指示には逆らえない」という人間の従順バイアスを悪用し、確認プロセスをスキップさせる。',
    realExamples: [
      '「山田副社長です。至急クライアント用にDigitalPay ギフトカードを4枚買ってきてくれ」',
      '「中央租税管理庁より還付金のお手続きです」',
      '「全社シングルサインオン証明書更新のため全社員再ログイン必須」'
    ],
    countermeasure: 'どんなに立場が上の人物からの指示であっても、「金銭振込」「ギフトカード購入」「個人情報・認証トークン入力」は必ず事前に別ルート（内線・対面）で二重確認する。'
  },
  {
    type: 'greed',
    title: '欲求・利得・返報性（Greed & Reciprocity）',
    catchphrase: '「未受領の還付金48,200円」「特別ボーナス」「当選のお知らせ」',
    attackGoal: '「得をしたい」「損をしたくない（損失回避バイアス）」という人間の本能を刺激し、警戒のハードルを下げる。',
    realExamples: [
      '「所得税の過誤納金が48,200円発生しています。受取口座を登録してください」',
      '「最新AI日程調整ツールを無料でお試しいただけます（全権限をリクエスト）」',
      '「高額講演料とビジネスクラス宿泊全額提供で基調講演にご招待」'
    ],
    countermeasure: '「都合の良い美味すぎる話はまず疑う」。日本の行政機関の公式ドメインは「.go.jp」以外あり得ず、アプリ連携時は要求されている権限を精査する。'
  },
  {
    type: 'familiarity',
    title: '好意・親近感・既成事実（Familiarity & Pretexting）',
    catchphrase: '「先ほどお電話でお話しした件」「お世話になっております〇〇商事です」',
    attackGoal: '「すでにやり取りした関係だ」「いつも取引している相手だ」と思い込ませ、警戒心を解かせる。',
    realExamples: [
      '「先ほど電話でお話しした請求書（暗号化ZIP）を送付します」',
      '「弊社のメインバンク統合に伴い、振込先口座を変更いたしました」'
    ],
    countermeasure: '身に覚えのない電話の話や、メールでの口座変更連絡は、過去の契約書に記載された電話番号へ「逆探知コールバック」を行う。'
  },
  {
    type: 'confusion',
    title: '技術的混乱・煙幕（Technical Confusion）',
    catchphrase: '「OAuth同意画面」「SSOセッション異常」「MFAプッシュ通知連打」',
    attackGoal: 'ITの仕組みや難しい用語で煙に巻き、「よくわからないから言われた通りボタンを押そう」と妥協させる。',
    realExamples: [
      '夜間にMFAプッシュ通知を連打した上で「システム不具合調査のため承認を押してください」と依頼',
      'カレンダーアプリを装って「全メールの閲覧・送受信・削除」権限を要求'
    ],
    countermeasure: '自分が操作していないプッシュ通知は絶対に「承認」しない。アプリ連携画面ではどんな権限を渡そうとしているのか日本語を1行ずつ読む。'
  }
];
