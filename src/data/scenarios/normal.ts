import { Scenario } from '../../types/game';

export const NORMAL_SCENARIOS: Scenario[] = [
  {
    id: 'normal_01_it_sso_update',
    difficulty: 'normal',
    medium: 'email',
    title: '社内情報システム部からのSSO証明書更新通知',
    senderDisplay: '社内ITヘルプデスク <it-support@aoba-next.jp.id-auth.net>',
    senderAddress: 'it-support@aoba-next.jp.id-auth.net',
    recipientDisplay: 'アオバネクスト全社従業員各位',
    subject: '【重要・本日中対応】シングルサインオン(SSO)証明書更新に伴う再認証のお願い',
    timestamp: '本日 10:10',
    content: `アオバネクスト全社従業員各位

平素より社内ITインフラの安定運用にご協力いただきありがとうございます。
本日、全社シングルサインオン(SSO)システムのセキュリティ証明書更新作業を実施いたします。

つきましては、業務への影響を防ぐため、全社員の皆様に本日18:00までに下記の特設ポータルより一度ログインを行い、再認証トークンの更新を行っていただく必要があります。

■ SSO再認証ポータル
https://aoba-next-sso-auth.net/login?token=req_8921

期限内に再認証が完了しない場合、明日以降の全社ポータルおよびメールが利用停止となります。

情報システム管理部
内線: 3901`,
    isSpoofed: true,
    attackType: '社内なりすましフィッシング（クレデンシャル詐取）',
    urlInfo: {
      displayText: 'https://aoba-next-sso-auth.net/login?token=req_8921',
      actualUrl: 'https://aoba-next-sso-auth.net/login?token=req_8921',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '情シス（IT部門）の権威',
        description: '「会社の指示だから従わなければならない」という社内ヒエラルキーへの服従心理を突く。'
      },
      {
        type: 'urgency',
        label: '本日18時までの締切',
        description: '「明日以降メールが止まる」と脅して、情シスへの電話確認をする余裕を奪う。'
      },
      {
        type: 'social_proof',
        label: '全社一斉対応の同調',
        description: '「全社員が対象」とすることで、自分だけやらないわけにはいかないと思わせる。'
      }
    ],
    clues: [
      {
        id: 'clue_n1_domain',
        targetArea: 'sender',
        label: '巧妙なサブドメイン偽装（id-auth.net）',
        isSuspicious: true,
        explanation: 'アドレスの前半に「aoba-next.jp」が入っていますが、真のメインドメインは「id-auth.net」という外部の怪しいドメインです。'
      },
      {
        id: 'clue_n1_threat',
        targetArea: 'body',
        label: '「明日以降メールが利用停止」という業務停止脅迫',
        isSuspicious: true,
        explanation: '通常、社内の認証基盤更新で突然全社員に外部URLでの再認証を本日中に強いる運用はありません。'
      },
      {
        id: 'clue_n1_contact',
        targetArea: 'body',
        label: '記載された内線番号の真偽',
        isSuspicious: true,
        explanation: 'メール記載の内線ではなく、社内電話帳で正式に公開されているIT部門の内線に確認すべきです。'
      }
    ],
    explanation: {
      summary: '社内情シスを装った極めて巧妙な「クレデンシャルフィッシング攻撃」です。',
      whySafeOrSpoofed: '送信元アドレスのドメインが自社ドメイン（@aoba-next.jp）ではなく、「aoba-next.jp.id-auth.net」という偽装サブドメインです。アクセスすると会社のIDとパスワードが盗まれます。',
      psychologicalTrap: '「情シスの指示」「今日中にやらないとメール停止」「全社員対象」という、権威・緊急性・同調圧力の3重コンボを仕掛けています。',
      checklistPoints: [
        'サブドメインの罠を見抜く：@の直後の単語ではなく、末尾の「.net」「.com」の手前のメインドメインを確認する',
        '社内システムの更新連絡は、メール記載のURLを踏むのではなく社内グループウェアの公式お知らせ掲示板を確認する',
        'メールに書かれた内線番号にかけず、社内ポータル等に掲載されている既知の内線番号に問い合わせる'
      ],
      defenseRule: '全社アカウント更新等の指示は、メール内リンクを開かず、社内ポータルのお知らせ一覧や既知の内線で事実確認を行う。'
    }
  },
  {
    id: 'normal_02_google_security_alert',
    difficulty: 'normal',
    medium: 'email',
    title: 'クラウド基盤「OmniCloud」からの正規セキュリティ通知',
    senderDisplay: 'OmniCloud Security',
    senderAddress: 'no-reply@accounts.omnicloud-portal.com',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'セキュリティ通知：新しいPC端末からログインがありました',
    timestamp: '本日 08:30',
    content: `OmniCloud アカウントに新しいログインがありました

ユーザー様

お使いの OmniCloud アカウント（user@aoba-next.jp）に、新しい PC デバイスからのログインが検出されました。

日時：2026年10月29日 08:28 (JST)
デバイス：CoreOS 11 (Browser)
場所：東京都 千代田区（IP: 133.242.xx.xx）

ご自身によるログインの場合は、特別なご対応は必要ありません。
心当たりがない場合は、アカウントのセキュリティ診断を行って保護してください。

https://myaccount.omnicloud-portal.com/notifications

Omni Technologies Inc.`,
    isSpoofed: false,
    attackType: '正規のセキュリティ診断通知',
    urlInfo: {
      displayText: 'https://myaccount.omnicloud-portal.com/notifications',
      actualUrl: 'https://myaccount.omnicloud-portal.com/notifications',
      isSuspicious: false
    },
    headers: {
      'From': 'OmniCloud <no-reply@accounts.omnicloud-portal.com>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass action=none header.from=accounts.omnicloud-portal.com'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n2_sender',
        targetArea: 'sender',
        label: '正規の送信ドメイン（@accounts.omnicloud-portal.com）',
        isSuspicious: false,
        explanation: 'プラットフォームの公式認証通知ドメインであり、SPF/DKIM/DMARCがすべてpassしています。'
      },
      {
        id: 'clue_n2_url',
        targetArea: 'url',
        label: '公式ドメインへの案内（myaccount.omnicloud-portal.com）',
        isSuspicious: false,
        explanation: '遷移先はプラットフォーム公式の正規アカウント管理ページ（myaccount.omnicloud-portal.com）です。'
      },
      {
        id: 'clue_n2_content',
        targetArea: 'body',
        label: '「ご自身の場合は対応不要」の記載',
        isSuspicious: false,
        explanation: '詐欺メールは全員にリンクをクリックさせようとしますが、正規のログイン通知は「心当たりがあれば対応不要」と明記します。'
      }
    ],
    explanation: {
      summary: 'これは正当な「プラットフォーム公式セキュリティ通知」です。',
      whySafeOrSpoofed: '送信元およびリンク先が正規ドメインです。心当たりがある自身のログインであれば放置して問題ありません。',
      psychologicalTrap: '「セキュリティ通知」という件名だけでスパムと決めつけて削除してしまうと、実際に第三者に不正ログインされていた場合に見逃す危険（見逃しリスク）があります。',
      checklistPoints: [
        '「ご自身によるログインの場合は対応不要」という選択肢が提示されているか',
        'リンク先ドメインが公式の「omnicloud-portal.com」であるか',
        'もし不安な場合はメールのリンクを踏まず、自分でブラウザを開いてアカウント設定の「セキュリティ」タブを確認する'
      ],
      defenseRule: '正規のログイン通知は「心当たりがあるログインか」を冷静に照合し、身に覚えがない時だけ公式セキュリティ設定からパスワード変更を行う。'
    }
  },
  {
    id: 'normal_03_tax_agency_refund',
    difficulty: 'normal',
    medium: 'email',
    title: '中央租税管理庁からの所得税過誤納還付金案内',
    senderDisplay: '中央租税管理庁 e-Tax窓口',
    senderAddress: 'info@tax-refund-agency-japan.org',
    recipientDisplay: '納税者各位',
    subject: '【重要】令和7年度 所得税過誤納金の還付のお知らせ（受取期限：3日以内）',
    timestamp: '昨日 16:45',
    content: `中央租税管理庁からのお知らせ

令和7年度の確定申告および税額照会の結果、あなた様宛ての所得税について過誤納金（還付金）が発生しております。

還付金額：¥48,200円
受取期限：本メール受領後72時間以内

下記の公的還付金受取ポータルにて、振込先金融機関口座およびご本人様確認情報をご登録ください。
https://tax-refund-agency-japan.org/claim?id=TAX8921

※期限を過ぎた場合、税務関連法規に基づき還付請求権が消滅しますのでご注意ください。

中央租税管理庁 税務総務部`,
    isSpoofed: true,
    attackType: '公的機関なりすましフィッシング（還付金詐欺）',
    urlInfo: {
      displayText: 'https://tax-refund-agency-japan.org/claim?id=TAX8921',
      actualUrl: 'https://tax-refund-agency-japan.org/claim?id=TAX8921',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '利得・還付金の誘惑',
        description: '「4万8千円戻ってくる」という思わぬ利益への期待で警戒心を緩めさせる。'
      },
      {
        type: 'authority',
        label: '公的行政機関・法規条文の権威',
        description: '「中央租税管理庁」「税務関連法規」など難解な法律名を騙って信憑性を高め、逆らえない印象を与える。'
      },
      {
        type: 'urgency',
        label: '72時間で権利消滅の脅し',
        description: '期限を短く設定し、税務窓口への事実確認をさせずに手続きを急がせる。'
      }
    ],
    clues: [
      {
        id: 'clue_n3_domain',
        targetArea: 'sender',
        label: '送信元ドメイン（.org）',
        isSuspicious: true,
        explanation: '日本の政府・行政機関の公式ドメインは必ず「.go.jp」です。民間ドメイン（.orgや.com）は絶対に使用されません。'
      },
      {
        id: 'clue_n3_procedure',
        targetArea: 'body',
        label: 'メールで還付金の口座入力を求める手口',
        isSuspicious: true,
        explanation: '行政機関が個別の還付金受取手続きを民間ドメインのメールで案内し、口座番号や暗証番号を入力させることは一切ありません。'
      }
    ],
    explanation: {
      summary: '行政機関を名乗る「典型的な公的機関なりすまし還付金詐欺」です。',
      whySafeOrSpoofed: '日本の政府機関・省庁の公式URLは必ず「go.jp」（Government of Japan）で終わります。「.org」「.com」のURLは100%偽サイトです。暗証番号や口座情報を盗まれます。',
      psychologicalTrap: '「お金がもらえる（利得）」という嬉しい情報と、「72時間で消滅する（損失回避）」という焦りの心理を巧みに組み合わせ、公的権威で信用させようとしています。',
      checklistPoints: [
        '日本の官公庁（省庁・税務署・自治体機関）のドメインは例外なく「〇〇.go.jp」である',
        '行政窓口はメールで直接口座番号やクレジットカード情報の入力を求めることはない',
        '税金に関する通知は、公式のポータルに直接ログインして「メッセージボックス」で確認する'
      ],
      defenseRule: '行政機関を名乗るメールのドメインが「go.jp」以外であれば即座に詐欺と判断し破棄する。'
    }
  },
  {
    id: 'normal_04_bank_otp_sms',
    difficulty: 'normal',
    medium: 'sms',
    title: 'セントラル大洋銀行の正規ワンタイムパスワードSMS',
    senderDisplay: 'セントラル大洋銀行 (CTBC)',
    senderAddress: '0120-86-XXXX',
    recipientDisplay: 'あなたのスマートフォン',
    timestamp: '本日 15:30',
    content: `【セントラル大洋銀行】振込ワンタイムパスワード

認証コード：839201
（有効期限：10分間）

※このパスワードを他人に教えたり、電話で伝えたりすることは絶対にしないでください。当行行員がパスワードをお尋ねすることはございません。
お心当たりのない場合は、カード裏面のフリーダイヤルまで至急ご連絡ください。`,
    isSpoofed: false,
    attackType: '正規の多要素認証（OTP）通知',
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n4_no_link',
        targetArea: 'body',
        label: '本文にURLリンクが一切存在しない',
        isSuspicious: false,
        explanation: '詐欺SMSと異なり、偽サイトへ誘導するためのURLが一切記載されていません。'
      },
      {
        id: 'clue_n4_warning',
        targetArea: 'body',
        label: '「他人に教えるな・行員も聞かない」という警告文',
        isSuspicious: false,
        explanation: '正規の銀行SMSは、ユーザーが詐欺被害に遭わないよう自己完結したコードと注意喚起を明記します。'
      }
    ],
    explanation: {
      summary: '安全な「正規の銀行ワンタイムパスワードSMS」です。',
      whySafeOrSpoofed: '偽サイトへ誘導するリンクが一切なく、ユーザー自身が直前に行った振込操作等に対する正規の二要素認証コードです。',
      psychologicalTrap: '自分が操作した直後に届いたものであれば正常です。ただし、「自分が何もしていないのに突然届いた」場合は、第三者が自分のID/PWを使ってログインを試みているサインですので、コードは誰にも伝えずパスワードを変更する必要があります。',
      checklistPoints: [
        'リンクが貼られていない（偽サイトへ誘導する目的がない）',
        '「銀行員がパスワードを聞くことはない」という正規の防犯文言がある',
        '万が一身に覚えがない場合は、SMS内の連絡先ではなくキャッシュカード裏面の電話番号に連絡する'
      ],
      defenseRule: 'リンクのない正規OTPコードは、自分が操作した画面にのみ入力し、第三者や電話口では絶対に口外しない。'
    }
  },
  {
    id: 'normal_05_infected_zip_invoice',
    difficulty: 'normal',
    medium: 'email',
    title: '取引先パートナーからの請求書（暗号化ZIP）添付メール',
    senderDisplay: '鈴木 一郎 <ichiro.suzuki@minato-bussan.co.jp.bizmail-relay.com>',
    senderAddress: 'ichiro.suzuki@minato-bussan.co.jp.bizmail-relay.com',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'Re: 10月度ご請求書の件（添付ファイルパスワード別途送付）',
    timestamp: '本日 13:50',
    content: `お世話になっております。ミナト物産の鈴木です。

先ほどお電話でお話しした10月度のお取引に関するご請求書を添付いたしました。
ご確認のほどよろしくお願い申し上げます。

添付ファイル：Invoice_202610_Signed.zip (2.4MB)
※セキュリティ保護のため暗号化されております。解凍パスワードは次便にてお送りいたします。

ミナト物産株式会社 営業部
鈴木 一郎`,
    isSpoofed: true,
    attackType: 'マルウェア感染メール（暗号化ZIP便乗・なりすまし）',
    attachmentInfo: {
      fileName: 'Invoice_202610_Signed.zip',
      fileSize: '2.4MB',
      isSuspicious: true,
      note: '展開すると実行ファイル（.exe / .vbs / 悪意あるマクロ付きファイル）が含まれている危険性大'
    },
    psychologicalTriggers: [
      {
        type: 'familiarity',
        label: '実在取引先への信用・親近感',
        description: '「お世話になっております」「ミナト物産の鈴木」と実在しそうな企業名を名乗り油断させる。'
      },
      {
        type: 'confusion',
        label: '「先ほど電話した」という架空の既成事実',
        description: '心当たりが曖昧な多忙なビジネスパーソンに対し、「電話で話した件」と装って疑念を打ち消す。'
      }
    ],
    clues: [
      {
        id: 'clue_n5_domain',
        targetArea: 'sender',
        label: 'リレードメインの偽装（bizmail-relay.com）',
        isSuspicious: true,
        explanation: 'アドレス中に「minato-bussan.co.jp」を含めていますが、実際の親ドメインは「bizmail-relay.com」という不審な外部ドメインです。'
      },
      {
        id: 'clue_n5_zip',
        targetArea: 'attachment',
        label: 'パスワード付き暗号化ZIPファイル',
        isSuspicious: true,
        explanation: 'セキュリティ製品のウイルススキャンをすり抜けるために暗号化ZIPを悪用するサイバー攻撃の常套手段です。'
      },
      {
        id: 'clue_n5_call',
        targetArea: 'body',
        label: '「先ほどお電話でお話しした」の記憶不一致',
        isSuspicious: true,
        explanation: '実際にはそのような電話を受けていないにもかかわらず、相手が勘違いしたと思い込ませる心理誘導です。'
      }
    ],
    explanation: {
      summary: '実在取引先を装った「標的型マルウェア付き偽メール」です。',
      whySafeOrSpoofed: '送信元アドレスの末尾が「bizmail-relay.com」という偽装ドメインです。添付の暗号化ZIP内にはランサムウェアやスパイウェア等のウイルスが仕込まれています。',
      psychologicalTrap: '「先ほどお電話でお話しした」と書くことで、「忙しくて忘れていたかな？」と自責の念を持たせ、反射的に添付ファイルを開かせようとするテクニックです。',
      checklistPoints: [
        '電話した覚えのない相手からの「電話の件」というメールは極めて疑わしい',
        'パスワード付きZIPファイルはマルウェア検査を回避するために悪用されることが多い',
        '取引先本人の既知の電話番号に別経路で連絡し、メールを送信したか直接確認する'
      ],
      defenseRule: '身に覚えのない請求書ZIPは絶対に解凍せず、名刺記載の電話番号から担当者本人に事実確認する。'
    }
  },
  {
    id: 'normal_06_executive_giftcard',
    difficulty: 'normal',
    medium: 'chat',
    title: '役員を装った急ぎのギフトカード購入依頼チャット',
    senderDisplay: '山田 取締役副社長 (役員)',
    senderAddress: '@yamada_vp_emergency',
    recipientDisplay: 'あなたへのダイレクトメッセージ',
    timestamp: '本日 17:15',
    content: `〇〇さん、急な連絡ですまない。
今重要な海外クライアントとの会食および役員会議に出ており、電話に出られない状況だ。

至急、次のプレゼン贈答用にDigitalPay ギフトカード（5万円分×4枚）をコンビニ等で購入してきてもらえないだろうか？
領収書を貰ってくれれば、明日朝一番で私が全額立替精算を承認する。

購入したらカード裏面のコード番号の写真をこのチャットに送ってほしい。急ぎ頼む。`,
    isSpoofed: true,
    attackType: 'ビジネスメール／チャット詐欺（CEO・役員詐欺）',
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '役員・トップマネジメントの権威',
        description: '「副社長からの直接命令」という強い上下関係を悪用し、断りにくい心理を強制する。'
      },
      {
        type: 'urgency',
        label: '会食中・会議中の急ぎ対応',
        description: '「電話に出られない」と先手を打つことで、電話で声を確認する連絡経路を遮断する。'
      }
    ],
    clues: [
      {
        id: 'clue_n6_giftcard',
        targetArea: 'body',
        label: '「ギフトカードのコード番号」を要求',
        isSuspicious: true,
        explanation: '企業の役員が個人の社員に対して、コンビニでギフトカードを購入させコード写真を送らせる業務運用は100%あり得ません。典型的な換金詐欺です。'
      },
      {
        id: 'clue_n6_nocall',
        targetArea: 'body',
        label: '「電話に出られない」という確認経路の遮断',
        isSuspicious: true,
        explanation: '詐欺師は声で嘘がバレるのを恐れるため、「今大事な会議中で電話不可」と必ず言い訳をします。'
      },
      {
        id: 'clue_n6_account',
        targetArea: 'sender',
        label: '不審な新規アカウントID（@yamada_vp_emergency）',
        isSuspicious: true,
        explanation: '通常社内で使われている公式役員アカウントではなく、似せた名前の外部・新規アカウントです。'
      }
    ],
    explanation: {
      summary: '典型的な「ビジネスメール詐欺（CEO詐欺・ギフトカード要求型）」です。',
      whySafeOrSpoofed: '役員になりすましてギフトカードを購入させ、コード番号をチャットで送信させて即座に換金・詐取する国際的にも多発している詐欺手法です。',
      psychologicalTrap: '「役員からの直接のお願い」「電話は出られない」「明日全額精算する」という権威と焦りの組み合わせで、一般社員が逆らえずに指示に従ってしまう心理を悪用しています。',
      checklistPoints: [
        'どんな重役からの依頼であっても、「ギフトカードや電子マネーを買ってきて」は詐欺',
        '「電話に出られない」と言われたら、役員の秘書や同フロアの同僚に内線等で対面・音声確認を行う',
        '通常と異なる怪しいアカウントからダイレクトメッセージが届いていないか確認する'
      ],
      defenseRule: 'ギフトカード購入や送金要請は、必ず役員秘書や直属上司を通じて対面または社内内線で二重確認する。'
    }
  },
  {
    id: 'normal_07_fake_safety_drill',
    difficulty: 'normal',
    medium: 'email',
    title: '社内防災対策委員会からの安否確認テスト訓練',
    senderDisplay: 'アオバネクスト 防災対策委員会',
    senderAddress: 'bousai-test@aoba-safety-portal.net',
    recipientDisplay: '全社従業員各位',
    subject: '【全社防災訓練】緊急地震速報 安否確認テスト（1時間以内に回答必須）',
    timestamp: '本日 11:30',
    content: `従業員の皆様

本日11時30分、全社秋季防災避難訓練に伴う安否確認テストを実施いたします。
全従業員の無事を把握するため、本メール受信後60分以内に下記リンクを開き、社内アカウントでログインの上、安否状況をご登録ください。

▼ 安否確認登録フォーム
https://aoba-safety-portal.net/drill/report?emp_id=auth

※未回答者は後日、防災安全講習の再受講対象となります。

総務部 防災対策チーム`,
    isSpoofed: true,
    attackType: '社内制度悪用フィッシング（安否確認訓練偽装）',
    urlInfo: {
      displayText: 'https://aoba-safety-portal.net/drill/report?emp_id=auth',
      actualUrl: 'https://aoba-safety-portal.net/drill/report?emp_id=auth',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '総務部・防災委員会の公式命令',
        description: '会社公式の訓練であると信じ込ませ、社内ポータルログイン情報を入力させる。'
      },
      {
        type: 'social_proof',
        label: '「全社一斉訓練」の同調圧力',
        description: '「未回答はペナルティ」と書くことで、急いで入力しなければという焦りを生む。'
      }
    ],
    clues: [
      {
        id: 'clue_n7_domain',
        targetArea: 'sender',
        label: '外部取得ドメイン（aoba-safety-portal.net）',
        isSuspicious: true,
        explanation: '会社の正規ドメイン（aoba-next.jp）ではなく、社名を模した外部の「.net」ドメインです。'
      },
      {
        id: 'clue_n7_penalty',
        targetArea: 'body',
        label: '「60分以内」「未回答は再講習」というペナルティ煽り',
        isSuspicious: true,
        explanation: '訓練に便乗して社員を慌てさせ、ドメインを確認させないための心理的重圧です。'
      }
    ],
    explanation: {
      summary: '社内の防災訓練に便乗した「アカウント詐取型スピアフィッシング」です。',
      whySafeOrSpoofed: '本物の安否確認サービスは会社公認の正規ドメインまたは専用アプリを使用します。このメールは外部の偽サイト「aoba-safety-portal.net」に飛ばしてIDとパスワードを盗みます。',
      psychologicalTrap: '「防災訓練だからすぐに返信しなければ」という真面目な社員の心理とペナルティへの恐怖を悪用しています。',
      checklistPoints: [
        '安否確認のURLが自社の正規ドメイン（aoba-next.jp）または契約済みの公認サービスか照合する',
        '事前に社内グループウェア等で防災訓練の日時が告知されていたか確認する',
        'IDやパスワードを要求する外部フォームは即座に情シスへ通報する'
      ],
      defenseRule: '安否確認訓練であっても、メール内リンクのドメインを確認し、事前告知のない外部URLは開かない。'
    }
  },
  {
    id: 'normal_08_legit_terms_update',
    difficulty: 'normal',
    medium: 'email',
    title: 'クラウド電子契約「SignCloud」利用規約改定の正規通知',
    senderDisplay: 'SignCloud 運営事務局',
    senderAddress: 'notice@signcloud-service.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【重要】SignCloud サービス利用規約およびプライバシーポリシー改定のお知らせ',
    timestamp: '2026年10月25日 14:00',
    content: `SignCloudをご利用の皆様

平素よりクラウド電子契約サービス「SignCloud」をご利用いただきありがとうございます。

このたび、個人情報保護関連法令の改正に伴い、2026年11月1日をもちましてサービス利用規約およびプライバシーポリシーの一部を改定いたします。

■ 主な改定内容
・個人情報の第三者提供に関する明文化
・契約書暗号化アーカイブ機能のセキュリティ規定改定

改定後の全文は、公式サイトの規約ページよりご確認いただけます。
https://www.signcloud-service.jp/legal/terms-202611

なお、本改定に伴うお客様側のログインやお手続き、追加費用等は一切発生いたしません。
引き続きSignCloudをよろしくお願い申し上げます。`,
    isSpoofed: false,
    attackType: '正規のサービス規約改定通知',
    urlInfo: {
      displayText: 'https://www.signcloud-service.jp/legal/terms-202611',
      actualUrl: 'https://www.signcloud-service.jp/legal/terms-202611',
      isSuspicious: false
    },
    headers: {
      'From': 'SignCloud <notice@signcloud-service.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n8_domain',
        targetArea: 'sender',
        label: '正規公式ドメイン（signcloud-service.jp）',
        isSuspicious: false,
        explanation: '公式正規ドメインからSPF/DKIM/DMARCがすべてパスした状態で送信されています。'
      },
      {
        id: 'clue_n8_no_action',
        targetArea: 'body',
        label: '「ログインや手続きは一切不要」と明記',
        isSuspicious: false,
        explanation: '詐欺メールと異なり、ユーザーに焦ってログインさせたり情報を入力させようとする誘導がありません。'
      }
    ],
    explanation: {
      summary: '安全な「正規のクラウドサービス規約改定通知」です。',
      whySafeOrSpoofed: '送信元ドメインが本物であり、「手続きやログインは不要」と明記され、純粋な法令対応に伴う規約改定の案内です。',
      psychologicalTrap: '「【重要】」というタイトルに過剰反応してフィッシングと誤認しがちですが、行動を強制しない純粋な事実通知を冷静に識別できるかが重要です。',
      checklistPoints: [
        '「お客様側のログインや手続きは不要」と書かれているか',
        'リンク先が正規のコーポレートサイトの規約ページであるか',
        '個人情報やクレジットカード情報を入力させようとしていないか'
      ],
      defenseRule: '手続き不要と明記された正規ドメインからの規約改定通知は、通常の公式案内として確認する。'
    }
  },
  {
    id: 'normal_09_fake_web_meeting',
    difficulty: 'normal',
    medium: 'email',
    title: '取引先パートナーからのオンライン商談参加用URL案内',
    senderDisplay: '高橋 涼介 <ryosuke.takahashi@apex-partner-tech.com>',
    senderAddress: 'ryosuke.takahashi@apex-partner-tech.com',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '本日16:00のオンライン商談ミーティング参加リンクのご案内',
    timestamp: '本日 15:40',
    content: `アオバネクスト株式会社 〇〇様

お世話になっております。アペックス・テックの高橋です。
本日16:00より予定しておりますオンライン商談の参加URLをお送りいたします。

通信安定化のため、下記より専用のミーティング接続ランチャー（WebMeeting_Setup.exe）をダウンロードしてご参加ください。

▼ オンライン会議室へ参加
https://apex-tech-conference.live/room?meeting_id=98214

開始直前のご連絡となり恐れ入りますが、よろしくお願い申し上げます。`,
    isSpoofed: true,
    attackType: '偽Web会議リンク悪用マルウェア配布',
    urlInfo: {
      displayText: 'https://apex-tech-conference.live/room?meeting_id=98214',
      actualUrl: 'https://apex-tech-conference.live/room?meeting_id=98214',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'urgency',
        label: '商談開始20分前の焦り',
        description: '「16時からの会議に遅刻する！」と焦らせ、実行ファイル（.exe）をダウンロードさせてしまう。'
      },
      {
        type: 'familiarity',
        label: '取引先の名前と日常のオンライン会議',
        description: 'Web会議という日常業務のツールを装うことで、セキュリティの警戒心を緩める。'
      }
    ],
    clues: [
      {
        id: 'clue_n9_exe',
        targetArea: 'body',
        label: '「.exe（実行ファイル）」のダウンロード要求',
        isSuspicious: true,
        explanation: '一般的なWeb会議参加時に、メールリンクから直接.exeファイルを落とさせる運用は極めて危険であり、マルウェア感染を狙った罠です。'
      },
      {
        id: 'clue_n9_domain',
        targetArea: 'url',
        label: '会議URLのドメイン（.live）',
        isSuspicious: true,
        explanation: '公認の正規Web会議サービスではなく、攻撃者が作成した不審な「.live」ドメインです。'
      }
    ],
    explanation: {
      summary: 'Web会議を装ってウイルス（.exe）を実行させようとする「マルウェア攻撃メール」です。',
      whySafeOrSpoofed: '「会議に参加するためのランチャー」と偽って悪意ある実行ファイル（.exe）をダウンロードさせ、PCを遠隔操作（RAT）しようとする攻撃です。',
      psychologicalTrap: '「商談開始の直前」に送ることで、遅刻への焦りからセキュリティ警告を無視して.exeを実行させようとします。',
      checklistPoints: [
        'Web会議の参加で突然「.exe」ファイルのダウンロードを求められたら即座に中断する',
        '自社公認のWeb会議ツール（Zoom、Teams、Google Meet等）以外の不審な会議URLは開かない',
        '商談相手に電話などで「指定の会議URLは正しいか」を別経路で確認する'
      ],
      defenseRule: 'Web会議参加を名目に実行ファイル（.exe）のダウンロードを促すリンクは絶対に実行しない。'
    }
  },
  {
    id: 'normal_10_sns_hijack_chat',
    difficulty: 'normal',
    medium: 'chat',
    title: '知人・同業者からのオンライン投票ご協力のお願い',
    senderDisplay: '加藤 祐樹（知人・同業者）',
    senderAddress: '@kato_yuki_design',
    recipientDisplay: 'ダイレクトメッセージ',
    timestamp: '本日 20:10',
    content: `〇〇さん、夜分に急にごめん！
今、知人のカフェのデザインコンペの投票に参加してて、あと3票で決勝に残れるんだ！
もしよかったら下のリンクから「投票する」をポチッと協力してもらえないかな？🥹🙏
https://cafe-design-awards-vote.site/poll?u=kato

認証画面が出たらSNSアカウントでログインして投票してね！よろしく！`,
    isSpoofed: true,
    attackType: 'アカウント乗っ取り型ソーシャルエンジニアリング（偽投票詐欺）',
    urlInfo: {
      displayText: 'https://cafe-design-awards-vote.site/poll?u=kato',
      actualUrl: 'https://cafe-design-awards-vote.site/poll?u=kato',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'familiarity',
        label: '知人・友人への好意と親切心',
        description: '「友人が困っているから応援してあげたい」という親切心を悪用し、疑う気持ちを封じる。'
      },
      {
        type: 'urgency',
        label: '「あと3票」という達成の焦り',
        description: '限定感と緊急性で、早く投票してあげなきゃと思わせる。'
      }
    ],
    clues: [
      {
        id: 'clue_n10_login',
        targetArea: 'body',
        label: '「SNSアカウントでログインして」の指示',
        isSuspicious: true,
        explanation: '偽の投票サイト上でSNSのIDとパスワード、または二要素認証コードを入力させ、あなたのアカウントも乗っ取る手口です。'
      },
      {
        id: 'clue_n10_domain',
        targetArea: 'url',
        label: '不審な投票サイトドメイン（.site）',
        isSuspicious: true,
        explanation: '使い捨てドメイン「.site」に作られたフィッシング用の偽投票ページです。'
      }
    ],
    explanation: {
      summary: '知人のアカウントが乗っ取られて送信された「偽のSNS投票フィッシング」です。',
      whySafeOrSpoofed: '本物の知人はすでにアカウントを乗っ取られており、攻撃者が友達リスト全員に「コンテストの投票を手伝って」と偽ログインリンクを送りつけ、被害をネズミ算式に拡大させています。',
      psychologicalTrap: '「知人からのお願い」「応援してあげたい」という好意の返報性と親近感を武器に、セキュリティ警戒を完全にゼロにさせます。',
      checklistPoints: [
        '知人からの急な「投票して」「電話番号教えて」「認証コード送って」は乗っ取りを100%疑う',
        'リンク先でSNSやGoogle等のログインID/PWを求められたら絶対に入力しない',
        '知人本人に別の連絡手段（電話やメール等）で「アカウント乗っ取られてない？」と確認する'
      ],
      defenseRule: '知人からの急な「投票して」「認証して」メッセージはアカウント乗っ取りを疑い、電話で確認する。'
    }
  },
  {
    id: 'normal_11_legit_salary_portal',
    difficulty: 'normal',
    medium: 'email',
    title: '社内労務課からの月次給与明細発行通知',
    senderDisplay: '人事労務部 給与厚生課',
    senderAddress: 'payroll-notice@aoba-next.jp',
    recipientDisplay: '全社従業員各位',
    subject: '【給与明細発行】2026年10月度 給与支払明細書のお知らせ',
    timestamp: '2026年10月24日 12:00',
    content: `従業員の皆様

お疲れ様です。人事労務部です。
本日、2026年10月度（10月25日支給分）の給与明細書を社内ポータルに公開いたしました。

下記社内ポータルの給与明細閲覧メニューよりログインの上、ご確認ください。
https://portal.aoba-next.jp/payroll/statement?month=202610

※社外ネットワーク（自宅等）からアクセスされる場合は、必ず社内VPNに接続の上ご利用ください。
ご不明な点がございましたら給与厚生課（内線：2108）までお問い合わせください。

人事労務部 給与厚生課`,
    isSpoofed: false,
    attackType: '正規の社内給与明細案内',
    urlInfo: {
      displayText: 'https://portal.aoba-next.jp/payroll/statement?month=202610',
      actualUrl: 'https://portal.aoba-next.jp/payroll/statement?month=202610',
      isSuspicious: false
    },
    headers: {
      'From': '人事労務部 <payroll-notice@aoba-next.jp>',
      'Authentication-Results': 'spf=pass (local mail gateway) dkim=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n11_domain',
        targetArea: 'url',
        label: '完全一致する社内ポータル（portal.aoba-next.jp）',
        isSuspicious: false,
        explanation: '自社の正規サブドメインであり、社内VPN接続を前提としたセキュアな案内です。'
      },
      {
        id: 'clue_n11_routine',
        targetArea: 'body',
        label: '毎月定例の給与支給日前の通知',
        isSuspicious: false,
        explanation: '支給日前日に毎月送られる定例通知であり、緊急のパスワード再入力などを要求していません。'
      }
    ],
    explanation: {
      summary: '安全な「正規の社内給与明細公開通知」です。',
      whySafeOrSpoofed: '送信元およびアクセス先が自社の正規ドメイン（aoba-next.jp）であり、社外からのVPN接続手順や担当部署の内線番号が明記された正当な定期連絡です。',
      psychologicalTrap: '「給与」という重要ワードに過剰に警戒して必要な明細確認を放置するのではなく、正規ドメインとVPN要件をチェックして正しく判定します。',
      checklistPoints: [
        'リンク先ドメインが自社公式の「portal.aoba-next.jp」であるか',
        '毎月の定例スケジュール通りの発行案内であるか',
        '社内VPN接続が前提とされており、外部の怪しいフォームに情報を送らせていないか'
      ],
      defenseRule: '自社正規ドメインの社内イントラリンクであり、毎月定例の明細案内は正規として安全に確認する。'
    }
  },
  {
    id: 'normal_12_fake_health_check_form',
    difficulty: 'normal',
    medium: 'email',
    title: '総務部を装った「定期健康診断予約システム移行」案内',
    senderDisplay: '総務人事部 健康管理室',
    senderAddress: 'kenko-check@aoba-next.jp.forms-cloud.org',
    recipientDisplay: '全社従業員各位',
    subject: '【要回答・11月5日締切】秋季定期健康診断WEB予約受付システムの移行について',
    timestamp: '本日 09:30',
    content: `従業員の皆様

お疲れ様です。総務人事部 健康管理室です。
本年度の秋季定期健康診断におきまして、医療機関との連携スムーズ化のため予約システムをクラウド型アンケートに移行いたしました。

全社員の受診が労働安全衛生法により義務付けられておりますので、下記予約フォームより【社内メールアドレスとWindowsログインパスワード】を入力の上、希望日時をご登録ください。

▼ 定期健康診断 予約登録フォーム
https://aoba-next-kenko.forms-cloud.org/reserve/2026

未回答の場合は健診を受診できず、人事考課の対象外となりますので期日厳守でお願いいたします。

総務人事部 健康管理室`,
    isSpoofed: true,
    attackType: '社内行事便乗型クレデンシャル詐取フィッシング',
    urlInfo: {
      displayText: 'https://aoba-next-kenko.forms-cloud.org/reserve/2026',
      actualUrl: 'https://aoba-next-kenko.forms-cloud.org/reserve/2026',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'authority',
        label: '総務人事部および法定義務の権威',
        description: '「労働安全衛生法による義務」「人事考課への影響」で社員を従順にさせる。'
      },
      {
        type: 'social_proof',
        label: '全社員対象の定例イベント',
        description: '健康診断という全員が受ける行事に便乗し、不自然さを打ち消す。'
      }
    ],
    clues: [
      {
        id: 'clue_n12_password_req',
        targetArea: 'body',
        label: '健康診断フォームで「Windowsログインパスワード」を要求',
        isSuspicious: true,
        explanation: '外部のフォームで社内のPCログインパスワードを入力させる社内運用は絶対にあり得ません。100%クレデンシャル詐取です。'
      },
      {
        id: 'clue_n12_domain',
        targetArea: 'sender',
        label: 'サブドメイン偽装（forms-cloud.org）',
        isSuspicious: true,
        explanation: '自社ドメイン（aoba-next.jp）ではなく、末尾が「forms-cloud.org」という外部の不審なドメインです。'
      }
    ],
    explanation: {
      summary: '健康診断を装って社内Windowsパスワードを騙し取る「スピアフィッシング」です。',
      whySafeOrSpoofed: '「健診予約のため」と偽って外部フォームでWindowsログインパスワードを入力させようとします。本物の社内アンケートでパスワードの平文入力を求めることはあり得ません。',
      psychologicalTrap: '「法律で決まっている義務」「人事考課に響く」というプレッシャーで、パスワードを入力することへの違和感を麻痺させます。',
      checklistPoints: [
        'いかなる社内申請フォームであっても、パスワードの入力を求められたら即座に疑う',
        'フォームのURLが自社の社内ポータルドメイン（aoba-next.jp）であるか確認する',
        '総務部の既知の内線番号に電話して、そのようなシステム移行があったか照会する'
      ],
      defenseRule: '健康診断等の社内アンケートでパスワード入力を求めるものは詐欺であり、絶対に入力しない。'
    }
  },
  {
    id: 'normal_13_jirabot_task_assigned',
    difficulty: 'normal',
    medium: 'chat',
    title: '社内チャットボット「TaskBot」からの正規タスクアサイン通知',
    senderDisplay: 'TaskBot (社内公認インテグレーション)',
    senderAddress: '@task_bot',
    recipientDisplay: 'ダイレクト通知',
    timestamp: '本日 14:00',
    content: `🔔 新しいタスクがあなたに割り当てられました

プロジェクト：次期セキュリティ基盤刷新（SEC-2026）
チケット番号：SEC-402
概要：Q4従業員セキュリティ訓練の実施結果レポート作成
担当者：〇〇
期限：2026年11月20日
アサイン者：PM 木村 拓也

チケットの詳細は社内プロジェクト管理ポータルよりご確認ください：
https://jira.aoba-next.jp/browse/SEC-402`,
    isSpoofed: false,
    attackType: '正規の社内プロジェクト管理ボット通知',
    urlInfo: {
      displayText: 'https://jira.aoba-next.jp/browse/SEC-402',
      actualUrl: 'https://jira.aoba-next.jp/browse/SEC-402',
      isSuspicious: false
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n13_domain',
        targetArea: 'url',
        label: '自社専用サブドメイン（jira.aoba-next.jp）',
        isSuspicious: false,
        explanation: '自社の正規ドメイン（aoba-next.jp）内の社内チケット管理システムへの直接リンクです。'
      },
      {
        id: 'clue_n13_bot',
        targetArea: 'sender',
        label: '社内公式承認済みボット',
        isSuspicious: false,
        explanation: '社内ワークスペースに公式連携された自動通知ボットであり、実在するプロジェクトマネージャーからのアサインです。'
      }
    ],
    explanation: {
      summary: '安全な「正規の社内タスク管理ボット通知」です。',
      whySafeOrSpoofed: '社内公認ボットからの通常業務通知であり、チケットURLも自社ドメイン（jira.aoba-next.jp）です。怪しい外部ツールへの誘導はありません。',
      psychologicalTrap: '機械的な自動通知をすべて危険と判断してしまうと、日常のタスク管理やプロジェクトの進捗把握が滞ってしまいます。',
      checklistPoints: [
        'ボットが社内公認マーク（公式インテグレーション）を持っているか',
        'チケットURLのドメインが自社公式のもの（aoba-next.jp）であるか',
        '実在するプロジェクトやチームメンバーからの指示であるか'
      ],
      defenseRule: '自社ドメインの正規プロジェクト管理ボットからの通知は、チケット内容を確認して通常通り業務を進める。'
    }
  },
  {
    id: 'normal_14_fake_vpn_client_update',
    difficulty: 'normal',
    medium: 'email',
    title: '社内ネットワーク課からのVPNクライアント緊急アップデート案内',
    senderDisplay: '社内ネットワーク推進課 <vpn-admin@aoba-vpn-gateway.net>',
    senderAddress: 'vpn-admin@aoba-vpn-gateway.net',
    recipientDisplay: 'テレワーク対象者各位',
    subject: '【緊急】社内VPNクライアントの脆弱性対応・新インストーラー適用のお願い',
    timestamp: '本日 13:10',
    content: `テレワーク・リモート接続ご利用の皆様

本日、弊社が利用しているリモートアクセスVPNサーバーにおいて、通信が傍受される恐れのある重大な脆弱性が確認されました。
これに伴い、全社VPNクライアントソフトの緊急パッチ適用が必要です。

本日17:00までに、下記リンクより修正版インストーラー（AobaVPN_v4.8_Patch.exe）をダウンロードし、インストールを完了させてください。

▼ VPN修正モジュール ダウンロード
https://aoba-vpn-gateway.net/download/client_patch

期日までに更新されない端末は、安全のためVPN接続がブロックされます。

社内ネットワーク推進課`,
    isSpoofed: true,
    attackType: '偽VPNソフト悪用トロイの木馬（マルウェア配布）',
    urlInfo: {
      displayText: 'https://aoba-vpn-gateway.net/download/client_patch',
      actualUrl: 'https://aoba-vpn-gateway.net/download/client_patch',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'urgency',
        label: '本日17時までの切断タイムリミット',
        description: '「今日中にやらないとテレワークができなくなる」と焦らせ、.exeを実行させる。'
      },
      {
        type: 'fear',
        label: '「通信が傍受される」という脆弱性の恐怖',
        description: 'セキュリティ不安を煽り、情シスに確認する前に偽ソフトを落とさせる。'
      }
    ],
    clues: [
      {
        id: 'clue_n14_exe',
        targetArea: 'body',
        label: 'メール記載リンクから「.exe」を手動インストールさせる指示',
        isSuspicious: true,
        explanation: '企業のVPNソフト更新は、社内情シスの資産管理システム（MDM）から自動サイレント配信されるのが一般的であり、野良リンクから手動で.exeを落とさせる運用は極めて危険です。'
      },
      {
        id: 'clue_n14_domain',
        targetArea: 'sender',
        label: '不審な外部ドメイン（aoba-vpn-gateway.net）',
        isSuspicious: true,
        explanation: '自社の正規ドメイン（aoba-next.jp）ではなく、攻撃者が取得した外部「.net」ドメインです。'
      }
    ],
    explanation: {
      summary: 'VPNソフトの更新に見せかけてマルウェア（バックドア）を踏ませる「標的型攻撃」です。',
      whySafeOrSpoofed: '送信元が偽ドメイン「aoba-vpn-gateway.net」です。落とされるファイルはVPNソフトではなく、攻撃者が社内PCを遠隔操作するためのトロイの木馬です。',
      psychologicalTrap: '「通信が盗聴される」「今日中にやらないとVPN切断」という2重の脅迫で、社員に冷静な判断をさせないように仕向けています。',
      checklistPoints: [
        'メール内のリンクから「.exe」を直接ダウンロードしてインストールしない',
        '自社ドメイン（aoba-next.jp）以外のVPN案内は詐欺を疑う',
        '社内情シスの公式内線に電話し「VPN更新メールが来ているが本物か」確認する'
      ],
      defenseRule: '「VPN更新」を名乗るメール記載の.exeファイルは絶対に実行せず、情シスに即座に通報する。'
    }
  },
  {
    id: 'normal_15_legit_electronic_nda',
    difficulty: 'normal',
    medium: 'email',
    title: 'クラウド電子契約「SignCloud」秘密保持契約書（NDA）の正規署名依頼',
    senderDisplay: 'SignCloud 署名依頼通知',
    senderAddress: 'sign-request@signcloud-service.jp',
    recipientDisplay: '法務部契約担当者様 <legal@aoba-next.jp>',
    subject: '【電子署名のお願い】「秘密保持契約書（NDA）」への署名をお願いいたします',
    timestamp: '本日 10:45',
    content: `アオバネクスト株式会社 法務部 契約担当者様

ミナト物産株式会社の法務担当 佐藤様より、クラウド電子契約サービス「SignCloud」を通じて以下の書類への電子署名が依頼されました。

■ 書類情報
書類名：秘密保持契約書（新規事業共同検討に関するNDA）.pdf
依頼元：ミナト物産株式会社（佐藤 健太）
署名期限：2026年11月10日

内容のご確認および電子署名は、下記SignCloud安全暗号化ポータルよりお手続きいただけます。
https://sign.signcloud-service.jp/documents/view?id=DOC_891024

※本システムでは、署名にあたりパスワードの入力や追加ソフトのインストールは一切必要ありません。

クラウド電子契約 SignCloud 運営事務局`,
    isSpoofed: false,
    attackType: '正規の電子契約署名依頼通知',
    urlInfo: {
      displayText: 'https://sign.signcloud-service.jp/documents/view?id=DOC_891024',
      actualUrl: 'https://sign.signcloud-service.jp/documents/view?id=DOC_891024',
      isSuspicious: false
    },
    headers: {
      'From': 'SignCloud <sign-request@signcloud-service.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n15_domain',
        targetArea: 'url',
        label: '正規電子署名ドメイン（signcloud-service.jp）',
        isSuspicious: false,
        explanation: '公式電子契約サービスの正規サブドメイン（sign.signcloud-service.jp）であり、SSL暗号化およびSPF/DKIMが完全に合格しています。'
      },
      {
        id: 'clue_n15_no_install',
        targetArea: 'body',
        label: '「追加ソフトのインストールやPW入力は不要」の明記',
        isSuspicious: false,
        explanation: '悪質な偽契約フィッシングと異なり、ブラウザ上でそのまま安全に署名できる標準的なクラウドサイン仕様です。'
      }
    ],
    explanation: {
      summary: '安全な「正規のクラウド電子契約サービスからの署名依頼」です。',
      whySafeOrSpoofed: '取引先との間で締結予定のNDAに関する正当な電子署名案内です。公式ドメインから送信されており、追加の不審なファイルダウンロードやパスワード搾取はありません。',
      psychologicalTrap: '電子署名メールはフィッシングと見分けがつきにくいですが、リンク先が公認サービスの正規ドメインであるか、不審な.exe等を落とさせないかで正しく判定できます。',
      checklistPoints: [
        '取引先との間で事前に締結予定として進行していた契約案件であるか',
        '電子署名サービスのドメインが公式（signcloud-service.jp）と一致しているか',
        'ログインパスワードやクレジットカード情報の入力を求めていないか'
      ],
      defenseRule: '事前に合意済みの取引先からの正規電子契約通知は、ドメインを確認した上で署名手続きを進める。'
    }
  },
  {
    id: 'normal_16_ex_colleague_data_request',
    difficulty: 'normal',
    medium: 'email',
    title: '元同僚からの業務引き継ぎファイル再送のお願い',
    senderDisplay: '小林 亮太 <ryota.kobayashi.private2026@freemail-cloud.jp>',
    senderAddress: 'ryota.kobayashi.private2026@freemail-cloud.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: 'お久しぶりです！退職時の引き継ぎ資料について少しお願いが…（小林亮太です）',
    timestamp: '本日 18:40',
    content: `〇〇さん、お疲れ様です！先月退職した小林です。
急な個人メールからの連絡ですみません！

実は、退職時に会社PCに置いてきた「次期クライアント企業一覧リスト（連絡先入りExcel）」の中に、私の個人的なポートフォリオ用の覚書データが混ざっていたらしくて…！
転職先の手続きでどうしてもその一部の数値を確認したくて困っています。

もし可能なら、そのExcelファイルを私のこの個人アドレス宛てに添付で転送してもらえないでしょうか？🥹
社外秘のデータが含まれているのは知っているので、確認したらすぐに完全削除します！内緒でお願いできると本当に助かります…！

小林 亮太`,
    isSpoofed: true,
    attackType: '退職者なりすまし・機密情報持ち出しソーシャルエンジニアリング',
    psychologicalTriggers: [
      {
        type: 'familiarity',
        label: '元同僚との親交・好意の悪用',
        description: '「仲の良かった同僚のお願いだから助けてあげたい」という人情に付け込む。'
      },
      {
        type: 'urgency',
        label: '「転職先の手続きで困っている」という情への訴えかけ',
        description: '相手が困っているという同情心で、社内情報漏洩防止ルールを破らせようとする。'
      }
    ],
    clues: [
      {
        id: 'clue_n16_data_leak',
        targetArea: 'body',
        label: '「顧客リスト（社外秘データ）」を私用アドレスへ送信要求',
        isSuspicious: true,
        explanation: '退職者であっても、社外秘の顧客リストや社内機密ファイルを個人アドレスへ転送することは重大な情報漏洩インシデント（コンプライアンス違反・背任行為）です。'
      },
      {
        id: 'clue_n16_identity',
        targetArea: 'sender',
        label: 'フリーメールからの連絡（本人確認不能）',
        isSuspicious: true,
        explanation: '攻撃者が退職した同僚の名前を悪用して社外秘データを盗み出そうとしている可能性が極めて高いです。'
      }
    ],
    explanation: {
      summary: '元同僚を装って社内機密顧客リストを盗み出す「ソーシャルエンジニアリング攻撃」です。',
      whySafeOrSpoofed: 'フリーメールからの連絡であり、本人になりすました第三者（または不正競争目的の退職者）が社外秘のクライアントデータを持ち出そうとしています。転送すると懲戒処分の対象になります。',
      psychologicalTrap: '「お世話になった同僚が困っている」「内緒で頼む」という情に訴えかけ、会社のセキュリティ規程を意図的に破らせようとします。',
      checklistPoints: [
        'いかなる理由であっても社外秘データを私用フリーメールへ送信してはならない',
        '退職者からの業務データ開示要求は、個人で対応せず直ちに上司および法務・セキュリティ担当へ報告する',
        'フリーメールの差出人が本物である保証は一切ない'
      ],
      defenseRule: '退職者や知人から社内機密データの私用アドレス送信を頼まれても絶対に送らず、上司に通報する。'
    }
  },
  {
    id: 'normal_17_it_password_expiry_notice',
    difficulty: 'normal',
    medium: 'email',
    title: '社内情シスからのパスワード有効期限定期通知（リンクなし安全運用）',
    senderDisplay: '社内ITセキュリティ管理室',
    senderAddress: 'it-security@aoba-next.jp',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【定期通知】社内アカウントのパスワード有効期限があと14日で切れます',
    timestamp: '本日 09:00',
    content: `従業員の皆様

お疲れ様です。ITセキュリティ管理室です。
お客様の社内Windows/SSOアカウントのパスワードは、セキュリティポリシーに基づきあと14日（2026年11月19日）で有効期限を迎えます。

期限までに、ご自身のPC端末より以下の手順でパスワードの変更をお願いいたします。

■ パスワード変更手順（社内PCでの直接操作）
1. キーボードの [Ctrl] + [Alt] + [Delete] を同時に押します
2. 画面に表示されるメニューから「パスワードの変更」を選択します
3. 現在のパスワードと新しいパスワードを入力して完了します

※セキュリティ保護のため、本メールにはパスワードを変更するためのリンク（URL）は一切掲載しておりません。
メールのリンクからパスワードを入力させるフィッシング詐欺にくれぐれもご注意ください。

アオバネクスト株式会社 ITセキュリティ管理室`,
    isSpoofed: false,
    attackType: '正規のパスワード有効期限通知（高セキュリティ運用）',
    headers: {
      'From': 'ITセキュリティ管理室 <it-security@aoba-next.jp>',
      'Authentication-Results': 'spf=pass (local mail gateway) dkim=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n17_no_link',
        targetArea: 'body',
        label: '変更用リンクを置かず「Ctrl+Alt+Delでの手動変更」を案内',
        isSuspicious: false,
        explanation: 'フィッシング詐欺と誤認されないための最も理想的なセキュリティ運用（メール内に変更URLを置かない）です。'
      },
      {
        id: 'clue_n17_domain',
        targetArea: 'sender',
        label: '自社公式ドメイン（aoba-next.jp）',
        isSuspicious: false,
        explanation: '社内正規アドレスから送信され、14日間という十分な猶予が与えられています。'
      }
    ],
    explanation: {
      summary: '極めてセキュアな設計で作られた「正規のパスワード期限切れ案内」です。',
      whySafeOrSpoofed: 'フィッシング詐欺を防止するため、メール内にURLリンクを一切置かず、OSの標準機能（Ctrl+Alt+Del）からユーザー自身の手で安全に変更するよう案内しています。',
      psychologicalTrap: 'パスワードという単語だけで詐欺と決めつけて放置すると、実際に期限が切れて月曜の朝にPCへログインできなくなってしまいます。',
      checklistPoints: [
        'メール内にパスワードを入力させるリンクが存在しないか',
        'PCのローカル画面操作（Ctrl+Alt+Delete）による安全な変更手順が書かれているか',
        '送信元が社内の正規IT部門アドレスであるか'
      ],
      defenseRule: 'リンクのない正規パスワード期限通知は、案内通りPC本体の機能（Ctrl+Alt+Del）で安全に変更する。'
    }
  },
  {
    id: 'normal_18_fake_expense_reimbursement',
    difficulty: 'normal',
    medium: 'email',
    title: '社内経費精算ポータルからの未受領立替金精算案内',
    senderDisplay: '社内経費精算クラウド事務局',
    senderAddress: 'keahi-portal@aoba-next-finance.org',
    recipientDisplay: 'user@aoba-next.jp',
    subject: '【未払立替金あり】2026年9月度 旅費交通費精算の振込口座再確認のお願い',
    timestamp: '本日 11:50',
    content: `従業員各位

経費精算クラウドシステムよりお知らせです。
先月申請いただいた旅費交通費等の精算データにおきまして、一部口座情報の不整合により【未払いの立替金 ¥42,000】が保留となっております。

本日中に下記精算ポータルへログインし、振込先銀行口座および口座名義の再登録を行ってください。
https://aoba-next-finance.org/expense/claim?id=EXP9012

今月中の確認が完了しない場合、社内経理規程に基づき次期会計年度まで支払いが繰り延べとなります。

経理部 経費管理係`,
    isSpoofed: true,
    attackType: '社内経費便乗フィッシング（口座・認証情報詐取）',
    urlInfo: {
      displayText: 'https://aoba-next-finance.org/expense/claim?id=EXP9012',
      actualUrl: 'https://aoba-next-finance.org/expense/claim?id=EXP9012',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'greed',
        label: '「4万2千円が手に入らない」という損失の焦り',
        description: '自分が立て替えたお金が振り込まれないという強い損得勘定を刺激する。'
      },
      {
        type: 'urgency',
        label: '本日中の登録と支払い繰延べの脅し',
        description: '「来年度まで支払われない」と脅し、経理部に電話確認する余裕を奪う。'
      }
    ],
    clues: [
      {
        id: 'clue_n18_domain',
        targetArea: 'sender',
        label: '不審な外部ドメイン（aoba-next-finance.org）',
        isSuspicious: true,
        explanation: '自社ドメイン（aoba-next.jp）ではなく、社名を騙った外部の「.org」ドメインです。'
      },
      {
        id: 'clue_n18_threat',
        targetArea: 'body',
        label: '「来年度まで支払繰延べ」という不条理な脅迫',
        isSuspicious: true,
        explanation: '正規の社内経理が、立替金の振込確認を怠っただけで来期まで支払わないという乱暴な運用を行うことはありません。'
      }
    ],
    explanation: {
      summary: '経費立替金の未払いを騙って社内IDや銀行口座情報を盗む「フィッシング詐欺」です。',
      whySafeOrSpoofed: '送信元が外部ドメイン「aoba-next-finance.org」です。アクセスすると社内ポータルのログインID/PWだけでなく、銀行口座や暗証番号を入力させられます。',
      psychologicalTrap: '「自分の立て替えた4万円が消えてしまうかもしれない」という強い不安を煽り、偽サイトのURLに気付かせないようにします。',
      checklistPoints: [
        '経費精算はメール記載のリンクではなく、ブックマークした社内正規ポータルから直接開く',
        '自社の正規ドメイン（aoba-next.jp）以外のURLは絶対に開かない',
        '疑問がある場合は、経理部の担当者に社内内線で直接状況を確認する'
      ],
      defenseRule: '経費精算メールのリンクは踏まず、社内ブックマークした公式経費精算システムから直接確認する。'
    }
  },
  {
    id: 'normal_19_tokai_print_catalog_pdf',
    difficulty: 'normal',
    medium: 'email',
    title: '取引先「トウカイ印刷」からの秋季ノベルティ新製品カタログ送付',
    senderDisplay: '森本 美咲 <misaki.morimoto@tokai-print-works.co.jp>',
    senderAddress: 'misaki.morimoto@tokai-print-works.co.jp',
    recipientDisplay: 'マーケティング部 イベント担当様 <user@aoba-next.jp>',
    subject: '【ご提案】2026年秋・冬向け展示会ノベルティ総合カタログのご送付（トウカイ印刷）',
    timestamp: '昨日 15:20',
    content: `アオバネクスト株式会社
マーケティング部 イベント担当 〇〇様

いつも大変お世話になっております。トウカイ印刷の森本です。
先週はお電話にて年末展示会のブース概要をお聞かせいただきありがとうございました。

お話ししておりました、今期新登場のエコ素材ノベルティおよび卓上カレンダーの総合カタログ（PDF形式）を添付にてお送りいたします。

添付ファイル：Tokai_Novelty_Catalog_2026AW.pdf (4.1MB)

お見積もりやサンプルのご要望がございましたら、いつでもお気軽に本メールへのご返信またはお電話にてお申し付けください。
引き続きよろしくお願い申し上げます。

トウカイ印刷株式会社 営業第2グループ
森本 美咲
TEL: 03-5291-XXXX（直通）`,
    isSpoofed: false,
    attackType: '正規の取引先営業提案メール（安全なPDF添付）',
    attachmentInfo: {
      fileName: 'Tokai_Novelty_Catalog_2026AW.pdf',
      fileSize: '4.1MB',
      isSuspicious: false,
      note: '標準的な電子カタログPDFファイル（マクロやスクリプトは非含有）'
    },
    headers: {
      'From': 'トウカイ印刷 森本 <misaki.morimoto@tokai-print-works.co.jp>',
      'Authentication-Results': 'spf=pass dkim=pass dmarc=pass'
    },
    psychologicalTriggers: [],
    clues: [
      {
        id: 'clue_n19_domain',
        targetArea: 'sender',
        label: '正規公式企業ドメイン（tokai-print-works.co.jp）',
        isSuspicious: false,
        explanation: '長年取引のある印刷会社の正規ドメインであり、メール認証もpassしています。'
      },
      {
        id: 'clue_n19_pdf',
        targetArea: 'attachment',
        label: '一般的なPDFカタログ（暗号化ZIPやマクロなし）',
        isSuspicious: false,
        explanation: '怪しい暗号化ZIPや実行可能ファイル（.exe）ではなく、事前の電話で合意していた通常のPDF資料です。'
      }
    ],
    explanation: {
      summary: '安全な「実在取引先からの正規営業提案・カタログ送付メール」です。',
      whySafeOrSpoofed: '先週電話でやり取りした実在の印刷会社担当者からの連絡であり、ドメインも正規です。添付ファイルも安全なPDFであり、マルウェアの兆候はありません。',
      psychologicalTrap: '添付ファイルがあるメールを全て拒絶してしまうと、取引先からの正規の提案書や見積書が一切受け取れなくなってしまいます。',
      checklistPoints: [
        '事前に電話や打ち合わせで約束していた資料の送付であるか',
        '暗号化ZIPやマクロ付きファイル（.docm/.xlsm/.exe）ではなく通常のPDFであるか',
        '取引先のドメインが正当であるか'
      ],
      defenseRule: '事前に約束したやり取りに基づく正規ドメインの通常PDFファイルは、安全に確認して業務を進める。'
    }
  },
  {
    id: 'normal_20_slack_session_force_logout_popup',
    difficulty: 'normal',
    medium: 'browser_alert',
    title: '社内ワークスペースチャットのセッション再認証ダイアログ',
    senderDisplay: '社内ワークスペース認証セキュリティ',
    senderAddress: 'workspace-aoba-session-protect.com',
    recipientDisplay: '全画面オーバーレイ',
    timestamp: 'リアルタイム検出',
    content: `⚠️ セッションが中断されました

長時間の無操作、または別端末からのアクセスが検知されたため、社内ワークスペースチャットのセキュリティセッションを強制切断いたしました。

未送信のメッセージおよび業務ログを保護するため、直ちに会社のアカウントで再ログインを行ってください。

▼ 再認証ログイン画面へ
https://workspace-aoba-session-protect.com/login?token=sess_88129`,
    isSpoofed: true,
    attackType: 'ブラウザ偽ダイアログ悪用セッションハイジャック',
    urlInfo: {
      displayText: 'https://workspace-aoba-session-protect.com/login?token=sess_88129',
      actualUrl: 'https://workspace-aoba-session-protect.com/login?token=sess_88129',
      isSuspicious: true
    },
    psychologicalTriggers: [
      {
        type: 'confusion',
        label: '作業中の突然の中断によるパニック',
        description: '「未送信メッセージが消える」と焦らせ、ログイン画面のURLを確認させない。'
      },
      {
        type: 'authority',
        label: '公式チャットアプリのセキュリティ警告の模倣',
        description: '本物の社内チャットのUIを完全コピーし、公式のセッション切れだと信じ込ませる。'
      }
    ],
    clues: [
      {
        id: 'clue_n20_browser_url',
        targetArea: 'sender',
        label: '外部取得ドメイン（workspace-aoba-session-protect.com）',
        isSuspicious: true,
        explanation: '本物の社内チャットアプリのドメインではなく、外部の攻撃用偽ドメインです。'
      },
      {
        id: 'clue_n20_fake_dialog',
        targetArea: 'body',
        label: 'Webページ上に描画された偽の全画面オーバーレイ',
        isSuspicious: true,
        explanation: '閲覧中のWebサイトに仕込まれた不正スクリプトが、社内チャットが切断されたように見せかける偽ポップアップを表示しています。'
      }
    ],
    explanation: {
      summary: '社内チャットのセッション切れを装った「偽ログイン画面（インシデント詐欺）」です。',
      whySafeOrSpoofed: '閲覧中のWebサイトに表示された偽の警告画面です。IDとパスワードを入力すると、攻撃者に社内チャットのアカウントが乗っ取られてしまいます。',
      psychologicalTrap: '「仕事中に急に画面が消えた」「メッセージを保存しなきゃ」という焦りを突き、アドレスバーを見る余裕を奪います。',
      checklistPoints: [
        'Webブラウザのアドレスバーを確認し、正規のチャットツール公式ドメインか確認する',
        'Web閲覧中に突然現れたチャット再ログイン画面には絶対に入力しない',
        'PCの公式チャット専用デスクトップアプリが本当に切断されているか確認する'
      ],
      defenseRule: 'Webページ上に突然現れるセッション切れログイン画面は偽物であり、ブラウザタブを閉じる。'
    }
  }
];
