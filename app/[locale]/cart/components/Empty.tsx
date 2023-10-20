import styled from "styled-components";
import SadSmile from "@/images/SadSmile";
import { useI18n } from "@/locales/client";

const EmptyContent = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  jystify-content: center;
`;

export default function Empty() {
  const t = useI18n();

  return (
    <EmptyContent>
      <SadSmile />
      <h1>{t(`empty_cart`)}</h1>
    </EmptyContent>
  );
}
