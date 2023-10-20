import { getI18n } from "@/locales/server";
import SadSmile from "@/images/SadSmile";

const InDevelopingPage = async () => {
  const t = await getI18n();
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SadSmile />
      <h1>{t(`in_developing`)}</h1>
    </div>
  );
};

export default InDevelopingPage;
