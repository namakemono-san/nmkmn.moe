本ポリシーは、YukkuriMovieMaker 4 用プラグイン「YMM4 Cloud Sync」（以下「本プラグイン」）における、利用者の情報の取り扱いについて定めるものです。

## 1. 基本方針

本プラグインは利用者の PC 上で動作するデスクトップアプリケーションです。**開発者はサーバーを一切運用しておらず、利用者のクラウドストレージ上のファイルやその内容を受信・保存・閲覧することはありません。** ファイルの送受信は、利用者の PC と利用者が選択したクラウドサービスとの間で直接行われます。

## 2. 取得する情報と利用目的

### 2.1 クラウドストレージ上のデータ

本プラグインは、利用者が明示的に連携したクラウドサービスに対して、以下の権限を要求します。

| サービス | 要求する権限 | 用途 |
| --- | --- | --- |
| Google ドライブ | `https://www.googleapis.com/auth/drive` | プロジェクト（`.ymmx`）および素材ファイルの一覧取得、ダウンロード、アップロード、フォルダー作成、削除。利用者がブラウザや Google ドライブアプリで配置したファイルも対象とするため、本プラグインが作成したファイルのみにアクセスする `drive.file` では機能が成立しません。 |
| OneDrive | `Files.ReadWrite.AppFolder` | 本プラグイン専用のアプリフォルダー内に限定した読み書き。 |
| Dropbox | 本プラグイン専用のアプリフォルダー | アプリフォルダー内に限定した読み書き。 |
| WebDAV | 利用者が指定したサーバーおよびパス | 利用者が入力した接続先に対する読み書き。 |

これらの権限は、利用者が「連携」タブで明示的に許可した場合にのみ行使されます。取得したファイルは利用者の PC 上の保存先にのみ書き込まれます。

### 2.2 認証情報

クラウドサービスのアクセストークン、リフレッシュトークン、および WebDAV の接続情報（サーバー URL・ユーザー名・パスワード）は、Windows のデータ保護機能により暗号化したうえで、**利用者の PC 内にのみ**保存されます。開発者がこれらを受け取ることはありません。

### 2.3 エラー情報

