import LegalDocument from "../components/LegalDocument";
import content from "../legal/ymm4-terms-of-service.md?raw";

function Ymm4TermsOfService() {
  return (
    <LegalDocument
      appName="YMM4 Cloud Sync"
      documentTitle="利用規約 / Terms of Service"
      lastUpdated="2026年8月27日"
      content={content}
    />
  );
}

export default Ymm4TermsOfService;
