import { Scenario } from '../../types/game';

export const EASY_SCENARIOS: Scenario[] = [
  {
    id: 'easy_01_sms_delivery',
    difficulty: 'easy',
    medium: 'sms',
    title: 'ツバメ急便のお届け不在通知',
    senderDisplay: '080-9281-XXXX',
    senderAddress: '080-9281-XXXX',
    recipientDisplay: 'あなたのスマートフォン',
    timestamp: '本日 14:22',
    content: `お客様宛てのお荷物をお届けにあがりましたが、ご不在のため持ち帰りました。下記リンクより再配達のお手続きをお願いします。
http://tsubame-pkg-track.top/delivery?id=92819`,
    isSpoofed: true,
    attackType: 'スミッシング（SMSフィッシング）',
    urlInfo: {
      displayText: 'http://tsubame-pkg-track.top/delivery?id=92819',
      actualUrl: 'http://tsubame-pkg-track.top/delivery?id=92819',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'urgency',
        label: '緊急性と好奇心',
        description: '「荷物が届かないかも」という不安と、「何が届いたのだろう」という好奇心を刺激して即時クリックを促す。'
      }
    ],
    clues: [
      {
        id: 'clue_e1_sender',
        targetArea: 'sender',
        label: '差出人の携帯番号',
        isSuspicious: true,
        explanation: '正規の配送事業者が、一般的な個人の携帯電話番号（080/090）から不在連絡のリンク付きSMSを送ることは基本的にありません。'
      },
      {
        id: 'clue_e1_url',
        targetArea: 'url',
        label: 'リンクのドメイン（.top）',
        isSuspicious: true,
        explanation: '業者名を騙る文字列が入っていますが、公式ドメイン（tsubame-express.co.jp等）ではなく、格安ドメイン（.top）が使われた偽サイトです。'
      },
      {
        id: 'clue_e1_protocol',
        targetArea: 'body',
        label: '暗号化されていない「http://」',
        isSuspicious: true,
        explanation: '現代の公式サービスは常時SSL化（https://）されています。http://のリンクは極めて危険です。'
      }
    ],
    explanation: {
      summary: '配送業者を装った典型的な「スミッシング（SMS詐欺）」です。',
      whySafeOrSpoofed: 'リンク先を開くと不正な偽アプリのインストールを促されたり、偽ログイン画面でIDやパスワードが盗まれます。',
      psychologicalTrap: '「荷物が届いている」という日常的な事象に便乗し、確認を怠らせて反射的にURLをタップさせようとする心理誘導です。',
      checklistPoints: [
        '個人の携帯番号から届いた不在連絡SMSのURLは絶対に開かない',
        '正規の事業者は「.top」「.xyz」「.club」などの格安新ドメインを使いません',
        '荷物の状況は、公式アプリまたはブックマークした公式追跡サービスに直接伝票番号を入れて確認する'
      ],
      defenseRule: 'SMSに記載されたURLはタップせず、必ず公式アプリや公式サイトの検索窓から追跡番号を照会する。'
    }
  },
  {
    id: 'easy_02_legit_dropbox',
    difficulty: 'easy',
    medium: 'email',
    title: 'クラウドストレージ「CloudSync」の月次領収書通知',
    senderDisplay: 'CloudSync Billing Team',
    senderAddress: 'no-reply@cloudsync-storage.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'ご利用明細書：CloudSync Plus プラン（2026年10月度）',
    timestamp: '2026年10月28日 09:15',
    content: `いつもCloudSyncをご利用いただきありがとうございます。

お客様のCloudSync Plusアカウント（月額プラン）のご請求が正常に完了いたしました。
金額：¥1,500（税込）
お支払い方法：クレジットカード（末尾 4192）

本メールの詳細は、CloudSyncアカウントの設定画面「お支払い」タブからもいつでもご確認いただけます。
https://www.cloudsync-storage.jp/account/billing

ご不明な点がございましたら、ヘルプセンターをご確認ください。
CloudSync サービスチーム`,
    isSpoofed: false,
    attackType: '正規の業務・サービス通知',
    urlInfo: {
      displayText: 'https://www.cloudsync-storage.jp/account/billing',
      actualUrl: 'https://www.cloudsync-storage.jp/account/billing',
      isSuspicious: false
    },
    headers: {
      'From': 'CloudSync Billing <no-reply@cloudsync-storage.jp>',
      'Authentication-Results': 'spf=pass (mail.cloudsync-storage.jp: domain of no-reply@cloudsync-storage.jp designates 192.0.2.1 as permitted sender) dkim=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e2_domain',
        targetArea: 'sender',
        label: '送信元アドレスのドメイン',
        isSuspicious: false,
        explanation: '公式正規ドメイン（@cloudsync-storage.jp）から直接送信されています。'
      },
      {
        id: 'clue_e2_url',
        targetArea: 'url',
        label: '本文のURLリンク先',
        isSuspicious: false,
        explanation: '表示URLと実際の遷移先が完全に一致しており、正規の公式「https://www.cloudsync-storage.jp/」です。'
      },
      {
        id: 'clue_e2_tone',
        targetArea: 'body',
        label: '文面のトーンと緊急性',
        isSuspicious: false,
        explanation: '「24時間以内に支払わないとデータ削除」のような恐怖や緊急性を煽る文言が一切なく、事実の報告のみです。'
      }
    ],
    explanation: {
      summary: 'これは安全な「正規の月次請求通知」です。',
      whySafeOrSpoofed: '送信元ドメイン（@cloudsync-storage.jp）が正規であり、SPF/DKIM認証に合格しています。また、URLも公式ドメインで、緊急煽りや不自然な日本語もありません。',
      psychologicalTrap: 'セキュリティ意識が高くなると「請求」や「金額」という単語を見るだけで過剰にすべてを詐欺と判断（過検知）しがちですが、冷静にドメインと文面を確認することが重要です。',
      checklistPoints: [
        '送信元ドメインが本物のドメイン（cloudsync-storage.jp）と合致しているか',
        '表示されているリンク文字列と、実際のリンク先URLが同一であるか',
        '緊急の行動（今すぐクリックしないとペナルティなど）を強制していないか'
      ],
      defenseRule: '定期契約しているサービスの領収書通知は、焦らず公式アカウント設定ページからも同様の明細が確認できるかを照合する。'
    }
  },
  {
    id: 'easy_03_browser_scam',
    difficulty: 'easy',
    medium: 'browser_alert',
    title: 'システムセキュリティ警告：マルウェア感染の疑い',
    senderDisplay: 'CoreOS セキュリティセンター',
    senderAddress: 'web-security-alert-notice.cloud',
    recipientDisplay: '全画面ダイアログ',
    timestamp: 'リアルタイム検出',
    content: `🚨 警告！お使いのパソコンは Trojan.Spyware.2026 ウイルスに感染しています！

直ちに個人情報やクレジットカード番号が流出する危険があります。
ブラウザを閉じずに、今すぐコアソフト社認定技術者にお電話ください。

フリーダイヤル：050-6872-XXXX（通話無料・24時間受付）
エラーコード: #0x80070057_SECURITY_BREACH`,
    isSpoofed: true,
    attackType: 'テクニカルサポート詐欺（警告偽装）',
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '強い恐怖とパニック',
        description: '「ウイルス感染」「情報流出」という強いショックワードで思考力を麻痺させる。'
      },
      {
        type: 'urgency',
        label: '緊急行動の強制',
        description: '「直ちに」「今すぐ電話」と煽り、周囲への相談や調査をする時間を奪う。'
      },
      {
        type: 'authority',
        label: '公的ブランド・権威の悪用',
        description: '「認定技術者」「公式センター」などの肩書を掲げて信頼させる。'
      }
    ],
    clues: [
      {
        id: 'clue_e3_phone',
        targetArea: 'body',
        label: '電話サポートへの誘導（050番号）',
        isSuspicious: true,
        explanation: '本物のOSベンダーが、Web画面上に個別のサポート電話番号を表示してユーザーから電話をかけさせることは絶対にありません。'
      },
      {
        id: 'clue_e3_fullscreen',
        targetArea: 'body',
        label: '全画面やビープ音によるパニック演出',
        isSuspicious: true,
        explanation: 'ブラウザの全画面表示機能（F11）や警告音を使って「画面がロックされた」と錯覚させる典型的なサポート詐欺です。'
      }
    ],
    explanation: {
      summary: '典型的な「サポート詐欺（偽セキュリティ警告画面）」です。',
      whySafeOrSpoofed: '本物のOSやセキュリティソフトが、Webサイト閲覧中に電話をかけさせる警告を出すことはありません。電話すると遠隔操作ソフトを入れられ、高額なプリペイドカードや電子マネーを要求されます。',
      psychologicalTrap: '警告音や赤色の点滅、仰々しいエラーコードでパニック状態に追い込み、冷静な判断ができない状態で電話をかけさせる心理誘導です。',
      checklistPoints: [
        '画面に「今すぐ電話してください」と電話番号が出たら100%詐欺',
        'PCは実際にはウイルス感染しておらず、単なるWebページが表示されているだけ',
        'キーボードの [Esc] 長押し、またはブラウザのタブを閉じる／タスクマネージャーからブラウザを終了すれば解決'
      ],
      defenseRule: '画面に表示された電話番号には絶対に電話しない。Escキーやブラウザ終了で落ち着いて画面を閉じる。'
    }
  },
  {
    id: 'easy_04_spoofed_ec_urgent',
    difficulty: 'easy',
    medium: 'email',
    title: '大手オンライン通販「AcroMarket」のアカウント停止予告',
    senderDisplay: 'AcroMarket カスタマーサポート',
    senderAddress: 'account-update@acr0market-security-japan.xyz',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【緊急】あなたのアカウントは24時間以内に一時停止されます',
    timestamp: '本日 02:40',
    content: `平素はAcroMarketをご利用いただきありがとうございます。

お客様のアカウント情報に異常なログイン試行が検知されました。
セキュリティ保護のため、24時間以内に下記ボタンよりカード情報およびご登録情報の再確認をお願いいたします。
期限内に更新が完了しない場合、お客様のアカウントは永久に凍結され、注文がすべてキャンセルされます。

▼ アカウントの確認・再有効化
https://acromarket-account-verify-login.xyz/update

※本メールは送信専用です。`,
    isSpoofed: true,
    attackType: 'フィッシング詐欺（クレデンシャル搾取）',
    urlInfo: {
      displayText: 'https://acromarket-account-verify-login.xyz/update',
      actualUrl: 'https://acromarket-account-verify-login.xyz/update',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: 'アカウント凍結の脅迫',
        description: '「永久に凍結」「すべてキャンセル」と脅してパニックを起こさせる。'
      },
      {
        type: 'urgency',
        label: '24時間のタイムリミット',
        description: '時間制限を設けることで、公式アプリ等で慎重に調べる猶予を与えない。'
      }
    ],
    clues: [
      {
        id: 'clue_e4_domain',
        targetArea: 'sender',
        label: '送信元アドレス（acr0market / .xyz）',
        isSuspicious: true,
        explanation: '英字の「o（オー）」を数字の「0（ゼロ）」に変えた「acr0market」という偽装ドメインです。さらにトップレベルドメインも詐欺で頻用される「.xyz」です。'
      },
      {
        id: 'clue_e4_threat',
        targetArea: 'body',
        label: '24時間以内のアカウント凍結脅迫',
        isSuspicious: true,
        explanation: '公式が24時間以内にカード情報を再入力させないと永久凍結するという極端な脅迫メールを送ることはありません。'
      }
    ],
    explanation: {
      summary: '大手ECを騙る「典型的なフィッシング詐欺メール」です。',
      whySafeOrSpoofed: '送信元アドレスが「acromarket.co.jp」ではなく「acr0market-security-japan.xyz」となっており、明らかに第三者が取得した悪意あるドメインです。',
      psychologicalTrap: '「深夜のメール着信」と「24時間以内の口座凍結」というタイムプレッシャーで焦りを生み、ドメインをよく見ずにクリックさせようとします。',
      checklistPoints: [
        '大手ECからの正規メッセージは、公式アプリ内の「メッセージセンター」に必ず同じものが届いている',
        'アルファベットの「o（オー）」が数字の「0（ゼロ）」になっていないか注意深くチェックする',
        'メール内のボタンは押さず、スマホの公式アプリから直接ログインしてステータスを確認する'
      ],
      defenseRule: 'ECサイトの重要通知は、メールのリンクを踏まずに公式アプリのメッセージセンターで照合する。'
    }
  },
  {
    id: 'easy_05_colleague_chat',
    difficulty: 'easy',
    medium: 'chat',
    title: '社内チャットでの同僚からのランチ相談',
    senderDisplay: '佐藤 健太（開発部）',
    senderAddress: '@sato_kenta',
    recipientDisplay: '#general / DM',
    timestamp: '本日 11:45',
    content: `お疲れ様です！
今日のお昼、12時15分から新しくできた北口のパスタ屋に行こうと思っているのですが、ご都合どうですか？
もし行けそうなら一緒に行きましょう〜！`,
    isSpoofed: false,
    attackType: '正規の同僚チャット',
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e5_channel',
        targetArea: 'body',
        label: '日常的な業務内コミュニケーション',
        isSuspicious: false,
        explanation: '社内認証済みチャットからの通常会話であり、怪しいURLや金銭・パスワードの要求はありません。'
      },
      {
        id: 'clue_e5_no_link',
        targetArea: 'url',
        label: '外部リンクや添付ファイルなし',
        isSuspicious: false,
        explanation: 'リンクや不審なファイルのダウンロードを強制していません。'
      }
    ],
    explanation: {
      summary: '安全な「通常の社内コミュニケーション」です。',
      whySafeOrSpoofed: '社内公認チャットプラットフォーム上で、認証された同僚アカウントからの日常的なランチの誘いです。怪しい外部リンクや緊急の金銭要求、アカウント情報の問い合わせ等は一切ありません。',
      psychologicalTrap: '過剰なセキュリティ不信に陥ると、通常の業務や雑談まで疑ってしまい業務が停滞します。「リスクのある要素（URL、ファイル、権限変更、個人情報）」が存在するかどうかを冷静に仕分ける姿勢を身につけましょう。',
      checklistPoints: [
        '不審なリンクやマクロ付き添付ファイルが含まれていないか',
        '急な金銭の立替やギフトカード購入依頼ではないか',
        '社内認証された本人のアカウントから送られているか'
      ],
      defenseRule: 'リスク要因（URL・添付・認証情報要求・ギフトカード）がない日常会話は安心して通常業務として対応する。'
    }
  },
  {
    id: 'easy_06_carrier_bill_sms',
    difficulty: 'easy',
    medium: 'sms',
    title: 'ネクストモバイル通信料金のお支払い確認',
    senderDisplay: '070-5512-XXXX',
    senderAddress: '070-5512-XXXX',
    recipientDisplay: 'あなたのスマートフォン',
    timestamp: '本日 18:30',
    content: `【重要】ネクストモバイルご利用料金のお支払い確認が取れておりません。本日23:59を過ぎますと回線を停止いたします。
至急下記より決済手続きを完了してください。
http://next-mobile-payment-notice.top/pay`,
    isSpoofed: true,
    attackType: 'スミッシング（通信料金未払い型詐欺）',
    urlInfo: {
      displayText: 'http://next-mobile-payment-notice.top/pay',
      actualUrl: 'http://next-mobile-payment-notice.top/pay',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'urgency',
        label: '本日中の回線停止脅迫',
        description: '「今日中にスマホが使えなくなる」とパニックにさせ、確認を省略させる。'
      },
      {
        type: 'fear',
        label: '通信インフラ喪失の恐怖',
        description: '日常に不可欠な携帯回線を人質に取り、即時支払いを強要する。'
      }
    ],
    clues: [
      {
        id: 'clue_e6_domain',
        targetArea: 'url',
        label: '格安ドメイン（.top）と非SSL',
        isSuspicious: true,
        explanation: '通信会社が公式料金支払いで「http://」かつ「.top」のドメインを使用することは絶対にありません。'
      },
      {
        id: 'clue_e6_phone',
        targetArea: 'sender',
        label: '個人の携帯番号からの請求SMS',
        isSuspicious: true,
        explanation: '070発信のSMSで突然料金督促とリンクが届く手口は典型的なスミッシングです。'
      }
    ],
    explanation: {
      summary: '携帯キャリアを騙る「通信料金未納フィッシングSMS」です。',
      whySafeOrSpoofed: '個人番号から送信され、格安ドメイン「.top」の非SSLサイトへ誘導しています。カード情報やVプリカ番号などを詐取する典型的な犯罪です。',
      psychologicalTrap: '「本日中に回線停止」と焦らせ、キャリアの公式マイページで契約状況を確認する時間を奪おうとします。',
      checklistPoints: [
        'SMSに貼られた支払い用リンクは絶対に開かない',
        '携帯料金の請求状況は、スマホ内の公式キャリアマイページアプリから直接確認する',
        '急な回線停止の警告SMSはスミッシングの常套手段'
      ],
      defenseRule: '未払い警告SMSのリンクは踏まず、公式マイページアプリから請求状況を確認する。'
    }
  },
  {
    id: 'easy_07_legit_shipping_mail',
    difficulty: 'easy',
    medium: 'email',
    title: '大手オンライン通販「AcroMarket」商品発送完了通知',
    senderDisplay: 'AcroMarket 配送センター',
    senderAddress: 'order-update@acromarket.co.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'ご注文商品の発送が完了いたしました（伝票番号：8821-9920-1120）',
    timestamp: '本日 10:20',
    content: `AcroMarketをご利用いただきありがとうございます。

ご注文いただいた下記商品を本日発送いたしました。

■ ご注文内容
商品名：エルゴノミックPCマウス（静音モデル）
配送業者：ツバメ急便
お問い合わせ伝票番号：8821-9920-1120

配送状況は各配送業者の公式サイト、またはお客様の注文履歴よりご確認いただけます。
https://www.acromarket.co.jp/orders/history

今後ともAcroMarketをよろしくお願い申し上げます。`,
    isSpoofed: false,
    attackType: '正規の通販発送通知',
    urlInfo: {
      displayText: 'https://www.acromarket.co.jp/orders/history',
      actualUrl: 'https://www.acromarket.co.jp/orders/history',
      isSuspicious: false
    },
    headers: {
      'From': 'AcroMarket <order-update@acromarket.co.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e7_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（@acromarket.co.jp）',
        isSuspicious: false,
        explanation: '公式ECの正規ドメインから送信されており、認証ヘッダーも全て合格しています。'
      },
      {
        id: 'clue_e7_no_urgency',
        targetArea: 'body',
        label: '緊急煽りのない事実報告',
        isSuspicious: false,
        explanation: 'クレジットカード再入力などの危険な要求がなく、注文履歴の確認先URLも本物です。'
      }
    ],
    explanation: {
      summary: '安全な「正規のEC発送完了通知メール」です。',
      whySafeOrSpoofed: '送信元アドレスが公式正規ドメイン（@acromarket.co.jp）であり、認証（SPF/DKIM/DMARC）を通過しています。不審な個人情報やカード情報の入力要求もありません。',
      psychologicalTrap: '通販からのメールを無差別にすべて怪しいと判定してしまうと、正当な荷物の到着予定を見落としてしまいます。',
      checklistPoints: [
        '自分が実際に注文した商品内容と合致しているか',
        '送信元ドメインが公式サイトと完全一致しているか',
        'パスワードやカード番号の入力を求めていないか'
      ],
      defenseRule: '心当たりのある注文の発送通知は、正規ドメインと注文履歴を確認して安全に受け取る。'
    }
  },
  {
    id: 'easy_08_calendar_meeting',
    difficulty: 'easy',
    medium: 'email',
    title: '社内グループウェアからの会議室予約リマインド',
    senderDisplay: '社内カレンダーシステム',
    senderAddress: 'system-notification@aoba-next.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【リマインド】14:00〜 会議室B「第3四半期セキュリティ定例」',
    timestamp: '本日 13:30',
    content: `〇〇さん

社内カレンダーにご登録の予定が30分後に開始されます。

■ 予定概要
件名：第3四半期セキュリティ定例
日時：本日 14:00 - 15:00
場所：本社6F 会議室B
主催者：情報システム部 高橋

※本メールは社内グループウェアより自動送信されています。返信は不要です。`,
    isSpoofed: false,
    attackType: '正規の社内システム通知',
    headers: {
      'From': '社内カレンダーシステム <system-notification@aoba-next.jp>',
      'Authentication-Results': 'spf=pass (local internal mail gateway)'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e8_domain',
        targetArea: 'sender',
        label: '自社正規ドメイン（@aoba-next.jp）',
        isSuspicious: false,
        explanation: '社内正規のグループウェアドメインから直接送信されています。'
      },
      {
        id: 'clue_e8_no_link',
        targetArea: 'body',
        label: '外部URLや添付ファイルが存在しない',
        isSuspicious: false,
        explanation: '不審な外部URLを踏ませる意図が一切なく、予定の通知のみで完結しています。'
      }
    ],
    explanation: {
      summary: '完全に安全な「社内カレンダーの正規自動リマインド通知」です。',
      whySafeOrSpoofed: '自社ドメイン（@aoba-next.jp）から送信され、怪しい外部リンクや添付ファイルは一切なく、本人の登録したスケジュール通りの案内です。',
      psychologicalTrap: '機械的な通知メールだからといって詐欺と決めつけず、送信元ドメインと本文にリスク要素（外部URL・添付ファイル・認証要求）があるかを確認します。',
      checklistPoints: [
        '外部URLやファイルが添付されていない',
        '送信元が社内グループウェアの正規アドレスである',
        '実際の業務スケジュールと一致している'
      ],
      defenseRule: 'リスク要素（外部リンク・添付・金銭・認証要求）のない社内定例通知は正常業務として進行する。'
    }
  },
  {
    id: 'easy_09_antivirus_subscription',
    difficulty: 'easy',
    medium: 'email',
    title: 'セキュリティ対策ソフト「CyberGuard」自動更新請求書',
    senderDisplay: 'CyberGuard Customer Billing',
    senderAddress: 'billing-renew@cyberguard-support-desk.xyz',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【請求確定】CyberGuard Total Security 3年ライセンス更新（¥49,800）',
    timestamp: '本日 06:15',
    content: `平素よりCyberGuardをご利用いただき誠にありがとうございます。

年間サブスクリプションの自動更新が完了し、お客様のご登録クレジットカードへのお引き落とし（¥49,800）が確定いたしました。

■ ご契約詳細
ライセンス：CyberGuard Premium 2026-2029
請求金額：¥49,800

身に覚えがない場合、または24時間以内の解約・全額返金をご希望のお客様は、直ちに下記キャンセルフォームよりご返金手続きを行ってください。
https://cyberguard-refund-cancel-portal.xyz/cancel?id=CG991`,
    isSpoofed: true,
    attackType: '架空請求・返金詐欺（サブスクリプション便乗）',
    urlInfo: {
      displayText: 'https://cyberguard-refund-cancel-portal.xyz/cancel?id=CG991',
      actualUrl: 'https://cyberguard-refund-cancel-portal.xyz/cancel?id=CG991',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '約5万円の誤請求に対する焦り',
        description: '「頼んだ覚えのない大金が引き落とされた！」と慌てさせ、返金フォームに誘導する。'
      },
      {
        type: 'urgency',
        label: '24時間以内の返金受付期限',
        description: '今すぐ手続きしないと返金されないと脅し、カード明細を精査する余裕を奪う。'
      }
    ],
    clues: [
      {
        id: 'clue_e9_domain',
        targetArea: 'sender',
        label: '不審なドメイン（.xyz）',
        isSuspicious: true,
        explanation: '使い捨て可能な安価なドメイン（.xyz）が使われています。'
      },
      {
        id: 'clue_e9_refund_trap',
        targetArea: 'body',
        label: '「返金のためにカード情報を入力させる」手口',
        isSuspicious: true,
        explanation: '架空の請求メールを送り、驚いた被害者に「キャンセル・返金のため」と偽って本物のカード番号を入力させる手口です。'
      }
    ],
    explanation: {
      summary: '架空の請求で驚かせ、キャンセル手続きと見せかけてカード情報を盗む「返金詐欺メール」です。',
      whySafeOrSpoofed: '契約した覚えのない高額ソフトの請求書を送りつけ、慌てて「解約」ボタンを押したユーザーからクレジットカード情報や個人情報を抜き取ります。',
      psychologicalTrap: '「5万円も引き落とされては困る」という損失回避バイアスを逆手に取り、自ら偽の返金フォームへ個人情報を打ち込ませようとします。',
      checklistPoints: [
        '契約した覚えのないサービスからの「自動更新完了」メールは架空請求を疑う',
        'メール内のキャンセルリンクは押さず、手元のクレジットカードのWeb明細で実際に決済されたか確認する',
        '送信元が「.xyz」等の不審なフリー・格安ドメインでないか確認する'
      ],
      defenseRule: '身に覚えのない自動更新通知のキャンセルリンクは押さず、実際のカード明細を確認して詐欺を見破る。'
    }
  },
  {
    id: 'easy_10_hr_welcome_chat',
    difficulty: 'easy',
    medium: 'chat',
    title: '社内チャット人事担当からの新入社員歓迎会アンケート',
    senderDisplay: '人事部 中村（社内労務）',
    senderAddress: '@nakamura_hr',
    recipientDisplay: '#announcements / 社内アナウンス',
    timestamp: '本日 15:00',
    content: `お疲れ様です、人事部の中村です！
来週水曜日の夜、新しく配属されたメンバーの歓迎会（自由参加）を予定しています。
参加希望の方は、明日の夕方までにこの投稿に「👍（参加）」スタンプを押していただけますと幸いです。
会費は会社補助が出ますので、ぜひお気軽にご参加ください！`,
    isSpoofed: false,
    attackType: '正規の社内イベント案内',
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e10_channel',
        targetArea: 'body',
        label: '社内公式チャットでのスタンプ投票',
        isSuspicious: false,
        explanation: '外部サイトへの誘導や個人情報の入力を求めず、チャットのスタンプ機能で完結しています。'
      },
      {
        id: 'clue_e10_no_link',
        targetArea: 'url',
        label: '不審な外部URLなし',
        isSuspicious: false,
        explanation: '悪意あるリンクや危険な添付ファイルは一切含まれていません。'
      }
    ],
    explanation: {
      summary: '安全な「通常の社内イベントアンケート」です。',
      whySafeOrSpoofed: '社内公式チャットの認証済み人事アカウントからの連絡であり、外部URLやIDパスワードの要求もなく、チャットのスタンプ機能で完結しています。',
      psychologicalTrap: '社内行事や歓迎会の連絡に対しても過剰に警戒する必要はありません。リスクのある要素（不審なURL、ファイル、認証情報入力）がないかを確認します。',
      checklistPoints: [
        '外部URLへのリンクが存在しない',
        '社内公認アカウントからの日常的な社内行事連絡である',
        '金銭の個人的立替やギフトカード要求がない'
      ],
      defenseRule: '外部リンクや認証要求のない社内公認チャットの通常連絡は安心して対応する。'
    }
  },
  {
    id: 'easy_11_streambox_password_reset',
    difficulty: 'easy',
    medium: 'email',
    title: '動画配信サービス「StreamBox」パスワード再設定の正規案内',
    senderDisplay: 'StreamBox Security Team',
    senderAddress: 'account-security@streambox-video.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【StreamBox】パスワード再設定リクエストの確認（有効期限：30分）',
    timestamp: '本日 19:10',
    content: `StreamBoxをご利用のお客様

お客様のアカウントよりパスワード再設定のリクエストを受け付けました。
パスワードを変更される場合は、下記ボタンまたはURLより新しいパスワードを設定してください。

▼ パスワード再設定画面
https://auth.streambox-video.jp/reset-password?token=891024_auth_valid

※本メールに心当たりがない場合は、第三者が誤ってメールアドレスを入力した可能性があります。その場合は何も操作する必要はございません。現在のパスワードは安全に保持されています。

StreamBox カスタマーサポート`,
    isSpoofed: false,
    attackType: '正規のパスワード再設定案内',
    urlInfo: {
      displayText: 'https://auth.streambox-video.jp/reset-password?token=891024_auth_valid',
      actualUrl: 'https://auth.streambox-video.jp/reset-password?token=891024_auth_valid',
      isSuspicious: false
    },
    headers: {
      'From': 'StreamBox <account-security@streambox-video.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e11_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（streambox-video.jp）',
        isSuspicious: false,
        explanation: '公式サイトの正規サブドメイン（auth.streambox-video.jp）への遷移であり、ドメイン認証も完全に合格しています。'
      },
      {
        id: 'clue_e11_no_threat',
        targetArea: 'body',
        label: '「心当たりがない場合は放置で安全」の明記',
        isSuspicious: false,
        explanation: '詐欺メールは「今すぐリンクを押さないと停止」と脅しますが、本物の再設定メールは「心当たりがなければ操作不要」と案内します。'
      }
    ],
    explanation: {
      summary: '正真正銘の「公式パスワード再設定メール」です。',
      whySafeOrSpoofed: '自分が操作した直後に届いた正規の再設定案内です。心当たりがない場合でもリンクを踏まずに放置すれば安全である旨が親切に明記されています。',
      psychologicalTrap: '自分がパスワード変更ボタンを押した直後に届いた本物のメールまで疑ってしまうと、アカウントの復旧ができなくなります。',
      checklistPoints: [
        '自分が数分以内にログイン画面から「パスワードを忘れた」操作を行ったか',
        'リンク先ドメインがサービス公式サイトと完全一致しているか',
        '身に覚えがない場合はリンクを踏まずに放置できる仕様になっているか'
      ],
      defenseRule: '自分が直前に操作して届いた正規ドメインの再設定メールは、リンク先ドメインを照合して安全に手続きする。'
    }
  },
  {
    id: 'easy_12_acropoint_expiry_scam',
    difficulty: 'easy',
    medium: 'email',
    title: '大手共通ポイント「AcroPoint」の有効期限通知',
    senderDisplay: 'AcroPoint 事務局',
    senderAddress: 'point-notice@acro-point-club.xyz',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【まもなく失効】保有中の28,500ポイントの有効期限が本日23:59で切れます',
    timestamp: '本日 16:40',
    content: `いつもAcroPointをご利用いただきありがとうございます。

お客様が保有されている限定ボーナスポイント（28,500 pt = 28,500円相当）の有効期限が、本日23:59をもって完全失効いたします。

至急、下記特設サイトより提携ギフト券または電子マネーへの交換手続きを完了してください。
期限を過ぎますとポイントは消滅し、再付与はできません。

▼ ポイント即時交換はこちら
https://acropoint-bonus-exchange.xyz/claim?user=8812`,
    isSpoofed: true,
    attackType: 'ポイント失効焦燥型フィッシング詐欺',
    urlInfo: {
      displayText: 'https://acropoint-bonus-exchange.xyz/claim?user=8812',
      actualUrl: 'https://acropoint-bonus-exchange.xyz/claim?user=8812',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '約3万円相当のポイントへの執着',
        description: '「28,500円分損したくない」という損失回避バイアスを激しく刺激する。'
      },
      {
        type: 'urgency',
        label: '本日23:59で消滅というタイムリミット',
        description: '今日中にやらないと消えると焦らせ、ポイントカードアプリで残高を確認させない。'
      }
    ],
    clues: [
      {
        id: 'clue_e12_domain',
        targetArea: 'sender',
        label: '不審な新規ドメイン（.xyz）',
        isSuspicious: true,
        explanation: '大手ポイントサービスを名乗りながら、安価な捨てドメイン「.xyz」が使用されています。'
      },
      {
        id: 'clue_e12_url',
        targetArea: 'url',
        label: 'ログイン情報詐取用の偽サイト',
        isSuspicious: true,
        explanation: 'アクセスするとID、パスワード、クレジットカード番号、暗証番号を入力させられます。'
      }
    ],
    explanation: {
      summary: 'ポイント失効を騙ってクレカ情報やIDを盗む「ポイント交換詐欺メール」です。',
      whySafeOrSpoofed: '「約3万円分のポイントが消える」と焦らせ、偽サイトで個人情報やクレジットカード情報を入力させようとします。送信元も「.xyz」の怪しいドメインです。',
      psychologicalTrap: '「せっかく溜まったポイントを捨てるのはもったいない！」という損得勘定に付け込み、警戒心を吹き飛ばします。',
      checklistPoints: [
        'メールのリンクを押さず、スマートフォンの公式ポイントアプリを開いて実際の保有ポイントを確認する',
        '突然「2万ポイント以上たまっている」という美味しい話はまず詐欺を疑う',
        '送信元アドレスが「.xyz」「.top」などの格安ドメインになっていないか確認する'
      ],
      defenseRule: 'ポイント失効メールのリンクは絶対に開かず、公式アプリから残高と有効期限を直接確認する。'
    }
  },
  {
    id: 'easy_13_sakura_bank_short_url_sms',
    difficulty: 'easy',
    medium: 'sms',
    title: 'サクラ中央銀行からのお取引確認案内SMS',
    senderDisplay: '090-4129-XXXX',
    senderAddress: '090-4129-XXXX',
    recipientDisplay: 'あなたのスマートフォン',
    timestamp: '本日 12:10',
    content: `【サクラ中央銀行】お客様のお取引に不正アクセスの恐れがあるため口座を一時凍結いたしました。本人確認を行わない場合、出金が停止されます。
ご確認はこちら：https://bit.ly/sakura-secure-check`,
    isSpoofed: true,
    attackType: 'スミッシング（短縮URL悪用銀行詐欺）',
    urlInfo: {
      displayText: 'https://bit.ly/sakura-secure-check',
      actualUrl: 'http://sakura-bank-portal-phish.biz/login',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '口座凍結・出金停止の恐怖',
        description: '「銀行口座が使えなくなる」という生活に直結する恐怖でパニックに陥れる。'
      },
      {
        type: 'urgency',
        label: '直ちに本人確認を強要',
        description: '焦ってリンクを踏ませ、本当の銀行の公式サイトを検索する時間を奪う。'
      }
    ],
    clues: [
      {
        id: 'clue_e13_short_url',
        targetArea: 'url',
        label: '短縮URL（bit.ly）の悪用',
        isSuspicious: true,
        explanation: '正規の銀行が顧客の口座停止という重大通知で「bit.ly」などの無料短縮URLを使うことは絶対にありません。'
      },
      {
        id: 'clue_e13_sender',
        targetArea: 'sender',
        label: '個人携帯番号（090）からの送信',
        isSuspicious: true,
        explanation: '銀行が個人の携帯電話回線から口座凍結SMSを送ることはありません。'
      }
    ],
    explanation: {
      summary: '短縮URLを悪用して偽の銀行ログイン画面へ誘導する「銀行スミッシング詐欺」です。',
      whySafeOrSpoofed: '個人携帯番号から送信され、リンク先も「bit.ly」で隠蔽されています。開くと偽のインターネットバンキング画面が表示され、店番号・口座番号・ログイン暗証番号・ワンタイムパスワードが盗まれます。',
      psychologicalTrap: '「口座凍結」というパニックワードで思考を停止させ、短縮URLの怪しさに気付かせないようにします。',
      checklistPoints: [
        '短縮URL（bit.lyやtinyurl等）が使われている銀行SMSは100%詐欺',
        '個人の携帯番号から届いた銀行通知は信用しない',
        '口座状況はキャッシュカード裏面の電話番号か、公式バンキングアプリから直接確認する'
      ],
      defenseRule: '短縮URLが記載された銀行SMSは絶対に開かず、公式アプリから口座ステータスを確認する。'
    }
  },
  {
    id: 'easy_14_internal_portal_maintenance',
    difficulty: 'easy',
    medium: 'email',
    title: '社内ポータルシステム定期保守メンテナンスの事前周知',
    senderDisplay: '社内IT運用センター',
    senderAddress: 'it-maintenance@aoba-next.jp',
    recipientDisplay: '全社従業員各位',
    subject: '【保守周知】11月10日（日）社内ポータル定期メンテナンスに伴う一時停止について',
    timestamp: '2026年11月01日 11:00',
    content: `全社従業員各位

お疲れ様です。IT運用センターです。
システム安定運用のための定期サーバーメンテナンスを下記日時にて実施いたします。

■ 停止日時
2026年11月10日（日）午前02:00 〜 午前06:00（4時間）

■ 影響範囲
社内グループウェア、経費精算申請、社内ファイルサーバーの全機能が一時的にご利用いただけなくなります。
※作業に伴う各従業員様側での設定変更やログイン操作等は一切ございません。

ご不便をおかけいたしますが、ご理解とご協力のほどよろしくお願い申し上げます。

アオバネクスト株式会社 IT運用センター`,
    isSpoofed: false,
    attackType: '正規の社内システム保守通知',
    headers: {
      'From': 'IT運用センター <it-maintenance@aoba-next.jp>',
      'Authentication-Results': 'spf=pass (local internal mail gateway)'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e14_domain',
        targetArea: 'sender',
        label: '自社正規ドメイン（@aoba-next.jp）',
        isSuspicious: false,
        explanation: '自社の正規社内ドメインから送信されており、偽装はありません。'
      },
      {
        id: 'clue_e14_no_link',
        targetArea: 'body',
        label: '外部リンクやログイン要請がゼロ',
        isSuspicious: false,
        explanation: '「各従業員様側での設定変更やログイン操作は一切ない」と明記され、純粋な事前告知です。'
      }
    ],
    explanation: {
      summary: '完全に安全な「社内定期サーバーメンテナンスの公式告知」です。',
      whySafeOrSpoofed: '送信元が自社ドメイン（aoba-next.jp）であり、本文中に外部URLやファイル添付が一切なく、ユーザーに行動を強いる文言もありません。',
      psychologicalTrap: 'IT部門からのメールを何でもかんでも攻撃と誤認してしまうと、システムの停止スケジュールを把握できず深夜作業等で業務に支障が出ます。',
      checklistPoints: [
        '自社の正規社内ドメインから届いているか',
        '外部リンクを踏ませたり、ID/パスワードの入力を求めていないか',
        '深夜の通常業務外時間帯の定期メンテナンス告知であるか'
      ],
      defenseRule: '外部リンクや操作要求のない社内ドメインからの定期保守通知は、予定を確認して通常通り業務を進行する。'
    }
  },
  {
    id: 'easy_15_skywing_flight_receipt',
    difficulty: 'easy',
    medium: 'email',
    title: 'スカイウィング国内線航空券の発券完了通知',
    senderDisplay: 'スカイウィング航空 予約センター',
    senderAddress: 'ticket-service@skywing-airlines.co.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【スカイウィング】国内線航空券のご購入完了・eチケット控えのご案内',
    timestamp: '本日 13:45',
    content: `スカイウィングをご利用いただきありがとうございます。
航空券のご購入手続きが正常に完了いたしました。

■ ご予約内容
予約番号：SKW-88192
便名：SW105便（羽田 → 福岡）
ご搭乗日：2026年11月15日（土）09:30発
お支払い金額：¥14,200（決済完了）

ご搭乗手続きは、空港の自動チェックイン機または公式アプリの2次元バーコードより直接行っていただけます。
ご予約の確認・座席指定は公式サイトの予約管理メニューよりご確認いただけます。
https://www.skywing-airlines.co.jp/booking/my-flight

スカイウィング航空 カスタマーサポート`,
    isSpoofed: false,
    attackType: '正規の航空券発券控え通知',
    urlInfo: {
      displayText: 'https://www.skywing-airlines.co.jp/booking/my-flight',
      actualUrl: 'https://www.skywing-airlines.co.jp/booking/my-flight',
      isSuspicious: false
    },
    headers: {
      'From': 'スカイウィング航空 <ticket-service@skywing-airlines.co.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e15_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（skywing-airlines.co.jp）',
        isSuspicious: false,
        explanation: '公式正規ドメインからDKIM/DMARC署名付きで正当に送信されています。'
      },
      {
        id: 'clue_e15_url',
        targetArea: 'url',
        label: '予約管理URLが公式サイトと一致',
        isSuspicious: false,
        explanation: '表示URLと遷移先URLが完全に同一であり、怪しい外部ドメインはありません。'
      }
    ],
    explanation: {
      summary: '安全な「正規の航空券予約完了・発券控え通知」です。',
      whySafeOrSpoofed: '送信元アドレスが公式ドメインであり、実際に自身が出張や旅行で予約したフライト情報と合致しています。不審なカード番号の再入力要求等もありません。',
      psychologicalTrap: 'チケットや金額の記載があるだけで条件反射的に怪しむのではなく、自分が申し込んだ事実があるか、ドメインが一致しているかを照合します。',
      checklistPoints: [
        '自分が実際に購入した搭乗日時・路線と合致しているか',
        '決済完了の報告であり、追加の不審な支払いを要求していないか',
        'リンク先が公式サイトの「co.jp」ドメインであるか'
      ],
      defenseRule: '心当たりのある予約完了通知は、正規ドメインと予約番号を確認して安全に利用する。'
    }
  },
  {
    id: 'easy_16_mercat_account_restrict_scam',
    difficulty: 'easy',
    medium: 'email',
    title: 'フリマアプリ「Mercat」アカウント利用制限のお知らせ',
    senderDisplay: 'Mercat お客様サポートセンター',
    senderAddress: 'support-verify@merc-at-jp-notice.club',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【重要なお知らせ】お客様のMercatアカウント利用を一時制限いたしました',
    timestamp: '本日 04:12',
    content: `いつもMercatをご利用いただきありがとうございます。

セキュリティシステムによるモニタリングの結果、お客様のアカウントにおいて利用規約に抵触する恐れのある不審なアクセスが確認されました。
現在、出品・購入および売上金の出金手続きを制限しております。

制限を解除しアカウントの通常利用を再開するには、下記専用リンクよりご本人様確認およびクレジットカードの再登録をお願いいたします。

▼ アカウント利用制限の解除
https://mercat-user-verify.club/unlock?token=99281

※24時間以内にご対応いただけない場合、アカウントは永久利用停止となります。`,
    isSpoofed: true,
    attackType: 'フリマアプリ偽装フィッシング（売上金凍結脅迫）',
    urlInfo: {
      displayText: 'https://mercat-user-verify.club/unlock?token=99281',
      actualUrl: 'https://mercat-user-verify.club/unlock?token=99281',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '売上金没収・アカウント永久停止の恐怖',
        description: '「売上金が引き出せなくなる」「永久停止」と脅してパニックを起こさせる。'
      },
      {
        type: 'urgency',
        label: '早朝のメール着信と24時間制限',
        description: '早朝の寝起きで頭が働かない時間帯にタイムリミットを突きつける。'
      }
    ],
    clues: [
      {
        id: 'clue_e16_domain',
        targetArea: 'sender',
        label: '怪しい新ドメイン（.club）',
        isSuspicious: true,
        explanation: '正規のフリマ事業者が「.club」などの格安・使い捨てドメインを使用することはありません。'
      },
      {
        id: 'clue_e16_threat',
        targetArea: 'body',
        label: 'クレジットカードの再登録要求',
        isSuspicious: true,
        explanation: '本人確認と称してクレジットカード情報（番号・有効期限・セキュリティコード）を盗み取る典型的な詐欺です。'
      }
    ],
    explanation: {
      summary: 'フリマアプリを装って売上金凍結を脅す「クレカ情報搾取フィッシング」です。',
      whySafeOrSpoofed: '送信元もリンク先も「.club」という偽装ドメインです。解除のためと騙してクレジットカード情報を入力させ、不正利用を行います。',
      psychologicalTrap: '「早く解除しないと出品中の商品や売上金が消えてしまう」という強い焦りを生み出し、偽ドメインであることの確認を怠らせます。',
      checklistPoints: [
        'フリマアプリの公式からのお知らせは、必ずアプリ内の「お知らせ一覧」に全く同じものが届いている',
        'メールのリンクからは絶対にログインせず、公式アプリを直接起動して状況を確認する',
        '「.club」「.xyz」「.top」などのドメインは公式では絶対に使われない'
      ],
      defenseRule: 'アカウント制限通知はメール内リンクを開かず、必ずスマホの公式アプリ内お知らせで真偽を確認する。'
    }
  },
  {
    id: 'easy_17_colleague_study_session_chat',
    difficulty: 'easy',
    medium: 'chat',
    title: '社内チャットでの社内勉強会スライド資料の共有',
    senderDisplay: '井上 雅人（技術戦略室）',
    senderAddress: '@inoue_tech',
    recipientDisplay: '#tech-study / 社内チャンネル',
    timestamp: '本日 16:30',
    content: `お疲れ様です！本日の「ゼロトラストセキュリティ基礎勉強会」にご参加いただいた皆様、ありがとうございました！
発表で使用した投影スライドのPDFを社内Googleドライブに格納しましたので共有します。
復習や部内での共有にご自由にお使いください！
https://drive.google.com/a/aoba-next.jp/file/d/189281a_sec_slide/view`,
    isSpoofed: false,
    attackType: '正規の社内勉強会資料共有',
    urlInfo: {
      displayText: 'https://drive.google.com/a/aoba-next.jp/file/d/189281a_sec_slide/view',
      actualUrl: 'https://drive.google.com/a/aoba-next.jp/file/d/189281a_sec_slide/view',
      isSuspicious: false
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e17_workspace',
        targetArea: 'url',
        label: '社内組織限定のGoogleドライブURL（a/aoba-next.jp）',
        isSuspicious: false,
        explanation: '社内認証（aoba-next.jpテナント）が適用された安全なクラウドストレージ共有リンクです。'
      },
      {
        id: 'clue_e17_context',
        targetArea: 'body',
        label: '直前に実施された社内勉強会の文脈と合致',
        isSuspicious: false,
        explanation: '本日実際に開催された勉強会の登壇者本人からのスライド共有であり、金銭やパスワードの要求はありません。'
      }
    ],
    explanation: {
      summary: '安全な「正規の社内勉強会資料共有チャット」です。',
      whySafeOrSpoofed: '認証済み同僚からの社内公式チャット内での発言であり、共有リンクも自社テナント限定のクラウドストレージURLです。危険なマクロや実行可能ファイルではありません。',
      psychologicalTrap: 'クラウドストレージのリンクがあるからといって全てを疑うと、業務上の資料共有やノウハウ共有がストップしてしまいます。',
      checklistPoints: [
        '実際に参加した社内勉強会の登壇者本人からの共有であるか',
        '自社の組織テナント（aoba-next.jp）が設定された社内リンクであるか',
        '不審な個人情報や外部ログイン情報の入力を求めていないか'
      ],
      defenseRule: '業務の文脈に沿った社内公認テナントの資料共有リンクは、送信者と内容を確認して安全に活用する。'
    }
  },
  {
    id: 'easy_18_power_outage_sms_scam',
    difficulty: 'easy',
    medium: 'sms',
    title: '東都電力からの電気料金お支払い案内SMS',
    senderDisplay: '080-3391-XXXX',
    senderAddress: '080-3391-XXXX',
    recipientDisplay: 'あなたのスマートフォン',
    timestamp: '本日 17:15',
    content: `【東都電力】未納料金の最終督促です。本日中に下記リンクよりお支払いが確認できない場合、明日午前9時より送電を停止いたします。
http://toto-electric-bill.top/pay`,
    isSpoofed: true,
    attackType: 'スミッシング（ライフライン停止脅迫型詐欺）',
    urlInfo: {
      displayText: 'http://toto-electric-bill.top/pay',
      actualUrl: 'http://toto-electric-bill.top/pay',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'fear',
        label: '「電気を止められる」という生活インフラの恐怖',
        description: '明日の朝電気が使えなくなるという強いプレッシャーで冷静さを奪う。'
      },
      {
        type: 'urgency',
        label: '本日中の最終督促期限',
        description: '今日中に支払えと急かし、家族や電力会社窓口に相談する時間を奪う。'
      }
    ],
    clues: [
      {
        id: 'clue_e18_domain',
        targetArea: 'url',
        label: '非暗号化「http://」と格安ドメイン（.top）',
        isSuspicious: true,
        explanation: '大手電力会社が公共料金の支払いに「http://」かつ「.top」の怪しいURLを使うことはあり得ません。'
      },
      {
        id: 'clue_e18_phone',
        targetArea: 'sender',
        label: '個人携帯番号からのSMS発信',
        isSuspicious: true,
        explanation: '電力会社が携帯電話回線（080）から突然送電停止を脅すSMSを送ることはありません。'
      }
    ],
    explanation: {
      summary: 'ライフライン停止を脅して電子マネーやカード情報を盗む「電力会社偽装SMS詐欺」です。',
      whySafeOrSpoofed: '個人番号から送信され、格安ドメイン「.top」の非SSLサイトへ誘導しています。正規の電力会社は書面での督促が基本であり、SMSで突然送電停止を宣告することはありません。',
      psychologicalTrap: '「電気が止まったら冷蔵庫の中身もエアコンもダメになる」という生活上の恐怖を突きつけ、確認を急がせます。',
      checklistPoints: [
        '電力会社を名乗るSMSのURLは絶対に開かない',
        '電気料金の支払状況は、毎月の検針票や契約中のマイページ公式サイトから直接確認する',
        '支払方法としてVプリカやギフトカードを要求してきたら100%詐欺'
      ],
      defenseRule: '公共料金未払いSMSのURLは開かず、契約中の電力会社の公式マイページまたは請求書控えで確認する。'
    }
  },
  {
    id: 'easy_19_cloudsync_storage_80_alert',
    difficulty: 'easy',
    medium: 'email',
    title: 'クラウドストレージ「CloudSync」容量80%到達アラート通知',
    senderDisplay: 'CloudSync Storage Team',
    senderAddress: 'storage-alert@cloudsync-storage.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【お知らせ】CloudSync の保存容量が80%に達しました',
    timestamp: '本日 11:20',
    content: `いつもCloudSyncをご利用いただきありがとうございます。

お客様のアカウントの保存容量が上限の80%（16.2GB / 20.0GB）に達したためお知らせいたします。

容量が100%に達した場合、新しいファイルの同期およびアップロードが一時的に停止いたします。
不要なファイルを整理していただくか、必要に応じて追加容量プランをご検討ください。

現在のファイル使用状況はアカウント設定画面よりご確認いただけます。
https://www.cloudsync-storage.jp/settings/storage

※本メールは容量状況をお知らせする自動通知です。直ちにデータが削除されることはございません。

CloudSync サポートチーム`,
    isSpoofed: false,
    attackType: '正規のストレージ容量アラート通知',
    urlInfo: {
      displayText: 'https://www.cloudsync-storage.jp/settings/storage',
      actualUrl: 'https://www.cloudsync-storage.jp/settings/storage',
      isSuspicious: false
    },
    headers: {
      'From': 'CloudSync <storage-alert@cloudsync-storage.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_e19_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（cloudsync-storage.jp）',
        isSuspicious: false,
        explanation: 'サービス公式の正規ドメインから送信されており、認証ヘッダーもすべてpassしています。'
      },
      {
        id: 'clue_e19_safe_tone',
        targetArea: 'body',
        label: '「直ちにデータが削除されることはない」と明記',
        isSuspicious: false,
        explanation: '詐欺メールと異なり、脅迫や即時の金銭支払いを強いる文言がなく、ユーザーへの親切な事前警告です。'
      }
    ],
    explanation: {
      summary: '安全な「正規のクラウドストレージ容量アラート通知」です。',
      whySafeOrSpoofed: '送信元および案内先リンクが公式ドメイン（cloudsync-storage.jp）であり、「直ちにデータ削除されることはない」と冷静な運用案内がされています。',
      psychologicalTrap: '警告マークやアラートという単語に過敏に反応して詐欺と決めつけてしまうと、実際にファイル同期が停止して困ることになります。',
      checklistPoints: [
        '送信元アドレスが公式ドメインと合致しているか',
        '無理な即時課金を強制せず、不要ファイルの削除という選択肢が提示されているか',
        '「直ちにデータは消えない」という安心させる事実が書かれているか'
      ],
      defenseRule: '正規ドメインからの容量アラートは、公式設定画面でファイル使用量を確認して適切に整理する。'
    }
  },
  {
    id: 'easy_20_lucky_winner_popup',
    difficulty: 'easy',
    medium: 'browser_alert',
    title: 'オンライン感謝祭：最新スマートフォン特別当選のお知らせ',
    senderDisplay: 'オンライン感謝祭キャンペーン抽選委員会',
    senderAddress: 'lucky-winner-rewards-2026.club',
    recipientDisplay: '全画面ポップアップ',
    timestamp: 'リアルタイム検出',
    content: `🎉 おめでとうございます！あなたは本日のラッキービジターに選ばれました！

簡単なアンケート（全3問）に答えるだけで、最新フラッグシップスマートフォン「ProPhone 16」をプレゼント！
本日限定・残り当選枠：あと1台！

▼ 今すぐプレゼントを受け取る
https://lucky-winner-rewards-2026.club/claim?id=WIN_8819

※送料（100円）のお支払いのため、次の画面でクレジットカード情報をご入力ください。`,
    isSpoofed: true,
    attackType: '当選詐欺（アンケート・フィッシング詐欺）',
    urlInfo: {
      displayText: 'https://lucky-winner-rewards-2026.club/claim?id=WIN_8819',
      actualUrl: 'https://lucky-winner-rewards-2026.club/claim?id=WIN_8819',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '「最新スマホが無料でもらえる」という強い物欲',
        description: '高価なスマートフォンがタダで手に入るという思わぬ幸運で警戒心を麻痺させる。'
      },
      {
        type: 'urgency',
        label: '「本日限定・残り1台」というカウントダウン',
        description: '早く申し込まないと誰かに取られてしまうと焦らせ、調べる隙を与えない。'
      }
    ],
    clues: [
      {
        id: 'clue_e20_shipping_fee',
        targetArea: 'body',
        label: '「送料100円の支払いのためクレカ番号を入力」',
        isSuspicious: true,
        explanation: '「送料100円だけ」と油断させ、入力されたカード情報から高額な海外サブスクリプションを自動契約させる典型的な当選詐欺です。'
      },
      {
        id: 'clue_e20_random',
        targetArea: 'body',
        label: '応募した覚えのない抽選の当選',
        isSuspicious: true,
        explanation: '自分が応募すらしていない懸賞に「突然当選する」ことは現実世界では100%あり得ません。'
      }
    ],
    explanation: {
      summary: 'アンケートを装ってクレジットカード情報を盗み取る「当選詐欺ポップアップ」です。',
      whySafeOrSpoofed: '「最新スマホ当選」と歓喜させ、送料100円の決済と称してクレジットカード情報を盗みます。入力すると毎月1万円以上の不正引き落としが始まります。',
      psychologicalTrap: '「100円くらいなら払ってもスマホがもらえるなら得だ」という欲求の隙を突かれます。',
      checklistPoints: [
        '応募した覚えのない懸賞やキャンペーンに当選することは絶対にない',
        '「送料だけ支払ってください」とクレカ番号を入れさせる手口は典型的な詐欺',
        'ブラウザのタブを即座に閉じることで被害を完全に防げる'
      ],
      defenseRule: '応募していない「当選・プレゼント」画面は即座にタブを閉じ、クレジットカード番号は絶対に入力しない。'
    }
  }
];
