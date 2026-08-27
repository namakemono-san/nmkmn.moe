import LegalDocument from "../components/LegalDocument";
import content from "../legal/ymm4-privacy-policy.md?raw";

function Ymm4PrivacyPolicy() {
  return (
    <LegalDocument
      appName="YMM4 Cloud Sync"
      documentTitle="プライバシーポリシー / Privacy Policy"
      lastUpdated="2026年8月27日"
      content={content}
    />
  );
}

export default Ymm4PrivacyPolicy;
