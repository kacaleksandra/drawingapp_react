import Image from "next/image";

interface ToolOptionProps {
  iconSrc: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ToolOption({ iconSrc, label, active, onClick }: ToolOptionProps) {
  return (
    <li className={`option tool ${active ? "active" : ""}`} onClick={onClick}>
      <Image unoptimized={true} src={iconSrc} width="20" height="20" alt="" />
      <span>{label}</span>
    </li>
  );
}

export default ToolOption;
