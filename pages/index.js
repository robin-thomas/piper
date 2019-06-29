import Link from "next/link";

import GlobalHead from "../components/utils/GlobalHead";
import Header from "../components/Header";

export default () => (
  <div>
    <GlobalHead title="Piper | Decentralized Chromium web store" />
    <Header />
    <Link href="extensions?hash=1122334455" as="extensions/1122334455">
      <a>Extensions</a>
    </Link>
  </div>
);