不具合の早期発見と修正のため、本プラグイン内で発生した例外情報を [Sentry](https://sentry.io/) に送信します。送信される内容は次のとおりです。

- 例外の種類とメッセージ
- スタックトレース（メソッド名、ソースファイル名、行番号）
- 本プラグインのバージョン
- エラー報告画面で利用者が任意に入力したコメント（入力した場合のみ）

氏名、メールアドレス、IP アドレスなどの識別情報は送信しません（`SendDefaultPii: false`）。例外メッセージやスタックトレースに含まれるファイルパスのうち、ユーザープロファイル配下（`C:\Users\<ユーザー名>`）は送信前に `<user>` へ置換されます。それ以外のパスおよびファイル名はそのまま送信される場合があります。

Sentry の初期化は本プラグイン専用のクライアントに閉じており、YukkuriMovieMaker 本体や他のプラグインで発生した例外は送信されません。送信を無効にしたい場合は、本プラグインの `appsettings.json` の `Dsn` を空文字列に設定してください。

### 2.4 アップデート確認

起動時に GitHub の公開 API（`https://api.github.com/repos/namakemono-san/YMM4-CloudSync/releases`）へ新しいバージョンの有無を問い合わせます。この通信で本プラグインが送信する利用者の情報はありません（一般的な HTTP 通信と同様に、接続元 IP アドレスは GitHub 側に記録されます）。この機能は設定タブでオフにできます。

## 3. 保存場所と保存期間

本プラグインが作成するデータは、すべて利用者の PC 上の次の場所に保存されます。

| 場所 | 内容 |
| --- | --- |
| `%LOCALAPPDATA%\YMM4CloudSync\` | 認証情報（暗号化）、設定、同期状態、ダウンロードしたプロジェクトと素材 |
| `%TEMP%\YMM4CloudSync\` | 一時ファイル（既定のキャッシュ保存先。設定で変更可能） |

これらは利用者が削除するまで保持されます。開発者側に保存期間の概念はありません（開発者はデータを保持していないため）。Sentry に送信されたエラー情報は Sentry のデータ保持期間に従って削除されます。

## 4. 第三者への提供

開発者は、利用者の情報を第三者に販売、貸与、または提供しません。本プラグインが通信する外部サービスは次のとおりで、いずれも利用者の PC から直接通信されます。

- 利用者が連携したクラウドサービス（Google ドライブ、OneDrive、Dropbox、利用者指定の WebDAV サーバー）
- Sentry（エラー情報。無効化可能）
- GitHub（アップデート確認。無効化可能）

## 5. Google ユーザーデータの限定的使用

本プラグインによる Google API から取得した情報の使用および他アプリへの移転は、[Google API サービスのユーザーデータに関するポリシー](https://developers.google.com/terms/api-services-user-data-policy)（限定的使用の要件を含む）に準拠します。

具体的には、Google ドライブから取得したデータについて次を遵守します。

- 利用者に対して本プラグインの機能を提供する目的にのみ使用します。
- 広告目的では一切使用しません。
- 人間による読み取りは行いません。ただし、利用者から明示的な同意を得た場合、セキュリティ目的の場合、法令遵守のために必要な場合を除きます。
- 本プラグインの機能提供に必要な範囲を超えて、第三者に移転しません。

## 6. データの削除

- **連携の解除:** 「連携」タブでサインアウトすると、該当サービスの認証情報が PC 上から削除されます。
- **ローカルデータの削除:** `%LOCALAPPDATA%\YMM4CloudSync\` および設定したキャッシュ・アセット保存先のフォルダーを削除してください。
- **アクセス権の取り消し:** 各サービスのアカウント設定から本プラグインのアクセス権を取り消せます。Google の場合は [Google アカウントの「サードパーティ製アプリとサービス」](https://myaccount.google.com/permissions)から行えます。

## 7. セキュリティ

認証情報は Windows のデータ保護 API により、その PC のその利用者アカウントでのみ復号できる形で暗号化して保存します。クラウドサービスとの通信はすべて HTTPS で行われます。WebDAV については、平文の `http://` 接続は既定で拒否され、利用者が明示的に許可した場合にのみ使用されます。

## 8. 子どものプライバシー

本プラグインは子どもを対象としたものではなく、開発者が子どもから意図的に情報を収集することはありません。

## 9. 本ポリシーの変更

本ポリシーは必要に応じて改定されることがあります。重要な変更を行った場合は、本ページの最終更新日を更新し、本プラグインの更新履歴でお知らせします。

## 10. お問い合わせ

本ポリシーに関するお問い合わせは [GitHub Issues](https://github.com/namakemono-san/YMM4-CloudSync/issues) までご連絡ください。

利用規約は [こちら](/ymm4/terms-of-service) をご覧ください。

---

# YMM4 Cloud Sync — Privacy Policy

Last updated: 27 August 2026

This policy describes how YMM4 Cloud Sync (the "Plugin"), a plugin for YukkuriMovieMaker 4, handles user information.

## 1. Overview

The Plugin is a desktop application that runs entirely on the user's own computer. **The developer operates no servers and never receives, stores, or views the user's cloud files or their contents.** All file transfers happen directly between the user's computer and the cloud service the user chose.

## 2. Information collected and how it is used

### 2.1 Cloud storage data

| Service | Scope requested | Purpose |
| --- | --- | --- |
| Google Drive | `https://www.googleapis.com/auth/drive` | Listing, downloading, uploading, creating folders and deleting project files (`.ymmx`) and media assets. Users place assets in Drive using a browser or the Google Drive desktop app, so the Plugin must work with files it did not create; `drive.file` cannot satisfy this. |
| OneDrive | `Files.ReadWrite.AppFolder` | Read/write limited to the Plugin's own app folder. |
| Dropbox | The Plugin's app folder | Read/write limited to the app folder. |
| WebDAV | The server and path supplied by the user | Read/write against the endpoint the user configured. |

These permissions are exercised only after the user explicitly connects the service. Retrieved files are written only to locations on the user's own computer.

### 2.2 Credentials

Access tokens, refresh tokens and WebDAV credentials (server URL, user name, password) are encrypted using the Windows data protection facilities and stored **only on the user's computer**. The developer never receives them.

### 2.3 Error reports

The Plugin sends exception data to [Sentry](https://sentry.io/) to find and fix defects. This includes:

- Exception type and message
- Stack trace (method names, source file names, line numbers)
- The Plugin version
- Any comment the user chooses to type into the error report dialog

No identifying information such as name, e-mail address or IP address is sent (`SendDefaultPii: false`). File paths under the user profile (`C:\Users\<name>`) are replaced with `<user>` before sending; other paths and file names may be sent as-is. Sentry is initialised on a client scoped to this Plugin only, so exceptions raised by YukkuriMovieMaker itself or by other plugins are not sent. Reporting can be disabled by setting `Dsn` to an empty string in the Plugin's `appsettings.json`.

### 2.4 Update check

At start-up the Plugin queries GitHub's public API (`https://api.github.com/repos/namakemono-san/YMM4-CloudSync/releases`) for a newer version. No user information is transmitted by the Plugin in this request. The feature can be turned off in the settings tab.

## 3. Storage location and retention

| Location | Contents |
| --- | --- |
| `%LOCALAPPDATA%\YMM4CloudSync\` | Encrypted credentials, settings, sync state, downloaded projects and assets |
| `%TEMP%\YMM4CloudSync\` | Temporary files (default cache location; configurable) |

These are retained until the user deletes them. The developer has no retention period because the developer holds no data. Error reports sent to Sentry are deleted according to Sentry's retention policy.

## 4. Disclosure to third parties

The developer does not sell, rent or otherwise provide user information to third parties. The Plugin communicates with the following external services, always directly from the user's computer: the cloud service the user connected (Google Drive, OneDrive, Dropbox, or a user-specified WebDAV server); Sentry (error reports, can be disabled); and GitHub (update check, can be disabled).

## 5. Limited Use of Google user data

YMM4 Cloud Sync's use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

Specifically, data obtained from Google Drive is:

- used only to provide or improve user-facing features of the Plugin;
- never used for advertising purposes;
- never read by humans, except with the user's explicit consent, for security purposes, or to comply with applicable law;
- never transferred to third parties beyond what is necessary to provide the Plugin's features.

## 6. Deleting your data

- **Disconnect:** signing out on the 連携 (Connections) tab removes that service's credentials from the computer.
- **Local data:** delete `%LOCALAPPDATA%\YMM4CloudSync\` and any configured cache/asset folders.
- **Revoke access:** revoke the Plugin's access from your account settings — for Google, at [Third-party apps & services](https://myaccount.google.com/permissions).

## 7. Security

Credentials are encrypted with the Windows data protection API so that they can be decrypted only by the same user account on the same computer. All cloud communication uses HTTPS. For WebDAV, plain `http://` connections are rejected by default and are used only when the user explicitly allows them.

## 8. Children's privacy

The Plugin is not directed at children, and the developer does not knowingly collect information from children.

## 9. Changes to this policy

This policy may be revised. When a material change is made, the last-updated date on this page will be changed and the change will be noted in the Plugin's change log.

## 10. Contact

Questions about this policy can be sent via [GitHub Issues](https://github.com/namakemono-san/YMM4-CloudSync/issues).

The Terms of Service are available [here](/ymm4/terms-of-service).
